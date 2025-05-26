# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack (preferred)
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Testing
- `pnpm test:e2e` - Run Playwright E2E tests (UI behavior + mocked integration)
- `pnpm test:e2e:ui` - Run tests with interactive UI
- `pnpm test:contact-form` - Run contact form specific tests
- `TEST_INTEGRATION=true pnpm test:e2e` - Run full integration tests (use sparingly due to rate limits)

#### Testing Strategy
This project uses a three-tier testing approach documented in `docs/TEST_PLAN.md`:

1. **UI Behavior Tests**: Fast, reliable tests with mocked API responses
2. **Integration Health Checks**: API availability and endpoint configuration verification
3. **Full Integration Tests**: Real API testing (manual trigger due to FormSpree rate limits)

For detailed testing documentation, see `docs/TEST_PLAN.md`.

## Architecture

This is a Next.js 15 portfolio website built with the App Router architecture, showcasing enterprise intelligence projects and professional experience.

### Key Architecture Patterns

**Project Structure**: Uses Next.js App Router with `src/app/` containing pages and layouts. The main homepage (`src/app/page.tsx`) is a client component that composes major sections: Header, Hero, ProjectGrid, ContactSection, and Footer.

**Component Organization**: 
- `src/components/` contains reusable components
- `src/components/ui/` contains shadcn/ui components following the "new-york" style
- Uses component composition pattern with dedicated components for each major section

**Styling**: 
- Tailwind CSS with CSS variables for theming
- Dark mode enabled by default (set in root layout)
- shadcn/ui components with class-variance-authority for variant styling
- Custom design system with consistent spacing and color tokens

**State & Data**: 
- Site configuration centralized in `src/lib/const.ts` (navigation, social links, metadata)
- Client-side rendering for interactive elements
- No external data fetching currently implemented

**TypeScript Configuration**: 
- Strict mode enabled with path aliases (`@/*` maps to `src/*`)
- All components properly typed with React.ComponentProps patterns

**Key Dependencies**:
- shadcn/ui + Radix UI for accessible components
- next-themes for theme management
- Lucide React for icons
- clsx + tailwind-merge via `cn()` utility for conditional styling

### Development Notes

The codebase follows shadcn/ui conventions with the `cn()` utility function for merging Tailwind classes. When adding new components, use the established patterns from existing UI components and maintain the dark theme aesthetic.

## Definition of Done

Before considering any code change complete, ensure all of the following criteria are met:

### Code Quality
- [ ] **Linting passes**: Run `pnpm lint` with zero errors or warnings
- [ ] **Build succeeds**: Run `pnpm build` successfully without TypeScript errors
- [ ] **Type safety**: All TypeScript types are properly defined and used
- [ ] **Code formatting**: Code follows Prettier formatting standards

### Functionality
- [ ] **Feature works as intended**: Manual testing confirms expected behavior
- [ ] **Cross-browser compatibility**: Tested in Chrome, Firefox, and Safari (when applicable)
- [ ] **Responsive design**: Works on mobile, tablet, and desktop viewports
- [ ] **Accessibility**: Meets WCAG 2.1 AA standards (keyboard navigation, screen readers, color contrast)

### Testing
- [ ] **E2E tests pass**: Relevant Playwright tests execute successfully
- [ ] **No console errors**: Browser console shows no JavaScript errors
- [ ] **Contact form verification**: FormSpree integration tested (when touching contact functionality)

### Performance & UX
- [ ] **Reduced motion respected**: Animations honor `prefers-reduced-motion` setting
- [ ] **Theme compatibility**: Works correctly in both light and dark themes
- [ ] **Loading states**: Appropriate loading indicators for async operations
- [ ] **Error handling**: Graceful error states with user-friendly messages

### Documentation
- [ ] **Code is self-documenting**: Clear component and function names
- [ ] **Complex logic explained**: Comments added for non-obvious implementations
- [ ] **CLAUDE.md updated**: Architecture notes updated if patterns change

### Git Standards
- [ ] **Atomic commits**: Each commit represents one logical change
- [ ] **Clear commit messages**: Descriptive messages explaining "why" not just "what"
- [ ] **No sensitive data**: No API keys, secrets, or personal data committed

### Production Readiness
- [ ] **Vercel deployment succeeds**: Build and deployment pipeline completes
- [ ] **Analytics working**: Vercel Analytics tracking page views (when applicable)
- [ ] **SEO optimized**: Meta tags, Open Graph, and structured data present