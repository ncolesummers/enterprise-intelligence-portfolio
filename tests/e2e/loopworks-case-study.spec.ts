import { expect, test, type Page } from "@playwright/test";

import { contrastRatio } from "../fixtures/contrast";
import { pageUrls } from "../fixtures/test-data";
import {
  expectRuntimeHealthClean,
  observeRuntimeHealth,
  type RuntimeHealth,
} from "../fixtures/runtime-health";

const route = pageUrls.projects.loopworks;

const runtimeByPage = new WeakMap<Page, RuntimeHealth>();

test.beforeEach(({ page, baseURL }) => {
  if (!baseURL) throw new Error("Playwright baseURL is required");
  runtimeByPage.set(page, observeRuntimeHealth(page, baseURL));
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(50);
  expectRuntimeHealthClean(runtimeByPage.get(page)!);
});

test.describe("Loopworks case study", () => {
  test("binds every section to something the repository substantiates", async ({
    page,
  }) => {
    await page.goto(route);

    const main = page.getByRole("main");
    await expect(main).toHaveAttribute("id", "main-content");

    const heading = page.getByRole("heading", { level: 1, name: "Loopworks" });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/type-display/);

    const repository = page.getByRole("link", {
      name: "Read the repository",
      exact: true,
    });
    await expect(repository).toHaveAttribute(
      "href",
      "https://github.com/ncolesummers/loopworks",
    );
    await expect(repository).toHaveAttribute("rel", /noopener/);

    const sections = page.getByTestId("case-study-section");
    await expect(sections.getByRole("heading", { level: 2 })).toHaveText([
      "Introduction",
      "Admission",
      "The Development Loop",
      "Where Judgment Stays Human",
      "Why It Is a Loop",
      "Isolation and the Guarded Write",
      "The Control Plane",
      "Lineage",
      "What Is Not Claimed",
    ]);
    const sectionNamed = (name: string) =>
      sections.filter({
        has: page.getByRole("heading", { level: 2, name, exact: true }),
      });

    // The commit the parts inventory was read at. It is what makes the drawing
    // checkable, so losing it silently would cost the page its evidence base.
    await expect(sectionNamed("Introduction")).toContainText("9727357");
    await expect(sectionNamed("Introduction")).toContainText("agent-ready");

    const admission = sectionNamed("Admission");
    await expect(admission).toContainText("x-hub-signature-256");
    await expect(admission).toContainText("status:blocked");
    await expect(admission).toContainText("idempotency lock");
    await expect(admission).toContainText(
      "dispatched, deferred, or lease contention",
    );

    // Verbatim from `developmentLoopStages`, in declared order. The sequence is
    // the case study's central factual claim.
    const developmentLoop = sectionNamed("The Development Loop");
    const stages = developmentLoop.getByRole("listitem");
    await expect(stages.locator("code.type-code")).toHaveText([
      "planning",
      "test-writing",
      "development",
      "validation",
      "code-review",
      "commit",
      "pr",
      "done",
    ]);
    await expect(stages.nth(1)).toContainText("test-writer");
    await expect(stages.nth(3)).toContainText("ci-runner");
    await expect(stages.nth(5)).toContainText("maintainer, Human");
    await expect(developmentLoop).toContainText("bun run test");
    await expect(developmentLoop).toContainText("bun run validate");
    await expect(developmentLoop).toContainText("expected to be red");

    const gates = sectionNamed("Where Judgment Stays Human");
    await expect(gates).toContainText("plan-review");
    await expect(gates).toContainText("external-write-review");
    await expect(gates).toContainText("bypass policy of");

    const loop = sectionNamed("Why It Is a Loop");
    await expect(loop).toContainText("approved plan is retained");
    await expect(loop).toContainText("blocker or high findings");

    const isolation = sectionNamed("Isolation and the Guarded Write");
    await expect(isolation).toContainText("deny-all");
    await expect(isolation).toContainText("loopworks/run-{runId}");
    await expect(isolation).toContainText("draft");

    const controlPlane = sectionNamed("The Control Plane");
    await expect(controlPlane).toContainText("Eighteen tables");
    await expect(controlPlane.getByRole("listitem")).toHaveCount(14);

    const lineage = sectionNamed("Lineage");
    await expect(
      lineage.getByRole("link", { name: "Read the architecture", exact: true }),
    ).toHaveAttribute(
      "href",
      "https://github.com/ncolesummers/enterprise-agent-development-lifecycle",
    );

    for (const panel of await page.getByTestId("evidence-panel").all()) {
      await expect(panel).toHaveClass(/rule-leader/);
      await expect(panel).toHaveCSS("border-radius", "0px");
      await expect(panel).toHaveCSS("box-shadow", "none");
    }
  });

  test("states what the source does not support instead of implying it", async ({
    page,
  }) => {
    await page.goto(route);

    const omissions = page.getByTestId("case-study-section").filter({
      has: page.getByRole("heading", {
        level: 2,
        name: "What Is Not Claimed",
        exact: true,
      }),
    });
    await expect(omissions).toContainText(
      "limits the system enforces, not measurements",
    );
    await expect(omissions).toContainText("fan-out is not built yet");
    await expect(omissions).toContainText("are not wired");

    // The specific fabrications PRODUCT.md forbids, and the budget ceilings the
    // parts inventory forbids showing as performance.
    for (const forbidden of [
      /\d+\s*%/,
      /success rate/i,
      /\bfaster\b/i,
      /\btime sav/i,
      /\badoption\b/i,
      /\b90 (?:run )?minutes\b/i,
      /\$\d/,
      /testimonial/i,
    ]) {
      await expect(page.getByText(forbidden)).toHaveCount(0);
    }
  });

  test("carries FIG. 1 as a complete, reachable drawing that does not link to itself", async ({
    page,
  }) => {
    await page.goto(route);

    const figure = page.locator("figure").filter({ hasText: "FIG. 1" });
    await expect(figure).toContainText("Loopworks");

    // The plates say nothing to assistive technology; the description, the
    // caption, and the numeral table carry the whole drawing in text.
    const plates = figure.locator("svg");
    expect(await plates.count()).toBeGreaterThan(0);
    for (const plate of await plates.all()) {
      await expect(plate).toHaveAttribute("aria-hidden", "true");
    }
    await expect(figure).toContainText("Thirteen numbered parts");

    const numerals = figure.getByRole("button");
    await expect(numerals).toHaveCount(13);

    // A figure on its own page does not offer a way to reach its own page.
    await expect(page.getByRole("link", { name: /^Read FIG\./ })).toHaveCount(
      0,
    );

    const annotation = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.style.color = "var(--annotation)";
      document.body.append(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    });

    const planning = numerals.filter({ hasText: "Planning" }).first();
    const restingColor = await planning.evaluate(
      element => getComputedStyle(element).color,
    );
    expect(restingColor).not.toBe(annotation);

    await planning.click();
    await expect(planning).toHaveCSS("color", annotation);
    await expect(planning).toHaveAttribute("aria-pressed", "true");
    await expect(figure.locator("p.type-body")).toContainText(
      "acceptance criteria",
    );
  });

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`holds both themes, one annotation, and reduced motion at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      const sheetContent = await page.getByRole("main").evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          left: bounds.left + Number.parseFloat(style.paddingLeft),
          right: bounds.right - Number.parseFloat(style.paddingRight),
        };
      });
      const surfaceBounds = await page
        .getByTestId("evidence-panel")
        .evaluateAll(elements =>
          elements.map(element => {
            const bounds = element.getBoundingClientRect();
            return { left: bounds.left, right: bounds.right };
          }),
        );
      for (const bounds of surfaceBounds) {
        expect(bounds.left, JSON.stringify(bounds)).toBeGreaterThanOrEqual(
          sheetContent.left - 1,
        );
        expect(bounds.right, JSON.stringify(bounds)).toBeLessThanOrEqual(
          sheetContent.right + 1,
        );
      }

      const returnLink = page.getByRole("link", {
        name: "Return to index",
        exact: true,
      });
      const transitionDuration = await returnLink.evaluate(element =>
        Number.parseFloat(getComputedStyle(element).transitionDuration),
      );
      expect(transitionDuration).toBeLessThanOrEqual(0.001);

      const readTheme = async () => ({
        background: await page
          .locator("body")
          .evaluate(element => getComputedStyle(element).backgroundColor),
        body: await page
          .getByTestId("case-study-section")
          .first()
          .locator(".type-body")
          .first()
          .evaluate(element => getComputedStyle(element).color),
        label: await page
          .locator(".type-label")
          .first()
          .evaluate(element => getComputedStyle(element).color),
        code: await page
          .locator("code.type-code")
          .first()
          .evaluate(element => getComputedStyle(element).color),
        rule: await page
          .getByTestId("evidence-panel")
          .first()
          .evaluate(element => getComputedStyle(element).borderLeftColor),
        // Resting annotations, counted as logical controls. One vermilion
        // element at rest is the ceiling; the figure holds none until a part
        // is taken.
        annotations: await page.locator("body *").evaluateAll(elements => {
          const probe = document.createElement("span");
          probe.style.color = "var(--annotation)";
          document.body.append(probe);
          const annotation = getComputedStyle(probe).color;
          probe.remove();

          const annotated = elements.filter(element => {
            const style = getComputedStyle(element);
            return [
              style.color,
              style.borderColor,
              style.backgroundColor,
              style.fill,
              style.stroke,
            ].includes(annotation);
          });
          const logical = new Set(
            annotated.map(
              element => element.closest("button, a, [role]") ?? element,
            ),
          );
          return Array.from(logical, element => ({
            tag: element.tagName.toLowerCase(),
            className: element.getAttribute("class"),
          }));
        }),
      });

      await expect(page.locator("html")).not.toHaveClass(/dark/);
      const paper = await readTheme();
      await page
        .getByRole("button", {
          name: "Switch to the blueprint medium",
          exact: true,
        })
        .click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      await page
        .getByRole("button", { name: /Switch to the paper medium/ })
        .blur();
      const blueprint = await readTheme();

      expect(blueprint.background).not.toBe(paper.background);
      for (const theme of [paper, blueprint]) {
        for (const textColor of [theme.body, theme.label, theme.code]) {
          expect(
            contrastRatio(textColor, theme.background),
          ).toBeGreaterThanOrEqual(4.5);
        }
        expect(
          contrastRatio(theme.rule, theme.background),
        ).toBeGreaterThanOrEqual(3);
        expect(
          theme.annotations.length,
          JSON.stringify(theme.annotations),
        ).toBeLessThanOrEqual(1);
      }
    });
  }

  test("publishes the route in the sitemap", async ({ request }) => {
    const response = await request.get("/sitemap.xml");

    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain(route);
  });
});
