# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack on port 3000 (preferred)
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Testing
- `pnpm test:e2e` - Run Playwright E2E tests (UI behavior + mocked integration)
- `pnpm test:e2e:ui` - Run tests with interactive UI
- `pnpm test:e2e:debug` - Debug tests with headed browser
- `pnpm test:e2e:headed` - Run tests in headed mode
- `pnpm test:contact-form` - Run contact form specific tests
- `pnpm test:integration` - Run integration health checks (quick)
- `TEST_INTEGRATION=true pnpm test:e2e` - Run full integration tests (use sparingly due to FormSpree rate limits)
- `pnpm test:ui-only` - Run only UI tests (excludes integration tests)

### Running Specific Tests
- `pnpm test:e2e tests/e2e/navigation.spec.ts` - Run a specific test file
- `pnpm test:e2e --grep "form validation"` - Run tests matching a pattern
- `PLAYWRIGHT_TEST_MODE=true pnpm dev --port 3001` - Start server in test mode (used by Playwright)

## Architecture

This is a Next.js 15 portfolio website built with the App Router architecture, showcasing enterprise intelligence projects and professional experience.

### Key Architecture Patterns

**Project Structure**: 
- Uses Next.js App Router with `src/app/` containing pages and layouts
- The main homepage (`src/app/page.tsx`) is a client component that composes major sections: Header, Hero, ProjectGrid, ContactSection, and Footer
- Project pages follow the pattern `src/app/projects/[project-name]/page.tsx`

**Component Organization**: 
- `src/components/` contains reusable components
- `src/components/ui/` contains shadcn/ui components following the "new-york" style
- `src/components/icons/` contains custom SVG icon components
- Uses component composition pattern with dedicated components for each major section

**Styling**: 
- Tailwind CSS with CSS variables for theming (defined in `globals.css`)
- Dark mode enabled by default (set in root layout)
- shadcn/ui components with class-variance-authority for variant styling
- Custom design system with consistent spacing and color tokens
- Uses `cn()` utility from `lib/utils.ts` for merging Tailwind classes

**State & Data**: 
- Site configuration centralized in `src/lib/const.ts` (navigation, social links, metadata)
- Client-side rendering for interactive elements
- Theme state managed by next-themes
- Form state handled by React Hook Form

**API Routes**:
- Mock FormSpree endpoint at `/api/test/formspree-mock` for testing
- Returns appropriate responses based on PLAYWRIGHT_TEST_MODE environment variable

**TypeScript Configuration**: 
- Strict mode enabled with path aliases (`@/*` maps to `src/*`)
- All components properly typed with React.ComponentProps patterns
- Form validation types generated from Zod schemas

**Key Dependencies**:
- shadcn/ui + Radix UI for accessible components
- next-themes for theme management
- Lucide React for icons
- clsx + tailwind-merge via `cn()` utility for conditional styling
- React Hook Form + Zod for form validation
- Playwright for comprehensive E2E testing
- Vercel Analytics for production insights

### Development Notes

**Component Patterns**:
- All components use the shadcn/ui pattern with `cn()` for class merging
- Prefer composition over prop drilling
- Use `forwardRef` for components that need ref forwarding
- Maintain consistent prop interfaces across similar components

**Form Validation Architecture**: 
- Uses React Hook Form with Zod schema validation for type-safe form handling
- Validation schemas defined in `src/lib/validation.ts`
- Real-time validation with proper ARIA error handling
- FormSpree integration with mock API for testing reliability
- Custom error messaging with field-specific feedback

**Testing Excellence**:
- 153 comprehensive E2E tests across 5 browser configurations (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- Three-tier testing strategy: UI behavior, integration health, full API
- 100% test reliability with flaky test elimination
- Cross-browser accessibility and keyboard navigation testing
- Tests run on port 3001 to avoid conflicts with development server
- Firefox and mobile browsers skip integration tests due to compatibility

**Animation & Performance**:
- Intersection Observer-based scroll animations (see `src/lib/scroll-animations.ts`)
- Respects `prefers-reduced-motion` user preference
- Lazy loading for images and heavy components
- Optimized bundle splitting with dynamic imports

**Error Handling**:
- ErrorBoundary component wraps the entire application
- Form-specific error states with user-friendly messages
- Network error handling with retry logic
- Graceful degradation for JavaScript-disabled environments

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
- [ ] **E2E tests pass**: All relevant Playwright tests execute successfully across browsers
- [ ] **Test reliability**: No flaky tests, 100% pass rate required
- [ ] **Validation testing**: Form validation scenarios covered with proper error states
- [ ] **Accessibility testing**: ARIA attributes and keyboard navigation verified
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