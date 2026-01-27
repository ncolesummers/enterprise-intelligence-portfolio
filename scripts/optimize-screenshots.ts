/**
 * Optimize PNG screenshots to WebP format with compression
 */

import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

const INPUT_DIR = path.join(
  process.cwd(),
  "src",
  "assets",
  "uidaho-screenshots",
);

interface OptimizationResult {
  filename: string;
  originalSize: number;
  optimizedSize: number;
  reduction: number;
}

async function optimizeImage(inputPath: string): Promise<OptimizationResult> {
  const filename = path.basename(inputPath);
  const outputPath = inputPath.replace(/\.png$/, ".webp");

  // Get original size
  const originalStats = fs.statSync(inputPath);
  const originalSize = originalStats.size;

  // Convert to WebP with compression
  await sharp(inputPath)
    .webp({
      quality: 80,
      effort: 6, // Higher effort = better compression
    })
    .toFile(outputPath);

  // Get optimized size
  const optimizedStats = fs.statSync(outputPath);
  const optimizedSize = optimizedStats.size;

  // Delete original PNG
  fs.unlinkSync(inputPath);

  const reduction = ((originalSize - optimizedSize) / originalSize) * 100;

  return {
    filename: filename.replace(".png", ".webp"),
    originalSize,
    optimizedSize,
    reduction,
  };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
  console.log("🎨 Optimizing screenshots to WebP format\n");
  console.log("=".repeat(60));

  // Find all PNG files
  const files = fs
    .readdirSync(INPUT_DIR)
    .filter(f => f.endsWith(".png"))
    .map(f => path.join(INPUT_DIR, f));

  if (files.length === 0) {
    console.log("\n⚠️  No PNG files found to optimize");
    return;
  }

  console.log(`\n📁 Found ${files.length} PNG files to optimize\n`);

  const results: OptimizationResult[] = [];
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    try {
      process.stdout.write(`  Converting ${path.basename(file)}... `);
      const result = await optimizeImage(file);
      results.push(result);
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
      console.log(
        `✓ ${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)} (${result.reduction.toFixed(1)}% smaller)`,
      );
    } catch (error) {
      console.log(`✗ Failed: ${error}`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("\n✅ Optimization complete!\n");
  console.log(`   Total original:  ${formatBytes(totalOriginal)}`);
  console.log(`   Total optimized: ${formatBytes(totalOptimized)}`);
  console.log(
    `   Total saved:     ${formatBytes(totalOriginal - totalOptimized)} (${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%)`,
  );
  console.log(`   Images processed: ${results.length}`);
  console.log(`\n   Output: ${INPUT_DIR}`);
}

main().catch(console.error);
