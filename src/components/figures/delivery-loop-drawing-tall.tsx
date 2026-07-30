import type { PartPointer } from "@/components/figures/parts";

/**
 * FIG. 1, drawn tall.
 *
 * The same thirteen parts as the wide plate, re-laid for a narrow sheet: the
 * stages run down the page, the control plane becomes a column beside them
 * rather than a band beneath, and the loop closes into a second GitHub zone at
 * the foot instead of doubling back to the top.
 *
 * This is a second drawing rather than the wide one scaled down. A figure
 * reduced to a third of its width stops being legible, and an illegible
 * drawing on the surface most visitors arrive on is not a drawing at all.
 *
 * Parts take pointer interest here as they do on the wide plate. This is the
 * touch surface, so a tap on a drawn box pins its reading exactly as a tap on
 * its numeral does; nothing is focusable and the plate stays aria-hidden.
 */

/** See the wide plate. Structural, because it is spread onto a circle too. */
type PartProps = {
  "data-active"?: true;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
};

const STAGES = [
  {
    key: "planning",
    y: 172,
    numeral: 20,
    label: "Planning",
    actor: "planning-agent",
  },
  {
    key: "test-writing",
    y: 276,
    numeral: 30,
    label: "Test writing",
    actor: "test-writer",
  },
  {
    key: "development",
    y: 364,
    numeral: 40,
    label: "Development",
    actor: "implementer",
  },
  {
    key: "validation",
    y: 452,
    numeral: 50,
    label: "Validation",
    actor: "ci-runner",
  },
  {
    key: "code-review",
    y: 540,
    numeral: 60,
    label: "Code review",
    actor: "validation-reviewer",
  },
  {
    key: "commit",
    y: 628,
    numeral: null,
    label: "Commit",
    actor: "maintainer",
  },
  { key: "pr", y: 716, numeral: null, label: "PR", actor: "pr-preparer" },
  { key: "done", y: 804, numeral: null, label: "Done", actor: "loopworks" },
] as const;

const BOX_X = 110;
const BOX_W = 210;
const BOX_H = 58;
const BOX_R = BOX_X + BOX_W;
const COL_X = 372;
const RETURN_X = 348;
const EXIT_X = 88;
const CALLOUT_X = 30;
const CHAIN_X = BOX_X + BOX_W / 2;
const mid = (y: number) => y + BOX_H / 2;

const Callout = ({
  numeral,
  x,
  y,
  leaderTo,
  ...part
}: {
  numeral: number;
  x: number;
  y: number;
  leaderTo: [number, number];
} & PartProps) => (
  <g className="fig-callout" {...part}>
    <line
      className="fig-leader"
      x1={x}
      y1={y}
      x2={leaderTo[0]}
      y2={leaderTo[1]}
    />
    <circle className="fig-bubble" cx={x} cy={y} r={17} />
    <text className="fig-numeral" x={x} y={y} dy="0.36em">
      {numeral}
    </text>
  </g>
);

const Gate = ({ x, y, ...part }: { x: number; y: number } & PartProps) => (
  <g className="fig-gate" {...part}>
    <path
      d={`M ${x - 10} ${y - 10} L ${x + 10} ${y + 10} L ${x + 10} ${y - 10} L ${x - 10} ${y + 10} Z`}
    />
    <line x1={x} y1={y - 14} x2={x} y2={y + 14} />
  </g>
);

const Arrow = ({
  x,
  y,
  dir,
}: {
  x: number;
  y: number;
  dir: "down" | "right" | "left";
}) => {
  const points =
    dir === "down"
      ? `${x},${y} ${x - 6},${y - 10} ${x + 6},${y - 10}`
      : dir === "left"
        ? `${x},${y} ${x + 10},${y - 6} ${x + 10},${y + 6}`
        : `${x},${y} ${x - 10},${y - 6} ${x - 10},${y + 6}`;
  return <polygon className="fig-arrowhead" points={points} />;
};

