/**
 * Index plates: the small drawings that sit in the figure index.
 *
 * A plate is not a screenshot. It states the one structural fact about a
 * system that is worth knowing before deciding whether to read the case study,
 * and it may only state facts the case study can substantiate.
 *
 * Two are drawn here. FIG. 5 is the pattern the rest follow. FIG. 6 is drawn
 * entirely in hidden line, because the system it names has not been built.
 */

const PlateFrame = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 320 170"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className="fig-plate w-full"
  >
    {children}
  </svg>
);

/**
 * FIG. 5 — Mikrotik configuration generator.
 *
 * The fact worth drawing is the boundary: the tool is self-contained and runs
 * offline on a technician's machine, which is why it exists in the form it
 * does. Nothing crosses that boundary except the configuration the technician
 * carries to the router.
 */
export const PlateMikrotik = () => (
  <PlateFrame>
    <text className="fig-zone" x={10} y={22}>
      Offline workstation
    </text>
    <rect className="fig-boundary" x={8} y={32} width={210} height={112} />

    <rect className="fig-box" x={22} y={62} width={76} height={48} />
    <text className="fig-box-label" x={60} y={84}>
      Inputs
    </text>
    <text className="fig-box-sub" x={60} y={100}>
      site params
    </text>

    <line className="fig-flow" x1={98} y1={86} x2={113} y2={86} />
    <polygon className="fig-arrowhead" points="118,86 109,81 109,91" />

    <rect className="fig-box" x={118} y={54} width={86} height={64} />
    <text className="fig-box-label" x={161} y={80}>
      Generator
    </text>
    <text className="fig-box-sub" x={161} y={97}>
      go · wails
    </text>

    <line className="fig-flow" x1={204} y1={86} x2={233} y2={86} />
    <polygon className="fig-arrowhead" points="242,86 233,81 233,91" />
    <text className="fig-box-sub" x={220} y={74}>
      config
    </text>

    <rect className="fig-box" x={242} y={62} width={70} height={48} />
    <text className="fig-box-label" x={277} y={84}>
      Router
    </text>
    <text className="fig-box-sub" x={277} y={100}>
      standardized
    </text>
  </PlateFrame>
);

/**
 * FIG. 6 — Inbox Idaho.
 *
 * Drawn entirely in hidden line, which is the drafting convention for a part
 * that is specified but not present. The system is unreleased and its pilot
 * domain involves protected student records, so there is nothing to show and
 * nothing may be implied. A reserved area on a drawing is a real thing a
 * drawing does; a plausible-looking mock would be a lie.
 */
export const PlateForthcoming = () => (
  <PlateFrame>
    <rect className="fig-return" x={8} y={20} width={304} height={130} />
    <line className="fig-return" x1={8} y1={20} x2={312} y2={150} />
    <line className="fig-return" x1={312} y1={20} x2={8} y2={150} />
    <rect className="fig-plate-reserve" x={72} y={68} width={176} height={34} />
    <text className="fig-box-sub" x={160} y={89}>
      Not yet defined
    </text>
  </PlateFrame>
);
