import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { SiteRail } from "../components/cv/SiteRail";
import { MediaSlot, Panel, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { Ledger, PrevNext } from "../components/cv/CaseStudyParts";

/**
 * What I do.
 *
 * A practice overview, which is what the title promises. The six stages first,
 * then one worked example, then the two limits, then the chronology.
 *
 * This page used to be an eight-step walkthrough of a single feature with the
 * thesis stated twice, a hundred lines apart, in five different layout devices.
 * It read as a case study wearing a section heading. It is now three devices:
 * Panel for the stages and the limits, Ledger for both ordered sequences, and
 * one MediaSlot. The cut walkthrough detail lives in the answer bank, under
 * do-you-code, ai-refuse, ai-native-buzzword and left-figma.
 */

/** One stage of the practice. The tool is named, so the claim is checkable. */
const Stage = ({ title, tool, children }: { title: string; tool: string; children: string }) => (
  <Panel title={title}>
    <div className="cv-meta mb-2 text-lichen">{tool}</div>
    <div>{children}</div>
  </Panel>
);

export const WhatIDo = () => (
  <CvPage
    sidebar={
      <SiteRail scope="global" />
    }
  >
    <PageHead
      title="What I do"
      lede={
        <>
          I prototype in code and ship my own front-end pull requests. The model generates and enumerates. I judge.
        </>
      }
    />

    <p className="mb-6">
      Shipping my own front end collapses the handoff loop most product orgs complain about, and it means my design
      decisions get tested in the real product instead of in a mock. The reasonable worry is that judgment gets
      outsourced somewhere along the way. So here is the practice, stage by stage, with the tool named at each one.
    </p>

    <SectionHeading>THE PRACTICE</SectionHeading>
    <Rule className="mb-6" />
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Stage title="Research" tool="Claude, plus protocols I wrote">
        Interview transcription and insight development. The protocols exist because the feedback I was handed came
        pre-loaded with founder bias.
      </Stage>
      <Stage title="Product" tool="A custom skill I wrote">
        It combs user feedback, Slack suggestions and bug reports, and returns weighted tickets. It is how we stopped
        being purely reactive to whoever asked last.
      </Stage>
      <Stage title="Design" tool="Claude Design, and Figma">
        Prompting is a thinking tool, not a generation tool. I ask for at least three iterations and tell it to go
        wild on one, then look for what I forgot to specify.
      </Stage>
      <Stage title="Build" tool="Claude Code">
        I prototype to answer a specific question, not because prototypes are generally good. The question is usually
        about an interaction I cannot predict.
      </Stage>
      <Stage title="Critique" tool="A design critique skill I wrote">
        I run it over the actual repo locally, so it sees the whole codebase rather than a screenshot. I built it
        because there is no design critique at my company.
      </Stage>
      <Stage title="Ship" tool="GitHub">
        I write the UI changes myself, from a design perspective. Design review handoff, then engineering review, then
        merge. Merge access is not a reason to skip review.
      </Stage>
    </div>

    <SectionHeading>ONE FEATURE, END TO END</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      Customers kept asking to change the colors of boxes and lines in the graph. Sounds small. It was not.
    </p>
    <Ledger
      rows={[
        {
          left: "Scope",
          right:
            "Will anyone realistically recolor a diagram of 1000+ objects? Is this per diagram, per branch, or per project? Acceptance criteria first, because the answers change what gets built.",
          note: "No tool",
        },
        {
          left: "Prior art",
          right:
            "Diagram palettes and products with switchable themes, then Cameo's stereotype feature. Our users are already trained on the tool we are replacing. What they know is more useful to me than what looks good on Dribbble.",
          note: "Claude",
        },
        {
          left: "Think by prompting",
          right:
            "Should the palette live on the canvas at all if it applies to every diagram in the project? Even set in one place, this asks a user to pick colors for 40+ objects. What if the base were a premade theme?",
          note: "Claude Design",
        },
        {
          left: "Prototype, for a reason",
          right:
            "I wanted to see the palette override meet the color picker. Seeing the real object count is what made me group them so the list was survivable.",
          note: "Claude Code",
        },
        {
          left: "Better inputs",
          right:
            "I was at a defense conference while building this, so I walked the floor and noted what every company used for branding. Then I asked my engineers for their favorite IDE themes.",
          note: "Fieldwork",
        },
        {
          left: "Get pedantic in the real thing",
          right:
            "If someone can override the accessibility colors, there needs to be a warning. A static mock of a color picker would never have surfaced that.",
          note: "Claude Code",
        },
        {
          left: "Critique",
          right: "Run over the repo, with the design system and the real component code in context.",
          note: "A skill I wrote",
        },
        {
          left: "Ship",
          right:
            "I wrote the UI changes. Claude Code listed the technical ones. Review from my engineers, then merge.",
          note: "GitHub",
        },
      ]}
    />
    <p className="cv-subhead mb-6 text-bone">
      Ten decisions in that sequence. The model made none of them.
    </p>
    <p className="mb-6">
      Scope. Per project or per diagram. Whether the palette belongs on the canvas. Premade themes as the base.
      Grouping 40+ objects. Whether the built-in colors cohere. The accessibility warning. Scroll depth.
      Discoverability. What to hand off, and when.
    </p>
    <MediaSlot ratio="16/10" caption="Theme picker &middot; interactive recreation" />

    <SectionHeading>WHERE I DO NOT USE A MODEL</SectionHeading>
    <Rule className="mb-6" />
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Panel title="Real systems engineering expertise">
        I map technical workflows by hand. Systems engineering is niche enough that I cannot assume the training data
        is there. Use the model where coverage is dense. Do not where it is sparse.
      </Panel>
      <Panel title="UI review, always manual">
        I go in and click around. I need to feel what is clunky and find the interactions I did not expect.
        Generation is delegable. Evaluation is not.
      </Panel>
    </div>

    <SectionHeading>THE HABIT PREDATES THE TOOLS</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      Every time a company I worked at was missing an organizational function, I built a system to stand in for it.
      Four of these were built by hand, before any of this existed.
    </p>
    <Ledger
      rows={[
        { left: "No unbiased user input", right: "Interview and feedback protocols built to strip founder bias", note: "By hand" },
        { left: "No product direction", right: "A roadmap, so we stopped being purely reactive to customer requests", note: "By hand" },
        { left: "No shared vocabulary", right: "Naming conventions from the overlap of SE and Git language", note: "By hand" },
        { left: "No design review", right: "A semi-formal process slotted into the existing dev review flow", note: "By hand" },
        { left: "No product manager", right: "Listeners across Slack, support and call transcripts producing weighted tickets", note: "AI" },
        { left: "No design critique", right: "A critique skill I wrote, run over the repo", note: "AI" },
        { left: "No competitive intel", right: "A script that pulls competitor sites and repos and analyzes weekly focus", note: "AI" },
      ]}
    />
    <p className="mb-6">
      The disposition is the constant. AI is the leverage. The cost was leaving Figma, which was harder than it
      sounds, because designers are professionally defined by that tool. Noticing I was rationalizing to protect an
      identity-linked habit, and leaving anyway, is exactly what I ask systems engineers to do with Cameo. I do not
      have to imagine that resistance.
    </p>

    <PrevNext prev={{ label: "Sysgit", to: "/case-study/sysgit" }} next={{ label: "Originality", to: "/case-study/originality" }} />
  </CvPage>
);