const DeliveryLoopDrawingTall = ({
  className,
  active,
  onPoint,
  onTake,
}: {
  className?: string;
  active: number | null;
} & PartPointer) => {
  const on = (numeral: number | null) => numeral !== null && active === numeral;

  /** State and reporting for one part. Unnumbered stages stay inert. */
  const part = (numeral: number | null): PartProps =>
    numeral === null
      ? {}
      : {
          "data-active": on(numeral) || undefined,
          onPointerEnter: onPoint && (() => onPoint(numeral)),
          onPointerLeave: onPoint && (() => onPoint(null)),
          onClick: onTake && (() => onTake(numeral)),
        };

  return (
    <svg
      className={`fig-tall ${className ?? ""}`}
      viewBox="0 0 440 1000"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="fig-hatch-tall"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="fig-hatch-line" x1="0" y1="0" x2="0" y2="8" />
        </pattern>
      </defs>

      {/* ---- GitHub, above the boundary ---- */}
      <text className="fig-zone" x={BOX_X} y={16}>
        GitHub
      </text>
      <g className="fig-part" {...part(10)}>
        <rect className="fig-box" x={BOX_X} y={28} width={BOX_W} height={54} />
        <text className="fig-box-label" x={CHAIN_X} y={52}>
          Issue
        </text>
        <text className="fig-box-sub" x={CHAIN_X} y={71}>
          agent-ready
        </text>
      </g>

      <line className="fig-boundary" x1={0} y1={104} x2={440} y2={104} />
      <text className="fig-zone" x={BOX_X} y={126}>
        Loopworks
      </text>

      {/* ---- Entry ---- */}
      <line
        className="fig-flow"
        x1={CHAIN_X}
        y1={82}
        x2={CHAIN_X}
        y2={STAGES[0].y - 10}
      />
      <Arrow x={CHAIN_X} y={STAGES[0].y} dir="down" />
      <circle
        className="fig-node fig-part"
        {...part(12)}
        cx={CHAIN_X}
        cy={104}
        r={6}
      />
      <Gate x={CHAIN_X} y={140} {...part(14)} />

      {/* ---- Stages ---- */}
      {STAGES.map((stage, i) => (
        <g key={stage.key}>
          <g className="fig-part" {...part(stage.numeral)}>
            <rect
              className="fig-box"
              x={BOX_X}
              y={stage.y}
              width={BOX_W}
              height={BOX_H}
            />
            <text className="fig-box-label" x={CHAIN_X} y={stage.y + 26}>
              {stage.label}
            </text>
            <text className="fig-box-sub" x={CHAIN_X} y={stage.y + 45}>
              {stage.actor}
            </text>
          </g>
          {i < STAGES.length - 1 && (
            <>
              <line
                className="fig-flow"
                x1={CHAIN_X}
                y1={stage.y + BOX_H}
                x2={CHAIN_X}
                y2={STAGES[i + 1].y - 10}
              />
              <Arrow x={CHAIN_X} y={STAGES[i + 1].y} dir="down" />
            </>
          )}
          {/* Persists to the control plane column */}
          <line
            className="fig-leader"
            x1={BOX_R}
            y1={mid(stage.y)}
            x2={COL_X}
            y2={mid(stage.y)}
          />
        </g>
      ))}

      <Gate x={CHAIN_X} y={253} {...part(22)} />

      {/* ---- Return path, threaded between the stages and the column ---- */}
      <g className="fig-part" {...part(62)}>
        <path className="fig-return" d={`M ${BOX_R} 569 H ${RETURN_X} V 289`} />
        <line
          className="fig-return"
          x1={RETURN_X}
          y1={377}
          x2={BOX_R + 10}
          y2={377}
        />
        <line
          className="fig-return"
          x1={RETURN_X}
          y1={289}
          x2={BOX_R + 10}
          y2={289}
        />
        <Arrow x={BOX_R} y={377} dir="left" />
        <Arrow x={BOX_R} y={289} dir="left" />
      </g>

      {/* ---- Control plane, as a column ---- */}
      <g className="fig-part" {...part(90)}>
        <rect
          x={COL_X}
          y={172}
          width={64}
          height={690}
          fill="url(#fig-hatch-tall)"
        />
        <rect className="fig-box" x={COL_X} y={172} width={64} height={690} />
        <text
          className="fig-box-label"
          transform={`rotate(-90 ${COL_X + 32} 517)`}
          x={COL_X + 32}
          y={517}
        >
          Control plane
        </text>
      </g>

      {/* ---- Exit, down the left and back across the boundary ---- */}
      <path
        className="fig-flow"
        d={`M ${BOX_X} 745 H ${EXIT_X} V 951 H ${BOX_X - 10}`}
      />
      <Arrow x={BOX_X} y={951} dir="right" />
      <Gate x={EXIT_X} y={880} {...part(70)} />

      <line className="fig-boundary" x1={0} y1={896} x2={440} y2={896} />
      <text className="fig-zone" x={BOX_X} y={914}>
        GitHub
      </text>
      <g className="fig-part" {...part(80)}>
        <rect className="fig-box" x={BOX_X} y={924} width={BOX_W} height={54} />
        <text className="fig-box-label" x={CHAIN_X} y={948}>
          Draft PR
        </text>
        <text className="fig-box-sub" x={CHAIN_X} y={967}>
          run branch
        </text>
      </g>

      {/* ---- Reference numerals ---- */}
      <Callout
        numeral={10}
        x={CALLOUT_X}
        y={55}
        leaderTo={[BOX_X, 55]}
        {...part(10)}
      />
      <Callout
        numeral={12}
        x={CALLOUT_X}
        y={104}
        leaderTo={[CHAIN_X - 8, 104]}
        {...part(12)}
      />
      <Callout
        numeral={14}
        x={CALLOUT_X}
        y={140}
        leaderTo={[CHAIN_X - 12, 140]}
        {...part(14)}
      />
      <Callout
        numeral={22}
        x={CALLOUT_X}
        y={253}
        leaderTo={[CHAIN_X - 12, 253]}
        {...part(22)}
      />
      {STAGES.filter(stage => stage.numeral !== null).map(stage => (
        <Callout
          key={stage.key}
          numeral={stage.numeral as number}
          x={CALLOUT_X}
          y={stage.y + 16}
          leaderTo={[BOX_X, stage.y + 16]}
          {...part(stage.numeral)}
        />
      ))}
      <Callout
        numeral={62}
        x={RETURN_X}
        y={608}
        leaderTo={[RETURN_X, 587]}
        {...part(62)}
      />
      <Callout
        numeral={70}
        x={CALLOUT_X}
        y={880}
        leaderTo={[EXIT_X - 11, 880]}
        {...part(70)}
      />
      <Callout
        numeral={80}
        x={CALLOUT_X}
        y={951}
        leaderTo={[EXIT_X - 11, 951]}
        {...part(80)}
      />
      <Callout
        numeral={90}
        x={410}
        y={905}
        leaderTo={[410, 866]}
        {...part(90)}
      />
    </svg>
  );
};

export default DeliveryLoopDrawingTall;
