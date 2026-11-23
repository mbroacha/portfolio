/**
 * Sysgit splash.
 *
 * A full-bleed band under THE PRODUCT: the graph window floating over a
 * drifting field, with the requirements table inset across its lower right.
 * Two surfaces of one model, which is the page's argument in a single picture.
 *
 * Depth is carried by rate, not by blur. Two bands:
 *
 *   back    background tiles   120s
 *   front   window and inset   still
 *
 * The track holds its tile list twice and translates exactly -50%, so the loop
 * has no seam. That only holds while the two halves are identical, which is why
 * the image index below is taken modulo BG_TILES.length first: any other count
 * of images would otherwise paint the second half differently and the loop
 * would jump. Motion is decorative: under prefers-reduced-motion the track
 * stops, and a stopped track is the composed picture rather than a broken one.
 *
 * The field fills the band's full height. Tile heights and offsets are
 * percentages rather than pixels because the band's height follows the window
 * capture, which follows the column width; fixed pixels would pool the tiles at
 * the top on a wide screen. They are applied as `top` and `height` on an
 * absolutely positioned child, never as a percentage margin, which would
 * resolve against width and collapse the rhythm.
 *
 * The two screens are rounded, translucent and, for the inset, shadowed. That
 * is a deliberate departure from the square, flat system: these are product
 * windows, drawn in the product's own language rather than the site's. Opacity
 * sits on the <img>, never the wrapper, so the frame and the inset's shadow
 * stay at full strength while the capture itself goes glassy.
 *
 * Honesty, per the page's scope rule: both foreground images are captures of
 * the shipped product on the published demo model.
 * The background is stock photography, decorative, and carries alt="" behind an
 * aria-hidden wrapper, so it is never announced as content.
 *
 * Background sources, Unsplash, for a credits list if one is ever wanted:
 *   bg-circuit  umberto · bg-control-room  rita-daisy · bg-blueprint  amsterdam-city-archives
 *   bg-geometry the-new-york-public-library · bg-code mohammad-rahmani · bg-jet cook-aynne
 *   bg-turbine  objecttype-raw · bg-engine c-joyful · bg-abstract sufyan
 *
 * Each was capped at 800px on the long edge, levelled to a common mean
 * luminance of 100 and contrast of ~40, saturation pulled toward 60, then
 * written as webp: 302 KB for all nine, down from 5.6 MB. Before levelling the
 * set ran from a mean luminance of 42 to 224, so some tiles glowed and others
 * vanished against the near-black field. Colour is kept in the file and removed
 * in CSS, so the treatment stays tunable without reprocessing.
 */

import { cn } from "../../lib/cn";
import { asset } from "../../lib/asset";

interface SysgitSplashProps {
  /** Paths under /public. Cycled across the tile rhythm below. */
  backgroundImages?: string[];
}

/**
 * The background rhythm. `w` is px; `h` and `top` are percentages of the band
 * height. Widths, heights and offsets are all deliberately uneven so the strip
 * reads as a scattered field rather than a filmstrip, and the offsets are
 * staggered so the set covers the band top to bottom. The strip is clipped, so
 * tiles may hang past either edge.
 */
const BG_TILES = [
  { w: 300, h: 42, top: 2 },
  { w: 170, h: 55, top: 30 },
  { w: 380, h: 34, top: 10 },
  { w: 210, h: 62, top: 22 },
  { w: 260, h: 38, top: 56 },
  { w: 330, h: 48, top: 4 },
  { w: 190, h: 44, top: 48 },
  { w: 290, h: 36, top: 12 },
  { w: 230, h: 58, top: 34 },
] as const;

/**
 * Ordered to sit the portrait images in the portrait tiles and the landscape
 * ones in the landscape tiles, so object-cover crops as little as possible.
 * Reorder freely; the list is read positionally.
 */
