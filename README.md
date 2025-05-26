# Enterprise Intelligence Portfolio

A modern, enterprise-grade portfolio website showcasing enterprise intelligence projects and professional experience. Built with Next.js 15, TypeScript, and cutting-edge web technologies.

## Features

- ✨ **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- 🎨 **Theme Toggle**: Light/dark mode switching with system preference detection
- 📱 **Responsive Design**: Mobile-first approach with seamless cross-device experience
- 🔒 **Type Safety**: Comprehensive TypeScript implementation with strict mode
- 📧 **Functional Contact Form**: FormSpree integration with real email delivery
- 🎭 **Smooth Animations**: Intersection Observer-based scroll animations with reduced motion support
- ♿ **Accessibility First**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support
- 🧪 **E2E Testing**: Comprehensive Playwright testing suite with cross-browser coverage
- 📊 **Analytics Ready**: Vercel Analytics integration for engagement insights
- 🔍 **SEO Optimized**: Meta tags, Open Graph, structured data, and dynamic sitemap

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ncolesummers/enterprise-intelligence-portfolio.git
cd enterprise-intelligence-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Available Scripts

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Testing
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm test:e2e:ui` - Run tests with interactive UI
- `pnpm test:contact-form` - Run contact form specific tests

## Architecture

This portfolio follows enterprise-grade development practices:

- **Component Architecture**: Modular components with clear separation of concerns
- **Design System**: shadcn/ui components with consistent theming
- **State Management**: Centralized configuration with next-themes for theme management
- **Performance**: Optimized images, lazy loading, and efficient bundle splitting
- **Error Handling**: Comprehensive error boundaries and graceful degradation

## Contributing

Please follow our Definition of Done for all contributions:

### Definition of Done

Before considering any code change complete, ensure all criteria are met:

#### Code Quality
- [ ] **Linting passes**: Run `pnpm lint` with zero errors or warnings
- [ ] **Build succeeds**: Run `pnpm build` successfully without TypeScript errors
- [ ] **Type safety**: All TypeScript types are properly defined and used
- [ ] **Code formatting**: Code follows Prettier formatting standards

#### Functionality
- [ ] **Feature works as intended**: Manual testing confirms expected behavior
- [ ] **Cross-browser compatibility**: Tested in Chrome, Firefox, and Safari (when applicable)
- [ ] **Responsive design**: Works on mobile, tablet, and desktop viewports
- [ ] **Accessibility**: Meets WCAG 2.1 AA standards (keyboard navigation, screen readers, color contrast)

#### Testing
- [ ] **E2E tests pass**: Relevant Playwright tests execute successfully
- [ ] **No console errors**: Browser console shows no JavaScript errors
- [ ] **Contact form verification**: FormSpree integration tested (when touching contact functionality)

#### Performance & UX
- [ ] **Reduced motion respected**: Animations honor `prefers-reduced-motion` setting
- [ ] **Theme compatibility**: Works correctly in both light and dark themes
- [ ] **Loading states**: Appropriate loading indicators for async operations
- [ ] **Error handling**: Graceful error states with user-friendly messages

#### Documentation
- [ ] **Code is self-documenting**: Clear component and function names
- [ ] **Complex logic explained**: Comments added for non-obvious implementations
- [ ] **CLAUDE.md updated**: Architecture notes updated if patterns change

#### Git Standards
- [ ] **Atomic commits**: Each commit represents one logical change
- [ ] **Clear commit messages**: Descriptive messages explaining "why" not just "what"
- [ ] **No sensitive data**: No API keys, secrets, or personal data committed

#### Production Readiness
- [ ] **Vercel deployment succeeds**: Build and deployment pipeline completes
- [ ] **Analytics working**: Vercel Analytics tracking page views (when applicable)
- [ ] **SEO optimized**: Meta tags, Open Graph, and structured data present

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with CSS variables
- **Components**: shadcn/ui + Radix UI primitives
- **Theme**: next-themes with system preference detection
- **Icons**: Lucide React
- **Forms**: FormSpree integration with zod validation
- **Testing**: Playwright for E2E testing
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel Platform

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities and configurations
└── assets/             # Static assets and images
```

## Deployment

The portfolio is automatically deployed on Vercel with continuous deployment from the main branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ncolesummers/enterprise-intelligence-portfolio)

## License

This project is for portfolio purposes. All rights reserved.

---

**Built with ❤️ by N. Cole Summers**