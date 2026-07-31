---
name: N. Cole Summers
description: A portfolio drawn as a set of engineering figure sheets.
---

<!-- Colors, typography, line weights, and the sheet frame are built and their values here are real. The component inventory is not yet captured; re-run /impeccable document once Phase 2 lands the figures and callouts. -->

# Design System: N. Cole Summers

## Overview

**Creative North Star: "The Figure Sheet"**

The site is drawn, not laid out. Its authority is the engineering figure sheet: the tradition of patent drawings, assembly diagrams, and shop drawings whose entire purpose is to show how a system is constructed. Numbered figures, reference numerals riding leader lines, section hatching, and a title block crediting the draftsman. This is the one visual tradition whose native job is the exact thing this portfolio must prove, that its subject architects systems rather than merely operating them.

The world is chosen for accuracy, not atmosphere. A drawing does not decorate; every mark it makes carries information, and anything that cannot carry information does not belong on the sheet. That discipline is the answer to the site's central risk: visual production that outruns the substance beneath it. Here, production _is_ substance, because the ornament is annotation.

It is also a tradition that cannot date. A 1902 patent plate and a 2026 CAD sheet share a grammar. A portfolio meant to sit accurate and untended for years should be built on a look that has already survived a century.

**Key Characteristics:**

- Line, not fill. Form is described by stroke weight, not by blocks of color.
- One lettering hand across the entire sheet.
- Annotation as the interaction system: reference numerals are the primary way parts are named and picked up.
- Flat by absolute rule. No shadows anywhere, in either theme.
- Two authentic renditions, not one theme inverted.
- Every animated figure is complete and legible in its static assembled state.

## Colors

A drawing is ink on a ground, plus one annotation color. Nothing else earns a place.

The strategy is deliberately asymmetric between themes. Light is **Restrained**: paper ground, ink line, one accent held in reserve. Dark is **Drenched**: the blueprint ground owns the whole surface, and the line sits on top of it. Light is the default, because ink on paper is this world's canonical form and because leading with a bright ground is a genuine break from the dark-developer-portfolio convention this site is replacing.

Values are settled and live in `src/app/globals.css`. Each theme is expressed through four role tokens — `--ground`, `--line`, `--line-soft`, `--annotation` — so a component names the role and the tradition supplies the material.

### Light: ink on paper

| Role           | Value     | Material  | Contrast on ground |
| -------------- | --------- | --------- | ------------------ |
| `--ground`     | `#F7F5F0` | Paper     | —                  |
| `--line`       | `#16181C` | Ink       | 16.3:1             |
| `--line-soft`  | `#646259` | Graphite  | 5.6:1              |
| `--annotation` | `#B8351E` | Vermilion | 5.4:1              |

**Paper** is a warm-neutral drawing stock, deliberately not cream; cream plus a serif is the aesthetic default this world must not collapse into. **Ink** is near-black, never pure black.

### Dark: chalk on cyanotype

| Role           | Value     | Material    | Contrast on ground |
| -------------- | --------- | ----------- | ------------------ |
| `--ground`     | `#072B4C` | Blueprint   | —                  |
| `--line`       | `#EDE8DC` | Chalk       | 11.8:1             |
| `--line-soft`  | `#93AAC0` | Faded chalk | 6.0:1              |
| `--annotation` | `#EF7048` | Vermilion   | 4.9:1              |

**Blueprint** is the Prussian blue the cyanotype process actually produces, drenched across the whole surface rather than used as a tint. **Chalk** sits on it the way white pencil sits on a blueprint.

### Primary

**Vermilion** is the draftsman's red annotation pencil. It marks exactly one thing: what is currently active, selected, or being pointed at. It is never a brand color, never a fill, never decorative.

The two vermilions are 0.17 apart in lightness and six degrees apart in hue. They are not one value and its inverse; each was chosen against the ground it sits on. The light value is deeper than the `#C8402A` carried through the type specimen, which measured 4.56:1 — a pass with no margin, on a color whose whole job is small label text.

### Named Rules

**The Two Traditions Rule.** Light is ink on paper. Dark is a cyanotype blueprint. Neither theme is the other one with its values flipped: each is a real drafting tradition and is drawn as itself. Any color that only exists because it was computed as an inverse is wrong.

**The One Annotation Rule.** Vermilion marks the active callout and nothing else. If more than one element on screen is vermilion at rest, the rule has been broken. Its scarcity is what makes it read as annotation rather than branding.

