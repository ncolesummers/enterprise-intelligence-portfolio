/**
 * Contrast math for the theme assertions.
 *
 * The incumbent case-study specs each carry their own copy of this. New specs
 * import it instead; the incumbents can adopt it whenever their specs are being
 * read for another reason, since moving them is a pure deduplication with no
 * behavioural change and no reason to risk it on its own.
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

export const relativeLuminance = (color: string) => {
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

  const rgb = color.startsWith("rgb(")
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
