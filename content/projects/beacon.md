---
slug: beacon
title: Beacon
company: Slingshot Aerospace
role: Senior Product Designer, sole designer on Beacon
timeline: 2022 - 2023
domain: Space traffic coordination
outcome: ""
publishable: unknown
tags: [0-1, Enterprise UX, Systems Thinking]

industry: aerospace
company_stage: growth
user_type: B2B
problem_type: [zero-to-one]
artifacts_available: []
---

## Team context

Sole designer **on Beacon**, but part of a company-wide design team at Slingshot.
That meant a shared company design system she contributed to rather than owned,
and group critique.

Important contrast with Sysgit, where she is the entire design function and there
is no crit at all.

## Context

**To a satellite operator:** Beacon provides mission-relevant space traffic
coordination. It ingests CDMs (conjunction data messages), including those from
Space-Track.org, layers in user ephemerides and maneuverability context, and lets
operators set risk thresholds and take coordinated action.

**To a hiring manager:** a platform for coordinating space traffic between
aerospace operators, using ground sensors and customer-provided vehicle
properties.

**Terminology note.** The event is a *conjunction*, not a collision. Two objects
will not necessarily hit; they pass close enough to threaten security or
connectivity. Morgan corrected this unprompted, which is itself evidence of
domain fluency worth preserving in the writing.

## Users

An unusually wide range for a single product:

- Grad school research projects with a single asset
- Startups
- SpaceX
- Space Force and DoD, including highly sensitive assets

**Before Beacon.** Operators monitored whatever data came off their own assets
plus publicly available ground data, then hoped they could find an email address
or phone number for the owner of an oncoming conjunction.

## Problem

The pre-Beacon workflow was, in Morgan's words, insanely variable.

- No two operators have the same depth of information about their own assets
- **Many did not know where their satellites were half the time**
- Most information lives in a **public, honor-system catalog**
- Resolution was frantically calling the other operator and trying to work out
  which of them was more capable of moving out of the way

**The asymmetry that defines the product.** SpaceX and OnePlanet had fairly
automated systems that alerted other operators and moved their own satellites
automatically. Everyone else was on the phone.

Beacon is therefore about giving the long tail of operators a coordination
capability that only the largest players had. In a domain where the failure mode
is physical and irreversible.

## Team and authority

- Series A stage when Morgan joined
- ~7 developers on Beacon, Morgan the only designer on it
- Part of a company-wide design team: shared design system, group critique
- **A rotating cast of PMs, none of whom lasted**
- **Never had an actual manager.** Technically reported to the VP of Product
- With no PM, product strategy was a conversation between Morgan and the
  engineering manager, informed by research from the in-house astrophysicist
  team and by customer feedback

## Disclosure

- Can show: some screens with dummy data
- Other artifacts: only what already appears in the case study on the current
  site
- Beacon will need recreated artifacts, following the Originality pattern

## Insight

**You cannot mandate disclosure, but you can make it reciprocal and visible, and
the data will follow.**

Morgan's read on privacy here: position is not really the sensitive part. Ground
sensor networks see your assets whether you like it or not, and sharing benefits
everyone because nobody wants to hit anyone. The genuinely sensitive fields are
**capability** — your risk thresholds, and whether your asset can maneuver at all.

So she built optional signals rather than a mandate: whether to share thresholds,
whether to disclose that an asset can move.

**The mechanic that made it work:** operators became more willing to share once
they could see what others had shared in turn. Reciprocal, visible disclosure.
That is mechanism design rather than interface design, and it produced the
outcome below.

## Decisions

### 1. Risk thresholds: operator-set, median-defaulted

**Decision.** Operators set their own proximity thresholds, shipped with a median
default.

**Why.** Nobody knows an operator's real risk tolerance better than the operator.
But Morgan quickly saw what would cause alert fatigue, and an open default would
have produced it.

**Tradeoff.** A median default is wrong for everyone at the extremes.

### 2. One product for everyone: attempted, then abandoned

**Decision.** Started with a single product for all operators, including a chat
feature to remove the scramble for contact details.

**What broke.** SpaceX was not interested in chat, would not respond to it, and
wanted an automated reply along the lines of *"We know it's close. These are our
thresholds. We'll move if we think it's too close."*

**Response.** Separate modules and automation features for enterprise-scale
operators.

**The DoD wrinkle.** A heavily redacted workflow: the DoD alerts Slingshot
directly, and Slingshot executes a script telling the other operator that for
classified reasons they must move their asset as soon as possible.

**The pattern worth naming:** both the enterprise automation and the DoD workflow
**started as white-glove services that Morgan folded into the product.** Manual
concierge first, systematize second.

### 3. Suggest, never act

**Decision.** Beacon provides suggestions on when and how to move, refined by
maneuverability data when the operator chooses to provide it. **At no point was
it in scope for Beacon to directly manipulate assets.**

