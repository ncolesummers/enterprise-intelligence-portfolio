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

### Phase 2 — FIG. 1 and the homepage (Claude) — **all but the monogram done**

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

Still open: **the monogram.** It needs two or three versions put in front of a
human before one becomes the mark, so it is a checkpoint rather than a task to
finish unattended.

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

### Phase 3 — Propagation (Codex)

Hand off once Phase 2 establishes the pattern. Codex gets a token and component contract plus one worked example, and does the mechanical spread:

- Remaining **three** index plates, drawn to the specs recorded under Phase 2.
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

- ~~**Vermilion contrast.**~~ Retired in Phase 1. Each theme carries its own measured annotation value.
- **SVG accessibility.** Every figure needs `<title>`/`<desc>`; numerals must be keyboard reachable and announce which part they mark. A drawing that only works visually fails this project's own bar.
- ~~**Line art at small sizes.**~~ Retired. `vector-effect: non-scaling-stroke` holds every weight at its declared width regardless of plate scale.
- **Scroll choreography cost.** Must stay smooth on a mid-range phone. The site's argument is its own build quality; a janky signature moment does real damage.
- **The drawings are the labor.** This world has no chrome to hide behind. Weak figures collapse the whole direction.

## Open items

- **Cut the contact form.** The FormSpree integration was never paid for and is not used. Removing it takes `contact-form.tsx`, the `useFormValidation` hook, the mock route at `src/app/api/test/formspree-mock/route.ts`, the contact-form specs, and the `test:contact-form` / `test:integration` scripts with it, and turns the CONTACT nav item into a mailto. Best done alongside Phase 2, which rebuilds the index sheet anyway. Not urgent.
- The constructed monogram is committed in concept but undrawn. Two or three versions get reviewed before it becomes the mark. This is the one Phase 2 item still outstanding.
- **`project-card.tsx`, `tech-stack.tsx`, and `animated-section.tsx` may now be unused** on the index sheet. Confirm before deleting; the case studies still import some of them.
- Whether case studies keep their current length is open; PRODUCT.md does not bind it.
- The spacing rhythm is still incumbent Tailwind spacing. Composing the index sheet did not force a scale, so this stays open and should be settled in Phase 5 rather than guessed at now.
- The `.impeccable/design.json` sidecar is not generated yet; it waits on the component inventory in Phase 2.

## Reference

- `docs/design/comps/` — the three direction comps. B and C combined were approved; A is retained as evidence of the extreme.
- `docs/design/type-specimen.html` — the four-face specimen rendered in the committed world. Sheet A is real DIN for reference; Saira was chosen from D.
