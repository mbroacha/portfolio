import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { MediaSlot, MetaList, Rule, SectionHeading } from "../components/cv/CvPrimitives";
import { ConstraintGrid, InsightBlock, Ledger, PrevNext, Step, TwoCol } from "../components/cv/CaseStudyParts";

export const HowIWork = () => (
  <CvPage
    sidebar={
      <>
        <div className="flex items-center gap-2.5">
          <div className="grid h-5 w-5 place-items-center border border-[color:var(--edge)] text-[10px] text-lichen">
            M
          </div>
          <div className="font-display text-xl italic tracking-[0.5px] text-bone">Morgan Broacha</div>
        </div>

        <Link to="/" className="underline underline-offset-4">
          &larr; Back to work
        </Link>

        <Rule />

        <div className="font-display text-xl italic text-bone">How I work</div>
        <div>
          One feature, start to finish, with the tools named at every step. Written because &ldquo;AI native&rdquo;
          is a claim, and a walkthrough is evidence.
        </div>

        <Rule />

        <MetaList
          items={[
            { label: "Design", value: "Claude Design, with our design system loaded" },
            { label: "Build", value: "Claude Code. VS Code" },
            { label: "Critique", value: "A design critique skill I wrote, run over the repo" },
            { label: "Ship", value: <span className="text-bone">Full features. My own front-end PRs</span> },
            { label: "By hand", value: "Technical SE workflows. UI review. Always" },
          ]}
        />
      </>
    }
  >
    <SectionHeading>THE CLAIM</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      I prototype in code and ship my own front-end PRs. That collapses the handoff loop most product orgs complain
      about, and it means my design decisions get tested in the real product instead of in a mock.
    </p>
    <p className="mb-6">
      The suspicion that comes with saying this out loud is that the judgment is outsourced and I am a wrapper
      around a model. So here is one real feature, in order, with the tool named at each step. Count the decisions.
      The model made none of them.
    </p>

    <SectionHeading>ONE FEATURE, END TO END</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      Customers kept asking to change the colors of boxes and lines in the graph. Sounds small. It was not.
    </p>

    <Step n={1} title="Scope, before any tool" first>
      <div>
        What is the scope? Will anyone realistically recolor a diagram of 1000+ objects? Is this per diagram, per
        branch, or per project?
      </div>
      <div>Acceptance criteria first, because the answers change what gets built.</div>
    </Step>

    <Step n={2} title="Prior art, starting with the incumbent" tool="Claude, for comparables">
      <div>
        I collected samples of diagram palettes and products with switchable themes, then went and looked at
        Cameo&rsquo;s stereotype feature for setting color schemes.
      </div>
      <div>
        Our users are already trained on the tool we are replacing. What they know is more useful to me than what
        looks good on Dribbble.
      </div>
    </Step>

    <Step n={3} title="Think by prompting" tool="Claude Design">
      <div>
        Writing the prompt is where the workflow nuances surface. Should the palette live on the canvas at all if it
        applies to every diagram in the project? Even set in one place, this asks a user to pick colors for 40+
        objects. What if the base were a premade theme?
      </div>
      <div>
        I ask for at least three iterations and tell it to go wild on one. Then I look for what I like, what I
        forgot to prompt, and which edge cases are still open. Fidelity is not the point at this stage.
      </div>
    </Step>

    <Step n={4} title="Build the prototype, for a specific reason" tool="Claude Code">
      <div>
        I wanted to see the interaction between the palette override and the color picker. Not because prototypes
        are generally good.
      </div>
      <div>Seeing the real object count is what made me group them so the list was survivable.</div>
    </Step>

    <Step n={5} title="Go get better inputs" tool="A defense conference, and my own devs">
      <div>
        I was at a conference while building this, so I walked the floor and noted what every company used for
        branding. Then I asked my engineers for their favorite IDE themes.
      </div>
      <div>
        I adjusted the samples until they read as distinct from each other, and checked whether the built-in colors
        actually worked together.
      </div>
    </Step>

    <Step n={6} title="Get pedantic in the real thing" tool="Claude Code">
      <div>
        Do the interactions behave the way I expected? Did I introduce anything outside our design system? The
        colors persist into actual model metadata, so is that wired correctly? Would the user have to scroll too
        far? Is it obvious where this setting lives?
      </div>
      <div className="text-bone">
        This is where I realized that if someone can override the accessibility colors, there needs to be a warning.
        A static mock of a color picker would never have surfaced that.
      </div>
    </Step>

    <Step n={7} title="Critique with full context" tool="A skill I wrote">
      <div>
        I run the design critique over the actual repo locally, so it sees the whole codebase rather than a
        screenshot.
      </div>
      <div>I built this because there is no design critique at my company. More on that below.</div>
    </Step>

    <Step n={8} title="Ship it" tool="GitHub">
      <div>
        I write the UI changes myself, from a design perspective. Claude Code lists the technical changes. Then
        review from my engineers, and merge.
      </div>
      <div>I still do a design review handoff before the PR. Having merge access is not a reason to skip review.</div>
    </Step>

    <MediaSlot ratio="16/10" caption="Theme picker &middot; interactive recreation" />

    <SectionHeading>THE POINT</SectionHeading>
    <Rule className="mb-6" />
    <InsightBlock quote="The model generates and enumerates. I judge." />
    <TwoCol claim={<em className="font-display not-italic">Ten decisions in that sequence. The model made none of them.</em>}>
      <div>
        Scope. Per project or per diagram. Whether the palette belongs on the canvas. Premade themes as the base.
        Grouping 40+ objects. Whether the built-in colors cohere. The accessibility warning. Scroll depth.
        Discoverability. What to hand off, and when.
      </div>
      <div>
        Prompting is a thinking tool for me, not a generation tool. The useful part of reviewing iterations is
        finding what I forgot to specify.
      </div>
    </TwoCol>

    <SectionHeading>WHAT I DO NOT HAND TO A MODEL</SectionHeading>
    <Rule className="mb-6" />
    <ConstraintGrid
      items={[
        {
          title: "Anything needing real SE expertise",
          detail:
            "I map technical workflows by hand. Systems engineering is niche enough that I cannot assume the training data is there. Use the model where coverage is dense. Do not where it is sparse.",
        },
        {
          title: "UI review, always manual",
          detail:
            "I go in and click around. I need to feel what is clunky and find the interactions I did not expect. Generation is delegable. Evaluation is not.",
        },
      ]}
    />

    <SectionHeading>BEFORE ANY OF THIS EXISTED</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6">
      The habit is older than the tools. Every time a company I worked at was missing an organizational function, I
      built a system to stand in for it. Four of these predate AI entirely and were built by hand.
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
      The disposition is the constant. AI is the leverage.
    </p>

    <SectionHeading>WHAT IT COST ME</SectionHeading>
    <Rule className="mb-6" />
    <TwoCol claim={<em className="font-display not-italic">I had to leave Figma, and that was harder than it sounds.</em>}>
      <div>
        I tried Figma Make and the Figma MCP when they came out. The results were never what I wanted. The more
        useful realization was that I was looking for reasons to justify continuing to use Figma.
      </div>
      <div className="text-bone">
        Designers are professionally defined by that tool. Noticing I was rationalizing to protect an
        identity-linked habit, and leaving anyway, is exactly the thing I ask systems engineers to do with Cameo. I
        do not have to imagine that resistance. I went through it.
      </div>
    </TwoCol>
    <p className="mb-6">
      My team is, if anything, a little too gung-ho about AI for writing code, reviewing code, and unit tests. I
      would not claim I evangelized a practice. We are all figuring it out at the same time.
    </p>

    <PrevNext prev={{ label: "Sysgit", to: "/case-study/sysgit" }} next={{ label: "Originality", to: "/case-study/originality" }} />
  </CvPage>
);
