import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/** "DECISIONS" -> "decisions". Gives every section a stable anchor to link at. */
const sectionId = (children: ReactNode): string | undefined =>
  typeof children === "string"
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;

/** Serif-italic section label. The only display type in the system. */
export const SectionHeading = ({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <h2
    id={id ?? sectionId(children)}
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
  // 80px floor keeps the case study rails aligned; max-content lets the column
  // grow when the same list is set at body size on the homepage.
  <dl className="grid grid-cols-[minmax(80px,max-content)_1fr] gap-5">
    {items.map((item) => (
      <div key={item.label} className="contents">
        <dt className="text-bone">{item.label}</dt>
        <dd className="m-0">{item.value}</dd>
      </div>
    ))}
  </dl>
);

/** A titled panel. The About page is a stack of these. */
export const Panel = ({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={cn("border border-hedge p-5", className)}
    style={{ backgroundColor: "var(--ink-900)" }}
  >
    <h2
      className="m-0 mb-4 cv-meta font-normal uppercase text-bone"
      style={{ letterSpacing: "var(--tracking-label)" }}
    >
      {title}
    </h2>
    {children}
  </section>
);

/** Dated row: the label above, the thing below. */
export const Entry = ({ when, what }: { when: string; what: ReactNode }) => (
  <div className="mb-4 last:mb-0">
    <div className="cv-meta text-lichen">{when}</div>
    <div>{what}</div>
  </div>
);

/** Plain column, for the skills and tools lists. */
export const Bullets = ({ items }: { items: string[] }) => (
  <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

/**
 * Label above value, ruled between rows.
 *
 * The two-column `MetaList` is for short facts in a narrow rail. This one is
 * for entries whose value is a paragraph or two, where an 80px label column
 * would leave the text stranded in a thin stripe down the page.
 */
export const StackedList = ({ items }: { items: { label: string; value: ReactNode }[] }) => (
  <dl className="m-0 flex flex-col">
    {items.map((item, i) => (
      <div key={item.label} className={cn("flex flex-col gap-1.5 py-5", i === 0 ? "pt-0" : "border-t border-hedge")}>
        <dt className="cv-meta text-lichen">{item.label}</dt>
        <dd className="m-0 flex max-w-[var(--measure-prose)] flex-col gap-4 text-bone">{item.value}</dd>
      </div>
    ))}
  </dl>
);

/** auto sizes the slot to the image's own aspect, so nothing letterboxes. */
type Ratio = "16/9" | "1/1" | "3/4" | "16/10" | "auto";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  auto: "",
};

/** A frame that cannot fill the column: fixed width, or letterboxed by contain. */
const inset = (width?: string, fit?: "cover" | "contain") => Boolean(width) || fit === "contain";

/**
 * Media slot. Renders a real image when `src` is given, otherwise the
 * template's diagonal placeholder frame. With an image, the caption sits
 * below the frame so every real image stays captioned.
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
  bordered = true,
  matted = true,
  fit = "cover",
  bleed = false,
  children,
}: {
  ratio?: Ratio;
  caption?: string;
  src?: string;
  alt?: string;
  width?: string;
  /** The frame: border plus slot fill. Off leaves the bare image. */
  bordered?: boolean;
  /** The padded surface around the frame. Off leaves just the frame's border. */
  matted?: boolean;
  /** cover crops to the slot; contain letterboxes. A screenshot whose aspect
      does not match the slot needs contain, or the UI gets cut off. */
  fit?: "cover" | "contain";
  /** Pull the backdrop out through the content column's padding. Only for a
      slot placed directly in the page column, never inside a grid cell. */
  bleed?: boolean;
  /** A live hero component, in place of a still. Takes precedence over src. */
  children?: ReactNode;
}) => (
  // A frame narrower than the column, by explicit width or by letterboxing,
  // leaves dead page around the image. The backdrop takes that space instead,
  // so every image reads as a full-width band whatever its own proportions.
  <div
    className={cn(
      "mb-6",
      inset(width, fit)
        ? cn("bg-[color:var(--surface-media-backdrop)] px-4 py-8 sm:px-8", bleed && "-mx-8")
        : matted && "bg-[color:var(--surface-media)] p-4",
    )}
  >
    <div
      className={cn(
        // cv-frame: a hook for a parent link to restyle the frame on hover.
        "cv-frame relative mx-auto overflow-hidden",
        bordered && "border border-[color:var(--edge)] transition-colors",
        ratioClass[ratio],
        // A percentage width sized for the desktop column leaves a phone screen
        // ~100px wide on a phone. Below sm, double it, capped at full width.
        width && "w-[min(100%,calc(var(--slot-w)*2))] sm:w-[var(--slot-w)]",
      )}
      style={{
        ...(width ? { "--slot-w": width } : {}),
        backgroundColor: bordered ? "var(--ink-600)" : undefined,
      } as React.CSSProperties}
    >
      {children ? (
        <div className="absolute inset-0" role="img" aria-label={alt ?? ""}>
          {children}
        </div>
      ) : src ? (
        <img src={src} alt={alt ?? ""} // The global img rule paints --moss behind every image. A transparent PNG
          // would show that as a lighter rectangle inside the slot, so clear it and
          // let the slot's own surface read through.
          className={cn("h-full w-full bg-transparent", fit === "contain" ? "object-contain" : "object-cover")} />
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
    {(src || children) && caption ? (
      <div className="cv-meta mt-2" style={{ color: "var(--text-on-media)" }}>
        {caption}
      </div>
    ) : null}
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
    <div className="cv-subhead text-bone">
      {index}.{" "}
      {to ? (
        <Link to={to} className="inline-block py-1 underline underline-offset-4">
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
