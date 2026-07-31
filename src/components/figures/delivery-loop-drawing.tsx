import type { PartPointer } from "@/components/figures/parts";

/**
 * FIG. 1 — the Loopworks delivery loop, drawn wide.
 *
 * The drawing is presentational. Its parts are named and made keyboard
 * reachable by the reference-numeral list that accompanies it, which is how a
 * figure sheet actually works: the plate carries the numerals, the table
 * carries the words. That split is also what keeps this accessible without
 * bolting focus handlers onto <path> elements.
 *
 * Pointing at a drawn part reads that part, exactly as pointing at its numeral
 * does. Nothing here is focusable and the plate stays aria-hidden, so this adds
 * a pointer route to a reading that was already reachable rather than moving
 * the meaning into the drawing.
 *
 * Stroke widths use non-scaling-stroke so the five-weight hierarchy survives
 * being scaled down. Without it, an object line at half scale is a hairline and
 * the weights stop distinguishing anything.
 *
 * Work enters from the left rather than dropping straight onto the first
 * stage, so the entry apparatus and the stage numerals do not share space.
 */

const STAGES = [
  {
    key: "planning",
    x: 130,
    numeral: 20,
    label: ["Planning"],
    actor: "planning-agent",
  },
  {
    key: "test-writing",
    x: 288,
    numeral: 30,
    label: ["Test", "writing"],
    actor: "test-writer",
  },
  {
    key: "development",
    x: 422,
    numeral: 40,
    label: ["Development"],
    actor: "implementer",
  },
  {
    key: "validation",
    x: 556,
    numeral: 50,
    label: ["Validation"],
    actor: "ci-runner",
  },
  {
    key: "code-review",
    x: 690,
    numeral: 60,
    label: ["Code", "review"],
    actor: "validation-reviewer",
  },
  {
    key: "commit",
    x: 824,
    numeral: null,
    label: ["Commit"],
    actor: "maintainer",
  },
  { key: "pr", x: 958, numeral: null, label: ["PR"], actor: "pr-preparer" },
  { key: "done", x: 1092, numeral: null, label: ["Done"], actor: "loopworks" },
] as const;

const BOX_W = 118;
const BOX_H = 64;
const ROW_Y = 206;
const ROW_MID = ROW_Y + BOX_H / 2;
const ROW_BOTTOM = ROW_Y + BOX_H;
const CP_Y = 372;
const RETURN_Y = 306;
const ENTRY_X = 94;
const EXIT_X = 1017;
const center = (x: number) => x + BOX_W / 2;

/**
 * What a part's group is handed: its active state and its pointer handlers.
 * Structural rather than `ComponentProps<"g">`, because the same bundle is
 * spread onto a bare circle as well as onto groups.
 */
type PartProps = {
  "data-active"?: true;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
};

/** A reference numeral in its bubble, on a leader line to the part it marks. */
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
    <circle className="fig-bubble" cx={x} cy={y} r={14} />
    <text className="fig-numeral" x={x} y={y} dy="0.36em">
      {numeral}
    </text>
  </g>
);

/** Gate valve. The drafting symbol for a thing that stops flow until opened. */
const Gate = ({ x, y, ...part }: { x: number; y: number } & PartProps) => (
  <g className="fig-gate" {...part}>
    <path
      d={`M ${x - 9} ${y - 9} L ${x + 9} ${y + 9} L ${x + 9} ${y - 9} L ${x - 9} ${y + 9} Z`}
    />
    <line x1={x} y1={y - 13} x2={x} y2={y + 13} />
  </g>
);

const Arrow = ({
  x,
  y,
  dir,
}: {
  x: number;
  y: number;
  dir: "up" | "down" | "right";
}) => {
  const points =
    dir === "up"
      ? `${x},${y} ${x - 5},${y + 9} ${x + 5},${y + 9}`
      : dir === "down"
        ? `${x},${y} ${x - 5},${y - 9} ${x + 5},${y - 9}`
        : `${x},${y} ${x - 9},${y - 5} ${x - 9},${y + 5}`;
  return <polygon className="fig-arrowhead" points={points} />;
};