## Typography

**Display / Body / Label Font:** Saira (variable, width and weight axes), with a system sans fallback
**Code Font:** Monaspace, with a system mono fallback

**Character:** Saira is the closest servable relative to DIN 1451, the German industrial standard drawn in 1931 so that any draftsman could reproduce it exactly with compass and straightedge. Monolinear strokes, squared arcs, tall x-height, no calligraphic memory. It is the actual lettering tradition of technical drawings rather than a face that merely evokes one. Its variable width axis does the work of two families: compressed for the drawing apparatus, normal width for sustained reading.

### Hierarchy

Each step is a utility in `globals.css`. Width is set with `font-stretch`, which drives Saira's `wdth` axis directly, so a step composes with Tailwind's weight and size utilities instead of fighting them. Monaspace is Neon, self-hosted, and not preloaded — a page with no code block never fetches it.

| Step            | Width | Weight | Size                                    | Use                                               |
| --------------- | ----- | ------ | --------------------------------------- | ------------------------------------------------- |
| `type-display`  | 87.5% | 800    | `clamp(2.5rem, 7.5vw, 6rem)`            | Figure titles, the opening statement              |
| `type-headline` | 87.5% | 700    | `clamp(1.5rem, 3vw, 2.25rem)`           | Section and figure headings                       |
| `type-title`    | 100%  | 600    | `clamp(1.125rem, 1.6vw, 1.375rem)`      | Case-study subheads                               |
| `type-body`     | 100%  | 400    | `1.0625rem` / 1.65                      | Long-form reading, paired with `measure` (66ch)   |
| `type-label`    | 87.5% | 600    | `0.6875rem`, 0.16em, uppercase, tabular | Numerals, captions, title-block fields, tags, nav |
| `type-code`     | —     | —      | `0.875rem`                              | Literal code only, `liga` and `calt` on           |

Body copy at normal width is mandatory. Semi-condensed body text across a long case study is fatiguing, which the specimen demonstrated.

### Named Rules

**The One Hand Rule.** A drawing is lettered in a single hand. Saira sets everything on the sheet, including labels, numerals, captions, tags, and navigation. Monospace appears only where there is literal code. Scattering mono labels across the interface for technical flavor is the exact habit of the convention this site is replacing.

**The Width-Does-The-Work Rule.** Register changes come from the width axis, not from swapping families or reaching for a second typeface. Compressed reads as drawing apparatus; normal width reads as prose.

## Layout

The page is a sheet. It carries a border rule at object weight, an inner margin rule at leader weight, and centering marks at the midpoint of each edge. The frame is fixed rather than scrolled, so it reads as the edge of the drawing board while the sheet pans beneath it. Content sits inside that frame rather than bleeding to the viewport edge; `--sheet-margin` is viewport edge to border rule and `--sheet-gutter` is border rule to content.

The **title block** is persistent chrome that absorbs the roles a conventional header and footer would split: identity, navigation, off-sheet references, and the theme control. It is a full-width ruled band along the lower edge of the sheet rather than a lower-right panel. Both placements are authentic — ISO 5457 sheets use the bottom band — and the band neither occludes the drawing area nor needs a second layout on small screens, which the corner panel did on both counts. Its cell divisions are drawn by one-pixel gaps over a rule-colored ground, so no division is ever a doubled border.

The theme control is a **medium** field. It names the two traditions, paper and blueprint, rather than reaching for the sun-and-moon pair every site in this category already uses.

Every field in the block states something true: drawn-by, the sheet's section name, and the current medium. There are no drawing numbers, revision letters, scales, sheet sizes, or approvers, because none of them exist.

Content is organized as numbered **figures** rather than cards. The work index is a sheet of figures the visitor can scan at once, not a procession that forces sequence. Visitors arrive under time pressure and compare candidates side by side; making depth mandatory would be a direct cost to them. Depth stays one click away and never in the way.

Spacing follows one rhythm throughout, with more space above a heading than below it, binding each heading to the content it introduces. Exact scale steps are resolved during the first build.

## Elevation & Depth

**There are no shadows in this system, in either theme.** Not on cards, not on hover, not on modals, not softened, not tinted. A drawing has no shadows because a drawing is not a photograph of a surface, and a drop shadow here would be the single fastest way to make the whole world read as costume.

