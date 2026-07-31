import { expect, test, type Page } from "@playwright/test";

import { pageUrls } from "../fixtures/test-data";
import {
  expectReducedMotionTransition,
  expectRuntimeHealthClean,
  observeRuntimeHealth,
  type RuntimeHealth,
} from "../fixtures/runtime-health";

/**
 * `indexLink` is the accessible name of the one link on the index that reaches
 * the study. A figure's cell is followed by its title, because the whole cell is
 * the target and the title is what names it; FIG. 1 has no cell, so its route is
 * the caption of the drawing itself.
 */
const projects = [
  {
    figure: 1,
    heading: "Loopworks",
    indexLink: "Read FIG. 1",
    path: pageUrls.projects.loopworks,
  },
  {
    figure: 2,
    heading: "University of Idaho Website",
    indexLink: "University of Idaho website",
    path: pageUrls.projects.uidahoWebsite,
  },
  {
    figure: 3,
    heading: "MyUI Dashboard",
    indexLink: "MyUI",
    path: pageUrls.projects.myui,
  },
  {
    figure: 4,
    heading: "AI Data Extraction Research",
    indexLink: "AI data extraction research",
    path: pageUrls.projects.profileExtractor,
  },
  {
    figure: 5,
    heading: "Mikrotik Configuration Generator",
    indexLink: "Mikrotik configuration generator",
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
          .getByRole("link", { name: project.indexLink, exact: true })
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

    test("follows a figure cell from the plate a reader aims at", async ({
      page,
    }) => {
      await page.goto("/");

      const cell = page
        .locator("article")
        .filter({ has: page.getByText("FIG. 2", { exact: true }) });

      // One link per cell. The visible "Read FIG. 2" cue is not a second route to
      // the same place under a second name, which is what it was before the whole
      // cell became the target.
      await expect(cell.getByRole("link")).toHaveCount(1);
      await expect(cell.getByRole("link")).toHaveAttribute(
        "href",
        pageUrls.projects.uidahoWebsite,
      );

      // The plate is the largest thing in the cell and the thing a reader aims
      // at, so it has to lead where it looks like it leads. Clicked by
      // coordinate, because the hit area is an overlay on the title's link rather
      // than anything inside the plate — which is the point, and which a locator
      // click would refuse as an intercepted target.
      //
      // Brought into view first and instantly: `boundingBox` does not scroll, and
      // the sheet scrolls smoothly, so coordinates read during an animation are
      // coordinates the plate has already left.
      const plate = cell.locator("svg.fig-plate");
      await plate.evaluate(element =>
        element.scrollIntoView({ behavior: "instant", block: "center" }),
      );
      const box = (await plate.boundingBox())!;
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

      await expect(page).toHaveURL(pageUrls.projects.uidahoWebsite);
    });

    test("leaves undrawn work unlinked", async ({ page }) => {
      await page.goto("/");

      // FIG. 6 is forthcoming: the system itself is undrawn, not merely its
      // plate, so the cell offers no way in rather than a link to a page that
      // would have nothing on it.
      const forthcoming = page
        .locator("article")
        .filter({ has: page.getByText("FIG. 6", { exact: true }) });
      await expect(forthcoming).toContainText("Forthcoming");
      await expect(forthcoming.getByRole("link")).toHaveCount(0);
    });

    test("marks the cell it is about to follow", async ({ page }) => {
      await page.goto("/");

      // A touch device has no hover, and Tailwind gates the variant behind
      // `(hover: hover)` accordingly. There the affordance is the tap itself,
      // which the plate-click test above covers.
      test.skip(
        !(await page.evaluate(() => matchMedia("(hover: hover)").matches)),
        "no hover state on a touch pointer",
      );

      const annotation = await page.evaluate(() => {
        const probe = document.createElement("span");
        probe.style.color = "var(--annotation)";
        document.body.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
      });

      const cell = page
        .locator("article")
        .filter({ has: page.getByText("FIG. 2", { exact: true }) });
      const title = cell.getByRole("heading", { level: 3 });

      // Nothing is annotated at rest; the scarcity is what makes the colour read
      // as annotation rather than branding.
      await expect(title).not.toHaveCSS("color", annotation);
      const resting = await cell.evaluate(
        element => getComputedStyle(element).borderTopColor,
      );

      // Pointing anywhere in the cell marks it: the title takes the annotation
      // red and the cell's own rule goes to object ink. Drawn, not lit.
      await cell.hover();
      await expect(title).toHaveCSS("color", annotation);
      expect(
        await cell.evaluate(
          element => getComputedStyle(element).borderTopColor,
        ),
      ).not.toBe(resting);
    });
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
      // The about sheet leads with the stance, not the name: the title block
      // already states the name on every screen.
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "AI removes the toil. Humans keep the judgment.",
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
