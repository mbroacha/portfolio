#!/usr/bin/env node
/**
 * Fail the build on a public file referenced without asset().
 *
 * Production serves the site under "/portfolio/", so a bare "/case-studies/x.webp"
 * works in dev and 404s once deployed. Beacon shipped eight of these before
 * this check existed. Every entry in public/ is a candidate, so a new folder
 * is covered without editing this file.
 *
 * Runs first in `npm run build`.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const PUBLIC_ENTRIES = readdirSync(join(ROOT, "public")).filter((name) => !name.startsWith("."));

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// A quoted string that starts with a public entry, e.g. "/case-studies/…" or '/photos/…'.
const pattern = new RegExp(`(["'\`])/(?:${PUBLIC_ENTRIES.map(escape).join("|")})(?:[/"'\`])`, "g");

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|jsx?)$/.test(name)) files.push(path);
  }
};
walk(SRC);

const problems = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("/*")) return;
    for (const match of line.matchAll(pattern)) {
      const before = line.slice(0, match.index);
      if (/asset\(\s*$/.test(before)) continue;
      problems.push(`${relative(ROOT, file)}:${i + 1}  ${trimmed}`);
    }
  });
}

if (problems.length) {
  console.error("Public paths must go through asset() or they 404 under the production base:\n");
  for (const p of problems) console.error(`  ${p}`);
  console.error("");
  process.exit(1);
}
console.log(`asset paths ok (${files.length} files checked)`);
