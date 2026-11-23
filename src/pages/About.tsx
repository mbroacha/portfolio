import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { Entry, Panel } from "../components/cv/CvPrimitives";
import { PhotoGrid } from "../components/cv/PhotoGrid";
import { education, employment } from "../data/background";
import { skills, tools } from "../data/skills";
import { answerById } from "../lib/retrieval";
import { asset } from "../lib/asset";

/**
 * About.
 *
 * Three bands, in reading order: who she is (the intro leads, the portrait
 * supports beside it), the record (experience beside the short facts), then
 * skills and tools across the full width. The rail is the site's navigation
 * and stays untouched.
 *
 * The photos come from the same answer bank the field reads, so the page and
 * the answer cannot drift apart.
 */
/** One list in two columns from sm up: 22 skills and tools read as four short
    columns on a wide screen instead of one long stack, and stay a single list
    each. On a phone a half-width column wrapped most items, so it stays one. */
const SkillList = ({ items }: { items: string[] }) => (
  <ul className="m-0 list-none gap-x-6 p-0 sm:columns-2">
    {items.map((i) => (
      <li key={i} className="mb-1.5 break-inside-avoid">
        {i}
      </li>
    ))}
  </ul>
);

export const About = () => {
  const outside = answerById("cheeky-outside-work");

  return (
    <CvPage scope="global">
      <PageHead title="About" />

      <div className="flex flex-col gap-12">
        {/* The person. Text leads; the portrait sits beside it at a supporting
            size, so the first screen on a tablet or laptop holds both instead
            of a face alone. */}
        <section aria-label="Introduction" className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,17rem)_1fr] md:items-start lg:grid-cols-[minmax(0,20rem)_1fr]">
          <img
            src={asset("/photos/morgan.webp")}
            alt="Morgan Broacha."
            width={800}
            height={800}
            className="block aspect-square w-full max-w-[18rem] border border-rule object-cover md:max-w-none"
          />
          <div className="flex max-w-[var(--measure-prose)] flex-col gap-4">
            <div>
              <div className="cv-subhead text-primary">Hey, I&rsquo;m Morgan</div>
              <div className="cv-subhead mt-3 text-tertiary">
                I&rsquo;m currently designing at{" "}
                <a href="https://sysgit.io" target="_blank" rel="noopener noreferrer" className="text-primary underline">
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
        </section>

        {/* "Outside work I like to touch grass", shown. One quiet row from md
            up, directly after the line it illustrates, rather than a second
            gallery at portrait weight. */}
        {outside?.photos ? <PhotoGrid photos={outside.photos} className="!mt-0 md:grid-cols-4 lg:max-w-[44rem]" /> : null}

        {/* The record. Experience beside the two short facts, so the band
            balances; skills across the full width in short columns rather
            than one long stack. */}
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          <Panel title="Experience">
            {employment.map((e) => (
              <Entry
                key={e.company}
                when={e.years}
                what={
                  <>
                    {e.role} at <span className="text-primary">{e.company}</span>
                  </>
                }
              />
            ))}
          </Panel>
          <div className="flex flex-col gap-6">
            <Panel title="Education">
              {education.map((e) => (
                <Entry
                  key={e.school}
                  when={e.degree}
                  what={<span className="text-primary">{e.school}</span>}
                />
              ))}
            </Panel>
            <Panel title="Contact">
              <Entry
                when="Email"
                what={
                  <a href="mailto:mbroacha@gmail.com" className="inline-block py-1 underline">
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
                    className="inline-block py-1 underline"
                  >
                    linkedin.com/in/morganbroacha
                  </a>
                }
              />
              <Entry
                when="Resume"
                what={
                  <a
                    href={asset("/morgan-broacha-resume.pdf?v=2")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1 underline"
                  >
                    PDF &#8599;
                  </a>
                }
              />
            </Panel>
          </div>
        </div>

        <Panel title="Skills &amp; tools">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SkillList items={skills} />
            <SkillList items={tools} />
          </div>
        </Panel>
      </div>
    </CvPage>
  );
};
