/**
 * Beacon hero, option C: the conjunction message made legible.
 *
 * Not a screenshot and not a UI. The research method drawn as graphic design:
 * print the message, ask an expert to circle what they actually read, and build
 * the product around what survives.
 *
 * The sequence is the argument, in this order:
 *   1. a wall of conjunction message fields, dense and unreadable as a block
 *   2. a pass sweeps across it
 *   3. the wall drops back and five fields stay lit
 *   4. the five are drawn out and set large
 *
 * Step four is the point. Beacon never hid the message; it decided what to put
 * first. The wall stays on the page at low contrast because the raw data stays
 * one click away, which is the decision this picture is about.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is a diagram, not a capture.
 *   - No figure appears. Field names only, no values, so nothing is fabricated.
 *   - Every name is a real CCSDS conjunction data message field.
 *   - The five survivors are an editorial selection for this image. They are
 *     not a transcript of what any expert circled in a session.
 *
 * Performance: no SVG filters. 112 text nodes rasterize once and the dimming is
 * a single group opacity, so the sweep stays on the compositor.
 *
 * Motion: one 11s pass, then it holds. The RESTING state is the reduced state,
 * so with prefers-reduced-motion the reader gets the five fields rather than
 * the undifferentiated wall.
 */

const ORANGE = "var(--beacon-orange, #F1592B)"; /* Beacon brand orange. */

/* Real CCSDS CDM fields. A message carries a header, then a block per object,
   which is why names repeat down the wall: that repetition is the density. */
const FIELDS = [
  "CCSDS_CDM_VERS", "CREATION_DATE", "ORIGINATOR", "MESSAGE_FOR", "MESSAGE_ID",
  "TCA", "MISS_DISTANCE", "RELATIVE_SPEED", "RELATIVE_POSITION_R", "RELATIVE_POSITION_T",
  "RELATIVE_POSITION_N", "RELATIVE_VELOCITY_R", "RELATIVE_VELOCITY_T", "RELATIVE_VELOCITY_N",
  "COLLISION_PROBABILITY", "COLLISION_PROBABILITY_METHOD", "OBJECT", "OBJECT_DESIGNATOR",
  "CATALOG_NAME", "OBJECT_NAME", "INTERNATIONAL_DESIGNATOR", "OBJECT_TYPE",
  "OPERATOR_CONTACT_POSITION", "OPERATOR_ORGANIZATION", "OPERATOR_PHONE", "OPERATOR_EMAIL",
  "EPHEMERIS_NAME", "COVARIANCE_METHOD", "MANEUVERABLE", "ORBIT_CENTER", "REF_FRAME",
  "GRAVITY_MODEL", "ATMOSPHERIC_MODEL", "N_BODY_PERTURBATIONS", "SOLAR_RAD_PRESSURE",
  "EARTH_TIDES", "INTRACK_THRUST", "TIME_LASTOB_START", "TIME_LASTOB_END",
  "RECOMMENDED_OD_SPAN", "ACTUAL_OD_SPAN", "OBS_AVAILABLE", "OBS_USED", "TRACKS_AVAILABLE",
  "TRACKS_USED", "RESIDUALS_ACCEPTED", "WEIGHTED_RMS", "AREA_PC", "AREA_DRG", "AREA_SRP",
  "MASS", "CD_AREA_OVER_MASS", "CR_AREA_OVER_MASS", "THRUST_ACCELERATION", "SEDR",
  "X", "Y", "Z", "X_DOT", "Y_DOT", "Z_DOT", "CR_R_R", "CT_R_T", "CT_T_T", "CN_R_N",
  "CN_T_N", "CN_N_N", "CRDOT_R_RDOT", "CRDOT_T_RDOT", "CRDOT_N_RDOT", "CTDOT_R_TDOT",
];

/* Three columns, not four. COLLISION_PROBABILITY_METHOD is 28 characters and
   has to clear its neighbour, or the densest rows collide into nonsense. */
const COLS = 3;
const ROWS = 30;
const COL_X = [60, 310, 560];
const ROW_Y = (r: number) => 88 + r * 26;
const WALL_FONT = 12;

/* The five that get drawn out, placed down the wall so the extraction lines do
   not cross. OPERATOR_PHONE is in the standard, and finding one was the old
   workflow; it earns its place in the picture. */
const SURVIVORS = [
  { name: "TCA", col: 0, row: 5 },
  { name: "MISS_DISTANCE", col: 1, row: 9 },
  { name: "COLLISION_PROBABILITY", col: 2, row: 14 },
  { name: "MANEUVERABLE", col: 1, row: 19 },
  { name: "OPERATOR_PHONE", col: 2, row: 25 },
];

const isSurvivor = (col: number, row: number) => SURVIVORS.some((s) => s.col === col && s.row === row);

type Cell = { name: string; x: number; y: number; survivor: boolean };

const WALL: Cell[] = (() => {
  const cells: Cell[] = [];
  let i = 0;
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const survivor = isSurvivor(col, row);
      const hit = SURVIVORS.find((s) => s.col === col && s.row === row);
      cells.push({
        name: survivor && hit ? hit.name : FIELDS[i % FIELDS.length],
        x: COL_X[col],
        y: ROW_Y(row),
        survivor,
      });
      i++;
    }
  }
  return cells;
})();

