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
    title: "Operator-set thresholds, median default",
    rejected: "A single fixed threshold for everyone.",
    why: "Nobody knows an operator's real risk tolerance better than the operator. A cubesat on a research grant and a commercial constellation do not agree on what counts as too close.",
    tradeoff: "I could also see what would cause alert fatigue, and a fully open default would have produced it. A median default is wrong for everyone at the extremes.",
    result: "Operators tune to their own posture, and the ones who never touch the setting still get something survivable.",
    visual: <MediaSlot ratio="16/9" caption="Threshold settings &middot; dummy data" />,
  },
  {
    title: "Suggest, never act",
    rejected: "Automated maneuvering, and arbitrating who moves.",
    why: "Beacon proposes when and how to move, refined by maneuverability data if the operator chooses to share it. At no point was it in scope to touch anyone's asset. In a system where the failure is physical and irreversible, the operator keeps the verdict.",
    tradeoff: "It leaves the hardest part of the problem, deciding who yields, with the humans who were already struggling with it.",
    result: "Operators trusted it with their data because it could not act on their behalf. Declining to arbitrate is what made the rest possible.",
    visual: <MediaSlot ratio="16/9" caption="Conjunction detail and proposed maneuver &middot; dummy data" />,
  },
  {
    title: "Interpret the data, never hide it",
    rejected: "A raw CDM ingest, and a black-box risk score.",
    why: "CDMs are dense and unfriendly. We could compare values across them and weight by an operator's own thresholds, which raw ingest cannot do. But a weighting is an editorial position on someone else's risk model, so the source data always stays one click away.",
    tradeoff: "Any prioritization we apply is a judgment we are making on their behalf.",
    result: "To work out what mattered, I printed CDMs and had subject matter experts circle exactly what they looked at during core decision points. That is what let us cut the chaff without guessing.",
    visual: <MediaSlot ratio="3/4" width="55%" caption="Annotated CDM printout from an SME session" />,
  },
  {
    title: "Abandoned: one product for everyone",
    rejected: "The version I shipped first. A single product, including a chat feature so operators would stop hunting for each other's contact details.",
    why: "The contact problem was real and chat was the obvious fix. It was not the fix for everyone.",
    tradeoff: "Development time on a feature the largest operators would never open.",
    result: "SpaceX had no interest in chat and would not respond to it. They wanted an automated reply along the lines of we know it is close, these are our thresholds, we will move if we think it is too close. So I built separate automation for enterprise operators, and a heavily redacted workflow for the DoD where they alert us and we tell the other operator that for classified reasons they need to move. Both started as white-glove services I ran by hand, then folded into the product.",
    visual: <MediaSlot ratio="16/10" caption="Enterprise automation and the redacted DoD path" />,
  },
];

