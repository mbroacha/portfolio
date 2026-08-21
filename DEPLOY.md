# Deploy

## Now: staging on the project URL

The site builds to **https://mbroacha.github.io/portfolio/** via
`.github/workflows/deploy.yml` on push to `main`.

`morganbroacha.com` still points at the old site and is untouched by this repo.
Nothing here can affect it until the CNAME step below.

## Later: moving the domain

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

## Why the router basename matters

`src/main.tsx` derives the router basename from Vite's `BASE_URL`. It previously
had a fallback that took the first path segment when the base was `/`, which
would have set the basename to `/case-study` on a deep link at the domain root
and broken every case study URL. That fallback is gone. The current version works
for both `/portfolio/` and `/`, so nothing needs changing at flip time.

## Still outstanding before sending the link anywhere

- **Prerendering.** The build ends with `cp dist/index.html dist/404.html`, the
  SPA fallback for GitHub Pages. It works for humans and fails for machines: link
  previews are blank and crawlers see nothing. Fix with `vite-react-ssg` or a
  prerender plugin. This is a build change, not a hosting change.
- **13 placeholder artifact frames** on Sysgit and Beacon. An empty labeled frame
  advertises what is missing. Fill with screenshots or remove the frames.
