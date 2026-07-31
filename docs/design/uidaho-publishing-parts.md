# FIG. 2 parts inventory — University of Idaho website

Captured 2026-07-28 from the checked-in University of Idaho case study and the
approved plate brief in `docs/REDESIGN_PLAN.md`. Every visible label in FIG. 2
maps to one of the substantiated parts below. Nothing is inferred from a
plausible enterprise publishing architecture.

## Publishing path

| Drawn part | Evidence |
| --- | --- |
| `Sitecore` / `authored content` | `src/app/projects/uidaho-website/page.tsx`, **Technical Architecture → Publishing path**: “Sitecore holds authored content.” |
| `Next.js` / `renderer` | Same section: “The Next.js application receives and renders that content.” |
| `Azure` / `delivery` | Same section: “Azure provides the delivery services.” |
| Directional path between the three boxes | The case study **Introduction** states the complete path and separation in one sentence: “Sitecore holds authored content while a separate Next.js application renders it for delivery on Azure.” `docs/REDESIGN_PLAN.md`, **Specs for the three remaining index plates → FIG. 2**, independently fixes the same order and separation as the approved drawing brief. |

## Deliberately not drawn

- No pages, records, people, or authored copy: the plate states architecture,
  not employer content.
- No REST, GraphQL, Blob Storage, Functions, Storybook, SSR, SSG, CDN, metrics,
  or performance claims: those details are not needed to state the plate's one
  fact.
- No shared enclosure around Sitecore and Next.js: their separation is the
  structural fact the plate exists to show.
