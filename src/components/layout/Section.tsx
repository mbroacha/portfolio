import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg";
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-6",
  md: "py-8 md:py-10",
  lg: "py-10 md:py-14",
};

export const Section = ({ className, spacing = "md", ...props }: SectionProps) => (
  <section className={cn(spacingClasses[spacing], className)} {...props} />
);
