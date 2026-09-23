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
 * One component, two placements. `CvPage` renders it in the sticky rail at `md`
 * and up, and as a section after the last one below that, because asking a
 * question before reading the case study is backwards on a phone.
 */

const HIGHLIGHT_MS = 1600;

export const Interrogate = ({ scope, className }: { scope?: string; className?: string }) => {
  const [draft, setDraft] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [hit, setHit] = useState<Answer | null>(null);

  // The field renders twice on every page, once for the rail and once for
  // mobile. A hardcoded id would collide and break the label association.
  const fieldId = useId();
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
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("cv-hl");
    window.setTimeout(() => el.classList.remove("cv-hl"), HIGHLIGHT_MS);
  };

  return (
    <div className={className}>
      <div className="mb-2.5 uppercase text-bone" style={{ letterSpacing: "var(--tracking-label)" }}>
        Ask
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) run(draft);
        }}
      >
        <label className="sr-only" htmlFor={fieldId}>
          Ask a question about this work
        </label>
        <input
          id={fieldId}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a question"
          autoComplete="off"
          className="w-full border border-hedge bg-moss px-2.5 py-2 text-lichen placeholder:text-lichen focus:border-[color:var(--edge)] focus:text-bone focus:outline-none"
        />
      </form>

      {asked === null ? (
        <ul className="mt-3 flex list-none flex-col gap-1.5 p-0">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => run(s.q)}
                className="cursor-pointer border-0 bg-transparent p-0 text-left text-lichen underline decoration-transparent underline-offset-4 hover:text-bone hover:decoration-[color:var(--edge)]"
              >
                {s.q}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3.5 border-l border-[color:var(--edge)] pl-3">
          <div className="mb-1.5 text-lichen">{asked}</div>

          {hit ? (
            <>
              <div className="text-bone">{hit.a}</div>

              {hit.swatch ? (
                <div className="mt-2.5 flex items-center gap-2">
                  <span
                    className="inline-block h-5 w-5 border border-[color:var(--edge)]"
                    style={{ backgroundColor: hit.swatch.hex }}
                    aria-hidden="true"
                  />
                  <span className="text-lichen">{hit.swatch.hsl}</span>
                </div>
              ) : null}

              {hit.photos ? <PhotoGrid photos={hit.photos} /> : null}

              {hit.source ? (
                <button
                  type="button"
                  onClick={() => followSource(hit)}
                  className="mt-2.5 cursor-pointer border-0 bg-transparent p-0 text-left text-lichen underline underline-offset-4 hover:text-bone"
                >
                  {hit.source.label} &rarr;
                </button>
              ) : null}
            </>
          ) : (
            <div className="text-bone">{DECLINE}</div>
          )}

          <button
            type="button"
            onClick={() => {
              setAsked(null);
              setHit(null);
            }}
            className="mt-3 block cursor-pointer border-0 bg-transparent p-0 text-left text-lichen underline underline-offset-4 hover:text-bone"
          >
            Other questions
          </button>
        </div>
      )}
    </div>
  );
};
