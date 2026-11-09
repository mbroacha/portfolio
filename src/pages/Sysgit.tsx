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
    <TwoCol claim={<em className="font-display not-italic">Three jobs that normally mean three very expensive software purchases.</em>}>
      <div>
        A systems engineer orchestrates hardware development: everything from materials to requirements to testing, all while wrangling several different teams. Today that work is split across a modeling tool, a requirements tool and whatever
        stands in for version control.
      </div>
      <div>
        Sysgit puts them all in one place. A diagram editor and a code editor over the same model, a requirements table
        that behaves like a document, and branch, review and merge in language an engineer already uses.
      </div>
    </TwoCol>
    <MediaSlot
      ratio="16/10"
      src="/case-studies/sysgit/split-editor.png"
      alt="The Sysgit split editor. SysML source on the left defining a power subsystem with an energy capacity and a maximum power output, and on the right the same model drawn as part definitions and linked requirement cards."
    />

    <SectionHeading>WHY IT EXISTS</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Systems engineering is a coordination problem, and it scales badly.</em>}>
      <div>
        Licenses are expensive and per-seat, so they limit who can even open a file. Teams work in different tools
        with gates between them. Formal reviews become long meetings where nobody can agree what the source of truth
        is.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">The existing tools reflect an outdated process.</em>}>
      <div>
        Our founders came from SpaceX, where hardware ran on software practices: version control, fast iteration, and
        systems engineering treated as something you revise continuously rather than something you approve once.
      </div>
      <div>
        Legacy manufacturers and government customers especially work the other way, and their tooling encodes it. A tool
        without async version control assumes a process where every step gets final approval rather than iterated, and it
        makes any other way of working expensive.
      </div>
      <div>
        The proof is in the project. Falcon 9 took roughly four and a half years end to end. A new DoD
        capability typically takes eight to eleven. The F-35 has been in development since 2001.
      </div>
    </TwoCol>

    <TwoCol claim={<em className="font-display not-italic">Bad design is only one reason this persists.</em>}>
      <div>
        Their vendors secured government contracts structured so that anyone on certain programs has to use their
        software. That relationship is the moat, not the product.
      </div>
      <div>
        It is also genuinely hard. Interoperability, security and flexibility are difficult to solve together.
      </div>
      <div>
        And the uncomfortable truth is, these  legacy tools are so complicated that operating them has become the
        job. Resistance and fear is the unspoken usability problem.
      </div>
    </TwoCol>

    <SectionHeading>GOALS</SectionHeading>
    <Rule className="mb-6" />
    <SysgitGoals />

    <SectionHeading>THE ARGUMENT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock
      quote="One less tool beats one task done perfectly."
    />
    <CustomerStackDiagram />

    <TwoCol claim={<em className="font-display not-italic">I went in holding a rule every designer is taught, and broke it.</em>}>
      <div>
        Solve one problem really well. I pushed hard on it early, then had to stop and treat the problem as an
        ecosystem instead.
      </div>
      <div>
        The reason is how these teams buy. Customers run several tools with several integrations and have to
        justify every seat.
      </div>
      <div>
        This is why Sysgit covers multiple jobs rather than nailing any one alone. It reveals cracks in a user process on a macro level.
      </div>
    </TwoCol>

    <SectionHeading>WHAT IT LOOKS LIKE</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">In hardware modeling, a box is not just a box.</em>}>
      <div>
        It carries model metadata, and position and lines have specific meaning. For different users, the same object has to read as a
        visual, as a document and as code.
      </div>
    </TwoCol>
    <TranslationTriptych />
    <MediaSlot
      ratio="16/9"
      src="/case-studies/sysgit/diagram-editor-ide.png"
      alt="The same rail brake requirements open in Sysgit, source on the left and the requirement graph on the right."
      caption="Those requirements in the product."
    />
    <TwoCol claim={<em className="font-display not-italic">Requirements arrive as documents. They have to leave as editable objects.</em>}>
      <div>
        The biggest challenge in this space is change management. Rather than constantly editing the same spreadsheet, individual objects are editable without affecting other users' work.
      </div>
    </TwoCol>
    <RequirementsTableRecreation />

    <SectionHeading>WHERE IT LANDED</SectionHeading>
    <Rule className="mb-6" />
    <QualOutcome
      items={[
        {
          title: "What has shipped",
          detail: (
            <>
              In two years: the diagramming tool, the requirements table, the IDE, views and filters, diffing, and reviews with branching and merging. Every feature is actively in use.
              <br /><br />
              Currently launching an in-house MCP and agent management.
            </>
          ),
        },
        {
          title: "How we measure it",
          detail:
            "Acquisition. This market is slow and the meaningful question is whether organizations already locked into a legacy tool bought anyway. We currently support US Air Force, Leidos, GTRI, Tradewinds and Constellr, among others.",
        },
      ]}
    />

    <SectionHeading>WHY DESIGN ACTUALLY MOVES</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">The same engineer uses a beautifully made tool at 10 am and one that peaked in 2004 at 11 am.</em>}>
      <div>
        The reference points are not other systems engineering tools. They are Miro, Google, Airtable: general
        purpose products doing structurally the same jobs, a canvas, a shared editor and a structured table, in
        markets that punished anything less than polish.
      </div>
      <div>
        Sysgit is those three surfaces for hardware. Every user already knows what good feels like in each of them,
        and that sets the bar whether or not this market has caught up.
      </div>
      <div>
        So there is no excuse. Nothing about security,
        interoperability or a dense specification requires the interaction model these tools still ship.
      </div>
    </TwoCol>

    <PrevNext next={{ label: "Originality", to: "/case-study/originality" }} />
  </CvPage>
);
