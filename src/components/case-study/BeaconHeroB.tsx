/**
 * Beacon hero: conjunction geometry.
 *
 * Not a screenshot and not a UI. The product's signature form, a conjunction
 * and the maneuver that resolves it, drawn large and treated as graphic design.
 *
 * The sequence is the argument, in this order:
 *   1. wide. Two tracks arrive from different edges, across a field of other
 *      catalogued objects, and converge
 *   2. the camera falls into the place where they converge
 *   3. close. The operator's own threshold draws as a ring
 *   4. the miss distance is measured, and it falls inside the ring
 *   5. the second track lifts away, and the old one stays as a ghost
 *   6. the distance is measured again, outside the ring
 *
 * Step five is the point, and so is what it withholds. Beacon proposes the
 * maneuver and never executes it: the track moves because an operator decided,
 * which is why the label reads PROPOSED.
 *
 * Type: the product's own faces, Montserrat and Inter, the way the Sysgit hero
 * is set in Inter because that is what Sysgit ships. The site's IBM Plex Sans
 * is deliberately absent: this is Beacon's picture, not the portfolio's.
 *
 * The two faces are split by who is speaking. Inter carries the CDM field
 * names, which are the standard's words and the product's data. Montserrat
 * carries PROPOSED MANEUVER and OPERATOR DECIDES, which are Beacon's. That is
 * the whole argument of the image, so it is worth a typographic distinction.
 *
 * Both families are imported inside this component rather than in index.css,
 * so nothing else on the site pays for them and removing the hero removes the
 * request. Move the import up to index.css if a second Beacon artifact needs
 * the same faces.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is a diagram, not a capture.
 *   - No figure appears anywhere, and the gaps are measured geometrically.
 *   - Two labels, and no captions. A ring around an asset is a boundary, and a
 *     rule with end ticks is a measurement; neither needs to be told what it
 *     is. The reader here is a hiring manager, not an operator, so the CDM
 *     field names are gone too.
 *   - The scattered marks are not a count of anything. They are texture that
 *     says the sky is crowded, not a population figure.
 *   - The geometry is schematic. Real conjunction tracks are not coplanar and
 *     this one is, which is the cost of making it legible at a glance.
 *
 * Performance: no SVG filters anywhere. An feGaussianBlur inside the group that
 * gets scaled forces a re-convolve on every frame of the zoom, which is what
 * makes this kind of animation stutter. Every soft edge here is a radial
 * gradient instead, including the mote glow, and the states are opacity and
 * stroke-dashoffset, all of which composite cheaply.
 * will-change on the camera keeps the zoom off the main thread.
 *
 * Motion: a 12s loop. 9s of action, a hold on the resolved close-up, then a
 * fade to black that covers the reset. Every beat is a
 * percentage of that one duration, so the whole sequence retimes from the
 * animation-duration line below and nothing else needs touching. The RESTING
 * state is the resolved state: the camera sits at scale 1, the pre-maneuver
 * object and measure are hidden in the base style, and the old track sits at
 * ghost opacity. With prefers-reduced-motion the reader gets the resolution
 * rather than every state stacked on top of itself.
 */

const ORANGE = "var(--beacon-orange, #F1592B)"; /* Beacon brand orange. */
/* Beacon's own faces. Inter is the data voice, Montserrat the product's. */
const DATA = "Inter, ui-sans-serif, system-ui, sans-serif";
const VOICE = "Montserrat, ui-sans-serif, system-ui, sans-serif";

/* Closest approach, before and after. The offset runs away from the operator's
   own asset, so the maneuver reads as yielding rather than drifting. */
const A = { x: 800, y: 470 }; /* the operator's asset, and the camera's target */
/* B0 sits on the normal to the operator's track, not along it. A miss distance
   drawn parallel to your own path does not read as a miss. */
const B0 = { x: 744, y: 393 }; /* the other object, as the conjunction stands */
/* The maneuver runs along the NORMAL to the other object's own track. Shifting
   it along its own direction slides the object up the path and moves the track
   barely at all, which leaves it cutting the threshold exactly as before. At
   -175 on that normal the new track clears the ring by a readable margin. */
const SHIFT = { x: -166, y: 54 };
const B1 = { x: B0.x + SHIFT.x, y: B0.y + SHIFT.y };
const THRESHOLD = 150;

/* Both tracks run well past the frame, so that at wide the camera sees them
   arrive from off-screen rather than start at the edge. */
const TRACK_A = "M -1240 1432 C -240 1128 400 762 800 470 C 1206 174 1904 -148 2840 -436";
const TRACK_B = "M 168 -990 C 430 -400 640 70 744 393 C 884 820 1190 1320 1600 1940";

