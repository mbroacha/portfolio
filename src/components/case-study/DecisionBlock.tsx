import { cn } from "../../lib/cn";
import { BodyText, SectionTitle } from "../primitives/Typography";

interface DecisionBlockProps {
  title: string;
  rationale: string;
  impact: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export const DecisionBlock = ({ title, rationale, impact, imageSrc, imageAlt, className }: DecisionBlockProps) => (
  <article className={cn("space-y-4 rounded-[16px] p-6", className)}>
    <SectionTitle className="text-xl">{title}</SectionTitle>
    {imageSrc ? (
      <div className="overflow-hidden rounded-[12px] bg-bg ring-1 ring-line/60">
        <img src={imageSrc} alt={imageAlt ?? ""} className="h-auto w-full" loading="lazy" />
      </div>
    ) : null}
    <BodyText>{rationale}</BodyText>
    <p className="border-t border-line pt-4 text-sm text-subtext">
      <span className="font-medium text-ink">Impact:</span> {impact}
    </p>
  </article>
);
