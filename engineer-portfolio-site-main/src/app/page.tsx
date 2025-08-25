import { Navigation } from "@/components/navigation/modern-navbar";
import { HeroSection } from "@/components/portfolio/modern-hero-section";
import { SkillsSection } from "@/components/feature/modern-skills-section";
import { ProjectsGallery } from "@/components/gallery/modern-projects-gallery";
import { ContactSection } from "@/components/contact/modern-contact-section";
import { MinimalCenteredFooter } from "@/components/footers/minimal-centered-footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <ProjectsGallery />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <MinimalCenteredFooter />
    </main>
  );
}