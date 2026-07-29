import { expect, test } from "@playwright/test";

const retiredAdlcPath = "/projects/agent-development-lifecycle";

test.describe("retired ADLC route", () => {
  test("permanently redirects direct requests to the homepage", async ({
    page,
    request,
  }) => {
    const response = await request.get(retiredAdlcPath, { maxRedirects: 0 });

    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe("/");

    const finalResponse = await page.goto(retiredAdlcPath);

    expect(finalResponse?.ok()).toBe(true);
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "I build the systems that build software.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Enterprise Agent Development Lifecycle",
      }),
    ).toHaveCount(0);
  });

  test("does not publish the retired route in the sitemap", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");

    expect(response.ok()).toBe(true);
    expect(await response.text()).not.toContain(retiredAdlcPath);
  });
});
