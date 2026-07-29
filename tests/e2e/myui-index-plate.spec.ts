import { test, expect } from "@playwright/test";

const relativeLuminance = (color: string) => {
  const channels = color
    .match(/[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);
  if (!channels || channels.length !== 3) {
    throw new Error(`Expected an RGB color, received ${color}`);
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
  if (rgb) {
    const [red, green, blue] = rgb.map(channel =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }

  throw new Error(`Unsupported computed color syntax: ${color}`);
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
      ground: await page
        .locator("body")
        .evaluate(element => getComputedStyle(element).backgroundColor),
      label: await plate
        .locator(".fig-box-label")
        .evaluate(element => getComputedStyle(element).fill),
      sublabel: await plate
        .locator(".fig-box-sub")
        .evaluate(element => getComputedStyle(element).fill),
      stroke: await shell.evaluate(element => getComputedStyle(element).stroke),
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
