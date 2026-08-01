import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

const wcag21AaTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

type AxeAssertionOptions = {
  include?: string;
};

/**
 * Fail on every axe-detectable WCAG 2.1 A/AA violation.
 *
 * The failure payload deliberately contains only stable rule IDs and affected
 * targets. Explanatory prose from axe is useful to a person but is not a test
 * contract and must never become an allowlist key.
 */
export const expectNoWcag21AaViolations = async (
  page: Page,
  options: AxeAssertionOptions = {},
) => {
  const builder = new AxeBuilder({ page }).withTags(wcag21AaTags);
  if (options.include) builder.include(options.include);

  const { violations } = await builder.analyze();
  const report = violations
    .map(violation => ({
      id: violation.id,
      targets: violation.nodes
        .map(node => node.target)
        .sort((left, right) =>
          JSON.stringify(left).localeCompare(JSON.stringify(right)),
        ),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));

  expect(
    report,
    `Axe found WCAG 2.1 A/AA violations:\n${JSON.stringify(report, null, 2)}`,
  ).toEqual([]);
};
