/**
 * Sysgit hero.
 *
 * Not a screenshot and not a UI. The product's signature form, the model object
 * and its typed relationships, drawn large and treated as graphic design.
 *
 * The sequence is the argument, in this order:
 *   1. the model seen whole, small
 *   2. the camera settles on one object, which is an empty rectangle
 *   3. it fills with what it actually carries
 *   4. its relationships draw in: derive, contains, satisfies
 *   5. the energy capacity is lowered and the satisfies relationship goes red
 *   6. the value is restored and it recovers
 *
 * Step five is the point. In hardware modeling a square is not a square: change
 * a number and the thing that depended on it says so. A drawing cannot do that.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is captioned as a diagram.
 *   - Every string is real SysML from the product's demo model, which is
 *     cleared for publication. No customer content and no invented figures.
 *   - The real capture of the shipped editor appears under Decision 1.
 *
 * Performance: no SVG filters. An feGaussianBlur inside the group that gets
 * scaled forces the browser to re-rasterize the filter on every frame of the
 * zoom, which is what makes this kind of animation stutter. The bloom is a
 * radial gradient and the edge glow is three stacked strokes; both rasterize
 * once and composite cheaply. will-change on the camera keeps the zoom on the
 * compositor.
 *
 * Motion: one 10s pass, then it holds the resolved state. It does not loop, so
 * the story cannot snap back to the start and read as a glitch. The RESTING
 * state is the resolved state, which is why the broken value is explicitly
 * hidden below: with animation off, prefers-reduced-motion gets
 * the finished picture rather than every state stacked on top of itself.
 *
 * The still used on the home page is this same picture at rest, exported to
 * public/case-studies/sysgit/hero-still.png.
 */

const CSS = `
.sgh * {
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
}
.sgh .cam {
  transform-box: view-box;
  transform-origin: 800px 450px;
  will-change: transform;
  animation-name: cam;
}
.sgh .edge { stroke-dasharray: 1; animation-name: draw }
/* Resting state is the resolved state. */
.sgh .vBad { opacity: 0 }
.sgh .vOk { opacity: 1 }
.sgh .far { animation-name: far }
.sgh .obj { animation-name: obj }
.sgh .head { animation-name: head }
.sgh .at1 { animation-name: a1 } .sgh .at2 { animation-name: a2 } .sgh .at3 { animation-name: a3 }
.sgh .mark { animation-name: mark }
.sgh .sat { animation-name: satStroke }
.sgh .satArrow { animation-name: satFill }
.sgh .satLabel { animation-name: satText }
.sgh .vOk { animation-name: valOk } .sgh .vBad { animation-name: valBad }
.sgh .glow { animation-name: breathe }
@keyframes cam{0%,14%{transform:scale(.28)}32%,100%{transform:scale(1)}}
@keyframes far{0%{opacity:0}5%,30%{opacity:1}40%,100%{opacity:.7}}
@keyframes obj{0%{opacity:0}6%,100%{opacity:1}}
@keyframes head{0%,30%{opacity:0}35%,100%{opacity:1}}
@keyframes a1{0%,34%{opacity:0;transform:translateY(6px)}39%,100%{opacity:1;transform:translateY(0)}}
@keyframes a2{0%,38%{opacity:0;transform:translateY(6px)}43%,100%{opacity:1;transform:translateY(0)}}
@keyframes a3{0%,42%{opacity:0;transform:translateY(6px)}47%,100%{opacity:1;transform:translateY(0)}}
@keyframes draw{0%,48%{stroke-dashoffset:1}58%,100%{stroke-dashoffset:0}}
@keyframes mark{0%,57%{opacity:0}62%,100%{opacity:1}}
@keyframes satStroke{0%,63%{stroke:#8b61dc;stroke-opacity:.5}68%,80%{stroke:#ef5f56;stroke-opacity:.95}87%,100%{stroke:#8b61dc;stroke-opacity:.5}}
@keyframes satFill{0%,63%{fill:#a98cf0;fill-opacity:.5}68%,80%{fill:#ef5f56;fill-opacity:.95}87%,100%{fill:#a98cf0;fill-opacity:.5}}
@keyframes satText{0%,63%{fill:#b9a6ee;fill-opacity:.55}68%,80%{fill:#ef5f56;fill-opacity:1}87%,100%{fill:#b9a6ee;fill-opacity:.55}}
@keyframes valOk{0%,63%{opacity:1}68%,80%{opacity:0}87%,100%{opacity:1}}
@keyframes valBad{0%,63%{opacity:0}68%,80%{opacity:1}87%,100%{opacity:0}}
@keyframes breathe{0%,100%{opacity:.42}50%{opacity:.6}}
.cam{animation-name:cam}
.far{animation-name:far}
.obj{animation-name:obj}
.head{animation-name:head}
.at1{animation-name:a1}.at2{animation-name:a2}.at3{animation-name:a3}
.edge{animation-name:draw}
.mark{animation-name:mark}
.sat{animation-name:satStroke}
.satArrow{animation-name:satFill}
.satLabel{animation-name:satText}
.vOk{animation-name:valOk}.vBad{animation-name:valBad}
.glow{animation-name:breathe}
@media (prefers-reduced-motion: reduce) { .sgh * { animation: none !important } }
`;