export const Beacon = () => (
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

        <div className="font-display text-xl italic text-bone">Beacon</div>
        <div>
          <span className="text-bone">Space traffic coordination.</span> When two satellites are about to pass too
          close, somebody has to move.
        </div>

        <Rule />

        <MetaList
          items={[
            { label: "Role", value: <span className="text-bone">Senior Product Designer, sole designer on Beacon</span> },
            { label: "Timeline", value: "2022 - 2023" },
            { label: "Team", value: "7 engineers. Part of a company design team with a shared system" },
            { label: "Scope", value: "Product design, research, product strategy" },
            { label: "Platform", value: "Web" },
          ]}
        />
      </>
    }
  >
    <MediaSlot ratio="16/9" caption="Conjunction dashboard &middot; dummy data" />

    <SectionHeading>PROBLEM</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Avoiding a collision meant scrambling for someone&rsquo;s phone number.</em>}>
      <div>
        The workflow before Beacon was insanely variable. No two operators had the same depth of information about
        their own assets, and many did not know where their satellites were half the time. Most of what everyone
        relied on lived in a public, honor-system catalog.
      </div>
      <div>
        Resolution was calling the other operator and trying to work out which of you was more capable of moving out
        of the way.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">The capability gap was the real problem.</em>}>
      <div>
        Large operators like SpaceX had automated systems that alerted other operators and moved their own
        satellites. Everyone else had to figure out a plan on the spot.
      </div>
      <div>
        So Beacon is not really about detection. It is about giving the long tail of operators a coordination
        capability that only the largest players had, in a domain where the failure mode is physical and
        permanent.
      </div>
    </TwoCol>

    <SectionHeading>CONSTRAINTS</SectionHeading>
    <Rule className="mb-6" />
    <ConstraintGrid
      items={[
        {
          title: "No prior design language at all",
          detail:
            "This was the first platform of its kind, so there was no interface convention to borrow and no incumbent habit to design toward. I anchored to the only thing that existed: CDMs and ephemerides, which are extremely dense, and low-tech reports from satellites and ground stations. When there is no precedent, the data model becomes the constraint.",
        },
        {
          title: "Wildly uneven data quality",
          detail:
            "One operator has precise ephemerides and a maneuver plan. The next has a public catalog entry and a guess. The product has to be useful at both ends without implying the two are equally reliable.",
        },
        {
          title: "A user range with no middle",
          detail:
            "Users range from grad school research projects with a single asset to startups, to SpaceX, to Space Force and DoD teams operating highly sensitive vehicles. They all use the same product, and the extremes have almost nothing in common.",
        },
        {
          title: "Assets nobody can talk about",
          detail:
            "Some users cannot disclose what they operate, where it is, or why it needs to move. Anything I designed had to work without that information ever entering the system.",
        },
      ]}
    />

    <SectionHeading>INSIGHT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock
      quote="You cannot mandate disclosure. You can make it reciprocal."
      source="From operator interviews and work with our in-house astrophysics team."
    />
    <TwoCol claim={<em className="font-display not-italic">Position is not the sensitive part. Capability is.</em>}>
      <div>
        Operators do not really have a choice about position. Ground sensor networks see your assets whether you
        like it or not, and sharing that helps everyone, because nobody wants to hit anyone.
      </div>
      <div>
        What is actually sensitive is capability. Your risk thresholds, and whether your asset can maneuver at all.
        So I built those as optional signals rather than requirements.
      </div>
      <div>
        The part that made it work: operators became more willing to share once they could see what others had
        shared in turn.
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
          title: "Adoption",
          detail:
            "By the time I left, Beacon was used by operators representing roughly 60% of assets on orbit, including SpaceX, NASA, Inmarsat and Endurosat. SpaceX is a large share of that figure on its own, and the number is a share of assets rather than of operators.",
        },
        {
          title: "The unintended one",
          detail:
            "Beacon became the de facto source of truth for satellite capabilities, more trusted than the public catalog it sat alongside. Optional, visible, reciprocal disclosure produced better data than an honor-system registry. We did not set out to replace it.",
        },
      ]}
    />
    <MediaSlot ratio="16/9" caption="Coverage and shared-signal adoption over time" />
    <SectionHeading>REFLECTION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">I let the interface get ahead of the information architecture.</em>}>
      <div>
        There was a push from other product teams to make Beacon look especially cutting edge. I went along with it.
      </div>
      <div>
        I wish I had pushed back and spent that effort on the structure instead. In a product whose whole job is
        making dense, uneven data legible under time pressure, the architecture was the thing worth polishing.
      </div>
    </TwoCol>
    <TwoCol claim={<em className="font-display not-italic">The question I never got to answer.</em>}>
      <div>
        Operators asked constantly: what should we do? What should our standard operating procedure be? For most of
        them this was a genuinely new discipline and there was no established practice to follow.
      </div>
      <div>
        We were in a unique position to set that standard. I still think about the fact that we did not.
      </div>
    </TwoCol>

    <PrevNext prev={{ label: "Sysgit", to: "/case-study/sysgit" }} next={{ label: "Originality", to: "/case-study/originality" }} />
  </CvPage>
);
