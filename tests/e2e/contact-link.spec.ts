import { expect, test } from "@playwright/test";

test.describe("contact contract", () => {
  test("keeps direct contact and social links visible and focusable without a form", async ({
    page,
  }) => {
    await page.goto("/");

    const contactLink = page.getByRole("link", {
      name: "Contact",
      exact: true,
    });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute(
      "href",
      "mailto:nate@ncolesummers.com",
    );
    await contactLink.focus();
    await expect(contactLink).toBeFocused();

    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();
    await expect(page.locator("form")).toHaveCount(0);

    const expectedSocialLinks = {
      "LinkedIn profile": "https://www.linkedin.com/in/n-cole-summers/",
      "GitHub profile": "https://github.com/ncolesummers",
      "Instagram profile": "https://www.instagram.com/n__cole__summers/",
    };

    for (const [name, href] of Object.entries(expectedSocialLinks)) {
      const socialLink = contactSection.getByRole("link", {
        name,
        exact: true,
      });
      await expect(socialLink).toBeVisible();
      await expect(socialLink).toHaveAttribute("href", href);
      await socialLink.focus();
      await expect(socialLink).toBeFocused();
    }
  });
});
