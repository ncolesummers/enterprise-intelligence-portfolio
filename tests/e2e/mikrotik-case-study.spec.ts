import { expect, test } from "@playwright/test";

import { contrastRatio, readResolved } from "../fixtures/contrast";
import { isIgnorableExternalResourceConsoleError } from "../fixtures/runtime-health";

const route = "/projects/mikrotik-config-gen";

test.describe("Mikrotik configuration generator case study", () => {
  test("binds distinct substantiated evidence to every incumbent section", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", message => {
      if (
        message.type() === "error" &&
        !isIgnorableExternalResourceConsoleError(message.text())
      ) {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(route);

    const main = page.getByRole("main");
    await expect(main).toHaveAttribute("id", "main-content");

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Mikrotik Configuration Generator",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/type-display/);
    await expect(heading).not.toHaveClass(/\bmt-8\b/);

    const presentation = page.getByRole("link", {
      name: "View presentation",
      exact: true,
    });
    await expect(presentation).toHaveAttribute(
      "href",
      "https://presentation.ncolesummers.com",
    );
    await expect(presentation).toHaveAttribute("rel", /noopener/);
    await presentation.focus();
    await expect(presentation).toBeFocused();
    await expect(presentation).toHaveCSS("outline-style", "solid");
    await expect(presentation).toHaveCSS("outline-width", "2px");

    const sections = page.getByTestId("case-study-section");
    await expect(sections.getByRole("heading", { level: 2 })).toHaveText([
      "Introduction",
      "Project Overview",
      "Challenges Faced",
      "Solutions Implemented",
      "Results Achieved",
      "Conclusion",
    ]);
    const sectionNamed = (name: string) =>
      sections.filter({
        has: page.getByRole("heading", { level: 2, name, exact: true }),
      });

    const introduction = sectionNamed("Introduction");
    await expect(introduction).toContainText("First Step Internet");
    await expect(introduction).toContainText("work offline");
    await expect(introduction).toContainText("self-contained");

    const overview = sectionNamed("Project Overview");
    await expect(overview).toContainText("Python console application");
    await expect(overview).toContainText("Go and Wails");
    await expect(
      overview.getByRole("img", {
        name: "Mikrotik Configuration Generator desktop interface",
      }),
    ).toBeVisible();
    await expect(
      overview.getByRole("list", { name: "Technology stack" }),
    ).toContainText("HTML templates");
    const technologyHeading = overview.getByRole("heading", {
      level: 3,
      name: "Technology stack",
    });
    await expect(technologyHeading).toHaveClass(/\bmb-2\b/);
    await expect(technologyHeading.locator("..")).toHaveClass(/\bp-4\b/);

    const challenges = sectionNamed("Challenges Faced");
    await expect(challenges.getByRole("heading", { level: 3 })).toHaveText([
      "Technical requirements",
      "User experience",
      "Cross-platform compatibility",
      "Framework exploration",
    ]);
    await expect(challenges).toContainText("target laptops");
    await expect(challenges).toContainText("single-file executable");

    const solutions = sectionNamed("Solutions Implemented");
    await expect(
      solutions.getByRole("heading", {
        level: 3,
        name: "Version 1.0: Python console program",
      }),
    ).toBeVisible();
    await expect(
      solutions.getByRole("heading", {
        level: 3,
        name: "Version 2.0: Go with Wails",
      }),
    ).toBeVisible();
    await expect(solutions).toContainText("embedded filesystem");
    await expect(solutions).toContainText("standard library templates");
    const pythonExcerpt = solutions.locator("pre code").first();
    await expect(pythonExcerpt).toContainText("def input_validation");
    await expect(pythonExcerpt).toContainText(
      "# syntax_breakers dictionary omitted from this excerpt",
    );
    await expect(pythonExcerpt).toContainText(
      "x = x.replace(c, syntax_breakers.get(c))",
    );
    await expect(solutions.locator("pre code").nth(1)).toContainText(
      "app.Bind(builder.BuildRouter)",
    );

    const results = sectionNamed("Results Achieved");
    await expect(results).toContainText(
      "The verifiable result is a self-contained desktop application",
    );
    await expect(results).toContainText(
      "No timing, error-rate, adoption, or training metrics are claimed",
    );
    await expect(results).toContainText("standardized configuration scripts");

    const conclusion = sectionNamed("Conclusion");
    await expect(conclusion).toContainText(
      "offline, self-contained, and cross-platform constraints",
    );
    await expect(conclusion).toContainText("Python console program");
    await expect(conclusion).toContainText("Go and Wails application");

    for (const panel of await page.getByTestId("evidence-panel").all()) {
      await expect(panel).toHaveClass(/rule-leader/);
      await expect(panel).toHaveCSS("border-radius", "0px");
      await expect(panel).toHaveCSS("box-shadow", "none");
    }

    await expect(page.getByText(/significantly reduced/i)).toHaveCount(0);
    await expect(page.getByText(/fewer errors/i)).toHaveCount(0);
    await expect(page.getByText(/minimal training/i)).toHaveCount(0);
    await expect(page.getByText(/optimal solution/i)).toHaveCount(0);
    await expect(page.getByText("Interested in learning more?")).toHaveCount(0);
    await expect(page.getByText(/adding animations/i)).toHaveCount(0);
    await expect(presentation).toHaveCount(1);
    expect(consoleErrors).toEqual([]);
  });

  test("uses Monaspace only for the two literal code samples", async ({
    page,
  }) => {
    await page.goto(route);

    const codeBlocks = page.getByTestId("evidence-code");
    await expect(codeBlocks).toHaveCount(2);
    for (const block of await codeBlocks.all()) {
      await expect(block).toHaveClass(/rule-leader/);
      await expect(block).toHaveCSS("border-radius", "0px");
      await expect(block).toHaveCSS("box-shadow", "none");
      await expect(block.locator("pre")).not.toHaveClass(/type-code/);

      const literalCode = block.locator("code");
      await expect(literalCode).toHaveClass(/type-code/);
      const typography = await literalCode.evaluate(element => {
        const style = getComputedStyle(element);
        return {
          family: style.fontFamily,
          features: style.fontFeatureSettings,
        };
      });
      expect(typography.family).toMatch(
        /^"Portfolio Code", "Monaspace Fallback"/,
      );
      expect(typography.features).toMatch(/"liga"(?: 1)?/);
      expect(typography.features).toMatch(/"calt"(?: 1)?/);
    }

    const body = page
      .getByTestId("case-study-section")
      .first()
      .locator("p")
      .first();
    const heading = page.getByRole("heading", {
      level: 2,
      name: "Solutions Implemented",
    });
    await expect(body).not.toHaveClass(/type-code/);
    await expect(heading).not.toHaveClass(/type-code/);
  });

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`holds both themes, one annotation, and reduced motion at ${viewport.name}`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", message => {
        if (
          message.type() === "error" &&
          !isIgnorableExternalResourceConsoleError(message.text())
        ) {
          consoleErrors.push(message.text());
        }
      });

      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      const interfaceImage = page.getByRole("img", {
        name: "Mikrotik Configuration Generator desktop interface",
      });
      await interfaceImage.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          interfaceImage.evaluate(
            image =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
      const decodedImage = await interfaceImage.evaluate(image => ({
        naturalWidth: (image as HTMLImageElement).naturalWidth,
      }));
      expect(decodedImage.naturalWidth).toBeGreaterThan(0);

      const sheetContent = await page.getByRole("main").evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          left: bounds.left + Number.parseFloat(style.paddingLeft),
          right: bounds.right - Number.parseFloat(style.paddingRight),
        };
      });
      const boundedSurfaces = page.locator(
        '[data-testid="evidence-panel"], [data-testid="evidence-code"], img[alt="Mikrotik Configuration Generator desktop interface"]',
      );
      const surfaceBounds = await boundedSurfaces.evaluateAll(elements =>
        elements.map(element => {
          const bounds = element.getBoundingClientRect();
          return {
            left: bounds.left,
            right: bounds.right,
            testId: element.getAttribute("data-testid"),
            tag: element.tagName.toLowerCase(),
          };
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

      const firstSection = page.getByTestId("case-study-section").first();
      await expect(firstSection).toBeVisible();
      await expect(firstSection).toHaveCSS("opacity", "1");
      await expect(firstSection).toHaveCSS("transform", "none");

      const returnLink = page.getByRole("link", {
        name: "Return to index",
        exact: true,
      });
      const transitionDuration = await returnLink.evaluate(element =>
        Number.parseFloat(getComputedStyle(element).transitionDuration),
      );
      expect(transitionDuration).toBeLessThanOrEqual(0.001);

      // One poll around the whole set. Each colour here is compared against
      // another one in it, so they have to come from the same moment: polling
      // them separately could straddle the medium switch below and measure a
      // paper foreground against a blueprint ground. The focus and blur are
      // idempotent, so repeating the read costs nothing.
      const readTheme = () =>
        readResolved(readThemeOnce, value => [
          value.background,
          value.body,
          value.rule,
          value.annotation,
          value.code,
          value.label,
          value.focusOutline,
          ...Object.values(value.accentRoles),
        ]);

      const readThemeOnce = async () => {
        const presentation = page.getByRole("link", {
          name: "View presentation",
          exact: true,
        });
        await presentation.focus();
        const focusOutline = await presentation.evaluate(
          element => getComputedStyle(element).outlineColor,
        );
        await presentation.blur();

        return {
          background: await page
            .locator("body")
            .evaluate(element => getComputedStyle(element).backgroundColor),
          body: await firstSection
            .locator(".type-body")
            .first()
            .evaluate(element => getComputedStyle(element).color),
          rule: await page
            .getByTestId("evidence-panel")
            .first()
            .evaluate(element => getComputedStyle(element).borderLeftColor),
          annotation: await page.locator("body").evaluate(() => {
            const probe = document.createElement("span");
            probe.style.color = "var(--annotation)";
            document.body.append(probe);
            const color = getComputedStyle(probe).color;
            probe.remove();
            return color;
          }),
          code: await page
            .locator("code.type-code")
            .first()
            .evaluate(element => getComputedStyle(element).color),
          label: await page
            .getByRole("list", { name: "Technology stack" })
            .locator(".type-label")
            .first()
            .evaluate(element => getComputedStyle(element).color),
          focusOutline,
          accentRoles: await page.locator("body").evaluate(() => {
            const roles = [
              "--annotation",
              "--accent",
              "--destructive",
              "--ring",
            ];
            return Object.fromEntries(
              roles.map(role => {
                const probe = document.createElement("span");
                probe.style.color = `var(${role})`;
                document.body.append(probe);
                const color = getComputedStyle(probe).color;
                probe.remove();
                return [role, color];
              }),
            );
          }),
          annotations: await page.locator("body *").evaluateAll(elements => {
            const probe = document.createElement("span");
            probe.style.color = "var(--annotation)";
            document.body.append(probe);
            const annotation = getComputedStyle(probe).color;
            probe.remove();

            const annotatedElements = elements.filter(element => {
              const style = getComputedStyle(element);
              const restingColors = [
                style.color,
                style.borderColor,
                style.backgroundColor,
                style.fill,
                style.stroke,
              ];
              if (
                style.outlineStyle !== "none" &&
                Number.parseFloat(style.outlineWidth) > 0
              ) {
                restingColors.push(style.outlineColor);
              }
              return restingColors.includes(annotation);
            });

            const logicalAnnotations = new Set(
              annotatedElements.map(
                element => element.closest("button, a, [role]") ?? element,
              ),
            );
            return Array.from(logicalAnnotations, element => ({
              tag: element.tagName.toLowerCase(),
              className: element.getAttribute("class"),
            }));
          }),
        };
      };

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
      expect(
        contrastRatio(paper.body, paper.background),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(blueprint.body, blueprint.background),
      ).toBeGreaterThanOrEqual(4.5);
      for (const theme of [paper, blueprint]) {
        for (const textColor of [theme.code, theme.label]) {
          expect(
            contrastRatio(textColor, theme.background),
          ).toBeGreaterThanOrEqual(4.5);
        }
        for (const nonTextColor of [
          theme.rule,
          theme.annotation,
          theme.focusOutline,
        ]) {
          expect(
            contrastRatio(nonTextColor, theme.background),
          ).toBeGreaterThanOrEqual(3);
        }
        expect(new Set(Object.values(theme.accentRoles)).size).toBe(1);
      }
      expect(
        paper.annotations.length,
        JSON.stringify(paper.annotations),
      ).toBeLessThanOrEqual(1);
      expect(
        blueprint.annotations.length,
        JSON.stringify(blueprint.annotations),
      ).toBeLessThanOrEqual(1);
      expect(consoleErrors).toEqual([]);
    });
  }
});
