import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Gift, Zap, Users } from "lucide-react";

const perks = [
  {
    icon: Zap,
    title: "Beta Access",
    description: "Be first to experience 1dot1's revolutionary features"
  },
  {
    icon: Gift,
    title: "Lifetime Discount",
    description: "50% off your first year subscription"
  },
  {
    icon: Users,
    title: "Exclusive Community",
    description: "Join our private early adopter community"
  }
];

const EarlyAccessSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      setIsSubmitted(true);
      // Integration point for email service
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full animate-float" style={{ animationDelay: "0.8s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            Be Among the First to Experience <span className="text-primary-glow">1dot1</span>
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-12">
            Join the future of intelligent networking and get exclusive early access benefits
          </p>

          {/* Perks Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {perks.map((perk, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-white/80 text-sm">{perk.description}</p>
              </div>
            ))}
          </div>

          {/* Email Form */}
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-scale-in">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to 1dot1!</h3>
                <p className="text-white/80">
                  You're on the list! We'll notify you when 1dot1 launches.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-4 mb-6">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name (optional)"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-12"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-12"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-white text-primary hover:bg-white/90 h-12 font-bold transition-smooth hover:scale-105"
                >
                  Secure My 1dot1 Early Access
                </Button>
                <p className="text-white/60 text-xs mt-4">
                  By joining, you agree to receive updates about 1dot1. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-white/80 text-lg">
              <span className="font-bold text-white">500+</span> professionals already joined the 1dot1 waitlist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;