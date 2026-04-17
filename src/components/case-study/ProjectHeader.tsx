import { MetadataLabel } from "../primitives/MetadataLabel";
import { Display, SerifLead } from "../primitives/Typography";

interface ProjectHeaderProps {
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  domain: string;
  outcome: string;
  tags: string[];
}

export const ProjectHeader = ({
  title,
  subtitle,
  role,
  timeline,
  domain,
  outcome,
  tags,
}: ProjectHeaderProps) => (
  <header className="space-y-10 border-b border-line pb-10">
    <div className="space-y-4">
      <Display>{title}</Display>
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
  </header>
);
