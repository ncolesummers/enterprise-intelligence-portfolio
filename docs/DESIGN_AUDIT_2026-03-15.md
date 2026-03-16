# Design Audit Report — 2026-03-15

## Anti-Patterns Verdict

**Mixed.** The site avoids most AI-slop tells — no gradient text, no glassmorphism, no hero metrics grid, no generic font choices (Geist is a strong pick). However, there are some concerning patterns:

- **Hard-coded dark theme on project pages** (`bg-black text-white`) rather than using design tokens — looks like early prototyping that was never normalized
- **`text-gray-400` / `text-gray-300`** used extensively instead of `text-muted-foreground` — breaks the token system
- **`bg-white text-black hover:bg-gray-200`** on CTA buttons — hard-coded instead of using button variants
- The 404 page uses `bg-blue-500` — completely outside the design system
- `ring-gray-500/10` on project-card tags — hard-coded gray
- `border-white/10` on footer — works in dark mode only

**Verdict: Not AI-slop, but the project detail pages feel like a separate site.** The homepage and about page use the token system well; the project pages bypass it entirely.

---

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 4 |
| Medium | 5 |
| Low | 3 |
| **Total** | **14** |

**Top 5 issues:**
1. Project pages hard-code `bg-black text-white` — completely break in light mode
2. Contact form success/error message missing `role` and `aria-live` for screen readers
3. Tab components use wrong ARIA pattern (`aria-current` instead of `role="tab"`)
4. 404 page uses hard-coded `bg-blue-500` outside design system
5. `ContactSection` component uses hard-coded colors instead of tokens

---

## Detailed Findings

### Critical Issues

**1. Project pages bypass design token system entirely**
- **Location**: `src/app/projects/uidaho-website/page.tsx:59`, `profile-extractor/page.tsx`, `myui/page.tsx`, `mikrotik-config-gen/page.tsx`
- **Category**: Theming
- **Description**: All four project pages use `bg-black text-white` at root, `text-gray-300`/`text-gray-400` for body text, `border-white/10` for borders, `bg-white text-black` for CTA buttons
- **Impact**: Pages are completely broken in light mode. Switching theme does nothing on these pages.
- **Recommendation**: Replace with `bg-background text-foreground`, `text-muted-foreground`, `border-border`, and proper button variants
- **Suggested command**: `/normalize` — systematic token alignment across all project pages

**2. Contact form status message inaccessible to screen readers**
- **Location**: `src/components/contact-form.tsx:101-111`
- **Category**: Accessibility (WCAG 4.1.3 Status Messages)
- **Description**: Success/error message after form submission has no `role="status"` or `role="alert"`, no `aria-live` attribute
- **Impact**: Screen reader users won't be informed when their form submission succeeds or fails
- **Recommendation**: Add `role={isSuccess ? "status" : "alert"}` and `aria-live="polite"`
- **Suggested command**: `/harden`

### High-Severity Issues

**3. Tab components use incorrect ARIA pattern**
- **Location**: `src/components/tabbed-screenshot-gallery.tsx`, `src/components/tabbed-iframe-preview.tsx`
- **Category**: Accessibility (WCAG 4.1.2)
- **Description**: Uses `aria-current="page"` (navigation pattern) instead of proper tab pattern: `role="tablist"` on container, `role="tab"` on buttons, `role="tabpanel"` on content, `aria-selected` on active tab
- **Impact**: Assistive technology cannot communicate tab interface semantics to users
- **Suggested command**: `/harden`

**4. 404 page outside design system**
- **Location**: `src/app/not-found.tsx:13`
- **Category**: Theming
- **Description**: Uses `bg-blue-500 text-white rounded hover:bg-blue-600` — hard-coded blue that doesn't exist anywhere else in the design system
- **Impact**: Inconsistent experience; doesn't respect theme
- **Recommendation**: Use `<Button variant="accent">` or `<Button variant="default">`
- **Suggested command**: `/normalize`

**5. ContactSection uses hard-coded colors**
- **Location**: `src/components/contact-section.tsx:10,14`
- **Category**: Theming
- **Description**: `text-gray-400` for paragraph, `bg-white text-black hover:bg-gray-200` for button — all hard-coded
- **Impact**: Breaks in light mode, inconsistent with rest of site
- **Suggested command**: `/normalize`

**6. About page footer missing aria-labels on icon links**
- **Location**: `src/app/about/page.tsx:265-289`
- **Category**: Accessibility (WCAG 1.1.1)
- **Description**: Social icon links in the about page footer have no `aria-label` (unlike the homepage footer which correctly includes them)
- **Impact**: Screen reader users hear "link" with no indication of destination
- **Suggested command**: `/harden`

