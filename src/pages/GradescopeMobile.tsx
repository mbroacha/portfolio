import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { Jackalope } from "../components/cv/Jackalope";
import { MediaSlot, MetaList, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { PrevNext, TwoCol } from "../components/cv/CaseStudyParts";

export const GradescopeMobile = () => (
  <CvPage
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

        <div className="font-display text-xl italic text-bone">Gradescope Mobile</div>
        <div>
          <span className="text-bone">Scan and submit handwritten homework from your phone.</span> It did not work,
          and the reasons are more interesting than the product.
        </div>

        <Rule />

        <MetaList
          items={[
            { label: "Role", value: <span className="text-bone">Senior Product Designer, one of two</span> },
            { label: "Timeline", value: "Launched 2021" },
            { label: "Team", value: "2 senior designers under a lead" },
            { label: "Scope", value: "Workflow, screens, platform adaptation" },
            { label: "Platform", value: "iOS and Android" },
          ]}
        />
      </>
    }
  >
    <MediaSlot ratio="3/4" width="55%" caption="Scan, map, submit" />

    <SectionHeading>WHAT IT WAS</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">One app instead of two.</em>}>
      <div>
        Students scanned handwritten short-answer assignments into classes they were already enrolled in through
        Gradescope. A teacher graded them, or the existing OCR autograder did.
      </div>
      <div>
        Before this, a student used a separate scanning app to make a PDF, then uploaded it on the Gradescope site.
        Collapsing that into one app was the whole premise.
      </div>
    </TwoCol>

    <SectionHeading>THE DECISION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">We required mapping before submission. Then we reversed it.</em>}>
      <div>
        The autograder has to be told where on the page each answer lives, so after scanning, the student maps the
        area of every question. That is not a short process at 11:59 PM.
      </div>
      <div>
        Students want to submit as fast as possible. Teachers do not want to map each assignment themselves. Both
        are reasonable and they are directly opposed, and the constraint was inherited from the parent product.
      </div>
      <div>We let students submit first and map afterward. It was the right call and it was not enough.</div>
    </TwoCol>

    <SectionHeading>WORKING AS A PAIR</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">We disagreed about how faithful to be to the parent design system.</em>}>
      <div>
        The other senior designer wanted strict fidelity. My position was that the system was built for web and did
        not survive the platform change. Buttons were wrong as tap targets, type was not scaled, and the colors
        pulled too dark on a phone.
      </div>
      <div>
        We went back and forth several times. I won on the interactive components and not on the rest, which is
        probably the correct outcome for an argument neither of us could settle with evidence.
      </div>
      <div>
        It is the same argument I would later lose at Sysgit, where the founder wants strict spec fidelity and I
        want translation. Literal correctness against contextual fit. I have been on the winning and losing side of
        it five years apart.
      </div>
    </TwoCol>

    <SectionHeading>WHY IT DID NOT WORK</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">Bad reviews, and I am not sure it is still supported.</em>}>
      <div>
        The scanner was a third party we could not control. We worked hard to make the handoff seamless and
        Gradescope-branded, and it still felt like being punted to another app.
      </div>
      <div>
        We also could not control how carefully a student marked question locations at midnight. And when they
        rushed it, the bad submission looked to the teacher like our product failing.
      </div>
      <div>The technology was not there yet. That is most of it.</div>
    </TwoCol>

    <SectionHeading>WHAT I TOOK FROM IT</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">You inherit the blame for user error your own friction caused.</em>}>
      <div>
        A tedious mapping step produces rushed mapping, which produces a bad submission, which a teacher reads as a
        broken product. The friction and the blame were the same problem, and fixing the friction was outside our
        control.
      </div>
      <div>
        The other thing was about voluntary users. Nobody had to use this app. The threshold for drop-off is a
        completely different animal when the alternative is a process the student already tolerates. Every other
        product I have worked on had captive users, and I had not designed against indifference before.
      </div>
    </TwoCol>

    <PrevNext prev={{ label: "Originality", to: "/case-study/originality" }} next={{ label: "How I work", to: "/how-i-work" }} />
  </CvPage>
);