const BG = asset("/case-studies/sysgit/bg");
const DEFAULT_BACKGROUND = [
  `${BG}/bg-circuit.webp`,
  `${BG}/bg-control-room.webp`,
  `${BG}/bg-blueprint.webp`,
  `${BG}/bg-geometry.webp`,
  `${BG}/bg-code.webp`,
  `${BG}/bg-jet.webp`,
  `${BG}/bg-turbine.webp`,
  `${BG}/bg-engine.webp`,
  `${BG}/bg-abstract.webp`,
];

/* The knobs for the glass treatment, in one place. */
const CSS = `
.sgs-track { display: flex; width: max-content; height: 100% }
/* The track used to drift on an endless 120s loop. Motion behind two product
   captures was decoration with no stop, so it now holds on the composed frame
   for everyone, which is what reduced motion always showed. */
.sgs-screen { border-radius: 12px; overflow: hidden }
/* On the image, not the wrapper: the frame and shadow stay at full strength. */
.sgs-screen > img { opacity: 0.85 }
.sgs-inset { box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4) }
`;

/** Empty slot. Same diagonal frame MediaSlot uses, so the two read as one system. */
const Slot = ({ className }: { className?: string }) => (
  <div className={cn("relative h-full w-full border border-[color:var(--edge)]", className)}>
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="2" y1="2" x2="98" y2="98" stroke="var(--edge)" strokeWidth="0.3" />
    </svg>
  </div>
);

export const SysgitSplash = ({ backgroundImages = DEFAULT_BACKGROUND }: SysgitSplashProps) => {
  // The track holds its list twice; -50% lands exactly on the second copy.
  const bgRun = [...BG_TILES, ...BG_TILES];

  return (
    /* -mx-8 cancels the main column's p-8 so the band runs the full grid cell. */
    <figure className="-mx-8 mb-6">
      <style>{CSS}</style>

      <div className="relative overflow-hidden border-y border-rule bg-page">
        {/* ── back: the drifting field, full height ──────────────────── */}
        <div className="sgs-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="sgs-track gap-6 px-6">
            {bgRun.map((tile, i) => {
              // Index within the base list, never the doubled run, or the two
              // halves diverge and the -50% loop jumps.
              const src = backgroundImages.length
                ? backgroundImages[(i % BG_TILES.length) % backgroundImages.length]
                : undefined;
              return (
                <div key={i} className="relative h-full shrink-0" style={{ width: tile.w }}>
                  <div
                    className="absolute inset-x-0"
                    style={{ top: `${tile.top}%`, height: `${tile.h}%` }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt=""
                        decoding="async"
                        className="h-full w-full object-cover grayscale"
                      />
                    ) : (
                      <Slot />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── front: the product, still ──────────────────────────────── */}
        <div className="relative px-6 pb-12 pt-12 sm:px-10 md:pb-16 md:pt-16">
          <div className="relative mx-auto max-w-[1100px] md:pb-24">
            <div className="sgs-screen w-full border border-[color:var(--edge)] md:w-[78%]">
              <picture className="contents">
                <source type="image/avif" srcSet={asset("/case-studies/sysgit/graph-view.avif")} />
                <img
                  src={asset("/case-studies/sysgit/graph-view.png")}
                  alt="The Sysgit graph view on the spacecraft branch. Requirement cards for the payload and deployability groups, each listing its documentation and attributes, connected by verify relationships to two verification cases that both report a passing verdict."
                  className="block h-auto w-full"
                />
              </picture>
            </div>

            {/*
              Below md the inset is a sibling, because an overlap at phone width
              buries the window it is meant to annotate.
            */}
            <div className="sgs-screen sgs-inset mt-6 w-full border border-[color:var(--edge)] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[46%]">
              <img
                src={asset("/case-studies/sysgit/requirements-inset.png")}
                alt="The same model as a requirements table. Four deployability requirements with their identifiers, documentation and attributes, including crew size, launch footprint and setup time."
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

    </figure>
  );
};
