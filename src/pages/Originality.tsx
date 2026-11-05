import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { SiteRail } from "../components/cv/SiteRail";
import { MediaSlot, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import {
  ConstraintGrid,
  DecisionRow,
  InsightBlock,
  PrevNext,
  QualOutcome,
  TwoCol,
  type Decision,
} from "../components/cv/CaseStudyParts";
import { BeforeAfterComparison } from "../components/case-study/BeforeAfterComparison";
import { OriginalityHero } from "../components/case-study/OriginalityHero";
import { EssayIntegrityDashboard } from "../components/case-study/EssayIntegrityDashboard";
import { SubmissionsReportTable } from "../components/case-study/SubmissionsReportTable";
import { SummaryPrioritizedModal } from "../components/case-study/SummaryPrioritizedModal";
import { TaggingNotesCaseTools } from "../components/case-study/TaggingNotesCaseTools";

const decisions: Decision[] = [
  {
    title: "Put the persuasive evidence first, even though it wasn't what we sold",
    rejected: "Leading with the linguistic analysis. It was the company's differentiator.",
    why: "Every signal got the same weight, so users had to read all of it to find the two or three that mattered. Those were usually the plain ones.",
    tradeoff: "Users saw less of the raw data. And I was moving the thing we sold down the page.",
    result: "Author, last-modified and editing time moved to the top of the report. They also showed up in the summary whenever they flagged an issue. The linguistic analysis sat below them.",
    visual: <SubmissionsReportTable />,
  },
  {
    title: "Add a fixed summary",
    rejected: "Letting each investigator pick their own starting point.",
    why: "Experienced investigators knew where to look first. New users didn't, and the report gave them no hints.",
    tradeoff: "Now the product decides what people look at first. That's a position we're taking on someone else's investigation.",
    result: "Every report opens on the same summary. New users and experts start in the same place.",
    visual: <SummaryPrioritizedModal />,
  },
  {
    title: "Show trends across assignments",
    rejected: "Treating each submission as its own report.",
    why: "One odd paper doesn't prove much. Five odd papers in a semester is worth a conversation with the student.",
    tradeoff: "Another layer between the user and the actual paper.",
    result: "A semester of submissions on one chart. Users could see whether a flag was a one-off or part of a pattern.",
    visual: <EssayIntegrityDashboard />,
  },
  {
    title: "Add tags, notes and cases",
    rejected: "Designing for someone reading one report in one sitting.",
    why: "Investigations take weeks. Every time users came back, they had to rebuild their reasoning from memory.",
    tradeoff: "More complexity in a product people already found hard to read.",
    result: "Users could save their reasoning as they went and pick it back up later.",
    visual: <TaggingNotesCaseTools />,
  },
  {
    title: "Reversed: telling users what to do",
    rejected: "My first version, which labeled findings with phrases like Investigation Recommended.",
    why: "I thought guidance meant telling users what to do next. For new users especially, a recommendation seemed helpful.",
    tradeoff: "Time spent on a labeling system I had to walk back.",
    result: "In research, educators read Investigation Recommended as an accusation. It was too damning. I lowered the severity, and the new labels just flag a paper for a closer look.",
  },
];

export const Originality = () => (
  <CvPage
    sidebar={
      <SiteRail scope="originality" />
    }
  >
    <PageHead
      title="Originality"
      lede={
        <>
          <span className="text-bone">Contract cheating detection.</span> Machine learning flagged suspicious student work, and suggested best practices for educators.
        </>
      }
      items={[
        { label: "Role", value: <span className="text-bone">Senior UX Designer</span> },
        { label: "Company", value: "Turnitin" },
        { label: "Timeline", value: "Closed beta 2018. Shipped 2019" },
        {
          label: "Team",
          value: (
            <>
              8 engineers and a PM
            </>
          ),
        },
        { label: "Scope", value: "Research, product design, information architecture" },
        { label: "Platform", value: "Web" },
      ]}
    />

    <OriginalityHero />

    <SectionHeading>PROBLEM</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol
      claim={
        <em className="font-display not-italic">
          The product was a dashboard of figures, with no clear signal of what mattered.
        </em>
      }
    >
      <div>
        Contract cheating is work a student paid someone else to write (before AI was ubiquitous). Teachers previously caught this off vibes, but serious academic offenses require proof.  Turnitin developed a model to profile a student's writing style in order to catch outlier assignments. The 2018 closed beta featured pages of obscure charts and tables that were not easily readible by educators.
      </div>
      <div>
        I was brought in to improve the layout of the results page. After interviewing educators, I realized the layout wasn&rsquo;t was the issue. The report gave every datapoint the same weight, so users had to waded through a lot of noise to make a decision.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">We were selling an algorithm, even if it wasn&rsquo;t actually the best signal.</em>}>
      <div>
        The company invested a lot in the model. It analyzed sentence complexity, vocabulary, diction and readability
        across thousands of papers already in Turnitin&rsquo;s corpus, and built a writing profile for each student.
        New work got compared against that profile.
      </div>
      <div>
        Research kept turning up the same thing. Most of the time you can tell a student cheated just from the
        file metadata: author name, editing time, dates that didn&rsquo;t match.
      </div>
      <div>
        So I moved those plain signals to the top. Leadership didn&rsquo;t want the model demoted, and we settled on
        a split. Sales kept leading with the machine learning. The product showed whatever actually made the case.
      </div>
    </TwoCol>

    <SectionHeading>CONSTRAINTS</SectionHeading>
    <Rule className="mb-6" />
    <ConstraintGrid
      items={[
        {
          title: "We couldn't legally accuse anyone",
          detail:
            "The product couldn't say a student cheated. It could only point out things in their work that looked suspicious. A misconduct finding follows a student, so educators needed evidence they could defend.",
        },
        {
          title: "Our own reputation",
          detail:
            "Educators already treated Turnitin's Similarity score as the final word, and students paid the price when the score was misinterpreted. I was adding a second score to the same product family, and we already had a trust disadvantage.",
        },
        {
          title: "Evidence that only works in combination",
          detail:
            "No single datapoint proves anything. They only have meaning as an overall pattern, and most interfaces show signals one at a time.",
        },
        {
          title: "Two kinds of user, one report",
          detail:
            "Experienced investigators knew what they were looking for and didn't have much time. New users had no idea where to start. The same report had to work for both.",
        },
      ]}
    />

    <SectionHeading>RESEARCH</SectionHeading>
    <Rule className="mb-6" />
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <MediaSlot
        ratio="3/4"
        src="/case-studies/originality/research-sticky-notes.png"
        alt="Workshop notebook with sticky notes labeled with document metadata fields." />
      <div className="flex flex-col gap-3">
        <div className="text-bone">We asked experienced investigators what they actually look for.</div>
        <div>
          I led dozens of interviews and at least biweekly check-ins with academics at Deakin, Griffith, UC
          San Diego, UNSW, Northampton, Queensland and Wollongong. I also ran a card sort with experienced
          investigators. What we learned:
        </div>
        <div>While the algorithm data was interesting, file metadata was usually the smoking gun and easier to explain.</div>
        <div>The same few signals persuaded people every time.</div>
        <div>Patterns show up across a term. One paper rarely tells you much.</div>
        <div>Investigators work a case in their own order. A top-to-bottom report fights that.</div>
        <div>New users wanted to be told where to start.</div>
      </div>
    </div>

    <SectionHeading>INSIGHT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock
      quote="Educators didn't want more signals. They wanted permission to trust their own judgment."
      source="From interviews and biweekly check-ins with academics at seven universities."
    />
    <TwoCol claim={<em className="font-display not-italic">Stop acting like the judge. Help the educator build a case.</em>}>
      <div>
        Turnitin&rsquo;s scores had become the final word in a lot of these decisions. I wanted to hand that back to
        the educator. Every decision below follows from it, and it&rsquo;s why the redesign changed the hierarchy and
        left the model alone.
      </div>
    </TwoCol>

    <SectionHeading>DECISIONS</SectionHeading>
    <Rule className="mb-6" />
    <MediaSlot
      ratio="16/9"
      src="/case-studies/originality/design-evolution-sketches.png"
      alt="Five-stage progression from document sketches to final high-fidelity mockup."
    />
    {decisions.map((d, i) => (
      <DecisionRow key={d.title} decision={d} first={i === 0} />
    ))}

    <SectionHeading>OUTCOME</SectionHeading>
    <Rule className="mb-6" />
    <QualOutcome
      items={[
        {
          title: "What shipped",
          detail:
            "A fixed summary. File metadata at the top of the report. Trends across a term. Tags, notes and cases. Softer labels that flag a paper for a closer look instead of recommending an investigation.",
        },
        {
          title: "Results",
          detail: (
            <>
              The product shipped to 16,000 institutions. UNSW, one
              of our research partners, reported a 2000% jump in detected cheating in 2019 after bringing in new
              detection methods (Sydney Morning Herald).
            </>
          ),
        },
      ]}
    />

    <div className="mb-6">
      <BeforeAfterComparison
        before={{
          label: "Before",
          src: "/case-studies/originality/outcome-before-sentences.png",
          alt: "Sentences view with stacked bar charts in an orange interface.",
          caption: "Closed beta. One sentence-type chart per paper. Capture.",
        }}
        after={{
          label: "After",
          src: "/case-studies/originality/outcome-after-authorship.png",
          alt: "Authorship dashboard with similarity, revisions and editing time trends.",
          caption: "Shipped. Easier to scan, but the similarity score still leads. Capture.",
        }}
      />
    </div>

    <SectionHeading>REFLECTION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Who was the machine learning for?</em>}>
      <div>
        The company spent over two years on a model that was less useful than a file timestamp. I spent months
        designing around the gap between what we sold and what convinced anyone. And the screens I shipped still
        lead with scores.
      </div>
      <div>
        Let's be honest, most AI products have the same problem now. People treat a probabilistic score as an answer unless the
        design gives them a reason not to.
      </div>
    </TwoCol>
    <TwoCol claim={<em className="font-display not-italic">I should have declared design bankruptcy sooner.</em>}>
      <div>
        I spent way too long getting the original version to read better. The whole layout needed to change.
      </div>
    </TwoCol>
    <TwoCol claim={<em className="font-display not-italic">We never talked to students.</em>}>
      <div>
        Our users were teachers and administrators. But students dealt with the fallout of whatever the product said, and
        we never got any research or feedback from them.
      </div>
    </TwoCol>

    <PrevNext prev={{ label: "Beacon", to: "/case-study/beacon" }} next={{ label: "What I do", to: "/what-i-do" }} />
  </CvPage>
);
