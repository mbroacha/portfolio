#!/usr/bin/env node
/**
 * Retrieval probe.
 *
 * The answer bank is only as good as what it matches, and the version of this
 * script that it replaced could not tell. Of its 58 positive assertions, 55
 * were verbatim copies of a question or an alias already in the bank, so it
 * exercised the exact-match short circuit and reported a clean run while the
 * scorer was returning the critique answer for "how long did this take."
 *
 *   node scripts/probe-answers.mjs
 *
 * Two sections, and the split is the point.
 *
 * ALIAS_CASES are phrasings that are meant to resolve as whole strings: short
 * idiomatic questions no scorer can rank reliably. Each one must be present in
 * the bank verbatim. That is circular on purpose, and the run fails if one
 * stops being an alias.
 *
 * CASES test the scorer. Each query must NOT appear verbatim in any question or
 * alias, and the run fails if one does, because an alias added to make a probe
 * pass teaches nothing. Phrasings here were written without reading the alias
 * lists.
 *
 * Expected values:
 *   "some-id"              the query must return that answer
 *   ["some-id", "DECLINE"] either outcome is acceptable
 *   "DECLINE"              the query must return nothing
 *
 * A wrong answer is a much worse failure than a decline, so only wrong answers
 * and circularity fail the run. Declines are listed for a human to read. Fix
 * them by writing an answer, or by adding the phrasing to ALIAS_CASES if it is
 * genuinely idiomatic. Never by lowering the threshold.
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

const BANK = JSON.parse(readFileSync(resolve(ROOT, "src/data/answers.json"), "utf8"));
const flat = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const PHRASINGS = new Set();
for (const e of BANK.answers) for (const s of [e.q, ...e.aliases]) PHRASINGS.add(flat(s));

/** [query, scope, expected] — must resolve as a whole string. */
const ALIAS_CASES = [
  ["are you ai", "global", "cheeky-is-this-a-chatbot"],
  ["are you a human", "global", "cheeky-is-this-a-chatbot"],
  ["is this a person", "global", "cheeky-is-this-a-chatbot"],];

