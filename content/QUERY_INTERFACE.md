# The query interface (formerly "the bot")

**Terminology correction, Morgan's:** "chatbot" is the wrong phrase and it was
steering the design. The goal is an interface for hiring managers to interact
with the corpus in a way that is not cringe. Chat is one view. It is the laziest
one.

## The organizing idea

Sysgit gives users graphical, tabular, and code views over the same model. That
is the pattern. One corpus, several views, chosen by what the reader is trying to
do. Applying Morgan's own product thesis to his own portfolio is coherent rather
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