**Why it matters.** In a safety-critical system with irreversible physical
failure, declining to arbitrate or actuate is a deliberate position, not an
omission.

### 4. Interpret the data, never hide it

**Decision.** Not a raw ingest. Beacon compares values across CDMs and assigns
weights and priority against set thresholds, **while always keeping the raw data
accessible.**

**Method.** Morgan would print out a CDM and ask an SME to circle exactly what
they looked for at core decision points. That is what made it possible to cut the
chaff without guessing.

**Tradeoff.** Any weighting is an editorial position on someone else's risk model.
Raw access is the mitigation.

### 5. Reversed: letting visual ambition outrank information architecture

**What happened.** Other product teams at the company pushed hard to make Beacon
look especially cutting edge. Morgan went along with it.

**Her verdict.** She wishes she had pushed back and prioritized information
architecture instead.

Connect this to PRODUCT.md, which lists "portfolio theater" and visual
performance over explanation as explicit anti-references. This is where that
conviction was earned.

## Outcome

**The unintended outcome is the headline.** Beacon became the **de facto source of
truth for satellite capabilities**, more trusted than the publicly accessible
database.

That follows directly from the reciprocal disclosure mechanic. Optional, visible
sharing produced better data than the honor-system catalog it sat alongside. A
coordination tool out-competed the public registry as a data source without
setting out to.

### Adoption

**Resolved, with sources. Morgan's recollection was close but the denominator was
wrong, so the published figures replace it.**

Two published numbers, two different denominators. Both are on the page, labeled.

| Figure | Denominator | Source | Date |
|---|---|---|---|
| 60% | companies operating in LEO, at beta | Payload, "Slingshot Aerospace raises $25M Series A" | 10 March 2022 |
| Over 90% | active LEO spacecraft in orbit | Slingshot, "2023 Year in Orbit" | page dated 19 Aug 2024, covering 2023 |

Verbatim, Payload: "The company rolled out Beacon in beta in August, which
contains data from 60% of companies operating in LEO, and is working towards a
full-scale product launch."

Verbatim, Slingshot: "Over 90% of all active LEO spacecraft in orbit today are
leveraging Slingshot Beacon to minimize collision risk, coordinate maneuvers, and
simplify their operations." Adjacent stats on the same page: "6K+ satellites
sharing their data", "160M+ conjunction data messages (CDMs) ingested to-date",
"7% of CDMs have been flagged as high-risk", "Thousands of hours saved for
operators in 2023".

**What Morgan originally said, and why it is not what ships.** She recalled
*operators representing 60% of assets on orbit* at the time she left. The only
published 60% is a share of **companies**, not assets, and it describes the
August 2021 beta, which predates her tenure (2022 - 2023). Claiming it as an
end-of-tenure assets figure would be wrong on both the denominator and the date.

**Standing caveats.**

- The 90% is Slingshot's own marketing figure, not independent, and the page
  carrying it is dated after Morgan left. The page attributes it rather than
  claiming it.
- "Leveraging Beacon" is the company's phrasing and is looser than paying seats.
  It most likely means spacecraft covered by data in the platform.
- Starlink is a very large share of active LEO spacecraft, so an
  aerospace-literate reader will ask whether the number is mostly SpaceX. That
  question is fair and the answer is partly yes. The achievement stands either
  way: a Series A company with SpaceX and NASA on the platform.

Named operators, from Morgan: SpaceX, NASA, Inmarsat, Endurosat.

### Other metrics

None. Same as Sysgit. Say so plainly.

## Reflection

### Still unsolved

A question came up constantly, because for many operators this was a learning
experience: **"What should we do? What should our SOP be?"**

Slingshot was in a unique position to set that standard and did not.

### Tenure

Roughly one year, ending in a **layoff for headcount reasons.** Series A, 2023.
State it plainly. Paired with the adoption figure above, it obviously was not
performance.


## Reflection

<!-- Section 3. -->

## Notes

### The contrast with Sysgit, which is the reason to keep both

**Sysgit anchors to habit. Beacon anchors to data.**

At Sysgit there is an incumbent, so Morgan studied Cameo's stereotype feature and
designed toward what users were already trained on. At Beacon there was no prior
art at all, so she anchored to the only thing available: CDMs and ephemerides,
which are extremely data dense, plus low-tech reports from satellites and ground
stations.

Same designer, opposite constraint. When no interface precedent exists, the data
model becomes the design constraint. That pairing is a stronger range argument
than either case study alone.

### The product-strategy vacuum, now twice

At Beacon: no manager, no durable PM, strategy done jointly with the engineering
manager. At Sysgit: reports to the VP of Engineering, serves as part-time PM,
built the automated PM.

Twice is a pattern, not an accident. Morgan reliably fills the product-strategy
vacuum in engineering-led organizations. That is a specific, checkable claim for
founding and staff roles.
