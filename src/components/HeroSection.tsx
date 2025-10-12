import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { AccessModal } from "./AccessModal";

const GravitationalLensing = () => {
  const [numbers] = useState(() => 
    Array.from({ length: 8 }, () => Math.floor(Math.random() * 9999))
  );

  return (
    <div className="flex gap-4 justify-center items-center my-6 overflow-hidden">
      {numbers.map((num, i) => (
        <span
          key={i}
          className="text-secondary font-mono text-sm md:text-base animate-lensing"
          style={{
            animationDelay: `${i * 0.2}s`,
          }}
        >
          {num}
        </span>
      ))}
    </div>
  );
};

export const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl w-full animate-fade-in">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border-glow-cyan">
            <Zap className="w-4 h-4 text-secondary animate-glow-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              Next-Generation Analytics
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-gradient-cyan">Transcend</span> the{" "}
            <span className="text-gradient-purple">Event Horizon</span>
            <br />
            of Data
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl font-mono text-foreground max-w-3xl mx-auto leading-relaxed">
            Cosmic Flow AI: Organizing vast data streams into inevitable, actionable futures.
          </p>

          {/* Gravitational Lensing Effect */}
          <GravitationalLensing />

          {/* CTA Button */}
          <div className="flex justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={() => setModalOpen(true)}
            >
              Access the Data Stream
            </Button>
          </div>
        </div>
      </div>

      <AccessModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
