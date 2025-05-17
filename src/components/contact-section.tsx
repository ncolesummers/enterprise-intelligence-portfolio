import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="py-32">
      <div className="container px-4 text-center">
        <h2 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          GOT THAT COOL IDEA?
        </h2>
        <p className="mb-8 text-sm sm:text-base md:text-lg text-gray-400">
          I&apos;m open to new opportunities and would love to hear from you.
        </p>
        <a href="mailto:n_cole_summers@icloud.com">
          <Button className="bg-white text-black hover:bg-gray-200">
            Contact me
          </Button>
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
