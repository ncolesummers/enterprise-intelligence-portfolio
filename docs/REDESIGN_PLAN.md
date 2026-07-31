# Redesign: The Figure Sheet

Working plan for the visual replacement on `feat/figure-sheet-redesign`.

**Authorities:** PRODUCT.md (product truth), DESIGN.md (visual system). This file carries only the plan and the surface strategy. Where they disagree with this file, they win.

---

## Direction contract

**THESIS.** The site is a drawn figure sheet. It proves its subject architects systems by showing how systems are constructed. It refuses the dark developer portfolio: card grid, scattered mono labels, neon accent, glow.

**OWN-WORLD.** Ink line on paper, or chalk line on cyanotype blueprint. One vermilion annotation, never decorative. Saira across the entire sheet, width axis carrying register. Zero radius, zero shadows, five-weight line hierarchy, section hatching. The numeral callout circle is the only curve and the recurring silhouette.

**STORY.** A hiring manager grasps in seconds that this person builds agent systems, believes it because the architecture is drawn and inspectable, then follows a numeral or a figure into real evidence.

**FIRST VIEWPORT.** Statement at display scale across the top. FIG. 1, the Loopworks delivery loop, drawn full width immediately beneath with numeral callouts on leader lines. Title block anchored lower right carrying identity, navigation, and theme control.

**FORM.** Patent and engineering figure sheet. Position 7 of 7 on the resonance-ordered list, assigned by seed `dedf6594` (scope direction, mode experience). Staging: **sheet index** committed. The dealt processional staging was rejected for the homepage, because visitors compare candidates under time pressure and a procession makes depth mandatory; it is reserved for the Loopworks deconstruction, where sequence is the content.

---

## Approved composition

From `docs/design/comps/` — B and C combined, approved 2026-07-27.

1. **Statement** at full display scale opening the sheet. Copy: _"I build the systems that build software."_
2. **FIG. 1** immediately beneath: the Loopworks delivery loop as line art, numeral callouts riding leader lines out to the margins, section hatching where the system is cut open.
3. **Figure index** below: FIG. 1 detailed, FIGS. 2–6 as smaller plates in a ruled grid, scannable in one view.
4. **Title block** lower right, persistent, absorbing header and footer roles.

### Do not literalize

The comps are direction tests, not specifications. Specifically:

- **All title-block metadata in every comp is fabricated** — drawing numbers, revision letters, scales, approver names, sheet sizes, dates. DESIGN.md prohibits inventing the legal instrument. The real title block carries only true things: name, section, and a genuine last-updated date if one is tracked.
- **The generic subjects in comp C** (pump, truss, P&ID vessel) are stand-ins for the five real projects.
- **The heavy isometric 3D machine style** in comps A and C drifts toward clip art. Figures should be flatter and more diagrammatic.
- **Placeholder headline copy** in the comps is not the real line.

---

## Fidelity inventory

| Ingredient                           | Medium                                    |
| ------------------------------------ | ----------------------------------------- |
| Sheet frame, border and margin rules | CSS                                       |
| Statement, captions, all copy        | Semantic HTML, never rasterized           |
| FIG. 1 delivery loop                 | **Authored SVG**                          |
| Reference numerals + leader lines    | SVG geometry + HTML controls, interactive |
| Section hatching                     | SVG pattern fill                          |
| Title block                          | Semantic HTML, CSS grid                   |
| FIGS. 2–6 index plates               | **Authored SVG**, one per project         |
| FIG. 6 hidden-line placeholder       | SVG, dashed stroke                        |
| NCS constructed monogram             | **Authored SVG**                          |

**Binding finding: the figures cannot be generated rasters.** They must recolor between ink-on-paper and chalk-on-blueprint, and the deconstruction must animate individual parts along their own leader lines. A raster does neither. Every drawing is authored SVG using `currentColor` and CSS custom properties, with parts as addressable groups.

Image generation's role in this project is finished. It served direction-finding and produces nothing shippable here.

---

## Phases

### Phase 1 — Foundation (Claude) — **done**

Saira and Monaspace Neon in place, both themes authored independently and measured, radius and shadow namespaces zeroed at the token layer, sheet frame and title block built, `header.tsx` / `footer.tsx` / `desktop-nav.tsx` / `mobile-nav.tsx` deleted. Settled values live in DESIGN.md and `src/app/globals.css`.

Decisions made during the build that the plan did not anticipate:

