---
target: homepage (src/pages/HomePage.tsx)
slug: src-pages-homepage-tsx
date: 2026-11-22
total_score: 27
p0_count: 0
p1_count: 2
method: dual-agent, source-only (no browser)
---

# Critique: homepage

Score 27/40 (Acceptable, close to Good).

## Priority issues
1. [P1] No positioning statement or h1. On mobile the bio appears after all four work entries. The 10-second niche test fails. Fix: add an h1 that names the domains, bring the "why hire" answer into the first viewport, and move the bio above the work on mobile. Commands: clarify, layout.
2. [P1] tokens.css repoints Greenhouse to the grayscale "Dark CV" template (glow=#d9d9d9, no accent, EB Garamond/Plex Sans). DESIGN.md and PRODUCT.md still describe Greenhouse. Decide which is real. Commands: colorize or document.
3. [P2] Accessibility. No h1; work titles and the "Ask me anything" label are divs. No skip link. The input border is 1.43:1 and its outline is removed. The active NavCard note is 3.29:1 at 12px. Infinite loops have no pause (WCAG 2.2.2). Command: harden.
4. [P2] The email call to action has no visual weight. It is a 12px rail link, and on mobile it sits at the bottom of the page. Command: layout.
5. [P3] Three concurrent infinite SVG loops run even off-screen. BeaconHeroB @imports Inter and Montserrat. Command: optimize.

## Detector
11 homepage findings, all in the hero artwork (SysgitHero, BeaconHeroB, OriginalityHero): product colors and fonts drawn on purpose. HomePage/CvPage/CvPrimitives are clean. 127 across src/components, mostly product-UI recreations (TranslationTriptych, RequirementsTableRecreation). Splash components use an off-scale 12px radius.
