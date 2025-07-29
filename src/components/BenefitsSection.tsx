import { Shield, Globe, Brain, UserCheck } from "lucide-react";
import featuresImage from "@/assets/features-illustration.jpg";

const benefits = [
  {
    icon: Shield,
    title: "Never Lose a Contact",
    description: "All cards digitized and searchable forever in 1dot1",
    color: "text-primary"
  },
  {
    icon: Globe,
    title: "Instant Company Pages",
    description: "Auto-generated web presence for every contact",
    color: "text-secondary"
  },
  {
    icon: Brain,
    title: "Smart Discovery",
    description: "Find contacts by company, role, or conversation context",
    color: "text-accent"
  },
  {
    icon: UserCheck,
    title: "Claim Your Profile",
    description: "Take control of your auto-generated 1dot1 business page",
    color: "text-primary"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-8">
              Why Choose <span className="text-primary">1dot1</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Experience the future of intelligent networking with features designed for modern professionals.
            </p>

            <div className="grid gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`${benefit.color} bg-muted rounded-xl p-3 group-hover:scale-110 transition-smooth`}>
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              <img 
                src={featuresImage} 
                alt="1dot1 features illustration" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-large"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl" />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-xl shadow-medium animate-float">
                <Brain className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-white p-3 rounded-xl shadow-medium animate-float" style={{ animationDelay: "1s" }}>
                <Globe className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;