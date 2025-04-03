"use client";

import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-14 items-center justify-between px-16">
          <Link className="text-lg font-bold" href="/">
            n_cole_summers
          </Link>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => {
                document.getElementById("work")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="text-sm hover:text-gray-300 cursor-pointer"
            >
              Work
            </button>
            <Link href="/about" className="text-sm hover:text-gray-300">
              About
            </Link>
            <Link
              href="https://www.linkedin.com/in/n-cole-summers/"
              target="_blank"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com/ncolesummers/" target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://www.instagram.com/ncolesummers/"
              target="_blank"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:n_cole_summers@icloud.com">
              <Button className="bg-white text-black hover:bg-gray-200">
                Contact me
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="flex min-h-[80vh] flex-col items-start justify-center px-16">
          <div className="container">
            <h1 className="font-bold tracking-tighter text-6xl sm:text-6xl md:text-7xl lg:text-10xl">
              ENTERPRISE
              <br />
              INTELLIGENCE &
              <br />
              APPLICATIONS
            </h1>
            <p className="mt-3 text-xl text-gray-400 max-w-2xl">
              Abstracting the knowledge from knowledge work.
            </p>
            <div className="mt-8 flex items-center">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  document.getElementById("work")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                selected projects
              </Button>
            </div>
          </div>
        </section>

        <section id="work" className="py-20 pt-20">
          <div className="container px-16">
            <div className="grid gap-8 md:grid-cols-2">
              <ProjectCard
                title="University of Idaho Website"
                description="A modern redesign of the University of Idaho website built with Sitecore, Next.js, TypeScript, Storybook, and C#."
                comingSoon={true}
              />
              <ProjectCard
                title="AI Data Extraction Research"
                description="Research spike exploring the feasibility of using foundation models to extract faculty and staff profile data for the University of Idaho website."
                link="/projects/profile-extractor"
                hasCase={true}
              />
              <ProjectCard
                title="MyUI"
                description="Lead developer for University of Idaho's modernized dashboard, creating custom React components to streamline student access to university services."
                link="/projects/myui"
                hasCase={true}
              />
              <ProjectCard
                title="Mikrotik Configuration Generator"
                description="A cross-platform desktop application that standardizes router configurations for ISP technicians, built with Go and Wails."
                link="/projects/mikrotik-config-gen"
                hasCase={true}
              />
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal">
              GOT THAT COOL IDEA?
            </h2>
            <p className="mb-8 text-sm sm:text-base md:text-lg text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal">
              I'm open to new opportunities and would love to hear from you.
            </p>
            <Link href="mailto:n_cole_summers@icloud.com">
              <Button className="bg-white text-black hover:bg-gray-200">
                Contact me
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-6">
            <Link
              href="https://www.linkedin.com/in/n-cole-summers/"
              target="_blank"
              className="text-white hover:text-gray-300"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/ncolesummers/"
              target="_blank"
              className="text-white hover:text-gray-300"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/ncolesummers/"
              target="_blank"
              className="text-white hover:text-gray-300"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-sm text-gray-400">all socials @ncolesummers</p>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  link = "#",
  hasCase = false,
  comingSoon = false,
}: {
  title: string;
  description: string;
  link?: string;
  hasCase?: boolean;
  comingSoon?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Link href={comingSoon ? "#" : link} className="block">
        <div className="aspect-video w-full bg-gray-800" />
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-gray-400">{description}</p>
          {comingSoon ? (
            <div className="mt-4 inline-flex h-10 items-center rounded-md border border-white/20 bg-black px-4 py-2 text-sm font-medium text-white">
              Coming Soon
            </div>
          ) : (
            <Button
              variant="outline"
              className="mt-4 border-white/20 text-white hover:bg-white/10"
            >
              {hasCase ? "View case study" : "View project"}
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
}
