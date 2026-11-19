/**
 * Beacon hero, option A: the reciprocal disclosure field.
 *
 * Not a screenshot and not a UI. The case study's argument drawn as graphic
 * design: you cannot mandate disclosure, you can make it reciprocal.
 *
 * The sequence is the argument, in this order:
 *   1. a field of assets, almost all of them dim: a catalog entry and a guess
 *   2. one operator discloses, and the two optional signals name themselves
 *   3. its neighbours disclose in turn, and the cascade spreads outward
 *   4. most of the field is lit, and the holdouts read as the exception
 *
 * Step three is the point. Nobody was required to share. Sharing spread because
 * it was visible and returned in kind, which is mechanism design rather than
 * interface design.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is a diagram, not a capture.
 *   - No figure appears. The field is not a count of operators and the lit
 *     proportion is not the adoption number; the published figures stay in the
 *     Outcome section where they carry their denominators.
 *   - "thresholds" and "maneuverable" are the real optional signals.
 *
 * Performance: no SVG filters. Per-node animation is opacity and fill only,
 * both cheap to composite; the bloom is a radial gradient that rasterizes once.
 * 74 nodes and 65 hairlines is well inside what one compositor pass handles.
 *
 * Motion: one 11s pass, then it holds. It does not loop, so the cascade cannot
 * snap back to a dark field and read as a glitch. The RESTING state is the lit
 * field, which is why every lit value is the base style and the keyframes run
 * from dark; with prefers-reduced-motion the reader gets the finished picture.
 */

const ORANGE = "var(--beacon-orange, #F1592B)"; /* Beacon brand orange. */

type FieldNode = { x: number; y: number; rank: number; parent: number | null; holdout: boolean };

/** Deterministic, so the exported still and the live hero agree pixel for pixel. */
const seeded = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

const buildField = (): FieldNode[] => {
  const rnd = seeded(20222023);
  const pts: { x: number; y: number }[] = [];
  /* Rejection sampling, so the scatter is even rather than clumped: a clump
     would read as a constellation, which is a different claim. */
  for (let guard = 0; guard < 12000 && pts.length < 74; guard++) {
    const x = 70 + rnd() * 1460;
    const y = 80 + rnd() * 740;
    if (pts.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 112 ** 2)) pts.push({ x, y });
  }

  /* The first operator to disclose sits left of centre, so the cascade has room
     to run across the frame rather than off the edge. */
  const seedIdx = pts.reduce(
    (best, p, i) =>
      (p.x - 470) ** 2 + (p.y - 455) ** 2 < (pts[best].x - 470) ** 2 + (pts[best].y - 455) ** 2 ? i : best,
    0,
  );

  /* Greedy nearest-neighbour tree from that operator outward. Disclosure
     spreads to whoever can see it, which is whoever is closest. */
  const order = [seedIdx];
  const parent: (number | null)[] = pts.map(() => null);
  const taken = new Set(order);
  while (order.length < pts.length) {
    let bestNode = -1;
    let bestFrom = -1;
    let bestDist = Infinity;
    pts.forEach((p, i) => {
      if (taken.has(i)) return;
      order.forEach((j) => {
        const d = (p.x - pts[j].x) ** 2 + (p.y - pts[j].y) ** 2;
        if (d < bestDist) {
          bestDist = d;
          bestNode = i;
          bestFrom = j;
        }
      });
    });
    parent[bestNode] = bestFrom;
    taken.add(bestNode);
    order.push(bestNode);
  }

  /* The last nine never share. The field is not unanimous, and saying so is
     more honest than a fully lit frame. */
  const holdouts = new Set(order.slice(-9));
  return pts.map((p, i) => ({
    x: p.x,
    y: p.y,
    rank: order.indexOf(i),
    parent: parent[i],
    holdout: holdouts.has(i),
  }));
};

const FIELD = buildField();
const SEED = FIELD.find((n) => n.rank === 0)!;

/** Disclosure starts at 0.9s and each step is 90ms behind the one before it.
 *  The line reaches first; the asset lights 350ms later. */
const edgeDelay = (rank: number) => `${(0.9 + rank * 0.09).toFixed(2)}s`;
const coreDelay = (rank: number) => `${(1.25 + rank * 0.09).toFixed(2)}s`;

const CSS = `
/* Each node animates for well under a second. The pass is long because the
   cascade is staggered, not because any one asset fades slowly. */
.bha .edge { stroke-dasharray: 1; animation: bhaDraw .75s ease-out both }
.bha .core { animation: bhaCore .5s ease-out both }
.bha .halo { animation: bhaHalo .8s ease-out both; transform-box: fill-box; transform-origin: center }
.bha .sig { animation: bhaSig .9s 1.5s ease-out both }
.bha .bloom { animation: bhaBreathe 9s ease-in-out infinite }
/* Resting state is the lit field: every value below is the end state, and the
   keyframes run from dark, so disabling animation leaves the finished picture. */
@keyframes bhaDraw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes bhaCore { from { opacity: 0 } to { opacity: 1 } }
@keyframes bhaHalo { from { opacity: 0; transform: scale(.25) } to { opacity: 1; transform: scale(1) } }
@keyframes bhaSig { from { opacity: 0 } to { opacity: 1 } }
@keyframes bhaBreathe { 0%, 100% { opacity: .34 } 50% { opacity: .52 } }
@media (prefers-reduced-motion: reduce) { .bha * { animation: none !important } }
`;

