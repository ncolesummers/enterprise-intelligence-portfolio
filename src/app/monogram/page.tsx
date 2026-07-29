import {
  MarkStamp,
  MarkLockup,
  MarkConstruction,
  MarkCole,
  MarkAperture,
  MarkSummers,
  MarkColeSummers,
  MarkColeSummersStamp,
} from "@/components/marks/monogram";

/**
 * Temporary review sheet for the candidate marks. Delete this route once one
 * is chosen — it exists so the marks can be judged at real sizes, in the real
 * type and tokens, in both mediums, rather than as an image of themselves.
 */

const SIZES = [24, 40, 64, 120];

type Candidate = {
  letter: string;
  name: string;
  note: string;
  /** width divided by height, so each mark gets its true proportion */
  ratio: number;
  render: (title: string) => React.ReactNode;
};

const Row = ({ candidate }: { candidate: Candidate }) => (
  <section className="rule-object border-0 border-t pt-6">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h3 className="type-label shrink-0">{candidate.letter}</h3>
      <span className="type-label text-line-soft">{candidate.name}</span>
    </div>
    <p className="type-body text-line-soft measure mt-3 text-[0.9375rem]">
      {candidate.note}
    </p>

    <div className="mt-8 flex flex-wrap items-end gap-10">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col items-center gap-3">
          <div
            style={{ width: size * candidate.ratio, height: size }}
            className="flex items-center justify-center"
          >
            {candidate.render(`${candidate.name} at ${size} pixels`)}
          </div>
          <span className="type-label text-line-soft">{size}px</span>
        </div>
      ))}
    </div>
  </section>
);

const full = "h-full w-full";

const coleSummers: Candidate[] = [
  {
    letter: "G",
    name: "CS lockup",
    ratio: 104 / 70,
    note: "The C is a compass circle with its segment lifted; the S is the same two arcs used elsewhere. Two letters sit better than three, evenly weighted and far narrower. This is the version that survives small sizes, because nothing is crammed inside a frame.",
    render: t => <MarkColeSummers className={full} title={t} />,
  },
  {
    letter: "H",
    name: "CS stamp",
    ratio: 1,
    note: "The same two letters forced into the callout circle. Judge the 24px column: two letters have to shrink to about a third of the diameter to fit, and that is the whole cost of insisting on the circle.",
    render: t => <MarkColeSummersStamp className={full} title={t} />,
  },
  {
    letter: "F",
    name: "S stamp",
    ratio: 1,
    note: "Summers alone. The S is the one round letter that does not fight a round frame, because its double curve reverses against the circle instead of echoing it.",
    render: t => <MarkSummers className={full} title={t} />,
  },
  {
    letter: "D",
    name: "C stamp",
    ratio: 1,
    note: "Cole alone. The risk is concentricity: a round letter inside a round frame can read as two rings. Drawn large to fight that, but see whether it still reads as a letter to you.",
    render: t => <MarkCole className={full} title={t} />,
  },
  {
    letter: "E",
    name: "Aperture",
    ratio: 1,
    note: "The callout circle is itself the C, lifted at one side, doing both jobs at once. The only candidate where the mark and the system's recurring silhouette are the same object rather than one inside the other. Also the most minimal, which cuts both ways.",
    render: t => <MarkAperture className={full} title={t} />,
  },
];

const firstRound: Candidate[] = [
  {
    letter: "A",
    name: "N stamp",
    ratio: 1,
    note: "A constructed N inside the callout circle. Holds up at every size, but N is the initial you do not go by.",
    render: t => <MarkStamp className={full} title={t} />,
  },
  {
    letter: "B",
    name: "NCS lockup",
    ratio: 156 / 70,
    note: "All three initials. Wider than it needs to be, and the N earns its place least.",
    render: t => <MarkLockup className={full} title={t} />,
  },
  {
    letter: "C",
    name: "N construction",
    ratio: 1,
    note: "The stamp with its centre lines left visible. Reads at 120px and dissolves by 40px, so it can only ever be a large-format variant.",
    render: t => <MarkConstruction className={full} title={t} />,
  },
];

export default function MonogramReview() {
  return (
    <main id="main-content" className="sheet">
      <div className="pt-10">
        <h1 className="type-headline">Candidate marks</h1>
        <p className="type-body text-line-soft measure mt-4">
          Each mark at the sizes it would actually be used. The title block
          needs roughly 24 to 32 pixels, so that column decides it. Switch the
          medium in the title block to see each on both grounds.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="type-title">Cole Summers</h2>
        <p className="type-body text-line-soft measure mt-3">
          The initials you actually go by. Whatever second reading they happen
          to carry stays unstated: a mark that explains its own joke has stopped
          being a mark.
        </p>
        <div className="mt-8 space-y-14">
          {coleSummers.map(candidate => (
            <Row key={candidate.letter} candidate={candidate} />
          ))}
        </div>
      </section>

      <section className="mt-20 pb-20">
        <h2 className="type-title">First round</h2>
        <p className="type-body text-line-soft measure mt-3">
          Kept for comparison rather than as live options.
        </p>
        <div className="mt-8 space-y-14">
          {firstRound.map(candidate => (
            <Row key={candidate.letter} candidate={candidate} />
          ))}
        </div>
      </section>
    </main>
  );
}
