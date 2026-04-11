import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Smartphone, Zap, BarChart3,
  Check, ArrowRight, Sparkles, TrendingUp,
  Quote, Lightbulb, Calendar, AlertCircle,
  Volume2, Mic, Settings, MoveRight, Wrench,
  BadgeDollarSign, BrainCircuit, Rocket, ChevronRight,
  QrCode, MessageSquareText, BarChart2
} from 'lucide-react';

// ─── TRANSLATIONS ────────────────────────────────────────────────
const translations = {
  EN: {
    // Navbar
    navFeatures: "Features",
    navDemo: "Demo",
    navPricing: "Pricing",
    navContact: "Contact",
    navCTA: "Request Early Access",

    // Hero
    heroBadge: "Less support. Better products. More sales.",
    heroTitle1: "Your customers are talking.",
    heroTitle2: "Are you listening?",
    heroSubtitle: "A QR code on your product. An AI that answers, upsells, and reports back.",
    heroCTA: "Request Early Access",

    // Live Scan Preview
    livePreviewTitle: "✨ Live Scan Preview",
    livePreviewSub: "Instant AI Upsell Demo",
    waitingScan: "Waiting for scan...",
    userQuestion: "Can I use these earbuds outdoors when it rains?",
    aiResponse: 'This specific model isn\'t IPX4 certified, but our <span class="text-[#00E5C3] font-bold">Pro Edition</span> is fully waterproof. Interested in upgrading your order?',
    liveDemo: "Live Demo",

    // Stats
    stats: [
      { label: "AI Support", title: "Answers questions instantly, 24/7", tag: "Always On",
        modalTitle: "AI-Powered Customer Support",
        modalDesc: "Your product becomes its own support agent. The moment a customer scans your QR code, SQU's AI jumps in — trained specifically on your product specs, troubleshooting guides, and brand voice.",
        modalPoints: ["Handles product questions, setup help, and troubleshooting instantly", "Speaks your brand's tone — professional, casual, technical, whatever fits", "Escalates edge cases to your team with full conversation context", "Available 24/7 in multiple languages — no staffing required"]
      },
      { label: "Upsell Revenue", title: "Recommends the right product at the right moment", tag: "Smart Upsell",
        modalTitle: "Contextual Upselling",
        modalDesc: "SQU doesn't just answer questions — it listens for buying signals. When a customer asks about a feature their current product doesn't have, SQU recommends the right upgrade naturally within the conversation.",
        modalPoints: ["Detects intent from real questions — not generic popups", "Recommends accessories, upgrades, and complementary products", "Conversion happens in-context, not through cold email follow-ups", "Track upsell performance per product in your weekly reports"]
      },
      { label: "Product Intel", title: "Know what customers think, every single week", tag: "Weekly Intel",
        modalTitle: "Weekly Intelligence Reports",
        modalDesc: "Every scan, every question, every frustration — clustered and analyzed automatically. You get a structured weekly report that tells you exactly what to fix, what to market, and what to build next.",
        modalPoints: ["Pain points ranked by frequency and severity", "Marketing opportunities surfaced from real customer language", "Engineering notes flagging recurring technical issues", "Sentiment tracking over time so you can measure impact"]
      },
      { label: "Fast Onboarding", title: "Go live in 24 hours, no dev needed", tag: "Live in 24h",
        modalTitle: "Live in 24 Hours",
        modalDesc: "No SDK, no API integration, no developer sprints. You send us your product info, we configure your AI agent, and you get a QR code ready to print. That's it.",
        modalPoints: ["Zero technical integration — works with any product or packaging", "We handle AI training from your existing docs and specs", "QR codes delivered print-ready in any format you need", "Dedicated onboarding support to get you live fast"]
      }
    ],

    // Intelligence Reports
    intelTitle: "Your Product, always Listening",
    intelSubtitle: "Stop guessing what to fix, what to market, and what to build next. Your customers are already telling you.",
    productName: "Aura Speaker Gen 2",
    productTracking: "Active Product Tracking",
    feedbackItems: [
      { tag: '"Bass feels muddy at 80% volume"', type: 'Audio Quality' },
      { tag: '"How do I link two for stereo?"', type: 'UX Friction' },
      { tag: '"Is it safe near salt water?"', type: 'Support Gap' }
    ],
    intelSweep: "Intelligence Sweep",
    autoSynthesis: "Auto-Synthesis Mode",
    liveData: "Live Data",
    convPending: "124 Conversations Pending",
    convPendingSub: "New questions regarding Aura Speaker Gen 2 collected in the last 72 hours.",
    analyzeCTA: "Analyze Product Intel",
    loadingSteps: ["Accessing Database...", "Clustering 124 User Scans...", "Identifying Core Sentiment...", "Drafting Brand Strategy..."],
    weeklyReport: "Weekly Engagement Report",
    weeklyReportSub: "Aura Speaker Gen 2",
    activeSentiment: "Active Sentiment: Positive (72%)",
    totalScans: "Total Scans",
    activeChats: "Active Chats",
    vsLastWeek: "+12% vs last week",
    conversion: "+18% conversion",
    corePain: "Core Pain Point",
    corePainText: '<span class="text-white font-bold">14 users</span> specifically asked about pairing with older Gen 1 models. Currently, the AI handles this manually—recommend adding a dedicated <span class="text-white font-bold">"Stereo Link" guide</span> to the scan flow.',
    marketingOpp: "Marketing Opportunity",
    marketingOppText: 'Users are asking about <span class="text-white font-bold">beach usage</span>. Leverage this by adding an "Outdoors & Sand Safety" video module to increase upsells on our Rugged Carrying Case.',
    engNote: "Engineering Note",
    engNoteText: 'Cluster detected: <span class="text-white font-bold">"Blue light flashing"</span> questions peak at night. Consider a future firmware update for an <span class="text-[#F5A623] font-bold">"Auto-Dim"</span> or <span class="text-[#F5A623] font-bold">"Stealth Mode."</span>',

    // Pricing
    pricingTitle: "Scale Your Intelligence",
    pricingSub: "Transparent pricing for brands at every stage.",
    perMonth: "per month",
    tailored: "tailored for you",
    mostPopular: "Most Popular",
    getStarted: "Get Started",
    contactSales: "Contact Sales",
    plans: [
      { plan: "Starter", features: ["Up to 2 Products", "Instant AI customer support", "Up to 1,000 Monthly Scans", "Weekly Customer Insights"] },
      { plan: "Growth", features: ["Up to 5 Products", "Smart product recommendations", "Full Intelligence Reports", "5,000 Monthly Scans"] },
      { plan: "Pro", features: ["Up to 15 Products", "Advanced Weekly Reports", "Product & Marketing Recommendations", "Priority Support", "15,000 Monthly Scans"] },
      { plan: "Enterprise", features: ["Unlimited Products", "Custom Actionable Reports", "White-label Dashboard", "Dedicated Manager"] }
    ],

    // Contact
    inviteOnly: "Invite-Only Access",
    contactTitle: "Ready to transform your support?",
    contactSub: "SQU is currently rolling out to select partners. Reach out directly to discuss how we can elevate your brand.",
    bookMeeting: "Book a Meeting",
    bookIntro: "Book an intro call",
    founderTitle: "Founder & CEO",

    // Footer
    footerQuote: '"The stupidest thing about business is ignoring your customers."',

    // Modal
    modalCTA: "Request Early Access",
    learnMore: "Learn More",
    howTitle: "How It Works",
    howSub: "From scan to strategy in three steps. No dev team required.",
    howSteps: [
      { number: "01", title: "Place Your QR Code", desc: "Add a branded QR code to your packaging, manual, or product. Customers scan it the moment they need help — or just want to know more." },
      { number: "02", title: "AI Handles the Conversation", desc: "SQU answers questions, recommends upgrades, and resolves issues instantly — trained on your product, speaking your brand's voice." },
      { number: "03", title: "You Get the Intelligence", desc: "Every interaction becomes a data point. Weekly reports surface pain points, upsell opportunities, and product insights you'd never get from reviews alone." }
    ],
  },

  FR: {
    // Navbar
    navFeatures: "Fonctionnalités",
    navDemo: "Démo",
    navPricing: "Tarifs",
    navContact: "Contact",
    navCTA: "Demander un accès anticipé",

    // Hero
    heroBadge: "Moins de SAV. De meilleurs produits. Plus de ventes.",
    heroTitle1: "Vos clients vous parlent.",
    heroTitle2: "Ne les ignorez plus.",
    heroSubtitle: "Un QR code sur votre produit. Une IA qui répond, vend plus, et vous informe.",
    heroCTA: "Demander un accès anticipé",

    // Live Scan Preview
    livePreviewTitle: "✨ Aperçu Scan en Direct",
    livePreviewSub: "Démo Upsell IA Instantané",
    waitingScan: "En attente de scan...",
    userQuestion: "Est-ce que je peux utiliser ces écouteurs sous la pluie ?",
    aiResponse: 'Ce modèle n\'est pas certifié IPX4, mais notre <span class="text-[#00E5C3] font-bold">Édition Pro</span> est entièrement étanche. Intéressé par un upgrade ?',
    liveDemo: "Démo en Direct",

    // Stats
    stats: [
      { label: "Support IA", title: "Répond aux questions instantanément, 24h/24 7j/7", tag: "Toujours actif",
        modalTitle: "Support Client propulsé par l'IA",
        modalDesc: "Votre produit devient son propre agent de support. Dès qu'un client scanne votre QR code, l'IA de SQU intervient — formée spécifiquement sur vos fiches produit, guides et ton de marque.",
        modalPoints: ["Gère les questions produit, l'installation et le dépannage instantanément", "Parle avec le ton de votre marque — professionnel, décontracté, technique", "Escalade les cas complexes à votre équipe avec le contexte complet", "Disponible 24h/24, 7j/7, en plusieurs langues — sans recrutement"]
      },
      { label: "Revenus additionnels", title: "Recommande le bon produit au bon moment", tag: "Upsell intelligent",
        modalTitle: "Upsell Contextuel",
        modalDesc: "SQU ne se contente pas de répondre — il détecte les signaux d'achat. Quand un client demande une fonctionnalité que son produit actuel n'a pas, SQU recommande le bon upgrade naturellement.",
        modalPoints: ["Détecte l'intention d'achat à partir de vraies questions — pas de popups génériques", "Recommande accessoires, upgrades et produits complémentaires", "La conversion se fait dans le contexte, pas via des emails de relance", "Suivez la performance upsell par produit dans vos rapports hebdomadaires"]
      },
      { label: "Intelligence Produit", title: "Sachez ce que pensent vos clients, chaque semaine", tag: "Intel hebdomadaire",
        modalTitle: "Rapports d'Intelligence Hebdomadaires",
        modalDesc: "Chaque scan, chaque question, chaque frustration — regroupés et analysés automatiquement. Vous recevez un rapport structuré qui vous dit exactement quoi corriger, quoi marketer et quoi développer.",
        modalPoints: ["Points de friction classés par fréquence et sévérité", "Opportunités marketing issues du langage réel de vos clients", "Notes d'ingénierie signalant les problèmes techniques récurrents", "Suivi du sentiment dans le temps pour mesurer votre impact"]
      },
      { label: "Démarrage rapide", title: "Opérationnel en 24h, sans développement", tag: "En ligne en 24h",
        modalTitle: "En ligne en 24 heures",
        modalDesc: "Pas de SDK, pas d'intégration API, pas de sprint développeur. Vous nous envoyez vos infos produit, on configure votre agent IA, et vous recevez un QR code prêt à imprimer. C'est tout.",
        modalPoints: ["Zéro intégration technique — fonctionne avec n'importe quel produit", "On gère la formation IA à partir de vos docs existants", "QR codes livrés prêts à imprimer dans le format de votre choix", "Support dédié pour vous mettre en ligne rapidement"]
      }
    ],

    // Intelligence Reports
    intelTitle: "Votre Produit, toujours à l'écoute",
    intelSubtitle: "Arrêtez de deviner ce qu'il faut améliorer, marketer ou développer. Vos clients vous le disent déjà.",
    productName: "Aura Speaker Gen 2",
    productTracking: "Suivi Produit Actif",
    feedbackItems: [
      { tag: '"Les basses sont brouillées à 80% du volume"', type: 'Qualité Audio' },
      { tag: '"Comment connecter deux enceintes en stéréo ?"', type: 'Friction UX' },
      { tag: '"Est-ce qu\'elle résiste à l\'eau salée ?"', type: 'Lacune Support' }
    ],
    intelSweep: "Analyse Intelligence",
    autoSynthesis: "Mode Auto-Synthèse",
    liveData: "Données en Direct",
    convPending: "124 Conversations en Attente",
    convPendingSub: "Nouvelles questions concernant l'Aura Speaker Gen 2 collectées ces 72 dernières heures.",
    analyzeCTA: "Analyser l'Intelligence Produit",
    loadingSteps: ["Accès à la base de données...", "Regroupement de 124 scans...", "Identification du sentiment principal...", "Rédaction de la stratégie de marque..."],
    weeklyReport: "Rapport d'Engagement Hebdomadaire",
    weeklyReportSub: "Aura Speaker Gen 2",
    activeSentiment: "Sentiment Actif : Positif (72%)",
    totalScans: "Scans Totaux",
    activeChats: "Chats Actifs",
    vsLastWeek: "+12% vs semaine dernière",
    conversion: "+18% conversion",
    corePain: "Point de Friction Principal",
    corePainText: '<span class="text-white font-bold">14 utilisateurs</span> ont demandé comment appairer avec les anciens modèles Gen 1. Actuellement, l\'IA gère cela manuellement — nous recommandons d\'ajouter un <span class="text-white font-bold">guide "Stereo Link"</span> dédié au flux de scan.',
    marketingOpp: "Opportunité Marketing",
    marketingOppText: 'Les utilisateurs posent des questions sur <span class="text-white font-bold">l\'utilisation à la plage</span>. Exploitez cela en ajoutant un module vidéo "Sécurité Extérieur & Sable" pour augmenter les ventes de notre Housse Renforcée.',
    engNote: "Note Ingénierie",
    engNoteText: 'Cluster détecté : les questions <span class="text-white font-bold">"lumière bleue clignotante"</span> augmentent la nuit. Envisagez une mise à jour firmware pour un mode <span class="text-[#F5A623] font-bold">"Auto-Dim"</span> ou <span class="text-[#F5A623] font-bold">"Mode Discret."</span>',

    // Pricing
    pricingTitle: "Passez à l'échelle supérieure",
    pricingSub: "Des tarifs transparents pour les marques à chaque étape.",
    perMonth: "par mois",
    tailored: "sur mesure",
    mostPopular: "Le Plus Populaire",
    getStarted: "Commencer",
    contactSales: "Nous contacter",
    plans: [
      { plan: "Starter", features: ["Jusqu'à 2 Produits", "Support client IA instantané", "Jusqu'à 1 000 Scans Mensuels", "Insights Clients Hebdomadaires"] },
      { plan: "Growth", features: ["Jusqu'à 5 Produits", "Recommandations produits intelligentes", "Rapports d'Intelligence Complets", "5 000 Scans Mensuels"] },
      { plan: "Pro", features: ["Jusqu'à 15 Produits", "Rapports Hebdomadaires Avancés", "Recommandations Produit & Marketing", "Support Prioritaire", "15 000 Scans Mensuels"] },
      { plan: "Enterprise", features: ["Produits Illimités", "Rapports Personnalisés Actionnables", "Dashboard en Marque Blanche", "Manager Dédié"] }
    ],

    // Contact
    inviteOnly: "Accès sur Invitation",
    contactTitle: "Prêt à transformer votre support client ?",
    contactSub: "SQU est actuellement en accès limité, contactez nous directement pour discuter de ce que nous pouvons faire pour votre marque.",
    bookMeeting: "Réserver un Rendez-vous",
    bookIntro: "Réserver un appel découverte",
    founderTitle: "Fondateur & CEO",

    // Footer
    footerQuote: '"La pire erreur en business ? Ignorer ses clients."',

    // Modal
    modalCTA: "Demander un accès anticipé",
    learnMore: "En savoir plus",

    // How It Works
    howTitle: "Comment ça marche",
    howSub: "Du scan à la stratégie en trois étapes. Aucune équipe technique requise.",
    howSteps: [
      { number: "01", title: "Placez votre QR Code", desc: "Ajoutez un QR code à votre packaging, notice ou produit. Vos clients le scannent dès qu'ils ont besoin d'aide — ou simplement envie d'en savoir plus." },
      { number: "02", title: "L'IA gère la conversation", desc: "SQU répond aux questions, recommande des upgrades et résout les problèmes instantanément — formée sur votre produit, avec le ton de votre marque." },
      { number: "03", title: "Vous recevez l'intelligence", desc: "Chaque interaction devient une donnée. Des rapports hebdomadaires révèlent les points de friction, les opportunités de vente et des insights produit introuvables dans les avis clients." }
    ],
  }
};


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
  const [lang, setLang] = useState('EN');
  const [activeModal, setActiveModal] = useState(null);

  const t = translations[lang];

  // Load Calendly assets once on mount
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/kevin-larretche-squ/30min',
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleGenerateInsight = () => {
    setReportState('loading');
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= t.loadingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setReportState('complete'), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  // Stat card config (icons/colors stay the same, text comes from translations)
  const statConfig = [
    { icon: Zap, color: "text-[#00E5C3]", bgColor: "bg-[#00E5C3]" },
    { icon: BadgeDollarSign, color: "text-[#F5A623]", bgColor: "bg-[#F5A623]" },
    { icon: BrainCircuit, color: "text-blue-400", bgColor: "bg-blue-400" },
    { icon: Rocket, color: "text-purple-400", bgColor: "bg-purple-400" }
  ];

  const feedbackColors = [
    'bg-red-500/10 text-red-400',
    'bg-amber-500/10 text-amber-400',
    'bg-[#00E5C3]/10 text-[#00E5C3]'
  ];

  const pricingConfig = [
    { price: "$99", sub: "Level 01", bg: "START", col: "from-[#00E5C3] to-emerald-400", active: false },
    { price: "$349", sub: "Level 02", bg: "GROW", col: "from-[#F5A623] to-orange-400", active: false },
    { price: "$699", sub: "Level 03", bg: "INTEL", col: "from-purple-500 to-indigo-400", active: true },
    { price: "Custom", sub: "Max Level", bg: "SCALE", col: "from-blue-400 to-[#00E5C3]", active: false }
  ];

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

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8">
              <a href="#features" className="text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors tracking-wide">{t.navFeatures}</a>
              <a href="#demo" className="text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors tracking-wide">{t.navDemo}</a>
              <a href="#pricing" className="text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors tracking-wide">{t.navPricing}</a>
              <a href="#contact" className="text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors tracking-wide">{t.navContact}</a>
            </div>

            {/* LANGUAGE TOGGLE */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
              className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-all duration-300"
            >
              {lang === 'EN' ? 'FR' : 'EN'}
            </button>

            <button
              onClick={openCalendly}
              className="ml-2 relative group px-5 py-2.5 overflow-hidden rounded-full transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#00E5C3]/10 group-hover:bg-[#00E5C3]/20 transition-colors border border-[#00E5C3]/30 rounded-full" />
              <span className="relative z-10 text-[#00E5C3] font-bold text-[11px] uppercase tracking-[0.15em] flex items-center gap-2">
                {t.navCTA}
                <div className="w-1 h-1 rounded-full bg-[#00E5C3] animate-pulse" />
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
              className="px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-400"
            >
              {lang === 'EN' ? 'FR' : 'EN'}
            </button>
            <button className="text-zinc-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#111317]/95 backdrop-blur-lg border-t border-white/5 px-6 py-6 space-y-4">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-zinc-400 hover:text-white">{t.navFeatures}</a>
            <a href="#demo" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-zinc-400 hover:text-white">{t.navDemo}</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-zinc-400 hover:text-white">{t.navPricing}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-zinc-400 hover:text-white">{t.navContact}</a>
            <button onClick={() => { openCalendly(); setIsMobileMenuOpen(false); }} className="w-full mt-2 py-3 rounded-full bg-[#00E5C3]/10 border border-[#00E5C3]/30 text-[#00E5C3] font-bold text-sm uppercase tracking-wider">
              {t.navCTA}
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-8 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00E5C3]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E5C3]/30 bg-[#00E5C3]/5 text-[#00E5C3] text-sm font-medium mb-6">
                <Sparkles size={14} /> {t.heroBadge}
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] overflow-visible">
                {t.heroTitle1}{" "}
                <span className="block pb-4 text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C3] to-[#F5A623]">
                  {t.heroTitle2}
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed font-medium">
                {t.heroSubtitle}
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <button
                onClick={openCalendly}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00E5C3] text-black font-black text-sm uppercase tracking-wider hover:bg-[#00E5C3]/90 transition-all duration-300 hover:scale-105"
              >
                {t.heroCTA} <ArrowRight size={16} />
              </button>
            </FadeIn>
          </div>

          <FadeIn delay={400} className="relative">
            <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00E5C3]/20 flex items-center justify-center">
                  <Smartphone className="text-[#00E5C3]" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{t.livePreviewTitle}</h4>
                  <p className="text-xs text-zinc-500">{t.livePreviewSub}</p>
                </div>
              </div>
              <div className="space-y-4 min-h-[160px] flex flex-col justify-end">
                {simStep >= 1 ? (
                  <div className="flex justify-end">
                    <div className="bg-white/10 rounded-2xl rounded-tr-none p-3.5 max-w-[85%] border border-white/5 text-sm text-white animate-slide-user">
                      {t.userQuestion}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-12 text-zinc-600 animate-pulse text-[10px] uppercase font-black tracking-[0.2em]">
                    {t.waitingScan}
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
                      <span dangerouslySetInnerHTML={{ __html: t.aiResponse }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5C3] animate-blink-fast"></span>
                  </div>
                  <span className="text-[10px] font-black text-[#00E5C3] uppercase tracking-widest">{t.liveDemo}</span>
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

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-14 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00E5C3] mb-4">1 → 2 → 3</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">{t.howTitle}</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.howSub}</p>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line (mobile) / Horizontal line (desktop) */}
            <div className="hidden md:block absolute top-[28px] left-[calc(16.66%+7px)] right-[calc(16.66%+7px)] h-px bg-gradient-to-r from-[#00E5C3]/30 via-[#F5A623]/30 to-purple-500/30" />
            <div className="md:hidden absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-[#00E5C3]/30 via-[#F5A623]/30 to-purple-500/30" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                { color: "#00E5C3", icon: QrCode },
                { color: "#F5A623", icon: MessageSquareText },
                { color: "rgb(168,85,247)", icon: BarChart2 }
              ].map((cfg, i) => {
                const step = t.howSteps[i];
                const Icon = cfg.icon;
                return (
                  <FadeIn key={i} delay={i * 200}>
                    <div className="relative flex md:flex-col items-start gap-5 md:gap-0 md:items-center md:text-center py-6 md:py-0 md:px-6">
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className="w-[40px] h-[40px] rounded-full flex items-center justify-center border-2 bg-[#111317]"
                          style={{ borderColor: cfg.color }}
                        >
                          <Icon size={18} style={{ color: cfg.color }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:mt-8">
                        <span
                          className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 block"
                          style={{ color: cfg.color }}
                        >
                          {step.number}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-xs md:mx-auto">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIPE */}
      <section className="py-12 px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.stats.map((stat, i) => {
              const cfg = statConfig[i];
              const Icon = cfg.icon;
              return (
                <FadeIn key={i} delay={i * 100} className="h-full">
                  <div onClick={() => setActiveModal(i)} className="group relative flex flex-col h-full min-h-[260px] bg-[#0F1115] rounded-[24px] border border-white/5 p-6 overflow-hidden transition-all duration-500 cursor-pointer hover:border-white/20 hover:bg-[#14171d] hover:-translate-y-2 shadow-2xl">
                    <div className={`absolute -top-16 -right-16 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${cfg.bgColor}`} />
                    <div className="relative z-10 flex flex-col gap-5">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 ${cfg.color} transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon size={24} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-xl font-black tracking-tight text-white uppercase italic leading-none truncate">
                          {stat.label}
                        </h2>
                        <div className={`h-[2px] w-8 ${cfg.bgColor} transition-all duration-500 group-hover:w-full`} />
                      </div>
                    </div>
                    <div className="relative z-10 mt-4">
                      <p className="text-sm font-bold text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors duration-300">
                        {stat.title}
                      </p>
                    </div>
                    <div className="mt-auto pt-6 relative z-10">
                      <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.05] transition-all duration-300">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${cfg.color}`}>
                          {t.learnMore}
                        </span>
                        <ChevronRight size={14} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
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
                    <h2 className="text-4xl font-bold tracking-tight">{t.intelTitle}</h2>
                  </div>
                  <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                    {t.intelSubtitle}
                  </p>
                </div>
              </FadeIn>

              <div className="glass-card p-6 rounded-2xl border-white/5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Volume2 className="text-zinc-400" size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t.productName}</h4>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">{t.productTracking}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pl-4 border-l-2 border-white/5 flex-grow">
                {t.feedbackItems.map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 150} className="relative group">
                    <div className="absolute -left-[25px] top-4 w-4 h-4 rounded-full border-2 border-[#F5A623] bg-[#111317]" />
                    <div className="glass-card p-6 rounded-2xl border-white/5 hover:border-[#F5A623]/30 transition-all">
                      <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${feedbackColors[idx]} mb-3 inline-block`}>
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
                      <h3 className="text-lg font-bold">{t.intelSweep}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{t.autoSynthesis}</p>
                    </div>
                  </div>
                  {reportState === 'complete' && (
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                      {t.liveData}
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
                      <h4 className="text-xl font-bold text-white tracking-tight">{t.convPending}</h4>
                      <p className="text-sm text-zinc-500">{t.convPendingSub}</p>
                    </div>
                    <button onClick={handleGenerateInsight} className="w-full bg-[#00E5C3] text-[#111317] py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all glow-primary flex items-center justify-center gap-3 active:scale-[0.98]">
                      <Sparkles size={22} fill="currentColor" /> {t.analyzeCTA}
                    </button>
                  </div>
                )}

                {reportState === 'loading' && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative py-20">
                    <div className="scan-effect"></div>
                    <div className="w-20 h-20 border-t-2 border-r-2 border-[#00E5C3] rounded-full animate-spin"></div>
                    <div className="text-center">
                      <p className="text-sm font-mono text-[#00E5C3] mb-2">{t.loadingSteps[loadingStep]}</p>
                      <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00E5C3] transition-all duration-500"
                          style={{ width: `${((loadingStep + 1) / t.loadingSteps.length) * 100}%` }}
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
                          <h4 className="font-bold text-lg">{t.weeklyReport}</h4>
                          <p className="text-xs text-zinc-500 font-medium">{t.weeklyReportSub} • <span className="text-white">{t.activeSentiment}</span></p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1A1D24] p-4 rounded-2xl border border-white/5">
                          <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">{t.totalScans}</p>
                          <p className="text-2xl font-black text-white">124</p>
                          <p className="text-[10px] text-emerald-400 font-bold">{t.vsLastWeek}</p>
                        </div>
                        <div className="bg-[#1A1D24] p-4 rounded-2xl border border-white/5">
                          <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">{t.activeChats}</p>
                          <p className="text-2xl font-black text-white">42</p>
                          <p className="text-[10px] text-emerald-400 font-bold">{t.conversion}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[#00E5C3]/30 transition-all">
                          <div className="flex items-center gap-2 mb-3 text-[#00E5C3] font-bold text-xs uppercase tracking-widest">
                            <AlertCircle size={14} /> {t.corePain}
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.corePainText }} />
                        </div>

                        <div className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[#F5A623]/30 transition-all">
                          <div className="flex items-center gap-2 mb-3 text-[#F5A623] font-bold text-xs uppercase tracking-widest">
                            <TrendingUp size={14} /> {t.marketingOpp}
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.marketingOppText }} />
                        </div>

                        <div className="group bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-2xl p-5 hover:bg-[#F5A623]/10 transition-all relative overflow-hidden">
                          <div className="flex items-center gap-2 mb-3 text-[#F5A623] font-bold text-xs uppercase tracking-widest relative z-10">
                            <Wrench size={14} /> {t.engNote}
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: t.engNoteText }} />
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

      {/* PRICING */}
      <section className="py-24 px-4 bg-[#111317]" id="pricing">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">{t.pricingTitle}</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.pricingSub}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingConfig.map((p, i) => {
              const planT = t.plans[i];
              return (
                <FadeIn key={i} delay={i * 100} className="group h-full">
                  <div className={`relative h-full flex flex-col bg-[#1A1D24] border ${p.active ? 'border-[#00E5C3]/40 ring-1 ring-[#00E5C3]/20' : 'border-white/5'} rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:bg-[#23272f] hover:border-white/10 hover:-translate-y-1`}>
                    <span className="absolute -bottom-2 -right-2 text-7xl font-black text-white/[0.02] transition-all duration-700 pointer-events-none uppercase italic group-hover:text-white/[0.04]">
                      {p.bg}
                    </span>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${p.col} animate-pulse`} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{p.sub}</span>
                        </div>
                        {p.active && (
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#00E5C3] px-2 py-0.5 rounded-md bg-[#00E5C3]/10 border border-[#00E5C3]/20">{t.mostPopular}</span>
                        )}
                      </div>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-2">{planT.plan}</h3>
                        <div className={`text-5xl font-black tracking-tighter bg-gradient-to-br ${p.col} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 origin-left`}>
                          {p.price}
                        </div>
                        {p.price !== "Custom" ? (
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2">{t.perMonth}</p>
                        ) : (
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2">{t.tailored}</p>
                        )}
                      </div>
                      <div className="h-px w-full bg-white/5 mb-6" />
                      <div className="space-y-3.5 flex-grow mb-8">
                        {planT.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1 flex-shrink-0">
                              <Check size={12} className="text-[#00E5C3]" />
                            </div>
                            <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors leading-tight">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={openCalendly}
                        className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 text-center block ${
                          p.active
                          ? 'bg-[#00E5C3] text-black hover:bg-[#00cba0]'
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
                        }`}>
                        {p.price === "Custom" ? t.contactSales : t.getStarted}
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="pb-16 md:pb-24 pt-4 px-4 md:px-6 relative overflow-hidden bg-[#0A0C10] text-white min-h-screen" id="contact">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#00E5C3]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl md:rounded-[3rem] p-6 md:p-16 border border-white/10">
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
                    <Zap size={14} fill="currentColor" /> {t.inviteOnly}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter leading-tight">
                    {t.contactTitle}
                  </h2>
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
                    {t.contactSub}
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5C3] to-[#F5A623] rounded-[2rem] md:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-[#1A1D24] border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#00E5C3] to-blue-600 p-[2px]">
                        <div className="w-full h-full bg-[#111317] rounded-full flex items-center justify-center">
                          <span className="text-xl md:text-2xl font-black text-white tracking-tighter">KL</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Kevin Larretche</h3>
                        <p className="text-[#00E5C3] font-medium text-sm">{t.founderTitle}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={openCalendly}
                        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00E5C3]/30 p-3 md:p-4 rounded-xl transition-all group/btn"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#111317] flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                            <Calendar size={18} className="text-zinc-400 group-hover/btn:text-[#00E5C3]" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">{t.bookMeeting}</p>
                            <p className="text-xs md:text-sm font-medium text-zinc-200">{t.bookIntro}</p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-zinc-600 group-hover/btn:text-[#00E5C3] group-hover/btn:translate-x-1 transition-all flex-shrink-0" />
                      </button>
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
          <p className="text-zinc-600 text-sm font-medium italic">{t.footerQuote}</p>
        </div>
      </footer>

      {/* FEATURE DETAIL MODAL */}
      {activeModal !== null && (() => {
        const stat = t.stats[activeModal];
        const cfg = statConfig[activeModal];
        const Icon = cfg.icon;
        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={() => setActiveModal(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#1A1D24] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>

              {/* Glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] opacity-20 ${cfg.bgColor} pointer-events-none`} />

              {/* Icon + Tag */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 ${cfg.color}`}>
                  <Icon size={28} strokeWidth={2} />
                </div>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${cfg.color}`}>{stat.tag}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 relative z-10">
                {stat.modalTitle}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed mb-8 relative z-10">
                {stat.modalDesc}
              </p>

              {/* Points */}
              <div className="space-y-4 mb-10 relative z-10">
                {stat.modalPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 flex-shrink-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.bgColor}`} />
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/5 mb-6 relative z-10" />

              {/* CTA */}
              <button
                onClick={() => { setActiveModal(null); openCalendly(); }}
                className="w-full py-3.5 rounded-xl bg-[#00E5C3] text-black font-bold text-sm uppercase tracking-wider hover:bg-[#00cba0] transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
              >
                {t.modalCTA} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}