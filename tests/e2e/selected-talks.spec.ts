import { expect, test } from "@playwright/test";

// The fixed order and exact content from issue #54. A new row is one entry here
// and one in the component.
const talks = [
  {
    title: "Testing for Failure: Evaluating AI Research Workflows with Inspect",
    host: "U of I AI Symposium · Workshop · 35 min",
    materials: [
      { label: "Slides", href: "/symposium/evaluate/slides" },
      { label: "Companion", href: "/symposium/evaluate" },
      {
        label: "Repository",
        href: "https://github.com/ncolesummers/symposium-inspect-eval",
      },
    ],
  },
  {
    title: "Divide and Delegate: A Practical Introduction to AI Subagents",
    host: "U of I AI Symposium · Workshop · 35 min",
    materials: [
      { label: "Slides", href: "/symposium/delegate/slides" },
      { label: "Companion", href: "/symposium/delegate" },
    ],
  },
] as const;

test.describe("selected talks schedule", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("sits between the figure index and the off-sheet references", async ({
    page,
  }) => {
    const sectionIds = await page
      .locator("main > section[id]")
      .evaluateAll(sections => sections.map(section => section.id));

    expect(sectionIds).toEqual(["work", "talks", "contact"]);
    await expect(
      page.getByRole("region", { name: "Selected talks" }),
    ).toHaveAttribute("id", "talks");
  });

  test("lists the talks in their fixed order with their dates", async ({
    page,
  }) => {
    const section = page.locator("#talks");
    const rows = section.getByRole("article");

    await expect(rows).toHaveCount(talks.length);
    await expect(section.getByRole("heading", { level: 3 })).toHaveText(
      talks.map(talk => talk.title),
    );

    for (const [index, talk] of talks.entries()) {
      const row = rows.nth(index);
      await expect(row.getByText(talk.host, { exact: true })).toBeVisible();

      const date = row.locator("time");
      await expect(date).toHaveAttribute("datetime", "2026-10-29");
      await expect(date).toHaveText("29 Oct 2026");
    }
  });

  test("names every material by its label and its talk", async ({ page }) => {
    const rows = page.locator("#talks").getByRole("article");

    for (const [index, talk] of talks.entries()) {
      const links = rows.nth(index).getByRole("link");
      await expect(links).toHaveCount(talk.materials.length);

      for (const [position, { label, href }] of talk.materials.entries()) {
        const link = links.nth(position);
        // The visible label leads the accessible name (WCAG 2.5.3), and the
        // talk title keeps a screen reader's link list unambiguous.
        await expect(link).toHaveAccessibleName(`${label}, ${talk.title}`);
        await expect(link).toHaveText(label);
        await expect(link).toHaveAttribute("href", href);
        // Every material leaves the sheet, as an off-sheet reference does.
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });

  test("never colors anything in the annotation red at rest", async ({
    page,
  }) => {
    const section = page.locator("#talks");
    await expect(section).toBeVisible();
    await page.mouse.move(0, 0);

    const annotated = await section.evaluate(root => {
      const probe = document.createElement("span");
      probe.style.color = "var(--annotation)";
      root.append(probe);
      const annotation = getComputedStyle(probe).color;
      probe.remove();

      return [...root.querySelectorAll("*")]
        .filter(element => {
          const style = getComputedStyle(element);
          return [
            style.color,
            style.borderTopColor,
            style.borderBottomColor,
          ].includes(annotation);
        })
        .map(element => element.outerHTML.slice(0, 80));
    });

    expect(annotated).toEqual([]);
  });
});
