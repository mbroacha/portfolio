import { asset } from "../../lib/asset";
/**
 * Originality splash.
 *
 * The Sysgit splash's quieter sibling: one screen floating over a soft field,
 * placed on the same beat, after the opening prose and before the next
 * section. Static by request, so there is no track, no keyframes and nothing
 * for prefers-reduced-motion to switch off.
 *
 * The background is a painting or photograph, blurred hard enough that it
 * reads as colour and light rather than as a picture of something. The one in
 * use is the top-left corner of Francesco Zuccarelli's 1744 pastoral
 * landscape: open sky between two stands of trees. Zuccarelli died in 1788,
 * so the work is long out of copyright. The crop was chosen for its
 * composition as much as its light. The sky is brightest through the middle,
 * which is exactly where the screen sits, and the foliage closes both edges,
 * so the blurred field frames the capture instead of competing with it.
 *
 * An earlier pass used a crop of Delacroix's The Education of Achilles, kept
 * at bg-achilles.webp. Swapping the `background` prop at the call site is the
 * only change needed to go back to it. It is
 * blurred here rather than in the file, so the source stays replaceable and
 * the blur stays tunable. Two things make that work:
 *
 *   scale(1.15)  a blurred element samples past its own edges and feathers
 *                to transparent; oversizing pushes that seam out of frame
 *   the veil     a flat scrim between field and screen, because a white UI
 *                over an unmuted painting is unreadable
 *
 * No gradient anywhere, per tokens.css. The veil is a flat fill.
 *
 * Until a background is supplied the band is the plain near-black field, which
 * is a composition rather than a hole: the screen keeps its frame and shadow
 * and still reads as floating.
 *
 * Resolution, worth knowing before this goes out: authorship-banner.png is
 * 1024px wide. The Sysgit capture was 2830. The screen is capped at 880px here
 * so it is always downscaled rather than stretched, which is the sharpest this
 * source can look, but it will still be soft on a retina display. A larger
 * export is the only real fix.
 *
 * Four knobs, all literals in the CSS below: the blur radius, the veil's
 * alpha, the grain's opacity, and the screen's opacity, which is 1 here.
 * Sysgit's screens sit at 0.85 because they float over a near-black field;
 * over a painting, translucency costs more legibility than it buys.
 */

interface OriginalitySplashProps {
  /**
   * Path under /public to the painting or photograph. Any size or aspect
   * ratio: it is cropped with object-cover and blurred past recognition.
   * Omit for the plain field.
   */
  background?: string;
  /** Override if the foreground capture changes. */
  src?: string;
  alt?: string;
}

const CSS = `
.ors-field { position: absolute; inset: 0; overflow: hidden }
.ors-field img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Oversized so the blur's feathered edge falls outside the band. */
  transform: scale(1.15);
  filter: blur(48px) saturate(1.15);
}
/* Flat scrim. Raise the alpha if a bright painting fights the screen.
   0.42 suits the Zuccarelli, which needed almost nothing doing to it. The
   crop came off the canvas at a mean luminance of 167 against a contrast of
   42, which a grid search over the whole painting found to be the flattest
   bright window available at this ratio. No gamma lift at all, only chroma
   pushed out by 1.35 because the sky is pale and desaturates further behind
   the veil. It sits at an effective 106, where the Delacroix reached 96.

   Two rules earned the hard way, for whatever replaces it. Judge a candidate
   on contrast before brightness: the Delacroix was not dark on average, it
   had deep foliage anchoring the eye, and no exposure change fixes that.
   And fix a dark source in the file rather than here, because thinning the
   veil toward 0 leaves nothing holding the screen off the background. */
.ors-veil { position: absolute; inset: 0; background: rgba(22, 22, 22, 0.42) }
/* Grain. feTurbulence, desaturated, tiled seamlessly by stitchTiles.
   It does two jobs. An 8-bit blur bands visibly across an area this large
   and noise dithers the banding out, and grain is most of what makes a
   soft field read as photographic rather than as a CSS gradient.
   Overlay rather than a plain alpha, which would lay grey film over the
   image and wash it. It sits above the veil and below the screen, so the
   capture itself is never grained: it is already soft at 1024px and does
   not need help. Raise baseFrequency for finer grain. */
.ors-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.38;
  mix-blend-mode: overlay;
  background-size: 160px 160px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E");
}
.ors-screen { border-radius: 12px; overflow: hidden }
.ors-screen > img { opacity: 1 }
.ors-screen { box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4) }
`;

export const OriginalitySplash = ({
  background,
  src = asset("/case-studies/originality/authorship-banner.png"),
  alt = "The Originality report with three authorship charts lifted onto cards above it, each plotting a student's submissions across August to October.",
}: OriginalitySplashProps) => (
  /* -mx-8 cancels the main column's p-8 so the band runs the full grid cell. */
  <figure className="-mx-8 mb-6">
    <style>{CSS}</style>

    <div className="relative overflow-hidden border-y border-hedge bg-moss">
      {background ? (
        <div className="ors-field" aria-hidden="true">
          <img src={background} alt="" decoding="async" />
        </div>
      ) : null}
      <div className="ors-veil" aria-hidden="true" />
      <div className="ors-grain" aria-hidden="true" />

      <div className="relative px-6 py-14 sm:px-10 md:py-20">
        <div className="ors-screen mx-auto w-full max-w-[880px] border border-[color:var(--edge)]">
          <img src={src} alt={alt} className="block h-auto w-full" />
        </div>
      </div>
    </div>
  </figure>
);
