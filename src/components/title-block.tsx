"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { navigation, sheetName } from "@/lib/const";
import SocialLinks from "@/components/social-links";
import { Mark } from "@/components/marks/monogram";

/**
 * The title block: the ruled credit panel a drafting sheet carries along its
 * lower edge. It absorbs the roles a conventional header and footer would
 * split — identity, navigation, and the theme control — so the rest of the
 * sheet is free for the drawing.
 *
 * Every field states something true. There are no drawing numbers, revision
 * letters, scales, or approvers here, because none of them exist.
 */

const Field = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "bg-ground flex shrink-0 flex-col justify-center gap-0.5 px-2 sm:px-3",
      className,
    )}
  >
    <span className="type-label text-line-soft">{label}</span>
    <span className="text-[0.8125rem] font-semibold tracking-[0.06em] uppercase">
      {children}
    </span>
  </div>
);

const MediumToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The resolved theme is unknowable during server render, so the field stays
  // blank until hydration rather than flashing the wrong medium. Its width is
  // reserved so the block does not reflow when the value arrives.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to the ${isDark ? "paper" : "blueprint"} medium`
          : "Switch the drawing medium"
      }
      className="bg-ground hover:text-annotation flex shrink-0 flex-col justify-center gap-0.5 px-2 text-left transition-colors sm:px-3"
    >
      <span className="type-label text-line-soft hidden sm:inline">Medium</span>
      <span className="min-w-[9ch] text-xs font-semibold tracking-[0.06em] uppercase sm:text-[0.8125rem]">
        {mounted ? (isDark ? "Blueprint" : "Paper") : " "}
      </span>
    </button>
  );
};

const TitleBlock = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Ground below the block, so scrolling copy does not show through the
          strip between it and the sheet edge. It sits under the frame (z-30)
          so the border and margin rules still draw over it. */}
      <div
        aria-hidden="true"
        className="bg-ground pointer-events-none fixed inset-x-0 bottom-0 z-20 h-[calc(var(--sheet-inner)+var(--title-block-h))]"
      />
      <header className="fixed inset-x-(--sheet-inner) bottom-(--sheet-inner) z-40">
        {/* One-pixel gaps over a rule-colored ground draw the cell divisions, so
          every division is exactly one leader-weight line with no doubling. */}
        <div className="rule-object bg-rule-object flex h-12 gap-px [font-stretch:87.5%]">
          {/* The stamp cell. A title block carries the drafter's mark, and
              below sm it carries the identity alone so navigation gets the
              width the abbreviated name was using. */}
          <Link
            href="/"
            className="bg-ground hover:text-annotation flex shrink-0 items-center px-3 transition-colors"
          >
            <Mark className="h-6 w-6" title="N. Cole Summers, home" />
          </Link>

          <Field label="Drawn by" className="hidden sm:flex">
            N. Cole Summers
          </Field>

          {/* The open field. A title block is mostly ruled empty space. */}
          <div className="bg-ground min-w-0 flex-1" />

          {/* Below sm there is no room for these without crowding navigation;
            the contact section on the index sheet carries them too. */}
          <SocialLinks className="bg-ground hidden shrink-0 sm:flex" />

          <Field label="Sheet" className="hidden md:flex">
            {sheetName(pathname)}
          </Field>

          <nav
            aria-label="Primary"
            className="bg-ground flex items-stretch gap-px"
          >
            {navigation.map(item => {
              const current = item.href === pathname;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "type-label hover:text-annotation flex items-center px-2 transition-colors sm:px-3",
                    current && "text-annotation",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <MediumToggle />
        </div>
      </header>
    </>
  );
};

export default TitleBlock;
