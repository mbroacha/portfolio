import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import { useMemo, useRef, useState } from "react";

/**
 * Requirements table, interactive recreation.
 *
 * Recreates the real column structure and interaction model of the Sysgit
 * requirements table. Supports the "table that behaves like a document"
 * decision, whose claim is that sources regularly exceed 1000 requirements and
 * that filtering, bulk actions and raw performance were therefore mandatory.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Captioned as a recreation, not a screenshot.
 *   - Every requirement in it is synthetic, generated below. No customer text.
 *   - The row count is a property of this recreation, not a customer figure.
 *
 * Why a recreation rather than a capture: a still of a table proves the table
 * exists. It cannot prove the table stays usable at scale, and scale is the
 * argument. The list is windowed, so scrolling 1200+ rows is the demonstration.
 *
 * Fidelity notes, from review of the real product:
 *   - Requirement names are unique. The generator enforces this globally.
 *   - Rationale is a first-class column, not an afterthought. In this industry
 *     it carries the derivation or the statutory basis, and it is often the
 *     column an auditor reads first.
 *   - Status is a document-level state shown once in the toolbar, not a
 *     per-row column.
 */

type Req = {
  id: string;
  code: string;
  name: string;
  doc: string;
  attrs: string[];
  rationale: string;
  tags: string[];
  level: 0 | 1;
};

/* ── Synthetic data ─────────────────────────────────────────────────────── */

let seed = 20260908;
const rand = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(rand() * xs.length)];

