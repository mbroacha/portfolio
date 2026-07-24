/**
 * Striped image placeholder with a mono label chip. Stands in for product
 * shots and field photos until real assets are supplied.
 */
export interface PlaceholderMediaProps {
  /** @default 300 */
  height?: number | string;
  /** Bracketed description of what belongs here. @default '[ product shot ]' */
  label?: string;
  /** @default 'var(--radius-md)' */
  radius?: number | string;
  /** @default '1px solid var(--hedge)' */
  border?: string;
  /** Darker stripe pair for use on fern sections. @default false */
  dark?: boolean;
  style?: React.CSSProperties;
}
