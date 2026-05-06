import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { BodyText, SectionTitle } from "../primitives/Typography";

interface DecisionBlockProps {
  title: string;
  rationale: string;
  impact: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Custom interactive or rich media; takes precedence over `imageSrc`. */
  visual?: ReactNode;
  className?: string;
}

export const DecisionBlock = ({ title, rationale, impact, imageSrc, imageAlt, visual, className }: DecisionBlockProps) => (
  <article className={cn("space-y-8 rounded-[16px] p-8", className)}>
    <SectionTitle className="text-xl">{title}</SectionTitle>
    {visual ? (
      visual
    ) : imageSrc ? (
      <div className="overflow-hidden rounded-[12px] bg-bg ring-1 ring-line/60">
        <img src={imageSrc} alt={imageAlt ?? ""} className="h-auto w-full" loading="lazy" />
      </div>
    ) : null}
    <BodyText>{rationale}</BodyText>
    <BodyText className="border-t border-line pt-6 text-subtext">
      <span className="font-medium text-ink">Impact:</span> {impact}
    </BodyText>
  </article>
);
