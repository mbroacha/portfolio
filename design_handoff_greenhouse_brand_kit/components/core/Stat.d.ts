/**
 * Big serif stat (Newsreader in glow) with a quiet Archivo caption.
 */
export interface StatProps {
  /** e.g. "60%" or "$15.3 million" */
  value: string;
  caption?: string;
  /** @default 'var(--glow)' — use var(--ember) for in-dashboard data */
  color?: string;
  /** Value font size in px. @default 56 */
  size?: number;
  style?: React.CSSProperties;
}
