import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-section";

const Hero = () => {
  return (
    <section className="flex min-h-[80vh] flex-col items-start justify-center">
      <div>
        <AnimatedText delay={0}>
          <h1 className="type-display">
            ENTERPRISE
            <br />
            INTELLIGENCE &
            <br />
            APPLICATIONS
          </h1>
        </AnimatedText>
        <AnimatedText delay={200}>
          <p className="type-body text-line-soft measure mt-6">
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
