import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { Jackalope } from "../components/cv/Jackalope";
import { MediaSlot, MetaList, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import {
  ConstraintGrid,
  DecisionRow,
  InsightBlock,
  PrevNext,
  TwoCol,
  type Decision,
} from "../components/cv/CaseStudyParts";
import { BeforeAfterComparison } from "../components/case-study/BeforeAfterComparison";
import { EssayIntegrityDashboard } from "../components/case-study/EssayIntegrityDashboard";
import { SubmissionsReportTable } from "../components/case-study/SubmissionsReportTable";
import { SummaryPrioritizedModal } from "../components/case-study/SummaryPrioritizedModal";
import { TaggingNotesCaseTools } from "../components/case-study/TaggingNotesCaseTools";

const decisions: Decision[] = [
  {
    title: "Lead with the evidence that persuades, not the evidence we sold",
    rejected: "Leading with the algorithm's linguistic analysis, which was the company's differentiator.",
    why: "Users were overwhelmed by volume, not short on information. Every signal carried equal weight, so the persuasive ones and the noise looked identical. The signals that actually made a case were often the plainest ones.",
    tradeoff: "Less visibility into raw data, and I was demoting the thing we sold.",
    result: "Users could focus on relevant signals instead of scanning everything.",
    visual: <SubmissionsReportTable />,
  },
  {
    title: "Introduce a fixed summary",
    rejected: "Letting each investigator find their own starting point.",
    why: "Experienced investigators had strong intuition about where to begin. New users had none, and the report gave them nowhere to start.",
    tradeoff: "The system now influences where attention goes first. That is a position we are taking on someone else's investigation.",
    result: "Faster orientation and more consistent investigation paths.",
    visual: <SummaryPrioritizedModal />,
  },
  {
    title: "Show trends across assignments over time",
    rejected: "Treating each submission as a self-contained report.",
    why: "Signals are meaningful in context, not isolation. A single anomaly proves nothing. A pattern across a semester is a different conversation.",
    tradeoff: "An added layer of abstraction between the user and the document in front of them.",
    result: "Users could identify behavioral patterns instead of isolated anomalies.",
    visual: <EssayIntegrityDashboard />,
  },
  {
    title: "Add tagging, notes and case-building",
    rejected: "Optimizing for the single-session report scan.",
    why: "Investigations happen over weeks, not in one sitting. Users were reconstructing their own reasoning from memory every time they came back.",
    tradeoff: "More product complexity, on a product already accused of being hard to interpret.",
    result: "Users could build and revisit cases instead of relying on memory.",
    visual: <TaggingNotesCaseTools />,
  },
  {
    title: "Reversed: prescriptive language",
    rejected: "The version I designed first, which labeled findings with phrases like Investigation Recommended.",
    why: "I thought guidance meant telling users what to do next. For non-experts especially, a recommendation seemed like the helpful thing.",
    tradeoff: "Design time on a language system that had to be walked back.",
    result: "Research showed educators still read it as an accusation. I lowered the severity and moved to signals that bring a piece of work to someone's attention without pronouncing on it.",
  },
];

export const Originality = () => (
  <CvPage
    sidebar={
      <>
        <div className="flex items-center gap-2.5">
          <Jackalope size={20} className="text-bone" />
          <div className="font-display text-xl italic tracking-[0.5px] text-bone">Morgan Broacha</div>
        </div>

        <Link to="/" className="underline underline-offset-4">
          &larr; Back to work
        </Link>

        <Rule />

        <div className="font-display text-xl italic text-bone">Originality</div>
        <div>
          <span className="text-bone">Contract cheating detection.</span> Machine learning flagged the papers.
          Educators had to decide what it meant.
        </div>

        <Rule />

        <MetaList
          items={[
            { label: "Role", value: <span className="text-bone">Senior UX Designer</span> },
            { label: "Timeline", value: "2018. Shipped 2019" },
            {
              label: "Team",
              value: (
                <>
                  8&ndash;9 engineers and a PM
                  <br />
                  Inside a 20-person design org
                  <br />
                  Lead to 3 junior designers
                </>
              ),
            },
            { label: "Scope", value: "Research, product design, information architecture" },
            { label: "Platform", value: "Web" },
          ]}
        />
      </>
    }
  >
    <MediaSlot
      ratio="16/9"
      src="/case-studies/originality/authorship-banner.png"
      alt="Turnitin authorship dashboard with submissions table and trend cards."
    />

    <SectionHeading>PROBLEM</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol
      claim={
        <em className="font-display not-italic">
          The system did not tell you if a student cheated. It gave you signals and expected you to decide.
        </em>
      }
    >
      <div>
        Contract cheating is work a student paid someone else to write. In 2018 we shipped a product that used
        machine learning to find patterns in student writing that might indicate it. The markers and anomalies were
        esoteric and confusing.
      </div>
      <div>
        My initial brief was to improve the results page, but after interviewing educators I reframed the problem.
        It was not the page. It was that we gave equal weight to every possible signal, so users sifted noise that
        generated anxiety rather than confidence.
      </div>
      <div>
        Underneath that was a harder challenge. The system could imply wrongdoing, but the user had to carry the
        consequence of acting on it.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">We were selling an algorithm, even if it wasn&rsquo;t the best signal.</em>}>
      <div>
        Enormous engineering effort went into the model. It analyzed sentence complexity, vocabulary, diction and
        readability across thousands of papers already in the corpus, building a writing profile for each student to
        compare future work against. Before it, educators worked on instinct, and instinct is impossible to defend
        when the outcome is a serious academic penalty.
      </div>
      <div>
        Then research kept telling us the same thing. Most of the time you can tell from the file metadata. The
        author name. The editing time. Dates that do not line up. We heard it internally and from our professor
        research partners.
      </div>
      <div>
        So I pivoted to surfacing the signals that were actually damning, which were largely the plain ones, while
        still having to demonstrate that the algorithm we were selling had value.
      </div>
    </TwoCol>

    <SectionHeading>CONSTRAINTS</SectionHeading>
    <Rule className="mb-6" />
    <ConstraintGrid
      items={[
        {
          title: "Legally, we could not accuse anyone",
          detail:
            "The product could not say a student cheated. I had to design it very carefully as a tool that surfaces suspicious factors in a body of work. Accusing a student has serious academic consequences, and users needed confidence and defensibility rather than a verdict.",
        },
        {
          title: "Our own reputation",
          detail:
            "Turnitin's flagship Similarity product was frequently wrong and hard to interpret, and you can still find students and teachers bemoaning unfair accusations because of it. I was designing inside that ecosystem, against damage the company had already done.",
        },
        {
          title: "Probabilistic, interconnected evidence",
          detail:
            "No single factor proved anything. Signals only meant something in combination, which is exactly the kind of reasoning an interface flattens by accident.",
        },
        {
          title: "Two kinds of user, one report",
          detail:
            "Experienced investigators had strong intuition and limited time. New users had no intuition at all. The same report had to serve both without patronizing one or abandoning the other.",
        },
      ]}
    />

    <SectionHeading>RESEARCH</SectionHeading>
    <Rule className="mb-6" />
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <MediaSlot
        ratio="3/4"
        src="/case-studies/originality/research-sticky-notes.png"
        alt="Workshop notebook with sticky notes labeled with document metadata fields."
      />
      <div className="flex flex-col gap-3">
        <div className="text-bone">We asked experts to define what actually matters.</div>
        <div>Expert interviews and a card sorting exercise with experienced investigators. Four findings:</div>
        <div>Not all signals are equal. Some are consistently more persuasive when making a case.</div>
        <div>Patterns emerge across a term, not within a single paper.</div>
        <div>Investigations follow a mental workflow, not a linear report.</div>
        <div>New users need guidance, not just data.</div>
      </div>
    </div>

    <SectionHeading>INSIGHT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock
      quote="Educators were not asking for more signals. They needed permission to use their own judgment."
      source="The score had become the authority in the room."
    />
    <TwoCol claim={<em className="font-display not-italic">Reframe the product from detection authority to investigation support.</em>}>
      <div>Prioritize the persuasive signals. Guide the non-experts. Let the instructor own the verdict.</div>
      <div>
        That reframe is what turned four separate feature decisions into one argument, and it is why the redesign
        was about hierarchy rather than accuracy.
      </div>
    </TwoCol>

    <SectionHeading>DECISIONS</SectionHeading>
    <Rule className="mb-6" />
    <MediaSlot
      ratio="16/9"
      src="/case-studies/originality/design-evolution-sketches.png"
      alt="Five-stage progression from document sketches to final high-fidelity mockup."
      caption="I explored automation and workflow-heavy approaches and rejected them"
    />
    {decisions.map((d, i) => (
      <DecisionRow key={d.title} decision={d} first={i === 0} />
    ))}

    <SectionHeading>OUTCOME</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">A scannable report that supports an investigation over time.</em>}>
      <div>
        The redesigned system reduced time to interpret reports, improved consistency across investigations, and
        made the product usable by people who were not experts in it.
      </div>
      <div>
        In August 2019 the Sydney Morning Herald reported that cheating found at the University of New South Wales
        was up 2000% following new detection methods. That figure is UNSW&rsquo;s reported detection increase, not a
        measure of this redesign.
      </div>
      <div>16,000 institutions used the product globally. That is product scale rather than my impact.</div>
    </TwoCol>

    <div className="mb-6">
      <BeforeAfterComparison
        before={{
          label: "Before",
          src: "/case-studies/originality/outcome-before-sentences.png",
          alt: "Sentences view with stacked bar charts in an orange interface.",
          caption: "Sentence-level charts buried the signal in identical-looking data.",
        }}
        after={{
          label: "After",
          src: "/case-studies/originality/outcome-after-authorship.png",
          alt: "Authorship dashboard with similarity, revisions and editing time trends.",
          caption: "A scannable report that prioritizes what matters.",
        }}
      />
    </div>

    <SectionHeading>REFLECTION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Demote the score, elevate judgment.</em>}>
      <div>
        Instructors were not asking for better signals. They were asking for permission to use their own judgment.
        The job was not to make detection smarter. It was to make the score where a conversation starts rather than
        where one ends.
      </div>
    </TwoCol>
    <TwoCol claim={<em className="font-display not-italic">Design for investigation, not accusation.</em>}>
      <div>
        Moving from punitive to collaborative does not mean softer language. It means changing who holds the
        verdict, and building tools that support a case over time instead of a one-off report scan.
      </div>
    </TwoCol>
    <TwoCol claim={<em className="font-display not-italic">Ask who the machine learning is serving.</em>}>
      <div>
        We spent years on a model that turned out to be less useful than a file timestamp, and I spent months
        designing around the gap between what we sold and what actually persuaded anyone.
      </div>
      <div>
        The screens still center on numeric scores and maybes. The assumption underneath these tools runs deeper
        than one redesign. I left with a different question than I came in with.
      </div>
    </TwoCol>

    <PrevNext prev={{ label: "Beacon", to: "/case-study/beacon" }} next={{ label: "How I work", to: "/how-i-work" }} />
  </CvPage>
);