/** abbr, label, section blurb, nouns for names, objects for documentation */
const SECTIONS: readonly (readonly [string, string, string, readonly string[], readonly string[]])[] = [
  ["DEP", "Deployability", "Transport, setup and recovery in the field.", ["Setup", "Teardown", "Transport", "GroundCrew", "FieldService", "Packaging", "SiteSelection", "Staging"], ["a two-person setup", "transport in a single container", "recovery without ground support equipment", "staging on unprepared ground", "teardown within the stated interval", "packing to the transport envelope"]],
  ["PER", "Persistence", "Endurance and range sufficient for sustained observation.", ["Endurance", "Loiter", "Range", "Reserve", "Duty", "Refuel", "Standoff", "Dwell"], ["the stated loiter duration", "an energy reserve on return", "continuous coverage of the operating area", "the specified duty cycle", "range at the design payload", "sustained observation of a fixed point"]],
  ["NAV", "Navigation", "Position and heading determination under degraded conditions.", ["Position", "Heading", "Fix", "DeadReckoning", "Datum", "Waypoint", "Drift", "Alignment"], ["a position fix without satellite navigation", "heading hold through a turn", "drift within the stated bound", "waypoint capture accuracy", "alignment before launch", "navigation across a datum change"]],
  ["PWR", "Power", "Generation, storage and distribution across the vehicle.", ["Bus", "Battery", "Charge", "Distribution", "Brownout", "Regulation", "Isolation", "Harness"], ["bus voltage within tolerance", "isolation of a failed cell", "charge from the ground supply", "load shedding under brownout", "regulation across the load range", "distribution to redundant subsystems"]],
  ["COM", "Communications", "Command, control and payload data links.", ["Uplink", "Downlink", "Handover", "Bandwidth", "Encryption", "LinkMargin", "Relay", "Beacon"], ["command uplink at the stated range", "loss of the primary link", "handover between ground stations", "link margin in the operating band", "encrypted payload downlink", "a beacon on link loss"]],
  ["PAY", "Payload", "Sensing, capture and onboard handling of mission data.", ["Sensor", "Capture", "Gimbal", "Framing", "Exposure", "Stow", "Swap", "Boresight"], ["capture at the stated frame rate", "gimbal pointing accuracy", "payload swap without recalibration", "boresight retention through flight", "stow before landing", "exposure control across lighting conditions"]],
  ["STR", "Structures", "Load paths, margins and airframe integrity.", ["LoadPath", "Margin", "Fatigue", "Attachment", "Deflection", "Joint", "Skin", "Frame"], ["the design limit load", "a positive margin at ultimate load", "deflection under maximum manoeuvre", "fatigue life over the service interval", "attachment integrity after recovery", "joint preload retention"]],
  ["THM", "Thermal", "Heat rejection across the operating envelope.", ["Rejection", "Soak", "Gradient", "Coldstart", "Radiator", "Insulation", "Cycling", "Setpoint"], ["component temperature within limits", "a cold start at the minimum temperature", "heat rejection at peak load", "thermal soak on the ground", "gradient across the sensor mount", "cycling over the mission profile"]],
  ["GNC", "GuidanceAndControl", "Stability, control authority and trajectory following.", ["Authority", "Damping", "TrackHold", "Trim", "RateLimit", "Envelope", "Recovery", "Gain"], ["control authority in the design envelope", "recovery from an upset", "trajectory tracking within the stated corridor", "rate limits at the surface", "trim across the centre of gravity range", "damping of the short-period mode"]],
  ["SAF", "Safety", "Hazard control and safe termination.", ["Termination", "Interlock", "Geofence", "Arming", "Abort", "Guard", "Warning", "Containment"], ["flight termination on command", "a geofence breach", "two-step arming of the payload", "an abort before rotation", "containment of a battery event", "operator warning before a hazardous state"]],
  ["SEC", "Security", "Protection of data at rest and in transit.", ["AtRest", "InTransit", "KeyLoad", "Zeroise", "Audit", "Partition", "Attestation", "Sanitisation"], ["encryption of stored mission data", "zeroisation on tamper", "key loading before the mission", "an audit record of configuration changes", "partitioning between classification levels", "sanitisation of removable media"]],
  ["MNT", "Maintainability", "Field service, access and consumable replacement.", ["Access", "Consumable", "Diagnostic", "Removal", "Torque", "Inspection", "Spares", "Calibration"], ["removal of a line-replaceable unit", "access without special tooling", "diagnostic readout in the field", "calibration at the stated interval", "inspection of the primary structure", "consumable replacement between sorties"]],
  ["ENV", "Environmental", "Temperature, humidity, vibration and ingress.", ["Ingress", "Vibration", "Humidity", "Salt", "Shock", "Altitude", "Sand", "Icing"], ["operation in blowing sand", "ingress protection to the stated rating", "the qualification vibration spectrum", "a shock event on landing", "humidity across the storage range", "icing on the leading edge"]],
  ["EMC", "ElectromagneticCompatibility", "Emissions and susceptibility limits.", ["Emission", "Susceptibility", "Bonding", "Shielding", "Grounding", "Transient", "Coupling", "Filter"], ["radiated emissions within the limit line", "susceptibility to a field at the stated strength", "bonding resistance across joints", "shielding of the payload harness", "a transient on the power bus", "coupling between adjacent cables"]],
  ["HMI", "OperatorInterface", "Operator workload, displays and controls.", ["Workload", "Display", "Alert", "Handover", "Legibility", "Confirmation", "Shortcut", "Layout"], ["single-operator control of the vehicle", "alert legibility in direct sunlight", "confirmation before an irreversible action", "handover between operators", "workload during a contingency", "display update at the stated rate"]],
  ["DAT", "DataManagement", "Storage, retrieval and downlink of mission products.", ["Retention", "Indexing", "Export", "Integrity", "Compression", "Chain", "Purge", "Catalogue"], ["retention of mission products", "integrity checking on retrieval", "export in the agreed interchange format", "chain of custody for captured data", "compression without loss of the source", "catalogue search across sorties"]],
  ["TST", "Verification", "Test, analysis, inspection and demonstration coverage.", ["Coverage", "Witness", "Regression", "Acceptance", "Qualification", "Traceability", "Method", "Evidence"], ["a verification method for every requirement", "witness of the acceptance test", "traceability from requirement to evidence", "regression after a configuration change", "qualification at the environmental extremes", "evidence retained for the audit period"]],
  ["REL", "Reliability", "Failure rates, redundancy and degraded modes.", ["Redundancy", "Degraded", "MeanTime", "Failover", "Detection", "Latent", "Wearout", "Prediction"], ["failover to the redundant channel", "detection of a latent failure", "operation in the degraded mode", "the predicted failure rate", "wearout before the overhaul interval", "no single point of failure in the flight path"]],
  ["MAS", "MassProperties", "Mass, balance and inertia budgets.", ["Budget", "Balance", "Inertia", "Growth", "Ballast", "Allocation", "Uncertainty", "Envelope"], ["the allocated subsystem mass", "centre of gravity within the envelope", "mass growth over the programme", "ballast to trim the vehicle", "inertia about the pitch axis", "mass uncertainty at the current maturity"]],
  ["PRP", "Propulsion", "Thrust, efficiency and throttle response.", ["Thrust", "Throttle", "Efficiency", "Restart", "Vibration", "Intake", "Governor", "Cutoff"], ["thrust at the design condition", "throttle response within the stated time", "restart after an in-flight shutdown", "governor stability at part load", "cutoff on command", "intake performance across the envelope"]],
  ["LND", "LaunchAndRecovery", "Launch, approach and recovery methods.", ["Launch", "Approach", "Arrest", "Touchdown", "GoAround", "Catapult", "Net", "Flare"], ["launch from an unprepared site", "a go-around from the approach", "touchdown within the stated footprint", "arrest without damage to the airframe", "recovery in a crosswind", "flare at the commanded height"]],
  ["AUT", "Autonomy", "Delegated decision authority and operator override.", ["Delegation", "Override", "Contingency", "Consent", "Bounds", "Escalation", "Handback", "Behaviour"], ["operator override at any point", "escalation to the operator on ambiguity", "behaviour within the delegated bounds", "handback of control to the operator", "a contingency route without operator input", "consent before a lethal-adjacent action"]],
  ["LOG", "Logistics", "Packaging, spares and sustainment.", ["Packaging", "Spares", "Shipping", "Storage", "Shelf", "Kitting", "Turnaround", "Support"], ["shipping by commercial carrier", "storage for the stated dormancy period", "turnaround between sorties", "a spares kit for the deployment", "shelf life of the consumables", "support equipment carried by the crew"]],
  ["CFG", "Configuration", "Variant management and interchangeability.", ["Variant", "Baseline", "Interchange", "Effectivity", "Marking", "Serialisation", "Build", "Deviation"], ["interchangeability between build standards", "the recorded baseline for a sortie", "effectivity of a modification", "marking of each serialised item", "a deviation approved before flight", "variant identification by the ground system"]],
];

