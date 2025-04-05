"use client";

import Header from "@/components/header";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <ProjectGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
