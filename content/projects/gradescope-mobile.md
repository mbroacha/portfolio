---
slug: gradescope-mobile
title: Gradescope Mobile
company: Gradescope (Turnitin)
role: Senior Product Designer, one of two
timeline: Launched 2021
domain: Education
outcome: "Shipped. Poorly reviewed, possibly no longer supported."
publishable: yes
tags: [Mobile, Collaboration]
industry: edtech
company_stage: enterprise
user_type: consumer-adjacent
problem_type: [mobile, platform-adaptation]
format: short-piece
---

## Format decision

**Not a full case study. Not a line item.** A short honest piece, roughly 400
words, about a product that did not work.

One strong decision, no measurable success, bad reviews, possibly unsupported. As
a fourth full case study competing with three strong ones it costs momentum. As a
one-liner it fails to cover the two gaps it exists to cover. A short piece that
names the failure plainly reads as confidence.

**The two gaps nothing else covers:**

1. **Mobile.** Every other project is dense desktop enterprise software.
2. **Peer collaboration.** Leading three juniors is mentorship. Being one of
   twenty in a design org is membership. Being one of two designers on a product
   is pairing.

## What it was

A mobile app letting students scan handwritten short-answer assignments into
classes they were already registered to in Gradescope. Graded manually by a
teacher or automatically via OCR, which already existed.

**The improvement.** Previously a student used a separate scanning app to make a
PDF, then uploaded it on the Gradescope site. Here scan and upload lived in one
app.

## The decision

**Require mapping before submission, then reversed to submit-then-map.**

The autograder must be told where to look for each answer, so after scanning the
student maps the relative area of every question. That is not a short process at
11:59 PM.

**The tension:** students want to submit as fast as possible; teachers do not want
to map each assignment themselves. Both reasonable, directly opposed. A limitation
inherited from the parent product.

**Resolution:** let students submit first and map afterward.

## The peer disagreement

The other senior designer was strict about fidelity to the parent product's
design system. Morgan's position was that the system was built for web and did
not survive the platform change:

- Buttons were wrong as tap targets
- Fonts were not scaled correctly
- Colors pulled too dark

They disagreed several times. Morgan eventually won on the interactive components
(buttons and similar), not on everything.

**Partial resolution, which is why it is credible.**

**The through-line.** This is the same argument Morgan is currently losing at
Sysgit, where the founder wants strict SysML v2 spec fidelity and Morgan wants
translation into something usable. Literal fidelity versus contextual
appropriateness. Same axis, opposite outcome, five years apart. A consistent
position, not a one-off.

## How the pair worked

Two senior designers under a lead. All three mapped workflows together, then the
two seniors split screens and reconvened to resolve decisions. Work regularly came
back not meshing, so they periodically co-designed to merge.

## What Morgan learned

> "The threshold for drop off is a totally different animal. No one had to use
> this app, so it really had to demonstrate value over a process involving
> multiple apps."

Captive enterprise users versus voluntary users. The transferable lesson, and the
reason to keep the piece.

## Why it did not work

- **The third-party scanner.** Core to the flow, uncontrollable UX. Despite effort
  to make it seamless and Gradescope-branded, "it still felt like you were being
  punted to another app."
- **Student behavior under deadline.** No control over how diligently a student
  marked question locations at 11:59 PM. **And an error on their end looked to the
  teacher like an error on the product's end.**
- **The technology was not there yet.**
- Bad reviews. Possibly no longer supported.

## The best insight in the project

You inherit blame for user error that your own friction caused. A student rushing
a tedious mapping step produces a bad submission, and the teacher blames the
product. The friction and the blame are the same problem, and fixing the friction
was outside the team's control.

State this plainly. It is more interesting than most successful case studies.
