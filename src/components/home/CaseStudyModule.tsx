import type { ReactNode } from "react";
import { ContentModule } from "../layout/ContentModule";
import { MetadataLabel } from "../primitives/MetadataLabel";
import { BodyText, CardTitle, SectionTitle } from "../primitives/Typography";
import { Button } from "../brand/Button";
import { cn } from "../../lib/cn";

interface CaseStudyModuleProps {
  sectionTitle: string;
  title: string;
  subtitle: string;
  tags: string[];
  to: string;
  linkLabel?: string;
  footer?: ReactNode;
  className?: string;
}

export const CaseStudyModule = ({
  sectionTitle,
  title,
  subtitle,
  tags,
  to,
  linkLabel = "Read case study",
  footer,
  className,
}: CaseStudyModuleProps) => (
  <div className={cn("flex flex-col gap-6", className)}>
    <SectionTitle>{sectionTitle}</SectionTitle>
    <ContentModule className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
      <div>
        <CardTitle>{title}</CardTitle>
        <BodyText className="mt-5 max-w-prose">{subtitle}</BodyText>
        <Button to={to} variant="text" className="mt-10" showArrow>
          {linkLabel}
        </Button>
        {footer}
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2 [container-type:inline-size] md:items-start">
        {tags.map((tag) => (
          <MetadataLabel key={tag} label={tag} />
        ))}
      </div>
    </ContentModule>
  </div>
);
