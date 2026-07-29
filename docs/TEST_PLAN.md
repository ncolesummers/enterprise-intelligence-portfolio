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