const QUALIFIERS = ["Nominal", "Degraded", "Field", "Contingency", "Sustained", "Rapid", "Redundant", "Minimal", "Continuous", "Autonomous", "Manual", "Remote", "Onboard", "External", "Primary", "Secondary"];
const VERBS = ["shall provide", "shall maintain", "shall detect", "shall record", "shall limit", "shall support", "shall report", "shall recover from", "shall isolate", "shall verify", "shall constrain", "shall tolerate", "shall accommodate", "shall annunciate"];
const CONDS = ["throughout the defined mission profile.", "without external ground support.", "across the full operating temperature range.", "within one control cycle of detection.", "for the duration of the endurance requirement.", "under degraded navigation conditions.", "without operator intervention.", "at the specified confidence level.", "while remaining within emissions limits.", "for all approved payload configurations.", "at the stated build standard.", "before release to service."];
const ATTRS = [
  () => `mass: ${(rand() * 9 + 0.2).toFixed(1)} [kg]`,
  () => `powerDraw: ${Math.floor(rand() * 200 + 5)} [W]`,
  () => `setupTime: ${Math.floor(rand() * 45 + 5)} [min]`,
  () => `endurance: ${(rand() * 8 + 0.5).toFixed(1)} [h]`,
  () => `latency: ${(rand() * 4 + 0.1).toFixed(1)} [s]`,
  () => `range: ${Math.floor(rand() * 180 + 10)} [km]`,
  () => `crewSize: ${Math.floor(rand() * 4 + 1)}`,
  () => `mtbf: ${Math.floor(rand() * 900 + 100)} [h]`,
];
const TAGS = ["safety", "interface", "performance", "derived", "verification", "regulatory", "tbd", "cost"];
const FILTER_TAGS = ["safety", "interface", "verification", "tbd"] as const;

