import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Saira } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import type React from "react";
import { defaultMetadata } from "@/lib/metadata";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { ConsoleGreeting } from "@/components/console-greeting";
import SheetFrame from "@/components/sheet-frame";
import TitleBlock from "@/components/title-block";

// One hand letters the whole sheet. The width axis is loaded because register
// changes come from it rather than from a second family — semi-condensed for
// the drawing apparatus, normal width for prose.
const saira = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-saira",
  display: "swap",
});

// Code only, so it is not preloaded: pages without a code block never fetch it.
const monaspace = localFont({
  src: "./fonts/MonaspaceNeonVar.woff2",
  weight: "200 800",
  variable: "--font-monaspace",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-ground text-line min-h-screen font-sans antialiased",
          saira.variable,
          monaspace.variable,
        )}
      >
        {/* Ink on paper is this world's canonical form, so it leads. Both
            mediums are authored traditions; neither is a fallback. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-to-content type-label">
            Skip to main content
          </a>
          <SheetFrame />
          <TitleBlock />
          <ErrorBoundary>{children}</ErrorBoundary>
          <ConsoleGreeting />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
