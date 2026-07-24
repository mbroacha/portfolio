import type { ReactNode } from "react";
import { Stat } from "../brand/Stat";
import { MetadataLabel } from "../primitives/MetadataLabel";
import { BodyLead, Eyebrow } from "../primitives/Typography";

interface ImpactStat {
  value: string;
  caption: string;
}

interface CaseStudyIntroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  role: string;
  impactStats: ImpactStat[];
  timeline: string;
  domain: string;
  tags?: string[];
  hero?: ReactNode;
}

export const CaseStudyIntro = ({
  eyebrow,
  title,
  subtitle,
  role,
  impactStats,
  timeline,
  domain,
  tags = [],
  hero,
}: CaseStudyIntroProps) => (
  <>
    <header className="border-b border-hedge bg-[linear-gradient(180deg,#14291C_60%,#1B3A26_100%)] px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-gutter lg:py-[88px] lg:pb-14">
      <Eyebrow className="mb-5 tracking-[0.18em]">{eyebrow}</Eyebrow>
      <h1 className="type-title--project">{title}</h1>
      <BodyLead className="mx-auto mt-5 max-w-[54ch]">{subtitle}</BodyLead>
    </header>

    <div className="grid gap-10 border-b border-hedge px-6 py-12 sm:px-10 md:grid-cols-2 md:gap-16 lg:px-gutter lg:py-14">
      <div className="space-y-3.5">
        <span className="type-mono">My role</span>
        <p className="type-body">{role}</p>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <MetadataLabel key={tag} label={tag} variant="neutral" />
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-6">
        {impactStats.map((stat, index) => (
          <Stat
            key={stat.caption}
            value={stat.value}
            caption={stat.caption}
            label={index === 0 ? "Impact" : undefined}
          />
        ))}
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

    {hero ? (
      <div className="border-b border-hedge px-6 py-12 sm:px-10 lg:px-gutter lg:py-14">{hero}</div>
    ) : null}
  </>
);
