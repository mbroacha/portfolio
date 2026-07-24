/**
 * Mono uppercase eyebrow label above headlines ("CASE 01 · AEROSPACE").
 */
export interface EyebrowProps {
  /** @default 'var(--ember)' — use var(--lichen) for muted section labels */
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
