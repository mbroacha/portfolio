import React from 'react';

/** Striped image placeholder with mono label chip — until real shots exist. */
export function PlaceholderMedia({ height = 300, label = '[ product shot ]', radius = 'var(--radius-md)', border = '1px solid var(--hedge)', dark = false, style }) {
  const stripes = dark
    ? 'repeating-linear-gradient(-45deg,#14291C 0 14px,#182F20 14px 28px)'
    : 'repeating-linear-gradient(-45deg,#1B3A26 0 14px,#1F4029 14px 28px)';
  return (
    <div
      style={{
        height,
        background: stripes,
        border,
        borderRadius: radius,
        display: 'grid',
        placeItems: 'center',
        ...style,
      }}
    >
      <div
        style={{
          font: '500 11px/1 var(--font-mono)',
          letterSpacing: '0.1em',
          color: 'var(--lichen)',
          background: 'var(--moss)',
          padding: '8px 12px',
          borderRadius: 3,
        }}
      >
        {label}
      </div>
    </div>
  );
}
