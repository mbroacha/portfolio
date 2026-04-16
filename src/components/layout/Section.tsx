import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spaced?: boolean;
}

export const Section = ({ className, spaced = true, ...props }: SectionProps) => (
  <section className={cn(spaced ? "py-10 md:py-14" : "py-4", className)} {...props} />
);
