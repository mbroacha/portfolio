/**
 * Originality hero.
 *
 * The case study's real story, which the page under-tells: enormous effort went
 * into an ML algorithm that profiled a student's writing, and that algorithm was
 * what the company sold. Research found the opposite. In Morgan's words, "you
 * can tell if a student cheated just by looking at the metadata of the paper:
 * author name, editing time, dates not matching up."
 *
 * So the hero is that inversion. On the left, the paper the evidence actually
 * comes from. On the right, eight signals ranked as the algorithm ranked them,
 * then re-ranked by what persuaded an educator: the flagship sinks, the boring
 * file metadata rises, and the file's own properties light up as it happens.
 * That is the decision the whole project turned on, and it is a commercial and
 * ethical tension as much as a design one.
 *
 * Deliberately quiet. This is ed tech and the subject is academic misconduct,
 * so there is no glow, no zoom and no dark theatre: a light ground, one reorder,
 * and a single accent on the signal that ends up on top.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is captioned as a diagram.
 *   - Every signal name is real. The four linguistic ones are the attributes the
 *     model was trained on; the four metadata ones are from the product and from
 *     the research quote above.
 *   - The file properties are invented and the image says so on its face. No
 *     real student, no real submission.
 *   - The bars are relative emphasis in the interface, not measured
 *     persuasiveness. No scale and no number anywhere, deliberately: the outcome
 *     figures in this project still need provenance.
 *
 * Motion: one 8s pass, then it holds. The paper arrives, its properties fill in,
 * the ranking appears in the algorithm's order, and only then does it invert.
 * The RESTING state is the resolved state, which is why the widths, colours and
 * the stamp are set in plain CSS below; with animation off,
 * prefers-reduced-motion gets the finished picture rather than every state
 * stacked on itself.
 */

