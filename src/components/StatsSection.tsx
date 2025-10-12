import { Database, Lock, Zap, Code } from "lucide-react";

const stats = [
  {
    icon: Database,
    title: "Petabyte Processing",
    description: "Process massive datasets in real-time with distributed quantum algorithms",
    metric: "10PB+",
    color: "cyan"
  },
  {
    icon: Zap,
    title: "Neural Acceleration",
    description: "GPU-accelerated ML inference with sub-millisecond response times",
    metric: "1000x",
    color: "purple"
  },
  {
    icon: Lock,
    title: "Zero-Trust Security",
    description: "End-to-end encryption with blockchain-verified data integrity",
    metric: "256-bit",
    color: "orange"
  },
  {
    icon: Code,
    title: "API-First Design",
    description: "RESTful and GraphQL endpoints with comprehensive SDK support",
    metric: "∞ Calls",
    color: "cyan"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyan">Powered by</span>{" "}
            <span className="text-gradient-purple">Advanced Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built on a foundation of cutting-edge infrastructure and AI innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const glowClass = stat.color === "cyan" ? "glow-cyan" : stat.color === "purple" ? "glow-purple" : "glow-orange";
            const borderClass = stat.color === "cyan" ? "border-glow-cyan" : stat.color === "purple" ? "border-glow-purple" : "border-glow-orange";
            
            return (
              <div
                key={index}
                className={`glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${glowClass} ${borderClass} group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color === "cyan" ? "bg-secondary/10" : stat.color === "purple" ? "bg-accent/10" : "bg-highlight/10"}`}>
                    <Icon className={`w-6 h-6 ${stat.color === "cyan" ? "text-secondary" : stat.color === "purple" ? "text-accent" : "text-highlight"}`} />
                  </div>
                  <span className={`font-mono text-2xl font-bold ${stat.color === "cyan" ? "text-secondary" : stat.color === "purple" ? "text-accent" : "text-highlight"}`}>
                    {stat.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
