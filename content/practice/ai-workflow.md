---
slug: ai-workflow
type: practice
title: How Morgan works with AI
context: Sysgit, 2025-2026
---

## The worked example: per-object diagram colors

Customers repeatedly asked to change the colors of boxes and lines in the graph.
Full sequence, in order, with the tool named at each step.

### 1. Scope, before any tool

Acceptance criteria first:

- What is the scope?
- Will users realistically recolor a diagram of 1000+ objects?
- Is this per diagram, per branch, or per project?

### 2. Prior art, including the incumbent

- Collected samples of diagram color palettes and products with switchable themes
- **Looked at Cameo's existing stereotype feature** for setting color schemes, to
  see what users may already be trained on
- Asked Claude whether other products have the feature he was picturing

### 3. Claude Design, with the design system already loaded

The design system is built in. The notable part is why he prompts at all:

> "The prompt is actually a good way for me to think through some of the nuances
> of the workflow."

Nuances that surfaced while writing the prompt:

- Should the color palette live on the canvas at all, if it applies to every
  diagram in the project?
- Even set in one place, this asks users to pick colors for 40+ separate
  objects. What if the base were a premade theme?

Method: feed in the samples, set expectations on general structure, ask for **at
least 3 iterations and tell it to go wild on one.** Then review for what he likes,
**what he forgot to prompt**, and unresolved edge cases. Fidelity is explicitly
not the concern at this stage.

### 4. Working prototype, for a specific reason

Built because he wanted to see the interaction between the color palette override
and the color picker. Not because prototypes are generally good.

In the prototype: saw the sheer number of objects to cover and **grouped them for
digestibility**.

### 5. Analog research, mid-build

Feeding the prototype more sample themes, sourced by:

- Walking the floor at a defense conference he happened to be attending, noting
  what every company used for branding
- Asking his own devs for their favorite IDE themes

Then adjusting the samples so they read as distinct from each other, and checking
whether the built-in colors actually work together.

### 6. Claude Code, where he gets pedantic

Handoff: tell Claude Design to wrap it up for Claude Code.

Checks in code:

- Do the interactions behave as expected?
- Did I accidentally introduce something outside the design system?
- **Colors persist into the actual model metadata**, so is it wired correctly?
- Would the user have to scroll too far?
- Is it clear where this setting lives?

**The catch:** working in the real thing, he realized that if users can override
the accessibility colors, there needs to be a warning. A static mock of a color
picker would not have surfaced that.

### 7. Critique, with full repo context

Runs the design critique skill **over the actual repo locally, so it sees the
full context.** Not over a screenshot.

### 8. PR and review

- **Morgan writes the UI changes himself**, from a design perspective
- **Claude Code lists the technical changes**
- Requests review from devs
- Uses Claude Code for pipeline problems
- Merge

## What this demonstrates

**The model generates and enumerates. Morgan judges.** Roughly ten design
decisions appear in the sequence above and the model made none of them: scope,
per-project vs per-diagram, palette placement, premade themes as the base,
grouping 40+ objects, whether built-in colors cohere, the accessibility warning,
scroll depth, discoverability of the setting, and what to hand off when.

**Prompting is used as a thinking tool.** Writing the prompt is where the workflow
nuances surface. Reviewing iterations is how he finds what he forgot to specify.
That is a different claim from "it generates my designs."

**The taste inputs are analog.** Conference floor branding and devs' IDE themes.
Not other AI output.

**Prior art starts with the incumbent.** Cameo's stereotype feature, because users
are already trained on it. Consistent with "meet users where they are."

**Working in the real medium closed the loop.** The accessibility override warning
was caught because the prototype was real and the colors persisted into actual
model metadata. This is the concrete answer to "what changed about the outcome,
not just the speed."

## What Morgan will not hand to a model

**Anything requiring real systems engineering subject matter expertise.**
Technical workflows get mapped by hand. The reason is epistemic rather than
ideological: systems engineering is niche enough that he cannot assume the
training data is there. Use the model where coverage is dense; do not where it is
sparse.

**MR review for UI-centric features, always manual.** "I need to go in and click
around, see what feels clunky, see the interactions I didn't expect."

**The underlying principle:** generation is delegable, evaluation is not.

## What broke: leaving Figma

Tried Figma Make and the Figma MCP when they launched. The results were never
what he wanted, and the realization was sharper than the tooling verdict:

> "I realized I was just trying to find reasons to justify continuing to use
> Figma."

**Why this matters beyond tooling.** Designers are professionally defined by
Figma. Recognizing that he was rationalizing to preserve an identity-linked tool,
then leaving anyway, is the same psychology Sysgit's users face with Cameo:
attachment to a bad tool because competence in it is part of who you are.

Morgan has experienced that attachment from the inside and broken it. That is the
credibility behind the job-security insight, and it is not a rhetorical device.

## Shipping code

**Scope:** full features. Avoids anything that would dramatically affect the
backend, gauged by ticket scope and by which objects Claude Code is touching.

**Process, deliberately unskipped.** An initial design review with a design or
prototype handoff and comment feedback, then a formal PR review like everyone
else. Having merge access did not become a reason to bypass review.

**Reception:** engineers were supportive, including early on when he was making
"a lot of junior dev mistakes."

## Effect on the design system

Writing the code changed the system itself.

- Backfilled elements like corner radii that never got prioritized otherwise
- Surfaced the real limitations of Tailwind, DaisyUI, and Headless, which were
  invisible from the design tool
- Produced a more cohesive system from the development perspective

## Team adoption

The team is, in Morgan's words, "maybe a little too gung-ho about AI for writing
code, reviewing code, unit tests." No claim that he evangelized a practice. The
honest version is that everyone is figuring it out together.
