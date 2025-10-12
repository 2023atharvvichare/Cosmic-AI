import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "We no longer guess. Cosmic Flow provides a gravitational certainty in the market. Worth the investment.",
    author: "Lead Strategist",
    company: "Chronos Dynamics",
  },
  {
    quote: "The Quantum Distortion Engine transformed our data chaos into actionable intelligence overnight.",
    author: "Chief Data Officer",
    company: "Nexus Technologies",
  },
  {
    quote: "Future State Projection gave us insights we didn't even know we needed. Revolutionary.",
    author: "VP of Analytics",
    company: "Stellar Innovations",
  },
];

export const InsightsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="insights" className="relative flex items-center justify-center px-4 py-20">
      <div className="rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-mono text-foreground text-center mb-12">
          Clients Reaching Singularity
        </h2>

        {!showCarousel ? (
          <>
            <div className="mb-12 text-center">
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic mb-6 leading-relaxed">
                "{testimonials[0].quote}"
              </blockquote>
              <p className="text-secondary font-mono">
                - {testimonials[0].author}, {testimonials[0].company}
              </p>
            </div>

            <div className="text-center mb-12">
              <div className="inline-block glass rounded-2xl px-8 py-6 border-glow-cyan">
                <p className="text-5xl font-bold text-gradient-cyan mb-2">99.99%</p>
                <p className="text-sm font-mono text-muted-foreground">Data Uptime Guarantee</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => setShowCarousel(true)}
              >
                Discover Success Stories
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8 min-h-[300px] flex flex-col justify-center border-glow-purple">
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic mb-6 leading-relaxed text-center">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <p className="text-secondary font-mono text-center">
                - {testimonials[currentIndex].author}, {testimonials[currentIndex].company}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="glass border-secondary/20 hover:border-secondary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-secondary w-8' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="glass border-secondary/20 hover:border-secondary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};