import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { MetaList, Rule, SectionHeading, MediaSlot, WorkEntry } from "../components/cv/CvPrimitives";

const education = [
  { degree: "Master of Human-Computer Interaction", school: "Carnegie Mellon University" },
  { degree: "BA in Chinese, Economics, and Philosophy", school: "University of Pittsburgh" },
];

const employment = [
  { company: "Sysgit", role: "Design Lead", years: "2023 - 2026" },
  { company: "Slingshot Aerospace", role: "Senior Product Designer", years: "2022 - 2023" },
  { company: "Turnitin", role: "Senior UX Designer", years: "2018 - 2022" },
  { company: "Eaton", role: "UX Designer", years: "2018" },
  { company: "Vitech", role: "Product Manager", years: "2015 - 2017" },
  { company: "Epic", role: "QA & UX Research", years: "2013 - 2015" },
];

/** Carried over from the Greenhouse proof strip. Best copy on the old homepage. */
const fieldwork = [
  "Research in level-1 ER trauma centers",
  "Yellowstone field studies",
  "Onsite at rocket launches",
  "Embedded in underfunded schools",
];

const Sidebar = () => (
  <>
    <div className="flex items-center gap-2.5">
      <div className="grid h-5 w-5 place-items-center border border-[color:var(--edge)] text-[10px] text-lichen">
        M
      </div>
      <div className="font-display text-xl italic tracking-[0.5px] text-bone">Morgan Broacha</div>
    </div>

    <Rule className="mt-2" />

    <div className="flex flex-col gap-4">
      <div className="text-bone">CRAFT FOR HARD TECH</div>
      <div>
        I&rsquo;m a product designer in Oakland, CA with over a decade of experience in UX design, interaction
        design, and product strategy. I bring craft to complicated systems, in domains where being wrong is
        expensive: health records, academic integrity, aerospace collision avoidance, and systems engineering.
      </div>
      <div>
        I&rsquo;m currently the sole designer at{" "}
        <a href="https://sysgit.io" target="_blank" rel="noopener noreferrer" className="underline">
          Sysgit
        </a>
        , where I own the product, the design system, and the brand. I prototype in code and ship my own
        front-end PRs.
      </div>
      <div className="flex flex-col gap-0.5">
        <Link to="/how-i-work" className="underline">
          How I work
        </Link>
        <a href="mailto:hello@morganbroacha.com" className="underline">
          Email
        </a>
        <a href="https://www.linkedin.com/in/morganbroacha/" target="_blank" rel="noopener noreferrer" className="underline">
          LinkedIn
        </a>
      </div>
    </div>

    <Rule />
    <div className="font-display text-base italic text-bone">BACKGROUND</div>

    <MetaList
      items={[
        {
          label: "Education",
          value: (
            <div className="flex flex-col gap-5">
              {education.map((e) => (
                <div key={e.school}>
                  {e.degree}
                  <br />
                  {e.school}
                </div>
              ))}
            </div>
          ),
        },
        {
          label: "Employment",
          value: (
            <div className="flex flex-col gap-5">
              {employment.map((e) => (
                <div key={e.company}>
                  {e.company}
                  <br />
                  {e.role}
                  <br />
                  {e.years}
                </div>
              ))}
            </div>
          ),
        },
        {
          label: "Fieldwork",
          value: (
            <div className="flex flex-col gap-2">
              {fieldwork.map((f) => (
                <div key={f}>{f}</div>
              ))}
            </div>
          ),
        },
      ]}
    />
  </>
);

export const HomePage = () => (
  <CvPage sidebar={<Sidebar />}>
    <SectionHeading>WORK</SectionHeading>
    <Rule className="mb-6" />

    <MediaSlot
      ratio="16/9"
      src="/case-studies/originality/authorship-banner.png"
      alt="Turnitin authorship dashboard with submissions table and trend cards."
    />
    <WorkEntry
      index={1}
      title="Originality"
      to="/case-study/originality"
      meta={
        <>
          <span className="italic">Turnitin</span>, Senior UX Designer
          <br />
          Academic integrity &middot; Shipped 2018
        </>
      }
      description="Originality reveals signs that a student's paper was written by someone else, but educators couldn't act on what they saw. I redesigned the core detection workflow so that a signal became a decision."
    />

    <Rule className="mb-6" />

    <MediaSlot ratio="16/9" caption="Sysgit &middot; artifact pending" />
    <WorkEntry
      index={2}
      title="Sysgit"
      to="/case-study/sysgit"
      meta={
        <>
          <span className="italic">Sysgit</span>, Design Lead and sole designer
          <br />
          Systems engineering &middot; 2023 &ndash; 2026
        </>
      }
      description="Git for hardware. Modeling, requirements, and version control in one workflow, for engineers who are not developers. I own product design, the design system, research, competitive analysis, strategy, and brand."
    />

    <Rule className="mb-6" />

    <MediaSlot ratio="3/4" width="55%" caption="Beacon &middot; artifact pending" />
    <WorkEntry
      index={3}
      title="Beacon"
      to="/case-study/beacon"
      meta={
        <>
          <span className="italic">Slingshot Aerospace</span>, Senior Product Designer
          <br />
          Aerospace &middot; 2022 &ndash; 2023
        </>
      }
      description="The first collision avoidance platform in the aerospace industry. Sole designer, collaborating on product strategy."
    />
  </CvPage>
);