/** [query, scope, expected] — must NOT be a verbatim phrasing. */
const CASES = [
  ["walk me through your design process", "global", "DECLINE"],
  ["how do you decide what to build first", "global", "DECLINE"],
  ["how do you work with engineers", "global", "DECLINE"],
  ["how do you work with product managers", "global", "product-strategy"],
  ["tell me about a time you influenced strategy", "global", "product-strategy"],
  ["how do you handle ambiguity", "global", "DECLINE"],
  ["what does staff level mean to you", "global", "DECLINE"],
  ["how do you prioritize competing requests", "global", "DECLINE"],
  ["how do you know when a design is done", "global", "DECLINE"],
  ["what is your approach to design systems", "global", "DECLINE"],
  ["have you built a component library", "global", "DECLINE"],
  ["how do you think about accessibility", "global", "DECLINE"],
  ["do you write specs", "global", "DECLINE"],
  ["how do you document your work", "global", "DECLINE"],
  ["how do you run a critique session", "global", "no-critique"],
  ["does negative feedback bother you", "global", "no-critique"],
  ["how do you validate an idea cheaply", "global", "DECLINE"],
  ["what happens after launch", "global", "DECLINE"],
  ["how do you scope a project under a deadline", "global", "DECLINE"],
  ["describe your biggest professional failure", "global", "weakness"],
  ["how do you give difficult feedback", "global", "DECLINE"],
  ["how do you onboard onto a new domain", "global", "why-many-industries"],
  ["how do you align stakeholders who disagree", "global", "DECLINE"],
  ["have you worked on enterprise software", "global", "DECLINE"],
  ["have you designed for complex data", "global", "DECLINE"],
  ["what is your experience with b2b", "global", "why-many-industries"],
  ["how do you handle technical constraints", "global", "do-you-code"],
  ["how many years of experience do you have", "global", "DECLINE"],
  ["what is your biggest career accomplishment", "global", "why-hire"],
  ["how do you handle being the only designer", "global", "real-design-org"],
  ["have you set design direction for a company", "global", "product-strategy"],
  ["what would you do in your first ninety days", "global", "DECLINE"],
  ["how do you handle a pm who hands you solutions", "global", "DECLINE"],
  ["what is an opinion you hold that others disagree with", "global", "DECLINE"],
  ["are you more of a systems thinker or a craft person", "global", "DECLINE"],
  ["do you prefer zero to one or scaling", "global", "DECLINE"],
  ["why design instead of engineering", "global", "DECLINE"],
  ["what is your ideal team structure", "global", "DECLINE"],
  ["how do you want to grow", "global", "what-next"],
  ["why are you leaving your current job", "global", "left-slingshot"],
  ["what ai tools do you use day to day", "global", "left-figma"],
  ["how do you evaluate an llm feature", "global", "ai-in-products"],
  ["what is your take on agentic products", "global", "ai-in-products"],
  ["how do you design for uncertainty in model output", "global", "DECLINE"],
  ["would you work at an ai lab", "global", "what-next"],
  ["how do you measure design quality", "global", "metrics"],
  ["what is your visual design strength", "global", "DECLINE"],
  ["show me your worst work", "global", "DECLINE"],
  ["what tools besides figma", "global", "left-figma"],
  ["do you do motion design", "global", "DECLINE"],
  ["can you do branding", "global", "DECLINE"],
  ["how much writing do you do", "global", "DECLINE"],
  ["do you talk to customers directly", "global", "sysgit-research-access"],
  ["where do you find inspiration", "global", "DECLINE"],
  ["how do you keep up with the field", "global", "DECLINE"],
  ["is this site built by hand", "global", "cheeky-ai-wrote-this"],
  ["what is sysgit", "sysgit", "DECLINE"],
  ["who were the users", "sysgit", "sysgit-research-access"],
  ["how did you validate the model", "sysgit", "sysgit-research-access"],
  ["what was the business outcome", "sysgit", "metrics"],
  ["what did the acquisition change", "sysgit", "sysgit-overruled"],
  ["how did you handle the complexity of requirements", "sysgit", "sysgit-hardest"],
  ["what tradeoffs did you make", "sysgit", "sysgit-said-no"],
  ["how long did this take", "sysgit", "DECLINE"],
  ["what would you do with more time", "sysgit", ["DECLINE", "sysgit-wrong"]],
  ["who did you work with on this", "sysgit", "DECLINE"],
  ["what did engineering push back on", "sysgit", "sysgit-pushback"],
  ["have you ever been told no by leadership", "sysgit", "sysgit-overruled"],
  ["what have you cut from a product", "sysgit", "sysgit-said-no"],
  ["what was beacon", "beacon", "DECLINE"],
  ["what was the metric that moved", "beacon", "metrics"],
  ["how did you get buy in", "beacon", "beacon-reciprocity"],
  ["what was the pivot", "beacon", "DECLINE"],
  ["who were you designing for", "beacon", "beacon-no-prior-art"],
  ["what did you learn about incentives", "beacon", "beacon-reciprocity"],
  ["what was originality", "originality", "DECLINE"],
  ["how did teachers use it", "originality", "DECLINE"],
  ["what did the research show", "originality", "originality-business"],
  ["what happened with the ml model", "originality", "originality-business"],
  ["was there tension with sales", "originality", "originality-business"],
  ["what was your role exactly", "originality", "originality-constraint"],
  ["what was gradescope mobile", "gradescope", "DECLINE"],
  ["why did it not ship", "gradescope", "DECLINE"],
  ["what was your contribution", "gradescope", "gradescope-pair"],
  ["what is your salary expectation", "global", "DECLINE"],
  ["are you authorized to work in the us", "global", "DECLINE"],
  ["do you want coffee", "global", "DECLINE"],
  ["python", "global", "DECLINE"],
  ["can you ship production code", "global", "do-you-code"],
  ["have you shipped react", "global", "do-you-code"],
  ["which prototyping tools", "global", "left-figma"],
  ["do you use sketch or figma", "global", "left-figma"],
  ["why so many different fields", "global", "why-many-industries"],
  ["were you ever in a big design team", "global", "real-design-org"],
  ["what are you not good at", "global", "weakness"],
  ["what role are you targeting", "global", "what-next"],
  ["convince me to hire you", "global", "why-hire"],
  ["did you mentor juniors", "global", "mentoring"],
  ["when should a product use ai", "global", "ai-in-products"],
  ["what will you never automate", "global", "ai-refuse"],
  ["do you own roadmap decisions", "global", "product-strategy"],
  ["did a model write these answers", "global", "cheeky-ai-wrote-this"],
  ["can i see your source files", "global", "cheeky-figma-files"],
  ["what do you do on your days off", "global", "cheeky-outside-work"],
  ["will ai take design jobs", "global", "cheeky-replaced-by-ai"],
  ["what colour do you like best", "global", "cheeky-favorite-color"],
  ["what is your mbti", "global", "DECLINE"],
  ["what is your github", "global", "DECLINE"],
  ["send me your resume", "global", "DECLINE"],
  ["what city", "global", "DECLINE"],
  ["lorem ipsum", "global", "DECLINE"],
  ["do you like dogs", "global", "DECLINE"],
  ["how tall are you", "global", "DECLINE"],
  ["what was the riskiest part", "sysgit", "sysgit-hardest"],
  ["what did you remove", "sysgit", "sysgit-said-no"],
  // Known ambiguity, left visible rather than papered over. "said" and "no"
  // both sit in the question "What have you said no to?", so bag-of-words
  // cannot tell that the reader meant "who overruled you". An alias on
  // sysgit-overruled would fix it; that is Morgan's call, not the probe's.
  ["who said no to you", "sysgit", ["sysgit-overruled", "sysgit-said-no"]],
  ["how did you reach engineers", "sysgit", "sysgit-research-access"],
  ["what do you regret", "sysgit", "sysgit-wrong"],
  ["was there conflict", "sysgit", "sysgit-pushback"],
  ["why not real screenshots", "beacon", "beacon-screens"],
  ["how did you convince operators", "beacon", "beacon-reciprocity"],
  ["what did you not finish", "beacon", "beacon-unsolved"],
  ["what do you regret about beacon", "beacon", "beacon-wrong"],
  ["how did you begin with no precedent", "beacon", "beacon-no-prior-art"],
  ["is it a plagiarism checker", "originality", "originality-not-ai"],
  ["what made it difficult", "originality", "originality-constraint"],
  ["did sales disagree with research", "originality", "originality-business"],
  ["what do you regret there", "originality", "originality-wrong"],
  ["why put a dead project on the site", "gradescope", "gradescope-why"],
  ["what was the disagreement", "gradescope", "gradescope-pair"],
  ["what was the takeaway", "gradescope", "gradescope-voluntary"],];

