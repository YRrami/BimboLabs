/* eslint-disable no-empty-pattern */
 
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  GaugeCircle,
  Lightbulb,
  Mail,
  Sparkles,
  Zap,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Github,
  Target,
  Rocket,
  Code,
  CalendarCheck,
  Quote,
  ChevronDown,
} from "lucide-react";

/* ===================== Local tokens & helpers ===================== */
const COLORS = {
  background: "#05061D",
  primary: "#4F46E5",
  accent: "#A855F7",
  text: "#F7F9FF",
  muted: "#A5ADCF",
} as const;

const SITE = {
  socials: {
    linkedin: "https://www.linkedin.com/",
  },
  contacts: {
    emailLabel: "hello@anonvic.com",
  },
} as const;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v = parseInt(h, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}
function withAlpha(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
const gradientPrimary = (angle = 140) =>
  `linear-gradient(${angle}deg, ${withAlpha(COLORS.primary, 0.18)}, ${withAlpha(
    COLORS.accent,
    0.14
  )}, ${withAlpha(COLORS.background, 0.92)})`;

const gradientSoft = (angle = 135, p = 0.14, a = 0.1, b = 0.88) =>
  `linear-gradient(${angle}deg, ${withAlpha(COLORS.primary, p)}, ${withAlpha(
    COLORS.accent,
    a
  )}, ${withAlpha(COLORS.background, b)})`;

function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 backdrop-blur-xl px-6 sm:px-10 md:px-14 py-12 sm:py-16 ${className ?? ""}`}
      style={{ background: gradientSoft(), boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)" }}
    >
      {children}
    </div>
  );
}

function Stat({
  number,
  label,
  accent,
}: {
  number: string;
  label: string;
  accent: "fuchsia" | "sky" | "indigo";
}) {
  const color =
    accent === "fuchsia"
      ? "text-[#4F46E5]"
      : accent === "sky"
      ? "text-white"
      : "text-[#A855F7]";
  return (
    <div
      className="text-center p-4 sm:p-5 rounded-xl border border-white/10"
      style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
    >
      <div className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${color}`}>
        {number}
      </div>
      <div className="text-[11px] sm:text-xs text-[#A5ADCF]">{label}</div>
    </div>
  );
}

/* ===================== small hooks ===================== */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
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
    const handler = (e: MediaQueryList | MediaQueryListEvent) =>
      setReduced("matches" in e ? e.matches : mq.matches);
    setReduced(mq.matches);
    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler as any);
      return () => mq.removeEventListener("change", handler as any);
    } else {
      (mq as any).addListener(handler);
      return () => (mq as any).removeListener(handler);
    }
  }, []);
  return reduced;
}

