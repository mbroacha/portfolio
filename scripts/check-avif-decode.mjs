#!/usr/bin/env node
/**
 * Decode every AVIF in public/ in headless Chrome and fail on any that come
 * out empty.
 *
 * The Sysgit splash shipped an AVIF that macOS Preview and sips read
 * perfectly and Chrome decoded to fully transparent pixels, so the page's
 * main product capture was a blank frame for most readers and no build step
 * noticed. A file that "opens fine" locally is not evidence; this check
 * decodes each one in the browser that actually serves most visitors and
 * measures what it drew.
 *
 * Needs Google Chrome installed. Not part of `npm run build` (CI has no
 * Chrome); run it after adding or re-encoding an AVIF:
 *
 *   node scripts/check-avif-decode.mjs
 */

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".avif")) files.push(path);
  }
};
walk(process.argv[2] ? resolve(process.argv[2]) : join(ROOT, "public"));

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}.`);
  process.exit(2);
}

const port = 9600 + Math.floor(Math.random() * 300);
const chrome = spawn(
  CHROME,
  ["--headless=new", `--remote-debugging-port=${port}`, "--no-first-run", `--user-data-dir=${mkdtempSync(join(tmpdir(), "avif-"))}`, "about:blank"],
  { stdio: "ignore" },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let targets;
  for (let i = 0; i < 50 && !targets; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    } catch {
      await sleep(200);
    }
  }
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  });
  const evaluate = (expression) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, (m) => r(m.result?.result?.value));
      ws.send(JSON.stringify({ id: i, method: "Runtime.evaluate", params: { expression, awaitPromise: true, returnByValue: true } }));
    });

  const failures = [];
  for (const file of files) {
    const b64 = readFileSync(file).toString("base64");
    // Draw at a reduced size and average alpha and luminance. Fully
    // transparent or fully black output is the failure this check exists for.
    const result = await evaluate(`(async () => {
      const img = new Image();
      img.src = "data:image/avif;base64,${b64}";
      try { await img.decode(); } catch (e) { return { error: String(e) }; }
      const w = Math.min(400, img.naturalWidth), h = Math.round(w * img.naturalHeight / img.naturalWidth);
      const c = new OffscreenCanvas(w, h), x = c.getContext("2d");
      x.drawImage(img, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h).data;
      let a = 0, l = 0;
      for (let i = 0; i < d.length; i += 4) { a += d[i + 3]; l += d[i] + d[i + 1] + d[i + 2]; }
      const n = d.length / 4;
      return { w: img.naturalWidth, h: img.naturalHeight, alpha: a / n, lum: l / n / 3 };
    })()`);
    const name = relative(ROOT, file);
    if (!result || result.error || result.alpha < 8 || (result.alpha > 200 && result.lum < 1)) {
      failures.push(`${name}  ${JSON.stringify(result)}`);
    } else {
      console.log(`ok  ${name}  ${result.w}x${result.h}  alpha ${result.alpha.toFixed(0)}  lum ${result.lum.toFixed(0)}`);
    }
  }
  ws.close();

  if (failures.length) {
    console.error("\nAVIFs that Chrome decodes to nothing visible:\n");
    for (const f of failures) console.error(`  ${f}`);
    console.error("\nRe-encode them, or serve the PNG/WebP fallback without the AVIF <source>.\n");
    process.exitCode = 1;
  }
} finally {
  chrome.kill();
}
