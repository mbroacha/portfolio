---
name: Morgan Broacha Portfolio
description: Product design portfolio for hard-tech and field-critical enterprise software
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
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
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
    fontSize: "0.6875rem"
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
  section: "72px"
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
    height: "auto"
  gh-card:
    backgroundColor: "{colors.fern}"
    rounded: "{rounded.md}"
    padding: "28px 26px"
---

# Design System: Morgan Broacha Portfolio

## 1. Overview

**Creative North Star: "The Greenhouse"**

This portfolio is a dark, saturated greenhouse — moss and fern surfaces where hard-tech design work grows under constraint. The page is drenched in deep green; bone and sage carry reading comfort; glow (chartreuse) marks action and emphasis; ember (amber) signals category and metadata heat. Newsreader brings editorial weight to headlines; Archivo keeps body copy neutral and field-tested; IBM Plex Mono handles all uppercase system labels.

The system serves a product designer embedded in hard places — ER trauma centers, Yellowstone backcountry, rocket launchpads. Visual language is confident and field-forward: filled glow buttons, mono eyebrows, proof-strip credentials, and the jackalope mascot as brand sigil. The page shell (`page-shell`) frames content with hedge borders like a specimen cabinet. Case-study product mocks retain their own light UI vocabulary inside fern cards; the portfolio chrome stays dark.

**Key Characteristics:**

- Drenched dark-green surface strategy — moss field, fern cards, hedge borders
- Three-font stack: Newsreader display + Archivo body + IBM Plex Mono labels
- Glow (chartreuse) for primary actions and links; ember for eyebrows and warm metadata
- Filled mono buttons (primary / secondary / text) replace underlined link CTAs
- Flat-by-default elevation — depth via tonal layering and 1px hedge borders
- Jackalope mask-icon as recurring brand mark; hero/footer gradients for atmospheric depth
- Proof strip as credential bar between hero and work grid

## 2. Colors

Deep greenhouse greens carry the surface; glow and ember punctuate action and category.

### Primary

