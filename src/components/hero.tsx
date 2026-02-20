import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-section";

const Hero = () => {
  return (
    <section className="hero-bg flex min-h-[80vh] flex-col items-start justify-center px-4 sm:px-8 md:px-16">
      <div className="container">
        <AnimatedText delay={0}>
          <h1 className="font-bold tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            ENTERPRISE
            <br />
            <span className="text-accent">INTELLIGENCE &</span>
            <br />
            APPLICATIONS
          </h1>
        </AnimatedText>
        <AnimatedText delay={200}>
          <p className="mt-3 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Abstracting the knowledge from knowledge work.
          </p>
        </AnimatedText>
        <AnimatedText delay={400}>
          <div className="mt-8 flex items-center">
            <Button
              asChild
              variant="accent"
              className="border-border/20"
              aria-label="View Selected Projects"
            >
              <Link href="/#work">Selected Projects</Link>
            </Button>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
};

export default Hero;
