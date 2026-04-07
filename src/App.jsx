import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Smartphone, Zap, BarChart3, 
  Check, ArrowRight, Sparkles, TrendingUp,
  Quote, Lightbulb, Calendar, AlertCircle, 
  Volume2, Mic, Settings, MoveRight, Wrench
} from 'lucide-react';

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes blink-fast {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  @keyframes typing {
    0%, 100% { transform: translateY(0px); opacity: 0.4; }
    50% { transform: translateY(-3px); opacity: 1; }
  }
  @keyframes slide-in-right {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes scan-line {
    0% { top: 0%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }
  .animate-blink-fast {
    animation: blink-fast 0.8s ease-in-out infinite;
  }
  .typing-dot {
    animation: typing 1s ease-in-out infinite;
  }
  .animate-slide-user {
    animation: slide-in-right 0.4s ease-out forwards;
  }
  .glass-card {
    background: rgba(26, 29, 36, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .glow-primary {
    box-shadow: 0 0 24px rgba(0, 229, 195, 0.25);
  }
  .scan-effect {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00E5C3, transparent);
    animation: scan-line 2s linear infinite;
  }
  .stat-grid-item:hover .stat-bg-text {
    transform: translateY(-10px);
    opacity: 0.1;
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
  const [reportState, setReportState] = useState('idle'); 
  const [loadingStep, setLoadingStep] = useState(0);
  const [simStep, setSimStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const steps = ["Accessing Database...", "Clustering 124 User Scans...", "Identifying Core Sentiment...", "Drafting Brand Strategy..."];

  const handleGenerateInsight = () => {
    setReportState('loading');
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setReportState('complete'), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
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
            <a href="#demo" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Demo</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>
          <button className="md:hidden text-zinc-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-8 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00E5C3]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E5C3]/30 bg-[#00E5C3]/5 text-[#00E5C3] text-sm font-medium mb-6">
                <Sparkles size={14} /> Less support. Better products. More sales.
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] overflow-visible">
                Your customers are talking{" "}
                <span className="block pb-4 text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C3] to-[#F5A623]">
                  Are you listening?
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed">
                Customers scan a QR code, ask anything — and your AI answers instantly, reduces support, drives upsells, and captures what customers really think.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={400} className="relative">
            <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00E5C3]/20 flex items-center justify-center">
                  <Smartphone className="text-[#00E5C3]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">✨ Live Scan Preview</h4>
                  <p className="text-xs text-zinc-500">Instant AI Upsell Demo</p>
                </div>
              </div>
              <div className="space-y-4 min-h-[160px] flex flex-col justify-end">
                {simStep >= 1 ? (
                  <div className="flex justify-end">
                    <div className="bg-white/10 rounded-2xl rounded-tr-none p-3.5 max-w-[85%] border border-white/5 text-sm text-white animate-slide-user">
                      Can I use these earbuds outdoors when it rains?
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-12 text-zinc-600 animate-pulse text-[10px] uppercase font-black tracking-[0.2em]">
                    Waiting for scan...
                  </div>
                )}
                {simStep >= 1 && simStep < 2 && (
                   <div className="flex justify-start animate-in fade-in duration-300">
                     <div className="bg-[#00E5C3]/5 rounded-2xl rounded-tl-none p-3 border border-[#00E5C3]/10 flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] typing-dot" style={{animationDelay: '0s'}}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] typing-dot" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] typing-dot" style={{animationDelay: '0.4s'}}></div>
                     </div>
                   </div>
                )}
                {simStep >= 2 && (
                  <div className="flex justify-start animate-in zoom-in-95 slide-in-from-left-2 fade-in duration-500 fill-mode-both">
                    <div className="bg-[#00E5C3]/10 rounded-2xl rounded-tl-none p-3.5 max-w-[85%] border border-[#00E5C3]/20 text-sm text-zinc-100 shadow-lg shadow-[#00E5C3]/5">
                      <p className="font-bold text-[#00E5C3] mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <Zap size={10} fill="currentColor" /> SQU AI
                      </p>
                      This specific model isn't rain-rated, but our <span className="text-[#00E5C3] font-bold">Pro Edition</span> is fully waterproof. Interested in upgrading your order?
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5C3] animate-blink-fast"></span>
                  </div>
                  <span className="text-[10px] font-black text-[#00E5C3] uppercase tracking-widest">Live Demo</span>
                </div>
                <div className="flex items-center gap-1.5">
                   {[0,1,2,3].map(i => (
                     <div key={i} className={`h-1 w-3 rounded-full transition-all duration-500 ${simStep === i ? 'bg-[#00E5C3] w-5' : 'bg-white/10'}`} />
                   ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS STRIPE */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { val: "35%", lab: "Up to 35% conversion lift", sub: "Conversion", col: "from-[#00E5C3] to-emerald-400" },
              { val: "80%", lab: "Up to 80% questions answered instantly", sub: "Automation", col: "from-[#F5A623] to-orange-400" },
              { val: "25%", lab: "Up to 25% increase in upsells", sub: "Revenue", col: "from-blue-400 to-[#00E5C3]" },
              { val: "24h", lab: "To go live from setup", sub: "Onboarding", col: "from-zinc-200 to-zinc-500" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 100} className="stat-grid-item group">
                <div className="relative h-full bg-[#1A1D24] border border-white/5 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:bg-[#23272f] hover:border-white/10 hover:-translate-y-1">
                  <span className="stat-bg-text absolute -bottom-4 -right-4 text-8xl font-black text-white/[0.02] transition-all duration-700 pointer-events-none uppercase italic">
                    {stat.sub}
                  </span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${stat.col} animate-pulse`} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        {stat.sub}
                      </span>
                    </div>
                    <div className={`text-6xl font-black mb-4 tracking-tighter bg-gradient-to-br ${stat.col} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 origin-left`}>
                      {stat.val}
                    </div>
                    <div className="h-px w-8 bg-white/10 mb-4 group-hover:w-full transition-all duration-700" />
                    <p className="text-sm font-bold text-zinc-400 leading-tight group-hover:text-zinc-200 transition-colors">
                      {stat.lab}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INTELLIGENCE REPORTS */}
      <section className="pb-24 pt-8 px-6 bg-[#111317]" id="demo">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <div className="flex flex-col h-full">
              <FadeIn className="mb-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/20 flex items-center justify-center">
                      <Quote className="text-[#F5A623]" size={24} fill="currentColor" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">Weekly Intelligence</h2>
                  </div>
                  <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                    Instantly turn thousands of raw customer questions into actionable product decisions. See what people ask when they're actually using your device.
                  </p>
                </div>
              </FadeIn>
              
              <div className="glass-card p-6 rounded-2xl border-white/5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Volume2 className="text-zinc-400" size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Aura Speaker Gen 2</h4>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">Active Product Tracking</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pl-4 border-l-2 border-white/5 flex-grow">
                {[
                  { tag: '"Bass feels muddy at 80% volume"', type: 'Audio Quality', color: 'bg-red-500/10 text-red-400' },
                  { tag: '"How do I link two for stereo?"', type: 'UX Friction', color: 'bg-amber-500/10 text-amber-400' },
                  { tag: '"Is it safe near salt water?"', type: 'Support Gap', color: 'bg-[#00E5C3]/10 text-[#00E5C3]' }
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

            <FadeIn delay={400} className="w-full h-full flex">
              <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl w-full flex flex-col bg-gradient-to-br from-[#1A1D24] to-[#111317] relative overflow-hidden min-h-[700px]">
                <span className="stat-bg-text absolute -bottom-10 -right-10 text-[12rem] font-black text-white/[0.01] transition-all duration-700 pointer-events-none uppercase italic">
                  INTEL
                </span>

                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00E5C3]/20 flex items-center justify-center">
                      <Zap className="text-[#00E5C3]" size={20} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Intelligence Sweep</h3>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Auto-Synthesis Mode</p>
                    </div>
                  </div>
                  {reportState === 'complete' && (
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                      Live Data
                    </div>
                  )}
                </div>

                {reportState === 'idle' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-dashed border-white/10 relative">
                      <div className="absolute inset-0 rounded-full border border-[#00E5C3]/20 animate-ping opacity-20"></div>
                      <Mic className="text-zinc-600" size={40} />
                    </div>
                    <div className="max-w-xs space-y-3">
                      <h4 className="text-xl font-bold text-white tracking-tight">124 Conversations Pending</h4>
                      <p className="text-sm text-zinc-500">New questions regarding Aura Speaker Gen 2 collected in the last 72 hours.</p>
                    </div>
                    <button onClick={handleGenerateInsight} className="w-full bg-[#00E5C3] text-[#111317] py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all glow-primary flex items-center justify-center gap-3 active:scale-[0.98]">
                      <Sparkles size={22} fill="currentColor" /> Analyze Product Intel
                    </button>
                  </div>
                )}

                {reportState === 'loading' && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative py-20">
                    <div className="scan-effect"></div>
                    <div className="w-20 h-20 border-t-2 border-r-2 border-[#00E5C3] rounded-full animate-spin"></div>
                    <div className="text-center">
                      <p className="text-sm font-mono text-[#00E5C3] mb-2">{steps[loadingStep]}</p>
                      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#00E5C3] transition-all duration-500" 
                          style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {reportState === 'complete' && (
                  <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col">
                    <div className="space-y-6 flex-grow">
                      <div className="flex items-center gap-4 text-zinc-300">
                        <Calendar size={18} className="text-[#F5A623]" />
                        <div>
                          <h4 className="font-bold text-lg">Weekly Engagement Report</h4>
                          <p className="text-xs text-zinc-500 font-medium">Aura Speaker Gen 2 • <span className="text-white">Active Sentiment: Positive (72%)</span></p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1A1D24] p-4 rounded-2xl border border-white/5">
                          <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">Total Scans</p>
                          <p className="text-2xl font-black text-white">124</p>
                          <p className="text-[10px] text-emerald-400 font-bold">+12% vs last week</p>
                        </div>
                        <div className="bg-[#1A1D24] p-4 rounded-2xl border border-white/5">
                          <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">Active Chats</p>
                          <p className="text-2xl font-black text-white">42</p>
                          <p className="text-[10px] text-emerald-400 font-bold">+18% conversion</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[#00E5C3]/30 transition-all">
                          <div className="flex items-center gap-2 mb-3 text-[#00E5C3] font-bold text-xs uppercase tracking-widest">
                            <AlertCircle size={14} /> Core Pain Point
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            <span className="text-white font-bold">14 users</span> specifically asked about pairing with older Gen 1 models. Currently, the AI handles this manually—recommend adding a dedicated <span className="text-white font-bold">"Stereo Link" guide</span> to the scan flow.
                          </p>
                        </div>
                        
                        <div className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[#F5A623]/30 transition-all">
                          <div className="flex items-center gap-2 mb-3 text-[#F5A623] font-bold text-xs uppercase tracking-widest">
                            <TrendingUp size={14} /> Marketing Opportunity
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            Users are asking about <span className="text-white font-bold">beach usage</span>. Leverage this by adding an "Outdoors & Sand Safety" video module to increase upsells on our Rugged Carrying Case.
                          </p>
                        </div>

                        <div className="group bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-2xl p-5 hover:bg-[#F5A623]/10 transition-all relative overflow-hidden">
                          <div className="flex items-center gap-2 mb-3 text-[#F5A623] font-bold text-xs uppercase tracking-widest relative z-10">
                            <Wrench size={14} /> Engineering Note
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed relative z-10">
                            Cluster detected: <span className="text-white font-bold">"Blue light flashing"</span> questions peak at night. Consider a future firmware update for an <span className="text-[#F5A623] font-bold">"Auto-Dim"</span> or <span className="text-[#F5A623] font-bold">"Stealth Mode."</span>
                          </p>
                          <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Settings className="text-[#F5A623]" size={40} style={{ animation: 'spin 8s linear infinite' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-24 px-6 bg-[#111317]" id="pricing">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Scale Your Intelligence</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Transparent pricing for brands at every stage.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                plan: "Starter", 
                price: "$299", 
                sub: "Level 01", 
                bg: "STARTER",
                features: ["Up to 2 Products", "QR Code Generation", "Limited AI Scans", "Email Support"],
                col: "from-[#00E5C3] to-emerald-400",
                active: false
              },
              { 
                plan: "Growth", 
                price: "$699", 
                sub: "Level 02", 
                bg: "GROWTH",
                features: ["Up to 10 Products", "Upsell AI Logic", "Weekly Intel Reports", "Up to 1,500 chats"],
                col: "from-[#F5A623] to-orange-400",
                active: true
              },
              { 
                plan: "Enterprise", 
                price: "Custom", 
                sub: "Max Level", 
                bg: "SCALE",
                features: ["Unlimited Products", "Advanced actionable reports", "Custom chat Webpage", "Dedicated Manager"],
                col: "from-blue-400 to-[#00E5C3]",
                active: false
              }
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 100} className="stat-grid-item group">
                <div className={`relative h-full bg-[#1A1D24] border ${p.active ? 'border-[#00E5C3]/30 ring-1 ring-[#00E5C3]/20' : 'border-white/5'} rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:bg-[#23272f] hover:border-white/10 hover:-translate-y-1`}>
                  
                  <span className="stat-bg-text absolute -bottom-4 -right-4 text-8xl font-black text-white/[0.02] transition-all duration-700 pointer-events-none uppercase italic">
                    {p.bg}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${p.col} animate-pulse`} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                          {p.sub}
                        </span>
                      </div>
                      {p.active && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00E5C3] px-2 py-0.5 rounded-md bg-[#00E5C3]/10 border border-[#00E5C3]/20">Most Popular</span>
                      )}
                    </div>

                    <div className="mb-10">
                      <h3 className="text-2xl font-bold text-white mb-2">{p.plan}</h3>
                      <div className={`text-6xl font-black tracking-tighter bg-gradient-to-br ${p.col} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 origin-left`}>
                        {p.price}
                      </div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-2">per month</p>
                    </div>

                    <div className="h-px w-full bg-white/5 mb-8" />

                    <div className="space-y-4 flex-grow">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-3 group/item">
                          <Check size={14} className="text-[#00E5C3]" />
                          <span className="text-sm font-medium text-zinc-400 group-hover/item:text-zinc-200 transition-colors">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="pb-24 pt-4 px-6 relative overflow-hidden" id="contact">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5C3]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="glass-card rounded-[3rem] p-10 md:p-16 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap size={14} fill="currentColor" /> Invite-Only Access
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                    Ready to transform your support?
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                    SQU is currently rolling out to select partners. Reach out directly to discuss how we can elevate your brand.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5C3] to-[#F5A623] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-[#1A1D24] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-5 mb-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00E5C3] to-blue-600 p-[2px]">
                        <div className="w-full h-full bg-[#111317] rounded-full flex items-center justify-center">
                          <span className="text-2xl font-black text-white tracking-tighter">KL</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Kevin Larretche</h3>
                        <p className="text-[#00E5C3] font-medium text-sm">Founder & CEO</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <a href="mailto:kevin.larretche@gmail.com" className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00E5C3]/30 p-4 rounded-xl transition-all group/btn">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#111317] flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                            <BarChart3 size={18} className="text-zinc-400 group-hover/btn:text-[#00E5C3]" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Email Direct</p>
                            <p className="text-sm font-medium text-zinc-200">kevin.larretche@gmail.com</p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-zinc-600 group-hover/btn:text-[#00E5C3] group-hover/btn:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6 text-center">
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