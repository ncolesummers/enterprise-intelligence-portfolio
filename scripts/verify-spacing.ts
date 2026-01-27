/**
 * Capture screenshots to verify bullet point spacing
 */

import { chromium } from "@playwright/test";
import * as path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "src", "assets");

async function main() {
  console.log("📸 Capturing screenshots to verify spacing...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  try {
    // Navigate to the uidaho project page
    await page.goto("http://localhost:3000/projects/uidaho-website", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    console.log("✓ Page loaded\n");

    // Wait for content
    await page.waitForTimeout(2000);

    // Find and screenshot the Key Contributions section
    console.log("📸 Capturing Key Contributions section...");
    const keyContributions = await page
      .locator('text="Key Contributions"')
      .first();
    if (keyContributions) {
      const parent = keyContributions
        .locator('xpath=ancestor::div[contains(@class, "space-y")]')
        .first();
      await parent.screenshot({
        path: path.join(OUTPUT_DIR, "debug-key-contributions.png"),
      });
      console.log("  ✓ Saved: debug-key-contributions.png\n");
    }

    // Find and screenshot the Technical Architecture section
    console.log("📸 Capturing Technical Architecture section...");
    const techArch = await page.locator('text="Technology Stack"').first();
    if (techArch) {
      const parent = techArch
        .locator('xpath=ancestor::div[contains(@class, "grid")]')
        .first();
      await parent.screenshot({
        path: path.join(OUTPUT_DIR, "debug-technical-architecture.png"),
      });
      console.log("  ✓ Saved: debug-technical-architecture.png\n");
    }

    console.log("✅ Screenshots captured successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
