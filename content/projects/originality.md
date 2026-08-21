---
slug: originality
title: Originality (Authorship)
company: Turnitin
url: ""
role: Senior UX Designer
timeline: 2018 (shipped 2018 or 2019 - resolve)
domain: Academic integrity
outcome: "See Outcome. Both figures need provenance before republishing."
publishable: yes
tags: [Machine learning, Enterprise UX, Information architecture, Team lead, User research, Design system]

industry: edtech
company_stage: enterprise
user_type: B2B
problem_type: [research-heavy, systems, ai-adjacent]
artifacts_available: [product screens, research photos, sketch progression, before/after]
---

## Status

Already written as a bespoke page at `src/pages/Originality.tsx`, with four
custom interactive components. This file captures it as corpus and records the
gaps. **Do not rewrite the page wholesale — it is the strongest thing in the
portfolio.** Fix the accuracy issues, add the missing decision fields.

## Context

Turnitin, 2018. A product using machine learning to identify patterns in student
writing that might indicate **contract cheating** (work written by someone else
for payment). The markers and anomalies were esoteric and confusing to users.

## Team and org

- **8-9 engineers** across front end and ML
- **An actual PM** (unlike Beacon or Sysgit)
- Morgan worked on this product solo, but inside a **20-person design org** with
  formal design processes and critiques
- **"Team lead" means people leadership:** Morgan was lead to **3 junior
  designers** working on separate products

**Fix the page.** The footer currently credits Morgan alone. With 8-9 engineers
and a PM, that under-credits the team and overstates her scope.

## Problem

> "The system did not tell you if a student cheated. It gave you signals and
> expected you to decide."

The brief Morgan was given was to improve the results page. After interviewing
educators she reframed it: the problem was not the page, it was that every
possible signal carried equal weight. Users sifted noise that produced anxiety
rather than confidence.

The deeper risk: the system could imply wrongdoing, but the user had to take
responsibility for acting on it.

### Constraints (user-side)

- **High-stakes decisions.** Accusing a student has serious academic
  consequences. Users needed confidence and defensibility.
- **Ambiguous signals.** No single factor proved cheating. Evidence was
  probabilistic and interconnected.
- **Time pressure.** Investigations were slow and manual.
- **Mixed expertise.** Experienced investigators had strong intuition. New users
  had none.

## Research

Expert interviews plus a card sorting exercise with experienced investigators.
Findings:

- Not all signals are equal; some are consistently more persuasive
- Evidence is rarely isolated; patterns across signals matter more than flags
- Investigations follow a mental workflow, not a linear report
- New users need guidance, not just data

## Insight

> "Educators were not asking for more signals. They needed permission to use
> their own judgment. The score had become the authority in the room."

**Opportunity:** reframe from detection authority to investigation support.
Prioritize persuasive signals, guide non-experts, let instructors own the
verdict.

## Decisions

Each has rationale, tradeoff, and impact. **None has a stated rejected
alternative** — that is the main gap. See Gaps below.

1. **Condense into a readable format.** Users were overwhelmed by volume, not
   lacking information. Tradeoff: less visibility into raw data. Impact: focus on
   relevant signals instead of scanning everything.
2. **Introduce a fixed summary.** Users needed a starting point. Tradeoff: the
   system influences user attention. Impact: faster orientation, more consistent
   investigation paths.
3. **Visualize trends across assignments over time.** Signals are meaningful in
   context. Tradeoff: added abstraction layer. Impact: behavioral patterns rather
   than isolated anomalies.
4. **Add tagging, notes, and case-building tools.** Investigations happen over
   time. Tradeoff: more product complexity. Impact: users build and revisit cases
   instead of relying on memory.

Sketch caption notes automation and workflow-heavy approaches were explored and
rejected. One line, unexpanded.

## Outcome

- **+2000%** increase in contract cheating detection at University of New South
  Wales
- **16,000** institutions using the product globally

**Both need provenance before republishing.** See Gaps.

## Reflection

1. **Demote the score, elevate judgment.** Make the score where a conversation
   starts, not where one ends.
2. **Design for investigation, not accusation.** Punitive to collaborative is not
   softer language; it is changing who holds the verdict.
3. **Ask who machine learning serves.** "The screens still center on numeric
   scores and maybes. I left with a different question than I came in with: who
   is machine learning supposed to serve?"

## The buried story: the algorithm was not the signal

This is the strongest material in the project and it is **not on the current
page.**

### What the company built and sold

Enormous development effort went into an ML algorithm that could detect contract
cheating quantitatively and defensibly. Before it, teachers worked on vibes: *the
student does not normally write this way, they do not usually use this language.*
Vibes are impossible to defend when the outcome is serious academic punishment.

So the team trained the algorithm on thousands of student papers already in
Turnitin's corpus from a separate product, analyzing sentence complexity,
vocabulary, diction, and readability to build a writing profile for each student
to compare future work against.

