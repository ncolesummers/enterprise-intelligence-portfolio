import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import ContentCard from "@/components/ui/content-card";
import BulletedList, { ListItem } from "@/components/ui/bulleted-list";
import Section from "@/components/ui/section";
import { generatePageMetadata } from "@/lib/metadata";
import TabbedScreenshotGallery from "@/components/tabbed-screenshot-gallery";

// Screenshot imports
import applyDesktop from "@/assets/uidaho-screenshots/uidaho-apply-desktop.webp";
import costsDesktop from "@/assets/uidaho-screenshots/uidaho-costs-desktop.webp";
import studentsDesktop from "@/assets/uidaho-screenshots/uidaho-current-students-desktop.webp";
import exploreDesktop from "@/assets/uidaho-screenshots/uidaho-explore-desktop.webp";
import giftDesktop from "@/assets/uidaho-screenshots/uidaho-make-a-gift-desktop.webp";

export const metadata = generatePageMetadata({
  title: "University of Idaho Website Redesign",
  description:
    "Full-stack developer for University of Idaho's modern website redesign using Sitecore, Next.js, TypeScript, Storybook, Azure Blob Storage, and serverless functions.",
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
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 px-4">
        <div className="container flex pl-2 h-14 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container py-12 px-4">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            University of Idaho Website
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-400">
            A modern redesign of the University of Idaho website built with
            Sitecore CMS, Next.js, TypeScript, and Azure cloud services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://www.uidaho.edu" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live Site
              </Button>
            </Link>
          </div>

          {/* Tech Stack Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              "Next.js",
              "TypeScript",
              "Sitecore",
              "Tailwind CSS",
              "Storybook",
              "Azure",
            ].map(tech => (
              <span
                key={tech}
                className="rounded-full bg-white/10 px-3 py-1 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <Section title="Introduction">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-300">
                The University of Idaho website redesign represents a
                comprehensive modernization of the university&apos;s digital
                presence, transitioning to a headless CMS architecture powered
                by Sitecore and Next.js.
              </p>
              <p className="mb-4 text-lg text-gray-300">
                As a full-stack developer on this project, I worked across the
                entire technology stack—from building reusable React components
                with Storybook to implementing Azure Blob Storage and serverless
                functions for dynamic content delivery.
              </p>
              <p className="text-lg text-gray-300">
                This project demonstrates enterprise-level architecture with a
                focus on performance, scalability, and maintainability.
              </p>
            </div>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Project Highlights</h3>
              <BulletedList>
                <ListItem>
                  Headless CMS architecture with Sitecore and Next.js
                </ListItem>
                <ListItem>Component-driven development with Storybook</ListItem>
                <ListItem>
                  Azure Blob Storage for media asset management
                </ListItem>
                <ListItem>
                  TypeScript serverless functions for dynamic content
                </ListItem>
                <ListItem>Performance optimizations with SSR and SSG</ListItem>
                <ListItem>Responsive design with Tailwind CSS</ListItem>
              </BulletedList>
            </ContentCard>
          </div>
        </Section>

        {/* My Role */}
        <Section title="My Role & Responsibilities">
          <ContentCard>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Full-Stack Development
                </h3>
                <p className="text-gray-300">
                  Developed across the entire technology stack, from frontend
                  React components to backend Azure services. Focused on
                  creating a seamless integration between Sitecore&apos;s
                  headless CMS and the Next.js frontend.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Key Contributions
                </h3>
                <BulletedList>
                  <ListItem>
                    <strong className="mr-1">Component Architecture:</strong>
                    Built reusable React components with TypeScript and
                    documented them in Storybook for consistent UI patterns
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Azure Integration:</strong>
                    Implemented Azure Blob Storage for Anonymized Poll Data
                    management and created serverless functions for storage and
                    analytics.
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Performance Optimization:</strong>
                    Leveraged Next.js features including Server-Side Rendering
                    (SSR), Static Site Generation (SSG), and image optimization
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Sitecore Integration:</strong>
                    Integrated with Sitecore&apos;s headless APIs to deliver
                    content from the CMS to the Next.js frontend
                  </ListItem>
                </BulletedList>
              </div>
            </div>
          </ContentCard>
        </Section>

        {/* Key Features */}
        <Section title="Key Features & Technologies">
          <div className="grid gap-6 md:grid-cols-3">
            <ContentCard>
              <h3 className="mb-3 text-lg font-semibold">
                Component Library & Storybook
              </h3>
              <p className="mb-3 text-gray-300">
                Developed a comprehensive component library using React and
                TypeScript, documented in Storybook for team collaboration and
                consistency.
              </p>
              <BulletedList>
                <ListItem>Reusable UI components</ListItem>
                <ListItem>Interactive component documentation</ListItem>
                <ListItem>Visual regression testing</ListItem>
                <ListItem>Design system enforcement</ListItem>
              </BulletedList>
            </ContentCard>

            <ContentCard>
              <h3 className="mb-3 text-lg font-semibold">
                Sitecore Headless CMS
              </h3>
              <p className="mb-3 text-gray-300">
                Implemented a headless CMS architecture connecting Sitecore to
                the Next.js frontend via REST APIs and GraphQL.
              </p>
              <BulletedList>
                <ListItem>Decoupled content management</ListItem>
                <ListItem>API-driven content delivery</ListItem>
                <ListItem>Content preview capabilities</ListItem>
                <ListItem>Multi-site content sharing</ListItem>
              </BulletedList>
            </ContentCard>

            <ContentCard>
              <h3 className="mb-3 text-lg font-semibold">
                Performance & Azure
              </h3>
              <p className="mb-3 text-gray-300">
                Utilized Next.js performance features and Azure services for
                optimal load times and scalability.
              </p>
              <BulletedList>
                <ListItem>Azure Blob Storage for assets</ListItem>
                <ListItem>TypeScript serverless functions</ListItem>
                <ListItem>Next.js SSR and SSG</ListItem>
                <ListItem>Image optimization & CDN</ListItem>
              </BulletedList>
            </ContentCard>
          </div>
        </Section>

        {/* Technical Architecture */}
        <Section title="Technical Architecture">
          <ContentCard>
            <h3 className="mb-4 text-xl font-semibold">Technology Stack</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-white">Frontend</h4>
                <BulletedList>
                  <ListItem>
                    <strong className="mr-1">Next.js:</strong>React framework
                    with SSR/SSG capabilities
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">TypeScript:</strong>Type-safe
                    development
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Tailwind CSS:</strong>Utility-first
                    styling
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Storybook:</strong>Component
                    documentation and testing
                  </ListItem>
                </BulletedList>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-white">
                  Backend & Infrastructure
                </h4>
                <BulletedList>
                  <ListItem>
                    <strong className="mr-1">Sitecore:</strong>Headless CMS for
                    content management
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Azure Blob Storage:</strong>
                    Scalable media storage
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">Azure Functions:</strong>Serverless
                    TypeScript functions
                  </ListItem>
                  <ListItem>
                    <strong className="mr-1">REST APIs & GraphQL:</strong>
                    Content delivery
                  </ListItem>
                </BulletedList>
              </div>
            </div>
          </ContentCard>
        </Section>

        {/* Project Impact */}
        <Section title="Project Impact">
          <ContentCard>
            <h3 className="mb-4 text-xl font-semibold">
              Modern Redesign Benefits
            </h3>
            <p className="mb-4 text-gray-300">
              The redesigned University of Idaho website represents a
              significant technological advancement from the legacy system,
              delivering improved performance, scalability, and user experience.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-white">
                  Technical Improvements
                </h4>
                <BulletedList>
                  <ListItem>
                    50%+ faster page load times with Next.js SSG/SSR
                  </ListItem>
                  <ListItem>
                    Fully responsive design across all device sizes
                  </ListItem>
                  <ListItem>
                    Component-driven architecture for easier maintenance
                  </ListItem>
                  <ListItem>Improved SEO and accessibility compliance</ListItem>
                </BulletedList>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-white">
                  Content Management
                </h4>
                <BulletedList>
                  <ListItem>Decoupled headless CMS architecture</ListItem>
                  <ListItem>Content preview capabilities for editors</ListItem>
                  <ListItem>Scalable Azure cloud infrastructure</ListItem>
                  <ListItem>TypeScript for type-safe development</ListItem>
                </BulletedList>
              </div>
            </div>
          </ContentCard>
        </Section>

        {/* Website Showcase */}
        <Section title="Website Showcase">
          <p className="mb-6 text-gray-300">
            Explore screenshots of key pages from the University of Idaho
            website. Switch between tabs to view different sections of the site,
            showcasing the modern design and comprehensive content architecture.
          </p>
          <TabbedScreenshotGallery pages={screenshotPages} defaultPage={0} />
          <p className="mt-4 text-sm text-gray-400">
            Screenshots captured January 2026. Visit{" "}
            <a
              href="https://www.uidaho.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              uidaho.edu
            </a>{" "}
            for the live site experience.
          </p>
        </Section>

        {/* Call to Action */}
        <section className="mt-16 rounded-lg border border-white/10 bg-gradient-to-br from-gray-900 to-black p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Interested in Learning More?
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            Explore the live University of Idaho website or get in touch to
            discuss enterprise web development projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://www.uidaho.edu" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                Visit uidaho.edu
              </Button>
            </Link>
            <Link href="/#contact">
              <Button className="bg-white text-black hover:bg-gray-200">
                Contact Me
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
