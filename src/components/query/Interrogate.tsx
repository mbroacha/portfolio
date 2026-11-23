import { useId, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PhotoGrid } from "../cv/PhotoGrid";
import { DECLINE, findAnswer, suggestionsFor, type Answer } from "../../lib/retrieval";

/**
 * Interrogation. A reader pulls on the hard questions rather than being pitched.
 *
 * Not a chatbot: no persona, no greeting, no thinking theatre. Every answer was
 * written in advance and carries its source, and following that source scrolls
 * the argument column to the passage it came from. The field routes people into
 * the static case study; it does not talk at them.
 *
 * One component, two placements. `CvPage` renders it in the sticky rail at `lg`
 * and up, and in `SiteFooter` after the content below that, because asking a
 * question before reading the case study is backwards on a phone.
 */

const HIGHLIGHT_MS = 1600;

/** The offered questions, as one-click buttons. Shown before anything is asked
    and again under a decline. */
const SuggestionList = ({
  suggestions,
  onPick,
  className,
}: {
  suggestions: Answer[];
  onPick: (q: string) => void;
  className?: string;
}) => (
  <ul className={`flex list-none flex-col p-0 ${className ?? ""}`}>
    {suggestions.map((s) => (
      <li key={s.id}>
        <button
          type="button"
          onClick={() => onPick(s.q)}
          className="cursor-pointer border-0 bg-transparent px-0 py-1 text-left text-tertiary underline decoration-transparent underline-offset-4 hover:text-primary hover:decoration-[color:var(--edge)]"
        >
          {s.q}
        </button>
      </li>
    ))}
  </ul>
);

export const Interrogate = ({ scope, className }: { scope?: string; className?: string }) => {
  const [draft, setDraft] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [hit, setHit] = useState<Answer | null>(null);

  // The field renders twice on every page, once for the rail and once for
  // mobile. A hardcoded id would collide and break the label association.
  const fieldId = useId();
  const hintId = useId();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const suggestions = suggestionsFor(scope);

  const run = (question: string) => {
    setAsked(question);
    setHit(findAnswer(question, scope));
    setDraft("");
  };

  const followSource = (a: Answer) => {
    const src = a.source;
    if (!src) return;
    if (src.path !== pathname) {
      navigate(src.anchor ? `${src.path}#${src.anchor}` : src.path);
      return;
    }
    if (!src.anchor) return;
    const el = document.getElementById(src.anchor);
    if (!el) return;
    // A smooth scroll is motion; with reduced motion set, jump instead. The
    // highlight that follows is a color fade, not movement, so it stays.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    el.classList.add("cv-hl");
    window.setTimeout(() => el.classList.remove("cv-hl"), HIGHLIGHT_MS);
  };

  return (
    <div className={className}>
      {/* The visible label is the field's label, so a screen reader announces
          the same words a sighted reader sees. The hint answers the question
          the field raises next to an AI-themed nav item: is this a chatbot? */}
      <label htmlFor={fieldId} className="block uppercase text-primary" style={{ letterSpacing: "var(--tracking-label)" }}>
        Ask me anything
      </label>
      <p id={hintId} className="mb-2.5 mt-1 text-tertiary">
        Answers I wrote in advance. No AI.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) run(draft);
        }}
      >
        <input
          id={fieldId}
          aria-describedby={hintId}
          type="text"
          enterKeyHint="search"
          maxLength={200}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a question"
          autoComplete="off"
          // Border: --edge, not --rule. --rule (#333) on the field's #161616 was
          // 1.43:1, so the field's edge was invisible (WCAG 1.4.11 wants 3:1);
          // --edge is about 3.6:1. Focus brightens it to primary text and keeps the
          // site focus ring. 16px below lg: iOS zooms the page into any
          // focused input set smaller than that.
          className="w-full border border-[color:var(--edge)] bg-page px-2.5 py-2 text-[16px] text-tertiary placeholder:text-tertiary focus:border-primary focus:text-primary lg:text-[length:inherit]"
        />
      </form>

      {/* The answer swaps in without a page change, so a screen reader would
          not know anything happened. This region stays mounted and announces
          whatever lands in it. */}
      <div aria-live="polite">
        {asked === null ? (
          <SuggestionList className="mt-2" suggestions={suggestions} onPick={run} />
        ) : (
          <div className="mt-3.5 border-l border-[color:var(--edge)] pl-3">
            {/* A typed question echoes back as-is; break-words keeps an unbroken
              string (a pasted URL) from pushing the rail sideways. */}
            <div className="mb-1.5 break-words text-tertiary">{asked}</div>

            {hit ? (
              <>
                <div className="text-primary">{hit.a}</div>

                {hit.swatch ? (
                  <div className="mt-2.5 flex items-center gap-2">
                    <span
                      className="inline-block h-5 w-5 border border-[color:var(--edge)]"
                      style={{ backgroundColor: hit.swatch.hex }}
                      aria-hidden="true"
                    />
                    <span className="text-tertiary">{hit.swatch.hsl}</span>
                  </div>
                ) : null}

                {hit.photos ? <PhotoGrid photos={hit.photos} /> : null}

                {hit.source ? (
                  <button
                    type="button"
                    onClick={() => followSource(hit)}
                    className="mt-1.5 cursor-pointer border-0 bg-transparent px-0 py-1 text-left text-tertiary underline underline-offset-4 hover:text-primary"
                  >
                    {hit.source.label} &rarr;
                  </button>
                ) : null}
              </>
            ) : (
              <>
                {/* A decline is a dead end only if it stops there. Hand the
                    reader the questions that do have answers, one click each,
                    instead of making them find "Other questions" first. No
                    nearest-match guessing: the threshold exists because a
                    confident wrong answer is worse than none. */}
                <div className="text-primary">{DECLINE}</div>
                <div className="mt-2.5 text-tertiary">I have written about these:</div>
                <SuggestionList suggestions={suggestions} onPick={run} />
              </>
            )}

            {hit ? (
              <button
                type="button"
                onClick={() => {
                  setAsked(null);
                  setHit(null);
                }}
                className="mt-2 block cursor-pointer border-0 bg-transparent px-0 py-1 text-left text-tertiary underline underline-offset-4 hover:text-primary"
              >
                Other questions
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
