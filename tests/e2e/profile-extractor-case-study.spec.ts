import { expect, test, type Page } from "@playwright/test";

import { isIgnorableExternalResourceConsoleError } from "../fixtures/runtime-health";

const route = "/projects/profile-extractor";

type Rgba = [number, number, number, number];

function linearToSrgb(channel: number) {
  return channel <= 0.0031308
    ? 12.92 * channel
    : 1.055 * channel ** (1 / 2.4) - 0.055;
}

function labToSrgb(lightness: number, a: number, b: number): Rgba {
  const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;

  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    1,
  ].map((channel, index) =>
    index === 3 ? channel : Math.min(1, Math.max(0, channel)),
  ) as Rgba;
}

function parseCssColor(color: string): Rgba {
  const normalized = color.trim().toLowerCase();
  if (normalized === "transparent") return [0, 0, 0, 0];

  const rgb = normalized.match(/^rgba?\((.+)\)$/);
  if (rgb) {
    const [channels, alpha = "1"] = rgb[1]
      .split("/")
      .map(value => value.trim());
    const values = channels.split(/[\s,]+/).map(Number);
    return [values[0] / 255, values[1] / 255, values[2] / 255, Number(alpha)];
  }

  const srgb = normalized.match(/^color\(srgb\s+(.+)\)$/);
  if (srgb) {
    const [channels, alpha = "1"] = srgb[1]
      .split("/")
      .map(value => value.trim());
    const values = channels.split(/\s+/).map(Number);
    return [values[0], values[1], values[2], Number(alpha)];
  }

  const oklch = normalized.match(/^oklch\((.+)\)$/);
  if (oklch) {
    const [channels, alpha = "1"] = oklch[1]
      .split("/")
      .map(value => value.trim());
    const [lightness, chroma, hue] = channels.split(/\s+/).map(Number);
    const radians = (hue * Math.PI) / 180;
    const result = labToSrgb(
      lightness,
      chroma * Math.cos(radians),
      chroma * Math.sin(radians),
    );
    result[3] = Number(alpha);
    return result;
  }

  const oklab = normalized.match(/^oklab\((.+)\)$/);
  if (oklab) {
    const [channels, alpha = "1"] = oklab[1]
      .split("/")
      .map(value => value.trim());
    const [lightness, a, b] = channels.split(/\s+/).map(Number);
    const result = labToSrgb(lightness, a, b);
    result[3] = Number(alpha);
    return result;
  }

  throw new Error(`Unsupported computed color: ${color}`);
}

