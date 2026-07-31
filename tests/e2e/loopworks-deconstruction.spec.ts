import { expect, test, type Locator, type Page } from "@playwright/test";

import { contrastRatio } from "../fixtures/contrast";
import { pageUrls } from "../fixtures/test-data";
import {
  expectRuntimeHealthClean,
  observeRuntimeHealth,
  type RuntimeHealth,
} from "../fixtures/runtime-health";

/**
 * The scroll-driven deconstruction of FIG. 1.
 *
 * Two contracts, on two axes so they cannot contend. Scroll owns exposure: which
 * detail is on the plate is decided by which section the reader has reached.
 * Pointing owns reading: which of the shown parts is being read, and it never
 * moves the page.
 *
 * The band is `aria-hidden` by design, so it has no role or name to locate it
 * by. That is the same reason the assembled plates are located by class in
 * `loopworks-case-study.spec.ts`: the drawing apparatus is deliberately outside
 * the accessibility tree, and the announced route — the numeral table — is
 * asserted there.
 */

const route = pageUrls.projects.loopworks;

/** Section heading to the detail the plate should be showing while it is read. */
const SECTION_VIEWS = [
  { section: "Admission", view: "admission", caption: "Admission" },
  {
    section: "The Development Loop",
    view: "stages",
    caption: "The development loop",
  },
  {
    section: "Where Judgment Stays Human",
    view: "gates",
    caption: "The two gates",
  },
  { section: "Why It Is a Loop", view: "return", caption: "The return path" },
  {
    section: "Isolation and the Guarded Write",
    view: "write",
    caption: "Isolation and the write",
  },
  {
    section: "The Control Plane",
    view: "control",
    caption: "The control plane",
  },
] as const;

const runtimeByPage = new WeakMap<Page, RuntimeHealth>();

test.beforeEach(({ page, baseURL }) => {
  if (!baseURL) throw new Error("Playwright baseURL is required");
  runtimeByPage.set(page, observeRuntimeHealth(page, baseURL));
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(50);
  expectRuntimeHealthClean(runtimeByPage.get(page)!);
});

const band = (page: Page) => page.getByTestId("deconstruction");
const readout = (page: Page) => band(page).locator("p.type-body");
const viewOf = (page: Page, view: string) =>
  band(page).locator(`[data-view="${view}"]`);

/**
 * The width at or above which the plate is pinned. Below it each section draws
 * its own instead, so which element carries the drawing depends on the viewport
 * and every width-parameterised assertion has to ask.
 *
 * `lg` in Tailwind's default scale, which is what the component's media query
 * uses. Kept as a number here because the tests set pixel viewports.
 */
const PINNED_FROM = 1024;

/** The plate a section's drawing is on at this width, pinned or in place. */
const plateFor = (page: Page, width: number, view: string) =>
  width >= PINNED_FROM
    ? band(page)
    : page.locator(`[data-detail-inline="${view}"]`);

const inlinePlates = (page: Page) => page.getByTestId("deconstruction-inline");

/**
 * Wait for the page to stop moving.
 *
 * The sheet scrolls smoothly, and Playwright brings a target into view before
 * acting on it, so an action can leave a scroll animation running. Jumping while
 * one is in flight does not cancel it: the animation carries on to its own
 * target and the jump is lost.
 */
const scrollSettled = async (page: Page) => {
  await expect
    .poll(async () => {
      const first = await page.evaluate(() => window.scrollY);
      await page.waitForTimeout(120);
      return first === (await page.evaluate(() => window.scrollY));
    })
    .toBe(true);
};

/**
 * Park a section under the pinned band, where the reading line is. Instantly:
 * the page scrolls smoothly outside reduced motion, and reading the plate while
 * a setup scroll is still animating measures the wrong moment.
 */
const readSection = async (page: Page, section: string) => {
  await scrollSettled(page);
  await page.evaluate(name => {
    const heading = Array.from(document.querySelectorAll("h2")).find(
      candidate => candidate.textContent === name,
    )!;
    const target = heading.closest("[data-detail-view]")!;
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top - window.innerHeight * 0.12,
      behavior: "instant",
    });
  }, section);
};

