import type { ReactNode } from "react";
import { Interrogate } from "../query/Interrogate";

interface CvPageProps {
  /** Left rail. Index supplies bio + resume; case studies supply project meta. */
  sidebar: ReactNode;
  children: ReactNode;
  /**
   * Corpus scope for the interrogation field: "sysgit", "beacon" and so on.
   * Omit it and the field does not render.
   */
  scope?: string;
  /**
   * Rendered above the grid, on small screens only.
   *
   * Below `md` the rail stacks on top of the content, so anything at the top of
   * the main column starts a full sidebar down the page. The homepage prompt
   * has to be the first thing a reader meets, so it goes here on mobile and
   * stays inside the content column on desktop, where the two columns already
   * start level.
   */
  lead?: ReactNode;
}

/**
 * Dark CV shell: 33/67 grid, sticky left rail, hairline rules.
 * Collapses to a single column below `md`.
 */
export const CvPage = ({ sidebar, children, scope, lead }: CvPageProps) => (
  <>
    {lead ? (
      <div className="mx-auto w-full max-w-page bg-fern px-8 pt-8 md:hidden">{lead}</div>
    ) : null}
    <div className="mx-auto grid w-full max-w-page grid-cols-1 bg-fern md:grid-cols-[33%_67%]">
      <aside className="cv-meta flex flex-col gap-6 border-b border-hedge p-8 md:sticky md:top-0 md:max-h-screen md:self-start md:overflow-y-auto md:border-b-0 md:border-r">
        {sidebar}
        {scope ? (
          <Interrogate scope={scope} className="hidden border-t border-hedge pt-6 md:block" />
        ) : null}
      </aside>
      <main className="cv-prose flex min-w-0 flex-col p-8">
        {children}
        {/* Below `md` the rail stacks above the content, and asking a question
            before reading the case study is backwards. So on a phone the field
            moves to the end of the page. Body size here rather than 12px: the
            rail's size is a property of the rail, not of the answers. */}
        {scope ? <Interrogate scope={scope} className="mt-8 border-t border-hedge pt-6 md:hidden" /> : null}
      </main>
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
