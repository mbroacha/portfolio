import { useMemo } from "react";
import { ConstraintCallout } from "../components/case-study/ConstraintCallout";
import { DecisionBlock } from "../components/case-study/DecisionBlock";
import { FieldNote } from "../components/case-study/FieldNote";
import { ProjectHeader } from "../components/case-study/ProjectHeader";
import { PullQuote } from "../components/case-study/PullQuote";
import { StickyCaseStudyNav } from "../components/case-study/StickyCaseStudyNav";
import { SystemSnapshot } from "../components/case-study/SystemSnapshot";
import { PageContainer } from "../components/layout/PageContainer";
import { Section } from "../components/layout/Section";
import { BodyText, SectionTitle } from "../components/primitives/Typography";
import { caseStudies } from "../data/caseStudies";

export const GradescopeMobile = () => {
  const study = useMemo(() => caseStudies.find((entry) => entry.slug === "gradescope-mobile") ?? caseStudies[0], []);
  const displayTitle = study.slug === "gradescope-mobile" ? study.title : "GradescopeMobile";

  const sectionLinks = [
    { id: "problem-framing", label: "Problem framing" },
    { id: "constraints", label: "Constraints" },
    { id: "decisions", label: "Decision sections" },
    { id: "system-explanation", label: "System explanation" },
    { id: "outcome-reflection", label: "Outcome / reflection" },
  ];

  return (
    <PageContainer
      rail={
        <StickyCaseStudyNav
          title={displayTitle}
          metadata={[
            { label: "Role", value: study.role },
            { label: "Timeline", value: study.timeline },
            { label: "Domain", value: study.domain },
            { label: "Outcome", value: study.outcome },
          ]}
          links={sectionLinks}
        />
      }
      stickyRailOnDesktop
      collapsibleRailOnMobile
      mobileRailLabel="Project overview"
      mainClassName="mx-auto w-full max-w-content"
    >
      <ProjectHeader
        title={displayTitle}
        subtitle={study.subtitle}
        role={study.role}
        timeline={study.timeline}
        domain={study.domain}
        outcome={study.outcome}
        tags={study.tags}
      />

      <Section id="problem-framing" spacing="lg" className="space-y-5">
        <SectionTitle>Problem framing</SectionTitle>
        {study.sections.map((section) => (
          <div key={section.id} className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">{section.label}</p>
            <BodyText className="max-w-prose">{section.body}</BodyText>
          </div>
        ))}
      </Section>

      <Section id="constraints" spacing="md" className="space-y-6">
        <SectionTitle>Constraints</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {study.constraints.map((constraint) => (
            <ConstraintCallout key={constraint.title} title={constraint.title} detail={constraint.detail} />
          ))}
        </div>
      </Section>

      <Section id="decisions" spacing="lg" className="space-y-6">
        <SectionTitle>Decision sections</SectionTitle>
        <div className="grid gap-5">
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

      <Section id="system-explanation" spacing="lg" className="space-y-6">
        <SectionTitle>System explanation</SectionTitle>
        <BodyText className="max-w-prose">
          The operating model balances fast scanability for routine work with deeper detail for edge-case
          review. Snapshot metrics below show the system behavior after rollout.
        </BodyText>
        <div className="grid gap-4 md:grid-cols-2">
          {study.snapshots.map((snapshot) => (
            <SystemSnapshot key={snapshot.title} title={snapshot.title} value={snapshot.value} note={snapshot.note} />
          ))}
        </div>
      </Section>

      <Section id="outcome-reflection" spacing="lg" className="space-y-8">
        <SectionTitle>Outcome / reflection</SectionTitle>
        <BodyText className="max-w-prose">{study.outcome}</BodyText>
        <PullQuote quote={study.quote} attribution={study.quoteAttribution} />
        <div className="grid gap-4">
          {study.fieldNotes.map((note) => (
            <FieldNote key={note}>{note}</FieldNote>
          ))}
        </div>
      </Section>
    </PageContainer>
  );
};
