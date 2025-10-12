import { Database, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FeaturesSection = () => {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: Database,
      title: "Gravitational Data Well",
      description: "Ingest and harmonize petabytes across any known source and dimension.",
    },
    {
      icon: Sparkles,
      title: "Quantum Distortion Engine",
      description: "Proprietary AI instantly warps unstructured data into predictive models.",
    },
    {
      icon: TrendingUp,
      title: "Future State Projection",
      description: "Simulate outcomes beyond the horizon of traditional analytics.",
    },
  ];

  return (
    <section id="features" className="relative flex items-center justify-center px-4 py-20">
      <div className="rounded-3xl p-8 md:p-12 lg:p-16 max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-mono text-gradient-purple text-center mb-16">
          Harnessing the Gravity of True Insight
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:border-glow-cyan transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full glass border-glow-cyan">
                  <feature.icon className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-mono text-foreground text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="hero"
            size="lg"
            onClick={scrollToPricing}
          >
            Explore All Capabilities
          </Button>
        </div>
      </div>
    </section>
  );
};