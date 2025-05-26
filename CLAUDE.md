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
No test framework is currently configured.

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