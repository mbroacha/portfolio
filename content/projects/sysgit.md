---
slug: sysgit
title: Sysgit
company: Sysgit
url: https://www.sysgit.io/
role: Design Lead, sole designer
timeline: 2023 - 2026
domain: Systems engineering (MBSE + requirements management)
outcome: ""
publishable: partial
tags: [0-1, Design Systems, Developer Tools, Systems Thinking, AI, Enterprise UX]

industry: systems-engineering
company_stage: seed
user_type: B2B
problem_type: [zero-to-one, systems, research-heavy, ai, developer-tools]
artifacts_available: []

# Disclosure control. See ## Disclosure below before publishing anything.
private_topics: [mcp-server]
---

## Context

Sysgit is a systems engineering platform covering both MBSE (model-based systems
engineering) and requirements management. In the industry's own terms it is a
lightweight replacement for Cameo and for JAMA/DOORS. It is built on Git and
SysML v2, which is what lets it meet compliance standards while integrating with
the rest of a customer's toolchain.

Plainer framing, for someone outside the field: a platform where engineers model
their hardware and their requirements, with AI helping to develop those models
and translate them into a standardized modeling language.

Public positioning on sysgit.io is "The Collaboration Layer for Complex Hardware"
and "build hardware at the speed of software."

**Category.** Primarily MBSE and PLM. The interesting part is that it uses the
vocabulary of a developer tool to attack an industry problem: version control,
and the fear of agile.

**Company.** Seed stage, VC funded, 7 people. Six engineers nominally, though
Morgan now pushes comparable volumes of code. Reports to the VP of Engineering.
Also serves as part-time PM.

**Morgan's scope.** Sole designer. Product design, design system, brand and logo,
user research, competitive analysis, product strategy. Plus front-end PRs and
part-time product management.

## Users

**Primary: the systems engineer embedded in a hardware company.** Frequently the
only engineer in the building who is fluent in software engineering principles
and the ubiquitous Git workflow. The day is spent wrangling hardware subsystem
teams into keeping their math and their tests in sync with the whole system.

**Secondary: stakeholders who validate models.** They do not need to operate
heavy software, but they do need to review and sign off on the models.

**What they use today.** Expensive enterprise incumbents, primarily Cameo and
JAMA. Both are complex enough that operating them has effectively become the job
itself.

## Problem

Systems engineering is a coordination problem, and it scales badly. The larger
the org and the more complex the product, the worse it gets.

Communication breaks down across four compounding failures:

- Expensive per-seat licensing, which limits who can even open the file
- Teams working in different tools
- Security gates between those teams
- No async version control

The result is that formal reviews become long, tedious meetings in which people
cannot agree on what the source of truth is.

### What it costs

Both Sysgit founders are ex-SpaceX, and the company exists to bring SpaceX's
rapid development process to other industries. The comparison the team uses:

- **Falcon 9:** roughly 4.5 years end to end
- **A new DoD capability:** typically 8 to 11 years
- **F-35:** approaching two decades

The gap is years of rework, churn, and massive budget overrun.

### Why nobody fixed it

Four reasons, and only one of them is "the incumbents are bad at UX."

1. **Procurement lock-in.** Dassault (Cameo) has been very effective at winning
   government contracts structured so that anyone on certain projects is required
   to use their software. IBM (DOORS) has built the same kind of relationship, at
   the expense of investing in UX.
2. **No complete alternative.** Nobody had shipped a competitor with all the
   capabilities, however painful the incumbent is to use.
3. **The problem is genuinely hard.** Interoperability plus security plus
   flexibility is difficult to solve together.
4. **The standard is new.** Government projects often mandate a standard
   language. Here that is SysML v2, which is very new and poorly documented.

### What the competitive analysis changed

The market splits by org size, and design leverage is not evenly distributed.

- **Small hardware teams** do not need a heavy enterprise tool. They use
  spreadsheets, they talk to each other, and maybe they use a cheap diagramming
  tool like Miro.
