import type { ReactNode } from "react";
import { MobileIntro, SiteFooter, SiteHeader, SiteRail } from "./SiteRail";

interface CvPageProps {
  /** Corpus scope for the "Ask me anything" field. */
  scope?: string;
  /** Below `lg`, lead the content with the bio and contact instead of
      leaving them for the footer. The homepage only: a case study's own
      PageHead already says what the reader is looking at. */
  intro?: boolean;
  children: ReactNode;
}

/**
 * Dark CV shell.
 *
 * At `lg` and up: 25/75 grid, sticky left rail, hairline rules.
 * Below `lg`: a slim sticky header with a menu, the content, then the field
 * and contact links. The rail is 12px structure type: chrome around the page.
 * Page content lives in the content column, where it is set at reading size.
 *
 * The switch is `lg`, not `md`: at 768px a 25% rail is ~190px, and the nav
 * card labels wrapped one word per line.
 */
/** Case studies whose scope names a project take that project's color in the
    content column. The rail stays gray on every page. */
const PROJECT_SCOPES = new Set(["sysgit", "beacon", "originality", "gradescope"]);

export const CvPage = ({ scope, intro = false, children }: CvPageProps) => {
  const project = scope && PROJECT_SCOPES.has(scope) ? scope : undefined;
  return (
  <>
    {/* First tab stop on every page. On desktop the rail holds about a dozen
        controls before the content; this lets a keyboard reader past them.
        Hidden until focused, then pinned top-left above the sticky header. */}
    <a
      href="#content"
      className="cv-meta sr-only z-50 bg-primary px-4 py-3 text-page no-underline focus:not-sr-only focus:fixed focus:left-4 focus:top-4 hover:text-page"
    >
      Skip to content
    </a>
    <SiteHeader />
    <div className="mx-auto grid w-full max-w-page grid-cols-1 bg-panel lg:grid-cols-[25%_75%]">
      <aside className="cv-meta hidden flex-col gap-6 border-r border-rule p-8 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:self-start lg:overflow-y-auto">
        <SiteRail scope={scope} />
      </aside>
      {/* tabIndex -1: the skip link moves focus here, not only the scroll
          position, so the next Tab continues inside the content. */}
      <main
        id="content"
        tabIndex={-1}
        className="cv-prose flex min-w-0 flex-col p-8 focus:outline-none"
        data-project={project}
        style={project ? ({ "--project": `var(--project-${project})` } as React.CSSProperties) : undefined}
      >
        {intro ? <MobileIntro /> : null}
        {children}
      </main>
      <SiteFooter scope={scope} bio={!intro} />
    </div>
    <footer
      className="cv-meta mx-auto w-full max-w-page border-t border-rule bg-page px-8 py-6"
      style={{ color: "var(--text-footer)" }}
      role="contentinfo"
    >
      © Morgan Broacha 2026
    </footer>
  </>
  );
};
