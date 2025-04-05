import ProjectCard from "@/components/project-card";
import profileExtractorImage from "@/assets/profile-extractor.png";
import myuiImage from "@/assets/myui.png";
import mikrotikConfigGenImage from "@/assets/mikrotik-config-gen.png";
import uidahoWebsiteImage from "@/assets/uidaho-website.png";

const ProjectGrid = () => {
  return (
    <section id="work" className="py-20 pt-20">
      <div className="container px-4 sm:px-8 md:px-16">
        <div className="grid gap-8 md:grid-cols-2">
          <ProjectCard
            title="University of Idaho Website"
            description="A modern redesign of the University of Idaho website built with Sitecore, Next.js, TypeScript, Storybook, and C#."
            comingSoon={true}
            image={uidahoWebsiteImage}
          />
          <ProjectCard
            title="AI Data Extraction Research"
            description="Research spike exploring the feasibility of using foundation models to extract faculty and staff profile data for the University of Idaho website."
            link="/projects/profile-extractor"
            image={profileExtractorImage}
          />
          <ProjectCard
            title="MyUI"
            description="Lead developer for University of Idaho's modernized dashboard, creating custom React components to streamline student access to university services."
            link="/projects/myui"
            image={myuiImage}
          />
          <ProjectCard
            title="Mikrotik Configuration Generator"
            description="A cross-platform desktop application that standardizes router configurations for ISP technicians, built with Go and Wails."
            link="/projects/mikrotik-config-gen"
            image={mikrotikConfigGenImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
