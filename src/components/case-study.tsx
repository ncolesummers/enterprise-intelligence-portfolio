import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Case-study primitives.
 *
 * The four incumbent case studies each declare these locally, which was the
 * right call during Phase 3 propagation: their specs assert on exact classes,
 * and touching four tested pages to save a few lines would have been a
 * mechanical change with editorial risk. A fifth copy is not. New pages build
 * from here, and the incumbents can migrate in Phase 5 when spacing is settled
 * and their specs are being read anyway.
 *
 * The shapes are unchanged from the incumbents, including the test ids, so a
 * migration is an import swap rather than a rewrite.
 */

export function CaseStudySection({
  children,
  detailFigure,
  detailView,
  title,
}: {
  children: ReactNode;
  /**
   * The section's own drawing, for viewports where a pinned figure costs more
   * room than it earns. Rendered under the heading and above the prose, so the
   * reader meets the drawing on the way in. The deconstruction supplies this
   * only below its own breakpoint; above it the pinned band is the figure.
   */
  detailFigure?: ReactNode;
  /**
   * Which detail view of the page's figure this section reaches, if the section
   * is inside a scroll-driven deconstruction. The attribute is what the
   * deconstruction observes, so the mapping from prose to drawing is declared
   * where the prose is rather than duplicated as a list of headings.
   */
  detailView?: string;
  title: string;
}) {
  return (
    <section
      className="mb-16"
      data-testid="case-study-section"
      data-detail-view={detailView}
    >
      <div className="mb-8 flex items-center gap-4">
        <h2 className="type-headline">{title}</h2>
        <div className="h-px flex-1 bg-rule-leader" aria-hidden="true" />
      </div>
      {detailFigure}
      {children}
    </section>
  );
}

export function EvidencePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rule-leader min-w-0 p-6", className)}
      data-testid="evidence-panel"
    >
      {children}
    </div>
  );
}

export function EvidenceList({ children }: { children: ReactNode }) {
  return (
    <ul className="type-body text-line-soft divide-y divide-rule-leader">
      {children}
    </ul>
  );
}

export function EvidenceItem({ children }: { children: ReactNode }) {
  return <li className="py-3 first:pt-0 last:pb-0">{children}</li>;
}

/**
 * An identifier copied verbatim out of source. Monaspace is reserved for
 * literal code (DESIGN.md, The One Hand Rule), and a table name or a config key
 * a reader might grep for is literal code even when it sits inside a sentence.
 */
export function LiteralCode({ children }: { children: ReactNode }) {
  return <code className="type-code text-line">{children}</code>;
}
