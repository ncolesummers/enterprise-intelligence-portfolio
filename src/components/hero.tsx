import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="flex min-h-[80vh] flex-col items-start justify-center px-4 sm:px-8 md:px-16">
      <div className="container">
        <h1 className="font-bold tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          ENTERPRISE
          <br />
          INTELLIGENCE &
          <br />
          APPLICATIONS
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-400 max-w-2xl">
          Abstracting the knowledge from knowledge work.
        </p>
        <div className="mt-8 flex items-center">
          <Button
            variant="default"
            className="border-white/20 text-black hover:bg-white/10"
            onClick={() => {
              document.getElementById("work")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            aria-label="View Selected Projects"
          >
            Selected Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
