import { ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  CaseStudyHeader,
  CaseStudySection,
  EvidenceItem,
  EvidenceList,
  EvidencePanel,
  LiteralCode,
} from "@/components/case-study";
import DeliveryLoopDeconstruction from "@/components/figures/delivery-loop-deconstruction";
import DeliveryLoopDetailInline from "@/components/figures/delivery-loop-detail-inline";
import type { DetailViewKey } from "@/components/figures/delivery-loop-detail";
import DeliveryLoopFigure from "@/components/figures/delivery-loop-figure";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";

/**
 * FIG. 1, at length.
 *
 * Every claim on this page traces to `docs/design/loopworks-parts.md`, which
 * was read out of a local checkout of the Loopworks source at commit 9727357
 * rather than from its README. Nothing here is inferred, and the closing
 * section states what the source does not support so the omissions are visible
 * rather than merely absent.
 *
 * The figure is the same component the index sheet draws. It is the assembled
 * static state that Phase 4's deconstruction will resolve to, so it has to be
 * complete and good on its own here first.
 */

export const metadata = generatePageMetadata({
  title: "Loopworks",
  description:
    "An agentic software factory that carries a labeled GitHub issue through eight declared stages to a draft pull request, with two approval gates a maintainer cannot bypass.",
  path: "/projects/loopworks",
});

const REPOSITORY = "https://github.com/ncolesummers/loopworks";
const ADLC_REPOSITORY =
  "https://github.com/ncolesummers/enterprise-agent-development-lifecycle";

/**
 * Names a section's detail view once, for both of the places that need it: the
 * attribute the pinned band observes at `lg` and wider, and the plate the
 * section draws for itself below that. Two spellings of the same key is exactly
 * the drift the `detailView` attribute was introduced to avoid.
 */
const detail = (view: DetailViewKey) => ({
  detailView: view,
  detailFigure: <DeliveryLoopDetailInline view={view} />,
});

type Stage = {
  ordinal: number;
  key: string;
  actor: string;
  kind: string;
  artifacts: string;
};

/** Verbatim from `developmentLoopStages`, declared `as const` in source. */
const developmentLoopStages: readonly Stage[] = [
  {
    ordinal: 1,
    key: "planning",
    actor: "planning-agent",
    kind: "Agent",
    artifacts: "Plan artifact",
  },
  {
    ordinal: 2,
    key: "test-writing",
    actor: "test-writer",
    kind: "Agent",
    artifacts: "Red test evidence, automated test plan",
  },
  {
    ordinal: 3,
    key: "development",
    actor: "implementer",
    kind: "Agent",
    artifacts: "Patch artifact",
  },
  {
    ordinal: 4,
    key: "validation",
    actor: "ci-runner",
    kind: "CI",
    artifacts: "Validation report, validation screenshots",
  },
  {
    ordinal: 5,
    key: "code-review",
    actor: "validation-reviewer",
    kind: "Agent",
    artifacts: "Code review notes",
  },
  {
    ordinal: 6,
    key: "commit",
    actor: "maintainer",
    kind: "Human",
    artifacts: "Commit intent",
  },
  {
    ordinal: 7,
    key: "pr",
    actor: "pr-preparer",
    kind: "Agent",
    artifacts: "PR intent",
  },
  {
    ordinal: 8,
    key: "done",
    actor: "loopworks",
    kind: "System",
    artifacts: "Completion summary",
  },
];

/** The tables in the schema that carry loop state, named as they are declared. */
const loopStateTables = [
  "repositories",
  "vercelProjects",
  "loops",
  "loopRuns",
  "runSteps",
  "artifacts",
  "loopEvents",
  "idempotencyLocks",
  "webhookDeliveries",
  "observabilityEvents",
  "approvals",
  "approvalTransitionEvents",
  "deployments",
  "agentPlans",
];