const RATIONALES = [
  "Allocated from the system-level budget.",
  "Derived from the concept of operations.",
  "Set by the ground support equipment interface.",
  "Required for airworthiness release.",
  "Agreed with the customer at preliminary design review.",
  "Constrained by the launch and recovery method.",
  "Derived from the operator workload analysis.",
  "Imposed by the applicable airspace regulation.",
  "Carried over from the predecessor programme.",
  "Follows from the hazard analysis for this function.",
];

const ROWS: Req[] = (() => {
  const out: Req[] = [];
  const usedNames = new Set<string>();

  SECTIONS.forEach(([abbr, label, blurb, nouns, objects], i) => {
    const n = i + 1;
    out.push({ id: `${n}`, code: `REQ-${abbr}`, name: label, doc: `Priority ${n}. ${blurb}`, attrs: [], rationale: "", tags: [], level: 0 });
    usedNames.add(label);

    // Names must be unique. Walk a shuffled product of qualifier x noun and
    // take only names not already used, rather than appending a numeral.
    const combos: string[] = [];
    for (const q of QUALIFIERS) for (const noun of nouns) combos.push(`${q}${noun}`);
    for (let k = combos.length - 1; k > 0; k--) {
      const j = Math.floor(rand() * (k + 1));
      [combos[k], combos[j]] = [combos[j], combos[k]];
    }

    const target = 46 + Math.floor(rand() * 14);
    let made = 0;
    for (const name of combos) {
      if (made >= target) break;
      if (usedNames.has(name)) continue;
      usedNames.add(name);
      made += 1;
      const tagCount = Math.floor(rand() * 3);
      out.push({
        id: `${n}.${made}`,
        code: `REQ-${abbr}-${String(made).padStart(3, "0")}`,
        name,
        doc: `The system ${pick(VERBS)} ${pick(objects)} ${pick(CONDS)}`,
        attrs: Array.from({ length: Math.floor(rand() * 3) }, () => pick(ATTRS)()),
        // Roughly one in seven is genuinely blank, which is true to a live set.
        rationale: rand() > 0.14 ? (rand() > 0.5 ? pick(RATIONALES) : `Flows down from REQ-${abbr}-${String(Math.max(1, Math.floor(rand() * made) || 1)).padStart(3, "0")}.`) : "",
        tags: Array.from({ length: tagCount }, () => pick(TAGS)).filter((t, idx, a) => a.indexOf(t) === idx),
        level: 1,
      });
    }
  });
  return out;
})();

/* ── Windowing ─────────────────────────────────────────────────────────── */

const ROW_H = 38;
const VIEWPORT_H = 460;
const OVERSCAN = 8;
const COLS = "52px 104px 150px minmax(180px,1fr) 128px minmax(150px,0.65fr) 80px";
/* 844 of columns + 60 of gaps + 24 of padding. Fits the main column once the
   figure cancels its p-8, which is what the -mx-8 below is for. */
const MIN_W = 928;
/* Columns are dense enough that touching text reads as a bug. */
const COL_GAP = 10;

/* The leading token shrinks and ellipsises; only the "+N" counter is rigid. */
/** Sysgit ships Inter. Recreations speak in the product's voice, not the site's. */
const PRODUCT_FONT = '"Inter", system-ui, sans-serif';

const TOKEN_CLASS = "min-w-0 truncate border px-1";
const TOKEN_COUNT_CLASS = "shrink-0 border px-1";
const TOKEN_STYLE = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 10.5,
  borderColor: "#ddd8ee",
  backgroundColor: "#f7f5fd",
  color: "#4a4760",
} as const;

