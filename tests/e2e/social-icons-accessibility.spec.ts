import { expect, test, type Locator, type Page } from "@playwright/test";

import { contrastRatio, readResolved } from "../fixtures/contrast";
import {
  expectReducedMotionTransition,
  expectRuntimeHealthClean,
  observeRuntimeHealth,
  type RuntimeHealth,
} from "../fixtures/runtime-health";

const socials = [
  {
    name: "LinkedIn profile",
    href: "https://www.linkedin.com/in/n-cole-summers/",
  },
  {
    name: "GitHub profile",
    href: "https://github.com/ncolesummers",
  },
  {
    name: "Instagram profile",
    href: "https://www.instagram.com/n__cole__summers/",
  },
] as const;

const titleBlock = (page: Page) => page.getByRole("banner");
const contactSection = (page: Page) => page.locator("#contact");
const runtimeByPage = new WeakMap<Page, RuntimeHealth>();

test.beforeEach(({ page, baseURL }) => {
  if (!baseURL) throw new Error("Playwright baseURL is required");
  runtimeByPage.set(page, observeRuntimeHealth(page, baseURL));
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(50);
  expectRuntimeHealthClean(runtimeByPage.get(page)!);
});

async function expectKeyboardFocus(
  page: Page,
  link: Locator,
  browserName: string,
) {
  await link.focus();
  await expect(link).toBeFocused();

  await page.keyboard.press(
    browserName === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab",
  );
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "solid");
}

async function expectSocialContract(
  page: Page,
  surface: Locator,
  browserName: string,
) {
  for (const social of socials) {
    const link = surface.getByRole("link", {
      name: social.name,
      exact: true,
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", social.href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link.locator("svg")).toHaveAttribute("aria-hidden", "true");
    await expectKeyboardFocus(page, link, browserName);
  }
}

/**
 * The ground and every reference on a surface, read in one style recalculation.
 *
 * Reading them separately can straddle a medium switch: the class lands on
 * `html`, the ground is sampled before the repaint and comes back paper, and the
 * references are sampled after and come back blueprint chalk. Chalk on paper is
 * 1.1:1, so the assertion fails loudly on a pair that never existed on screen.
 * A stale colour is fully resolved, so polling for resolution cannot catch it —
 * only sampling the set together can, which is what `readResolved` is for.
 *
 * Selected by `aria-label` inside the evaluate because a Playwright locator
 * cannot cross into it. That is still name-based selection, not DOM shape.
 */
async function expectSocialContrast(page: Page, surfaces: Locator[]) {
  for (const surface of surfaces) {
    const sample = await readResolved(
      () =>
        surface.evaluate(
          (root, names) => ({
            background: getComputedStyle(document.body).backgroundColor,
            colors: names.map(name => {
              const link = root.querySelector(`a[aria-label="${name}"]`);
              return link ? getComputedStyle(link).color : "";
            }),
          }),
          socials.map(social => social.name),
        ),
      value => [value.background, ...value.colors],
    );

    for (const color of sample.colors) {
      expect(contrastRatio(color, sample.background)).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  }
}

test.describe("Social links accessibility", () => {
  test("exposes the exact off-sheet references in both desktop surfaces", async ({
    page,
    browserName,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    await expectSocialContract(page, titleBlock(page), browserName);
    await expectSocialContract(page, contactSection(page), browserName);

    for (const social of socials) {
      await expect(
        page.getByRole("link", { name: social.name, exact: true }),
      ).toHaveCount(2);
    }
  });

  test("keeps the contact references visible and focusable on mobile", async ({
    page,
    browserName,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    for (const social of socials) {
      await expect(
        titleBlock(page).getByRole("link", {
          name: social.name,
          exact: true,
        }),
      ).not.toBeVisible();
    }
    await expectSocialContract(page, contactSection(page), browserName);
    await expectSocialContrast(page, [contactSection(page)]);

    const navigationLinks = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link");
    for (const link of await navigationLinks.all()) {
      await expectReducedMotionTransition(link);
    }
    for (const social of socials) {
      await expectReducedMotionTransition(
        contactSection(page).getByRole("link", {
          name: social.name,
          exact: true,
        }),
      );
    }

    await page
      .getByRole("button", {
        name: "Switch to the blueprint medium",
        exact: true,
      })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expectSocialContract(page, contactSection(page), browserName);
    await expectSocialContrast(page, [contactSection(page)]);
  });

  test("maintains WCAG AA contrast in PAPER and BLUEPRINT", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expectSocialContrast(page, [titleBlock(page), contactSection(page)]);

    await page
      .getByRole("button", {
        name: "Switch to the blueprint medium",
        exact: true,
      })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expectSocialContrast(page, [titleBlock(page), contactSection(page)]);
  });

  test("opens external references without an opener", async ({
    page,
    context,
  }) => {
    await context.route("https://www.linkedin.com/**", route =>
      route.fulfill({
        contentType: "text/html",
        body: "<!doctype html><title>LinkedIn test destination</title>",
      }),
    );
    await page.goto("/");

    const linkedin = contactSection(page).getByRole("link", {
      name: "LinkedIn profile",
      exact: true,
    });
    const [destination] = await Promise.all([
      context.waitForEvent("page"),
      linkedin.click(),
    ]);
    await destination.waitForLoadState();

    expect(destination.url()).toBe(
      "https://www.linkedin.com/in/n-cole-summers/",
    );
    expect(await destination.evaluate(() => window.opener)).toBeNull();
    await destination.close();
  });
});
