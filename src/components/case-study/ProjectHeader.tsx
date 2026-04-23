import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { MetadataLabel } from "../primitives/MetadataLabel";
import { BodyLead } from "../primitives/Typography";

interface ProjectHeaderProps {
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  domain: string;
  outcome: string;
  tags: string[];
  /** Large media below metadata/tags, after a divider (e.g. case study hero). */
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
  hero,
}: ProjectHeaderProps) => (
  <header
    className={cn(
      "space-y-10",
      hero ? "pb-0 mb-14 md:mb-20" : "border-b border-line pb-10",
    )}
  >
    <div className="space-y-16 md:space-y-20 lg:space-y-28">
      <div className="type-title-project-wrap">
        <h1 className="type-title--project">{title}</h1>
      </div>
      <BodyLead className="max-w-prose text-ink/80">{subtitle}</BodyLead>
    </div>
    <dl className="grid gap-5 md:grid-cols-2">
      <div className="space-y-2">
        <dt className="type-caption">Role</dt>
        <dd className="text-base text-ink">{role}</dd>
      </div>
      <div className="space-y-2">
        <dt className="type-caption">Timeline</dt>
        <dd className="text-base text-ink">{timeline}</dd>
      </div>
      <div className="space-y-2">
        <dt className="type-caption">Domain</dt>
        <dd className="text-base text-ink">{domain}</dd>
      </div>
      <div className="space-y-2">
        <dt className="type-caption">Outcome</dt>
        <dd className="text-base text-ink">{outcome}</dd>
      </div>
    </dl>
    <div className="flex w-full min-w-0 flex-wrap gap-1.5 [container-type:inline-size]">
      {tags.map((tag) => (
        <MetadataLabel key={tag} label={tag} />
      ))}
    </div>
    {hero ? <div className="border-t border-line pt-8 md:pt-10">{hero}</div> : null}
  </header>
);
