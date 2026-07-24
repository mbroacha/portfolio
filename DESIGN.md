---
name: Greenhouse
description: Dark-first solarpunk brand system for Morgan Broacha's product design portfolio — verdant darks, editorial serif, instrument mono, one bioluminescent accent
colors:
  moss: "#14291C"
  fern: "#1B3A26"
  hedge: "#24402E"
  bone: "#F0EDDF"
  sage: "#B9C7AE"
  lichen: "#7A9678"
  glow: "#C8E64A"
  glow-hover: "#D6F163"
  ember: "#E8A13C"
typography:
  display:
    fontFamily: "Newsreader, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Newsreader, ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Newsreader, ui-serif, Georgia, serif"
    fontSize: "clamp(1.375rem, 2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  gutter: "64px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.glow}"
    textColor: "{colors.moss}"
    rounded: "{rounded.sm}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.glow-hover}"
    textColor: "{colors.moss}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.glow}"
    rounded: "{rounded.sm}"
    padding: "13px 22px"
  button-secondary-hover:
    backgroundColor: "rgba(200, 230, 74, 0.1)"
    textColor: "{colors.glow}"
  tag-glow:
    backgroundColor: "transparent"
    textColor: "{colors.glow}"
    rounded: "3px"
    padding: "6px 10px"
  gh-card:
    backgroundColor: "{colors.fern}"
    rounded: "{rounded.md}"
    padding: "26px 26px 28px"
---

# Design System: Greenhouse

Canonical source: `design_handoff_greenhouse_brand_kit/` (tokens, components, guidelines, UI kits).

## 1. Overview

**Creative North Star: "The Greenhouse"**

Greenhouse is the brand system for Morgan Broacha's product design portfolio — a B2B SaaS product designer working in highly technical fields (aerospace, healthcare, field research). Dark-first, solarpunk-leaning: deep verdant darks, an editorial serif voice, instrument-panel mono details, one bioluminescent chartreuse accent.

Newsreader speaks (headlines, wordmark, accent turn). Archivo explains (body, UI copy). IBM Plex Mono measures (eyebrows, buttons, tags, coordinates). The page is drenched in moss; glow is rationed; ember never becomes a button.

**Key Characteristics:**

- Proportion: Moss ~70 · Fern ~20 · Bone ~6 · Glow ~2.5 · Ember ~1.5
- Three-font stack with optical sizing on Newsreader
- Signature italic-chartreuse "accent turn" — max once per page
- Flat elevation — surface color + 1px hedge borders, no drop shadows
- Jackalope as one-color CSS-mask stamp; Lockup for nav/covers
- Restrained motion: ~150ms ease-out on color/border only

**Content voice:** First person, confident, dry wit. Short declaratives. Field-credential garnish in mono labels (coordinates, mile markers) — one or two per view. Sentence case for serif/body; ALL-CAPS only in mono. No emoji, no exclamation marks.

## 2. Colors

If a screen feels loud, remove chartreuse first.

### Primary