- **Large companies and government contractors** are frequently bound by
  agreement to a specific tool, and contain people whose professional worth is
  being a Cameo expert.
- **The sweet spot** is orgs that are adventurous, and that are very vocal when
  they love a tool.

The competing startups fail in two distinguishable ways:

- Clean, smart-looking UIs that do not reflect how systems engineering actually
  works, and that have no security capabilities
- Extremely light developer tools with no guidance and no best practices

Neither meets users where they are.

**The strategic conclusion Morgan reached:** UX and UI will not make or break this
product. Procurement structure and adverse incentives dominate. The response was
not to give up on craft but to aim it precisely: target the adventurous, vocal
segment, and treat every small reduction in friction as having a
disproportionate upswing on delight. Meet users where they are, including when
that means supporting an older language, honoring formal process, or producing
what feels like an excess of artifacts.

## Ownership

### A real Tuesday

- Talk the CEO down from diverting the agreed sprint priority because one
  customer asked for one thing in one meeting
- Run a self-built script that pulls competitors' product sites and repos and
  analyzes what they have focused on in the past week
- Exploratory design, anywhere on the double diamond: iterations in Claude
  Design, or a working prototype in Claude Code to validate technical
  feasibility with engineers and check it against the founders' vision
- Analyze customer check-in and interview transcripts for patterns that should
  drive the product board
- For features that are largely UI: create, code, and merge the PRs personally
- PR review, especially on UX and UI heavy changes
- Informal research: lurking in systems engineering Discord and Reddit

### Unasked-for decisions

1. **Replaced MUI DataGrid with bespoke table components.** MUI could not provide
   the traceability features that requirements management needs baked in. Tables
   are the core surface for requirements management, so this was not cosmetic.
2. **Owns product navigation as a standing responsibility.** Routinely reworks it
   as features ship and the app schema changes, rather than letting it accrete.
3. **Hybrid diagramming workflows.** Modern toolbars in the Miro and FigJam
   idiom, combined with the frankly Windows-95 sensibility of Cameo's endless
   panels. A deliberate concession to what expert users already know.
4. Plus "despotic control" over all colors and design tokens, with frequent
   unsolicited tweaks. Self-described as an ask-forgiveness-not-permission
   designer.

### What had to be built before design could happen

Morgan joined when the company had a few customers on a different product. The
pivot to this problem space reset almost everything, though the user base stayed
the same.

- **Research protocols came first.** Exploratory interview and feedback protocols
  built specifically to remove the founders' biases from the product equation.
- **The design system came late, and that hurt.** Nobody could wait for it, so the
  team built on the old product's components plus Tailwind libraries. Morgan
  reskinned features one at a time as they shipped.
- **Review process** was semi-formal, designed to slot into the existing dev
  review flow, running mostly on Figma comments.
- **Naming conventions** were derived by finding overlaps between systems
  engineering language and Git language. "Design reviews" is one example.
- **The roadmap** evolved out of the need for a north star, because being purely
  reactive to customer requests was a disruptive way to work. Early on Morgan did
  not groom the board and instead filed UX bugs and feature requests into the
  backlog like everyone else.

**The turn, roughly 7 months ago:** Morgan now designs, codes, and reviews in the
same medium as the engineers. That is precisely the paradigm shift Sysgit is
building for systems engineers.

### Product authority

Reports to the VP of Engineering. Part-time PM.

**The automated PM.** Morgan and the VP Eng built listeners across Slack product
requests, the support channel, the competitive analysis script, and customer
meeting transcripts. These generate weighted tickets on a Product Discovery
Board. The review process has the two of them meeting with the founders to verify
tickets quickly, with the founders allowed **one override per sprint**.

Everyone attends a weekly product meeting to discuss the automated plan, clarify
requirements, and push back on scope. Morgan also regularly drops or lightens
features based on what surfaces during design or prototyping.

### Pushback

Two sources. Engineers argue a design is more technically demanding than it
looks. Founders argue a design does not match their industry experience.

