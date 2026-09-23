import data from "../data/answers.json";

export interface AnswerSource {
  label: string;
  path: string;
  /** Section id on the target page, derived from the label by the build script. */
  anchor?: string;
}

export interface Answer {
  id: string;
  q: string;
  aliases: string[];
  a: string;
  scope: string;
  tone: string;
  source?: AnswerSource;
  swatch?: { hex: string; hsl: string };
  photos?: { src: string; alt: string }[];
}

const ANSWERS = (data.answers ?? []) as Answer[];
export const DECLINE: string = data.decline ?? "Morgan hasn't written about that.";

/**
 * Retrieval, not generation.
 *
 * Every answer was written in advance. This scores what someone typed against
 * the question and its aliases, and returns the closest one or nothing at all.
 * There is no model here and no network call, which is the whole reason the
 * interface runs on a static host.
 *
 * Returning nothing is a feature. A system that admits its edges reads as more
 * confident than one that improvises, and it is the honest fix for
 * hallucination rather than a disclaimer about it.
 */

const STOP = new Set([
  "a", "about", "an", "and", "any", "are", "as", "at", "be", "been", "but", "by", "can", "could",
  "did", "do", "does", "for", "from", "had", "has", "have", "how", "i", "if", "in", "is", "it",
  "its", "just", "me", "my", "not", "of", "on", "or", "so", "some", "that", "the", "their",
  "them", "there", "they", "this", "to", "was", "were", "what", "when", "where", "which", "who",
  "why", "will", "with", "would", "you", "your",
]);

const flatten = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const tokens = (s: string) =>
  flatten(s)
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t));

/** Weight on where a token was found. A hit in the question means more than a hit in the prose. */
const W_QUESTION = 3;
const W_BODY = 1;

/**
 * Below this, decline. Tuned so a one-word query that hits an alias lands, and
 * an off-topic sentence does not. Raise it if the interface starts answering
 * questions it was not really asked.
 */
export const THRESHOLD = 0.34;

/** Pre-tokenised fields, built once. */
interface Indexed {
  entry: Answer;
  asked: string[];
  body: string[];
}

const INDEX: Indexed[] = ANSWERS.map((entry) => ({
  entry,
  asked: tokens([entry.q, ...entry.aliases].join(" ")),
  body: tokens(entry.a),
}));

/**
 * How much a word is worth.
 *
 * Without this, "what do you do outside work" matches an answer about critique,
 * because "work" appears in "worked alone" and one common word out of two looks
 * like half a match. Weighting by rarity fixes that: "work" is worth little
 * because it is everywhere, "slingshot" or "figma" is worth a lot. A query
 * whose only hit is a common word no longer clears the bar.
 */
const DF = new Map<string, number>();
for (const doc of INDEX) {
  for (const t of new Set([...doc.asked, ...doc.body])) {
    DF.set(t, (DF.get(t) ?? 0) + 1);
  }
}
const idf = (t: string) => Math.log(1 + INDEX.length / (1 + (DF.get(t) ?? 0)));

/**
 * Prefix match rather than substring, so "work" still finds "worked" but "ai"
 * stops finding "said".
 */
const has = (field: string[], t: string) =>
  field.some((f) => f === t || (t.length >= 4 && (f.startsWith(t) || t.startsWith(f))));

function scoreOne(queryTokens: string[], doc: Indexed, scope?: string): number {
  if (queryTokens.length === 0) return 0;

  let earned = 0;
  let possible = 0;
  for (const t of queryTokens) {
    const w = idf(t);
    possible += W_QUESTION * w;
    if (has(doc.asked, t)) earned += W_QUESTION * w;
    else if (has(doc.body, t)) earned += W_BODY * w;
  }
  if (possible === 0) return 0;

  let score = earned / possible;

  // Scope is context, not a filter. An answer about this project ranks above an
  // equally good one about another, but a global answer is never penalised.
  if (scope) {
    if (doc.entry.scope === scope) score += 0.15;
    else if (doc.entry.scope !== "global") score -= 0.25;
  }

  return score;
}

export function findAnswer(query: string, scope?: string): Answer | null {
  const q = flatten(query);
  if (!q) return null;

  // An exact question, or an exact alias, short-circuits the scoring. Scope
  // still decides between them: "What did you get wrong?" is asked verbatim of
  // three different projects, and on the Beacon page it has to be the Beacon
  // answer. This page first, then anything general, then whatever is left.
  const exact = ANSWERS.filter(
    (e) => flatten(e.q) === q || e.aliases.some((a) => flatten(a) === q),
  );
  if (exact.length) {
    const mine = scope ? exact.find((e) => e.scope === scope) : undefined;
    return mine ?? exact.find((e) => e.scope === "global") ?? exact[0];
  }

  const qt = tokens(query);
  let best: Answer | null = null;
  let bestScore = 0;

  for (const doc of INDEX) {
    const s = scoreOne(qt, doc, scope);
    if (s > bestScore) {
      bestScore = s;
      best = doc.entry;
    }
  }

  return bestScore >= THRESHOLD ? best : null;
}

/** Suggested questions for a page: this project's first, then general ones. */
export function suggestionsFor(scope: string | undefined, limit = 6): Answer[] {
  const mine = scope ? ANSWERS.filter((e) => e.scope === scope) : [];
  const general = ANSWERS.filter((e) => e.scope === "global");
  const seen = new Set<string>();
  return [...mine, ...general]
    .filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)))
    .slice(0, limit);
}

export function answerById(id: string): Answer | undefined {
  return ANSWERS.find((e) => e.id === id);
}
