import { test, expect } from "@playwright/test";

import { contrastRatio, readComputedColor } from "../fixtures/contrast";

test.describe("FIG. 2 University of Idaho index plate", () => {
  test("states only the substantiated publishing path", async ({ page }) => {
    await page.goto("/");

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 2", { exact: true }) });
    const semanticFigure = figure.getByRole("figure");
    const plate = figure.locator("svg.fig-plate");

    await expect(figure.getByText("University of Idaho website")).toBeVisible();
    await expect(figure.getByText(/Sitecore, Next\.js/)).toBeVisible();
    await expect(
      semanticFigure.getByText(
        "Sitecore holds authored content. A separate Next.js application renders it for delivery on Azure.",
        { exact: true },
      ),
    ).toBeAttached();
    await expect(plate).toHaveAttribute("viewBox", "0 0 320 170");
    await expect(plate).toHaveAttribute("aria-hidden", "true");
    await expect(plate.getByText("Sitecore", { exact: true })).toBeVisible();
    await expect(
      plate.getByText("authored content", { exact: true }),
    ).toBeVisible();
    await expect(plate.getByText("Next.js", { exact: true })).toBeVisible();
    await expect(plate.getByText("renderer", { exact: true })).toBeVisible();
    await expect(plate.getByText("Azure", { exact: true })).toBeVisible();
    await expect(plate.getByText("delivery", { exact: true })).toBeVisible();
    await expect(plate.getByText("Plate in preparation")).toHaveCount(0);
    await expect(plate.locator("rect.fig-box")).toHaveCount(3);
    await expect(plate.locator("line.fig-flow")).toHaveCount(2);
    await expect(plate.locator("polygon.fig-arrowhead")).toHaveCount(2);
    expect(await plate.locator("text").allTextContents()).toEqual([
      "Sitecore",
      "authored content",
      "Next.js",
      "renderer",
      "Azure",
      "delivery",
    ]);
  });

  test("uses distinct AA-contrast text fills in both media", async ({
    page,
  }) => {
    await page.goto("/");

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 2", { exact: true }) });
    const plate = figure.locator("svg.fig-plate");
    const firstBox = plate.locator("rect.fig-box").first();

    await expect(plate).toBeVisible();
    const readColors = async () => ({
      ground: await readComputedColor(page.locator("body"), "backgroundColor"),
      label: await readComputedColor(
        plate.locator(".fig-box-label").first(),
        "fill",
      ),
      sublabel: await readComputedColor(
        plate.locator(".fig-box-sub").first(),
        "fill",
      ),
      stroke: await readComputedColor(firstBox, "stroke"),
    });
    const paper = await readColors();

    await page
      .getByRole("button", { name: "Switch to the blueprint medium" })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(plate).toBeVisible();

    const blueprint = await readColors();

    expect(blueprint.stroke).not.toBe(paper.stroke);
    expect([paper.stroke, blueprint.stroke]).not.toContain("none");
    for (const medium of [paper, blueprint]) {
      expect(contrastRatio(medium.label, medium.ground)).toBeGreaterThanOrEqual(
        4.5,
      );
      expect(
        contrastRatio(medium.sublabel, medium.ground),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  for (const viewport of [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1440, height: 1200 },
  ]) {
    test(`stays within its FIG. 2 cell at ${viewport.name} width`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const figure = page
        .locator("article")
        .filter({ has: page.getByText("FIG. 2", { exact: true }) });
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
