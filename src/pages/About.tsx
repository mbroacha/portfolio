import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { Jackalope } from "../components/cv/Jackalope";
import { MetaList, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { PhotoGrid } from "../components/cv/PhotoGrid";
import { TwoCol } from "../components/cv/CaseStudyParts";
import { education, employment } from "../data/background";
import { answerById } from "../lib/retrieval";

/**
 * About.
 *
 * The CV facts that used to sit in the homepage rail, plus the answer to the
 * question everybody actually wants answered. The photos come from the same
 * answer bank the interrogation field reads, so there is one copy of that
 * content rather than two that can drift apart.
 */
export const About = () => {
  const outside = answerById("cheeky-outside-work");

  return (
    <CvPage
      scope="global"
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

          <div className="font-display text-xl italic text-bone">About</div>
          <div>
            Product designer in Oakland, California. A decade in domains where being wrong is expensive.
          </div>

          <Rule />

          <MetaList
            items={[
              { label: "Hometown", value: "Green River, WY" },
              { label: "Now", value: <span className="text-bone">Design Lead at Sysgit</span> },
              { label: "Email", value: <a href="mailto:mbroacha@gmail.com" className="underline">mbroacha@gmail.com</a> },
              {
                label: "Elsewhere",
                value: (
                  <a
                    href="https://www.linkedin.com/in/morganbroacha/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    LinkedIn
                  </a>
                ),
              },
            ]}
          />
        </>
      }
    >
      <SectionHeading>BACKGROUND</SectionHeading>
      <Rule className="mb-6" />

      <MetaList
        items={[
          {
            label: "Education",
            value: (
              <div className="flex flex-col gap-5">
                {education.map((e) => (
                  <div key={e.school}>
                    <span className="text-bone">{e.degree}</span>
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
                    <span className="text-bone">{e.company}</span>
                    <br />
                    {e.role}
                    <br />
                    {e.years}
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />

      <div className="mb-8" />

      <SectionHeading>OUTSIDE WORK</SectionHeading>
      <Rule className="mb-6" />

      {outside ? (
        <TwoCol claim={<em className="font-display not-italic">{outside.a}</em>}>
          {outside.photos ? <PhotoGrid photos={outside.photos} /> : null}
        </TwoCol>
      ) : null}
    </CvPage>
  );
};
