# Component Refactoring Tasks

This document outlines the tasks required to implement the reusable components identified in `docs/PLANNING.md` and refactor the existing pages to use them.

## Icon Components

- [X] Create `src/components/icons` directory if it doesn't exist.
- [X] Create `src/components/icons/play-icon.tsx` based on existing inline SVG (found in `src/app/projects/myui/page.tsx` Lines 32, 612).
- [X] Create `src/components/icons/upload-icon.tsx` based on existing inline SVG (found in `src/app/projects/mikrotik-config-gen/page.tsx` Lines 29, 381).
- [X] Create `src/components/icons/progress-circle-icon.tsx` based on existing inline SVG (found in `src/app/projects/profile-extractor/page.tsx` Line 378).
- [X] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use the new Icon components.

## UI Components

- [X] Create `src/components/ui` directory if it doesn't exist.
- [X] Create `src/components/ui/content-card.tsx` component.
- [X] Refactor `about/page.tsx` to use `ContentCard`.
- [X] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use `ContentCard`.
- [ ] Create `src/components/ui/bulleted-list.tsx` component (including `ListItem`).
- [ ] Refactor `about/page.tsx` to use `BulletedList`.
- [ ] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use `BulletedList`.
- [ ] Create `src/components/ui/code-block.tsx` component.
- [ ] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use `CodeBlock`.
- [ ] Create `src/components/ui/section.tsx` component.
- [ ] Refactor `about/page.tsx` to use `Section`.
- [ ] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use `Section`.

## Layout Components

- [ ] Create `src/components/layout` directory if it doesn't exist.
- [ ] Create `src/components/layout/app-footer.tsx` component.
- [ ] Refactor `src/app/page.tsx` to use `AppFooter`.
- [ ] Refactor `about/page.tsx` to use `AppFooter`.
- [ ] Create `src/components/layout/app-header.tsx` component (with variants for main and project pages).
- [ ] Refactor `src/app/page.tsx` to use `AppHeader` (main variant).
- [ ] Refactor `about/page.tsx` to use `AppHeader` (main variant).
- [ ] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use `AppHeader` (project variant).
- [ ] Create `src/components/layout/app-layout.tsx` component.
- [ ] Refactor `src/app/page.tsx` to use `AppLayout`.
- [ ] Refactor `about/page.tsx` to use `AppLayout`.
- [ ] Refactor project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) to use `AppLayout`.

## Project Card Component

- [ ] Create `src/components/project-card.tsx`.
- [ ] Move `ProjectCard` component implementation from `src/app/page.tsx` to `src/components/project-card.tsx`.
- [ ] Update `src/app/page.tsx` to import and use the component from `src/components/project-card.tsx`.

## Final Review

- [ ] Review all refactored pages for consistency and ensure no functionality was broken.
- [ ] Perform final cleanup and remove any unused code or styles. 