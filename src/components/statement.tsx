import Link from "next/link";

/**
 * The statement that opens the sheet.
 *
 * It sits above FIG. 1 and does one job: state the claim, then hand the
 * visitor something they can check. The invitation to verify is the point.
 * PRODUCT.md's first principle is verifiable over assertive, and a drawing of
 * a real system is only worth anything if the source is one click away.
 */
const Statement = () => (
  <section className="pt-8 sm:pt-12">
    {/* Held to a measure that breaks the line after "systems", so the claim
        lands as two even lines instead of a long one and an orphan. */}
    <h1 className="type-display max-w-[19ch]">
      I build the systems that build software.
    </h1>
    <p className="type-body text-line-soft measure mt-6">
      Below is one of them. Loopworks is a public agentic software factory, and
      every part in this figure was drawn from its source. Take a numeral to see
      what it does, or{" "}
      <Link
        href="https://github.com/ncolesummers/loopworks"
        className="text-line hover:text-annotation underline underline-offset-4 transition-colors"
      >
        read the repository
      </Link>{" "}
      and check the drawing against it.
    </p>
  </section>
);

export default Statement;
