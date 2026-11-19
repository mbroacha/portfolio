/**
 * Beacon hero, option B: conjunction geometry.
 *
 * Not a screenshot and not a UI. The product's signature form, a conjunction
 * and the maneuver that resolves it, drawn large and treated as graphic design.
 *
 * The sequence is the argument, in this order:
 *   1. two tracks draw across the frame and converge
 *   2. both objects appear at closest approach, and the time is marked
 *   3. the operator's own threshold draws as a ring
 *   4. the miss distance is measured, and it falls inside the ring
 *   5. the second track lifts away, and the old one stays as a ghost
 *   6. the distance is measured again, outside the ring
 *
 * Step five is the point, and so is what it withholds. Beacon proposes the
 * maneuver and never executes it: the track moves because an operator decided,
 * which is why the label reads PROPOSED.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is a diagram, not a capture.
 *   - No figure appears anywhere. The gaps are measured geometrically and the
 *     labels are bare CDM field names, so nothing here is a fabricated value.
 *   - TCA, MISS_DISTANCE and THRESHOLD are real fields an operator reads.
 *   - The geometry is schematic. Real conjunction tracks are not coplanar and
 *     this one is, which is the cost of making it legible at a glance.
 *
 * Performance: no SVG filters. States are opacity and stroke-dashoffset only;
 * the wash and the bloom are gradients that rasterize once.
 *
 * Motion: one 11s pass, then it holds the resolved geometry. The RESTING state
 * is the resolved state, which is why the pre-maneuver measure is hidden in the
 * base style: with prefers-reduced-motion the reader gets the resolution rather
 * than both states stacked on each other.
 */

const ORANGE = "var(--beacon-orange, #FF6A13)"; /* stand-in. Swap for Slingshot's brand orange. */

/* Closest approach, before and after. The offset runs away from the operator's
   own asset, so the maneuver reads as yielding rather than drifting. */
const A = { x: 800, y: 470 }; /* the operator's asset */
const B0 = { x: 862, y: 416 }; /* the other object, as the conjunction stands */
const B1 = { x: 1012, y: 284 }; /* the other object, after the maneuver */
const THRESHOLD = 150;

const CSS = `
.bhb * {
  animation-duration: 11s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}
.bhb .trackA { stroke-dasharray: 1; animation-name: bhbDraw }
.bhb .trackB { stroke-dasharray: 1; animation-name: bhbDrawB }
.bhb .ring { stroke-dasharray: 1; animation-name: bhbRing }
.bhb .objA { animation-name: bhbObjA }
.bhb .objB0 { animation-name: bhbObjB0 }
.bhb .objB1 { animation-name: bhbObjB1 }
.bhb .tca { animation-name: bhbTca }
/* Resting state is the resolved state: the near measure is hidden, the far one shown. */
.bhb .mNear { opacity: 0; animation-name: bhbNear }
.bhb .mFar { animation-name: bhbFar }
.bhb .ghost { animation-name: bhbGhost }
.bhb .newTrack { stroke-dasharray: 1; animation-name: bhbNew }
.bhb .mvLabel { animation-name: bhbMv }
.bhb .bloom { animation-name: bhbBreathe }
@keyframes bhbDraw { 0% { stroke-dashoffset: 1 } 16%, 100% { stroke-dashoffset: 0 } }
@keyframes bhbDrawB { 0%, 4% { stroke-dashoffset: 1 } 20%, 100% { stroke-dashoffset: 0 } }
@keyframes bhbObjA { 0%, 18% { opacity: 0 } 24%, 100% { opacity: 1 } }
@keyframes bhbObjB0 { 0%, 18% { opacity: 0 } 24%, 62% { opacity: 1 } 72%, 100% { opacity: 0 } }
@keyframes bhbObjB1 { 0%, 66% { opacity: 0 } 76%, 100% { opacity: 1 } }
@keyframes bhbTca { 0%, 22% { opacity: 0 } 28%, 100% { opacity: 1 } }
@keyframes bhbRing { 0%, 28% { stroke-dashoffset: 1 } 42%, 100% { stroke-dashoffset: 0 } }
@keyframes bhbNear { 0%, 40% { opacity: 0 } 48%, 62% { opacity: 1 } 70%, 100% { opacity: 0 } }
@keyframes bhbFar { 0%, 74% { opacity: 0 } 84%, 100% { opacity: 1 } }
@keyframes bhbGhost { 0%, 62% { opacity: 1 } 74%, 100% { opacity: .22 } }
@keyframes bhbNew { 0%, 64% { stroke-dashoffset: 1 } 78%, 100% { stroke-dashoffset: 0 } }
@keyframes bhbMv { 0%, 64% { opacity: 0 } 74%, 100% { opacity: 1 } }
@keyframes bhbBreathe { 0%, 100% { opacity: .38 } 50% { opacity: .56 } }
@media (prefers-reduced-motion: reduce) { .bhb * { animation: none !important } }
`;

