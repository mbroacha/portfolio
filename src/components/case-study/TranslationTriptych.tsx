import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";

/**
 * Sysgit hero: one object in three notations.
 *
 * The case study's through-line, in Morgan's own words, is that every artifact
 * in Sysgit has to be simultaneously legible as a picture, as a document and as
 * code, to two cohorts with incompatible mental models. This is that sentence
 * as an image, and it makes the argument before the reader has read a word.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - Captioned as a diagram, not a screenshot.
 *   - The object shown is from the product's own demo model, which is cleared
 *     for publication. No customer content and no invented figures.
 *   - The real capture still appears on the page, under Decision 1.
 *
 * The mechanism: the same fact, energyCapacity = 500 W·h, sits on the same
 * baseline in all three panels and carries the product's own selection
 * treatment across the triptych. Row heights are shared so it aligns without
 * absolute positioning. Note the picture panel's inset has no top padding, for
 * exactly that reason.
 *
 * Styling: the panels are drawn in the product's visual language rather than
 * the site's, so the reader is looking at Sysgit rather than at a portfolio
 * illustration. Every value in P below was sampled from product screenshots.
 * The site's voice is confined to the eyebrows and the caption, which frame it.
 */

/* ── Product palette, sampled from screenshots ─────────────────────────── */

const P = {
  /** Editor */
  codeBg: "#f0f0f0",
  gutter: "#3e7790",
  rule: "#d3d3d3",
  keyword: "#0000f5",
  comment: "#377e22",
  type: "#377e7f",
  plain: "#000000",
  /** Requirement node and selection */
  lavenderLit: "#ece8fb",
  purple: "#8b61dc",
  /** Part def node */
  tealHeader: "#92b4be",
  tealBody: "#b1c8d0",
  tealPanel: "#e8ebf0",
  tealEdge: "#6f8f9a",
  tealInk: "#12303a",
  tealLabel: "#3d5a63",
  tealMuted: "#757b8a",
  /** Table */
  tableHeader: "#efecf9",
  tableHeaderText: "#3b3752",
  link: "#4a35c7",
  bodyText: "#4a4760",
  muted: "#8b8899",
  edge: "#cccccc",
} as const;

const INTER = '"Inter", system-ui, sans-serif';
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const ROW_H = 26;
const HEADER_H = 34;

/** The product's selection treatment, applied to the same fact three times. */
const LIT: React.CSSProperties = {
  backgroundColor: P.lavenderLit,
  boxShadow: `inset 2px 0 0 ${P.purple}`,
};

const LABEL: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const Shell = ({
  eyebrow,
  header,
  bodyStyle,
  children,
}: {
  eyebrow: string;
  header: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div className="flex min-w-0 flex-1 flex-col">
    <div className="cv-meta mb-3 uppercase text-bone" style={{ letterSpacing: "var(--tracking-label)" }}>
      {eyebrow}
    </div>
    <div className="flex flex-1 flex-col border" style={{ borderColor: P.edge, fontFamily: INTER }}>
      {header}
      <div className="flex flex-1 flex-col" style={bodyStyle}>
        {children}
      </div>
    </div>
  </div>
);

const Row = ({
  children,
  lit,
  style,
}: {
  children: React.ReactNode;
  lit?: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    className="flex shrink-0 items-center overflow-hidden whitespace-nowrap px-2.5"
    style={{ height: ROW_H, fontSize: 11.5, ...(lit ? LIT : null), ...style }}
  >
    <span className="truncate">{children}</span>
  </div>
);

/* ── Panel one: the object as a picture ───────────────────────────────── */

const Picture = () => (
  <Shell
    eyebrow="As a picture"
    header={
      <div
        className="flex shrink-0 flex-col justify-center px-2.5"
        style={{ height: HEADER_H, backgroundColor: P.tealHeader, color: P.tealInk }}
      >
        <div style={{ ...LABEL, color: P.tealLabel }}>part def</div>
        <div style={{ fontSize: 12, fontWeight: 500, marginTop: -1 }}>PowerSubsystem</div>
      </div>
    }
    /* No top padding: the inset must not push this panel's rows out of line
       with the other two. */
    bodyStyle={{ backgroundColor: P.tealBody, padding: "0 6px 6px" }}
  >
    <div style={{ backgroundColor: P.tealPanel }}>
      <Row style={{ ...LABEL, color: P.tealMuted }}>Attributes</Row>
      <Row lit style={{ color: P.plain, fontWeight: 500 }}>
        energyCapacity = 500 [W·h]
      </Row>
      <Row style={{ color: P.bodyText }}>maxPowerOutput = 1000 [W]</Row>
      <Row style={{ ...LABEL, color: P.tealMuted }}>Ports</Row>
      <Row style={{ color: P.bodyText }}>pwrOut : PowerPort</Row>
    </div>

    {/* A stub of structure, so this panel reads as a graph rather than a list. */}
    <div className="mt-auto flex flex-col items-start pt-2">
      <div className="ml-4 w-px" style={{ height: 14, backgroundColor: P.tealEdge }} aria-hidden />
      <div
        className="w-full border px-2 py-1"
        style={{ borderColor: P.tealEdge, backgroundColor: P.tealHeader, color: P.tealInk, fontSize: 10.5 }}
      >
        part flightControl
      </div>
    </div>
  </Shell>
);

/* ── Panel two: the object as a document ──────────────────────────────── */

const Document = () => (
  <Shell
    eyebrow="As a document"
    header={
      <div
        className="flex shrink-0 items-center justify-between px-2.5"
        style={{
          height: HEADER_H,
          backgroundColor: P.tableHeader,
          color: P.tableHeaderText,
          fontSize: 11.5,
          fontWeight: 500,
        }}
      >
        <span>Requirements</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>3.1</span>
      </div>
    }
    bodyStyle={{ backgroundColor: "#ffffff" }}
  >
    <Row>
      <span style={{ fontFamily: MONO, fontSize: 10.5, color: P.muted }}>REQ-PWR-001</span>
      <span style={{ color: P.link, fontWeight: 500, marginLeft: 8 }}>UsableEnergyCapacity</span>
    </Row>
    <Row lit>
      <span
        className="border px-1"
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          borderColor: "#ddd8ee",
          backgroundColor: "#f7f5fd",
          color: P.plain,
        }}
      >
        energyCapacity = 500 [W·h]
      </span>
    </Row>
    <Row style={{ color: P.bodyText }}>The system shall provide the</Row>
    <Row style={{ color: P.bodyText }}>stated usable energy capacity.</Row>
    <Row style={{ ...LABEL, color: P.muted }}>Rationale</Row>
    <Row style={{ color: P.bodyText }}>Allocated from the system</Row>
    <Row style={{ color: P.bodyText }}>energy budget.</Row>
  </Shell>
);

