import type { ReactNode } from "react";
import { ConstraintCallout } from "../components/case-study/ConstraintCallout";
import { DecisionBlock } from "../components/case-study/DecisionBlock";
import { SubmissionsReportTable } from "../components/case-study/SubmissionsReportTable";
import { SummaryPrioritizedModal } from "../components/case-study/SummaryPrioritizedModal";
import { FieldNote } from "../components/case-study/FieldNote";
import { ProjectHeader } from "../components/case-study/ProjectHeader";
import { StickyCaseStudyNav } from "../components/case-study/StickyCaseStudyNav";
import { BeforeAfterComparison } from "../components/case-study/BeforeAfterComparison";
import { EssayIntegrityDashboard } from "../components/case-study/EssayIntegrityDashboard";
import { TaggingNotesCaseTools } from "../components/case-study/TaggingNotesCaseTools";
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
  visual?: ReactNode;
};

export const Originality = () => {
  const study = originalityProject;

  const keyDecisions: KeyDecision[] = [
    {
      title: "Condense into a readable format",
      rationale:
        "Users were overwhelmed by volume, not lacking information.\nTradeoff: Less visibility into raw data.",
      impact: "Outcome: Users could focus on relevant signals instead of scanning everything.",
      visual: <SubmissionsReportTable />,
    },
    {
      title: "Introduce a fixed summary",
      rationale:
        "Why: Users needed a starting point for investigation.\nTradeoff: The system influences user attention.",
      impact: "Outcome: Faster orientation and more consistent investigation paths.",
      visual: <SummaryPrioritizedModal />,
    },
    {
      title: "Visualize trends across assignments over time",
      rationale:
        "Why: Signals are meaningful in context, not isolation.\nTradeoff: Added abstraction layer.",
      impact: "Outcome: Users could identify behavioral patterns instead of isolated anomalies.",
      visual: <EssayIntegrityDashboard />,
    },
    {
      title: "Add tagging, notes, and case-building tools",
      rationale:
        "Why: Investigations happen over time, not in a single session.\nTradeoff: More product complexity.",
      impact: "Outcome: Users could build and revisit cases instead of relying on memory.",
      visual: <TaggingNotesCaseTools />,
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
        eyebrow="Academic Integrity · Shipped 2018"
        role={study.role}
        timeline={study.timeline}
        domain={study.domain}
        outcome={study.outcome}
        tags={[...study.tags, ...originalityOnlyMetadataTags]}
        hero={
          <div className="w-full overflow-hidden rounded-lg border border-hedge">
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

      <Section id="opening-context" spacing="lg">
        <SectionTitle>Context</SectionTitle>
        <div className="space-y-4">
          <p className="type-section-lead max-w-prose">
            The system did not tell you if a student cheated. It gave you signals and expected you to decide.
          </p>
          <BodyText className="max-w-prose">
            In 2018, we developed a product that used machine learning to identify patterns in student writing that might indicate contract
            cheating. The system analyzed writing patterns and surfaced factors that might indicate
            authorship inconsistencies. But the markers and anomalies were very esoteric and confusing to users.
          </BodyText>
          <BodyText className="max-w-prose">The real challenge was not detection. It was judgment.</BodyText>
        </div>
        <div className="space-y-3 rounded-l-md border-l border-line pl-5">
          <BodyText className="max-w-prose">
            Contract cheating is when students outsource assignments to essay mills or other individuals.
          </BodyText>
        </div>
      </Section>

      <Section id="problem" spacing="lg" className="!gap-10 md:!gap-12">
        <div className="flex flex-col gap-6">
          <SectionTitle>Problem</SectionTitle>
          <BodyText className="max-w-prose">
            When I started this project, the brief was to 'improve the results page.' After interviewing educators,
            however, I reframed it: the problem wasn't the page — it was that we were giving equal weight to every possible signal.
            Users had to sift through noise that was generating anxiety, not confidence.
          </BodyText>
          <BodyText className="max-w-prose">
            This created a deeper risk: the system could imply wrongdoing, but users had to take responsibility for acting
            on it.
          </BodyText>
        </div>
        <figure className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-[20px] bg-bg">
            <img
              src="/case-studies/originality/sentences-comparison.png"
              alt="Sentence-level analysis view showing how writing structure compares across files."
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <figcaption className="max-w-prose text-sm leading-relaxed text-subtext">
            It was also very...orange.
          </figcaption>
        </figure>
      </Section>

      <Section id="constraints" spacing="md">
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

      <Section id="research" spacing="lg">
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

      <Section id="decisions" spacing="lg">
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
              visual={decision.visual}
              imageSrc={decision.imageSrc}
              imageAlt={decision.imageAlt}
              className="gh-card"
            />
          ))}
        </div>
      </Section>

      <Section id="outcome-impact" spacing="lg" className="!gap-10 md:!gap-12">
        <div className="flex flex-col gap-6">
          <SectionTitle>Outcome and impact</SectionTitle>
          <BodyText className="max-w-prose">
            The redesigned system reduced time to interpret reports, improved consistency in investigations, and made the
            product usable for non-experts.
          </BodyText>
        </div>
        <BeforeAfterComparison
          before={{
            label: "Before",
            src: "/case-studies/originality/outcome-before-sentences.png",
            alt: "Turnitin Sentences view: stacked bar charts of sentence types across six student papers with identical percentages in an orange-themed interface.",
            caption: "Sentence-level charts buried the signal in noise and identical-looking data.",
          }}
          after={{
            label: "After",
            src: "/case-studies/originality/outcome-after-authorship.png",
            alt: "Originality authorship dashboard: submissions table with similarity, revisions, and editing time trends, plus Summary and Review actions.",
            caption: "A scannable report that prioritizes what matters and supports investigation over time.",
          }}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <SystemSnapshot
            title="Impact"
            value="+2000%"
            note="Increase in contract cheating detection at University of New South Wales."
          />
          <SystemSnapshot title="Scale" value="16,000 institutions" note="Institutions using the product globally." />
        </div>
      </Section>

      <Section id="reflection" spacing="lg">
        <SectionTitle>Reflection</SectionTitle>
        <FieldNote>
        At the time, I framed this project as making data heavy report more readable. That's not wrong, but it's not what actually changed for me. Instructors weren't asking for better signals — they were asking for permission to use their own judgment. The score had become the authority in the room. 
        <br />
        <br />
        That reframed the product for me. The job wasn't to make the detection smarter, it was to demote it. The score should be where a conversation starts between an instructor and a student, not where one ends. Punitive to collaborative, not because we softened the language, but because we changed who held the verdict.
        <br />
        <br />
        I don't think we fully landed it. The screens still center on numeric scores and maybes; the underlying assumption of these tools runs deeper than one redesign. But I left this project with a different question than I came in with: who is machine learning supposed to serve?
        </FieldNote>
      </Section>
    </PageContainer>
  );
};
