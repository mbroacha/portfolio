import React from 'react';
import { Jackalope } from './Jackalope.jsx';

/** Name + mark lockup. Horizontal for nav/footer, stacked for covers. */
export function Lockup({ variant = 'horizontal', subline = 'PRODUCT DESIGN', markColor = 'var(--glow)', src = 'assets/jackalope.png' }) {
  if (variant === 'stacked') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Jackalope size={40} color={markColor} src={src} />
        <div style={{ font: "italic 500 18px/1 var(--font-display)", color: 'var(--bone)' }}>Morgan Broacha</div>
        {subline ? (
          <div style={{ font: '500 9px/1 var(--font-mono)', letterSpacing: '0.2em', color: 'var(--lichen)' }}>{subline}</div>
        ) : null}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Jackalope size={34} color={markColor} src={src} />
      <div style={{ font: "italic 500 20px/1 var(--font-display)", color: 'var(--bone)' }}>Morgan Broacha</div>
    </div>
  );
}
