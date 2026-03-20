// src/pages/AboutPage.tsx
// "Even better" About page:
// - Stronger visual system (Solutions-like hero + premium white sections + dark closing CTA)
// - Scroll progress bar + sticky in-page nav
// - Count-up metrics (runs once when in view, respects reduced-motion)
// - Process timeline with animated spine + step cards
// - Testimonials carousel (autoplay + arrows + keyboard support)
// - Logos marquee (local assets first, fallback list)
// - FAQ accordion
// - No page-level background overrides that fight SiteLayout
//
// Requires: framer-motion, lucide-react (already in your project)
// Uses: SectionShell + COLORS from SiteLayout (global theme consistency)

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ExternalLink,
  Gauge,
  HelpCircle,
  Layers,
  Quote,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { SectionShell, COLORS } from "../components/layout/SiteLayout";

/* ===================== utils ===================== */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const withAlpha = (color: string, alpha: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return reduced;
}

function useIsInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView } as const;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.15, 0.25, 0.35] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}

/* ===================== motion primitives ===================== */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

function DarkKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
      {children}
    </div>
  );
}
function LightKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-700">
      {children}
    </div>
  );
}

function UseCaseBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{ background: COLORS.background }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.62)_0%,_rgba(5,0,19,1)_45%,_rgba(2,0,7,1)_80%)]" />

      {/* spotlights */}
      <div
        className="absolute -top-24 left-[10%] h-[520px] w-[520px] rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.30), transparent 68%)",
        }}
      />
      <div
        className="absolute top-[6%] right-[6%] h-[520px] w-[520px] rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle, rgba(190,242,100,0.16), transparent 70%)",
        }}
      />

      {/* ribbons - disable on mobile */}
      {!isMobile && (
        <>
          <div
            aria-hidden
            className="animate-beam-1 absolute left-[-12%] right-[-28%] top-[36%] h-64"
            style={{
              background:
                "linear-gradient(120deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.22) 35%, rgba(168,85,247,0.16) 60%, rgba(190,242,100,0) 100%)",
              filter: "blur(0px)",
              opacity: 0.03,
            }}
          />
          <div
            aria-hidden
            className="animate-beam-2 absolute left-[-20%] right-[-5%] top-[58%] h-56"
            style={{
              background:
                "linear-gradient(120deg, rgba(129,140,248,0) 0%, rgba(129,140,248,0.20) 40%, rgba(56,189,248,0.18) 70%, rgba(56,189,248,0) 100%)",
              filter: "blur(0px)",
              opacity: 0.03,
            }}
          />
        </>
      )}
    </div>
  );
}

function SoftGridNoise() {
  return (
    <>
      <div
        aria-hidden
        className="animate-grid pointer-events-none absolute inset-0 z-10 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 40% 10%, black 0, black 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at 40% 10%, black 0, black 55%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]" />
    </>
  );
}

/* ===================== data ===================== */

const principles = [
  "Kickoff within five business days once scope is signed",
  "Weekly demos + Loom recaps + a live backlog",
  "Documentation-first handoff: assets + SOPs + dashboards",
];

const valueCards = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Weekly shipping cadence",
    desc: "Small batches, tight feedback loops. No months of ambiguity.",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Performance-first builds",
    desc: "Fast pages and clean implementation that’s easy to extend.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Measurable outcomes",
    desc: "Tracking + reporting so iteration becomes obvious, not stressful.",
  },
];

const processSteps = [
  {
    title: "Kickoff + access",
    detail:
      "Align scope, pull credentials, map events, and set a clear success metric.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Build sprint",
    detail:
      "Design → implement → QA. Everything ships with tracking and a plan to iterate.",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: "Weekly demo + iteration",
    detail:
      "Ship, review results, and lock the next sprint. Playbook grows every week.",
    icon: <Zap className="h-5 w-5" />,
  },
];