function contrastRatio(foreground: string, background: string) {
  const fg = parseCssColor(foreground);
  const bg = parseCssColor(background);
  const composite = fg
    .slice(0, 3)
    .map((channel, index) => channel * fg[3] + bg[index] * (1 - fg[3]));
  const luminance = (channels: number[]) => {
    const linear = channels.map(channel =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const foregroundLuminance = luminance(composite);
  const backgroundLuminance = luminance(bg);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

async function expectSectionEvidence(
  page: Page,
  sectionName: string,
  patterns: RegExp[],
) {
  const section = page.getByTestId("case-study-section").filter({
    has: page.getByRole("heading", { level: 2, name: sectionName }),
  });
  await expect(section).toHaveCount(1);
  for (const pattern of patterns) {
    await expect(section.getByText(pattern).first()).toBeVisible();
  }
  return section;
}

async function expectContentBounds(page: Page) {
  const violations = await page
    .locator(
      "[data-testid='case-study-section'] h2, [data-testid='evidence-panel'], [data-testid='evidence-panel'] h3, [data-testid='evidence-panel'] h4, [data-testid='evidence-panel'] pre",
    )
    .evaluateAll(elements => {
      const main = document.querySelector("main")!;
      const mainRect = main.getBoundingClientRect();
      const mainStyle = getComputedStyle(main);
      const left = mainRect.left + Number.parseFloat(mainStyle.paddingLeft);
      const right = mainRect.right - Number.parseFloat(mainStyle.paddingRight);

      return elements.flatMap(element => {
        const rect = element.getBoundingClientRect();
        return rect.left < left - 1 || rect.right > right + 1
          ? [
              {
                tag: element.tagName,
                text: element.textContent?.trim().slice(0, 60),
                left: rect.left,
                right: rect.right,
                contentLeft: left,
                contentRight: right,
              },
            ]
          : [];
      });
    });
  expect(violations).toEqual([]);
}

async function expectVisualSystemGuards(page: Page) {
  const result = await page.evaluate(() => {
    const visible = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };
    const annotationProbe = document.createElement("span");
    annotationProbe.style.color = "var(--annotation)";
    document.body.append(annotationProbe);
    const annotation = getComputedStyle(annotationProbe).color;
    annotationProbe.remove();

    const annotationElements = Array.from(document.body.querySelectorAll("*"))
      .filter(visible)
      .filter(element => {
        const style = getComputedStyle(element);
        return (
          style.color === annotation ||
          style.backgroundColor === annotation ||
          ["Top", "Right", "Bottom", "Left"].some(
            side =>
              style[`border${side}Style` as keyof CSSStyleDeclaration] !==
                "none" &&
              style[`border${side}Color` as keyof CSSStyleDeclaration] ===
                annotation,
          )
        );
      });

    const forbiddenColorClass =
      /^(?:text|bg|border)-(?:primary|secondary|accent|destructive|muted|card|white|black|gray|grey|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:$|\/|-)/;
    const arbitraryColorClass =
      /^(?:text|bg|border)-\[(?:#|rgb|hsl|oklch|oklab|color)/;
    const colorClassViolations = Array.from(
      document.querySelectorAll("main [class]"),
    ).flatMap(element =>
      Array.from(element.classList)
        .filter(
          className =>
            forbiddenColorClass.test(className) ||
            arbitraryColorClass.test(className),
        )
        .map(className => ({ tag: element.tagName, className })),
    );
    const inlineColorViolations = Array.from(
      document.querySelectorAll<HTMLElement>("main [style]"),
    )
      .filter(element =>
        /(?:^|;)\s*(?:color|background|border(?:-color)?|fill|stroke)\s*:/.test(
          element.getAttribute("style") ?? "",
        ),
      )
      .map(element => element.getAttribute("style"));

    const literalCode = document.querySelector("pre code") as HTMLElement;
    const codeFont = getComputedStyle(literalCode).fontFamily;
    const monospaceOutsideCode = Array.from(document.querySelectorAll("main *"))
      .filter(visible)
      .filter(element => getComputedStyle(element).fontFamily === codeFont)
      .filter(
        element =>
          element.tagName !== "CODE" &&
          !(
            element.tagName === "PRE" && element.querySelector(":scope > code")
          ),
      )
      .map(element => element.tagName);

    return {
      annotationCount: annotationElements.length,
      colorClassViolations,
      inlineColorViolations,
      monospaceOutsideCode,
    };
  });

  expect(result.annotationCount).toBeLessThanOrEqual(1);
  expect(result.colorClassViolations).toEqual([]);
  expect(result.inlineColorViolations).toEqual([]);
  expect(result.monospaceOutsideCode).toEqual([]);
}

async function expectThemeContrast(page: Page) {
  const returnLink = page.getByRole("link", {
    name: "Return to index",
    exact: true,
  });
  await returnLink.focus();

  const colors = await page.evaluate(() => {
    const main = document.querySelector("main")!;
    const prose = main.querySelector(".type-body.text-line-soft")!;
    const panel = main.querySelector("[data-testid='evidence-panel']")!;
    const focused = document.activeElement!;
    const annotationProbe = document.createElement("span");
    annotationProbe.style.color = "var(--annotation)";
    document.body.append(annotationProbe);
    const result = {
      annotation: getComputedStyle(annotationProbe).color,
      background: getComputedStyle(document.body).backgroundColor,
      focus: getComputedStyle(focused).outlineColor,
      prose: getComputedStyle(prose).color,
      rule: getComputedStyle(panel).borderTopColor,
    };
    annotationProbe.remove();
    return result;
  });

  expect(contrastRatio(colors.prose, colors.background)).toBeGreaterThanOrEqual(
    4.5,
  );
  expect(
    contrastRatio(colors.annotation, colors.background),
  ).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(colors.rule, colors.background)).toBeGreaterThanOrEqual(
    3,
  );
  expect(contrastRatio(colors.focus, colors.background)).toBeGreaterThanOrEqual(
    3,
  );
}

test.describe("AI data extraction research case study", () => {
  test("presents the feasibility spike as employer-safe figure-sheet evidence", async ({
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
      name: "AI Data Extraction Research",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/type-display/);

    const sections = page.getByTestId("case-study-section");
    await expect(sections).toHaveCount(8);
    await expect(sections.getByRole("heading", { level: 2 })).toHaveText([
      "Introduction",
      "Project Overview",
      "Approach & Methodology",
      "Technical Implementation",
      "Results",
      "Recommendations",
      "Next Steps",
      "Conclusion",
    ]);

    const introduction = await expectSectionEvidence(page, "Introduction", [
      /feasibility study/i,
      /public source pages/i,
      /LangGraph extraction/i,
      /structured profiles/i,
      /separate verification pass/i,
    ]);
    const overview = await expectSectionEvidence(page, "Project Overview", [
      /workflow under test/i,
      /source pages/i,
      /separate verification pass/i,
    ]);
    await expectSectionEvidence(page, "Approach & Methodology", [
      /LangGraph state machine/i,
      /handle_error/i,
      /crawling constraints/i,
    ]);
    const implementation = await expectSectionEvidence(
      page,
      "Technical Implementation",
      [
        /ProfileData Schema/i,
        /ValidationResult Schema/i,
        /separate verification pass/i,
      ],
    );
    await expectSectionEvidence(page, "Results", [
      /recorded failures/i,
      /limitations & challenges/i,
      /schema boundaries/i,
    ]);
    const recommendations = await expectSectionEvidence(
      page,
      "Recommendations",
      [/questions still open/i, /human review workflow/i],
    );
    await expectSectionEvidence(page, "Next Steps", [
      /research follow-up/i,
      /decision boundary/i,
    ]);
    await expectSectionEvidence(page, "Conclusion", [
      /feasibility finding/i,
      /errors and limitations intact/i,
    ]);

    await expect(
      introduction.getByRole("list", { name: "Technology stack" }),
    ).toHaveCount(0);
    await expect(
      page.locator("header").getByRole("list", { name: "Technology stack" }),
    ).toHaveCount(0);
    await expect(
      overview.getByRole("list", { name: "Technology stack" }),
    ).toBeVisible();
    await expect(overview.getByText("Python", { exact: true })).toBeVisible();
    await expect(
      overview.getByText("LangGraph", { exact: true }),
    ).toBeVisible();
    await expect(overview.getByText("Pydantic", { exact: true })).toBeVisible();
    await expect(
      overview.getByText("LangSmith", { exact: true }),
    ).toBeVisible();

    await expect(page.getByText(/before any human judgment/i)).toHaveCount(0);
    await expect(page.getByText(/human review retained/i)).toHaveCount(0);
    await expect(page.getByText(/independent verification/i)).toHaveCount(0);
    await expect(page.getByText(/human review/i)).toHaveCount(1);
    await expect(
      recommendations.getByText(/human review workflow/i),
    ).toBeVisible();

    const evidencePanels = page.getByTestId("evidence-panel");
    expect(await evidencePanels.count()).toBeGreaterThanOrEqual(8);
    for (const panel of await evidencePanels.all()) {
      await expect(panel).toHaveClass(/rule-leader/);
      await expect(panel).toHaveCSS("border-radius", "0px");
      await expect(panel).toHaveCSS("box-shadow", "none");
    }

    const code = implementation.locator("pre code");
    await expect(code).toHaveCount(2);
    for (const block of await code.all()) {
      await expect(block).toHaveClass(/type-code/);
    }
    await expect(
      implementation.getByText("ProfileData Schema"),
    ).not.toHaveClass(/type-code/);
    await expect(implementation.getByText(/class ProfileData/)).toBeVisible();
    await expect(
      implementation.getByText(/class ValidationResult/),
    ).toBeVisible();

    await expect(main.getByRole("img")).toHaveCount(0);
    await expect(page.getByText(/faculty|staff|student/i)).toHaveCount(0);
    await expect(
      page.getByText(/92\.79|92\.8%|0\.0012|901 URLs|6\.6s/i),
    ).toHaveCount(0);
    await expect(page.getByText(/success rate|high accuracy/i)).toHaveCount(0);
    await expect(page.getByText(/full-scale implementation/i)).toHaveCount(0);
    await expect(page.getByText(/proven highly feasible/i)).toHaveCount(0);
    await expect(
      page.getByText("Interested in similar solutions?"),
    ).toHaveCount(0);

    expect(consoleErrors).toEqual([]);
  });

  test("keeps the reading path keyboard operable", async ({ page }) => {
    await page.goto(route);

    const returnLink = page.getByRole("link", {
      name: "Return to index",
      exact: true,
    });
    await returnLink.focus();
    await expect(returnLink).toBeFocused();
    await expect(returnLink).toHaveCSS("outline-style", "solid");
    await returnLink.press("Enter");
    await expect(page).toHaveURL(/\/#work$/);
  });

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`holds both themes and reduced motion at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      await expectContentBounds(page);

      const sections = page.getByTestId("case-study-section");
      for (const section of await sections.all()) {
        await expect(section).toBeVisible();
        await expect(section).toHaveCSS("opacity", "1");
        await expect(section).toHaveCSS("transform", "none");
      }

      const returnLink = page.getByRole("link", {
        name: "Return to index",
        exact: true,
      });
      const transitionDuration = await returnLink.evaluate(element =>
        Number.parseFloat(getComputedStyle(element).transitionDuration),
      );
      expect(transitionDuration).toBeLessThanOrEqual(0.001);

      await expect(page.locator("html")).not.toHaveClass(/dark/);
      await expectVisualSystemGuards(page);
      await expectThemeContrast(page);
      const paperBackground = await page
        .locator("body")
        .evaluate(element => getComputedStyle(element).backgroundColor);
      await page
        .getByRole("button", {
          name: "Switch to the blueprint medium",
          exact: true,
        })
        .click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      await page.mouse.move(0, 0);
      const blueprintBackground = await page
        .locator("body")
        .evaluate(element => getComputedStyle(element).backgroundColor);
      expect(blueprintBackground).not.toBe(paperBackground);
      await expectContentBounds(page);
      await expectVisualSystemGuards(page);
      await expectThemeContrast(page);
    });
  }
});
