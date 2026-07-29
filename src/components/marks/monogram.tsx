/**
 * Candidate marks for review.
 *
 * All three are constructed: built from compass and straightedge geometry at a
 * single stroke weight, the way DIN lettering was drawn so any draftsman could
 * reproduce it. None uses a fill.
 *
 * Stroke scales with the mark rather than using non-scaling-stroke. A figure
 * needs its weights held constant so the hierarchy survives; a mark needs the
 * opposite, or at 24px the letter becomes all stroke and no counter.
 */

type MarkProps = { className?: string; title?: string };

const frame = (title: string | undefined) =>
  title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true, focusable: false } as const);

/**
 * A — Stamp. A constructed N inside the callout circle, so the mark is
 * literally a reference numeral: the draftsman as a part on his own sheet.
 * One letter is the only version that survives 24px in the title block.
 */
export const MarkStamp = ({ className, title }: MarkProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    {...frame(title)}
  >
    <circle className="mark-line" cx={50} cy={50} r={45} />
    <path className="mark-line" d="M 33 70 V 30 L 67 70 V 30" />
  </svg>
);

/**
 * B — Lockup. N C S set as constructed letters, where the C is a true compass
 * circle with a segment removed. The circle motif lives inside the letterforms
 * rather than being applied around them.
 */
export const MarkLockup = ({ className, title }: MarkProps) => (
  <svg viewBox="0 0 156 70" fill="none" className={className} {...frame(title)}>
    {/* N: two stems and a diagonal, one continuous stroke. */}
    <path className="mark-line" d="M 10 55 V 15 L 44 55 V 15" />
    {/* C: one compass circle, r20, with a 90 degree segment lifted out. */}
    <path className="mark-line" d="M 94.1 49.1 A 20 20 0 1 1 94.1 20.9" />
    {/* S: two arcs meeting at the letter's midpoint. Widened to rx 14 so it
        carries the same optical width as the N and the C; a pure two-circle S
        is locked to a 2:1 height-to-width ratio and reads starved beside them. */}
    <path
      className="mark-line"
      d="M 139 17.3 A 14 10 0 1 0 130 35 A 14 10 0 1 1 121 52.7"
    />
  </svg>
);

/**
 * C — Construction. The stamp with the geometry that produced it left visible:
 * centre lines crossing at the compass point, drawn at centre weight and
 * running past the circle the way a construction line does.
 */
export const MarkConstruction = ({ className, title }: MarkProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    {...frame(title)}
  >
    <line className="mark-centre" x1={50} y1={1} x2={50} y2={99} />
    <line className="mark-centre" x1={1} y1={50} x2={99} y2={50} />
    <circle className="mark-line" cx={50} cy={50} r={45} />
    <path className="mark-line" d="M 33 70 V 30 L 67 70 V 30" />
  </svg>
);