**Most recent instance.** An engineer pushed a proof of concept for a worker
management activity. Morgan tried repeatedly to reframe it as analogous to AI
agent creation and could not get it across. Resolution was sitting down with the
engineer and mapping out what the feature was actually meant to do and the
expected workflow. Morgan's own read: that mapping should have happened before
anyone touched code.

### Saying no

- **Chatbots.** Nobody could demonstrate an actual need for one.
- One-off features requested for a demo, or by a single prospective customer.
  The automated PM now absorbs much of this pressure.

## Constraints

### Security, the unsexy elephant

Everything is designed with on-prem in mind. The working question is literally
"what does this look like on an old Dell running Windows XP." A customer
organization may hold a specific FedRAMP level, and individual users within it
carry differing security clearances while still needing to share artifacts.

**Morgan's read: this is freeing.** It rules out bespoke filetypes and flashy
workflows by default. The governing assumption becomes *assume everything ends
up in a PDF or in slides*, which is a design heuristic as much as a constraint:
the artifact has to survive being flattened.

### The modeling language itself

SysML v2 is not great, and Morgan cannot change it.

This is the source of the most persistent conflict with a founder: doing
everything strictly "per spec" versus translating the concepts into something
more usable. Compounding it, the governing body of SysML v2 provides very little
guidance and has bluntly said it is up to the community to figure out. The
company is risk-averse about being a thought leader on how the language should
be used.

**The result:** Morgan often ships language and concepts he considers overly
technical, purely because that is the literal wording of the spec.

### Other fixed constraints

- Government projects mandating a standard language
- Security gates between teams
- Per-seat licensing economics on the incumbent side
- Requirement sources regularly exceeding 1000 items
- Dual-cohort fluency: visual thinkers and code thinkers, same artifact

### What being the only designer prevented

**There is no design crit.** A company full of engineers does not have strong
opinions on design, except in workflows that directly resemble their own
workflows. The consequences:

- Fewer checks than there should be
- Less outside perspective and inspiration

**The structural problem underneath.** Feedback coverage is inversely correlated
with need. Morgan's colleagues have opinions precisely where they are the user:
Git workflows, the IDE, code views. They have none where the user is least like
them, which is the government contracts officer working the requirements table,
or the non-software stakeholder validating a model. The surfaces serving the
secondary cohort get the least scrutiny, and those are the surfaces where
Morgan's own instincts are least calibrated.

**The response.** Morgan built his own design critique Claude skill to stand in
for the missing function.

## Research

### Access

Two channels, and the second is the real one.

**Conferences.** A lot of them: hardware, defense, automotive, aerospace.
Sometimes attended specifically to find the rare actual user rather than a sales
contact, and get face time.

**Embedding in RevOps.** More effective by a wide margin. Once there is a lead,
Morgan makes sure he is in the initial discussions, entering as the non-sales
"help me help you" person.

**Volume:** 30+ systems engineers.

Another instance of the build-a-system pattern. There was no research pipeline
into a famously closed industry, so Morgan built one out of the sales pipeline.

### The finding that changed the product

**"One less tool" beats "one task done perfectly."**

Morgan went in holding a canonical UX rule: solve just one problem really well.
He pushed hard on it early, then had to abandon it and treat the problem as an
ecosystem.

The reason is procurement, not craft. Customers run several tools with several
integrations and have to justify every seat purchased. In that environment,
removing a tool from the stack is worth more than being the best in the world at
a single task.

This is why Sysgit covers both MBSE and requirements management rather than
nailing either one alone. The product shape follows directly from the finding.

### The related strategic read

This is a systems problem as much as a UX problem. Everyone already knows Cameo
and DOORS are bad, so being better is not the wedge. Morgan stopped trying to
hyper-optimize every aspect of the product and aimed instead at meeting
organizations and users halfway.

### Artifacts

- All interview transcripts
- A couple of personas
- A user story
- A service blueprint

The service blueprint is the most valuable of these for the case study, because
it is the artifact that supports the ecosystem finding. Personas are the least
differentiating.

## Insight