export const SysgitHero = () => (
  /* -mx-8 cancels the main column's p-8 so the hero runs the full grid cell. */
  <figure className="-mx-8 mb-6">
    <style>{CSS}</style>
    <svg
            className="sgh block h-auto w-full"
            viewBox="0 0 1600 900"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="A model seen whole, then zoomed to one object. The object fills with a typed value, a maximum output and a link to the test that verifies it. Its derive, contains and satisfies relationships draw in. The energy capacity is lowered, the satisfies relationship turns red, and it recovers when the value is restored."
          >
      <defs>
        <radialGradient id="sgh-g1" cx="46%" cy="44%" r="62%">
          <stop offset="0%" stopColor="#6b4ee6" stopOpacity="0.30"/>
          <stop offset="45%" stopColor="#4a35c7" stopOpacity="0.11"/>
          <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0"/>
        </radialGradient>
        <pattern id="sgh-dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1.4" cy="1.4" r="1.4" fill="#fff" fillOpacity="0.045"/></pattern>
        <radialGradient id="sgh-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7d5bea" stopOpacity="0.55"/>
          <stop offset="55%" stopColor="#6b4ee6" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#6b4ee6" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="#0d0d0d"/>
      <rect width="1600" height="900" fill="url(#sgh-dots)"/>
      <rect width="1600" height="900" fill="url(#sgh-g1)"/>

      <g className="cam">
        {/* the wider model, seen whole at the start */}
        <g className="far" stroke="#8b61dc" fill="none" strokeOpacity="0.30" strokeWidth="2">
          <g strokeOpacity="0.30">
            <path d="M -720 -400 H -140 V 215"/><path d="M 2200 300 H 1980 V 670"/>
            <path d="M -530 1300 H 310 V 950"/><path d="M 2290 1455 H 1790 V 780"/>
            <path d="M 900 -395 V -180 H 40 V 120"/><path d="M 2050 -155 H 1600 V 560"/>
            <path d="M -910 1300 H -1000 V -300"/><path d="M 1100 -495 H 1850 V -155"/>
            <path d="M 2390 410 V 900 H 1780 V 780"/><path d="M 470 855 H 900 V 1455 H 1900"/>
          </g>
          <g><rect x="-300" y="120" width="340" height="190"/><rect x="-300" y="120" width="340" height="44" fill="#8b61dc" fillOpacity="0.14" stroke="none"/></g>
          <g><rect x="1400" y="560" width="380" height="220"/><rect x="1400" y="560" width="380" height="44" fill="#8b61dc" fillOpacity="0.14" stroke="none"/></g>
          <g><rect x="150" y="760" width="320" height="190"/><rect x="150" y="760" width="320" height="44" fill="#8b61dc" fillOpacity="0.14" stroke="none"/></g>
          <g strokeOpacity="0.20">
            <rect x="-1100" y="-500" width="380" height="200"/><rect x="700" y="-600" width="400" height="210"/>
            <rect x="1850" y="-260" width="400" height="210"/><rect x="2200" y="190" width="380" height="220"/>
            <rect x="-910" y="1200" width="380" height="200"/><rect x="1900" y="1350" width="390" height="210"/>
          </g>
        </g>

        {/* the three relationships this object actually has */}
        <g fill="none" strokeWidth="2" strokeOpacity="0.5" stroke="#8b61dc">
          <path className="edge" pathLength="1" d="M 40 215 H 300 V 400 H 556"/>
          <path className="edge" pathLength="1" d="M 800 575 V 660 H 310 V 760"/>
          <path className="edge sat" pathLength="1" d="M 1044 470 H 1220 V 670 H 1400"/>
        </g>
        <g className="mark">
          <g fill="#a98cf0" fillOpacity="0.5">
            <polygon points="556,400 544,394 544,406"/>
            <polygon points="310,760 304,748 316,748"/>
          </g>
          <polygon className="satArrow" points="1400,670 1388,664 1388,676" fill="#a98cf0" fillOpacity="0.5"/>
          <g fontFamily="Inter, system-ui, sans-serif" fontSize="15" letterSpacing="0.08em" fill="#b9a6ee" fillOpacity="0.55">
            <text x="316" y="352">&laquo;derive&raquo;</text>
            <text x="326" y="700">&laquo;contains&raquo;</text>
            <text className="satLabel" x="1232" y="612">&laquo;satisfies&raquo;</text>
          </g>
        </g>

        <rect className="glow" x="316" y="145" width="968" height="610" fill="url(#sgh-bloom)"/>
        <g className="obj" fill="none">
          <rect x="548" y="317" width="504" height="266" stroke="#a98cf0" strokeOpacity="0.10" strokeWidth="6"/>
          <rect x="552" y="321" width="496" height="258" stroke="#a98cf0" strokeOpacity="0.20" strokeWidth="4"/>
          <rect x="556" y="325" width="488" height="250" fill="#ede9fc" fillOpacity="0.05" stroke="#c9b6f7" strokeWidth="2"/>
        </g>
        <g className="head">
          <rect x="556" y="325" width="488" height="74" fill="#8b61dc" fillOpacity="0.20"/>
          <line x1="556" y1="399" x2="1044" y2="399" stroke="#c9b6f7" strokeWidth="2" strokeOpacity="0.7"/>
          <g fontFamily="Inter, system-ui, sans-serif">
            <text x="584" y="357" fontSize="15" fill="#b9a6ee" letterSpacing="0.14em">PART DEF</text>
            <text x="584" y="385" fontSize="25" fill="#f2ecff" fontWeight="500">PowerSubsystem</text>
          </g>
        </g>
        <g fontFamily="ui-monospace, Menlo, monospace" fontSize="19">
          <g className="at1">
            <text className="vOk" x="584" y="446" fill="#d6c9f5">energyCapacity = 500 [W * h]</text>
            <text className="vBad" x="584" y="446" fill="#ef5f56">energyCapacity = 350 [W * h]</text>
          </g>
          <text className="at2" x="584" y="490" fill="#d6c9f5" fillOpacity="0.58">maxPowerOutput = 1000 [W]</text>
          <text className="at3" x="584" y="534" fill="#d6c9f5" fillOpacity="0.58">verifiedBy : BatteryCapacityTest</text>
        </g>
      </g>
      </svg>
    <figcaption className="cv-meta mt-4 max-w-prose px-8" style={{ color: "var(--text-muted)" }}>
      One object from the model, drawn. Diagram, not a screenshot. In hardware modeling a square is not a square: it
      carries a typed value with a unit and a link to the test that verifies it, and when the value moves, the
      requirement it satisfied says so.
    </figcaption>
  </figure>
);
