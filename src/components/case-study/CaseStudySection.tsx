import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { SectionTitle } from "../primitives/Typography";

interface CaseStudySectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  number: string;
  title: string;
  variant?: "moss" | "fern";
  children: ReactNode;
}

export const CaseStudySection = ({
  id,
  number,
  title,
  variant = "moss",
  className,
  children,
  ...props
}: CaseStudySectionProps) => (
  <section
    id={id}
    className={cn(
      "border-b border-hedge px-6 py-16 sm:px-10 sm:py-20 lg:px-gutter lg:py-20",
      variant === "fern" && "bg-fern",
      className,
    )}
    {...props}
  >
    <div className="mx-auto mb-11 max-w-[68.75rem] text-center">
      <p className="type-mono type-mono--ember mb-3.5 tracking-[0.2em]">{number}</p>
      <SectionTitle>{title}</SectionTitle>
    </div>
    <div className="mx-auto max-w-[68.75rem]">{children}</div>
  </section>
);
