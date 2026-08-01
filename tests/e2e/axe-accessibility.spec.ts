import { expect, test, type Page } from "@playwright/test";
import { createElement, Fragment, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Loading from "../../src/app/loading";
import { expectNoWcag21AaViolations } from "../fixtures/axe-accessibility";

type PlaywrightJsx = {
  __pw_type: "jsx";
  type: string | { __pw_jsx_fragment: true };
  props: Record<string, unknown>;
  key?: string | null;
};

const isPlaywrightJsx = (node: unknown): node is PlaywrightJsx =>
  typeof node === "object" &&
  node !== null &&
  "__pw_type" in node &&
  node.__pw_type === "jsx";

/** Playwright serializes imported TSX; convert it back for React's renderer. */
const toReactNode = (node: unknown): ReactNode => {
  if (Array.isArray(node)) return node.map(toReactNode);
  if (!isPlaywrightJsx(node)) return node as ReactNode;

  const { children, ...props } = node.props;
  const childNodes = Array.isArray(children) ? children : [children];
  const type = typeof node.type === "string" ? node.type : Fragment;

  return createElement(
    type,
    { ...props, key: node.key },
    ...childNodes.filter(child => child !== undefined).map(toReactNode),
  );
};

const media = [
  {
    name: "PAPER",
    theme: "light",
    nextMediumName: "Switch to the blueprint medium",
  },
  {
    name: "BLUEPRINT",
    theme: "dark",
    nextMediumName: "Switch to the paper medium",
  },
] as const;

const prepareMedium = async (page: Page, medium: (typeof media)[number]) => {
  await page.addInitScript(theme => {
    window.localStorage.setItem("theme", theme);
  }, medium.theme);
};

const expectMediumReady = async (
  page: Page,
  medium: (typeof media)[number],
) => {
  if (medium.theme === "dark") {
    await expect(page.locator("html")).toHaveClass(/dark/);
  } else {
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  }
  await expect(
    page.getByRole("button", {
      name: medium.nextMediumName,
      exact: true,
    }),
  ).toBeVisible();
};

test.describe("WCAG 2.1 A/AA axe gate", () => {
  for (const medium of media) {
    test.describe(medium.name, () => {
      test("finds no detectable violations on the complete homepage", async ({
        page,
      }) => {
        await prepareMedium(page, medium);
        await page.goto("/");
        await expectMediumReady(page, medium);

        await expectNoWcag21AaViolations(page);
      });

      test("finds no detectable violations in the MyUI FIG. 3 cell", async ({
        page,
      }) => {
        await prepareMedium(page, medium);
        await page.goto("/");
        await expectMediumReady(page, medium);

        const figure = page
          .locator("article")
          .filter({ has: page.getByText("FIG. 3", { exact: true }) });
        await expect(figure).toBeVisible();
        await figure.evaluate(element => {
          element.setAttribute("data-axe-scope", "myui-index-plate");
        });

        await expectNoWcag21AaViolations(page, {
          include: '[data-axe-scope="myui-index-plate"]',
        });
      });

      test("finds no detectable violations on the Loopworks case study", async ({
        page,
      }) => {
        await prepareMedium(page, medium);
        await page.goto("/projects/loopworks");
        await expectMediumReady(page, medium);

        await expectNoWcag21AaViolations(page);
      });

      test("finds no detectable violations on the not-found sheet", async ({
        page,
      }) => {
        await prepareMedium(page, medium);
        const response = await page.goto(
          "/this-sheet-deliberately-does-not-exist",
        );
        expect(response?.status()).toBe(404);
        await expectMediumReady(page, medium);
        await expect(
          page.getByRole("heading", {
            level: 1,
            name: "This drawing is not on file.",
          }),
        ).toBeVisible();

        await expectNoWcag21AaViolations(page);
      });

      test("finds no detectable violations in the root loading boundary", async ({
        page,
      }) => {
        await prepareMedium(page, medium);
        await page.goto("/about");
        await expectMediumReady(page, medium);

        const loadingMarkup = renderToStaticMarkup(toReactNode(Loading()));
        await page.locator("#main-content").evaluate((main, markup) => {
          main.outerHTML = markup;
        }, loadingMarkup);

        await expect(page.getByRole("status")).toHaveText("Drawing sheet");
        await expect(page.getByRole("main")).toHaveAttribute(
          "id",
          "main-content",
        );
        await expectNoWcag21AaViolations(page);
      });
    });
  }
});
