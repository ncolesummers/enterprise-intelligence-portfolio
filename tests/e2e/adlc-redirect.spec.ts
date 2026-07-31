import { expect, test } from "@playwright/test";

const retiredAdlcPath = "/projects/agent-development-lifecycle";
const successorPath = "/projects/loopworks";

test.describe("retired ADLC route", () => {
  test("permanently redirects direct requests to its successor", async ({
    page,
    request,
  }) => {
    const response = await request.get(retiredAdlcPath, { maxRedirects: 0 });

    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(successorPath);

    const finalResponse = await page.goto(retiredAdlcPath);

    expect(finalResponse?.ok()).toBe(true);
    await expect(page).toHaveURL(successorPath);
    await expect(
      page.getByRole("heading", { level: 1, name: "Loopworks" }),
    ).toBeVisible();

    // The successor carries the ADLC substance as lineage. It is not the
    // retired case study restored under a new URL, so its heading must not
    // reappear here.
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Enterprise Agent Development Lifecycle",
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { level: 2, name: "Lineage" }),
    ).toBeVisible();
  });

  test("does not publish the retired route in the sitemap", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");

    expect(response.ok()).toBe(true);
    expect(await response.text()).not.toContain(retiredAdlcPath);
  });
});
