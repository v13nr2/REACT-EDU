import { useState, useEffect, useRef } from "react";

// ─── DESIGN SYSTEM ──────────────────────────────────────────────────────────
const DS = {
  colors: {
    primary: "#0052D4",
    primaryDark: "#003A9E",
    primaryLight: "#EEF3FF",
    secondary: "#00D4B1",
    secondaryDark: "#009E85",
    secondaryLight: "#E0FAF7",
    accent: "#FFD60A",
    accentDark: "#E6BE00",
    bg: "#F8FAFC",
    white: "#FFFFFF",
    text: "#1E293B",
    textMuted: "#64748B",
    textLight: "#94A3B8",
    border: "#E2E8F0",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    
    /* FIX WHITE SPACE */
    html, body {
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }
    *, *::before, *::after { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
    }
    #root {
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
    }
    
    :root {
      --primary: #0052D4;
      --primary-dark: #003A9E;
      --primary-light: #EEF3FF;
      --secondary: #00D4B1;
      --secondary-dark: #009E85;
      --secondary-light: #E0FAF7;
      --accent: #FFD60A;
      --bg: #F8FAFC;
      --white: #FFFFFF;
      --text: #1E293B;
      --text-muted: #64748B;
      --text-light: #94A3B8;
      --border: #E2E8F0;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 16px rgba(0,82,212,0.1), 0 2px 8px rgba(0,0,0,0.06);
      --shadow-lg: 0 20px 60px rgba(0,82,212,0.15), 0 8px 24px rgba(0,0,0,0.08);
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-xl: 28px;
      --radius-full: 9999px;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--text);
      background: var(--bg);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Prevent horizontal scroll */
    img, svg, video {
      max-width: 100%;
      height: auto;
    }
    
    /* Rest of your existing CSS... */
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    /* ... dll ... */
  `}</style>
);

// ─── LOGO COMPONENT ──────────────────────────────────────────────────────────
const Logo = ({ size = 36, showText = true, white = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 40 40">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052D4" />
          <stop offset="100%" stopColor="#00D4B1" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4B1" />
          <stop offset="100%" stopColor="#0052D4" />
        </linearGradient>
      </defs>
      {/* Infinity + integral symbol */}
      <circle cx="20" cy="20" r="19" fill="url(#logoGrad)" />
      {/* ∞ symbol as path */}
      <path d="M10 20 Q13 14 16 20 Q19 26 22 20 Q25 14 28 20 Q31 26 28 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"/>
      {/* Integral curve */}
      <path d="M17 13 Q14 16 14 20 Q14 24 17 27" stroke="#FFD60A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Gold star */}
      <polygon points="20,7 21,10 24,10 21.5,12 22.5,15 20,13 17.5,15 18.5,12 16,10 19,10" fill="#FFD60A" opacity="0.95" />
    </svg>
    {showText && (
      <div style={{ lineHeight: 1 }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans'",
          fontWeight: 900,
          fontSize: 16,
          letterSpacing: "0.05em",
          color: white ? "white" : "#0052D4",
        }}>EDUMATH</div>
        <div style={{
          fontFamily: "'Space Grotesk'",
          fontWeight: 700,
          fontSize: 9,
          letterSpacing: "0.15em",
          color: white ? "rgba(255,255,255,0.7)" : "#00D4B1",
          marginTop: -1,
        }}>INTL</div>
      </div>
    )}
  </div>
);

// ─── ICON SET ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", style = {} }) => {
  const icons = {
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    book: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    video: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    arrow_right: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    trending_up: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    credit_card: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    message: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    map_pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    play: <><polygon points="5 3 19 12 5 21 5 3"/></>,
    chevron_down: <><polyline points="6 9 12 15 18 9"/></>,
    chevron_right: <><polyline points="9 18 15 12 9 6"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    dollar: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    file_text: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
    brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      {icons[name]}
    </svg>
  );
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const tutors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Cambridge Mathematics PhD",
    avatar: "https://i.pravatar.cc/150?img=47",
    specializations: ["A-Level", "IB AA HL", "University Calculus"],
    rating: 4.98,
    reviews: 312,
    sessions: 1240,
    hourlyRate: 85,
    badge: "Top Rated",
    nationality: "🇬🇧",
    languages: ["English", "Mandarin"],
    bio: "Former Cambridge lecturer with 12+ years experience. Specialist in real analysis and advanced calculus.",
    availability: "Available Today",
    subjects: ["Calculus", "Real Analysis", "Linear Algebra"],
  },
  {
    id: 2,
    name: "Mr. Aditya Sharma",
    title: "IIT Delhi, Olympiad Coach",
    avatar: "https://i.pravatar.cc/150?img=52",
    specializations: ["AMC/AIME", "SEAMO", "SASMO", "SAT Math"],
    rating: 4.96,
    reviews: 445,
    sessions: 1890,
    hourlyRate: 75,
    badge: "Olympiad Expert",
    nationality: "🇮🇳",
    languages: ["English", "Hindi"],
    bio: "National Mathematics Olympiad gold medalist. Coached 50+ students to international competition victories.",
    availability: "Next Slot: Tomorrow 10 AM",
    subjects: ["Competition Math", "Number Theory", "Combinatorics"],
  },
  {
    id: 3,
    name: "Ms. Lena Mueller",
    title: "MSc Applied Mathematics, TU Berlin",
    avatar: "https://i.pravatar.cc/150?img=9",
    specializations: ["IGCSE", "A-Level", "Differential Equations"],
    rating: 4.95,
    reviews: 278,
    sessions: 934,
    hourlyRate: 70,
    badge: "Rising Star",
    nationality: "🇩🇪",
    languages: ["English", "German"],
    bio: "Passionate about making abstract math accessible. Specializes in rigorous IGCSE and A-Level preparation.",
    availability: "Available Today",
    subjects: ["IGCSE Extended", "A-Level Pure", "Statistics"],
  },
  {
    id: 4,
    name: "Prof. James Okafor",
    title: "Oxford Mathematics, DPhil",
    avatar: "https://i.pravatar.cc/150?img=60",
    specializations: ["University Math", "Discrete Mathematics", "IB HL"],
    rating: 5.0,
    reviews: 167,
    sessions: 580,
    hourlyRate: 120,
    badge: "Expert",
    nationality: "🇺🇸",
    languages: ["English"],
    bio: "Oxford-trained mathematician specializing in discrete math, graph theory, and abstract algebra.",
    availability: "Available Now",
    subjects: ["Discrete Math", "Abstract Algebra", "Graph Theory"],
  },
];

const programs = [
  {
    id: "igcse",
    name: "IGCSE Mathematics",
    icon: "book",
    color: "#0052D4",
    gradient: "linear-gradient(135deg, #0052D4, #3B82F6)",
    desc: "Cambridge & Edexcel IGCSE — Core & Extended",
    topics: ["Algebra", "Geometry", "Statistics", "Number", "Trigonometry"],
    levels: ["Year 10", "Year 11"],
    sessions: "10–30 sessions recommended",
    price: "from $65/session",
  },
  {
    id: "alevel",
    name: "A-Level Mathematics",
    icon: "trending_up",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    desc: "Cambridge & Edexcel A-Level — Pure, Mechanics & Statistics",
    topics: ["Pure Math 1–3", "Mechanics", "Statistics", "Further Math"],
    levels: ["AS Level", "A2 Level"],
    sessions: "15–40 sessions recommended",
    price: "from $70/session",
  },
  {
    id: "ib",
    name: "IB Mathematics",
    icon: "globe",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669, #34D399)",
    desc: "IB AA & AI — SL and HL level",
    topics: ["AA SL/HL", "AI SL/HL", "IA Support", "Mock Exams"],
    levels: ["SL", "HL"],
    sessions: "20–50 sessions recommended",
    price: "from $75/session",
  },
  {
    id: "olympiad",
    name: "Math Olympiad",
    icon: "trophy",
    color: "#D97706",
    gradient: "linear-gradient(135deg, #D97706, #FBBF24)",
    desc: "SEAMO, SASMO, SMO, AMO, AIMO, WMI, AMC/AIME",
    topics: ["Number Theory", "Combinatorics", "Geometry", "Algebra"],
    levels: ["Junior", "Senior"],
    sessions: "20–60 sessions recommended",
    price: "from $75/session",
  },
  {
    id: "sat",
    name: "SAT Math",
    icon: "award",
    color: "#DC2626",
    gradient: "linear-gradient(135deg, #DC2626, #F87171)",
    desc: "SAT Math — Digital SAT + Classic",
    topics: ["Algebra", "Advanced Math", "Problem Solving", "Data Analysis"],
    levels: ["800 Target", "700+ Target"],
    sessions: "10–25 sessions recommended",
    price: "from $80/session",
  },
  {
    id: "university",
    name: "University Mathematics",
    icon: "brain",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2, #22D3EE)",
    desc: "Calculus, Diff. Equations, Discrete Math",
    topics: ["Calculus I–III", "ODE/PDE", "Discrete Math", "Linear Algebra"],
    levels: ["Undergraduate", "Graduate"],
    sessions: "Flexible — ongoing support",
    price: "from $85/session",
  },
];

const testimonials = [
  {
    name: "Mei Lin Tan",
    country: "🇸🇬 Singapore",
    avatar: "https://i.pravatar.cc/150?img=5",
    program: "IB AA HL",
    quote: "Went from predicted 4 to achieving a 7 in IB Math AA HL. Dr. Sarah's teaching method made abstract concepts click. Worth every session!",
    score: "IB 7/7",
    rating: 5,
  },
  {
    name: "Rahul Krishnan",
    country: "🇮🇳 India",
    avatar: "https://i.pravatar.cc/150?img=11",
    program: "SEAMO / Olympiad",
    quote: "Won SEAMO International Gold with Aditya sir's coaching. His problem-solving frameworks are unlike anything in standard textbooks.",
    score: "SEAMO 🥇 Gold",
    rating: 5,
  },
  {
    name: "Emma Fitzgerald",
    country: "🇬🇧 UK",
    avatar: "https://i.pravatar.cc/150?img=23",
    program: "A-Level Further Math",
    quote: "Lena helped me master Further Math in time for Cambridge entrance. Booking was so easy and sessions were always on time.",
    score: "A* Achieved",
    rating: 5,
  },
  {
    name: "Carlos Mendez",
    country: "🇲🇽 Mexico",
    avatar: "https://i.pravatar.cc/150?img=33",
    program: "SAT Math",
    quote: "Scored 800 on SAT Math! The structured booking flow and weekly progress reports made the whole experience seamless.",
    score: "SAT 800/800",
    rating: 5,
  },
];

const pricingPlans = [
  {
    id: "trial",
    name: "Free Trial",
    price: 0,
    sessions: 1,
    desc: "Try before you commit",
    features: ["1 Free Trial Session (45 min)", "Tutor matching quiz", "Learning needs assessment", "No credit card required"],
    cta: "Book Free Trial",
    highlight: false,
    badge: null,
  },
  {
    id: "starter",
    name: "Starter Pack",
    price: 65,
    sessions: 5,
    originalPrice: 75,
    save: "Save $50",
    desc: "Perfect for exam revision",
    features: ["5 × 60-min sessions", "Session recordings", "Homework & resources", "Progress report", "WhatsApp support"],
    cta: "Get Started",
    highlight: false,
    badge: null,
  },
  {
    id: "popular",
    name: "Value Pack",
    price: 60,
    sessions: 10,
    originalPrice: 75,
    save: "Save $150",
    desc: "Most popular choice",
    features: ["10 × 60-min sessions", "Session recordings", "Curated resource library", "Bi-weekly progress reports", "Priority booking", "WhatsApp + Chat support"],
    cta: "Most Popular",
    highlight: true,
    badge: "Best Value",
  },
  {
    id: "intensive",
    name: "Intensive Pack",
    price: 55,
    sessions: 20,
    originalPrice: 75,
    save: "Save $400",
    desc: "Full exam preparation",
    features: ["20 × 60-min sessions", "Session recordings", "Full resource library", "Weekly progress + parent report", "Priority tutor access", "Mock exam with marking", "Dedicated account manager"],
    cta: "Go Intensive",
    highlight: false,
    badge: null,
  },
];

const stats = [
  { value: "2,400+", label: "Students Worldwide", icon: "users" },
  { value: "98%", label: "Grade Improvement Rate", icon: "trending_up" },
  { value: "45+", label: "Expert Tutors", icon: "award" },
  { value: "28", label: "Countries Served", icon: "globe" },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const NavBar = ({ onNavigate, currentPage, isLoggedIn, onLogin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Programs", page: "courses" },
    { label: "Competitions", page: "competition" },
    { label: "Tutors", page: "tutors" },
    { label: "Pricing", page: "pricing" },
    { label: "About", page: "about" },
  ];

  return (
    <>
      <nav style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", height: 72, gap: 32 }}>
          {/* Logo */}
          <div style={{ cursor: "pointer" }} onClick={() => onNavigate("home")}>
            <Logo size={36} />
          </div>

          {/* Nav links */}
          <div className="hide-mobile" style={{ display: "flex", gap: 4, flex: 1, justifyContent: "center" }}>
            {navLinks.map(link => (
              <button key={link.page} onClick={() => onNavigate(link.page)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: currentPage === link.page ? "var(--primary-light)" : "transparent",
                  color: currentPage === link.page ? "var(--primary)" : "var(--text-muted)",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'Plus Jakarta Sans'",
                }}>
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isLoggedIn ? (
              <button className="btn btn-primary" onClick={() => onNavigate("dashboard")} style={{ padding: "10px 20px", fontSize: 14 }}>
                Dashboard
              </button>
            ) : (
              <>
                <button className="btn btn-outline" onClick={onLogin} style={{ padding: "10px 20px", fontSize: 14 }}>
                  Sign In
                </button>
                <button className="btn btn-primary" onClick={() => onNavigate("booking")} style={{ padding: "10px 20px", fontSize: 14 }}>
                  Book Free Trial ✨
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="show-mobile" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", marginLeft: "auto" }}>
            <Icon name={mobileOpen ? "x" : "menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ background: "white", padding: "16px 24px 24px", borderTop: "1px solid var(--border)" }}>
            {navLinks.map(link => (
              <button key={link.page} onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", border: "none", background: "none", color: "var(--text)", fontSize: 15, fontWeight: 600, cursor: "pointer", borderBottom: "1px solid var(--border)", fontFamily: "'Plus Jakarta Sans'" }}>
                {link.label}
              </button>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button className="btn btn-outline" onClick={onLogin} style={{ flex: 1, justifyContent: "center", padding: "12px" }}>Sign In</button>
              <button className="btn btn-primary" onClick={() => { onNavigate("booking"); setMobileOpen(false); }} style={{ flex: 1, justifyContent: "center", padding: "12px" }}>Book Trial</button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
const HomePage = ({ onNavigate }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [countStarted, setCountStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCountStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        minHeight: "calc(100vh - 72px)",
        background: "linear-gradient(135deg, #0052D4 0%, #003A9E 40%, #001F6B 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Background elements */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {/* Gradient orbs */}
          <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(0,212,177,0.15) 0%, transparent 70%)", borderRadius: "50%", animation: "float 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(255,214,10,0.1) 0%, transparent 70%)", borderRadius: "50%", animation: "float 8s ease-in-out infinite reverse" }} />
          {/* Math symbols floating */}
          {["∫", "∑", "π", "∞", "√", "Δ", "∂", "≡"].map((sym, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${8 + (i * 12)}%`,
              top: `${10 + (i % 3) * 25}%`,
              fontSize: `${20 + (i % 3) * 12}px`,
              color: "rgba(255,255,255,0.06)",
              fontWeight: 900,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              fontFamily: "serif",
            }}>{sym}</div>
          ))}
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left: content */}
            <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,214,10,0.15)", border: "1px solid rgba(255,214,10,0.3)", color: "#FFD60A", padding: "8px 16px", borderRadius: "var(--radius-full)", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
                <span>🏆</span>
                <span>#1 International Math Tutoring Platform</span>
              </div>

              <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "white", marginBottom: 20, lineHeight: 1.1 }}>
                Master International Math
                <br />
                <span style={{ color: "#00D4B1" }}>From IGCSE</span> to
                <br />
                <span style={{ background: "linear-gradient(135deg, #FFD60A, #FF9500)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>University Level</span>
              </h1>

              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", marginBottom: 36, lineHeight: 1.7, maxWidth: 480 }}>
                1-on-1 live video sessions with world-class tutors. IGCSE, A-Level, IB, SAT, Olympiad & University Math — all in one platform.
              </p>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                <div style={{ display: "flex" }}>
                  {[47, 52, 9, 60, 5].map((img, i) => (
                    <img key={i} src={`https://i.pravatar.cc/40?img=${img}`} alt="" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)", marginLeft: i > 0 ? -10 : 0 }} />
                  ))}
                </div>
                <div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>⭐ 4.97/5 from 1,200+ reviews</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Trusted by students in 28 countries</div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn btn-accent" onClick={() => onNavigate("booking")} style={{ fontSize: 16, padding: "16px 32px" }}>
                  🎯 Book Free Trial
                </button>
                <button className="btn btn-ghost" onClick={() => onNavigate("tutors")}>
                  <Icon name="play" size={16} /> Meet Our Tutors
                </button>
              </div>

              {/* Guarantees */}
              <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
                {["✓ No contracts", "✓ Cancel anytime", "✓ Money-back guarantee"].map(g => (
                  <span key={g} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>{g}</span>
                ))}
              </div>
            </div>

            {/* Right: Visual card stack */}
            <div className="hide-mobile" style={{ position: "relative", height: 500 }}>
              {/* Main card */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 320, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: 24, animation: "float 5s ease-in-out infinite" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <img src="https://i.pravatar.cc/50?img=47" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #00D4B1" }} alt="" />
                  <div>
                    <div style={{ color: "white", fontWeight: 700 }}>Dr. Sarah Chen</div>
                    <div style={{ color: "#00D4B1", fontSize: 13 }}>Cambridge PhD • IB Specialist</div>
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 6 }}>Next Session In</div>
                  <div style={{ color: "white", fontSize: 24, fontWeight: 800, letterSpacing: "0.05em" }}>2h 34m</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["IB AA HL", "A-Level", "Calculus"].map(tag => (
                    <span key={tag} style={{ padding: "4px 10px", background: "rgba(0,212,177,0.2)", color: "#00D4B1", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Score card */}
              <div style={{ position: "absolute", top: "15%", right: "0%", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16, width: 150, animation: "float 4s ease-in-out infinite 1s" }}>
                <div style={{ color: "#FFD60A", fontSize: 22, marginBottom: 4 }}>🏆</div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 20 }}>IB 7/7</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Mei Lin's result</div>
              </div>

              {/* Booking card */}
              <div style={{ position: "absolute", bottom: "15%", left: "0%", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 16, width: 160, animation: "float 6s ease-in-out infinite 0.5s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, background: "#22C55E", borderRadius: "50%", animation: "pulse-glow 2s infinite" }} />
                  <span style={{ color: "#22C55E", fontSize: 12, fontWeight: 700 }}>Live Session</span>
                </div>
                <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>Rahul K. × Aditya</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Number Theory</div>
              </div>

              {/* Stars */}
              <div style={{ position: "absolute", top: "60%", right: "5%", background: "rgba(255,214,10,0.1)", border: "1px solid rgba(255,214,10,0.2)", borderRadius: 12, padding: "10px 14px", animation: "float 7s ease-in-out infinite 2s" }}>
                <div style={{ color: "#FFD60A", fontSize: 18 }}>★★★★★</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>4.97 avg rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block" }}>
            <path d="M0 80L60 66.7C120 53 240 27 360 26.7C480 27 600 53 720 58.7C840 64 960 48 1080 37.3C1200 27 1320 21 1380 18.7L1440 16V80H0Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: "white", padding: "40px 24px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center", animation: `countUp 0.5s ease forwards ${i * 0.1}s`, opacity: 0 }}>
              <div style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, background: "linear-gradient(135deg, var(--primary), var(--secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: 14, fontWeight: 600, marginTop: 6 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Programs ── */}
      <section style={{ padding: "80px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge badge-primary" style={{ marginBottom: 16, fontSize: 13 }}>📚 Our Programs</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>
              Expert Tuition for Every
              <span className="gradient-text"> Math Journey</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
              From IGCSE foundations to university-level mastery — find your program
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {programs.map((prog, i) => (
              <div key={prog.id} className="card-hover" onClick={() => onNavigate("booking")}
                style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: 28, cursor: "pointer", position: "relative", overflow: "hidden", animation: `fadeUp 0.5s ease forwards ${i * 0.08}s`, opacity: 0 }}>
                {/* Top gradient stripe */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: prog.gradient }} />

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, background: prog.gradient, borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={prog.icon} size={24} color="white" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{prog.price}</span>
                </div>

                <h3 style={{ fontSize: 18, marginBottom: 6 }}>{prog.name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>{prog.desc}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {prog.topics.slice(0, 3).map(t => (
                    <span key={t} className="badge badge-secondary" style={{ fontSize: 11 }}>{t}</span>
                  ))}
                  {prog.topics.length > 3 && <span className="badge" style={{ background: "var(--bg)", color: "var(--text-muted)", fontSize: 11 }}>+{prog.topics.length - 3} more</span>}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>📅 {prog.sessions}</span>
                  <span style={{ color: prog.color, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                    Book Now <Icon name="arrow_right" size={14} color={prog.color} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Tutors ── */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="badge badge-secondary" style={{ marginBottom: 12 }}>⭐ Meet Our Tutors</div>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}>World-Class <span className="gradient-text">Math Specialists</span></h2>
              <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Verified experts from top universities worldwide</p>
            </div>
            <button className="btn btn-outline" onClick={() => onNavigate("tutors")}>
              View All Tutors <Icon name="arrow_right" size={16} color="var(--primary)" />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {tutors.slice(0, 4).map((tutor, i) => (
              <div key={tutor.id} className="card-hover"
                style={{ background: "var(--bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", cursor: "pointer", animation: `fadeUp 0.5s ease forwards ${i * 0.1}s`, opacity: 0 }}
                onClick={() => onNavigate("tutors")}>
                {/* Header with gradient */}
                <div style={{ height: 72, background: "linear-gradient(135deg, var(--primary), var(--secondary))", position: "relative" }} />

                <div style={{ padding: 24, paddingTop: 0, position: "relative" }}>
                  {/* Avatar */}
                  <div style={{ position: "relative", display: "inline-block", marginTop: -32 }}>
                    <img src={tutor.avatar} alt={tutor.name} style={{ width: 64, height: 64, borderRadius: "50%", border: "3px solid white", objectFit: "cover" }} />
                    <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--success)", width: 16, height: 16, borderRadius: "50%", border: "2px solid white" }} />
                  </div>

                  {/* Badge */}
                  <span className="badge badge-accent" style={{ float: "right", marginTop: -48, fontSize: 10 }}>
                    🏅 {tutor.badge}
                  </span>

                  <h4 style={{ fontSize: 16, marginTop: 8, marginBottom: 2 }}>{tutor.name} {tutor.nationality}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 12 }}>{tutor.title}</p>

                  {/* Rating */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span className="stars" style={{ fontSize: 13 }}>★★★★★</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{tutor.rating}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 12 }}>({tutor.reviews})</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: "auto" }}>{tutor.sessions}+ sessions</span>
                  </div>

                  {/* Specializations */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
                    {tutor.specializations.slice(0, 2).map(s => (
                      <span key={s} className="badge badge-primary" style={{ fontSize: 10 }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 18, color: "var(--primary)" }}>${tutor.hourlyRate}<span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>/session</span></div>
                      <div style={{ fontSize: 11, color: "var(--secondary-dark)" }}>● {tutor.availability}</div>
                    </div>
                    <button className="btn btn-primary" onClick={() => onNavigate("booking")} style={{ padding: "8px 16px", fontSize: 13 }}>Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "80px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge badge-accent" style={{ marginBottom: 16 }}>💬 Student Stories</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}>Real Results, <span className="gradient-text">Real Stories</span></h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover"
                style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 28, border: "1px solid var(--border)", position: "relative" }}>
                {/* Quote mark */}
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 48, color: "var(--primary-light)", lineHeight: 1, fontFamily: "serif" }}>"</div>

                <div style={{ marginBottom: 16 }}>
                  <span className="stars" style={{ fontSize: 14 }}>{"★".repeat(t.rating)}</span>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                  "{t.quote}"
                </p>

                {/* Achievement badge */}
                <div style={{ background: "linear-gradient(135deg, #FFD60A20, #FF950020)", border: "1px solid rgba(255,214,10,0.3)", borderRadius: "var(--radius-md)", padding: "8px 14px", marginBottom: 20, display: "inline-block" }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: "#B07D00" }}>🏆 {t.score}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{t.country} · {t.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge badge-primary" style={{ marginBottom: 16 }}>💳 Simple Pricing</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}>Transparent, <span className="gradient-text">No Hidden Fees</span></h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 500, margin: "16px auto 0" }}>Pay via Midtrans (ID) or Stripe (International). All major payment methods accepted.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={plan.highlight ? "" : "card-hover"}
                style={{
                  background: plan.highlight ? "linear-gradient(135deg, #0052D4, #003A9E)" : "white",
                  color: plan.highlight ? "white" : "var(--text)",
                  borderRadius: "var(--radius-lg)",
                  padding: 28,
                  border: plan.highlight ? "none" : "1px solid var(--border)",
                  position: "relative",
                  transform: plan.highlight ? "scale(1.04)" : "none",
                  boxShadow: plan.highlight ? "var(--shadow-lg)" : "var(--shadow-sm)",
                }}>
                {plan.badge && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "var(--text)", padding: "4px 16px", borderRadius: 99, fontSize: 12, fontWeight: 800, whiteSpace: "nowrap" }}>
                    ✨ {plan.badge}
                  </div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: plan.highlight ? "rgba(255,255,255,0.7)" : "var(--text-muted)", marginBottom: 4 }}>{plan.sessions} Session{plan.sessions > 1 ? "s" : ""}</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{plan.name}</div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  {plan.price === 0 ? (
                    <div style={{ fontSize: 40, fontWeight: 900 }}>FREE</div>
                  ) : (
                    <>
                      {plan.save && <div style={{ fontSize: 12, background: "rgba(34,197,94,0.15)", color: plan.highlight ? "#86EFAC" : "#16A34A", display: "inline-block", padding: "2px 8px", borderRadius: 99, fontWeight: 700, marginBottom: 4 }}>{plan.save}</div>}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <span style={{ fontSize: 36, fontWeight: 900 }}>${plan.price}</span>
                        <span style={{ fontSize: 14, opacity: 0.7 }}>/session</span>
                      </div>
                      {plan.originalPrice && <div style={{ fontSize: 13, opacity: 0.5, textDecoration: "line-through" }}>${plan.originalPrice}/session</div>}
                    </>
                  )}
                </div>

                <ul style={{ listStyle: "none", marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, fontSize: 13 }}>
                      <span style={{ color: plan.highlight ? "#00D4B1" : "var(--secondary)", flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ opacity: 0.85 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => onNavigate("booking")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--radius-full)",
                    border: plan.highlight ? "none" : "2px solid var(--primary)",
                    background: plan.highlight ? "rgba(255,255,255,0.15)" : "transparent",
                    color: plan.highlight ? "white" : "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 14,
                    fontFamily: "'Plus Jakarta Sans'",
                    transition: "all 0.2s",
                    backdropFilter: plan.highlight ? "blur(10px)" : "none",
                  }}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, marginTop: 24 }}>
            💳 Accepts: GoPay, OVO, QRIS, Dana, VA Bank, Credit Card, PayPal, Stripe · 🔒 Secured payment
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #0052D4, #003A9E)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Logo size={56} showText={false} />
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "white", margin: "24px 0 16px" }}>
            Start Your Math Journey Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, marginBottom: 40, lineHeight: 1.6 }}>
            First session free. No commitment. World-class tutors ready now.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-accent" onClick={() => onNavigate("booking")} style={{ padding: "16px 36px", fontSize: 16 }}>
              🎯 Book Your Free Trial
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("tutors")}>
              Browse Tutors →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0F172A", color: "rgba(255,255,255,0.6)", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <Logo size={36} white />
              <p style={{ marginTop: 16, lineHeight: 1.7, maxWidth: 300, fontSize: 14 }}>
                The world's leading platform for international mathematics tutoring. From IGCSE to university level.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["💬 WhatsApp", "📧 Email", "📱 Instagram"].map(c => (
                  <button key={c} style={{ padding: "6px 12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "'Plus Jakarta Sans'" }}>{c}</button>
                ))}
              </div>
            </div>
            {[
              { title: "Programs", links: ["IGCSE Math", "A-Level", "IB AA/AI", "SAT Math", "Olympiad", "University Math"] },
              { title: "Platform", links: ["Browse Tutors", "Pricing", "Book a Trial", "Student Dashboard", "Resources"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Contact", "Privacy Policy", "Terms"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: "white", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13 }}>© 2025 Edumath International. All rights reserved.</span>
            <span style={{ fontSize: 13 }}>🌍 English · 🇮🇩 Indonesia · 🇸🇬 Singapore</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ─── TUTOR DIRECTORY ─────────────────────────────────────────────────────────
const TutorDirectory = ({ onNavigate }) => {
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState("all");
  const [filterAvail, setFilterAvail] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedTutor, setSelectedTutor] = useState(null);

  const specs = ["all", "IGCSE", "A-Level", "IB", "Olympiad", "SAT Math", "University"];

  const filtered = tutors.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesSpec = filterSpec === "all" || t.specializations.some(s => s.toLowerCase().includes(filterSpec.toLowerCase()));
    return matchesSearch && matchesSpec;
  });

  if (selectedTutor) {
    const tutor = tutors.find(t => t.id === selectedTutor);
    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        <button onClick={() => setSelectedTutor(null)} style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontFamily: "'Plus Jakarta Sans'", fontSize: 14 }}>
          ← Back to Tutors
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>
          {/* Tutor Profile Card */}
          <div>
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              <div style={{ height: 120, background: "linear-gradient(135deg, var(--primary), var(--secondary))" }} />
              <div style={{ padding: 28, paddingTop: 0 }}>
                <img src={tutor.avatar} alt={tutor.name} style={{ width: 88, height: 88, borderRadius: "50%", border: "4px solid white", objectFit: "cover", marginTop: -44, display: "block" }} />
                <span className="badge badge-accent" style={{ marginTop: 8, marginBottom: 4 }}>🏅 {tutor.badge}</span>
                <h2 style={{ fontSize: 22, marginBottom: 4 }}>{tutor.name} {tutor.nationality}</h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16 }}>{tutor.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span className="stars">★★★★★</span>
                  <strong>{tutor.rating}</strong>
                  <span style={{ color: "var(--text-muted)", fontSize: 13 }}>({tutor.reviews} reviews)</span>
                </div>
                <div style={{ background: "var(--bg)", borderRadius: "var(--radius-md)", padding: 16, marginBottom: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "center" }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 22, color: "var(--primary)" }}>{tutor.sessions}+</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Sessions Taught</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 22, color: "var(--secondary-dark)" }}>{tutor.reviews}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Student Reviews</div>
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 28, color: "var(--primary)", marginBottom: 4 }}>${tutor.hourlyRate}<span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>/session</span></div>
                <div style={{ color: "var(--secondary-dark)", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>● {tutor.availability}</div>
                <button className="btn btn-primary" onClick={() => onNavigate("booking")} style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 15 }}>Book a Session</button>
                <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 14, marginTop: 10 }}>
                  <Icon name="message" size={16} color="var(--primary)" /> Message
                </button>
              </div>
            </div>
          </div>

          {/* Tutor Details */}
          <div>
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", padding: 32, marginBottom: 24, boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ marginBottom: 16, fontSize: 18 }}>About {tutor.name.split(" ")[1]}</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{tutor.bio}</p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginTop: 12 }}>
                Passionate about building mathematical intuition and problem-solving skills. My sessions combine rigorous concept coverage with exam technique, ensuring students not only understand but excel in their assessments.
              </p>
            </div>
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", padding: 32, marginBottom: 24, boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ marginBottom: 20, fontSize: 18 }}>Subjects & Specializations</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[...tutor.specializations, ...tutor.subjects].map(s => (
                  <span key={s} className="badge badge-primary" style={{ padding: "6px 14px", fontSize: 13 }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", padding: 32, boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ marginBottom: 20, fontSize: 18 }}>Student Reviews</h3>
              {testimonials.slice(0, 2).map((t, i) => (
                <div key={i} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: i === 0 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    <img src={t.avatar} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} alt="" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{t.country} · {t.program}</div>
                    </div>
                    <span className="stars" style={{ marginLeft: "auto", fontSize: 13 }}>★★★★★</span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, fontStyle: "italic" }}>"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "white", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>Find Your Perfect Tutor</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, marginBottom: 32 }}>Browse {tutors.length} verified math specialists from top universities worldwide</p>
          {/* Search */}
          <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
            <Icon name="search" size={18} color="var(--text-muted)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
            <input className="input" placeholder="Search by name, program, or topic..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 48, fontSize: 15 }} />
          </div>
        </div>
      </div>

      {/* Filters & Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-muted)" }}>
            <Icon name="filter" size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            Filter:
          </span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {specs.map(s => (
              <button key={s} onClick={() => setFilterSpec(s)}
                style={{
                  padding: "6px 14px",
                  border: "2px solid",
                  borderColor: filterSpec === s ? "var(--primary)" : "var(--border)",
                  background: filterSpec === s ? "var(--primary)" : "white",
                  color: filterSpec === s ? "white" : "var(--text-muted)",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  transition: "all 0.2s",
                }}>
                {s === "all" ? "All Programs" : s}
              </button>
            ))}
          </div>
          <select className="select" value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ width: "auto", marginLeft: "auto" }}>
            <option value="rating">Sort: Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="sessions">Most Sessions</option>
          </select>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
          Showing {filtered.length} tutors
        </p>

        {/* Tutor Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {filtered.map((tutor, i) => (
            <div key={tutor.id} className="card-hover"
              style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", cursor: "pointer", animation: `fadeUp 0.4s ease forwards ${i * 0.08}s`, opacity: 0 }}>
              {/* Header */}
              <div style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", padding: "24px 24px 48px", position: "relative" }}>
                <span className="badge badge-accent" style={{ fontSize: 10, float: "right" }}>🏅 {tutor.badge}</span>
                <img src={tutor.avatar} alt={tutor.name}
                  style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.5)", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "0 24px 24px", marginTop: -24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: 17, marginBottom: 2 }}>{tutor.name} {tutor.nationality}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 12 }}>{tutor.title}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 900, fontSize: 20, color: "var(--primary)" }}>${tutor.hourlyRate}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>per session</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0" }}>
                  <span className="stars" style={{ fontSize: 12 }}>★★★★★</span>
                  <strong style={{ fontSize: 13 }}>{tutor.rating}</strong>
                  <span style={{ color: "var(--text-muted)", fontSize: 12 }}>· {tutor.reviews} reviews · {tutor.sessions} sessions</span>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                  {tutor.bio.substring(0, 80)}...
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {tutor.specializations.map(s => (
                    <span key={s} className="badge badge-primary" style={{ fontSize: 10 }}>{s}</span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary" onClick={() => onNavigate("booking")}
                    style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 13 }}>Book</button>
                  <button className="btn btn-outline" onClick={() => setSelectedTutor(tutor.id)}
                    style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 13 }}>View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── BOOKING FLOW ─────────────────────────────────────────────────────────────
