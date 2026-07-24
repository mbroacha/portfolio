import React from 'react';

/** Big serif stat with mono/body caption. */
export function Stat({ value, caption, color = 'var(--glow)', size = 56, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <div style={{ font: `500 ${size}px/1 var(--font-display)`, color }}>{value}</div>
      {caption ? (
        <div style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--sage)', maxWidth: '38ch' }}>{caption}</div>
      ) : null}
    </div>
  );
}
