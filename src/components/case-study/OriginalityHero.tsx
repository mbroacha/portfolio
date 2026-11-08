import { useLayoutEffect, useRef, useState } from "react";

/**
 * Originality hero.
 *
 * The product's signature chart, drawn large and treated as graphic design.
 * The model profiled how a student writes and reported it as a stacked
 * sentence-type chart, which is the one picture an educator actually met. Here
 * that chart is blown up until a single column fills a third of the frame, and
 * every column is built out of the writing it measures: short rules at a text
 * pitch, ragged right, a paragraph to a segment.
 *
 * It argues nothing. There is no label, no scale and no copy on the image. The
 * reversal that the case study turns on is the page's job, not the hero's.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is captioned as a diagram.
 *   - A recreation of the chart's form. Not a capture, and not real output.
 *   - Nothing on the image is presented as a measurement. No student, no
 *     submission, no invented property values, no numbers anywhere.
 *
 * Colour: #0C78CF is Turnitin's blue, so the hero is drawn in the product's own
 * language the way the Sysgit hero is drawn in SysML's. Four tints stack in a
 * fixed order, bottom to top, so the columns read as one chart. The ground is
 * near-black shifted toward that blue, which lets the bloom sit inside it
 * rather than on it. Nothing in the image is a flat fill.
 *
 * Motion: it loops and never resolves. Each column breathes between its own two
 * scales over 11 to 19 seconds, alternating, with negative delays so they run
 * out of phase. A one-shot animation makes a point; this is meant to be
 * atmosphere. Only transform and opacity animate, so 24 loops stay on the
 * compositor and nothing re-rasterizes per frame. The RESTING state is
 * scaleY(1), which is both what prefers-reduced-motion gets and the frame the
 * homepage still is cut from.
 */

/*
 * Fixed-pixel stage, scaled to the column, the way the Sysgit SVG scales by its
 * viewBox. Narrower columns shrink the image instead of clipping it.
 */
const STAGE_W = 964;
const STAGE_H = 543;

const TINTS = ["#0a3c66", "#0C78CF", "#3f9ce0", "#8fc8f2"];

const BASELINE = 430;
const BAR_W = 30;
const PITCH = 42;
const START_X = 0; /* flush left, bleeding off the right edge only */
const COUNT = 24;
const H_MIN = 86;
const H_VAR = 226;
const SEG_GAP = 3;
const LINE_H = 3;
const LINE_PITCH = 6;

/* Seeded, so the composition is identical on every render and in the still. */
let seed = 20180502;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

type Line = { x: number; y: number; w: number; fill: string };
type Column = { lines: Line[]; lo: string; hi: string; dur: string; delay: string };

const COLUMNS: Column[] = (() => {
  const out: Column[] = [];
  for (let i = 0; i < COUNT; i++) {
    const total = H_MIN + rnd() * H_VAR;
    const col: Column = {
      lines: [],
      lo: (0.84 + rnd() * 0.06).toFixed(3),
      hi: (1.06 + rnd() * 0.08).toFixed(3),
      dur: (11 + rnd() * 8).toFixed(1) + "s",
      delay: "-" + (rnd() * 12).toFixed(1) + "s",
    };

    const props: number[] = [];
    let sum = 0;
    for (let t = 0; t < TINTS.length; t++) {
      const p = 0.12 + rnd() * 0.5;
      props.push(p);
      sum += p;
    }

    const x = START_X + i * PITCH;
    let y = BASELINE;
    for (let u = 0; u < TINTS.length; u++) {
      let segH = (props[u] / sum) * total - SEG_GAP;
      if (segH < 4) segH = 4;
      y -= segH;
      /* The segment is a little paragraph: short rules, ragged right. */
      for (let ly = y; ly < y + segH - LINE_H + 0.5; ly += LINE_PITCH) {
        col.lines.push({ x, y: ly, w: BAR_W * (0.52 + rnd() * 0.48), fill: TINTS[u] });
      }
      y -= SEG_GAP;
    }
    out.push(col);
  }
  return out;
})();

const CSS = `
.oh-wrap .oh-frame{position:relative;overflow:hidden;aspect-ratio:${STAGE_W}/${STAGE_H}}
.oh-wrap .oh{position:absolute;left:0;top:0;width:${STAGE_W}px;height:${STAGE_H}px;transform-origin:0 0;overflow:hidden;background:#0b1016}
.oh-wrap .oh-layer{position:absolute;inset:0}

.oh-wrap .oh-bar{transform-origin:center bottom;animation-name:ohBreathe;animation-iteration-count:infinite;animation-direction:alternate;animation-timing-function:cubic-bezier(.45,0,.55,1)}
@keyframes ohBreathe{from{transform:scaleY(var(--lo))}to{transform:scaleY(var(--hi))}}

.oh-wrap .oh-bloom{animation:ohBloom 24s ease-in-out infinite alternate}
@keyframes ohBloom{from{opacity:.82}to{opacity:1}}

@media (prefers-reduced-motion: reduce){.oh-wrap .oh-bar,.oh-wrap .oh-bloom{animation:none !important}}
`;

const useStageScale = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / STAGE_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
};

export const OriginalityHero = () => {
  const { ref, scale } = useStageScale();
  return (
    /* -mx-8 cancels the main column's p-8, matching the Sysgit hero. */
    <figure className="oh-wrap -mx-8 mb-6">
      <style>{CSS}</style>
      <div className="oh-frame" ref={ref}>
        <div className="oh" style={{ transform: `scale(${scale})` }}>
          <svg
            className="oh-layer"
            width={STAGE_W}
            height={STAGE_H}
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="ohBloomGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0C78CF" stopOpacity="0.30" />
                <stop offset="55%" stopColor="#0C78CF" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#0C78CF" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse className="oh-bloom" cx={482} cy={418} rx={620} ry={300} fill="url(#ohBloomGrad)" />

            {COLUMNS.map((col, i) => (
              <g
                key={i}
                className="oh-bar"
                style={
                  {
                    "--lo": col.lo,
                    "--hi": col.hi,
                    animationDuration: col.dur,
                    animationDelay: col.delay,
                  } as React.CSSProperties
                }
              >
                {col.lines.map((l, j) => (
                  <rect key={j} x={l.x} y={l.y} width={l.w} height={LINE_H} fill={l.fill} />
                ))}
              </g>
            ))}

            {/* A soft band under a hairline, the way a lit edge reads. */}
            <rect x={0} y={BASELINE - 3} width={STAGE_W} height={7} fill="#0C78CF" opacity="0.16" />
            <rect x={0} y={BASELINE} width={STAGE_W} height={1} fill="#8fc8f2" opacity="0.55" />
          </svg>

          {/* Static grain. Rasterizes once; nothing animated sits inside it. */}
          <svg
            className="oh-layer"
            width={STAGE_W}
            height={STAGE_H}
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            aria-hidden="true"
            style={{ mixBlendMode: "overlay", opacity: 0.06, pointerEvents: "none" }}
          >
            <filter id="ohGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} stitchTiles="stitch" />
            </filter>
            <rect width={STAGE_W} height={STAGE_H} filter="url(#ohGrain)" />
          </svg>
        </div>
      </div>
    </figure>
  );
};
