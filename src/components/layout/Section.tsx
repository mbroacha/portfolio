import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg";
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-14 md:py-20",
};

export const Section = ({ className, spacing = "md", ...props }: SectionProps) => (
  <section className={cn(spacingClasses[spacing], className)} {...props} />
);
