---
name: N. Cole Summers
description: A portfolio drawn as a set of engineering figure sheets.
---

<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. -->

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

Values below are provisional starting points established during the type specimen exploration. The first build settles them, and this file gets updated with what survived.

### Primary

- **Vermilion** (`#C8402A`, provisional): the draftsman's red annotation pencil. It marks exactly one thing: what is currently active, selected, or being pointed at. It is never a brand color, never a fill, never decorative.

### Neutral

- **Paper** (`#F7F5F0`, provisional): the light-theme ground. A warm-neutral drawing stock, deliberately not cream. Cream plus a serif is the aesthetic default this world must not collapse into.
- **Ink** (`#16181C`, provisional): the light-theme line and body text. Near-black, never pure black.
- **Blueprint** (provisional, deep Prussian blue): the dark-theme ground, drenched. Derived from the cyanotype process, where exposure turns the field blue and the line stays unexposed.
- **Chalk** (provisional, warm off-white): the dark-theme line and body text, sitting on Blueprint the way white pencil sits on a blueprint.

### Named Rules

**The Two Traditions Rule.** Light is ink on paper. Dark is a cyanotype blueprint. Neither theme is the other one with its values flipped: each is a real drafting tradition and is drawn as itself. Any color that only exists because it was computed as an inverse is wrong.

**The One Annotation Rule.** Vermilion marks the active callout and nothing else. If more than one element on screen is vermilion at rest, the rule has been broken. Its scarcity is what makes it read as annotation rather than branding.

## Typography

**Display / Body / Label Font:** Saira (variable, width and weight axes), with a system sans fallback
**Code Font:** Monaspace, with a system mono fallback

**Character:** Saira is the closest servable relative to DIN 1451, the German industrial standard drawn in 1931 so that any draftsman could reproduce it exactly with compass and straightedge. Monolinear strokes, squared arcs, tall x-height, no calligraphic memory. It is the actual lettering tradition of technical drawings rather than a face that merely evokes one. Its variable width axis does the work of two families: compressed for the drawing apparatus, normal width for sustained reading.

### Hierarchy

- **Display** (Saira, semi-condensed, heavy, tight tracking): figure titles and the opening statement. Sized to command the sheet.
- **Headline** (Saira, semi-condensed): section and figure headings.
- **Title** (Saira, normal width, medium): case-study subheads.
- **Body** (Saira, normal width, regular, generous line-height, 60–70ch measure): long-form case-study reading. Normal width is mandatory here; semi-condensed body text across a long case study is fatiguing, which the specimen demonstrated.
- **Label** (Saira, semi-condensed, uppercase, wide tracking): reference numerals, figure captions, title-block fields, tags, and navigation.
- **Code** (Monaspace, programming ligatures enabled): literal code only.

### Named Rules

**The One Hand Rule.** A drawing is lettered in a single hand. Saira sets everything on the sheet, including labels, numerals, captions, tags, and navigation. Monospace appears only where there is literal code. Scattering mono labels across the interface for technical flavor is the exact habit of the convention this site is replacing.

**The Width-Does-The-Work Rule.** Register changes come from the width axis, not from swapping families or reaching for a second typeface. Compressed reads as drawing apparatus; normal width reads as prose.

## Layout

The page is a sheet. It carries a border rule, an inner margin rule, and a title block, and its content sits inside that frame rather than bleeding to the viewport edge.

The **title block** is persistent chrome, following the drafting convention of the lower-right credit panel: ruled cells carrying drawn-by, sheet number, revision, and status. It absorbs the roles that would otherwise become a conventional header and footer, and it carries navigation and the theme control.

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

### Named Rules

**The Flat Sheet Rule.** No `box-shadow` anywhere in the codebase. Separation between surfaces comes from rules, line weight, and hatching. If two regions need distinguishing, draw a line, change a weight, or hatch one of them.

**The Weight-Means-Something Rule.** Line weight is semantic, never decorative. Before assigning a stroke width, name which of the five weights above it is and why. A heavy rule around something that is not an object outline is a mistake.

## Shapes

Corners are square. `--radius` is `0`, and rounded rectangles do not exist in this world. The incumbent 0.625rem radius is removed entirely rather than reduced.

The one curve that belongs is the **callout bubble**: the circle enclosing a reference numeral. It is a perfect circle, drawn in object-line weight, and it is the system's single recurring silhouette. Because it is the only circular form, it carries enormous identifying weight, and it appears in the mark itself.

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