const LARGE_Y = [208, 326, 444, 562, 680];

const CSS = `
.bhc * {
  animation-duration: 11s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}
/* Resting state is the reduced state: the wall sits back, the five are lit. */
.bhc .wall { opacity: .13; animation-name: bhcWall }
.bhc .sweep { opacity: 0; animation-name: bhcSweep }
.bhc .keep { animation-name: bhcKeep }
.bhc .lead { stroke-dasharray: 1; animation-name: bhcLead }
.bhc .big { animation-name: bhcBig }
.bhc .rule { stroke-dasharray: 1; animation-name: bhcRule }
@keyframes bhcWall { 0%, 26% { opacity: .62 } 46%, 100% { opacity: .13 } }
@keyframes bhcSweep { 0%, 4% { opacity: 0; transform: translateX(-60px) } 12% { opacity: 1 } 36% { opacity: 1 } 44%, 100% { opacity: 0; transform: translateX(800px) } }
@keyframes bhcKeep { 0%, 30% { opacity: .62 } 46%, 100% { opacity: 1 } }
@keyframes bhcLead { 0%, 48% { stroke-dashoffset: 1 } 66%, 100% { stroke-dashoffset: 0 } }
@keyframes bhcBig { 0%, 58% { opacity: 0; transform: translateX(-14px) } 76%, 100% { opacity: 1; transform: translateX(0) } }
@keyframes bhcRule { 0%, 54% { stroke-dashoffset: 1 } 70%, 100% { stroke-dashoffset: 0 } }
@media (prefers-reduced-motion: reduce) { .bhc * { animation: none !important; transform: none !important; opacity: 1 } .bhc .wall { opacity: .13 } .bhc .sweep { opacity: 0 } }
`;

export const BeaconHeroC = () => (
  /* -mx-8 cancels the main column's p-8 so the hero runs the full grid cell. */
  <figure className="-mx-8 mb-6">
    <style>{CSS}</style>
    <svg
      className="bhc block h-auto w-full"
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A dense wall of conjunction data message field names. A pass sweeps across it, the wall drops back to low contrast, and five fields stay lit: time of closest approach, miss distance, collision probability, whether the object can maneuver, and the operator's phone number. The five are drawn out and set large."
    >
      <defs>
        <radialGradient id="bhc-wash" cx="68%" cy="48%" r="66%">
          <stop offset="0%" stopColor="#F1592B" stopOpacity="0.14" />
          <stop offset="52%" stopColor="#A43D1D" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bhc-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F1592B" stopOpacity="0" />
          <stop offset="55%" stopColor="#F8845C" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F1592B" stopOpacity="0" />
        </linearGradient>
        <pattern id="bhc-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#fff" fillOpacity="0.035" />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill="#0d0d0d" />
      <rect width="1600" height="900" fill="url(#bhc-dots)" />
      <rect width="1600" height="900" fill="url(#bhc-wash)" />

      {/* The message, whole. */}
      <g className="wall" fontFamily="ui-monospace, Menlo, monospace" fontSize={WALL_FONT} letterSpacing="0.06em" fill="#d9d9d9">
        {WALL.filter((c) => !c.survivor).map((c, i) => (
          <text key={`w${i}`} x={c.x} y={c.y}>
            {c.name}
          </text>
        ))}
      </g>

      {/* The pass. */}
      <rect className="sweep" x="20" y="56" width="150" height="800" fill="url(#bhc-sweep)" />

      {/* What survived it, still in place. */}
      <g className="keep" fontFamily="ui-monospace, Menlo, monospace" fontSize={WALL_FONT} letterSpacing="0.06em" fill={ORANGE}>
        {WALL.filter((c) => c.survivor).map((c, i) => (
          <text key={`k${i}`} x={c.x} y={c.y}>
            {c.name}
          </text>
        ))}
      </g>

      {/* Drawn out. */}
      <g className="lead" fill="none" stroke={ORANGE} strokeOpacity="0.45" strokeWidth="1.25">
        {SURVIVORS.map((s, i) => (
          <path
            key={`l${i}`}
            pathLength="1"
            d={`M ${COL_X[s.col] - 10} ${ROW_Y(s.row) + 9} H ${824 + i * 10} V ${LARGE_Y[i] - 10} H 972`}
          />
        ))}
      </g>

      <g fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.06em">
        {SURVIVORS.map((s, i) => (
          <g key={`b${i}`} className="big" style={{ animationDelay: `${(i * 0.14).toFixed(2)}s` }}>
            <text x="996" y={LARGE_Y[i]} fontSize="31" fill="#f3ded2">
              {s.name}
            </text>
            <line
              className="rule"
              pathLength="1"
              x1="996"
              y1={LARGE_Y[i] + 22}
              x2="1548"
              y2={LARGE_Y[i] + 22}
              stroke={ORANGE}
              strokeOpacity="0.3"
              strokeWidth="1.25"
              strokeDasharray="1"
            />
          </g>
        ))}
      </g>
    </svg>
  </figure>
);
