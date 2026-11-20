import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { SiteRail } from "../components/cv/SiteRail";
import { MediaSlot, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { PrevNext, TwoCol } from "../components/cv/CaseStudyParts";
import { asset } from "../lib/asset";

export const GradescopeMobile = () => (
  <CvPage
    sidebar={
      <SiteRail scope="gradescope" />
    }
  >
    <PageHead
      title="Gradescope Mobile"
      lede={
        <>
          <span className="text-bone">Scan and submit handwritten homework from your phone.</span> Students used to
          build a PDF in a separate scanning app, then upload it on the Gradescope site. One app instead of two was
          the whole premise.
        </>
      }
      items={[
        { label: "Role", value: <span className="text-bone">Senior Product Designer, one of two</span> },
        { label: "Timeline", value: "Launched 2021" },
        { label: "Scope", value: "Workflow, screens, platform adaptation" },
        { label: "Platform", value: "iOS and Android" },
      ]}
    />

    <MediaSlot
      ratio="auto"
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/screens.webp")}
      alt="Three phone screens: an assignment list with due dates, the question mapping screen over a scanned page, and a graded submission."
    />

    <SectionHeading className="mt-12">ON A PHONE</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">The parent design system was built for web and did not survive the platform change.</em>}>
      <div>
        Buttons failed as tap targets, type was not scaled, and the colors pulled too dark on a phone. The other
        senior designer wanted strict fidelity. I argued for translation, won on the interactive components, and lost
        on the rest.
      </div>
    </TwoCol>

    <SectionHeading className="mt-12">THE DECISION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">We required mapping before submission. Then we reversed it.</em>}>
      <div>
        The autograder has to be told where each answer sits on the page, so after scanning, the student maps the area
        of every question. That is not a short process at 11:59 PM. Students want to submit fast, teachers do not want
        to map the assignments themselves, and the constraint came from the parent product.
      </div>
      <div>We let students submit first and map afterward. It was the right call and it was not enough.</div>
    </TwoCol>
    <MediaSlot
      ratio="auto"
      width="34%"
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/submit-then-map.webp")}
      alt="Submission confirmation screen offering Assign Pages as the primary action and Skip for now beneath it."
    />

    <SectionHeading className="mt-12">WHY IT FAILED</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">You inherit the blame for user error your own friction caused.</em>}>
      <div>
        A tedious mapping step produces rushed mapping, which produces a bad submission, which the teacher reads as a
        broken product. The scanner was a third party we could not control. In our own wireflow it was a black box
        labeled Magical Scanning Stuff.
      </div>
      <div>
        Nobody had to use this app. Every other product I have worked on had captive users, and designing against
        indifference is a different problem.
      </div>
    </TwoCol>
    <MediaSlot
      ratio="auto"
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/scanner-handoff.webp")}
      alt="Three steps of the submission wireflow. The screen between Submit and Upload is a black box labeled Magical Scanning Stuff."
    />

    <PrevNext prev={{ label: "Originality", to: "/case-study/originality" }} next={{ label: "What I do", to: "/what-i-do" }} />
  </CvPage>
);
