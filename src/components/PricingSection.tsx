import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { AccessModal } from "./AccessModal";

export const PricingSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setModalOpen(true), 500);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const plans = [
    {
      name: "Stream",
      tier: "Free",
      price: "$0",
      period: "/month",
      description: "Entry point to the data dimension",
      features: [
        "Up to 1GB data processing",
        "Basic analytics dashboard",
        "Email support",
        "Standard data integration",
      ],
      buttonText: "Start Free Stream",
      action: scrollToHero,
    },
    {
      name: "Horizon",
      tier: "Pro",
      price: "$299",
      period: "/month",
      description: "Cross the professional threshold",
      features: [
        "Up to 100GB data processing",
        "Quantum Distortion Engine access",
        "Priority support",
        "Advanced predictive models",
        "Custom integrations",
        "Real-time collaboration",
      ],
      popular: true,
      buttonText: "Upgrade to Horizon",
      action: () => setModalOpen(true),
    },
    {
      name: "Singularity",
      tier: "Enterprise",
      price: "Custom",
      period: "",
      description: "Reach the ultimate data dimension",
      features: [
        "Unlimited data processing",
        "Full Future State Projection",
        "24/7 dedicated support",
        "Custom AI model training",
        "White-label solutions",
        "Dedicated account team",
        "On-premise deployment option",
      ],
      buttonText: "Contact for Singularity",
      action: scrollToContact,
    },
  ];

  return (
    <section id="pricing" className="relative flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono text-gradient-purple mb-4">
            Choose Your Data Dimension
          </h2>
          <p className="text-muted-foreground text-lg font-mono">
            Scale your insights from stream to singularity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'border-glow-purple' : ''
              }`}
            >
              {plan.popular && (
                <div className="text-accent text-sm font-mono font-semibold mb-4 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-secondary font-mono mb-4">{plan.tier}</p>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gradient-cyan">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground font-mono">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                onClick={plan.action}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <AccessModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};