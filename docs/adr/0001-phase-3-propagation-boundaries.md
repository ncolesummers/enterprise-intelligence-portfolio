# ADR 0001: Constrain Phase 3 to Evidence-First Propagation

- **Status:** Accepted
- **Date:** 2026-07-28
- **Decision owner:** @ncolesummers

## Context

Phases 1 and 2 established the figure-sheet visual system and homepage pattern. Phase 3 propagates that approved system to the remaining index plates and case studies, removes the unused contact form, retires the standalone ADLC case study safely, self-hosts the fonts, and repairs the Playwright suite.

The governing sources separate product truth, design authority, and migration scope:

- [PRODUCT.md](../../PRODUCT.md) requires verifiable evidence, retires the standalone ADLC case study, and sets a strict employer boundary for University of Idaho work.
- [DESIGN.md](../../DESIGN.md) binds the implementation to the established figure-sheet rules, typography, palette, line hierarchy, and prohibitions.
- [REDESIGN_PLAN.md](../REDESIGN_PLAN.md) defines Phase 3 as mechanical propagation and explicitly withholds new choices about type, color, spacing, composition, and drawing subjects from Codex.

Several open choices had to be settled before implementation so independent agents would not make inconsistent product or design decisions.

## Decision

Phase 3 will follow these boundaries:

1. Restyle the four surviving existing case studies: University of Idaho website, MyUI, profile extractor, and Mikrotik configuration generator. The standalone ADLC case study retires; a new Loopworks case-study route is not part of this phase.
2. Edit case-study copy by evidence-first deduplication: remove repetition and generic framework exposition, while preserving substantiated roles, architecture, outcomes, code or visual evidence, and proof links. Do not add or strengthen claims.
3. Preserve each case study's incumbent composition and spacing. Phase 3 may translate existing surfaces onto the approved figure-sheet primitives, but it will not establish a new spacing scale or redesign page composition.
4. Permanently redirect `/projects/agent-development-lifecycle` to `/`, because the retired route may already be indexed or linked. Remove it from the sitemap and do not leave it as a 404.
5. Self-host Saira and Monaspace using English/Latin subsets. Preserve Saira's required variable axes and Monaspace's code ligatures and contextual alternates.
6. Defer generating `.impeccable/design.json`. Phase 3 may run the scheduled Impeccable context and audit commands, but sidecar generation and design-system polish remain outside this migration slice.
7. Do not interleave a broad dependency update or package-manager policy change with the migration. Remove only dependencies made unused by an in-scope deletion.
8. Do not add site-wide OpenTelemetry or another runtime/telemetry service. This static visual propagation introduces no new service boundary to instrument; observability expansion would be unrelated architecture work.

## Alternatives Considered

- **Restyle all five legacy routes or add Loopworks now.** Rejected because PRODUCT retires ADLC, while the Loopworks deconstruction belongs to a later phase.
- **Rewrite case studies freely during the visual migration.** Rejected because it raises evidence and employer-boundary risk and would mix editorial judgment with mechanical propagation.
- **Create new compositions or normalize spacing now.** Rejected because composition remains a decision for the design owner in a future phase, while the spacing rhythm is explicitly deferred to Phase 5.
- **Redirect ADLC to a newly created Loopworks route or return 404.** Rejected because no replacement route is in scope, while `/` is the approved durable fallback and current Loopworks surface for indexed traffic.
- **Ship full font files or broader language subsets.** Rejected in favor of the approved English/Latin scope and a smaller local payload, provided axes, glyph coverage, and OpenType features are verified.
- **Generate the Impeccable sidecar, update dependencies, or add OTel while touching adjacent files.** Rejected because each expands scope and makes migration regressions harder to isolate.

## Consequences

- Independent implementation agents have a common boundary and must escalate any missing product or design choice instead of resolving it locally.
- The four surviving routes keep their information architecture and spacing even where a broader redesign might improve them; composition remains available to the design owner in a future phase, while Phase 5 owns spacing and finish.
- The ADLC URL remains durable, but its destination is the homepage rather than a one-to-one replacement case study.
- Font work must include deterministic checks for glyph coverage, variable axes, `liga`, and `calt`; a successful build alone is insufficient.
- Dependency cleanup is limited to packages made obsolete by Phase 3, and telemetry behavior remains unchanged.
- Adversarial review must reject unsupported claims, employer-boundary leakage, design-rule drift, and tests weakened to fit the implementation.