const leadership = [
  {
    name: "Nora Hussein",
    role: "Head of Product Engineering",
    summary:
      "Design systems, web performance budgets, and DX improvements.",
    tags: ["Design systems", "Performance", "DX"],
  },
  {
    name: "Karim El Saeed",
    role: "Director of Growth",
    summary:
      "Acquisition strategy, creative experiments, and analytics stacks.",
    tags: ["Paid media", "Experimentation", "Analytics"],
  },
  {
    name: "Mina Adel",
    role: "Lead Data & Automation",
    summary:
      "Attribution pipelines + AI copilots so operators get answers fast.",
    tags: ["Attribution", "Automation", "AI/RAG"],
  },
];

const testimonials = [
  {
    name: "Mariam B.",
    role: "Head of Growth, Retail",
    quote:
      "Anonvic launched new funnels in three weeks. We now run weekly creative tests with clean revenue attribution.",
    result: "+162% ROAS",
  },
  {
    name: "Omar S.",
    role: "Founder, DTC",
    quote:
      "They rebuilt our stack, automated retention, and returning customer rate spiked within the first month.",
    result: "+38% LTV",
  },
  {
    name: "J. Park",
    role: "VP Product, SaaS",
    quote:
      "The pod shipped an MVP with analytics and docs. We onboarded customers the same week it went live.",
    result: "6-week MVP",
  },
  {
    name: "Noor K.",
    role: "Marketing Lead, Fintech",
    quote:
      "SEO workflows, social playbooks, and pacing live in one place. Reporting is a breeze for the exec team.",
    result: "+4x organic",
  },
] as const;

const faqs = [
  {
    q: "How fast can we start?",
    a: "After scope is confirmed, kickoff typically happens within five business days. We set access, dashboards, and backlog on day one.",
  },
  {
    q: "Do you ship design + development?",
    a: "Yes. We pair product design with engineering (and growth when needed) so pages, tools, and tracking ship together.",
  },
  {
    q: "What do we keep after the engagement?",
    a: "Everything: source code, design files, tracking documentation, dashboards, SOPs, and a prioritized backlog.",
  },
  {
    q: "Can you work with our existing stack?",
    a: "Yes. We plug into whatever you use (Slack/Notion/Linear, GA4, Meta/Google ads, CRM) and keep handoffs documented.",
  },
];

/* ===================== logos ===================== */

const fileNameToTitle = (p: string) => {
  const base = p.split("/").pop() || "";
  const name = base.replace(/\.[a-zA-Z0-9]+$/, "");
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()).trim();
};
type Logo = { alt: string; src: string };

function useCompanyLogos(): Logo[] {
  return useMemo(() => {
    const g1 = import.meta.glob<string>("../assets/companies/*.{png,jpg,jpeg,svg,webp}", {
      eager: true,
      query: "?url",
      import: "default",
    }) as Record<string, string>;

    const g2 = import.meta.glob<string>("../companies/*.{png,jpg,jpeg,svg,webp}", {
      eager: true,
      query: "?url",
      import: "default",
    }) as Record<string, string>;

    const merged = { ...g1, ...g2 };
    const locals = Object.entries(merged)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url]) => ({ alt: fileNameToTitle(path), src: url }));

    if (locals.length) return locals;

    return [
      { alt: "Zapier", src: "https://cdn.simpleicons.org/zapier/000000" },
      { alt: "Shopify", src: "https://cdn.simpleicons.org/shopify/000000" },
      { alt: "Vimeo", src: "https://cdn.simpleicons.org/vimeo/000000" },
      { alt: "SoundCloud", src: "https://cdn.simpleicons.org/soundcloud/000000" },
      { alt: "eBay", src: "https://cdn.simpleicons.org/ebay/000000" },
      { alt: "Notion", src: "https://cdn.simpleicons.org/notion/000000" },
      { alt: "Slack", src: "https://cdn.simpleicons.org/slack/000000" },
    ];
  }, []);
}

