import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Zap, Check, ArrowRight, Sparkles, TrendingUp,
  Quote, Calendar, AlertCircle, Volume2, Wrench, BrainCircuit,
  QrCode, MessageSquareText, BarChart2, Mail, Settings
} from 'lucide-react';

// ─── TRANSLATIONS ────────────────────────────────────────────────
const translations = {
  EN: {
    skipToContent: "Skip to content",
    navFeatures: "What changes",
    navHow: "How it works",
    navPricing: "Pricing",
    navContact: "Contact",
    navDemoCTA: "Book a walkthrough",

    heroKicker: "For DTC and product brands",
    heroTitle1: "Put an AI on every",
    heroTitle2: "product you ship.",
    heroSubtitle: "One QR code. Customers get instant answers. You get a weekly report on what to fix, market, and build next. Live in 24 hours, no packaging redesign.",
    heroPrimaryCTA: "Book a 20-min walkthrough",
    heroSecondary: "or join the waitlist",
    heroTrust: "In pilot with brands in consumer audio, beauty, and home goods. Reference calls on request.",

    livePreviewTitle: "Live scan preview",
    livePreviewSub: "Instant answer + smart upsell",
    waitingScan: "Waiting for scan...",
    userQuestion: "Can I use these earbuds outdoors when it rains?",
    aiResponse: 'This model isn\'t IPX4 certified, but our <span class="text-[#00E5C3] font-bold">Pro Edition</span> is fully waterproof. Want to upgrade your order?',
    liveDemo: "Live demo",

    changesKicker: "What you get on day one",
    changesTitle: "Three things change. Immediately.",
    changesSub: "Same product. Same packaging. A new layer of intelligence and revenue underneath.",
    pillars: [
      {
        tag: "Customer Intelligence",
        headline: "Stop guessing what to build, market, or fix.",
        body: "Every scan becomes a data point. Every Monday, a report lands in your inbox: what your customers actually want, what confused them, what nearly cost you the sale."
      },
      {
        tag: "Instant AI Support",
        headline: "Cut repetitive support to near zero.",
        body: "SQU answers in your brand voice, 24/7. Trained on your exact product info. When it's unsure, it escalates to a human."
      },
      {
        tag: "Built-in Upsell",
        headline: "Turn every question into a sales moment.",
        body: 'When a customer asks "is this waterproof?", SQU doesn\'t just answer. It recommends the Pro Edition that is. The right offer, at the right second, automatically.'
      }
    ],

    howKicker: "1 → 2 → 3",
    howTitle: "How it works",
    howSub: "From scan to strategy in three steps. No dev team required.",
    howSteps: [
      { number: "01", title: "Place your QR code", desc: "Add a branded QR code to your packaging, manual, or product. Customers scan it when they need help, or just want to know more." },
      { number: "02", title: "AI handles the conversation", desc: "SQU answers questions, recommends upgrades, and resolves issues instantly. Trained on your product, speaking your brand's voice." },
      { number: "03", title: "You get the intelligence", desc: "Every interaction becomes a data point. Weekly reports surface pain points, upsell opportunities, and product insights you'd never get from reviews alone." }
    ],

    intelKicker: "What lands in your inbox every Monday",
    intelTitle: "Real customer questions. Synthesized into action.",
    intelSubtitle: "Not raw transcripts. Strategic intel. What to build, what to fix, what to market.",
    productName: "Aura Speaker Gen 2",
    productTracking: "Last 7 days",
    feedbackItems: [
      { tag: '"Bass feels muddy at 80% volume"', type: 'Audio Quality' },
      { tag: '"How do I link two for stereo?"', type: 'UX Friction' },
      { tag: '"Is it safe near salt water?"', type: 'Support Gap' }
    ],
    weeklyReport: "Weekly Intelligence Report",
    weeklyReportSub: "Aura Speaker Gen 2 · Last 7 days",
    activeSentiment: "Sentiment: 72% positive",
    totalScans: "Total Scans",
    activeChats: "Conversations",
    vsLastWeek: "+12% vs last week",
    conversion: "+18% upsell rate",
    corePain: "Core Pain Point",
    corePainText: '<span class="text-white font-bold">14 customers</span> asked how to pair with older Gen 1 models. Add a dedicated <span class="text-white font-bold">"Stereo Link"</span> guide to the scan flow to deflect this fully.',
    marketingOpp: "Marketing Opportunity",
    marketingOppText: 'Customers are asking about <span class="text-white font-bold">beach use</span>. Add an "Outdoor & Sand Safety" guide to drive Rugged Carrying Case upsells.',
    engNote: "Engineering Note",
    engNoteText: 'Cluster: <span class="text-white font-bold">"blue light flashing"</span> questions peak at night. Consider an <span class="text-[#F5A623] font-bold">"Auto-Dim"</span> firmware update.',

    pricingKicker: "Pricing",
    pricingTitle: "Plans that pay for themselves.",
    pricingSub: "Start at $99. Cancel anytime.",
    perMonth: "per month",
    tailored: "tailored for you",
    mostPopular: "Most Popular",
    bookCallCTA: "Book a walkthrough",
    contactSales: "Contact sales",
    plans: [
      { plan: "Starter", roi: "Pays for itself by deflecting ~5 support replies a week.", features: ["Instant AI customer support", "Up to 100 monthly scans", "Weekly customer insights"] },
      { plan: "Growth", roi: "Pays for itself with 1-2 captured upsells per month.", features: ["Smart product recommendations", "Full intelligence reports", "400 monthly scans"] },
      { plan: "Pro", roi: "Pays for itself if it prevents 4 returns OR captures 6 upsells per month.", features: ["Advanced dashboard", "Product & marketing recommendations", "Priority support", "1,200 monthly scans"] },
      { plan: "Enterprise", roi: "Built around your category, your volume, your margins.", features: ["Unlimited products", "Custom actionable reports", "White-label dashboard", "Dedicated manager"] }
    ],

    waitlistKicker: "Not ready for a call?",
    waitlistTitle: "Get a sample weekly report instead.",
    waitlistSub: "Drop your email. We'll send you a short walkthrough video and a sample SQU intelligence report you can share with your team.",
    waitlistPlaceholder: "your@email.com",
    waitlistCTA: "Send me the sample",
    waitlistSuccess: "Done. Check your inbox in the next few minutes.",

    inviteOnly: "Invite-only access",
    contactTitle: "Want to see your weekly report before you commit?",
    contactSub: "SQU is in private pilot. Book 20 minutes with me. I'll show you what your weekly intelligence report would look like, with your actual products. No deck, no fluff.",
    bookMeeting: "Book a walkthrough",
    bookIntro: "20 minutes. Founder to founder.",
    founderTitle: "Founder & CEO",

    footerQuote: '"The stupidest thing about business is ignoring your customers."',
    footerRights: "© 2026 SQU Solutions. All rights reserved."
  },

  FR: {
    skipToContent: "Aller au contenu",
    navFeatures: "Ce qui change",
    navHow: "Comment ça marche",
    navPricing: "Tarifs",
    navContact: "Contact",
    navDemoCTA: "Réserver un appel",

    heroKicker: "Pour les marques DTC et produits",
    heroTitle1: "Une IA sur chaque produit",
    heroTitle2: "que vous expédiez.",
    heroSubtitle: "Un QR code. Vos clients ont des réponses instantanées. Vous recevez un rapport hebdo sur ce qu'il faut corriger, marketer, ou développer. En ligne en 24h, sans redesign packaging.",
    heroPrimaryCTA: "Réserver un appel de 20 min",
    heroSecondary: "ou rejoindre la waitlist",
    heroTrust: "En pilote avec des marques en audio grand public, beauté et maison. Appels références sur demande.",

    livePreviewTitle: "Aperçu scan en direct",
    livePreviewSub: "Réponse instantanée + upsell intelligent",
    waitingScan: "En attente de scan...",
    userQuestion: "Est-ce que je peux utiliser ces écouteurs sous la pluie ?",
    aiResponse: 'Ce modèle n\'est pas certifié IPX4, mais notre <span class="text-[#00E5C3] font-bold">Édition Pro</span> est entièrement étanche. On vous fait l\'upgrade ?',
    liveDemo: "Démo live",

    changesKicker: "Ce que vous obtenez dès le jour 1",
    changesTitle: "Trois choses changent. Tout de suite.",
    changesSub: "Même produit. Même packaging. Une nouvelle couche d'intelligence et de revenus en dessous.",
    pillars: [
      {
        tag: "Intelligence Client",
        headline: "Arrêtez de deviner ce qu'il faut développer, marketer ou corriger.",
        body: "Chaque scan devient une donnée. Chaque lundi, un rapport arrive : ce que vos clients veulent vraiment, ce qui les a perdus, ce qui a failli vous coûter une vente."
      },
      {
        tag: "Support IA Instantané",
        headline: "Réduisez le SAV répétitif à presque zéro.",
        body: "SQU répond avec le ton de votre marque, 24/7. Formé sur vos infos produit exactes. Si elle ne sait pas, elle escalade vers un humain."
      },
      {
        tag: "Upsell Intégré",
        headline: "Transformez chaque question en moment de vente.",
        body: 'Quand un client demande "c\'est étanche ?", SQU ne se contente pas de répondre. Elle propose l\'Édition Pro qui l\'est. La bonne offre, à la bonne seconde, automatiquement.'
      }
    ],

    howKicker: "1 → 2 → 3",
    howTitle: "Comment ça marche",
    howSub: "Du scan à la stratégie en trois étapes. Aucune équipe technique requise.",
    howSteps: [
      { number: "01", title: "Placez votre QR Code", desc: "Ajoutez un QR code à votre packaging, notice ou produit. Vos clients le scannent dès qu'ils ont besoin d'aide, ou simplement envie d'en savoir plus." },
      { number: "02", title: "L'IA gère la conversation", desc: "SQU répond aux questions, recommande des upgrades, et résout les problèmes instantanément. Formée sur votre produit, avec le ton de votre marque." },
      { number: "03", title: "Vous recevez l'intelligence", desc: "Chaque interaction devient une donnée. Des rapports hebdomadaires révèlent les frictions, les opportunités de vente et des insights produit introuvables ailleurs." }
    ],

    intelKicker: "Ce qui arrive dans votre boîte chaque lundi",
    intelTitle: "Les vraies questions de vos clients. Transformées en actions.",
    intelSubtitle: "Pas des transcriptions brutes. De l'intelligence stratégique. Quoi développer, quoi corriger, quoi marketer.",
    productName: "Aura Speaker Gen 2",
    productTracking: "7 derniers jours",
    feedbackItems: [
      { tag: '"Les basses sont brouillées à 80% du volume"', type: 'Qualité Audio' },
      { tag: '"Comment connecter deux enceintes en stéréo ?"', type: 'Friction UX' },
      { tag: '"Est-ce qu\'elle résiste à l\'eau salée ?"', type: 'Lacune Support' }
    ],
    weeklyReport: "Rapport d'Intelligence Hebdo",
    weeklyReportSub: "Aura Speaker Gen 2 · 7 derniers jours",
    activeSentiment: "Sentiment : 72% positif",
    totalScans: "Scans Totaux",
    activeChats: "Conversations",
    vsLastWeek: "+12% vs semaine dernière",
    conversion: "+18% taux upsell",
    corePain: "Point de Friction Principal",
    corePainText: '<span class="text-white font-bold">14 clients</span> ont demandé comment appairer avec les anciens modèles Gen 1. Ajoutez un guide <span class="text-white font-bold">"Stereo Link"</span> dédié au flux de scan pour traiter ça.',
    marketingOpp: "Opportunité Marketing",
    marketingOppText: 'Les clients posent des questions sur <span class="text-white font-bold">l\'utilisation à la plage</span>. Ajoutez un guide "Sécurité Extérieur & Sable" pour booster les ventes de la Housse Renforcée.',
    engNote: "Note Ingénierie",
    engNoteText: 'Cluster : les questions <span class="text-white font-bold">"lumière bleue clignotante"</span> augmentent la nuit. Envisagez une mise à jour firmware <span class="text-[#F5A623] font-bold">"Auto-Dim"</span>.',

    pricingKicker: "Tarifs",
    pricingTitle: "Des plans qui se paient tout seuls.",
    pricingSub: "À partir de 99$. Annulable à tout moment.",
    perMonth: "par mois",
    tailored: "sur mesure",
    mostPopular: "Le Plus Populaire",
    bookCallCTA: "Réserver un appel",
    contactSales: "Nous contacter",
    plans: [
      { plan: "Starter", roi: "Rentabilisé en évitant ~5 réponses SAV par semaine.", features: ["Support client IA instantané", "100 scans mensuels", "Insights clients hebdomadaires"] },
      { plan: "Growth", roi: "Rentabilisé avec 1-2 upsells captés par mois.", features: ["Recommandations produits intelligentes", "Rapports d'intelligence complets", "500 scans mensuels"] },
      { plan: "Pro", roi: "Rentabilisé en évitant 4 retours OU en captant 6 upsells par mois.", features: ["Rapports hebdomadaires avancés", "Recommandations produit & marketing", "Support prioritaire", "1 200 scans mensuels"] },
      { plan: "Enterprise", roi: "Construit autour de votre catégorie, vos volumes, vos marges.", features: ["Rapports personnalisés actionnables", "Dashboard en marque blanche", "Manager dédié"] }
    ],

    waitlistKicker: "Pas prêt pour un appel ?",
    waitlistTitle: "Recevez un exemple de rapport hebdo.",
    waitlistSub: "Laissez votre email. On vous envoie une vidéo de présentation et un exemple de rapport SQU que vous pouvez partager avec votre équipe.",
    waitlistPlaceholder: "votre@email.com",
    waitlistCTA: "Recevoir l'exemple",
    waitlistSuccess: "C'est bon. Vérifiez votre boîte dans quelques minutes.",

    inviteOnly: "Accès sur invitation",
    contactTitle: "Vous voulez voir votre rapport avant de vous engager ?",
    contactSub: "SQU est en pilote privé. Réservez 20 min avec moi. Je vous montre à quoi ressemblerait votre rapport hebdo, avec vos vrais produits. Pas de deck, pas de fluff.",
    bookMeeting: "Réserver un appel",
    bookIntro: "20 minutes. De fondateur à fondateur.",
    founderTitle: "Fondateur & CEO",

    footerQuote: '"La pire erreur en business ? Ignorer ses clients."',
    footerRights: "© 2026 SQU Solutions. Tous droits réservés."
  }
};


