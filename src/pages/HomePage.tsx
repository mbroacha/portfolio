import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SysgitHero } from "../components/case-study/SysgitHero";
import { BeaconHeroB } from "../components/case-study/BeaconHeroB";
import { OriginalityHero } from "../components/case-study/OriginalityHero";
import { CvPage } from "../components/cv/CvPage";
import { PlayWhenVisible } from "../components/cv/PlayWhenVisible";
import { Rule, SectionHeading, MediaSlot, WorkEntry } from "../components/cv/CvPrimitives";
import { asset } from "../lib/asset";
import { SERIES } from "../data/series";

interface Work {
  id: string;
  title: string;
  to: string;
  meta: ReactNode;
  description: string;
  media: ReactNode;
}

/**
 * The work list. Order is set by SERIES (below), not by this array.
 *
 * Sysgit leads. It is the only project where Morgan was the entire design
 * function, it carries the strongest artifacts, and a reader who bounces after
 * one entry should have seen that one.
 */
const ENTRIES: Work[] = [
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
        <SysgitHero bare playTwice />
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
      "The first platform of its kind for coordinating satellite conjunctions. Lead designer, and co\u2011owner of product strategy.",
    media: (
      <MediaSlot
        ratio="16/9"
        matted={false}
        alt="Two satellite tracks converge. A threshold ring draws around the operator's own asset, and the second track lifts away from it as a proposed maneuver."
      >
        <BeaconHeroB bare playTwice />
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
        Education, Machine Learning &middot; Shipped 2019
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
        <OriginalityHero bare playTwice />
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
      // Framed like the three above it: a bordered 16:9 slot on the media
      // fill the hero components paint. The PNG is a transparent portrait, so
      // it is contained and padded off the frame edge rather than cropped.
      <MediaSlot
        ratio="16/9"
        matted={false}
        alt="Three phones in perspective: an assignment list with due dates, the question mapping screen over a scanned page, and a submitted assignment."
      >
        <div className="h-full w-full p-4 sm:p-6" style={{ backgroundColor: "var(--surface-media-backdrop)" }}>
          <img
            src={asset("/case-studies/gradescope/screens-perspective.webp")}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full bg-transparent object-contain"
          />
        </div>
      </MediaSlot>
    ),
  },
];

/** Display order comes from src/data/series.ts, shared with each case study's
    previous and next links, so the list and the chain cannot drift apart. */
const WORK: Work[] = SERIES.map((e) => {
  const w = ENTRIES.find((x) => x.id === e.id);
  if (!w) throw new Error(`No homepage entry for series id "${e.id}"`);
  return w;
});

export const HomePage = () => {
  return (
    <CvPage scope="global" intro>
      {/* Every other page names itself in PageHead's h1. The homepage's
          visible identity is the name in the rail and header, which is a link,
          not a heading, so a screen reader jumping by heading found only
          "Selected work". This gives the outline its top without adding a
          visible title the layout never had. */}
      <h1 className="sr-only">Morgan Broacha, product designer</h1>

      <SectionHeading>Selected work</SectionHeading>
      <Rule className="mb-6" />

      {WORK.map((w, i) => (
        // Each entry carries its project's color (--project-<id> in tokens.css):
        // the title underline and focus ring take it through [data-project].
        <div
          key={w.id}
          data-project={w.id}
          style={{ "--project": `var(--project-${w.id})` } as React.CSSProperties}
        >
          {i > 0 ? <Rule className="mb-6" /> : null}
          {/* The image is a second way into the case study, not a second tab
              stop: keyboard users already have the title link right below.
              Screen readers still hear the image's alt as the link's name. */}
          <Link
            to={w.to}
            tabIndex={-1}
            // The frame's border lights up in the project's color on hover.
            className="block no-underline [&:hover_.cv-frame]:border-[color:var(--project)]"
          >
            <PlayWhenVisible>{w.media}</PlayWhenVisible>
          </Link>
          <WorkEntry index={i + 1} title={w.title} to={w.to} meta={w.meta} description={w.description} />
        </div>
      ))}
    </CvPage>
  );
};
