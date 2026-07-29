// This file contains the constants used throughout the application.
// It includes the site metadata, navigation links, and social media links.
// Site metadata
export const siteMetadata = {
  title: "N. Cole Summers",
  description:
    "Welcome to my personal website where I share my projects and thoughts.",
  author: "Nathan Cole Summers",
};
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
    href: "mailto:nate@ncolesummers.com",
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

export const Socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/n-cole-summers/",
  },
  {
    name: "GitHub",
    href: "https://github.com/ncolesummers",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/n__cole__summers/",
  },
];
