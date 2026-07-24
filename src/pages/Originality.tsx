import type { ReactNode } from "react";
import { BeforeAfterComparison } from "../components/case-study/BeforeAfterComparison";
import { CaseStudyFooter } from "../components/case-study/CaseStudyFooter";
import { CaseStudyFigure } from "../components/case-study/CaseStudyFigure";
import { CaseStudyIntro } from "../components/case-study/CaseStudyIntro";
import { CaseStudySection } from "../components/case-study/CaseStudySection";
import { ConstraintCallout } from "../components/case-study/ConstraintCallout";
import { DecisionBlock } from "../components/case-study/DecisionBlock";
import { EssayIntegrityDashboard } from "../components/case-study/EssayIntegrityDashboard";
import { InsightPair } from "../components/case-study/InsightPair";
import { PullQuote } from "../components/case-study/PullQuote";
import { SubmissionsReportTable } from "../components/case-study/SubmissionsReportTable";
import { SummaryPrioritizedModal } from "../components/case-study/SummaryPrioritizedModal";
import { SystemSnapshot } from "../components/case-study/SystemSnapshot";
import { TaggingNotesCaseTools } from "../components/case-study/TaggingNotesCaseTools";
import { BodyText } from "../components/primitives/Typography";
import { originalityProject } from "../case-studies/originality-project";

const originalityOnlyMetadataTags = ["Team lead", "User research", "Design system"] as const;

type KeyDecision = {
  title: string;
  rationale: string;
  impact: string;
  visual?: ReactNode;
};

