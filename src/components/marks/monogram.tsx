/**
 * The mark.
 *
 * CS, for Cole Summers — the name he goes by, rather than the N he does not.
 * Both letters are constructed from compass and straightedge geometry at a
 * single stroke weight, the way DIN lettering was drawn so any draftsman could
 * reproduce it exactly. Neither uses a fill.
 *
 * The C is one compass circle with a segment lifted. The S is two arcs meeting
 * at the letter's midpoint, widened to an elliptical rx so it carries the same
 * optical width as the C; a pure two-circle S is locked to a 2:1 height-to-
 * width ratio and reads starved beside it.
 *
 * Stroke scales with the mark rather than using non-scaling-stroke. That is the
 * opposite of the figures, deliberately: a drawing needs its weights held
 * constant so the hierarchy survives scaling, but a mark holding a fixed stroke
 * at 24px becomes all stroke and no counter.
 *
 * Whatever second reading the initials happen to carry is left unstated here
 * and everywhere else. A mark that has to explain its own pun has stopped
 * working as a mark.
 */

type MarkProps = {
  className?: string;
  /** Supply to expose the mark to assistive technology; omit where adjacent text already names him. */
  title?: string;
};

const frame = (title: string | undefined) =>
  title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true, focusable: false } as const);

/**
 * The mark proper: CS inside the callout circle, so it is built from the one
 * curve this system allows and shares a silhouette with every reference
 * numeral on the sheet.
 */
export const Mark = ({ className, title }: MarkProps) => (
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

/**
 * The same two letters unframed, for places with horizontal room and no need
 * for the stamp: a README header, an open-graph image, a wide footer.
 */
export const MarkLockup = ({ className, title }: MarkProps) => (
  <svg viewBox="0 0 104 70" fill="none" className={className} {...frame(title)}>
    <path className="mark-line" d="M 44.1 49.1 A 20 20 0 1 1 44.1 20.9" />
    <path
      className="mark-line"
      d="M 89 17.3 A 14 10 0 1 0 80 35 A 14 10 0 1 1 71 52.7"
    />
  </svg>
);
