/**
 * Mono status tag / chip. Glow = live/positive, ember = data callout, neutral = taxonomy.
 */
export interface TagProps {
  /** @default 'neutral' */
  tone?: 'glow' | 'ember' | 'neutral';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
