#!/usr/bin/env node
/**
 * Compile the private answer bank into the JSON the site ships.
 *
 *   content/answer-bank.json   private, gitignored, holds notes to Morgan
 *          |
 *          v
 *   src/data/answers.json      tracked, publishable, what the interface reads
 *
 * Two jobs. It strips the fields that are guidance rather than content, so no
 * working note can reach the public repo. And because the output is committed,
 * everything that actually ships has version history, which the private bank
 * does not.
 *
 *   node scripts/build-answers.mjs          write, refusing on any error
 *   node scripts/build-answers.mjs --check  validate only, write nothing
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "content/answer-bank.json");
const OUT = resolve(ROOT, "src/data/answers.json");
const PUBLIC = resolve(ROOT, "public");
const PAGES = resolve(ROOT, "src/pages");
const APP = resolve(ROOT, "src/App.tsx");

const WORD_LIMIT = 90; // the rail is max-h-screen; see content/QUERY_INTERFACE.md
const checkOnly = process.argv.includes("--check");

const errors = [];
const warnings = [];
const held = [];

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

if (!existsSync(SRC)) {
  console.error(`Missing ${SRC}. The private bank is gitignored, so a fresh clone will not have it.`);
  process.exit(1);
}

let bank;
try {
  bank = JSON.parse(readFileSync(SRC, "utf8"));
} catch (e) {
  console.error(`content/answer-bank.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

/**
 * Every section id that actually exists, per route.
 *
 * An answer's source anchor is only worth anything if the section is really on
 * the page. Without this check a renamed section silently turns a traceability
 * link into a no-op, which is worse than having no link at all.
 */
function sectionIndex() {
  const routes = new Map(); // "/case-study/sysgit" -> Set of section ids
  let app = "";
  try { app = readFileSync(APP, "utf8"); } catch { return routes; }

  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  for (const m of app.matchAll(/path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g)) {
    const [, path, component] = m;
    const file = resolve(PAGES, `${component}.tsx`);
    if (!existsSync(file)) continue;
    const src = readFileSync(file, "utf8");
    const ids = new Set(
      [...src.matchAll(/<SectionHeading>([^<]+)<\/SectionHeading>/g)].map((h) => slug(h[1])),
    );
    routes.set(path, ids);
  }
  return routes;
}

const SECTIONS = sectionIndex();

const seen = new Set();
const shipped = [];

for (const e of bank.answers ?? []) {
  if (!e.id) { errors.push(`An entry has no id.`); continue; }
  if (seen.has(e.id)) errors.push(`${e.id}: duplicate id.`);
  seen.add(e.id);

  if (e.status !== "ready") {
    held.push(`${e.id} (${e.status})`);
    continue;
  }

  // A ready entry with no answer is a bug in the bank, not a thing to ship.
  if (!e.a || !e.a.trim()) { errors.push(`${e.id}: status is ready but the answer is empty.`); continue; }

  const n = words(e.a);
  if (n > WORD_LIMIT) errors.push(`${e.id}: ${n} words, over the ${WORD_LIMIT}-word rail limit.`);

  const out = { id: e.id, q: e.q, aliases: e.aliases ?? [], a: e.a, scope: e.scope, tone: e.tone };
  if (e.source) {
    // "Sysgit, Decisions" -> anchor "decisions", which is the id SectionHeading
    // derives from its own text. That is what lets a source link scroll the
    // argument column to the exact passage instead of just to the page.
    const section = (e.source.label.split(",")[1] ?? "").trim();
    const anchor = section
      ? section.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : undefined;
    if (anchor) {
      const known = SECTIONS.get(e.source.path);
      if (known && !known.has(anchor)) {
        errors.push(
          `${e.id}: source "${e.source.label}" points at ${e.source.path}#${anchor}, ` +
            `but that page has no such section (${[...known].join(", ") || "none"}). ` +
            `Drop the section from the label, or rename it to match.`,
        );
      }
    }
    out.source = anchor ? { ...e.source, anchor } : { ...e.source };
  }
  if (e.swatch) out.swatch = { hex: e.swatch.hex, hsl: e.swatch.hsl };

  if (e.photos) {
    const want = e.photos.count ?? 4;
    const files = (e.photos.files ?? []).filter((f) => f.status === "done");

    for (const f of files) {
      if (!existsSync(resolve(PUBLIC, f.src.replace(/^\//, "")))) {
        errors.push(`${e.id}: ${f.src} is marked done but does not exist under public/.`);
      }
      if (!f.alt || !f.alt.trim()) errors.push(`${e.id}: ${f.src} has no alt text.`);
    }

    // An incomplete grid looks broken. Hold the whole entry and say so.
    if (files.length < want) {
      const missing = (e.photos.files ?? []).filter((f) => f.status !== "done").map((f) => f.src);
      warnings.push(`${e.id}: held. ${files.length}/${want} photos ready, still waiting on ${missing.join(", ")}.`);
      held.push(`${e.id} (incomplete photo grid)`);
      continue;
    }

    out.photos = files.map((f) => ({ src: f.src, alt: f.alt }));
  }

  shipped.push(out);
}

const payload = {
  generated: new Date().toISOString().slice(0, 10),
  source: "content/answer-bank.json",
  decline: bank._meta?.decline ?? "Morgan hasn't written about that.",
  answers: shipped,
};

// Belt and braces: nothing that is guidance rather than content may ship.
const banned = ["note", "status", "processing", "sizing", "caution", "rule", "layout", "count"];
const leaked = banned.filter((k) => JSON.stringify(payload).includes(`"${k}":`));
if (leaked.length) errors.push(`Private field(s) reached the output: ${leaked.join(", ")}.`);

for (const w of warnings) console.warn(`  warn  ${w}`);

if (errors.length) {
  console.error(`\n${errors.length} error(s), nothing written:\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

if (checkOnly) {
  console.log(`\nok. ${shipped.length} would ship, ${held.length} held.`);
  process.exit(0);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");

console.log(`\nWrote src/data/answers.json`);
console.log(`  ${shipped.length} shipped, ${held.length} held`);
if (held.length) console.log(`  held: ${held.join(", ")}`);