const CSS = `
.oh-wrap .oh{position:relative;overflow:hidden;background:#f7f7f8;border:1px solid #e5e7eb;aspect-ratio:16/9;min-height:452px;padding:30px 32px;display:flex;gap:38px;font-family:"Inter",system-ui,sans-serif}

/* ── the paper the metadata actually comes from ───────────────── */
.oh-wrap .doc{width:318px;flex:0 0 auto;position:relative;display:flex;flex-direction:column}
.oh-wrap .paper{flex:1;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e4e8;box-shadow:0 1px 2px rgba(17,24,39,.04);padding:18px 18px 16px}
.oh-wrap .fname{font-size:11.5px;color:#6b7280;margin-bottom:12px;display:flex;gap:6px;align-items:center}
.oh-wrap .ln{height:6px;background:#edeef1;margin-bottom:7px}
.oh-wrap .props{margin-top:auto;border-top:1px solid #eceef1;padding-top:12px}
.oh-wrap .prop{display:flex;justify-content:space-between;gap:10px;font-size:11.5px;padding:4px 5px;margin:0 -5px}
.oh-wrap .pk{color:#9ca3af}.pv{color:#4b5563;font-variant-numeric:tabular-nums}

/* ── what the interface put first ─────────────────────────────── */
.oh-wrap .side{flex:1;min-width:0;display:flex;flex-direction:column}
.oh-wrap .stamp{position:relative;height:14px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af}
.oh-wrap .stamp span{position:absolute;left:0;top:0;white-space:nowrap}
.oh-wrap .rows{position:relative;margin-top:18px;height:432px}
.oh-wrap .row{position:absolute;left:0;right:0;height:54px;display:flex;align-items:center;gap:12px}
.oh-wrap .nm{width:152px;flex:0 0 auto;font-size:13px;color:#6b7280}
.oh-wrap .tag{width:84px;flex:0 0 auto;font-size:10px;letter-spacing:.04em;color:#c2c5cc}
.oh-wrap .track{flex:1;height:7px;background:#ededf0;position:relative}
.oh-wrap .bar{position:absolute;left:0;top:0;bottom:0;background:#d6d8dd}
.oh-wrap .rule{position:absolute;left:0;right:0;top:0;height:1px;background:#ebebee}

/* resting state IS the resolved state */
.oh-wrap .bar.b-grow{width:var(--w);background:var(--c)}
.oh-wrap .bar.b-shrink{width:var(--w);background:#d6d8dd}
.oh-wrap .nm.n-on{color:#111827}.nm.n-off{color:#9ca3af}
.oh-wrap .stamp .s-a{opacity:0}.stamp .s-b{opacity:1}
.oh-wrap .prop.hot{background:#fff1ef}.prop.hot .pv{color:#e04a38}

@keyframes paperIn{0%{opacity:0;transform:translateY(8px)}6%,100%{opacity:1;transform:translateY(0)}}
@keyframes lnIn{0%{opacity:0}7%,100%{opacity:1}}
@keyframes p1{0%,5%{opacity:0}10%,100%{opacity:1}}
@keyframes p2{0%,8%{opacity:0}13%,100%{opacity:1}}
@keyframes p3{0%,11%{opacity:0}16%,100%{opacity:1}}
@keyframes p4{0%,14%{opacity:0}19%,100%{opacity:1}}
@keyframes p5{0%,17%{opacity:0}22%,100%{opacity:1}}
@keyframes noteIn{0%,26%{opacity:0}33%,100%{opacity:1}}
@keyframes listIn{0%,12%{opacity:0}20%,100%{opacity:1}}
@keyframes up{0%,32%{transform:translateY(216px)}48%,100%{transform:translateY(0)}}
@keyframes down{0%,32%{transform:translateY(-216px)}48%,100%{transform:translateY(0)}}
@keyframes grow{0%,32%{width:16%}48%,100%{width:var(--w)}}
@keyframes shrink{0%,32%{width:78%}48%,100%{width:var(--w)}}
@keyframes inkOn{0%,32%{color:#9ca3af}48%,100%{color:#111827}}
@keyframes inkOff{0%,32%{color:#111827}48%,100%{color:#9ca3af}}
@keyframes barOn{0%,32%{background:#d6d8dd}48%,100%{background:var(--c)}}
@keyframes barOff{0%,32%{background:#9aa0aa}48%,100%{background:#d6d8dd}}
@keyframes hot{0%,34%{background:transparent}50%,100%{background:#fff1ef}}
@keyframes hotv{0%,34%{color:#4b5563}50%,100%{color:#e04a38}}
@keyframes stampA{0%,32%{opacity:1}44%,100%{opacity:0}}
@keyframes stampB{0%,38%{opacity:0}48%,100%{opacity:1}}

.oh-wrap .oh *{animation-duration:8s;animation-iteration-count:1;animation-fill-mode:both;animation-timing-function:cubic-bezier(.4,0,.2,1)}
.oh-wrap .paper{animation-name:paperIn}
.oh-wrap .ln{animation-name:lnIn}
.oh-wrap .pr1{animation-name:p1}.pr2{animation-name:p2}.pr3{animation-name:p3}.pr4{animation-name:p4}.pr5{animation-name:p5}
.oh-wrap .rows{animation-name:listIn}
.oh-wrap .up{animation-name:up}.down{animation-name:down}
.oh-wrap .b-grow{animation-name:grow,barOn}.b-shrink{animation-name:shrink,barOff}
.oh-wrap .n-on{animation-name:inkOn}.n-off{animation-name:inkOff}
.oh-wrap .prop.hot{animation-name:hot}.prop.hot .pv{animation-name:hotv}
.oh-wrap .s-a{animation-name:stampA}.s-b{animation-name:stampB}
@media (prefers-reduced-motion: reduce) { .oh-wrap .oh * { animation: none !important } }
`;

