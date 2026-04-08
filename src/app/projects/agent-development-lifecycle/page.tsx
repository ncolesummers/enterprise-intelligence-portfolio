import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import ContentCard from "@/components/ui/content-card";
import BulletedList, { ListItem } from "@/components/ui/bulleted-list";
import CodeBlock from "@/components/ui/code-block";
import Section from "@/components/ui/section";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import Footer from "@/components/footer";
import ArchitectureDiagram from "@/assets/adlc-architecture.svg";

export const metadata = generatePageMetadata({
  title: "Enterprise Agent Development Lifecycle",
  description:
    "A TypeScript reference architecture for multi-agent autonomous coding systems built on Anthropic's Claude Agent SDK. GAN-inspired three-agent orchestration with file-based state management and OpenTelemetry observability.",
  path: "/projects/agent-development-lifecycle",
});

export default function AgentDevelopmentLifecyclePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="container flex h-14 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container py-12 px-4">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            Enterprise Agent Development Lifecycle
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
            A TypeScript reference architecture for multi-agent autonomous
            coding systems, synthesizing five Anthropic research documents into
            a production-grade implementation built on the Claude Agent SDK
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/ncolesummers/enterprise-agent-development-lifecycle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View on GitHub
              </Button>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="rounded-md bg-muted px-2 py-1 text-sm">
              TypeScript
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm">Bun</span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm">
              Claude Agent SDK
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm">Zod</span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm">
              OpenTelemetry
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm">
              Commander
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm">Biome</span>
          </div>
        </div>

        {/* Research Foundation */}
        <Section title="Research Foundation">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-muted-foreground">
                Anthropic published a series of research documents on building
                effective harnesses for long-running autonomous coding agents.
                The reference implementations and quickstart examples are
                exclusively Python SDK, leaving the broader Node.js and
                TypeScript ecosystem without a production-grade equivalent.
              </p>
              <p className="mb-4 text-lg text-muted-foreground">
                This project translates those patterns to TypeScript and Bun,
                making the architectural insights accessible to teams already
                operating in the JavaScript ecosystem. The core problem these
                documents address is the <strong>context window gap</strong> —
                even frontier models fail at production-quality builds because
                compaction alone is not sufficient for multi-session work.
              </p>
              <p className="text-lg text-muted-foreground">
                Two critical failure modes emerge in practice:{" "}
                <strong>over-ambition</strong>, where the agent exhausts its
                context window mid-feature and produces incomplete work, and{" "}
                <strong>premature completion</strong>, where the agent declares
                victory despite incomplete requirements. The architecture
                addresses both through structured state management and separated
                evaluation.
              </p>
            </div>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Source Research</h3>
              <BulletedList>
                <ListItem>
                  <strong>
                    &quot;Effective Harnesses for Long-Running Agents&quot;
                  </strong>{" "}
                  (Nov 2025) — Two-agent pattern, feature list as source of
                  truth, progress tracking, boot sequence
                </ListItem>
                <ListItem>
                  <strong>
                    &quot;Harness Design for Long-Running Application
                    Development&quot;
                  </strong>{" "}
                  (Mar 2026) — GAN-inspired three-agent architecture, context
                  anxiety, self-evaluation bias, four grading criteria
                </ListItem>
                <ListItem>
                  <strong>Autonomous Coding Quickstart</strong> (GitHub) —
                  Python reference implementation with session management,
                  security model, and browser automation
                </ListItem>
                <ListItem>
                  <strong>Claude Code Hooks Multi-Agent Observability</strong>{" "}
                  (GitHub) — Hook-to-event mapping, real-time monitoring
                  patterns, security hooks
                </ListItem>
                <ListItem>
                  <strong>Claude Code Native OTel Monitoring</strong> — Built-in
                  telemetry export, available metrics and events, per-session
                  correlation
                </ListItem>
              </BulletedList>
            </ContentCard>
          </div>
        </Section>

        {/* Architecture */}
        <Section title="Architecture">
          <div className="mb-8 overflow-hidden rounded-lg bg-card">
            <div className="relative w-full h-64 md:h-80 lg:h-96 bg-card">
              <Image
                src={ArchitectureDiagram}
                alt="Architecture diagram showing the three-agent orchestration pipeline: Initializer, Generator, and Evaluator"
                className="object-contain"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
            </div>
          </div>

          <ContentCard className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">
              GAN-Inspired Three-Agent Orchestration
            </h3>
            <p className="mb-4 text-muted-foreground">
              The architecture draws from the adversarial dynamic in generative
              adversarial networks: a generator produces work, and an
              independent evaluator judges it. A third agent handles
              initialization, creating the structured inputs that drive the
              entire lifecycle.
            </p>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 font-bold">1.</span>
                <div>
                  <strong>Initializer</strong> — Reads the application
                  specification, generates a comprehensive feature list as JSON
                  (not Markdown — the model is less likely to inappropriately
                  change JSON), scaffolds the project structure, and creates a
                  repeatable bootstrap script.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">2.</span>
                <div>
                  <strong>Generator</strong> — Implements exactly one feature
                  per session following a prescribed boot sequence: verify
                  working directory, read progress, check git log, run init
                  script, confirm baseline, then implement.
                  One-feature-per-session discipline prevents context
                  exhaustion.
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">3.</span>
                <div>
                  <strong>Evaluator</strong> — Tests the running application
                  independently using browser automation. Scores against four
                  criteria: design quality, originality, craft, and
                  functionality. A separated evaluator overcomes self-evaluation
                  bias — tuning a standalone evaluator to be skeptical is far
                  more tractable than making a generator critical of its own
                  work.
                </div>
              </li>
            </ol>
          </ContentCard>

          <div className="grid gap-8 md:grid-cols-2">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">State Machine</h3>
              <CodeBlock title="Orchestration States">
                {`needs_initialization
  → needs_planning
    → needs_generation
      → needs_evaluation
        → complete`}
              </CodeBlock>
              <p className="mt-4 text-muted-foreground">
                The orchestrator uses state detection to determine which agent
                to dispatch next. File-based state survives context resets,
                providing clean handoffs between sessions.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Key Design Decisions
              </h3>
              <BulletedList>
                <ListItem>
                  Feature list uses JSON (not Markdown) to prevent agent
                  over-editing
                </ListItem>
                <ListItem>
                  One feature per session prevents context exhaustion and
                  over-ambition
                </ListItem>
                <ListItem>
                  Separated evaluator overcomes self-evaluation bias
                </ListItem>
                <ListItem>
                  File-based inter-agent communication with Zod-validated JSON
                  schemas
                </ListItem>
                <ListItem>
                  Atomic file writes with temp files and rename prevent
                  corruption
                </ListItem>
                <ListItem>
                  Cost and duration tracking per session for ROI analysis
                </ListItem>
              </BulletedList>
            </ContentCard>
          </div>
        </Section>

        {/* Technical Implementation */}
        <Section title="Technical Implementation">
          <div className="grid gap-8 md:grid-cols-2">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Runtime Validation</h3>
              <p className="mb-4 text-muted-foreground">
                Every agent communication boundary is protected by Zod schema
                validation. State files are validated at both read and write,
                ensuring agents cannot create malformed state or silently
                corrupt the shared coordination layer.
              </p>
              <CodeBlock title="Zod Schema Validation">
                {`// Every state file is validated at read and write
const features = FeatureListSchema.parse(
  JSON.parse(await Bun.file(path).text())
);

// Agents can't create malformed state
const report = EvaluationReportSchema.parse(data);`}
              </CodeBlock>
              <p className="mt-4 text-muted-foreground">
                Runtime validation catches schema drift and ensures agents
                can&apos;t accidentally corrupt the shared state that
                coordinates multi-session work.
              </p>
            </ContentCard>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Observability</h3>
              <p className="mb-4 text-muted-foreground">
                The observability strategy uses two complementary layers of
                OpenTelemetry instrumentation to provide full visibility across
                the agent lifecycle.
              </p>
              <BulletedList>
                <ListItem>
                  <strong>Layer 1 (Native):</strong> Claude Code&apos;s built-in
                  telemetry — session counts, token usage, cost per model, lines
                  of code modified, tool decisions
                </ListItem>
                <ListItem>
                  <strong>Layer 2 (Harness):</strong> Custom spans connecting
                  multi-agent sessions into coherent traces, aggregated metrics
                  across the full orchestration lifecycle
                </ListItem>
              </BulletedList>
            </ContentCard>
          </div>
          <ContentCard className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">Developer Experience</h3>
            <BulletedList>
              <ListItem>
                CLI interface with Commander for both interactive and automated
                operation
              </ListItem>
              <ListItem>
                Biome for code quality enforcement via SDK hooks — commits
                blocked on lint errors
              </ListItem>
              <ListItem>
                Security model with bash command allowlist restricting agent
                access to safe operations
              </ListItem>
              <ListItem>
                Bun runtime for native TypeScript execution without
                transpilation and fast startup
              </ListItem>
              <ListItem>
                Configuration file support with CLI argument overrides
              </ListItem>
            </BulletedList>
          </ContentCard>
        </Section>

        {/* Context Window Strategy */}
        <Section title="Context Window Strategy">
          <ContentCard>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-lg text-muted-foreground">
                  Long-running agents face <strong>context anxiety</strong> —
                  models begin wrapping up work prematurely as they approach
                  what they believe is their context limit. This manifests as
                  rushing through implementation, cutting corners, and declaring
                  victory early.
                </p>
                <p className="mb-4 text-lg text-muted-foreground">
                  Context resets (clearing the window entirely) proved more
                  effective than compaction (summarizing in-place) for models
                  exhibiting this behavior. The architecture solves this by
                  encoding all progress into structured files that survive
                  window resets, so no institutional knowledge is lost when the
                  context is cleared.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold">
                  Architectural Solutions
                </h3>
                <BulletedList>
                  <ListItem>
                    <code>feature_list.json</code> as single source of truth —
                    agents may only modify the <code>passes</code> field
                  </ListItem>
                  <ListItem>
                    <code>progress.json</code> for institutional memory across
                    sessions
                  </ListItem>
                  <ListItem>
                    <code>evaluation_report.json</code> with structured scores
                    and actionable feedback
                  </ListItem>
                  <ListItem>
                    Boot sequence saves tokens by prescribing startup steps
                    every session
                  </ListItem>
                  <ListItem>
                    Git history with descriptive commits enables agents to
                    revert failed changes
                  </ListItem>
                </BulletedList>
              </div>
            </div>
          </ContentCard>
        </Section>

        {/* Project Validation */}
        <Section title="Project Validation">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Phase 1: Hello World
              </h3>
              <p className="text-lg text-muted-foreground">
                Validates the full agent stack end-to-end with a simple HTTP
                server. Tests the complete lifecycle: initialization generates
                the feature list and scaffolds the project, the generator
                implements features one at a time with proper commits, and the
                evaluator verifies the running application via browser
                automation.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Phase 2: TeamDynamix MCP Server
              </h3>
              <p className="text-lg text-muted-foreground">
                An MCP server wrapping the TeamDynamix REST API, currently in
                design phase. Demonstrates the architecture&apos;s applicability
                to real-world enterprise tooling — exposing ticket search,
                creation, and updates as MCP tools with Zod-validated schemas
                for API responses.
              </p>
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="mb-6 text-3xl font-bold">Explore the Architecture</h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            The full source code, documentation, and reference architecture are
            available on GitHub.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/ncolesummers/enterprise-agent-development-lifecycle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View on GitHub
              </Button>
            </a>
            <Link href="/#contact">
              <Button variant="accent">Contact Me</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
