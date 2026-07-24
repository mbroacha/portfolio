import React, { useState } from 'react';

/** Mono uppercase button. One primary per view. */
export function Button({ variant = 'primary', children, href, onClick, style }) {
  const [hover, setHover] = useState(false);
  const base = {
    font: '600 12px/1 var(--font-mono)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    border: '1px solid transparent',
    transition: 'all 150ms ease-out',
  };
  const variants = {
    primary: {
      background: hover ? 'var(--glow-hover)' : 'var(--glow)',
      color: 'var(--moss)',
      padding: '14px 22px',
    },
    secondary: {
      background: hover ? 'rgba(200,230,74,0.1)' : 'transparent',
      color: 'var(--glow)',
      border: '1px solid rgba(200,230,74,0.4)',
      padding: '13px 22px',
    },
    text: {
      background: 'transparent',
      color: hover ? 'var(--bone)' : 'var(--glow)',
      padding: 0,
    },
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
      {variant === 'text' ? <span aria-hidden="true">→</span> : null}
    </Tag>
  );
}
