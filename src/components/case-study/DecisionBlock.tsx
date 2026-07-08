import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { BodyText } from "../primitives/Typography";

interface DecisionBlockProps {
  title: string;
  rationale: string;
  impact: string;
  imageSrc?: string;
  imageAlt?: string;
  visual?: ReactNode;
  className?: string;
}

export const DecisionBlock = ({
  title,
  rationale,
  impact,
  imageSrc,
  imageAlt,
  visual,
  className,
}: DecisionBlockProps) => (
  <article className={cn("gh-card flex flex-col gap-6 p-8", className)}>
    <span className="type-mono type-mono--glow">{title}</span>
    {visual ? (
      visual
    ) : imageSrc ? (
      <div className="overflow-hidden rounded-lg border border-hedge">
        <img src={imageSrc} alt={imageAlt ?? ""} className="h-auto w-full" loading="lazy" />
      </div>
    ) : null}
    <BodyText className="whitespace-pre-line">{rationale}</BodyText>
    <BodyText className="border-t border-hedge pt-6">
      <span className="font-medium text-bone">Impact:</span> {impact}
    </BodyText>
  </article>
);
