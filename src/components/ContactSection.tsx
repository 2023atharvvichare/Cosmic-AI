import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle form submission
    console.log("Contact form submitted:", { name, email, message });
    
    toast({
      title: "Message Sent!",
      description: "Initiating secure quantum channel...",
      className: "glass border-glow-cyan",
    });

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="rounded-3xl p-8 md:p-12 lg:p-16 max-w-3xl w-full animate-fade-in opacity-0 transition-opacity duration-1000 scroll-fade-in">
        <h2 className="text-4xl md:text-5xl font-mono text-foreground text-center mb-6">
          Initiate Your Quantum Connection
        </h2>

        <p className="text-muted-foreground text-center mb-12 leading-relaxed">
          Our dedicated team of astrophysicists and data architects is ready to guide your journey past the Event Horizon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-mono">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass border-secondary/20 focus:border-secondary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-mono">
              Quantum ID (Email)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass border-secondary/20 focus:border-secondary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground font-mono">
              Warp Speed (Message)
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your data challenges..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="glass border-secondary/20 focus:border-secondary min-h-[150px]"
              required
            />
          </div>

          <Button type="submit" variant="hero" className="w-full" size="lg">
            Send Quantum Message
          </Button>
        </form>
      </div>
    </section>
  );
};