export const BeaconHeroA = () => (
  /* -mx-8 cancels the main column's p-8 so the hero runs the full grid cell. */
  <figure className="-mx-8 mb-6">
    <style>{CSS}</style>
    <svg
      className="bha block h-auto w-full"
      viewBox="0 0 1600 900"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A field of satellites, most of them dim catalogue entries. One operator discloses its risk thresholds and whether its asset can manoeuvre, and disclosure spreads outward to its neighbours until most of the field is lit. Nine assets never share."
    >
      <defs>
        <radialGradient id="bha-wash" cx="30%" cy="50%" r="72%">
          <stop offset="0%" stopColor="#F1592B" stopOpacity="0.16" />
          <stop offset="48%" stopColor="#A43D1D" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bha-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F8845C" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#F1592B" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#F1592B" stopOpacity="0" />
        </radialGradient>
        <pattern id="bha-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.4" cy="1.4" r="1.4" fill="#fff" fillOpacity="0.04" />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill="#0d0d0d" />
      <rect width="1600" height="900" fill="url(#bha-dots)" />
      <rect width="1600" height="900" fill="url(#bha-wash)" />
      <rect className="bloom" x={SEED.x - 420} y={SEED.y - 420} width="840" height="840" fill="url(#bha-bloom)" />

      {/* Disclosure reaching from each operator to the next. */}
      <g fill="none" stroke={ORANGE} strokeWidth="1.25" strokeOpacity="0.3">
        {FIELD.filter((n) => n.parent !== null && !n.holdout).map((n) => (
          <path
            key={`e${n.rank}`}
            className="edge"
            pathLength="1"
            style={{ animationDelay: edgeDelay(n.rank) }}
            d={`M ${FIELD[n.parent!].x.toFixed(1)} ${FIELD[n.parent!].y.toFixed(1)} L ${n.x.toFixed(1)} ${n.y.toFixed(1)}`}
          />
        ))}
      </g>

      {/* Every asset is visible from the start. Position is not the sensitive part. */}
      <g>
        {FIELD.map((n) => (
          <rect
            key={`u${n.rank}`}
            x={n.x - 3.5}
            y={n.y - 3.5}
            width="7"
            height="7"
            fill="none"
            stroke="#8a8a8a"
            strokeOpacity={n.holdout ? 0.5 : 0.34}
            strokeWidth="1.25"
          />
        ))}
      </g>

      {/* What the operator chose to disclose. */}
      <g>
        {FIELD.filter((n) => !n.holdout).map((n) => (
          <g key={`s${n.rank}`} style={{ animationDelay: coreDelay(n.rank) }} className="core">
            <circle
              className="halo"
              cx={n.x}
              cy={n.y}
              r="13"
              fill="none"
              stroke={ORANGE}
              strokeOpacity="0.4"
              strokeWidth="1.25"
              style={{ animationDelay: coreDelay(n.rank) }}
            />
            <rect x={n.x - 3.5} y={n.y - 3.5} width="7" height="7" fill={ORANGE} />
          </g>
        ))}
      </g>

      {/* The first operator, and the two signals that were never required. */}
      <g className="sig" fontFamily="ui-monospace, Menlo, monospace" fontSize="19" letterSpacing="0.1em">
        <circle cx={SEED.x} cy={SEED.y} r="30" fill="none" stroke={ORANGE} strokeOpacity="0.55" strokeWidth="1.5" />
        <line x1={SEED.x + 34} y1={SEED.y - 18} x2={SEED.x + 84} y2={SEED.y - 18} stroke={ORANGE} strokeOpacity="0.5" strokeWidth="1.25" />
        <line x1={SEED.x + 34} y1={SEED.y + 20} x2={SEED.x + 84} y2={SEED.y + 20} stroke={ORANGE} strokeOpacity="0.5" strokeWidth="1.25" />
        <text x={SEED.x + 96} y={SEED.y - 11} fill="#f3ded2">thresholds</text>
        <text x={SEED.x + 96} y={SEED.y + 27} fill="#f3ded2">maneuverable</text>
        <text x={SEED.x - 30} y={SEED.y - 48} fill="#d9d9d9" fillOpacity="0.55" fontSize="15" letterSpacing="0.16em">
          OPTIONAL
        </text>
      </g>
    </svg>
  </figure>
);