- **The title block is a full-width band along the lower edge, not a lower-right panel.** Both are authentic; the band does not occlude the drawing area and does not need a second layout on small screens, which the corner panel needed on both counts. This matters most for Phase 2 — the whole sheet is free for FIG. 1.
- **The light annotation moved from `#C8402A` to `#B8351E`.** The specimen value measured 4.56:1 on paper, a pass with no margin on a color whose job is small label text. Per the risk register, the theme got its own value rather than the bar being lowered.
- **The theme control is a `MEDIUM` field reading PAPER / BLUEPRINT**, not a sun-and-moon toggle.
- **Buttons became ruled label boxes.** The incumbent `accent` variant was a filled vermilion button, which DESIGN.md prohibits outright — the annotation color is never a fill.
- **Shadow enforcement is structural.** Clearing the `--shadow-*` namespaces means Tailwind emits no shadow utility, so the rule cannot be broken by a stray class. The last `box-shadow` in the codebase was `ring-1 ring-inset` on tag chips, now real rules.

Known breakage handed to Phase 3: **the Playwright suite fails broadly.** `navigation.spec.ts` asserts on `header` and `footer` elements and a `mobile-nav` test id that no longer exist; `social-icons-accessibility.spec.ts` counts icons per their old locations.

### Phase 2 — FIG. 1 and the homepage (Claude) — **done**

Done: FIG. 1 in both geometries, the reference-numeral system, the statement,
the figure index, FIG. 5 as the pattern plate, and FIG. 6 in hidden line.
The parts inventory behind FIG. 1 is `docs/design/loopworks-parts.md`.

Decisions the plan did not anticipate:

- **FIG. 1 is two plates, not one drawing.** A wide plate runs the stages across the sheet with the control plane as a band beneath; a tall plate stacks them with the control plane as a column beside. Scaling one drawing from 1240 to 358 units made it illegible, and mobile is where most visitors arrive. The two share the parts list and the active-part contract, not their geometry.
- **The numerals are HTML, not SVG hit targets.** Both plates are `aria-hidden`; the meaning lives in a description, the caption, and a reference-numeral table whose entries are the controls. A figure sheet already splits plate from numeral table, so the accessible structure and the drawing convention turned out to be the same structure.
- **Pointing previews, taking pins.** Hover and focus set the active part; click pins it so the reading survives moving the pointer. A single active value backed both, and click-to-toggle on an already-hovered part read as turning it off.
- **`vector-effect: non-scaling-stroke` throughout.** This is what makes the five-weight hierarchy survive scaling, and it retires the "line art at small sizes" risk: a 2px object line stays 2px at any plate size.
- **The gate valve carries the argument.** Both approval gates are drawn as valve symbols interrupting the flow. It is the detail that makes the figure read as an engineering drawing rather than a flowchart, and gates are the most important true thing about the system.
- **FIG. 1 is not repeated in the index.** It is drawn at full scale directly above; a thumbnail of the figure just read is noise. The index covers FIGS. 2 through 6.
- **The ADLC entry is gone from the index**, per PRODUCT.md's roster change. Its route still needs the redirect, which stays Phase 3.

**The mark is CS in the callout circle**, chosen from eight candidates drawn at
their real sizes on a temporary review route. Two findings from that round are
worth keeping: two letters inside the circle stay legible at 24px, contrary to
the prediction that killed the idea on paper; and a lone C inside a circle is
unusable because it is the copyright glyph, which is a collision no drawing
fixes. N was dropped once the question was asked plainly, since he presents as
N. Cole Summers and does not go by the N.

#### Specs for the three remaining index plates

Codex draws these from `src/components/figures/index-plates.tsx`, following
`PlateMikrotik` exactly: same `320 x 170` viewBox, same `PlateFrame`, same
classes. A plate states **one structural fact** the case study substantiates.
It is not a diagram of the whole system and never a screenshot.

- **FIG. 2, University of Idaho website.** Draw the publishing path: authored content in Sitecore, the Next.js application that renders it, delivery on Azure. The fact is that the CMS and the rendering application are separate systems.
- **FIG. 3, MyUI.** Draw custom React components seated inside the Ellucian Experience shell. The fact is that the work is components inside a platform the university does not own, not an application built from nothing. **Employer boundary applies:** no student-facing data, no dashboard content, nothing resembling a real record.
- **FIG. 4, AI data extraction research.** Draw the spike's shape: source pages in, a LangGraph extraction pass, structured profiles out, and a verification step. The fact is that it was a feasibility question with a checked answer. **No accuracy numbers** — none are published.

Until they are drawn, those three cells render a reserved plate reading
"plate in preparation" at leader weight. That is deliberately distinct from
FIG. 6's hidden-line "not yet defined", which is a statement about the system
rather than about the drawing. Do not merge the two treatments.

### Phase 3 — Propagation (Codex) — **done**

Handed off once Phase 2 established the pattern. Codex got a token and component contract plus one worked example, and did the mechanical spread:

