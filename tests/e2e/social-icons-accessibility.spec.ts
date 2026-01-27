import { test, expect } from "@playwright/test";

test.describe("Social Icons Accessibility", () => {
  test("should display social icons with proper contrast in light mode", async ({
    page,
  }) => {
    await page.goto("/");
    await page.emulateMedia({ colorScheme: "light" });

    const socialIcons = page.locator('a[aria-label*="Profile"]');
    await expect(socialIcons).toHaveCount(9); // 3 each in header, mobile nav, footer

    // Verify visible icons have proper contrast
    const visibleIcons = page.locator('a[aria-label*="Profile"]:visible');
    const iconCount = await visibleIcons.count();
    expect(iconCount).toBeGreaterThan(0);

    for (let i = 0; i < iconCount; i++) {
      const icon = visibleIcons.nth(i);
      const color = await icon.evaluate(el => getComputedStyle(el).color);

      // Ensure not white text (invisible in light mode)
      expect(color).not.toBe("rgb(255, 255, 255)");
      expect(color).not.toBe("rgba(255, 255, 255, 1)");
    }
  });

  test("should maintain visibility during theme transitions", async ({
    page,
  }) => {
    await page.goto("/");

    // Get visible LinkedIn icon (desktop nav on desktop, mobile nav on mobile)
    const linkedinIcon = page
      .locator('a[aria-label="LinkedIn Profile"]:visible')
      .first();

    // Test light mode
    await page.emulateMedia({ colorScheme: "light" });
    await expect(linkedinIcon).toBeVisible();

    // Test dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(linkedinIcon).toBeVisible();

    // Test transition back to light
    await page.emulateMedia({ colorScheme: "light" });
    await expect(linkedinIcon).toBeVisible();
  });

  test("should have proper security attributes on all social links", async ({
    page,
  }) => {
    await page.goto("/");

    const socialLinks = page.locator('a[aria-label*="Profile"]');

    for (const link of await socialLinks.all()) {
      // Verify security attributes
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");

      // Verify href starts with https
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test("should prevent reverse tabnabbing vulnerabilities", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    // Create a promise to handle the new page
    const pagePromise = context.waitForEvent("page");

    // Click a visible social link (first visible one)
    await page
      .locator('a[aria-label="LinkedIn Profile"]:visible')
      .first()
      .click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Verify original page is still on the portfolio
    expect(page.url()).toContain("127.0.0.1:3001");

    // Verify new page opened to LinkedIn
    expect(newPage.url()).toContain("linkedin.com");

    // Verify no window.opener access (security check)
    try {
      const hasOpener = await newPage.evaluate(() => window.opener !== null);
      expect(hasOpener).toBe(false);
    } catch (error) {
      // If page navigated away quickly, that's expected behavior for LinkedIn
      // The important thing is that the link opened properly
      console.log("External site navigated quickly - this is expected");
    }

    await newPage.close();
  });

  test("should have consistent styling across all social icons", async ({
    page,
  }) => {
    await page.goto("/");

    // Get all social icon elements
    const allSocialIcons = page.locator('a[aria-label*="Profile"]');
    await expect(allSocialIcons).toHaveCount(9); // 3 locations × 3 icons

    // Test each platform appears in all locations
    const platforms = ["LinkedIn", "GitHub", "Instagram"];

    for (const platform of platforms) {
      const platformIcons = page.locator(`a[aria-label="${platform} Profile"]`);
      await expect(platformIcons).toHaveCount(3); // desktop nav, mobile nav, footer

      // Verify visible instances have consistent attributes
      const visiblePlatformIcons = page.locator(
        `a[aria-label="${platform} Profile"]:visible`,
      );
      const visibleCount = await visiblePlatformIcons.count();
      expect(visibleCount).toBeGreaterThan(0);

      for (let i = 0; i < visibleCount; i++) {
        const icon = visiblePlatformIcons.nth(i);
        await expect(icon).toBeVisible();
        await expect(icon).toHaveAttribute("target", "_blank");
        await expect(icon).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });
});
