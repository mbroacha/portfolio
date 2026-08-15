import type { CaseStudyTemplateContent } from "./types";

/**
 * Slugs resolved by `CaseStudyPage` (`/case-study/:slug`). Add an import and entry here when
 * introducing a new template-driven case study.
 *
 * Empty by design: Originality is a bespoke page (`src/pages/Originality.tsx`), and Beacon and
 * Sysgit will follow that pattern rather than the template path. See PORTFOLIO_PLAN.md §1.
 */
const caseStudyTemplateContentBySlug: Record<string, CaseStudyTemplateContent> = {};

export function getCaseStudyTemplateContent(slug: string | undefined): CaseStudyTemplateContent | undefined {
  if (!slug) return undefined;
  return caseStudyTemplateContentBySlug[slug];
}
