import { expect, test, type Page } from "@playwright/test";

import { pageUrls } from "../fixtures/test-data";
import {
  expectReducedMotionTransition,
  expectRuntimeHealthClean,
  observeRuntimeHealth,
  type RuntimeHealth,
} from "../fixtures/runtime-health";

const projects = [
  {
    // FIG. 1 has no index cell. Its link lives in the caption of the drawing
    // itself, which is the only route into the flagship case study.
    figure: 1,
    heading: "Loopworks",
    path: pageUrls.projects.loopworks,
  },
  {
    figure: 2,
    heading: "University of Idaho Website",
    path: pageUrls.projects.uidahoWebsite,
  },
  {
    figure: 3,
    heading: "MyUI Dashboard",
    path: pageUrls.projects.myui,
  },
  {
    figure: 4,
    heading: "AI Data Extraction Research",
    path: pageUrls.projects.profileExtractor,
  },
  {
    figure: 5,
    heading: "Mikrotik Configuration Generator",
    path: pageUrls.projects.mikrotikConfigGen,
  },
] as const;

const runtimeByPage = new WeakMap<Page, RuntimeHealth>();

const pressForwardTab = async (page: Page, browserName: string) => {
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
};

test.beforeEach(({ page, baseURL }) => {
  if (!baseURL) throw new Error("Playwright baseURL is required");
  runtimeByPage.set(page, observeRuntimeHealth(page, baseURL));
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(50);
  expectRuntimeHealthClean(runtimeByPage.get(page)!);
});

