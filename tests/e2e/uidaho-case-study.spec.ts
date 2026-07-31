import { expect, test } from "@playwright/test";

import {
  expectRuntimeHealthClean,
  observeRuntimeHealth,
} from "../fixtures/runtime-health";

const route = "/projects/uidaho-website";

test.describe("University of Idaho case study", () => {
  test("presents substantiated evidence in the figure-sheet system", async ({
    page,
    baseURL,
  }) => {
    if (!baseURL) throw new Error("Playwright baseURL is required");
    const runtimeHealth = observeRuntimeHealth(page, baseURL);

    await page.goto(route);

    const heading = page.getByRole("heading", {
      level: 1,
      name: "University of Idaho Website",
    });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/type-display/);

    const liveSite = page.getByRole("link", { name: "Visit live site" });
    await expect(liveSite).toHaveAttribute("href", "https://www.uidaho.edu");
    await expect(liveSite).toHaveAttribute("rel", /noopener/);

    await expect(page.getByText(/full-stack developer/i).first()).toBeVisible();
    await expect(page.getByText(/Sitecore/i).first()).toBeVisible();
    await expect(page.getByText(/Next\.js/i).first()).toBeVisible();
    await expect(page.getByText(/Azure/i).first()).toBeVisible();

    const sections = page.getByTestId("case-study-section");
    await expect(sections).toHaveCount(6);
    await expect(sections.getByRole("heading", { level: 2 })).toHaveText([
      "Introduction",
      "My Role & Responsibilities",
      "Key Features & Technologies",
      "Technical Architecture",
      "Project Impact",
      "Website Showcase",
    ]);

    const evidencePanels = page.getByTestId("evidence-panel");
    await expect(evidencePanels).toHaveCount(7);
    for (const panel of await evidencePanels.all()) {
      await expect(panel).toHaveClass(/rule-leader/);
      await expect(panel).toHaveCSS("border-radius", "0px");
      await expect(panel).toHaveCSS("box-shadow", "none");
    }

    await expect(page.getByText(/50%\+ faster/i)).toHaveCount(0);
    await expect(page.getByText("Interested in learning more?")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Contact Me" })).toHaveCount(0);
    await expect(page.locator("pre, code")).toHaveCount(0);
    expectRuntimeHealthClean(runtimeHealth);
  });

  test("keeps the cleared visual evidence keyboard-operable", async ({
    page,
  }) => {
    await page.goto(route);

    const tablist = page.getByRole("tablist", {
      name: "University website pages",
    });
    await expect(tablist).toBeVisible();

    const expectTabPanelRelationships = async (selectedName: string) => {
      const relationships = await tablist.getByRole("tab").evaluateAll(tabs =>
        tabs.map(tab => {
          const controls = tab.getAttribute("aria-controls");
          const panel = controls ? document.getElementById(controls) : null;
          return {
            controls,
            attached: panel?.isConnected ?? false,
            role: panel?.getAttribute("role") ?? null,
          };
        }),
      );
      for (const relationship of relationships) {
        expect(relationship.controls).toBeTruthy();
        expect(relationship.attached, JSON.stringify(relationship)).toBe(true);
        expect(relationship.role, JSON.stringify(relationship)).toBe(
          "tabpanel",
        );
      }

      const selectedTab = page.getByRole("tab", {
        name: selectedName,
        exact: true,
      });
      await expect(selectedTab).toHaveAttribute("aria-selected", "true");
      const selectedId = await selectedTab.getAttribute("id");
      expect(selectedId).toBeTruthy();

      const panel = page.getByRole("tabpanel");
      await expect(panel).toHaveAttribute("aria-labelledby", selectedId!);
      const labelRelationship = await panel.evaluate(element => {
        const labelledBy = element.getAttribute("aria-labelledby");
        const tab = labelledBy ? document.getElementById(labelledBy) : null;
        return {
          labelledBy,
          attached: tab?.isConnected ?? false,
          role: tab?.getAttribute("role") ?? null,
          selected: tab?.getAttribute("aria-selected") ?? null,
        };
      });
      expect(labelRelationship).toEqual({
        labelledBy: selectedId,
        attached: true,
        role: "tab",
        selected: "true",
      });
    };

    const exploreTab = page.getByRole("tab", { name: "Explore", exact: true });
    const studentsTab = page.getByRole("tab", {
      name: "Current Students",
      exact: true,
    });
    const applyTab = page.getByRole("tab", { name: "Apply", exact: true });
    const giftTab = page.getByRole("tab", {
      name: "Make a Gift",
      exact: true,
    });
    await expect(exploreTab).toHaveAttribute("aria-selected", "true");
    await expect(exploreTab).toHaveAttribute("tabindex", "0");
    await expect(studentsTab).toHaveAttribute("tabindex", "-1");
    await expectTabPanelRelationships("Explore");
    const annotationTabsAtRest = await tablist
      .getByRole("tab")
      .evaluateAll(tabs => {
        const probe = document.createElement("span");
        probe.style.color = "var(--annotation)";
        document.body.append(probe);
        const annotation = getComputedStyle(probe).color;
        probe.remove();

        return tabs.filter(tab => getComputedStyle(tab).color === annotation)
          .length;
      });
    expect(annotationTabsAtRest).toBe(1);
    await expect(
      page.getByRole("img", { name: "Explore page screenshot" }),
    ).toBeVisible();

    await exploreTab.focus();
    await exploreTab.press("ArrowRight");
    await expect(studentsTab).toHaveAttribute("aria-selected", "true");
    await expect(studentsTab).toBeFocused();
    await expectTabPanelRelationships("Current Students");
    await studentsTab.press("End");
    await expect(giftTab).toHaveAttribute("aria-selected", "true");
    await expect(giftTab).toBeFocused();
    await expectTabPanelRelationships("Make a Gift");
    await giftTab.press("Home");
    await expect(exploreTab).toHaveAttribute("aria-selected", "true");
    await expect(exploreTab).toBeFocused();
    await expectTabPanelRelationships("Explore");
    await exploreTab.press("ArrowLeft");
    await expect(giftTab).toHaveAttribute("aria-selected", "true");
    await giftTab.press("ArrowRight");
    await expect(exploreTab).toHaveAttribute("aria-selected", "true");

    await studentsTab.click();
    await expectTabPanelRelationships("Current Students");
    await expect(
      page.getByRole("img", { name: "Current Students page screenshot" }),
    ).toBeVisible();

    const zoom = page.getByRole("tabpanel").getByRole("button");
    await expect(zoom).toHaveAccessibleName("Zoom Current Students screenshot");
    await zoom.focus();
    await zoom.press("Enter");
    await expect(zoom).toHaveAttribute("aria-pressed", "true");
    await expect(zoom).toHaveAccessibleName(
      "Restore Current Students screenshot",
    );

    await applyTab.click();
    await expectTabPanelRelationships("Apply");
    await expect(
      page.getByRole("button", { name: "Zoom Apply screenshot", exact: true }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`holds both themes and reduced motion at ${viewport.name}`, async ({
      page,
    }) => {
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

      await expect(page.locator("html")).not.toHaveClass(/dark/);
      const paperBackground = await page
        .locator("body")
        .evaluate(element => getComputedStyle(element).backgroundColor);
      await page
        .getByRole("button", {
          name: "Switch to the blueprint medium",
          exact: true,
        })
        .click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      const blueprintBackground = await page
        .locator("body")
        .evaluate(element => getComputedStyle(element).backgroundColor);
      expect(blueprintBackground).not.toBe(paperBackground);
    });
  }
});