const DeliveryLoopDrawing = ({
  className,
  active,
  onPoint,
  onTake,
}: {
  className?: string;
  active: number | null;
} & PartPointer) => {
  const on = (numeral: number | null) => numeral !== null && active === numeral;

  /**
   * Everything a part's group needs: its state, and its way of reporting.
   * Stages that carry no numeral get nothing, so an unnumbered box is inert
   * rather than pointing at a part the table does not list.
   */
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
      className={className}
      viewBox="0 0 1240 440"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="fig-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="fig-hatch-line" x1="0" y1="0" x2="0" y2="8" />
        </pattern>
      </defs>

      {/* ---- GitHub: outside the system, and stays that way ---- */}
      <text className="fig-zone" x={24} y={18}>
        GitHub
      </text>
      <g className="fig-part" {...part(10)}>
        <rect className="fig-box" x={24} y={30} width={140} height={54} />
        <text className="fig-box-label" x={94} y={53}>
          Issue
        </text>
        <text className="fig-box-sub" x={94} y={71}>
          agent-ready
        </text>
      </g>

      <g className="fig-part" {...part(80)}>
        <rect className="fig-box" x={947} y={30} width={140} height={54} />
        <text className="fig-box-label" x={EXIT_X} y={53}>
          Draft PR
        </text>
        <text className="fig-box-sub" x={EXIT_X} y={71}>
          run branch
        </text>
      </g>

      {/* The boundary. Centre line, because it is an axis of the drawing
          rather than the outline of a part. */}
      <line className="fig-boundary" x1={0} y1={114} x2={1240} y2={114} />
      <text className="fig-zone" x={24} y={136}>
        Loopworks
      </text>

      {/* ---- Entry: down the left margin, then into the first stage ---- */}
      <path
        className="fig-flow"
        d={`M ${ENTRY_X} 84 V ${ROW_MID} H ${STAGES[0].x - 9}`}
      />
      <Arrow x={STAGES[0].x} y={ROW_MID} dir="right" />
      <circle
        className="fig-node fig-part"
        {...part(12)}
        cx={ENTRY_X}
        cy={114}
        r={5}
      />
      <Gate x={ENTRY_X} y={176} {...part(14)} />

      {/* ---- Exit: PR stage up through the external-write gate ---- */}
      <line className="fig-flow" x1={EXIT_X} y1={ROW_Y} x2={EXIT_X} y2={93} />
      <Arrow x={EXIT_X} y={84} dir="up" />
      <Gate x={EXIT_X} y={166} {...part(70)} />

      {/* ---- The eight stages ---- */}
      {STAGES.map((stage, i) => {
        const cx = center(stage.x);
        return (
          <g key={stage.key}>
            <g className="fig-part" {...part(stage.numeral)}>
              <rect
                className="fig-box"
                x={stage.x}
                y={ROW_Y}
                width={BOX_W}
                height={BOX_H}
              />
              {stage.label.map((line, li) => (
                <text
                  key={line}
                  className="fig-box-label"
                  x={cx}
                  y={
                    stage.label.length === 1 ? ROW_Y + 31 : ROW_Y + 21 + li * 16
                  }
                >
                  {line}
                </text>
              ))}
              <text className="fig-box-sub" x={cx} y={ROW_Y + BOX_H - 12}>
                {stage.actor}
              </text>
            </g>
            {i < STAGES.length - 1 && (
              <>
                <line
                  className="fig-flow"
                  x1={stage.x + BOX_W}
                  y1={ROW_MID}
                  x2={STAGES[i + 1].x - 9}
                  y2={ROW_MID}
                />
                <Arrow x={STAGES[i + 1].x} y={ROW_MID} dir="right" />
              </>
            )}
            {/* Every stage persists to the control plane */}
            <line
              className="fig-leader"
              x1={cx}
              y1={ROW_BOTTOM}
              x2={cx}
              y2={CP_Y}
            />
          </g>
        );
      })}

      {/* Plan-review gate, in the widened gap after planning */}
      <Gate x={268} y={ROW_MID} {...part(22)} />

      {/* ---- Return path. Hidden line: real, but not the primary route ---- */}
      <g className="fig-part" {...part(62)}>
        <path
          className="fig-return"
          d={`M 749 ${ROW_BOTTOM} V ${RETURN_Y} H 347`}
        />
        <line
          className="fig-return"
          x1={481}
          y1={RETURN_Y}
          x2={481}
          y2={ROW_BOTTOM + 9}
        />
        <line
          className="fig-return"
          x1={347}
          y1={RETURN_Y}
          x2={347}
          y2={ROW_BOTTOM + 9}
        />
        <Arrow x={481} y={ROW_BOTTOM} dir="up" />
        <Arrow x={347} y={ROW_BOTTOM} dir="up" />
      </g>

      {/* ---- Control plane, cut open ---- */}
      <g className="fig-part" {...part(90)}>
        <rect
          x={130}
          y={CP_Y}
          width={1080}
          height={64}
          fill="url(#fig-hatch)"
        />
        <rect className="fig-box" x={130} y={CP_Y} width={1080} height={64} />
        <text className="fig-box-label" x={670} y={CP_Y + 27}>
          Control plane
        </text>
        <text className="fig-box-sub" x={670} y={CP_Y + 47}>
          runs · steps · artifacts · approvals · leases · events
        </text>
      </g>

      {/* ---- Reference numerals ---- */}
      <Callout numeral={10} x={196} y={57} leaderTo={[164, 57]} {...part(10)} />
      <Callout numeral={12} x={40} y={114} leaderTo={[85, 114]} {...part(12)} />
      <Callout numeral={14} x={40} y={176} leaderTo={[79, 176]} {...part(14)} />
      <Callout
        numeral={20}
        x={189}
        y={162}
        leaderTo={[189, ROW_Y - 4]}
        {...part(20)}
      />
      <Callout
        numeral={22}
        x={268}
        y={162}
        leaderTo={[268, ROW_MID - 15]}
        {...part(22)}
      />
      <Callout
        numeral={30}
        x={347}
        y={162}
        leaderTo={[347, ROW_Y - 4]}
        {...part(30)}
      />
      <Callout
        numeral={40}
        x={481}
        y={162}
        leaderTo={[481, ROW_Y - 4]}
        {...part(40)}
      />
      <Callout
        numeral={50}
        x={615}
        y={162}
        leaderTo={[615, ROW_Y - 4]}
        {...part(50)}
      />
      <Callout
        numeral={60}
        x={749}
        y={162}
        leaderTo={[749, ROW_Y - 4]}
        {...part(60)}
      />
      <Callout
        numeral={62}
        x={549}
        y={352}
        leaderTo={[549, RETURN_Y + 4]}
        {...part(62)}
      />
      <Callout
        numeral={70}
        x={1078}
        y={166}
        leaderTo={[1032, 166]}
        {...part(70)}
      />
      <Callout
        numeral={80}
        x={1119}
        y={57}
        leaderTo={[1087, 57]}
        {...part(80)}
      />
      <Callout
        numeral={90}
        x={60}
        y={CP_Y + 32}
        leaderTo={[116, CP_Y + 32]}
        {...part(90)}
      />
    </svg>
  );
};

export default DeliveryLoopDrawing;
