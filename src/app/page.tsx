import Statement from "@/components/statement";
import DeliveryLoopFigure from "@/components/figures/delivery-loop-figure";
import ProjectGrid from "@/components/project-grid";
import ContactForm from "@/components/contact-form";
import SocialLinks from "@/components/social-links";

export default function Page() {
  return (
    <main id="main-content" className="sheet">
      <Statement />
      <DeliveryLoopFigure />
      <ProjectGrid />
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="type-headline mb-8 text-center">Get In Touch</h2>
          <ContactForm />
          <SocialLinks className="mt-8 justify-center" />
        </div>
      </section>
    </main>
  );
}