- **Biolume Glow** (#C8E64A): Primary buttons, default links, field-note accents, pull-quote borders, stat values, tag borders (glow variant). Hover shifts to glow-hover (#D6F163).
- **Glow Hover** (#D6F163): Primary button hover state only.

### Secondary

- **Field Ember** (#E8A13C): Case study eyebrows (`.type-mono--ember`), ember stat variant, ember tag borders. Warm counterpoint to chartreuse — used for category labeling, not primary actions.

### Neutral

- **Deep Moss** (#14291C): Page background (`bg-moss`), image backdrops, placeholder label chips, primary button text color.
- **Fern Tray** (#1B3A26): Card and module surfaces (`.gh-card`, `.content-module`). One step lighter than moss for grouped content.
- **Hedge Line** (#24402E): Borders (`border-hedge`). Dividers, card outlines, proof-strip rules, page-shell frame.
- **Bone** (#F0EDDF): Display headings, nav wordmark, hover link color, primary readable headline ink.
- **Sage** (#B9C7AE): Body text (`text-sage`). Long-form copy, card descriptions, metadata values.
- **Lichen** (#7A9678): Caption text (`text-caption`). Mono labels, proof-strip cells, footer metadata, de-emphasized nav links.

### Named Rules

**The Drenched Field Rule.** The surface IS the color. Moss and fern carry 80%+ of any viewport. Neutrals are tinted greens, not gray — sage and lichen inherit the greenhouse hue.

**The Two-Accent Rule.** Glow handles action and emphasis; ember handles category and warmth. Never swap their roles — ember is not a CTA color; glow is not an eyebrow color.

## 3. Typography

**Display Font:** Newsreader (with ui-serif, Georgia fallback) — medium weight, optical sizing enabled
**Body Font:** Archivo (with ui-sans-serif, system-ui fallback)
**Label Font:** IBM Plex Mono (with ui-monospace fallback) — uppercase, tracked

**Character:** Newsreader italic accents (`type-accent-turn`) add editorial personality without magazine cliché. Archivo stays utilitarian for long reads. Mono labels give the system a field-instrument, telemetry-board feel.

### Hierarchy

- **Display / Hero** (500, clamp(2.75rem, 5.5vw, 4.75rem), 1.08, -0.015em): Home hero (`.type-title--hero`). Max ~19ch width. Italic glow spans for emphasis.
- **Section** (500, clamp(2rem, 3.5vw, 2.75rem), 1.1): Section headers (`.type-title--section`) — "Selected work", footer headline.
- **Card Title** (500, clamp(1.25rem, 2vw, 1.5rem), 1.2): Case study card headlines (`.type-title--card`).
- **Project Title** (500, clamp(3rem, 12vw, 5.25rem), 1.0, 0.04em): Case study hero names (`.type-title--project`). Wide-tracked, centered.
- **Body** (400, 0.9375rem→1rem, 1.65): Prose (`.type-body`) in sage. Max ~52–60ch for leads.
- **Body Lead** (400, 1.125–1.1875rem, 1.6): Intro paragraphs (`.type-body--lead`).
- **Mono Label** (500, 0.6875rem, uppercase, 0.14em tracking): Captions, nav links, metadata (`.type-mono`). Ember variant at 0.16em tracking.
- **Stat** (500, clamp(2.75rem, 5vw, 3.5rem), 1.0): Impact numbers (`.type-stat`) in glow or ember.

### Named Rules

**The Mono Boundary Rule.** IBM Plex Mono is for system labels only — eyebrows, buttons, tags, proof strip, nav, metadata keys. Never body paragraphs.

**The Italic Turn Rule.** Display emphasis uses Newsreader italic in glow (`type-accent-turn`). One accent phrase per hero maximum.

## 4. Elevation

Flat-by-default. Depth is conveyed through the drenched tonal stack — moss → fern → hedge borders — and atmospheric gradients on hero and footer sections. No box-shadow on portfolio-shell cards, modules, or navigation.

### Shadow Vocabulary

- **Handle lift** (`box-shadow: 0 4px 16px -4px rgba(0,0,0,0.35)`): Before/after comparison drag handle only.
- **Mock ambient** (Material-style shadows): Embedded product UI mocks inside case studies. Not part of the greenhouse shell.

### Gradient Vocabulary

- **Hero gradient** (`linear-gradient(160deg, #14291c 55%, #1b3a26 100%)`): Home hero background — subtle atmospheric lift without shadow.
- **Footer gradient** (`linear-gradient(200deg, #14291c 60%, #1b3a26 100%)`): About/footer section atmosphere.
- **Placeholder stripe** (`repeating-linear-gradient(-45deg, #1b3a26 0 14px, #1f4029 14px 28px)`): Image placeholder backgrounds.

### Named Rules

**The Flat Greenhouse Rule.** Portfolio chrome uses borders and tonal layers only. No `box-shadow` on gh-cards, content modules, buttons, or nav.

**The Gradient Atmosphere Rule.** Gradients are permitted on full-bleed section backgrounds (hero, footer) for depth — never on individual cards or buttons.

## 5. Components

### Buttons

- **Shape:** 4px radius (`--radius-sm`), mono uppercase, 0.1em letter-spacing
- **Primary:** Glow fill, moss text, 14×22px padding. Hover: glow-hover fill.
- **Secondary:** Transparent fill, glow text, 1px glow/40% border. Hover: glow/10% background tint.
- **Text:** No fill, no border, glow text. Hover: bone text. Optional `→` arrow suffix.
- **Focus:** Inherited link focus; no custom ring defined yet.

### Tags / Status Tags

- **Shape:** 3px radius, transparent background, 6×10px padding
- **Glow variant:** Glow text, glow/40% border
- **Ember variant:** Ember text, ember/40% border
- **Neutral variant:** Sage text, hedge border
- **Typography:** Mono semibold, 0.625rem, 0.12em tracking

### Cards (gh-card)

- **Corner Style:** 6px radius (`rounded-md`)
- **Background:** Fern (#1B3A26)
- **Border:** 1px hedge; hover shifts to lichen on interactive cards
- **Shadow Strategy:** None
- **Interactive:** Title underlines in glow on hover; entire card is a link in case study grid
- **Internal Padding:** 28px vertical, 26px horizontal for text blocks; 260px image area above

### Content Modules

- **Same as gh-card** — `.content-module` shares `.gh-card` styles
- **Padding:** 32px mobile, 40px tablet, 48px desktop

### Case Study Cards

- **Structure:** Image or placeholder → ember eyebrow → card title → sage description
- **Eyebrow:** Mono ember — "Enterprise · Case 01" pattern. One per card, not per section.
- **Grid:** `repeat(auto-fit)` via `md:grid-cols-2 lg:grid-cols-3`

### Proof Strip

- **Layout:** 4-column grid with hedge borders, full-width between hero and work
- **Typography:** Mono caption, 22px vertical padding, 32px horizontal
- **Content:** Field-credential one-liners

### Navigation (Site Nav)

- **Logo:** Jackalope (34px glow) + italic Newsreader wordmark in bone
- **Links:** Mono sage, hover bone. Case study pages show "← All work" in glow.
- **CTA:** Primary contact button (compact: 18×10px padding)

### Jackalope (brand mark)

- **Implementation:** CSS mask over PNG silhouette, filled with glow/bone/moss
- **Sizes:** 28px (rail nav), 34px (site nav), 120px (footer)
- **Never:** Used as decorative filler — always as navigational or identity mark

### Field Notes

- **Style:** 2px glow left border, Newsreader italic, glow text color
- **Use:** Editorial asides within case study prose

### Pull Quotes

- **Style:** 2px glow left border, Newsreader italic 1.0625rem, glow text
- **Attribution:** Mono caption below

### Constraint Callouts

- **Style:** gh-card with glow mono label, bone title, sage detail
- **Padding:** 32px

### Image Placeholders

- **Background:** Diagonal stripe gradient (placeholder token)
- **Label:** Mono caption chip on moss background, centered in 260px area

### Stats

- **Value:** Display-sized glow or ember number
- **Caption:** Body text below, max 38ch

## 6. Do's and Don'ts

### Do:

- **Do** keep the page drenched in moss/fern — the greenhouse surface is the brand.
- **Do** use glow for primary buttons, links, and action emphasis.
- **Do** use ember exclusively for eyebrows and warm category labels.
- **Do** set all mono labels in IBM Plex Mono uppercase with ≥0.1em tracking.
- **Do** frame the site in `page-shell` with hedge side borders.
- **Do** use the jackalope as a navigational sigil, not decoration.
- **Do** apply hero/footer gradients for section atmosphere.
- **Do** use gh-card for all grouped content — case studies, constraints, snapshots.
- **Do** keep body text in sage on dark surfaces; bone for headings only.
- **Do** enable `font-optical-sizing: auto` on Newsreader display type.

### Don't:

- **Don't** revert to light bone-paper backgrounds — the old light system is retired.
- **Don't** use gradient text (`background-clip: text`) for emphasis — use glow color or italic Newsreader.
- **Don't** add glassmorphism, backdrop blur, or decorative glass cards.
- **Don't** deploy box-shadow on portfolio-shell components.
- **Don't** use Geist Sans — Archivo is the body font.
- **Don't** put IBM Plex Mono on body paragraphs or long-form prose.
- **Don't** use ember for button fills or primary CTAs.
- **Don't** nest gh-cards inside gh-cards.
- **Don't** let mock UI typography (Lexend Deca, Material light patterns) leak into portfolio chrome.
- **Don't** add numbered section markers (01 / 02 / 03) as default scaffolding.
- **Don't** use colored border-left stripes greater than 2px on cards or callouts — field notes and pull quotes are the only left-border pattern, and they use glow at 2px.
