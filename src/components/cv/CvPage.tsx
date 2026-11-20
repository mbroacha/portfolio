import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, SiteRail } from "./SiteRail";

interface CvPageProps {
  /** Corpus scope for the "Ask me anything" field. */
  scope?: string;
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
export const CvPage = ({ scope, children }: CvPageProps) => (
  <>
    <SiteHeader />
    <div className="mx-auto grid w-full max-w-page grid-cols-1 bg-fern lg:grid-cols-[25%_75%]">
      <aside className="cv-meta hidden flex-col gap-6 border-r border-hedge p-8 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:self-start lg:overflow-y-auto">
        <SiteRail scope={scope} />
      </aside>
      <main className="cv-prose flex min-w-0 flex-col p-8">
        {children}
      </main>
      <SiteFooter scope={scope} />
    </div>
    <footer
      className="cv-meta mx-auto w-full max-w-page border-t border-hedge bg-moss px-8 py-6"
      style={{ color: "var(--text-footer)" }}
      role="contentinfo"
    >
      © Morgan Broacha 2026
    </footer>
  </>
);
