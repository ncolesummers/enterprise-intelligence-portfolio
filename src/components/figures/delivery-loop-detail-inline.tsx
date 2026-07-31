"use client";

import { useState } from "react";

import DeliveryLoopDetail, {
  detailViews,
  type DetailViewKey,
} from "@/components/figures/delivery-loop-detail";
import { parts } from "@/components/figures/parts";
import { cn } from "@/lib/utils";

/**
 * One detail view of FIG. 1, drawn in place above the prose it illustrates.
 *
 * This is the narrow-viewport form of the deconstruction. A pinned band gives
 * the figure a fixed share of the screen, and a phone browser spends roughly
 * 145px of its height on chrome that the layout viewport does not report — so
 * the band measured at 53% of an iPhone's reported height is nearer 62% of the
 * height the reader actually has, leaving about five lines of prose. Below `lg`
 * the band is therefore not pinned at all: each detail plate becomes a figure
 * the reader passes on the way into the section it belongs to, and the prose
 * gets the whole viewport back.
 *
 * The brief pre-authorised exactly this as "a layout change rather than a
 * rebuild", which is what it is: same plate, same parts, same reading contract.
 * What is given up is scroll-driven exposure, and only where it was never
 * affordable. `lg` and wider keep the pinned band.
 *
 * Scroll owns nothing here, so **pointing owns reading** on its own. Holding is
 * still how a touch reads a part at all, since a tap fires enter and leave
 * together. There is no scroll change to make a reading go stale, so a held
 * reading is dropped only by taking it again.
 *
 * `aria-hidden`, like every plate in this system. The numeral table on the
 * assembled FIG. 1 above the prose remains the only announced route to a part.
 */

const DeliveryLoopDetailInline = ({ view }: { view: DetailViewKey }) => {
  const [pointed, setPointed] = useState<number | null>(null);
  const [held, setHeld] = useState<number | null>(null);
  const active = pointed ?? held;

  const detail = detailViews.find(candidate => candidate.key === view);
  const activePart = parts.find(part => part.numeral === active);

  return (
    <div
      aria-hidden="true"
      data-testid="deconstruction-inline"
      data-detail-inline={view}
      className="rule-object mb-8 border-0 border-b pb-4 lg:hidden"
    >
      <DeliveryLoopDetail
        className="mx-auto w-full max-w-[27rem]"
        shown={view}
        active={active}
        onPoint={setPointed}
        onTake={numeral =>
          setHeld(current => (current === numeral ? null : numeral))
        }
      />

      <div className="rule-object mt-4 border-0 border-t pt-3">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="type-label shrink-0">FIG. 1 · Detail</span>
          <span className="type-label text-line-soft">{detail?.caption}</span>
        </p>
        {/* Reserved at rest so taking a part does not push the prose below it. */}
        <p
          className={cn(
            "type-body measure mt-3 min-h-[6.5rem] sm:min-h-[4.5rem]",
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
            detail?.note
          )}
        </p>
      </div>
    </div>
  );
};

export default DeliveryLoopDetailInline;
