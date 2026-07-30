import type { CSSProperties, ReactNode } from "react";

import type { PartPointer } from "@/components/figures/parts";

/**
 * FIG. 1, drawn as detail views.
 *
 * The third geometry the deconstruction needs, and the reason it can exist at
 * all. A sticky figure beside scrolling prose gets roughly half a viewport,
 * which the wide plate fits at desktop and the tall plate cannot fit on a phone
 * at any legible size. So this plate does what a figure sheet does anyway: it
 * draws details, three or four parts at a time, at the scale those parts need.
 *
 * One frame, 440x320, holds six compositions. Each is a real view of the same
 * assembly — the entry chain, the stage chain, the two gates, the return, the
 * guarded write, the control plane — and only one is shown at a time. Keeping
 * them in one <svg> means a state change is opacity and transform on a <g>,
 * never a remount and never a layout pass.
 *
 * Every mark traces to `docs/design/loopworks-parts.md`. The detail views state
 * a few things the assembled plate has no room for — the three admission
 * outcomes, each gate's required evidence, the implementer's sandbox, the six
 * kinds of state the control plane holds — and each of those is in that file.
 * Nothing here is a new claim.
 *
 * Type is set in user units the way the tall plate's is, because this frame is
 * the same 440 wide and lands at the same rendered scale on a phone.
 */

/** See the wide plate. Structural, because it is spread onto a circle too. */
type PartProps = {
  "data-active"?: true;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
};

/**
 * The six detail views, in the order the case study's prose reaches them.
 *
 * `parts` is what the view exposes: numeralled, pointable, readable. The brief's
 * section map gives the return path its own state carrying only 62, but a return
 * path cannot be drawn without the stages it routes between, and drawing those
 * stages unnumbered while they carry numerals two states earlier would be worse
 * than numbering them. So that view exposes the four stages as well, with 62 as
 * its subject.
 */
export const detailViews = [
  {
    key: "admission",
    caption: "Admission",
    parts: [10, 12, 14],
    note: "Nothing reaches a loop before a signature, an idempotency claim, and a run lease have all passed. Admission ends in one of three recorded outcomes.",
  },
  {
    key: "stages",
    caption: "The development loop",
    parts: [20, 30, 40, 50, 60],
    note: "Eight stages declared as a stable sequence. Each names the actor that performs it; five carry reference numerals.",
  },
  {
    key: "gates",
    caption: "The two gates",
    parts: [22, 70],
    note: "Both gates are required, both list the maintainer as reviewer, and both declare a bypass policy of none.",
  },
  {
    key: "return",
    caption: "The return path",
    parts: [30, 40, 50, 60, 62],
    note: "Code review recommends a route and only the root applies it. A cycle reuses its rows and keeps the approved plan.",
  },
  {
    key: "write",
    caption: "Isolation and the write",
    parts: [40, 70, 80],
    note: "The implementer works with deny-all egress. One write to GitHub in the whole loop, and it is guarded.",
  },
  {
    key: "control",
    caption: "The control plane",
    parts: [90],
    note: "Eighteen durable tables. The run is reconstructable from state rather than from logs.",
  },
] as const;

export type DetailViewKey = (typeof detailViews)[number]["key"];

const CALLOUT_X = 28;
const BUBBLE_R = 16;
const BOX_X = 66;
const BOX_W = 300;
const CHAIN = BOX_X + BOX_W / 2;
const BOX_H = 44;

/** The three recorded ends of admission. A refusal is as visible as an accept. */
const ADMISSION_OUTCOMES = [
  { x: 96, label: "Dispatched" },
  { x: 216, label: "Deferred" },
  { x: 336, label: "Lease contention" },
] as const;

