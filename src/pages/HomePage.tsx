import { CaseStudyCard } from "../components/brand/CaseStudyCard";
import { Button } from "../components/brand/Button";
import { Eyebrow } from "../components/brand/Eyebrow";
import { SiteFooter } from "../components/layout/SiteFooter";
import { BodyLead, Display } from "../components/primitives/Typography";
import { commandCenterRiskModeling } from "../case-studies/command-center-risk-modeling";
import { originalityProject } from "../case-studies/originality-project";

const proofStrip = [
  "Research in level-1 ER trauma centers",
  "Yellowstone field studies",
  "Onsite at rocket launches",
  "Embedded in underfunded schools",
];

const caseStudies = [
  {
    eyebrow: "Enterprise · Case 01",
    title: commandCenterRiskModeling.title,
    description: commandCenterRiskModeling.subtitle,
    to: `/case-study/${commandCenterRiskModeling.slug}`,
  },
  {
    eyebrow: "Academic Integrity · Case 02",
    title: originalityProject.title,
    description: originalityProject.subtitle,
    to: "/case-study/originality",
    imageSrc: "/case-studies/originality/authorship-banner.png",
    imageAlt: "Turnitin authorship dashboard with submissions table and trend cards.",
  },
  {
    eyebrow: "Critical Infrastructure · Case 03",
    title: "Command surfaces for high-stakes review",
    description:
      "Workflow architecture for analysts balancing speed, traceability, and expert judgement under regulatory pressure.",
    to: `/case-study/${commandCenterRiskModeling.slug}`,
  },
];

export const HomePage = () => (
  <>
    <section className="border-b border-hedge bg-hero-gradient px-6 py-16 sm:px-10 sm:py-20 lg:px-gutter lg:py-[96px] lg:pb-[88px]">
      <Eyebrow tone="lichen" className="mb-7">
        Product designer — hard-tech & field-critical software
      </Eyebrow>
      <Display>
        I design systems that grow <span className="type-accent-turn">in hard places.</span>
      </Display>
      <BodyLead className="mt-8 max-w-[52ch]">
        B2B SaaS for aerospace, healthcare, and research teams — grounded in fieldwork from ER floors and
        Yellowstone backcountry to the launchpad.
      </BodyLead>
      <div className="mt-11 flex flex-wrap items-center gap-3.5">
        <Button to="/#work" variant="primary" className="!px-[26px] !py-4">
          See the work
        </Button>
        <Button href="/#about" variant="secondary" className="!px-[26px] !py-[15px]" showArrow>
          About
        </Button>
      </div>
    </section>

    <div className="proof-strip">
      {proofStrip.map((item) => (
        <div key={item} className="proof-strip__cell">
          {item}
        </div>
      ))}
    </div>

    <section id="work" className="border-b border-hedge px-6 py-[72px] sm:px-10 lg:px-gutter">
      <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="type-title--section">Selected work</h2>
        <Button to="/case-study/originality" variant="text" className="!text-xs">
          All case studies
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.eyebrow} {...study} />
        ))}
      </div>
    </section>

    <SiteFooter />
  </>
);
