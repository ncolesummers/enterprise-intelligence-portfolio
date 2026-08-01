# Redesign: The Figure Sheet

**Status: closed.** Phases 1–5 all shipped; the last landed 2026-07-30. This is
a record of how the visual replacement was decided and executed, not a work
order. It is retained rather than deleted because the Open items section at the
bottom still holds live commitments — the dependency audit, the unpinned pnpm
version, and `ci.yml` not dispatching in GitHub Actions. Those are the reason
this file is here.

Originally the working plan for the visual replacement on
`feat/figure-sheet-redesign`.

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

### Phase 5 — Finish (Claude) — **done**

`/impeccable audit` then `/impeccable polish`. Catch Codex drift, verify both themes, confirm the accessibility gates.

One Phase 5 finding was pulled forward rather than left for the audit, because it cost the site every route into its own depth: **a figure cell is now the way into its case study.** The only link was a 13px line of label type at the foot of each cell, set in the same treatment as the tag chips beside it and the `FIG.` numeral above it, so nothing at rest distinguished a control from a caption — and the plate and the title, the two things a reader aims at, did nothing. The title now carries the link with its hit area stretched over the whole cell. FIG. 1 has no cell, so its caption link was padded to a real target on the same reasoning.

The audit found the redesigned surfaces sound and the drift concentrated in one place. Measured token contrast matched this file's tables to the second decimal in both media, and lint, types, and the build were clean throughout. What it found instead:

- **`/about` was never migrated, and it was 12 of 23 findings.** Not drift within the system — the incumbent page, intact, inside a drafting frame. It used no `type-*` step, so Saira rendered at 100% width where the display step calls for 87.5% and the page was visibly lettered in a second hand. It put a resting vermilion `accent` button on a sheet whose title block already marks the current page in vermilion, breaking the One Annotation Rule in a single viewport. And it was the only route on the primary navigation.
- **`ContentCard` rendered nothing at all.** `rounded-lg bg-card p-6`, with `--card` remapped to `--ground`, the radius scale zeroed, and the shadow namespaces cleared. Six panels on `/about` had no boundary of any kind. This is the token layer working exactly as designed — a stray `rounded-lg` flattens, a stray `shadow-lg` does not render — and it is also the failure mode that enforcement produces: the component did not break loudly, it dissolved.

Decisions the plan did not anticipate:

- **The spacing rhythm was settled by declaration, not by imposition.** The built pages had already converged on a doubling scale with half-steps — 1 · 2 · 3 · 4 · 6 · 8 · 12 · 16 · 24 — and the heading rule this file asked for was already holding at 16 above and 8 below. So Phase 5 wrote the spine down in DESIGN.md and corrected the handful of values off it, rather than inventing a scale and rewriting five finished case studies at the end of the project. The deconstruction band is named as the one exception: its geometry answers to a measurement taken against a real phone, not to a rhythm.
- **The homepage's contact section could not simply be cut.** "Get In Touch" over three bare glyphs was incumbent chrome and it asked for something PRODUCT.md says the site must not ask for — but the title block drops its references below `sm`, so that section was the only route to the repository on a phone, and a spec pins exactly that. It became a **references block**: each destination named, its address legible before it is followed, ruled full width like a schedule on a drawing with the fields set from the left margin.
- **A case study now states its own numeral.** The index sent a reader from "Read FIG. 4" to a page that never mentioned FIG. 4, which dropped the site's navigating conceit at the moment it was followed. `CaseStudyHeader` carries it, and also moved the five headers off centre — centred display type over left-set prose was the one centred block on each page, and it is the habit of the convention this world replaces.
- **The three states got the drawing's vocabulary.** A 404 is a hidden-line reserved area, which is what the figures already use for a part that is specified and not present. Loading is a straightedge traversing a ruled band, replacing a spinning circle that competed with the callout bubble for the system's one curve. Neither they nor the error boundary apologize, and the ⚠️ that was the only glyph on the site unlettered in Saira is gone.
- **`.impeccable/design.json` cannot be generated and the open item was wrong.** No such file is defined anywhere in the installed tooling, and the `/impeccable document` command DESIGN.md pointed at does not exist in impeccable 1.3.0. Writing one would have meant inventing a schema. The substance it was standing in for — the component inventory — is now captured in DESIGN.md, which is the authority for it anyway.
- **A layout change exposed two latent test races**, both now recorded in `docs/TEST_PLAN.md`. The contrast fixture polled until a colour _resolved_ but nothing guarded against a colour that resolved to the previous medium, so a ground read before the repaint could be paired with a foreground read after it. And a detail view that is not shown takes no pointer events by design, so a click issued before the scroll switched views landed on nothing and looked exactly like the staleness bug the test existed to catch. Both were pre-existing; the polish shifted timings enough to surface them. Five consecutive full-suite runs are clean afterwards.

