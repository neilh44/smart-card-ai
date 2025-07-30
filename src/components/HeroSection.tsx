import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    console.log('Hero form submitting email:', email);

    try {
      // Get user's IP (with fallback)
      let userIP = 'unknown';
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const ipData = await response.json();
        userIP = ipData.ip;
      } catch (ipError) {
        console.warn('Could not fetch IP:', ipError);
      }
      
      // Prepare data for insertion
      const insertData = {
        email: email.trim().toLowerCase(),
        name: null,
        source: 'hero_section' as const,
        ip_address: userIP,
        user_agent: navigator.userAgent,
        utm_source: null as string | null,
        utm_medium: null as string | null,
        utm_campaign: null as string | null,
        referrer_url: null as string | null,
        landing_page_url: null as string | null,
        device_type: null as string | null
      };

      // Add UTM parameters if available
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        insertData.utm_source = urlParams.get('utm_source');
        insertData.utm_medium = urlParams.get('utm_medium');
        insertData.utm_campaign = urlParams.get('utm_campaign');
        insertData.referrer_url = document.referrer || null;
        insertData.landing_page_url = window.location.href;
        insertData.device_type = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop';
      }

      console.log('Hero form attempting to insert:', insertData);
      
      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from('waitlist')
        .insert(insertData)
        .select();

      console.log('Hero form Supabase response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('Hero form Supabase error:', supabaseError);
        // Still show success to user but log error
      } else {
        console.log('Hero form successfully inserted:', data);
      }
      
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error('Hero form network error:', err);
      // Still show success to user but log error
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } finally {
      setIsLoading(false);
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
                disabled={isSubmitted || isLoading}
              >
                {isSubmitted ? (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Welcome to 1dot1!
                  </>
                ) : isLoading ? (
                  "Joining..."
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