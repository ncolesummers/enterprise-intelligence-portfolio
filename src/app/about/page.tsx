import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import ContentCard from "@/components/ui/content-card";
import BulletedList, { ListItem } from "@/components/ui/bulleted-list";
import Section from "@/components/ui/section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-14 items-center justify-between">
          <Link className="text-lg font-bold" href="/">
            n_cole_summers
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm hover:text-gray-300">
              Work
            </Link>
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

      <main className="container py-12 px-4">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            Nathan Cole Summers
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-400">
            Enterprise Applications Developer with a passion for microservice
            architecture and continuous learning
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="https://www.linkedin.com/in/n-cole-summers/"
              target="_blank"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </Link>
            <Link href="https://github.com/ncolesummers/" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link href="mailto:n_cole_summers@icloud.com">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </Link>
          </div>
        </div>

        {/* Professional Experience */}
        <Section title="Professional Journey">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-300">
                I&apos;m currently an Enterprise Applications Developer at the
                University of Idaho in Moscow, Idaho, where I leverage my 9
                years of IT experience and 5 years of focused application
                development to create innovative solutions.
              </p>
              <p className="text-lg text-gray-300">
                As a polyglot programmer, I work confidently across multiple
                programming languages including TypeScript, Python, Go, C#, and
                Rust. This versatility allows me to select the perfect tool for
                each specific challenge.
              </p>
            </div>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Technical Expertise
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Python
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Go
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      C#
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Rust
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Specialties</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Microservice Architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Enterprise Applications
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      AI Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Full-Stack Development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      System Architecture
                    </li>
                  </ul>
                </div>
              </div>
            </ContentCard>
          </div>
        </Section>

        {/* Philosophy & Approach */}
        <Section title="Philosophy & Approach">
          <div className="grid gap-8 md:grid-cols-2">
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">
                Professional Certifications
              </h3>
              <BulletedList>
                <ListItem>Security+ Certification</ListItem>
                <ListItem>Advanced Certified Scrum Master</ListItem>
                <ListItem>Certified Scrum Developer</ListItem>
                <ListItem>Certified Scrum Product Owner</ListItem>
              </BulletedList>
            </ContentCard>
            <div>
              <p className="mb-4 text-lg text-gray-300">
                My passion lies in microservice architecture—finding the perfect
                programming language for each specific component of a larger
                system. This approach reflects my broader philosophy of
                continuous learning and insatiable curiosity.
              </p>
              <p className="mb-4 text-lg text-gray-300">
                I&apos;m particularly energized by projects involving
                cutting-edge technologies like artificial intelligence, where I
                can push the boundaries of what&apos;s possible in enterprise
                applications.
              </p>
              <p className="text-lg text-gray-300">
                I strongly believe in blameless postmortems as a way to build
                stronger teams and better systems. This approach fosters a
                culture of learning and improvement rather than finger-pointing.
              </p>
            </div>
          </div>
        </Section>

        {/* Personal Interests */}
        <Section title="Beyond the Code">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Reading</h3>
              <p className="text-gray-300">
                Lost in the pages of fantasy or sci-fi novels, though my reading
                interests span from self-development to history, politics, and
                science.
              </p>
            </ContentCard>
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Music</h3>
              <p className="text-gray-300">
                Drawn to electronic and alternative music. Apple Music&apos;s
                lyrics feature has been a game-changer for my listening
                experience.
              </p>
            </ContentCard>
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Gaming</h3>
              <p className="text-gray-300">
                Occasionally dive into video games as a way to unwind and
                explore interactive storytelling and creative problem-solving.
              </p>
            </ContentCard>
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Food & Music</h3>
              <p className="text-gray-300">
                Can always be tempted away from work with the promise of good
                food and live music—the perfect combination for recharging.
              </p>
            </ContentCard>
          </div>
        </Section>

        {/* Call to Action */}
        <Section title="Let&apos;s Connect" className="text-center">
          <p className="mb-8 text-lg text-gray-400 max-w-2xl mx-auto">
            Whether you&apos;re interested in discussing enterprise
            applications, microservice architecture, or just want to chat about
            the latest sci-fi novel, I&apos;d love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="mailto:n_cole_summers@icloud.com">
              <Button className="bg-white text-black hover:bg-gray-200">
                Get in Touch
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                View My Work
              </Button>
            </Link>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-6 mt-16">
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
