import { MetadataLabel } from "../primitives/MetadataLabel";
import { BodyText, Display, SerifLead } from "../primitives/Typography";

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
  <header className="space-y-8 border-b border-line pb-10">
    <div className="space-y-5">
      <Display>{title}</Display>
      <SerifLead className="max-w-prose text-ink/80">{subtitle}</SerifLead>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      <div className="space-y-2">
        <BodyText className="text-sm uppercase tracking-[0.12em] text-subtext">Role</BodyText>
        <BodyText>{role}</BodyText>
      </div>
      <div className="space-y-2">
        <BodyText className="text-sm uppercase tracking-[0.12em] text-subtext">Timeline</BodyText>
        <BodyText>{timeline}</BodyText>
      </div>
      <div className="space-y-2">
        <BodyText className="text-sm uppercase tracking-[0.12em] text-subtext">Domain</BodyText>
        <BodyText>{domain}</BodyText>
      </div>
      <div className="space-y-2">
        <BodyText className="text-sm uppercase tracking-[0.12em] text-subtext">Outcome</BodyText>
        <BodyText>{outcome}</BodyText>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <MetadataLabel key={tag} label={tag} />
      ))}
    </div>
  </header>
);
