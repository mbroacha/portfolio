# The query interface (formerly "the bot")

**Terminology correction, Morgan's:** "chatbot" is the wrong phrase and it was
steering the design. The goal is an interface for hiring managers to interact
with the corpus in a way that is not cringe. Chat is one view. It is the laziest
one.

## The organizing idea

Sysgit gives users graphical, tabular, and code views over the same model. That
is the pattern. One corpus, several views, chosen by what the reader is trying to
do. Applying Morgan's own product thesis to her own portfolio is coherent rather
than gimmicky, and it reinforces the recursive framing in projects/sysgit.md.

The corpus is already structured for this: projects, decisions, rejected
alternatives, constraints, domain, role, company stage, problem type.

## Candidate views, ranked

1. **Lens.** Reader declares who they are. The page reassembles: work reorders,
   different decisions surface, bio emphasis shifts. Answers are page content,
   not chat bubbles. No conversation state to maintain.
2. **Interrogation.** A fixed set of hard questions the reader pulls on. What went
   wrong. What did you say no to. Where were you overruled. Reframes the
   interview answer bank as an interview the reader conducts. The questions
   themselves signal confidence.
3. **Marginalia.** Questions surface inline beside the thing they concern;
   answers appear in the margin, linked to source.
4. **Free-text ask.** Still present, underneath. No longer the headline.

## Non-negotiable rules

- No avatar, no persona, no greeting. It never speaks as Morgan.
- **Morgan's pronouns are she/her.** Any answer that refers to her in the
  third person uses them. This is a fact about the subject, not a style choice,
  and it belongs in the system prompt as well as here.
- No typing-indicator or thinking theater.
- Answers are short and always land the reader somewhere real.
- Declines cleanly: "Morgan hasn't written about that." No apology.
- **Confidential material is absent from the corpus, not flagged inside it.**
  The rule for anything Morgan cannot disclose is to leave it out of the
  source files entirely rather than write it down beside a warning. A model
  reading the corpus cannot leak what is not there. Two live cases: the Sysgit
  MCP server, and three customers who are not on sysgit.io. Neither is named
  anywhere in `content/`. Do not add them back.
- Visually part of the site, not a widget bolted onto it.
- **Traceability:** every answer names its source. This is requirements
  traceability applied to a portfolio, which is the same principle behind the
  bespoke tables Morgan built at Sysgit. It is also the honest fix for
  hallucination.

## The standard it has to meet

Morgan said no to chatbots at Sysgit because nobody could demonstrate the actual
need. The same bar applies here. If a view cannot answer "what does this do that
a well-written page does not," it does not ship.

## Static vs dynamic: settled

**Case study narratives are static.** Fixed order, identical for every viewer,
prerendered and crawlable.

Three reasons:

1. **A case study is an argument, not a database view.** Sysgit's narrative only
   works in sequence: procurement analysis, then adverse incentives, then "one
   less tool," then the product covering both MBSE and requirements management.
   Reordering by viewer preference breaks the causal chain that makes the
   conclusion land.
2. **Referral traffic is the most valuable traffic.** Someone forwards Morgan to
   their director. If the two of them see different content the conversation
   breaks and neither trusts the page.
3. **Self-rearranging content reads as sales.** PRODUCT.md's anti-references
   reject exactly this, and it contradicts the interpret-but-keep-the-raw-data
   principle Morgan applied at Sysgit and Beacon.

**What is dynamic:**

- Which case study the reader lands on first, and work list order
- Depth: decisions collapsed or expanded by relevance, content identical either way
- The margin: query interface answers alongside, deep-linking into the static pages
- Sidebar bio emphasis

**The framing, which is Morgan's own product thesis.** Sysgit provides graphical,
tabular, and code views over the same model. The model does not change; the view
does. The case study is the model.

## Consequence for writing

The corpus holds more than any page shows. The page is the curated argument at
reading length; the remainder surfaces on query.

Material that stays in the corpus rather than fighting for page space:

- The Git Lite bus-factor problem
- The reversed commenting system
- The Figma-attachment story
- The six-instances table of building missing org functions
- The career arc table

Depth no longer competes with readability. Write the page for the reader with
ninety seconds; let the interface reach the rest.


## Template correction: no Overview section

Cut from the Sysgit case study, and it applies to Beacon, Originality and
Gradescope too.

**Why.** A conventional case study opens with an overview because there is
nowhere else to put role, timeline, team and scope. The Dark CV layout has a
sticky meta sidebar that carries all of it. An Overview section then either
repeats the sidebar field for field, or fills with product marketing.

Morgan's verdict on the draft: "either redundant to the sidebar, or unnecessary.
This sounds like sales copy." Correct on both.

