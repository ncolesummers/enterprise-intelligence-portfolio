# ADR 0005: Add Temporary Redirects for the Symposium Slides

- **Status:** Accepted
- **Date:** 2026-11-14
- **Decision owner:** @ncolesummers

## Context

The index sheet gains a talks schedule (issue #54) listing two sessions from the University of Idaho AI Symposium on 29 October 2026. Each row links to its slides. Both decks are published as Claude artifacts, shared publicly with their speaker notes removed.

Linking the artifact URLs directly from the sheet would bake an opaque, third-party address into the page and into every place the link is copied. The decks may move later, for example to a hosted PDF. The site already solves this for the symposium companion material: `/symposium`, `/symposium/delegate`, and `/symposium/evaluate` are temporary redirects in `next.config.ts`.

## Decision

Add two temporary (307) redirects alongside the existing symposium short links:

```
/symposium/evaluate/slides  ->  https://claude.ai/artifact/4KPbXSGoGRzU6gneb8guMm
/symposium/delegate/slides  ->  https://claude.ai/artifact/GTmfzxdw7PemGBBF3B7usF
```

The talks schedule links to these first-party paths, not to the artifacts. The three existing symposium redirects are unchanged. `tests/e2e/symposium-redirects.spec.ts` pins the status and exact `Location` of all five, without following them off-site.

Because each path only redirects to another origin, the schedule links to it with a plain anchor that opens a new tab, as `References` does for off-sheet links, and never with a client-side prefetch.

## Alternatives Considered

- **Link the artifact URLs directly.** Rejected. Moving a deck would then mean editing the sheet and would break every copy of the old link already shared.
- **Permanent (308) redirects.** Rejected. Browsers and crawlers cache a permanent redirect, so a later move of the deck would not reliably reach visitors. The existing symposium links are temporary for the same reason.
- **Fragments on the companion artifact,** as `/symposium/delegate` does. Rejected. The slides are separate artifacts, not sections of the companion.

## Consequences

- A deck can move by changing one destination in `next.config.ts`, with no change to the sheet or to links already shared.
- The talks schedule depends on these two paths existing. Removing either one turns a schedule link into a 404, so the redirects are load-bearing for the index sheet, not only for links shared at the event.
- The destinations are third-party artifacts. If one is unshared or deleted, the redirect still resolves and the visitor lands on an error page. The redirect spec does not detect this, by design: it does not depend on another origin being reachable.
