import { ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  CaseStudyHeader,
  CaseStudySection,
  EvidenceItem,
  EvidenceList,
  EvidencePanel,
} from "@/components/case-study";
import TabbedScreenshotGallery from "@/components/tabbed-screenshot-gallery";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";

import applyDesktop from "@/assets/uidaho-screenshots/uidaho-apply-desktop.webp";
import costsDesktop from "@/assets/uidaho-screenshots/uidaho-costs-desktop.webp";
import studentsDesktop from "@/assets/uidaho-screenshots/uidaho-current-students-desktop.webp";
import exploreDesktop from "@/assets/uidaho-screenshots/uidaho-explore-desktop.webp";
import giftDesktop from "@/assets/uidaho-screenshots/uidaho-make-a-gift-desktop.webp";

export const metadata = generatePageMetadata({
  title: "University of Idaho Website Redesign",
  description:
    "Full-stack developer for the University of Idaho website redesign using Sitecore, Next.js, TypeScript, Storybook, and Azure services.",
  path: "/projects/uidaho-website",
});

export default function UIdahoWebsitePage() {
  const screenshotPages = [
    {
      name: "explore",
      label: "Explore",
      description: "Interactive campus and programs exploration",
      desktop: exploreDesktop,
    },
    {
      name: "students",
      label: "Current Students",
      description: "Student resources and services hub",
      desktop: studentsDesktop,
    },
    {
      name: "apply",
      label: "Apply",
      description: "Admissions and application portal",
      desktop: applyDesktop,
    },
    {
      name: "costs",
      label: "Cost of Attendance",
      description: "Financial aid and tuition information",
      desktop: costsDesktop,
    },
    {
      name: "gift",
      label: "Make a Gift",
      description: "Donation and giving opportunities",
      desktop: giftDesktop,
    },
  ];

  return (
    <main id="main-content" className="sheet">
      <CaseStudyHeader
        figure={2}
        title="University of Idaho Website"
        summary="A redesign of the university's public website built with Sitecore, Next.js, TypeScript, Storybook, and Azure services."
      >
        <Button variant="outline" asChild>
          <Link
            href="https://www.uidaho.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Visit live site
          </Link>
        </Button>

        <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
          {["Next.js", "TypeScript", "Sitecore", "Storybook", "Azure"].map(
            technology => (
              <li key={technology} className="type-label rule-leader px-2 py-1">
                {technology}
              </li>
            ),
          )}
        </ul>
      </CaseStudyHeader>

      <CaseStudySection title="Introduction">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="type-body text-line-soft measure space-y-4">
            <p>
              The redesign moved the university&apos;s public website to a
              headless architecture: Sitecore holds authored content while a
              separate Next.js application renders it for delivery on Azure.
            </p>
            <p>
              As a full-stack developer, I built reusable React components and
              worked on the Azure services that support content delivery.
            </p>
          </div>
          <EvidencePanel>
            <h3 className="type-title mb-4">Project highlights</h3>
            <EvidenceList>
              <EvidenceItem>
                Separate Sitecore content management and Next.js rendering
              </EvidenceItem>
              <EvidenceItem>
                Component development documented in Storybook
              </EvidenceItem>
              <EvidenceItem>
                Azure Blob Storage and TypeScript serverless functions
              </EvidenceItem>
              <EvidenceItem>Server-side and static rendering</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="My Role & Responsibilities">
        <EvidencePanel>
          <h3 className="type-title mb-4">Key contributions</h3>
          <EvidenceList>
            <EvidenceItem>
              <strong className="text-line">Component architecture:</strong>{" "}
              built reusable React components with TypeScript and documented
              them in Storybook.
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">Azure integration:</strong>{" "}
              implemented Blob Storage for anonymized poll data and serverless
              functions for dynamic content delivery.
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">Rendering:</strong> used Next.js
              server-side rendering, static generation, and image optimization.
            </EvidenceItem>
            <EvidenceItem>
              <strong className="text-line">Sitecore integration:</strong>{" "}
              connected the headless CMS APIs to the separate Next.js frontend.
            </EvidenceItem>
          </EvidenceList>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Key Features & Technologies">
        <div className="grid gap-6 md:grid-cols-3">
          <EvidencePanel>
            <h3 className="type-title mb-4">Component Library & Storybook</h3>
            <EvidenceList>
              <EvidenceItem>Reusable React components</EvidenceItem>
              <EvidenceItem>Interactive component documentation</EvidenceItem>
              <EvidenceItem>Visual regression testing</EvidenceItem>
              <EvidenceItem>Shared design-system patterns</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>

          <EvidencePanel>
            <h3 className="type-title mb-4">Sitecore Headless CMS</h3>
            <EvidenceList>
              <EvidenceItem>Decoupled content management</EvidenceItem>
              <EvidenceItem>API-driven content delivery</EvidenceItem>
              <EvidenceItem>Content preview capabilities</EvidenceItem>
              <EvidenceItem>Multi-site content sharing</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>

          <EvidencePanel>
            <h3 className="type-title mb-4">Performance & Azure</h3>
            <EvidenceList>
              <EvidenceItem>Azure Blob Storage for assets</EvidenceItem>
              <EvidenceItem>TypeScript serverless functions</EvidenceItem>
              <EvidenceItem>Next.js SSR and SSG</EvidenceItem>
              <EvidenceItem>Image optimization and CDN delivery</EvidenceItem>
            </EvidenceList>
          </EvidencePanel>
        </div>
      </CaseStudySection>

      <CaseStudySection title="Technical Architecture">
        <EvidencePanel>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="type-title mb-4">Publishing path</h3>
              <EvidenceList>
                <EvidenceItem>Sitecore holds authored content.</EvidenceItem>
                <EvidenceItem>
                  The Next.js application receives and renders that content.
                </EvidenceItem>
                <EvidenceItem>
                  Azure provides the delivery services.
                </EvidenceItem>
              </EvidenceList>
            </div>
            <div>
              <h3 className="type-title mb-4">Implementation</h3>
              <EvidenceList>
                <EvidenceItem>React and TypeScript components</EvidenceItem>
                <EvidenceItem>Storybook component documentation</EvidenceItem>
                <EvidenceItem>Azure Blob Storage and Functions</EvidenceItem>
                <EvidenceItem>Next.js SSR and SSG</EvidenceItem>
              </EvidenceList>
            </div>
          </div>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Project Impact">
        <EvidencePanel>
          <h3 className="type-title mb-4">Modern redesign benefits</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="type-title mb-4">Technical improvements</h4>
              <EvidenceList>
                <EvidenceItem>
                  Responsive presentation across device sizes
                </EvidenceItem>
                <EvidenceItem>
                  Component-driven architecture for maintenance
                </EvidenceItem>
                <EvidenceItem>SEO and accessibility support</EvidenceItem>
              </EvidenceList>
            </div>
            <div>
              <h4 className="type-title mb-4">Content management</h4>
              <EvidenceList>
                <EvidenceItem>Decoupled headless CMS architecture</EvidenceItem>
                <EvidenceItem>Content preview for editors</EvidenceItem>
                <EvidenceItem>Azure cloud infrastructure</EvidenceItem>
                <EvidenceItem>TypeScript development</EvidenceItem>
              </EvidenceList>
            </div>
          </div>
        </EvidencePanel>
      </CaseStudySection>

      <CaseStudySection title="Website Showcase">
        <p className="type-body text-line-soft measure mb-6">
          These cleared screenshots show public pages from the University of
          Idaho website. Use the tabs to compare sections of the live site.
        </p>
        <TabbedScreenshotGallery pages={screenshotPages} defaultPage={0} />
        <p className="type-body text-line-soft mt-4 text-sm">
          Screenshots captured January 2026. Visit{" "}
          <a
            href="https://www.uidaho.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-annotation underline underline-offset-4"
          >
            uidaho.edu
          </a>{" "}
          for the current site.
        </p>
      </CaseStudySection>
    </main>
  );
}