test.describe("Navigation", () => {
  test.describe("Homepage and title block", () => {
    test("exposes the current sheet, navigation, work, and contact contracts", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.getByRole("main")).toHaveAttribute(
        "id",
        "main-content",
      );
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "I build the systems that build software.",
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 2, name: "Figure index" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 2, name: "Get In Touch" }),
      ).toBeVisible();

      const titleBlock = page.getByRole("banner");
      const primary = titleBlock.getByRole("navigation", { name: "Primary" });
      await expect(titleBlock).toBeVisible();
      await expect(
        titleBlock.getByRole("link", { name: "N. Cole Summers, home" }),
      ).toHaveAttribute("href", "/");
      await expect(
        primary.getByRole("link", { name: "Work", exact: true }),
      ).toHaveAttribute("href", "/#work");
      await expect(
        primary.getByRole("link", { name: "About", exact: true }),
      ).toHaveAttribute("href", "/about");
      await expect(
        primary.getByRole("link", { name: "Contact", exact: true }),
      ).toHaveAttribute("href", "mailto:nate@ncolesummers.com");

      await expect(page.locator("footer")).toHaveCount(0);
      await expect(page.getByTestId("mobile-nav")).toHaveCount(0);
      await expect(
        page.getByRole("link", {
          name: "Enterprise Agent Development Lifecycle",
        }),
      ).toHaveCount(0);
    });

    test("moves keyboard focus through the skip link to main content", async ({
      page,
      browserName,
    }) => {
      await page.goto("/");

      const skipLink = page.getByRole("link", {
        name: "Skip to main content",
      });
      await pressForwardTab(page, browserName);
      await expect(skipLink).toBeFocused();
      await skipLink.press("Enter");

      await expect(page).toHaveURL(/#main-content$/);
      const main = page.getByRole("main");
      await expect(main).toBeVisible();
      await expect(main).toHaveAttribute("id", "main-content");

      await pressForwardTab(page, browserName);
      await expect(
        main.getByRole("link", { name: "read the repository", exact: true }),
      ).toBeFocused();
    });
  });

  test.describe("Project pages", () => {
    for (const project of projects) {
      test(`opens FIG. ${project.figure} at its exact current route`, async ({
        page,
      }) => {
        await page.goto("/");

        await page
          .getByRole("link", {
            name: `Read FIG. ${project.figure}`,
            exact: true,
          })
          .click();

        await expect(page).toHaveURL(project.path);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: project.heading,
            exact: true,
          }),
        ).toBeVisible();
      });

      test(`serves ${project.path} directly without application 404s`, async ({
        page,
      }) => {
        const response = await page.goto(project.path);

        expect(response?.status()).toBe(200);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: project.heading,
            exact: true,
          }),
        ).toBeVisible();
      });
    }
  });

  test.describe("About page", () => {
    test("opens About from the primary title-block navigation", async ({
      page,
    }) => {
      await page.goto("/");

      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "About", exact: true })
        .click();

      await expect(page).toHaveURL(pageUrls.about);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Nathan Cole Summers",
        }),
      ).toBeVisible();
      await expect(
        page
          .getByRole("navigation", { name: "Primary" })
          .getByRole("link", { name: "About", exact: true }),
      ).toHaveAttribute("aria-current", "page");
    });

    test("returns home through the title-block mark", async ({ page }) => {
      await page.goto(pageUrls.about);

      const titleBlock = page.getByRole("banner").last();
      const homeMark = titleBlock.getByRole("link", {
        name: "N. Cole Summers, home",
      });
      await homeMark.focus();
      await expect(homeMark).toBeFocused();
      await homeMark.press("Enter");

      await expect(page).toHaveURL(pageUrls.home);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "I build the systems that build software.",
        }),
      ).toBeVisible();
    });
  });

  test.describe("Responsive title-block navigation", () => {
    test("keeps primary actions usable without a mobile menu", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      const primary = page.getByRole("navigation", { name: "Primary" });
      const work = primary.getByRole("link", { name: "Work", exact: true });
      const about = primary.getByRole("link", { name: "About", exact: true });
      const contact = primary.getByRole("link", {
        name: "Contact",
        exact: true,
      });

      await expect(page.getByTestId("mobile-nav")).toHaveCount(0);
      await expect(work).toBeVisible();
      await expect(about).toBeVisible();
      await expect(contact).toBeVisible();
      await expect(contact).toHaveAttribute(
        "href",
        "mailto:nate@ncolesummers.com",
      );
      for (const link of [work, about, contact]) {
        await expectReducedMotionTransition(link);
      }

      await work.click();
      await expect(page).toHaveURL(/#work$/);
      await expect(page.locator("#work")).toBeVisible();
    });

    test("keeps contact-section social references visible and focusable on mobile", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");

      const contactSection = page.locator("#contact");
      for (const name of [
        "LinkedIn profile",
        "GitHub profile",
        "Instagram profile",
      ]) {
        const link = contactSection.getByRole("link", { name, exact: true });
        await expect(link).toBeVisible();
        await link.focus();
        await expect(link).toBeFocused();
        await expectReducedMotionTransition(link);
      }
    });
  });

  test.describe("Focus management", () => {
    test("follows the exact title-block-to-content keyboard order", async ({
      page,
      browserName,
    }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto("/");

      const titleBlock = page.getByRole("banner");
      const primary = titleBlock.getByRole("navigation", { name: "Primary" });
      const focusOrder = [
        page.getByRole("link", { name: "Skip to main content" }),
        titleBlock.getByRole("link", { name: "N. Cole Summers, home" }),
        titleBlock.getByRole("link", { name: "LinkedIn profile" }),
        titleBlock.getByRole("link", { name: "GitHub profile" }),
        titleBlock.getByRole("link", { name: "Instagram profile" }),
        primary.getByRole("link", { name: "Work", exact: true }),
        primary.getByRole("link", { name: "About", exact: true }),
        primary.getByRole("link", { name: "Contact", exact: true }),
        titleBlock.getByRole("button", {
          name: "Switch to the blueprint medium",
          exact: true,
        }),
        page.getByRole("link", { name: "read the repository", exact: true }),
        // The caption link sits above the numeral table on the sheet, so it is
        // reached before it in the tab order too.
        page.getByRole("link", { name: "Read FIG. 1", exact: true }),
        page.getByRole("button", { name: /GitHub issue/ }),
      ];

      for (const target of focusOrder) {
        await pressForwardTab(page, browserName);
        await expect(target).toBeFocused();
        await expect(target).toHaveCSS("outline-style", "solid");
      }
    });
  });

  test.describe("Runtime health", () => {
    test("loads the homepage within the existing budget", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("/");
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
      await expect(page.getByRole("main")).toBeVisible();
    });

    test("has no unexpected console errors or same-origin 404s", async ({
      page,
    }) => {
      const response = await page.goto("/");

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("main")).toBeVisible();
      await page.waitForTimeout(1000);
    });
  });
});