/** Deterministic, so the exported still and the live hero agree pixel for pixel. */
const seeded = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

/* Everything else up there. Texture, not a population count: no number is
   claimed and none is readable. Kept clear of the conjunction so the close-up
   stays uncluttered. */
const CATALOG = (() => {
  const rnd = seeded(20222023);
  const out: { x: number; y: number; r: number; b: number; solid: boolean }[] = [];
  for (let guard = 0; guard < 9000 && out.length < 78; guard++) {
    const x = -1120 + rnd() * 3820;
    const y = -560 + rnd() * 2080;
    if ((x - A.x) ** 2 + (y - A.y) ** 2 < 300 ** 2) continue;
    if (!out.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 104 ** 2)) continue;
    /* Size and brightness correlate, the way nearer things look bigger and
       brighter, but loosely: a strict rule reads as a gradient rather than a
       sky. The cubed roll keeps most of them small, so the few large ones
       carry the depth instead of the field turning into polka dots. */
    const t = rnd() ** 3;
    const r = 2.4 + t * 7.2;
    const b = 0.16 + t * 0.72 + rnd() * 0.16;
    out.push({ x, y, r, b: Math.min(b, 1), solid: t > 0.55 });
  }
  return out;
})();

const CSS = `
.bhb * {
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}
.bhb .cam {
  transform-box: view-box;
  transform-origin: ${A.x}px ${A.y}px;
  will-change: transform;
  animation-name: bhbCam;
}
.bhb .trackA { stroke-dasharray: 1; animation-name: bhbDrawA }
.bhb .trackB { stroke-dasharray: 1; animation-name: bhbDrawB }
.bhb .ticks { animation-name: bhbTicks }
.bhb .field { opacity: .55; animation-name: bhbField }
.bhb .ring { stroke-dasharray: 1; animation-name: bhbRing }
.bhb .objA { animation-name: bhbObjA }
.bhb .objB1 { animation-name: bhbObjB1 }
.bhb .tca { animation-name: bhbTca }
.bhb .newTrack { stroke-dasharray: 1; animation-name: bhbNew }
.bhb .mvLabel { animation-name: bhbMv }
.bhb .bloom { animation-name: bhbBreathe }
/* The loop is closed with a shutter rather than by rewinding the camera. The
   cycle ends black and begins black, so the reset happens where nothing is
   visible and the close-up never snaps back to wide. Resting opacity is 0, so
   with animation off the shutter is simply not there. */
.bhb .shutter { opacity: 0; animation-name: bhbShutter }
/* Resting state is the resolved close-up. Every value here is the end state, so
   with animation off the reader gets the resolution rather than the before and
   the after drawn on top of each other. */
.bhb .objB0 { opacity: .22; animation-name: bhbObjB0 }
.bhb .mNear { opacity: 0; animation-name: bhbNear }
.bhb .mFar { animation-name: bhbFar }
.bhb .ghost { opacity: .2; animation-name: bhbGhost }

/* 1. wide, the tracks arrive. 2. the camera falls in. 3. close, it resolves. */
@keyframes bhbCam { 0%, 16.5% { transform: scale(.42) } 31.5%, 75% { transform: scale(1) } }
@keyframes bhbDrawA { 0% { stroke-dashoffset: 1 } 15%, 75% { stroke-dashoffset: 0 } }
@keyframes bhbDrawB { 0%, 2.25% { stroke-dashoffset: 1 } 16.5%, 75% { stroke-dashoffset: 0 } }
@keyframes bhbTicks { 0%, 15% { opacity: 0 } 21%, 75% { opacity: .75 } }
@keyframes bhbField { 0% { opacity: 0 } 7.5%, 25.5% { opacity: 1 } 42%, 75% { opacity: .55 } }
@keyframes bhbObjA { 0%, 28.5% { opacity: 0 } 33.75%, 75% { opacity: 1 } }
@keyframes bhbObjB0 { 0%, 28.5% { opacity: 0 } 33.75%, 49.5% { opacity: 1 } 57%, 75% { opacity: .22 } }
@keyframes bhbObjB1 { 0%, 52.5% { opacity: 0 } 60%, 75% { opacity: 1 } }
@keyframes bhbTca { 0%, 31.5% { opacity: 0 } 37.5%, 75% { opacity: 1 } }
@keyframes bhbRing { 0%, 33% { stroke-dashoffset: 1 } 43.5%, 75% { stroke-dashoffset: 0 } }
@keyframes bhbNear { 0%, 42% { opacity: 0 } 48%, 49.5% { opacity: 1 } 55.5%, 75% { opacity: 0 } }
@keyframes bhbFar { 0%, 58.5% { opacity: 0 } 66%, 75% { opacity: 1 } }
@keyframes bhbGhost { 0%, 49.5% { opacity: 1 } 58.5%, 75% { opacity: .2 } }
@keyframes bhbNew { 0%, 51% { stroke-dashoffset: 1 } 61.5%, 75% { stroke-dashoffset: 0 } }
@keyframes bhbMv { 0%, 51% { opacity: 0 } 60%, 75% { opacity: 1 } }
@keyframes bhbBreathe { 0%, 75% { opacity: .36 } 37.5% { opacity: .54 } }
/* playTwice: two cycles, then hold. 1.94 stops just short of the second
   cycle's shutter (which starts closing at 95%), so with fill-mode both it rests
   on the resolved close-up rather than on black. */
.bhb.twice * { animation-iteration-count: 1.94 }
/* playOnce: one cycle, held on the same resolved frame (0.94 of the cycle). */
.bhb.once * { animation-iteration-count: 0.94 }
@media (prefers-reduced-motion: reduce) { .bhb * { animation: none !important } }
@keyframes bhbShutter { 0% { opacity: 1 } 2.5%, 95% { opacity: 0 } 100% { opacity: 1 } }
`;

