/* eslint-disable @typescript-eslint/no-explicit-any */
// src/App.tsx — Lean, readable, and TSX-safe

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
    "Anonvic is a two-market studio (Egypt & US) helping SMEs with software and marketing — websites, apps, brand foundations, market analysis, ads, and content in English and Arabic.",
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

const gradientSoft = (angle = 135, p = 0.16, a = 0.12, b = 0.9) =>
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
      className={`relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-10 ${
        className ?? ""
      }`}
    >
      <div className="mx-auto max-w-[90rem]">
        <div
          className="rounded-[2rem] border border-white/10 backdrop-blur-2xl px-6 sm:px-10 md:px-12 lg:px-14 py-10 sm:py-14 md:py-16"
          style={{
            background: gradientSoft(),
            boxShadow: "0 36px 90px -48px rgba(0,0,0,0.9)",
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

  // Pushed to the outer frame so they don't crowd the hero text
  const desktop = {
    ig: { left: 6, top: 18 },
    in: { left: 8, top: 78 },
    tw: { left: 94, top: 22 },
    fb: { left: 92, top: 76 },
    gh: { left: 50, top: 94 },
  } as const;

  const mobile = {
    ig: { left: 10, top: 16 },
    in: { left: 12, top: 86 },
    tw: { left: 90, top: 18 },
    fb: { left: 88, top: 90 },
    gh: { left: 50, top: 96 },
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
    <div
      className="pointer-events-none absolute inset-0 overflow-visible z-[11]"
      aria-hidden
    >
      {items.map(({ key, Icon, href, title, glow }, i) => {
        const base = isMobile ? mobile[key] : desktop[key];
        const left = clamp(base.left, isMobile ? 4 : 2, isMobile ? 96 : 98);
        const top = clamp(base.top, isMobile ? 8 : 6, isMobile ? 96 : 98);
        const translateY = reducedMotion ? 0 : scrollY * strength;

        const IconComp = Icon;

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
              className={`relative grid place-items-center ${sizeClass} rounded-2xl bg-[rgba(57,80,180,0.18)] border border-white/15 shadow-[0_22px_38px_-18px_rgba(106,13,173,0.4)] transition group-hover:scale-110 group-hover:-rotate-3`}
            >
              <IconComp className="h-6 w-6 sm:h-7 sm:w-7 text-white" aria-hidden />
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
    title: "Software",
    blurb: "Modern websites and small apps built on clean, maintainable stacks.",
    path: "/solutions#software",
    tag: "Web & App",
    accent: "from-[#4F46E5] via-[#A855F7] to-[#312E81]",
  },
  {
    title: "Branding",
    blurb: "Logo, colors, type, and tone so your brand feels consistent everywhere.",
    path: "/solutions#branding",
    tag: "Identity",
    accent: "from-[#38BDF8] via-[#0EA5E9] to-[#1E3A8A]",
  },
  {
    title: "Market Strategy",
    blurb: "Audience, competition, and a simple plan your team can actually use.",
    path: "/solutions#analysis",
    tag: "Strategy",
    accent: "from-[#F472B6] via-[#EC4899] to-[#9D174D]",
  },
  {
    title: "Ads & Content",
    blurb: "Meta/Google setup and clear content in EN/AR to support steady growth.",
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
    title: "Focused on SMEs",
    copy: "We work with small and mid-size teams, not giant org charts.",
    icon: Compass,
  },
  {
    title: "Clear rhythm",
    copy: "Weekly calls, summaries, and visible progress each sprint.",
    icon: GaugeCircle,
  },
  {
    title: "Data-aware",
    copy: "Basic tracking from day one so you see what’s moving the needle.",
    icon: Lightbulb,
  },
];

/* ===================== Sections ===================== */
function ProcessMini() {
  const steps: Array<{ icon: LucideIcon; title: string; text: string }> = [
    {
      icon: Target,
      title: "Discovery",
      text: "Short call to align on goals, market, and constraints.",
    },
    {
      icon: Rocket,
      title: "Plan",
      text: "Simple roadmap with a lean backlog and key milestones.",
    },
    {
      icon: Code,
      title: "Build",
      text: "Ship in small pieces with frequent, low-friction reviews.",
    },
    {
      icon: CalendarCheck,
      title: "Iterate",
      text: "Weekly feedback loops and tweaks instead of big handoffs.",
    },
  ];
  return (
    <SectionShell ariaLabel="Delivery process">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          How we work
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#A5ADCF] max-w-[60ch] mx-auto leading-relaxed">
          A simple, transparent flow from first call to live results — no heavy
          documentation, just clear steps.
        </p>
      </div>
      <ol
        className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Process steps"
      >
        {steps.map((s, i) => {
          const IconComp = s.icon;
          return (
            <li
              key={s.title}
              className="rounded-2xl border border-white/12 p-6 sm:p-7 flex flex-col h-full"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
                  aria-hidden
                >
                  <IconComp className="h-5 w-5 text-white" />
                </span>
                <div className="text-white font-semibold text-base sm:text-lg">
                  {String(i + 1).padStart(2, "0")} — {s.title}
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
                {s.text}
              </p>
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
      <div className="text-center max-w-[52rem] mx-auto">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Ready to scope your project?
        </h3>
        <p className="mt-4 text-base sm:text-lg text-[#A5ADCF] leading-relaxed">
          We’re currently working with SMEs in Egypt and the US. Send a short
          note about what you need and we’ll follow up with next steps.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/solutions"
            className="group relative rounded-2xl px-7 sm:px-8 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            style={{
              background: gradientPrimary(125),
              boxShadow: "0 26px 60px -34px rgba(79,70,229,0.7)",
              backdropFilter: "blur(20px)",
            }}
            aria-label="Explore services"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Explore Services
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </Link>
          <a
            href={`mailto:${SITE.contacts.emailLabel}`}
            className="group relative rounded-2xl border border-white/18 px-7 sm:px-8 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              backgroundColor: withAlpha(COLORS.accent, 0.14),
              borderColor: withAlpha(COLORS.primary, 0.28),
              backdropFilter: "blur(18px)",
            }}
            aria-label="Email Anonvic"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Email {SITE.name}
              <Mail className="h-5 w-5" aria-hidden />
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
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
          What we can help with
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#A5ADCF] max-w-[60ch] mx-auto leading-relaxed">
          Start with one piece or mix a few. We adapt to your pace, budget, and
          team size.
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-4">
        {overviewTiles.map((tile) => (
          <Link
            key={tile.title}
            to={tile.path}
            className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] px-6 py-8 sm:px-7 sm:py-9 transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
            aria-label={`Open ${tile.title}`}
          >
            <span
              className={`absolute -inset-2 opacity-0 transition-opacity duration-300 group-hover:opacity-60 blur-2xl bg-gradient-to-br ${tile.accent}`}
            />
            <div className="relative space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-white/70">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {tile.tag}
              </span>
              <h3 className="text-2xl sm:text-2xl font-semibold text-white">
                {tile.title}
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {tile.blurb}
              </p>
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white/90">
                Explore
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
        <div className="space-y-6 sm:space-y-7">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Why SMEs pick {SITE.name}
          </h2>
          <p className="text-base sm:text-lg text-[#A5ADCF] leading-relaxed max-w-[60ch]">
            You speak directly with the people doing the work. Fewer layers,
            faster answers, and realistic timelines.
          </p>
          <ul className="space-y-3.5 text-sm sm:text-base text-[#A5ADCF]">
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-1" aria-hidden />
              Weekly online calls with clear next steps after each session.
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-1" aria-hidden />
              Bilingual delivery (EN/AR) tuned for Egypt and US markets.
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-4 w-4 text-[#4F46E5] mt-1" aria-hidden />
              Case-by-case pacing that fits your internal capacity.
            </li>
          </ul>
        </div>

        <div className="grid gap-4">
          {highlightCards.map(({ title, copy, icon: Icon }, idx) => {
            const IconComp = Icon as LucideIcon;
            return (
              <div
                key={title}
                className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] p-6 sm:p-7"
                style={{ boxShadow: "0 26px 70px -42px rgba(5,6,29,0.75)" }}
              >
                <span className="absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-300 hover:opacity-60 bg-gradient-to-br from-[#4F46E5] via-[#A855F7] to-transparent" />
                <div className="relative flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.2) }}
                    aria-hidden
                  >
                    <IconComp className="h-5 w-5 text-white" />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                      {copy}
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs sm:text-sm text-white/40 font-mono"
                    aria-hidden
                  >
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

  // SEO meta and JSON-LD
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${SITE.name} — Software & Marketing for SMEs (EN/AR)`;

    const ensureMeta = (attr: string, key: string, content: string) => {
      const sel = `meta[${attr}="${key}"]`;
      let el = document.head.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        (el as any).dataset._injected = "1";
      }
      el.content = content;
      return el;
    };

    ensureMeta("name", "description", SITE.description);
    ensureMeta("name", "keywords", SITE.keywords.join(", "));
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", `${SITE.name} — Software & Marketing for SMEs`);
    ensureMeta("name", "twitter:description", SITE.description);
    ensureMeta("property", "og:site_name", SITE.name);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:title", `${SITE.name} — Software & Marketing for SMEs`);
    ensureMeta("property", "og:description", SITE.description);
    ensureMeta("property", "og:url", SITE.domain);

    // canonical link
    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = SITE.domain;
      canonical.dataset._injected = "1";
      document.head.appendChild(canonical);
    } else {
      canonical.href = SITE.domain;
    }

    // JSON-LD scripts
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

    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.textContent = JSON.stringify(orgJsonLd);
    s1.dataset._injected = "1";
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.textContent = JSON.stringify(siteJsonLd);
    s2.dataset._injected = "1";
    document.head.appendChild(s2);

    return () => {
      document.title = prevTitle;
      document.head
        .querySelectorAll('[data-_injected="1"]')
        .forEach((n) => n.remove());
    };
  }, []);

  return (
    <>
      {/* Skip Link */}
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:text-black focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="relative" aria-label="Hero header">
        <section className="relative min-h-[92vh] pt-28 sm:pt-32 md:pt-32 flex items-center justify-center px-4 sm:px-6 lg:px-10">
          {/* base background */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{
              background:
                "radial-gradient(circle at top, rgba(57,80,180,0.28), transparent 60%)",
              backgroundColor: COLORS.background,
            }}
          />

          {/* animated blobs to make the hero feel alive */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
            <div className="hero-blob hero-blob-3" />
          </div>

          <div className="relative z-10 mx-auto max-w-screen-xl w-full">
            {/* keep content centered, icons float around on the edges */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 sm:px-6 py-2.5 sm:py-3 backdrop-blur-xl shadow-[0_16px_40px_-28px_rgba(79,70,229,0.9)] bg-white/5"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}
                >
                  <Zap className="h-4 w-4 text-[#C4C6FF]" aria-hidden />
                  <span className="text-sm sm:text-base font-medium text-white/85">
                    Software & marketing for SMEs in Egypt and the US
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-[#F9A8FF]" aria-hidden />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h1
                    className="font-black tracking-tight leading-[1.05] text-balance"
                    style={{ fontSize: "clamp(2.4rem, 6.4vw, 4.4rem)" }}
                  >
                    <span className="relative block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      Build the essentials. Grow steadily.
                    </span>
                    <span className="relative block -mt-1 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] bg-clip-text text-transparent">
                      Web, brand, strategy, ads, and content in EN/AR.
                    </span>
                  </h1>
                  <p className="mx-auto max-w-[60ch] px-1 text-base sm:text-lg md:text-xl leading-relaxed text-[#A5ADCF]">
                    A compact studio for SMEs. Simple timelines, weekly online
                    check-ins, and clear deliverables you can share with your team.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                >
                  <Link
                    to="/solutions"
                    className="group relative min-w-[170px] sm:min-w-[190px] rounded-2xl px-7 sm:px-8 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                    style={{
                      background: gradientPrimary(125),
                      boxShadow: "0 28px 60px -34px rgba(79,70,229,0.8)",
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
                    className="group relative min-w-[170px] sm:min-w-[190px] rounded-2xl border border-white/16 px-7 sm:px-8 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                    style={{
                      backgroundColor: withAlpha(COLORS.accent, 0.14),
                      borderColor: withAlpha(COLORS.primary, 0.26),
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

                {/* Scroll indicator — subtle cue to explore more */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                  className="mt-8 sm:mt-10 flex justify-center"
                >
                  <div className="flex flex-col items-center gap-2 text-[0.7rem] sm:text-xs text-white/60 uppercase tracking-[0.24em]">
                    <span>Scroll to explore</span>
                    <span className="scroll-indicator-line" aria-hidden />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Edge icons float around the frame, away from the text block */}
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

      <footer className="px-4 sm:px-6 lg:px-10 py-10 sm:py-12 text-center text-white/65 border-t border-white/10 mt-8">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p className="text-xs sm:text-sm mt-2">
          Contact:{" "}
          <a href={`mailto:${SITE.contacts.emailLabel}`} className="underline">
            {SITE.contacts.emailLabel}
          </a>
        </p>
      </footer>

      {/* local styles used by home (chips + floats + blobs + scroll indicator) */}
      <style>{`
        @keyframes edgeFloat {
          0%, 100% { transform: translate3d(-50%, -50%, 0) translateY(0); }
          50% { transform: translate3d(-50%, -50%, 0) translateY(-10px); }
        }

        .chip {
          display:inline-flex; align-items:center; gap:.5rem;
          border-radius:9999px; padding:.55rem .85rem;
          border:1px solid ${withAlpha(COLORS.primary, 0.45)};
          background:${withAlpha(COLORS.primary, 0.2)};
          color:${COLORS.text}; backdrop-filter: blur(14px);
          font-size:0.875rem;
          transition: transform .2s ease, background-color .2s ease, border-color .2s ease;
        }
        .chip:hover {
          background:${withAlpha(COLORS.primary, 0.28)};
          border-color:${withAlpha(COLORS.primary, 0.65)};
          transform: translateY(-1px);
        }

        section + section { scroll-margin-top: 88px; }

        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static; width: auto; height: auto; margin: 0;
          overflow: visible; clip: auto; white-space: normal;
        }

        /* Hero animated blobs */
        .hero-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(50px);
          opacity: 0.7;
          mix-blend-mode: screen;
        }
        .hero-blob-1 {
          width: 260px;
          height: 260px;
          left: -100px;
          top: 10px;
          background: radial-gradient(circle at 30% 30%, rgba(79,70,229,0.9), transparent 60%);
          animation: blobFloat1 22s ease-in-out infinite;
        }
        .hero-blob-2 {
          width: 280px;
          height: 280px;
          right: -80px;
          top: 30%;
          background: radial-gradient(circle at 70% 30%, rgba(168,85,247,0.9), transparent 60%);
          animation: blobFloat2 26s ease-in-out infinite;
        }
        .hero-blob-3 {
          width: 260px;
          height: 260px;
          left: 20%;
          bottom: -120px;
          background: radial-gradient(circle at 50% 50%, rgba(59,130,246,0.75), transparent 65%);
          animation: blobFloat3 30s ease-in-out infinite;
        }

        @keyframes blobFloat1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(12px, -18px, 0) scale(1.05); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-18px, 16px, 0) scale(1.06); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, -10px, 0) scale(1.04); }
        }

        /* Scroll indicator */
        .scroll-indicator-line {
          position: relative;
          width: 1.5px;
          height: 34px;
          border-radius: 9999px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.12));
          overflow: hidden;
        }
        .scroll-indicator-line::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -40%;
          height: 40%;
          background: rgba(255,255,255,0.95);
          box-shadow: 0 0 10px rgba(255,255,255,0.7);
          animation: scrollPulse 1.4s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(150%); opacity: 0; }
        }
      `}</style>
    </>
  );
}
