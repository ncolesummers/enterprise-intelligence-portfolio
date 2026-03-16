import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Bot,
  Code,
  Github,
  Linkedin,
  Mail,
  Music,
  Utensils,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import ContentCard from "@/components/ui/content-card";
import BulletedList, { ListItem } from "@/components/ui/bulleted-list";
import Section from "@/components/ui/section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "About Nathan Cole Summers",
  description:
    "Enterprise Applications Developer specializing in SDLC automation with AI agents and human-in-the-loop workflows. Building intelligent systems that amplify developer productivity.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main id="main-content" className="container py-12 px-4">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            Nathan Cole Summers
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
            Enterprise Applications Developer building intelligent systems that
            keep humans in the loop
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link
                href="https://www.linkedin.com/in/n-cole-summers/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link
                href="https://github.com/ncolesummers/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <a href="mailto:nate@ncolesummers.com">
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
          </div>
        </div>

        {/* Professional Experience */}
        <Section title="Professional Journey">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-muted-foreground">
                I&apos;m currently an Enterprise Applications Developer at the
                University of Idaho, where I focus on integrating AI agents into
                the software development lifecycle. With 9 years of IT
                experience and 5 years of application development, I build
                systems that automate repetitive workflows while keeping
                developers in control.
              </p>
              <p className="mb-4 text-lg text-muted-foreground">
                I&apos;ve been leveraging AI to accelerate software development
                since the technical preview of GitHub Copilot in June 2021 —
                long before the current wave of AI tooling. That early
                experience shaped how I think about human-AI collaboration: what
                to automate, what to leave to developers, and where the
                boundaries should be.
              </p>
              <p className="text-lg text-muted-foreground">
                I work across TypeScript, Python, Go, C#, and Rust — choosing
                the right tool for each problem rather than defaulting to one
                stack.
              </p>
            </div>
            <ContentCard>
              <h3 className="mb-4 text-xl font-semibold">Focus Areas</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">
                      SDLC Automation with AI Agents
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Designing agent workflows that handle code review,
                      testing, and deployment tasks autonomously.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Workflow className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">
                      Human-in-the-Loop AI Workflows
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Building systems where AI accelerates decisions but humans
                      retain authority over critical paths.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium">
                      Enterprise Application Development
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Full-stack systems built for reliability, security, and
                      maintainability at organizational scale.
                    </p>
                  </div>
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
              <p className="mb-4 text-lg text-muted-foreground">
                I believe the best AI-assisted workflows are the ones where
                humans stay in the driver&apos;s seat. Automation should
                eliminate toil, not judgment — freeing developers to focus on
                architecture, design, and the decisions that matter.
              </p>
              <p className="mb-4 text-lg text-muted-foreground">
                I&apos;m drawn to the intersection of AI-powered developer tools
                and enterprise software — where automation can meaningfully
                reduce cycle time without sacrificing reliability or developer
                trust.
              </p>
              <p className="text-lg text-muted-foreground">
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
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Reading</h3>
              <p className="text-muted-foreground">
                Lost in the pages of fantasy or sci-fi novels, though my reading
                interests span from self-development to history, politics, and
                science.
              </p>
            </ContentCard>
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Music</h3>
              <p className="text-muted-foreground">
                Drawn to electronic and alternative music. Apple Music&apos;s
                lyrics feature has been a game-changer for my listening
                experience.
              </p>
            </ContentCard>
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Gaming</h3>
              <p className="text-muted-foreground">
                Occasionally dive into video games as a way to unwind and
                explore interactive storytelling and creative problem-solving.
              </p>
            </ContentCard>
            <ContentCard>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Food & Music</h3>
              <p className="text-muted-foreground">
                Can always be tempted away from work with the promise of good
                food and live music—the perfect combination for recharging.
              </p>
            </ContentCard>
          </div>
        </Section>

        {/* Call to Action */}
        <Section title="Let's Connect" className="text-center">
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re exploring SDLC automation, building
            human-in-the-loop AI systems, or just want to chat about the latest
            sci-fi novel, I&apos;d love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="accent">
              <a href="mailto:nate@ncolesummers.com">Get in Touch</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">View My Work</Link>
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
