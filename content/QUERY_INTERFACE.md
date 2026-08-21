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
