# Originality case study draft (prose)

Mirror of `src/pages/Originality.tsx`. Keep in sync until the compile script
exists.

**Sidebar.** Contract cheating detection. Machine learning flagged the papers.
Educators had to decide what it meant.
Role: Senior UX Designer · 2018, shipped 2019 · 8-9 engineers and a PM, inside a
20-person design org, lead to 3 junior designers · Scope: research, product
design, information architecture · Web

---

## Problem

**The system did not tell you if a student cheated. It gave you signals and
expected you to decide.**

Contract cheating is work a student paid someone else to write. In 2018 we shipped
a product that used machine learning to find patterns in student writing that
might indicate it. The markers and anomalies were esoteric and confusing.

My initial brief was to improve the results page, but after interviewing educators
I reframed the problem. It was not the page. It was that we gave equal weight to
every possible signal, so users sifted noise that generated anxiety rather than
confidence.

Underneath that was a harder challenge. The system could imply wrongdoing, but the
user had to carry the consequence of acting on it.

**We were selling an algorithm, even if it wasn't the best signal.**

Enormous engineering effort went into the model. It analyzed sentence complexity,
vocabulary, diction and readability across thousands of papers already in the
corpus, building a writing profile for each student to compare future work
against. Before it, educators worked on instinct, and instinct is impossible to
defend when the outcome is a serious academic penalty.

Then research kept telling us the same thing. Most of the time you can tell from
the file metadata. The author name. The editing time. Dates that do not line up.
We heard it internally and from our professor research partners.

So I pivoted to surfacing the signals that were actually damning, which were
largely the plain ones, while still having to demonstrate that the algorithm we
were selling had value.

## Constraints

**Legally, we could not accuse anyone.** The product could not say a student
cheated. I had to design it very carefully as a tool that surfaces suspicious
factors in a body of work. Accusing a student has serious academic consequences,
and users needed confidence and defensibility rather than a verdict.

**Our own reputation.** Turnitin's flagship Similarity product was frequently wrong
and hard to interpret, and you can still find students and teachers bemoaning
unfair accusations because of it. I was designing inside that ecosystem, against damage
the company had already done.

**Probabilistic, interconnected evidence.** No single factor proved anything.
Signals only meant something in combination, which is exactly the kind of
reasoning an interface flattens by accident.

**Two kinds of user, one report.** Experienced investigators had strong intuition
and limited time. New users had no intuition at all. The same report had to serve
both without patronizing one or abandoning the other.

## Research

**We asked experts to define what actually matters.** Expert interviews and a card
sorting exercise with experienced investigators. Four findings:

- Not all signals are equal. Some are consistently more persuasive when making a case.
- Patterns emerge across a term, not within a single paper.
- Investigations follow a mental workflow, not a linear report.
- New users need guidance, not just data.

## Insight

> **Educators were not asking for more signals. They needed permission to use their
> own judgment.**

The score had become the authority in the room.

**Reframe the product from detection authority to investigation support.**
Prioritize the persuasive signals. Guide the non-experts. Let the instructor own
the verdict.

That reframe is what turned four separate feature decisions into one argument, and
it is why the redesign was about hierarchy rather than accuracy.

## Decisions

### Lead with the evidence that persuades, not the evidence we sold

*Rejected: leading with the algorithm's linguistic analysis, which was the
company's differentiator.*

**Why.** Users were overwhelmed by volume, not short on information. Every signal
carried equal weight, so the persuasive ones and the noise looked identical. The
signals that actually made a case were often the plainest ones.

**Tradeoff.** Less visibility into raw data, and I was demoting the thing we sold.

**Result.** Users could focus on relevant signals instead of scanning everything.

### Introduce a fixed summary

*Rejected: letting each investigator find their own starting point.*

**Why.** Experienced investigators had strong intuition about where to begin. New
users had none, and the report gave them nowhere to start.

**Tradeoff.** The system now influences where attention goes first. That is a
position we are taking on someone else's investigation.

