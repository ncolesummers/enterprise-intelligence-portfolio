# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: hiring managers and engineering leaders** evaluating N. Cole Summers as a potential full-time hire. They arrive with intent — usually from a LinkedIn profile, a GitHub link, or a referral — and are deciding within a minute or two whether this person is worth a conversation. Some skim for signal; some read a case study end to end. Both paths must work.

They are not being actively recruited by this site. Cole is open to the right full-time role but is not running a hard job search, so the site works as a standing, always-accurate representation rather than a campaign. It must be equally credible to someone who found it with no hiring intent at all.

**Secondary: peers and collaborators** — engineers who encountered his work through GitHub, agent/SDLC tooling communities, or professional context, and want to know who built it.

## Product Purpose

A personal portfolio at the professional home of N. Cole Summers. It exists to make an accurate, high-confidence evaluation of his engineering work possible without a conversation.

Success is that a qualified evaluator leaves believing Cole builds agent systems, not merely uses them — and that the belief holds up when they click through to the code.

## Positioning

The site's job is to make one takeaway stick: **he architects the agent systems themselves, rather than being a developer who is fast with AI tools.** Everything on the site should support or survive that reading.

That takeaway rests on verifiable specifics, not adjectives:

- **Loopworks** — a public, actively developed agentic software factory platform: a portal for planning, executing, validating, and improving software delivery loops. This is the flagship artifact and the strongest single piece of evidence for the takeaway.
- A published reference architecture that preceded it (Enterprise Agent Development Lifecycle, built on Anthropic's Claude Agent SDK, synthesizing five Anthropic research documents) — evidence that Loopworks came out of sustained architectural thinking rather than appearing from nowhere.
- Continuous practice using AI in the software development lifecycle since the GitHub Copilot technical preview in June 2021.
- A stated design stance — AI removes toil, humans retain authority over judgment — with shipped systems behind it.
- Production enterprise systems at institutional scale alongside the agent work, so the agent claims are not theoretical.

The site should let visitors verify these rather than asking them to accept them.

## Operating Context

Evaluation is fast and comparative. Visitors are typically:

- arriving from LinkedIn, GitHub, or a referral link, often on a phone;
- scanning several candidate portfolios in one sitting;
- clicking out to GitHub or a live production site to check whether the work is real;
- occasionally returning later to a specific case study before or during an interview loop.

The site itself is a work sample. It is built with AI-assisted development, so its own build quality — accessibility, testing, performance, code clarity — is part of the evidence, not just packaging.

## Capabilities and Constraints

**Current surfaces**

- Home (`/`) — hero, selected project grid, contact section.
- About (`/about`) — professional journey, focus areas, philosophy, certifications, personal interests.
- Five project case studies: `/projects/agent-development-lifecycle`, `/projects/uidaho-website`, `/projects/profile-extractor`, `/projects/myui`, `/projects/mikrotik-config-gen`.

**Planned roster change**

- **Loopworks becomes the flagship case study.** It leads the work section.
- **Inbox Idaho joins as a forthcoming project**, with no imagery available yet (see Evidence).
- **The standalone ADLC case study retires.** Its substance folds into the Loopworks story as lineage — the research and reference architecture that preceded the platform. The existing `/projects/agent-development-lifecycle` route should redirect rather than 404, since it may be indexed and linked.

**Technical constraints**

- Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind CSS v4, shadcn/ui ("new-york"), deployed on Vercel.
- Contact form is FormSpree-backed with React Hook Form + Zod validation; it is subject to rate limits, so full integration tests run only on manual trigger.
- Playwright E2E suite across five browser configurations; the project holds itself to a 100% pass rate.
- Node 24+; pnpm.
- Vercel Analytics is present for engagement insight.

**Terminology**

- "ADLC" / Agent Development Lifecycle — the reference architecture project.
- "Human-in-the-loop" — Cole's recurring framing for AI systems that preserve human authority over judgment.
- "SDLC automation" — the professional focus area at the University of Idaho.

**Open decisions**

- Whether the site should grow a writing or notes surface has not been decided. Not currently in scope.
- No decision has been made about publishing a résumé/CV document.

## Brand Commitments

- **Name:** N. Cole Summers (full: Nathan Cole Summers). Both forms appear on the site today.
- **Contact:** nate@ncolesummers.com. LinkedIn, GitHub, and Instagram are the linked social presences.
- **Logo:** `ncs-logo.png` at the repository root is the real mark, not a scratch asset. It is currently untracked and not yet used in the interface. **A redesign of the mark is explicitly permitted** — it is a real asset, not a frozen one.
- **Voice:** plain, direct, technically specific, first person. No hype, no marketing gloss. Recent copy work deliberately removed em-dashes and normalized number usage; that convention should be preserved.

## Evidence on Hand

All four of these are real, checkable, and cleared for use:

- **Loopworks** (`github.com/ncolesummers/loopworks`) — public, TypeScript, actively developed. An agentic software factory portal where GitHub Issues are the source of truth for roadmap, planning, milestones, decisions, and execution state, and Vercel is the visibility surface for previews, deployments, and build status. Named execution loops include agent-ready, development, and research. Stack: Next.js App Router, Bun, shadcn/ui, Auth.js GitHub SSO, Postgres + Drizzle, Vitest/Playwright/Storybook, Pino, with Eve, Vercel Workflows, Vercel Sandbox, and AI Gateway integration points. **This system's real structure is documented and inspectable, which makes it legitimate material for explanatory design rather than decoration.**
- **Other public GitHub repositories** — the ADLC reference architecture (`github.com/ncolesummers/enterprise-agent-development-lifecycle`) and this portfolio's own source. Code is the primary artifact; visitors are expected to click through and read it.
- **Live production systems** — the University of Idaho website and the MyUI student dashboard, publicly reachable and linkable, subject to the employer boundary below.
- **Written architecture and research** — the ADLC architecture (including its diagram, `src/assets/adlc-architecture.svg`) and the AI profile-extraction research spike. Substantive documents that show reasoning, not just outcomes.

**Inbox Idaho — forthcoming, no assets.** An Outlook add-in that uses retrieval-augmented generation to draft email replies to incoming questions. The initial pilot covers financial aid policy and support at the University of Idaho. It has not launched, and **no screenshots, demos, metrics, or interface imagery exist or may be implied.** Any treatment on the site must be honest about it being forthcoming, and must be designed to look intentional rather than like a missing asset. Do not describe outcomes, accuracy, adoption, or time savings — none have been measured.

- **Credentials and role history** — Security+; Advanced Certified Scrum Master; Certified Scrum Developer; Certified Scrum Product Owner. Ten years of IT experience, five years of application development. Currently Enterprise Applications Developer at the University of Idaho.

Existing visual assets: project imagery in `src/assets/` for all five case studies.

**What does not exist and must never be invented:** testimonials, client quotes, named references, performance or adoption metrics, revenue or scale figures, awards, press mentions, and customer logos. Nothing may be presented as measured, benchmarked, or attributed unless it can be substantiated. If a surface seems to need proof of this kind, the answer is to use real evidence differently, not to manufacture it.

**Employer boundary:** University of Idaho work (the university website, MyUI, the profile extractor, and Inbox Idaho) may be described and shown, but some detail, data, and screenshots are not publishable. Treat internal data, unreleased work, and anything resembling student or personnel information as off-limits, and confirm before adding new specifics or imagery to those case studies.

Inbox Idaho carries the tightest version of this boundary: it is unreleased, and its pilot domain is financial aid — an area involving student financial and educational records. No real email content, query examples, policy excerpts, retrieved passages, or generated drafts may appear on the site, including as illustrative or synthetic-looking samples. Illustrating this project with plausible-looking fake email content would misrepresent a system that handles protected student information.

## Product Principles

1. **Verifiable over assertive.** Every significant claim should have something a skeptic can click. Where proof is thin, say less rather than louder.
2. **The build is the argument.** The site's own accessibility, performance, and code quality are primary evidence for the claims it makes. Shipping something sloppy here costs more than it would on an ordinary product.
3. **Depth reachable, never mandatory.** A 60-second visitor and a 15-minute visitor should both leave satisfied. Never force the deep read; never hide it either.
4. **Accurate at rest.** This is a standing representation, not a campaign. It must stay true and current with no one tending it, and must not read as though it is asking for something.
5. **Human authority is the through-line.** The stance that AI removes toil while humans keep judgment is the product's actual point of view. It should be visible in what the work is, not only in what the copy says.

## Accessibility & Inclusion

WCAG 2.1 AA is the committed standard, already enforced through the existing Playwright suite: keyboard navigation, screen reader support, ARIA correctness on form error states, and color contrast in both themes. `prefers-reduced-motion` is honored by all scroll and entrance animation. Full light and dark theme support is a requirement, not an enhancement.
