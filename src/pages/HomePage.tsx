import { Link } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";
import { Section } from "../components/layout/Section";
import { MetadataLabel } from "../components/primitives/MetadataLabel";
import { BodyText, Display, SectionTitle, SerifLead } from "../components/primitives/Typography";
import { commandCenterRiskModeling } from "../case-studies/command-center-risk-modeling";

export const HomePage = () => {
  const featured = commandCenterRiskModeling;

  return (
    <PageContainer
      rail={
        <div className="space-y-5">
          <p className="type-meta">Morgan Broacha</p>
          <p className="type-meta">Product Design · Enterprise Systems</p>
        </div>
      }
    >
      <Section className="border-b border-line pb-14">
        <Display>
          Designing precise systems with structured logic and creative interference.
        </Display>
        <SerifLead className="mt-8 max-w-prose text-ink/80">
          I design complex software where decisions carry operational and financial weight. The work
          balances rigor, traceability, and room for human judgement.
        </SerifLead>
      </Section>

      <Section>
        <SectionTitle>Featured case study</SectionTitle>
        <article className="mt-8 grid gap-6 rounded-md border border-line bg-panel p-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h3 className="text-3xl tracking-[-0.02em]">{featured.title}</h3>
            <BodyText className="mt-4 max-w-prose">{featured.subtitle}</BodyText>
            <Link
              to={`/case-study/${featured.slug}`}
              className="mt-8 inline-flex border-b border-line pb-1 text-sm uppercase tracking-[0.12em] text-subtext transition hover:border-accent hover:text-ink"
            >
              Read case study
            </Link>
          </div>
          <div className="space-y-3">
            {featured.tags.map((tag) => (
              <MetadataLabel key={tag} label={tag} />
            ))}
          </div>
        </article>
      </Section>

      <Section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="type-meta">Focus</p>
          <BodyText>
            Design systems for decision-heavy products, complex permission models, and operational
            command surfaces.
          </BodyText>
        </div>
        <div className="space-y-3">
          <p className="type-meta">Methods</p>
          <BodyText>
            Frame constraints early, design for edge-state clarity, and prototype interaction models
            that support expert intuition.
          </BodyText>
        </div>
      </Section>
    </PageContainer>
  );
};
