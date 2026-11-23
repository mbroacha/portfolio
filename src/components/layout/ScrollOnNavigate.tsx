import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Matches Interrogate's highlight, so a section reached from another page
    marks itself the same way as one reached on the same page. */
const HIGHLIGHT_MS = 1600;
/** How long to wait for a lazily loaded page to render the target section. */
const WAIT_MS = 3000;
/** How long to hold a section in place while media above it loads. */
const SETTLE_MS = 2500;

/**
 * Where a page starts when a link opens it.
 *
 * Client-side navigation keeps the window's scroll position, so opening a
 * case study from halfway down the homepage landed halfway down the case
 * study. Now:
 *
 *   - A link to a page starts it at the top.
 *   - A link to a section (`/case-study/beacon#decisions`, which is what the
 *     "Ask me anything" answers link to) scrolls to that section once the
 *     page has rendered it, and highlights it the way a same-page answer link
 *     does. Pages load as their own chunks, so the section may not exist yet
 *     when the URL changes; this waits for it.
 *   - Back and forward are left to the browser, which returns the reader to
 *     where they were.
 *   - A shared link opened fresh (`…/beacon#decisions` pasted into a new tab)
 *     also lands on its section. React Router reports that first load as a
 *     back/forward ("POP"), and the browser's own jump to the hash fires
 *     before the page has rendered it, so the first render is handled here.
 */
export const ScrollOnNavigate = () => {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    // React Router gives the location the page loaded on the key "default";
    // every navigation after that gets a fresh one. Unlike a "first render"
    // ref, this survives StrictMode running the effect twice in development.
    const first = key === "default";
    const id = decodeURIComponent(hash.replace(/^#/, ""));

    // Back and forward: the browser restores the position.
    if (navType === "POP" && !first) return;
    // First load without a section: the browser already starts at the top,
    // or restores the position on a reload. Leave it.
    if (first && !id) return;

    if (!first) window.scrollTo(0, 0);
    if (!id) return;

    let frame = 0;
    let settle: ResizeObserver | undefined;
    let stopSettling = () => {};
    const started = performance.now();

    const seek = () => {
      const el = document.getElementById(id);
      if (!el) {
        if (performance.now() - started < WAIT_MS) frame = requestAnimationFrame(seek);
        return;
      }
      // A fresh load jumps; a link inside the site glides, unless the reader
      // has asked for less motion.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: first || reduce ? "auto" : "smooth", block: "start" });
      el.classList.add("cv-hl");
      window.setTimeout(() => el.classList.remove("cv-hl"), HIGHLIGHT_MS);

      // Media above the section can finish loading after the jump and push it
      // down the page. Hold it in place while the page settles, and let go the
      // moment the reader scrolls for themselves.
      let realign = 0;
      settle = new ResizeObserver(() => {
        cancelAnimationFrame(realign);
        realign = requestAnimationFrame(() => el.scrollIntoView({ behavior: "auto", block: "start" }));
      });
      settle.observe(document.body);
      const timer = window.setTimeout(() => stopSettling(), SETTLE_MS);
      const interrupt = ["wheel", "touchstart", "keydown", "pointerdown"];
      stopSettling = () => {
        settle?.disconnect();
        cancelAnimationFrame(realign);
        window.clearTimeout(timer);
        interrupt.forEach((type) => window.removeEventListener(type, stopSettling));
      };
      interrupt.forEach((type) => window.addEventListener(type, stopSettling, { passive: true }));
    };

    frame = requestAnimationFrame(seek);
    return () => {
      cancelAnimationFrame(frame);
      stopSettling();
    };
  }, [pathname, hash, key, navType]);

  return null;
};