**The rule.** The content column starts where the argument starts. Hero image,
then PROBLEM. Anything an Overview would have carried belongs in the sidebar
(what it is, what I owned) or in OUTCOME (what changed, who bought it).


---

# SETTLED: placement and mechanics

Decided with Morgan, September 2026. This section overrides the "candidate views,
ranked" list above, which was exploratory.

## The two constraints Morgan set

1. The first interaction can be a prompt, **as long as it is not annoying.**
2. It must not prevent someone from direct-linking the homepage **as they saw it.**

Both are solved by the same mechanism: **the lens lives in the URL.**

- `/` is the prompt.
- `/?lens=hiring` is the answered page.

Anyone arriving at a lensed URL never sees the prompt. They see what the sender
saw. Sharing works, back works, and the prompt cannot fire twice on one link.
This is the fix for the referral case in "Static vs dynamic" above, which is the
scenario that breaks every self-rearranging site.

## Why the prompt is not annoying

**It is the top of the page, not a layer over it.** No modal, no dismissal, no
typewriter, no greeting.

The full work list sits directly below it. Ignoring the prompt costs one scroll.
Answering costs one click on a visible chip. Nothing is gated and nothing is
hidden, so there is no state to remember and no cookie to set. The default state
of `/` is the prompt, which is not a nag, it is just what the page is.

The reference is a search field at the top of a list. Nobody resents one, because
it does not block anything.

## The three lenses

Each must render a visibly different page. If two produce the same thing, delete
one.

| Lens | Work order | Surfaces | Bio leads with |
|---|---|---|---|
| `hiring` | Sysgit, Beacon, Originality, Gradescope | Decisions expanded by default. Ownership, scope, team size. | Sole designer. Six hard domains, none known going in. |
| `engineering` | Sysgit, How I Work, Originality, Beacon | Front-end PRs, the AI practice, Git Lite, the design system. How I Work is promoted to a peer of the case studies. | Prototypes in code, ships her own PRs. |
| `browsing` | Artifact-led, image first | Decisions collapsed. Less text, more frames. | The shortest version. |

**No smoke and mirrors.** Reordering the list, changing which decisions start
expanded, and swapping the leading bio sentence are real operations over the
corpus JSON. Small, but true. This is a portfolio for a design role, so being
caught doing theater costs more than not doing it.

## Interrogation: mobile first, then the rail

Morgan's call: a field on the case study side rail. The rail collapses below
`md`, so **mobile was designed first and constrains the desktop version.**

### Mobile

The collapsed rail stacks above the content. Interrogation cannot go there:
asking a question before reading the case study is backwards.

Placement is a section near the end of the page, after REFLECTION and before
PrevNext. Questions visible as a list. Answers expand inline. The source link
scrolls up and marks the passage.

### Desktop

Same component, same data, placed in the sticky rail.

The rail is `max-h-screen` with its own overflow scroll, which sets a hard
content constraint: **answers must fit in roughly 60 to 90 words.** That is a
layout decision dictating a writing rule, and the answer bank has to respect it.

### The field itself

A real text input, not a select dressed as one. Client-side retrieval over a
JSON answer bank: the typed question is scored against the bank and the nearest
pre-written answer returns. **No backend, no model, no API key.** This runs on
GitHub Pages, which is what keeps the hosting decision in section 3 of
PORTFOLIO_PLAN.md correct.

Fixed questions sit below the field as suggestions, so the reader can see what it
is good at without having to guess.

When nothing scores well enough it declines: "Morgan hasn't written about that."
No apology, no improvisation. **A retrieval system that declines is more honest
than a model that guesses, and the decline is the feature, not the limitation.**

### Why this is not a chatbot

Every answer carries its source, and the source link scrolls the main column to
that passage and marks it. The field does not generate an opinion at the reader.
It routes them into the static argument they were already reading.

That is requirements traceability applied to a portfolio, which is the same idea
Morgan shipped at Sysgit. The recursive framing holds.

## Voice: resolved

The rule above says "It never speaks as Morgan." That needs sharpening now that
the bank exists, because the pages are first person and third-person answers
beside them would read as a dossier about her.

**Answers are first person, because Morgan wrote them.** Retrieval of her own
prose is not impersonation. What the rule actually forbids is the interface
*generating* as her: no synthesized voice, no improvisation, no greeting, no
avatar, no "Hi, I'm Morgan."

The line is authorship, not grammatical person.

## What this now depends on

**The answer bank.** The interrogation is only as good as the pre-written
answers, and it does not exist yet as a structured file.

Most of the raw material is already in the corpus: the corpus-only sections in
projects/sysgit.md, the reflection material, the weakness answers, the career arc
table, the deal-attribution notes. It needs extracting into a
question-to-answer-to-source JSON, trimmed to the 60-90 word rail constraint.

That is the blocker for interrogation. Lens has no blocker.
