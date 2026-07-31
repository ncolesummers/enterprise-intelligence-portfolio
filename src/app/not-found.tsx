import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * A sheet that does not exist.
 *
 * Drawn as a reserved area — the hidden-line rectangle the figures use for a
 * part that is specified but not present — rather than as a large 404 over an
 * apology. The copy states what happened and where the real sheets are, which
 * is the only useful thing an error can do.
 *
 * It carries `main` and `#main-content` because the skip link in the layout
 * targets them on every route, and a 404 is a route.
 */
export default function NotFound() {
  return (
    <main id="main-content" className="sheet">
      <section className="pt-8 sm:pt-12">
        <p className="type-label text-line-soft">No such sheet</p>
        <h1 className="type-display mt-4 max-w-[14ch]">
          This drawing is not on file.
        </h1>
        <p className="type-body text-line-soft measure mt-6">
          The address you followed does not name a sheet in this set. It may
          have been withdrawn, or the reference may have been copied
          incompletely.
        </p>

        <figure className="mt-12 max-w-lg">
          <svg
            viewBox="0 0 320 170"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="w-full"
          >
            <rect
              className="fig-return"
              x={8}
              y={20}
              width={304}
              height={130}
            />
            <text className="fig-box-sub" x={160} y={89}>
              Sheet not found
            </text>
          </svg>
        </figure>

        <nav aria-label="Recovery" className="mt-12 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/">Return to the index</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#work">Figure index</Link>
          </Button>
        </nav>
      </section>
    </main>
  );
}
