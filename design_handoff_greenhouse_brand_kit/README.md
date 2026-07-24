# Handoff: Greenhouse Brand Kit — morganbroacha.com

## Overview
"Greenhouse" is the brand system for Morgan Broacha's product design portfolio — a B2B SaaS product designer working in highly technical fields (aerospace, healthcare, field research). Dark-first, solarpunk-leaning: deep verdant darks, an editorial serif voice, instrument-panel mono details, one bioluminescent chartreuse accent. It covers logo treatment, color tokens, typography, and core UI patterns (buttons, tags, stats, cards).

## About the files in this bundle
Two kinds of files are included, and they should be treated differently:

1. **Real, usable code** — `tokens/*.css`, `styles.css`, `components/**/*.jsx` + `.d.ts`, `ui_kits/portfolio/*.jsx`. These are production React components with plain CSS custom properties, not throwaway mockups. Drop them into the target codebase, adjust import paths/build tooling to match its conventions (Next.js, Vite, CRA, etc.), and use them directly or as the basis for the codebase's own component primitives.
2. **Design references** — `Greenhouse Brand Kit.dc.html` and `Brand Directions.dc.html`. These are HTML specimens from the design exploration, useful for visual context, but they load a runtime (`support.js`) from the original design tool and won't run standalone — read them for markup/values, don't try to serve them.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and component treatments are final and encoded directly in the CSS/JSX — implement pixel-perfectly from the code, not by eyeballing screenshots. Copy in `[ brackets ]` and striped media blocks in the UI kit are placeholders for Morgan's real case-study content and photography — flagged for easy swap-in, not final content.

## How to use this package
1. Read `readme.md`-equivalent context below and `guidelines/` for the design rationale.
2. Wire `tokens/*.css` (or `styles.css`, which imports them) into the target app's global stylesheet.
3. Port `components/brand/` (Jackalope, Lockup) and `components/core/` (Button, Tag, Eyebrow, Stat, CaseCard, PlaceholderMedia) into the codebase's component library. Each component ships a `.jsx`, a `.d.ts`, and a `.prompt.md` describing intent/props/usage — read the `.prompt.md` before modifying a component.
4. Use `ui_kits/portfolio/Landing.jsx` and `CaseStudy.jsx` as full-page assembly references for the two live site surfaces; `index.html` there is a click-through demo, not something to ship.
5. Swap placeholder copy/media for Morgan's real Beacon-1 case study content when available.

## Design Tokens

### Colors (CSS custom properties — see `tokens/colors.css`)
```css
:root {
  --moss:   #14291C; /* page background, ~70% */
  --fern:   #1B3A26; /* cards, raised surfaces, alternate sections, ~20% */
  --hedge:  #24402E; /* borders, dividers */
  --bone:   #F0EDDF; /* headlines, primary text, ~6% */
  --sage:   #B9C7AE; /* body text */
  --lichen: #7A9678; /* captions, muted labels */
  --glow:   #C8E64A; /* actions, links, logo — one accent per view, ~2.5% */
  --glow-hover: #D6F163;
  --ember:  #E8A13C; /* data, eyebrows, alerts — never buttons, ~1.5% */
}
```
If a screen feels loud, remove chartreuse first. Gradients (heroes/section breaks only): `linear-gradient(160deg, #14291C 55%, #1B3A26 100%)`.

### Typography (see `tokens/fonts.css`, `tokens/typography.css`)
Google Fonts: `Newsreader` (ital + opsz, 400/500), `Archivo` (400/500/600), `IBM Plex Mono` (400/500/600).

- **Display — Newsreader 500**, optical sizing on, tight leading. Italic reserved for (a) the wordmark and (b) the signature "accent turn": one italic chartreuse phrase inside a headline, max once per page.
- **Body — Archivo 400** (500–600 for UI emphasis), color Sage, never below 13px.
- **Detail — IBM Plex Mono**, ALWAYS uppercase, letter-spacing 0.12–0.18em. Used for eyebrows, buttons, stats captions, coordinates, tags.

| Role | Spec |
|---|---|
| Hero | Newsreader 500, 76px / 1.08, -0.015em |
| Section header | Newsreader 500, 44px / 1.1 |
| Card title | Newsreader 500, 22–24px / 1.2 |
| Body | Archivo 400, 15–16px / 1.65 |
| Label/eyebrow | Plex Mono 500–600, 11–12px / 1, +0.12–0.18em, uppercase |
| Big stat | Newsreader 500, 52–56px / 1, color Glow |

### Spacing & shape (see `tokens/spacing.css`)
- Page gutter: 64px (desktop 1440 reference). Section padding: 72–96px vertical.
- Border radius: 4px (buttons/badges), 6px (cards), 8px (large media).
- Borders: 1px solid var(--hedge). **No drop shadows** — elevation comes from surface color + border.