**Candidate, surfaced in section 1 and needs developing:** the incumbent tools are
so complicated that mastery of them has become the user's job description. In
defense especially, that complexity is job security. So resistance to a simpler
tool is not a usability problem. It is an identity and career-risk problem, and
it cannot be designed away with a cleaner interface.

## Decisions

**The through-line.** Every one of these is the same problem in a different
costume: a translation problem. Every artifact in Sysgit has to be
simultaneously legible as a picture, as a document, and as code, to two cohorts
with incompatible mental models. Morgan named this himself while describing the
tables: "another form translation problem like the diagram."

---

### 1. Diagramming: syntactic rigor over fluidity

**Decision.** Build a diagram editor where every object carries model metadata,
and position and lines have specific meaning, rather than matching the feel of a
general-purpose canvas.

**Rejected.** The Miro / Lucidchart / Figma idiom as-is: quick-deploy shapes,
free snapping, arbitrary color, grouping. Morgan has strong personal bias toward
these tools and acknowledges they simply feel good.

**Why.** In Sysgit a square is not a square. It carries a large amount of model
metadata. The diagram must also translate directly into the mental model of coded
files, and back. It has to be fluent for two cohorts at once: people who think
visually and people who think in code.

**Tradeoff.** The result is less fluid than Miro. Stated plainly.

**Result.** The side-by-side diagram editor and IDE is the product's most
applauded feature. The design target became: as streamlined as possible, with the
bare minimum required for an object to exist.

---

### 2. Version control: "Git Lite"

**Decision.** Expose branching, merging, and reviews, mapped onto standard
engineering design development terminology. Hide most CI/CD overhead.

**Rejected.** Both extremes. Full Git exposure, and hiding version control
entirely.

**Why.** It mirrors Morgan's own learning curve with GitLab. Marrying Git
concepts to engineering vocabulary lets software-fluent users pick the workflow
up immediately, while non-software stakeholders never have to learn Git. That
required substantial work behind the curtain.

**Tradeoff, and it is the significant one.** The user has little control or
transparency when something goes wrong in the pipeline. In those cases the team
defers to finding a trusted Git expert.

**Open question.** See Notes: this partially recreates the incumbent dynamic.

---

### 3. Requirements tables: the document-shaped middle

**Decision.** A table that behaves like a document. Nested rows and columns with
close to the ease of writing prose, where individual cells become fungible
objects.

**Rejected.** A pure document editor, and a pure object/database UI.

**Why.** Requirements arrive as documents whose semantic meaning comes from
numbering and indentation. They are frequently Very Official, government-issued,
sometimes legally binding. Sysgit has to translate lines of text into shapes with
metadata containers, and always into code. A table meets in the middle.

**What it enables.** "speed = 75 km/h" can be tokenized and updated through
interfaces with other tools. Objects link to related objects. Relationships
between requirements and verification tests are visible. Decomposition from broad
to specific is legible.

**Constraint.** Sources regularly exceed 1000 requirements, so filtering, bulk
actions, and raw performance are mandatory rather than nice to have.

**Tradeoff.** Morgan wanted the writing experience to be completely fluid. It is
not quite the same as writing in a document.

**Team joke worth keeping:** at some point every B2B SaaS product is just
remaking Excel.

---

### 4. Pipelines: a deliberate ceiling on self-service

**Decision.** Surface only the easy remedies. Update the branch from main, or
change a PR status if it was somehow left in draft. Obscure the rest.

**Rejected.** Full pipeline transparency and self-service debugging.

**Why.** The working assumption is that a trusted Git adult sets up the repo and
the CI/CD pipeline. Morgan has personally experienced the failure mode where an
uneducated user cannot resolve a pipeline error alone, and surfacing the full
process would not have helped them.

**Tradeoff.** A good chunk of the process is obscured. Stated plainly.

---

### 5. Reversed: the commenting system

**Decision, later reversed.** Morgan designed entire workflows around comments on
both the diagram and the requirements table, with threads. Review comments and
object comments were separate entities, and reviews respected the Git provider's
setting for how to treat open threads.

