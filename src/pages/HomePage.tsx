import type { ReactNode } from "react";
import { SysgitHero } from "../components/case-study/SysgitHero";
import { BeaconHeroB } from "../components/case-study/BeaconHeroB";
import { OriginalityHero } from "../components/case-study/OriginalityHero";
import { CvPage } from "../components/cv/CvPage";
import { Rule, SectionHeading, MediaSlot, WorkEntry } from "../components/cv/CvPrimitives";
import { asset } from "../lib/asset";

interface Work {
  id: string;
  title: string;
  to: string;
  meta: ReactNode;
  description: string;
  media: ReactNode;
}

/**
 * The work list, in display order.
 *
 * Sysgit leads. It is the only project where Morgan was the entire design
 * function, it carries the strongest artifacts, and a reader who bounces after
 * one entry should have seen that one.
 */
const WORK: Work[] = [
  {
    id: "sysgit",
    title: "Sysgit",
    to: "/case-study/sysgit",
    meta: (
      <>
        Design Lead and sole designer
        <br />
        Systems engineering &middot; 2023 &ndash; 2026
      </>
    ),
    description:
      "Git for hardware. I own product design, the design system, research, competitive analysis, strategy, and brand.",
    media: (
      <MediaSlot
        ratio="16/9"
        matted={false}
        alt="One object from a Sysgit model, drawn: a part def carrying a typed value, a maximum output and a link to the test that verifies it, joined to the rest of the graph by derive, contains and satisfies relationships."
      >
        <SysgitHero bare />
      </MediaSlot>
    ),
  },
  {
    id: "beacon",
    title: "Beacon",
    to: "/case-study/beacon",
    meta: (
      <>
        <span className="italic">Slingshot Aerospace</span>, Senior Product Designer
        <br />
        Aerospace &middot; Shipped 2023
      </>
    ),
    description:
      "The first platform of its kind for coordinating satellite conjunctions. Lead designer, and co-owner of product strategy.",
    media: (
      <MediaSlot
        ratio="16/9"
        matted={false}
        alt="Two satellite tracks converge. A threshold ring draws around the operator's own asset, and the second track lifts away from it as a proposed maneuver."
      >
        <BeaconHeroB bare />
      </MediaSlot>
    ),
  },
  {
    id: "originality",
    title: "Originality",
    to: "/case-study/originality",
    meta: (
      <>
        <span className="italic">Turnitin</span>, Senior UX Designer
        <br />
        Education &middot; Shipped 2019
      </>
    ),
    description:
      "Originality reveals signs that a student's paper was written by someone else. Lead designer of core detection workflow and design system.",
    media: (
      <MediaSlot
        ratio="16/9"
        matted={false}
        alt="A student submission beside eight detection signals, ranked by what actually persuaded an educator: file metadata above the algorithm's linguistic analysis."
      >
        <OriginalityHero bare />
      </MediaSlot>
    ),
  },
  {
    id: "gradescope",
    title: "Gradescope Mobile",
    to: "/case-study/gradescope-mobile",
    meta: (
      <>
        <span className="italic">Gradescope</span>, Senior UX Designer
        <br />
        Education &middot; Launched 2021
      </>
    ),
    description:
      "Scan and submit handwritten homework from your phone. I'll tell you why it didn't work.",
    media: (
      <MediaSlot
        ratio="16/9"
        fit="contain"
        matted={false}
        bordered={false}
        src={asset("/case-studies/gradescope/screens-perspective.webp")}
        alt="Three phones in perspective: an assignment list with due dates, the question mapping screen over a scanned page, and a submitted assignment."
      />
    ),
  },
];

export const HomePage = () => {
  return (
    <CvPage scope="global">

      <SectionHeading>SELECTED WORK</SectionHeading>
      <Rule className="mb-6" />

      {WORK.map((w, i) => (
        <div key={w.id}>
          {i > 0 ? <Rule className="mb-6" /> : null}
          {w.media}
          <WorkEntry index={i + 1} title={w.title} to={w.to} meta={w.meta} description={w.description} />
        </div>
      ))}
    </CvPage>
  );
};
