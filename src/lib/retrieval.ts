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
 *
 * The corollary took an audit to learn: a wrong answer costs far more than a
 * decline, so scoring alone cannot decide. Ranking says which answer is
 * closest. Eligibility, below, says whether anything is close enough to be
 * worth returning. Those are different questions and the earlier version
 * conflated them.
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

/** Weight on where a token was found. A hit in a phrasing means more than a hit in the prose. */
const W_QUESTION = 3;
const W_BODY = 1;

/**
 * Below this, decline.
 *
 * Calibrated against two question sets written without looking at the alias
 * lists, 134 questions in all. Tuning it against phrasings already in the bank
 * is how the old threshold ended up meaningless: the probe passed every case
 * while half of what the field answered in the wild was wrong.
 */
export const THRESHOLD = 0.42;

/**
 * Three gates, all of them about whether a match is real rather than lucky.
 *
 * MASS_MIN is absolute matched weight. The score below is a ratio, and ratios
 * cancel the rarity weighting: a one-word query used to score a flawless 1.0
 * on any hit at all, which is how "work" returned the critique answer and
 * "take" returned it again for "how long did this take."
 *
 * IDF_SOLO is what a single word has to be worth to answer on its own.
 * "sysml" earns it. "work", "design", "ship", "data" and "team" do not, and
 * each of those used to return a confident answer.
 *
 * MARGIN declines when the top two are within a hair of each other. Four
 * entries once tied at exactly 1.00 for "who did you work with on this" and
 * the winner was whichever sat earliest in the file. A coin flip presented as
 * an answer is the one outcome worse than silence.
 */
const MASS_MIN = 1.5;
const IDF_SOLO = 3.0;
const MARGIN = 0.03;

/** Pre-tokenised phrasings, built once. */
interface Indexed {
  entry: Answer;
  /** The question and each alias, tokenised separately. See below. */
  fields: string[][];
  body: string[];
}

/**
 * One token list per phrasing, not one bag for all of them.
 *
 * Flattening the question and every alias together let a query match one word
 * from one alias and a second word from a different one, then call that a
 * two-word match. "Have you worked on enterprise software" scored 0.54 against
 * the Figma answer that way: "work" came from "do you work in figma" and
 * "software" from "what software do you use". Neither alias is wrong. Pooling
 * them is. An alias is a whole way of asking the question, so a query is
 * scored against each phrasing on its own and keeps its best.
 */
const INDEX: Indexed[] = ANSWERS.map((entry) => ({
  entry,
  fields: [entry.q, ...entry.aliases].map(tokens).filter((f) => f.length > 0),
  body: tokens(entry.a),
}));

/**
 * How much a word is worth.
 *
 * Weighting by rarity keeps a query whose only hit is a common word from
 * looking like a real match. On its own it was not enough, because the ratio
 * in scoreOne divides it straight back out. It earns its keep through
 * IDF_SOLO, which reads the raw value rather than the ratio.
 */
