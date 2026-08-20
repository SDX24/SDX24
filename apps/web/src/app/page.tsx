import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";

export default function Home() {
  return (
    <main id="main" className="relative min-h-screen overflow-x-hidden bg-surface text-white">
      <div className="relative z-10">
        <HeroSection />
        <WorkSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  );
}
