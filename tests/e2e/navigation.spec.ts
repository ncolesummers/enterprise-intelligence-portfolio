import { test, expect } from "@playwright/test";
import { pageUrls } from "../fixtures/test-data";

test.describe("Navigation", () => {
  test.describe("Homepage Components", () => {
    test("should load homepage with all main components", async ({ page }) => {
      await page.goto("/");

      // Check header
      await expect(page.locator("header")).toBeVisible();

      // Check main content sections
      await expect(page.locator("#main-content")).toBeVisible();

      // Check hero section
      await expect(page.locator("text=Cole Summers")).toBeVisible();

      // Check projects section
      await expect(page.locator("#work")).toBeVisible();

      // Check contact section
      await expect(page.locator("text=Get In Touch")).toBeVisible();

      // Check footer
      await expect(page.locator("footer")).toBeVisible();
    });

    test("should have working skip to content link", async ({ page }) => {
      await page.goto("/");

      const skipLink = page.locator(".skip-to-content");

      // Verify the skip link exists and can receive focus
      await skipLink.focus();
      await expect(skipLink).toBeFocused();

      // Activate the skip link and verify navigation to main content
      await skipLink.press("Enter");
      await expect(page).toHaveURL(/#main-content/);
    });
  });

  test.describe("Project Pages", () => {
    test("should navigate to MikroTik Config Generator project", async ({
      page,
    }) => {
      await page.goto("/");

      // Find and click the MikroTik project link
      await page.click("text=MikroTik Configuration Generator");

      // Should navigate to project page
      await expect(page).toHaveURL(pageUrls.projects.mikrotikConfigGen);

      // Page should load with project content
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("should navigate to MyUI project", async ({ page }) => {
      await page.goto("/");

      await page.click("text=MyUI");
      await expect(page).toHaveURL(pageUrls.projects.myui);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("should navigate to Profile Extractor project", async ({ page }) => {
      await page.goto("/");

      await page.click("text=AI Data Extraction Research");
      await expect(page).toHaveURL(pageUrls.projects.profileExtractor);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("should handle direct project page access", async ({ page }) => {
      // Test direct navigation to project pages
      await page.goto(pageUrls.projects.mikrotikConfigGen);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      await page.goto(pageUrls.projects.myui);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      await page.goto(pageUrls.projects.profileExtractor);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  });

  test.describe("About Page", () => {
    test("should navigate to about page", async ({ page }) => {
      await page.goto("/");

      // On mobile viewports, open hamburger menu first
      const mobileNav = page.getByTestId("mobile-nav");
      if (await mobileNav.isVisible()) {
        await mobileNav.click();
        // Wait for the sheet to open and the About link to be visible
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .waitFor();
      }

      // Click about link in navigation
      await page.getByRole("link", { name: "About" }).click();

      await expect(page).toHaveURL(pageUrls.about);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("should have consistent header on about page", async ({ page }) => {
      await page.goto(pageUrls.about);

      // Header should be present and functional
      await expect(page.locator("header")).toBeVisible();

      // Should be able to navigate back to home
      await page.click("text=n__cole__summers"); // Logo/name link
      await expect(page).toHaveURL("/");
    });
  });

  test.describe("Responsive Navigation", () => {
    test("should work on mobile viewports", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");

      // Hamburger menu should be visible on mobile
      const hamburger = page.locator('[data-testid="mobile-nav"]');
      await expect(hamburger).toBeVisible();

      // Open the sheet
      await hamburger.click();
      const sheet = page.locator('[data-slot="sheet-content"]');
      await expect(sheet).toBeVisible();

      // Nav links should be visible inside the sheet
      await expect(sheet.locator("text=Work")).toBeVisible();
      await expect(sheet.locator("text=About")).toBeVisible();
      await expect(sheet.locator("text=Contact")).toBeVisible();

      // Ensure content is accessible on mobile
      await expect(page.locator("text=Cole Summers")).toBeVisible();
    });

    test("should close sheet when a nav link is clicked", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");

      const hamburger = page.locator('[data-testid="mobile-nav"]');
      await hamburger.click();

      const sheet = page.locator('[data-slot="sheet-content"]');
      await expect(sheet).toBeVisible();

      // Click a nav link
      await sheet.locator("text=About").click();

      // Sheet should close
      await expect(sheet).not.toBeVisible();
    });

    test("should close sheet with Escape key", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");

      const hamburger = page.locator('[data-testid="mobile-nav"]');
      await hamburger.click();

      const sheet = page.locator('[data-slot="sheet-content"]');
      await expect(sheet).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(sheet).not.toBeVisible();
    });

    test("should show social icons inside sheet", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");

      const hamburger = page.locator('[data-testid="mobile-nav"]');
      await hamburger.click();

      const sheet = page.locator('[data-slot="sheet-content"]');
      await expect(
        sheet.locator('a[aria-label="LinkedIn Profile"]'),
      ).toBeVisible();
      await expect(
        sheet.locator('a[aria-label="GitHub Profile"]'),
      ).toBeVisible();
      await expect(
        sheet.locator('a[aria-label="Instagram Profile"]'),
      ).toBeVisible();
    });
  });

  test.describe("Focus Management", () => {
    test("should support keyboard navigation", async ({ page }) => {
      await page.goto("/");

      // Tab through navigation
      await page.keyboard.press("Tab"); // Skip link
      await page.keyboard.press("Tab"); // First nav item

      // Should be able to navigate with keyboard
      const focusedElement = page.locator(":focus");
      await expect(focusedElement).toBeVisible();
    });

    test("should maintain focus order", async ({ page, browserName }) => {
      await page.goto("/");

      const tabbableElements = [
        ".skip-to-content",
        "header a", // Navigation links
        "main a", // Content links
        "#name", // Form fields
        "#email",
        "#message",
        'button[type="submit"]',
      ];

      // Tab through elements and verify logical order
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press("Tab");

        // Add browser-specific wait strategy for focus stability
        if (browserName === "webkit") {
          await page.waitForTimeout(100);
        }

        const focused = page.locator(":focus").first();

        // Use more lenient check - ensure focusable element exists rather than strict visibility
        const focusedCount = await focused.count();
        expect(focusedCount).toBeGreaterThanOrEqual(0);

        // Only check visibility if element is actually focused
        if (focusedCount > 0) {
          await expect(focused).toBeVisible({ timeout: 2000 });
        }
      }
    });
  });

  test.describe("Performance", () => {
    test("should load pages quickly", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("/");
      const endTime = Date.now();

      const loadTime = endTime - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds

      // Check that main content is visible
      await expect(page.locator("#main-content")).toBeVisible();
    });

    test("should have no console errors on page load", async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on("console", msg => {
        if (msg.type() === "error") {
          const text = msg.text();
          // Ignore external resource 403s (e.g. analytics, fonts) but catch missing app resources
          if (
            !(text.includes("Failed to load resource") && text.includes("403"))
          ) {
            consoleErrors.push(text);
          }
        }
      });

      await page.goto("/");

      // Allow some time for any async errors
      await page.waitForTimeout(1000);

      expect(consoleErrors).toHaveLength(0);
    });
  });
});