const DF = new Map<string, number>();
for (const doc of INDEX) {
  for (const t of new Set([...doc.fields.flat(), ...doc.body])) {
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

interface Scored {
  score: number;
  /** Absolute matched weight, before the ratio throws the scale away. */
  earned: number;
  matched: number;
  /** Matches that landed in a phrasing rather than in the prose. */
  askedHits: number;
  /** The rarest single word that matched. */
  soloIdf: number;
}

const NIL: Scored = { score: 0, earned: 0, matched: 0, askedHits: 0, soloIdf: 0 };

function scoreOne(queryTokens: string[], doc: Indexed, scope?: string): Scored {
  if (queryTokens.length === 0) return NIL;

  const possible = queryTokens.reduce((n, t) => n + W_QUESTION * idf(t), 0);
  if (possible === 0) return NIL;

  let best = NIL;

  const consider = (field: string[], weight: number) => {
    let earned = 0;
    let matched = 0;
    let soloIdf = 0;
    for (const t of queryTokens) {
      if (!has(field, t)) continue;
      const w = idf(t);
      earned += weight * w;
      matched++;
      soloIdf = Math.max(soloIdf, w);
    }
    if (matched === 0) return;

    /**
     * How much of what was asked got answered, not just how heavy the hits
     * were. Matching one word of a two-word question should never score like a
     * question that was understood whole, which is how "do you know react
     * native" landed on the answer about being AI native.
     */
    const coverage = matched / queryTokens.length;
    const score = (earned / possible) * (0.45 + 0.55 * coverage);
    if (score > best.score) {
      best = { score, earned, matched, askedHits: weight === W_QUESTION ? matched : 0, soloIdf };
    }
  };

  for (const field of doc.fields) consider(field, W_QUESTION);
  consider(doc.body, W_BODY);

  // Scope is settled by a hard filter in findAnswer. A bonus here only pushed
  // weak matches over the threshold, so there is none.
  void scope;
  return best;
}

/** Whether a match is solid enough to answer with. Ranking is a separate question. */
function eligible(s: Scored, queryTokens: string[]): boolean {
  if (s.matched === 0) return false;
  if (s.earned < MASS_MIN) return false;
  if (s.matched < 2 && s.soloIdf < IDF_SOLO) return false;
  // A hit only in the prose, for a question of several words, is too thin.
  if (queryTokens.length > 1 && s.askedHits === 0) return false;
  return true;
}

interface Candidate {
  entry: Answer;
  scored: Scored;
}

/** Eligible candidates, best first. Ties break on id so file order never decides. */
function candidates(query: string, scope?: string): Candidate[] {
  const queryTokens = tokens(query);
  const inScope = (e: Answer) => !scope || e.scope === "global" || e.scope === scope;
  return INDEX.filter((doc) => inScope(doc.entry))
    .map((doc) => ({ entry: doc.entry, scored: scoreOne(queryTokens, doc, scope) }))
    .filter((c) => eligible(c.scored, queryTokens))
    .sort((a, b) => b.scored.score - a.scored.score || (a.entry.id < b.entry.id ? -1 : 1));
}

export function findAnswer(query: string, scope?: string): Answer | null {
  const q = flatten(query);
  if (!q) return null;

  /**
   * An exact question, or an exact alias, short-circuits the scoring. Scope
   * still decides between them: "What did you get wrong?" is asked verbatim of
   * three different projects, and on the Beacon page it has to be the Beacon
   * answer. This page first, then anything general, then whatever is left.
   *
   * This path is what aliases are for. A short idiomatic phrase nobody can
   * score reliably, "are you ai" or "who are you", belongs here as a whole
   * string. A single common word does not belong in an alias list at all: it
   * can only ever fire through the scorer, where it collides.
   */
  const exact = ANSWERS.filter(
    (e) =>
      (!scope || e.scope === "global" || e.scope === scope) &&
      (flatten(e.q) === q || e.aliases.some((a) => flatten(a) === q)),
  );
  if (exact.length) {
    const mine = scope ? exact.find((e) => e.scope === scope) : undefined;
    return mine ?? exact.find((e) => e.scope === "global") ?? exact[0];
  }

  const ranked = candidates(query, scope);
  if (!ranked.length) return null;
  if (ranked[0].scored.score < THRESHOLD) return null;
  if (ranked[1] && ranked[0].scored.score - ranked[1].scored.score < MARGIN) return null;
  return ranked[0].entry;
}

/** What a case study page offers. Three questions, all of them about itself. */
const PER_PROJECT = 3;

/**
 * Suggested questions for a page.
 *
 * A case study offers three questions about that case study and no general
 * ones. Mixing in a general question made the list longer without making it
 * better: a reader on Beacon wants to interrogate Beacon, and the general
 * questions are one click away on every other page. Three is also what the rail
 * can offer before the field reads as a menu rather than an invitation.
 *
 * Order inside a scope follows the bank, so the arc is editorial: how the work
 * started, how it was made to work, what it left unfinished.
 *
 * Entries flagged `suggest: false` are left out. Those are the questions that
 * plant a doubt a reader did not walk in with. Every one of them still answers
 * if typed, which is the point: being ready for a hard question is not the same
 * as opening with it.
 */
export function suggestionsFor(scope: string | undefined, limit = 6): Answer[] {
  const open = ANSWERS.filter((e) => e.suggest !== false);

  if (scope && scope !== "global") {
    return open.filter((e) => e.scope === scope).slice(0, PER_PROJECT);
  }

  // The general list is curated in the bank rather than falling out of file
  // order, because which questions get offered is an editorial decision.
  const curated = SUGGESTED.map((id) => open.find((e) => e.id === id)).filter(
    (e): e is Answer => Boolean(e),
  );
  const seen = new Set<string>();
  return curated
    .filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)))
    .slice(0, limit);
}

export function answerById(id: string): Answer | undefined {
  return ANSWERS.find((e) => e.id === id);
}

/** For the probe. Returns what was in contention and why, not just the winner. */
export function explain(query: string, scope?: string, n = 3) {
  return candidates(query, scope)
    .slice(0, n)
    .map((c) => ({ id: c.entry.id, score: c.scored.score, matched: c.scored.matched }));
}
