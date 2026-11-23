import { asset } from "../lib/asset";
import { BeaconHeroB } from "../components/case-study/BeaconHeroB";
import { BeaconSplash } from "../components/case-study/BeaconSplash";
import { CvPage } from "../components/cv/CvPage";
import { HeroReplay } from "../components/cv/HeroReplay";
import { PlayWhenVisible } from "../components/cv/PlayWhenVisible";
import { PageHead } from "../components/cv/PageHead";
import { MediaSlot, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import {
  ConstraintGrid,
  DecisionRow,
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
    tradeoff: "I could see what would cause alert fatigue, and an open default would have produced it. A median default is wrong for everyone at the extremes.",
    result: "Operators tune to their own posture, and the ones who never touch the setting still get something survivable.",
    visual: (
      <MediaSlot
        matted={false}
        ratio="auto"
        size={[1348, 1564]}
        width="44%"
        bleed
        src={asset("/case-studies/beacon/conjunction-history.webp")}
        alt="The latest conjunction data message, with time to closest approach, probability of collision, miss distance, speed, message age and source, above a conjunction history chart. Readings from two sources step upward over time toward an orange High PC threshold line."
      />
    ),
  },
  {
    title: "Suggest, never act",
    rejected: "Automated maneuvering, and arbitrating who moves.",
    why: "Beacon proposes when and how to move, refined by maneuverability data if the operator chooses to share it. Touching an operator's asset ourselves was never in scope, because being wrong meant a real physical consequence.",
    tradeoff: "It leaves the hardest part of the problem, deciding who yields, with the humans who were already struggling with it.",
    result: "Operators trusted it with their data because it could not act on their behalf. Declining to arbitrate is what made the rest possible.",
    visual: (
      <MediaSlot
        matted={false}
        bordered={false}
        ratio="auto"
        size={[1564, 1446]}
        width="62%"
        bleed
        src={asset("/case-studies/beacon/satellite-detail.png")}
        avif={asset("/case-studies/beacon/satellite-detail.avif")}
        alt="A satellite detail panel for Halcyon-3: catalog ID, international designator, type and country, orbit and mission parameters, and the operator's optional disclosures, maneuverable yes and power source solar plus Li-ion battery, with actions to view 13 events or add it to a watchlist."
      />
    ),
  },
  {
    title: "Interpret the data, never hide it",
    rejected: "A raw CDM ingest, and a black-box risk score.",
    why: "CDMs are dense and unfriendly. We could compare values across them and weigh by an operator's own thresholds, which a raw ingest cannot do. But a weighting is an editorial position on someone else's risk model, so the source data always stays one click away.",
    tradeoff: "Any prioritization we apply is a judgment we are making on their behalf.",
    result: "To work out what mattered, I printed CDMs and had subject matter experts circle exactly what they looked at during core decision points. That is what let us cut the chaff without guessing.",
  },
  {
    title: "Abandoned: one product for everyone",
    rejectedLabel: "Walked back",
    rejected: "The version I shipped first. A single product, including a chat feature so operators would stop hunting for each other's contact details.",
    why: "The contact problem was real and chat was the obvious fix. It was not the fix for everyone.",
    tradeoff: "Development time on a feature the largest operators would never open.",
    result: (
      <>
        <p>
          SpaceX had no interest in chat and would not respond to it. They wanted an automated reply along the lines
          of: we know it is close, these are our thresholds, we will move if we think it is too close.
        </p>
        <p>
          So I built separate automation for enterprise operators, and a heavily redacted workflow for the DoD where
          they alert us and we tell the other operator that for classified reasons they need to move.
        </p>
        <p>
          Both started as white-glove services I ran by hand. Running them manually first is what told me which parts
          were worth building, and both folded into the product.
        </p>
      </>
    ),
  },
];

