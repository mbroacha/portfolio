import { useEffect, useRef, type ReactNode } from "react";

/**
 * Holds its animated contents still while they are off screen.
 *
 * The hero diagrams are CSS animations, and CSS animations run whether or not
 * anyone can see them. Paused off screen, they cost nothing until scrolled to,
 * and because each plays a set number of times and stops (playTwice on the
 * homepage, playOnce on a case study), those plays happen when the reader
 * actually reaches the hero, not during page load or while it is scrolled past.
 * Starts paused; the observer's first callback releases whatever is already in
 * view. The pause rule is [data-offscreen] in index.css.
 *
 * "In view" means at least half of it, not any of it. isIntersecting is true
 * from the first pixel, and on the homepage the Beacon hero's top edge sits
 * 13-60px above the fold on common screens, so it played through both of its
 * cycles as a sliver before anyone scrolled to it. A frame that fills most of
 * the viewport also counts, so a hero taller than twice the screen still plays.
 */
const VISIBLE = 0.5;

export const PlayWhenVisible = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      el?.removeAttribute("data-offscreen");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const fillsView =
          !!entry.rootBounds && entry.intersectionRect.height >= entry.rootBounds.height * VISIBLE;
        const seen = entry.isIntersecting && (entry.intersectionRatio >= VISIBLE || fillsView);
        el.toggleAttribute("data-offscreen", !seen);
      },
      // Fire on the way past each step, not only at 0 and 1.
      { threshold: [0, 0.25, VISIBLE, 0.75, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-offscreen="">
      {children}
    </div>
  );
};
