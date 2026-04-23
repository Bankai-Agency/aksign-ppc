#!/usr/bin/env node
/**
 * One-shot image optimizer. Converts every PNG under public/images/
 * into a WebP next to the original (same filename, .webp). Removes
 * the .png after a successful conversion.
 *
 * Tuning:
 *   - Hero + footer-bg: wide photos — downscale to max 2400px, q=78
 *   - Portfolio + services tiles: max 1600px, q=80
 *   - cta-artwork: max 2000px, q=82
 *
 * Run: node scripts/optimize-images.mjs
 */
import { readdir, stat, unlink, writeFile, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/images/", import.meta.url);

const profiles = [
  { match: /\/hero-[^/]+\.png$/, maxWidth: 2400, quality: 78 },
  { match: /\/footer-bg\.png$/, maxWidth: 2400, quality: 72 },
  { match: /\/cta-artwork\.png$/, maxWidth: 2000, quality: 82 },
  { match: /\/portfolio\/[^/]+\.png$/, maxWidth: 1600, quality: 80 },
  { match: /\/services\/[^/]+\.png$/, maxWidth: 1600, quality: 80 },
  // fallback
  { match: /\.png$/, maxWidth: 2000, quality: 80 },
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile() && extname(entry.name) === ".png") out.push(full);
  }
  return out;
}

function profileFor(path) {
  const normalized = path.replaceAll("\\", "/");
  for (const p of profiles) if (p.match.test(normalized)) return p;
  return profiles[profiles.length - 1];
}

(async () => {
  const rootPath = ROOT.pathname;
  const files = await walk(rootPath);
  if (!files.length) {
    console.log("No PNGs found under public/images/");
    return;
  }
  let savedTotal = 0;
  for (const src of files) {
    const { maxWidth, quality } = profileFor(src);
    const dest = src.replace(/\.png$/i, ".webp");
    const srcStat = await stat(src);
    const img = sharp(src).rotate();
    const meta = await img.metadata();
    const pipeline =
      meta.width && meta.width > maxWidth
        ? img.resize({ width: maxWidth })
        : img;
    await pipeline.webp({ quality, effort: 6 }).toFile(dest);
    const destStat = await stat(dest);
    const saved = srcStat.size - destStat.size;
    savedTotal += saved;
    await unlink(src);
    console.log(
      `${relative(rootPath, src)}: ${(srcStat.size / 1024 / 1024).toFixed(2)}MB → ${(destStat.size / 1024).toFixed(0)}KB (−${(saved / 1024 / 1024).toFixed(2)}MB)`,
    );
  }
  console.log(
    `\nDone. Total saved: ${(savedTotal / 1024 / 1024).toFixed(2)}MB across ${files.length} files.`,
  );
})();
