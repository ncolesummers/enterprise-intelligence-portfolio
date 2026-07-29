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

/**
 * D — Cole. A constructed C inside the callout circle, matched to the N's cap
 * height so it carries the same weight in the block.
 *
 * The known risk is concentricity: a round letter inside a round frame can
 * read as two rings rather than as a letter. The C is drawn large and its
 * aperture turned to the same side each time to fight that.
 */
export const MarkCole = ({ className, title }: MarkProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    {...frame(title)}
  >
    <circle className="mark-line" cx={50} cy={50} r={45} />
    <path className="mark-line" d="M 70.4 65.4 A 24 24 0 1 1 70.4 34.6" />
  </svg>
);

/**
 * E — Aperture. The callout circle is itself the C: one form lifted at the
 * right, doing both jobs at once.
 *
 * This is the only candidate where the mark and the system's recurring
 * silhouette are the same object rather than one containing the other. It is
 * also the most minimal, which cuts both ways.
 */
export const MarkAperture = ({ className, title }: MarkProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    {...frame(title)}
  >
    <path className="mark-line" d="M 88.2 73.8 A 45 45 0 1 1 88.2 26.2" />
  </svg>
);

/**
 * F — Summers. A constructed S inside the callout circle, built from the same
 * two arcs as the lockup's S.
 *
 * The S is the one round letter that does not fight the circle: its double
 * curve reverses against the frame instead of echoing it.
 */
export const MarkSummers = ({ className, title }: MarkProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    {...frame(title)}
  >
    <circle className="mark-line" cx={50} cy={50} r={45} />
    <path
      className="mark-line"
      d="M 59 32.3 A 14 10 0 1 0 50 50 A 14 10 0 1 1 41 67.7"
    />
  </svg>
);

/**
 * G — Cole Summers, as a lockup. The C is a compass circle with its segment
 * lifted, the S is the same two arcs used everywhere else. Two letters sit
 * better than three: the pair is evenly weighted and needs far less width.
 *
 * The initials are the name he goes by. Any second reading they happen to
 * carry stays unstated — a mark that has to explain its own pun has stopped
 * being a mark.
 */
export const MarkColeSummers = ({ className, title }: MarkProps) => (
  <svg viewBox="0 0 104 70" fill="none" className={className} {...frame(title)}>
    <path className="mark-line" d="M 44.1 49.1 A 20 20 0 1 1 44.1 20.9" />
    <path
      className="mark-line"
      d="M 89 17.3 A 14 10 0 1 0 80 35 A 14 10 0 1 1 71 52.7"
    />
  </svg>
);

/**
 * H — Cole Summers, forced into the stamp. Included to be judged rather than
 * argued about: two letters inside the callout circle have to shrink to about
 * a third of its diameter, and the 24px column shows what that costs.
 */
export const MarkColeSummersStamp = ({ className, title }: MarkProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    {...frame(title)}
  >
    <circle className="mark-line" cx={50} cy={50} r={45} />
    <path className="mark-line" d="M 48 62 A 17 17 0 1 1 48 38" />
    <path
      className="mark-line"
      d="M 75.7 35 A 12 8.5 0 1 0 68 50 A 12 8.5 0 1 1 60.3 65"
    />
  </svg>
);
