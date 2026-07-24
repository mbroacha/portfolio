import React from 'react';

/** One-color jackalope stamp, recolored via CSS mask. */
export function Jackalope({ size = 44, color = 'var(--glow)', src = 'assets/jackalope.png', style }) {
  return (
    <div
      aria-label="Morgan Broacha jackalope mark"
      role="img"
      style={{
        width: size,
        height: size,
        flex: 'none',
        background: color,
        WebkitMask: `url('${src}') center / contain no-repeat`,
        mask: `url('${src}') center / contain no-repeat`,
        ...style,
      }}
    />
  );
}
