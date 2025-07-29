import { Sparkles, Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-black text-white">1dot1</span>
              <Sparkles className="ml-2 w-6 h-6 text-primary animate-glow" />
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Perfect 1:1 connections between physical business cards and digital intelligence. 
              Transform your networking with AI-powered card scanning and smart search.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-smooth hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-smooth hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-smooth hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">Features</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">About</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Blog</a></li>
              <li>
                <a 
                  href="mailto:hello@1dot1.ai" 
                  className="hover:text-white transition-smooth flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 1dot1. All rights reserved. Perfect connections, powered by AI.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;