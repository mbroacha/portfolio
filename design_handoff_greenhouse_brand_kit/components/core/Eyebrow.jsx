import React from 'react';

/** Mono uppercase eyebrow label above headlines. */
export function Eyebrow({ color = 'var(--ember)', children, style }) {
  return (
    <div
      style={{
        font: '500 12px/1 var(--font-mono)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