- Remaining **three** index plates, drawn to the specs recorded under Phase 2.
- Case-study pages restyled onto the new system.
- Redirect `/projects/agent-development-lifecycle` (retired; folded into Loopworks as lineage). Must not 404 — it may be indexed.
- Self-host and subset Saira and Monaspace; verify ligature features are on for code.
- Repair the Playwright suite, which the redesign will break broadly.

**Codex must not** choose type, color, composition, or what a system looks like as a drawing. Deciding that MyUI reads as a particular diagram is design judgment.

The boundaries Phase 3 ran under, and the alternatives they rejected, are in `docs/adr/0001-phase-3-propagation-boundaries.md`.

### Phase 4 — The Loopworks case study and its deconstruction (Claude)

The plan assumed this phase only had to add motion. It does not: **there was no Loopworks case study to add it to.** FIG. 1 was drawn on the index sheet and linked only to GitHub, while PRODUCT.md has Loopworks leading the work section and carrying the retired ADLC substance as lineage. So the phase splits.

#### 4a — The case study — **done**

`/projects/loopworks`, built from `docs/design/loopworks-parts.md` and nothing else. Nine sections: what it is, admission, the eight declared stages, the two approval gates, why it is a loop, isolation and the guarded write, the control plane, ADLC lineage, and a closing section stating what the source does not support.

Decisions the plan did not anticipate:

- **The drawing sits above the prose, and FIG. 1 is reused rather than redrawn.** It is the same component the index sheet renders, which is what makes it the assembled static state 4b resolves to. A visitor who reads only the figure and its numeral table has still had the argument.
- **The way into the case study is the figure's own caption.** FIG. 1 has no index cell by Phase 2's decision, so it would otherwise have been the one figure a visitor could not follow. `readHref` puts a `Read FIG. 1` link in the caption band; the case study does not pass it, because a figure does not link to the page it is already on.
- **Case-study primitives moved to `src/components/case-study.tsx`.** The four incumbents each declare their own copy, which was correct under Phase 3's mechanical-propagation boundary. A fifth copy was not. The incumbents are untouched and can migrate in Phase 5, when their specs are being read anyway.
- **Source identifiers are set in Monaspace.** Stage keys, table names, label names, and commands are literal code even inside a sentence, and they are exactly what a reader would grep for. This follows the `LiteralCode` precedent already shipped on the profile-extractor page rather than inventing a treatment.
- **The commit is on the page.** Saying the parts were read at `9727357` is a claim about when the drawing was made, so it stays true as the repository advances instead of decaying into a stale assertion.
- **A drawn part can be pointed at.** Phase 2 ruled that the numerals are HTML rather than SVG hit targets, which settled where the _controls_ live and why: an `aria-hidden` plate reaches nobody on a keyboard or a screen reader, so it can never be the only route to a part. That is not an argument against the plate also taking a pointer. Hovering or tapping a box now reads it exactly as its numeral does, feeding the same single active value. Nothing in the plate became focusable and nothing became announced, so the numeral table is still the only route that was ever promised. Unfilled strokes do not hit-test, so the parts take `pointer-events: all`; leader lines and flow arrows explicitly do not, or half the plate becomes a target. A stage with no numeral stays inert rather than pointing at a part the table does not list.
- **Taking a part brings its reading into view.** The tall plate is 768px of an 844px phone screen, which put the reading a screenful below any part taken near its top: the tap looked like it did nothing. Taking a part now scrolls the reading into view by the minimum needed, which is a no-op on every desktop plate. The new `clears-title-block` utility reserves the fixed title block's band, sharing the sheet's own foot-padding expression so the two cannot drift.

#### 4b — The deconstruction — **done**

Scroll-driven detail views on the case study, riding the six sections that name parts. `docs/design/deconstruction-brief.md` carries the shape and the reasoning; it was written before the build and updated with what building settled. Three decisions from it are worth carrying here, because each contradicts what this plan assumed:

- **The prose drives it.** The case study's own sections are the scroll budget, rather than a scroll distance invented for the figure. Six of the nine sections name parts.
- **It needs a third geometry.** A sticky figure gets about half a viewport, which the wide plate fits at desktop and the tall plate cannot fit on a phone at any legible size. The deconstruction is a detail plate showing three or four parts at a time, which is what a figure sheet does anyway. This was the load-bearing decision, and it was drawn and checked at 390×844 before anything was built on it. The frame is 440×320, it renders 251px tall on a phone, and the band that carries it comes to 49% of the viewport — the budget the brief assumed.
- **Scroll owns exposure, the pointer owns reading.** The two inputs meet on the same parts now that a drawn part can be pointed at, so they are split across axes: scroll decides which parts are shown, pointing decides which shown part is read. Pinning is dropped inside the deconstruction, where a pin goes stale as soon as it is scrolled past.

