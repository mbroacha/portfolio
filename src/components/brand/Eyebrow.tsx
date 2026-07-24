import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type EyebrowTone = "ember" | "lichen" | "sage" | "glow" | "caption";

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: EyebrowTone;
}

const toneClass: Record<EyebrowTone, string> = {
  ember: "text-ember",
  lichen: "text-lichen",
  sage: "text-sage",
  glow: "text-glow",
  caption: "text-caption",
};

/** Mono uppercase eyebrow above headlines. Default ember; use lichen/sage for quiet labels. */
export const Eyebrow = ({ tone = "ember", className, ...props }: EyebrowProps) => (
  <p
    className={cn(
      "m-0 font-mono text-label font-medium uppercase leading-none",
      tone === "ember" ? "tracking-mono-wide" : "tracking-[var(--tracking-label)]",
      toneClass[tone],
      className,
    )}
    {...props}
  />
);
