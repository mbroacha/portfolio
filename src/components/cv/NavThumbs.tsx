import { Jackalope } from "./Jackalope";
import { asset } from "../../lib/asset";

/**
 * Nav card thumbnails. Each is a small piece of what the card leads to, held
 * back at rest and revealed when the card is hovered, focused, or is the page
 * the reader is on. The rail stays gray until the reader reaches for it.
 *
 * The reveal keys off the NavCard link: `group` for hover and focus, and
 * aria-current="page" for the active card, so the thumbnail and the card's
 * state can never disagree.
 *
 * All three are decorative (the card's label names the page) and NavCard hides
 * the thumbnail slot from assistive tech. With reduced motion the reveal still
 * happens, without the transition.
 */

/** Shared by all three: what counts as "revealed". */
const revealed = "group-hover:grayscale-0 group-focus-visible:grayscale-0 group-aria-[current=page]:grayscale-0";

/** Work: the four projects, as the four colors they carry through the site. */
export const WorkThumb = () => (
  <span
    className={`grid h-full w-full grid-cols-2 gap-[2px] p-[5px] grayscale transition-[filter] duration-300 ease-out motion-reduce:transition-none ${revealed}`}
  >
    {["sysgit", "beacon", "originality", "gradescope"].map((p) => (
      <span key={p} style={{ backgroundColor: `var(--project-${p})` }} />
    ))}
  </span>
);

/** Folded cloth: alternating light and shadow bands, finer than the eye
    resolves as stripes at 40px. */
const drape: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(90deg, var(--ink-700) 0 2px, #4d4d4d 2px 3px, var(--ink-700) 3px 5px, #2c2c2c 5px 6px)",
};

/** Each half bunches toward its own edge, the way a stage curtain draws back:
    it compresses rather than sliding away whole. */
const panel =
  "absolute inset-y-0 w-1/2 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none group-hover:scale-x-[0.18] group-focus-visible:scale-x-[0.18] group-aria-[current=page]:scale-x-[0.18]";

/** How I Work: a stage curtain. Behind it, the one doing the work. */
export const CurtainThumb = () => (
  <span className="relative block h-full w-full" style={{ backgroundColor: "var(--ink-950)" }}>
    <span className="absolute inset-0 flex items-center justify-center">
      <Jackalope size={22} className="text-primary" />
    </span>
    <span className={`${panel} left-0 origin-left`} style={drape} />
    <span className={`${panel} right-0 origin-right`} style={drape} />
    {/* The valance: a fixed pelmet the panels hang from. */}
    <span className="absolute inset-x-0 top-0 h-[5px]" style={{ backgroundColor: "#2c2c2c" }} />
  </span>
);

/** About: the person. A 96px thumbnail of the About page photo, so every page
    does not download the full 70KB portrait for a 40px square. */
export const PortraitThumb = () => (
  <img
    src={asset("/photos/morgan-thumb.jpg")}
    alt=""
    width={40}
    height={40}
    className={`block h-full w-full bg-transparent object-cover grayscale transition-[filter] duration-300 ease-out motion-reduce:transition-none ${revealed}`}
  />
);
