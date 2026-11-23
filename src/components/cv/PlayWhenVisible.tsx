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
 */
export const PlayWhenVisible = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      el?.removeAttribute("data-offscreen");
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-offscreen="">
      {children}
    </div>
  );
};
