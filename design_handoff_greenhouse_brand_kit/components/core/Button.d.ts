/**
 * Mono uppercase action. One primary per view; ember is never a button color.
 * @startingPoint section="Core" subtitle="Primary / secondary / text actions" viewport="700x160"
 */
export interface ButtonProps {
  /** 'primary' glow fill · 'secondary' glow outline · 'text' link with trailing arrow. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'text';
  children?: React.ReactNode;
  /** Renders an <a> instead of <button>. */
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