**Why it was wrong.** Too convoluted to actually implement, and users were
ambivalent about needing anything that robust.

**What it cost.** Design time on a full workflow that did not ship as specified.

**The lesson, worth drawing out:** the async version control model was already
doing the collaboration work. Comments were solving a problem that branching,
review, and merge had largely absorbed. Designing a rich synchronous-feeling
layer on top of an async system was the actual mistake.

## Outcome

**Use Variant B of the case study template.** There are no product metrics. Do
not manufacture any.

### What shipped

Two years, one designer. Morgan's own framing is that it is easier to ask what
has not shipped.

- Diagramming tool
- Requirements table
- IDE
- CSV upload
- Views and filters
- Diffing in code, table, and graph form
- Reviews
- Branching and merging
- Integrations: GitHub, GitLab, Gitea, Forgejo
- MCP server (do not discuss publicly)
- Agent interface to the MCP server (do not discuss publicly)

**All customers are using all of it.** No shelfware. For a product with this much
surface area shipped this fast, that is a substantive claim.

### The metric is acquisition, and that is the correct metric

Morgan reported this apologetically: "Honestly we have no metrics. We just have
acquisition."

That framing undersells it, and his own analysis is the reason why. He
established that this market is governed by procurement and adverse incentives
rather than usability, and that the winning goal is "one less tool" rather than
one task done perfectly. In a procurement-driven market, the meaningful outcome
measure is whether organizations contractually anchored to Cameo bought anyway.

Publicly nameable: United States Air Force, Leidos, GTRI, Constellr, Tradewinds.
A seven-person seed company clearing security review and procurement at defense
primes is a harder signal than a time-on-task percentage.

Time-on-task here would be a vanity metric. The metric matches the market.

### Deal attribution is the real measure, per Morgan

From "what would you do differently": get into RevOps much sooner.

> "It's a lot more powerful to say that x feature will push a $400K deal over the
> finish line."

This is the business-impact framing the case study needs, and it beats a product
analytics number for enterprise B2B. It is also the lesson rather than just the
outcome: a designer learning to argue in revenue.

### Most positive response

The diagram and IDE pairing draws the most positive feedback and the most
requested upgrades. **Anecdotal. No numbers, no quotes.** Say exactly that.

## Reflection

**What Morgan would do differently.** Get into RevOps much sooner, for the deal
attribution reason above.

**What is still unsolved.** There is no analytics of any kind. No visibility into
which screens users spend time on, how long, usage patterns, or queries.

<!-- OPEN QUESTION: is the analytics gap partly structural? On-prem, air-gapped,
     FedRAMP-constrained deployments frequently cannot phone home. If so that is
     a domain fact rather than an oversight, and a strong answer to "why no
     metrics." Confirm before writing it either way. -->


## Artifacts to recreate

Priority order for sanitized interactive recreations, following the pattern
already proven on the Originality page.

1. **Diagram / IDE side-by-side.** Most applauded feature, and the hardest thing
   in the product to convey in a screenshot. The two-cohort fluency argument is
   invisible in a static image.
2. **Requirements table.** Traceability, decomposition, and tokenized cells are
   likewise invisible statically.
3. **Review workflow.** Supports the Git Lite decision and the async
   collaboration lesson from the reversed commenting system.

Nothing is fully unshowable except the MCP server and the agent interface on top
of it.

## Positioning

### Why hire Morgan as a first designer, in his words

> "I will understand the problem you're trying to solve as much or better than
> you do. I will always find something that needs to be done, and it can always
> be better."

The first two clauses are strong. The third is vague and should be cut or made
concrete.

### What he wants next, and it corrects an earlier assumption

**Not the SysML v2 authority angle.** Morgan wants to be hired to solve a hard
problem, and explicitly not necessarily in systems engineering.

His actual claim: he has worked in space traffic, enterprise healthcare,
educational integrity, disaster response, and government, **with no prior
experience in any of them.**

That reframes the positioning. The pitch is not "systems engineering designer."
It is: enters high-consequence domains cold and reaches competence fast, proven
across six of them. Broader, more hireable, and it is what the resume actually
shows.

