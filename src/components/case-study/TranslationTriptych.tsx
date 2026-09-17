/**
 * Sysgit: one requirement in three notations.
 *
 * Decision 1's argument is that in hardware modeling a square is not a square,
 * and that the same object has to be legible as a picture, as a document and as
 * code, to two cohorts with incompatible mental models. This is that sentence
 * as an image.
 *
 * All three panels are drawn from real artifacts:
 *   - the document comes first: the source regulation itself, 49 CFR 232.103,
 *     styled the way the eCFR renders it, because that is where the
 *     requirement actually arrives from
 *   - the diagram is the product's requirement node, in the product's own
 *     visual language, with values sampled from screenshots
 *   - the code is the SysML source carrying the same requirement
 *
 * The thread is the threshold. 85 percent appears in all three, and the lit
 * line marks it in each: paragraph (e) of the regulation, the attribute
 * minOperativeBrakeRatio = 0.85 in source, and minEnRouteBrakeRatio on the
 * node. One fact, three notations. That is the whole figure.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Drawn, so it is captioned as a diagram, not a screenshot.
 *   - Copy is verbatim from the regulation and from the product's own demo
 *     model, which is cleared for publication. Nothing invented.
 *   - The asterisks inside the node's Documentation are real: comment markers
 *     surviving the parse. Left in rather than tidied away.
 *
 * The node and the source carry different ids, REQ-DRV-003 and REQ-103-003,
 * exactly as the two source artifacts do.
 *
 * Every selector is scoped under .tt so these product styles cannot leak.
 */

const CSS = `
.tt .cols {display:flex;gap:14px;align-items:stretch}
.tt .col {flex:1;min-width:0;display:flex;flex-direction:column}
.tt .panel {flex:1;overflow:hidden;border:1px solid #ccc;font-family:"Inter",system-ui,sans-serif}
.tt .lit {background:rgba(139,97,220,.17);box-shadow:inset 2px 0 0 #8b61dc}

/* ── As a picture: the product's requirement node ────────────────── */
.tt .p1 {background:#fafafa;background-image:radial-gradient(#d2d5db 1px,transparent 1px);background-size:13px 13px;padding:14px 12px}
.tt .arrow {display:block;margin:0 auto 6px;color:#6b4ee6}
.tt .card {background:#ede9fc;border:1px solid #ddd6f5;border-radius:11px;padding:12px 11px}
.tt .card .kind {text-align:center;font-size:10.5px;color:#5f5d65;font-weight:500}
.tt .card .title {text-align:center;font-size:12.5px;font-weight:700;color:#000;margin-top:3px;display:flex;gap:5px;justify-content:center;align-items:flex-start}
.tt .card .rid {text-align:center;font-size:10.5px;color:#5f5d65;margin-top:2px}
.tt .pill {display:block;width:fit-content;margin:6px auto 0;background:#eedbec;border:1px solid #f3b8c4;color:#fe6767;border-radius:999px;font-size:9.5px;font-weight:600;padding:2px 9px}
.tt .lbl {font-size:10px;color:#8d8a99;margin-top:10px;font-weight:500}
.tt .lbl.lc {text-transform:none}
.tt .body {font-size:10.5px;color:#000;line-height:1.5;margin-top:3px}
.tt .attr {font-size:10.5px;color:#000;margin-top:3px;padding:1px 3px}
.tt .attr b {font-weight:700}

/* ── As a document: the source regulation ────────────────────────── */
.tt .p2 {background:#f9f9f9;padding:14px 12px;color:#333}
.tt .sec {display:flex;gap:6px;align-items:flex-start}
.tt .sec .dot {width:9px;height:9px;border:1.5px solid #979797;border-radius:50%;flex:0 0 auto;margin-top:3px;position:relative}
.tt .sec .dot::after {content:"";position:absolute;inset:2px;background:#979797;border-radius:50%}
.tt .sec h4 {font-size:11.5px;font-weight:700;line-height:1.35;color:#333}
.tt .para {display:flex;gap:7px;margin-top:9px;padding:2px 3px}
.tt .badge {flex:0 0 auto;background:#dcdcdc;color:#333;border-radius:3px;font-size:9.5px;padding:1px 5px;margin-top:1px}
.tt .para p {font-size:10.5px;line-height:1.5;color:#333}
.tt .para a {color:#325681;text-decoration:none}

/* ── As code: the SysML source ───────────────────────────────────── */
.tt .p3 {background:#f0f0f0;padding:8px 0 0}
.tt .cl {display:flex;font-family:ui-monospace,Menlo,monospace;font-size:8.5px;line-height:1.85;white-space:pre;padding:0 6px 0 0}
.tt .cl .g {width:24px;flex:0 0 auto;text-align:right;padding-right:7px;color:#3e7790;user-select:none}
.tt .kw {color:#0000f5}.str{color:#96261f}.cm{color:#377e22}.ty{color:#377e7f}.pl{color:#000}
`;

