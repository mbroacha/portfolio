import type { ReactNode } from "react";
import { CvPage } from "../components/cv/CvPage";
import { Rule, SectionHeading, MediaSlot, WorkEntry } from "../components/cv/CvPrimitives";
import { useLens } from "../lib/useLens";
import { SiteRail } from "../components/cv/SiteRail";

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
    id: "what-i-do",
    title: "What I Do",
    to: "/what-i-do",
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

export const HomePage = () => {
  const { order } = useLens();
  const shown = order
    .map((id) => WORK.find((w) => w.id === id))
    .filter((w): w is Work => Boolean(w));

  return (
    <CvPage sidebar={<SiteRail scope="global" />}>

      <SectionHeading>SELECTED WORK</SectionHeading>
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
