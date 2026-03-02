import { useCallback, memo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AwardsSection from "@/components/AwardsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const navigateToSection = (section: string) => {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView();
  }
};

const MemoizedHeader = memo(Header);

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <MemoizedHeader onNavigate={navigateToSection} />
      <ScrollProgressBar />

      <main>
        <HeroSection onNavigate={navigateToSection} />
        <ProjectsSection />
        <ExperienceSection />
        <AwardsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
