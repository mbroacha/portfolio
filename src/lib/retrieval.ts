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
  /** false keeps it out of the suggested list. It is still matchable. */
  suggest?: boolean;
  swatch?: { hex: string; hsl: string };
  photos?: { src: string; alt: string }[];
}

const ANSWERS = (data.answers ?? []) as Answer[];
export const DECLINE: string = data.decline ?? "Morgan hasn't written about that.";

/** Curated order for the general questions. Set in the bank's _meta. */
const SUGGESTED: string[] = (data as { suggested?: string[] }).suggested ?? [];

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
  "we", "why", "will", "with", "would", "you", "your",
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
 * Below this, decline.
 *
 * Deliberately high. A portfolio that says "Morgan hasn't written about that"
 * reads as honest; one that answers a question nobody asked reads as broken.
 * When this was loose, half-matches won constantly.
 */
export const THRESHOLD = 0.52;

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
 * Two tokens are the same word if they differ only by a common inflection.
 *
 * Arbitrary prefix matching was too loose: it made "person" match "personal",
 * so "are you a figma person" came back as the answer about hiking and
 * bowling. Matching only on real suffixes keeps "work" finding "worked"
 * without letting unrelated words that happen to share a stem collide.
 */
const SUFFIXES = ["s", "es", "ed", "d", "ing", "ly", "er", "ers"];

const sameWord = (a: string, b: string): boolean => {
  if (a === b) return true;
  const [short, long] = a.length < b.length ? [a, b] : [b, a];
  if (short.length < 3) return false;
  // The long word has to actually begin with the short one. Without this check
  // the slice below compares nonsense: "should".slice(5) is "d", which is a
  // valid suffix, so "hello" matched "should" and every empty query returned
  // the first answer in the file.
  if (!long.startsWith(short)) return false;
  return SUFFIXES.includes(long.slice(short.length));
};

const has = (field: string[], t: string) => field.some((f) => sameWord(f, t));

function scoreOne(queryTokens: string[], doc: Indexed, scope?: string): number {
  if (queryTokens.length === 0) return 0;

  let earned = 0;
  let possible = 0;
  let matched = 0;
  for (const t of queryTokens) {
    const w = idf(t);
    possible += W_QUESTION * w;
    if (has(doc.asked, t)) {
      earned += W_QUESTION * w;
      matched++;
    } else if (has(doc.body, t)) {
      earned += W_BODY * w;
      matched++;
    }
  }
  if (possible === 0) return 0;

  /**
   * How much of what was asked got answered, not just how heavy the hits were.
   *
   * Without this, matching one word of a two-word question scored the same as
   * matching a rare word in a question that was fully understood, which is how
   * "do you know react native" ended up on the answer about being AI native.
   * A partial match is worth less, always.
   */
  const coverage = matched / queryTokens.length;
  let score = (earned / possible) * (0.45 + 0.55 * coverage);

  // A small nudge for the page you are on. The heavy lifting is done by the
  // scope filter in findAnswer, not here.
  if (scope && doc.entry.scope === scope) score += 0.08;

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
    (e) =>
      (!scope || e.scope === "global" || e.scope === scope) &&
      (flatten(e.q) === q || e.aliases.some((a) => flatten(a) === q)),
  );
  if (exact.length) {
    const mine = scope ? exact.find((e) => e.scope === scope) : undefined;
    return mine ?? exact.find((e) => e.scope === "global") ?? exact[0];
  }

  const qt = tokens(query);
  let best: Answer | null = null;
  let bestScore = 0;

  /**
   * On a project page, answers about a different project are off the table.
   *
   * A reader on Beacon asking "what would you change" means Beacon. Treating
   * scope as a soft preference let a strongly worded Sysgit answer win anyway,
   * which is the single strangest thing the field did. General answers still
   * compete everywhere.
   */
  const inScope = (e: Answer) => !scope || e.scope === "global" || e.scope === scope;

  for (const doc of INDEX) {
    if (!inScope(doc.entry)) continue;
    const s = scoreOne(qt, doc, scope);
    if (s > bestScore) {
      bestScore = s;
      best = doc.entry;
    }
  }

  return bestScore >= THRESHOLD ? best : null;
}

/**
 * Suggested questions for a page: this project's first, then general ones.
 *
 * Entries flagged `suggest: false` are left out. Those are the questions that
 * plant a doubt a reader did not walk in with. Every one of them still answers
 * if typed, which is the point: being ready for a hard question is not the same
 * as opening with it.
 */
export function suggestionsFor(scope: string | undefined, limit = 6): Answer[] {
  const open = ANSWERS.filter((e) => e.suggest !== false);
  const mine = scope && scope !== "global" ? open.filter((e) => e.scope === scope) : [];

  // The general list is curated in the bank rather than falling out of file
  // order, because which questions get offered is an editorial decision.
  const curated = SUGGESTED.map((id) => open.find((e) => e.id === id)).filter(
    (e): e is Answer => Boolean(e),
  );
  const seen = new Set<string>();
  return [...mine, ...curated]
    .filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)))
    .slice(0, limit);
}

export function answerById(id: string): Answer | undefined {
  return ANSWERS.find((e) => e.id === id);
}
