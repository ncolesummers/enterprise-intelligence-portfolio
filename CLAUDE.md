# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Authorities

Three files own different questions. Read the relevant one rather than inferring from code:

- **PRODUCT.md** — who the site is for, what it must prove, what may never be fabricated, and the employer boundaries on University of Idaho work.
- **DESIGN.md** — the visual system: palette, typography, line-weight hierarchy, named rules, and prohibitions.
- **docs/TEST_PLAN.md** — the three-tier testing strategy in full.

Do not restate their contents here. If this file and one of them disagree, they win.

## Commands

```bash
pnpm dev              # dev server (Turbopack)
pnpm build            # production build
pnpm lint             # ESLint
pnpm format           # Prettier write
pnpm test:e2e         # Playwright UI behavior
pnpm test:e2e:ui      # interactive test UI
```

Node 24+ (pinned via Volta), pnpm.

**Always run `pnpm format` before committing.**

## Architecture

Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, deployed on Vercel.

- `src/app/` — routes and layouts. Case studies live at `src/app/projects/<slug>/page.tsx`.
- `src/components/` — section components; `src/components/ui/` holds shadcn/ui ("new-york") primitives.
- `src/lib/const.ts` — navigation, social links, site metadata.
- `src/lib/metadata.ts` — `generatePageMetadata()`; every page sets metadata through it.
- `@/*` maps to `src/*`.

No external data fetching. Content is authored directly in components.

## Patterns worth knowing

**`cn()`** (`src/lib/utils.ts`) merges Tailwind classes via clsx + tailwind-merge. Use it for every conditional class rather than template strings.

**Theming** runs through next-themes with CSS custom properties. Both themes are first-class; neither is a computed inversion of the other. See DESIGN.md.

## Definition of Done

Hard gates, all of them cheap to check:

- [ ] `pnpm lint` clean, `pnpm build` succeeds with no TypeScript errors
- [ ] `pnpm format` run
- [ ] Relevant Playwright tests pass, with no newly flaky tests
- [ ] No console errors in the browser
- [ ] Works in both themes and at mobile, tablet, and desktop widths
- [ ] WCAG 2.1 AA holds: keyboard reachable, screen-reader sane, contrast verified
- [ ] Motion respects `prefers-reduced-motion`, and the static state is complete on its own
- [ ] No fabricated content (see PRODUCT.md — this is a real risk on this project, not boilerplate)

Commits are atomic and conventional, and explain why rather than what.
