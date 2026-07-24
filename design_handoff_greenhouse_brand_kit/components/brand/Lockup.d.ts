/**
 * Morgan Broacha name + jackalope lockup.
 */
export interface LockupProps {
  /** 'horizontal' for nav & footer; 'stacked' for covers, avatars, slide titles. @default 'horizontal' */
  variant?: 'horizontal' | 'stacked';
  /** Mono subline under the stacked name; pass '' to omit. @default 'PRODUCT DESIGN' */
  subline?: string;
  /** @default 'var(--glow)' */
  markColor?: string;
  /** Path to mark PNG relative to consuming page. @default 'assets/jackalope.png' */
  src?: string;
}