const BookingFlow = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    program: null,
    topic: null,
    tutor: null,
    date: null,
    time: null,
    notes: "",
    paymentMethod: "midtrans",
    plan: null,
  });

  const totalSteps = 5;
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "07:00 PM", "08:00 PM"];
  const days = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25", "Sun 26"];

  const topicsByProgram = {
    igcse: ["Numbers & Algebra", "Geometry & Measurement", "Statistics & Probability", "Functions & Graphs", "Trigonometry"],
    alevel: ["Pure Math 1", "Pure Math 2", "Pure Math 3", "Mechanics", "Statistics"],
    ib: ["IB AA SL", "IB AA HL", "IB AI SL", "IB AI HL", "IA Internal Assessment Support"],
    olympiad: ["Number Theory", "Combinatorics", "Geometry", "Algebra", "Inequalities"],
    sat: ["Heart of Algebra", "Problem Solving", "Passport to Advanced Math", "Additional Topics"],
    university: ["Calculus I/II/III", "Ordinary Differential Equations", "Linear Algebra", "Discrete Math", "Abstract Algebra"],
  };

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 40 }}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div onClick={() => i + 1 < step && setStep(i + 1)}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: i + 1 < step ? "var(--secondary)" : i + 1 === step ? "var(--primary)" : "var(--border)",
              color: i + 1 <= step ? "white" : "var(--text-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 14,
              cursor: i + 1 < step ? "pointer" : "default",
              transition: "all 0.3s",
              boxShadow: i + 1 === step ? "0 0 0 4px rgba(0,82,212,0.2)" : "none",
            }}>
            {i + 1 < step ? "✓" : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div style={{ width: 40, height: 2, background: i + 1 < step ? "var(--secondary)" : "var(--border)", transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );

  const stepLabels = ["Program", "Topic", "Tutor", "Schedule", "Review & Pay"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14, fontFamily: "'Plus Jakarta Sans'", marginBottom: 16, display: "flex", alignItems: "center", gap: 6, margin: "0 auto 16px" }}>
            ← Back to Home
          </button>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: 8 }}>
            {step < 5 ? "Book Your Session" : "Review & Confirm Booking"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
            Step {step} of {totalSteps}: <strong>{stepLabels[step - 1]}</strong>
          </p>
        </div>

        <StepIndicator />

        {/* Step Content */}
        <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "clamp(24px, 4vw, 40px)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)", minHeight: 400 }}>
          {/* STEP 1: Choose Program */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Choose Your Program</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>Which mathematics curriculum are you following?</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {programs.map(prog => (
                  <div key={prog.id} onClick={() => setBookingData(d => ({ ...d, program: prog.id, topic: null }))}
                    style={{
                      padding: 20,
                      borderRadius: "var(--radius-lg)",
                      border: `2px solid ${bookingData.program === prog.id ? "var(--primary)" : "var(--border)"}`,
                      background: bookingData.program === prog.id ? "var(--primary-light)" : "var(--bg)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                      boxShadow: bookingData.program === prog.id ? "0 0 0 3px rgba(0,82,212,0.15)" : "none",
                    }}>
                    {bookingData.program === prog.id && (
                      <div style={{ position: "absolute", top: 12, right: 12, width: 22, height: 22, background: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12 }}>✓</div>
                    )}
                    <div style={{ width: 44, height: 44, background: prog.gradient, borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <Icon name={prog.icon} size={20} color="white" />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{prog.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{prog.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Choose Topic */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Select Topic</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>What specific area would you like to focus on?</p>
              {bookingData.program && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {topicsByProgram[bookingData.program]?.map(topic => (
                    <div key={topic} onClick={() => setBookingData(d => ({ ...d, topic }))}
                      style={{
                        padding: "16px 20px",
                        border: `2px solid ${bookingData.topic === topic ? "var(--primary)" : "var(--border)"}`,
                        background: bookingData.topic === topic ? "var(--primary-light)" : "white",
                        borderRadius: "var(--radius-md)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, background: bookingData.topic === topic ? "var(--primary)" : "var(--bg)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                          <Icon name="book" size={14} color={bookingData.topic === topic ? "white" : "var(--text-muted)"} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 15 }}>{topic}</span>
                      </div>
                      {bookingData.topic === topic && <Icon name="check" size={18} color="var(--primary)" />}
                    </div>
                  ))}

                  <div style={{ marginTop: 16 }}>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Additional notes for your tutor (optional)</label>
                    <textarea className="input" rows={3} placeholder="e.g. I'm struggling with integration by parts and need help with past paper questions..."
                      value={bookingData.notes} onChange={e => setBookingData(d => ({ ...d, notes: e.target.value }))}
                      style={{ resize: "vertical" }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Choose Tutor */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Choose Your Tutor</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Matched to your program. All tutors are verified experts.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {tutors.map(tutor => (
                  <div key={tutor.id} onClick={() => setBookingData(d => ({ ...d, tutor: tutor.id }))}
                    style={{
                      padding: 20,
                      border: `2px solid ${bookingData.tutor === tutor.id ? "var(--primary)" : "var(--border)"}`,
                      background: bookingData.tutor === tutor.id ? "var(--primary-light)" : "white",
                      borderRadius: "var(--radius-lg)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                    }}>
                    <img src={tutor.avatar} alt={tutor.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{tutor.name} {tutor.nationality}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>{tutor.title}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 800, color: "var(--primary)", fontSize: 18 }}>${tutor.hourlyRate}</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>per session</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span className="stars" style={{ fontSize: 12 }}>★★★★★</span>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{tutor.rating}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>({tutor.reviews} reviews)</span>
                        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--secondary-dark)", fontWeight: 700 }}>● {tutor.availability}</span>
                      </div>
                    </div>
                    {bookingData.tutor === tutor.id && (
                      <div style={{ width: 28, height: 28, background: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, flexShrink: 0 }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Schedule */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Pick Your Schedule</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>All times shown in your local timezone (WIB / GMT+7)</p>
              {/* Date picker */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 12 }}>📅 Select Date</label>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
                  {days.map(day => (
                    <div key={day} onClick={() => setBookingData(d => ({ ...d, date: day }))}
                      style={{
                        minWidth: 72,
                        padding: "12px 8px",
                        textAlign: "center",
                        borderRadius: "var(--radius-md)",
                        border: `2px solid ${bookingData.date === day ? "var(--primary)" : "var(--border)"}`,
                        background: bookingData.date === day ? "var(--primary)" : "white",
                        color: bookingData.date === day ? "white" : "var(--text)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}>
                      <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>{day.split(" ")[0]}</div>
                      <div style={{ fontSize: 20, fontWeight: 900 }}>{day.split(" ")[1]}</div>
                      <div style={{ fontSize: 10, opacity: 0.6 }}>Jan</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Time slots */}
              <div>
                <label style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 12 }}>🕐 Available Times</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
                  {timeSlots.map((time, i) => (
                    <div key={time} onClick={() => i !== 2 && i !== 5 && setBookingData(d => ({ ...d, time }))}
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        borderRadius: "var(--radius-md)",
                        border: `2px solid ${bookingData.time === time ? "var(--primary)" : (i === 2 || i === 5) ? "var(--border)" : "var(--border)"}`,
                        background: bookingData.time === time ? "var(--primary)" : (i === 2 || i === 5) ? "#f9fafb" : "white",
                        color: bookingData.time === time ? "white" : (i === 2 || i === 5) ? "var(--text-light)" : "var(--text)",
                        cursor: (i === 2 || i === 5) ? "not-allowed" : "pointer",
                        transition: "all 0.2s",
                        opacity: (i === 2 || i === 5) ? 0.5 : 1,
                      }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{time}</div>
                      <div style={{ fontSize: 10, marginTop: 4 }}>{(i === 2 || i === 5) ? "Booked" : "60 min"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Pay */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Review & Confirm</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Order Summary */}
                <div>
                  <div style={{ background: "var(--bg)", borderRadius: "var(--radius-lg)", padding: 24, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, marginBottom: 16, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Booking Summary</h3>
                    {[
                      { label: "Program", value: programs.find(p => p.id === bookingData.program)?.name || "IB Mathematics" },
                      { label: "Topic", value: bookingData.topic || "IB AA HL" },
                      { label: "Tutor", value: tutors.find(t => t.id === bookingData.tutor)?.name || "Dr. Sarah Chen" },
                      { label: "Date & Time", value: `${bookingData.date || "Mon 20"} · ${bookingData.time || "09:00 AM"}` },
                      { label: "Duration", value: "60 minutes" },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14 }}>
                        <span style={{ color: "var(--text-muted)" }}>{item.label}</span>
                        <span style={{ fontWeight: 600 }}>{item.value}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700 }}>Total</span>
                      <span style={{ fontWeight: 900, fontSize: 22, color: "var(--primary)" }}>FREE</span>
                    </div>
                    <div style={{ textAlign: "right", color: "var(--secondary-dark)", fontSize: 12 }}>🎁 Trial session — no payment required</div>
                  </div>

                  {/* Package upsell */}
                  <div style={{ background: "linear-gradient(135deg, var(--primary-light), var(--secondary-light))", borderRadius: "var(--radius-md)", padding: 16, border: "1px solid rgba(0,82,212,0.15)" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", marginBottom: 8 }}>💡 After your trial, save with a package:</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>10-session pack → $60/session (Save $150)</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Unlock priority booking + session recordings</div>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 style={{ fontSize: 15, marginBottom: 16, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Details</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                    <input className="input" placeholder="Full Name" />
                    <input className="input" placeholder="Email Address" type="email" />
                    <input className="input" placeholder="WhatsApp Number (for reminders)" />
                    <select className="select">
                      <option>Indonesia 🇮🇩</option>
                      <option>Singapore 🇸🇬</option>
                      <option>Malaysia 🇲🇾</option>
                      <option>United Kingdom 🇬🇧</option>
                      <option>United States 🇺🇸</option>
                    </select>
                  </div>

                  <h3 style={{ fontSize: 15, marginBottom: 16, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Payment Method</h3>
                  <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                    {[
                      { id: "midtrans", label: "🇮🇩 Midtrans (ID)", desc: "GoPay, OVO, QRIS, Bank" },
                      { id: "stripe", label: "🌍 Stripe (Intl)", desc: "Credit Card, PayPal" },
                    ].map(pm => (
                      <div key={pm.id} onClick={() => setBookingData(d => ({ ...d, paymentMethod: pm.id }))}
                        style={{
                          flex: 1,
                          padding: 14,
                          border: `2px solid ${bookingData.paymentMethod === pm.id ? "var(--primary)" : "var(--border)"}`,
                          background: bookingData.paymentMethod === pm.id ? "var(--primary-light)" : "white",
                          borderRadius: "var(--radius-md)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{pm.label}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>{pm.desc}</div>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-primary" onClick={() => setStep(6)}
                    style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: 16 }}>
                    🎯 Confirm Free Trial Booking
                  </button>
                  <div style={{ display: "flex", gap: 12, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    {["🔒 SSL Secured", "✓ Instant Confirmation", "↩ Free Cancellation"].map(g => (
                      <span key={g} style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success */}
          {step === 6 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: 88, height: 88, background: "linear-gradient(135deg, var(--secondary), var(--secondary-dark))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 40, animation: "fadeIn 0.5s ease" }}>
                ✓
              </div>
              <h2 style={{ fontSize: 28, marginBottom: 12, color: "var(--secondary-dark)" }}>Booking Confirmed!</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 8 }}>
                Your free trial has been booked with <strong>{tutors.find(t => t.id === bookingData.tutor)?.name || "Dr. Sarah Chen"}</strong>
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 32 }}>
                📧 Confirmation sent to your email · 📱 WhatsApp reminder 1 hour before
              </p>
              <div style={{ background: "var(--bg)", borderRadius: "var(--radius-lg)", padding: 24, maxWidth: 400, margin: "0 auto 32px", border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Session Details</div>
                {[
                  { icon: "calendar", text: `${bookingData.date || "Mon 20"} · ${bookingData.time || "09:00 AM"}` },
                  { icon: "video", text: "Via Jitsi Meet (link sent to email)" },
                  { icon: "clock", text: "60 minutes · 1-on-1 session" },
                ].map(item => (
                  <div key={item.icon} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <Icon name={item.icon} size={16} color="var(--primary)" />
                    <span style={{ fontSize: 14 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>
                  Go to Dashboard
                </button>
                <button className="btn btn-outline" onClick={() => onNavigate("home")}>
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 6 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button onClick={() => step > 1 && setStep(s => s - 1)}
              disabled={step === 1}
              style={{
                padding: "12px 24px",
                border: "2px solid var(--border)",
                background: "white",
                borderRadius: "var(--radius-full)",
                fontFamily: "'Plus Jakarta Sans'",
                fontWeight: 700,
                fontSize: 14,
                cursor: step > 1 ? "pointer" : "not-allowed",
                opacity: step === 1 ? 0.4 : 1,
                transition: "all 0.2s",
              }}>
              ← Previous
            </button>
            {step < 5 && (
              <button onClick={() => setStep(s => s + 1)}
                disabled={
                  (step === 1 && !bookingData.program) ||
                  (step === 2 && !bookingData.topic) ||
                  (step === 3 && !bookingData.tutor)
                }
                className="btn btn-primary"
                style={{ opacity: ((step === 1 && !bookingData.program) || (step === 2 && !bookingData.topic) || (step === 3 && !bookingData.tutor)) ? 0.4 : 1 }}>
                Continue → 
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── STUDENT DASHBOARD ────────────────────────────────────────────────────────
const StudentDashboard = ({ onNavigate, onLogout }) => {
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: "overview", icon: "home", label: "Overview" },
    { id: "sessions", icon: "calendar", label: "My Sessions" },
    { id: "video", icon: "video", label: "Video Room" },
    { id: "progress", icon: "trending_up", label: "Progress" },
    { id: "messages", icon: "message", label: "Messages", badge: 3 },
    { id: "payments", icon: "credit_card", label: "Payments" },
    { id: "resources", icon: "file_text", label: "Resources" },
  ];

  const upcomingSessions = [
    { tutor: "Dr. Sarah Chen", subject: "IB AA HL - Integration", date: "Today", time: "4:00 PM", duration: 60, avatar: "https://i.pravatar.cc/50?img=47", countdown: "2h 34m" },
    { tutor: "Mr. Aditya Sharma", subject: "SEAMO - Number Theory", date: "Tomorrow", time: "10:00 AM", duration: 60, avatar: "https://i.pravatar.cc/50?img=52", countdown: "Tomorrow" },
    { tutor: "Dr. Sarah Chen", subject: "IB AA HL - Differential Equations", date: "Wed 22", time: "4:00 PM", duration: 60, avatar: "https://i.pravatar.cc/50?img=47", countdown: "Wed 22" },
  ];

  const progressData = [
    { subject: "IB AA HL - Calculus", progress: 78, sessions: 12, target: "IB 7" },
    { subject: "Integration Techniques", progress: 65, sessions: 6, target: "A-Level A*" },
    { subject: "Number Theory", progress: 52, sessions: 4, target: "SEAMO Gold" },
  ];

  const recentMessages = [
    { from: "Dr. Sarah Chen", preview: "Great session today! Here's the homework for next time...", time: "2h ago", avatar: "https://i.pravatar.cc/40?img=47", unread: true },
    { from: "Mr. Aditya Sharma", preview: "Please review the number theory exercises before our next...", time: "1d ago", avatar: "https://i.pravatar.cc/40?img=52", unread: true },
    { from: "Edumath Support", preview: "Your session recording is now available for download...", time: "2d ago", avatar: null, unread: false },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 260 : 72,
        background: "white",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={32} showText={sidebarOpen} />
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hide-mobile"
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", flexShrink: 0 }}>
            <Icon name={sidebarOpen ? "x" : "menu"} size={18} />
          </button>
        </div>

        {/* User Card */}
        {sidebarOpen && (
          <div style={{ padding: "16px", margin: "12px", background: "var(--primary-light)", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="https://i.pravatar.cc/40?img=5" alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Mei Lin Tan</div>
                <div className="badge badge-primary" style={{ fontSize: 10, padding: "2px 8px" }}>Student</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 12px" }}>
          {navItems.map(item => (
            <div key={item.id} onClick={() => setActivePage(item.id)} className="sidebar-link"
              style={{
                position: "relative",
                ...(activePage === item.id ? {
                  background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(0,82,212,0.3)",
                } : {}),
                justifyContent: sidebarOpen ? "flex-start" : "center",
              }}
              data-tooltip={!sidebarOpen ? item.label : undefined}>
              <Icon name={item.icon} size={18} color={activePage === item.id ? "white" : "var(--text-muted)"} />
              {sidebarOpen && <span>{item.label}</span>}
              {item.badge && sidebarOpen && (
                <span style={{ marginLeft: "auto", background: "var(--error)", color: "white", width: 20, height: 20, borderRadius: "50%", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {item.badge}
                </span>
              )}
              {item.badge && !sidebarOpen && <div className="notif-dot" />}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px" }}>
          <div onClick={onLogout} className="sidebar-link">
            <Icon name="logout" size={18} color="var(--text-muted)" />
            {sidebarOpen && <span>Sign Out</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Top Bar */}
        <div style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 64, display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 5 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>
              {navItems.find(n => n.id === activePage)?.label || "Dashboard"}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Friday, 20 February 2026</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => onNavigate("booking")} className="btn btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
              <Icon name="plus" size={14} /> Book Session
            </button>
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer" }}>
              <Icon name="bell" size={22} color="var(--text-muted)" />
              <div className="notif-dot" />
            </button>
            <img src="https://i.pravatar.cc/36?img=5" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--border)", cursor: "pointer" }} alt="" />
          </div>
        </div>

        <div style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
          {/* OVERVIEW */}
          {activePage === "overview" && (
            <div>
              {/* Welcome banner */}
              <div style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", borderRadius: "var(--radius-xl)", padding: "28px 32px", marginBottom: 28, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Welcome back! 👋</div>
                  <h2 style={{ fontSize: 24, marginBottom: 6 }}>Hi, Mei Lin!</h2>
                  <p style={{ opacity: 0.8, fontSize: 14 }}>You have a session with Dr. Sarah Chen in <strong>2h 34m</strong></p>
                </div>
                <button style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "12px 24px", borderRadius: "var(--radius-full)", fontWeight: 700, cursor: "pointer", backdropFilter: "blur(10px)", fontFamily: "'Plus Jakarta Sans'" }}>
                  <Icon name="video" size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                  Join Room
                </button>
              </div>

              {/* Stats cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 28 }}>
                {[
                  { label: "Total Sessions", value: "18", sub: "+3 this month", icon: "calendar", color: "var(--primary)" },
                  { label: "Hours Studied", value: "24h", sub: "Goal: 30h/month", icon: "clock", color: "var(--secondary-dark)" },
                  { label: "Avg Score", value: "82%", sub: "+12% from last month", icon: "trending_up", color: "#059669" },
                  { label: "Sessions Left", value: "7/10", sub: "Starter pack", icon: "zap", color: "#D97706" },
                ].map((stat, i) => (
                  <div key={i} className="stat-card" style={{ animation: `fadeUp 0.4s ease forwards ${i * 0.08}s`, opacity: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ color: "var(--text-muted)", fontSize: 13, fontWeight: 600 }}>{stat.label}</span>
                      <div style={{ width: 36, height: 36, background: `${stat.color}15`, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={stat.icon} size={18} color={stat.color} />
                      </div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ color: "var(--success)", fontSize: 12, fontWeight: 600, marginTop: 6 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
                {/* Upcoming Sessions */}
                <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16 }}>Upcoming Sessions</h3>
                    <button style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "'Plus Jakarta Sans'" }}>View All →</button>
                  </div>
                  {upcomingSessions.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: i < upcomingSessions.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                      <img src={s.avatar} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{s.subject}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 12 }}>with {s.tutor} · {s.date} · {s.time}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          fontSize: 12, fontWeight: 800,
                          color: i === 0 ? "var(--primary)" : "var(--text-muted)",
                          background: i === 0 ? "var(--primary-light)" : "transparent",
                          padding: i === 0 ? "4px 10px" : "0",
                          borderRadius: 99,
                        }}>
                          {i === 0 && <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--primary)", borderRadius: "50%", marginRight: 4, verticalAlign: "middle" }} />}
                          {s.countdown}
                        </div>
                        {i === 0 && (
                          <button className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: 12, marginTop: 6 }}>
                            <Icon name="video" size={12} /> Join
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Messages */}
                <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", padding: 24, boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16 }}>Messages</h3>
                    <span style={{ background: "var(--error)", color: "white", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>2 new</span>
                  </div>
                  {recentMessages.map((msg, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: i < recentMessages.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}>
                      {msg.avatar ? (
                        <img src={msg.avatar} alt="" style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>📣</div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: msg.unread ? 800 : 600, fontSize: 13 }}>{msg.from}</span>
                          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{msg.time}</span>
                        </div>
                        <div style={{ color: "var(--text-muted)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg.preview}</div>
                      </div>
                      {msg.unread && <div style={{ width: 8, height: 8, background: "var(--primary)", borderRadius: "50%", flexShrink: 0, marginTop: 4 }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress section */}
              <div style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", padding: 24, boxShadow: "var(--shadow-sm)", marginTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16 }}>Topic Progress</h3>
                  <button style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "'Plus Jakarta Sans'" }}>Full Report →</button>
                </div>
                {progressData.map((p, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{p.subject}</span>
                        <span className="badge badge-secondary" style={{ marginLeft: 8, fontSize: 10 }}>🎯 {p.target}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.sessions} sessions</span>
                        <span style={{ fontWeight: 800, color: "var(--primary)" }}>{p.progress}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other pages placeholder */}
          {activePage !== "overview" && (
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "60px 40px", textAlign: "center", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>
                {activePage === "sessions" ? "📅" : activePage === "video" ? "🎥" : activePage === "progress" ? "📈" : activePage === "messages" ? "💬" : activePage === "payments" ? "💳" : "📚"}
              </div>
              <h2 style={{ marginBottom: 8 }}>{navItems.find(n => n.id === activePage)?.label}</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
                {activePage === "video"
                  ? "Join your live Jitsi Meet session — screen sharing, recording & chat included"
                  : activePage === "payments"
                  ? "View invoices, payment history, and manage your session packages"
                  : "This section is fully implemented in the production build"}
              </p>
              {activePage === "video" && (
                <div style={{ background: "#0F172A", borderRadius: "var(--radius-lg)", padding: 40, maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 80, height: 80, background: "rgba(0,212,177,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse-glow 2s infinite" }}>
                    <Icon name="video" size={36} color="#00D4B1" />
                  </div>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Dr. Sarah Chen's Room</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>IB AA HL — Integration Techniques</div>
                  <button className="btn btn-secondary" style={{ padding: "12px 32px", fontSize: 15 }}>
                    <Icon name="video" size={16} /> Enter Room
                  </button>
                </div>
              )}
              {activePage !== "video" && (
                <button className="btn btn-primary" onClick={() => setActivePage("overview")}>
                  ← Back to Overview
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
const PricingPage = ({ onNavigate }) => (
  <div>
    <div style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", padding: "64px 24px", textAlign: "center" }}>
      <h1 style={{ color: "white", fontSize: "clamp(28px, 4vw, 52px)", marginBottom: 16 }}>Simple, Transparent Pricing</h1>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, maxWidth: 500, margin: "0 auto" }}>
        Start free, then choose a package that fits your goals. No hidden fees.
      </p>
    </div>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 28, alignItems: "center" }}>
        {pricingPlans.map((plan) => (
          <div key={plan.id} style={{
            background: plan.highlight ? "linear-gradient(135deg, #0052D4, #003A9E)" : "white",
            color: plan.highlight ? "white" : "var(--text)",
            borderRadius: "var(--radius-xl)",
            padding: "36px 28px",
            border: plan.highlight ? "none" : "1px solid var(--border)",
            position: "relative",
            transform: plan.highlight ? "scale(1.05)" : "none",
            boxShadow: plan.highlight ? "var(--shadow-lg)" : "var(--shadow-sm)",
          }}>
            {plan.badge && (
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "var(--text)", padding: "6px 20px", borderRadius: 99, fontSize: 13, fontWeight: 800 }}>
                ✨ {plan.badge}
              </div>
            )}
            <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.7, marginBottom: 6 }}>{plan.sessions} {plan.sessions === 1 ? "Session" : "Sessions"}</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>{plan.name}</div>
            {plan.price === 0 ? (
              <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>FREE</div>
            ) : (
              <div>
                {plan.save && <div style={{ display: "inline-block", background: "rgba(34,197,94,0.2)", color: plan.highlight ? "#86EFAC" : "#16A34A", padding: "3px 10px", borderRadius: 99, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{plan.save}</div>}
                <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1 }}>${plan.price}<span style={{ fontSize: 18, fontWeight: 600, opacity: 0.6 }}>/session</span></div>
                {plan.originalPrice && <div style={{ opacity: 0.4, textDecoration: "line-through", fontSize: 14 }}>${plan.originalPrice}/session list price</div>}
                <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>Total: ${plan.price * plan.sessions}</div>
              </div>
            )}
            <ul style={{ listStyle: "none", margin: "24px 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, opacity: 0.9 }}>
                  <span style={{ color: plan.highlight ? "#00D4B1" : "var(--secondary)", flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="btn" onClick={() => onNavigate("booking")}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                borderRadius: "var(--radius-full)",
                fontSize: 15,
                background: plan.highlight ? "rgba(255,255,255,0.15)" : "var(--primary)",
                color: "white",
                border: plan.highlight ? "1px solid rgba(255,255,255,0.3)" : "none",
                backdropFilter: plan.highlight ? "blur(10px)" : "none",
                boxShadow: plan.highlight ? "none" : "0 4px 16px rgba(0,82,212,0.3)",
              }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
      {/* Payment methods */}
      <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: 32, marginTop: 48, border: "1px solid var(--border)", textAlign: "center" }}>
        <h3 style={{ marginBottom: 20 }}>Accepted Payment Methods</h3>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {["💰 GoPay", "💜 OVO", "🟦 QRIS", "🏦 Bank Transfer", "💳 Credit Card", "🅿️ PayPal", "💲 Stripe"].map(m => (
            <span key={m} style={{ padding: "8px 16px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 600 }}>{m}</span>
          ))}
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 20 }}>🔒 All payments secured by SSL · 30-day money back guarantee · Cancel anytime</p>
      </div>
    </div>
  </div>
);

// ─── AUTH MODAL ──────────────────────────────────────────────────────────────
const AuthModal = ({ onClose, onLogin }) => {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: 40, width: "100%", maxWidth: 440, margin: "0 24px", boxShadow: "var(--shadow-lg)", animation: "fadeUp 0.3s ease" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Logo size={48} />
          <h2 style={{ marginTop: 16, fontSize: 22 }}>{mode === "login" ? "Welcome back!" : "Join Edumath"}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
            {mode === "login" ? "Sign in to your account" : "Start your math journey today"}
          </p>
        </div>

        {/* Google */}
        <button onClick={handleAuth} style={{ width: "100%", padding: "13px", border: "2px solid var(--border)", borderRadius: "var(--radius-md)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontWeight: 700, fontSize: 15, fontFamily: "'Plus Jakarta Sans'", marginBottom: 20, transition: "all 0.2s" }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>or with email</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && <input className="input" placeholder="Full Name" />}
          <input className="input" type="email" placeholder="Email address" />
          <input className="input" type="password" placeholder="Password" />
          {mode === "register" && (
            <select className="select">
              <option value="">I am a...</option>
              <option>Student</option>
              <option>Tutor</option>
              <option>Parent (booking for my child)</option>
            </select>
          )}
        </div>

        <button onClick={handleAuth} disabled={loading} className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16, marginTop: 20, opacity: loading ? 0.7 : 1 }}>
          {loading ? <><span className="animate-spin">⟳</span> Authenticating...</> : (mode === "login" ? "Sign In" : "Create Account")}
        </button>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, marginTop: 20 }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 700, cursor: "pointer", fontFamily: "'Plus Jakarta Sans'" }}>
            {mode === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>

        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
          <Icon name="x" size={20} />
        </button>
      </div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [prevPage, setPrevPage] = useState(null);

  const navigate = (newPage) => {
    if (newPage === "dashboard" && !isLoggedIn) {
      setShowAuth(true);
      setPrevPage("dashboard");
      return;
    }
    setPrevPage(page);
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuth(false);
    if (prevPage) { setPage(prevPage); setPrevPage(null); }
    else setPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("home");
  };

  const showNav = page !== "dashboard";

  return (
    <div>
      <GlobalStyles />

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}

      {/* Navigation */}
      {showNav && (
        <NavBar onNavigate={navigate} currentPage={page} isLoggedIn={isLoggedIn} onLogin={() => setShowAuth(true)} />
      )}

      {/* Page Content */}
      <main style={{ animation: "fadeIn 0.3s ease" }} key={page}>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "tutors" && <TutorDirectory onNavigate={navigate} />}
        {page === "booking" && <BookingFlow onNavigate={navigate} />}
        {page === "dashboard" && <StudentDashboard onNavigate={navigate} onLogout={handleLogout} />}
        {page === "pricing" && <PricingPage onNavigate={navigate} />}
        {page === "courses" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
            <div className="badge badge-primary" style={{ marginBottom: 16 }}>📚 All Programs</div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>Our <span className="gradient-text">Courses & Programs</span></h1>
            <p style={{ color: "var(--text-muted)", fontSize: 17, marginBottom: 48 }}>Expert-designed curricula aligned with top international boards</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
              {programs.map((prog, i) => (
                <div key={prog.id} className="card-hover" style={{ background: "white", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", overflow: "hidden", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ height: 8, background: prog.gradient }} />
                  <div style={{ padding: 28 }}>
                    <div style={{ width: 52, height: 52, background: prog.gradient, borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <Icon name={prog.icon} size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>{prog.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{prog.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                      {prog.topics.map(t => <span key={t} className="badge badge-secondary" style={{ fontSize: 11 }}>{t}</span>)}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-primary" onClick={() => navigate("booking")} style={{ flex: 1, justifyContent: "center", padding: "10px", fontSize: 14 }}>Book Session</button>
                      <span style={{ padding: "10px 16px", background: "var(--bg)", borderRadius: "var(--radius-full)", fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>{prog.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {page === "competition" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
            <div className="badge badge-accent" style={{ marginBottom: 16 }}>🏆 Competition Preparation</div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>Train for <span className="gradient-text-gold">International Competitions</span></h1>
            <p style={{ color: "var(--text-muted)", fontSize: 17, marginBottom: 48, maxWidth: 600 }}>
              Specialized coaching for SEAMO, SASMO, SMO, AMO, AIMO, WMI, and more. Our tutors are gold medalists and competition coaches.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 48 }}>
              {["SEAMO", "SASMO", "AMO", "AIMO", "WMI", "AMC/AIME"].map((comp) => (
                <div key={comp} className="card-hover" style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: 28, cursor: "pointer", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🏅</div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{comp}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>Full preparation program with past papers, strategies, and personalized coaching</p>
                  <button className="btn btn-primary" onClick={() => navigate("booking")} style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: 13 }}>Start Training</button>
                </div>
              ))}
            </div>
            <div style={{ background: "linear-gradient(135deg, #FFD60A20, #FF950020)", border: "1px solid rgba(255,214,10,0.3)", borderRadius: "var(--radius-xl)", padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🥇 40+ International Gold Medals</div>
              <p style={{ color: "var(--text-muted)", fontSize: 16 }}>Our students have won gold medals at SEAMO, SASMO, AMO, and WMI in 2023–2025</p>
              <button className="btn btn-accent" onClick={() => navigate("booking")} style={{ marginTop: 24, padding: "14px 32px", fontSize: 15 }}>Book Competition Coach</button>
            </div>
          </div>
        )}
        {page === "about" && (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <Logo size={72} />
              <h1 style={{ marginTop: 24, fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>About <span className="gradient-text">Edumath International</span></h1>
              <p style={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
                We're on a mission to make world-class mathematics education accessible to every student — regardless of geography. Founded by Cambridge and IIT alumni, Edumath connects students in 28 countries with expert 1-on-1 tutors.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
              {[
                { icon: "🎯", title: "Our Mission", desc: "Making top-tier international math education accessible to students worldwide through expert 1-on-1 tutoring." },
                { icon: "🌍", title: "Global Reach", desc: "Serving students in 28 countries across Asia, Europe, and America — in your timezone, at your pace." },
                { icon: "✅", title: "Verified Tutors", desc: "Every tutor undergoes a rigorous 6-stage screening: background check, demo lesson, and ongoing reviews." },
                { icon: "🔒", title: "Safe & Secure", desc: "End-to-end encrypted sessions, secure payments via Midtrans & Stripe, and parent dashboard access." },
              ].map(item => (
                <div key={item.title} style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 28, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", background: "linear-gradient(135deg, var(--primary), var(--secondary))", borderRadius: "var(--radius-xl)", padding: "48px 40px", color: "white" }}>
              <h2 style={{ fontSize: 28, marginBottom: 12 }}>Ready to start?</h2>
              <p style={{ opacity: 0.85, marginBottom: 24, fontSize: 16 }}>Book your free trial today. No credit card required.</p>
              <button className="btn btn-accent" onClick={() => navigate("booking")} style={{ padding: "14px 36px", fontSize: 16 }}>🎯 Book Free Trial</button>
            </div>
          </div>
        )}
        {page === "contact" && (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "64px 24px" }}>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>Get in <span className="gradient-text">Touch</span></h1>
            <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 40 }}>Have questions? We typically respond within 2 hours.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              {[
                { icon: "💬", label: "WhatsApp", value: "+62 812 3456 7890", desc: "Fastest response" },
                { icon: "📧", label: "Email", value: "hello@edumath.intl", desc: "24h response" },
                { icon: "📱", label: "Instagram", value: "@edumath.intl", desc: "DM us anytime" },
                { icon: "🌐", label: "Timezone", value: "WIB (GMT+7)", desc: "Mon–Sun 8AM–10PM" },
              ].map(c => (
                <div key={c.label} style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 20, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.label}</div>
                  <div style={{ color: "var(--primary)", fontWeight: 600, fontSize: 14, marginTop: 2 }}>{c.value}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: 36, border: "1px solid var(--border)" }}>
              <h3 style={{ marginBottom: 20 }}>Send us a message</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input className="input" placeholder="Your Name" />
                <input className="input" type="email" placeholder="Email Address" />
                <select className="select"><option>Select Topic</option><option>Booking a session</option><option>Tutor information</option><option>Pricing & packages</option><option>Technical support</option></select>
                <textarea className="input" rows={4} placeholder="Your message..." style={{ resize: "vertical" }} />
                <button className="btn btn-primary" style={{ justifyContent: "center", padding: "14px" }}>Send Message →</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
