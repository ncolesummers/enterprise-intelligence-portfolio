import { expect, type Locator, type Page } from "@playwright/test";

export interface RuntimeHealth {
  consoleErrors: string[];
  pageErrors: string[];
  sameOriginFailures: string[];
}

// Engines disagree on how they render the status text in this message:
// Chromium and Firefox leave the parentheses empty, WebKit fills in the reason
// phrase ("403 (Forbidden)"). Match the shape rather than one engine's exact
// wording, or the allowlist silently stops applying on WebKit.
//
// Ignoring every 403 here is safe because it only suppresses console noise.
// A same-origin 403 is still caught independently by the response handler in
// observeRuntimeHealth and surfaces as a sameOriginFailure.
const IGNORABLE_EXTERNAL_403 =
  /^Failed to load resource: the server responded with a status of 403 \(.*\)$/;

export function isIgnorableExternalResourceConsoleError(text: string) {
  return IGNORABLE_EXTERNAL_403.test(text);
}

export function observeRuntimeHealth(
  page: Page,
  baseURL: string,
): RuntimeHealth {
  const origin = new URL(baseURL).origin;
  const health: RuntimeHealth = {
    consoleErrors: [],
    pageErrors: [],
    sameOriginFailures: [],
  };
  const isSameOrigin = (url: string) => new URL(url).origin === origin;

  page.on("console", message => {
    if (message.type() !== "error") return;

    const text = message.text();
    // Browser engines report blocked third-party analytics as a URL-less
    // console error. Same-origin HTTP failures are checked independently below.
    if (isIgnorableExternalResourceConsoleError(text)) {
      return;
    }
    health.consoleErrors.push(text);
  });
  page.on("pageerror", error => health.pageErrors.push(error.message));
  page.on("response", response => {
    if (isSameOrigin(response.url()) && response.status() >= 400) {
      health.sameOriginFailures.push(
        `${response.status()} ${response.request().method()} ${response.url()}`,
      );
    }
  });
  page.on("requestfailed", request => {
    if (!isSameOrigin(request.url())) return;

    const requestUrl = new URL(request.url());
    const isCancelledNextRscFetch =
      request.resourceType() === "fetch" &&
      requestUrl.searchParams.has("_rsc") &&
      request.failure()?.errorText === "net::ERR_ABORTED";
    if (isCancelledNextRscFetch) return;

    health.sameOriginFailures.push(
      `FAILED ${request.method()} ${request.url()}: ${request.failure()?.errorText ?? "unknown error"}`,
    );
  });

  return health;
}

export function expectRuntimeHealthClean(health: RuntimeHealth) {
  expect(health.consoleErrors).toEqual([]);
  expect(health.pageErrors).toEqual([]);
  expect(health.sameOriginFailures).toEqual([]);
}

export async function expectReducedMotionTransition(locator: Locator) {
  const durationSeconds = await locator.evaluate(element =>
    Number.parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(durationSeconds).toBeLessThanOrEqual(0.001);
}
