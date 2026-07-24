/**
 * Case-study card: media slot, ember eyebrow, serif title, body description.
 * Hover: border shifts to lichen, title underlines in glow.
 * @startingPoint section="Core" subtitle="Case-study card with media slot" viewport="700x460"
 */
export interface CaseCardProps {
  /** e.g. "AEROSPACE · CASE 01" */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Placeholder label shown when no mediaSrc, e.g. "[ launch-ops product shot ]" */
  mediaLabel?: string;
  /** Real image URL; replaces the striped placeholder. */
  mediaSrc?: string;
  /** @default 260 */
  mediaHeight?: number;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
