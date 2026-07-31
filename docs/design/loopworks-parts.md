# FIG. 1 parts inventory — Loopworks

Captured 2026-07-28 from `ncolesummers/loopworks` at commit `9727357`, working
from a local checkout rather than the README. Every part below was read out of
source or the checked-in architecture docs. **Nothing here is inferred.**

This file exists so the drawing has an evidence base: a numeral may only be
placed on a part that appears in this table, with the file that proves it.

## Entry and admission

| Part                    | Evidence                                                                     |
| ----------------------- | ---------------------------------------------------------------------------- |
| GitHub Issue, `agent-ready` label | `src/lib/loops/manifest.ts` — `triggers.issueLabels: ["agent-ready"]`, `blockedLabels: ["status:blocked"]` |
| GitHub App webhook      | `src/app/api/github/webhooks/route.ts`                                       |
| HMAC signature verify   | same route — `x-hub-signature-256`, `verifyGithubWebhookSignature`            |
| Idempotency claim by delivery id | same route — `idempotencyKey: claim.key`; table `idempotencyLocks`   |
| Concurrency guard + run lease | `concurrency.group: "repo:{repo}:loop:development"`, `maxInFlight: 1`   |
| Admission outcome       | `dispatched` \| `deferred` \| `lease_contention` (route + `docs/loop-manifest.md`) |

## Development loop stages

Verbatim from `developmentLoopStages` in `src/lib/loops/development-run.ts:80`.
The sequence is declared `as const` and is stable.

| # | Stage key      | Actor                 | Type   | Required artifact(s)                          |
| - | -------------- | --------------------- | ------ | --------------------------------------------- |
| 1 | `planning`     | `planning-agent`      | agent  | Plan artifact                                 |
| 2 | `test-writing` | `test-writer`         | agent  | Red test evidence, Automated test plan        |
| 3 | `development`  | `implementer`         | agent  | Patch artifact                                |
| 4 | `validation`   | `ci-runner`           | ci     | Validation report, Validation screenshots     |
| 5 | `code-review`  | `validation-reviewer` | agent  | Code review notes                             |
| 6 | `commit`       | `maintainer`          | human  | Commit intent                                 |
| 7 | `pr`           | `pr-preparer`         | agent  | PR intent                                     |
| 8 | `done`         | `loopworks`           | system | Completion summary                            |

Validation runs `bun run validate`; test-writing runs `bun run test` and is
expected to be **red**. Both commands are real manifest `validationGates`.

## Approval gates

Two, from `approvals.gates` in the manifest. Both `required: true`, reviewers
`["maintainer"]`, `bypassPolicy: "none"`.

| Gate                    | Sits before      | Evidence required               |
| ----------------------- | ---------------- | ------------------------------- |
| `plan-review`           | test-writing     | `plan`                          |
| `external-write-review` | the GitHub write | `diff_summary`, `validation_report` |

## Backward routes

`code-review` emits a recommendation, and **only the root applies it**
(`docs/loop-manifest.md`, "Screenshot Evidence And Validation Review"):

- `commit` — advance. Invalid when blocker or high findings exist.
- `development` — requeue development, validation, code review.
- `test-writing` — additionally requeue test writing.

Cycles reuse existing rows, increment attempts, reset invalidated artifacts,
and **retain the approved plan**. This is what makes it a loop and not a
pipeline; the figure must show it.

## Isolation

Each subagent declares its own sandbox. The implementer's
(`agent/subagents/implementer/sandbox.ts`) is a commit-pinned checkout with
`networkPolicy: "deny-all"` on every backend. Subagents do not own GitHub
writes or workflow transitions — the root orchestrator validates the typed
result and invokes the transition.

Subagents present in source: `planner`, `test-writer`, `implementer`,
`validation-reviewer`, `pr-preparer`.

## Control plane

18 durable tables in `src/db/schema.ts`. The ones that carry loop state:
`repositories`, `vercelProjects`, `loops`, `loopRuns`, `runSteps`, `artifacts`,
`loopEvents`, `idempotencyLocks`, `webhookDeliveries`, `observabilityEvents`,
`approvals`, `approvalTransitionEvents`, `deployments`, `agentPlans`.

## Guarded GitHub write

Live mode creates a deterministic `loopworks/run-{runId}` branch, a marked
commit, and a **draft** PR. Requires exactly one `approved`
`external-write-review` whose `prChangeDigest` matches the commit bytes.
GitHub writes happen outside the database transaction; the branch and commit
trailers are the reconciliation key.

## Research loop

Second enabled loop, four stages, from `src/lib/loops/research-run.ts`:
`planning` (`research-planner`) → `researching` (`researcher`) → `authoring`
(`research-author`) → `done` (`loopworks`). Requires **both** `spike` and
`agent-ready`. Separate concurrency group. GitHub writeback disabled.

Not drawn in FIG. 1 — it would double the figure's width to show a parallel
skeleton. Available if a detail figure is ever wanted.

## Portal surfaces

Seven routes under `src/app/(portal)/`: overview, `catalog`, `loops`, `runs`,
`approvals`, `deployments`, `settings`.

## Deliberately not drawn

Claims the source does not support, listed so they stay out:

- No throughput, latency, success-rate, or cost figures. The budget ceilings
  (`maxRunMinutes: 90`, `maxModelUsd: 25`) are **limits, not measurements**,
  and must never be shown as performance.
- The research loop's fan-out does not run yet — issue #43 creates placeholders
  only; #44–#46 are open. Do not draw live research execution.
- Vercel Workflows, Connect, and AI Gateway are named as *expansion points* in
  the architecture doc, not wired. Do not draw them as present.