const shownCaption = (page: Page) =>
  band(page).locator("p").first().locator("span").nth(1);

test.describe("Loopworks deconstruction", () => {
  for (const viewport of [
    { name: "lg", width: 1024, height: 800 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`scroll decides which parts are exposed at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);

      // The band is pinned to the top of the viewport while the prose runs
      // beneath it, which is the whole arrangement. Its plate is the third
      // geometry: the wide plate is too wide and the tall plate too tall to sit
      // in half a viewport, so neither of them may be what is drawn here.
      await readSection(page, "Admission");
      await expect(band(page).locator("svg.fig-detail")).toBeVisible();
      await expect(band(page).locator("svg.fig-tall")).toHaveCount(0);

      const bandBox = (await band(page).boundingBox())!;
      expect(bandBox.y).toBeLessThanOrEqual(2);
      // Half a viewport is the budget the geometry was drawn against.
      expect(bandBox.height).toBeLessThanOrEqual(viewport.height * 0.55);

      for (const { section, view, caption } of SECTION_VIEWS) {
        await readSection(page, section);

        await expect(shownCaption(page)).toHaveText(caption);
        await expect(viewOf(page, view)).toHaveAttribute("data-shown", "true");
        await expect(viewOf(page, view)).toHaveCSS("opacity", "1");

        // Exactly one detail is on the plate, so the parts on it are the parts
        // this section names and nothing else.
        await expect(band(page).locator("[data-shown]")).toHaveCount(1);
      }
    });
  }

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "short phone", width: 375, height: 667 },
    { name: "tablet", width: 768, height: 1024 },
  ]) {
    test(`gives the prose the viewport back at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);

      // A phone browser spends height on chrome the layout viewport does not
      // report, so a band measured at half the reported height is nearer
      // two thirds of the height the reader has. Below `lg` nothing is pinned:
      // the section draws its own plate and the prose keeps the whole viewport.
      await expect(band(page)).toBeHidden();
      await expect(inlinePlates(page)).toHaveCount(SECTION_VIEWS.length);

      // Each section carries its own view, and only its own.
      for (const { section, view, caption } of SECTION_VIEWS) {
        const plate = plateFor(page, viewport.width, view);
        await expect(plate).toBeVisible();
        await expect(plate.locator("svg.fig-detail")).toBeVisible();
        await expect(plate.locator("[data-shown]")).toHaveCount(1);
        await expect(plate.locator(`[data-view="${view}"]`)).toHaveAttribute(
          "data-shown",
          "true",
        );
        await expect(
          plate.locator("p").first().locator("span").nth(1),
        ).toHaveText(caption);

        // The plate belongs to the section it illustrates.
        const heading = await plate.evaluate(element => {
          const owner = element.closest("[data-detail-view]");
          return owner?.querySelector("h2")?.textContent ?? null;
        });
        expect(heading).toBe(section);
      }

      // Nothing is pinned, so scrolling leaves no element parked at the top of
      // the viewport eating the reader's room.
      await readSection(page, "The Control Plane");
      const pinned = await page.evaluate(() =>
        Array.from(document.querySelectorAll("main *")).some(element => {
          const style = getComputedStyle(element);
          if (style.position !== "sticky" && style.position !== "fixed")
            return false;
          const box = element.getBoundingClientRect();
          return box.height > 0 && box.top <= 2;
        }),
      );
      expect(pinned).toBe(false);
    });
  }

  test("holds the previous detail through a section that names no parts", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);

    await readSection(page, "The Control Plane");
    await expect(shownCaption(page)).toHaveText("The control plane");

    // Lineage names no parts. Resetting the plate there would take the drawing
    // apart for no reason; the brief holds the state instead.
    await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll("h2")).find(
        candidate => candidate.textContent === "Lineage",
      )!;
      const top = heading.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 200, behavior: "instant" });
    });
    await page.waitForTimeout(400);
    await expect(shownCaption(page)).toHaveText("The control plane");
  });

  test("reads a shown part without moving the page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    await readSection(page, "The Development Loop");

    await expect(shownCaption(page)).toHaveText("The development loop");
    await expect(readout(page)).toContainText("Eight stages declared");

    // Driven by raw pointer moves at fixed coordinates rather than by hover and
    // click. Playwright brings a target into view before acting on it, and that
    // scroll is the harness moving the page — which is the very thing under
    // test here, so it cannot be allowed to happen.
    const part = (await viewOf(page, "stages")
      .locator('g.fig-part:has(text:text-is("Validation"))')
      .boundingBox())!;
    const note = (await readout(page).boundingBox())!;
    const onPart = () =>
      page.mouse.move(part.x + part.width / 2, part.y + part.height / 2);
    const offPart = () => page.mouse.move(note.x + 8, note.y + note.height - 8);
    const take = async () => {
      await page.mouse.down();
      await page.mouse.up();
    };

    await scrollSettled(page);
    const before = await page.evaluate(() => window.scrollY);

    // Pointing reads.
    await onPart();
    await expect(readout(page)).toContainText("50 Validation");
    await expect(readout(page)).toContainText("fails closed");

    // Taking keeps the reading up after the pointer leaves, which is the only
    // way a tap can read anything: a touch fires enter and leave together.
    await take();
    await offPart();
    await expect(readout(page)).toContainText("50 Validation");

    // And neither one moves the page. Motion belongs to one input. The assembled
    // figure does scroll its reading into view on take, because its tall plate
    // can leave the reading below the fold; here the reading is pinned above the
    // prose, so there is nothing to bring into view and doing it anyway would be
    // the pointer driving the scroll.
    expect(await page.evaluate(() => window.scrollY)).toBe(before);

    // Taking it again puts it down, matching the numeral table's toggle.
    await onPart();
    await take();
    await offPart();
    await expect(readout(page)).toContainText("Eight stages declared");
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
  });

  test("drops a reading rather than letting it go stale", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    await readSection(page, "The Development Loop");

    // The scroll decides which view is drawn a frame or more after it lands, and
    // a view that is not shown takes no pointer events by design. Clicking
    // before the switch therefore lands on nothing and leaves the previous
    // section's reading standing, which looks exactly like the staleness this
    // test is about — so wait for the plate to be showing stages first.
    await expect(viewOf(page, "stages")).toHaveAttribute("data-shown", "true");

    await viewOf(page, "stages")
      .locator('g.fig-part:has(text:text-is("Validation"))')
      .click();
    await expect(readout(page)).toContainText("50 Validation");

    // Pinning is dropped inside the deconstruction: a pin goes stale the moment
    // the reader scrolls past the part carrying it.
    await readSection(page, "The Control Plane");
    await expect(shownCaption(page)).toHaveText("The control plane");

    // Off the plate first. The pointer is still resting where the taken part
    // was, and the scroll has put a different part under it — which is pointing,
    // and pointing reads. What has to be gone is the reading that was taken.
    await readout(page).hover();
    await expect(readout(page)).toContainText("Eighteen durable tables");
    await expect(readout(page)).not.toContainText("50 Validation");
  });

  test("keeps a part that is not on the plate out of reach", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route);
    await readSection(page, "Admission");

    // Every detail stays in the DOM so a change of view is a paint rather than a
    // remount, so the ones not being shown have to be out of hit testing too.
    // Otherwise an invisible part would answer the pointer.
    for (const { view } of SECTION_VIEWS.slice(1)) {
      await expect(viewOf(page, view)).toHaveCSS("pointer-events", "none");
      await expect(viewOf(page, view)).toHaveCSS("opacity", "0");
    }
    await expect(viewOf(page, "admission")).toHaveCSS("pointer-events", "auto");
  });

  // Both forms of the plate are outside the accessibility tree, so both are
  // checked: the retreat must not have made the drawing announceable on phones.
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`says nothing to assistive technology that the numerals do not at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);
      await readSection(page, "Admission");

      const plate = plateFor(page, viewport.width, "admission");

      // The plates stay aria-hidden and unfocusable; the numeral table on the
      // assembled figure remains the only announced route to a part. Motion must
      // never become the only way to learn something.
      await expect(plate).toHaveAttribute("aria-hidden", "true");
      await expect(plate.locator("svg.fig-detail")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      await expect(
        plate.locator("a, button, input, select, textarea, [tabindex]"),
      ).toHaveCount(0);

      // No plate is a stop on the way through the page, in either form.
      await page.getByRole("link", { name: "Return to index" }).focus();
      for (let step = 0; step < 25; step += 1) {
        await page.keyboard.press("Tab");
        const insidePlate = await page.evaluate(() => {
          const active = document.activeElement;
          return Boolean(
            active?.closest(
              '[data-testid="deconstruction"], [data-testid="deconstruction-inline"]',
            ),
          );
        });
        expect(insidePlate).toBe(false);
      }
    });
  }

  test("is not drawn at all under reduced motion", async ({ page }) => {
    // At a width where it would otherwise be pinned, so this measures reduced
    // motion rather than the breakpoint.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);

    await expect(band(page)).toBeHidden();

    // What reduced motion resolves to is the assembled drawing, which is above
    // the prose and complete on its own: thirteen numerals, each with its note
    // in the DOM. Nothing in the deconstruction was the only route to a part.
    const figure = page.locator("figure").filter({ hasText: "FIG. 1" });
    await expect(figure.getByRole("button")).toHaveCount(13);
    await expect(figure).toContainText("Thirteen numbered parts");

    // The facts the detail views state are stated in the prose beside them, so
    // opting out of motion does not opt out of the argument.
    await expect(page.getByRole("main")).toContainText(
      "dispatched, deferred, or lease contention",
    );
    await expect(page.getByRole("main")).toContainText("deny-all");
    await expect(page.getByRole("main")).toContainText("Eighteen tables");

    // And scrolling through the prose leaves the page alone.
    await readSection(page, "The Control Plane");
    await expect(band(page)).toBeHidden();
  });

  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`holds both media and one annotation at ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(route);
      await readSection(page, "The Development Loop");

      // Whichever form this width draws, the medium contract is the same.
      const plate = plateFor(page, viewport.width, "stages");

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      // The plate is drawn inside the sheet's content column, like everything
      // else on the sheet.
      const sheetContent = await page.getByRole("main").evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          left: bounds.left + Number.parseFloat(style.paddingLeft),
          right: bounds.right - Number.parseFloat(style.paddingRight),
        };
      });
      const plateBox = (await plate.boundingBox())!;
      expect(plateBox.x).toBeGreaterThanOrEqual(sheetContent.left - 1);
      expect(plateBox.x + plateBox.width).toBeLessThanOrEqual(
        sheetContent.right + 1,
      );

      const read = async (locator: Locator) => ({
        background: await page
          .locator("body")
          .evaluate(element => getComputedStyle(element).backgroundColor),
        note: await locator.evaluate(
          element => getComputedStyle(element).color,
        ),
        annotations: await plate.locator("*").evaluateAll(elements => {
          const probe = document.createElement("span");
          probe.style.color = "var(--annotation)";
          document.body.append(probe);
          const annotation = getComputedStyle(probe).color;
          probe.remove();
          return elements.filter(element => {
            const style = getComputedStyle(element);
            return [style.color, style.fill, style.stroke].includes(annotation);
          }).length;
        }),
      });

      const note = plate.locator("p.type-body");

      await expect(page.locator("html")).not.toHaveClass(/dark/);
      const paper = await read(note);
      await page
        .getByRole("button", {
          name: "Switch to the blueprint medium",
          exact: true,
        })
        .click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      const blueprint = await read(note);

      expect(blueprint.background).not.toBe(paper.background);
      for (const medium of [paper, blueprint]) {
        expect(
          contrastRatio(medium.note, medium.background),
        ).toBeGreaterThanOrEqual(4.5);
        // Nothing on the plate is vermilion until a part is pointed at. The
        // scarcity is what makes the colour read as annotation.
        expect(medium.annotations).toBe(0);
      }

      // And one part pointed at is exactly one annotation.
      await plate
        .locator('[data-view="stages"]')
        .locator('g.fig-part:has(text:text-is("Validation"))')
        .hover();
      await expect(note).toContainText("50 Validation");
    });
  }
});
