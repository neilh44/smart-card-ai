import { Upload, Zap, Search } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Snap or upload any business card to 1dot1",
    step: "01"
  },
  {
    icon: Zap,
    title: "AI Magic",
    description: "Our AI extracts and structures all information",
    step: "02"
  },
  {
    icon: Search,
    title: "Smart Access",
    description: "Search your 1dot1 network with natural language",
    step: "03"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6">
            How <span className="text-primary">1dot1</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your business cards into intelligent digital assets in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-primary z-10" />
              )}
              
              <div className="bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-medium transition-smooth group-hover:scale-105 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-4 right-4 text-6xl font-black text-muted opacity-20">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="bg-gradient-primary rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;