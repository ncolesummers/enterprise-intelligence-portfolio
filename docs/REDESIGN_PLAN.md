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

### Phase 2 — FIG. 1 and the homepage (Claude)

- Author FIG. 1, the Loopworks delivery loop, as SVG with addressable part groups.
- Build the **callout numeral** component: circle, leader line, active state in vermilion, keyboard reachable, one active at a time.
- Statement at display scale.
- Figure index with six plates; author **one** index plate fully as the pattern for the rest.
- FIG. 6 (Inbox Idaho) as the dashed hidden-line figure.
- Redraw the NCS mark as a constructed monogram inside the title-block stamp.

### Phase 3 — Propagation (Codex)

Hand off once Phase 2 establishes the pattern. Codex gets a token and component contract plus one worked example, and does the mechanical spread:

- Remaining four index plates, scaffolded from written specs.
- Case-study pages restyled onto the new system.
- Redirect `/projects/agent-development-lifecycle` (retired; folded into Loopworks as lineage). Must not 404 — it may be indexed.
- Self-host and subset Saira and Monaspace; verify ligature features are on for code.
- Repair the Playwright suite, which the redesign will break broadly.

**Codex must not** choose type, color, composition, or what a system looks like as a drawing. Deciding that MyUI reads as a particular diagram is design judgment.

### Phase 4 — The deconstruction (Claude)

Scroll-driven exploded assembly on the Loopworks case study. Parts separate along their own leader lines. Layers must map to real components: GitHub Issue as source of truth, webhook, the named loops (agent-ready, development, research), sandbox, deployment.

Requires the assembled static figure to be complete and good on its own first. Reduced motion resolves to it.

### Phase 5 — Finish (Claude)

`/impeccable audit` then `/impeccable polish`. Catch Codex drift, verify both themes, confirm the accessibility gates.

---

## Risk register

- **Vermilion contrast.** `#C8402A` on paper and on Prussian blue both need WCAG AA verification. If it fails on one ground, that theme gets its own annotation value rather than the contrast bar being lowered.
- **SVG accessibility.** Every figure needs `<title>`/`<desc>`; numerals must be keyboard reachable and announce which part they mark. A drawing that only works visually fails this project's own bar.
- **Line art at small sizes.** Hairlines disappear on mobile. Line weights need a responsive floor.
- **Scroll choreography cost.** Must stay smooth on a mid-range phone. The site's argument is its own build quality; a janky signature moment does real damage.
- **The drawings are the labor.** This world has no chrome to hide behind. Weak figures collapse the whole direction.

## Open items

- **FIG. 1's parts must be verified against the actual Loopworks repo before drawing.** Current knowledge is README-level only. Drawing a component that does not exist would violate PRODUCT.md's evidence rules.
- **Cut the contact form.** The FormSpree integration was never paid for and is not used. Removing it takes `contact-form.tsx`, the `useFormValidation` hook, the mock route at `src/app/api/test/formspree-mock/route.ts`, the contact-form specs, and the `test:contact-form` / `test:integration` scripts with it, and turns the CONTACT nav item into a mailto. Best done alongside Phase 2, which rebuilds the index sheet anyway. Not urgent.
- The constructed monogram is committed in concept but undrawn. Two or three versions get reviewed before it becomes the mark.
- Whether case studies keep their current length is open; PRODUCT.md does not bind it.
- The spacing rhythm is not yet a scale. Phase 1 settled color, type, and line weight; vertical rhythm is still incumbent Tailwind spacing and should be resolved when the index sheet is composed.
- The `.impeccable/design.json` sidecar is not generated yet; it waits on the component inventory in Phase 2.

## Reference

- `docs/design/comps/` — the three direction comps. B and C combined were approved; A is retained as evidence of the extreme.
- `docs/design/type-specimen.html` — the four-face specimen rendered in the committed world. Sheet A is real DIN for reference; Saira was chosen from D.
