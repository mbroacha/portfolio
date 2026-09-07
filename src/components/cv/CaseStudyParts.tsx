import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/** Claim left, evidence right. The template's core editorial device. */
export const TwoCol = ({ claim, children }: { claim: ReactNode; children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2">
    <div className="text-bone">{claim}</div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

export const ConstraintGrid = ({ items }: { items: { title: string; detail: string }[] }) => (
  <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2">
    {items.map((c) => (
      <div key={c.title} className="border-l border-[color:var(--edge)] pl-3.5">
        <b className="mb-1.5 block font-normal text-bone">{c.title}</b>
        {c.detail}
      </div>
    ))}
  </div>
);

/** One claim, lots of air. */
export const InsightBlock = ({ quote, source }: { quote: string; source?: string }) => (
  <div className="pb-7 pt-1">
    <blockquote className="m-0 max-w-[34ch] font-display text-[22px] italic leading-[1.35] text-bone">
      {quote}
    </blockquote>
    {source ? <div className="cv-meta mt-3 text-lichen">{source}</div> : null}
  </div>
);

export interface Decision {
  title: string;
  rejected?: string;
  why: string;
  tradeoff: string;
  result: string;
  /** Artifact proving the decision. Rendered full width beneath the two columns. */
  visual?: ReactNode;
}

export const DecisionRow = ({ decision, first }: { decision: Decision; first?: boolean }) => (
  <div className={cn("grid grid-cols-1 gap-6 py-5 sm:grid-cols-2", first ? "pt-0" : "border-t border-hedge")}>
    <div className="text-bone">
      <em className="font-display not-italic">{decision.title}</em>
      {decision.rejected ? <span className="cv-meta mt-2.5 block text-lichen">Rejected: {decision.rejected}</span> : null}
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
          <span className="cv-meta text-[11px] uppercase tracking-[0.08em] text-lichen">{label}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
    {decision.visual ? <div className="sm:col-span-2">{decision.visual}</div> : null}
  </div>
);

/**
 * Outcome, qualitative variant. Use where there are no defensible metrics.
 * See PORTFOLIO_PLAN.md 3c: a three-slot metric row invites invention.
 */
export const QualOutcome = ({ items }: { items: { title: string; detail: ReactNode }[] }) => (
  <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2">
    {items.map((q) => (
      <div key={q.title} className="border-l border-[color:var(--edge)] pl-3.5">
        <b className="mb-1.5 block font-normal text-bone">{q.title}</b>
        {q.detail}
      </div>
    ))}
  </div>
);

export const PrevNext = ({
  prev,
  next,
}: {
  prev?: { label: string; to: string };
  next?: { label: string; to: string };
}) => (
  <div className="flex justify-between border-t border-hedge pt-6">
    {prev ? (
      <Link to={prev.to} className="underline underline-offset-4">
        &larr; {prev.label}
      </Link>
    ) : (
      <span />
    )}
    {next ? (
      <Link to={next.to} className="underline underline-offset-4">
        {next.label} &rarr;
      </Link>
    ) : (
      <span />
    )}
  </div>
);

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
  <div className={cn("grid grid-cols-1 gap-6 py-5 sm:grid-cols-2", first ? "pt-0" : "border-t border-hedge")}>
    <div>
      <div className="text-bone">
        {n}. {title}
      </div>
      {tool ? <div className="cv-meta mt-2 text-lichen">{tool}</div> : null}
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

/** Simple label/value ledger. Used for the pre-AI chronology. */
export const Ledger = ({ rows }: { rows: { left: string; right: string; note?: string }[] }) => (
  <div className="pb-6">
    {rows.map((r, i) => (
      <div
        key={r.left}
        className={cn("grid grid-cols-1 gap-4 py-3 sm:grid-cols-[1fr_1fr_auto]", i === 0 ? "" : "border-t border-hedge")}
      >
        <div className="text-bone">{r.left}</div>
        <div>{r.right}</div>
        {r.note ? <div className="cv-meta text-lichen sm:text-right">{r.note}</div> : null}
      </div>
    ))}
  </div>
);
