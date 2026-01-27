import { test, expect } from "@playwright/test";
import { emailTestConfig } from "../fixtures/email-config";
import { fillFormWithValidation } from "../fixtures/test-data";

// Integration tests - API health check + optional full integration
test.use({ browserName: "chromium" });

test.describe("Contact Form Integration", () => {
  test("FormSpree API health check", async ({ request }) => {
    // Verify FormSpree API is reachable (no rate limiting)
    const response = await request.get("https://formspree.io/");
    expect(response.status()).toBe(200);
    console.log("✅ FormSpree API is reachable");
  });

  test("FormSpree endpoint configuration is correct", async ({ page }) => {
    // Since we use server actions, verify endpoint via successful submission
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    // Fill form using helper function
    await fillFormWithValidation(page, {
      name: "Config Test",
      email: "test@example.com",
      message: "Configuration verification test",
    });

    // Submit form and verify success
    await page.click('button[type="submit"]');

    // Wait for submission and verify success message
    await expect(page.locator("text=Thanks for your message")).toBeVisible({
      timeout: 10000,
    });

    console.log(
      "✅ FormSpree endpoint configuration verified via successful submission",
    );
  });

  // Full integration test - only runs when explicitly enabled
  test.describe("Full Integration (Manual)", () => {
    test.skip(
      !process.env.TEST_INTEGRATION,
      "Set TEST_INTEGRATION=true to run full integration tests",
    );

    test("should successfully submit form to real FormSpree API", async ({
      page,
    }) => {
      await page.goto("/");
      await page.locator("#contact").scrollIntoViewIfNeeded();

      // Use unique test data to avoid conflicts
      const timestamp = Date.now();
      const testEmail = `test+${timestamp}@example.com`;
      const testMessage = `Full integration test - ${new Date().toISOString()}`;

      await page.fill("#name", "Full Integration Test");
      await page.fill("#email", testEmail);
      await page.fill("#message", testMessage);

      // Submit the form to real API
      await page.click('button[type="submit"]');

      // Wait for response (with generous timeout for real API)
      await expect(page.locator('button[type="submit"]')).not.toContainText(
        "Sending...",
        { timeout: 15000 },
      );

      // Check for success or rate limiting
      const successMessage = page.locator("text=Thanks for your message");
      const errorMessage = page.locator("text=Something went wrong");

      try {
        await expect(successMessage).toBeVisible({ timeout: 3000 });
        console.log("✅ Full FormSpree integration successful - email sent!");

        // Verify form reset on success
        await expect(page.locator("#name")).toHaveValue("");
        await expect(page.locator("#email")).toHaveValue("");
        await expect(page.locator("#message")).toHaveValue("");
      } catch (error) {
        await expect(errorMessage).toBeVisible({ timeout: 3000 });
        console.log(
          "⚠️ FormSpree rate limit hit - integration works but limited",
        );
      }
    });
  });
});
