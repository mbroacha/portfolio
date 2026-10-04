import type { ReactNode } from "react";
import { MetaList, Rule } from "./CvPrimitives";

/**
 * Title, one line, and the facts, at the top of the content column.
 *
 * This used to live in the rail. The rail is now identical on every page, so
 * anything page-specific moved here.
 *
 * It is not the Overview section we cut. That was prose, and it either repeated
 * the rail or filled with product marketing. This is a label and value list:
 * role, timeline, team, scope. A reader scans it in two seconds and it makes no
 * claims.
 */
export const PageHead = ({
  title,
  lede,
  items,
}: {
  title: string;
  lede: ReactNode;
  items?: { label: string; value: ReactNode }[];
}) => (
  <div className="mb-8">
    <h1 className="m-0 font-display text-[length:var(--font-size-xl)] font-normal italic text-bone">{title}</h1>
    <div className="mt-2 max-w-[var(--measure-prose)]">{lede}</div>
    {items ? (
      <>
        <Rule className="my-5" />
        <div className="cv-meta">
          <MetaList items={items} />
        </div>
      </>
    ) : null}
  </div>
);
