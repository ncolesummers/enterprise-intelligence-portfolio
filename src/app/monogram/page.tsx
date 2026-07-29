import {
  MarkStamp,
  MarkLockup,
  MarkConstruction,
} from "@/components/marks/monogram";

/**
 * Temporary review sheet for the candidate marks. Delete this route once one
 * is chosen — it exists so the marks can be judged at real sizes, in the real
 * type and tokens, in both mediums, rather than as an image of themselves.
 */

const SIZES = [24, 40, 64, 120];

const Row = ({
  letter,
  name,
  note,
  square,
  children,
}: {
  letter: string;
  name: string;
  note: string;
  square: boolean;
  children: (size: number) => React.ReactNode;
}) => (
  <section className="rule-object border-0 border-t pt-6">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h2 className="type-label shrink-0">{letter}</h2>
      <span className="type-label text-line-soft">{name}</span>
    </div>
    <p className="type-body text-line-soft measure mt-3 text-[0.9375rem]">
      {note}
    </p>

    <div className="mt-8 flex flex-wrap items-end gap-10">
      {SIZES.map(size => (
        <div key={size} className="flex flex-col items-center gap-3">
          <div
            style={{ width: square ? size : size * 2.23, height: size }}
            className="flex items-center justify-center"
          >
            {children(size)}
          </div>
          <span className="type-label text-line-soft">{size}px</span>
        </div>
      ))}
    </div>
  </section>
);

export default function MonogramReview() {
  return (
    <main id="main-content" className="sheet">
      <div className="pt-10">
        <h1 className="type-headline">Candidate marks</h1>
        <p className="type-body text-line-soft measure mt-4">
          Three constructed monograms at the sizes they would actually be used.
          The title block needs roughly 24 to 32 pixels, so that column is the
          one that decides it. Switch the medium in the title block to see each
          on both grounds.
        </p>
      </div>

      <div className="mt-12 space-y-14 pb-20">
        <Row
          letter="A"
          name="Stamp"
          square
          note="A constructed N inside the callout circle, which makes the mark a reference numeral: the draftsman as a part on his own sheet. One letter is the only version that stays legible at title-block size."
        >
          {size => (
            <MarkStamp
              className="h-full w-full"
              title={`Stamp mark at ${size}px`}
            />
          )}
        </Row>

        <Row
          letter="B"
          name="Lockup"
          square={false}
          note="N C S as constructed letters, where the C is a true compass circle with a segment removed. The circle motif lives inside the letterforms instead of being applied around them. Needs horizontal room."
        >
          {size => (
            <MarkLockup
              className="h-full w-full"
              title={`Lockup mark at ${size}px`}
            />
          )}
        </Row>

        <Row
          letter="C"
          name="Construction"
          square
          note="The stamp with the geometry that produced it left visible: centre lines crossing at the compass point, running past the circle the way a construction line does."
        >
          {size => (
            <MarkConstruction
              className="h-full w-full"
              title={`Construction mark at ${size}px`}
            />
          )}
        </Row>
      </div>
    </main>
  );
}
