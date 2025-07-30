import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Gift, Zap, Users, AlertCircle } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(
  supabaseUrl || 'https://spllvpofdxpojevcyxfz.supabase.co', 
  supabaseAnonKey || ''
);

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }

    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseAnonKey) {
      setError("Service configuration error. Please try again later.");
      console.error('Supabase not configured properly');
      return;
    }

    setIsLoading(true);

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
      const insertData: Record<string, any> = {
        email: formData.email.trim().toLowerCase(),
        name: formData.name.trim() || null,
        source: 'landing_page',
        ip_address: userIP,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
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

      console.log('Attempting to insert:', insertData);
      
      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from('waitlist')
        .insert([insertData])
        .select(); // Add select to get the inserted data back

      console.log('Supabase response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('Supabase error details:', supabaseError);
        
        if (supabaseError.code === '23505') {
          // Duplicate email error
          setError("This email is already on our waitlist!");
        } else if (supabaseError.message?.includes('relation "waitlist" does not exist')) {
          setError("Database table not found. Please contact support.");
        } else if (supabaseError.message?.includes('permission denied')) {
          setError("Permission error. Please contact support.");
        } else {
          setError(`Database error: ${supabaseError.message}`);
        }
      } else {
        console.log('Successfully inserted:', data);
        setIsSubmitted(true);
        // Reset form
        setFormData({ name: "", email: "" });
        
        // Track successful signup (if you have analytics)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sign_up', {
            method: 'waitlist',
            value: 1
          });
        }
        
        // Auto-hide success message after 8 seconds
        setTimeout(() => setIsSubmitted(false), 8000);
      }
    } catch (err) {
      console.error('Network error submitting form:', err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
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
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-300" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name (optional)"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-12"
                    disabled={isLoading}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 h-12"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-white text-primary hover:bg-white/90 h-12 font-bold transition-smooth hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Joining 1dot1..." : "Secure My 1dot1 Early Access"}
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