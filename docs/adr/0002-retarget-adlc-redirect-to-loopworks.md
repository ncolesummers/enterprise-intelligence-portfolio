# ADR 0002: Retarget the Retired ADLC Redirect to Loopworks

- **Status:** Accepted
- **Date:** 2026-07-30
- **Decision owner:** @ncolesummers
- **Supersedes:** [ADR 0001](0001-phase-3-propagation-boundaries.md), decision 4 only

## Context

ADR 0001 decision 4 permanently redirected `/projects/agent-development-lifecycle` to `/`. That choice was correct when it was made, and it was explicit about why: "no replacement route is in scope, while `/` is the approved durable fallback and current Loopworks surface for indexed traffic." The alternatives section rejected "redirect ADLC to a newly created Loopworks route" on the same ground — the route did not exist.

It exists now. Phase 4a built `/projects/loopworks`, and PRODUCT.md has Loopworks leading the work section carrying the retired ADLC substance as lineage. The case study has a section titled "Lineage" that names the ADLC repository and states what Loopworks inherited from it.

So the condition ADR 0001 attached to its own choice has been satisfied. The redirect still points at the homepage, which is now a worse destination than an available one-to-one successor.

`docs/REDESIGN_PLAN.md` deliberately left this out of Phase 4a: retargeting changes an accepted decision, so it wants a superseding record rather than a quiet edit to `next.config.ts`.

## Decision

Retarget the permanent redirect:

```
/projects/agent-development-lifecycle  ->  /projects/loopworks
```

It stays a 308. The route stays out of the sitemap. `tests/e2e/adlc-redirect.spec.ts` is updated to pin the new destination, and it continues to assert that the retired ADLC heading does not appear at the destination — Loopworks is the successor, not the ADLC case study restored under a new URL.

## Alternatives Considered

- **Leave it pointing at `/`.** Rejected. It sends a visitor who asked a specific question to a page that answers a general one. The homepage does carry FIG. 1, but the reader who followed an ADLC link wants the system's substance, and that is now a page rather than a figure.
- **Return 410 Gone.** Rejected. The substance was not withdrawn, it was folded into a successor. 410 tells a crawler to drop the URL and discards whatever authority it carries, which is the wrong signal when a one-to-one successor exists.
- **Amend ADR 0001 in place.** Rejected. ADR 0001 is Accepted and its reasoning is sound on the facts it had; rewriting it would erase the record of a decision that was right at the time and destroy the trail explaining why the destination changed.
- **Redirect to the Loopworks lineage section anchor.** Rejected. A fragment would open the successor part-way down, past the drawing and the argument, which inverts the page's own structure. The lineage section is reachable by reading.

## Consequences

- Indexed and linked ADLC traffic lands on the successor rather than the homepage, and the ADLC substance it was looking for is on that page as lineage.
- ADR 0001 remains the record for Phase 3's other seven boundaries; only decision 4 is superseded. A reader of ADR 0001 must follow the supersession note to know the current destination.
- The redirect now depends on `/projects/loopworks` existing. Removing or renaming that route breaks it into a redirect chain or a 404, so the route is load-bearing beyond its own navigation.
- Search engines will process a changed 308 target. The previous target was live only on this unmerged branch, so no externally visible destination is being changed twice.
