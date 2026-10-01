import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
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
   * Type register for the rail. Case studies carry project metadata, so "meta"
   * at 12px. The homepage rail carries the bio, which is prose, so "body".
   */
  rail?: "meta" | "body";
}

/**
 * Dark CV shell: 25/75 grid, sticky left rail, hairline rules.
 * Collapses to a single column below `md`.
 */
export const CvPage = ({ sidebar, children, scope, rail = "meta" }: CvPageProps) => (
  <>
    <div className="mx-auto grid w-full max-w-page grid-cols-1 bg-fern md:grid-cols-[25%_75%]">
      <aside className={cn(
        rail === "body" ? "cv-body" : "cv-meta",
        "flex flex-col gap-6 border-b border-hedge p-8 md:sticky md:top-0 md:max-h-screen md:self-start md:overflow-y-auto md:border-b-0 md:border-r",
      )}>
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