/* ── Panel three: the object as code ──────────────────────────────────── */

type Tok = [text: string, color: string];

const CODE: { n: number; toks: Tok[]; indent?: number; lit?: boolean }[] = [
  { n: 105, toks: [["part", P.keyword], [" power : ", P.plain], ["PowerSubsystem", P.type], [" {", P.plain]] },
  {
    n: 116,
    indent: 1,
    lit: true,
    toks: [["attribute", P.keyword], [" energyCapacity = 500 [W * h];", P.plain]],
  },
  { n: 121, indent: 1, toks: [["attribute", P.keyword], [" maxPowerOutput = 1000 [W];", P.plain]] },
  { n: 128, indent: 1, toks: [["port", P.keyword], [" pwrOut : ", P.plain], ["PowerPort", P.type], [";", P.plain]] },
  { n: 129, indent: 1, toks: [["/* Mission power bus. */", P.comment]] },
  { n: 145, toks: [["}", P.plain]] },
];

const Code = () => (
  <Shell
    eyebrow="As code"
    header={
      <div
        className="flex shrink-0 items-center px-2.5"
        style={{
          height: HEADER_H,
          backgroundColor: "#e6e6e6",
          color: "#333333",
          fontSize: 11.5,
          borderBottom: `1px solid ${P.rule}`,
        }}
      >
        main.sysml
      </div>
    }
    bodyStyle={{ backgroundColor: P.codeBg }}
  >
    {CODE.map((line) => (
      <div
        key={line.n}
        className="flex shrink-0 items-center overflow-hidden whitespace-nowrap"
        style={{ height: ROW_H, fontFamily: MONO, fontSize: 10.5, ...(line.lit ? LIT : null) }}
      >
        <span
          className="shrink-0 select-none pr-2 text-right"
          style={{ width: 34, color: P.gutter, fontVariantNumeric: "tabular-nums" }}
          aria-hidden
        >
          {line.n}
        </span>
        <span className="truncate" style={{ paddingLeft: (line.indent ?? 0) * 12 }}>
          {line.toks.map(([text, color], i) => (
            <span key={i} style={{ color }}>
              {text}
            </span>
          ))}
        </span>
      </div>
    ))}
  </Shell>
);

export const TranslationTriptych = () => (
  <figure className="mb-6" style={{ backgroundColor: "var(--surface-media)", padding: "1rem" }}>
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-4">
      <Picture />
      <Document />
      <Code />
    </div>
    <figcaption className="cv-meta mt-4 max-w-prose" style={{ color: "var(--text-on-media)" }}>
      One object in three notations, drawn in the product&rsquo;s own visual language and taken from its demo model.
      Diagram, not a screenshot. Every artifact in Sysgit has to be legible as a picture, as a document and as code, to
      people who think visually and people who think in code. The selected line is the same fact in all three.
    </figcaption>
  </figure>
);
