import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { SiteRail } from "../components/cv/SiteRail";
import { Bullets, Entry, Panel } from "../components/cv/CvPrimitives";
import { PhotoGrid } from "../components/cv/PhotoGrid";
import { education, employment } from "../data/background";
import { skills, tools } from "../data/skills";
import { answerById } from "../lib/retrieval";

/**
 * About.
 *
 * Two columns inside the content area: who she is on the left, the facts in
 * panels on the right. The rail is the site's navigation and stays untouched.
 *
 * The photos come from the same answer bank the field reads, so the page and
 * the answer cannot drift apart.
 */
export const About = () => {
  const outside = answerById("cheeky-outside-work");

  return (
    <CvPage sidebar={<SiteRail scope="global" />}>
      <PageHead title="About" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: the person */}
        <div className="flex flex-col gap-6">
          <img
            src="/photos/morgan.webp"
            alt="Morgan Broacha."
            width={800}
            height={800}
            className="block aspect-square w-full border border-hedge object-cover"
          />

          <div className="flex flex-col gap-4">
            <div>
              <div className="cv-subhead text-bone">Hey, I&rsquo;m Morgan</div>
              <div className="cv-subhead mt-3 text-lichen">
                I&rsquo;m currently designing at{" "}
                <a href="https://sysgit.io" target="_blank" rel="noopener noreferrer" className="text-bone underline">
                  Sysgit
                </a>
              </div>
            </div>

            <p className="m-0">
              I have over 10 years of digital product experience, with a degree in HCI from Carnegie Mellon
              University. My work focuses on accessibility and inclusivity - making experiences for users outside
              Silicon Valley.
            </p>
            <p className="m-0">
              I&rsquo;ve had the incredible luck to work with a lot of talented people in a variety of industries.
              In the course of my career I&rsquo;ve researched counterfeiting studios in Shanghai, tracked wolves in
              Yellowstone, run user testing in the ER, and even designed a couple Presidential ballots.
            </p>
            <p className="m-0">
              Outside work I like to touch grass.
            </p>
          </div>

          {outside?.photos ? <PhotoGrid photos={outside.photos} /> : null}
        </div>

        {/* Right: the record */}
        <div className="flex flex-col gap-6">
          <Panel title="Experience">
            {employment.map((e) => (
              <Entry
                key={e.company}
                when={e.years}
                what={
                  <>
                    {e.role} at <span className="text-bone">{e.company}</span>
                  </>
                }
              />
            ))}
          </Panel>

          <Panel title="Education">
            {education.map((e) => (
              <Entry
                key={e.school}
                when={e.degree}
                what={<span className="text-bone">{e.school}</span>}
              />
            ))}
          </Panel>

          <Panel title="Skills &amp; tools">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Bullets items={skills} />
              <Bullets items={tools} />
            </div>
          </Panel>

          <Panel title="Contact">
            <Entry
              when="Email"
              what={
                <a href="mailto:mbroacha@gmail.com" className="underline">
                  mbroacha@gmail.com
                </a>
              }
            />
            <Entry
              when="Elsewhere"
              what={
                <a
                  href="https://www.linkedin.com/in/morganbroacha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  linkedin.com/in/morganbroacha
                </a>
              }
            />
            <Entry
              when="Resume"
              what={
                <a
                  href="/morgan-broacha-resume.pdf?v=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  PDF &#8599;
                </a>
              }
            />
          </Panel>
        </div>
      </div>
    </CvPage>
  );
};
