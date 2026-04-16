import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ConstraintCallout } from "../components/case-study/ConstraintCallout";
import { DecisionBlock } from "../components/case-study/DecisionBlock";
import { FieldNote } from "../components/case-study/FieldNote";
import { ImageArtifactBlock } from "../components/case-study/ImageArtifactBlock";
import { ProjectHeader } from "../components/case-study/ProjectHeader";
import { PullQuote } from "../components/case-study/PullQuote";
import { StickyCaseStudyNav } from "../components/case-study/StickyCaseStudyNav";
import { SystemSnapshot } from "../components/case-study/SystemSnapshot";
import { PageContainer } from "../components/layout/PageContainer";
import { Section } from "../components/layout/Section";
import { BodyText, SectionTitle } from "../components/primitives/Typography";
import { caseStudies } from "../data/caseStudies";

export const CaseStudyPage = () => {
  const { slug } = useParams();
  const study = useMemo(() => caseStudies.find((entry) => entry.slug === slug), [slug]);

  if (!study) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageContainer
      rail={<StickyCaseStudyNav title={study.title} links={study.sections.map((s) => ({ id: s.id, label: s.label }))} />}
    >
      <ProjectHeader
        title={study.title}
        subtitle={study.subtitle}
        role={study.role}
        timeline={study.timeline}
        domain={study.domain}
        outcome={study.outcome}
        tags={study.tags}
      />

      {study.sections.map((section) => (
        <Section key={section.id} id={section.id}>
          <SectionTitle>{section.label}</SectionTitle>
          <BodyText className="mt-4 max-w-prose">{section.body}</BodyText>
        </Section>
      ))}

      <Section>
        <SectionTitle>System snapshots</SectionTitle>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {study.snapshots.map((snapshot) => (
            <SystemSnapshot key={snapshot.title} title={snapshot.title} value={snapshot.value} note={snapshot.note} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Key decisions</SectionTitle>
        <div className="mt-6 grid gap-5">
          {study.decisions.map((decision) => (
            <DecisionBlock
              key={decision.title}
              title={decision.title}
              rationale={decision.rationale}
              impact={decision.impact}
            />
          ))}
        </div>
      </Section>

      <Section className="grid gap-6 md:grid-cols-2">
        {study.constraints.map((constraint) => (
          <ConstraintCallout key={constraint.title} title={constraint.title} detail={constraint.detail} />
        ))}
      </Section>

      <Section>
        <PullQuote quote={study.quote} attribution={study.quoteAttribution} />
      </Section>

      <Section>
        <SectionTitle>Field notes</SectionTitle>
        <div className="mt-6 grid gap-4">
          {study.fieldNotes.map((note) => (
            <FieldNote key={note}>{note}</FieldNote>
          ))}
        </div>
      </Section>

      <Section>
        <ImageArtifactBlock
          src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1440&q=80"
          alt="Monochrome control surface with layered data visuals"
          caption="Operational command surface prototype (archival treatment)."
          tone="steel"
        />
      </Section>
    </PageContainer>
  );
};
