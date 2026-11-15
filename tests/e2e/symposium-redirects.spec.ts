import { expect, test } from "@playwright/test";

const companion = "https://claude.ai/artifact/7gmuhExTHzYgXrMZuVp1KR";

// Every symposium short link, pinned to its exact destination. The two slides
// links are linked from the index sheet's talks schedule (ADR 0005); the first
// three predate it and must not move with them.
const shortLinks = [
  { source: "/symposium", destination: companion },
  { source: "/symposium/delegate", destination: `${companion}#delegate` },
  { source: "/symposium/evaluate", destination: `${companion}#evaluate` },
  {
    source: "/symposium/evaluate/slides",
    destination: "https://claude.ai/artifact/4KPbXSGoGRzU6gneb8guMm",
  },
  {
    source: "/symposium/delegate/slides",
    destination: "https://claude.ai/artifact/GTmfzxdw7PemGBBF3B7usF",
  },
] as const;

test.describe("symposium short links", () => {
  for (const { source, destination } of shortLinks) {
    // Asserted at the redirect itself and never followed: following it would
    // make the suite depend on another origin being reachable.
    test(`${source} redirects temporarily to its destination`, async ({
      request,
    }) => {
      const response = await request.get(source, { maxRedirects: 0 });

      // Temporary, so the destination can move without a cached permanent
      // redirect outliving it.
      expect(response.status()).toBe(307);
      expect(response.headers().location).toBe(destination);
    });
  }
});