function LogosMarquee({ logos }: { logos: Logo[] }) {
  const reduced = usePrefersReducedMotion();
  const track = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className="rounded-[46px] bg-[#F3F0FF] px-6 py-10 shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-black tracking-[0.18em] text-slate-600">
          TRUSTED BY TEAMS & BRANDS
        </div>
        <div className="text-xs text-slate-500">
          {reduced ? "Reduced motion" : "Auto-scroll • hover to pause"}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[40px]">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-[#F3F0FF] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-gradient-to-l from-[#F3F0FF] to-transparent" />

        <div className="lp-marquee" aria-label="Previous clients">
          <div className={cn("lp-track", reduced && "lp-paused")}>
            {track.map((l, i) => (
              <div key={`${l.alt}-${i}`} className="lp-item">
                <div className="lp-chip">
                  <img src={l.src} alt={l.alt} className="lp-logo" draggable={false} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .lp-marquee { width: 100%; overflow: hidden; }
          .lp-track {
            display: flex;
            align-items: center;
            width: max-content;
            animation: lp 20s linear infinite;
          }
          .lp-marquee:hover .lp-track { animation-play-state: paused; }
          .lp-paused { animation: none !important; }
          .lp-item { flex: 0 0 auto; padding: 0 18px; display: grid; place-items: center; }
          .lp-chip {
            height: 66px;
            min-width: 150px;
            padding: 0 22px;
            display: grid;
            place-items: center;
            border-radius: 999px;
            background: rgba(255,255,255,0.72);
            border: 1px solid rgba(15,23,42,0.09);
            box-shadow: 0 14px 40px rgba(15,23,42,0.06);
            backdrop-filter: none;
            transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
          }
          .lp-chip:hover {
            transform: translateY(-2px);
            box-shadow: 0 22px 60px rgba(15,23,42,0.12);
            border-color: rgba(15,23,42,0.14);
          }
          .lp-logo {
            height: 36px;
            width: auto;
            object-fit: contain;
            opacity: 0.92;
            filter: grayscale(1);
            transition: opacity 220ms ease, filter 220ms ease, transform 220ms ease;
          }
          .lp-chip:hover .lp-logo {
            opacity: 1;
            filter: grayscale(0);
            transform: scale(1.02);
          }
          @keyframes lp { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
          @media (max-width: 640px) {
            .lp-item { padding: 0 10px; }
            .lp-chip { height: 58px; min-width: 128px; padding: 0 16px; }
            .lp-logo { height: 30px; }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ===================== count up ===================== */

function useCountUp({
  from,
  to,
  durationMs,
  start,
  reducedMotion,
}: {
  from: number;
  to: number;
  durationMs: number;
  start: boolean;
  reducedMotion: boolean;
}) {
  const [value, setValue] = useState(from);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (startedRef.current) return;
    startedRef.current = true;

    if (reducedMotion) {
      setValue(to);
      return;
    }

    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic-ish
      setValue(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [start, from, to, durationMs, reducedMotion]);

  return value;
}

function MetricCard({
  label,
  display,
  accent,
}: {
  label: string;
  display: React.ReactNode;
  accent: "primary" | "accent" | "lime";
}) {
  const bg =
    accent === "primary"
      ? withAlpha(COLORS.primary, 0.09)
      : accent === "accent"
      ? withAlpha(COLORS.accent, 0.08)
      : "rgba(190,242,100,0.14)";

  const border =
    accent === "primary"
      ? withAlpha(COLORS.primary, 0.22)
      : accent === "accent"
      ? withAlpha(COLORS.accent, 0.20)
      : "rgba(190,242,100,0.25)";

  return (
    <div
      className="rounded-[28px] border p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
      style={{ background: bg, borderColor: border }}
    >
      <div className="text-3xl font-black tracking-tight text-slate-900 tabular-nums">
        {display}
      </div>
      <div className="mt-1 text-xs font-semibold tracking-[0.12em] text-slate-600">
        {label.toUpperCase()}
      </div>
    </div>
  );
}

/* ===================== testimonials carousel ===================== */

function useAutoRotate(enabled: boolean, length: number, delay = 6500) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    timer.current = window.setInterval(
      () => setIndex((i) => (i + 1) % length),
      delay
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [enabled, length, delay]);

  return [index, setIndex] as const;
}

function TestimonialsCarousel({
  items,
}: {
  items: readonly {
    name: string;
    role: string;
    quote: string;
    result: string;
  }[];
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useIsInView<HTMLDivElement>(0.35);
  const [auto, setAuto] = useState(true);
  const [active, setActive] = useAutoRotate(inView && auto && !reduced, items.length, 6500);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, items.length, setActive]);

  const current = items[active];

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-12 lg:items-start">
      {/* left: navigator */}
      <div className="lg:col-span-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-black tracking-[0.18em] text-slate-500">
            TESTIMONIALS
          </div>
          <button
            onClick={() => setAuto((s) => !s)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            aria-pressed={auto}
          >
            {auto ? "Autoplay: on" : "Autoplay: off"}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {items.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name + i}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full rounded-3xl border p-4 text-left transition",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                )}
                aria-selected={isActive}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className={cn("text-sm font-black truncate", isActive ? "text-white" : "text-slate-900")}>
                      {t.name}
                    </div>
                    <div className={cn("text-[11px] font-semibold tracking-[0.14em] truncate", isActive ? "text-white/70" : "text-slate-500")}>
                      {t.role.toUpperCase()}
                    </div>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-black", isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-900")}>
                    {t.result}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 hover:bg-slate-50"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActive((i) => (i + 1) % items.length)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 hover:bg-slate-50"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="ml-auto text-xs text-slate-500">←/→</div>
        </div>
      </div>

      {/* right: card */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-[40px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  <Quote className="h-4 w-4" /> Partner feedback
                </div>
                <div className="mt-5 text-balance text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  “{current.quote}”
                </div>
              </div>
              <div
                className="hidden sm:block h-14 w-14 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${withAlpha(COLORS.primary, 0.35)}, ${withAlpha(
                    COLORS.accent,
                    0.18
                  )}, rgba(15,23,42,0.02))`,
                }}
                aria-hidden
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-black text-slate-900">{current.name}</div>
                <div className="text-xs font-semibold tracking-[0.14em] text-slate-500">
                  {current.role.toUpperCase()}
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-900">
                <Sparkles className="h-4 w-4" />
                {current.result}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===================== FAQ ===================== */

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={it.q}
            className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_14px_50px_rgba(15,23,42,0.06)]"
          >
            <button
              onClick={() => setOpen((v) => (v === idx ? null : idx))}
              className="flex w-full items-center justify-between gap-3 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div className="text-sm font-black text-slate-900">{it.q}</div>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-slate-500 transition",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ===================== scroll progress ===================== */

function ScrollProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useSpring(progress, { stiffness: 220, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${withAlpha(COLORS.primary, 0.95)}, ${withAlpha(
          COLORS.accent,
          0.85
        )}, rgba(190,242,100,0.85))`,
      }}
    />
  );
}

