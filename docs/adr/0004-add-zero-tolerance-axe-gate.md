# ADR 0004: Add a zero-tolerance axe accessibility gate

- **Status:** Accepted
- **Date:** 2026-08-01

## Context

The Playwright suite has focused accessibility contracts for semantics,
keyboard behavior, reduced motion, and computed contrast. Those checks cover
requirements an automated rules engine cannot determine, but the suite has no
broad automated WCAG rules scan. A regression detectable by axe can therefore
reach review unless a focused test happens to cover the same element and rule.

Running a broad rules scan in every existing browser and viewport project would
multiply cost without changing the rules under evaluation. Keeping a baseline
of accepted violations would be cheaper initially, but would turn known
failures into permanent policy and make new occurrences of an allowlisted rule
harder to distinguish.

## Decision

Use the official `@axe-core/playwright` wrapper and configure every scan with
the `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa` tags recommended by
[Playwright's accessibility testing guidance](https://playwright.dev/docs/accessibility-testing).

The gate has no allowlist and no baseline. Any reported violation fails with a
stable fingerprint made from the axe rule ID and affected targets; explanatory
message text is not a test key.

Scan these representative states in PAPER and BLUEPRINT:

- the complete homepage;
- the MyUI FIG. 3 index cell as a scoped representative plate;
- the structurally complex Loopworks case study;
- the not-found sheet; and
- the exported root loading boundary component inside the live application
  chrome and theme.

Every current route is statically prerendered and resolves without suspension.
Next.js therefore retains the previous route when a Flight response is held;
it does not mount `loading.tsx`. The gate renders that exact exported component
to static markup in the live page rather than adding a test-only route, hidden
delay, or false router-integration claim. A future route that genuinely suspends
should add end-to-end boundary coverage.

Run the spec once per medium in a dedicated desktop Chromium project named
`axe-chromium`. Exclude it from the five existing browser and device projects.
The existing semantic, keyboard, reduced-motion, and contrast tests remain in
place and remain authoritative for requirements axe cannot judge.

## Alternatives Considered

- **Run axe in all five existing projects.** Rejected because it repeats the
  same rules and representative states across browser engines and viewports
  without replacing the cross-browser behavioral tests that actually need that
  matrix.
- **Accept a baseline or rule allowlist.** Rejected because the gate is intended
  to establish zero detectable WCAG 2.1 A/AA violations, not preserve existing
  debt.
- **Replace handcrafted accessibility checks with axe.** Rejected because axe
  cannot determine whether names are useful, focus order is sane, reduced-motion
  states are complete, or evidence figures communicate the intended facts.
- **Scan every route.** Rejected in favor of representative structural coverage;
  focused route tests continue to own their specific contracts.

## Consequences

- `pnpm test:e2e` includes the gate through the dedicated project without a CI
  workflow change.
- A newly detected violation must be fixed or the gate stays red; it cannot be
  normalized into a baseline.
- New structural surface types should either fit one of the representative
  scans or deliberately extend the gate.
- The loading-state scan covers the component's rendered accessibility contract,
  not router integration. End-to-end loading navigation remains a future
  requirement if the application introduces a route that can suspend.
