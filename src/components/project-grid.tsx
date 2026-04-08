import ProjectCard from "@/components/project-card";
import { AnimatedCard } from "@/components/ui/animated-section";
import adlcImage from "@/assets/adlc-architecture.svg";
import profileExtractorImage from "@/assets/profile-extractor.png";
import myuiImage from "@/assets/myui.png";
import mikrotikConfigGenImage from "@/assets/mikrotik-config-gen.png";
import uidahoWebsiteImage from "@/assets/uidaho-explore-hero.webp";

const ProjectGrid = () => {
  return (
    <section id="work" className="py-20 pt-20">
      <div className="container px-4 sm:px-8 md:px-16">
        <div className="grid gap-8 md:grid-cols-2">
          <AnimatedCard delay={0}>
            <ProjectCard
              title="Enterprise Agent Development Lifecycle"
              description="A TypeScript reference architecture for multi-agent autonomous coding systems built on Anthropic's Claude Agent SDK, synthesizing five Anthropic research documents."
              link="/projects/agent-development-lifecycle"
              image={adlcImage}
              tags={["TypeScript", "Claude Agent SDK", "Multi-Agent"]}
            />
          </AnimatedCard>
          <AnimatedCard delay={100}>
            <ProjectCard
              title="University of Idaho Website"
              description="A modern redesign of the University of Idaho website built with Sitecore, Next.js, TypeScript, Storybook, and Azure services."
              link="/projects/uidaho-website"
              image={uidahoWebsiteImage}
              tags={["TypeScript", "Next.js", "Sitecore"]}
            />
          </AnimatedCard>
          <AnimatedCard delay={200}>
            <ProjectCard
              title="AI Data Extraction Research"
              description="Research spike exploring the feasibility of using foundation models to extract faculty and staff profile data for the University of Idaho website."
              link="/projects/profile-extractor"
              image={profileExtractorImage}
              tags={["Python", "LangGraph", "Gemini Flash"]}
            />
          </AnimatedCard>
          <AnimatedCard delay={300}>
            <ProjectCard
              title="MyUI"
              description="Lead developer for University of Idaho's modernized dashboard, creating custom React components to streamline student access to university services."
              link="/projects/myui"
              image={myuiImage}
              tags={["JavaScript", "React", "Ellucian Experience"]}
            />
          </AnimatedCard>
          <AnimatedCard delay={400}>
            <ProjectCard
              title="Mikrotik Configuration Generator"
              description="A cross-platform desktop application that standardizes router configurations for ISP technicians, built with Go and Wails."
              link="/projects/mikrotik-config-gen"
              image={mikrotikConfigGenImage}
              tags={["Go", "Wails", "React"]}
            />
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
