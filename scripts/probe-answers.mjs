#!/usr/bin/env node
/**
 * Retrieval probe.
 *
 * The answer bank is only as good as what it matches. This runs a fixed set of
 * questions phrased the way a reader would actually type them, and fails if any
 * of them lands on the wrong answer.
 *
 *   node scripts/probe-answers.mjs
 *
 * Three kinds of case:
 *   "some-id"  the query must return that answer
 *   "DECLINE"  the query must return nothing
 *   null       no assertion; printed so a human can eyeball the drift
 *
 * A wrong answer is a much worse failure than a decline, so declines where an
 * answer was expected are reported separately and do not fail the run on their
 * own. Fix those by adding aliases, not by lowering the threshold.
 */

import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// retrieval.ts imports JSON the way a bundler allows. Node needs the attribute,
// so run against a temporary copy rather than changing the shipped source.
const SRC = resolve(ROOT, "src/lib/retrieval.ts");
const TMP = resolve(ROOT, "src/lib/.retrieval.probe.ts");
writeFileSync(
  TMP,
  readFileSync(SRC, "utf8").replace(
    'import data from "../data/answers.json";',
    'import data from "../data/answers.json" with { type: "json" };',
  ),
);

let findAnswer;
try {
  ({ findAnswer } = await import(pathToFileURL(TMP).href));
} finally {
  try { unlinkSync(TMP); } catch { /* already gone */ }
}

/** [query, scope, expected] */
const CASES = [
  ["tell me about yourself", "global", "why-hire"],
  ["what makes you a good fit", "global", "why-hire"],
  ["why should we bring you on", "global", "why-hire"],
  ["what industries have you worked in", "global", "why-many-industries"],
  ["do you have domain expertise", "global", "why-many-industries"],
  ["have you ever managed anyone", "global", "mentoring"],
  ["do you have leadership experience", "global", "mentoring"],
  ["have you worked with other designers", "global", "real-design-org"],
  ["what size teams have you been on", "global", "real-design-org"],
  ["how do you handle critique", "global", "no-critique"],
  ["are you open to feedback", "global", "no-critique"],
  ["what are your weaknesses", "global", "weakness"],
  ["what do you struggle with", "global", "weakness"],
  ["what are you looking for in your next role", "global", "what-next"],
  ["what kind of company do you want", "global", "what-next"],
  ["can you code", "global", "do-you-code"],
  ["do you write front end", "global", "do-you-code"],
  ["how technical are you", "global", "do-you-code"],
  ["do you prototype", "global", "do-you-code"],
  ["what design tools do you use", "global", "left-figma"],
  ["are you a figma person", "global", "left-figma"],
  ["how do you use ai in your work", "global", "ai-native-buzzword"],
  ["where do you draw the line with ai", "global", "ai-refuse"],
  ["what do you do by hand", "global", "ai-refuse"],
  ["do you do product strategy", "global", "product-strategy"],
  ["have you been a pm", "global", "product-strategy"],
  ["what was the impact of your work", "global", "metrics"],
  ["can you show me numbers", "global", "metrics"],
  ["how do you measure success", "global", "metrics"],
  ["what do you do for fun", "global", "cheeky-outside-work"],
  ["what do you do outside of work", "global", "cheeky-outside-work"],
  ["who made this website", "global", "cheeky-ai-wrote-this"],
  ["am i talking to a robot", "global", "cheeky-is-this-a-chatbot"],
  ["what color do you like", "global", "cheeky-favorite-color"],
  ["are you worried about ai taking your job", "global", "cheeky-replaced-by-ai"],

  ["what was hard about sysgit", "sysgit", "sysgit-hardest"],
  ["tell me about the diagramming", "sysgit", "sysgit-hardest"],
  ["what would you do differently", "sysgit", "sysgit-wrong"],
  ["did anything fail", "sysgit", "sysgit-wrong"],
  ["describe a time you failed", "sysgit", "sysgit-wrong"],
  ["were you ever blocked", "sysgit", "sysgit-overruled"],
  ["how did you talk to users", "sysgit", "sysgit-research-access"],
  ["how much research did you do", "sysgit", "sysgit-research-access"],
  ["do you do user testing", "sysgit", "sysgit-research-access"],
  ["what features did you kill", "sysgit", "sysgit-said-no"],
  ["how do you handle disagreement", "sysgit", "sysgit-pushback"],
  ["why is there no analytics", "sysgit", "metrics"],

  ["why did you only stay a year", "beacon", "left-slingshot"],
  ["are those real screenshots", "beacon", "beacon-screens"],
  ["what would you change", "beacon", "beacon-wrong"],
  ["biggest regret", "beacon", "beacon-wrong"],
  ["how did you research it", "beacon", "beacon-no-prior-art"],
  ["what was left undone", "beacon", "beacon-unsolved"],

  ["did you build the ai detector", "originality", "originality-not-ai"],
  ["what was the legal constraint", "originality", "originality-constraint"],
  ["what went wrong there", "originality", "originality-wrong"],

  ["why show a failed project", "gradescope", "gradescope-why"],
  ["what did that teach you", "gradescope", "gradescope-voluntary"],

  // Must not answer.
  ["what is your salary", "global", "DECLINE"],
  ["where are you located", "global", "DECLINE"],
  ["can you start monday", "global", "DECLINE"],
  ["what is the weather", "global", "DECLINE"],
  ["tell me a joke", "global", "DECLINE"],
  ["hello", "global", "DECLINE"],
  ["thanks", "global", "DECLINE"],
  ["nice site", "global", "DECLINE"],
  ["asdfgh", "global", "DECLINE"],
  ["how old are you", "global", "DECLINE"],
  ["are you married", "global", "DECLINE"],
  ["accessibility", "global", "DECLINE"],
];

const wrong = [];
const missed = [];

for (const [q, scope, want] of CASES) {
  if (want === null) continue;
  const got = findAnswer(q, scope)?.id ?? "DECLINE";
  if (got === want) continue;
  const row = { q, scope, want, got };
  if (got === "DECLINE") missed.push(row);
  else wrong.push(row);
}

const pad = (s, n) => String(s).padEnd(n);

if (missed.length) {
  console.log(`\n${missed.length} declined where an answer exists (add aliases):`);
  for (const m of missed) console.log(`  [${pad(m.scope, 11)}] ${pad(m.q, 44)} want ${m.want}`);
}

if (wrong.length) {
  console.error(`\n${wrong.length} WRONG answers:`);
  for (const w of wrong) {
    console.error(`  [${pad(w.scope, 11)}] ${pad(w.q, 44)} want ${pad(w.want, 26)} got ${w.got}`);
  }
  console.error("\nA wrong answer is worse than no answer. Fix before shipping.");
  process.exit(1);
}

console.log(`\nok. ${CASES.length} probes, 0 wrong, ${missed.length} declined.`);