export const Originality = () => {
  const study = originalityProject;

  const keyDecisions: KeyDecision[] = [
    {
      title: "Condense into a readable format",
      rationale:
        "Users were overwhelmed by volume, not lacking information.\nTradeoff: Less visibility into raw data.",
      impact: "Users could focus on relevant signals instead of scanning everything.",
      visual: <SubmissionsReportTable />,
    },
    {
      title: "Introduce a fixed summary",
      rationale:
        "Users needed a starting point for investigation.\nTradeoff: The system influences user attention.",
      impact: "Faster orientation and more consistent investigation paths.",
      visual: <SummaryPrioritizedModal />,
    },
    {
      title: "Visualize trends across assignments over time",
      rationale:
        "Signals are meaningful in context, not isolation.\nTradeoff: Added abstraction layer.",
      impact: "Users could identify behavioral patterns instead of isolated anomalies.",
      visual: <EssayIntegrityDashboard />,
    },
    {
      title: "Add tagging, notes, and case-building tools",
      rationale:
        "Investigations happen over time, not in a single session.\nTradeoff: More product complexity.",
      impact: "Users could build and revisit cases instead of relying on memory.",
      visual: <TaggingNotesCaseTools />,
    },
  ];

  return (
    <article>
      <CaseStudyIntro
        eyebrow="Case 02 · Academic Integrity · Shipped 2018"
        title={study.title}
        subtitle={study.subtitle}
        role={`${study.role}. Led research, reframed the problem from report readability to judgment support, and shipped the core detection workflow across cross-functional delivery.`}
        impactStats={[
          {
            value: "+2000%",
            caption: "Increase in contract cheating detection at University of New South Wales.",
          },
          {
            value: "16,000",
            caption: "Institutions using the product globally.",
          },
        ]}
        timeline={study.timeline}
        domain={study.domain}
        tags={[...study.tags, ...originalityOnlyMetadataTags]}
        hero={
          <div className="overflow-hidden rounded-lg border border-hedge">
            <img
              src="/case-studies/originality/authorship-banner.png"
              alt="Turnitin authorship dashboard: submissions table with floating trend cards and Summary and Review actions."
              className="h-auto w-full"
              loading="eager"
              decoding="async"
            />
          </div>
        }
      />

      <CaseStudySection id="problem" number="01" title="Problem">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <div className="space-y-5">
            <p className="type-section-lead max-w-prose">
              The system did not tell you if a student cheated. It gave you signals and expected you to decide.
            </p>
            <BodyText>
              In 2018, we developed a product that used machine learning to identify patterns in student writing that
              might indicate contract cheating. The markers and anomalies were esoteric and confusing to users.
            </BodyText>
            <BodyText>
              When I started this project, the brief was to improve the results page. After interviewing educators, I
              reframed it: the problem was not the page — it was that we were giving equal weight to every possible
              signal. Users had to sift through noise that was generating anxiety, not confidence.
            </BodyText>
            <BodyText>
              This created a deeper risk: the system could imply wrongdoing, but users had to take responsibility for
              acting on it.
            </BodyText>
          </div>
          <PullQuote
            quote="The real challenge was not detection. It was judgment."
            attribution="Reframing from the research"
          />
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2">
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

        <CaseStudyFigure
          className="mt-11"
          src="/case-studies/originality/sentences-comparison.png"
          alt="Sentence-level analysis view showing how writing structure compares across files."
          caption="It was also very...orange."
        />
      </CaseStudySection>

      <CaseStudySection id="research" number="02" title="Research" variant="fern">
        <div className="grid items-start gap-10 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <CaseStudyFigure
            src="/case-studies/originality/research-sticky-notes.png"
            alt="Notebook with colorful sticky notes from a workshop, each labeled with document metadata fields."
            caption="We asked experts to define what actually matters."
          />
          <div className="space-y-5">
            <BodyText>
              Through expert interviews and a card sorting exercise with experienced investigators, we learned:
            </BodyText>
            <div className="space-y-2">
              <BodyText>Not all signals are equal. Some are consistently more persuasive when making a case.</BodyText>
              <BodyText>Evidence is rarely isolated. Patterns across signals matter more than individual flags.</BodyText>
              <BodyText>Investigations follow a mental workflow, not a linear report.</BodyText>
              <BodyText>New users need guidance, not just data.</BodyText>
            </div>
            <BodyText>This shifted the problem: we needed to help users form a judgment.</BodyText>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="pivot" number="03" title="Pivot">
        <InsightPair
          insight="Educators were not asking for more signals — they needed permission to use their own judgment. The score had become the authority in the room."
          opportunity="Reframe the product from detection authority to investigation support: prioritize persuasive signals, guide non-experts, and let instructors own the verdict."
        />
      </CaseStudySection>

      <CaseStudySection id="decisions" number="04" title="Key decisions" variant="fern">
        <CaseStudyFigure
          src="/case-studies/originality/design-evolution-sketches.png"
          alt="Five-stage progression from document sketches to final high-fidelity Turnitin mockup."
          caption="I explored automation and workflow-heavy approaches and rejected them."
        />
        <div className="mt-10 flex flex-col gap-8">
          {keyDecisions.map((decision, index) => (
            <DecisionBlock
              key={decision.title}
              title={`${index + 1}. ${decision.title.toUpperCase()}`}
              rationale={decision.rationale}
              impact={decision.impact}
              visual={decision.visual}
            />
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection id="outcome-impact" number="05" title="Outcome and impact">
        <div className="space-y-10">
          <BodyText className="max-w-prose">
            The redesigned system reduced time to interpret reports, improved consistency in investigations, and made the
            product usable for non-experts.
          </BodyText>

          <BeforeAfterComparison
            before={{
              label: "Before",
              src: "/case-studies/originality/outcome-before-sentences.png",
              alt: "Turnitin Sentences view with stacked bar charts in an orange-themed interface.",
              caption: "Sentence-level charts buried the signal in noise and identical-looking data.",
            }}
            after={{
              label: "After",
              src: "/case-studies/originality/outcome-after-authorship.png",
              alt: "Originality authorship dashboard with similarity, revisions, and editing time trends.",
              caption: "A scannable report that prioritizes what matters and supports investigation over time.",
            }}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <SystemSnapshot
              title="Impact"
              value="+2000%"
              note="Increase in contract cheating detection at University of New South Wales."
            />
            <SystemSnapshot title="Scale" value="16,000" note="Institutions using the product globally." />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="reflection" number="06" title="Lessons learned">
        <div className="mx-auto flex max-w-[47.5rem] flex-col gap-7">
          <div className="space-y-2.5">
            <p className="type-mono type-mono--glow">1. Demote the score, elevate judgment</p>
            <BodyText>
              Instructors were not asking for better signals — they were asking for permission to use their own
              judgment. The job was not to make detection smarter; it was to make the score where a conversation
              starts, not where one ends.
            </BodyText>
          </div>
          <div className="space-y-2.5">
            <p className="type-mono type-mono--glow">2. Design for investigation, not accusation</p>
            <BodyText>
              Punitive to collaborative does not mean softer language. It means changing who holds the verdict and
              building tools that support cases over time instead of one-off report scans.
            </BodyText>
          </div>
          <div className="space-y-2.5">
            <p className="type-mono type-mono--glow">3. Ask who machine learning serves</p>
            <BodyText>
              The screens still center on numeric scores and maybes; the underlying assumption of these tools runs
              deeper than one redesign. I left with a different question than I came in with: who is machine learning
              supposed to serve?
            </BodyText>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudyFooter
        projectName={study.title}
        team={[{ name: "Morgan Broacha", role: "Senior Product Designer" }]}
        nextCaseStudy={{ label: "Next case study", to: "/case-study/command-center-risk-modeling" }}
      />
    </article>
  );
};
