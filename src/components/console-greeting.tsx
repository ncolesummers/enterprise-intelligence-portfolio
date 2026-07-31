"use client";

import { useEffect } from "react";

/**
 * A note in the console for anyone who opens it.
 *
 * Colours are read from the live theme rather than hard-coded: the incumbent
 * pair were a blue belonging to neither medium and a literal `gray`, the only
 * colours in the codebase outside the token layer. Monospace is right here for
 * the same reason it is right in a code block — this is a console.
 *
 * The copy states what the site is and where its source is. It previously
 * opened "Built with craft by", which is the site praising itself to a reader
 * who came to check its work.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const line = styles.getPropertyValue("--line").trim();
    const soft = styles.getPropertyValue("--line-soft").trim();

    console.log(
      "%cA set of engineering figure sheets. Every figure was drawn from the source it describes.",
      `color: ${line}; font-family: monospace;`,
    );
    console.log(
      "%cSource: github.com/ncolesummers/enterprise-intelligence-portfolio",
      `color: ${soft}; font-family: monospace;`,
    );
  }, []);

  return null;
}
