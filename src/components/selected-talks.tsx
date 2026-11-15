import { ArrowUpRight } from "lucide-react";

/**
 * The talks schedule on the index sheet.
 *
 * A drawing carries schedules: ruled tables listing things the drawing refers
 * to. `References` is already one, and this is its structural sibling, not a
 * second figure index. Talks are not figures, so there are no numerals, no
 * plates, and no imagery. The date is the key column.
 *
 * A row is not one link. A figure cell has one destination, so the whole cell
 * is the link. A talk has several and no page of its own, so the title is plain
 * text and each material is its own link. Those links take the `type-label`
 * arrow cue rather than the figure cells' ruled label boxes, because a ruled box
 * on this sheet means a tag that cannot be followed.
 *
 * A row states its date and nothing about whether that date is ahead or behind.
 * The sheet is a standing representation (PRODUCT.md), and status language goes
 * stale the day after it is true.
 */

type Material = {
  label: "Slides" | "Companion" | "Repository";
  href: string;
};

type Talk = {
  /** ISO 8601 calendar date. Displayed from its parts, so no time zone moves it. */
  date: string;
  title: string;
  host: string;
  description: string;
  materials: readonly Material[];
};

// Order is fixed, not sorted. Both sessions share a date; the Inspect workshop
// leads because it carries a repository.
const talks: readonly Talk[] = [
  {
    date: "2026-10-29",
    title: "Testing for Failure: Evaluating AI Research Workflows with Inspect",
    host: "U of I AI Symposium · Workshop · 35 min",
    description:
      "An introduction to evaluating AI research workflows with Inspect, including why one scored run is not enough.",
    materials: [
      { label: "Slides", href: "/symposium/evaluate/slides" },
      { label: "Companion", href: "/symposium/evaluate" },
      {
        label: "Repository",
        href: "https://github.com/ncolesummers/symposium-inspect-eval",
      },
    ],
  },
  {
    date: "2026-10-29",
    title: "Divide and Delegate: A Practical Introduction to AI Subagents",
    host: "U of I AI Symposium · Workshop · 35 min",
    description:
      "A no-tools workshop on delegating to AI subagents: split a research task, then diagnose and repair a failed handoff.",
    materials: [
      { label: "Slides", href: "/symposium/delegate/slides" },
      { label: "Companion", href: "/symposium/delegate" },
    ],
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const displayDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
};

const Row = ({ talk }: { talk: Talk }) => (
  <article className="flex flex-col gap-4 py-6 md:flex-row md:items-baseline md:gap-8">
    <time dateTime={talk.date} className="type-label shrink-0 md:w-28">
      {displayDate(talk.date)}
    </time>

    <div className="measure min-w-0 md:flex-1">
      <h3 className="type-title">{talk.title}</h3>
      <p className="type-label text-line-soft mt-3">{talk.host}</p>
      <p className="type-body text-line-soft mt-3 text-[0.9375rem]">
        {talk.description}
      </p>
    </div>

    {/* Every material leaves the sheet. Slides and Companion are first-party
        short links that redirect to another origin, so they are plain anchors:
        a client-side prefetch of a route whose only content is a redirect
        elsewhere would fetch nothing useful. The accessible name leads with the
        visible label (WCAG 2.5.3) and names the talk, so a screen reader's link
        list does not read "Slides", "Companion", "Slides". On a wide sheet the
        column is a fixed track, so it starts on the same line in every row
        however long its longest label is. */}
    <ul className="flex flex-wrap gap-x-6 md:w-28 md:shrink-0 md:flex-col">
      {talk.materials.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}, ${talk.title}`}
            className="type-label hover:text-annotation focus-visible:text-annotation inline-flex min-h-10 items-center gap-2 transition-colors md:min-h-6"
          >
            {label}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  </article>
);

const SelectedTalks = () => (
  <section id="talks" aria-labelledby="talks-heading" className="pt-24">
    <div className="rule-object flex flex-wrap items-baseline gap-x-4 gap-y-1 border-0 border-b pb-4">
      <h2 id="talks-heading" className="type-label shrink-0">
        Selected talks
      </h2>
      <p className="type-label text-line-soft">
        University of Idaho AI Symposium
      </p>
    </div>

    {/* Rules run the full width of the heading rule, as in `References`; the
        fields inside a row keep their own measure. */}
    <ul className="divide-y divide-rule-leader mt-8">
      {talks.map(talk => (
        <li key={talk.title}>
          <Row talk={talk} />
        </li>
      ))}
    </ul>
  </section>
);

export default SelectedTalks;
