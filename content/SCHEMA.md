# Corpus schema

One Markdown file per project in `content/projects/`, plus practice files in
`content/practice/`. A build script compiles these into the JSON that both the
site and the bot consume, so there is exactly one source of truth.

Frontmatter extends the existing `CaseStudyProjectMeta` type in
`src/case-studies/types.ts` rather than inventing a parallel schema.

```yaml
---
slug: sysgit
title: Sysgit
company: Sysgit
role: Design Lead, sole designer
timeline: 2023 - 2026
domain: Systems engineering
outcome: ""              # one line; leave empty rather than guessing
publishable: partial     # full | partial | private
tags: [Systems Thinking, Design Systems, 0-1, Developer Tools]

# Filter metadata. Bot and static filter UI read the same fields.
industry: systems-engineering
company_stage: startup
user_type: B2B
problem_type: [zero-to-one, systems, research-heavy, ai]
artifacts_available: []
---
```

## Body sections

Written for the bot first, the case study second. The case study page is a view
onto this file, not a separate document.

- `## Context` — what it is, who uses it, what you owned
- `## Problem` — what was broken, what it cost
- `## Constraints` — what made it hard, not visible in a screenshot
- `## Insight` — the reframe that changed the product
- `## Decisions` — repeated blocks of: decision / rejected alternative / why / tradeoff / result
- `## Outcome` — what shipped, metrics if defensible, qualitative if not
- `## Reflection` — what you would do differently, what is unsolved
- `## Notes` — corpus-only. Things true and useful to the bot that do not belong on the page.

## Grounding rule

Every claim in this file must be something Morgan can defend in a room.
No placeholder metrics. Empty is better than invented. See PORTFOLIO_PLAN.md §2.
