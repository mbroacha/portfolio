# Sysgit case study draft (prose)

Mirror of `src/pages/Sysgit.tsx` for reading and editing. Edit here or there, but
keep them in sync until the compile script exists.

**Sidebar.** Git for hardware. Modeling, requirements and version control in one
workflow, for engineers who are not developers.
Role: Design Lead, sole designer · 2023-2026 · 1 designer (me), 6 engineers ·
Scope: product, design system, research, strategy, brand, front-end PRs · Web, on-prem

*No Overview section. The sticky sidebar carries role, timeline, team and scope,
so the content column starts where the argument starts.*

---

## Problem

**Systems engineering is a coordination problem, and it scales badly.**

Licenses are expensive and per-seat, so they limit who can even open the file.
Teams work in different tools, with security gates between them, and no async
version control. Formal reviews become long meetings where nobody can agree what
the source of truth is.

**The tools are not neutral. They encode a process.**

Our founders came from SpaceX, where hardware ran on software practices. Version
control, fast iteration, and systems engineering treated as something you revise
continuously rather than something you approve once.

Legacy manufacturers and their government customers work the other way, and their
tooling encodes it. A tool with no async version control is not a neutral
container. It assumes a process where the model gets approved rather than
iterated, and it makes any other way of working expensive.

The schedule is where that shows up. Falcon 9 took roughly four and a half years
end to end. A new DoD capability typically takes eight to eleven. The F-35 has
been in development since 2001.

**Bad design is only one reason this continues to be a problem.**

The legacy enterprise tools in this space won on procurement, not on product.
Their vendors have been very effective at securing government contracts structured
so that anyone on certain programs has to use their software. That relationship is
the moat, and UX was never the thing that won it.

It is also genuinely hard. Interoperability, security and flexibility are
difficult to solve together.

The reason that took me longest to see: these tools are complicated enough that
operating them has become the job. In defense especially, that complexity is job
security. Resistance is not a usability problem.

## Constraints

**Security, on-prem by default.** The working question is what this looks like on
an old Dell running Windows XP. A customer may hold a FedRAMP level while
individual users inside it hold different clearances and still need to share
artifacts. It is freeing, in a way. No bespoke filetypes, no flashy workflows.
Assume everything ends up in a PDF or in slides. It also means a good portion of
our usage cannot phone home, so we are partly blind by design.

**A language I cannot change.** SysML v2 is not great. Its governing body has said
plainly that interpretation is up to the community, and everyone is risk-averse
about being the one to define it. So I sometimes ship contexts that are non-ideal
and not completely human friendly, because that is the literal wording of the
spec. I have argued for translating it and lost that argument more than once.

**Two cohorts, one artifact.** The systems engineer is often the only person in
the building fluent in Git. The stakeholders who validate their models are not,
and should not have to be.

**Scale.** Requirement sources regularly exceed 1000 items, so filtering, bulk
actions and raw performance are table stakes rather than features.

## Insight

> **One less tool beats one task done perfectly.**

From 30+ interviews with systems engineers, reached by embedding myself in our
RevOps process rather than waiting for research to be scheduled.

**I went in holding a rule every designer is taught, and had to abandon it.**
Solve one problem really well. I pushed hard on it early, then had to stop and
treat the problem as an ecosystem instead.

The reason is procurement, not craft. Customers run several tools with several
integrations and have to justify every seat they buy.

This is why Sysgit covers both modeling and requirements management rather than
nailing either one alone.

## Decisions

### Syntactic rigor over canvas fluidity

*Rejected: the general-purpose canvas idiom. Quick-deploy shapes, free snapping,
arbitrary color.*

**Why.** In hardware modeling a square is not a square. It carries model metadata,
and position and lines have specific meaning. The diagram also has to translate
directly into the mental model of coded files, and back, for people who think
visually and people who think in code.

**Tradeoff.** Less fluid than a general-purpose canvas. I designed toward the bare
minimum required for an object to exist, and no further.

**Result.** The side-by-side diagram editor and IDE is the feature we get the most
positive feedback on, and the most requested upgrades.

### Git Lite

*Rejected: both extremes. Full Git exposure, and hiding version control entirely.*

**Why.** It mirrors my own learning curve with GitLab. Mapping branching, merging
and review onto engineering design vocabulary lets software-fluent users pick it
up immediately, while stakeholders never have to learn Git. That meant a lot of
work behind the curtain.