---

## Risk register

- ~~**Vermilion contrast.**~~ Retired in Phase 1. Each theme carries its own measured annotation value.
- **SVG accessibility.** Every figure needs `<title>`/`<desc>`; numerals must be keyboard reachable and announce which part they mark. A drawing that only works visually fails this project's own bar.
- ~~**Line art at small sizes.**~~ Retired. `vector-effect: non-scaling-stroke` holds every weight at its declared width regardless of plate scale.
- ~~**Scroll choreography cost.**~~ Retired in Phase 4. The deconstruction was checked and accepted on an iPhone 16 Pro rather than in an emulator, which is what exposed that the pinned band cost more viewport than it earned on a phone; it retreats to `lg` and wider, and each section draws its own plate below that.
- **The drawings are the labor.** This world has no chrome to hide behind. Weak figures collapse the whole direction.

## Open items

- ~~**Cut the contact form.**~~ Done in Phase 3. CONTACT is a mailto, and the component, hook, mock route, specs, and scripts are gone.
- ~~**`project-card.tsx`, `tech-stack.tsx`, and `animated-section.tsx` may now be unused.**~~ Confirmed and removed in Phase 3.
- ~~**Where `/projects/agent-development-lifecycle` should land.**~~ Settled. It redirects to `/projects/loopworks`, the successor that carries its substance as lineage, per `docs/adr/0002-retarget-adlc-redirect-to-loopworks.md`. ADR 0001 decision 4 is superseded and annotated in place; its other seven boundaries stand. `adlc-redirect.spec.ts` pins the new destination and asserts the successor is not the retired case study restored under a new URL.
- ~~**The spacing rhythm.**~~ Settled in Phase 5 and recorded in DESIGN.md: a doubling scale with half-steps, declared from what the build had already converged on.
- ~~**The `.impeccable/design.json` sidecar.**~~ Closed as not a real artifact. Nothing in impeccable 1.3.0 defines it and the command DESIGN.md pointed at does not exist; the component inventory it stood for is in DESIGN.md.
- ~~**The four incumbent case studies declare their own primitives.**~~ Migrated in Phase 5. All five build from `src/components/case-study.tsx`, which also grew `CaseStudyHeader`. Two page-local code-evidence panels stay local: they differ in treatment and have two copies, not five.
- Whether case studies keep their current length is open; PRODUCT.md does not bind it. The audit noted that the four incumbents are largely lists of capability bullets rather than arguments — `uidaho-website` states its architecture twice, in Introduction and again in Technical Architecture — but rewriting them is editorial work on real employer-bounded content, not polish, and it was left alone deliberately.
- **Dependencies need a real audit and update pass, deferred until the migration lands** (decided 2026-07-28). The migration has now landed, so the condition is met. Still not a redesign task and still not to be interleaved with one. Nothing pins pnpm either, so contributors drift between major versions; `packageManager` would fix it but needs corepack and is part of the same later pass.
- **GitHub Actions is not dispatching `ci.yml`** (observed 2026-07-30). PR #44 and its merge commit both have zero check runs, though Actions is enabled and the workflow is active and valid, and both triggers worked as recently as 13 May. There is no `workflow_dispatch` trigger, so it cannot be run by hand. Local checks are the gate until this is diagnosed.

## Reference

- `docs/design/comps/` — the three direction comps. B and C combined were approved; A is retained as evidence of the extreme.
- `docs/design/type-specimen.html` — the four-face specimen rendered in the committed world. Sheet A is real DIN for reference; Saira was chosen from D.
