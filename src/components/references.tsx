import Link from "next/link";
import { AtSign, Github, Instagram, Linkedin } from "lucide-react";

import { Socials, contactEmail } from "@/lib/const";

const icons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
};

/**
 * The references block at the foot of the index sheet.
 *
 * A drawing lists what it points to off-sheet, so this names each destination
 * and shows its address before it is followed, rather than offering three bare
 * glyphs and an invitation. It replaced a "Get In Touch" headline over the same
 * icons the title block already carries: PRODUCT.md's fourth principle is that
 * the site is a standing representation and must not read as though it is
 * asking for something.
 *
 * It is also load-bearing for reach. The title block drops its references below
 * `sm`, so on a phone this is the only route to the repository a visitor is
 * being asked to check the drawing against.
 *
 * Every row is one link. The glyph is hidden from assistive technology because
 * it never carries the name, and the accessible name contains the visible label
 * so speech input can address the row by what it reads (WCAG 2.5.3).
 */

type Reference = {
  name: string;
  href: string;
  address: string;
  external: boolean;
  Icon: typeof Github;
};

const references: readonly Reference[] = [
  ...Socials.map(social => ({
    name: social.name,
    href: social.href,
    address: social.handle,
    external: true,
    Icon: icons[social.name],
  })),
  {
    name: "Email",
    href: `mailto:${contactEmail}`,
    address: contactEmail,
    external: false,
    Icon: AtSign,
  },
];

const References = () => (
  <section id="contact" className="pt-24">
    <div className="rule-object flex flex-wrap items-baseline gap-x-4 gap-y-1 border-0 border-b pb-4">
      <h2 className="type-label shrink-0">Off-sheet references</h2>
      <p className="type-label text-line-soft">
        The work, and the way to reach me
      </p>
    </div>

    {/* Ruled like a schedule on a drawing: every rule runs the full width of the
        sheet, and the fields are set from the left margin at their own measure.
        Constraining the list itself instead would leave stub rules under a
        full-width heading rule, which reads as an unfinished table. */}
    <ul className="divide-y divide-rule-leader mt-8">
      {references.map(({ name, href, address, external, Icon }) => (
        <li key={name}>
          <Link
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={external ? `${name} profile` : `Email ${address}`}
            className="hover:text-annotation group flex max-w-xl items-center gap-4 py-4 transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="type-label w-24 shrink-0">{name}</span>
            <span className="type-body text-line-soft group-hover:text-annotation min-w-0 truncate text-[0.9375rem] transition-colors">
              {address}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default References;