**Action:** revise PORTFOLIO_PLAN.md section 4b, which assumed he would want
authority over SysML v2 conventions. He would not.

### Proudest

Growth as a designer during a rapidly changing period in the industry, with very
little guidance, while staying flexible.

### Least proud

> "I'm pretty trash at documentation and formal process. Way too much lives in my
> head at any given time, and I often ignore my own advice to others, which is
> 'never be afraid to state the obvious. It's not obvious to everyone.'"

A strong weakness answer: specific, carries a real cost, and names a principle he
holds but fails to apply to himself.

Worth using in the case study or the interview bank: this corpus is the
correction. The Sysgit intake is Morgan doing the documentation he says he
avoids, and the portfolio is the artifact that gets it out of his head.

## Notes

Corpus-only material. Not for the case study page.

### Disclosure

- **Cannot discuss:** the MCP server. Anything about it, in any context.
- **Publicly nameable customers.** These logos appear on sysgit.io, so they are
  already public: United States Air Force, Tradewinds, GTRI, Leidos, Constellr.
- **Do NOT publish without checking:** Siemens, Land Rover Jaguar, BAE Systems.
  Morgan named these as customers, but they are absent from the public site.
  Treat as confidential until confirmed.
- Everything else about the product is showable.

### The recursive framing (use this as the spine)

Sysgit's product thesis is that systems engineers should work the way software
engineers do: version control, async review, one source of truth. Over the last
seven months Morgan personally made exactly that transition, moving from
Figma-comment review to designing, coding, and reviewing in the same medium as
the engineers.

Morgan is the user story. That is the strongest available structure for this case
study, and it is not a device: it is what actually happened.

### The chatbot problem (raise before building the portfolio bot)

Morgan's stated bar for shipping a chatbot at work is "nobody could demonstrate
the actual need." The portfolio plan proposes a chatbot as its core feature.
Either apply the same standard to the portfolio, or the bot's own case study must
address the test directly. A hiring manager who reads both will notice.

### Second case study candidate: the automated PM

Listeners over Slack, support, competitive analysis, and call transcripts feeding
weighted tickets, plus a review ritual that caps founder overrides at one per
sprint. This is an org-design intervention, not a feature. It solves a political
problem (executive whiplash, per the Tuesday list) with a system. Strong
candidate to stand alone, and it is a more distinctive AI story than the
portfolio bot.

### The Git Lite problem (raise it, do not hide it)

By hiding Git's machinery, Sysgit made the failure state unrecoverable for
exactly the user it is designed to serve. When a pipeline breaks, the team
defers to a trusted Git expert. The abstraction leaks at the moment it matters
most.

This is uncomfortable and it is the most interesting unresolved problem in the
case study. It also partially recreates the incumbent dynamic: the pitch against
Cameo is that mastering the tool became the job. If operating Sysgit requires a
resident "trusted Git adult," that is the same structure in a new costume.

**Morgan's rebuttal, and it holds.** Far more people are versed in DevOps than in
Cameo. Cameo expertise is proprietary and non-transferable, so its scarcity is
what gives the expert leverage and an incentive to keep the tool hard. Git skill
is portable and abundant, so no one's job security depends on Git staying
obscure. The structures are not equivalent. Drop the Cameo comparison.

**What survives is bus factor, not incentive capture.** Morgan's own user
description is "often the only engineer with familiarity in the Git workflow."
Global supply is large; local supply inside a given hardware or defense org can
be exactly one person, and an air-gapped environment cannot call a contractor.
That is the version of the objection a hiring manager would actually raise, and
it is worth having an answer ready for.

### Evidence of outcome, for section 8

"Our most applauded feature is the side-by-side diagram editor and IDE." This is
currently the closest thing to a stated result. Worth pinning down: applauded by
whom, in what setting, and is any of it quotable.

### The untranslated layer (tension worth naming)

