import Header from "@/components/header";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import ContactSection from "@/components/contact-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content">
        <Hero />
        <ProjectGrid />
        <ContactSection />
        <section id="contact" className="py-32">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
