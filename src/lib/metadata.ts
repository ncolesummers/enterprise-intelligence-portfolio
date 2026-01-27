import type { Metadata } from "next";

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function generatePageMetadata(page: PageMetadata): Metadata {
  const siteUrl = "https://ncolesummers.com";
  const fullTitle = `${page.title} | N. Cole Summers`;
  const fullUrl = `${siteUrl}${page.path}`;

  return {
    title: fullTitle,
    description: page.description,
    keywords: [
      "N. Cole Summers",
      "Nathan Cole Summers",
      "Enterprise Intelligence",
      "Software Engineer",
      "Portfolio",
      "Projects",
    ],
    authors: [{ name: "Nathan Cole Summers" }],
    creator: "Nathan Cole Summers",
    openGraph: {
      type: "website",
      title: fullTitle,
      description: page.description,
      url: fullUrl,
      siteName: "N. Cole Summers",
      images: page.image
        ? [
            {
              url: page.image,
              width: 1200,
              height: 630,
              alt: page.title,
            },
          ]
        : [
            {
              url: `${siteUrl}/og-default.png`,
              width: 1200,
              height: 630,
              alt: "N. Cole Summers - Enterprise Intelligence",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
      images: page.image ? [page.image] : [`${siteUrl}/og-default.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export const defaultMetadata: Metadata = {
  title: "N. Cole Summers",
  description: "Enterprise Intelligence and Applications",
  keywords: [
    "N. Cole Summers",
    "Nathan Cole Summers",
    "Enterprise Intelligence",
    "Software Engineer",
    "Portfolio",
    "Projects",
  ],
  authors: [{ name: "Nathan Cole Summers" }],
  creator: "Nathan Cole Summers",
  metadataBase: new URL("https://ncolesummers.com"),
  openGraph: {
    type: "website",
    title: "N. Cole Summers",
    description: "Enterprise Intelligence and Applications",
    url: "https://ncolesummers.com",
    siteName: "N. Cole Summers",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "N. Cole Summers - Enterprise Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "N. Cole Summers",
    description: "Enterprise Intelligence and Applications",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