const wrong = [];
const missed = [];
const circular = [];
const broken = [];

for (const [q, scope, want] of ALIAS_CASES) {
  if (!PHRASINGS.has(flat(q))) {
    broken.push(`${q} is in ALIAS_CASES but is no longer a question or alias`);
    continue;
  }
  const got = findAnswer(q, scope)?.id ?? "DECLINE";
  if (got !== want) broken.push(`${q} resolved to ${got}, not ${want}`);
}

for (const [q, scope, want] of CASES) {
  if (PHRASINGS.has(flat(q))) {
    circular.push(`${q} is now a verbatim phrasing in the bank`);
    continue;
  }
  const accept = Array.isArray(want) ? want : [want];
  const got = findAnswer(q, scope)?.id ?? "DECLINE";
  if (accept.includes(got)) continue;
  const row = { q, scope, want: accept.join(" or "), got };
  if (got === "DECLINE") missed.push(row);
  else wrong.push(row);
}

const pad = (s, n) => String(s).padEnd(n);
const total = ALIAS_CASES.length + CASES.length;

if (missed.length) {
  console.log(`\n${missed.length} of ${CASES.length} declined where an answer exists:`);
  for (const m of missed) console.log(`  [${pad(m.scope, 11)}] ${pad(m.q, 46)} want ${m.want}`);
}

if (circular.length) {
  console.error(`\n${circular.length} CIRCULAR probe(s):`);
  for (const c of circular) console.error(`  ${c}`);
  console.error("\nA probe that matches an alias verbatim tests the short circuit, not the");
  console.error("scorer. Move it to ALIAS_CASES or change the phrasing.");
}

if (broken.length) {
  console.error(`\n${broken.length} broken alias case(s):`);
  for (const b of broken) console.error(`  ${b}`);
}

if (wrong.length) {
  console.error(`\n${wrong.length} WRONG answer(s):`);
  for (const w of wrong) {
    console.error(`  [${pad(w.scope, 11)}] ${pad(w.q, 46)} want ${pad(w.want, 26)} got ${w.got}`);
  }
  console.error("\nA wrong answer is worse than no answer. Fix before shipping.");
}

if (wrong.length || circular.length || broken.length) process.exit(1);

console.log(`\nok. ${total} probes, 0 wrong, ${missed.length} declined.`);
