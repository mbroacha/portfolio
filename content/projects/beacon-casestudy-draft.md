# Beacon case study draft (prose)

Mirror of `src/pages/Beacon.tsx`. Keep in sync until the compile script exists.

**Sidebar.** Space traffic coordination. When two satellites are about to pass too
close, somebody has to move.
Role: Senior Product Designer, sole designer on Beacon · 2022-2023 · 7 engineers,
part of a company design team with a shared system ·
Scope: product design, research, product strategy · Web

---

## Problem

**Avoiding a collision meant scrambling for someone's phone number.**

The workflow before Beacon was insanely variable. No two operators had the same
depth of information about their own assets, and many did not know where their
satellites were half the time. Most of what everyone relied on lived in a public,
honor-system catalog.

Resolution was calling the other operator and trying to work out which of you was
more capable of moving out of the way.

**The capability gap was the real problem.**

Large operators like SpaceX had automated systems that alerted other operators and
moved their own satellites. Everyone else had to figure out a plan on the spot.

So Beacon is not really about detection. It is about giving the long tail of
operators a coordination capability that only the largest players had, in a domain
where the failure mode is physical and permanent.

## Constraints

**No prior design language at all.** This was the first platform of its kind, so there was no
interface convention to borrow and no incumbent habit to design toward. I anchored
to the only thing that existed: CDMs and ephemerides, which are extremely dense,
and low-tech reports from satellites and ground stations. When there is no
precedent, the data model becomes the constraint.

**Wildly uneven data quality.** One operator has precise ephemerides and a maneuver
plan. The next has a public catalog entry and a guess. The product has to be useful
at both ends without implying the two are equally reliable.

**A user range with no middle.** Users range from grad school research projects
with a single asset to startups, to SpaceX, to Space Force and DoD teams operating
highly sensitive vehicles. They all use the same product, and the extremes have
almost nothing in common.

**Assets nobody can talk about.** Some users cannot disclose what they operate,
where it is, or why it needs to move. Anything I designed had to work without that
information ever entering the system.

## Insight

> **You cannot mandate disclosure. You can make it reciprocal.**

From operator interviews and work with our in-house astrophysics team.

**Position is not the sensitive part. Capability is.**

Operators do not really have a choice about position. Ground sensor networks see
your assets whether you like it or not, and sharing that helps everyone, because
nobody wants to hit anyone.

What is actually sensitive is capability. Your risk thresholds, and whether your
asset can maneuver at all. So I built those as optional signals rather than
requirements.

The part that made it work: operators became more willing to share once they could
see what others had shared in turn.

## Decisions

### Operator-set thresholds, median default

*Rejected: a single fixed threshold for everyone.*

**Why.** Nobody knows an operator's real risk tolerance better than the operator. A
cubesat on a research grant and a commercial constellation do not agree on what
counts as too close.

**Tradeoff.** I could also see what would cause alert fatigue, and a fully open
default would have produced it. A median default is wrong for everyone at the
extremes.

**Result.** Operators tune to their own posture, and the ones who never touch the
setting still get something survivable.

### Suggest, never act

*Rejected: automated maneuvering, and arbitrating who moves.*

**Why.** Beacon proposes when and how to move, refined by maneuverability data if
the operator chooses to share it. At no point was it in scope to touch anyone's
asset. In a system where the failure is physical and irreversible, the operator
keeps the verdict.

**Tradeoff.** It leaves the hardest part of the problem, deciding who yields, with
the humans who were already struggling with it.

**Result.** Operators trusted it with their data because it could not act on their
behalf. Declining to arbitrate is what made the rest possible.

### Interpret the data, never hide it

*Rejected: a raw CDM ingest, and a black-box risk score.*

**Why.** CDMs are dense and unfriendly. We could compare values across them and
weight by an operator's own thresholds, which raw ingest cannot do. But a weighting
is an editorial position on someone else's risk model, so the source data always
stays one click away.

**Tradeoff.** Any prioritization we apply is a judgment we are making on their
behalf.

**Result.** To work out what mattered, I printed CDMs and had subject matter experts
circle exactly what they looked at during core decision points. That is what let us
cut the chaff without guessing.

### Abandoned: one product for everyone

*Rejected: the version I shipped first. A single product, including a chat feature
so operators would stop hunting for each other's contact details.*

**Why.** The contact problem was real and chat was the obvious fix. It was not the
fix for everyone.

**Tradeoff.** Development time on a feature the largest operators would never open.

**Result.** SpaceX had no interest in chat and would not respond to it. They wanted
an automated reply along the lines of we know it is close, these are our
thresholds, we will move if we think it is too close. So I built separate
automation for enterprise operators, and a heavily redacted workflow for the DoD
where they alert us and we tell the other operator that for classified reasons they
need to move. Both started as white-glove services I ran by hand, then folded into
the product.

## Outcome

**Adoption.** By the time I left, Beacon was used by operators representing roughly
60% of assets on orbit, including SpaceX, NASA, Inmarsat and Endurosat. SpaceX is a
large share of that figure on its own, and the number is a share of assets rather
than of operators.

**The unintended one.** Beacon became the de facto source of truth for satellite
capabilities, more trusted than the public catalog it sat alongside. Optional,
visible, reciprocal disclosure produced better data than an honor-system registry.
We did not set out to replace it.

## Reflection

**I let the interface get ahead of the information architecture.** There was a push
from other product teams to make Beacon look especially cutting edge. I went along
with it. I wish I had pushed back and spent that effort on the structure instead.
In a product whose whole job is making dense, uneven data legible under time
pressure, the architecture was the thing worth polishing.

**The question I never got to answer.** Operators asked constantly: what should we
do? What should our standard operating procedure be? For most of them this was a
genuinely new discipline and there was no established practice to follow. We were
in a unique position to set that standard. I still think about the fact that we did
not.

---

## Artifacts, 6 slots

Everything here is dummy data. Confirmed showable.

| Where | Slot |
|---|---|
| Top | Conjunction dashboard |
| Decision 1 | Threshold settings |
| Decision 2 | Conjunction detail and proposed maneuver |
| Decision 3 | Annotated CDM printout from an SME session |
| Decision 4 | Enterprise automation and the redacted DoD path |
| Outcome | Coverage and shared-signal adoption over time |

The CDM printout is the one to prioritize. A photographed artifact with an
expert's own annotations on it is more convincing than any screen, and it is the
only place the research method is visible.

## Open

- **Confirm the 60% figure before publishing.** As of what date, and 60% of what
  denominator: tracked objects, active satellites, or operators. The copy currently
  says "assets on orbit" and pre-empts the SpaceX question, but the underlying
  number needs to be one you can defend.
- Layoff for headcount, 2023. State it plainly if asked; it does not belong on the
  page.

## Deliberately left in the corpus

- The full pre-Beacon workflow detail
- Slingshot team structure: rotating PMs, never had a manager, strategy done with
  the engineering manager
- The Sysgit contrast: anchoring to habit versus anchoring to data
