import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/**
 * A section link in the rail: thumbnail, name, one line on what it is.
 *
 * The rail on the homepage is navigation, not metadata, so these are targets
 * rather than text. A card the size of a fingertip also survives the mobile
 * layout, where the rail stacks above everything.
 */
export const NavCard = ({
  to,
  label,
  note,
  thumb,
  active,
}: {
  to: string;
  label: string;
  note: string;
  /** Square mark. An image, an inline SVG, whatever the section owns. */
  thumb?: React.ReactNode;
  active?: boolean;
}) => (
  <Link
    to={to}
    aria-current={active ? "page" : undefined}
    className={cn(
      "flex items-center gap-3 border p-3 no-underline transition-colors",
      active ? "border-[color:var(--edge)] bg-[color:var(--surface-media)]" : "border-rule hover:border-[color:var(--edge)]",
    )}
  >
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center border border-rule"
      style={{ backgroundColor: "var(--ink-600)" }}
      aria-hidden="true"
    >
      {thumb}
    </span>
    <span className="flex min-w-0 flex-col">
      <span className="uppercase text-primary" style={{ letterSpacing: "var(--tracking-label)" }}>
        {label}
      </span>
      {/* On the active card's lighter surface (#3a3a3a), tertiary text measured
          3.29:1 at 12px and failed AA. Secondary text holds about 6:1 there. */}
      <span className={active ? "text-secondary" : "text-tertiary"}>{note}</span>
    </span>
  </Link>
);
