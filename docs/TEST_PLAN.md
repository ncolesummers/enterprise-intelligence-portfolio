# Test Plan

## Overview

Playwright provides the portfolio's end-to-end coverage. The suite exercises
the public UI without calling third-party application APIs. Product claims,
navigation destinations, accessibility behavior, and responsive presentation
are the contracts under test.

## End-to-End Coverage

Playwright runs functional suites against five configurations:

- Chromium, Firefox, and WebKit desktop browsers.
- Mobile Chrome and Mobile Safari device profiles.

A sixth, focused `axe-chromium` project runs only the automated WCAG gate on
desktop Chromium. The other five projects exclude that spec, so each
representative state is scanned once in PAPER and once in BLUEPRINT instead of
being multiplied across the browser and viewport matrix.

Current suites cover:

- Primary navigation, direct contact, and project destinations.
- Social-link names, destinations, and keyboard behavior.
- Figure-index content and the evidence stated by each completed plate.
- Both drawing media and responsive behavior where the surface varies by
  viewport.
- Scroll-driven figures: which parts a scroll position exposes, which shown part
  pointing reads, and that neither input does the other's job.
- Zero-tolerance axe scans for WCAG 2.1 A/AA across the complete homepage, the
  scoped MyUI FIG. 3 cell, the Loopworks case study, the not-found sheet, and the
  exported root loading boundary component in the live application chrome.
  These supplement rather than replace the semantic, keyboard, reduced-motion,
  and computed-contrast contracts above. Current routes are all statically
  prerendered and do not suspend, so the loading scan validates the exact
  component output without claiming router-integration coverage.

Two hazards are worth knowing before adding to the scroll-driven suites, because
both produce failures that look like product bugs and are not:

- **The sheet scrolls smoothly.** Playwright brings a target into view before
  acting on it, so an action can leave a scroll animation running. A later instant
  jump does not cancel it — the animation carries on to its own target and the
  jump is lost. Wait for the scroll to settle before jumping, and drive pointer
  assertions with `page.mouse` at explicit coordinates when the assertion is about
  the page not moving.
- **A pointer left resting on a plate keeps reading.** After a scroll changes which
  view is drawn, whatever part is now under the cursor is being pointed at, which
  is correct behavior. Move the pointer off the plate before asserting what
  survived the scroll.

A third hazard applies to any spec that reads a computed colour:

- **A computed colour can be read before it resolves.** `locator.evaluate`
  snapshots whatever is there when it runs. Two transients produce a colour that
  cannot be parsed: an unapplied stylesheet makes `background-color: var(--ground)`
  invalid at computed-value time, so it falls back to `transparent` and serializes
  as `rgba(0, 0, 0, 0)`; and an element detached between the locator resolving and
  the evaluate running answers with an empty string in every engine. Under
  parallel load Firefox is the one that loses these races, which is what the
  intermittent contrast failure was. Read colours with `readComputedColor` from
  `tests/fixtures/contrast.ts`, which polls until the value has resolved. Do not
  widen the parser to accept them — a transparent background is not a valid
  contrast operand, and parsing one turns a loud throw into a silently wrong
  ratio.

Two more, both found in Phase 5 when a layout change shifted timings enough to
expose races that had been latent:

- **A resolved colour can still be the wrong one.** `readComputedColor` polls
  until a colour parses, which catches the transients above but not staleness:
  after the medium switch lands on `html`, a read can sample the ground before
  the repaint and the foreground after it, pairing blueprint chalk against a
  paper ground at 1.1:1. A stale colour is fully resolved, so no amount of
  polling for resolution finds it. Read a ground and the foregrounds measured
  against it in **one** `evaluate`, wrapped in `readResolved`, so the set comes
  from a single style recalculation.
- **An unshown detail view takes no pointer events.** That is deliberate — see
  `.fig-detail-view:not([data-shown]) *` — but it means a click issued before
  the scroll has switched views lands on nothing and leaves the previous
  section's reading standing, which is indistinguishable from the staleness bug
  such a test is usually written to catch. Wait for `data-shown="true"` on the
  view before acting on anything inside it.

A sixth hazard was reproduced during the issue #48 concurrency audit:

- **A resolved set can still be transient.** Firefox exposed transient,
  fully resolved colour sets when the suite ran in parallel. The social-link
  contrast test failed in 6 of 20 four-worker repetitions, with ratios between
  1.17:1 and 2.75:1; MyUI independently produced a 2.20:1 mixed-medium sample.
  Read every compared colour in one `evaluate`, then use `readSettled` when the
  read follows a medium switch and the set itself should remain unchanged. The
  helper requires two consecutive resolved sets to agree. Keep `readResolved`
  for reads that deliberately change state, such as focus and blur probes.

## Concurrency Policy

The suite runs with two workers locally and in CI. The earlier CI-only
one-worker setting came from the initial Playwright scaffold; repository history
does not contain a demonstrated concurrency failure that caused it.

Issue #48 qualified two workers with retries disabled: one one-worker control
passed in 5.8 minutes, the first two-worker run reproduced the Firefox contrast
race, and the repaired suite then passed three consecutive full two-worker runs
in 3.1 minutes each. A full four-worker stress run passed in 2.4 minutes, plus
focused Firefox stress runs for contrast, themes, and scroll-driven figures.
These are local measurements on 2026-08-01, not CI performance budgets.

Use retries only for the configured CI diagnostic behavior, never to qualify a
worker-count change. Reproduce a suspected race with a fresh server,
`--retries=0`, and the same worker count before changing synchronization or
lowering concurrency. See ADR 0003.

The suite must prefer role- and name-based locators over styling or DOM-shape
selectors. Removing a product behavior may remove its test, but surviving
behavior needs an equally specific assertion; a looser assertion is not a
repair.

## Commands

```bash
# Full cross-browser suite
pnpm test:e2e

# One suite or one browser while iterating
pnpm exec playwright test tests/e2e/contact-link.spec.ts
pnpm exec playwright test tests/e2e/contact-link.spec.ts --project=chromium

# Focused automated WCAG 2.1 A/AA gate
pnpm exec playwright test tests/e2e/axe-accessibility.spec.ts --project=axe-chromium --retries=0

# Concurrency diagnosis; repeat from a fresh server and keep retries disabled
CI=true pnpm exec playwright test --workers=2 --retries=0
CI=true pnpm exec playwright test --workers=4 --retries=0

# Interactive debugging
pnpm test:e2e:ui
pnpm test:e2e:headed
pnpm test:e2e:debug
```

## Required Acceptance Checks

Every changed surface must demonstrate:

- A focused failing assertion before production code changes and a focused
  passing assertion afterward.
- Correct behavior in PAPER and BLUEPRINT.
- Mobile, tablet, and desktop presentation without horizontal overflow.
- Keyboard reachability, meaningful accessible names, sane focus order, and
  screen-reader-visible content.
- A complete static state when `prefers-reduced-motion: reduce` is active.
- No browser console errors.

Before completion, run `pnpm format`, `pnpm lint`, `pnpm build`, the relevant
focused Playwright suites, and the full cross-browser suite. Investigate retries
and traces rather than accepting a flaky pass.

## CI

Pull requests and protected-branch pushes install dependencies, lint, check
formatting, build, install Playwright browsers, and run the full E2E suite with
two workers.
Failed runs upload Playwright artifacts for diagnosis. The site has no contact
form integration, scheduled email-delivery test, or third-party form endpoint.

## Planned Improvements

- Automated visual regression coverage.
- Lighthouse CI for performance budgets.
