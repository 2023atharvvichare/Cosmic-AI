import { BlackHoleBackground } from "@/components/BlackHoleBackground";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { InsightsSection } from "@/components/InsightsSection";
import { PricingSection } from "@/components/PricingSection";
import { ContactSection } from "@/components/ContactSection";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <main className="relative min-h-screen">
      <BlackHoleBackground />
      <Logo />
      <Navigation />
      
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <InsightsSection />
        <PricingSection />
        <ContactSection />
      </div>

      <Toaster />
    </main>
  );
};

export default Index;
