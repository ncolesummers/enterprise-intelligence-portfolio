"use client";

import { useEffect } from "react";

export function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%cBuilt with craft by N. Cole Summers",
      "color: oklch(0.62 0.22 240); font-size: 14px; font-family: monospace;",
    );
    console.log(
      "%cExplore the code: github.com/ncolesummers",
      "color: gray; font-size: 12px; font-family: monospace;",
    );
  }, []);

  return null;
}
