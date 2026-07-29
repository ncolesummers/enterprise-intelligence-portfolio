import { expect, test, type Locator, type Page } from "@playwright/test";

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

const relativeLuminance = (color: string) => {
  const channels = color
    .match(/[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);
  if (!channels || channels.length !== 3) {
    throw new Error(`Expected a color with three channels, received ${color}`);
  }

  if (color.startsWith("oklch(")) {
    const [lightness, chroma, hue] = channels;
    const angle = (hue * Math.PI) / 180;
    const a = chroma * Math.cos(angle);
    const b = chroma * Math.sin(angle);
    const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const red = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const green = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const blue = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }

  const rgb = color.startsWith("rgb(")
    ? channels.map(channel => channel / 255)
    : color.startsWith("color(srgb ")
      ? channels
      : undefined;
  if (!rgb) throw new Error(`Unsupported computed color syntax: ${color}`);

  const [red, green, blue] = rgb.map(channel =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground: string, background: string) => {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (lighter + 0.05) / (darker + 0.05);
};

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

async function expectSocialContrast(page: Page, surfaces: Locator[]) {
  const background = await page
    .locator("body")
    .evaluate(element => getComputedStyle(element).backgroundColor);

  for (const surface of surfaces) {
    for (const social of socials) {
      const color = await surface
        .getByRole("link", { name: social.name, exact: true })
        .evaluate(element => getComputedStyle(element).color);
      expect(contrastRatio(color, background)).toBeGreaterThanOrEqual(4.5);
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
