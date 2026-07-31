/**
 * The drawn edge of the sheet: a border rule at object weight, an inner margin
 * rule at leader weight, and centering marks at the midpoint of each edge.
 *
 * It is fixed rather than scrolled, so the frame reads as the edge of the
 * drawing board while the sheet itself pans beneath it. Purely decorative —
 * hidden from assistive technology and transparent to pointers.
 */
const SheetFrame = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-(--sheet-margin) z-30"
  >
    <div className="rule-object absolute inset-0" />
    <div className="rule-leader absolute inset-[0.375rem]" />

    {/* Centering marks, as on a drafting sheet: a tick at the middle of each
        edge, running from the border rule in to the margin rule. */}
    <div className="bg-rule-object absolute top-0 left-1/2 h-2 w-px -translate-x-1/2" />
    <div className="bg-rule-object absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2" />
    <div className="bg-rule-object absolute top-1/2 left-0 h-px w-2 -translate-y-1/2" />
    <div className="bg-rule-object absolute top-1/2 right-0 h-px w-2 -translate-y-1/2" />
  </div>
);

export default SheetFrame;
