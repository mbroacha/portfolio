import { ConstraintCallout } from "../components/case-study/ConstraintCallout";
import { DecisionBlock } from "../components/case-study/DecisionBlock";
import { FieldNote } from "../components/case-study/FieldNote";
import { ProjectHeader } from "../components/case-study/ProjectHeader";
import { StickyCaseStudyNav } from "../components/case-study/StickyCaseStudyNav";
import { SystemSnapshot } from "../components/case-study/SystemSnapshot";
import { originalityProject } from "../case-studies/originality-project";
import { PageContainer } from "../components/layout/PageContainer";
import { Section } from "../components/layout/Section";
import { BodyText, SectionTitle } from "../components/primitives/Typography";

export const Originality = () => {
  const study = originalityProject;

  const keyDecisions = [
    {
      title: "Condense the report into logical groupings and customizable views",
      rationale:
        "Why: Users were overwhelmed by volume, not lacking information.\nTradeoff: Less visibility into raw data.",
      impact: "Outcome: Users could focus on relevant signals instead of scanning everything.",
    },
    {
      title: "Introduce a fixed summary highlighting the most critical signals",
      rationale:
        "Why: Users needed a starting point for investigation.\nTradeoff: The system influences user attention.",
      impact: "Outcome: Faster orientation and more consistent investigation paths.",
    },
    {
      title: "Visualize trends across assignments over time",
      rationale:
        "Why: Signals are meaningful in context, not isolation.\nTradeoff: Added abstraction layer.",
      impact: "Outcome: Users could identify behavioral patterns instead of isolated anomalies.",
    },
    {
      title: "Add tagging, notes, and case-building tools",
      rationale:
        "Why: Investigations happen over time, not in a single session.\nTradeoff: More product complexity.",
      impact: "Outcome: Users could build and revisit cases instead of relying on memory.",
    },
  ];

  const systemFlow = [
    {
      title: "Step 1",
      value: "Student writing",
      note: "Assignments enter the system across multiple submissions.",
    },
    {
      title: "Step 2",
      value: "ML pattern detection",
      note: "Models analyze authorship signals, edits, and linguistic shifts.",
    },
    {
      title: "Step 3",
      value: "Surfaced signals",
      note: "The system returns probabilistic evidence, not a verdict.",
    },
    {
      title: "Step 4",
      value: "Prioritized summary",
      note: "System influence point: summary framing guides where users look first.",
    },
    {
      title: "Step 5",
      value: "User investigation",
      note: "Users examine grouped evidence and build case notes over time.",
    },
    {
      title: "Step 6",
      value: "Decision",
      note: "Human judgment point: users decide if investigation is justified.",
    },
  ];

  const sectionLinks = [
    { id: "opening-context", label: "Opening and context" },
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "research", label: "Research" },
    { id: "decisions", label: "Key decisions" },
    { id: "system-snapshot", label: "System snapshot" },
    { id: "outcome-impact", label: "Outcome and impact" },
    { id: "reflection", label: "Reflection" },
  ];

  return (
    <PageContainer
      rail={
        <StickyCaseStudyNav
          title={study.title}
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
        title={study.title}
        subtitle={study.subtitle}
        role={study.role}
        timeline={study.timeline}
        domain={study.domain}
        outcome={study.outcome}
        tags={study.tags}
      />

      <Section id="opening-context" spacing="lg" className="space-y-6">
        <SectionTitle>Opening and context</SectionTitle>
        <div className="space-y-4">
          <p className="max-w-prose text-2xl font-medium leading-tight tracking-[-0.01em] text-ink">
            The system did not tell you if a student cheated. It gave you signals and expected you to decide.
          </p>
          <BodyText className="max-w-prose">
            This product used machine learning to identify patterns in student writing that might indicate contract
            cheating. The output was not a verdict. It was a long report of weak signals, correlations, and anomalies.
          </BodyText>
          <BodyText className="max-w-prose">The real challenge was not detection. It was judgment.</BodyText>
        </div>
        <div className="space-y-3 border-l border-line pl-5">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">Context</p>
          <BodyText className="max-w-prose">
            In 2018, we developed a product to identify contract cheating, where students outsource assignments to essay
            mills or other individuals. The system analyzed writing patterns and surfaced factors that might indicate
            authorship inconsistencies.
          </BodyText>
          <BodyText className="max-w-prose">
            In theory, it worked. In practice, most users did not know what to do with the report.
          </BodyText>
        </div>
      </Section>

      <Section id="problem" spacing="lg" className="space-y-5">
        <SectionTitle>Problem</SectionTitle>
        <BodyText className="max-w-prose">
          Beta testing revealed a consistent issue: users were not struggling to use the interface, they were
          struggling to interpret the system.
        </BodyText>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 border border-line p-5">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">The report surfaced</p>
            <BodyText>Authorship inconsistencies</BodyText>
            <BodyText>Editing patterns</BodyText>
            <BodyText>Linguistic anomalies</BodyText>
          </div>
          <div className="space-y-2 border border-line p-5">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">But users lacked</p>
            <BodyText>Clarity on which signals mattered most</BodyText>
            <BodyText>Understanding of how signals connected</BodyText>
            <BodyText>Confidence on when to investigate</BodyText>
          </div>
        </div>
        <BodyText className="max-w-prose">
          This created a deeper risk: the system could imply wrongdoing, but users had to take responsibility for acting
          on it.
        </BodyText>
      </Section>

      <Section id="constraints" spacing="md" className="space-y-6">
        <SectionTitle>Constraints</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <ConstraintCallout
            title="High-stakes decisions"
            detail="Accusing a student of cheating has serious academic consequences. Users needed confidence and defensibility."
          />
          <ConstraintCallout
            title="Ambiguous signals"
            detail="No single factor proved cheating. Evidence was probabilistic and interconnected."
          />
          <ConstraintCallout
            title="Time pressure"
            detail="Investigations were slow and manual. Users had limited time to interpret large reports."
          />
          <ConstraintCallout
            title="Mixed expertise"
            detail="Experienced investigators had strong intuition. New users had none."
          />
        </div>
      </Section>

      <Section id="research" spacing="lg" className="space-y-6">
        <SectionTitle>Research</SectionTitle>
        <BodyText className="max-w-prose">
          Through expert interviews and a card sorting exercise with experienced investigators, we learned:
        </BodyText>
        <div className="space-y-2">
          <BodyText>- Not all signals are equal. Some are consistently more persuasive when making a case.</BodyText>
          <BodyText>- Evidence is rarely isolated. Patterns across signals matter more than individual flags.</BodyText>
          <BodyText>- Investigations follow a mental workflow, not a linear report.</BodyText>
          <BodyText>- New users need guidance, not just data.</BodyText>
        </div>
        <BodyText className="max-w-prose">This shifted the problem: we needed to help users form a judgment.</BodyText>
      </Section>

      <Section id="decisions" spacing="lg" className="space-y-6">
        <SectionTitle>Key design decisions</SectionTitle>
        <div className="grid gap-5">
          {keyDecisions.map((decision) => (
            <DecisionBlock
              key={decision.title}
              title={decision.title}
              rationale={decision.rationale}
              impact={decision.impact}
            />
          ))}
        </div>
      </Section>

      <Section id="system-snapshot" spacing="lg" className="space-y-6">
        <SectionTitle>System snapshot</SectionTitle>
        <BodyText className="max-w-prose">
          Student writing to decision flow: machine learning surfaced signals, the interface prioritized attention, and
          users made the final judgment.
        </BodyText>
        <div className="grid gap-4 md:grid-cols-3">
          {systemFlow.map((snapshot) => (
            <SystemSnapshot key={snapshot.title} title={snapshot.title} value={snapshot.value} note={snapshot.note} />
          ))}
        </div>
      </Section>

      <Section id="outcome-impact" spacing="lg" className="space-y-6">
        <SectionTitle>Outcome and impact</SectionTitle>
        <BodyText className="max-w-prose">
          The redesigned system reduced time to interpret reports, improved consistency in investigations, and made the
          product usable for non-experts.
        </BodyText>
        <div className="grid gap-4 md:grid-cols-2">
          <SystemSnapshot
            title="Impact"
            value="+2000%"
            note="Increase in contract cheating detection at University of New South Wales."
          />
          <SystemSnapshot title="Scale" value="16,000 institutions" note="Institutions using the product globally." />
        </div>
      </Section>

      <Section id="reflection" spacing="lg" className="flex flex-col gap-12">
        <SectionTitle>Reflection</SectionTitle>
        <FieldNote>
          At the time, this was not framed as AI. But the core problem was already there: how much influence should a
          system have over human judgment?
        </FieldNote>
        <FieldNote>
          Too little, and users are lost in data. Too much, and the system makes decisions users do not fully understand.
        </FieldNote>
        <FieldNote>
          The goal was not to automate judgment. It was to support it, without replacing it.
        </FieldNote>
      </Section>
    </PageContainer>
  );
};