/* =============================== PAGE =============================== */

export default function AboutPage() {
  const reduced = usePrefersReducedMotion();
  const logos = useCompanyLogos();

  const sectionIds = ["overview", "process", "leadership", "clients", "testimonials", "faq"];
  const active = useActiveSection(sectionIds);

  // scroll progress across the whole page
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // metrics count-up
  const { ref: metricsRef, inView: metricsInView } = useIsInView<HTMLDivElement>(0.35);
  const years = useCountUp({ from: 0, to: 7, durationMs: 900, start: metricsInView, reducedMotion: reduced });
  const launches = useCountUp({ from: 0, to: 120, durationMs: 1200, start: metricsInView, reducedMotion: reduced });
  const uptime = useCountUp({ from: 0, to: 99.9, durationMs: 1100, start: metricsInView, reducedMotion: reduced });

  return (
    <div className="w-full">
      <ScrollProgressBar progress={progress} />

      {/* HERO (dark, Solutions-like) */}
      <section className="relative w-full overflow-hidden text-white" style={{ backgroundColor: COLORS.background }}>
        <UseCaseBackground />
        <SoftGridNoise />

        <div className="relative z-30 px-4 sm:px-6 md:px-8 pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <SectionShell>
              <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-5xl text-center">
                <motion.div variants={fadeUp}>
                  <DarkKicker>
                    <Sparkles className="h-4 w-4" /> About Anonvic
                  </DarkKicker>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
                >
                  A pod that turns{" "}
                  <span className="bg-gradient-to-r from-slate-50 via-sky-100 to-lime-300 bg-clip-text text-transparent">
                    clicks into outcomes
                  </span>
                  .
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 mx-auto max-w-3xl text-balance text-sm leading-relaxed text-slate-200/90 sm:text-base md:text-lg"
                >
                  Marketers, engineers, and designers working as one squad. We ship weekly, measure impact, and leave you with documentation and assets your team keeps.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(190,242,100,0.35)] transition hover:translate-y-[1px] hover:bg-[#d4ff80]"
                  >
                    Start a project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/our-work"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    See demos <ExternalLink className="h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-10 grid gap-4 md:grid-cols-3">
                  {[
                    { icon: <Zap className="h-4 w-4" />, label: "Delivery", value: "weekly ship" },
                    { icon: <ShieldCheck className="h-4 w-4" />, label: "Quality", value: "clean scope" },
                    { icon: <Gauge className="h-4 w-4" />, label: "Performance", value: "fast builds" },
                  ].map((x) => (
                    <div key={x.label} className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10">
                          {x.icon}
                        </span>
                        {x.label}
                      </div>
                      <div className="mt-3 text-lg font-semibold text-white">{x.value}</div>
                    </div>
                  ))}
                </motion.div>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            </SectionShell>
          </div>
        </div>
      </section>

      {/* Sticky in-page nav (white sections) */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="sticky top-16 z-40 -mx-4 border-b border-slate-200 bg-white/85 px-4 py-3 sm:-mx-6 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              {[
                ["overview", "Overview"],
                ["process", "Process"],
                ["leadership", "Leadership"],
                ["clients", "Clients"],
                ["testimonials", "Testimonials"],
                ["faq", "FAQ"],
              ].map(([id, label]) => {
                const isActive = active === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {label}
                  </a>
                );
              })}
              <span className="ml-auto hidden sm:inline text-xs text-slate-500">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="w-full bg-white text-slate-900 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>OVERVIEW</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Built for teams that want momentum
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              We work like an embedded pod: clear backlog, weekly delivery, measurable progress, and a clean handoff.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valueCards.map((c) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
                whileHover={{ y: -3 }}
                className="rounded-[34px] border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:shadow-[0_35px_110px_rgba(15,23,42,0.12)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  {c.icon}
                </div>
                <div className="mt-5 text-lg font-black text-slate-900">{c.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* metrics + principles */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="rounded-[40px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-10">
                <div className="text-xs font-black tracking-[0.18em] text-slate-500">
                  OPERATING PRINCIPLES
                </div>
                <ul className="mt-6 space-y-3">
                  {principles.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-700 sm:text-base">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  {["Docs-first", "A11y matters", "Performance budgets", "Weekly demos", "Data > opinions"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div ref={metricsRef} className="grid gap-4">
                <MetricCard
                  label="Years shipping"
                  accent="primary"
                  display={<span>{Math.round(years)}+</span>}
                />
                <MetricCard
                  label="Launches shipped"
                  accent="lime"
                  display={<span>{Math.round(launches)}+</span>}
                />
                <MetricCard
                  label="Infra uptime"
                  accent="accent"
                  display={<span>{uptime.toFixed(1)}%</span>}
                />
              </div>
            </div>
          </div>

          {/* quick link to Solutions / Work */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              See services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/our-work"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              View demos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="w-full bg-white text-slate-900 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>PROCESS</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              A predictable system for weekly progress
            </h2>
            <p className="mt-4 text-slate-600 sm:text-lg">
              The rhythm stays consistent, so the work stays easy to coordinate.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* timeline spine */}
            <div className="lg:col-span-4">
              <div className="rounded-[34px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                <div className="text-xs font-black tracking-[0.18em] text-slate-500">THE HEARTBEAT</div>
                <div className="mt-4 text-balance text-xl font-black text-slate-900">
                  Plan → Build → Demo → Iterate
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We keep scope small and visible so stakeholders always know what’s shipping and why.
                </p>

                <div className="mt-6 space-y-3">
                  {["Clear backlog", "One primary goal", "Simple reporting", "Weekly demo"].map((x) => (
                    <div key={x} className="flex items-center gap-2 text-sm text-slate-700">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: withAlpha(COLORS.primary, 0.9) }}
                      />
                      {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* steps */}
            <div className="lg:col-span-8">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute left-4 top-2 bottom-2 w-px"
                  style={{
                    background: `linear-gradient(to bottom, ${withAlpha(COLORS.primary, 0.25)}, ${withAlpha(
                      COLORS.accent,
                      0.18
                    )}, rgba(190,242,100,0.22))`,
                  }}
                />
                <div className="space-y-5">
                  {processSteps.map((s, idx) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, delay: idx * 0.05 }}
                      className="relative pl-12"
                    >
                      <div
                        className="absolute left-[7px] top-6 h-6 w-6 rounded-full border"
                        style={{
                          background: "white",
                          borderColor: withAlpha(COLORS.primary, 0.35),
                          boxShadow: `0 0 0 6px ${withAlpha(COLORS.primary, 0.06)}`,
                        }}
                        aria-hidden
                      />
                      <div className="rounded-[34px] border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                            {s.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-black text-slate-900">{s.title}</div>
                              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-700">
                                STEP {idx + 1}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.detail}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="w-full bg-white text-slate-900 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>TEAM</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">
              Senior crew, small pods
            </h2>
            <p className="mt-4 text-slate-600 sm:text-lg">
              Lean teams with fast decision-making and high ownership.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {leadership.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="rounded-[34px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:shadow-[0_35px_110px_rgba(15,23,42,0.12)]"
              >
                <div
                  className="h-12 w-12 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${withAlpha(COLORS.primary, 0.35)}, ${withAlpha(
                      COLORS.accent,
                      0.18
                    )}, rgba(15,23,42,0.02))`,
                  }}
                  aria-hidden
                />
                <div className="mt-5 text-sm font-black text-slate-900">{p.name}</div>
                <div className="mt-1 text-xs font-semibold tracking-[0.16em] text-slate-500">
                  {p.role.toUpperCase()}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{p.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="w-full bg-white text-slate-900 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>CLIENTS</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">
              Teams we’ve supported
            </h2>
            <p className="mt-4 text-slate-600 sm:text-lg">
              If you add logos to <code className="font-mono">src/assets/companies</code>, they auto-load here.
            </p>
          </div>

          <div className="mt-10">
            <LogosMarquee logos={logos} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="w-full bg-white text-slate-900 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>RESULTS</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              What partners say
            </h2>
            <p className="mt-4 text-slate-600 sm:text-lg">
              Clear feedback from recent launches and growth engagements.
            </p>
          </div>

          <div className="mt-12">
            <TestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full bg-white text-slate-900 scroll-mt-32">
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>FAQ</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">
              Quick answers
            </h2>
            <p className="mt-4 text-slate-600 sm:text-lg">
              The most common questions teams ask before kickoff.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-3xl">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      {/* Closing CTA (dark band to match brand) */}
      <section className="relative w-full overflow-hidden text-white" style={{ backgroundColor: COLORS.background }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(900px 500px at 15% 10%, ${withAlpha(COLORS.primary, 0.22)} 0%, transparent 60%),` +
              `radial-gradient(900px 500px at 90% 20%, ${withAlpha(COLORS.accent, 0.18)} 0%, transparent 60%),` +
              "linear-gradient(135deg, rgba(0,0,0,0.92), rgba(0,0,0,0.88))",
          }}
        />

        <div className="relative px-4 sm:px-6 md:px-8 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-[44px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                  <ShieldCheck className="h-4 w-4" /> Next step
                </div>
                <h3 className="mt-5 text-balance text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                  Want a clean plan for your next campaign?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  Send your goal (leads / bookings / sales). We’ll recommend the best starting scope and a 30–60 day rollout.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#c7f36b] px-7 py-3.5 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(190,242,100,0.35)] transition hover:translate-y-[1px] hover:bg-[#d4ff80]"
                  >
                    Contact <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/our-work"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    Browse demos <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-white/55">
                  {["Fast launch", "Weekly iteration", "EN + AR"].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Anonvic",
            description:
              "Anonvic is an integrated growth pod shipping outcomes with weekly cadence, documentation, and performance-first builds.",
          }),
        }}
      />
    </div>
  );
}
