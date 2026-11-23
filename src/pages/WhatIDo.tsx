import { CvPage } from "../components/cv/CvPage";
import { PageHead } from "../components/cv/PageHead";
import { MediaSlot, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { Ledger, PrevNext, TwoCol } from "../components/cv/CaseStudyParts";
import { asset } from "../lib/asset";

/**
 * How I Work, or How to be AI Native.
 *
 * Proof first. The reader most likely to land here suspects "AI native" is a
 * buzzword, and decides in the first screen. So the page opens on the claim
 * (ten decisions, none made by a model), goes straight to the one feature that
 * backs it, and names at each step both the tool used and the decisions made
 * there, so the claim can be checked row by row. The general practice and
 * the limits come after, once the reader has a reason to
 * believe them.
 *
 * Earlier versions led with a six-card grid of stages and a separate 01-10
 * decision list that did not map to the walkthrough. Both are gone: the stages
 * are a Ledger like the walkthrough, and each decision sits on its own row.
 * Cut walkthrough detail lives in the answer bank, under do-you-code,
 * ai-refuse, ai-native-buzzword and left-figma.
 */
export const WhatIDo = () => (
  <CvPage scope="global">
    <PageHead
      title="How I Work"
      subtitle="or How to be AI Native"
      lede={
        <>
          The product game has changed about as often as my job title. Models are now part of every stage of how I
          work, and that should make you suspicious. So here is one feature, start to finish, with the tool named at
          each step. Ten decisions went into it. Models made none of them.
        </>
      }
    />

    <SectionHeading>ONE FEATURE, END TO END</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      Context: adding customization to a complex decision modeling tool backed by a bespoke programming language used
      by hardware engineers. Read: users really wanted to change the colors of their boxes and lines. Sounds small. It
      was not.
    </p>
    <Ledger
      rows={[
        {
          left: "Scope",
          right:
            "Will anyone realistically recolor a diagram of 1000+ objects? Is this per diagram, per branch, or per project? How heavy a technical lift would any one of those be? Acceptance criteria first, because the answers change what gets built.",
          note: "No tools. Just noodling.",
          decided: ["Scope"],
        },
        {
          left: "Snoop on the neighbors",
          right:
            "Competitive analysis. How do similar products solve this problem? How do our competitors handle it? Diagram palettes and products with switchable themes. Our users are already trained on the tool we are replacing. Their expectations are more useful to me than what looks good on Dribbble.",
          note: "Claude, to aggregate feature comparisons",
        },
        {
          left: "Brainstorm by prompting",
          right:
            "Should the palette live on the canvas at all if it applies to every diagram in the project? Even set in one place, this asks a user to pick colors for 40+ object types. What if the base were a premade theme? What if users override colors in the source code?",
          note: "Claude Design",
          decided: ["Where the color palette belongs", "Premade themes as the base"],
          media: (
            <MediaSlot
              ratio="16/9"
              src={asset("/case-studies/what-i-do/brainstorm-directions.webp")}
              alt="Claude Design session: answered scoping questions, then three live theming directions with thumbnails."
            />
          ),
        },
        {
          left: "Prototype, with reason",
          right:
            "I wanted to see the theme override meet the color picker. Seeing the real object count is what made me group them so the list was survivable. Does it still feel daunting to a systems engineer not particularly concerned with aesthetics?",
          note: "Claude Code",
          decided: ["Grouping 40+ object types", "Preventing overload", "Scroll depth"],
          media: (
            <MediaSlot
              ratio="16/9"
              src={asset("/case-studies/what-i-do/override-groups.webp")}
              alt="Overrides table grouping each node type into Definition and Usage color pairs."
            />
          ),
        },
        {
          left: "Fieldwork",
          right:
            "Engineers stare at IDE themes all day, so I ran an anecdotal poll: which one do you actually use? Not just my team, anyone who would answer. The favorites became themes in the gallery.",
          note: "An informal poll",
          decided: ["Whether the built-in colors cohere"],
          media: (
            <MediaSlot
              ratio="16/9"
              src={asset("/case-studies/what-i-do/theme-gallery-poll.webp")}
              alt="Theme gallery cards including Catppuccin, Tokyo Night, Rosé Pine and Nord."
            />
          ),
        },
        {
          left: "Get pedantic with edge cases",
          right:
            "If someone can override the accessibility colors, there needs to be a warning. A static mock of a color picker would never have surfaced that.",
          note: "Claude Code",
          decided: ["Addressing accessibility"],
          media: (
            <MediaSlot
              ratio="16/9"
              src={asset("/case-studies/what-i-do/a11y-warning.webp")}
              alt="Theme gallery with High Contrast selected and the warning: Overrides may invalidate contrast."
            />
          ),
        },
        {
          left: "Critique",
          right:
            "Run over the repo, with the design system and the real component code in context. I determine what is valid feedback and pivot accordingly.",
          note: "A skill I wrote",
          decided: ["Discoverability"],
        },
        {
          left: "Ship",
          right: "I wrote the UI changes. Claude Code translated the technical changes. PR review, then merge.",
          note: "Claude Code, GitLab",
          decided: ["What to hand off to the user, and when"],
        },
      ]}
    />
    <p className="cv-subhead mb-6 text-primary">Ten decisions in that sequence; models made none of them.</p>
    <MediaSlot
      ratio="16/10"
      video={{
        src: asset("/case-studies/what-i-do/theme-picker.mp4"),
        poster: asset("/case-studies/what-i-do/theme-picker-poster.webp"),
      }}
      alt="Screen capture of the theme picker: choosing a theme from the gallery, the preview updating, then scrolling the grouped overrides table."
    />

    <SectionHeading className="mt-6">THE PRACTICE</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      Shipping my own front-end collapses the handoff loop most product orgs complain about, and it means my design
      decisions get tested in the real product ecosystem instead of in a mock. The reasonable worry is that judgment gets
      outsourced somewhere along the way. So here is my practice, stage by stage, with the tool named at each one:
    </p>
    <Ledger
      rows={[
        {
          left: "Research",
          right:
            "Call transcription and insight development. The UX research protocols are what turn a sales call into a user discovery call.",
          note: "My protocols and journalism, Claude and Attio",
        },
        {
          left: "Product management",
          right:
            "It combs user feedback, Slack suggestions and bug reports, and returns weighted tickets. It is how we stopped being purely reactive to whoever asked the loudest.",
          note: "My own Claude skills",
        },
        {
          left: "Design",
          right:
            "Prompting is a brainstorming tool, not a generation tool. I ask for at least three iterations, tell it to go wild on one, then look for workflow gaps and edge cases. This is also a fast way to find gaps in an existing design system.",
          note: "Claude Design, and Figma",
        },
        {
          left: "Build",
          right:
            "Lo-fi designs are still queen of quick consensus. I prototype not because it is now cheap, but to answer a specific question. The question is usually about an interaction that must be seen in its environment.",
          note: "Claude Code, Codex",
        },
        {
          left: "Critique",
          right: (
            <>
              I run it over the actual repo locally, so it sees the whole codebase rather than a screenshot. As a design
              team of one, I am vulnerable to{" "}
              {/* Screen readers do not announce <s>, which turned the joke into a
                  garbled sentence. The hidden words say what the eye sees. */}
              <s>
                <span className="sr-only">(struck through: </span>
                being drunk with power
                <span className="sr-only">)</span>
              </s>{" "}
              being the sole product voice in the room and my own biases.
            </>
          ),
          note: "My own design critique skill",
        },
        {
          left: "Ship",
          right:
            "I ship a lot of the UI changes myself, from a design perspective. There is some vibe checking of what might be too heavy (read: backend) to handle, and collaboration is part of the game. But design review, PR review, and unit tests are all still part of the process.",
          note: "GitLab",
        },
      ]}
    />

    <SectionHeading>WHERE A MODEL CAN'T DO THE WORK</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim="Real subject matter expertise">
      <div>
        You really see the limitations of large public models once you get into niche industries. The training data is
        just nonexistent. I still map most technical workflows by hand, and frequently have to check for drift in model
        responses.
      </div>
    </TwoCol>
    <TwoCol claim="UI review, always manual">
      <div>
        I go in and click around. I need to feel what is clunky and find the interactions I did not expect. What Claude
        thinks works for 99% of public apps doesn't necessarily work for our users.
      </div>
    </TwoCol>
    <TwoCol claim="Generate at your own risk">
      <div>
        As of the writing of this page, generative models specifically for UI/UX are...not great (looking at you,
        Figma). Slop is everywhere, and the value of the designer is to be able to discern what is actually worth the
        product investment.
      </div>
    </TwoCol>

    <PrevNext
      prev={{ label: "Gradescope Mobile", to: "/case-study/gradescope-mobile" }}
      next={{ label: "About", to: "/about" }}
    />
  </CvPage>
);
