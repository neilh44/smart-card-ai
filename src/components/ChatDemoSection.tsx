import { useState, useEffect } from "react";
import { MessageCircle, Send, Building2, User, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Contact {
  id: number;
  company: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  companySize: string;
  founded?: string;
  employees?: string;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    company: "TechFlow Solutions",
    name: "Sarah Chen",
    title: "CTO",
    email: "sarah.chen@techflow.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    industry: "B2B Software",
    companySize: "50+ employees"
  },
  {
    id: 2,
    company: "CodeCraft Studios", 
    name: "Mike Rodriguez",
    title: "Founder",
    email: "mike@codecraft.io",
    phone: "(555) 987-6543",
    location: "Austin, TX",
    industry: "Mobile Apps",
    companySize: "Startup",
    founded: "2023",
    employees: "5-10 employees"
  },
  {
    id: 3,
    company: "NextGen Development",
    name: "Lisa Wang", 
    title: "Lead Dev",
    email: "lisa.wang@nextgen.co",
    phone: "(555) 456-7890",
    location: "New York, NY",
    industry: "Enterprise Software",
    companySize: "200+ employees"
  }
];

const exampleQueries = [
  "Show me companies dealing in software",
  "Which ones are startups?",
  "Find contacts in San Francisco",
  "Who works at TechFlow?"
];

const ChatDemoSection = () => {
  const [currentQuery, setCurrentQuery] = useState("");
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string, contacts?: Contact[]}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <div className="bg-gradient-card rounded-2xl p-4 border border-border/50 hover:shadow-soft transition-smooth">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 rounded-xl p-2">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-sm mb-1">{contact.company}</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>{contact.name}, {contact.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3 h-3" />
              <span>{contact.industry}, {contact.companySize}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>{contact.location}</span>
            </div>
            {contact.founded && (
              <div className="flex items-center gap-2">
                <span className="text-primary">💡</span>
                <span>Founded: {contact.founded}</span>
              </div>
            )}
            {contact.employees && (
              <div className="flex items-center gap-2">
                <span className="text-primary">👥</span>
                <span>Team: {contact.employees}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const simulateResponse = async (query: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response = "";
    let contacts: Contact[] = [];

    if (query.toLowerCase().includes("software")) {
      response = "Found 3 software companies:";
      contacts = mockContacts;
    } else if (query.toLowerCase().includes("startup")) {
      response = "Here are the startup companies:";
      contacts = [mockContacts[1]];
    } else if (query.toLowerCase().includes("san francisco")) {
      response = "Found 1 contact in San Francisco:";
      contacts = [mockContacts[0]];
    } else if (query.toLowerCase().includes("techflow")) {
      response = "Here's who works at TechFlow:";
      contacts = [mockContacts[0]];
    } else {
      response = "I found relevant contacts in your network:";
      contacts = mockContacts.slice(0, 2);
    }

    setMessages(prev => [...prev, { type: 'ai', content: response, contacts }]);
    setIsTyping(false);
  };

  const handleSendMessage = async (query: string) => {
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: query }]);
    setCurrentQuery("");
    await simulateResponse(query);
  };

  const startDemo = async () => {
    setMessages([]);
    setDemoStep(0);
    
    // Simulate the full demo flow
    setTimeout(() => {
      setMessages([{ type: 'user', content: 'Show me companies dealing in software' }]);
      setTimeout(async () => {
        await simulateResponse('Show me companies dealing in software');
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'user', content: 'Which ones are startups?' }]);
          setTimeout(() => simulateResponse('Which ones are startups?'), 1000);
        }, 2000);
      }, 1000);
    }, 500);
  };

  useEffect(() => {
    // Auto-start demo on component mount
    startDemo();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6">
            See Your Results in <span className="text-primary">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Chat with your business card collection and get instant, intelligent results
          </p>
          
          {/* Example queries */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {exampleQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(query)}
                className="text-sm"
              >
                "{query}"
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-3xl shadow-large overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-primary p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-2">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">1dot1 Chat</h3>
                  <p className="text-sm text-white/80">Ask questions about your network</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={startDemo}
                  className="ml-auto"
                >
                  Restart Demo
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Demo loading...</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%] space-y-3">
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user' 
                        ? 'bg-primary text-white ml-auto' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 bg-primary rounded text-white text-xs flex items-center justify-center">
                            🤖
                          </div>
                        )}
                        <span className="text-sm font-medium">
                          {message.type === 'user' ? 'You' : '1dot1 AI'}
                        </span>
                      </div>
                      <p>{message.content}</p>
                    </div>
                    
                    {message.contacts && message.contacts.length > 0 && (
                      <div className="space-y-3 ml-6">
                        {message.contacts.map((contact) => (
                          <ContactCard key={contact.id} contact={contact} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl p-4 text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded text-white text-xs flex items-center justify-center">
                        🤖
                      </div>
                      <span className="text-sm font-medium">1dot1 AI</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(currentQuery)}
                  placeholder="Type your question about your business cards..."
                  className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button 
                  onClick={() => handleSendMessage(currentQuery)}
                  disabled={!currentQuery.trim()}
                  size="lg"
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemoSection;