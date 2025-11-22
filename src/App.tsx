 
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx — Honest early-stage copy, SEO tuned, and TSX-safe

import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";

/* ===================== Local tokens & helpers ===================== */
const COLORS = {
  background: "#05061D",
  primary: "#4F46E5",
  accent: "#A855F7",
  text: "#F7F9FF",
  muted: "#A5ADCF",
} as const;

const SITE = {
  name: "Anonvic",
  domain: "https://www.anonvic.com",
  socials: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/",
  },
  contacts: { emailLabel: "business@anonvic.com" },
  description:
    "Anonvic is a friendly, two-market studio (Egypt & US) offering software and marketing services for SMEs. We build websites/apps, brand foundations, market analysis & strategy, ad setup (Meta/Google), and content — in English and Arabic.",
  keywords: [
    "SME software",
    "SME marketing Egypt US",
    "web and app development",
    "branding EN AR",
    "market analysis and strategy",
    "Meta Google ads setup",
    "content creation",
  ],
  locales: ["en", "ar"],
  regions: ["Egypt", "United States"],
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

/* ===================== Generic containers ===================== */
function SectionShell({
  children,
  className,
  as: Tag = "section",
  id,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-10 lg:px-14 ${
        className ?? ""
      }`}
    >
      <div className="mx-auto max-w-[95rem]">
        <div
          className="rounded-3xl border border-white/10 backdrop-blur-xl px-6 sm:px-10 md:px-14 py-12 sm:py-16"
          style={{
            background: gradientSoft(),
            boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
          }}
        >
          {children}
        </div>
      </div>
    </Tag>
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
    Icon: LucideIcon;
    href: string;
    title: string;
    glow: string;
  }> = [
    {
      key: "ig",
      Icon: Instagram,
      href: SITE.socials.instagram,
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
      href: SITE.socials.twitter,
      title: "Twitter",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "fb",
      Icon: Facebook,
      href: SITE.socials.facebook,
      title: "Facebook",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "gh",
      Icon: Github,
      href: SITE.socials.github,
      title: "GitHub",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
  ];

  const sizeClass = isMobile ? "h-11 w-11" : "h-14 w-14 md:h-16 md:w-16";
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-[11]" aria-hidden>
      {items.map(({ key, Icon, href, title, glow }, i) => {
        const base = isMobile ? mobile[key] : desktop[key];
        const left = clamp(base.left, isMobile ? 6 : 0, isMobile ? 94 : 100);
        const top = clamp(base.top, isMobile ? 9 : 0, isMobile ? 91 : 100);
        const translateY = reducedMotion ? 0 : scrollY * strength;

        const IconComp = Icon; // TSX-safe

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="me noopener noreferrer"
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
              <IconComp className="h-6 w-6 sm:h-7 sm:w-7 text-white" aria-hidden />
            </span>
          </a>
        );
      })}
    </div>
  );
}

/* ===================== Home page local data (truth-based) ===================== */
const overviewTiles = [
  {
    title: "Software",
    blurb:
      "Websites and small apps. We use modern stacks and keep the handoff clean.",
    path: "/solutions#software",
    tag: "Web & App",
    accent: "from-[#4F46E5] via-[#A855F7] to-[#312E81]",
  },
  {
    title: "Branding",
    blurb:
      "Foundations that scale: logo, colors, typography, and a voice that fits your market.",
    path: "/solutions#branding",
    tag: "Identity",
    accent: "from-[#38BDF8] via-[#0EA5E9] to-[#1E3A8A]",
  },
  {
    title: "Market Analysis & Strategy",
    blurb:
      "We study your audience and competitors, then shape a simple plan you can execute.",
    path: "/solutions#analysis",
    tag: "Strategy",
    accent: "from-[#F472B6] via-[#EC4899] to-[#9D174D]",
  },
  {
    title: "Ads & Content",
    blurb:
      "Meta/Google ad setup and helpful content in EN/AR to support steady growth.",
    path: "/solutions#ads-content",
    tag: "Acquisition",
    accent: "from-[#34D399] via-[#10B981] to-[#065F46]",
  },
];

const highlightCards: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    title: "SME-focused",
    copy: "We work with small to medium businesses and keep communication simple.",
    icon: Compass,
  },
  {
    title: "Friendly cadence",
    copy: "Weekly online calls and clear notes. Deliverables shared as we go.",
    icon: GaugeCircle,
  },
  {
    title: "Measure what matters",
    copy: "We set up basic tracking so you can see what’s working.",
    icon: Lightbulb,
  },
];

/* ===================== Sections ===================== */
function ProcessMini() {
  const steps: Array<{ icon: LucideIcon; title: string; text: string }> = [
    { icon: Target, title: "Discovery", text: "Short call to understand goals and constraints." },
    { icon: Rocket, title: "Plan", text: "We suggest a case-by-case timeline and a simple backlog." },
    { icon: Code, title: "Build", text: "Ship in small pieces with reviews and notes after each milestone." },
    { icon: CalendarCheck, title: "Iterate", text: "Weekly calls, feedback, and adjustments. No heavy handoffs." },
  ];
  return (
    <SectionShell ariaLabel="Delivery process">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">How we work</h2>
        <p className="mt-3 text-[#A5ADCF] max-w-[68ch] mx-auto text-[15px] sm:text-[16px]">
          Friendly and helpful. We keep things clear and move at a pace that fits your team.
        </p>
      </div>
      <ol className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Process steps">
        {steps.map((s, i) => {
          const IconComp = s.icon;
          return (
            <li
              key={s.title}
              className="rounded-2xl border border-white/12 p-5"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}
                  aria-hidden
                >
                  <IconComp className="h-5 w-5 text-white" />
                </span>
                <div className="text-white font-semibold">
                  {String(i + 1).padStart(2, "0")} — {s.title}
                </div>
              </div>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.text}</p>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}

function FinalCTA() {
  return (
    <SectionShell ariaLabel="Final call to action">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">Let’s talk about your project</h3>
        <p className="mt-3 text-[#A5ADCF] max-w-[62ch] mx-auto">
          We’re taking on SMEs in Egypt and the US. Send a short note about your goals and we’ll reply with next steps.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/solutions"
            className="group relative rounded-2xl px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            style={{
              background: gradientPrimary(125),
              boxShadow: "0 24px 50px -32px rgba(79,70,229,0.65)",
              backdropFilter: "blur(20px)",
            }}
            aria-label="Explore services"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Explore Services{" "}
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </Link>
          <a
            href={`mailto:${SITE.contacts.emailLabel}`}
            className="group relative rounded-2xl border border-white/15 px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              backgroundColor: withAlpha(COLORS.accent, 0.12),
              borderColor: withAlpha(COLORS.primary, 0.25),
              backdropFilter: "blur(18px)",
            }}
            aria-label="Email Anonvic"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Email {SITE.name} <Mail className="h-5 w-5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </SectionShell>
  );
}

function HomeOverview() {
  return (
    <SectionShell ariaLabel="Overview tiles">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
          What we can help with
        </h2>
        <p className="mt-4 text-[#A5ADCF] max-w-[66ch] mx-auto text-[15px] sm:text-[16px]">
          Pick the part you need right now. We’re flexible and match your pace.
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-4">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.title}
            to={tile.path}
            className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 px-6 py-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
            aria-label={`Open ${tile.title}`}
          >
            <span
              className={`absolute -inset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-60 blur-2xl bg-gradient-to-br ${tile.accent}`}
            />
            <div className="relative space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-white/70">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {tile.tag}
              </span>
              <h3 className="text-2xl font-semibold text-white">{tile.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{tile.blurb}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                Explore{" "}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

function Highlights() {
  return (
    <SectionShell ariaLabel="Why teams work with us">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Why SMEs pick {SITE.name}
          </h2>
          <p className="text-[#A5ADCF] text-[15px] sm:text-[16px] leading-relaxed">
            We’re a small studio. You’ll speak directly with the people doing the work. Clear notes,
            quick replies, and honest timelines.
          </p>
          <ul className="space-y-3 text-sm text-[#A5ADCF]">
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" aria-hidden />
              Weekly online calls and simple action lists.
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" aria-hidden />
              Bilingual delivery (EN/AR) for Egypt and US markets.
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" aria-hidden />
              Case-by-case timelines that fit your team’s bandwidth.
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" aria-hidden />
              Basic tracking from day one so progress is visible.
            </li>
          </ul>
        </div>

        <div className="grid gap-4">
          {highlightCards.map(({ title, copy, icon: Icon }, idx) => {
            const IconComp = Icon as LucideIcon;
            return (
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
                    aria-hidden
                  >
                    <IconComp className="h-5 w-5 text-white" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{copy}</p>
                  </div>
                  <span className="ml-auto text-sm text-white/40 font-mono" aria-hidden>
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

/* ===================== Page ===================== */
export default function App() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  // rAF-throttled scroll listener for smoother perf
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainId = "main";

  // Structured data (JSON-LD)
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    sameAs: Object.values(SITE.socials),
    areaServed: SITE.regions,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.contacts.emailLabel,
        contactType: "customer support",
        availableLanguage: SITE.locales,
      },
    ],
  } as const;

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.domain,
    inLanguage: SITE.locales,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.domain}/search?q={query}`,
      "query-input": "required name=query",
    },
  } as const;

  return (
    <>
      {/* SEO meta */}
      <Helmet>
        <title>{SITE.name} — Software & Marketing for SMEs (EN/AR)</title>
        <meta name="description" content={SITE.description} />
        <meta name="keywords" content={SITE.keywords.join(", ")} />
        <link rel="canonical" href={SITE.domain} />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${SITE.name} — Software & Marketing for SMEs`} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:url" content={SITE.domain} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE.name} — Software & Marketing for SMEs`} />
        <meta name="twitter:description" content={SITE.description} />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(siteJsonLd)}</script>
      </Helmet>

      {/* Skip Link */}
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:text-black focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="relative" aria-label="Hero header">
        <section className="relative min-h-[90vh] pt-28 sm:pt-32 md:pt-30 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14">
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
                <Zap className="h-4 w-4 text-[#4F46E5]" aria-hidden />
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  Friendly software & marketing for SMEs (EN/AR)
                </span>
                <Sparkles className="h-3.5 w-3.5 text-[#A855F7]" aria-hidden />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="space-y-3"
              >
                <h1
                  className="font-black tracking-tight leading-[1.05] text-balance"
                  style={{ fontSize: "clamp(32px, 6.2vw, 65px)" }}
                >
                  <span className="relative block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Build the basics. Grow steadily.
                  </span>
                  <span className="relative block -mt-1 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] bg-clip-text text-transparent">
                    Web & app, branding, analysis, ads, and content
                  </span>
                </h1>
                <p className="mx-auto max-w-[66ch] px-1 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[#A5ADCF]">
                  We serve small to medium businesses in Egypt and the US. Case-by-case timelines,
                  weekly online calls, and clear deliverables.
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
                  aria-label="See services"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                    <span>See Services</span>
                  </span>
                </Link>

                <a
                  href={`mailto:${SITE.contacts.emailLabel}`}
                  className="group relative min-w-[150px] sm:min-w-[180px] rounded-2xl border border-white/15 px-6 sm:px-7 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    backgroundColor: withAlpha(COLORS.accent, 0.12),
                    borderColor: withAlpha(COLORS.primary, 0.25),
                    backdropFilter: "blur(18px)",
                  }}
                  aria-label="Email us"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="h-5 w-5" aria-hidden />
                    <span>Email Us</span>
                  </span>
                </a>
              </motion.div>
            </div>

            <HeroEdgeIcons
              scrollY={scrollY}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          </div>
        </section>
      </header>

      {/* Main content */}
      <main id={mainId} role="main">
        <HomeOverview />
        <Highlights />
        <ProcessMini />
        <FinalCTA />
      </main>

      <footer className="px-4 sm:px-6 md:px-10 lg:px-14 py-10 text-center text-white/60">
        <p className="text-sm">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Contact:{" "}
          <a href={`mailto:${SITE.contacts.emailLabel}`} className="underline">
            {SITE.contacts.emailLabel}
          </a>
        </p>
      </footer>

      {/* local styles used by home (chips + floats) */}
      <style>{`
        @keyframes edgeFloat {
          0%, 100% { transform: translate3d(-50%, -50%, 0) translateY(0); }
          50% { transform: translate3d(-50%, -50%, 0) translateY(-10px); }
        }
        .chip {
          display:inline-flex; align-items:center; gap:.5rem;
          border-radius:9999px; padding:.5rem .75rem;
          border:1px solid ${withAlpha(COLORS.primary, 0.45)};
          background:${withAlpha(COLORS.primary, 0.18)};
          color:${COLORS.text}; backdrop-filter: blur(14px);
          transition: transform .2s ease, background-color .2s ease, border-color .2s ease;
        }
        .chip:hover { background:${withAlpha(COLORS.primary, 0.28)}; border-color:${withAlpha(COLORS.primary, 0.6)}; transform: translateY(-1px); }
        section + section { scroll-margin-top: 80px; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
        .focus\\:not-sr-only:focus { position: static; width: auto; height: auto; margin: 0; overflow: visible; clip: auto; white-space: normal; }
      `}</style>
    </>
  );
}
