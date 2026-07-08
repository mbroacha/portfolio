import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { MetadataLabel } from "../primitives/MetadataLabel";
import { BodyLead, Eyebrow } from "../primitives/Typography";

interface ProjectHeaderProps {
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  domain: string;
  outcome: string;
  tags: string[];
  eyebrow?: string;
  hero?: ReactNode;
}

export const ProjectHeader = ({
  title,
  subtitle,
  role,
  timeline,
  domain,
  outcome,
  tags,
  eyebrow,
  hero,
}: ProjectHeaderProps) => (
  <header className={cn("space-y-10", hero ? "pb-0 mb-14 md:mb-20" : "border-b border-hedge pb-10")}>
    <div className="space-y-6 text-center md:space-y-8">
      {eyebrow ? <Eyebrow className="tracking-mono-wide">{eyebrow}</Eyebrow> : null}
      <div className="type-title-project-wrap">
        <h1 className="type-title--project">{title}</h1>
      </div>
      <BodyLead className="mx-auto max-w-[54ch]">{subtitle}</BodyLead>
    </div>

    <div className="grid gap-10 border-y border-hedge py-10 md:grid-cols-2 md:gap-16">
      <div className="space-y-3">
        <span className="type-mono">My role</span>
        <p className="type-body">{role}</p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="type-mono">Impact</span>
          <p className="type-stat">{outcome}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <span className="type-mono">Timeline</span>
            <p className="type-body text-bone">{timeline}</p>
          </div>
          <div className="space-y-2">
            <span className="type-mono">Domain</span>
            <p className="type-body text-bone">{domain}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex w-full min-w-0 flex-wrap gap-2 [container-type:inline-size]">
      {tags.map((tag) => (
        <MetadataLabel key={tag} label={tag} variant="neutral" />
      ))}
    </div>

    {hero ? <div className="border-t border-hedge pt-8 md:pt-10">{hero}</div> : null}
  </header>
);
