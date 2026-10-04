import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CvPageProps {
  /** Left rail. Index supplies bio + resume; case studies supply project meta. */
  sidebar: ReactNode;
  children: ReactNode;
  /**
   * Type register for the rail. 12px by default. The rail is chrome around the
   * page: identity, navigation, the field, contact. Page content lives in the
   * content column, where it is set at reading size.
   */
  rail?: "meta" | "body";
}

/**
 * Dark CV shell: 25/75 grid, sticky left rail, hairline rules.
 * Collapses to a single column below `md`.
 */
export const CvPage = ({ sidebar, children, rail = "meta" }: CvPageProps) => (
  <>
    <div className="mx-auto grid w-full max-w-page grid-cols-1 bg-fern md:grid-cols-[25%_75%]">
      <aside className={cn(
        rail === "body" ? "cv-body" : "cv-meta",
        "flex flex-col gap-6 border-b border-hedge p-8 md:sticky md:top-0 md:max-h-screen md:self-start md:overflow-y-auto md:border-b-0 md:border-r",
      )}>
        {sidebar}
      </aside>
      <main className="cv-prose flex min-w-0 flex-col p-8">
        {children}
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