export const TranslationTriptych = () => (
  <figure className="tt mb-6" style={{ backgroundColor: "var(--surface-media)", padding: "1rem" }}>
    <style>{CSS}</style>
    <div className="cols">

      
      <div className="col"><div className="cv-meta mb-3 uppercase text-bone" style={{ letterSpacing: "var(--tracking-label)" }}>As a document</div><div className="panel p2">
        <div className="sec"><span className="dot"></span><h4>&sect; 232.103 General requirements for all train brake systems.</h4></div>
        <div className="para"><span className="badge">(c)</span><p>A train brake system shall respond as intended to signals from the train line.</p></div>
        <div className="para"><span className="badge">(d)</span><p>One hundred percent of the brakes on a train shall be effective and operative brakes prior to use or departure from any location where a Class I brake test is required to be performed on the train pursuant to <a>&sect; 232.205</a>.</p></div>
        <div className="para lit"><span className="badge">(e)</span><p>A train shall not move if less than 85 percent of the cars in that train have operative and effective brakes.</p></div>
        <div className="para"><span className="badge">(f)</span><p>Each car in a train shall have its air brakes in effective operating condition unless the car is being moved for repairs in accordance with <a>&sect;&sect; 232.15</a> and <a>232.609</a>.</p></div>
      </div></div>
<div className="col"><div className="cv-meta mb-3 uppercase text-bone" style={{ letterSpacing: "var(--tracking-label)" }}>As a diagram</div><div className="panel p1">
        <svg className="arrow" width="15" height="16" viewBox="0 0 15 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 1l3.5 4.5L11 1M4 7l3.5 4.5L11 7"/></svg>
        <div className="card">
          <div className="kind">requirement</div>
          <div className="title"><svg width="10" height="12" viewBox="0 0 12 14" fill="none" stroke="#000" strokeWidth="1.2"><path d="M2 1h5l3 3v9H2z"/><path d="M7 1v3h3"/></svg>Minimum Operative Brake Ratio</div>
          <div className="rid">REQ-DRV-003</div>
          <span className="pill">Level 1</span>
          <div className="lbl">Documentation</div>
          <div className="body">A train shall not depart from an initial terminal or location * where a full brake test is performed unless 100 percent of the * brakes are effective and operative. A train shall not move en * route if less than 85 percent of the cars have operative and * effective brakes.</div>
          <div className="lbl lc">rationale</div>
          <div className="body">Establishes minimum thresholds for train movement authorization based on proportion of functioning brakes</div>
          <div className="lbl">Attributes</div>
          <div className="attr"><b>classIBrakeTestRatio</b> : Real = 1.0</div>
          <div className="attr lit"><b>minEnRouteBrakeRatio</b> : Real = 0.85</div>
        </div>
      </div></div>

      <div className="col"><div className="cv-meta mb-3 uppercase text-bone" style={{ letterSpacing: "var(--tracking-label)" }}>As code</div><div className="panel p3">
        <div className="cl"><span className="g">99</span><span className="kw">requirement</span><span className="pl"> </span><span className="str">&lt;'REQ-103-003'&gt;</span><span className="pl"> </span><span className="str">'Minimum Operative Brake Ratio'</span><span className="pl"> &#123;</span></div>
        <div className="cl"><span className="g">100</span><span className="pl">  </span><span className="kw">doc</span></div>
        <div className="cl"><span className="g">101</span><span className="pl">  </span><span className="cm">/*</span></div>
        <div className="cl"><span className="g">102</span><span className="pl">   </span><span className="cm">* A train shall not move if less than 85 percent</span></div>
        <div className="cl"><span className="g">103</span><span className="pl">   </span><span className="cm">* of the cars in that train have operative and</span></div>
        <div className="cl"><span className="g">104</span><span className="pl">   </span><span className="cm">* effective brakes. One hundred percent of the</span></div>
        <div className="cl"><span className="g">105</span><span className="pl">   </span><span className="cm">* brakes shall be effective prior to departure.</span></div>
        <div className="cl"><span className="g">106</span><span className="pl">   </span><span className="cm">*/</span></div>
        <div className="cl"><span className="g">107</span><span className="pl"> </span></div>
        <div className="cl lit"><span className="g">108</span><span className="pl">  </span><span className="kw">attribute</span><span className="pl"> minOperativeBrakeRatio : </span><span className="ty">Real</span><span className="pl"> = 0.85;</span></div>
        <div className="cl"><span className="g">109</span><span className="pl">  </span><span className="kw">attribute</span><span className="pl"> classIBrakeTestRatio : </span><span className="ty">Real</span><span className="pl"> = 1.0;</span></div>
        <div className="cl"><span className="g">110</span><span className="pl">  </span><span className="kw">metadata</span><span className="pl"> </span><span className="ty">RequirementMetadata</span><span className="pl"> &#123;</span></div>
        <div className="cl"><span className="g">111</span><span className="pl">    rationale = </span><span className="str">""</span><span className="pl">;</span></div>
        <div className="cl"><span className="g">112</span><span className="pl">    level = 1;</span></div>
        <div className="cl"><span className="g">113</span><span className="pl">  &#125;</span></div>
        <div className="cl"><span className="g">114</span><span className="pl">  </span><span className="kw">metadata</span><span className="pl"> </span><span className="ty">CustomRequirementMetadata</span><span className="pl"> &#123;</span></div>
        <div className="cl"><span className="g">115</span><span className="pl">    cfrSection = </span><span className="str">"49 CFR 232.103"</span><span className="pl">;</span></div>
        <div className="cl"><span className="g">116</span><span className="pl">    cfrParagraph = </span><span className="str">"(d), (e)"</span><span className="pl">;</span></div>
        <div className="cl"><span className="g">117</span><span className="pl">    US_CFR = </span><span className="pl">URL(</span><span className="kw">href</span><span className="pl"> = </span><span className="str">"https://www.ecfr.gov/current/</span></div>
        <div className="cl"><span className="g">118</span><span className="pl">  &#125;</span></div>
        <div className="cl"><span className="g">119</span><span className="pl">  </span><span className="kw">doc</span><span className="pl"> rationale </span><span className="cm">/*</span></div>
        <div className="cl"><span className="g">120</span><span className="pl">      </span><span className="cm">* Establishes minimum braking capability</span></div>
        <div className="cl"><span className="g">121</span><span className="pl">      </span><span className="cm">* thresholds for train movement and departure</span></div>
        <div className="cl"><span className="g">122</span><span className="pl">      </span><span className="cm">*/</span></div>
        <div className="cl"><span className="g">123</span><span className="pl">&#125;</span></div>
      </div></div>

      </div>
    <figcaption className="cv-meta mt-4 max-w-prose" style={{ color: "var(--text-on-media)" }}>
      One requirement in three notations.
    </figcaption>
  </figure>
);
