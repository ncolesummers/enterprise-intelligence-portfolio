import { test, expect } from "@playwright/test";

import { contrastRatio, readComputedColor } from "../fixtures/contrast";

test.describe("FIG. 3 MyUI index plate", () => {
  test("states only that custom React components sit inside Ellucian Experience", async ({
    page,
  }) => {
    await page.goto("/");

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 3", { exact: true }) });
    const semanticFigure = figure.getByRole("figure");
    const plate = figure.locator("svg.fig-plate");

    await expect(figure.getByText("MyUI", { exact: true })).toBeVisible();
    await expect(
      semanticFigure.getByText(
        "Custom React components are seated inside the Ellucian Experience shell; the platform is not owned by the University of Idaho.",
        { exact: true },
      ),
    ).toBeAttached();
    await expect(plate).toHaveAttribute("viewBox", "0 0 320 170");
    await expect(plate).toHaveAttribute("aria-hidden", "true");
    await expect(
      plate.getByText("Ellucian Experience", { exact: true }),
    ).toBeVisible();
    await expect(
      plate.getByText("Custom React components", { exact: true }),
    ).toBeVisible();
    await expect(plate.getByText("Plate in preparation")).toHaveCount(0);
    await expect(plate.locator('[data-part="ellucian-shell"]')).toHaveCount(1);
    await expect(
      plate.locator('[data-part="custom-react-component-layer"]'),
    ).toHaveCount(1);
    await expect(plate.locator("rect.fig-box")).toHaveCount(2);
    await expect(plate.locator("line, polygon, path, circle")).toHaveCount(0);
    expect(await plate.locator("text").allTextContents()).toEqual([
      "Ellucian Experience",
      "Custom React components",
    ]);

    const geometry = await plate.locator("rect.fig-box").evaluateAll(rects =>
      rects.map(rect => ({
        x: Number(rect.getAttribute("x")),
        y: Number(rect.getAttribute("y")),
        width: Number(rect.getAttribute("width")),
        height: Number(rect.getAttribute("height")),
      })),
    );
    const [shell, componentLayer] = geometry;
    expect(componentLayer.x).toBeGreaterThan(shell.x);
    expect(componentLayer.y).toBeGreaterThan(shell.y);
    expect(componentLayer.x + componentLayer.width).toBeLessThan(
      shell.x + shell.width,
    );
    expect(componentLayer.y + componentLayer.height).toBeLessThan(
      shell.y + shell.height,
    );
  });

  test("uses distinct AA-contrast text fills in both media", async ({
    page,
  }) => {
    await page.goto("/");

    const figure = page
      .locator("article")
      .filter({ has: page.getByText("FIG. 3", { exact: true }) });
    const plate = figure.locator("svg.fig-plate");
    const shell = plate.locator("rect.fig-box").first();

    await expect(plate).toBeVisible();
    const readColors = async () => ({
      ground: await readComputedColor(page.locator("body"), "backgroundColor"),
      label: await readComputedColor(plate.locator(".fig-box-label"), "fill"),
      sublabel: await readComputedColor(plate.locator(".fig-box-sub"), "fill"),
      stroke: await readComputedColor(shell, "stroke"),
      strokeWidth: await shell.evaluate(element =>
        Number.parseFloat(getComputedStyle(element).strokeWidth),
      ),
    });
    const paper = await readColors();

    await page
      .getByRole("button", { name: "Switch to the blueprint medium" })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);
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
      expect(
        contrastRatio(medium.stroke, medium.ground),
      ).toBeGreaterThanOrEqual(3);
      expect(medium.strokeWidth).toBeGreaterThanOrEqual(1);
    }
  });

  for (const viewport of [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1440, height: 1200 },
  ]) {
    test(`stays within its FIG. 3 cell at ${viewport.name} width`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const figure = page
        .locator("article")
        .filter({ has: page.getByText("FIG. 3", { exact: true }) });
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
