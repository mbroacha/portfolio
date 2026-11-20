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
          <span className="text-bone">Scan and submit handwritten homework from your phone.</span> Replaced taking a photo, using a third-party app to create a PDF, and uploading to a desktop site. One app instead of three.
        </>
      }
      items={[
        { label: "Role", value: <span className="text-bone">Senior UX Designer</span> },
        { label: "Timeline", value: "Launched 2021" },
        { label: "Scope", value: "Workflow, screens, platform adaptation" },
        { label: "Platform", value: "iOS and Android" },
      ]}
    />

    <MediaSlot
      ratio="auto"
      width="55%"
      bleed
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/screens-perspective.webp")}
      alt="Three phones in perspective: an assignment list with due dates, the question mapping screen over a scanned page, and a submitted assignment."
    />

    <SectionHeading className="mt-12">MOVE TO MOBILE</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">The parent design system was built for web and had to be translated for mobile interactions.</em>}>
      <div>
        This quickly revealed where buttons failed as tap targets, type didn't scale, and the colors pulled too dark on a phone. The team was torn between strict fidelty vs. an interpretation of the design system.
      </div>
    </TwoCol>

    <MediaSlot
      ratio="auto"
      width="34%"
      bleed
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/submission-flow.webp")}
      alt="A walkthrough of the submission path: the course list, a course's assignments, an unsubmitted assignment, then the same assignment submitted with its pages mapped to questions."
    />

    <SectionHeading className="mt-12">THE DECISION</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">We all the work on the frontend. Then we reversed it.</em>}>
      <div>
        Imagine a worksheet (do those still exist?): you have a series of printed questions with spaces to answer by hand. Our existing autograder had to be told where each answer sits on the page, so after scanning the paper, the student maps the area
        of every question. That is not a short process at 11:59 PM. But teachers don't want to have to do this for 30+ students.
      </div>
      <div>Ultimately I compromised by letting students submit first to get that timestamp and then mapping afterward.</div>
    </TwoCol>
    <MediaSlot
      ratio="auto"
      width="34%"
      bleed
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/submit-then-map.webp")}
      alt="Submission confirmation screen offering Assign Pages as the primary action and Skip for now beneath it."
    />

    <SectionHeading className="mt-12">WHY IT FAILED</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">You inherit the blame for another product's friction.</em>}>
      <div>
        A tedious mapping step required for the web app produced rushed mapping, which produced a bad submission, which the teacher read as a
        broken product. The actual OCR scanner was also a third party platform we could not control. In our own wireframing it was literally a black box.
      </div>
    </TwoCol>
    <MediaSlot
      ratio="auto"
      matted={false}
      bordered={false}
      src={asset("/case-studies/gradescope/scanner-handoff.webp")}
      alt="Three steps of the submission wireflow. The screen between Submit and Upload is a black box labeled Magical Scanning Stuff."
    />

    <TwoCol claim={<em className="font-display not-italic">Nobody had to use this app.</em>}>
      <div>
        We had correctly identified a product gap: students are mobile first with grades, tests, and academic admin. We relied too heavily on the assumption that a phone app for turning in homework would just naturally be adopted. The threshold for drop-off is much lower when the alternative (web) is a process the student already tolerates.
      </div>
    </TwoCol>

    <PrevNext prev={{ label: "Originality", to: "/case-study/originality" }} next={{ label: "What I do", to: "/what-i-do" }} />
  </CvPage>
);
