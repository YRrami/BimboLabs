/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
 

// App.tsx — Full refactor with PNG logo in Navbar
// ------------------------------------------------
// ✅ Highlights
// - Central CONFIG block (logo / nav / socials) for easy editing
// - Navbar shows your PNG logo instead of the text brand
// - Same sections & behaviors preserved (hero, projects, case studies, services, contact)
// - Clear section headers + comments for readability

import { useEffect, useMemo, useRef, useState, type ElementType } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Code,
  Zap,
  Sparkles,
  Bot,
  MessageSquare,
  Send,
  Instagram,
  Twitter,
  Facebook,
  Check,
  ExternalLink,
  Server,
  ArrowRight,
  Eye,
  Download,
  Cloud,
  Shield,
  Phone,
} from "lucide-react";
import logo from "./logo.png"; // Example PNG logo import
/* =====================================================
   CONFIG — edit these to customize
===================================================== */
const SITE = {
  name: "Bimbo",
  logo: {
    src: logo, // 👉 Put your PNG in /public and set the path
    alt: "Bimbo logo",
    width: 160, // intrinsic width (helps layout stability)
    height: 160, // intrinsic height
    className: "h-5 w-auto sm:h-8  select-none", // tweak style freely
  },
  nav: [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Case Studies", id: "case-studies" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ],
  socials: {
    github: "https://github.com/YRrami",
    instagram: "https://www.instagram.com/bimboodev/",
    facebook: "https://www.facebook.com/profile.php?id=61580950795776",
    linkedin: "https://linkedin.com/in/yourhandle",
    twitter: "https://twitter.com/yourhandle",
    email: "mailto:bimboodev@gmail.com",
    phone: "tel:01148000500",
  },
};

/* =====================================================
   Utilities
===================================================== */
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/* =====================================================
   Small helpers + micro components
===================================================== */
function toneToText(t: "fuchsia" | "sky" | "indigo" | "cyan" | "violet" | "rose") {
  switch (t) {
    case "fuchsia": return "text-fuchsia-300";
    case "sky": return "text-sky-300";
    case "indigo": return "text-indigo-300";
    case "cyan": return "text-cyan-300";
    case "violet": return "text-violet-300";
    case "rose": return "text-rose-400";
  }
}

function Stat({ number, label, accent }: { number: string; label: string; accent: "fuchsia" | "sky" | "indigo" }) {
  const color = accent === "fuchsia" ? "text-fuchsia-400" : accent === "sky" ? "text-sky-400" : "text-indigo-400";
  return (
    <div className="text-center p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5">
      <div className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${color}`}>{number}</div>
      <div className="text-[11px] sm:text-xs text-gray-400">{label}</div>
    </div>
  );
}

function DownloadIcon() { return <Download className="h-4 w-4" />; }

function SkipLink() { return (<a href="#main" className="skip-link">Skip to content</a>); }

/* =====================================================
   Brand Logo + Navbar
===================================================== */
function BrandLogo() {
  const { logo, name } = SITE;
  return (
    <a href="#top" className="group flex items-center min-w-0" aria-label={name}>
      {logo?.src ? (
        <img
          src={logo.src}
          alt={logo.alt ?? name}
          width={logo.width}
          height={logo.height}
          className={logo.className}
        />
      ) : (
        <span className="truncate bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-xl sm:text-2xl font-bold tracking-tight text-transparent">
          {name}
        </span>
      )}
    </a>
  );
}

function Navbar({ activeSection }: { activeSection?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = typeof window !== "undefined" ? window.scrollY > 40 : false;

  return (
    <nav className="fixed top-0 z-50 w-full transition-all duration-500" aria-label="Primary">
      <div className="mx-auto max-w-[95rem] px-3 sm:px-6 lg:px-10 pt-3 sm:pt-4">
        <div
          className={`rounded-2xl border border-white/10 backdrop-blur-2xl transition-all duration-500 ${scrolled ? "bg-black/70 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.6)]" : "bg-black/30"}`}
        >
          <div className="flex h-14 sm:h-16 md:h-[70px] items-center justify-between px-3 sm:px-5">
            <BrandLogo />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-1">
              {SITE.nav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group relative px-3 lg:px-4 py-2 text-sm md:text-[15px] transition-all duration-300 rounded-md ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />} {item.label}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-sky-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden rounded-xl border border-white/15 bg-white/10 p-2.5 transition-all duration-300 hover:scale-110 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile panel */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="border-t border-white/10 bg-black/85 backdrop-blur-2xl">
              <div className="space-y-2 px-4 py-4">
                {SITE.nav.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-lg px-3 py-2 text-base text-gray-300 transition-all duration-300 hover:translate-x-1 hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-sky-500/10 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ transitionDelay: `${idx * 70}ms` }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =====================================================
   Hero floating social edge icons (unchanged)
===================================================== */
function HeroEdgeIcons({ scrollY, isMobile, reducedMotion }: { scrollY: number; isMobile: boolean; reducedMotion: boolean }) {
  const strength = 0.06;

  const desktop = {
    ig: { left: 12, top: 22 },
    in: { left: 26, top: 64 },
    tw: { left: 10, top: 78 },
    fb: { left: 94, top: 56 },
    gh: { left: 86, top: 88 },
  } as const;

  const mobile = {
    ig: { left: 14, top: 20 },
    in: { left: 28, top: 70 },
    tw: { left: 12, top: 86 },
    fb: { left: 88, top: 56 },
    gh: { left: 84, top: 88 },
  } as const;

  const items: Array<{
    key: keyof typeof desktop;
    Icon: ElementType;
    href: string;
    title: string;
    glow: string;
  }> = [
    { key: "ig", Icon: Instagram, href: SITE.socials.instagram, title: "Instagram", glow: "from-pink-500 via-fuchsia-500 to-purple-500" },
    { key: "in", Icon: Linkedin, href: SITE.socials.linkedin, title: "LinkedIn", glow: "from-sky-400 via-blue-500 to-indigo-500" },
    { key: "tw", Icon: Twitter, href: SITE.socials.twitter, title: "Twitter", glow: "from-sky-400 via-cyan-400 to-blue-500" },
    { key: "fb", Icon: Facebook, href: SITE.socials.facebook, title: "Facebook", glow: "from-blue-500 via-indigo-500 to-purple-500" },
    { key: "gh", Icon: Github, href: SITE.socials.github, title: "GitHub", glow: "from-slate-200 via-slate-400 to-slate-600" },
  ];

  const sizeClass = isMobile ? "h-12 w-12" : "h-14 w-14 md:h-16 md:w-16";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-[11]">
      {items.map(({ key, Icon, href, title, glow }, i) => {
        const base = isMobile ? mobile[key] : desktop[key];
        const left = clamp(base.left, isMobile ? 6 : 0, isMobile ? 94 : 100);
        const top = clamp(base.top, isMobile ? 9 : 0, isMobile ? 91 : 100);
        const translateY = reducedMotion ? 0 : scrollY * strength;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={title}
            className="absolute pointer-events-auto group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 rounded-2xl"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(-50%, -50%) translateY(${translateY}px)`,
              animation: reducedMotion ? undefined : `edgeFloat ${6 + (i % 3)}s ease-in-out ${(i * 0.2).toFixed(2)}s infinite`,
              willChange: "transform",
            }}
          >
            <span className={`absolute -inset-5 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition bg-gradient-to-br ${glow}`} />
            <span className={`relative grid place-items-center ${sizeClass} rounded-2xl bg-white/10 border border-white/20 shadow-[0_10px_35px_-10px_rgba(56,189,248,0.35)] transition group-hover:scale-110 group-hover:-rotate-3`}>
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

/* =====================================================
   Chat panel (unchanged UI/behavior)
===================================================== */
function ChatPanel({
  chatListRef, typing, messages, value, setValue, onSend, onQuick,
}: {
  chatListRef: React.RefObject<HTMLDivElement | null>;
  typing: boolean;
  messages: Array<{ role: "user" | "assistant"; text: string }>;
  value: string;
  setValue: (v: string) => void;
  onSend: () => void;
  onQuick: (q: string) => void;
}) {
  const quick = [
    "Show me your latest projects",
    "What’s your AI stack?",
    "Are you available this month?",
    "Suggest a case study layout",
  ];
  return (
    <div className="fixed z-[70] bottom-[calc(4rem+max(1rem,env(safe-area-inset-bottom)))] right-[max(1rem,env(safe-area-inset-right))] w-[min(94vw,420px)] rounded-2xl border border-white/15 bg-black/85 shadow-[0_20px_70px_-22px_rgba(59,130,246,0.35)] overflow-hidden" role="dialog" aria-modal="true" aria-label="AI Copilot Chat">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-indigo-600/10 to-sky-500/10">
        <MessageSquare className="h-5 w-5 text-sky-300" />
        <span className="text-sm font-semibold">AI Copilot</span>
      </div>

      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => onQuick(q)}
            className="text-[11px] px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
          >
            {q}
          </button>
        ))}
      </div>

      <div ref={chatListRef} className="max-h-[46vh] overflow-y-auto px-4 pb-3 space-y-3" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm leading-relaxed ${m.role === "assistant" ? "text-gray-200" : "text-sky-300 text-right"}`}>
            <div className={`inline-block px-3.5 py-2 rounded-xl border ${m.role === "assistant" ? "border-white/15 bg-white/5" : "border-sky-400/30 bg-sky-400/10"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="text-sm text-gray-200" aria-label="Assistant is typing">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70 inline-block" style={{ animation: "dotPulse 1s ease-in-out infinite" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-white/70 inline-block" style={{ animation: "dotPulse 1s ease-in-out .12s infinite" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-white/70 inline-block" style={{ animation: "dotPulse 1s ease-in-out .24s infinite" }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10 flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          className="flex-1 rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none focus:border-sky-400"
          placeholder="Ask about projects, stack, availability…"
          aria-label="Type your message"
        />
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="rounded-xl px-3.5 py-2 bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white text-sm font-medium border border-white/20 hover:scale-[1.03] transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   Featured Projects (iframe stack preserved)
===================================================== */
function InteractiveProjectShowcase() {
  const [active, setActive] = useState(0);

  const projects = [
    {
      id: 1,
      title: "SFE Club",
      url: "https://sfeclub.vercel.app/",
      brief:
        "Club/association website highlighting activities, events, and join flow. Clean sections that guide visitors quickly and read great on mobile.",
      tags: ["Community", "Events", "Next.js"],
      year: "2024",
      emoji: "🎓",
    },
    {
      id: 2,
      title: "HealthTrip",
      url: "https://healthtrip-opal.vercel.app/",
      brief:
        "Medical travel landing with trust signals, scannable benefits, and conversion-focused hero/CTA. Structured to reduce bounce and drive contact.",
      tags: ["Healthcare", "Travel", "Next.js"],
      year: "2024",
      emoji: "🩺",
    },
    {
      id: 3,
      title: "FantasyDeal",
      url: "https://fantasydeall.vercel.app/",
      brief:
        "Deals/coupons experience with bold pricing highlights and fast scanning on mobile. Card grid and type tuned for quick decision making.",
      tags: ["E-commerce", "Deals", "Next.js"],
      year: "2024",
      emoji: "🛍️",
    },
    {
      id: 4,
      title: "LeadMagnett",
      url: "https://leadmagnett.vercel.app/",
      brief:
        "Lead-gen microsite: persuasive copy blocks, social proof, and a focused primary CTA path that reduces friction.",
      tags: ["Marketing", "Leads", "Next.js"],
      year: "2024",
      emoji: "🧲",
    },
    {
      id: 5,
      title: "Egywin Luxury",
      url: "https://egywin-luxury.vercel.app/",
      brief:
        "Luxury real-estate landing balancing white space, premium type, and a quick contact funnel. Hero and highlights sell the value fast.",
      tags: ["Real-estate", "Luxury", "Next.js"],
      year: "2024",
      emoji: "🏛️",
    },
  ];

  const [loaded, setLoaded] = useState<boolean[]>(() => projects.map(() => false));

  const faviconFor = (u: string) => {
    try { return `${new URL(u).origin}/favicon.ico`; } catch { return ""; }
  };
  const gradientFor = (u: string) => {
    let host = "";
    try { host = new URL(u).hostname; } catch {}
    let hash = 0;
    for (let i = 0; i < host.length; i++) hash = (hash * 31 + host.charCodeAt(i)) | 0;
    const hue1 = ((hash >>> 1) % 360 + 360) % 360;
    const hue2 = (hue1 + 42) % 360;
    const s = 70, l = 52;
    return `linear-gradient(135deg, hsl(${hue1} ${s}% ${l}%), hsl(${hue2} ${s}% ${l}%))`;
  };

  const current = projects[active];
  const currentOrigin = (() => { try { return new URL(current.url).origin; } catch { return ""; } })();
  const currentFavicon = faviconFor(current.url);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const onTabsKeyDown = (e: React.KeyboardEvent) => {
    const count = projects.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % count);
      (tabsRef.current?.querySelectorAll('[role="tab"]')?.[(active + 1) % count] as HTMLElement)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + count) % count);
      (tabsRef.current?.querySelectorAll('[role="tab"]')?.[(active - 1 + count) % count] as HTMLElement)?.focus();
    }
  };

  const IframeStack = () => {
    return (
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/90 gpu-stable"
        style={{ isolation: "isolate", transform: "translateZ(0)", contain: "paint" as any }}
      >
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]">
          {projects.map((p, i) => {
            const isActive = active === i;
            return (
              <div
                key={p.id}
                className="absolute inset-0"
                style={{
                  zIndex: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  willChange: "opacity",
                  transition: "opacity 120ms linear",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                  contain: "paint",
                }}
                aria-hidden={!isActive}
                role="tabpanel"
                id={`panel-${p.id}`}
                aria-labelledby={`tab-${p.id}`}
              >
                <iframe
                  src={p.url}
                  title={`${p.title} preview`}
                  className="absolute inset-0 w-full h-full block"
                  loading="eager"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() =>
                    setLoaded((prev) => (prev[i] ? prev : Object.assign([...prev], { [i]: true })))
                  }
                  style={{
                    border: 0,
                    background: "black",
                    display: "block",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                />
                {!loaded[i] && (
                  <div className="absolute inset-0 z-[2] bg-[linear-gradient(120deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]" />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute left-3 bottom-2 z-[3] text-[11px] text-gray-300 opacity-70">
          If the preview is blank, that site blocks embedding. Use “Open”.
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist" aria-label="Featured projects" ref={tabsRef} onKeyDown={onTabsKeyDown}>
        {projects.map((p, idx) => {
          const fav = faviconFor(p.url);
          const activeTab = active === idx;
          return (
            <button
              key={p.id}
              onClick={() => setActive(idx)}
              className={`relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${
                activeTab ? "text-white" : "text-gray-400 bg-white/5 hover:text-white hover:bg-white/10"
              }`}
              style={activeTab ? { backgroundImage: gradientFor(p.url) } : undefined}
              title={p.title}
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={activeTab}
              aria-controls={`panel-${p.id}`}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <img src={fav} alt="" className="h-4 w-4 rounded" onError={(e) => ((e.currentTarget.style as any).display = "none")} />
                <span className="text-lg leading-none">{p.emoji}</span>
                <span className="truncate max-w-[12ch] sm:max-w-[18ch]">{p.title}</span>
              </span>
              {activeTab && <div className="absolute -inset-1 rounded-xl bg-white/10 blur-lg" />}
            </button>
          );
        })}
      </div>

      <div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="relative rounded-3xl p-[1px]" style={{ backgroundImage: gradientFor(current.url) }}>
            <div className="relative rounded-3xl p-4 sm:p-6 bg-[#0b0f19]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={currentFavicon} alt="" className="h-6 w-6 rounded" onError={(e) => ((e.currentTarget.style as any).display = "none")} />
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">{current.title}</h3>
                    <p className="text-xs text-gray-400 truncate">
                      {currentOrigin.replace(/^https?:\/\//, "")} • {current.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => { try { await navigator.clipboard.writeText(current.url); } catch {} }}
                    className="px-2 py-1 text-xs rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                    aria-label="Copy link"
                  >
                    Copy
                  </button>
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                    aria-label="Open site"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open
                  </a>
                </div>
              </div>

              <IframeStack />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{current.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{current.brief}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {current.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/20">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={current.url}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
                  style={{ backgroundImage: gradientFor(current.url) }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Eye className="h-5 w-5" />
                  Visit Site
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3" aria-label="Project details">
              <div className="text-center p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm text-gray-400">Year</div>
                <div className="text-lg font-semibold text-white">{current.year}</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm text-gray-400">Stack</div>
                <div className="text-lg font-semibold text-white">Next.js</div>
              </div>
              <div className="text-center p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm text-gray-400">Preview</div>
                <div className="text-lg font-semibold text-white">Manual</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-gray-400">Tip: click a tab to switch previews</div>
    </div>
  );
}

/* =====================================================
   Case Studies
===================================================== */
function CaseStudiesSection() {
  const studies = [
    {
      id: "fintech-rag",
      emoji: "🏦",
      title: "FinTech RAG Assistant",
      gradient: "from-fuchsia-500 to-sky-500",
      summary:
        "Deployed a retrieval-augmented chatbot answering policy & product questions across 30k+ docs.",
      bullets: [
        "Sub-second semantic search with hybrid BM25 + embeddings",
        "Guardrails, prompt caching, and observability (LangSmith)",
        "Human-in-the-loop feedback to improve intent coverage",
      ],
      metrics: [
        { label: "Deflection", value: "–45%" },
        { label: "CSAT", value: "4.7/5" },
        { label: "Latency", value: "420ms P50" },
      ],
    },
    {
      id: "commerce-reco",
      emoji: "🛍️",
      title: "E-commerce Recommender",
      gradient: "from-emerald-500 to-teal-500",
      summary:
        "Personalized home feed + bundles using vector user profiles and real-time events.",
      bullets: [
        "Graph features + embeddings for cold-start",
        "Segment-based multi-armed bandit for layouts",
        "Feature store (Redis) with streaming updates",
      ],
      metrics: [
        { label: "AOV", value: "+11%" },
        { label: "CTR", value: "+18%" },
        { label: "Revenue", value: " +9.3%" },
      ],
    },
    {
      id: "ops-analytics",
      emoji: "📈",
      title: "Ops Analytics Dashboard",
      gradient: "from-violet-500 to-indigo-500",
      summary:
        "Single-pane ops metrics with forecasting and anomaly alerts for a distributed fleet.",
      bullets: [
        "Time-series forecasting with Prophet",
        "Drill-down traces & golden signals",
        "Zero-copy data via DuckDB + Parquet",
      ],
      metrics: [
        { label: "MTTR", value: "–32%" },
        { label: "Alerts", value: "–28%" },
        { label: "Coverage", value: "99.9%" },
      ],
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((s) => (
          <div key={s.id} className={`group relative rounded-3xl p-[1px] bg-gradient-to-br ${s.gradient}`}>
            <div className="rounded-3xl h-full w-full bg-black/70 p-6 sm:p-7 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.emoji}</span>
                  <h3 className="text-xl sm:text-2xl font-bold">{s.title}</h3>
                </div>
                <a href="#contact" className="opacity-70 hover:opacity-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60" aria-label="Discuss this case">
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>

              <p className="text-gray-300 leading-relaxed mb-5">{s.summary}</p>

              <ul className="space-y-2.5 mb-5">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="h-4 w-4 mt-0.5 text-sky-400 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {s.metrics.map((m, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs border border-white/15 bg-white/5 text-gray-200">
                    <span className="text-white font-semibold">{m.value}</span> <span className="text-gray-400">{m.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <span className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-gradient-to-br from-white/5 to-transparent" />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-gradient-to-r from-fuchsia-500 via-indigo-600 to-sky-500 text-white font-semibold shadow-[0_18px_50px_-18px_rgba(56,189,248,0.55)] hover:scale-[1.02] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
        >
          Book a discovery call
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 border border-white/20 bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>
      </div>
    </div>
  );
}

/* =====================================================
   Services
===================================================== */
function ServicesSection() {
  const services = [
    {
      icon: Bot,
      title: "LLM Apps & RAG",
      gradient: "from-fuchsia-500 to-sky-500",
      items: [
        "Chatbots, agents, evals, guardrails",
        "Vectors, hybrid search, doc pipelines",
        "Latency, costs, and reliability tuning",
      ],
    },
    {
      icon: Server,
      title: "Full-Stack Builds",
      gradient: "from-emerald-500 to-teal-600",
      items: [
        "Next.js/React, Node/Python APIs",
        "Postgres/Prisma, Redis, Stripe",
        "Testing, monitoring, CI/CD",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & Infra",
      gradient: "from-sky-500 to-indigo-600",
      items: [
        "AWS, Docker, containers",
        "Observability & tracing",
        "Perf budgets, scaling, costs",
      ],
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      gradient: "from-violet-500 to-purple-600",
      items: [
        "AuthN/Z, secrets, rate-limits",
        "PII handling & redaction",
        "Threat modeling & reviews",
      ],
    },
  ];

  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <div key={i} className={`group relative rounded-3xl p-[1px] bg-gradient-to-br ${s.gradient}`}>
          <div className="rounded-3xl h-full w-full bg-black/70 p-6 sm:p-7 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <s.icon className="h-6 w-6 text-white" />
              <h3 className="text-lg sm:text-xl font-semibold">{s.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {s.items.map((it, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 mt-0.5 text-sky-400 shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/15 bg-white/5 text-sm text-gray-200 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <span className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg bg-gradient-to-br from-white/5 to-transparent" />
        </div>
      ))}
    </div>
  );
}

/* =====================================================
   Contact
===================================================== */
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's Build Something Amazing</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I’m excited to collaborate on innovative products. Whether you need a full-stack dev, AI consultant, or a sprint to an MVP — let’s talk.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-6 w-6 text-fuchsia-400" />
              <h4 className="font-semibold text-white">Email</h4>
            </div>
            <a href={SITE.socials.email} className="text-gray-300 hover:text-white">bimboodev@gmail.com</a>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-6 w-6 text-sky-400" />
              <h4 className="font-semibold text-white">Phone</h4>
            </div>
            <a href={SITE.socials.phone} className="text-gray-300 hover:text-white">01148000500</a>
          </div>
        </div>

        <div className="flex gap-4">
          {[
            { icon: Github, href: SITE.socials.github, label: "GitHub" },
            { icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
            { icon: Facebook, href: SITE.socials.facebook, label: "Facebook" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="p-3 rounded-xl border border-white/20 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
              aria-label={social.label}
            >
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>

      <div className="relative">
        <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea
              id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit" disabled={isSubmitting}
            className="w-full group relative px-6 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 via-indigo-600 to-sky-500 text-white font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
          >
            <span className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-fuchsia-500 via-indigo-600 to-sky-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  <Check className="h-5 w-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  Send Message
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

/* =====================================================
   APP (root)
===================================================== */
export default function App() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const [] = useState(false); // used by legacy menus if any
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("top");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const glowRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      targetRef.current = { x, y };
      setMouse({ x, y });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const tick = () => {
      const ease = 0.12;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;
      if (glowRef.current) {
        glowRef.current.style.left = `${currentRef.current.x - 25}%`;
        glowRef.current.style.top = `${currentRef.current.y - 25}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  type Particle = { left: number; top: number; size: number; delay: number; duration: number; symbol: string; layer: 1 | 2; hue: "fuchsia" | "indigo" | "sky" | "cyan" | "violet" };
  const pSymbols = ["<", ">", "{}", "[]", "()", ";", ":", "=>", "&&", "||", "!", "?", "#", "$", "*", "+", "="];
  const hues: Particle["hue"][] = ["fuchsia", "indigo", "sky", "cyan", "violet"];
  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    const baseCount = isMobile ? 36 : 80;
    const count = reducedMotion ? Math.ceil(baseCount * 0.4) : baseCount;
    for (let i = 0; i < count; i++) {
      arr.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: (isMobile ? 7 : 9) + Math.floor(Math.random() * (isMobile ? 6 : 10)),
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        symbol: pSymbols[Math.floor(Math.random() * pSymbols.length)],
        layer: Math.random() > 0.45 ? 2 : 1,
        hue: hues[Math.floor(Math.random() * hues.length)],
      });
    }
    return arr;
  }, [hues, isMobile, pSymbols, reducedMotion]);

  useEffect(() => {
    const ids = ["top", "about", "projects", "case-studies", "services", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.1, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const [chatOpen, setChatOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hey! I'm your AI copilot. Ask about projects, stack, or availability." },
  ]);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: "smooth" }); }, [chatMessages, typing, chatOpen]);
  const sendChat = (txt?: string) => {
    const msg = (txt ?? chatInput).trim();
    if (!msg) return;
    setChatInput("");
    setChatMessages((m) => [...m, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      const t = msg.toLowerCase();
      let reply = "I can help with ideas, tech choices, and timelines. Want a quick roadmap?";
      if (t.includes("project")) reply = "Check Featured Projects. I can outline a case study: problem → approach → result → metrics.";
      else if (t.includes("stack") || t.includes("ai")) reply = "Common AI stack: RAG (OpenAI/HF), vector DB, FastAPI, evals/guardrails, tracing/observability.";
      else if (t.includes("available")) reply = "Yes — I can take an engagement this month. Share scope & dates for an estimate.";
      setChatMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 650);
  };

  const [copied, setCopied] = useState(false);
  const flashCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 900); };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" id="app-root">
      <SkipLink />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-[65] h-[3px] bg-transparent" aria-hidden>
        <div className="h-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500 transition-[width] duration-150" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none" aria-hidden>
        {!reducedMotion && (
          <div
            ref={glowRef}
            className="absolute h-[520px] sm:h-[680px] w-[520px] sm:w-[680px] rounded-full bg-gradient-to-br from-fuchsia-500/28 via-indigo-600/18 to-sky-500/28 blur-3xl"
            style={{ left: `${mouse.x - 25}%`, top: `${mouse.y - 25}%`, transform: `translateY(${scrollY * 0.04}px)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b1120] to-black" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.36) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.36) 1px, transparent 1px)",
            backgroundSize: isMobile ? "24px 24px" : "32px 32px",
            opacity: 0.7,
            mixBlendMode: "soft-light",
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: isMobile ? "12px 12px" : "16px 16px",
            opacity: 0.35,
            mixBlendMode: "soft-light",
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
        {!reducedMotion && (
          <>
            <div className="absolute left-[6%] top-[8%] h-[240px] w-[240px] sm:h-[340px] sm:w-[340px] rounded-full bg-gradient-to-br from-fuchsia-500/18 via-indigo-600/12 to-sky-500/18 blur-3xl" style={{ transform: `translateY(${scrollY * 0.12}px)`, animation: "pulse 4s ease-in-out infinite" }} />
            <div className="absolute right-[7%] top-[64%] h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full bg-gradient-to-br from-indigo-500/18 via-sky-600/12 to-fuchsia-500/18 blur-3xl" style={{ transform: `translateY(${scrollY * -0.1}px)`, animation: "pulse 4s ease-in-out infinite 2s" }} />
          </>
        )}
        <div className="absolute inset-0 overflow-visible">
          {particles.map((p, i) => (
            <div key={i} className={`absolute font-mono font-bold ${toneToText(p.hue)} ${p.layer === 1 ? "opacity-40" : "opacity-30"}`} style={{ left: `${p.left}%`, top: `${p.top}%`, fontSize: `${p.size}px`, transform: `translateY(${scrollY * (p.layer === 1 ? 0.018 : 0.03)}px)` }}>
              {p.symbol}
            </div>
          ))}
        </div>
      </div>

      {/* NAVBAR with PNG logo */}
      <Navbar activeSection={activeSection} />

      <main id="main">
        {/* HERO */}
        <section id="top" className="relative min-h-[100vh] pt-28 sm:pt-32 md:pt-36 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="relative z-10 mx-auto max-w-screen-xl w-full text-center">
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div className="inline-flex items-center space-x-2 rounded-full border border-white/25 bg-white/10 px-4 sm:px-5 py-2.5">
                <Zap className="h-4 w-4 text-fuchsia-400" />
                <span className="text-xs sm:text-sm font-medium text-gray-300">AI Developer & Software Engineer</span>
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h1 className="font-black tracking-tight leading-[1.05] text-balance" style={{ fontSize: "clamp(32px, 6.2vw, 80px)" }}>
                  <span className="relative block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">Creative</span>
                  <span className="relative block -mt-1 bg-gradient-to-r from-fuchsia-400 via-indigo-500 to-sky-500 bg-clip-text text-transparent">Developer</span>
                </h1>

                <p className="mx-auto max-w-[66ch] px-1 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-gray-300">
                  Crafting <span className="text-fuchsia-400 font-medium">intelligent solutions</span> with cutting-edge AI
                  and elegant software architecture. Turning <span className="text-sky-400 font-medium">complex problems</span> into simple, beautiful products.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <a href="/resume.pdf" className="chip text-[12px] sm:text-[13px] px-3 py-2 sm:px-3.5 sm:py-2.5">
                  <DownloadIcon /> Resume
                </a>
                <button className="chip text-[12px] sm:text-[13px] px-3 py-2 sm:px-3.5 sm:py-2.5" onClick={() => { navigator.clipboard.writeText("bimboodev@gmail.com"); flashCopy(); }}>
                  {copied ? <Check className="h-4 w-4" /> : <Mail className="h-4 w-4" />} {copied ? "Email copied" : "Copy email"}
                </button>
                <a href={SITE.socials.github} target="_blank" rel="noreferrer noopener" className="chip text-[12px] sm:text-[13px] px-3 py-2 sm:px-3.5 sm:py-2.5">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 pt-2 sm:flex-row">
                <a href="#projects" className="group relative min-w-[150px] sm:min-w-[180px] rounded-2xl bg-gradient-to-r from-fuchsia-500 via-indigo-600 to-sky-500 px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] shadow-[0_18px_50px_-18px_rgba(56,189,248,0.55)]">
                  <span className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-fuchsia-500 via-indigo-600 to-sky-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Code className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span>View My Work</span>
                  </span>
                </a>

                <a href="#contact" className="group relative min-w-[150px] sm:min-w-[180px] rounded-2xl border border-white/25 bg-white/10 px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/20">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="h-5 w-5 transition duration-300 group-hover:text-sky-400 group-hover:-rotate-12" />
                    <span>Get In Touch</span>
                  </span>
                </a>
              </div>

              {!reducedMotion && (
                <div className="mt-2 sm:mt-4 px-2">
                  <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <div className="ticker whitespace-nowrap text-[12px] sm:text-[13px] text-gray-300 py-2">
                      <span className="px-6">React</span>
                      <span className="px-6">TypeScript</span>
                      <span className="px-6">Tailwind</span>
                      <span className="px-6">Node</span>
                      <span className="px-6">FastAPI</span>
                      <span className="px-6">Postgres</span>
                      <span className="px-6">Prisma</span>
                      <span className="px-6">OpenAI</span>
                      <span className="px-6">LangChain</span>
                      <span className="px-6">RAG</span>
                      <span className="px-6">Vector DB</span>
                      <span className="px-6">Docker</span>
                      <span className="px-6">AWS</span>
                      <span className="px-6">React</span>
                      <span className="px-6">TypeScript</span>
                      <span className="px-6">Tailwind</span>
                      <span className="px-6">Node</span>
                      <span className="px-6">FastAPI</span>
                      <span className="px-6">Postgres</span>
                      <span className="px-6">Prisma</span>
                      <span className="px-6">OpenAI</span>
                      <span className="px-6">LangChain</span>
                      <span className="px-6">RAG</span>
                      <span className="px-6">Vector DB</span>
                      <span className="px-6">Docker</span>
                      <span className="px-6">AWS</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <HeroEdgeIcons scrollY={scrollY} isMobile={isMobile} reducedMotion={reducedMotion} />

            {!reducedMotion && (
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-[12]" aria-hidden>
                <div className="relative flex h-14 sm:h-16 w-7 sm:w-8 justify-center rounded-full border-2 border-white/45 bg-black/20">
                  <div className="mt-2 h-4 w-1 rounded-full bg-gradient-to-b from-sky-400 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[95rem]">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">About Me</h2>
              <p className="max-w-[66ch] mx-auto text-gray-300 text-[15px] sm:text-[16px]">
                I merge <span className="text-fuchsia-400 font-medium">ML capability</span> with <span className="text-sky-400 font-medium">tasteful UX</span> to ship products that feel effortless.
              </p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-fuchsia-500 to-sky-500 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 md:gap-16 items-start">
              <div className="space-y-6 sm:space-y-8">
                <p className="text-[15px] sm:text-[16px] md:text-[17px] text-gray-300 leading-relaxed">
                  I prototype quickly, validate with data, and harden systems with observability, clean APIs, and docs your future self will thank you for.
                </p>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <Stat number="5+" label="Years" accent="fuchsia" />
                  <Stat number="50+" label="Projects" accent="sky" />
                  <Stat number="99.9%" label="Uptime" accent="indigo" />
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Design for clarity", "Measure impact", "A11y matters", "Ship reliably"].map((v, i) => (
                    <span key={i} className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs border bg-white/5 border-white/15 text-gray-200">{v}</span>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="font-mono text-[12px] sm:text-[12.5px] text-gray-300 space-y-2" aria-label="Code sample describing skills">
                    <div>
                      <span className="text-fuchsia-400">const</span> <span className="text-sky-400">developer</span> = {"{"}
                    </div>
                    <div className="pl-4">
                      <span className="text-emerald-400">name</span>: <span className="text-yellow-300">"Bimbo"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-emerald-400">focus</span>: [<span className="text-yellow-300">"AI/ML"</span>, <span className="text-yellow-300">"Full Stack"</span>],
                    </div>
                    <div className="pl-4">
                      <span className="text-emerald-400">skills</span>: {"{"}
                    </div>
                    <div className="pl-8">
                      <span className="text-cyan-400">frontend</span>: [<span className="text-yellow-300">"React"</span>, <span className="text-yellow-300">"TypeScript"</span>],
                    </div>
                    <div className="pl-8">
                      <span className="text-cyan-400">backend</span>: [<span className="text-yellow-300">"Node.js"</span>, <span className="text-yellow-300">"Python"</span>],
                    </div>
                    <div className="pl-8">
                      <span className="text-cyan-400">ai</span>: [<span className="text-yellow-300">"OpenAI"</span>, <span className="text-yellow-300">"LangChain"</span>]
                    </div>
                    <div className="pl-4">{"}"}</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[95rem]">
            <div className="text-center mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">Featured Projects</h2>
              <p className="max-w-[66ch] mx-auto text-gray-300 text-[15px] sm:text-[16px]">Real client work you can click right now — with a stable, responsive live preview.</p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-fuchsia-500 to-sky-500 mx-auto rounded-full" />
            </div>

            <InteractiveProjectShowcase />
          </div>
        </section>

        {/* CASE STUDIES */}
        <section id="case-studies" className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[95rem]">
            <div className="text-center mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">Case Studies</h2>
              <p className="max-w-[66ch] mx-auto text-gray-300 text-[15px] sm:text-[16px]">Real impact with <span className="text-fuchsia-400 font-medium">measurable outcomes</span>. A snapshot of engagements I’ve shipped.</p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-fuchsia-500 to-sky-500 mx-auto rounded-full" />
            </div>

            <CaseStudiesSection />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[95rem]">
            <div className="text-center mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">Services</h2>
              <p className="max-w-[66ch] mx-auto text-gray-300 text-[15px] sm:text-[16px]">Choose a <span className="text-sky-400 font-medium">focused engagement</span> or a <span className="text-fuchsia-400 font-medium">full build</span>. I adapt to your team and timeline.</p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-fuchsia-500 to-sky-500 mx-auto rounded-full" />
            </div>

            <ServicesSection />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[95rem]">
            <div className="text-center mb-16 sm:mb-20 md:mb-24">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">Let's Connect</h2>
              <p className="max-w-[66ch] mx-auto text-gray-300 text-[15px] sm:text-[16px]">Ready to bring your ideas to life? Let’s discuss how we can collaborate on your next <span className="text-fuchsia-400 font-medium">innovative project</span>.</p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-fuchsia-500 to-sky-500 mx-auto rounded-full" />
            </div>

            <ContactSection />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative py-16 px-4 sm:px-6 md:px-10 lg:px-14 border-t border-white/10">
        <div className="mx-auto max-w-[95rem]">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="flex items-center gap-3 min-w-0">
              {/* Footer uses the same logo */}
              <img src={SITE.logo.src}  className="h-7 w-auto  select-none" />
              <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent truncate"></span>
            </div>

            <div className="flex items-center gap-6">
              <a href={SITE.socials.github} target="_blank" rel="noreferrer noopener" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
              <a href={SITE.socials.instagram} target="_blank" rel="noreferrer noopener" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href={SITE.socials.facebook} target="_blank" rel="noreferrer noopener" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href={SITE.socials.email} className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {SITE.name}. Crafted with passion and precision.
          </div>
        </div>
      </footer>

      {/* CHAT LAUNCHER */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        className="fixed z-[75] bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] h-14 w-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-indigo-600 to-sky-500 shadow-lg border border-white/20 flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
        aria-label={chatOpen ? "Close chat" : "Open chat"}
        aria-expanded={chatOpen}
      >
        {chatOpen ? <X className="h-7 w-7 text-white" /> : <Bot className="h-7 w-7 text-white" />}
      </button>

      {chatOpen && (
        <ChatPanel
          chatListRef={chatListRef}
          typing={typing}
          messages={chatMessages}
          value={chatInput}
          setValue={setChatInput}
          onSend={() => sendChat()}
          onQuick={(q) => sendChat(q)}
        />
      )}

      {/* KEYFRAMES + utility classes */}
      <style>{`
        @keyframes gridMove { 0% { transform: translate(0, 0); } 100% { transform: translate(32px, 32px); } }
        @keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes edgeFloat { 0%, 100% { transform: translate3d(-50%, -50%, 0) translateY(0); } 50% { transform: translate3d(-50%, -50%, 0) translateY(-10px); } }
        @keyframes tickerMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes dotPulse { 0%, 100% { opacity: .3; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
        @keyframes pulse { 0%,100% { opacity:.55; transform: scale(1); } 50% { opacity:.9; transform: scale(1.05); } }

        .animate-shimmer { background-size: 200% 200%; animation: shimmer 3.2s ease-in-out infinite; }
        .ticker { display: inline-block; min-width: 200%; animation: tickerMove 22s linear infinite; }

        .gpu-stable { transform: translateZ(0); backface-visibility: hidden; will-change: transform, opacity; }

        .chip { display:inline-flex; align-items:center; gap:.5rem; border-radius:9999px; padding:.5rem .75rem; border:1px solid rgba(255,255,255,.15); background:rgba(255,255,255,.06); color:#d1d5db; }
        .chip:hover { background:rgba(255,255,255,.12); color:white; }

        .skip-link { position: fixed; left: 8px; top: -40px; z-index: 100; padding: 8px 12px; border-radius: 10px; background: #111827; color: #e5e7eb; border: 1px solid rgba(255,255,255,.15); transition: top .2s ease; text-decoration: none; font-size: 14px; }
        .skip-link:focus { top: 8px; outline: 2px solid rgba(56,189,248,.6); }

        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer, .ticker { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
