import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { seriesPosition, type SeriesEntry } from "../../data/series";

/**
 * Claim left, evidence right. The template's core editorial device.
 *
 * The claim is short and the evidence runs long, so on a wide screen the claim
 * holds its place beside the paragraphs it summarizes instead of leaving the
 * left column empty below one line. Below sm the two stack and nothing sticks.
 */
export const TwoCol = ({ claim, children }: { claim: ReactNode; children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2">
    <div className="cv-claim text-primary sm:sticky sm:top-20 sm:self-start lg:top-8">{claim}</div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

export const ConstraintGrid = ({ items }: { items: { title: string; detail: string }[] }) => (
  <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2">
    {items.map((c) => (
      <div key={c.title} className="border-l border-[color:var(--edge)] pl-3.5">
        <h3 className="cv-subhead mb-1.5 font-sans font-normal text-primary">{c.title}</h3>
        {c.detail}
      </div>
    ))}
  </div>
);

/** One claim, lots of air. */
export const InsightBlock = ({ quote, source }: { quote: string; source?: string }) => (
  <div className="pb-7 pt-1">
    <blockquote className="m-0 max-w-[34ch] font-display text-[22px] italic leading-[1.35] text-primary [text-wrap:pretty]">
      {quote}
    </blockquote>
    {source ? <div className="mt-3 text-tertiary">{source}</div> : null}
  </div>
);

export interface Decision {
  title: string;
  rejected?: string;
  /** The label in front of `rejected`. A decision the designer walked back is
      not something they rejected, so reversals name it differently. */
  rejectedLabel?: string;
  why: ReactNode;
  tradeoff: ReactNode;
  /** Long results can pass paragraphs; each <p> gets its own spacing. */
  result: ReactNode;
  /** Artifact proving the decision. Rendered full width beneath the two columns. */
  visual?: ReactNode;
  /** Set the visual on the media mat, the way the Sysgit triptych sits. For
      live product recreations: a white panel straight on the dark page glares,
      and four of them in a row strobe between dark and light. */
  mat?: boolean;
}

export const DecisionRow = ({ decision, first }: { decision: Decision; first?: boolean }) => (
  <div className={cn("grid grid-cols-1 gap-6 py-5 sm:grid-cols-2", first ? "pt-0" : "border-t border-rule")}>
    <div className="text-primary">
      {/* An h3 under the section's h2, so heading navigation lands on each
          decision rather than only on "Decisions". */}
      <h3 className="cv-claim font-display font-normal">{decision.title}</h3>
      {decision.rejected ? (
        <span className="mt-2.5 block text-tertiary">
          {decision.rejectedLabel ?? "Rejected"}: {decision.rejected}
        </span>
      ) : null}
    </div>
    <div>
      {(
        [
          ["Why", decision.why],
          ["Tradeoff", decision.tradeoff],
          ["Result", decision.result],
        ] as const
      ).map(([label, value]) => (
        <div key={label} className="mb-3 flex flex-col gap-1">
          <span className="cv-meta uppercase tracking-[0.08em] text-tertiary">{label}</span>
          <div className="flex max-w-[var(--measure-prose)] flex-col gap-2">{value}</div>
        </div>
      ))}
    </div>
    {decision.visual ? (
      <div className={cn("sm:col-span-2", decision.mat && "bg-[color:var(--surface-media)] p-4 sm:p-6")}>
        {decision.visual}
      </div>
    ) : null}
  </div>
);

/**
 * Outcome, qualitative variant. Use where there are no defensible metrics.
 * A three-slot metric row invites invention.
 */
export const QualOutcome = ({ items }: { items: { title: string; detail: ReactNode }[] }) => (
  // Three items in two columns left the third alone on a row. Three get three.
  <div className={cn("grid grid-cols-1 gap-6 pb-6", items.length === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2")}>
    {items.map((q) => (
      <div key={q.title} className="border-l border-[color:var(--edge)] pl-3.5">
        <h3 className="cv-subhead mb-1.5 font-sans font-normal text-primary">{q.title}</h3>
        {q.detail}
      </div>
    ))}
  </div>
);

type NavTarget = { label: string; to: string };

/** One end of the foot-of-page links. Just the name and an arrow. */
const NavCell = ({
  target,
  align,
  project,
}: {
  target: NavTarget;
  align: "start" | "end";
  /** The destination's project, so its underline carries that project's hue. */
  project?: SeriesEntry["id"];
}) => (
  <div
    data-project={project}
    style={project ? ({ "--project": `var(--project-${project})` } as React.CSSProperties) : undefined}
    className={cn(align === "end" && "text-right")}
  >
    <Link to={target.to} className="inline-block py-2 underline underline-offset-4">
      {align === "start" ? <>&larr; </> : null}
      {target.label}
      {align === "end" ? <> &rarr;</> : null}
    </Link>
  </div>
);

/**
 * Foot-of-page links between pages.
 *
 * Case studies pass `series` and get their neighbours from src/data/series.ts,
 * so the chain cannot skip a page. Other pages pass `prev` and `next` by hand.
 */
export const PrevNext = ({
  series,
  prev,
  next,
}: {
  series?: SeriesEntry["id"];
  prev?: NavTarget;
  next?: NavTarget;
}) => {
  const pos = series ? seriesPosition(series) : undefined;
  const before: NavTarget | undefined = pos?.prev ? { label: pos.prev.title, to: pos.prev.to } : prev;
  // The last case study hands on to How I Work.
  const after: NavTarget | undefined = pos?.next
    ? { label: pos.next.title, to: pos.next.to }
    : (next ?? (pos ? { label: "How I Work", to: "/how-i-work" } : undefined));

  return (
    <nav aria-label={pos ? "Case studies" : "Pages"} className="flex justify-between gap-6 border-t border-rule pt-6">
      {before ? <NavCell target={before} align="start" project={pos?.prev?.id} /> : <span />}
      {after ? <NavCell target={after} align="end" project={pos?.next?.id} /> : null}
    </nav>
  );
};

/** Numbered walkthrough step. Index and tool left, what happened right. */
export const Step = ({
  n,
  tool,
  title,
  children,
  first,
}: {
  n: number;
  tool?: string;
  title: string;
  children: ReactNode;
  first?: boolean;
}) => (
  <div className={cn("grid grid-cols-1 gap-6 py-5 sm:grid-cols-2", first ? "pt-0" : "border-t border-rule")}>
    <div>
      <div className="cv-subhead text-primary">
        {n}. {title}
      </div>
      {tool ? <div className="mt-2 text-tertiary">{tool}</div> : null}
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

/**
 * Ledger: label, what happened, and the tool, one row per step.
 *
 * Optional `media` sits under the row's middle column, so an artifact lands
 * beside the step it proves instead of piling up at the end. Optional
 * `decided` names the decisions made at that step, so a claim about who made
 * them can be checked row by row rather than taken on trust.
 *
 * The middle column is capped at the reading measure: on a wide screen a bare
 * 1fr ran to ~95 characters a line.
 */
export const Ledger = ({
  rows,
}: {
  rows: { left: string; right: ReactNode; note?: string; media?: ReactNode; decided?: string[] }[];
}) => (
  <div className="pb-6">
    {rows.map((r, i) => (
      <div
        key={r.left}
        className={cn(
          "grid grid-cols-1 gap-1 py-3 sm:grid-cols-[12rem_1fr_8rem] sm:gap-x-6",
          i === 0 ? "" : "border-t border-rule",
        )}
      >
        <div className="text-primary">{r.left}</div>
        <div className="max-w-[var(--measure-prose)]">
          {r.right}
          {r.decided?.length ? (
            <p className="mb-0 mt-2 text-primary">
              <span className="text-tertiary">Decided: </span>
              {r.decided.join("; ")}
            </p>
          ) : null}
        </div>
        {r.note ? <div className="text-tertiary sm:text-right">{r.note}</div> : null}
        {r.media ? <div className="mt-3 sm:col-start-2 [&>*]:mb-0">{r.media}</div> : null}
      </div>
    ))}
  </div>
);
