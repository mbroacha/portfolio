export interface CaseStudySection {
  id: string;
  label: string;
  body: string;
}

/** Project header and rail metadata (bespoke case study pages). */
export interface CaseStudyProjectMeta {
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  domain: string;
  outcome: string;
  tags: string[];
}

/** Full content for the shared template layout (`CaseStudyPage`, Beacon, Gradescope until refactored). */
export interface CaseStudyTemplateContent extends CaseStudyProjectMeta {
  slug: string;
  sections: CaseStudySection[];
  decisions: { title: string; rationale: string; impact: string }[];
  constraints: { title: string; detail: string }[];
  snapshots: { title: string; value: string; note: string }[];
  fieldNotes: string[];
  quote: string;
  quoteAttribution: string;
}
