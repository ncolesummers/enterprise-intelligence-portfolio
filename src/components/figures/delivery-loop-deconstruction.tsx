"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import DeliveryLoopDetail, {
  detailViews,
  type DetailViewKey,
} from "@/components/figures/delivery-loop-detail";
import { parts } from "@/components/figures/parts";
import { cn } from "@/lib/utils";

/**
 * FIG. 1, taken apart while the case study is read.
 *
 * The prose is the scroll budget. This wraps the six sections that name parts
 * and pins a detail plate above them; which detail is on the plate is decided by
 * which section the reader has reached, so nothing scrolls that would not have
 * scrolled anyway.
 *
 * Two inputs, two axes, so they cannot contend. **Scroll owns exposure** — it
 * decides which parts are on the plate. **Pointing owns reading** — it decides
 * which of the shown parts is being read. Pointing never advances or rewinds the
 * scroll, and the scroll never chooses what is read.
 *
 * The band is `aria-hidden`, like the plates it carries. Everything it says is
 * said in text elsewhere: each view's resting note restates the claim its own
 * section opens with, and the numeral table on the assembled figure names every
 * part with its full note. Motion is not the only way to learn anything here.
 *
 * Under `prefers-reduced-motion` the band is not drawn at all. The assembled
 * FIG. 1 above the prose is the resolution — the complete drawing, which is why
 * 4a shipped it first — and this adds a way of looking at it rather than the
 * only one.
 *
 * **The pinned band is `lg` and wider only.** A phone browser spends around
 * 145px of its height on chrome the layout viewport does not report, so the band
 * measured at 53% of an iPhone's reported height is nearer 62% of the height the
 * reader actually has — about five lines of prose left under it. Holding it to
 * half would have meant a plate near 160px, well under the 251px that justified
 * drawing a third geometry at all. Below `lg` the section carries its own plate
 * instead, via `CaseStudySection`'s `detailFigure`: the same drawing, met on the
 * way into the section it belongs to, with the prose getting the whole viewport
 * back. This is the retreat the brief pre-authorised as a layout change rather
 * than a rebuild, taken only where the pinned form was never affordable.
 */

/**
 * How deep below the band the reading line runs, as a share of the viewport.
 * Deep enough that the 4rem gap between two sections cannot leave the strip
 * empty for long, shallow enough that only the section actually being read is
 * ever on it.
 */
const READING_DEPTH = 0.12;

const DeliveryLoopDeconstruction = ({ children }: { children: ReactNode }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<DetailViewKey>(detailViews[0].key);

  // Pointing previews. Holding keeps the reading up after the pointer leaves,
  // which is the only way a touch can read a part at all — a tap fires enter and
  // leave together. It is not the assembled figure's pin: it is dropped as soon
  // as the scroll changes the view, which is exactly when it would go stale.
  const [pointed, setPointed] = useState<number | null>(null);
  const [held, setHeld] = useState<number | null>(null);
  const active = pointed ?? held;

  useEffect(() => {
    setPointed(null);
    setHeld(null);
  }, [shown]);

  /**
   * Whether the pinned band is drawn at all.
   *
   * It is not under reduced motion, and it is not below `lg`, where each section
   * carries its own plate instead. Both are media queries rather than one-time
   * facts, so this is state and not a check inside the observer effect: crossing
   * either boundary has to build the observer or tear it down, and an effect that
   * only read the query once would leave it dead after a resize into `lg`.
   *
   * False until mounted, which matches the server render.
   */
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 64rem) and (not (prefers-reduced-motion: reduce))",
    );
    const sync = () => setDrawn(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const band = bandRef.current;
    if (!root || !band || !drawn) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-detail-view]"),
    );
    let observer: IntersectionObserver | undefined;

    /**
     * The section being read is the last one to have started above `line`.
     *
     * Decided from geometry rather than from a running tally of what has
     * crossed. A tally has to survive the observer being rebuilt when the band
     * changes height, and one stale entry in it picks the wrong view with nothing
     * to correct it. Six rectangle reads, only when a boundary moves, is the
     * cheaper thing to be sure about. It also gives the hold for free: in the gap
     * between two sections, and through a section that names no parts, the last
     * section to have started above the line has not changed.
     */
    const settle = (line: number) => {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (section.getBoundingClientRect().top > line) continue;
        if (section.dataset.detailView) {
          setShown(section.dataset.detailView as DetailViewKey);
        }
        return;
      }
    };

    /**
     * The observer is a wake-up, not the decision: its root is a strip of
     * viewport at the reading line, so it fires when a section boundary crosses
     * that line and never per frame, which is the gate.
     *
     * The strip and the line are derived from one measurement, which is the part
     * that has to be true. Measuring the band twice lets the wake-up sit at one
     * height and the decision at another, and then a boundary can cross the
     * decision line during a jump without ever waking anything up.
     *
     * Measured, not guessed: the band takes about half a phone screen and a third
     * of a desktop one, so a fixed share of the viewport that clears it on a
     * phone lands a whole section ahead on a desktop. The band sticks at
     * `top: 0`, so its own height is where it ends.
     */
    const observe = () => {
      observer?.disconnect();
      const depth = Math.round(window.innerHeight * READING_DEPTH);
      const above = Math.min(
        Math.round(band.offsetHeight),
        window.innerHeight - depth,
      );
      const line = above + depth;
      observer = new IntersectionObserver(() => settle(line), {
        rootMargin: `-${above}px 0px -${window.innerHeight - line}px 0px`,
      });
      for (const section of sections) observer.observe(section);
    };

    // Re-measured when the band changes height, which is what a breakpoint or an
    // orientation change does to it. Fires once on observe, so this is also the
    // initial setup.
    const resize = new ResizeObserver(observe);
    resize.observe(band);
    window.addEventListener("resize", observe);

    return () => {
      resize.disconnect();
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [drawn]);

  const view = detailViews.find(candidate => candidate.key === shown);
  const activePart = parts.find(part => part.numeral === active);

  return (
    <div ref={rootRef}>
      {/* Sticky from the viewport top with the frame's own inset as padding, so
          the prose passing behind it is covered all the way to the border rule
          rather than through a gap above the band. The fixed sheet frame sits at
          z-30 and still draws over this, which is correct: the frame is the edge
          of the drawing board. */}
      <div
        ref={bandRef}
        aria-hidden="true"
        data-testid="deconstruction"
        className="fig-deconstruction-band bg-ground rule-object sticky top-0 z-10 mb-12 border-0 border-b pt-(--sheet-inner) pb-4"
      >
        <div className="flex items-start gap-10">
          <DeliveryLoopDetail
            className="w-full max-w-[27rem] shrink-0"
            shown={shown}
            active={active}
            onPoint={setPointed}
            onTake={numeral =>
              setHeld(current => (current === numeral ? null : numeral))
            }
          />

          <div className="rule-object flex-1 border-0 border-t pt-3">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="type-label shrink-0">FIG. 1 · Detail</span>
              <span className="type-label text-line-soft">{view?.caption}</span>
            </p>
            {/* Reserved at rest so taking a part does not push the prose the
                reader is in the middle of. */}
            <p
              className={cn(
                "type-body measure mt-3 min-h-[6rem]",
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
                view?.note
              )}
            </p>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default DeliveryLoopDeconstruction;