**Result.** Faster orientation and more consistent investigation paths.

### Show trends across assignments over time

*Rejected: treating each submission as a self-contained report.*

**Why.** Signals are meaningful in context, not isolation. A single anomaly proves
nothing. A pattern across a semester is a different conversation.

**Tradeoff.** An added layer of abstraction between the user and the document in
front of them.

**Result.** Users could identify behavioral patterns instead of isolated anomalies.

### Add tagging, notes and case-building

*Rejected: optimizing for the single-session report scan.*

**Why.** Investigations happen over weeks, not in one sitting. Users were
reconstructing their own reasoning from memory every time they came back.

**Tradeoff.** More product complexity, on a product already accused of being hard
to interpret.

**Result.** Users could build and revisit cases instead of relying on memory.

### Reversed: prescriptive language

*Rejected: the version I designed first, which labeled findings with phrases like
Investigation Recommended.*

**Why.** I thought guidance meant telling users what to do next. For non-experts
especially, a recommendation seemed like the helpful thing.

**Tradeoff.** Design time on a language system that had to be walked back.

**Result.** Research showed educators still read it as an accusation. I lowered the
severity and moved to signals that bring a piece of work to someone's attention
without pronouncing on it.

## Outcome

**A scannable report that supports an investigation over time.**

The redesigned system reduced time to interpret reports, improved consistency
across investigations, and made the product usable by people who were not experts
in it.

In August 2019 the Sydney Morning Herald reported that cheating found at the
University of New South Wales was up 2000% following new detection methods. That
figure is UNSW's reported detection increase, not a measure of this redesign.

16,000 institutions used the product globally. That is product scale rather than
my impact.

## Reflection

**Demote the score, elevate judgment.** Instructors were not asking for better
signals. They were asking for permission to use their own judgment. The job was not
to make detection smarter. It was to make the score where a conversation starts
rather than where one ends.

**Design for investigation, not accusation.** Moving from punitive to collaborative
does not mean softer language. It means changing who holds the verdict, and
building tools that support a case over time instead of a one-off report scan.

**Ask who the machine learning is serving.** We spent years on a model that turned
out to be less useful than a file timestamp, and I spent months designing around
the gap between what we sold and what actually persuaded anyone. The screens still
center on numeric scores and maybes. The assumption underneath these tools runs
deeper than one redesign. I left with a different question than I came in with.

---

## Artifacts

Unlike the other two case studies, this page has almost no placeholders. Four
components are already built and interactive.

| Where | Artifact | Status |
|---|---|---|
| Hero | Authorship dashboard | Real image |
| Research | Workshop sticky notes | Real photo |
| Decisions intro | Design evolution sketches | Real image |
| Decision 1 | Submissions report table | **Interactive** |
| Decision 2 | Prioritized summary modal | **Interactive** |
| Decision 3 | Essay integrity dashboard | **Interactive** |
| Decision 4 | Tagging, notes, case tools | **Interactive** |
| Outcome | Before / after slider | Real images |

Eight artifacts, four of them working components. This is the most complete page
in the portfolio and the reason the other two need their slots filled.

## What changed in this pass

- **Subtitle corrected.** It said the product flagged AI use. It detected contract
  cheating, written by humans, in 2018. Turnitin's AI detection is a separate
  product Morgan did not work on.
- **The metadata story added.** The strongest material in the project and it was
  not on the page.
- **Legal and reputation constraints added.** Both were missing; all four
  constraints had been user-side.
- **The reversal added.** "Investigation Recommended" tested as too damning.
- **Rejected alternatives added** to all four original decisions. They had
  tradeoffs but no rejected alternatives.
- **Team credited.** 8-9 engineers and a PM. The page previously credited Morgan
  alone while the tags claimed team lead.
- **Ship date corrected to 2019.**
- **2000% figure sourced** to SMH, August 2019, and attributed as UNSW's reported
  increase.
- **Converted to `CvPage`** so it has the sticky rail like Sysgit and Beacon.
