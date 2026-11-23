import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Read at first paint, so the first render is already the right one. */
const prefersLessMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A case study hero the reader can drive.
 *
 * Each hero is an argument drawn as a sequence: two tracks converge and one
 * lifts away, a value breaks a relationship and recovers, the plain evidence
 * rises above the model. It plays once and rests on the resolved frame. This
 * gives the reader the two things a drawn argument should allow:
 *
 *   - While it plays, the frame jumps straight to the conclusion. A skimmer
 *     gets the point in one click, and motion longer than five seconds has a
 *     stop, which WCAG 2.2.2 asks for.
 *   - Once it rests, the frame plays the argument again from the start.
 *
 * The still frame and the end of the sequence are the same picture: every
 * hero's base style is its resolved state, which is what reduced motion has
 * always shown. So skipping is just switching the animation off
 * ([data-still] in index.css), and replaying is remounting the drawing.
 *
 * Under prefers-reduced-motion nothing moves, so there is nothing to control
 * and no button is drawn.
 */
export const HeroReplay = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [still] = useState(prefersLessMotion);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<"playing" | "rested">("playing");

  // Rested when every animation in the drawing has finished. Offscreen pausing
  // (PlayWhenVisible) only delays this, which is right: it has not been seen.
  useEffect(() => {
    if (still) return;
    let live = true;
    const frame = requestAnimationFrame(() => {
      const anims = ref.current?.getAnimations?.({ subtree: true }) ?? [];
      if (!anims.length) return;
      void Promise.allSettled(anims.map((a) => a.finished)).then(() => {
        if (live) setPhase("rested");
      });
    });
    return () => {
      live = false;
      cancelAnimationFrame(frame);
    };
  }, [run, still]);

  if (still) return <>{children}</>;

  const playing = phase === "playing";
  const act = () => {
    if (playing) {
      setPhase("rested");
    } else {
      setPhase("playing");
      setRun((r) => r + 1);
    }
  };

  return (
    <div ref={ref} className="relative" data-still={playing ? undefined : ""}>
      <div key={run}>{children}</div>
      {/* Spans the hero, which bleeds 2rem past the column on each side. */}
      <button
        type="button"
        onClick={act}
        aria-label={playing ? "Skip to the end of the drawing" : "Play the drawing again"}
        className={cn(
          "group absolute inset-y-0 -left-8 -right-8 z-10 cursor-pointer border-0 bg-transparent p-0",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px]",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "cv-meta pointer-events-none absolute left-8 top-4 flex items-center gap-1.5 transition-opacity duration-200",
            "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
          )}
          style={{ color: "var(--text-on-media)" }}
        >
          {playing ? (
            // Play head to a stop: the end of the sequence.
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
              <polygon points="1,1 8,6 1,11" />
              <rect x="9" y="1" width="2" height="10" />
            </svg>
          ) : (
            // An arc returning to its start.
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10.2 6.6A4.25 4.25 0 1 1 8.6 2.8" strokeLinecap="round" />
              <polyline points="8.9,0.6 8.9,3.1 6.4,3.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {playing ? "Skip to the end" : "Play again"}
        </span>
      </button>
    </div>
  );
};
