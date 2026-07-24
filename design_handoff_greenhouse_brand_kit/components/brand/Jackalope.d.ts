/**
 * One-color jackalope logo stamp. Recolors the PNG mark via CSS mask —
 * the only sanctioned way to color the logo.
 * @startingPoint section="Brand" subtitle="The jackalope mark, mask-recolored" viewport="700x180"
 */
export interface JackalopeProps {
  /** Square size in px. Minimum 24. @default 44 */
  size?: number;
  /** Any palette color. @default 'var(--glow)' */
  color?: string;
  /** Path to the mark PNG, relative to the consuming page. @default 'assets/jackalope.png' */
  src?: string;
  style?: React.CSSProperties;
}
