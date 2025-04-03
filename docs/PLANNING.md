# Planning

Okay, let's summarize the common patterns across the pages we've analyzed (`myui/page.tsx`, `profile-extractor/page.tsx`, `mikrotik-config-gen/page.tsx`, `about/page.tsx`, `page.tsx`) and identify potential reusable components:

**Common Patterns & Duplication:**

1.  **Page Layout (Header/Footer):**
    *   `about/page.tsx` and `src/app/page.tsx` share an identical header (with logo, nav links, social icons, contact button) and footer (with social icons).
    *   The three project pages (`myui`, `profile-extractor`, `mikrotik-config-gen`) share a simpler header (back button only) and no footer.
    *   All pages use a dark background (`bg-black text-white`) and a container element (`<div className="container ...">`).
2.  **Section Structure:**
    *   All pages use `<section>` elements to structure content.
    *   The project pages and `about/page.tsx` repeatedly use a specific section header style: an `<h2>` title followed by a horizontal divider (`<div className="ml-4 h-px flex-1 bg-white/10"></div>`).
3.  **Content Cards:**
    *   A styled container (`<div className="rounded-lg bg-gray-800 p-6">`) is frequently used in project pages and `about/page.tsx` to group content within sections.
4.  **List Styles:**
    *   A specific bulleted list style (`<li className="flex items-start"><span className="mr-2 text-primary\">•</span> ... </li>`) appears numerous times across the project pages and `about/page.tsx`.
    *   Other list styles (numbered, small dots, icon cards) are used, sometimes with repetition within a page.
5.  **Code Blocks:**
    *   Project pages display code snippets using styled `<pre><code>` tags.
6.  **Buttons:**
    *   Consistent button styles (from `@/components/ui/button` and custom classes) are used for different actions (e.g., "Contact me", "Back to Portfolio", "View case study", "Visit MyUI", social icon buttons). The "Contact me" button and social icon buttons are duplicated across headers/footers.
7.  **Inline SVGs:**
    *   Custom SVGs (Play icon, Upload icon, Progress Circle) are defined directly within the JSX, sometimes multiple times.
8.  **Project Card Component:**
    *   `src/app/page.tsx` defines a `ProjectCard` component internally.

**Proposed Reusable Components:**

Based on these patterns, we can generalize and create the following components to significantly reduce duplication and improve readability/maintainability:

1.  **`AppLayout` Component:**
    *   **Purpose:** Provide the main page structure (overall `div`, potentially the `<main>` tag).
    *   **Features:** Could accept `header` and `footer` components as props or slots. Might handle the container logic or leave it to child pages. Could have variants for different header/footer needs (e.g., `variant="main"` vs. `variant="project"`).
    *   **Location:** `src/components/layout/app-layout.tsx`
2.  **`AppHeader` Component:**
    *   **Purpose:** Render the page header.
    *   **Features:** Could have variants based on props:
        *   Main variant (for `/` and `/about`): Shows logo, nav links, social icons, contact button.
        *   Project variant: Shows only the "Back to Home" link.
    *   **Location:** `src/components/layout/app-header.tsx`
3.  **`AppFooter` Component:**
    *   **Purpose:** Render the page footer.
    *   **Features:** Shows social links and the "@ncolesummers" text.
    *   **Location:** `src/components/layout/app-footer.tsx`
4.  **`Section` Component:**
    *   **Purpose:** Standardize the rendering of content sections.
    *   **Features:** Accepts a `title` prop and renders the `<h2>` and the horizontal divider. Renders `children` within the `<section>` tag.
    *   **Location:** `src/components/ui/section.tsx` (or `src/components/section.tsx`)
5.  **`ContentCard` Component:**
    *   **Purpose:** Standardize the gray content container.
    *   **Features:** Renders the `rounded-lg bg-gray-800 p-6` div and its `children`.
    *   **Location:** `src/components/ui/content-card.tsx`
6.  **`BulletedList` / `ListItem` Components:**
    *   **Purpose:** Standardize the common bullet point list style.
    *   **Features:** `BulletedList` could take an array of strings/nodes or render `ListItem` children. `ListItem` handles the flex layout and the `•` span.
    *   **Location:** `src/components/ui/bulleted-list.tsx`
7.  **`CodeBlock` Component:**
    *   **Purpose:** Display code snippets consistently.
    *   **Features:** Accepts `code` (string) and `language` (optional string) props. Renders the styled `<pre><code>` block. Could potentially add syntax highlighting later.
    *   **Location:** `src/components/ui/code-block.tsx`
8.  **Icon Components (e.g., `PlayIcon`, `UploadIcon`, `ProgressCircleIcon`):**
    *   **Purpose:** Extract inline SVGs into reusable components.
        *   `PlayIcon`: Found in `src/app/projects/myui/page.tsx` (Lines 32, 612).
        *   `UploadIcon`: Found in `src/app/projects/mikrotik-config-gen/page.tsx` (Lines 29, 381).
        *   `ProgressCircleIcon`: Found in `src/app/projects/profile-extractor/page.tsx` (Line 378).
    *   **Features:** Each component renders its specific SVG markup. Accepts standard SVG props (like `className`).
    *   **Location:** `src/components/icons/play-icon.tsx`, etc.
9.  **`ProjectCard` Component:**
    *   **Purpose:** Display project previews.
    *   **Features:** Move the existing implementation from `src/app/page.tsx`. Accepts props like `title`, `description`, `link`, `hasCase`, `comingSoon`.
    *   **Location:** `src/components/project-card.tsx`

Implementing these components would allow the page files (`page.tsx`, `about/page.tsx`, project pages) to be refactored into much smaller components primarily focused on composing these reusable elements and passing in the specific content for that page. This adheres to the DRY (Don't Repeat Yourself) principle and makes the codebase much cleaner.

Would you like me to start implementing any of these proposed components or continue analyzing the remaining smaller files first?
