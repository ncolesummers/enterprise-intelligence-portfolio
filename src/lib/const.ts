// Navigation, off-sheet references, and the title block's sheet designators.

export const contactEmail = "nate@ncolesummers.com";

// Navigation links
export const navigation = [
  {
    name: "Work",
    href: "/#work",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: `mailto:${contactEmail}`,
  },
];
// Title-block sheet designators. The title block carries only true things —
// no drawing numbers, revisions, scales, or dates (see DESIGN.md). A sheet
// name is our own index label, so it names the section rather than numbering it.
const sheetNames: Record<string, string> = {
  "/": "Index",
  "/about": "About",
};

export function sheetName(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (sheetNames[path]) return sheetNames[path];

  const slug = path.split("/").filter(Boolean).pop();
  return slug ? slug.replace(/-/g, " ") : "Index";
}

// Off-sheet references. `handle` is the address as a reader would read it back,
// for the references block that names each destination rather than showing a
// bare glyph. It is the href with the scheme and the www dropped, so the two
// cannot describe different places.
export const Socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/n-cole-summers/",
    handle: "linkedin.com/in/n-cole-summers",
  },
  {
    name: "GitHub",
    href: "https://github.com/ncolesummers",
    handle: "github.com/ncolesummers",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/n__cole__summers/",
    handle: "instagram.com/n__cole__summers",
  },
];
