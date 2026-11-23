#!/usr/bin/env node
/**
 * Give every route its own HTML file, so link previews work on deep links.
 *
 * The site renders in the browser. GitHub Pages answers an unknown path with
 * 404.html, which a person never notices and a link unfurler (LinkedIn, Slack,
 * iMessage) reads as a dead page: HTTP 404, no preview. Writing
 * dist/case-study/sysgit.html makes that path a real 200 with its own title,
 * description and image. Pages serves it at the extensionless URL with no
 * redirect, where a folder index.html would 301 to a trailing slash. The app
 * inside is identical.
 *
 * Runs after `vite build`. Also writes 404.html, the fallback for everything
 * not listed here.
 *
 * The preview URLs are absolute and point at morganbroacha.com, because
 * unfurlers will not resolve relative ones. Until the domain moves (DEPLOY.md),
 * previews on the staging URL show the text but no image.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://morganbroacha.com";
const NAME = "Morgan Broacha";

/** Keep in step with the routes in src/App.tsx. */
const ROUTES = [
  {
    path: "case-study/sysgit",
    title: "Sysgit",
    description:
      "Git for hardware. Modeling, requirements and version control in one workflow, for engineers who are not developers.",
    image: "og/sysgit.jpg",
  },
  {
    path: "case-study/beacon",
    title: "Beacon",
    description:
      "Space traffic coordination. When two satellites are about to pass too close, somebody has to move.",
    image: "og/beacon.jpg",
  },
  {
    path: "case-study/originality",
    title: "Originality",
    description:
      "Contract cheating detection. Machine learning flagged suspicious student work, and suggested best practices for educators.",
    image: "og/originality.jpg",
  },
  {
    path: "case-study/gradescope-mobile",
    title: "Gradescope Mobile",
    description:
      "Scan and submit handwritten homework from your phone. One app instead of three.",
    image: "og/gradescope-mobile.jpg",
  },
  {
    path: "how-i-work",
    // The page's old address. Same preview, so a link shared before the rename
    // still unfurls; og:url names the new path, and the app redirects there.
    aliases: ["what-i-do"],
    title: "How I Work",
    description:
      "What being an AI native designer actually means: working with interfaces and design materials that are changing fast, while still solving the user's problem.",
  },
  {
    path: "about",
    title: "About",
    description: "Product designer in Oakland, California, for software where decisions carry weight: space traffic, health records, academic integrity, systems engineering.",
  },
];

const html = readFileSync(resolve(DIST, "index.html"), "utf8");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replace one tag's content, and fail the build if index.html lost the tag. */
function set(doc, pattern, value) {
  if (!pattern.test(doc)) throw new Error(`route-pages: index.html is missing ${pattern}`);
  return doc.replace(pattern, (_, open, close) => `${open}${escape(value)}${close}`);
}

for (const r of ROUTES) {
  const title = `${r.title} · ${NAME}`;
  let page = html;
  page = set(page, /(<title>)[^<]*(<\/title>)/, title);
  page = set(page, /(<meta property="og:title" content=")[^"]*(")/, title);
  page = set(page, /(<meta name="description" content=")[^"]*(")/, r.description);
  page = set(page, /(<meta property="og:description" content=")[^"]*(")/, r.description);
  page = set(page, /(<meta property="og:url" content=")[^"]*(")/, `${SITE}/${r.path}`);
  if (r.image) {
    page = set(page, /(<meta property="og:image" content=")[^"]*(")/, `${SITE}/${r.image}`);
    page = set(page, /(<meta name="twitter:card" content=")[^"]*(")/, "summary_large_image");
  }
  for (const p of [r.path, ...(r.aliases ?? [])]) {
    const out = resolve(DIST, `${p}.html`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, page);
  }
}

writeFileSync(resolve(DIST, "404.html"), html);
console.log(`route-pages: wrote ${ROUTES.length} route pages and 404.html`);
