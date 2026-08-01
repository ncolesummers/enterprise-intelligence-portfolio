import { test, expect } from "@playwright/test";

import { contrastRatio, readResolved } from "../fixtures/contrast";

test.describe("FIG. 4 AI data extraction research index plate", () => {
  test("states only the substantiated feasibility spike", async ({ page }) => {
    await page.goto("/");

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 4", { exact: true }) });
    const semanticFigure = figure.getByRole("figure");
    const plate = figure.locator("svg.fig-plate");

    await expect(
      figure.getByText("AI data extraction research", { exact: true }),
    ).toBeVisible();
    await expect(
      semanticFigure.getByText(
        "Source pages pass through a LangGraph extraction step into structured profiles, followed by verification against the source. The research spike asked a feasibility question and checked the output.",
        { exact: true },
      ),
    ).toBeAttached();
    await expect(plate).toHaveAttribute("viewBox", "0 0 320 170");
    await expect(plate).toHaveAttribute("aria-hidden", "true");
    await expect(plate.getByText("Plate in preparation")).toHaveCount(0);
    await expect(plate.locator("rect.fig-box")).toHaveCount(4);
    await expect(plate.locator("line.fig-flow")).toHaveCount(3);
    await expect(plate.locator("polygon.fig-arrowhead")).toHaveCount(3);
    await expect(
      plate.locator("path, circle, ellipse, polyline, image"),
    ).toHaveCount(0);
    expect(await plate.locator("text").allTextContents()).toEqual([
      "Feasibility question",
      "Source",
      "pages",
      "LangGraph",
      "extraction",
      "Structured",
      "profiles",
      "Verification",
      "source check",
    ]);

    for (const part of [
      "source-pages",
      "langgraph-extraction",
      "structured-profiles",
      "verification",
    ]) {
      await expect(plate.locator(`[data-part="${part}"]`)).toHaveCount(1);
    }

    const geometry = await plate.locator("rect.fig-box").evaluateAll(rects =>
      rects.map(rect => ({
        x: Number(rect.getAttribute("x")),
        y: Number(rect.getAttribute("y")),
        width: Number(rect.getAttribute("width")),
        height: Number(rect.getAttribute("height")),
      })),
    );
    expect(geometry).toHaveLength(4);
    for (const [index, box] of geometry.entries()) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(320);
      expect(box.y + box.height).toBeLessThanOrEqual(170);
      if (index > 0) {
        expect(box.x).toBeGreaterThan(
          geometry[index - 1].x + geometry[index - 1].width,
        );
      }
    }

    const allPlateText = (await plate.textContent()) ?? "";
    expect(allPlateText).not.toMatch(/\d+(?:\.\d+)?%|\$\d|per profile/i);
    expect(allPlateText).not.toMatch(
      /name|email|phone|student|faculty|staff|production|scale|deployment/i,
    );
  });

  test("keeps every box description clear of its enclosing rule", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 4", { exact: true }) });
    const plate = figure.locator("svg.fig-plate");
    const boxes = await plate.locator("rect.fig-box").evaluateAll(rects =>
      rects.map(rect => {
        const rule = rect.getBoundingClientRect();
        const halfStroke =
          Number.parseFloat(getComputedStyle(rect).strokeWidth) / 2;
        const label = rect.nextElementSibling;
        const description =
          label?.nextElementSibling as SVGGraphicsElement | null;

        if (
          !label?.matches("text.fig-box-label") ||
          !description?.matches("text.fig-box-sub")
        ) {
          throw new Error(
            "Each FIG. 4 box must be followed by its label and description",
          );
        }

        const text = description.getBoundingClientRect();

        return {
          part: rect.getAttribute("data-part"),
          halfStroke,
          rule: {
            left: rule.left,
            right: rule.right,
            top: rule.top,
            bottom: rule.bottom,
          },
          text: {
            value: description.textContent,
            left: text.left,
            right: text.right,
            top: text.top,
            bottom: text.bottom,
          },
        };
      }),
    );

    expect(boxes).toHaveLength(4);
    for (const box of boxes) {
      expect
        .soft(box.text.left, `${box.part}: ${box.text.value} left`)
        .toBeGreaterThanOrEqual(box.rule.left + box.halfStroke);
      expect
        .soft(box.text.right, `${box.part}: ${box.text.value} right`)
        .toBeLessThanOrEqual(box.rule.right - box.halfStroke);
      expect
        .soft(box.text.top, `${box.part}: ${box.text.value} top`)
        .toBeGreaterThanOrEqual(box.rule.top + box.halfStroke);
      expect
        .soft(box.text.bottom, `${box.part}: ${box.text.value} bottom`)
        .toBeLessThanOrEqual(box.rule.bottom - box.halfStroke);
    }
  });

  test("uses AA-contrast text and reproducible line weights in both media", async ({
    page,
  }) => {
    await page.goto("/");

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 4", { exact: true }) });
    const plate = figure.locator("svg.fig-plate");

    await expect(plate).toBeVisible();
    // One poll around the whole set, so the colours are consistent with each
    // other: polling each separately can straddle the medium switch below and
    // measure a paper label against a blueprint ground.
    const readColorsAndStrokes = () =>
      readResolved(
        async () => ({
          ground: await page
            .locator("body")
            .evaluate(element => getComputedStyle(element).backgroundColor),
          label: await plate
            .locator(".fig-box-label")
            .first()
            .evaluate(element => getComputedStyle(element).fill),
          sublabel: await plate
            .locator(".fig-box-sub")
            .first()
            .evaluate(element => getComputedStyle(element).fill),
          zone: await plate
            .locator(".fig-zone")
            .evaluate(element => getComputedStyle(element).fill),
          strokes: await plate
            .locator("rect.fig-box, line.fig-flow")
            .evaluateAll(elements =>
              elements.map(element => ({
                color: getComputedStyle(element).stroke,
                width: Number.parseFloat(getComputedStyle(element).strokeWidth),
              })),
            ),
        }),
        value => [
          value.ground,
          value.label,
          value.sublabel,
          value.zone,
          ...value.strokes.map(stroke => stroke.color),
        ],
      );
    const paper = await readColorsAndStrokes();

    await page
      .getByRole("button", { name: "Switch to the blueprint medium" })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    const blueprint = await readColorsAndStrokes();

    expect(blueprint.strokes[0].color).not.toBe(paper.strokes[0].color);
    for (const medium of [paper, blueprint]) {
      for (const textColor of [medium.label, medium.sublabel, medium.zone]) {
        expect(contrastRatio(textColor, medium.ground)).toBeGreaterThanOrEqual(
          4.5,
        );
      }
      for (const stroke of medium.strokes) {
        expect(stroke.color).not.toBe("none");
        expect(
          contrastRatio(stroke.color, medium.ground),
        ).toBeGreaterThanOrEqual(3);
        expect(stroke.width).toBeGreaterThanOrEqual(1);
      }
    }
  });

  for (const viewport of [
    { name: "mobile", width: 375, height: 667 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1200 },
  ]) {
    test(`stays within its FIG. 4 cell at ${viewport.name} width`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const figure = page
        .locator("article")
        .filter({ has: page.getByText("FIG. 4", { exact: true }) });
      const plate = figure.locator("svg.fig-plate");
      const bounds = await plate.evaluate(svg => {
        const plateRect = svg.getBoundingClientRect();
        const cellRect = svg.closest("article")?.getBoundingClientRect();
        const textRects = Array.from(svg.querySelectorAll("text"), text => {
          const rect = text.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
          };
        });
        return {
          cell: cellRect && {
            left: cellRect.left,
            right: cellRect.right,
            top: cellRect.top,
            bottom: cellRect.bottom,
          },
          plate: {
            left: plateRect.left,
            right: plateRect.right,
            top: plateRect.top,
            bottom: plateRect.bottom,
            scrollWidth: svg.scrollWidth,
            clientWidth: svg.clientWidth,
          },
          textRects,
        };
      });

      expect(bounds.cell).not.toBeNull();
      expect(bounds.plate.left).toBeGreaterThanOrEqual(bounds.cell!.left);
      expect(bounds.plate.right).toBeLessThanOrEqual(bounds.cell!.right);
      expect(bounds.plate.top).toBeGreaterThanOrEqual(bounds.cell!.top);
      expect(bounds.plate.bottom).toBeLessThanOrEqual(bounds.cell!.bottom);
      expect(bounds.plate.scrollWidth).toBeLessThanOrEqual(
        bounds.plate.clientWidth,
      );
      for (const text of bounds.textRects) {
        expect(text.left).toBeGreaterThanOrEqual(bounds.plate.left);
        expect(text.right).toBeLessThanOrEqual(bounds.plate.right);
        expect(text.top).toBeGreaterThanOrEqual(bounds.plate.top);
        expect(text.bottom).toBeLessThanOrEqual(bounds.plate.bottom);
      }
    });
  }
});
