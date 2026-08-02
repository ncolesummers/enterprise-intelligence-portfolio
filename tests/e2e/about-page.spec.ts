import { expect, test, type Page } from "@playwright/test";

import {
  expectRuntimeHealthClean,
  observeRuntimeHealth,
  type RuntimeHealth,
} from "../fixtures/runtime-health";
import { pageUrls } from "../fixtures/test-data";

const runtimeByPage = new WeakMap<Page, RuntimeHealth>();

test.beforeEach(({ page, baseURL }) => {
  if (!baseURL) throw new Error("Playwright baseURL is required");
  runtimeByPage.set(page, observeRuntimeHealth(page, baseURL));
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(50);
  expectRuntimeHealthClean(runtimeByPage.get(page)!);
});

test.describe("About page", () => {
  test("explains why public work begins with a public plan", async ({
    page,
  }) => {
    await page.goto(pageUrls.about);

    const howIWork = page.getByTestId("case-study-section").filter({
      has: page.getByRole("heading", {
        level: 2,
        name: "How I Work",
        exact: true,
      }),
    });

    await expect(howIWork).toHaveCount(1);
    await expect(
      howIWork.getByText(
        "When the work can be public, the plan should be public too. Publishing intent before implementation exposes assumptions and tradeoffs while they can still be challenged. Keeping the decisions and the result inspectable creates a record that is stronger than a claim made after the fact.",
        { exact: true },
      ),
    ).toBeVisible();
  });
});
