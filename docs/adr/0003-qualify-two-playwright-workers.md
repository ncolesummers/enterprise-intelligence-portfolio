# ADR 0003: Qualify two Playwright workers in CI

- **Status:** Accepted
- **Date:** 2026-08-01

## Context

Playwright was configured with one worker on CI and two locally. The one-worker
CI setting existed in the initial test scaffold; history does not show that it
was introduced in response to a measured concurrency failure. With 440 tests
across five browser projects, the setting serialized work without an evidence
record for the trade-off.

A retry-free audit did expose real Firefox timing races above one worker. The
social-link contrast test returned mixed-medium ratios as low as 1.17:1, and the
MyUI case study independently returned 2.20:1. Both read fully resolved computed
styles while a medium switch was still settling. The MyUI test also sampled the
ground and foreground in separate browser evaluations.

## Decision

Run Playwright with two workers locally and in CI.

Compared colour sets must be read in one browser evaluation. Stable sets sampled
immediately after a medium switch use the shared `readSettled` helper, which
requires two consecutive resolved reads to agree. Reads that intentionally
change state continue to use `readResolved` and do not claim cross-poll
stability.

Worker-count changes are qualified with retries disabled. The acceptance record
for this decision is:

- one full one-worker control: 438 passed, 2 skipped, 5.8 minutes;
- the original two-worker red: 437 passed, 1 failed, 2 skipped;
- social-link Firefox stress before repair: 6 failed of 20;
- three consecutive repaired two-worker runs: 438 passed and 2 skipped in 3.1
  minutes each;
- one repaired full four-worker stress run: 438 passed and 2 skipped in 2.4
  minutes;
- repaired focused stress: social contrast 20/20, MyUI themes 60/60, broader
  Firefox themes 75/75, and Loopworks scroll behavior 50/50.

All measurements were local on 2026-08-01 against fresh Turbopack development
servers. They qualify test isolation and the two-worker setting; they are not a
production performance budget.

## Consequences

- CI gains bounded parallelism without treating a retry-assisted pass as proof.
- A future concurrency failure is investigated at the failing worker count with
  retries disabled; lowering workers is an explicit policy rollback, not a
  silent flake fix.
- CI retries, the development-versus-production server choice, browser install
  scope, and PR-versus-main project coverage remain separate issue #48 decisions.