**This cutting-edge algorithm was what the company sold, and what Morgan
initially designed around.**

### What the research found

> "The irony is that the vast majority of the time, you can tell if a student
> cheated just by looking at the metadata of the paper: author name, editing
> time, dates not matching up."

Learned both internally and anecdotally from professor research partners.

### The tension Morgan had to design inside

She pivoted to highlighting the most damning signals, which were largely the
mundane metadata ones, **while still having to demonstrate that the algorithm was
valuable.**

That is a commercial and ethical tension, honestly stated: the interface had to
tell the truth about which evidence was persuasive without undercutting the
differentiator sales was selling.

### Why this matters more than anything else on the page

1. **It is the real rejected alternative.** Decision 1, "condense into a readable
   format," is the sanitized version of *I deprioritized our flagship algorithm's
   linguistic analysis in favour of file metadata.* Say the real thing.
2. **It earns the third reflection.** "Who is machine learning supposed to serve"
   currently reads as vague philosophising. With this context it is a conclusion
   drawn from evidence.
3. **It is the strongest AI credential in the portfolio, and it is from 2018.**
   A designer who discovered through research that the expensive ML
   differentiator was less useful than boring metadata, and who then had to
   navigate the commercial consequences, is telling an extremely 2026 story seven
   years early. It predates every AI tool Morgan uses.

## Org and business constraints (missing from the page)

- **Legal.** The product could not say a student was cheating. Morgan had to
  design it very carefully as a tool that surfaces suspicious factors in a
  student's body of work.
- **Company reputation.** Turnitin's flagship Similarity product had a poor
  reputation: frequently wrong, hard to interpret, and easy to find complaints
  across social media and Reddit from students unfairly accused. Morgan had to
  work inside that ecosystem and navigate damage already done.

This makes "demote the score" far more meaningful. She was designing against her
own company's history of producing over-trusted scores.

## What went wrong

**"Investigation Recommended" was too damning.** Morgan first made the product
prescriptive, using that phrasing. User research found educators still read it as
an accusation. She backed the severity down and moved to more nuanced signals that
bring a piece of work to a teacher's attention rather than pronouncing on it.

A real reversal, corrected by research. Put it on the page.

## Resolved facts

- **Contract cheating**, not AI-use detection. In 2018-2020 AI was not mature
  enough to be the issue. Turnitin now sells an AI detection product; **Morgan did
  not work on it.** Machine learning was the backbone of contract cheating
  detection, so the ML framing is accurate; the AI-writing framing is not.
- **Shipped 2019.**
- **+2000% source:** Sydney Morning Herald, August 2019, "Cheating found at UNSW
  up by 2000 per cent as new detection methods used." Paywalled.
  https://www.smh.com.au/education/cheating-found-at-unsw-up-by-2000-percent-as-new-detection-methods-used-20190814-p52gz4.html
  Attribute it as UNSW's reported increase following new detection methods, cited
  to SMH. Do not imply it measures Morgan's redesign specifically.
- **16,000 institutions:** keep, labelled as product scale.
- **2019-2022 at Turnitin:** Gradescope, which Turnitin had acquired. That
  accounts for the rest of the tenure.

## Gaps

### 1. ACCURACY: the subtitle describes the wrong product

Current subtitle: *"Originality flags potential AI use in student writing."*

The body of the same page says 2018, machine learning, **contract cheating**.
Contract cheating is work written by another human for payment. AI-writing
detection is a different capability that Turnitin shipped years later.

Describing 2018 ghostwriting-detection work as AI-use detection is inaccurate,
and an edtech hiring manager will catch it. It also reads as retrofitting the
work to sound more AI-relevant, which is the same category of risk that put
`command-center-risk-modeling.ts` in `_to_delete/`.

**Fix the subtitle to say contract cheating.** The AI-adjacency argument survives
without it: this is a case study about designing around a probabilistic signal
that users over-trust, which is the central AI design problem.

### 2. Metric provenance

- **+2000% at UNSW.** Startling number. Where does it come from, is it published,
  and is it attributable to this redesign or to the product overall?
- **16,000 institutions.** Product scale, not Morgan's impact. Label it as such.

### 3. Missing rejected alternatives

Four decisions, four tradeoffs, zero rejected alternatives. The Sysgit and Beacon
blocks have them and are stronger for it.

### 4. No org or business constraints

All four constraints are user-side. Nothing about shipping into an existing
enterprise product, legal exposure, or what Morgan could not change.

### 5. No failure or reversal

Sysgit has the commenting system. Beacon has visual ambition over IA. Originality
has three reflective lessons but no thing that went wrong.

### 6. No collaborators

Footer credits Morgan alone. Tags claim "Team lead." Who else was involved?

### 7. Date inconsistency

Page says shipped 2018. The old portfolio said shipped as part of the Originality
package in 2019.

### 8. Four years, one project

Morgan was at Turnitin 2018-2022. This covers one 2018 project. What happened in
2019-2022, and does any of it belong here?
