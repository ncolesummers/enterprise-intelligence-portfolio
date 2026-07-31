import { expect, type Locator } from "@playwright/test";

/**
 * Contrast math for the theme assertions.
 *
 * `myui-case-study` and `social-icons-accessibility` migrated off their local
 * copies when the intermittent contrast failure was traced here — their copies
 * were the ones that threw. Four specs still carry their own:
 * `myui-index-plate`, `uidaho-index-plate`, `profile-extractor-index-plate`,
 * and `mikrotik-case-study`. Those read `fill` and `stroke` off SVG rather than
 * colours across a theme switch, so they have not been seen to lose the race —
 * but they are exposed to the same one, and should adopt `readComputedColor`
 * whenever they are being read for another reason.
 *
 * Computed colors arrive in whatever syntax the browser chooses to serialize,
 * which is why every branch below exists.
 */

const oklabToLuminance = (lightness: number, a: number, b: number) => {
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const red = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const green = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const blue = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

/**
 * A computed colour that has not resolved yet.
 *
 * Two transients produce one: the stylesheet has not applied, so
 * `background-color: var(--ground)` is invalid at computed-value time and falls
 * back to the initial `transparent`; or the element was detached between the
 * locator resolving and the evaluate running, which every engine answers with an
 * empty string. Under parallel load Firefox is the one that loses these races,
 * which is what the intermittent contrast failure was.
 *
 * Neither may be parsed. A transparent background is not a valid contrast
 * operand, and widening the parser to accept one would turn a loud throw into a
 * silently wrong ratio. They are retried instead — see `readComputedColor`.
 */
export const isUnresolvedColor = (color: string) =>
  color.trim() === "" ||
  color === "transparent" ||
  /^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$/.test(color);

/**
 * Read a computed colour once it has actually resolved.
 *
 * `locator.evaluate` snapshots whatever is there at the moment it runs, and
 * under load that can be a colour the page has not settled on. Polling re-runs
 * the read against a freshly resolved locator, so a transient costs a retry
 * rather than the run. It still fails if the colour never resolves, which is
 * what would make it a product bug rather than a race.
 */
export const readComputedColor = async (
  locator: Locator,
  property: "color" | "backgroundColor" | "fill" | "stroke" | "borderLeftColor",
) => {
  let color = "";
  await expect
    .poll(async () => {
      color = await locator.evaluate(
        (element, name) => getComputedStyle(element)[name as "color"] as string,
        property,
      );
      return isUnresolvedColor(color);
    })
    .toBe(false);
  return color;
};

export const relativeLuminance = (color: string) => {
  if (isUnresolvedColor(color)) {
    throw new Error(
      `Computed color has not resolved: "${color}". This is a timing race, not a contrast failure — read it with readComputedColor().`,
    );
  }

  const channels = color
    .match(/-?[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);
  if (!channels || channels.length !== 3) {
    throw new Error(`Expected a color with three channels, received ${color}`);
  }

  if (color.startsWith("oklch(")) {
    const [lightness, chroma, hue] = channels;
    const angle = (hue * Math.PI) / 180;
    return oklabToLuminance(
      lightness,
      chroma * Math.cos(angle),
      chroma * Math.sin(angle),
    );
  }

  if (color.startsWith("oklab(")) {
    const [lightness, a, b] = channels;
    return oklabToLuminance(lightness, a, b);
  }

  // `rgba(` does not start with `rgb(` — index 3 is `a`, not `(` — so the two
  // are named separately. Missing that is what sent an unresolved
  // `rgba(0, 0, 0, 0)` down to the "unsupported syntax" throw.
  const rgb =
    color.startsWith("rgb(") || color.startsWith("rgba(")
      ? channels.map(channel => channel / 255)
      : color.startsWith("color(srgb ")
        ? channels
        : undefined;
  if (!rgb) throw new Error(`Unsupported computed color syntax: ${color}`);

  const [red, green, blue] = rgb.map(channel =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const contrastRatio = (foreground: string, background: string) => {
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
