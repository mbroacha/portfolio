import { cn } from "../../lib/cn";
import { LENS_OPTIONS, type Lens, type LensOption } from "../../lib/useLens";

/**
 * The first thing on the homepage.
 *
 * It is part of the hero, not a layer over it. No modal, no dismissal, no
 * typing theatre. The work list sits directly underneath, so ignoring this
 * costs one scroll and answering it costs one click. The reference is a search
 * field above a list: nobody resents one, because it does not block anything.
 *
 * Deliberately not phrased as a question. "Why are you here?" reads as an
 * interrogation at the door, which is the opposite of the tone a portfolio
 * wants. An offer works better than a demand: the page says what it will do,
 * and the reader can ignore it.
 *
 * When a lens is on it says so and offers a way out. Reordering a page without
 * telling the reader is the thing that makes this pattern feel like a trick.
 */
export const LensPrompt = ({
  lens,
  onSet,
  onClear,
  className,
}: {
  lens: LensOption | null;
  onSet: (id: Lens) => void;
  onClear: () => void;
  className?: string;
}) => (
  <div className={cn("mb-8", className)}>
    {lens ? (
      <div className="cv-meta flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-bone">{lens.label}</span>
        <span className="text-lichen">{lens.applied}</span>
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer border-0 bg-transparent p-0 text-lichen underline underline-offset-4 hover:text-bone"
        >
          Show everything
        </button>
      </div>
    ) : (
      <>
        <div className="cv-subhead mb-3 text-bone">
          <em className="font-display not-italic">Start where it makes sense.</em>
        </div>
        <div className="flex flex-wrap gap-2">
          {LENS_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onSet(o.id)}
              className="cv-meta cursor-pointer border border-hedge bg-transparent px-3 py-1.5 text-lichen hover:border-[color:var(--edge)] hover:text-bone"
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="cv-meta mt-3 text-lichen">
          The page reorders to match. Nothing gets hidden, and scrolling works fine too.
        </div>
      </>
    )}
  </div>
);
