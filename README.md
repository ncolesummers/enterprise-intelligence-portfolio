# Enterprise Intelligence Portfolio

The personal portfolio of N. Cole Summers, at
[ncolesummers.com](https://ncolesummers.com). It exists to make an accurate,
high-confidence evaluation of his engineering work possible without a
conversation.

The site is built as a **drawn figure sheet** — patent and engineering drawing
vocabulary, ink line on paper or chalk line on blueprint. The architecture it
describes is drawn rather than asserted, so a reader can inspect the claim
instead of taking it. `DESIGN.md` is the authority for that system; `PRODUCT.md`
is the authority for what the site may claim.

## Getting started

Node 24+ (pinned via Volta) and pnpm.

```bash
git clone https://github.com/ncolesummers/enterprise-intelligence-portfolio.git
cd enterprise-intelligence-portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev              # dev server (Turbopack)
pnpm build            # production build
pnpm start            # serve the production build
pnpm lint             # ESLint
pnpm format           # Prettier write
pnpm format:check     # Prettier check (CI gates on this)
pnpm test:e2e         # Playwright
pnpm test:e2e:ui      # interactive test UI
```

## Stack

- **Framework** — Next.js 15, App Router, React 19
- **Language** — TypeScript, strict mode
- **Styling** — Tailwind CSS v4 with CSS custom properties for theming
- **Type** — Saira and Monaspace Neon, self-hosted as subset variable fonts.
  Provenance and regeneration steps are in
  [`src/app/fonts/FONT_SOURCES.md`](./src/app/fonts/FONT_SOURCES.md).
- **Theme** — next-themes. Light and dark are both first-class; neither is a
  computed inversion of the other.
- **Testing** — Playwright
- **Analytics** — Vercel Analytics
- **Deployment** — Vercel, continuous from `main`

## Testing

Playwright provides the end-to-end coverage, across five configurations —
Chromium, Firefox and WebKit on desktop, plus Mobile Chrome and Mobile Safari
device profiles. Thirteen specs cover navigation, direct contact, social-link
names and keyboard behavior, the five case studies, the index plates, the
Loopworks deconstruction, and the ADLC redirect.

The suite exercises the public UI and does not call third-party application
APIs. [`docs/TEST_PLAN.md`](./docs/TEST_PLAN.md) is the authority, including the
scroll and pointer hazards the suite has to guard against.

## Project structure

```
src/
├── app/                 # routes and layouts
│   ├── projects/        # one directory per case study
│   └── fonts/           # self-hosted subset variable fonts
├── components/
│   ├── figures/         # the drawings, and the part tables behind them
│   ├── marks/           # monogram
│   └── ui/              # what remains of shadcn/ui (button only)
├── lib/                 # const, metadata helpers, cn()
└── assets/              # images and diagrams
tests/
├── e2e/                 # Playwright specs
└── fixtures/            # test data
docs/
├── adr/                 # decisions with lasting consequences
├── design/              # part evidence tables, comps, type specimen
├── REDESIGN_PLAN.md     # closed record of the figure-sheet redesign
└── TEST_PLAN.md         # testing authority
```

## Contributing

Read [`AGENTS.md`](./AGENTS.md) first — it carries the authorities, the
architecture, and the Definition of Done that every change is held to.

The one rule worth stating twice: **nothing on this site may be fabricated.**
Not metrics, not dates, not drawing numbers. See `PRODUCT.md`.

## License

This project is for portfolio purposes. All rights reserved.