/** Measurement rule between two points, with end ticks. A rule with ticks on a
 *  drawing is already a measurement; it does not need to be told it is one. */
const Measure = ({
  from,
  to,
  color,
  className,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  className: string;
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 17;
  const ny = (dx / len) * 17;
  return (
    <g className={className} stroke={color} strokeWidth="5">
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
      <line x1={from.x + nx} y1={from.y + ny} x2={from.x - nx} y2={from.y - ny} />
      <line x1={to.x + nx} y1={to.y + ny} x2={to.x - nx} y2={to.y - ny} />
    </g>
  );
};

export const BeaconHeroB = ({
  bare = false,
  playTwice = false,
  playOnce = false,
}: {
  bare?: boolean;
  /** Run the sequence twice and stop on the resolved state instead of looping. */
  playTwice?: boolean;
  /** Run the sequence once and stop on the resolved state. The case study's
      own hero: the argument plays out a single time, then holds still. */
  playOnce?: boolean;
}) => (
  /* -mx-8 cancels the main column's p-8 so the hero runs the full grid cell. */
  <figure className={bare ? "" : "-mx-8 mb-6"}>
    <style>{CSS}</style>
    <svg
      className={`bhb block w-full ${bare ? "h-full" : "h-auto"}${playTwice ? " twice" : ""}${playOnce ? " once" : ""}`}
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Seen wide, two satellite tracks arrive from different edges across a field of other catalogued objects and converge. The view falls into the place where they meet. A threshold ring draws around the operator's own asset and the miss distance falls inside it. The second track lifts away as a proposed maneuver, leaving the old track as a ghost, and the distance is measured again outside the ring."
    >
      <defs>
        <radialGradient id="bhb-wash" cx="52%" cy="48%" r="66%">
          <stop offset="0%" stopColor="#F1592B" stopOpacity="0.17" />
          <stop offset="50%" stopColor="#A43D1D" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bhb-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F8845C" stopOpacity="0.42" />
          <stop offset="58%" stopColor="#F1592B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F1592B" stopOpacity="0" />
        </radialGradient>
        {/* Mote glow. A gradient halo, not an feGaussianBlur: a filter inside the
            group the camera scales is re-convolved every frame of the zoom, which
            is the thing this file is built to avoid. Only the bright motes carry
            one, which is both cheaper and truer, since dim stars do not bloom. */}
        <radialGradient id="bhb-mote" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="32%" stopColor="#eaeaea" stopOpacity="0.17" />
          <stop offset="66%" stopColor="#d9d9d9" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#d9d9d9" stopOpacity="0" />
        </radialGradient>
        <pattern id="bhb-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#fff" fillOpacity="0.04" />
        </pattern>
      </defs>

      {/* The background does not move with the camera, so it reads as the
          viewport rather than as part of the scene. */}
      <rect width="1600" height="900" fill="#0d0d0d" />
      <rect width="1600" height="900" fill="url(#bhb-dots)" />
      <rect width="1600" height="900" fill="url(#bhb-wash)" />
      <rect className="bloom" x={A.x - 440} y={A.y - 440} width="880" height="880" fill="url(#bhb-bloom)" />

      <g className="cam">
        {/* Everything else in orbit. */}
        <g className="field">
          {CATALOG.map((p, i) =>
            p.solid ? (
              <g key={`c${i}`} opacity={p.b.toFixed(3)}>
                <circle cx={p.x} cy={p.y} r={(p.r * 4.2).toFixed(2)} fill="url(#bhb-mote)" />
                <circle cx={p.x} cy={p.y} r={p.r.toFixed(2)} fill="#dcdcdc" />
              </g>
            ) : (
              <circle
                key={`c${i}`}
                cx={p.x}
                cy={p.y}
                r={p.r.toFixed(2)}
                fill="none"
                stroke="#a8a8a8"
                strokeOpacity={p.b.toFixed(3)}
                strokeWidth={Math.max(1.8, p.r * 0.52).toFixed(2)}
              />
            ),
          )}
        </g>

        {/* The operator's own track. It does not move. */}
        <path className="trackA" pathLength="1" d={TRACK_A} fill="none" stroke={ORANGE} strokeOpacity="0.92" strokeWidth="7" />
        {/* Ephemeris points along it, which is where the track's rhythm comes from. */}
        <path
          className="ticks"
          d={TRACK_A}
          fill="none"
          stroke={ORANGE}
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="0.5 44"
        />

        {/* The other object's track, as the conjunction stands. */}
        <g className="ghost">
          <path className="trackB" pathLength="1" d={TRACK_B} fill="none" stroke="#d9d9d9" strokeOpacity="0.6" strokeWidth="6" />
          <path
            className="ticks"
            d={TRACK_B}
            fill="none"
            stroke="#d9d9d9"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="0.5 44"
          />
        </g>

        {/* The same track after the maneuver. */}
        <g transform={`translate(${SHIFT.x} ${SHIFT.y})`}>
          <path className="newTrack" pathLength="1" d={TRACK_B} fill="none" stroke="#d9d9d9" strokeOpacity="0.88" strokeWidth="6" />
          <path
            className="mvLabel"
            d={TRACK_B}
            fill="none"
            stroke="#d9d9d9"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="0.5 44"
          />
        </g>

        {/* The operator's threshold. Theirs to set, so it is drawn in their color. */}
        <circle
          className="ring"
          cx={A.x}
          cy={A.y}
          r={THRESHOLD}
          pathLength="1"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.55"
          strokeWidth="4"
          strokeDasharray="1"
        />

        <Measure className="mNear" from={A} to={B0} color={ORANGE} />
        <Measure className="mFar" from={A} to={B1} color="#d9d9d9" />

        {/* TCA told the reader nothing. Naming whose asset this is orients them
            in one word, and the moment itself is now carried by the measure. */}
        <g className="tca">
          <line x1={A.x + 24} y1={A.y} x2={A.x + THRESHOLD + 14} y2={A.y} stroke={ORANGE} strokeOpacity="0.6" strokeWidth="3" />
          <text
            x={A.x + THRESHOLD + 28}
            y={A.y + 7}
            fill="#F5DFD6"
            fontFamily={DATA}
            fontSize="19"
            fontWeight="500"
            letterSpacing="0.16em"
          >
            YOUR SATELLITE
          </text>
        </g>

        {/* The two assets. */}
        <circle className="objA" cx={A.x} cy={A.y} r="15" fill={ORANGE} />
        <circle className="objB0" cx={B0.x} cy={B0.y} r="13" fill="#0d0d0d" stroke="#d9d9d9" strokeWidth="5" />
        <circle className="objB1" cx={B1.x} cy={B1.y} r="13" fill="#0d0d0d" stroke="#d9d9d9" strokeWidth="5" />

        {/* Beacon proposes. The operator decides. */}
        <g className="mvLabel" fontFamily={VOICE} letterSpacing="0.15em">
          <path
            d={`M ${B0.x - 14} ${B0.y - 16} Q ${(B0.x + B1.x) / 2 - 38} ${(B0.y + B1.y) / 2} ${B1.x + 2} ${B1.y + 20}`}
            fill="none"
            stroke={ORANGE}
            strokeOpacity="0.7"
            strokeWidth="4"
            strokeDasharray="13 14"
          />
          <line x1={B1.x - 326} y1={B1.y - 74} x2={B1.x - 62} y2={B1.y - 74} stroke={ORANGE} strokeOpacity="0.45" strokeWidth="3" />
          <text x={B1.x - 62} y={B1.y - 46} textAnchor="end" fill={ORANGE} fontSize="18" fontWeight="600">
            PROPOSED MANEUVER
          </text>
        </g>
      </g>

      <rect className="shutter" width="1600" height="900" fill="#0d0d0d" />
    </svg>
  </figure>
);
