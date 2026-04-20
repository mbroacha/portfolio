import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { MetadataLabel } from "../primitives/MetadataLabel";
import { SerifLead } from "../primitives/Typography";

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
  <header className={cn("space-y-10", hero ? "pb-0" : "border-b border-line pb-10")}>
    <div className="space-y-16 md:space-y-20 lg:space-y-28">
      <div className="type-project-title-wrap">
        <h1 className="type-project-title">{title}</h1>
      </div>
      <SerifLead className="max-w-prose text-ink/80">{subtitle}</SerifLead>
    </div>
    <dl className="grid gap-5 md:grid-cols-2">
      <div className="space-y-2">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">Role</dt>
        <dd className="text-base text-ink">{role}</dd>
      </div>
      <div className="space-y-2">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">Timeline</dt>
        <dd className="text-base text-ink">{timeline}</dd>
      </div>
      <div className="space-y-2">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">Domain</dt>
        <dd className="text-base text-ink">{domain}</dd>
      </div>
      <div className="space-y-2">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">Outcome</dt>
        <dd className="text-base text-ink">{outcome}</dd>
      </div>
    </dl>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <MetadataLabel key={tag} label={tag} />
      ))}
    </div>
    {hero ? <div className="border-t border-line pt-8 md:pt-10">{hero}</div> : null}
  </header>
);