The case study thesis is that Sysgit is a translation problem: picture, document,
and code, legible to two cohorts. But the modeling vocabulary itself is the one
layer Morgan has not been allowed to translate, because the founder wants strict
spec fidelity and the company will not take a position on the language.

So the product translates every representation except the words. That is a
coherent tension to state out loud, and it is the kind of thing that reads as
self-awareness rather than complaint.

There is also an opportunity buried in it. The SysML v2 governing body has
explicitly handed interpretation to the community. Nobody has defined the
interaction and vocabulary conventions for a brand new standard. That is
arguably the largest unclaimed design opportunity in the category, and Morgan
identified it and was blocked. Worth saying plainly, and worth knowing it is
probably something he would want authority over in a next role.

### The pattern: missing org function, build a system

This is the founding-designer thesis in one sentence, and it is stronger than
"wore a lot of hats." Every time Sysgit lacked an organizational function,
Morgan built a system to stand in for it.

**The chronology matters.** Four of these predate AI entirely and were built by
hand.

| Missing function | What Morgan built | Era |
|---|---|---|
| Unbiased user input | Interview and feedback protocols designed to strip founder bias | Manual, pre-AI |
| Product direction | A roadmap, to stop the company being purely reactive | Manual, pre-AI |
| Shared vocabulary | Naming conventions from the overlap of SE and Git language | Manual, pre-AI |
| Design review | A semi-formal process slotted into the existing dev review flow | Manual, pre-AI |
| Product management | The automated PM: listeners, weighted tickets, one founder override per sprint | AI-era |
| Design critique | A custom design critique Claude skill | AI-era |
| Competitive intelligence | A script that pulls competitor sites and repos and analyzes weekly focus | AI-era |

### The AI argument this unlocks

Anyone leading with "AI native" invites the obvious suspicion: that the judgment
is outsourced and the candidate is a wrapper around a model. The chronology above
is the rebuttal, and it is checkable.

**The disposition is the constant. AI is the leverage.** Morgan was building
systems to replace missing organizational functions for years before the tooling
existed, entirely by hand. When better tools arrived he applied the same instinct
at greater scale, which is why the automated PM and the crit skill exist.

That is a categorically stronger claim than "I prototype faster," and almost no
other candidate can make it, because it requires a track record on both sides of
the line.

### The solo-designer risk, and the answer

**Key correction (from the Beacon interview).** Morgan has not been solo
throughout. At Slingshot he was the only designer *on Beacon*, but part of a
company-wide design team: shared company design system, group critique.

This changes the story materially. He is not a designer who has never had
critique or never worked inside a system owned by someone else. He had both at
Slingshot, lost them at Sysgit, and built a substitute. That is a designer who
missed critique, not one who avoids it.

Also relevant for Senior/Staff roles at companies with an existing design org:
he has contributed to a company design system he did not own.



A hiring manager will ask: three years with no crit, can you take feedback? The
honest answer is already in the record. Morgan did not adapt to the absence, he
built substitutes for it, twice. That is evidence of wanting critique rather than
avoiding it. Worth having ready, because the question is coming.

### Fact checks

- **Falcon 9 vs F-35 comparison holds up.** Falcon 9 development began around
  2005 with first flight June 2010, so 4.5 to 5 years is defensible. The JSF
  contract was awarded October 2001, so "approaching two decades" was right when
  the talking point was written and is now closer to 25 years. Cite it as the
  company's framing and keep the numbers approximate rather than precise.

### Framing warning: "UX will not make or break this product"

This is one of the strongest things Morgan said and one of the easiest to
misread. Stated flatly it can land as "design does not matter here," which is
self-defeating in a design interview. It must be framed as what it actually is:
a designer correctly diagnosing that the dominant market forces are procurement
lock-in and adverse user incentives, and then deciding where craft still pays.
The conclusion is targeting, not resignation.

### Why the customer list matters

A seed-stage, seven-person company with the US Air Force, Leidos, GTRI, and
Constellr as customers is an unusually strong credibility signal. It says the
product cleared procurement and security review at organizations that are
famously hard to sell into. Worth stating plainly in the case study.
