/**
 * The sheet is being drawn.
 *
 * A rule traverses the band the way a drafting machine's straightedge does,
 * which replaces the incumbent spinning circle — the callout bubble is the one
 * curve this system draws, and a second rotating one competes with it.
 *
 * The motion is a transform on a single element and nothing else. Under
 * reduced motion the sweep is not drawn and the ruled band plus its label carry
 * the state on their own, which is the complete static state DESIGN.md requires
 * of every animated figure.
 */
export default function Loading() {
  return (
    <main id="main-content" className="sheet">
      <div className="pt-8 sm:pt-12">
        <p className="type-label text-line-soft" role="status">
          Drawing sheet
        </p>
        <div
          aria-hidden="true"
          className="border-rule-leader mt-4 max-w-lg overflow-hidden border-y py-6"
        >
          <div className="sheet-sweep bg-rule-object h-px w-1/3" />
        </div>
      </div>
    </main>
  );
}