## Logo
Asset: `assets/jackalope.png` (255×255 transparent PNG, personal mark supplied by Morgan). Always a one-color stamp via CSS mask — see `components/brand/Jackalope.jsx`:
```css
.jackalope {
  background: var(--glow);
  -webkit-mask: url('/assets/jackalope.png') center / contain no-repeat;
  mask: url('/assets/jackalope.png') center / contain no-repeat;
}
```
- Approved: Glow on Moss (primary), Bone on Moss (quiet), Moss on Glow (inverse), Moss on Bone (light/print).
- Clear space: ½ the mark's width on all sides. Min size 24px digital.
- Never: rotate, outline, gradient-fill, recolor outside palette, more than one per view, over busy photos without a scrim.
- `components/brand/Lockup.jsx` provides horizontal (nav/footer) and stacked (covers/avatars) lockup variants.

## Components (all in `components/core/` and `components/brand/`)
- **Button** — primary (Glow bg, Moss text, hover `#D6F163`; one per view), secondary (outlined Glow), text link (Glow, trailing `→`, hover Bone).
- **Tag** — status/taxonomy badges, Plex Mono 600 10px, transparent bg, 1px border at 40% of text color.
- **Eyebrow** — Ember mono label, used above card/section titles.
- **Stat** — Newsreader 500 52–56px in Glow + Archivo caption in Sage; Ember variant for in-dashboard data.
- **CaseCard** — Fern surface, Hedge border, 6px radius; eyebrow → title → description; hover border → Lichen, title underlines Glow.
- **PlaceholderMedia** — striped `repeating-linear-gradient` slot with centered mono label chip, for use until real shots exist.

Each has a matching `.d.ts` (prop types) and `.prompt.md` (intent, usage rules, do/don't) alongside the `.jsx`.

## Screens / Views
1. **Landing page** — `ui_kits/portfolio/Landing.jsx`: nav, serif hero with accent turn, mono field-credential proof strip (4-col bordered grid), 3 case cards, about/footer with 120px jackalope + contact CTA.
2. **Case study (Beacon)** — `ui_kits/portfolio/CaseStudy.jsx`: centered serif title, role/impact stat split (Glow), full-width hero media, numbered sections 01–05 (Problem w/ pull-quote sidebar, Concepts, Pivot insight/opportunity pair, Product Strategy alternating media/text, Lessons), footer with Glow project badge + team credits. Section backgrounds alternate Moss/Fern.
3. **Brand kit reference** — `Greenhouse Brand Kit.dc.html` (design reference only, see above).

## Interactions & Behavior
- Hover states per component above; transitions ~150ms ease-out on color/border only.
- Pull-quote sidebar: 2px left border in Glow, italic Newsreader 17px in Glow.
- No parallax/scroll-jacking — the system's motion voice is restrained.
- `ui_kits/portfolio/index.html` demonstrates the click-through: case card → case study, "← All work" → back. Static portfolio otherwise; no other app state.

## Assets
- `assets/jackalope.png` — personal jackalope mark (recolor via CSS mask only, never a raster recolor).
- Fonts from Google Fonts (Newsreader, Archivo, IBM Plex Mono) — see `tokens/fonts.css` for `@import`/link setup.
- All product screenshots in the UI kit are placeholders (striped `PlaceholderMedia`) pending Morgan's real case-study photography.

## Content voice (for any copy written against this system)
First person, confident, dry wit. Short declaratives. Field-credential flavor (coordinates, mile markers, mission language) as garnish in mono labels, one or two per view. Sentence case for serif/body; ALL-CAPS only in mono labels/buttons. No emoji, no exclamation marks — numbers and outcomes carry the bragging.

## Screenshots
`screenshots/` — rendered captures for visual reference:
- `brand-kit-overview.png` — full brand kit page (logo, color, type, in-use)
- `landing-3a.png` — landing page option
- `case-study-5a.png` — Beacon case study page
- `palette-2c.png` — Greenhouse color palette swatch

## Files in this bundle
- `tokens/` — colors.css, fonts.css, spacing.css, typography.css
- `styles.css` — imports the tokens
- `components/brand/` — Jackalope, Lockup (+ `.d.ts`, `.prompt.md`, `brand.card.html` specimen)
- `components/core/` — Button, Tag, Eyebrow, Stat, CaseCard, PlaceholderMedia (+ `.d.ts`, `.prompt.md`, `core.card.html` specimen)
- `guidelines/` — 15 foundation specimen HTML pages (color, type, spacing, brand voice, logo treatments) — design rationale reference, not code to ship
- `ui_kits/portfolio/` — Landing.jsx, CaseStudy.jsx, index.html (click-through demo), README.md
- `assets/jackalope.png` — the mark
- `SKILL.md` — agent-skill entry point if this package is opened by another Claude/agent session
- `Greenhouse Brand Kit.dc.html`, `Brand Directions.dc.html` — original design exploration references (see "About the files" above)
