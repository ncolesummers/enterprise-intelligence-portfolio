"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import DeliveryLoopDrawing from "@/components/figures/delivery-loop-drawing";
import DeliveryLoopDrawingTall from "@/components/figures/delivery-loop-drawing-tall";
import { parts } from "@/components/figures/parts";
import { cn } from "@/lib/utils";

/**
 * FIG. 1, assembled: the plate, its caption, and the reference numerals.
 *
 * The numerals are real buttons in a list rather than hit targets inside the
 * SVG. A figure sheet already works this way — numerals on the plate, words in
 * a table — so the accessible structure and the drawing convention are the
 * same structure, not a compromise between them.
 *
 * Both plates are aria-hidden. Everything the drawing says is said in text: the
 * caption names the figure, a description states its shape, and the numeral
 * table names every part. Nothing is available only by looking.
 *
 * Exactly one numeral is active at a time, which is what keeps the single
 * annotation colour meaning "this one".
 */

const RESTING_NOTE =
  "Thirteen numbered parts. Take any one to see what it does and why it is there.";

const DESCRIPTION =
  "A labeled GitHub issue enters through a signed webhook and an admission guard, then passes through eight stages: planning, test writing, development, validation, code review, commit, pull request, and done. Two approval gates interrupt the flow, one after planning and one before the only GitHub write. A return path carries work from code review back to development or test writing. Every stage writes to a durable control plane.";

/**
 * `readHref` turns the caption into a way into the case study. The index sheet
 * passes it, because FIG. 1 is the only figure with no cell in the index and
 * would otherwise be the one figure a visitor cannot follow. The case study
 * itself does not, since a figure does not link to the page it is already on.
 */
const DeliveryLoopFigure = ({ readHref }: { readHref?: string }) => {
  // Pointing at a part previews it; taking it pins it so the reading survives
  // moving the pointer away. Without the split, a click lands on a part that
  // hover has already made active and reads as turning it off.
  const [pinned, setPinned] = useState<number | null>(null);
  const [pointed, setPointed] = useState<number | null>(null);
  const active = pointed ?? pinned;
  const activePart = parts.find(part => part.numeral === active);

  const readoutRef = useRef<HTMLParagraphElement>(null);

  const take = (numeral: number) => {
    const next = pinned === numeral ? null : numeral;
    setPinned(next);
    // The tall plate is most of a phone screen, so a part taken near its top
    // leaves the reading below the fold and the tap looks like it did nothing.
    // `nearest` moves the least it can and is a no-op wherever the readout is
    // already visible, which is every case on a desktop plate.
    if (next !== null) readoutRef.current?.scrollIntoView({ block: "nearest" });
  };

  // The plates report the same two gestures the numerals do, so a part behaves
  // identically whether it is picked up off the drawing or out of the table.
  const pointing = { onPoint: setPointed, onTake: take };

  return (
    <figure className="mt-8 sm:mt-10">
      <p className="sr-only">{DESCRIPTION}</p>

      <DeliveryLoopDrawing
        className="hidden w-full lg:block"
        active={active}
        {...pointing}
      />
      <DeliveryLoopDrawingTall
        className="mx-auto w-full max-w-lg lg:hidden"
        active={active}
        {...pointing}
      />

      <figcaption className="rule-object mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-0 border-t pt-4">
        <span className="type-label shrink-0">FIG. 1</span>
        <span className="type-label text-line-soft">
          Loopworks — agent-ready delivery loop
        </span>
        {/* FIG. 1 has no cell in the index, so this caption is the only route
            into the flagship case study. Padded to a real target and carrying an
            arrow, because a 13px line of label type is not a way in that anyone
            finds. The arrow is hidden, so the link is still named "Read FIG. 1". */}
        {readHref && (
          <Link
            href={readHref}
            className="type-label hover:text-annotation inline-flex items-center gap-2 py-1.5 transition-colors sm:ml-auto"
          >
            Read FIG. 1
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        )}
      </figcaption>

      {/* Readout. Holds the figure's own description until a part is taken,
          so the resting state still says something. */}
      <p
        ref={readoutRef}
        className={cn(
          "type-body measure clears-title-block mt-4 min-h-[7rem] sm:min-h-[5rem]",
          activePart ? "text-line" : "text-line-soft",
        )}
      >
        {activePart ? (
          <>
            <span className="text-annotation font-semibold">
              {activePart.numeral} {activePart.name}.
            </span>{" "}
            {activePart.note}
          </>
        ) : (
          RESTING_NOTE
        )}
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {parts.map(part => {
          const isActive = part.numeral === active;
          return (
            <li key={part.numeral}>
              <button
                type="button"
                aria-pressed={part.numeral === pinned}
                onClick={() => take(part.numeral)}
                onPointerEnter={() => setPointed(part.numeral)}
                onPointerLeave={() => setPointed(null)}
                onFocus={() => setPointed(part.numeral)}
                onBlur={() => setPointed(null)}
                className={cn(
                  "flex w-full items-center gap-3 px-2 py-2 text-left transition-colors",
                  isActive ? "text-annotation" : "hover:text-annotation",
                )}
              >
                <span
                  className={cn(
                    "type-label flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isActive ? "border-annotation" : "border-rule-object",
                  )}
                >
                  {part.numeral}
                </span>
                <span className="type-label">{part.name}</span>
                {/* The note is in the DOM for every part, so a screen reader
                    gets it on focus rather than only from the visual readout. */}
                <span className="sr-only">. {part.note}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </figure>
  );
};

export default DeliveryLoopFigure;