export const OriginalityHero = () => (
  /* -mx-8 cancels the main column's p-8, matching the Sysgit hero. */
  <figure className="oh-wrap -mx-8 mb-6">
    <style>{CSS}</style>
    <div className="oh">
        <div className="doc">
          <div className="paper">
            <div className="fname"><svg width="11" height="13" viewBox="0 0 12 14" fill="none" stroke="#9ca3af" strokeWidth="1.1"><path d="M2 1h5l3 3v9H2z"/><path d="M7 1v3h3"/></svg>ENG210_final_essay.docx</div>
            <div className="ln" style={{ width: "100%" }}></div><div className="ln" style={{ width: "96%" }}></div><div className="ln" style={{ width: "99%" }}></div>
            <div className="ln" style={{ width: "72%" }}></div>
            <div className="ln" style={{ width: "98%", marginTop: 11 }}></div><div className="ln" style={{ width: "94%" }}></div><div className="ln" style={{ width: "58%" }}></div>
            <div className="props">
              <div className="prop hot pr1"><span className="pk">Author</span><span className="pv">D. Whitfield</span></div>
              <div className="prop hot pr2"><span className="pk">Last modified by</span><span className="pv">m.okafor</span></div>
              <div className="prop hot pr3"><span className="pk">Created</span><span className="pv">2 May, 11:41 PM</span></div>
              <div className="prop hot pr4"><span className="pk">Modified</span><span className="pv">2 May, 11:49 PM</span></div>
              <div className="prop hot pr5"><span className="pk">Editing time</span><span className="pv">8 min</span></div>
            </div>
          </div>
        </div>

        <div className="side">
          <div className="stamp"><span className="s-a">Ranked by the algorithm</span><span className="s-b">Ranked by what persuaded</span></div>
          <div className="rows">
            <div className="row up" style={{ top: 0 }}><div className="rule"></div><div className="nm n-on">Author names</div><div className="tag">file metadata</div><div className="track"><div className="bar b-grow" style={{ "--w": "86%", "--c": "#e04a38" } as React.CSSProperties}></div></div></div>
            <div className="row up" style={{ top: 54 }}><div className="rule"></div><div className="nm n-on">Last modified by</div><div className="tag">file metadata</div><div className="track"><div className="bar b-grow" style={{ "--w": "79%", "--c": "#2d9cdb" } as React.CSSProperties}></div></div></div>
            <div className="row up" style={{ top: 108 }}><div className="rule"></div><div className="nm n-on">Editing time</div><div className="tag">file metadata</div><div className="track"><div className="bar b-grow" style={{ "--w": "71%", "--c": "#2d9cdb" } as React.CSSProperties}></div></div></div>
            <div className="row up" style={{ top: 162 }}><div className="rule"></div><div className="nm n-on">Submission dates</div><div className="tag">file metadata</div><div className="track"><div className="bar b-grow" style={{ "--w": "62%", "--c": "#2d9cdb" } as React.CSSProperties}></div></div></div>
            <div className="row down" style={{ top: 216 }}><div className="rule"></div><div className="nm n-off">Sentence complexity</div><div className="tag">linguistic</div><div className="track"><div className="bar b-shrink" style={{ "--w": "28%" } as React.CSSProperties}></div></div></div>
            <div className="row down" style={{ top: 270 }}><div className="rule"></div><div className="nm n-off">Vocabulary</div><div className="tag">linguistic</div><div className="track"><div className="bar b-shrink" style={{ "--w": "24%" } as React.CSSProperties}></div></div></div>
            <div className="row down" style={{ top: 324 }}><div className="rule"></div><div className="nm n-off">Diction</div><div className="tag">linguistic</div><div className="track"><div className="bar b-shrink" style={{ "--w": "20%" } as React.CSSProperties}></div></div></div>
            <div className="row down" style={{ top: 378 }}><div className="rule"></div><div className="nm n-off">Readability</div><div className="tag">linguistic</div><div className="track"><div className="bar b-shrink" style={{ "--w": "17%" } as React.CSSProperties}></div></div></div>
          </div>
        </div>
      </div>
    <figcaption className="cv-meta mt-4 max-w-prose px-8" style={{ color: "var(--text-muted)" }}>
      What the algorithm ranked, and what actually persuaded an educator. Diagram: relative emphasis in the
      interface, not measured values. File properties are illustrative.
    </figcaption>
  </figure>
);
