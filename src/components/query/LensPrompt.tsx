import { cn } from "../../lib/cn";
import { LENS_OPTIONS, type Lens, type LensOption } from "../../lib/useLens";

/**
 * The first thing on the homepage.
 *
 * It is the top of the page, not a layer over it. No modal, no dismissal, no
 * typing theatre. The full work list sits directly underneath, so ignoring this
 * costs one scroll and answering it costs one click. The reference is a search
 * field above a list: nobody resents one, because it does not block anything.
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
          <em className="font-display not-italic">Why are you here?</em>
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
          Or scroll. Everything is below either way.
        </div>
      </>
    )}
  </div>
);
