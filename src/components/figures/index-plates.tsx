/**
 * Index plates: the small drawings that sit in the figure index.
 *
 * A plate is not a screenshot. It states the one structural fact about a
 * system that is worth knowing before deciding whether to read the case study,
 * and it may only state facts the case study can substantiate.
 *
 * FIG. 5 is the pattern the others follow. FIG. 6 is drawn entirely in hidden
 * line, because the system it names has not been built.
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
 * FIG. 2 — University of Idaho website.
 *
 * The fact worth drawing is the publishing boundary: Sitecore holds authored
 * content, while a separate Next.js application renders it for delivery on
 * Azure. The checked-in evidence inventory is
 * `docs/design/uidaho-publishing-parts.md`.
 */
export const PlateUIdaho = () => (
  <PlateFrame>
    <rect className="fig-box" x={8} y={55} width={86} height={60} />
    <text className="fig-box-label" x={51} y={80}>
      Sitecore
    </text>
    <text className="fig-box-sub" x={51} y={98}>
      authored content
    </text>

    <line className="fig-flow" x1={94} y1={85} x2={108} y2={85} />
    <polygon className="fig-arrowhead" points="117,85 108,80 108,90" />

    <rect className="fig-box" x={117} y={55} width={86} height={60} />
    <text className="fig-box-label" x={160} y={80}>
      Next.js
    </text>
    <text className="fig-box-sub" x={160} y={98}>
      renderer
    </text>

    <line className="fig-flow" x1={203} y1={85} x2={217} y2={85} />
    <polygon className="fig-arrowhead" points="226,85 217,80 217,90" />

    <rect className="fig-box" x={226} y={55} width={86} height={60} />
    <text className="fig-box-label" x={269} y={80}>
      Azure
    </text>
    <text className="fig-box-sub" x={269} y={98}>
      delivery
    </text>
  </PlateFrame>
);

/**
 * FIG. 3 — MyUI.
 *
 * The fact worth drawing is containment: the custom React components sit
 * inside the Ellucian Experience shell. The host platform is not a system the
 * university built or owns. The checked-in evidence inventory is
 * `docs/design/myui-components-parts.md`.
 */
export const PlateMyUI = () => (
  <PlateFrame>
    <rect
      className="fig-box"
      data-part="ellucian-shell"
      x={8}
      y={20}
      width={304}
      height={130}
    />
    <text className="fig-box-label" x={160} y={45}>
      Ellucian Experience
    </text>

    <rect
      className="fig-box"
      data-part="custom-react-component-layer"
      x={28}
      y={72}
      width={264}
      height={54}
    />
    <text className="fig-box-sub" x={160} y={102}>
      Custom React components
    </text>
  </PlateFrame>
);

/**
 * FIG. 4 — AI data extraction research.
 *
 * The fact worth drawing is the shape of the feasibility spike: source pages
 * pass through LangGraph extraction into structured profiles, then the result
 * is checked. The plate intentionally states no metric or production outcome.
 * The checked-in evidence inventory is
 * `docs/design/profile-extraction-parts.md`.
 */
export const PlateProfileExtractor = () => (
  <PlateFrame>
    <text className="fig-zone" x={10} y={28}>
      Feasibility question
    </text>

    <rect
      className="fig-box"
      data-part="source-pages"
      x={8}
      y={61}
      width={62}
      height={60}
    />
    <text className="fig-box-label" x={39} y={86}>
      Source
    </text>
    <text className="fig-box-sub" x={39} y={104}>
      pages
    </text>

    <line className="fig-flow" x1={70} y1={91} x2={77} y2={91} />
    <polygon className="fig-arrowhead" points="84,91 76,86 76,96" />

    <rect
      className="fig-box"
      data-part="langgraph-extraction"
      x={84}
      y={61}
      width={68}
      height={60}
    />
    <text className="fig-box-label" x={118} y={86}>
      LangGraph
    </text>
    <text className="fig-box-sub" x={118} y={104}>
      extraction
    </text>

    <line className="fig-flow" x1={152} y1={91} x2={159} y2={91} />
    <polygon className="fig-arrowhead" points="166,91 158,86 158,96" />

    <rect
      className="fig-box"
      data-part="structured-profiles"
      x={166}
      y={61}
      width={68}
      height={60}
    />
    <text className="fig-box-label" x={200} y={86}>
      Structured
    </text>
    <text className="fig-box-sub" x={200} y={104}>
      profiles
    </text>

    <line className="fig-flow" x1={234} y1={91} x2={236} y2={91} />
    <polygon className="fig-arrowhead" points="243,91 235,86 235,96" />

    <rect
      className="fig-box"
      data-part="verification"
      x={243}
      y={61}
      width={64}
      height={60}
    />
    <text className="fig-box-label" x={275} y={86}>
      Verification
    </text>
    <text className="fig-box-sub" x={275} y={104}>
      source check
    </text>
  </PlateFrame>
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
