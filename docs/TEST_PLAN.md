# Test Plan

## Overview

Playwright provides the portfolio's end-to-end coverage. The suite exercises
the public UI without calling third-party application APIs. Product claims,
navigation destinations, accessibility behavior, and responsive presentation
are the contracts under test.

## End-to-End Coverage

Playwright runs against five configurations:

- Chromium, Firefox, and WebKit desktop browsers.
- Mobile Chrome and Mobile Safari device profiles.

Current suites cover:

- Primary navigation, direct contact, and project destinations.
- Social-link names, destinations, and keyboard behavior.
- Figure-index content and the evidence stated by each completed plate.
- Both drawing media and responsive behavior where the surface varies by
  viewport.
- Scroll-driven figures: which parts a scroll position exposes, which shown part
  pointing reads, and that neither input does the other's job.

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
formatting, build, install Playwright browsers, and run the full E2E suite.
Failed runs upload Playwright artifacts for diagnosis. The site has no contact
form integration, scheduled email-delivery test, or third-party form endpoint.

## Planned Improvements

- Automated visual regression coverage.
- Automated WCAG checks with axe-playwright.
- Lighthouse CI for performance budgets.
