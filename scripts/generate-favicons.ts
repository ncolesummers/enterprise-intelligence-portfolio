/**
 * Generate favicon variants from the NCS logo PNG.
 *
 * Outputs:
 *   src/app/favicon.ico   – 16x16 + 32x32 ICO for legacy browsers
 *   src/app/apple-icon.png – 180x180 PNG with dark background for iOS
 *   src/app/icon.svg       – SVG traced via potrace with dark/light mode colors
 *
 * Prerequisites: brew install potrace, pnpm add -D sharp-ico
 */

import sharp from "sharp";
import { execSync } from "child_process";
import { sharpsToIco } from "sharp-ico";
import * as fs from "fs";
import * as path from "path";

const SOURCE = path.join(process.cwd(), "ncs-logo.png");
const APP_DIR = path.join(process.cwd(), "src", "app");
const TMP_DIR = path.join(process.cwd(), ".tmp-favicon");

// Dark background matching the site's --background dark-mode token
const DARK_BG = { r: 32, g: 32, b: 32 };

// Accent colors (hex approximations of the oklch values in the theme)
const LIGHT_MODE_FILL = "#3b5998";
const DARK_MODE_FILL = "#6b8fd4";

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Remove the white background from the source PNG, returning a sharp instance
 * with only the blue logo on a transparent background.
 */
function prepareSource() {
  return sharp(SOURCE).removeAlpha().ensureAlpha();
}

/**
 * Generate apple-icon.png: 180x180 with dark solid background.
 */
async function generateAppleIcon() {
  const size = 180;
  const padding = Math.round(size * 0.1);
  const logoSize = size - padding * 2;

  // Create the logo resized with transparent background
  const logo = await sharp(SOURCE)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Composite onto dark background
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...DARK_BG, alpha: 1 },
    },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));

  console.log("  apple-icon.png (180x180, dark background)");
}

/**
 * Generate favicon.ico with 16x16 and 32x32 frames.
 */
async function generateFaviconIco() {
  const icons = [16, 32].map(size =>
    sharp(SOURCE).resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    }),
  );

  await sharpsToIco(icons, path.join(APP_DIR, "favicon.ico"));
  console.log("  favicon.ico (16x16 + 32x32)");
}

/**
 * Generate icon.svg via potrace:
 * 1. Create a high-contrast monochrome BMP from the logo
 * 2. Trace with potrace to get SVG paths
 * 3. Post-process SVG to add dark/light mode color adaptation
 */
async function generateSvgIcon() {
  ensureDir(TMP_DIR);

  const pgmPath = path.join(TMP_DIR, "logo-mono.pgm");
  const svgTmpPath = path.join(TMP_DIR, "logo-traced.svg");
  const svgOutPath = path.join(APP_DIR, "icon.svg");

  // Create a high-contrast monochrome PGM for potrace.
  // The logo is blue on white — threshold to get black logo on white.
  // Potrace accepts PNM (PBM/PGM/PPM) and BMP formats.
  const { width, height } = await sharp(SOURCE).metadata();
  const monoBuffer = await sharp(SOURCE)
    .grayscale()
    .negate() // invert so the logo becomes white (high value) and background becomes black
    .threshold(128) // binary black/white
    .negate() // invert back: logo = black, background = white
    .raw()
    .toBuffer();

  // Write as PGM (P5 binary format) which potrace accepts natively
  const pgmHeader = `P5\n${width} ${height}\n255\n`;
  const pgmBuffer = Buffer.concat([Buffer.from(pgmHeader), monoBuffer]);
  fs.writeFileSync(pgmPath, pgmBuffer);

  // Trace with potrace
  execSync(
    `potrace "${pgmPath}" -s -o "${svgTmpPath}" --turdsize 100 --alphamax 1 --opttolerance 0.2`,
  );

  // Read the traced SVG and post-process it
  let svg = fs.readFileSync(svgTmpPath, "utf-8");

  // Extract the viewBox or dimensions from potrace output, then inject our styles.
  // Potrace outputs something like: <svg ... width="..." height="..." viewBox="...">
  // We want to:
  // 1. Keep the viewBox
  // 2. Replace the fixed fill with our adaptive CSS class
  // 3. Add a <style> block for dark/light mode

  const styleBlock = `<style>
  .logo { fill: ${LIGHT_MODE_FILL}; }
  @media (prefers-color-scheme: dark) {
    .logo { fill: ${DARK_MODE_FILL}; }
  }
</style>`;

  // Insert style block after the opening <svg> tag
  svg = svg.replace(/(<svg[^>]*>)/, `$1\n${styleBlock}`);

  // Add class="logo" to all <path> elements and remove all inline fill attributes
  // (including on the <g> element that potrace adds)
  svg = svg.replace(/\s*fill="[^"]*"/g, "");
  svg = svg.replace(/<path/g, '<path class="logo"');

  // Remove potrace boilerplate: XML declaration, DOCTYPE, comments, metadata
  svg = svg.replace(/<\?xml[^?]*\?>\n?/g, "");
  svg = svg.replace(/<!DOCTYPE[^>]*>\n?/g, "");
  svg = svg.replace(/<!--[^>]*-->\n?/g, "");
  svg = svg.replace(/<metadata>[\s\S]*?<\/metadata>\n?/g, "");

  // Remove fixed width/height attributes so the SVG scales to its container
  svg = svg.replace(/ width="[^"]*"/, "");
  svg = svg.replace(/ height="[^"]*"/, "");

  fs.writeFileSync(svgOutPath, svg.trim() + "\n");
  console.log("  icon.svg (potrace-traced, dark/light adaptive)");

  // Clean up temp files
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
}

async function main() {
  console.log("Generating favicon variants from ncs-logo.png\n");

  await generateAppleIcon();
  await generateFaviconIco();
  await generateSvgIcon();

  console.log("\nDone. Files written to src/app/");
}

main().catch(err => {
  console.error("Failed:", err);
  // Clean up temp dir on failure
  if (fs.existsSync(TMP_DIR))
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  process.exit(1);
});
