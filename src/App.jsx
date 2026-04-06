import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, QrCode, MessageSquare, Zap, BarChart3, 
  Smartphone, LineChart, ShieldCheck, Check, ArrowRight,
  MessageCircle, Sparkles, TrendingUp, Send, Loader2,
  Plus, Search, BrainCircuit, FileText, Quote, Lightbulb,
  Info
} from 'lucide-react';

// --- Gemini API Setup ---

const fetchGemini = async (prompt, systemInstruction = "") => {
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction })
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (i === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (i === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }
  .glass-card {
    background: rgba(26, 29, 36, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .glow-primary {
    box-shadow: 0 0 24px rgba(0, 229, 195, 0.25);
  }
`;

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  const handleSimulateChat = async () => {
    if (!chatInput.trim()) return;
    setIsChatLoading(true);
    setChatResponse("");
    try {
      const response = await fetchGemini(
        `A customer is scanning a QR code on a luxury speaker package and asks: "${chatInput}". Respond as a helpful, high-conversion SQU AI. Keep it under 2 sentences and include a natural upsell to a "Premium Mounting Kit" if appropriate.`,
        "You are SQU AI, an expert at reducing support and driving sales for physical products via QR code interactions."
      );
      setChatResponse(response);
    } catch (e) {
      setChatResponse("Something went wrong. Please try again.");
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateInsight = async () => {
    setIsInsightLoading(true);
    try {
      const result = await fetchGemini(
        `Generate 3 actionable weekly intelligence points based on common customer questions about product setup, sweetness, and shelf-life. 1. Product Improvement, 2. Marketing Angle, 3. Support FAQ addition. Format as concise bullet points.`,
        "You are an expert product strategist for SQU. You turn messy customer conversations into high-level business intelligence."
      );
      setAiInsight(result);
    } catch (e) {
      setAiInsight("Failed to generate report.");
    } finally {
      setIsInsightLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111317] text-zinc-100 font-sans selection:bg-[#00E5C3] selection:text-zinc-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#111317]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5C3] to-emerald-500 flex items-center justify-center">
              <span className="text-[#111317] font-bold text-xl tracking-tighter">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">SQU</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <a href="#demo" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Demo</a>
            <button className="bg-[#00E5C3] text-[#111317] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#00cba9] transition-all glow-primary">
              Start Free Trial
            </button>
          </div>
          <button className="md:hidden text-zinc-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-16 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00E5C3]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E5C3]/30 bg-[#00E5C3]/5 text-[#00E5C3] text-sm font-medium mb-8">
                <Sparkles size={14} /> Less support. Better products. More sales.
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                Ask Any Stupid Question. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C3] to-[#F5A623]">Really.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
                Customers scan a QR code, ask anything — and your AI answers instantly, reduces support, drives upsells, and captures what customers really think.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="w-full sm:w-auto bg-[#00E5C3] text-[#111317] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#00cba9] transition-all glow-primary flex items-center justify-center gap-2">
                  Start Free Trial <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all">
                  See Demo
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={400} className="relative">
            <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00E5C3]/20 flex items-center justify-center">
                  <Smartphone className="text-[#00E5C3]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">✨ Scan Simulator</h4>
                  <p className="text-xs text-zinc-500">Live AI Response Preview</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-sm text-zinc-300">
                  Try: "Is this speaker waterproof?"
                </div>
                {chatResponse && (
                  <div className="bg-[#00E5C3]/10 rounded-2xl p-4 border border-[#00E5C3]/20 text-sm text-zinc-100 animate-in fade-in slide-in-from-bottom-2">
                    <p className="font-bold text-[#00E5C3] mb-1">SQU AI:</p>
                    {chatResponse}
                  </div>
                )}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSimulateChat()}
                  placeholder="Ask a question..."
                  className="w-full bg-[#111317] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00E5C3] text-white"
                />
                <button onClick={handleSimulateChat} disabled={isChatLoading} className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-[#00E5C3] text-[#111317] flex items-center justify-center">
                  {isChatLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURE TAG CLOUD */}
      <section className="py-8 border-y border-white/5 bg-[#1A1D24]/30 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-row flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
            {[
              { label: "No App Required", icon: Smartphone, color: "text-[#00E5C3]" },
              { label: "Increase Sales", icon: TrendingUp, color: "text-[#F5A623]" },
              { label: "Reduce Support", icon: MessageSquare, color: "text-[#00E5C3]" },
              { label: "Instant ROI Tracking", icon: BarChart3, color: "text-[#F5A623]" },
              { label: "Real customer insights", icon: Lightbulb, color: "text-[#00E5C3]" }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 animate-float whitespace-nowrap"
                style={{ animationDelay: `${idx * 0.4}s` }}
              >
                <feature.icon className={`${feature.color} flex-shrink-0`} size={14} />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION - UPDATED WITH "UP TO" */}
      <section className="py-16 md:py-20 px-6 bg-[#111317]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-[2rem] overflow-hidden border border-white/10">
            {[
              { val: "35%", lab: "Up to 35% conversion lift", sub: "Conversion", col: "text-[#00E5C3]" },
              { val: "80%", lab: "Up to 80% questions answered instantly", sub: "Automation", col: "text-[#F5A623]" },
              { val: "25%", lab: "Up to 25% increase in upsell opportunities", sub: "Revenue", col: "text-[#00E5C3]" },
              { val: "24h", lab: "To go live from setup", sub: "Onboarding", col: "text-white" }
            ].map((stat, i) => (
              <div key={i} className="bg-[#111317] p-8 md:p-12 hover:bg-white/[0.02] transition-colors group">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${stat.col.split(' ')[0] === 'text-white' ? 'bg-zinc-500' : stat.col.replace('text-', 'bg-')}`}></span>
                  {stat.sub}
                </div>
                <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.col} group-hover:scale-105 transition-transform origin-left duration-500`}>
                  {stat.val}
                </div>
                <div className="text-sm text-zinc-400 font-medium leading-relaxed max-w-[180px]">
                  {stat.lab}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-medium text-zinc-600 uppercase tracking-widest">
            <Info size={12} />
            Based on SQU platform data and industry benchmarks 2024
          </div>
        </div>
      </section>

      {/* INTELLIGENCE REPORTS - ALIGNED LAYOUT */}
      <section className="py-24 px-6 bg-[#1A1D24]/30" id="demo">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* LEFT SIDE */}
            <div className="flex flex-col">
              <FadeIn className="mb-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 flex items-center justify-center">
                      <Quote className="text-[#F5A623]" size={24} />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">Weekly Intelligence</h2>
                  </div>
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    SQU listens to what people actually say while they use your product. We turn those voices into your next big product update.
                  </p>
                </div>
              </FadeIn>
              <div className="space-y-6 pl-4 border-l-2 border-white/5 flex-grow">
                {[
                  { tag: '"Too sweet for kids"', type: 'Product Feedback', color: 'bg-red-500/10 text-red-400' },
                  { tag: '"Expires too fast in cabinet"', type: 'UX Issue', color: 'bg-amber-500/10 text-amber-400' },
                  { tag: '"How do I use this with cream?"', type: 'Support Gap', color: 'bg-blue-500/10 text-blue-400' }
                ].map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 150} className="relative group">
                    <div className="absolute -left-[25px] top-4 w-4 h-4 rounded-full border-2 border-[#F5A623] bg-[#111317]" />
                    <div className="glass-card p-6 rounded-2xl border-white/5 hover:border-[#F5A623]/30 transition-all">
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${item.color} mb-3 inline-block`}>
                        {item.type}
                      </span>
                      <p className="text-xl font-medium text-zinc-200 italic">{item.tag}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <FadeIn delay={400} className="h-full">
              <div className="glass-card rounded-[2.5rem] p-10 border border-white/10 shadow-2xl h-full flex flex-col bg-gradient-to-br from-[#1A1D24] to-[#111317]">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-[#00E5C3]/20 flex items-center justify-center">
                    <BrainCircuit className="text-[#00E5C3]" size={20} />
                  </div>
                  <h3 className="text-lg font-bold">AI Strategy Workspace</h3>
                </div>
                {!aiInsight ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-dashed border-white/10">
                      <FileText className="text-zinc-600" size={32} />
                    </div>
                    <div className="max-w-xs">
                      <h4 className="text-zinc-300 font-bold mb-2">Ready to Analyze</h4>
                      <p className="text-sm text-zinc-500 mb-8">Synthesize this week's customer feedback into business goals.</p>
                      <button onClick={handleGenerateInsight} disabled={isInsightLoading} className="w-full bg-[#00E5C3] text-[#111317] py-4 rounded-2xl font-black text-lg hover:brightness-110 transition-all glow-primary flex items-center justify-center gap-3">
                        {isInsightLoading ? <Loader2 size={24} className="animate-spin" /> : <><Zap size={20} /> Run AI Analysis</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-[#00E5C3]/5 border border-[#00E5C3]/20 rounded-3xl p-8">
                      <div className="flex items-center gap-2 mb-6 text-[#00E5C3] font-black text-xs uppercase tracking-widest"><Sparkles size={14} /> Intelligence Unlocked</div>
                      <div className="space-y-6 text-zinc-300 font-mono text-sm leading-relaxed">
                        {aiInsight.split('\n').map((line, i) => (
                          <p key={i} className="flex gap-3"><span className="text-[#00E5C3] font-bold">»</span> {line}</p>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => setAiInsight(null)} className="text-xs text-zinc-600 hover:text-zinc-400 font-bold uppercase tracking-widest transition-colors self-center mt-auto">Clear & Refresh</button>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRICING - RESTORED FULL FEATURES */}
      <section className="py-32 px-6" id="pricing">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Simple Pricing</h2>
            <p className="text-xl text-zinc-500">Transparent pricing for brands of all sizes.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Starter */}
            <FadeIn delay={100} className="h-full">
              <div className="glass-card p-12 rounded-[3rem] border border-white/5 flex flex-col h-full hover:border-white/10 transition-all">
                <h3 className="text-2xl font-bold mb-3">Starter</h3>
                <p className="text-zinc-500 text-sm mb-10">For emerging brands</p>
                <div className="text-6xl font-black mb-12 tracking-tighter">$199<span className="text-xl text-zinc-500 font-normal">/mo</span></div>
                <div className="space-y-5 mb-12 flex-1">
                  {["Up to 10 products", "Branded Scan Landing Page", "Basic AI Question Engine", "Weekly Email Reports", "Standard Analytics", "Community Support"].map((f, j) => (
                    <div key={j} className="flex items-start gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={14} className="text-[#00E5C3] mt-0.5" /> <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-white/5 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">Start Free</button>
              </div>
            </FadeIn>

            {/* Growth */}
            <FadeIn delay={200} className="h-full">
              <div className="bg-[#1A1D24] p-12 rounded-[3rem] border-2 border-[#00E5C3] flex flex-col h-full relative shadow-[0_0_60px_rgba(0,229,195,0.15)] scale-105 z-10 group">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#00E5C3] text-[#111317] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Most Popular</div>
                <h3 className="text-2xl font-bold mb-3 text-[#00E5C3]">Growth</h3>
                <p className="text-zinc-400 text-sm mb-10">Best for scaling teams</p>
                <div className="text-6xl font-black mb-12 tracking-tighter text-white">$699<span className="text-xl text-zinc-400 font-normal">/mo</span></div>
                <div className="space-y-5 mb-12 flex-1">
                  {["Up to 50 products", "Advanced Intelligence Reports", "Real-time Revenue Attribution", "Custom AI Upsell Logic", "Priority CRM Integrations", "Concierge Setup"].map((f, j) => (
                    <div key={j} className="flex items-start gap-3 text-white text-sm font-bold">
                      <Check size={14} className="text-[#00E5C3] mt-0.5" /> <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-[#00E5C3] text-[#111317] py-4 rounded-2xl font-black text-lg glow-primary">Get Started</button>
              </div>
            </FadeIn>

            {/* Scale */}
            <FadeIn delay={300} className="h-full">
              <div className="glass-card p-12 rounded-[3rem] border border-white/5 flex flex-col h-full hover:border-white/10 transition-all">
                <h3 className="text-2xl font-bold mb-3">Scale</h3>
                <p className="text-zinc-500 text-sm mb-10">Enterprise power</p>
                <div className="text-6xl font-black mb-12 tracking-tighter">$999<span className="text-xl text-zinc-500 font-normal">/mo</span></div>
                <div className="space-y-5 mb-12 flex-1">
                  {["Unlimited Products", "White-label Scan Pages", "Multi-Brand Dashboard", "Dedicated Data Scientist", "API & Webhook Access", "24/7 Phone Support"].map((f, j) => (
                    <div key={j} className="flex items-start gap-3 text-zinc-400 text-sm font-medium">
                      <Check size={14} className="text-[#00E5C3] mt-0.5" /> <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-white/5 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">Contact Sales</button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#00E5C3] flex items-center justify-center"><span className="text-[#111317] font-bold text-xs">S</span></div>
            <span className="text-xl font-bold tracking-tight">SQU</span>
          </div>
          <p className="text-zinc-600 text-sm font-medium italic">"The stupidest thing about business is ignoring your customers."</p>
        </div>
      </footer>
    </div>
  );
}