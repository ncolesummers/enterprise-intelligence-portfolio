"use client";

// Smooth scroll to element with focus management
export function scrollToElement(
  elementId: string,
  options: {
    behavior?: "smooth" | "instant" | "auto";
    block?: "start" | "center" | "end" | "nearest";
    focus?: boolean;
  } = {},
) {
  const { behavior = "smooth", block = "start", focus = true } = options;

  const element = document.getElementById(elementId);
  if (!element) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : behavior;

  element.scrollIntoView({
    behavior: scrollBehavior,
    block,
  });

  // Focus the element for accessibility
  if (focus) {
    // Add tabindex if element isn't naturally focusable
    if (
      !element.hasAttribute("tabindex") &&
      !["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)
    ) {
      element.setAttribute("tabindex", "-1");
    }

    // Focus with a small delay to ensure scroll completes
    setTimeout(
      () => {
        element.focus({ preventScroll: true });
      },
      prefersReducedMotion ? 0 : 100,
    );
  }
}

// Enhanced navigation with focus management
export function navigateToSection(sectionId: string) {
  scrollToElement(sectionId, { focus: true });

  // Update URL hash without triggering scroll
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.hash = sectionId;
    window.history.replaceState(null, "", url.toString());
  }
}

// Focus trap for modals/dialogs
export function createFocusTrap(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  container.addEventListener("keydown", handleTabKey);

  return {
    destroy: () => container.removeEventListener("keydown", handleTabKey),
    focusFirst: () => firstElement?.focus(),
  };
}
