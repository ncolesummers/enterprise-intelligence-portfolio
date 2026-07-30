# Brief: the Loopworks deconstruction (Phase 4b)

Working brief for the scroll-driven exploded assembly on `/projects/loopworks`.

**Authorities:** PRODUCT.md, DESIGN.md, `docs/REDESIGN_PLAN.md`. This file carries
only the shape of 4b. Where they disagree with it, they win.

The evidence base is `docs/design/loopworks-parts.md`. No part may appear in the
deconstruction that is not in that table, and no layer may imply a relationship
the source does not support.

---

## What changed since the plan was written

Phase 4 was written as "add motion to the Loopworks case study." Two things have
happened since.

**The case study now exists** (Phase 4a), with nine prose sections and the
assembled FIG. 1 above them. That is the surface 4b modifies, not a blank page.

**Every part now takes the pointer.** Hovering or tapping a drawn part reads it,
feeding the same active value the numeral table drives. 4b animates those same
parts on scroll, so the two inputs meet on the same objects. This brief settles
how.

---

## Decisions settled

**The prose is the scroll budget.** The deconstruction is driven by the case
study's own sections rather than by a scroll distance invented for it. Six of the
nine sections name parts; the figure advances as the reader moves through them.
Nothing scrolls that would not have scrolled anyway.

**It replaces the assembled figure rather than sitting below it.** Build the
figure as an ordered set of states with the assembled drawing as state 0, so that
falling back to a second figure below the prose is a layout change rather than a
rebuild. That fallback is the retreat if the replacement reads badly.

**Case study only.** Not the index sheet. PRODUCT.md's third principle is depth
reachable but never mandatory, and Phase 2 rejected processional staging for the
homepage because evaluators compare candidates under time pressure. Revisit as a
compressed hero variant — two or three states resolving quickly to the assembled
drawing — only after this one is built and measured on a real phone. That is a
decision to make with evidence, not before.

**Scroll owns exposure, the pointer owns reading.** Scroll decides which parts
are shown and how far they have separated. Pointing decides which of the shown
parts is being read. Two axes, so they cannot contend for the same state.

- Pinning is dropped inside the deconstruction. A pin goes stale as soon as the
  reader scrolls past the part that carries it.
- The `scrollIntoView` on take is not needed here. A sticky reading is on screen
  by construction, and the assembled figure keeps its own behaviour unchanged.
- Pointing never advances or rewinds the scroll. Motion belongs to one input.

---

## The phone constraint, which decides the geometry

A sticky figure beside scrolling prose gives the figure roughly half a viewport.

| Surface           | Viewport  | Figure gets | Existing plate                |
| ----------------- | --------- | ----------- | ----------------------------- |
| Desktop           | 1440×1000 | ~1440×500   | Wide, 1240×440 viewBox — fits |
| Phone             | 390×844   | ~390×420    | Tall needs 768px — does not   |

The tall plate cannot be shown sticky on a phone, and shrinking it to fit
destroys the legibility that made it a second drawing in the first place.

**So the deconstruction needs its own geometry: a detail plate showing three or
four parts at a time rather than all thirteen.** A figure sheet already works
this way, with an assembly view and detail views drawn separately. A 440×320
viewBox renders 284px tall at 390px wide, which sits comfortably in a half
viewport, and scales up under a max-height cap on desktop.

This is the load-bearing decision. Everything else follows from it.

---

## Section to part mapping

From the case study's existing sections and the parts inventory. Sections with no
parts hold the previous state rather than resetting it.

| Section                          | Parts exposed          |
| -------------------------------- | ---------------------- |
| Introduction                     | assembled, state 0     |
| Admission                        | 10, 12, 14             |
| The Development Loop             | 20, 30, 40, 50, 60     |
| Where Judgment Stays Human       | 22, 70                 |
| Why It Is a Loop                 | 62                     |
| Isolation and the Guarded Write  | 40, 70, 80             |
| The Control Plane                | 90                     |
| Lineage                          | hold                   |
| What Is Not Claimed              | hold                   |

Parts separate along their own leader lines, whose geometry already exists in
both plates and can be reused as the separation vectors.

---

## Gates

**Reduced motion resolves to the assembled figure, complete and good on its own.**
DESIGN.md requires this and `globals.css` already collapses durations under
`prefers-reduced-motion`. The static state is not a degraded version; it is the
drawing, which is why 4a shipped it first.

**Smooth on a mid-range phone.** The risk register calls this out, and the site's
argument is its own build quality, so a janky signature moment does real damage.
Treat it as measured rather than judged: animate transform and opacity only, no
layout-triggering properties, and no scroll handler doing work per frame.

**The plates stay `aria-hidden` and unfocusable.** The numeral table remains the
only announced route to a part. Motion must not become the only way to learn
something, and a screen reader must reach every part in the deconstruction
through text that does not depend on scroll position.

**No new claims.** The deconstruction exposes structure that is already drawn and
already substantiated. A layer that needs a fact not in the parts inventory is a
layer that does not ship.

---

## Open, and deliberately not settled here

- Whether the sticky figure sits beside the prose on desktop and above it on a
  phone, or takes the same position at both widths.
- Whether the detail plate is one drawing with parts hidden per state, or a small
  set of drawings. The parts inventory supports either.
- Whether the reader can step through states without scrolling, for a keyboard
  user who would otherwise experience the figure only as it passes.
