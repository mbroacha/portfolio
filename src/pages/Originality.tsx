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

const originalityOnlyMetadataTags = ["Team lead", "User research", "Design system"] as const;

type KeyDecision = {
  title: string;
  rationale: string;
  impact: string;
  imageSrc?: string;
  imageAlt?: string;
};

export const Originality = () => {
  const study = originalityProject;

  const keyDecisions: KeyDecision[] = [
    {
      title: "Condense the report into logical groupings and customizable views",
      rationale:
        "Why: Users were overwhelmed by volume, not lacking information.\nTradeoff: Less visibility into raw data.",
      impact: "Outcome: Users could focus on relevant signals instead of scanning everything.",
      imageSrc: "/case-studies/originality/submissions-report-filters.png",
      imageAlt:
        "Submissions report table with filenames, assignments, classes, similarity scores, and sort and filter controls.",
    },
    {
      title: "Introduce a fixed summary highlighting the most critical signals",
      rationale:
        "Why: Users needed a starting point for investigation.\nTradeoff: The system influences user attention.",
      impact: "Outcome: Faster orientation and more consistent investigation paths.",
      imageSrc: "/case-studies/originality/summary-prioritized-signals.png",
      imageAlt:
        "Summary panel titled Top issues that may indicate contract cheating, listing flagged signals such as multiple author names and last modified by names, with Summary and Review tabs.",
    },
    {
      title: "Visualize trends across assignments over time",
      rationale:
        "Why: Signals are meaningful in context, not isolation.\nTradeoff: Added abstraction layer.",
      impact: "Outcome: Users could identify behavioral patterns instead of isolated anomalies.",
      imageSrc: "/case-studies/originality/assignment-trends-over-time.png",
      imageAlt:
        "Dashboard with submissions table and overlaid line charts of similarity score, revisions, and editing time plotted by submission date across months.",
    },
    {
      title: "Add tagging, notes, and case-building tools",
      rationale:
        "Why: Investigations happen over time, not in a single session.\nTradeoff: More product complexity.",
      impact: "Outcome: Users could build and revisit cases instead of relying on memory.",
      imageSrc: "/case-studies/originality/tagging-notes-case-tools.png",
      imageAlt:
        "Overlapping modals on a submission: labels for Suspicious and Dismiss with color picker, and a comments thread with a new comment field for the same document.",
    },
  ];

  const sectionLinks = [
    { id: "opening-context", label: "Opening and context" },
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "research", label: "Research" },
    { id: "decisions", label: "Key decisions" },
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
        tags={[...study.tags, ...originalityOnlyMetadataTags]}
        hero={
          <div className="w-full overflow-hidden rounded-[14px] bg-bg ring-1 ring-line/50 md:rounded-[18px]">
            <img
              src="/case-studies/originality/authorship-banner.png"
              alt="Turnitin authorship dashboard: submissions table with floating trend cards, blue chrome, and Summary and Review actions."
              className="h-auto w-full"
              loading="eager"
              decoding="async"
            />
          </div>
        }
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
        <div className="space-y-3 rounded-l-md border-l border-line pl-5">
          <p className="type-caption">Context</p>
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
          <div className="space-y-2 rounded-md border border-line p-5">
            <p className="type-caption">The report surfaced</p>
            <BodyText>Authorship inconsistencies</BodyText>
            <BodyText>Editing patterns</BodyText>
            <BodyText>Linguistic anomalies</BodyText>
          </div>
          <div className="space-y-2 rounded-md border border-line p-5">
            <p className="type-caption">But users lacked</p>
            <BodyText>Clarity on which signals mattered most</BodyText>
            <BodyText>Understanding of how signals connected</BodyText>
            <BodyText>Confidence on when to investigate</BodyText>
          </div>
        </div>
        <BodyText className="max-w-prose">
          This created a deeper risk: the system could imply wrongdoing, but users had to take responsibility for acting
          on it.
        </BodyText>
        <figure className="space-y-3">
          <div className="relative overflow-hidden rounded-[20px] bg-bg">
            <img
              src="/case-studies/originality/sentences-comparison.png"
              alt="Sentence-level analysis view showing how writing structure compares across files."
              className="h-auto w-full"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
              <p
                className="font-hand absolute left-[5%] top-[6%] inline-block max-w-[min(42%,16rem)] rounded-md bg-blue-600/50 px-3 py-1.5 text-[clamp(1.35rem,4vw,2rem)] font-semibold leading-tight text-white shadow-sm ring-1 ring-white/25 backdrop-blur-sm sm:left-[6%] sm:top-[7%] sm:max-w-none sm:rotate-[-5deg]"
              >
                no prioritization
              </p>
              <p
                className="font-hand absolute right-[4%] top-[10%] inline-block max-w-[min(48%,15rem)] rounded-md bg-blue-600/50 px-3 py-1.5 text-right text-[clamp(1.3rem,3.8vw,1.9rem)] font-semibold leading-tight text-white shadow-sm ring-1 ring-white/25 backdrop-blur-sm sm:right-[8%] sm:top-[12%] sm:max-w-none sm:rotate-[4deg]"
              >
                no entry point
              </p>
              <p
                className="font-hand absolute bottom-[14%] left-1/2 inline-block max-w-[min(calc(100%-2rem),18rem)] -translate-x-1/2 rounded-md bg-blue-600/50 px-3 py-1.5 text-center text-[clamp(1.35rem,4vw,2rem)] font-semibold leading-tight text-white shadow-sm ring-1 ring-white/25 backdrop-blur-sm sm:bottom-[16%] sm:left-[12%] sm:translate-x-0 sm:text-left sm:rotate-[-3deg]"
              >
                signals disconnected
              </p>
            </div>
          </div>
          <figcaption className="max-w-prose text-sm leading-relaxed text-subtext">
            The system surfaced flags, but gave no sense of what mattered. It was also very...orange.
          </figcaption>
        </figure>
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
        <figure className="space-y-3">
          <div className="overflow-hidden rounded-[20px] bg-bg">
            <img
              src="/case-studies/originality/research-sticky-notes.png"
              alt="Notebook with colorful sticky notes from a workshop, each labeled with document metadata fields such as author, revisions, and font usage."
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <figcaption className="max-w-prose text-sm leading-relaxed text-subtext">
            We asked experts to define what actually matters.
          </figcaption>
        </figure>
      </Section>

      <Section id="decisions" spacing="lg" className="space-y-6">
        <SectionTitle>Key design decisions</SectionTitle>
        <figure className="space-y-3">
          <div className="overflow-hidden rounded-[20px] bg-bg">
            <img
              src="/case-studies/originality/design-evolution-sketches.png"
              alt="Five-stage progression: document information and dashboard sketches on dot grid, paper search wireframe, investigation recommended wireframe with decision block, and final high-fidelity Turnitin mockup with section pills."
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <figcaption className="max-w-prose text-sm leading-relaxed text-subtext">
            I explored automation and workflow-heavy approaches and rejected them.
          </figcaption>
        </figure>
        <div className="flex flex-col gap-8">
          {keyDecisions.map((decision) => (
            <DecisionBlock
              key={decision.title}
              title={decision.title}
              rationale={decision.rationale}
              impact={decision.impact}
              imageSrc={decision.imageSrc}
              imageAlt={decision.imageAlt}
              className="shadow-[0_12px_40px_-10px_#C3E5FF]"
            />
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

      <Section id="reflection" spacing="lg" className="flex flex-col gap-8">
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
