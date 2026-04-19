import type { CaseStudyTemplateContent } from "./types";
import { commandCenterRiskModeling } from "./command-center-risk-modeling";

/**
 * Slugs resolved by `CaseStudyPage` (`/case-study/:slug`). Add an import and entry here when
 * introducing a new template-driven case study.
 */
const caseStudyTemplateContentBySlug: Record<string, CaseStudyTemplateContent> = {
  [commandCenterRiskModeling.slug]: commandCenterRiskModeling,
};

export function getCaseStudyTemplateContent(slug: string | undefined): CaseStudyTemplateContent | undefined {
  if (!slug) return undefined;
  return caseStudyTemplateContentBySlug[slug];
}
