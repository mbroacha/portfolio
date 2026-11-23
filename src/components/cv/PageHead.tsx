import type { ReactNode } from "react";
import { MetaList, Rule, StackedList } from "./CvPrimitives";

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
  subtitle,
  lede,
  items,
  stacked,
}: {
  title: string;
  /** A second title in the old book manner ("or, ..."). Part of the heading,
      so it sits inside the h1 and is read with it, one step down in size. */
  subtitle?: string;
  lede?: ReactNode;
  items?: { label: string; value: ReactNode }[];
  /** Label above value, for entries whose value runs to paragraphs. */
  stacked?: boolean;
}) => (
  <div className="mb-8">
    <h1 className="m-0 font-display text-[length:var(--font-size-xl)] font-normal italic text-primary">
      {title}
      {subtitle ? (
        <span className="mt-1 block text-[length:var(--font-size-3xl)] text-tertiary">{subtitle}</span>
      ) : null}
    </h1>
    {lede ? <div className="mt-5 max-w-[90ch]">{lede}</div> : null}
    {items ? (
      <>
        <Rule className="my-5" />
        {stacked ? (
          <StackedList items={items} />
        ) : (
          <div className="cv-meta">
            <MetaList items={items} />
          </div>
        )}
      </>
    ) : null}
  </div>
);
