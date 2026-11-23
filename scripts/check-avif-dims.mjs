#!/usr/bin/env node
/**
 * Fail the build on an AVIF in public/ with an odd width or height.
 *
 * macOS `sips -s format avif` writes odd-dimensioned images that Preview opens
 * fine and Chrome decodes to fully transparent pixels. The Sysgit splash's
 * graph view (2702x1689) shipped that way and rendered as an empty frame. Crop
 * or pad the source to even dimensions before encoding.
 *
 * Reads the size from the file's `ispe` box, so it needs no image library and
 * runs in CI. For a real decode in Chrome, see check-avif-decode.mjs.
 *
 * Runs first in `npm run build`, beside check-asset-paths.mjs.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".avif")) files.push(path);
  }
};
walk(join(ROOT, "public"));

/**
 * The image's size, from its `ispe` boxes (4 bytes version and flags, then
 * width and height). sips writes a grid of 512px tiles, so a file carries one
 * box for the tiles and one for the whole image; the largest is the image.
 */
const imageSize = (buf) => {
  let best = null;
  for (let at = buf.indexOf("ispe", 0, "latin1"); at >= 0; at = buf.indexOf("ispe", at + 1, "latin1")) {
    const size = { w: buf.readUInt32BE(at + 8), h: buf.readUInt32BE(at + 12) };
    if (!best || size.w * size.h > best.w * best.h) best = size;
  }
  return best;
};

const problems = [];
for (const file of files) {
  const size = imageSize(readFileSync(file));
  const name = relative(ROOT, file);
  if (!size) problems.push(`${name}  no ispe box; cannot read its size`);
  else if (size.w % 2 || size.h % 2) problems.push(`${name}  ${size.w}x${size.h}`);
}

if (problems.length) {
  console.error("AVIFs with an odd dimension decode as transparent in Chrome. Make both sides even and re-encode:\n");
  for (const p of problems) console.error(`  ${p}`);
  console.error("");
  process.exit(1);
}
console.log(`avif dimensions ok (${files.length} files checked)`);