export const RequirementsTableRecreation = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("All");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROWS.filter((r) => {
      if (tag !== "All" && r.level === 1 && !r.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.doc.toLowerCase().includes(q) ||
        r.rationale.toLowerCase().includes(q)
      );
    });
  }, [query, tag]);

  const first = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN);
  const last = Math.min(rows.length, Math.ceil((scrollTop + VIEWPORT_H) / ROW_H) + OVERSCAN);
  const slice = rows.slice(first, last);

  const resetScroll = () => {
    setScrollTop(0);
    if (viewportRef.current) viewportRef.current.scrollTop = 0;
  };

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const nf = new Intl.NumberFormat("en-US");

  // -mx-8 cancels the main column's p-8. Seven dense columns do not fit the
  // prose measure, and this is the one figure on the page that earns the extra
  // width. It stops at the grid cell: overlapping the sticky rail would read as
  // a bug rather than a choice.
  return (
    <figure className="-mx-8 mb-6" style={{ backgroundColor: "var(--surface-media)", padding: "1rem" }}>
      <div
        className="overflow-hidden border"
        style={{ backgroundColor: "#fff", borderColor: "#e3e1ea", fontFamily: PRODUCT_FONT, color: "#26232f" }}
      >
        {/* Toolbar. Status is document-level here, as it is in the product. */}
        <div className="flex flex-wrap items-center gap-3 border-b px-3 py-2" style={{ borderColor: "#e3e1ea" }}>
          <div className="text-[13px] font-medium">
            All <span style={{ color: "#6b6880" }}>{nf.format(rows.length)}</span>
          </div>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetScroll();
            }}
            placeholder="Search requirements"
            aria-label="Search requirements"
            className="min-w-[9rem] flex-1 border px-2 py-1 text-[13px] outline-none"
            style={{ borderColor: "#dedbe6", backgroundColor: "#fbfafd" }}
          />
          <div className="flex items-center gap-1">
            {(["All", ...FILTER_TAGS] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTag(t);
                  resetScroll();
                }}
                className="border px-2 py-1 text-[12px]"
                style={
                  tag === t
                    ? { backgroundColor: "#5b46d6", borderColor: "#5b46d6", color: "#fff" }
                    : { backgroundColor: "#fff", borderColor: "#dedbe6", color: "#4a4760" }
                }
              >
                {t}
              </button>
            ))}
          </div>
          <span className="px-2 py-1 text-[11.5px] font-medium" style={{ backgroundColor: "#fbe9a8", color: "#5c4a05" }}>
            In review
          </span>
        </div>

        {/* Bulk action bar. Named in the decision, so it is shown working. */}
        <div
          className="flex items-center gap-3 border-b px-3 py-1.5 text-[12px]"
          style={{ borderColor: "#e3e1ea", backgroundColor: selected.size ? "#f2effc" : "#fafafc", color: selected.size ? "#3c2fa8" : "#8b8899" }}
        >
          {selected.size ? (
            <>
              <span>{nf.format(selected.size)} selected</span>
              <span aria-hidden>·</span>
              <span>Set status</span>
              <span aria-hidden>·</span>
              <span>Add tag</span>
              <span aria-hidden>·</span>
              <span>Export</span>
              <button type="button" onClick={() => setSelected(new Set())} className="ml-auto underline">
                Clear
              </button>
            </>
          ) : (
            <span>Select rows for bulk actions</span>
          )}
        </div>

        <div className="overflow-x-auto">
          <div style={{ minWidth: MIN_W }}>
            <div
              className="grid items-center px-3 py-2 text-[12px] font-medium"
              style={{ gridTemplateColumns: COLS, columnGap: COL_GAP, backgroundColor: "#efecf9", color: "#3b3752" }}
            >
              <div>ID</div>
              <div>S.Name</div>
              <div>Name</div>
              <div>Documentation</div>
              <div>Attributes</div>
              <div>Rationale</div>
              <div>Tags</div>
            </div>

            <div
              ref={viewportRef}
              onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
              className="overflow-y-auto"
              style={{ height: VIEWPORT_H }}
            >
              <div style={{ height: rows.length * ROW_H, position: "relative" }}>
                <div style={{ position: "absolute", top: first * ROW_H, left: 0, right: 0 }}>
                  {slice.map((r) => {
                    const isSel = selected.has(r.id);
                    return (
                      <div
                        key={r.id}
                        onClick={() => r.level === 1 && toggle(r.id)}
                        className="grid items-center border-b px-3 text-[12.5px]"
                        style={{
                          gridTemplateColumns: COLS,
                          columnGap: COL_GAP,
                          height: ROW_H,
                          borderColor: "#efedf3",
                          backgroundColor: r.level === 0 ? "#f6f5f9" : isSel ? "#f3f0fd" : "#fff",
                          boxShadow: isSel ? "inset 3px 0 0 #5b46d6" : undefined,
                          cursor: r.level === 1 ? "pointer" : "default",
                        }}
                      >
                        <div style={{ minWidth: 0, paddingLeft: r.level * 14, fontWeight: r.level === 0 ? 600 : 400, fontVariantNumeric: "tabular-nums" }}>
                          {r.id}
                        </div>
                        <div className="truncate" style={{ minWidth: 0, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11.5, color: "#6b6880" }}>
                          {r.code}
                        </div>
                        <div className="truncate" style={{ minWidth: 0, color: r.level === 0 ? "#26232f" : "#4a35c7", fontWeight: r.level === 0 ? 600 : 500 }}>
                          {r.name}
                        </div>
                        <div className="truncate" style={{ minWidth: 0, color: "#4a4760" }} title={r.doc}>
                          {r.doc}
                        </div>
                        <div className="flex items-center gap-1 overflow-hidden" style={{ minWidth: 0 }} title={r.attrs.join("  ")}>
                          {r.attrs.length ? (
                            <>
                              <span className={TOKEN_CLASS} style={TOKEN_STYLE}>
                                {r.attrs[0]}
                              </span>
                              {r.attrs.length > 1 ? (
                                <span className={TOKEN_COUNT_CLASS} style={TOKEN_STYLE}>
                                  +{r.attrs.length - 1}
                                </span>
                              ) : null}
                            </>
                          ) : (
                            <span style={{ color: "#b3b0bf", fontSize: 11.5 }}>{r.level === 1 ? "Add attribute" : ""}</span>
                          )}
                        </div>
                        <div className="truncate" style={{ minWidth: 0, color: r.rationale ? "#4a4760" : "#b3b0bf" }} title={r.rationale}>
                          {r.level === 1 ? r.rationale || "Add rationale" : ""}
                        </div>
                        <div className="flex items-center gap-1 overflow-hidden" style={{ minWidth: 0 }} title={r.tags.join(", ")}>
                          {r.tags.slice(0, 1).map((t) => (
                            <span key={t} className="min-w-0 truncate px-1.5" style={{ fontSize: 10.5, backgroundColor: "#eceaf5", color: "#585372" }}>
                              {t}
                            </span>
                          ))}
                          {r.tags.length > 1 ? (
                            <span className="shrink-0 px-1.5" style={{ fontSize: 10.5, backgroundColor: "#eceaf5", color: "#585372" }}>
                              +{r.tags.length - 1}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t px-3 py-1.5 text-[11.5px]" style={{ borderColor: "#e3e1ea", color: "#8b8899" }}>
          Showing {nf.format(rows.length)} of {nf.format(ROWS.length)} requirements
        </div>
      </div>

      <figcaption className="cv-meta mt-4 max-w-prose px-8" style={{ color: "var(--text-on-media)" }}>
        Requirements table, interactive recreation. Real column structure and interaction model. Every requirement in
        it is synthetic, and the row count is a property of this recreation rather than any customer&rsquo;s project.
        Scroll, search and select.
      </figcaption>
    </figure>
  );
};
