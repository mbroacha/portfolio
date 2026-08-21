import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { Jackalope } from "../components/cv/Jackalope";
import { MediaSlot, MetaList, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import {
  ConstraintGrid,
  DecisionRow,
  InsightBlock,
  PrevNext,
  QualOutcome,
  TwoCol,
  type Decision,
} from "../components/cv/CaseStudyParts";

const decisions: Decision[] = [
  {
    title: "Syntactic rigor over canvas fluidity",
    rejected: "The general-purpose canvas idiom. Quick-deploy shapes, free snapping, arbitrary color.",
    why: "In hardware modeling a square is not a square. It carries model metadata, and position and lines have specific meaning. The diagram also has to translate directly into the mental model of coded files, and back, for people who think visually and people who think in code.",
    tradeoff: "Less fluid than a general-purpose canvas. I designed toward the bare minimum required for an object to exist, and no further.",
    result: "The side-by-side diagram editor and IDE is the feature we get the most positive feedback on, and the most requested upgrades.",
    visual: <MediaSlot ratio="16/10" caption="Diagram editor and IDE, side by side &middot; interactive recreation" />,
  },
  {
    title: "Git Lite",
    rejected: "Both extremes. Full Git exposure, and hiding version control entirely.",
    why: "It mirrors my own learning curve with GitLab. Mapping branching, merging and review onto engineering design vocabulary lets software-fluent users pick it up immediately, while stakeholders never have to learn Git. That meant a lot of work behind the curtain.",
    tradeoff: "When a pipeline breaks the user has little control or visibility. We surface only the safe remedies, update the branch from main or un-draft a PR, and defer the rest to someone who knows Git. A good chunk of the process is obscured.",
    result: "Non-software stakeholders can review and approve models without learning a version control system. The failure state is still the weakest part of the product.",
    visual: <MediaSlot ratio="16/9" caption="Branch, review, merge &middot; translated into engineering vocabulary" />,
  },
  {
    title: "A table that behaves like a document",
    rejected: "A pure document editor, and a pure object database UI.",
    why: "Requirements arrive as documents whose meaning comes from numbering and indentation. They are frequently government-issued and sometimes legally binding. We have to turn lines of text into shapes with metadata containers, and always into code. A table meets in the middle.",
    tradeoff: "I wanted the writing experience to be completely fluid. It is not quite the same as writing in a document.",
    result: "Cells become fungible objects. \"speed = 75 km/h\" can be tokenized and updated through other tools, requirements link to verification tests, and decomposition from broad to specific is visible. Sources regularly exceed 1000 requirements, so filtering, bulk actions and performance were mandatory.",
    visual: <MediaSlot ratio="16/10" caption="Requirements table &middot; 1000+ rows, interactive recreation" />,
  },
  {
    title: "Reversed: the commenting system",
    rejected: "The version I built. Threads on diagrams and tables, review comments and object comments as separate entities, reviews respecting the Git provider's setting for open threads.",
    why: "I assumed collaboration needed a discussion layer. I designed the whole workflow before questioning the premise.",
    tradeoff: "Design time on a workflow that did not ship as specified.",
    result: "Too convoluted to implement, and users were ambivalent. The async version control model was already doing the collaboration work. I had designed a synchronous-feeling layer on top of an async system.",
    visual: <MediaSlot ratio="3/4" width="55%" caption="The commenting system that did not ship" />,
  },
];

export const Sysgit = () => (
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

        <div className="font-display text-xl italic text-bone">Sysgit</div>
        <div>
          <span className="text-bone">Git for hardware.</span> Modeling, requirements and version control in one
          workflow, for engineers who are not developers.
        </div>

        <Rule />

        <MetaList
          items={[
            { label: "Role", value: <span className="text-bone">Design Lead, sole designer</span> },
            { label: "Timeline", value: "2023 - 2026" },
            { label: "Team", value: <span className="text-bone">1 designer (me)<br />6 engineers</span> },
            { label: "Scope", value: "Product, design system, research, strategy, brand, front-end PRs" },
            { label: "Platform", value: "Web, on-prem" },
          ]}
        />
      </>
    }
  >
    <MediaSlot ratio="16/9" caption="Diagram editor and IDE, side by side" />

    <SectionHeading>PROBLEM</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Systems engineering is a coordination problem, and it scales badly.</em>}>
      <div>
        Licenses are expensive and per-seat, so they limit who can even open the file. Teams work in different tools,
        with security gates between them, and no async version control. Formal reviews become long meetings where
        nobody can agree what the source of truth is.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">The tools are not neutral. They encode a process.</em>}>
      <div>
        Our founders came from SpaceX, where hardware ran on software practices. Version control, fast iteration,
        and systems engineering treated as something you revise continuously rather than something you approve
        once.
      </div>
      <div>
        Legacy manufacturers and their government customers work the other way, and their tooling encodes it. A
        tool with no async version control is not a neutral container. It assumes a process where the model gets
        approved rather than iterated, and it makes any other way of working expensive.
      </div>
      <div>
        The schedule is where that shows up. Falcon 9 took roughly four and a half years end to end. A new DoD
        capability typically takes eight to eleven. The F-35 has been in development since 2001.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">Bad design is only one reason this continues to be a problem.</em>}>
      <div>
        The legacy enterprise tools in this space won on procurement, not on product. Their vendors have been very
        effective at securing government contracts structured so that anyone on certain programs has to use their
        software. That relationship is the moat, and UX was never the thing that won it.
      </div>
      <div>
        It is also genuinely hard. Interoperability, security and flexibility are difficult to solve together.
      </div>
      <div>
        The reason that took me longest to see: these tools are complicated enough that operating them has become
        the job. In defense especially, that complexity is job security. Resistance is not a usability problem.
      </div>
    </TwoCol>

    <SectionHeading>CONSTRAINTS</SectionHeading>
    <Rule className="mb-6" />
    <ConstraintGrid
      items={[
        {
          title: "Security, on-prem by default",
          detail:
            "The working question is what this looks like on an old Dell running Windows XP. A customer may hold a FedRAMP level while individual users inside it hold different clearances and still need to share artifacts. It is freeing, in a way. No bespoke filetypes, no flashy workflows. Assume everything ends up in a PDF or in slides. It also means a good portion of our usage cannot phone home, so we are partly blind by design.",
        },
        {
          title: "A language I cannot change",
          detail:
            "SysML v2 is not great. Its governing body has said plainly that interpretation is up to the community, and everyone is risk-averse about being the one to define it. So I sometimes ship contexts that are non-ideal and not completely human friendly, because that is the literal wording of the spec. I have argued for translating it and lost that argument more than once.",
        },
        {
          title: "Two cohorts, one artifact",
          detail:
            "The systems engineer is often the only person in the building fluent in Git. The stakeholders who validate their models are not, and should not have to be.",
        },
        {
          title: "Scale",
          detail:
            "Requirement sources regularly exceed 1000 items, so filtering, bulk actions and raw performance are table stakes rather than features.",
        },
      ]}
    />

    <SectionHeading>INSIGHT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock
      quote="One less tool beats one task done perfectly."
      source="From 30+ interviews with systems engineers, reached by embedding myself in our RevOps process rather than waiting for research to be scheduled."
    />
    <MediaSlot ratio="16/9" caption="Where the tool sits in a customer&rsquo;s stack" />

    <TwoCol claim={<em className="font-display not-italic">I went in holding a rule every designer is taught, and had to abandon it.</em>}>
      <div>
        Solve one problem really well. I pushed hard on it early, then had to stop and treat the problem as an
        ecosystem instead.
      </div>
      <div>
        The reason is procurement, not craft. Customers run several tools with several integrations and have to
        justify every seat they buy.
      </div>
      <div>
        This is why Sysgit covers both modeling and requirements management rather than nailing either one alone.
      </div>
    </TwoCol>

    <SectionHeading>DECISIONS</SectionHeading>
    <Rule className="mb-6" />
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
            "In two years: the diagramming tool, requirements table, IDE, CSV upload, views and filters, diffing in code, table and graph form, reviews, branching and merging, and integrations with GitHub, GitLab, Gitea and Forgejo. Every feature is in use by someone. Nothing sat on a shelf.",
        },
        {
          title: "How we measure it",
          detail:
            "Acquisition. This market is governed by procurement and adverse incentives rather than usability. The meaningful question is whether organizations already locked into a legacy tool bought anyway. The US Air Force, Leidos, GTRI, Tradewinds and Constellr did, from a company of seven.",
        },
      ]}
    />
    <MediaSlot ratio="16/9" caption="Shipped surface area, 2023 &ndash; 2026" />

    <p className="mb-6">
      The diagram and IDE pairing draws the most positive feedback and the most requested upgrades. That is
      anecdotal, and I would not present it as anything else.
    </p>

    <SectionHeading>REFLECTION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">I would have got into RevOps much sooner.</em>}>
      <div>
        It is far more powerful to say that a feature will push a $400K deal over the finish line than to argue it on
        its merits. Learning to make the case in revenue changed what I could get built.
      </div>
      <div>
        Some of our blindness is structural, since on-prem deployments cannot report back. The rest is that we have
        not gotten to it. I would like to know which screens people live in, for how long, and what they are
        actually querying.
      </div>
    </TwoCol>
    <TwoCol claim={<em className="font-display not-italic">The thing I still think about.</em>}>
      <div>
        The question that came up constantly, from users who were learning this as they went, was &ldquo;what should
        our standard operating procedure be?&rdquo; Nobody has defined how SysML v2 should actually be used. Its
        governing body handed that to the community.
      </div>
      <div>
        We were in a unique position to set that standard and we were too cautious to take it. That is the piece of
        work I did not get to do.
      </div>
    </TwoCol>

    <PrevNext next={{ label: "Originality", to: "/case-study/originality" }} />
  </CvPage>
);
