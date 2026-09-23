import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { Jackalope } from "../components/cv/Jackalope";
import { MetaList, Rule, SectionHeading, MediaSlot, WorkEntry } from "../components/cv/CvPrimitives";
import { Interrogate } from "../components/query/Interrogate";
import { LensPrompt } from "../components/query/LensPrompt";
import { cn } from "../lib/cn";
import { useLens, type LensOption } from "../lib/useLens";

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

const Sidebar = ({ lens }: { lens: LensOption | null }) => (
  <>
    <div className="flex items-center gap-2.5">
      <Jackalope size={20} className="text-bone" />
      <div className="font-display text-xl italic tracking-[0.5px] text-bone">Morgan Broacha</div>
    </div>

    <Rule className="mt-2" />

    <div className="flex flex-col gap-4">
      <div className="text-bone">{lens ? lens.eyebrow : "CRAFT FOR HARD TECH"}</div>
      {lens ? <div className="text-bone">{lens.lead}</div> : null}
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

interface Work {
  id: string;
  title: string;
  to: string;
  meta: ReactNode;
  description: string;
  media: ReactNode;
}

/**
 * The work list, keyed by id so a lens can reorder it.
 *
 * Reordering, changing which entries appear, and swapping the bio lead are real
 * operations over real data. Small, but true. A lens that produced a page
 * nobody could tell apart would be theatre, and this is a portfolio for a design
 * role, so being caught at that costs more than not doing it.
 */
const WORK: Work[] = [
  {
    id: "originality",
    title: "Originality",
    to: "/case-study/originality",
    meta: (
      <>
        <span className="italic">Turnitin</span>, Senior UX Designer
        <br />
        Academic integrity &middot; Shipped 2018
      </>
    ),
    description:
      "Originality reveals signs that a student's paper was written by someone else, but educators couldn't act on what they saw. I redesigned the core detection workflow so that a signal became a decision.",
    media: (
      <MediaSlot
        ratio="16/9"
        src="/case-studies/originality/authorship-banner.png"
        alt="Turnitin authorship dashboard with submissions table and trend cards."
      />
    ),
  },
  {
    id: "sysgit",
    title: "Sysgit",
    to: "/case-study/sysgit",
    meta: (
      <>
        <span className="italic">Sysgit</span>, Design Lead and sole designer
        <br />
        Systems engineering &middot; 2023 &ndash; 2026
      </>
    ),
    description:
      "Git for hardware. Modeling, requirements, and version control in one workflow, for engineers who are not developers. I own product design, the design system, research, competitive analysis, strategy, and brand.",
    media: (
      <MediaSlot
        ratio="16/9"
        src="/case-studies/sysgit/hero-still.png"
        alt="One object from a Sysgit model, drawn: a part def carrying a typed value, a maximum output and a link to the test that verifies it, joined to the rest of the graph by derive, contains and satisfies relationships."
      />
    ),
  },
  {
    id: "how-i-work",
    title: "How I Work",
    to: "/how-i-work",
    meta: (
      <>
        <span className="italic">Practice</span>, design and front-end
        <br />
        One feature, end to end
      </>
    ),
    description:
      "One color feature from scope to merged PR, naming where each tool entered and where I refused to hand anything over. The model generates and enumerates. I judge.",
    media: <MediaSlot ratio="16/10" caption="Theme picker &middot; interactive recreation" />,
  },
  {
    id: "beacon",
    title: "Beacon",
    to: "/case-study/beacon",
    meta: (
      <>
        <span className="italic">Slingshot Aerospace</span>, Senior Product Designer
        <br />
        Aerospace &middot; 2022 &ndash; 2023
      </>
    ),
    description:
      "The first collision avoidance platform in the aerospace industry. Sole designer, collaborating on product strategy.",
    media: <MediaSlot ratio="3/4" width="55%" caption="Beacon &middot; artifact pending" />,
  },
  {
    id: "gradescope",
    title: "Gradescope Mobile",
    to: "/case-study/gradescope-mobile",
    meta: (
      <>
        <span className="italic">Gradescope</span>, one of two designers
        <br />
        Education &middot; Launched 2021
      </>
    ),
    description:
      "Scan and submit handwritten homework from your phone. It did not work, and the reasons are more interesting than the product. My only mobile work, and the only project where I designed alongside another designer as a peer.",
    media: <MediaSlot ratio="3/4" width="55%" caption="Gradescope Mobile &middot; artifact pending" />,
  },
];

/**
 * The two halves of the interface, together, as the first thing on the page.
 *
 * Declaring a lens shapes the page; the field answers a question. Different
 * jobs, but a reader meets them in the same moment, so they sit in one block
 * rather than being split across the layout. On the homepage the field does not
 * go in the rail: the rail is a long bio, and anything at the bottom of it is
 * below the fold on desktop and buried on mobile.
 *
 * Rendered twice, once for each breakpoint. Only one is ever visible, and both
 * read the same URL, so they cannot disagree.
 */
const Head = ({ className }: { className?: string }) => {
  const { lens, set, clear } = useLens();
  return (
    <div className={cn(className)}>
      <LensPrompt lens={lens} onSet={set} onClear={clear} />
      <Interrogate scope="global" className="mb-8" />
    </div>
  );
};

export const HomePage = () => {
  const { lens, order } = useLens();
  const shown = order
    .map((id) => WORK.find((w) => w.id === id))
    .filter((w): w is Work => Boolean(w));

  return (
    <CvPage sidebar={<Sidebar lens={lens} />} lead={<Head className="mb-2" />}>
      <Head className="hidden md:block" />

      <SectionHeading>WORK</SectionHeading>
      <Rule className="mb-6" />

      {shown.map((w, i) => (
        <div key={w.id}>
          {i > 0 ? <Rule className="mb-6" /> : null}
          {w.media}
          <WorkEntry index={i + 1} title={w.title} to={w.to} meta={w.meta} description={w.description} />
        </div>
      ))}
    </CvPage>
  );
};
