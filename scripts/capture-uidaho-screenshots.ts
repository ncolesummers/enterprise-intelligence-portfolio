/**
 * Playwright script to capture screenshots of uidaho.edu pages
 * Handles bot detection, cookie banners, and various failure states
 */

import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// Configuration
const BASE_URL = "https://www.uidaho.edu";
const OUTPUT_DIR = path.join(
  process.cwd(),
  "src",
  "assets",
  "uidaho-screenshots",
);

const VIEWPORTS = [
  { name: "desktop", width: 1920, height: 1080 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

// Fallback pages if data-driven discovery fails
const FALLBACK_PAGES = [
  { name: "homepage", url: "https://www.uidaho.edu" },
  { name: "about", url: "https://www.uidaho.edu/about" },
  { name: "academics", url: "https://www.uidaho.edu/academics" },
  { name: "admissions", url: "https://www.uidaho.edu/admissions" },
];

interface PageInfo {
  name: string;
  url: string;
}

/**
 * Retry utility with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`  ⚠️  Retry ${i + 1}/${retries} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error("Max retries exceeded");
}

/**
 * Discover pages from main navigation (data-driven approach)
 */
async function discoverPages(page: Page): Promise<PageInfo[]> {
  try {
    console.log("\n📍 Discovering pages from navigation...");
    await page.goto(BASE_URL, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Wait for navigation to be present
    await page.waitForTimeout(2000);

    // Try to find main navigation links
    const navLinks = await page.$$eval("nav a[href]", links =>
      links
        .map(link => ({
          text: link.textContent?.trim() || "",
          href: (link as HTMLAnchorElement).href,
        }))
        .filter(
          link =>
            link.text &&
            link.href.includes("uidaho.edu") &&
            !link.href.includes("#") &&
            !link.href.includes("mailto:") &&
            !link.href.includes("tel:"),
        ),
    );

    if (navLinks.length === 0) {
      console.log("  ⚠️  No navigation links found, using fallback");
      return FALLBACK_PAGES;
    }

    // Extract unique pages from navigation
    const pages: PageInfo[] = [];
    const seenUrls = new Set<string>();

    for (const link of navLinks.slice(0, 6)) {
      // Limit to top 6 nav items
      const cleanUrl = link.href.split("?")[0].split("#")[0];
      if (!seenUrls.has(cleanUrl)) {
        seenUrls.add(cleanUrl);
        const name = link.text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        pages.push({ name, url: cleanUrl });
      }
    }

    console.log(`  ✓ Discovered ${pages.length} pages`);
    pages.forEach(p => console.log(`    - ${p.name}: ${p.url}`));
    return pages.length > 0 ? pages : FALLBACK_PAGES;
  } catch (error) {
    console.log(`  ⚠️  Discovery failed: ${error}`);
    console.log("  → Using fallback pages");
    return FALLBACK_PAGES;
  }
}

/**
 * Dismiss cookie banners and modal overlays
 */
async function dismissOverlays(page: Page): Promise<void> {
  try {
    // Common cookie banner selectors
    const dismissSelectors = [
      'button[aria-label*="accept" i]',
      'button[aria-label*="close" i]',
      'button[aria-label*="dismiss" i]',
      'button:has-text("Accept")',
      'button:has-text("Close")',
      'button:has-text("OK")',
      ".cookie-banner button",
      ".modal-close",
      '[class*="close"]',
    ];

    for (const selector of dismissSelectors) {
      try {
        const button = await page.$(selector);
        if (button && (await button.isVisible())) {
          await button.click();
          console.log(`    ✓ Dismissed overlay: ${selector}`);
          await page.waitForTimeout(500);
        }
      } catch {
        // Continue if selector not found
      }
    }
  } catch (error) {
    // Non-critical, continue
    console.log(`    ⚠️  Could not dismiss overlays: ${error}`);
  }
}

/**
 * Scroll page to trigger lazy loading
 */
async function scrollToLoadContent(page: Page): Promise<void> {
  try {
    await page.evaluate(async () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollSteps = Math.ceil(scrollHeight / viewportHeight);

      for (let i = 0; i < scrollSteps; i++) {
        window.scrollTo(0, i * viewportHeight);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Scroll back to top
      window.scrollTo(0, 0);
    });

    // Wait for images to load
    await page.waitForTimeout(1000);
  } catch (error) {
    console.log(`    ⚠️  Scroll error: ${error}`);
  }
}

/**
 * Capture screenshot for a specific page and viewport
 */
async function captureScreenshot(
  context: BrowserContext,
  pageInfo: PageInfo,
  viewport: { name: string; width: number; height: number },
): Promise<boolean> {
  const page = await context.newPage();

  try {
    console.log(
      `    📸 Capturing ${pageInfo.name} @ ${viewport.name} (${viewport.width}x${viewport.height})`,
    );

    // Set viewport
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    // Navigate with retry
    await retryWithBackoff(async () => {
      await page.goto(pageInfo.url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
    });

    // Wait for page to stabilize
    await page.waitForTimeout(2000);

    // Dismiss overlays
    await dismissOverlays(page);

    // Scroll to load lazy content
    await scrollToLoadContent(page);

    // Take screenshot
    const filename = `uidaho-${pageInfo.name}-${viewport.name}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    await page.screenshot({
      path: filepath,
      fullPage: true,
      type: "png",
    });

    console.log(`      ✓ Saved: ${filename}`);
    return true;
  } catch (error) {
    console.log(
      `      ✗ Failed: ${error instanceof Error ? error.message : error}`,
    );
    return false;
  } finally {
    await page.close();
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting uidaho.edu screenshot capture\n");
  console.log("=".repeat(60));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created output directory: ${OUTPUT_DIR}\n`);
  }

  let browser: Browser | null = null;

  try {
    // Launch browser with stealth settings
    console.log("🌐 Launching browser...");
    browser = await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
      ],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      viewport: { width: 1920, height: 1080 },
      locale: "en-US",
      timezoneId: "America/Los_Angeles",
    });

    console.log("  ✓ Browser ready\n");

    // Discover pages
    const discoveryPage = await context.newPage();
    const pages = await discoverPages(discoveryPage);
    await discoveryPage.close();

    // Capture screenshots
    console.log(
      `\n📸 Capturing ${pages.length} pages × ${VIEWPORTS.length} viewports = ${pages.length * VIEWPORTS.length} screenshots\n`,
    );
    console.log("=".repeat(60));

    let successCount = 0;
    let failCount = 0;

    for (const pageInfo of pages) {
      console.log(`\n📄 ${pageInfo.name} (${pageInfo.url})`);

      for (const viewport of VIEWPORTS) {
        const success = await captureScreenshot(context, pageInfo, viewport);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("\n✅ Capture complete!");
    console.log(`   Success: ${successCount}`);
    console.log(`   Failed:  ${failCount}`);
    console.log(`   Output:  ${OUTPUT_DIR}`);
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
main().catch(console.error);
