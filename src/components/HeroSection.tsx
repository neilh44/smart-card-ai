import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Integration point for email service
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            {/* Brand Logo */}
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-glow">
                <span className="text-4xl font-black text-white">1dot1</span>
                <Sparkles className="inline-block ml-2 text-white w-8 h-8 animate-glow" />
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Turn Every Business Card Into Your{" "}
              <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Smart Digital Network
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              1dot1 creates perfect 1:1 connections - Upload, Search, Connect with AI
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0 mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 h-14 text-lg"
                required
              />
              <Button 
                type="submit" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-14 px-8 font-semibold transition-smooth hover:scale-105"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Welcome to 1dot1!
                  </>
                ) : (
                  <>
                    Join 1dot1 Early Access
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-white/70 text-sm">
              Join 500+ professionals already on the 1dot1 waitlist
            </p>
          </div>

          {/* Right Image */}
          <div className="flex-1 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="1dot1 AI scanning business cards" 
                className="w-full max-w-lg mx-auto rounded-3xl shadow-large"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;