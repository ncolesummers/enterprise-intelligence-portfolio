/**
 * FIG. 1 reference numerals.
 *
 * Every part here was verified against the Loopworks source at commit 9727357.
 * The evidence for each is recorded in `docs/design/loopworks-parts.md`. A
 * numeral may not be added without a corresponding entry there — a drawing
 * that invents components fails both DESIGN.md and PRODUCT.md's evidence rules.
 *
 * Numbering follows drawing convention: tens for the major parts of the
 * assembly, units for a subordinate feature of the part above it.
 */

export type Part = {
  /** Reference numeral, as it appears in the callout bubble. */
  numeral: number;
  /** Short name, used as the control's accessible label. */
  name: string;
  /** What the part actually does. No claim here is unsupported by source. */
  note: string;
};

/**
 * How a plate hands pointer interest back to the figure.
 *
 * A drawn part points at the same single active value its numeral does. The
 * plates stay `aria-hidden` and unfocusable, so this is a pointer affordance
 * layered on the numeral table rather than a second way to reach a part: a
 * keyboard or a screen reader still goes through the table, which is the only
 * route that was ever announced.
 */
export type PartPointer = {
  /** Preview a part, or clear the preview with null. */
  onPoint?: (numeral: number | null) => void;
  /** Pin a part, or unpin it when it is already pinned. */
  onTake?: (numeral: number) => void;
};

export const parts: readonly Part[] = [
  {
    numeral: 10,
    name: "GitHub issue",
    note: "Labeled agent-ready. GitHub stays the source of truth for intent; the loop never becomes a second backlog.",
  },
  {
    numeral: 12,
    name: "Signed webhook",
    note: "A delivery is rejected outright unless its HMAC signature verifies.",
  },
  {
    numeral: 14,
    name: "Admission guard",
    note: "An idempotency claim on the delivery id, then a run lease. One run in flight per repository, so a re-delivery cannot start a second.",
  },
  {
    numeral: 20,
    name: "Planning",
    note: "The planning agent reads the issue and emits a plan whose acceptance criteria are mapped to validation gates.",
  },
  {
    numeral: 22,
    name: "Plan review",
    note: "A maintainer approves the plan before any code is written. Bypass policy is none.",
  },
  {
    numeral: 30,
    name: "Test writing",
    note: "Failing tests come first. The stage advances only when every acceptance criterion has expected assertion-failure evidence. A crash or a passing test does not qualify.",
  },
  {
    numeral: 40,
    name: "Development",
    note: "The implementer works in a commit-pinned sandbox with deny-all egress, reusing the exact test patch it was handed.",
  },
  {
    numeral: 50,
    name: "Validation",
    note: "Deterministic gates run before any model judgment. Work that touches the interface must carry screenshots at three viewports or validation fails closed.",
  },
  {
    numeral: 60,
    name: "Code review",
    note: "The reviewer reads the persisted evidence and emits typed findings. It recommends a route; it cannot apply one.",
  },
  {
    numeral: 62,
    name: "Return path",
    note: "Review can send the run back to development or to test writing. Rows are reused, attempts increment, and the approved plan is retained. This is the part that makes it a loop.",
  },
  {
    numeral: 70,
    name: "External-write review",
    note: "The second gate. Its recorded digest must match the commit bytes exactly, so an approval cannot be reused for different changes.",
  },
  {
    numeral: 80,
    name: "Draft pull request",
    note: "The only GitHub mutation in the loop, on a deterministic branch, opened as a draft for a human to take from there.",
  },
  {
    numeral: 90,
    name: "Control plane",
    note: "Runs, steps, artifacts, approvals, leases, and events. The durable state GitHub was never designed to hold.",
  },
];