Depth is carried entirely by **line weight hierarchy**, borrowed directly from drafting practice:

- **Object line** (heaviest): the outline of the thing being described.
- **Leader and dimension line** (light): points from a reference numeral to its part.
- **Hidden line** (dashed, medium): a part present but occluded, or a component specified but not yet built.
- **Center and construction line** (thin, chain-dashed): axes, symmetry, and the geometry a form was constructed from.
- **Section hatching** (fine parallel rule): a surface cut through, used where a system is opened up to show its interior.

Weights are `--line-w-object` (2px), `--line-w-hidden` (1.5px), and 1px for leader, center, and hatching. Nothing goes below 1px: sub-pixel strokes are not reliably reproducible on screen, and 1px is also the responsive floor. The three lightest weights are told apart by ink and by dash pattern rather than by width — `--dash-hidden` and `--dash-center` are stroke-dasharray values, so a hidden line in a figure and a hidden line in the layout are the same line.

### Named Rules

**The Flat Sheet Rule.** No `box-shadow` anywhere in the codebase. Separation between surfaces comes from rules, line weight, and hatching. If two regions need distinguishing, draw a line, change a weight, or hatch one of them. This is enforced at the token layer rather than by review: `globals.css` clears the `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, and `--text-shadow-*` namespaces, so Tailwind generates no shadow utility at all and a stray `shadow-lg` cannot render one.

**The Weight-Means-Something Rule.** Line weight is semantic, never decorative. Before assigning a stroke width, name which of the five weights above it is and why. A heavy rule around something that is not an object outline is a mistake.

## Shapes

Corners are square. The incumbent 0.625rem radius is removed entirely rather than reduced: every step of Tailwind's radius scale from `--radius-xs` through `--radius-4xl` is set to `0`, so the seventy existing `rounded-*` classes flatten without being touched one by one. `rounded-full` is deliberately left alone, because it is not part of that scale and it is how the one legitimate curve is drawn.

The one curve that belongs is the **callout bubble**: the circle enclosing a reference numeral. It is a perfect circle, drawn in object-line weight, and it is the system's single recurring silhouette. Because it is the only circular form, it carries enormous identifying weight, and it appears in the mark itself.

**The mark is CS inside that circle** — Cole Summers, the name he goes by rather than the N he does not. Both letters are constructed: the C is one compass circle with a segment lifted, the S is two arcs meeting at the letter's midpoint, widened to an elliptical rx so it carries the C's optical width. It lives in the title block at roughly 24px and has a second, unframed configuration for places with horizontal room. Unlike the figures, its stroke scales with the mark; a fixed stroke at 24px leaves all stroke and no counter. Any second reading the initials carry stays unstated in code, copy, and alt text.

Boxes are ruled, not filled. Where a region needs bounding, it gets a rule; where it needs emphasis, it gets a heavier rule or hatching.

## Do's and Don'ts

### Do:

- **Do** letter the entire sheet in Saira, using its width axis for register changes.
- **Do** reserve vermilion for the single active annotation, and let its scarcity do the work.
- **Do** convey depth through the five-weight line hierarchy and section hatching.
- **Do** draw both themes as authentic traditions: ink on paper, and chalk line on cyanotype blue.
- **Do** make every figure complete and legible in its static assembled state before any motion is added. Reduced-motion users get the assembled drawing, and it must be good on its own.
- **Do** keep square corners, and let the callout circle be the only curve.

### Don't:

- **Don't** fabricate the legal instrument. No invented patent numbers, no filing or priority dates, no "patent pending", no office seals, no application serials. This world contributes drawing and annotation grammar only. Fabricating the apparatus would both cheapen the direction and violate the product's standing prohibition on manufactured proof.
- **Don't** add a shadow, glow, blur, or glass effect anywhere, in any state, in either theme.
- **Don't** scatter monospace across the interface as technical seasoning. Code font means code.
- **Don't** use cream, parchment, or lamplight warmth for the paper ground. That is the default aesthetic wearing this subject's clothes.
- **Don't** introduce a second accent color. One annotation color is the system.
- **Don't** round a corner, including on buttons, inputs, tags, images, and containers.
- **Don't** let a drawing illustrate something untrue. Every labeled part must correspond to something that actually exists in the system being drawn; a figure that invents components to look impressive fails both this system and the product's evidence rules.