/** Measurement rule between two points, with end ticks. */
const Measure = ({
  from,
  to,
  color,
  label,
  className,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  label: string;
  className: string;
}) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * 9;
  const ny = (dx / len) * 9;
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <g className={className} stroke={color} strokeWidth="1.5">
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
      <line x1={from.x + nx} y1={from.y + ny} x2={from.x - nx} y2={from.y - ny} />
      <line x1={to.x + nx} y1={to.y + ny} x2={to.x - nx} y2={to.y - ny} />
      <text
        x={mid.x}
        y={mid.y - 14}
        transform={`rotate(${angle} ${mid.x} ${mid.y})`}
        textAnchor="middle"
        stroke="none"
        fill={color}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="17"
        letterSpacing="0.12em"
      >
        {label}
      </text>
    </g>
  );
};

export const BeaconHeroB = () => (
  /* -mx-8 cancels the main column's p-8 so the hero runs the full grid cell. */
  <figure className="-mx-8 mb-6">
    <style>{CSS}</style>
    <svg
      className="bhb block h-auto w-full"
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Two satellite tracks converge. Both objects appear at closest approach and the time of closest approach is marked. A threshold ring draws around the operator's own asset and the miss distance falls inside it. The second track lifts away as a proposed maneuver, leaving the old track as a ghost, and the distance is measured again outside the ring."
    >
      <defs>
        <radialGradient id="bhb-wash" cx="54%" cy="48%" r="64%">
          <stop offset="0%" stopColor="#FF6A13" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#B33A00" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bhb-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.45" />
          <stop offset="58%" stopColor="#FF6A13" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#FF6A13" stopOpacity="0" />
        </radialGradient>
        <pattern id="bhb-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#fff" fillOpacity="0.04" />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill="#0d0d0d" />
      <rect width="1600" height="900" fill="url(#bhb-dots)" />
      <rect width="1600" height="900" fill="url(#bhb-wash)" />
      <rect className="bloom" x={A.x - 430} y={A.y - 430} width="860" height="860" fill="url(#bhb-bloom)" />

      {/* The operator's own track. It does not move. */}
      <path
        className="trackA"
        pathLength="1"
        d="M 20 772 C 340 706 600 548 800 470 S 1246 292 1580 158"
        fill="none"
        stroke={ORANGE}
        strokeOpacity="0.85"
        strokeWidth="2.5"
      />

      {/* The other object's track, as the conjunction stands. */}
      <g className="ghost">
        <path
          className="trackB"
          pathLength="1"
          d="M 130 70 C 430 212 690 346 862 416 S 1270 646 1560 812"
          fill="none"
          stroke="#d9d9d9"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="1"
        />
      </g>

      {/* The same track after the maneuver. Offset away from the operator's asset. */}
      <path
        className="newTrack"
        pathLength="1"
        d="M 130 70 C 470 150 820 232 1012 284 S 1390 474 1580 606"
        fill="none"
        stroke="#d9d9d9"
        strokeOpacity="0.82"
        strokeWidth="2"
      />

      {/* The operator's threshold. Theirs to set, so it is drawn in their color. */}
      <g className="ring">
        <circle
          cx={A.x}
          cy={A.y}
          r={THRESHOLD}
          pathLength="1"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="1"
        />
      </g>
      <text
        className="ring"
        x={A.x - THRESHOLD - 14}
        y={A.y + THRESHOLD + 42}
        textAnchor="end"
        fill={ORANGE}
        fillOpacity="0.75"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="17"
        letterSpacing="0.14em"
      >
        THRESHOLD
      </text>

      {/* Closest approach is a moment, not a place between the two objects, so
          it is marked on the operator's own asset rather than floating. */}
      <g className="tca">
        <line x1={A.x} y1={A.y + 16} x2={A.x} y2={A.y + 34} stroke={ORANGE} strokeOpacity="0.75" strokeWidth="1.5" />
        <text
          x={A.x}
          y={A.y + 60}
          textAnchor="middle"
          fill={ORANGE}
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="17"
          letterSpacing="0.14em"
        >
          TCA
        </text>
      </g>

      <Measure className="mNear" from={A} to={B0} color={ORANGE} label="MISS_DISTANCE" />
      <Measure className="mFar" from={A} to={B1} color="#d9d9d9" label="MISS_DISTANCE" />

      {/* The two assets. */}
      <g className="objA">
        <rect x={A.x - 7} y={A.y - 7} width="14" height="14" fill={ORANGE} />
      </g>
      <g className="objB0">
        <rect x={B0.x - 6} y={B0.y - 6} width="12" height="12" fill="none" stroke="#d9d9d9" strokeWidth="2" />
      </g>
      <g className="objB1">
        <rect x={B1.x - 6} y={B1.y - 6} width="12" height="12" fill="none" stroke="#d9d9d9" strokeWidth="2" />
      </g>

      {/* Beacon proposes. The operator decides. */}
      <g className="mvLabel" fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.14em">
        <path
          d={`M ${B0.x + 16} ${B0.y - 14} Q ${(B0.x + B1.x) / 2 + 34} ${(B0.y + B1.y) / 2} ${B1.x + 4} ${B1.y + 20}`}
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.6"
          strokeWidth="1.5"
          strokeDasharray="6 7"
        />
        <text x={B1.x + 40} y={B1.y - 46} fill={ORANGE} fontSize="17">
          PROPOSED MANEUVER
        </text>
        <text x={B1.x + 40} y={B1.y - 20} fill="#d9d9d9" fillOpacity="0.55" fontSize="15" letterSpacing="0.16em">
          OPERATOR DECIDES
        </text>
      </g>
    </svg>
  </figure>
);