/** A reference numeral in its bubble, on a leader line to the part it marks. */
const Callout = ({
  numeral,
  x = CALLOUT_X,
  y,
  leaderTo,
  ...part
}: {
  numeral: number;
  x?: number;
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
    <circle className="fig-bubble" cx={x} cy={y} r={BUBBLE_R} />
    <text className="fig-numeral" x={x} y={y} dy="0.36em">
      {numeral}
    </text>
  </g>
);

/** Gate valve. The drafting symbol for a thing that stops flow until opened. */
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
  dir: "down" | "left" | "right";
}) => {
  const points =
    dir === "down"
      ? `${x},${y} ${x - 6},${y - 10} ${x + 6},${y - 10}`
      : dir === "left"
        ? `${x},${y} ${x + 10},${y - 6} ${x + 10},${y + 6}`
        : `${x},${y} ${x - 10},${y - 6} ${x - 10},${y + 6}`;
  return <polygon className="fig-arrowhead" points={points} />;
};

/**
 * A part box at detail scale. The name sits at the left of the box and the
 * actor at the right, on one line: at this scale a stacked pair would need a
 * taller box than five of them can share a 320-unit frame.
 */
const Box = ({
  x = BOX_X,
  y,
  w = BOX_W,
  h = BOX_H,
  name,
  actor,
  ...part
}: {
  x?: number;
  y: number;
  w?: number;
  h?: number;
  name: string;
  actor?: string;
} & PartProps) => (
  <g className="fig-part" {...part}>
    <rect className="fig-box" x={x} y={y} width={w} height={h} />
    <text className="fig-box-label fig-name" x={x + 14} y={y + h / 2 + 7}>
      {name}
    </text>
    {actor && (
      <text className="fig-box-sub fig-value" x={x + w - 14} y={y + h / 2 + 5}>
        {actor}
      </text>
    )}
  </g>
);

