# Deploy

## Now: live on the custom domain

The site builds to **https://morganbroacha.com/** via
`.github/workflows/deploy.yml` on push to `main`. `public/CNAME` holds the
domain and `vite.config.ts` uses `base: "/"`.

## Moving the domain (done)

Kept for reference.

Do these in order. Out of order means the site is briefly unreachable at both
URLs.

**1. DNS first.** Let it propagate before anything changes in the repo.

Apex `morganbroacha.com`, four A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Plus a CNAME record for `www` pointing at `mbroacha.github.io`.

**2. Then the repo.**

- Move `_deploy-CNAME-when-ready` to `public/CNAME`. It already contains
  `morganbroacha.com`.
- In `vite.config.ts`, set `base: "/"` and drop the mode conditional.
- Push.

**3. Then GitHub.** Settings, Pages, set the custom domain to
`morganbroacha.com`. Enable Enforce HTTPS once the certificate provisions, which
usually takes a few minutes to an hour.

**4. Verify the domain.** Account settings (not the repo), Pages, Add a domain.
GitHub gives you a TXT record to add at the registrar. This stops anyone else
from claiming `morganbroacha.com` on GitHub if this repo's Pages site is ever
turned off.

**5. Check a link preview.** Paste `https://morganbroacha.com/case-study/sysgit`
into LinkedIn's Post Inspector. Preview images use absolute
`morganbroacha.com` URLs, so they only appear once the domain has moved.

## Why the router basename matters

`src/main.tsx` derives the router basename from Vite's `BASE_URL`. It previously
had a fallback that took the first path segment when the base was `/`, which
would have set the basename to `/case-study` on a deep link at the domain root
and broken every case study URL. That fallback is gone. The current version works
for both `/portfolio/` and `/`, so nothing needs changing at flip time.

## Link previews

The site renders in the browser, so on its own every URL other than the root
would reach GitHub Pages' 404 fallback, and unfurlers show nothing for a 404.
`scripts/route-pages.mjs` runs after `vite build` and writes one HTML file per
route (`dist/about.html`, `dist/case-study/sysgit.html`, ...) with that page's
title, description and preview image. Everything else still falls through to
`404.html`.

- **Adding a page:** add its route to `ROUTES` in `scripts/route-pages.mjs`
  alongside `src/App.tsx`, or its links will unfurl as a 404.
- **Changing preview copy or images:** same file. Images live in `public/og/`,
  1200×630 JPG (LinkedIn does not reliably read WebP).
- **Changing the domain:** update `SITE` in that script and the `og:` tags in
  `index.html`.

Crawlers still see an empty page body, so search ranking is weaker than a
fully prerendered site. For a portfolio that is shared by link, that is fine.

## Still outstanding

- **One placeholder frame** on What I Do: "Theme picker · interactive
  recreation" (`src/pages/WhatIDo.tsx`). Fill it or remove it.

## Leaving it alone

Once deployed, GitHub Pages serves the last build indefinitely. Nothing has to
run for the site to stay up. What can take it down:

- **The domain lapsing.** Keep auto-renew on at the registrar with a card that
  will not expire, or prepay several years. This is the most likely failure.
- **The repo going private.** On a free plan, Pages stops serving private repos.
- **DNS changes** at the registrar. Leave the four A records and the `www`
  CNAME alone.

Dependabot was removed on purpose so the repo stops asking for attention. The
site ships static files with no server, so stale dependencies do not affect
the live site.

### Coming back after a long time

The live site will be fine. The deploy pipeline may not. Before the first
push:

- Bump the action versions in `.github/workflows/deploy.yml` if GitHub has
  retired them (failed runs will say so).
- Bump `node-version` there if Node 24 is past end of life (April 2028).
- Run `npm run build` locally first. `npm ci` installs from the lockfile, so
  it should reproduce the same build.