// ─── SQU SVG LOGO ────────────────────────────────────────────────
const SquLogo = ({ height = 44 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="505 835 1035 330"
    style={{ height, width: 'auto', display: 'block' }}
    role="img"
    aria-label="SQU"
  >
    <path fill="#FFFFFF" d="M896.58,1054.34c2.5,20.15,22.49,33.12,51.08,33.12c26.56,0,45.77-13.59,45.77-32.49c0-16.25-12.34-25.78-41.24-32.49l-29.21-6.72c-40.93-9.22-60.14-29.52-60.14-63.11c0-40.93,33.43-68.11,83.89-68.11c47.33,0,81.54,27.18,83.42,65.92h-38.58c-2.81-19.84-20.31-32.33-44.99-32.33c-25.94,0-43.12,12.5-43.12,31.71c0,15.15,11.4,24.06,39.36,30.46l25.93,5.94c45.77,10.31,64.98,29.37,64.98,63.73c0,43.9-33.9,71.23-88.57,71.23c-51.71,0-85.92-25.93-87.95-66.86H896.58z"/>
    <path fill="#FFFFFF" d="M1069.53,1002.94c0-73.11,41.4-118.41,106.85-118.41c65.14,0,106.38,45.46,106.38,118.41c0,42.02-13.43,75.29-37.17,94.35l28.11,41.55h-40.46l-17.19-23.9c-11.87,4.06-25.46,6.25-39.68,6.25C1110.46,1121.19,1069.53,1076.2,1069.53,1002.94z M1195.44,1082.77l-27.02-38.43h38.74l14.21,17.81c12.97-12.03,20.16-32.96,20.16-59.21c0-50.61-25.46-82.63-65.14-82.63c-40.15,0-65.6,31.87-65.6,82.63c0,50.77,25.46,82.48,65.6,82.48C1182.94,1085.42,1189.35,1084.48,1195.44,1082.77z"/>
    <path fill="#FFFFFF" d="M1369.65,1034.18c0,30.46,19.05,50.93,52.49,50.93c33.43,0,52.33-20.46,52.33-50.93V890.16h40.31v147.77c0,49.21-35.62,83.26-92.63,83.26c-57.02,0-92.64-34.05-92.64-83.26V890.16h40.15V1034.18z"/>
    <path fill="#00E5C3" d="M741.49,951.21L667.5,989.6c-20.01,10.38-40.96,13.83-55.71,8.35c-22.21-8.25-18.6-31.27-0.04-45.39c38.02-28.92,103.18-40.76,147.29-24.51c5.37,1.97,10.15,4.26,14.37,6.81l36.71-19.06c-9.18-9.04-21.87-16.84-37.97-22.76c-66.42-24.47-165.71-7.94-221.78,36.91c-51.44,41.16-48.63,91.86,3.5,118.84l73.99-38.38c20.01-10.38,40.96-13.83,55.71-8.35c22.21,8.25,18.6,31.27,0.04,45.39c-38.02,28.92-103.18,40.76-147.29,24.51c-5.37-1.97-10.15-4.26-14.37-6.81l-36.71,19.06c9.18,9.04,21.87,16.84,37.97,22.76c66.42,24.47,165.71,7.94,221.78-36.91C796.42,1028.9,793.62,978.19,741.49,951.21z"/>
    <path fill="#FFFFFF" d="M626.92,1132.99l158.84-90.88c2.3-1.31,4.49-0.22,4.43,2.3c-0.41,15.94-9.84,33.35-28.79,49.69c-33.23,28.65-86.51,46.04-134.91,46.72C622.85,1140.86,623.17,1135.14,626.92,1132.99z"/>
    <path fill="#00E5C3" d="M691.03,1152.52l85.25-48.78c1.23-0.71,2.41-0.12,2.38,1.23c-0.22,8.55-5.28,17.9-15.45,26.67c-17.83,15.38-46.43,24.71-72.41,25.07C688.84,1156.74,689.01,1153.67,691.03,1152.52z"/>
    <path fill="#FFFFFF" d="M668.43,867.01l-158.84,90.88c-2.3,1.31-4.49,0.22-4.43-2.3c0.41-15.94,9.84-33.35,28.79-49.69c33.23-28.65,86.51-46.04,134.91-46.72C672.5,859.14,672.19,864.86,668.43,867.01z"/>
    <path fill="#00E5C3" d="M604.32,847.48l-85.25,48.78c-1.23,0.71-2.41,0.12-2.38-1.23c0.22-8.55,5.28-17.9,15.45-26.67c17.83-15.38,46.43-24.71,72.41-25.07C606.51,843.26,606.34,846.33,604.32,847.48z"/>
  </svg>
);


// ─── GLOBAL STYLES ───────────────────────────────────────────────
const styles = `
  @keyframes blink-fast { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
  @keyframes typing { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-3px); opacity: 1; } }
  @keyframes slide-in-right { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  .animate-blink-fast { animation: blink-fast 0.8s ease-in-out infinite; }
  .typing-dot { animation: typing 1s ease-in-out infinite; }
  .animate-slide-user { animation: slide-in-right 0.4s ease-out forwards; }

  .glass-card {
    background: rgba(26, 29, 36, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .glow-primary { box-shadow: 0 0 32px rgba(0, 229, 195, 0.35); }
  .glow-pro { box-shadow: 0 0 40px rgba(0, 229, 195, 0.18); }

  @media (prefers-reduced-motion: reduce) {
    .animate-blink-fast,
    .typing-dot,
    .animate-slide-user,
    .animate-pulse,
    .animate-ping,
    .animate-spin {
      animation: none !important;
    }
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;


// ─── FADE-IN HELPER ──────────────────────────────────────────────
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
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


// ─── APP ─────────────────────────────────────────────────────────
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [lang, setLang] = useState('EN');
  const [email, setEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const t = translations[lang];

  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5C3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C10]";

  // Load Calendly
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
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/kevin-larretche-squ/30min' });
    }
  };

  // Hero chat sim
  useEffect(() => {
    const timer = setInterval(() => setSimStep((p) => (p + 1) % 4), 3200);
    return () => clearInterval(timer);
  }, []);

  // Waitlist
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      const res = await fetch('https://formspree.io/f/xrerllag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'SQU landing waitlist', language: lang }),
      });
      if (res.ok) setWaitlistSubmitted(true);
    } catch (err) {
      console.error('[waitlist] error', err);
    }
  };

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => document.getElementById('waitlist-email')?.focus(), 500);
    }
  };

  // Pillar config (intel first, support second, upsell third)
  const pillarConfig = [
    { icon: BrainCircuit,       color: '#00E5C3', tint: 'rgba(0, 229, 195, 0.12)' },
    { icon: MessageSquareText,  color: '#60A5FA', tint: 'rgba(96, 165, 250, 0.12)' },
    { icon: TrendingUp,         color: '#F5A623', tint: 'rgba(245, 166, 35, 0.12)' }
  ];

  const feedbackColors = [
    'bg-red-500/15 text-red-300',
    'bg-amber-500/15 text-amber-300',
    'bg-[#00E5C3]/15 text-[#00E5C3]'
  ];

  const pricingConfig = [
    { price: "$99",    sub: "Starter",    col: "from-[#00E5C3] to-emerald-400", active: false },
    { price: "$399",   sub: "Growth",     col: "from-[#F5A623] to-orange-400",  active: false },
    { price: "$749",   sub: "Pro",        col: "from-purple-500 to-indigo-400", active: true  },
    { price: "Custom", sub: "Enterprise", col: "from-blue-400 to-[#00E5C3]",    active: false }
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-zinc-100 font-sans selection:bg-[#00E5C3] selection:text-zinc-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* SKIP TO CONTENT */}
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00E5C3] focus:text-black focus:font-bold focus:rounded-full ${focusRing}`}
      >
        {t.skipToContent}
      </a>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0C10]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className={`flex items-center ${focusRing} rounded-md`} aria-label="SQU home">
            <SquLogo height={44} />
          </a>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8">
              <a href="#features" className={`text-sm font-medium text-zinc-300 hover:text-white transition-colors ${focusRing} rounded-md px-1 py-0.5`}>{t.navFeatures}</a>
              <a href="#how" className={`text-sm font-medium text-zinc-300 hover:text-white transition-colors ${focusRing} rounded-md px-1 py-0.5`}>{t.navHow}</a>
              <a href="#pricing" className={`text-sm font-medium text-zinc-300 hover:text-white transition-colors ${focusRing} rounded-md px-1 py-0.5`}>{t.navPricing}</a>
              <a href="#contact" className={`text-sm font-medium text-zinc-300 hover:text-white transition-colors ${focusRing} rounded-md px-1 py-0.5`}>{t.navContact}</a>
            </div>

            <button
              onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
              aria-label={lang === 'EN' ? 'Switch to French' : 'Switch to English'}
              className={`px-3 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition min-w-[44px] ${focusRing}`}
            >
              {lang === 'EN' ? 'FR' : 'EN'}
            </button>

            <button
              onClick={openCalendly}
              className={`ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00E5C3] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00cba0] transition ${focusRing}`}
            >
              {t.navDemoCTA}
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
              aria-label={lang === 'EN' ? 'Switch to French' : 'Switch to English'}
              className={`px-3 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-300 ${focusRing}`}
            >
              {lang === 'EN' ? 'FR' : 'EN'}
            </button>
            <button
              className={`text-zinc-300 p-2 rounded-md ${focusRing}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A0C10]/95 backdrop-blur-lg border-t border-white/5 px-6 py-6 space-y-4">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-zinc-300 hover:text-white">{t.navFeatures}</a>
            <a href="#how" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-zinc-300 hover:text-white">{t.navHow}</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-zinc-300 hover:text-white">{t.navPricing}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-zinc-300 hover:text-white">{t.navContact}</a>
            <button
              onClick={() => { openCalendly(); setIsMobileMenuOpen(false); }}
              className={`w-full mt-2 py-3 rounded-full bg-[#00E5C3] text-black font-bold text-sm uppercase tracking-widest ${focusRing}`}
            >
              {t.navDemoCTA}
            </button>
          </div>
        )}
      </nav>

      <main id="main">
        {/* HERO */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00E5C3]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left relative z-10">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E5C3]/30 bg-[#00E5C3]/5 text-[#00E5C3] text-xs font-bold uppercase tracking-widest mb-6">
                  <Sparkles size={12} aria-hidden="true" /> {t.heroKicker}
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
                  {t.heroTitle1}{" "}
                  <span className="block pb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5C3] to-[#F5A623]">
                    {t.heroTitle2}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed font-medium">
                  {t.heroSubtitle}
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    onClick={openCalendly}
                    className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#00E5C3] text-black font-black text-base uppercase tracking-widest hover:bg-[#00cba0] transition glow-primary ${focusRing}`}
                  >
                    {t.heroPrimaryCTA}
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={scrollToWaitlist}
                    className={`text-sm text-zinc-300 hover:text-white underline underline-offset-4 font-medium transition rounded-sm ${focusRing}`}
                  >
                    {t.heroSecondary}
                  </button>
                </div>

                <p className="mt-6 text-xs text-zinc-400 font-medium max-w-md">
                  {t.heroTrust}
                </p>
              </FadeIn>
            </div>

            {/* Live scan preview */}
            <FadeIn delay={400} className="relative">
              <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#00E5C3]/20 flex items-center justify-center" aria-hidden="true">
                    <QrCode className="text-[#00E5C3]" size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-white">{t.livePreviewTitle}</h2>
                    <p className="text-xs text-zinc-400">{t.livePreviewSub}</p>
                  </div>
                </div>

                <div className="space-y-4 min-h-[180px] flex flex-col justify-end">
                  {simStep >= 1 ? (
                    <div className="flex justify-end">
                      <div className="bg-white/10 rounded-2xl rounded-tr-none p-3.5 max-w-[85%] border border-white/5 text-sm text-white animate-slide-user">
                        {t.userQuestion}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center py-12 text-zinc-500 text-xs uppercase font-bold tracking-widest">
                      {t.waitingScan}
                    </div>
                  )}

                  {simStep >= 1 && simStep < 2 && (
                    <div className="flex justify-start">
                      <div className="bg-[#00E5C3]/5 rounded-2xl rounded-tl-none p-3 border border-[#00E5C3]/10 flex gap-1 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] typing-dot" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] typing-dot" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] typing-dot" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}

                  {simStep >= 2 && (
                    <div className="flex justify-start">
                      <div className="bg-[#00E5C3]/10 rounded-2xl rounded-tl-none p-3.5 max-w-[85%] border border-[#00E5C3]/20 text-sm text-zinc-100 shadow-lg shadow-[#00E5C3]/5">
                        <p className="font-bold text-[#00E5C3] mb-1 flex items-center gap-1.5 text-xs uppercase tracking-widest">
                          <Zap size={10} fill="currentColor" aria-hidden="true" /> SQU AI
                        </p>
                        <span dangerouslySetInnerHTML={{ __html: t.aiResponse }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5C3] animate-blink-fast" aria-hidden="true"></span>
                    <span className="text-xs font-bold text-[#00E5C3] uppercase tracking-widest">{t.liveDemo}</span>
                  </div>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${simStep === i ? 'bg-[#00E5C3] w-5' : 'bg-white/10 w-3'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* THREE PILLARS — what changes day one */}
        <section id="features" className="py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-12 text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00E5C3] mb-3">{t.changesKicker}</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">{t.changesTitle}</h2>
              <p className="text-zinc-300 text-lg">{t.changesSub}</p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-5">
              {t.pillars.map((p, i) => {
                const cfg = pillarConfig[i];
                const Icon = cfg.icon;
                const isLead = i === 0;
                return (
                  <FadeIn key={i} delay={i * 100}>
                    <div
                      className={`group relative h-full rounded-3xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
                        isLead
                          ? 'bg-[#0F1115] border-2 border-[#00E5C3]/40 ring-1 ring-[#00E5C3]/10'
                          : 'bg-[#0F1115] border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: cfg.tint, color: cfg.color }}
                        aria-hidden="true"
                      >
                        <Icon size={22} strokeWidth={2.2} />
                      </div>

                      <span
                        className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block"
                        style={{ color: cfg.color }}
                      >
                        {p.tag}
                      </span>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight leading-snug">
                        {p.headline}
                      </h3>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-20 px-6 relative overflow-hidden border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="mb-14 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00E5C3] mb-3">{t.howKicker}</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">{t.howTitle}</h2>
              <p className="text-zinc-300 text-lg max-w-2xl mx-auto">{t.howSub}</p>
            </FadeIn>

            <div className="relative">
              <div className="hidden md:block absolute top-[28px] left-[calc(16.66%+7px)] right-[calc(16.66%+7px)] h-px bg-gradient-to-r from-[#00E5C3]/30 via-[#F5A623]/30 to-purple-500/30" aria-hidden="true" />
              <div className="md:hidden absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-[#00E5C3]/30 via-[#F5A623]/30 to-purple-500/30" aria-hidden="true" />

              <ol className="grid grid-cols-1 md:grid-cols-3 gap-0 list-none">
                {[
                  { color: "#00E5C3", icon: QrCode },
                  { color: "#F5A623", icon: MessageSquareText },
                  { color: "#A78BFA", icon: BarChart2 }
                ].map((cfg, i) => {
                  const step = t.howSteps[i];
                  const Icon = cfg.icon;
                  return (
                    <FadeIn key={i} delay={i * 150}>
                      <li className="relative flex md:flex-col items-start gap-5 md:gap-0 md:items-center md:text-center py-6 md:py-0 md:px-6">
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#0A0C10]"
                            style={{ borderColor: cfg.color }}
                            aria-hidden="true"
                          >
                            <Icon size={18} style={{ color: cfg.color }} />
                          </div>
                        </div>
                        <div className="md:mt-8">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: cfg.color }}>
                            {step.number}
                          </span>
                          <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs md:mx-auto">{step.desc}</p>
                        </div>
                      </li>
                    </FadeIn>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* WEEKLY INTEL REPORT */}
        <section id="demo" className="py-24 px-6 bg-[#0A0C10] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-14 text-center max-w-3xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F5A623] mb-3">{t.intelKicker}</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">{t.intelTitle}</h2>
              <p className="text-zinc-300 text-lg">{t.intelSubtitle}</p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              <div className="flex flex-col">
                <div className="glass-card p-6 rounded-2xl mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10" aria-hidden="true">
                      <Volume2 className="text-zinc-300" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{t.productName}</h3>
                      <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">{t.productTracking}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 pl-4 border-l-2 border-white/10 flex-grow">
                  {t.feedbackItems.map((item, idx) => (
                    <FadeIn key={idx} delay={idx * 120} className="relative">
                      <div className="absolute -left-[25px] top-4 w-4 h-4 rounded-full border-2 border-[#F5A623] bg-[#0A0C10]" aria-hidden="true" />
                      <div className="glass-card p-5 rounded-2xl hover:border-[#F5A623]/30 transition-colors">
                        <span className={`text-xs uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${feedbackColors[idx]} mb-2 inline-block`}>
                          {item.type}
                        </span>
                        <p className="text-base md:text-lg font-medium text-zinc-200 italic">{item.tag}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>

              <FadeIn delay={300} className="w-full h-full flex">
                <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl w-full flex flex-col bg-gradient-to-br from-[#1A1D24] to-[#0A0C10] relative overflow-hidden">
                  <span
                    className="absolute -bottom-10 -right-10 text-[10rem] md:text-[12rem] font-black text-white/[0.02] pointer-events-none uppercase italic"
                    aria-hidden="true"
                  >
                    INTEL
                  </span>

                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#00E5C3]/20 flex items-center justify-center" aria-hidden="true">
                        <Zap className="text-[#00E5C3]" size={20} fill="currentColor" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-white">{t.weeklyReport}</h3>
                        <p className="text-xs text-zinc-400 font-medium">{t.weeklyReportSub}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">
                      {t.activeSentiment}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#1A1D24] p-4 rounded-2xl border border-white/10">
                      <p className="text-xs uppercase font-bold text-zinc-400 tracking-widest mb-1">{t.totalScans}</p>
                      <p className="text-2xl font-black text-white">124</p>
                      <p className="text-xs text-emerald-300 font-bold">{t.vsLastWeek}</p>
                    </div>
                    <div className="bg-[#1A1D24] p-4 rounded-2xl border border-white/10">
                      <p className="text-xs uppercase font-bold text-zinc-400 tracking-widest mb-1">{t.activeChats}</p>
                      <p className="text-2xl font-black text-white">42</p>
                      <p className="text-xs text-emerald-300 font-bold">{t.conversion}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#00E5C3]/30 transition-colors">
                      <div className="flex items-center gap-2 mb-3 text-[#00E5C3] font-bold text-xs uppercase tracking-widest">
                        <AlertCircle size={14} aria-hidden="true" /> {t.corePain}
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.corePainText }} />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#F5A623]/30 transition-colors">
                      <div className="flex items-center gap-2 mb-3 text-[#F5A623] font-bold text-xs uppercase tracking-widest">
                        <TrendingUp size={14} aria-hidden="true" /> {t.marketingOpp}
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.marketingOppText }} />
                    </div>

                    <div className="bg-[#F5A623]/5 border border-[#F5A623]/30 rounded-2xl p-5 hover:bg-[#F5A623]/10 transition-colors relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-3 text-[#F5A623] font-bold text-xs uppercase tracking-widest relative z-10">
                        <Wrench size={14} aria-hidden="true" /> {t.engNote}
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: t.engNoteText }} />
                      <div className="absolute top-0 right-0 p-2 opacity-10" aria-hidden="true">
                        <Settings className="text-[#F5A623]" size={40} style={{ animation: 'spin 8s linear infinite' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="mt-12 text-center">
              <button
                onClick={openCalendly}
                className={`inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#00E5C3] text-black font-black text-sm uppercase tracking-widest hover:bg-[#00cba0] transition glow-primary ${focusRing}`}
              >
                {t.heroPrimaryCTA}
                <ArrowRight size={16} />
              </button>
            </FadeIn>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-4 bg-[#0A0C10] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-14 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00E5C3] mb-3">{t.pricingKicker}</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">{t.pricingTitle}</h2>
              <p className="text-zinc-300 text-lg max-w-2xl mx-auto">{t.pricingSub}</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {pricingConfig.map((p, i) => {
                const planT = t.plans[i];
                const isEnterprise = p.price === "Custom";
                const ctaLabel = isEnterprise ? t.contactSales : t.bookCallCTA;

                return (
                  <FadeIn key={i} delay={i * 80} className="group h-full">
                    <div
                      className={`relative h-full flex flex-col bg-[#1A1D24] rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
                        p.active
                          ? 'border-2 border-[#00E5C3]/50 ring-2 ring-[#00E5C3]/10 glow-pro'
                          : 'border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {p.active && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-[#00E5C3] text-black text-xs font-black uppercase tracking-widest whitespace-nowrap">
                          {t.mostPopular}
                        </div>
                      )}

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-6">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${p.col}`} aria-hidden="true" />
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">{p.sub}</span>
                        </div>

                        <div className="mb-5">
                          <h3 className="text-xl font-bold text-white mb-2">{planT.plan}</h3>
                          <div className={`text-5xl font-black tracking-tight bg-gradient-to-br ${p.col} bg-clip-text text-transparent`}>
                            {p.price}
                          </div>
                          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-2">
                            {p.price === "Custom" ? t.tailored : t.perMonth}
                          </p>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed italic mb-6 min-h-[3rem]">
                          {planT.roi}
                        </p>

                        <div className="h-px w-full bg-white/10 mb-6" />

                        <ul className="space-y-3.5 flex-grow mb-8 list-none">
                          {planT.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check size={14} className="text-[#00E5C3] mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span className="text-sm font-medium text-zinc-300 leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={openCalendly}
                          className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition ${focusRing} ${
                            p.active
                              ? 'bg-[#00E5C3] text-black hover:bg-[#00cba0]'
                              : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {ctaLabel}
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAITLIST (secondary path) */}
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3">{t.waitlistKicker}</p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-3">{t.waitlistTitle}</h2>
              <p className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto mb-8">{t.waitlistSub}</p>

              {!waitlistSubmitted ? (
                <form
                  id="waitlist-form"
                  onSubmit={handleWaitlistSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.waitlistPlaceholder}
                      className={`w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-zinc-500 font-medium ${focusRing}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition whitespace-nowrap border border-white/10 ${focusRing}`}
                  >
                    {t.waitlistCTA}
                  </button>
                </form>
              ) : (
                <div
                  role="status"
                  aria-live="polite"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#00E5C3]/10 border border-[#00E5C3]/30 text-[#00E5C3] font-medium"
                >
                  <Check size={16} aria-hidden="true" /> {t.waitlistSuccess}
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* CONTACT */}
        <section className="py-24 px-4 md:px-6 relative overflow-hidden bg-[#0A0C10] border-t border-white/5" id="contact">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#00E5C3]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-16 border border-white/10">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold uppercase tracking-widest mb-6">
                      <Zap size={14} fill="currentColor" aria-hidden="true" /> {t.inviteOnly}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">{t.contactTitle}</h2>
                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed">{t.contactSub}</p>
                  </div>

                  <div className="relative">
                    <div className="relative bg-[#1A1D24] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden">
                      <div className="flex items-center gap-4 md:gap-5 mb-8">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#00E5C3] to-blue-600 p-[2px]" aria-hidden="true">
                          <div className="w-full h-full bg-[#0A0C10] rounded-full flex items-center justify-center">
                            <span className="text-xl md:text-2xl font-black text-white tracking-tight">KL</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Kevin Larretche</h3>
                          <p className="text-[#00E5C3] font-medium text-sm">{t.founderTitle}</p>
                        </div>
                      </div>

                      <button
                        onClick={openCalendly}
                        className={`w-full flex items-center justify-between bg-[#00E5C3] hover:bg-[#00cba0] text-black p-4 rounded-2xl transition glow-primary ${focusRing}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center" aria-hidden="true">
                            <Calendar size={18} className="text-black" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-black uppercase tracking-widest mb-0.5">{t.bookMeeting}</p>
                            <p className="text-sm font-medium">{t.bookIntro}</p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="flex-shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <SquLogo height={32} />
          <p className="text-zinc-400 text-sm font-medium italic text-center">{t.footerQuote}</p>
          <p className="text-zinc-400 text-xs font-medium">{t.footerRights}</p>
        </div>
      </footer>
    </div>
  );
}