### Medium-Severity Issues

**7. Project card tags use hard-coded gray ring**
- **Location**: `src/components/project-card.tsx:41`
- **Category**: Theming
- **Description**: `ring-gray-500/10` instead of `ring-border` or similar token
- **Suggested command**: `/normalize`

**8. Footer uses `border-white/10` instead of `border-border`**
- **Location**: `src/components/footer.tsx:7`
- **Category**: Theming
- **Description**: Hard-coded white border only works in dark mode
- **Suggested command**: `/normalize`

**9. Progress circle icon uses hard-coded hex color**
- **Location**: `src/components/icons/progress-circle-icon.tsx:30`
- **Category**: Theming
- **Description**: `stroke="#1f2937"` — hard-coded hex instead of currentColor or CSS variable
- **Suggested command**: `/normalize`

**10. Contact form uses hard-coded success/error colors**
- **Location**: `src/components/contact-form.tsx:105-106`
- **Category**: Theming
- **Description**: `text-green-600 dark:text-green-400` / `text-red-600 dark:text-red-400` — works but isn't using the design system's `--destructive` token for errors
- **Suggested command**: `/normalize`

**11. Embedded preview components use hard-coded grays**
- **Location**: `src/components/embedded-site-preview.tsx`, `tabbed-iframe-preview.tsx`, `tabbed-screenshot-gallery.tsx`
- **Category**: Theming
- **Description**: `bg-gray-900`, `text-white/60`, `text-blue-400` throughout
- **Suggested command**: `/normalize`

### Low-Severity Issues

**12. Copyright year hard-coded to 2025**
- **Location**: `src/components/footer.tsx:9`
- **Category**: Content
- **Description**: Shows "© 2025" but current date is 2026
- **Suggested command**: `/harden`

**13. Touch targets potentially undersized on tab buttons**
- **Location**: `tabbed-screenshot-gallery.tsx:44`, `tabbed-iframe-preview.tsx:42`
- **Category**: Accessibility
- **Description**: `px-4 py-2` tabs may render below 44x44px minimum touch target
- **Suggested command**: `/adapt`

**14. No `<Footer>` component reuse on project pages**
- **Location**: All project pages
- **Category**: Consistency
- **Description**: Project pages have no footer at all; about page duplicates footer markup instead of using the `<Footer>` component
- **Suggested command**: `/extract`

---

## Positive Findings

- **Excellent animation implementation** — Uses only `transform` and `opacity` (GPU-accelerated), properly respects `prefers-reduced-motion`
- **Strong form validation** — Zod + React Hook Form with real-time validation, `aria-describedby` linking errors to inputs, `aria-invalid` states
- **Good semantic structure** — Proper heading hierarchy, landmark regions, skip-to-content link
- **OKLCH color system** — Modern, perceptually uniform color space — excellent choice
- **Homepage and About page** use design tokens correctly — these are the model to follow
- **Responsive design** is well-implemented throughout with consistent breakpoint patterns
- **`Section` and `ContentCard` components** use design tokens properly (`bg-card`, `bg-border`)

---

## Recommendations by Priority

### Immediate
1. Run `/normalize` to align all project pages, contact-section, footer, and 404 page with the design token system. This is the single highest-impact fix (~30 hard-coded colors across ~8 files).

### Short-term
2. Run `/harden` to fix ARIA issues: contact form status messages, tab component patterns, missing aria-labels on about page footer, copyright year
3. Run `/adapt` to verify touch targets meet 44px minimum on mobile

### Medium-term
4. Run `/extract` to create a shared project page layout component (all 4 project pages duplicate the same header/structure)
5. Run `/polish` for final consistency pass — spacing, alignment, component reuse

### Long-term
6. Run `/delight` to add purposeful micro-interactions that reinforce the "Technical, Refined, Confident" brand
7. Run `/animate` to enhance scroll animations with more variety and staggering

---

## Suggested Command Sequence

| Command | Issues Addressed | Priority |
|---------|-----------------|----------|
| `/normalize` | #1, #4, #5, #7, #8, #9, #10, #11 (8 issues) | Immediate |
| `/harden` | #2, #3, #6, #12 (4 issues) | Short-term |
| `/adapt` | #13 (1 issue) | Short-term |
| `/extract` | #14 (1 issue) | Medium-term |
| `/polish` | Final consistency pass | Medium-term |
