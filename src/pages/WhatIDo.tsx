import type { ReactNode } from "react";
import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { SiteRail } from "../components/cv/SiteRail";
import { MediaSlot, Panel, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { Ledger } from "../components/cv/CaseStudyParts";

/**
 * What I do.
 *
 * A practice overview, which is what the title promises. The six stages first,
 * then one worked example, then the three limits.
 *
 * This page used to be an eight-step walkthrough of a single feature with the
 * thesis stated twice, a hundred lines apart, in five different layout devices.
 * It read as a case study wearing a section heading. It is now three devices:
 * Panel for the stages and the limits, Ledger for the worked example, and
 * one MediaSlot. The cut walkthrough detail lives in the answer bank, under
 * do-you-code, ai-refuse, ai-native-buzzword and left-figma.
 */

/** One stage of the practice. The tool is named, so the claim is checkable. */
const Stage = ({ title, tool, children }: { title: string; tool: string; children: ReactNode }) => (
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
          "AI native" is the hot new skill every designer needs to be marketable. But what does that actually mean? More than shipping code, it means being able to work with new interfaces and design materials that are rapidly changing. The skill is still fundamentally understanding a user problem, and solving it.
        </>
      }
    />

    <p className="mb-6">
      Shipping my own front end collapses the handoff loop most product orgs complain about, and it means my design
      decisions get tested in the real product ecosystem instead of in a mock. The reasonable worry is that judgment gets
      outsourced somewhere along the way. So here is my practice, stage by stage, with the tool named at each one:
    </p>

    <SectionHeading>THE PRACTICE</SectionHeading>
    <Rule className="mb-6" />
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Stage title="Research" tool="My protocols and journalism, Claude and Attio">
        Call transcription and insight development. The UX research protocols are what turn a sales call into a user discovery call.
      </Stage>
      <Stage title="Product Management" tool="My own Claude skills">
        It combs user feedback, Slack suggestions and bug reports, and returns weighted tickets. It is how we stopped
        being purely reactive to whoever asked the loudest.
      </Stage>
      <Stage title="Design" tool="Claude Design, and Figma">
        Prompting is a brainstorming tool, not a generation tool. I ask for at least three iterations, tell it to go
        wild on one, then look for workflow gaps and edge cases. This is also a fast way to find gaps in an existing design system.
      </Stage>
      <Stage title="Build" tool="Claude Code">
        Lo-fi designs are still queen of quick consensus. I prototype not because I now can cheaply, but to answer a specific question. The question is usually
        about an interaction that must be seen in its environment.
      </Stage>
      <Stage title="Critique" tool="My own design critique skill">
        I run it over the actual repo locally, so it sees the whole codebase rather than a screenshot. As a design team of one, I am vulnerable to <s>being drunk with power</s> being the sole product voice in the room and my own biases.
      </Stage>
      <Stage title="Ship" tool="GitLab">
        I ship a lot of the UI changes myself, from a design perspective. There is some vibe checking of what might be too heavy (read:backend) to handle, and collaboration is part of the game. But design review, PR review, and unit tests are all still part of the process.
      </Stage>
    </div>

    <SectionHeading>ONE FEATURE, END TO END</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      Context: a complex decision modeling tool backed by a bespoke programming language used by hardware engineers. Customers really wanted to be able to change the colors of boxes and lines in the graph. Sounds small. It was not.
    </p>
    <Ledger
      rows={[
        {
          left: "Scope",
          right:
            "Will anyone realistically recolor a diagram of 1000+ objects? Is this per diagram, per branch, or per project? How heavy a technical lift would any one of those be? Acceptance criteria first, because the answers change what gets built.",
          note: "No tools. Just noodling.",
        },
        {
          left: "Snoop on the neighbors",
          right:
            "How do similar products solve this problem? How do our competitors handle it? Diagram palettes and products with switchable themes. Our users are already trained on the tool we are replacing. Their expectations are more useful to me than what looks good on Dribbble.",
          note: "Claude",
        },
        {
          left: "Brainstorm by prompting",
          right:
            "Should the palette live on the canvas at all if it applies to every diagram in the project? Even set in one place, this asks a user to pick colors for 40+ objects. What if the base were a premade theme? What if users override colors in the source code?",
          note: "Claude Design",
        },
        {
          left: "Prototype, with reason",
          right:
            "I wanted to see the theme override meet the color picker. Seeing the real object count is what made me group them so the list was survivable. Does it still feel daunting to a systems engineer not particularly concerned with aesthetics?",
          note: "Claude Code",
        },
        {
          left: "Fieldwork",
          right:
            "I happened to be at a defense engineering conference while building this, so I walked the floor and noted what every company was using for branding. Then I asked my engineers for their favorite IDE themes.",
          note: "Boots on the ground",
        },
        {
          left: "Get pedantic with edge cases",
          right:
            "If someone can override the accessibility colors, there needs to be a warning. A static mock of a color picker would never have surfaced that.",
          note: "Claude Code",
        },
        {
          left: "Critique",
          right: "Run over the repo, with the design system and the real component code in context. I determine what is valid feedback and pivot accordingly.",
          note: "A skill I wrote",
        },
        {
          left: "Ship",
          right:
            "I wrote the UI changes. Claude Code translated the technical changes. PR review, then merge.",
          note: "GitHub",
        },
      ]}
    />
    <p className="cv-subhead mb-6 text-bone">
      Ten decisions in that sequence; models made none of them.
    </p>
    <p className="mb-6">
      Scope. Where the color palette belongs. Premade themes as the base.
      Grouping 40+ objects. Whether the built-in colors cohere. Preventing overload. Addressing accessibility. Scroll depth.
      Discoverability. What to hand off to the user, and when.
    </p>
    <MediaSlot ratio="16/10" caption="Theme picker &middot; interactive recreation" />

    <SectionHeading>WHERE A MODEL CAN'T DO THE WORK</SectionHeading>
    <Rule className="mb-6" />
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <Panel title="Real subject matter expertise">
        You really see the limitations of large public models once you get into niche industries. The training data
        is just nonexistent. I still map most technical workflows by hand, and frequently have to check for drift in model responses.
      </Panel>
      <Panel title="UI review, always manual">
        I go in and click around. I need to feel what is clunky and find the interactions I did not expect. What Claude thinks works for 99% of public apps doesn't necessarily work for our users.
      </Panel>
      <Panel title="Generate at your own risk">
        As of the writing of this page, generative models specifically for UI/UX are...not great (looking at you, Figma.) Slop is everywhere, and the value of the designer is to be able to discern what is actually worth the product investment.
      </Panel>
    </div>
  </CvPage>
);
