import React from 'react';

/** Mono status tag / taxonomy chip. */
export function Tag({ tone = 'neutral', children, style }) {
  const tones = {
    glow: { color: 'var(--glow)', border: '1px solid rgba(200,230,74,0.4)' },
    ember: { color: 'var(--ember)', border: '1px solid rgba(232,161,60,0.4)' },
    neutral: { color: 'var(--sage)', border: '1px solid var(--hedge)' },
  };
  return (
    <span
      style={{
        font: '600 10px/1 var(--font-mono)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '6px 10px',
        borderRadius: 3,
        display: 'inline-flex',
        alignItems: 'center',
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