export default function LoopworksPage() {
  return (
    <main id="main-content" className="sheet">
      <CaseStudyHeader
        figure={1}
        title="Loopworks"
        summary="An agentic software factory. A labeled GitHub issue enters through a signed webhook and leaves as a draft pull request, having passed eight declared stages and two approval gates that no one may bypass."
      >
        <Button variant="outline" asChild>
          <Link href={REPOSITORY} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Read the repository
          </Link>
        </Button>
      </CaseStudyHeader>

      {/* The drawing sits above the prose deliberately. A visitor who reads
          only the figure and its numeral table has still had the argument. */}
      <div className="mb-16">
        <DeliveryLoopFigure />
      </div>

      <CaseStudySection title="Introduction">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              Loopworks runs software delivery as a set of declared loops. A
              GitHub issue labeled <LiteralCode>agent-ready</LiteralCode> is the
              trigger, and GitHub stays the source of truth for intent, so the
              platform never becomes a second backlog to keep in sync.
            </p>
            <p>
              The loop it runs is not a metaphor for a pipeline. Stages are
              declared in source as a stable sequence, each stage names the
              actor that performs it and the artifacts it must produce, and the
              run advances only when those artifacts exist.
            </p>
            <p>
              The system is public and the drawing above is checkable against
              it. Every part carrying a numeral was read out of the source at
              commit <LiteralCode>9727357</LiteralCode>, working from a local
              checkout rather than the README.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Stack</h3>
            <EvidenceList>
              <EvidenceItem>Next.js App Router on Bun</EvidenceItem>
              <EvidenceItem>Postgres with Drizzle</EvidenceItem>
              <EvidenceItem>Auth.js with GitHub SSO</EvidenceItem>
              <EvidenceItem>shadcn/ui</EvidenceItem>
              <EvidenceItem>Vitest, Playwright, and Storybook</EvidenceItem>
              <EvidenceItem>Pino for structured logging</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      {/* The six sections that name parts. At `lg` and wider a pinned plate
          rides them, and which detail it shows is decided by which section the
          reader has reached. Below that the plate is not affordable pinned, so
          each section draws its own instead. Either way the mapping is declared
          once, on the section. */}
      <DeliveryLoopDeconstruction>
        <CaseStudySection title="Admission" {...detail("admission")}>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                Nothing reaches a loop before it has been admitted. A GitHub App
                webhook delivers the event, and the route rejects the delivery
                outright unless its{" "}
                <LiteralCode>x-hub-signature-256</LiteralCode> HMAC signature
                verifies.
              </p>
              <p>
                Past the signature, admission is about never doing the same work
                twice. The delivery id is claimed as an idempotency lock, and
                then the run takes a lease. The concurrency group is scoped per
                repository and per loop with{" "}
                <LiteralCode>maxInFlight</LiteralCode> set to 1, so a redelivery
                cannot start a second run alongside the first.
              </p>
              <p>
                Admission is not a silent filter. It ends in one of three
                recorded outcomes, and a run that was refused is as visible as
                one that was accepted.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">The admission chain</h3>
              <EvidenceList>
                <EvidenceItem>
                  <strong className="text-line">Trigger:</strong> the{" "}
                  <LiteralCode>agent-ready</LiteralCode> label. An issue
                  carrying <LiteralCode>status:blocked</LiteralCode> does not
                  start a run.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">Signature:</strong> HMAC
                  verification, before anything is read.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">Idempotency:</strong> a claim on
                  the delivery id.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">Lease:</strong> one run in
                  flight per repository.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">Outcome:</strong> dispatched,
                  deferred, or lease contention.
                </EvidenceItem>
              </EvidenceList>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection title="The Development Loop" {...detail("stages")}>
          <p className="type-body text-line-soft measure mb-8">
            Eight stages, declared as a constant rather than assembled at
            runtime. Each names its actor and the artifacts that have to exist
            before the run moves on.
          </p>

          <EvidencePanel>
            <ol className="type-body text-line-soft divide-y divide-rule-leader">
              {developmentLoopStages.map(stage => (
                <li
                  key={stage.key}
                  className="grid grid-cols-[2rem_1fr] gap-x-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[2rem_1fr_1fr] sm:items-baseline"
                >
                  <span className="type-label" aria-hidden="true">
                    {stage.ordinal}
                  </span>
                  <div className="min-w-0">
                    <LiteralCode>{stage.key}</LiteralCode>
                    <p className="type-label text-line-soft mt-1">
                      {stage.actor}, {stage.kind}
                    </p>
                  </div>
                  <p className="col-start-2 mt-2 text-[0.9375rem] sm:col-start-3 sm:mt-0">
                    {stage.artifacts}
                  </p>
                </li>
              ))}
            </ol>
          </EvidencePanel>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <EvidencePanel>
              <h3 className="type-title mb-4">
                Tests come first, and fail first
              </h3>
              <p className="type-body text-line-soft">
                Test writing runs <LiteralCode>bun run test</LiteralCode> and is
                expected to be red. The stage advances only when every
                acceptance criterion has expected assertion-failure evidence
                behind it. A crash does not qualify, and neither does a test
                that passes.
              </p>
            </EvidencePanel>
            <EvidencePanel>
              <h3 className="type-title mb-4">
                Acceptance criteria become gates
              </h3>
              <p className="type-body text-line-soft">
                The planning agent maps the acceptance criteria it writes onto
                validation gates, and validation runs{" "}
                <LiteralCode>bun run validate</LiteralCode>. Both commands are
                real gates in the loop manifest, not descriptions of one.
              </p>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection
          title="Where Judgment Stays Human"
          {...detail("gates")}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                Two approval gates interrupt the flow. Both are required, both
                list the maintainer as reviewer, and both declare a bypass
                policy of <LiteralCode>none</LiteralCode>. There is no
                configuration that turns them off and no urgent path around
                them.
              </p>
              <p>
                This is the part of the system I would defend first. Agents
                remove toil, and a human keeps authority over judgment. The
                gates are where that stops being a claim about how I like to
                design things and becomes a property of the running system.
              </p>
              <p>
                They are drawn in the figure as valve symbols interrupting the
                flow, because that is what they are: the flow does not continue
                until someone opens them.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">The two gates</h3>
              <EvidenceList>
                <EvidenceItem>
                  <strong className="text-line">
                    <LiteralCode>plan-review</LiteralCode>
                  </strong>{" "}
                  sits before test writing and requires the plan. No code is
                  written against an unapproved plan.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">
                    <LiteralCode>external-write-review</LiteralCode>
                  </strong>{" "}
                  sits before the only write to GitHub and requires a diff
                  summary and a validation report.
                </EvidenceItem>
              </EvidenceList>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection title="Why It Is a Loop" {...detail("return")}>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                Code review emits a recommendation, and only the root
                orchestrator applies it. A subagent can say what it thinks
                should happen; it cannot make it happen.
              </p>
              <p>
                A cycle reuses the existing rows, increments attempts, and
                resets the artifacts it invalidated. The approved plan is
                retained across the cycle, so going back to development is not
                going back to the beginning.
              </p>
              <p>
                That retention is the whole difference between a loop and a
                pipeline, and it is why the figure carries a return path rather
                than a single arrow from left to right.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">
                Three routes out of code review
              </h3>
              <EvidenceList>
                <EvidenceItem>
                  <strong className="text-line">Advance to commit.</strong>{" "}
                  Invalid while blocker or high findings exist.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">Requeue development.</strong>{" "}
                  Development, validation, and code review run again.
                </EvidenceItem>
                <EvidenceItem>
                  <strong className="text-line">Requeue test writing.</strong>{" "}
                  The tests themselves were wrong, so they are rewritten first.
                </EvidenceItem>
              </EvidenceList>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection
          title="Isolation and the Guarded Write"
          {...detail("write")}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                Each subagent declares its own sandbox. The implementer works in
                a checkout pinned to a commit, with a{" "}
                <LiteralCode>deny-all</LiteralCode> network policy on every
                backend, reusing the exact test patch it was handed.
              </p>
              <p>
                Subagents own no GitHub writes and no workflow transitions. A
                subagent returns a typed result, the root validates it, and the
                root invokes the transition. Five subagents are present in
                source: planner, test writer, implementer, validation reviewer,
                and PR preparer.
              </p>
              <p>
                In live mode there is exactly one write to GitHub, and it is
                guarded. It requires a single approved{" "}
                <LiteralCode>external-write-review</LiteralCode> whose change
                digest matches the bytes of the commit being pushed, so an
                approval cannot be reused for different content.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">What the write produces</h3>
              <EvidenceList>
                <EvidenceItem>
                  A deterministic branch named{" "}
                  <LiteralCode>{"loopworks/run-{runId}"}</LiteralCode>
                </EvidenceItem>
                <EvidenceItem>A marked commit carrying trailers</EvidenceItem>
                <EvidenceItem>
                  A pull request opened as a draft, never merged by the system
                </EvidenceItem>
              </EvidenceList>
              <p className="type-body text-line-soft mt-6">
                GitHub writes happen outside the database transaction, because
                they cannot be rolled back with it. The branch name and the
                commit trailers are the reconciliation key when the two
                disagree.
              </p>
            </EvidencePanel>
          </div>
        </CaseStudySection>

        <CaseStudySection title="The Control Plane" {...detail("control")}>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="type-body text-line-soft measure space-y-4">
              <p>
                Every stage writes to durable storage. Eighteen tables hold the
                system&apos;s state, and the run is reconstructable from them
                rather than from logs.
              </p>
              <p>
                Seven portal routes read that state: overview, catalog, loops,
                runs, approvals, deployments, and settings. Vercel is the
                visibility surface for previews, deployments, and build status,
                so the places a reviewer already looks are the places the loop
                reports into.
              </p>
              <p>
                A second loop is declared for research, with four stages of its
                own, requiring both a <LiteralCode>spike</LiteralCode> and an{" "}
                <LiteralCode>agent-ready</LiteralCode> label, running on a
                separate concurrency group with GitHub writeback disabled. It is
                not drawn in FIG. 1: showing a parallel skeleton would double
                the figure&apos;s width and halve its legibility.
              </p>
            </div>
            <EvidencePanel>
              <h3 className="type-title mb-4">Tables carrying loop state</h3>
              <ul className="flex flex-wrap gap-2">
                {loopStateTables.map(table => (
                  <li key={table} className="rule-leader px-2 py-1">
                    <LiteralCode>{table}</LiteralCode>
                  </li>
                ))}
              </ul>
            </EvidencePanel>
          </div>
        </CaseStudySection>
      </DeliveryLoopDeconstruction>

      <CaseStudySection title="Lineage">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              Loopworks did not appear from nowhere. It followed the Enterprise
              Agent Development Lifecycle, a published reference architecture I
              built on Anthropic&apos;s Claude Agent SDK, synthesizing five
              Anthropic research documents.
            </p>
            <p>
              That work asked what a full delivery lifecycle looks like when
              agents do the work and humans keep the judgment. Loopworks is the
              same question answered as a running system, where the stages are
              declared in source, the gates are enforced, and the state is
              durable.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">The reference architecture</h3>
            <p className="type-body text-line-soft mb-6">
              The architecture and the research behind it are public and
              readable on their own. It is the document the platform argues
              with.
            </p>
            <Button variant="outline" asChild>
              <Link
                href={ADLC_REPOSITORY}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Read the architecture
              </Link>
            </Button>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="What Is Not Claimed">
        <EvidencePanel>
          <p className="type-body text-line-soft measure mb-4">
            No throughput, latency, success-rate, or cost figures appear on this
            page, because none are published. The run budget ceilings in the
            manifest are limits the system enforces, not measurements of how it
            performs, and reading them as performance would be wrong.
          </p>
          <p className="type-body text-line-soft measure mb-4">
            The research loop&apos;s fan-out is not built yet. Vercel Workflows,
            Vercel Connect, and AI Gateway are named as expansion points in the
            architecture document and are not wired, so nothing here shows them
            as present.
          </p>
          <p className="type-body text-line-soft measure">
            Everything else on this page can be checked against the repository,
            which is the only reason it is here.
          </p>
        </EvidencePanel>
      </CaseStudySection>
    </main>
  );
}
