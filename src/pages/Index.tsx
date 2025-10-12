import { BlackHoleBackground } from "@/components/BlackHoleBackground";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { InsightsSection } from "@/components/InsightsSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Toaster } from "@/components/ui/toaster";
import { useScrollFade } from "@/hooks/useScrollFade";

const Index = () => {
  useScrollFade();
  
  return (
    <main className="relative min-h-screen">
      <BlackHoleBackground />
      <div className="fixed top-0 left-0 z-50 w-full">
        <Logo />
        <Navigation />
      </div>
      
      <HeroSection />
      <FeaturesSection />
      <InsightsSection />
      <PricingSection />
      <ContactSection />

      <Toaster />
    </main>
  );
};

export default Index;
