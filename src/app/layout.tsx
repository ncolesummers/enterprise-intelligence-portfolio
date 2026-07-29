import type { Metadata } from "next";
import "./globals.css";
import type React from "react";
import { defaultMetadata } from "@/lib/metadata";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { ConsoleGreeting } from "@/components/console-greeting";
import SheetFrame from "@/components/sheet-frame";
import TitleBlock from "@/components/title-block";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ground text-line min-h-screen font-sans antialiased">
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
