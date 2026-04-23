import { PageContainer } from "../components/layout/PageContainer";
import { Section } from "../components/layout/Section";
import { ContentModule } from "../components/layout/ContentModule";
import { CaseStudyModule } from "../components/home/CaseStudyModule";
import { BodyText, BodyLead, Caption, Display } from "../components/primitives/Typography";
import { commandCenterRiskModeling } from "../case-studies/command-center-risk-modeling";
import { originalityProject } from "../case-studies/originality-project";

export const HomePage = () => {
  const featured = commandCenterRiskModeling;

  return (
    <PageContainer
      rail={
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-[-0.01em] text-ink">Morgan Broacha</p>
          <Caption>Product Design · Enterprise Systems</Caption>
        </div>
      }
    >
      <Section spacing="lg" className="space-y-10">
        <Display>
          Designing precise systems with structured logic and creative interference.
        </Display>
        <BodyLead className="max-w-prose">
          I design complex software where decisions carry operational and financial weight. The work
          balances rigor, traceability, and room for human judgement.
        </BodyLead>
      </Section>

      <Section spacing="lg">
        <CaseStudyModule
          sectionTitle="Featured case study"
          title={featured.title}
          subtitle={featured.subtitle}
          tags={featured.tags}
          to={`/case-study/${featured.slug}`}
        />
      </Section>

      <Section spacing="lg">
        <CaseStudyModule
          sectionTitle="Additional case study"
          title={originalityProject.title}
          subtitle={originalityProject.subtitle}
          tags={originalityProject.tags}
          to="/case-study/originality"
        />
      </Section>

      <Section spacing="lg">
        <ContentModule>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-5">
              <Caption>Focus</Caption>
              <BodyText>
                Design systems for decision-heavy products, complex permission models, and operational
                command surfaces.
              </BodyText>
            </div>
            <div className="space-y-5">
              <Caption>Methods</Caption>
              <BodyText>
                Frame constraints early, design for edge-state clarity, and prototype interaction models
                that support expert intuition.
              </BodyText>
            </div>
          </div>
        </ContentModule>
      </Section>
    </PageContainer>
  );
};