/** A note on the drawing: subordinate lettering, set from the left. */
const Note = ({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) => (
  <text className="fig-box-sub fig-name" x={x} y={y}>
    {children}
  </text>
);

/**
 * Break line. A detail view shows part of a longer run, so where the flow
 * continues off the view it is cut rather than drawn to the frame edge.
 */
const Break = ({ x, y }: { x: number; y: number }) => (
  <>
    <line
      className="fig-leader"
      x1={x - 11}
      y1={y + 7}
      x2={x + 11}
      y2={y - 3}
    />
    <line
      className="fig-leader"
      x1={x - 11}
      y1={y + 17}
      x2={x + 11}
      y2={y + 7}
    />
  </>
);

/**
 * One beat of a view's arrival. `i` is its place in the order; the stylesheet
 * turns that into a transition delay, so the parts of a view lift into place
 * along their leader lines one after another rather than the whole view sliding
 * in as a single plate.
 */
const Lift = ({ i, children }: { i: number; children: ReactNode }) => (
  <g className="fig-lift" style={{ "--fig-i": i } as CSSProperties}>
    {children}
  </g>
);

const DeliveryLoopDetail = ({
  className,
  shown,
  active,
  onPoint,
  onTake,
}: {
  className?: string;
  /** Which detail view is on the plate, by key. */
  shown: DetailViewKey;
  active: number | null;
} & PartPointer) => {
  const part = (numeral: number): PartProps => ({
    "data-active": active === numeral || undefined,
    onPointerEnter: onPoint && (() => onPoint(numeral)),
    onPointerLeave: onPoint && (() => onPoint(null)),
    onClick: onTake && (() => onTake(numeral)),
  });

  /* ---- Admission: the entry chain, and the three outcomes it ends in ---- */
  const admission = (
    <>
      <Lift i={0}>
        <text className="fig-zone fig-name" x={BOX_X} y={22}>
          GitHub
        </text>
        <Box y={32} name="Issue" actor="agent-ready" {...part(10)} />
        <Callout numeral={10} y={54} leaderTo={[BOX_X, 54]} {...part(10)} />
      </Lift>
      <Lift i={1}>
        <line className="fig-boundary" x1={0} y1={100} x2={440} y2={100} />
        <text className="fig-zone fig-name" x={BOX_X} y={122}>
          Loopworks
        </text>
      </Lift>
      <Lift i={2}>
        <line className="fig-flow" x1={CHAIN} y1={76} x2={CHAIN} y2={100} />
        <circle
          className="fig-node fig-part"
          {...part(12)}
          cx={CHAIN}
          cy={100}
          r={6}
        />
        <Callout
          numeral={12}
          y={100}
          leaderTo={[CHAIN - 12, 100]}
          {...part(12)}
        />
        <Note x={CHAIN + 24} y={96}>
          HMAC verified
        </Note>
      </Lift>
      <Lift i={3}>
        <line className="fig-flow" x1={CHAIN} y1={106} x2={CHAIN} y2={158} />
        <Gate x={CHAIN} y={172} {...part(14)} />
        <Callout
          numeral={14}
          y={172}
          leaderTo={[CHAIN - 18, 172]}
          {...part(14)}
        />
        <Note x={CHAIN + 24} y={168}>
          Idempotency claim
        </Note>
        <Note x={CHAIN + 24} y={186}>
          Run lease, 1 in flight
        </Note>
      </Lift>
      <Lift i={4}>
        <line className="fig-flow" x1={CHAIN} y1={186} x2={CHAIN} y2={242} />
        {ADMISSION_OUTCOMES.map(outcome => (
          <g key={outcome.label}>
            <line
              className="fig-flow"
              x1={CHAIN}
              y1={242}
              x2={outcome.x}
              y2={266}
            />
            <Arrow x={outcome.x} y={276} dir="down" />
            <text className="fig-box-sub" x={outcome.x} y={296}>
              {outcome.label}
            </text>
          </g>
        ))}
      </Lift>
    </>
  );

  /* ---- The stage chain, five of the eight, the five that carry numerals ---- */
  const STAGE_ROWS = [
    { numeral: 20, name: "Planning", actor: "planning-agent" },
    { numeral: 30, name: "Test writing", actor: "test-writer" },
    { numeral: 40, name: "Development", actor: "implementer" },
    { numeral: 50, name: "Validation", actor: "ci-runner" },
    { numeral: 60, name: "Code review", actor: "validation-reviewer" },
  ] as const;

  /* Five of the eight stages carry numerals; the last three are drawn in the
     assembled plate but have no entry in the numeral table, so the chain is cut
     after code review and the remainder named rather than invented. */
  const STAGE_H = 40;
  const stageY = (i: number) => 2 + i * 56;

  const stages = (
    <>
      {STAGE_ROWS.map((row, i) => {
        const y = stageY(i);
        return (
          <Lift key={row.numeral} i={i}>
            <Box
              y={y}
              h={STAGE_H}
              name={row.name}
              actor={row.actor}
              {...part(row.numeral)}
            />
            <Callout
              numeral={row.numeral}
              y={y + STAGE_H / 2}
              leaderTo={[BOX_X, y + STAGE_H / 2]}
              {...part(row.numeral)}
            />
            {i < STAGE_ROWS.length - 1 && (
              <>
                <line
                  className="fig-flow"
                  x1={CHAIN}
                  y1={y + STAGE_H}
                  x2={CHAIN}
                  y2={y + 46}
                />
                <Arrow x={CHAIN} y={y + 56} dir="down" />
              </>
            )}
          </Lift>
        );
      })}
      <Lift i={STAGE_ROWS.length}>
        <line
          className="fig-flow"
          x1={CHAIN}
          y1={stageY(4) + STAGE_H}
          x2={CHAIN}
          y2={282}
        />
        <Arrow x={CHAIN} y={292} dir="down" />
        <Note x={BOX_X} y={312}>
          Then commit · PR · done
        </Note>
      </Lift>
    </>
  );

  /* ---- The two gates, with the evidence each one requires ---- */
  const GATE_X = 150;
  const gate = ({
    i,
    y,
    before,
    after,
    numeral,
    notes,
  }: {
    i: number;
    y: number;
    before: string;
    after: string;
    numeral: number;
    notes: readonly string[];
  }) => (
    <Lift key={numeral} i={i}>
      <text className="fig-box-sub" x={GATE_X} y={y - 38}>
        {before}
      </text>
      <line
        className="fig-flow"
        x1={GATE_X}
        y1={y - 30}
        x2={GATE_X}
        y2={y - 16}
      />
      <Gate x={GATE_X} y={y} {...part(numeral)} />
      <line
        className="fig-flow"
        x1={GATE_X}
        y1={y + 16}
        x2={GATE_X}
        y2={y + 32}
      />
      <Arrow x={GATE_X} y={y + 42} dir="down" />
      <text className="fig-box-sub" x={GATE_X} y={y + 64}>
        {after}
      </text>
      <Callout
        numeral={numeral}
        y={y}
        leaderTo={[GATE_X - 18, y]}
        {...part(numeral)}
      />
      {notes.map((note, line) => (
        <Note key={note} x={GATE_X + 36} y={y - 10 + line * 18}>
          {note}
        </Note>
      ))}
    </Lift>
  );

  const gates = (
    <>
      {gate({
        i: 0,
        y: 62,
        before: "Planning",
        after: "Test writing",
        numeral: 22,
        notes: ["plan-review", "Evidence · plan", "Bypass · none"],
      })}
      {gate({
        i: 1,
        y: 220,
        before: "PR",
        after: "Draft PR",
        numeral: 70,
        notes: [
          "external-write-review",
          "Evidence · diff summary,",
          "validation report",
          "Bypass · none",
        ],
      })}
    </>
  );

  /* ---- The return path, and the stages it routes between ---- */
  /* The stage boxes give up their actor column here: this view has to leave a
     lane for the return line, and "code review" plus "validation-reviewer" does
     not fit the narrower box. The actors are stated in the stage view and in the
     numeral table, and this view's subject is the route, not who runs it. */
  const RETURN_W = 240;
  const RETURN_R = BOX_X + RETURN_W;
  const RETURN_CHAIN = BOX_X + RETURN_W / 2;
  const RETURN_X = 336;
  const RETURN_ROWS = [
    { numeral: 30, name: "Test writing" },
    { numeral: 40, name: "Development" },
    { numeral: 50, name: "Validation" },
    { numeral: 60, name: "Code review" },
  ] as const;

  const returnPath = (
    <>
      {RETURN_ROWS.map((row, i) => {
        const y = 20 + i * 72;
        return (
          <Lift key={row.numeral} i={i}>
            <Box y={y} w={RETURN_W} name={row.name} {...part(row.numeral)} />
            <Callout
              numeral={row.numeral}
              y={y + BOX_H / 2}
              leaderTo={[BOX_X, y + BOX_H / 2]}
              {...part(row.numeral)}
            />
            {i < RETURN_ROWS.length - 1 && (
              <>
                <line
                  className="fig-flow"
                  x1={RETURN_CHAIN}
                  y1={y + BOX_H}
                  x2={RETURN_CHAIN}
                  y2={y + 62}
                />
                <Arrow x={RETURN_CHAIN} y={y + 72} dir="down" />
              </>
            )}
          </Lift>
        );
      })}
      {/* The subject of this view, and the last thing to arrive on it. */}
      <Lift i={RETURN_ROWS.length}>
        <g className="fig-part" {...part(62)}>
          <path
            className="fig-return"
            d={`M ${RETURN_R} 258 H ${RETURN_X} V 42 H ${RETURN_R + 10}`}
          />
          <line
            className="fig-return"
            x1={RETURN_X}
            y1={114}
            x2={RETURN_R + 10}
            y2={114}
          />
          <Arrow x={RETURN_R} y={42} dir="left" />
          <Arrow x={RETURN_R} y={114} dir="left" />
          <Note x={BOX_X} y={306}>
            Rows reused · attempts +1 · plan kept
          </Note>
        </g>
        <Callout
          numeral={62}
          x={406}
          y={180}
          leaderTo={[RETURN_X, 180]}
          {...part(62)}
        />
      </Lift>
    </>
  );

  /* ---- Isolation, and the one guarded write out ---- */
  const write = (
    <>
      <Lift i={0}>
        {/* The sandbox is a boundary the way the GitHub line is: a zone divider,
            not the outline of a part, so it takes the centre-line weight. */}
        <rect
          className="fig-boundary"
          x={50}
          y={14}
          width={336}
          height={88}
          fill="none"
        />
        <Note x={60} y={34}>
          Sandbox · deny-all egress · commit-pinned
        </Note>
        <Box y={44} name="Development" actor="implementer" {...part(40)} />
        <Callout numeral={40} y={66} leaderTo={[BOX_X, 66]} {...part(40)} />
      </Lift>
      <Lift i={1}>
        <line className="fig-flow" x1={CHAIN} y1={88} x2={CHAIN} y2={124} />
        <Break x={CHAIN} y={130} />
        <line className="fig-flow" x1={CHAIN} y1={148} x2={CHAIN} y2={178} />
        <Note x={CHAIN + 24} y={140}>
          Validation, review, commit
        </Note>
      </Lift>
      <Lift i={2}>
        <Gate x={CHAIN} y={192} {...part(70)} />
        <Callout
          numeral={70}
          y={192}
          leaderTo={[CHAIN - 18, 192]}
          {...part(70)}
        />
        <Note x={CHAIN + 24} y={196}>
          The only GitHub write
        </Note>
      </Lift>
      <Lift i={3}>
        <line className="fig-flow" x1={CHAIN} y1={206} x2={CHAIN} y2={232} />
        <Arrow x={CHAIN} y={242} dir="down" />
        <line className="fig-boundary" x1={0} y1={252} x2={440} y2={252} />
        <text className="fig-zone fig-name" x={BOX_X} y={272}>
          GitHub
        </text>
        <Box y={276} h={40} name="Draft PR" actor="run branch" {...part(80)} />
        <Callout numeral={80} y={296} leaderTo={[BOX_X, 296]} {...part(80)} />
      </Lift>
    </>
  );

  /* ---- The control plane, cut open ---- */
  const CELLS = [
    "Runs",
    "Steps",
    "Artifacts",
    "Approvals",
    "Leases",
    "Events",
  ] as const;

  const control = (
    <>
      <Lift i={0}>
        <Note x={56} y={30}>
          Every stage writes here
        </Note>
        {/* One leader per declared stage. Eight, because eight is how many
            there are, and the comb would otherwise be a guess. */}
        {Array.from({ length: 8 }, (_, i) => 76 + i * 40).map(x => (
          <line key={x} className="fig-leader" x1={x} y1={48} x2={x} y2={104} />
        ))}
      </Lift>
      <Lift i={1}>
        <g className="fig-part" {...part(90)}>
          <rect
            x={56}
            y={104}
            width={348}
            height={136}
            fill="url(#fig-hatch-detail)"
          />
          <rect className="fig-box" x={56} y={104} width={348} height={136} />
          {CELLS.map((cell, i) => {
            const x = 56 + (i % 3) * 122;
            const y = 120 + Math.floor(i / 3) * 60;
            return (
              <g key={cell}>
                {/* Ground under each cell, so the section hatching reads in the
                    gaps between them rather than behind their lettering. */}
                <rect
                  className="fig-plate-reserve"
                  x={x}
                  y={y}
                  width={104}
                  height={44}
                />
                <rect className="fig-box" x={x} y={y} width={104} height={44} />
                <text className="fig-box-sub" x={x + 52} y={y + 27}>
                  {cell}
                </text>
              </g>
            );
          })}
          <text className="fig-box-label fig-name" x={56} y={268}>
            Control plane
          </text>
          <Note x={56} y={292}>
            18 durable tables · 14 carry loop state
          </Note>
        </g>
        <Callout numeral={90} y={172} leaderTo={[56, 172]} {...part(90)} />
      </Lift>
    </>
  );

  const VIEWS: Record<DetailViewKey, ReactNode> = {
    admission,
    stages,
    gates,
    return: returnPath,
    write,
    control,
  };

  return (
    <svg
      className={`fig-detail ${className ?? ""}`}
      viewBox="0 0 440 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="fig-hatch-detail"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="fig-hatch-line" x1="0" y1="0" x2="0" y2="8" />
        </pattern>
      </defs>

      {detailViews.map(({ key }) => (
        <g
          key={key}
          className="fig-detail-view"
          data-view={key}
          data-shown={key === shown || undefined}
        >
          {VIEWS[key]}
        </g>
      ))}
    </svg>
  );
};

export default DeliveryLoopDetail;