export const Beacon = () => (
  <CvPage
    scope="beacon"
  >
    <PageHead
      title="Beacon"
      lede={
        <>
          <span className="text-primary">Space traffic coordination.</span> When two satellites are about to pass too close, somebody has to move.
        </>
      }
      items={[
        { label: "Role", value: <span className="text-primary">Senior Product Designer, sole designer on Beacon</span> },
        { label: "Timeline", value: "2022 - 2023" },
        { label: "Scope", value: "Product design, research, product strategy" },
        { label: "Platform", value: "Web" },
      ]}
    />

    <PlayWhenVisible>
      <HeroReplay>
        <BeaconHeroB playOnce />
      </HeroReplay>
    </PlayWhenVisible>

    <SectionHeading className="mt-12">Problem</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Avoiding a collision meant scrambling for someone&rsquo;s phone number.</em>}>
      <div>
        The workflow before Beacon was no workflow. No two operators have the same depth of information about
        their own assets; many did not know where their satellites are half the time. The only resource was a public, honor-system catalog.
      </div>
      <div>
        Resolution was finding a contact at the other operator and working out which of you was more capable of moving out
        of the way.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">The capability gap.</em>}>
      <div>
        Large operators like SpaceX have automated systems that alert other operators and move their own
        satellites. Everyone else has to figure out a plan on the spot.
      </div>
      <div>
        So Beacon is not about detection. It gives the long tail of operators a coordination capability only
        the largest players had.
      </div>
    </TwoCol>

    <BeaconSplash background={asset("/case-studies/beacon/bg-startrails.webp")} />

    <SectionHeading className="mt-12">Constraints</SectionHeading>
    <Rule className="mb-6" />
    <ConstraintGrid
      items={[
        {
          title: "No prior design language at all",
          detail:
            "This was the first platform of its kind, so there was no interface convention to borrow and no incumbent habit to design toward. I anchored to the only thing that existed: CDMs (conjunction data messages) and ephemerides, which are extremely dense, low-tech reports from satellites and ground stations. When there is no precedent, the data model becomes the constraint.",
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

    {/* The two sources the product was anchored to, since no interface
        precedent existed. Labelled, unlike the product captures: these are
        other people's documents, and a reader cannot be expected to know a
        conjunction message from an ephemeris on sight. */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_0.62fr]">
      <MediaSlot
        matted={false}
        ratio="16/9"
        src={asset("/case-studies/beacon/spacetrack.webp")}
        alt="A public conjunction message list: rows of close approaches, each with the time of closest approach, a minimum range in metres, a collision probability to ten decimal places, and the catalogue number, name, object type and radar cross-section of both objects."
      />
      <MediaSlot
        matted={false}
        ratio="3/4"
        fit="contain"
        src={asset("/case-studies/beacon/ephemeris.webp")}
        alt="An eleven-parameter ephemeris message from Intelsat, addressed to all stations operating at 302 degrees east, giving an epoch to the second and eleven orbital coefficients in degrees and degrees per day."
      />
    </div>

    <SectionHeading className="mt-12">Insight</SectionHeading>
    <Rule className="mb-6" />
    {/* Same shape as Originality's Insight: the finding is the claim, and the
        source and what followed from it sit beside it on the page's one grid. */}
    <TwoCol claim={<p className="m-0">You cannot mandate disclosure, but you can incentivize it.</p>}>
      <div className="text-tertiary">From operator interviews and work with our in-house astrophysics team.</div>
      <div className="text-primary">Position is not the sensitive part.</div>
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
        shared in turn. It was design by exposure.
      </div>
    </TwoCol>

    <SectionHeading className="mt-12">Decisions</SectionHeading>
    <Rule className="mb-6" />
    {decisions.map((d, i) => (
      <DecisionRow key={d.title} decision={d} first={i === 0} />
    ))}

    <SectionHeading className="mt-12">Outcome</SectionHeading>
    <Rule className="mb-6" />
    <QualOutcome
      items={[
        {
          title: "The unintended one",
          detail:
            "Beacon became the de facto source of truth for satellite capabilities, more trusted than the public catalog it sat alongside. Optional, visible, reciprocal disclosure produced better data than an honor-system registry. We did not set out to replace it.",
        },
        {
          title: "Adoption",
          detail:
            "Payload reported in March 2022 that the Beacon beta held data from 60% of companies operating in LEO. Slingshot's 2023 Year in Orbit report put it at over 90% of active LEO spacecraft, 6,000 satellites sharing data, and 160 million conjunction messages ingested to date. Those are two different denominators, companies and then spacecraft, and the second is the company's own figure published after I left. Operators on the platform included SpaceX, NASA, Inmarsat and Endurosat.",
        },
      ]}
    />
    <SectionHeading className="mt-12">Reflection</SectionHeading>
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

    <PrevNext series="beacon" />
  </CvPage>
);
