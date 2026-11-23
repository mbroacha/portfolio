/**
 * Beacon splash.
 *
 * A full-bleed band under PROBLEM: the conjunction detail floating over a
 * star field, with the conjunction history panel inset across its right edge.
 * The screen an operator works in, and the data behind the number they act on.
 *
 * The backdrop takes a blurred photograph, the way the Originality splash
 * does, through the `background` prop. With no photo it falls back to a drawn
 * field built from the hero's own vocabulary: the dot grid, the orange wash,
 * and motes that vary in size and brightness with a glow on the bright ones.
 * The fallback is a real picture rather than a holding frame, so the page is
 * never broken while a photo is being chosen.
 *
 * Choosing one, from what the Originality veil cost to tune: judge a candidate
 * on contrast before brightness. A 48px blur flattens almost anything, but a
 * frame with one bright region and deep black elsewhere still pulls the eye
 * off the screens no matter how the veil is set. Deep field, nebula and limb
 * shots all work; a full planet or a bright Earth horizon does not. NASA
 * imagery is public domain, which the Unsplash set behind the Sysgit splash
 * is not quite.
 *
 * In use: star trails, Casey Horner, Unsplash. A long exposure of the sky
 * rotating, so the streaks radiate from a single point. It was chosen for
 * what it is as much as how it looks: the hero above draws two tracks
 * converging, and this is a photograph of nothing but tracks.
 *
 * Processed to the Sysgit set's targets. Cropped to 2.2:1 around the burst,
 * saturation pulled to a mean of 60, then lifted with a gamma curve rather
 * than a linear gain: the trails already sit near 255 and a linear lift clips
 * them flat, which the blur then smears. Mean luminance 100 against a
 * contrast of 26, from 59 and 26.
 *
 * Kept at the source's own 1720px rather than the 800px the Sysgit tiles use.
 * Those tiles are blurred by distance and scale; this one is barely blurred at
 * all, and a 900px version upscaled to the band's width resampled every star
 * into mush before the CSS blur even ran. Quality 68 pays for the resolution:
 * 244 KB, and 7px of blur sits on top of any compression noise.
 *
 * Behind the veil it measures a mean of 49 with a contrast of 8 and a
 * brightest pixel of 75 out of 255, so there is no hot spot anywhere to pull
 * the eye off the screens.
 *
 * The field is still. The hero a few hundred pixels above is a 12s loop, and
 * two moving things in one column compete; the band is the quiet beat.
 *
 * The inset overlaps the main window by about a tenth of its width, enough to
 * read as stacked panels rather than a two-up. It takes the LEFT edge, over
 * the conjunction list: that list is the most repeated thing on the screen and
 * exists as its own capture, whereas the right edge carries the status and
 * messages panels, which are the only place the page can show one operator
 * telling another they will move. Covering those to save a few pixels of
 * overlap would throw away the best evidence on the screen. Below md the inset
 * drops to a sibling, because an overlap at phone width buries the window it
 * is meant to annotate.
 *
 * Both screens are rounded, translucent and, for the inset, shadowed. That is
 * a deliberate departure from the square, flat system: these are product
 * windows, drawn in the product's own language rather than the site's. Opacity
 * sits on the <img>, never the wrapper, so the frame and the inset's shadow
 * stay at full strength while the capture itself goes glassy.
 *
 * Honesty: both foreground images are captures of the shipped product. The
 * object names in them are invented and the figures are dummy data. The field
 * behind is decorative and carries aria-hidden, so it is never announced.
 */
import { asset } from "../../lib/asset";

const ORANGE = "var(--beacon-orange, #F1592B)";

/** Deterministic, so the band does not reshuffle between builds. */
const seeded = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

const MOTES = (() => {
  const rnd = seeded(87878);
  const out: { x: number; y: number; r: number; b: number; solid: boolean }[] = [];
  for (let guard = 0; guard < 6000 && out.length < 52; guard++) {
    const x = rnd() * 1600;
    const y = rnd() * 620;
    if (!out.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 78 ** 2)) continue;
    const t = rnd() ** 3;
    out.push({ x, y, r: 2 + t * 6.4, b: Math.min(0.16 + t * 0.7 + rnd() * 0.16, 1), solid: t > 0.55 });
  }
  return out;
})();

