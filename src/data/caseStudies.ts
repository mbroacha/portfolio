export interface CaseStudySection {
  id: string;
  label: string;
  body: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  domain: string;
  outcome: string;
  tags: string[];
  sections: CaseStudySection[];
  decisions: { title: string; rationale: string; impact: string }[];
  constraints: { title: string; detail: string }[];
  snapshots: { title: string; value: string; note: string }[];
  fieldNotes: string[];
  quote: string;
  quoteAttribution: string;
}

export const caseStudies: CaseStudyData[] = [
  {
    slug: "command-center-risk-modeling",
    title: "Command Center for Risk Modeling",
    subtitle:
      "Reframed a fragmented decision workflow into a coherent operating system for analysts and escalation leads.",
    role: "Staff Product Designer",
    timeline: "8 months",
    domain: "Critical infrastructure compliance",
    outcome: "Reduced analysis cycle time by 37% while improving decision traceability.",
    tags: ["Enterprise UX", "Systems Thinking", "Workflow Architecture"],
    sections: [
      {
        id: "context",
        label: "Context",
        body: "Analysts were stitching together exports, chat logs, and legacy dashboards to produce high-stakes recommendations under strict timelines.",
      },
      {
        id: "approach",
        label: "Approach",
        body: "Built a stable interaction spine for triage, evidence review, and disposition while preserving room for expert judgement and dissent.",
      },
      {
        id: "delivery",
        label: "Delivery",
        body: "Introduced a phased release model tied to measurable operator confidence and adoption, rather than feature completion alone.",
      },
    ],
    decisions: [
      {
        title: "Single source of review state",
        rationale: "Parallel tools created conflicting narratives during incident review.",
        impact: "Incident handoffs became auditable and 22% faster.",
      },
      {
        title: "Progressive disclosure for edge controls",
        rationale: "Analysts needed advanced controls without overwhelming first-pass assessments.",
        impact: "Power users kept depth while onboarding time dropped.",
      },
    ],
    constraints: [
      {
        title: "Regulated evidence handling",
        detail: "No external annotation tools or untracked export pathways allowed.",
      },
      {
        title: "Cross-regional policy variance",
        detail: "Rules changed by market and had to remain visible in context.",
      },
    ],
    snapshots: [
      {
        title: "Weekly active analysts",
        value: "+49%",
        note: "After phased rollout to two enterprise accounts.",
      },
      {
        title: "Critical-task completion",
        value: "91%",
        note: "Measured across high-complexity review scenarios.",
      },
    ],
    fieldNotes: [
      "Operators trusted the system when it made uncertainty explicit, not hidden.",
      "The left rail became a cognitive anchor for navigating dense evidence sets.",
    ],
    quote:
      "The product stopped feeling like software we had to fight. It started feeling like an instrument.",
    quoteAttribution: "Director of Operations",
  },
];
