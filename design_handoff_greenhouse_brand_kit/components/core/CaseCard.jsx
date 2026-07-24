import React, { useState } from 'react';
import { Eyebrow } from './Eyebrow.jsx';
import { PlaceholderMedia } from './PlaceholderMedia.jsx';

/** Case-study card: fern surface, hedge border, eyebrow → serif title → body. */
export function CaseCard({ eyebrow, title, description, mediaLabel, mediaSrc, mediaHeight = 260, href, onClick, style }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--fern)',
        border: `1px solid ${hover ? 'var(--lichen)' : 'var(--hedge)'}`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 150ms ease-out',
        cursor: href || onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {mediaSrc ? (
        <img src={mediaSrc} alt="" style={{ height: mediaHeight, width: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <PlaceholderMedia height={mediaHeight} label={mediaLabel || '[ product shot ]'} radius={0} border="none" />
      )}
      <div style={{ padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {eyebrow ? <Eyebrow style={{ fontSize: 10, letterSpacing: '0.14em' }}>{eyebrow}</Eyebrow> : null}
        <div
          style={{
            font: '500 24px/1.2 var(--font-display)',
            color: 'var(--bone)',
            textDecoration: hover ? 'underline' : 'none',
            textDecorationColor: 'var(--glow)',
            textUnderlineOffset: 4,
          }}
        >
          {title}
        </div>
        {description ? (
          <div style={{ font: '400 13.5px/1.55 var(--font-body)', color: 'var(--sage)' }}>{description}</div>
        ) : null}
      </div>
    </a>
  );
}
