/**
 * Sysgit product goals, drawn.
 *
 * This page is an overview rather than a case study, so the goals carry the
 * weight the Decisions section used to. Each one is a sentence plus a mark that
 * states the same thing geometrically: a subtraction, a join, a loop, a chain.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - These are diagrams, captioned as diagrams. No captures, no customer
 *     content, no figures. The only quantities are counts of drawn boxes.
 *   - Nothing here describes deployment, security posture, or failure
 *     behaviour. Those belong in the private interview document.
 *
 * Drawn in the product's own palette (lavender #8b61dc for model objects, teal
 * #92b4be for the neighbouring tools it does not replace) rather than the
 * site's dark monochrome, matching the hero and the stack diagram.
 */

import type { ReactNode } from "react";

const L = "#a98cf0";
const LD = "#8b61dc";
const T = "#92b4be";

const Frame = ({ children, label }: { children: ReactNode; label: string }) => (
  <svg viewBox="0 0 200 104" role="img" aria-label={label} className="mb-4 block h-auto w-full">
    <rect width="200" height="104" fill="#0d0d0d" />
    {children}
  </svg>
);

/** Five tools become one. The argument is a subtraction. */
const MarkOneTool = () => (
  <Frame label="Five separate tool boxes on the left, reduced to one box on the right.">
    <g fill="none" stroke={T} strokeWidth="1.5" strokeOpacity="0.55">
      <rect x="14" y="16" width="34" height="14" />
      <rect x="14" y="34" width="34" height="14" />
      <rect x="14" y="52" width="34" height="14" />
      <rect x="14" y="70" width="34" height="14" />
      <rect x="54" y="43" width="26" height="14" />
    </g>
    <g stroke={LD} strokeWidth="1.5" strokeOpacity="0.5" fill="none">
      <path d="M90 50 H 118" />
      <polygon points="124,50 116,46 116,54" fill={L} fillOpacity="0.6" stroke="none" />
    </g>
    <rect x="132" y="30" width="54" height="44" fill="#ede9fc" fillOpacity="0.06" stroke={L} strokeWidth="1.5" />
    <rect x="132" y="30" width="54" height="12" fill={LD} fillOpacity="0.22" stroke="none" />
  </Frame>
);

/** The picture and the code are the same object. */
const MarkOneArtifact = () => (
  <Frame label="A model node above and lines of code below, joined to the same object.">
    <rect x="22" y="14" width="68" height="36" fill="#ede9fc" fillOpacity="0.06" stroke={L} strokeWidth="1.5" />
    <rect x="22" y="14" width="68" height="11" fill={LD} fillOpacity="0.22" stroke="none" />
    <g stroke={L} strokeWidth="1.5" strokeOpacity="0.5" fill="none">
      <path d="M56 50 V 62 H 134" />
      <path d="M134 62 V 42" />
      <polygon points="134,36 130,44 138,44" fill={L} fillOpacity="0.6" stroke="none" />
    </g>
    <g stroke="#d6c9f5" strokeWidth="2" strokeOpacity="0.4">
      <path d="M112 72 H 176" />
      <path d="M118 80 H 162" />
      <path d="M118 88 H 150" />
    </g>
  </Frame>
);

/** Revised continuously, not approved once. */
const MarkRevise = () => (
  <Frame label="A branch leaving a main line, gathering two commits, and merging back.">
    <path d="M14 70 H 186" stroke={L} strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
    <path d="M58 70 C 76 70 76 34 96 34 H 118 C 138 34 138 70 156 70" stroke={L} strokeWidth="1.5" fill="none" />
    <g fill="#0d0d0d" stroke={L} strokeWidth="1.5">
      <circle cx="58" cy="70" r="4" />
      <circle cx="156" cy="70" r="4" />
      <circle cx="96" cy="34" r="4" />
      <circle cx="118" cy="34" r="4" />
    </g>
  </Frame>
);

/** Statute, attribute, test. One fact, three places. */
const MarkTrace = () => (
  <Frame label="A document, a model attribute and a verification test, linked in a chain.">
    <g stroke="#d6c9f5" strokeWidth="2" strokeOpacity="0.4">
      <path d="M16 38 H 54" />
      <path d="M16 46 H 48" />
      <path d="M16 54 H 54" />
      <path d="M16 62 H 40" />
    </g>
    <rect x="80" y="36" width="40" height="28" fill="#ede9fc" fillOpacity="0.06" stroke={L} strokeWidth="1.5" />
    <rect x="146" y="36" width="40" height="28" fill="none" stroke={T} strokeWidth="1.5" strokeOpacity="0.7" />
    <path d="M155 50 l6 7 l13 -15" stroke={T} strokeWidth="2" fill="none" />
    <g stroke={L} strokeWidth="1.5" strokeOpacity="0.5" fill="none">
      <path d="M62 50 H 74" />
      <path d="M126 50 H 140" />
    </g>
  </Frame>
);

const goals = [
  {
    mark: <MarkOneTool />,
    title: "Replace a toolchain, not a task",
    detail:
      "Modeling and requirements management in one product. Customers run several tools with several integrations and justify every seat they buy, so breadth is the thing being bought.",
  },
  {
    mark: <MarkOneArtifact />,
    title: "One artifact, two kinds of reader",
    detail:
      "The same object has to be legible as a picture and as code, because the engineer who writes it and the stakeholder who validates it do not share a mental model.",
  },
  {
    mark: <MarkRevise />,
    title: "A model you revise, not one you approve",
    detail:
      "Branching, review and merge, borrowed from software and renamed in engineering vocabulary. The alternative is a formal meeting where nobody agrees what the source of truth is.",
  },
  {
    mark: <MarkTrace />,
    title: "A requirement you can follow end to end",
    detail:
      "Requirements arrive as documents and often carry statutory weight. Each one becomes an object that links to the value it constrains and the test that verifies it.",
  },
];

export const SysgitGoals = () => (
  <div className="grid grid-cols-1 gap-x-6 gap-y-7 pb-6 sm:grid-cols-2">
    {goals.map((g) => (
      <div key={g.title}>
        {g.mark}
        <b className="cv-subhead mb-1.5 block font-normal text-bone">{g.title}</b>
        <div className="max-w-[var(--measure-prose)]">{g.detail}</div>
      </div>
    ))}
  </div>
);
