import { expect, test } from "@playwright/test";

import { isIgnorableExternalResourceConsoleError } from "../fixtures/runtime-health";

/**
 * The allowlist for blocked third-party requests used to compare against one
 * exact string, which silently stopped matching on WebKit and failed ~50 tests
 * with noise the fixture was written to ignore. These pin the phrasing each
 * engine actually emits.
 */
test.describe("runtime health: ignorable external 403", () => {
  test("ignores the 403 phrasing every engine emits", () => {
    // Chromium and Firefox leave the reason phrase empty.
    expect(
      isIgnorableExternalResourceConsoleError(
        "Failed to load resource: the server responded with a status of 403 ()",
      ),
    ).toBe(true);

    // WebKit fills it in. This is the case that regressed.
    expect(
      isIgnorableExternalResourceConsoleError(
        "Failed to load resource: the server responded with a status of 403 (Forbidden)",
      ),
    ).toBe(true);
  });

  test("still reports failures that are not an external 403", () => {
    for (const text of [
      "Failed to load resource: the server responded with a status of 404 ()",
      "Failed to load resource: the server responded with a status of 500 (Internal Server Error)",
      "Uncaught TypeError: undefined is not an object",
      "",
    ]) {
      expect(isIgnorableExternalResourceConsoleError(text)).toBe(false);
    }
  });
});