**Tradeoff.** When a pipeline breaks the user has little control or visibility. We
surface only the safe remedies, update the branch from main or un-draft a PR, and
defer the rest to someone who knows Git. A good chunk of the process is obscured.

**Result.** Non-software stakeholders can review and approve models without
learning a version control system. The failure state is still the weakest part of
the product.

### A table that behaves like a document

*Rejected: a pure document editor, and a pure object database UI.*

**Why.** Requirements arrive as documents whose meaning comes from numbering and
indentation. They are frequently government-issued and sometimes legally binding.
We have to turn lines of text into shapes with metadata containers, and always
into code. A table meets in the middle.

**Tradeoff.** I wanted the writing experience to be completely fluid. It is not
quite the same as writing in a document.

**Result.** Cells become fungible objects. "speed = 75 km/h" can be tokenized and
updated through other tools, requirements link to verification tests, and
decomposition from broad to specific is visible. Sources regularly exceed 1000
requirements, so filtering, bulk actions and performance were mandatory.

### Reversed: the commenting system

*Rejected: the version I built. Threads on diagrams and tables, review comments
and object comments as separate entities, reviews respecting the Git provider's
setting for open threads.*

**Why.** I assumed collaboration needed a discussion layer. I designed the whole
workflow before questioning the premise.

**Tradeoff.** Design time on a workflow that did not ship as specified.

**Result.** Too convoluted to implement, and users were ambivalent. The async
version control model was already doing the collaboration work. I had designed a
synchronous-feeling layer on top of an async system.

## Outcome

**What shipped.** In two years: the diagramming tool, requirements table, IDE, CSV
upload, views and filters, diffing in code, table and graph form, reviews,
branching and merging, and integrations with GitHub, GitLab, Gitea and Forgejo.
Every feature is in use by someone. Nothing sat on a shelf.

**How we measure it.** Acquisition. This market is governed by procurement and
adverse incentives rather than usability. The meaningful question is whether
organizations already locked into a legacy tool bought anyway. The US Air Force,
Leidos, GTRI, Tradewinds and Constellr did, from a company of seven.

The diagram and IDE pairing draws the most positive feedback and the most
requested upgrades. That is anecdotal, and I would not present it as anything
else.

## Reflection

**I would have got into RevOps much sooner.** It is far more powerful to say that
a feature will push a $400K deal over the finish line than to argue it on its
merits. Learning to make the case in revenue changed what I could get built.

Some of our blindness is structural, since on-prem deployments cannot report back.
The rest is that we have not gotten to it. I would like to know which screens
people live in, for how long, and what they are actually querying.

**The thing I still think about.** The question that came up constantly, from
users who were learning this as they went, was "what should our standard
operating procedure be?" Nobody has defined how SysML v2 should actually be used.
Its governing body handed that to the community. We were in a unique position to
set that standard and we were too cautious to take it. That is the piece of work I
did not get to do.

---

## Artifacts, 7 slots

The page carries seven media slots. Every decision has its evidence adjacent to
the claim it proves.

| Where | Slot | Status |
|---|---|---|
| Top | Hero, 16:9 | Placeholder |
| Insight | Where the tool sits in a customer's stack | Placeholder |
| Decision 1 | Diagram editor and IDE, side by side | **Interactive recreation. Highest priority.** |
| Decision 2 | Branch, review, merge, in engineering vocabulary | Placeholder |
| Decision 3 | Requirements table, 1000+ rows | **Interactive recreation** |
| Decision 4 | The commenting system that did not ship | Placeholder |
| Outcome | Shipped surface area, 2023-2026 | Placeholder |

Showing the reversed commenting system is worth doing. Publishing rejected work
is rarer than publishing shipped work and reads as confidence.

## Deliberately left in the corpus

Per QUERY_INTERFACE.md, the page is the argument at reading length. These stay in
`sysgit.md` and surface on query:

- The Git Lite bus-factor problem and the rebuttal on DevOps supply
- The automated PM, one founder override per sprint
- The full build-a-system-for-the-missing-function table, seven instances
- The pipelines decision as a standalone block
- The competitive analysis script
- The hybrid diagramming toolbar reasoning
- MUI DataGrid replacement