const CSS = `
.bcs-field { position: absolute; inset: 0; overflow: hidden }
.bcs-field img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Oversized so the blur's feathered edge falls outside the band. */
  transform: scale(1.15);
  /* 7px, against the 48px the Originality splash uses. That splash blurs a
     painting, where broad shapes survive anything. Stars are point sources:
     at 48 they are gone and the band is a plain gradient, at 22 the trails
     read but the points do not, and only around 7 can you see that you are
     looking at a sky. The veil below, not the blur, is what holds it back. */
  filter: blur(7px) saturate(1.1);
}
/* Flat scrim, holding the screens off the photograph. Raise the alpha if a
   bright frame fights them. */
.bcs-veil { position: absolute; inset: 0; background: rgba(13, 13, 13, 0.62) }
/* The orange belongs to Beacon, not to the photograph, so it is laid over the
   top rather than left to whatever colour the frame happens to carry. */
.bcs-tint {
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 68% at 50% 46%, rgba(241, 89, 43, 0.16), rgba(13, 13, 13, 0) 72%);
}
/* Grain. An 8-bit blur bands visibly across an area this size, and noise
   dithers the banding out. Overlay rather than a plain alpha, which would lay
   grey film over the image and wash it. */
.bcs-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.34;
  mix-blend-mode: overlay;
  background-size: 160px 160px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E");
}
.bcs-screen { border-radius: 12px; overflow: hidden }
/* On the image, not the wrapper: the frame and shadow stay at full strength. */
.bcs-screen > img { opacity: 0.86 }
.bcs-inset { box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4) }
`;

interface BeaconSplashProps {
  /** Path under /public to a blurred-behind photograph. Omit for the drawn field. */
  background?: string;
}

export const BeaconSplash = ({ background }: BeaconSplashProps) => (
  /* -mx-8 cancels the main column's p-8 so the band runs the full grid cell. */
  <figure className="-mx-8 mb-6">
    <style>{CSS}</style>

    <div className="relative overflow-hidden border-y border-rule bg-page">
      {/* ── the field ───────────────────────────────────────────────── */}
      {background ? (
        <>
          <div className="bcs-field" aria-hidden="true">
            <img src={background} alt="" decoding="async" />
          </div>
          <div className="bcs-veil" aria-hidden="true" />
          <div className="bcs-tint" aria-hidden="true" />
          <div className="bcs-grain" aria-hidden="true" />
        </>
      ) : (
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1600 620"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bcs-wash" cx="50%" cy="46%" r="68%">
            <stop offset="0%" stopColor="#F1592B" stopOpacity="0.15" />
            <stop offset="52%" stopColor="#A43D1D" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bcs-mote" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="32%" stopColor="#eaeaea" stopOpacity="0.17" />
            <stop offset="66%" stopColor="#d9d9d9" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#d9d9d9" stopOpacity="0" />
          </radialGradient>
          <pattern id="bcs-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.4" fill="#fff" fillOpacity="0.04" />
          </pattern>
        </defs>

        <rect width="1600" height="620" fill="#0d0d0d" />
        <rect width="1600" height="620" fill="url(#bcs-dots)" />
        <rect width="1600" height="620" fill="url(#bcs-wash)" />
        <g opacity="0.62">
          {MOTES.map((p, i) =>
            p.solid ? (
              <g key={i} opacity={p.b.toFixed(3)}>
                <circle cx={p.x} cy={p.y} r={(p.r * 4.2).toFixed(2)} fill="url(#bcs-mote)" />
                <circle cx={p.x} cy={p.y} r={p.r.toFixed(2)} fill="#dcdcdc" />
              </g>
            ) : (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.r.toFixed(2)}
                fill="none"
                stroke="#a8a8a8"
                strokeOpacity={p.b.toFixed(3)}
                strokeWidth={Math.max(1.6, p.r * 0.5).toFixed(2)}
              />
            ),
          )}
        </g>
        <rect width="1600" height="620" fill={ORANGE} fillOpacity="0.02" />
      </svg>
      )}

      {/* ── the product ─────────────────────────────────────────────── */}
      <div className="relative px-6 pb-12 pt-12 sm:px-10 md:pb-16 md:pt-16">
        <div className="relative mx-auto max-w-[1100px] md:pb-14">
          <div className="bcs-screen w-full border border-[color:var(--edge)] md:ml-auto md:w-[74%]">
            <img
              src={asset("/case-studies/beacon/conjunction-detail.webp")}
              alt="A conjunction detail screen. Twenty conjunctions listed down the left, the latest conjunction message and its history in the centre, and on the right a panel where an operator takes responsibility for the event and messages the other operator."
              className="block h-auto w-full"
            />
          </div>

          <div className="bcs-screen bcs-inset mt-6 w-full border border-[color:var(--edge)] md:absolute md:bottom-0 md:left-0 md:mt-0 md:w-[36%]">
            <img
              src={asset("/case-studies/beacon/conjunction-history.webp")}
              alt="The latest conjunction message above a history chart, tabbed by probability of collision, miss distance, Mahalanobis distance, covariance and consequence, with each reading marked by the source that reported it and a threshold line across the bottom."
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </figure>
);