What building added, beyond the brief's three open questions (all three resolved there):

- **The band is not drawn at all under `prefers-reduced-motion`.** Collapsing its durations instead would leave the plate hard-cutting between views on scroll, which is the thing being opted out of. Nothing is lost: every fact a detail view states is in the prose beside it, and the assembled FIG. 1 above the prose is the resolution.
- **The reading line is measured from the band, not chosen as a share of the viewport.** A fixed share that clears the band on a phone lands a whole section ahead on a desktop. The wake-up strip and the decision line come from one measurement, because measuring twice lets a section boundary cross the decision line during a scroll jump without waking anything up. That bug was real and is why the decision is geometric rather than a running tally of what has crossed.
- **`CaseStudySection` grew a `detailView` prop.** The prose-to-drawing mapping is declared on the section it describes rather than kept as a separate list of headings that could drift from them.
- **`tests/e2e/loopworks-deconstruction.spec.ts`** covers both axes, the hold through a section that names no parts, hit testing following visibility, the `aria-hidden` band being unreachable by keyboard, reduced motion, and both media at three widths.
- **The pinned band is `lg` and wider; below it each section draws its own plate.** Verified on an iPhone 16 Pro rather than in an emulator, which is what exposed it: the half-viewport budget was measured against the viewport a phone _reports_, and Mobile Safari's chrome takes ~145px more, putting the band near 62% of the height a reader actually has. Trimming cannot close that — the plate would fall to ~160px against the 251px that justified the third geometry. So the retreat the brief pre-authorised was taken, narrowly. Desktop is unchanged at 369px and 37%. The reasoning and the two traps it left behind are in `docs/design/deconstruction-brief.md`.

### Phase 5 — Finish (Claude)

`/impeccable audit` then `/impeccable polish`. Catch Codex drift, verify both themes, confirm the accessibility gates.

One Phase 5 finding was pulled forward rather than left for the audit, because it cost the site every route into its own depth: **a figure cell is now the way into its case study.** The only link was a 13px line of label type at the foot of each cell, set in the same treatment as the tag chips beside it and the `FIG.` numeral above it, so nothing at rest distinguished a control from a caption — and the plate and the title, the two things a reader aims at, did nothing. The title now carries the link with its hit area stretched over the whole cell. FIG. 1 has no cell, so its caption link was padded to a real target on the same reasoning.

---

## Risk register

- ~~**Vermilion contrast.**~~ Retired in Phase 1. Each theme carries its own measured annotation value.
- **SVG accessibility.** Every figure needs `<title>`/`<desc>`; numerals must be keyboard reachable and announce which part they mark. A drawing that only works visually fails this project's own bar.
- ~~**Line art at small sizes.**~~ Retired. `vector-effect: non-scaling-stroke` holds every weight at its declared width regardless of plate scale.
- **Scroll choreography cost.** Must stay smooth on a mid-range phone. The site's argument is its own build quality; a janky signature moment does real damage.
- **The drawings are the labor.** This world has no chrome to hide behind. Weak figures collapse the whole direction.

## Open items

- ~~**Cut the contact form.**~~ Done in Phase 3. CONTACT is a mailto, and the component, hook, mock route, specs, and scripts are gone.
- ~~**`project-card.tsx`, `tech-stack.tsx`, and `animated-section.tsx` may now be unused.**~~ Confirmed and removed in Phase 3.
- **Where `/projects/agent-development-lifecycle` should land.** ADR 0001 chose `/` because no replacement route was in scope. One now exists and carries the ADLC substance as lineage, which is the condition the ADR conditioned its choice on. Retargeting the redirect to `/projects/loopworks` was deliberately left out of Phase 4a: it changes an accepted decision, so it wants a superseding record rather than a quiet edit. `adlc-redirect.spec.ts` pins the current destination.
- Whether case studies keep their current length is open; PRODUCT.md does not bind it.
- The spacing rhythm is still incumbent Tailwind spacing. Composing the index sheet did not force a scale, so this stays open and should be settled in Phase 5 rather than guessed at now.
- The `.impeccable/design.json` sidecar is not generated yet; it waits on the component inventory in Phase 2.
- **Dependencies need a real audit and update pass, deferred until the migration lands** (decided 2026-07-28). Not a redesign task, and deliberately not interleaved with one: churning versions underneath a half-finished visual migration would make it impossible to tell which change broke what. Nothing pins pnpm either, so contributors drift between major versions; `packageManager` would fix it but needs corepack and is part of the same later pass.

## Reference

- `docs/design/comps/` — the three direction comps. B and C combined were approved; A is retained as evidence of the extreme.
- `docs/design/type-specimen.html` — the four-face specimen rendered in the committed world. Sheet A is real DIN for reference; Saira was chosen from D.
