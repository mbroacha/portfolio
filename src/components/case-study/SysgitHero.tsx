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
 * Motion: a 14s loop. 10s of action, a hold on the resolved state, then a fade
 * to black that covers the reset, so the story never snaps back to the start. The RESTING
 * state is the resolved state, which is why the broken value is explicitly
 * hidden below: with animation off, prefers-reduced-motion gets
 * the finished picture rather than every state stacked on top of itself.
 */

const CSS = `
.sgh * {
  animation-duration: 14s;
  animation-iteration-count: infinite;
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
/* The loop is closed with a shutter rather than by rewinding the camera, so the
   resolved close-up never snaps back to the wide model. Resting opacity is 0,
   so with animation off the shutter is simply not there. */
.sgh .shutter { opacity: 0; animation-name: shutter }
@keyframes cam{0%,10%{transform:scale(.28)}22.8571%,71.4286%{transform:scale(1)}}
@keyframes far{0%{opacity:0}3.57143%,21.4286%{opacity:1}28.5714%,71.4286%{opacity:.7}}
@keyframes obj{0%{opacity:0}4.28571%,71.4286%{opacity:1}}
@keyframes head{0%,21.4286%{opacity:0}25%,71.4286%{opacity:1}}
@keyframes a1{0%,24.2857%{opacity:0;transform:translateY(6px)}27.8571%,71.4286%{opacity:1;transform:translateY(0)}}
@keyframes a2{0%,27.1429%{opacity:0;transform:translateY(6px)}30.7143%,71.4286%{opacity:1;transform:translateY(0)}}
@keyframes a3{0%,30%{opacity:0;transform:translateY(6px)}33.5714%,71.4286%{opacity:1;transform:translateY(0)}}
@keyframes draw{0%,34.2857%{stroke-dashoffset:1}41.4286%,71.4286%{stroke-dashoffset:0}}
@keyframes mark{0%,40.7143%{opacity:0}44.2857%,71.4286%{opacity:1}}
@keyframes satStroke{0%,45%{stroke:#8b61dc;stroke-opacity:.5}48.5714%,57.1429%{stroke:#ef5f56;stroke-opacity:.95}62.1429%,71.4286%{stroke:#8b61dc;stroke-opacity:.5}}
@keyframes satFill{0%,45%{fill:#a98cf0;fill-opacity:.5}48.5714%,57.1429%{fill:#ef5f56;fill-opacity:.95}62.1429%,71.4286%{fill:#a98cf0;fill-opacity:.5}}
@keyframes satText{0%,45%{fill:#b9a6ee;fill-opacity:.55}48.5714%,57.1429%{fill:#ef5f56;fill-opacity:1}62.1429%,71.4286%{fill:#b9a6ee;fill-opacity:.55}}
@keyframes valOk{0%,45%{opacity:1}48.5714%,57.1429%{opacity:0}62.1429%,71.4286%{opacity:1}}
@keyframes valBad{0%,45%{opacity:0}48.5714%,57.1429%{opacity:1}62.1429%,71.4286%{opacity:0}}
@keyframes breathe{0%,71.4286%{opacity:.42}35.7143%{opacity:.6}}
@keyframes shutter{0%{opacity:1}2.5%,95%{opacity:0}100%{opacity:1}}
@media (prefers-reduced-motion: reduce) { .sgh * { animation: none !important } }
`;

export const SysgitHero = ({ bare = false }: { bare?: boolean }) => (
  /* -mx-8 cancels the main column's p-8 so the hero runs the full grid cell. */
  <figure className={bare ? "" : "-mx-8 mb-6"}>
    <style>{CSS}</style>
    <svg
            className={`sgh block w-full ${bare ? "h-full" : "h-auto"}`}
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

      <rect className="shutter" width="1600" height="900" fill="#0d0d0d"/>
      </svg>
  </figure>
);
