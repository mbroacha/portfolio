/**
 * Sysgit: product overview, not a case study.
 *
 * Rewritten 2026-11-07. The case study version carried detail that cannot sit
 * on a public page, so this page argues what the product is for and shows it.
 * The process narrative lives in a private document held outside this repo.
 *
 * Scope rule for anything added here: describe the product's purpose and its
 * market, not how a customer runs it or how it behaves when something goes
 * wrong. Every drawn artifact uses the published demo model or synthetic
 * content. If a change needs more than that, it belongs in the private
 * document instead.
 */

import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { SiteRail } from "../components/cv/SiteRail";
import { MediaSlot, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { InsightBlock, PrevNext, QualOutcome, TwoCol } from "../components/cv/CaseStudyParts";
import { CustomerStackDiagram } from "../components/case-study/CustomerStackDiagram";
import { RequirementsTableRecreation } from "../components/case-study/RequirementsTableRecreation";
import { SysgitGoals } from "../components/case-study/SysgitGoals";
import { SysgitHero } from "../components/case-study/SysgitHero";
import { TranslationTriptych } from "../components/case-study/TranslationTriptych";

export const Sysgit = () => (
  <CvPage sidebar={<SiteRail scope="sysgit" />}>
    <PageHead
      title="Sysgit"
      lede={
        <>
          <span className="text-bone">Git for hardware.</span> Modeling, requirements and version control in one
          workflow, for engineers who are not developers.
        </>
      }
      items={[
        { label: "Role", value: <span className="text-bone">Design Lead, sole designer</span> },
        { label: "Timeline", value: "2023 - 2026" },
        { label: "Team", value: <span className="text-bone">1 designer (me)<br />6 engineers</span> },
        { label: "Scope", value: "Product, design system, research, strategy, brand, front-end PRs" },
        { label: "Page", value: "Overview. Detail available on request" },
      ]}
    />

    <SysgitHero />

    <SectionHeading>THE PRODUCT</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Three jobs that are normally three purchases.</em>}>
      <div>
        A systems engineer describes a machine: what its parts are, what each one has to do, and how a change to one
        propagates to the rest. Today that work is split across a modeling tool, a requirements tool and whatever
        stands in for version control.
      </div>
      <div>
        Sysgit puts them in one place. A diagram editor and a code editor over the same model, a requirements table
        that behaves like a document, and branch, review and merge in language an engineer already uses.
      </div>
    </TwoCol>

    <SectionHeading>WHY IT EXISTS</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Systems engineering is a coordination problem, and it scales badly.</em>}>
      <div>
        Licenses are expensive and per-seat, so they limit who can even open the file. Teams work in different tools
        with gates between them. Formal reviews become long meetings where nobody can agree what the source of truth
        is.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">The tools are not neutral. They encode a process.</em>}>
      <div>
        Our founders came from SpaceX, where hardware ran on software practices: version control, fast iteration, and
        systems engineering treated as something you revise continuously rather than something you approve once.
      </div>
      <div>
        Legacy manufacturers and their government customers work the other way, and their tooling encodes it. A tool
        without async version control assumes a process where the model gets approved rather than iterated, and it
        makes any other way of working expensive.
      </div>
      <div>
        The schedule is where that shows up. Falcon 9 took roughly four and a half years end to end. A new DoD
        capability typically takes eight to eleven. The F-35 has been in development since 2001.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">Bad design is only one reason this persists.</em>}>
      <div>
        The legacy enterprise tools in this space won on procurement, not on product. Their vendors have been very
        effective at securing government contracts structured so that anyone on certain programs has to use their
        software. That relationship is the moat, and UX was never the thing that won it.
      </div>
      <div>
        It is also genuinely hard. Interoperability, security and flexibility are difficult to solve together.
      </div>
      <div>
        The reason that took me longest to see: these tools are complicated enough that operating them has become the
        job. Resistance is not a usability problem.
      </div>
    </TwoCol>

    <SectionHeading>GOALS</SectionHeading>
    <Rule className="mb-6" />
    <SysgitGoals />

    <SectionHeading>THE ARGUMENT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock
      quote="One less tool beats one task done perfectly."
      source="From 30+ interviews with systems engineers, reached by embedding myself in our RevOps process rather than waiting for research to be scheduled."
    />
    <CustomerStackDiagram />

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

    <SectionHeading>WHAT IT LOOKS LIKE</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">In hardware modeling, a square is not a square.</em>}>
      <div>
        It carries model metadata, and position and lines have specific meaning. The same object has to read as a
        picture, as a document and as code, for people who think visually and people who think in code.
      </div>
    </TwoCol>
    <TranslationTriptych />
    <MediaSlot
      ratio="16/9"
      src="/case-studies/sysgit/diagram-editor-ide.png"
      alt="The Sysgit diagram editor beside the code editor, showing the same model object in both."
      caption="Diagram editor and IDE, side by side &middot; capture, demo model"
    />
    <TwoCol claim={<em className="font-display not-italic">Requirements arrive as documents. They have to leave as objects.</em>}>
      <div>
        Their meaning comes from numbering and indentation, and they are frequently government-issued. A table meets
        in the middle: cells become objects that can be linked, filtered and tokenized, and decomposition from broad
        to specific stays visible.
      </div>
    </TwoCol>
    <RequirementsTableRecreation />

    <SectionHeading>WHERE IT LANDED</SectionHeading>
    <Rule className="mb-6" />
    <QualOutcome
      items={[
        {
          title: "What shipped",
          detail:
            "In two years: the diagramming tool, the requirements table, the IDE, views and filters, diffing, and reviews with branching and merging. Every feature is in use by someone. Nothing sat on a shelf.",
        },
        {
          title: "How we measure it",
          detail:
            "Acquisition. This market is governed by procurement and adverse incentives rather than usability. The meaningful question is whether organizations already locked into a legacy tool bought anyway. The US Air Force, Leidos, GTRI, Tradewinds and Constellr did, from a company of seven.",
        },
      ]}
    />

    <SectionHeading>THE OPEN QUESTION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Nobody has defined how SysML v2 should actually be used.</em>}>
      <div>
        Its governing body handed that to the community, and the question I heard constantly from users learning the
        language as they went was what their standard operating procedure should be.
      </div>
      <div>
        We were in a unique position to set that standard and we were too cautious to take it. That is the piece of
        work I did not get to do.
      </div>
    </TwoCol>

    <PrevNext next={{ label: "Originality", to: "/case-study/originality" }} />
  </CvPage>
);
