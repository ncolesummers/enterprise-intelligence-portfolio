/**
 * Capture hero section screenshot from uidaho.edu explore page
 * For use as project card preview image on homepage
 */

import { chromium, Browser } from "@playwright/test";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

const EXPLORE_URL = "https://www.uidaho.edu/explore";
const OUTPUT_DIR = path.join(process.cwd(), "src", "assets");
const TEMP_PNG = path.join(OUTPUT_DIR, "uidaho-explore-hero-temp.png");
const FINAL_WEBP = path.join(OUTPUT_DIR, "uidaho-explore-hero.webp");

/**
 * Dismiss cookie banners and modal overlays
 */
async function dismissOverlays(page: any): Promise<void> {
  try {
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
          console.log(`  ✓ Dismissed overlay: ${selector}`);
          await page.waitForTimeout(500);
        }
      } catch {
        // Continue if selector not found
      }
    }
  } catch (error) {
    console.log(`  ⚠️  Could not dismiss overlays: ${error}`);
  }
}

async function main() {
  console.log("📸 Capturing hero screenshot from uidaho.edu explore page\n");
  console.log("=".repeat(60));

  let browser: Browser | null = null;

  try {
    // Launch browser with stealth settings
    console.log("\n🌐 Launching browser...");
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

    const page = await context.newPage();
    console.log("  ✓ Browser ready\n");

    // Navigate to explore page
    console.log(`📍 Navigating to ${EXPLORE_URL}...`);
    await page.goto(EXPLORE_URL, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    console.log("  ✓ Page loaded\n");

    // Wait for page to stabilize
    await page.waitForTimeout(2000);

    // Dismiss overlays
    console.log("🔘 Dismissing cookie banners...");
    await dismissOverlays(page);
    console.log("  ✓ Overlays dismissed\n");

    // Wait a bit more for animations
    await page.waitForTimeout(1000);

    // Capture hero section (top 800px of viewport)
    console.log("📸 Capturing hero section...");
    await page.screenshot({
      path: TEMP_PNG,
      type: "png",
      clip: {
        x: 0,
        y: 0,
        width: 1920,
        height: 800,
      },
    });
    console.log(`  ✓ Screenshot saved: ${TEMP_PNG}\n`);

    await browser.close();
    browser = null;

    // Convert to WebP and optimize
    console.log("🎨 Optimizing to WebP format...");
    const originalStats = fs.statSync(TEMP_PNG);
    const originalSize = originalStats.size;

    await sharp(TEMP_PNG)
      .webp({
        quality: 80,
        effort: 6,
      })
      .toFile(FINAL_WEBP);

    const optimizedStats = fs.statSync(FINAL_WEBP);
    const optimizedSize = optimizedStats.size;

    // Delete temp PNG
    fs.unlinkSync(TEMP_PNG);

    const reduction = ((originalSize - optimizedSize) / originalSize) * 100;

    console.log(
      `  ✓ Optimized: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${reduction.toFixed(1)}% smaller)`,
    );
    console.log(`  ✓ Final output: ${FINAL_WEBP}\n`);

    console.log("=".repeat(60));
    console.log("\n✅ Hero screenshot captured successfully!");
  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

main().catch(console.error);
