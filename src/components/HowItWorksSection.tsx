import { Upload, Camera, Brain, MessageCircle, Database, Search, ArrowRight } from "lucide-react";

const processCards = [
  {
    icon: Upload,
    title: "Upload & Store",
    description: "Snap or upload your business cards",
    step: "01",
    visual: "📱→💾",
    details: "Instant upload with secure cloud storage"
  },
  {
    icon: Brain,
    title: "AI Processing Pipeline", 
    description: "AI extracts & structures all information",
    step: "02",
    visual: "📷→🧠→🗃️",
    details: "OCR → LLM → Vector Database"
  },
  {
    icon: MessageCircle,
    title: "Chat Query",
    description: "Chat with your cards in natural language",
    step: "03", 
    visual: "💬→🔍",
    details: "Ask questions about your network"
  },
  {
    icon: Search,
    title: "Get Results",
    description: "Complete contact info displayed instantly",
    step: "04",
    visual: "📋→✨",
    details: "Smart, contextual responses"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6">
            See How <span className="text-primary">1dot1</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visual workflow from card upload to conversational results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {processCards.map((card, index) => (
            <div 
              key={index}
              className="relative group animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector arrow */}
              {index < processCards.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                  <ArrowRight className="w-6 h-6 text-primary opacity-60" />
                </div>
              )}
              
              <div className="bg-gradient-card rounded-3xl p-6 shadow-soft hover:shadow-medium transition-smooth group-hover:scale-105 relative overflow-hidden h-full">
                {/* Background decoration */}
                <div className="absolute top-4 right-4 text-4xl font-black text-muted opacity-10">
                  {card.step}
                </div>
                
                {/* Visual representation */}
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{card.visual}</div>
                </div>
                
                {/* Icon */}
                <div className="bg-gradient-primary rounded-xl w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <card.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {card.description}
                </p>
                <p className="text-xs text-primary font-medium">
                  {card.details}
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