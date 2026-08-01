# Brief: the Loopworks deconstruction (Phase 4b)

**Status: closed.** Phase 4b shipped as
`src/components/figures/delivery-loop-deconstruction.tsx`, covered by
`tests/e2e/loopworks-deconstruction.spec.ts`. Retained as the reasoning behind
the deconstruction — particularly why the pinned band retreats to `lg` and
wider — not as work still to do.

Originally the working brief for the scroll-driven exploded assembly on
`/projects/loopworks`.

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

**Drawn and checked at 390×844. It holds.** The frame settled at 440×320, which
renders 251px tall in the 345px of content a 390px phone leaves inside the sheet
gutters, and the band that carries it comes to roughly 410px — 49% of an 844px
viewport, which is the half-viewport budget this table assumed. Six views fit
that frame: the entry chain, the stage chain, the two gates, the return, the
guarded write, and the control plane cut open. Type is set in user units the way
the tall plate's is, since the frame is the same 440 wide.

Two things had to give to fit, both recorded in the component:

- **The stage chain drops to five boxes and names the rest.** Only five of the
  eight stages carry numerals, so the chain is cut after code review and closed
  with "then commit · PR · done" rather than drawing three parts the numeral
  table does not list.
- **The return view drops the actor column.** "Code review" beside
  `validation-reviewer` does not fit a box narrow enough to leave a lane for the
  return line. That view's subject is the route, not who runs it, and the actors
  are stated in the stage view and the numeral table.

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
| Why It Is a Loop                 | 62, and 30, 40, 50, 60 |
| Isolation and the Guarded Write  | 40, 70, 80             |
| The Control Plane                | 90                     |
| Lineage                          | hold                   |
| What Is Not Claimed              | hold                   |

Parts separate along their own leader lines, whose geometry already exists in
both plates and can be reused as the separation vectors.

The return path's row grew while building. A return path cannot be drawn without
the stages it routes between, and drawing those stages unnumbered while they carry
numerals two views earlier is worse than numbering them — so that view exposes the
four stages as well, with 62 as its subject. All five are in the parts inventory,
so nothing new is claimed.

---

## Gates

**Reduced motion resolves to the assembled figure, complete and good on its own.**
DESIGN.md requires this and `globals.css` already collapses durations under
`prefers-reduced-motion`. The static state is not a degraded version; it is the
drawing, which is why 4a shipped it first.

Resolved by not drawing the band at all under that query, rather than by
collapsing its durations. Collapsing them would leave the plate hard-cutting
between views on scroll, which is the thing being opted out of. What is lost is
nothing: each view's resting note restates the claim its own section opens with,
and the facts the views add — the three admission outcomes, each gate's required
evidence, the implementer's sandbox, the six kinds of state the control plane
holds — are all in the prose beside them. There is a test that asserts exactly
that.

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

## Settled while building

The three questions this brief left open, and what they resolved to.

**The band takes the same position at both widths: pinned above the prose.**
Beside the prose on desktop would have meant restructuring six tested sections,
each of which already spends its horizontal room on a prose column beside an
evidence panel, and squeezing the measure to buy width a 1.375:1 plate does not
want. What does move by width is the arrangement *inside* the band: below `lg`
the plate sits above its reading, and at `lg` the reading moves alongside it, so
the band stays about a third of a desktop viewport instead of half.

The retreat this brief named — a second figure below the prose — is still a
layout change rather than a rebuild.

**One plate, six compositions, all of them in the DOM.** A change of view is
opacity and transform on a `<g>`: no remount, no layout pass, one paint surface.
Parts arrive along their leader lines, staggered by their place in the view, and
the leaders in this frame run in from the callout column at the left, so the
separation vector is the leader line exactly as the brief asked.

Keeping every view mounted has one cost that has to be paid explicitly: hit
testing must follow visibility all the way down. `pointer-events: none` on a
hidden group is not enough, because the parts inside declare `all` and a child
that re-enables pointer events is hit-tested whatever its parent said — and since
SVG paints in source order with no z-index, the last view would otherwise answer
the pointer for the whole plate. There is a test for this.

**No keyboard stepper.** The premise was partly false: keyboard scrolling is
scrolling, so a keyboard user drives the deconstruction with Space and PageDown
like anyone else. Beyond that, a stepper would give motion a second owner, which
this brief forbids, and it would have to be focusable inside a band that is
deliberately `aria-hidden`. The announced route to every part is the numeral
table on the assembled figure, which is above the prose and independent of scroll
position. Nothing in the deconstruction is the only way to reach anything.

## The retreat, taken on phones (2026-07-30)

The brief named a retreat and pre-authorised it as "a layout change rather than a
rebuild". It has been taken, below `lg` only.

**What the measurement missed.** The half-viewport budget above was checked
against the viewport a phone *reports*, and that is not the height a reader
gets. Mobile Safari spends roughly 145px on chrome the layout viewport does not
subtract. Measured on an iPhone 16 Pro: the band is 53% of the reported 874px and
about 62% of the ~730px actually available, which leaves roughly five lines of
prose under it. The screenshot that prompted this showed a sentence cut off
mid-word behind the fixed title block.

**Why no amount of trimming fixes it.** Holding the band to half of 730px means a
plate around 160px, against the 251px that justified drawing a third geometry in
the first place. The 150px reading block is not slack either — at phone widths
the resting note fills all four of its lines, so shortening the reserve would
clip the readings that taking a part produces.

**What was done instead.** Below `lg` nothing is pinned. Each of the six sections
draws its own detail plate, above its prose, through `CaseStudySection`'s new
`detailFigure`. Same plate, same parts, same pointer contract; what is given up
is scroll-driven exposure, and only where it was never affordable. `lg` and wider
are untouched — still 369px and 37% at 1440×1000, 46% at the `lg` edge.

Two consequences worth keeping:

- **The view key is named once per section.** `detailView` and `detailFigure` are
  produced together by one `detail(view)` helper on the page, because two
  spellings of the same key is exactly the drift the `detailView` attribute was
  introduced to prevent.
- **Whether the band is drawn is one rule set in `globals.css`, not a utility.**
  It has two independent reasons not to be drawn, and a Tailwind `lg:block` in
  the utilities layer silently beat the reduced-motion rule in the components
  layer — layer order wins over specificity, so the test caught a band that was
  still drawn under `prefers-reduced-motion`. The component matches the same
  query in JS to decide whether to run the observer; the two must agree.

## Two things worth knowing before touching this

**The reading line is measured, not chosen.** Which view is on the plate is
decided by which section has last started above a line just under the pinned
band. That line has to come from the band's own height: the band takes about half
a phone screen and a third of a desktop one, and a fixed share of the viewport
that clears it on a phone lands a whole section ahead on a desktop. The wake-up
strip and the decision line are derived from one measurement, because measuring
twice lets a boundary cross the decision line during a jump without waking
anything up.

**A pointer resting on the plate keeps reading as the view changes under it.**
That is correct — the pointer is on a part — but it means a test that leaves the
mouse parked on the plate is measuring the part now under the cursor, not what
survived the scroll. Move off the plate first.
