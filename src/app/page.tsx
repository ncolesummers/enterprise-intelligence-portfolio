"use client";

import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <ProjectGrid />
        <section className="py-32">
          <div className="container px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              GOT THAT COOL IDEA?
            </h2>
            <p className="mb-8 text-sm sm:text-base md:text-lg text-gray-400">
              I&apos;m open to new opportunities and would love to hear from
              you.
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
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/ncolesummers/"
              target="_blank"
              className="text-white hover:text-gray-300"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/ncolesummers/"
              target="_blank"
              className="text-white hover:text-gray-300"
              aria-label="Instagram Profile"
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
