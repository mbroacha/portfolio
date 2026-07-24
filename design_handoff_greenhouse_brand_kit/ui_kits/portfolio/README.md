# Portfolio UI kit — morganbroacha.com

Click-through recreation of the two core surfaces of Morgan Broacha's portfolio site, in the Greenhouse system.

- **Landing.jsx** — nav, hero with the signature italic-glow accent turn, field-credential proof strip, 3-up case card grid, footer with contact CTA.
- **CaseStudy.jsx** — recreation of the existing `/beacon-1` structure: title, role/impact stat split, hero media, numbered 01–05 sections (Problem → Concepts → Pivot → Product Strategy → Lessons Learned), team-credit footer.

`index.html` mounts both and lets you click a case card to open the study, and "← All work" to return — a real click-through, not a static screenshot.

All copy in `[ brackets ]` and striped media slots are placeholders for Morgan's real case-study content and product/field photography.

Composed entirely from `components/brand` and `components/core` — no one-off styling beyond page layout.