- **Glow** (#C8E64A): Actions, links, logo, accent turn, pull-quote borders, primary stats. One accent per view.
- **Glow Hover** (#D6F163): Primary button hover only.

### Secondary

- **Ember** (#E8A13C): Data, eyebrows, alerts. Never buttons or primary CTAs.

### Neutral

- **Moss** (#14291C): Page background (~70%)
- **Fern** (#1B3A26): Cards, raised surfaces, alternate sections (~20%)
- **Hedge** (#24402E): Borders, dividers
- **Bone** (#F0EDDF): Headlines, primary text (~6%)
- **Sage** (#B9C7AE): Body text
- **Lichen** (#7A9678): Captions, muted labels

### Gradients

Heroes and section breaks only: `linear-gradient(160deg, #14291C 55%, #1B3A26 100%)`. Never on cards or buttons.

### Named Rules

**The Drenched Field Rule.** Moss and fern carry ~90% of any viewport. Neutrals are tinted greens, not gray.

**The Two-Accent Rule.** Glow = action/emphasis. Ember = category/data warmth. Never swap roles.

## 3. Typography

**Display:** Newsreader 500, optical sizing on. Italic reserved for (a) the wordmark and (b) the accent turn.
**Body:** Archivo 400 (500–600 for UI emphasis), sage, never below 13px.
**Detail:** IBM Plex Mono — ALWAYS uppercase, letter-spacing 0.12–0.18em.

### Hierarchy (desktop 1440)

| Role | Spec |
| --- | --- |
| Hero | Newsreader 500, 76px / 1.08, −0.015em |
| Section | Newsreader 500, 44px / 1.1 |
| Card title | Newsreader 500, 22–24px / 1.2 |
| Body | Archivo 400, 15–16px / 1.65 |
| Hero/footer lead | Newsreader 400, ~20px / 1.6 |
| Label/eyebrow | Plex Mono 500–600, 11–12px / 1, +0.12–0.18em, uppercase |
| Tag | Plex Mono 600, 10px / 1, +0.12em |
| Big stat | Newsreader 500, 52–56px / 1, Glow |

### Named Rules

**The Mono Boundary Rule.** Mono for system labels only — never body paragraphs.

**The Italic Turn Rule.** One italic glow phrase inside a headline per page maximum.

## 4. Elevation & Spacing

Flat-by-default. No drop shadows on portfolio chrome. Elevation = fern surface + hedge border.

- Page gutter: 64px (desktop). Section padding: 72–96px vertical.
- Radius: 4px buttons/badges · 6px cards · 8px large media.
- Borders: 1px solid hedge.
- Transition: 150ms ease-out on color/border only. No parallax or scroll-jacking.

## 5. Components

Shipped under `src/components/brand/`. Specs and intent also live in `design_handoff_greenhouse_brand_kit/components/**/*.prompt.md`.

### Lockup

Horizontal (nav/footer): 34px mark + italic Newsreader wordmark. Stacked (covers): 40px mark + wordmark + optional mono subline.

### Jackalope

CSS mask stamp. Approved: Glow/Bone on Moss; Moss on Glow/Bone. Clear space ½ mark width. Min 24px. Never rotate, outline, gradient-fill, or place more than one per view over busy photos without a scrim.

### Button

Mono uppercase. Primary (Glow fill, Moss text — one per view). Secondary (outlined Glow). Text (Glow + trailing →, hover Bone).

### Tag

Status/taxonomy. Transparent bg, 1px border at 40% of text color. Tones: glow · ember · neutral.

### Eyebrow

Ember mono label above titles (default). Lichen/sage tones for quiet nav/proof labels.

### Stat

Newsreader glow value + Archivo caption (max 38ch). Ember variant for in-dashboard data only.

### CaseCard (`CaseStudyCard`)

Fern, hedge, 6px radius. Media → ember eyebrow → title → description. Hover: border lichen, title underlines glow.

### PlaceholderMedia (`ImagePlaceholder`)

Striped repeating gradient + centered mono chip until real photography lands.

### Proof strip

4-col bordered grid of mono field credentials between hero and work.

### Pull quote / field note

2px left border in Glow, italic Newsreader in Glow.

## 6. Do's and Don'ts

### Do

- Keep screens moss-drenched; ration glow to ~2.5%.
- Use the accent turn once per page.
- Put all mono in uppercase with ≥0.12em tracking.
- Prefer Lockup in nav; Jackalope alone for footer/identity moments.
- Alternate Moss/Fern section backgrounds on long case studies.
- Swap `[ bracket ]` copy and striped media for real Beacon/case content when ready.

### Don't

- Use ember for buttons or primary CTAs.
- Add drop shadows, glassmorphism, or gradient text.
- Put mono on body paragraphs.
- Rotate/outline/recolor the jackalope outside the palette.
- Use Geist, Inter, or other default UI stacks for portfolio chrome.
- Let mock-product typography (Lexend Deca, Roboto) leak into Greenhouse chrome.
- Deploy more than one primary button per view.
