import { test, expect } from "@playwright/test";

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
      stroke: await firstBox.evaluate(
        element => getComputedStyle(element).stroke,
      ),
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
