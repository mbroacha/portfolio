import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/** Serif-italic section label. The only display type in the system. */
export const SectionHeading = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2
    className={cn("mb-6 font-display text-[length:var(--font-size-2xl)] font-normal not-italic text-bone", className)}
    style={{ fontStyle: "italic" }}
  >
    {children}
  </h2>
);

export const Rule = ({ className }: { className?: string }) => (
  <div className={cn("border-t border-hedge", className)} />
);

/** Sidebar label/value grid, matching the template's 80px column. */
export const MetaList = ({ items }: { items: { label: string; value: ReactNode }[] }) => (
  <dl className="grid grid-cols-[80px_1fr] gap-5">
    {items.map((item) => (
      <div key={item.label} className="contents">
        <dt className="text-bone">{item.label}</dt>
        <dd className="m-0">{item.value}</dd>
      </div>
    ))}
  </dl>
);

type Ratio = "16/9" | "1/1" | "3/4" | "16/10";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
};

/**
 * Media slot. Renders a real image when `src` is given, otherwise the
 * template's diagonal placeholder frame.
 *
 * Caption color is --text-on-media, not --edge: --edge (#6b6b6b) is 2.13:1
 * against the slot fill and fails AA. See tokens.css.
 */
export const MediaSlot = ({
  ratio = "16/9",
  caption,
  src,
  alt,
  width,
}: {
  ratio?: Ratio;
  caption?: string;
  src?: string;
  alt?: string;
  width?: string;
}) => (
  <div className="mb-6 bg-[color:var(--surface-media)] p-4">
    <div
      className={cn("relative mx-auto overflow-hidden border border-[color:var(--edge)]", ratioClass[ratio])}
      style={{ width, backgroundColor: "var(--ink-600)" }}
    >
      {src ? (
        <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
      ) : (
        <>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="2" y1="2" x2="98" y2="98" stroke="var(--edge)" strokeWidth="0.3" />
          </svg>
          {caption ? (
            <div className="cv-meta absolute bottom-2 left-3" style={{ color: "var(--text-on-media)" }}>
              {caption}
            </div>
          ) : null}
        </>
      )}
    </div>
  </div>
);

/** Numbered work entry: index left, detail right. */
export const WorkEntry = ({
  index,
  title,
  meta,
  description,
  to,
}: {
  index: number;
  title: string;
  meta: ReactNode;
  description: string;
  to?: string;
}) => (
  <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2">
    <div className="cv-meta text-bone">
      {index}.{" "}
      {to ? (
        <Link to={to} className="underline underline-offset-4">
          {title}
        </Link>
      ) : (
        title
      )}
    </div>
    <div className="flex flex-col gap-3">
      <div className="cv-meta">{meta}</div>
      <div className="max-w-[var(--measure-prose)]">{description}</div>
    </div>
  </div>
);
