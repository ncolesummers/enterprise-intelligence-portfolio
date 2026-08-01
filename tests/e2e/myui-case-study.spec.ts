import { expect, test } from "@playwright/test";

import { contrastRatio, readSettled } from "../fixtures/contrast";
import { isIgnorableExternalResourceConsoleError } from "../fixtures/runtime-health";

const route = "/projects/myui";

test.describe("MyUI case study", () => {
  test("presents only substantiated employer-safe evidence in the figure-sheet system", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", message => {
      if (
        message.type() === "error" &&
        !isIgnorableExternalResourceConsoleError(message.text())
      ) {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(route);

    const main = page.getByRole("main");
    await expect(main).toHaveAttribute("id", "main-content");

    const heading = page.getByRole("heading", {
      level: 1,
      name: "MyUI Dashboard",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/type-display/);

    const liveSite = page.getByRole("link", { name: "Visit MyUI" });
    await expect(liveSite).toHaveAttribute("href", "https://my.uidaho.edu");
    await expect(liveSite).toHaveAttribute("rel", /noopener/);
    await liveSite.focus();
    await expect(liveSite).toBeFocused();
    await expect(liveSite).toHaveCSS("outline-style", "solid");
    await expect(liveSite).toHaveCSS("outline-width", "2px");

    await expect(page.getByText(/lead developer/i).first()).toBeVisible();
    await expect(
      page.getByText(/custom React components/i).first(),
    ).toBeVisible();
    await expect(page.getByText(/Ellucian Experience/i).first()).toBeVisible();
    await expect(
      page.getByText(/Ellucian provides the Experience host platform/i),
    ).toBeVisible();
    await expect(
      page.getByText(/custom component layer seated inside it/i),
    ).toBeVisible();

    const sections = page.getByTestId("case-study-section");
    await expect(sections).toHaveCount(9);
    await expect(sections.getByRole("heading", { level: 2 })).toHaveText([
      "Introduction",
      "Project Overview",
      "Key Features",
      "My Role as Lead Developer",
      "Benefits for the University Community",
      "Technical Implementation",
      "Ethos Integration",
      "Results and Impact",
      "Conclusion",
    ]);

    const sectionNamed = (name: string) =>
      sections.filter({
        has: page.getByRole("heading", { level: 2, name, exact: true }),
      });

    await expect(sectionNamed("Introduction")).toContainText("lead developer");

    const overview = sectionNamed("Project Overview");
    await expect(
      overview.getByRole("heading", { level: 3, name: "Technology stack" }),
    ).toBeVisible();
    await expect(
      overview.getByRole("list", { name: "Technology stack" }),
    ).toContainText("React");
    await expect(overview).toContainText("Ellucian Experience");

    const features = sectionNamed("Key Features");
    await expect(features.getByTestId("evidence-panel")).toHaveCount(4);
    await expect(features.getByRole("heading", { level: 3 })).toHaveText([
      "Custom component cards",
      "Ellucian shell",
      "Single sign-on",
      "Responsive interface",
    ]);

    const role = sectionNamed("My Role as Lead Developer");
    await expect(role).toContainText("department collaboration");
    await expect(role.getByTestId("evidence-panel")).toHaveCount(2);

    const benefits = sectionNamed("Benefits for the University Community");
    await expect(benefits.getByTestId("evidence-panel")).toHaveCount(3);
    await expect(benefits).toContainText("one destination");

    const implementation = sectionNamed("Technical Implementation");
    await expect(implementation.getByTestId("evidence-panel")).toHaveCount(3);
    await expect(implementation).toContainText(/platform-defined APIs/i);
    await expect(implementation).toContainText("proprietary implementation");

    const ethos = sectionNamed("Ethos Integration");
    await expect(ethos.getByTestId("evidence-panel")).toHaveCount(2);
    await expect(ethos).toContainText("Ethos Business Process APIs");
    await expect(ethos).toContainText(/published boundary/i);
    await expect(ethos).toContainText(
      "Custom React components sit inside the Ellucian Experience shell",
    );
    await expect(ethos).not.toContainText("consume platform services");
    await expect(ethos).not.toContainText(
      "Integration remains inside the Ellucian environment",
    );

    const results = sectionNamed("Results and Impact");
    await expect(results).toContainText(
      "The verifiable outcome is production delivery",
    );
    await expect(results).toContainText(
      "No adoption, satisfaction, or engagement metrics are claimed",
    );
    await expect(
      results.getByRole("link", { name: "Visit the live MyUI service" }),
    ).toHaveAttribute("href", "https://my.uidaho.edu");

    await expect(sectionNamed("Conclusion")).toContainText(
      "existing enterprise platform",
    );

    const evidencePanels = page.getByTestId("evidence-panel");
    expect(await evidencePanels.count()).toBeGreaterThanOrEqual(9);
    for (const panel of await evidencePanels.all()) {
      await expect(panel).toHaveClass(/rule-leader/);
      await expect(panel).toHaveCSS("border-radius", "0px");
      await expect(panel).toHaveCSS("box-shadow", "none");
    }

    await expect(main.getByRole("img")).toHaveCount(0);
    await expect(page.getByText(/student GPA/i)).toHaveCount(0);
    await expect(page.getByText(/account balances/i)).toHaveCount(0);
    await expect(page.getByText(/transaction history/i)).toHaveCount(0);
    await expect(page.getByText(/financial aid management/i)).toHaveCount(0);
    await expect(page.getByText(/high engagement/i)).toHaveCount(0);
    await expect(page.getByText(/positive feedback/i)).toHaveCount(0);
    await expect(page.getByText(/significant increase/i)).toHaveCount(0);
    await expect(page.getByText(/React\.memo/i)).toHaveCount(0);
    await expect(page.getByText(/RabbitMQ/i)).toHaveCount(0);
    await expect(page.getByText(/TLS v1\.2/i)).toHaveCount(0);
    await expect(page.getByText("Interested in learning more?")).toHaveCount(0);
    await expect(page.locator("pre, code")).toHaveCount(0);
    expect(consoleErrors).toEqual([]);
  });

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`holds both themes and reduced motion at ${viewport.name}`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", message => {
        if (
          message.type() === "error" &&
          !isIgnorableExternalResourceConsoleError(message.text())
        ) {
          consoleErrors.push(message.text());
        }
      });

      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      const firstSection = page.getByTestId("case-study-section").first();
      await expect(firstSection).toBeVisible();
      await expect(firstSection).toHaveCSS("opacity", "1");
      await expect(firstSection).toHaveCSS("transform", "none");

      const returnLink = page.getByRole("link", {
        name: "Return to index",
        exact: true,
      });
      const transitionDuration = await returnLink.evaluate(element =>
        Number.parseFloat(getComputedStyle(element).transitionDuration),
      );
      expect(transitionDuration).toBeLessThanOrEqual(0.001);

      const readContrast = () =>
        readSettled(
          () =>
            page.locator("body").evaluate(root => {
              const bodyCopy = root.querySelector(
                '[data-testid="case-study-section"] .type-body',
              );
              return {
                background: getComputedStyle(root).backgroundColor,
                body: bodyCopy ? getComputedStyle(bodyCopy).color : "",
              };
            }),
          value => [value.background, value.body],
        );

      await expect(page.locator("html")).not.toHaveClass(/dark/);
      const paper = await readContrast();
      await page
        .getByRole("button", {
          name: "Switch to the blueprint medium",
          exact: true,
        })
        .click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      const blueprint = await readContrast();
      expect(blueprint.background).not.toBe(paper.background);
      expect(
        contrastRatio(paper.body, paper.background),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(blueprint.body, blueprint.background),
      ).toBeGreaterThanOrEqual(4.5);
      expect(consoleErrors).toEqual([]);
    });
  }
});