/* ===================== Hero floating social icons ===================== */
function HeroEdgeIcons({
  scrollY,
  isMobile,
  reducedMotion,
}: {
  scrollY: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const strength = 0.05;

  const desktop = {
    ig: { left: 10, top: 20 },
    in: { left: 26, top: 60 },
    tw: { left: 12, top: 84 },
    fb: { left: 90, top: 52 },
    gh: { left: 86, top: 86 },
  } as const;

  const mobile = {
    ig: { left: 12, top: 18 },
    in: { left: 28, top: 68 },
    tw: { left: 14, top: 88 },
    fb: { left: 88, top: 54 },
    gh: { left: 84, top: 86 },
  } as const;

  const items: Array<{
    key: keyof typeof desktop;
    Icon: React.ElementType;
    href: string;
    title: string;
    glow: string;
  }> = [
    {
      key: "ig",
      Icon: Instagram,
      href: "https://www.instagram.com/",
      title: "Instagram",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "in",
      Icon: Linkedin,
      href: SITE.socials.linkedin,
      title: "LinkedIn",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "tw",
      Icon: Twitter,
      href: "https://twitter.com/",
      title: "Twitter",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "fb",
      Icon: Facebook,
      href: "https://www.facebook.com/",
      title: "Facebook",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "gh",
      Icon: Github,
      href: "https://github.com/",
      title: "GitHub",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
  ];

  const sizeClass = isMobile ? "h-11 w-11" : "h-14 w-14 md:h-16 md:w-16";
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

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
            className="absolute pointer-events-auto group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60 rounded-2xl"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(-50%, -50%) translateY(${translateY}px)`,
              animation: reducedMotion
                ? undefined
                : `edgeFloat ${6 + (i % 3)}s ease-in-out ${(i * 0.2).toFixed(
                    2
                  )}s infinite`,
              willChange: "transform",
            }}
          >
            <span
              className={`absolute -inset-5 rounded-2xl blur-xl opacity-45 group-hover:opacity-80 transition bg-gradient-to-br ${glow}`}
            />
            <span
              className={`relative grid place-items-center ${sizeClass} rounded-2xl bg-[rgba(57,80,180,0.15)] border border-white/15 shadow-[0_22px_38px_-18px_rgba(106,13,173,0.35)] transition group-hover:scale-110 group-hover:-rotate-3`}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

/* ===================== Home page local data ===================== */
const overviewTiles = [
  {
    title: "Solutions",
    blurb:
      "Five modular programs spanning product, marketing, and automation. Embed a pod that ships in under 30 days.",
    path: "/solutions",
    tag: "Services",
    accent: "from-[#4F46E5] via-[#A855F7] to-[#312E81]",
  },
  {
    title: "Our Work",
    blurb:
      "Peek at live demos, dashboards, and campaign systems already compounding growth for partners.",
    path: "/our-work",
    tag: "Proof",
    accent: "from-[#38BDF8] via-[#0EA5E9] to-[#1E3A8A]",
  },
  {
    title: "About",
    blurb:
      "How we operate — rituals, documentation, and feedback loops that keep projects moving.",
    path: "/about",
    tag: "Team",
    accent: "from-[#F472B6] via-[#EC4899] to-[#9D174D]",
  },
  {
    title: "Contact",
    blurb:
      "Share your objectives and timelines. We'll map an onboarding sprint and show a plan in days.",
    path: "/contact",
    tag: "Start",
    accent: "from-[#34D399] via-[#10B981] to-[#065F46]",
  },
];

const highlightCards = [
  {
    title: "Operate Like An In-House Team",
    copy: "We plug into your tools and rituals — Slack, Linear, Notion — collaboration feels native.",
    icon: Compass,
  },
  {
    title: "Ship End-to-End",
    copy: "Strategy becomes shipped assets. One pod with shared KPIs, QA gates, and docs.",
    icon: GaugeCircle,
  },
  {
    title: "Measure Everything",
    copy: "Experiments and features land with tracking + dashboards so impact is obvious.",
    icon: Lightbulb,
  },
];

const outcomeMilestones = [
  {
    label: "6-week MVP launches",
    value: "12",
    detail:
      "Full-stack builds shipped in the past year with analytics, docs, and onboarding flows.",
  },
  {
    label: "Incremental revenue",
    value: "$4.8M",
    detail:
      "Attributed to lifecycle, paid media, and conversion optimization programs we maintain.",
  },
  {
    label: "Automation hours saved",
    value: "1.3K",
    detail:
      "Across RevOps, data pipelines, and AI copilots designed to unblock growth teams.",
  },
];

/* ===================== New sections (trust, process, quotes, faq, cta) ===================== */

function TrustBar() {
  type Client = { name: string; initials: string; accent: string };
  const clients: Client[] = [
    { name: "Orbit Labs",   initials: "OL", accent: "from-[#4F46E5] via-[#7C3AED] to-[#312E81]" },
    { name: "Northwind",    initials: "NW", accent: "from-[#38BDF8] via-[#0EA5E9] to-[#1E3A8A]" },
    { name: "Pulse AI",     initials: "PA", accent: "from-[#F97316] via-[#FB923C] to-[#78350F]" },
    { name: "Brightline",   initials: "BL", accent: "from-[#F472B6] via-[#EC4899] to-[#9D174D]" },
    { name: "Helios Co.",   initials: "HC", accent: "from-[#FACC15] via-[#FB923C] to-[#92400E]" },
    { name: "Nova Studio",  initials: "NS", accent: "from-[#34D399] via-[#10B981] to-[#065F46]" },
    { name: "Vertex",       initials: "VX", accent: "from-[#818CF8] via-[#6366F1] to-[#312E81]" },
    { name: "Summit",       initials: "SM", accent: "from-[#C084FC] via-[#A855F7] to-[#6B21A8]" },
  ];

  // two counter-scrolling lanes; duplicate for seamless loop
  const laneA = [...clients, ...clients, ...clients];
  const laneB = [...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()];

  const Chip = ({ c }: { c: Client }) => (
    <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3.5 sm:px-4 py-2 backdrop-blur">
      <span className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-[10px] sm:text-xs font-semibold uppercase text-white`}>
        {c.initials}
      </span>
      <span className="text-white/80">{c.name}</span>
    </span>
  );

  return (
    <section className="relative py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <div
          className="relative rounded-3xl border border-white/12 overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${withAlpha(COLORS.primary,0.10)}, ${withAlpha(COLORS.background,0.85)})`,
            boxShadow: "0 24px 60px -32px rgba(5,6,29,0.75)",
          }}
          aria-label="Previous clients"
        >
          <div className="px-4 sm:px-6 py-5">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-[0.25em] uppercase text-white/60">Trusted by teams like</p>
              <div className="hidden sm:flex gap-2">
                {["Brand-safe", "Fast onboarding", "Weekly demos"].map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[11px] rounded-full border border-white/12 text-white/75" style={{ backgroundColor: withAlpha(COLORS.primary,0.10) }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="marquee group" aria-hidden>
              <div className="marquee__track marquee__left" role="presentation">
                {laneA.map((c, i) => <Chip key={`A-${c.name}-${i}`} c={c} />)}
              </div>
              <div className="marquee__track marquee__right" role="presentation">
                {laneB.map((c, i) => <Chip key={`B-${c.name}-${i}`} c={c} />)}
              </div>
            </div>

            {/* Reduced-motion fallback: static grid */}
            <div className="sr-only motion-safe:hidden px-4 pb-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {clients.map((c) => <Chip key={`grid-${c.name}`} c={c} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee {
          --gap: 1rem;
          --speedA: 28s;
          --speedB: 34s;
          position: relative;
          padding: 0.25rem 0.75rem 0.75rem;
        }
        .marquee__track {
          display: flex;
          gap: var(--gap);
          white-space: nowrap;
          will-change: transform;
          padding: 0 0.75rem 0.75rem;
        }
        .marquee__left { animation: slideLeft var(--speedA) linear infinite; }
        .marquee__right { animation: slideRight var(--speedB) linear infinite; opacity: .9; }
        .marquee:hover .marquee__track { animation-play-state: paused; }
        @keyframes slideLeft  { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes slideRight { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
        @media (max-width: 640px) {
          .marquee { --speedA: 24s; --speedB: 28s; --gap: .75rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee__track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function ProcessMini() {
  const steps = [
    { icon: Target, title: "Discovery", text: "Clarify goals, constraints, and success metrics." },
    { icon: Rocket, title: "Roadmap", text: "Prioritize quick wins and define a 4–8 week plan." },
    { icon: Code, title: "Build", text: "Ship weekly with QA, tracking, and performance budgets." },
    { icon: CalendarCheck, title: "Scale", text: "Optimize funnels, expand channels, and automate ops." },
  ] as const;
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">A simple path to momentum</h2>
            <p className="mt-3 text-[#A5ADCF] max-w-[68ch] mx-auto text-[15px] sm:text-[16px]">
              You’ll see progress in week one and shipped value every week after.
            </p>
          </div>
          <ol className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-white/12 p-5"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15" style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}>
                    <s.icon className="h-5 w-5 text-white" />
                  </span>
                  <div className="text-white font-semibold">{String(i + 1).padStart(2, "0")} — {s.title}</div>
                </div>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </SectionShell>
      </div>
    </section>
  );
}

function QuotesRow() {
  const quotes = [
    { name: "Mariam B.", role: "Head of Growth, Retail", quote: "Anonvic launched new funnels in three weeks. Reporting ties straight to revenue.", result: "+162% ROAS" },
    { name: "J. Park", role: "VP Product, SaaS", quote: "The product pod shipped an MVP with analytics and docs. We onboarded customers that week.", result: "6-week MVP" },
    { name: "Noor K.", role: "Marketing Lead, Fintech", quote: "SEO workflows and media pacing finally live in one place. Exec reporting is trivial.", result: "+4x organic" },
  ] as const;

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {quotes.map((q, idx) => (
              <div
                key={idx}
                className="relative h-full rounded-3xl border border-white/12 p-6 sm:p-7"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
              >
                <Quote className="h-6 w-6 text-white/70" />
                <p className="mt-4 text-white/85 text-base leading-relaxed">“{q.quote}”</p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{q.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">{q.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    {q.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

function MiniFAQ() {
  const faqs = [
    { q: "How fast can we launch?", a: "Launch plan is ~2 weeks for a production landing. Larger scopes run 4–8 weeks." },
    { q: "Do you support Shopify or Stripe?", a: "Yes. We integrate Shopify storefronts or Stripe for payments, subscriptions, and invoicing." },
    { q: "What’s included in tracking?", a: "GA4 + server-side events (CAPI/gtag) where possible, source-of-truth dashboards, and monthly audits." },
    { q: "Can you handle Arabic or RTL?", a: "Yes. We ship multilingual and RTL-ready sites and content pipelines." },
  ] as const;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">FAQs</h2>
            <p className="mt-3 text-[#A5ADCF] max-w-[66ch] mx-auto text-[15px] sm:text-[16px]">
              Clear answers to common questions. Need more detail? Ping us anytime.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 text-left px-5 py-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-white">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`px-5 overflow-hidden transition-all ${isOpen ? "pb-5 max-h-48" : "pb-0 max-h-0"}`}>
                    <p className="text-sm text-[#A5ADCF]">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to move fast?</h3>
          <p className="mt-3 text-[#A5ADCF] max-w-[62ch] mx-auto">
            Share your goals and constraints. We’ll reply with a short plan, timeline, and resourcing recommendations.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/solutions"
              className="group relative rounded-2xl px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
              style={{ background: gradientPrimary(125), boxShadow: "0 24px 50px -32px rgba(79,70,229,0.65)", backdropFilter: "blur(20px)" }}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Explore Solutions <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="group relative rounded-2xl border border-white/15 px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
              style={{ backgroundColor: withAlpha(COLORS.accent, 0.12), borderColor: withAlpha(COLORS.primary, 0.25), backdropFilter: "blur(18px)" }}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Contact Anonvic <Mail className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

/* ===================== Existing sections ===================== */
function HomeOverview() {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Choose Your Next Move
            </h2>
            <p className="mt-4 text-[#A5ADCF] max-w-[66ch] mx-auto text-[15px] sm:text-[16px]">
              Dive into focused pages with sample roadmaps, deliverables, and playbooks. Each path is battle-tested and ready to tailor.
            </p>
          </div>

          <div className="grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {overviewTiles.map((tile) => (
              <Link
                key={tile.title}
                to={tile.path}
                className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 px-6 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
              >
                <span
                  className={`absolute -inset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-60 blur-2xl bg-gradient-to-br ${tile.accent}`}
                />
                <div className="relative space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-white/70">
                    <Sparkles className="h-3.5 w-3.5" />
                    {tile.tag}
                  </span>
                  <h3 className="text-2xl font-semibold text-white">{tile.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{tile.blurb}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                    Explore{" "}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Why operators pick Anonvic
              </h2>
              <p className="text-[#A5ADCF] text-[15px] sm:text-[16px] leading-relaxed">
                From discovery to deployment, we behave like an in-house team with agency speed. Pods include strategists, builders, and analysts so you never wait for handoffs.
              </p>
              <ul className="space-y-3 text-sm text-[#A5ADCF]">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" />
                  Weekly demos, experiment logs, and Loom recaps keep stakeholders aligned.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" />
                  Design systems, analytics, and marketing ops share one backlog for visibility.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" />
                  Every deliverable includes docs and enablement so your team can run with it.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" />
                  SLAs for response times, dashboards, and ad spend pacing are built-in.
                </li>
              </ul>
            </div>

            <div className="grid gap-4">
              {highlightCards.map(({ title, copy, icon: Icon }, idx) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-6"
                  style={{ boxShadow: "0 24px 60px -40px rgba(5,6,29,0.65)" }}
                >
                  <span className="absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-300 hover:opacity-60 bg-gradient-to-br from-[#4F46E5] via-[#A855F7] to-transparent" />
                  <div className="relative flex items-start gap-4">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                      style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{copy}</p>
                    </div>
                    <span className="ml-auto text-sm text-white/40 font-mono">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

function OutcomeShowcase() {
  return (
    <section className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem]">
        <SectionShell>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Recent outcomes from embedded pods
            </h2>
            <p className="mt-3 text-[#A5ADCF] text-[15px] sm:text-[16px] max-w-[70ch] mx-auto">
              We iterate alongside internal teams to unblock growth, product velocity, and lifecycle efficiency.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {outcomeMilestones.map(({ label, value, detail }) => (
              <div
                key={label}
                className="rounded-3xl border border-white/12 p-6"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
              >
                <span className="text-[12px] uppercase tracking-[0.3em] text-white/60">
                  {label}
                </span>
                <div className="mt-4 text-4xl font-extrabold text-white">{value}</div>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}

/* ===================== Page ===================== */
export default function App() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [] = useState(false);

  return (
    <>
      <section className="relative min-h-[100vh] pt-28 sm:pt-32 md:pt-36 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14">
        {/* subtle background accents */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at top, rgba(57,80,180,0.25), transparent 60%)",
            backgroundColor: COLORS.background,
          }}
        />
        <div className="relative z-10 mx-auto max-w-screen-xl w-full text-center">
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 sm:px-5 py-2.5 backdrop-blur-xl shadow-[0_12px_38px_-28px_rgba(79,70,229,0.85)]"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.16) }}
            >
              <Zap className="h-4 w-4 text-[#4F46E5]" />
              <span className="text-xs sm:text-sm font-medium text-white/80">
                Growth marketing × product engineering, embedded.
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#A855F7]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="space-y-3"
            >
              <h1
                className="font-black tracking-tight leading-[1.05] text-balance"
                style={{ fontSize: "clamp(32px, 6.2vw, 80px)" }}
              >
                <span className="relative block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Build momentum across every surface
                </span>
                <span className="relative block -mt-1 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] bg-clip-text text-transparent">
                  Marketing, product, and ops working in sync
                </span>
              </h1>
              <p className="mx-auto max-w-[66ch] px-1 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[#A5ADCF]">
                Anonvic pairs strategists with builders so idea → execution happens without the usual friction. Launch faster, iterate weekly, and measure impact where leadership already looks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              <Link
                to="/solutions"
                className="group relative min-w-[150px] sm:min-w-[180px] rounded-2xl px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                style={{
                  background: gradientPrimary(125),
                  boxShadow: "0 24px 50px -32px rgba(79,70,229,0.65)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>See Solution Pods</span>
                </span>
              </Link>

              <Link
                to="/contact"
                className="group relative min-w-[150px] sm:min-w-[180px] rounded-2xl border border-white/15 px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                style={{
                  backgroundColor: withAlpha(COLORS.accent, 0.12),
                  borderColor: withAlpha(COLORS.primary, 0.25),
                  backdropFilter: "blur(18px)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 transition duration-300 group-hover:text-[#4F46E5] group-hover:-translate-y-0.5" />
                  <span>Book an Intro Call</span>
                </span>
              </Link>
            </motion.div>

           

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mx-auto max-w-3xl pt-2">
              <Stat number="32+" label="Growth programs shipped" accent="indigo" />
              <Stat number="18" label="Product launches delivered" accent="fuchsia" />
              <Stat number="4.9/5" label="Average partner rating" accent="sky" />
            </div>
          </div>

          <HeroEdgeIcons
            scrollY={scrollY}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </div>
      </section>

      <TrustBar />
      <HomeOverview />
      <Highlights />
      <ProcessMini />
      <OutcomeShowcase />
      <QuotesRow />
      <MiniFAQ />
      <FinalCTA />

      {/* local styles used by home (chips + floats) */}
      <style>{`
        @keyframes edgeFloat { 0%, 100% { transform: translate3d(-50%, -50%, 0) translateY(0); } 50% { transform: translate3d(-50%, -50%, 0) translateY(-10px); } }
        .chip {
          display:inline-flex; align-items:center; gap:.5rem;
          border-radius:9999px; padding:.5rem .75rem;
          border:1px solid ${withAlpha(COLORS.primary, 0.45)};
          background:${withAlpha(COLORS.primary, 0.18)};
          color:${COLORS.text}; backdrop-filter: blur(14px);
          transition: transform .2s ease, background-color .2s ease, border-color .2s ease;
        }
        .chip:hover { background:${withAlpha(COLORS.primary, 0.28)}; border-color:${withAlpha(COLORS.primary, 0.6)}; transform: translateY(-1px); }
        /* gentle section separation */
        section + section { scroll-margin-top: 80px; }
      `}</style>
    </>
  );
}
