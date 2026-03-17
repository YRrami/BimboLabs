/* eslint-disable @typescript-eslint/no-explicit-any */

// src/pages/WorkPage.tsx
// Minimalized + improved UX:
// - One clean “Work” page with a simple view switch: Demos / Case Studies / Visuals
// - Less UI noise (fewer boxes, fewer repeated CTAs) + more whitespace
// - Case studies as minimal accordions with metrics chips (scannable)
// - Visuals as horizontal gallery (simple, premium)
// - Demos section keeps your navigator + device preview (best part), but with cleaner framing
// - Stronger hierarchy + clearer “SMEs/startups in & out of Egypt” copy

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Eye,
  Filter as FilterIcon,
  Link2,
  Pause,
  Play,
  ChevronRight,
  Sparkles,
  Search,
  SlidersHorizontal,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle2,
  Info,
  BarChart3,
  TrendingUp,
  Target,
  Palette,
  Megaphone,
  Code2,
  Plus,
  Minus,
} from "lucide-react";
import { SectionShell } from "../components/layout/SiteLayout";

// Replace with real visuals
import visualMock1 from "../assets/companies/cover.png";
import visualMock2 from "../assets/companies/cover.png";
import visualMock3 from "../assets/companies/cover.png";

/* ===================== helpers ===================== */

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

const COLORS = {
  bg: "#050013",
  primary: "#4F46E5",
  accent: "#EC4899",
  sky: "#38BDF8",
  lime: "#BEF264",
  ink: "#0F172A",
} as const;

/* ===================== Motion ===================== */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

/* ------------------------------ Background (hero) ------------------------------ */

function SoftGridNoise() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.22]"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "36px 18px", "0px 0px"] }}
        transition={{ duration: 12, repeat: Infinity }}
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

function UseCaseBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0" style={{ background: COLORS.bg }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.62)_0%,_rgba(5,0,19,1)_45%,_rgba(2,0,7,1)_80%)]" />
      <div
        className="absolute -top-24 left-[10%] h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.28), transparent 68%)" }}
      />
      <div
        className="absolute top-[6%] right-[6%] h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(190,242,100,0.16), transparent 70%)" }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0.16, rotate: -10 }}
        animate={{ opacity: [0.12, 0.26, 0.12], rotate: [-8, -12, -8] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute left-[-12%] right-[-28%] top-[36%] h-64"
        style={{
          background:
            "linear-gradient(120deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.22) 35%, rgba(168,85,247,0.16) 60%, rgba(190,242,100,0) 100%)",
          filter: "blur(18px)",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0.14, rotate: 12 }}
        animate={{ opacity: [0.10, 0.22, 0.10], rotate: [10, 16, 10] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute left-[-20%] right-[-5%] top-[58%] h-56"
        style={{
          background:
            "linear-gradient(120deg, rgba(129,140,248,0) 0%, rgba(129,140,248,0.20) 40%, rgba(56,189,248,0.18) 70%, rgba(56,189,248,0) 100%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}

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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
      {children}
    </span>
  );
}

/* ===================== Data ===================== */

type ViewMode = "Demos" | "Case Studies" | "Visuals";

type Category = "All" | "Web" | "SEO" | "AI";
type SortMode = "Featured" | "Newest" | "A→Z";

type Project = {
  id: number;
  title: string;
  url: string;
  brief: string;
  tags: string[];
  year: string;
  emoji: string;
  category: Exclude<Category, "All">;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Marketing Agency",
    url: "https://leadmagnett.vercel.app/",
    brief: "Lead funnel with clear services + booked-call flow.",
    tags: ["React", "Stripe", "SEO"],
    year: "2025",
    emoji: "🛒",
    category: "Web",
    featured: true,
  },
  {
    id: 2,
    title: "Medical Tourism Organization",
    url: "https://healthtrip-opal.vercel.app/",
    brief: "Programmatic pages + schema + analytics-ready structure.",
    tags: ["Next.js", "Schema", "Analytics"],
    year: "2025",
    emoji: "🔎",
    category: "SEO",
    featured: true,
  },
  {
    id: 3,
    title: "Student Union of ASU",
    url: "https://sfeclub.site/",
    brief: "RAG assistant + events tools + docs access.",
    tags: ["OpenAI", "RAG", "FastAPI"],
    year: "2025",
    emoji: "🤖",
    category: "AI",
    featured: true,
  },
  {
    id: 4,
    title: "Luxurious uPVC Industry Leader",
    url: "https://egywin-luxury.vercel.app/",
    brief: "Catalog + lead capture + SEO collections + fast search.",
    tags: ["Next.js", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "🏗️",
    category: "SEO",
  },
  {
    id: 5,
    title: "Automation Systems Service",
    url: "https://leadsconnector.vercel.app/",
    brief: "Offer stack + use-cases + lead forms.",
    tags: ["React", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "⚙️",
    category: "Web",
  },
  {
    id: 6,
    title: "Marketing Agency in KSA",
    url: "https://fantasydeall.vercel.app/",
    brief: "Localized services page tuned for GCC audiences.",
    tags: ["React", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "🌍",
    category: "Web",
  },
  {
    id: 7,
    title: "Freelance Marketplace",
    url: "https://loqta.vercel.app/",
    brief: "Marketplace concept with categories + profiles + request flow.",
    tags: ["React", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "💼",
    category: "Web",
  },
];

const CATEGORIES: Category[] = ["All", "Web", "SEO", "AI"];

type Highlight = { label: string; value: string; icon: React.ReactNode; note: string };
const HIGHLIGHTS: Highlight[] = [
  { label: "Conversion", value: "+20–45%", icon: <TrendingUp className="h-4 w-4" />, note: "Better message-match + CTA clarity." },
  { label: "Cost per lead", value: "-15–35%", icon: <Target className="h-4 w-4" />, note: "Creative iteration + tracking fixes." },
  { label: "Tracking", value: "GA4 + pixels", icon: <BarChart3 className="h-4 w-4" />, note: "Events + funnel-ready reporting." },
];

type VisualAsset = { title: string; kind: "Ad Creative" | "Brand Identity" | "UI/Website"; src: string; tags: string[] };
const VISUALS: VisualAsset[] = [
  { title: "Ad creative set", kind: "Ad Creative", src: visualMock1, tags: ["Hooks", "Variants", "Meta Ads"] },
  { title: "Brand identity kit", kind: "Brand Identity", src: visualMock2, tags: ["Logo", "Palette", "Typography"] },
  { title: "Landing page UI", kind: "UI/Website", src: visualMock3, tags: ["Conversion", "Components", "Speed"] },
];

type CaseStudy = {
  id: number;
  title: string;
  region: "Egypt" | "GCC" | "International";
  industry: string;
  services: Array<"Marketing" | "Brand" | "Software" | "Business">;
  goal: string;
  work: string[];
  metrics: Array<{ label: string; value: string }>;
  year: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "SME lead funnel + ads system",
    region: "Egypt",
    industry: "Services",
    services: ["Marketing", "Software"],
    goal: "Turn paid traffic into qualified leads with clean tracking and weekly improvements.",
    work: ["Offer + landing page rebuild", "Events (GA4 / Ads) setup", "Creative variants per cycle", "Weekly report + action list"],
    metrics: [
      { label: "Conv.", value: "+30% (example)" },
      { label: "CPL", value: "-22% (example)" },
      { label: "Launch", value: "10 days" },
    ],
    year: "2025",
  },
  {
    id: 2,
    title: "Brand refresh + content templates",
    region: "GCC",
    industry: "Agency / Media",
    services: ["Brand", "Marketing"],
    goal: "Unify visuals across social + ads + web to improve trust and consistency.",
    work: ["Identity system", "Template pack", "Content calendar + hooks library"],
    metrics: [
      { label: "Output", value: "2× faster" },
      { label: "Consistency", value: "Unified kit" },
      { label: "Testing", value: "More variants" },
    ],
    year: "2025",
  },
  {
    id: 3,
    title: "Website + SEO structure for scale",
    region: "International",
    industry: "Health / Tourism",
    services: ["Software", "Marketing"],
    goal: "Build an analytics-ready site structure that can scale SEO and conversions.",
    work: ["Programmatic pages + schema", "Speed / UX tuning", "Conversion content blocks"],
    metrics: [
      { label: "Tracking", value: "Events ready" },
      { label: "SEO", value: "Scalable structure" },
      { label: "UX", value: "Performance-first" },
    ],
    year: "2025",
  },
];

/* ===================== Hooks ===================== */

function useAutoRotate(enabled: boolean, length: number, delay = 6000) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled || length <= 1) return;
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [enabled, length, delay]);
  return [index, setIndex] as const;
}

function useIsInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setInView(entries[0]?.isIntersecting ?? false), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView } as const;
}

/* ===================== Toast ===================== */

function Toast({ show, text }: { show: boolean; text: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-6 left-1/2 z-[999] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <CheckCircle2 className="h-4 w-4 text-slate-900" />
            <span className="text-sm font-semibold text-slate-900">{text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===================== Small UI: Segmented control ===================== */

function Segmented({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (v: any) => void;
  items: Array<{ label: string; icon: React.ReactNode }>;
}) {
  return (
    <div className="inline-flex rounded-2xl border border-white/15 bg-white/5 p-1 backdrop-blur">
      {items.map((it) => {
        const active = value === it.label;
        return (
          <button
            key={it.label}
            onClick={() => onChange(it.label)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
              active ? "bg-white text-slate-900" : "text-white/80 hover:bg-white/10"
            )}
            aria-pressed={active}
          >
            <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-lg", active ? "bg-slate-900 text-white" : "bg-white/10 text-white")}>
              {it.icon}
            </span>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/* ===================== Page ===================== */

export default function WorkPage() {
  const [view, setView] = useState<ViewMode>("Demos");

  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("Featured");

  const { ref: demosRef, inView } = useIsInView<HTMLDivElement>(0.4);
  const [autoPlay, setAutoPlay] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PROJECTS.filter((p) => (category === "All" ? true : p.category === category));

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.title} ${p.brief} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (sort === "Newest") list = [...list].sort((a, b) => Number(b.year) - Number(a.year));
    else if (sort === "A→Z") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else {
      list = [...list].sort((a, b) => {
        const fa = a.featured ? 1 : 0;
        const fb = b.featured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        const ya = Number(a.year);
        const yb = Number(b.year);
        if (yb !== ya) return yb - ya;
        return a.title.localeCompare(b.title);
      });
    }

    return list;
  }, [category, query, sort]);

  const [active, setActive] = useAutoRotate(inView && autoPlay, filtered.length, 5500);

  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered.length, active, setActive]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const count = filtered.length;
      if (count < 2) return;
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
      else if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, setActive]);

  const current = filtered[active] ?? filtered[0];

  const currentOrigin = useMemo(() => {
    try {
      return new URL(current?.url ?? "").origin.replace(/^https?:\/\//, "");
    } catch {
      return "";
    }
  }, [current?.url]);

  // toast
  const [toast, setToast] = useState<{ show: boolean; text: string }>({ show: false, text: "" });
  const toastTimer = useRef<number | null>(null);
  const flashToast = (text: string) => {
    setToast({ show: true, text });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast({ show: false, text: "" }), 1200);
  };

  // device modes
  type Device = "Desktop" | "Tablet" | "Mobile";
  const [device, setDevice] = useState<Device>("Desktop");
  const aspectClass = device === "Mobile" ? "aspect-[9/16]" : device === "Tablet" ? "aspect-[3/4]" : "aspect-[16/9]";

  /* ===================== Demos UI ===================== */

  const Navigator = () => (
    <aside className="lg:sticky lg:top-28 self-start">
      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Search className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-black text-slate-900">Demos</div>
            <div className="text-xs text-slate-500">Search + filter</div>
          </div>
        </div>

        <div className="mt-4">
          <label className="sr-only" htmlFor="work-search">
            Search demos
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              id="work-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            <FilterIcon className="h-4 w-4" /> Category
          </span>
          {CATEGORIES.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setActive(0);
                }}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  isActive ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                )}
                aria-pressed={isActive}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
            <SlidersHorizontal className="h-4 w-4" />
            Sort
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
            aria-label="Sort demos"
          >
            <option>Featured</option>
            <option>Newest</option>
            <option>A→Z</option>
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} results</span>
          <span>←/→</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {filtered.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={cn(
                "group w-full text-left rounded-[22px] border px-4 py-3 transition",
                isActive ? "border-slate-900 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]" : "border-slate-200 bg-white hover:bg-slate-50"
              )}
              aria-current={isActive ? "true" : "false"}
            >
              <div className="flex items-center gap-3">
                <span className="text-base leading-none">{p.emoji}</span>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">{p.title}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">
                    {p.year} • {p.category}
                  </div>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );

  const IframePreview = () => {
    const [loaded, setLoaded] = useState(false);
    const [tick, setTick] = useState(0);
    const [showEmbedHint, setShowEmbedHint] = useState(false);

    useEffect(() => {
      setLoaded(false);
      setTick(0);
      setShowEmbedHint(false);
      const t = window.setTimeout(() => {
        if (!loaded) setShowEmbedHint(true);
      }, 2200);
      return () => window.clearTimeout(t);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current?.id]);

    useEffect(() => {
      if (!autoPlay || filtered.length <= 1 || !inView) return setTick(0);
      setTick(0);
      const start = Date.now();
      const dur = 5500;
      const id = window.setInterval(() => {
        const t = Math.min(1, (Date.now() - start) / dur);
        setTick(t);
        if (t >= 1) window.clearInterval(id);
      }, 120);
      return () => window.clearInterval(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, filtered.length, inView]);

    const DeviceButton = ({ name, icon }: { name: Device; icon: React.ReactNode }) => {
      const isActive = device === name;
      return (
        <button
          onClick={() => setDevice(name)}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition",
            isActive ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          )}
          aria-pressed={isActive}
        >
          {icon}
          {name}
        </button>
      );
    };

    if (!current) return null;

    return (
      <div className="rounded-[34px] border border-slate-200 bg-white p-5 shadow-[0_35px_110px_rgba(15,23,42,0.10)] sm:p-6">
        {/* header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-sm font-black text-slate-900 truncate">{current.title}</div>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <div className="text-xs font-semibold text-slate-500 truncate">
                {currentOrigin} • {current.year}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {current.tags.slice(0, 4).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(current.url);
                  flashToast("Link copied");
                } catch {
                  flashToast("Copy failed");
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none"
              aria-label="Copy link"
            >
              <Link2 className="h-4 w-4" />
              Copy
            </button>

            <a
              href={current.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95"
              aria-label="Open demo in new tab"
            >
              Open <ExternalLink className="h-4 w-4" />
            </a>

            <button
              onClick={() => setAutoPlay((s) => !s)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              aria-label={autoPlay ? "Pause autoplay" : "Play autoplay"}
            >
              {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {autoPlay ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* progress */}
        <div className="mt-5 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full w-full origin-left"
            style={{
              transform: `scaleX(${tick})`,
              background: `linear-gradient(90deg, ${withAlpha(COLORS.primary, 0.95)}, ${withAlpha(
                COLORS.accent,
                0.85
              )}, ${withAlpha(COLORS.sky, 0.75)})`,
              transition: "transform .22s linear",
            }}
          />
        </div>

        {/* device toggles */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <DeviceButton name="Desktop" icon={<Laptop className="h-4 w-4" />} />
          <DeviceButton name="Tablet" icon={<Tablet className="h-4 w-4" />} />
          <DeviceButton name="Mobile" icon={<Smartphone className="h-4 w-4" />} />
          <span className="ml-auto inline-flex items-center gap-2 text-xs text-slate-500">
            <Info className="h-4 w-4" />
            If blank, embedding is blocked.
          </span>
        </div>

        {/* preview */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-black overflow-hidden">
          <div className={cn("relative w-full", aspectClass)}>
            <iframe
              key={current.id}
              src={current.url}
              title={`${current.title} preview`}
              className="absolute inset-0 w-full h-full block"
              loading="eager"
              sandbox="allow-scripts allow-forms allow-same-origin"
              referrerPolicy="no-referrer"
              onLoad={() => {
                setLoaded(true);
                setShowEmbedHint(false);
              }}
              style={{ border: 0, background: "black", display: "block", transform: "translateZ(0)" }}
            />

            {!loaded && <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,rgba(255,255,255,.10),rgba(255,255,255,.04))]" />}

            <AnimatePresence>
              {showEmbedHint && !loaded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 grid place-items-center bg-black/60 p-6">
                  <div className="max-w-md rounded-3xl border border-white/15 bg-white/10 p-6 text-center text-white backdrop-blur-xl">
                    <div className="text-sm font-black">Preview not loading</div>
                    <p className="mt-2 text-sm text-white/80">Some sites block iframes. Use Open to view.</p>
                    <div className="mt-4 flex justify-center">
                      <a href={current.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-95">
                        Open demo <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* brief */}
        <p className="mt-5 text-sm leading-relaxed text-slate-600">{current.brief}</p>

        {/* single CTA row (minimal) */}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            See solutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  };

  /* ===================== Case studies (minimal accordion) ===================== */

  const serviceIcon = (s: CaseStudy["services"][number]) => {
    if (s === "Marketing") return <Megaphone className="h-3.5 w-3.5" />;
    if (s === "Brand") return <Palette className="h-3.5 w-3.5" />;
    if (s === "Software") return <Code2 className="h-3.5 w-3.5" />;
    return <BarChart3 className="h-3.5 w-3.5" />;
  };

  function CaseStudyRow({ cs }: { cs: CaseStudy }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
        <button
          onClick={() => setOpen((s) => !s)}
          className="w-full px-6 py-5 text-left"
          aria-expanded={open}
        >
          <div className="flex items-start gap-4">
            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
              {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm font-black text-slate-900">{cs.title}</div>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <div className="text-xs font-semibold text-slate-500">
                  {cs.region} • {cs.industry} • {cs.year}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                      {serviceIcon(s)}
                    </span>
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {cs.metrics.map((m) => (
                  <span key={m.label} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800">
                    {m.label}: <span className="font-black">{m.value}</span>
                  </span>
                ))}
              </div>
            </div>

            <ChevronRight className={cn("mt-3 h-5 w-5 text-slate-400 transition-transform", open && "rotate-90")} />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-black tracking-[0.18em] text-slate-500">GOAL</div>
                  <p className="mt-2 text-sm text-slate-700">{cs.goal}</p>
                </div>

                <div className="mt-4 grid gap-2">
                  {cs.work.map((w) => (
                    <div key={w} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-slate-900" />
                      <div className="text-sm text-slate-700">{w}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95">
                    Get a similar plan <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="text-[11px] text-slate-500 self-center">
                    Replace “example” metrics with real anonymized values.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ===================== Page ===================== */

  return (
    <div className="w-full">
      <Toast show={toast.show} text={toast.text} />

      {/* HERO */}
      <section className="relative w-full overflow-hidden text-white" style={{ backgroundColor: COLORS.bg }}>
        <UseCaseBackground />
        <SoftGridNoise />

        <SectionShell className="relative z-30 pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
          <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl text-center">
            <motion.div variants={fadeUp}>
              <DarkKicker>
                <Eye className="h-4 w-4" /> Our work
              </DarkKicker>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              Real work. Clear outcomes.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-balance text-sm leading-relaxed text-slate-200/90 sm:text-base md:text-lg">
              We help SMEs and startups in Egypt and outside Egypt launch premium visuals, conversion-ready pages, and measurable growth workflows.
            </motion.p>

            {/* minimal highlights strip */}
            <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/10">{h.icon}</span>
                    {h.label}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">{h.value}</div>
                  <div className="mt-1 text-xs text-white/60">{h.note}</div>
                </div>
              ))}
            </motion.div>

            {/* view switch */}
            <motion.div variants={fadeUp} className="mt-10 flex justify-center">
              <Segmented
                value={view}
                onChange={(v: ViewMode) => setView(v)}
                items={[
                  { label: "Demos", icon: <Laptop className="h-4 w-4" /> },
                  { label: "Case Studies", icon: <BarChart3 className="h-4 w-4" /> },
                  { label: "Visuals", icon: <Palette className="h-4 w-4" /> },
                ]}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        </SectionShell>
      </section>

      {/* CONTENT */}
      <section className="w-full bg-white text-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <AnimatePresence mode="wait" initial={false}>
            {view === "Demos" ? (
              <motion.div
                key="demos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-8 text-center">
                  <LightKicker>DEMOS</LightKicker>
                  <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">Browse & preview</h2>
                  <p className="mt-3 text-slate-600">Filter by category, then preview in desktop/tablet/mobile.</p>
                </div>

                <div ref={demosRef} className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr] sm:gap-8">
                  <Navigator />
                  <IframePreview />
                </div>
              </motion.div>
            ) : null}

            {view === "Case Studies" ? (
              <motion.div
                key="case"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-10 text-center">
                  <LightKicker>CASE STUDIES</LightKicker>
                  <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">Scannable. Measurable. Clear.</h2>
                  <p className="mt-3 text-slate-600">Goal → what we did → key metrics. Expand to see details.</p>
                </div>

                <div className="space-y-4">
                  {CASE_STUDIES.map((cs) => (
                    <CaseStudyRow key={cs.id} cs={cs} />
                  ))}
                </div>
              </motion.div>
            ) : null}

            {view === "Visuals" ? (
              <motion.div
                key="visuals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-10 text-center">
                  <LightKicker>VISUALS</LightKicker>
                  <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl">Design output that looks premium</h2>
                  <p className="mt-3 text-slate-600">Ads, branding, and landing visuals. Replace mocks with your real assets.</p>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                  {VISUALS.map((v) => (
                    <motion.div
                      key={v.title}
                      whileHover={{ y: -3 }}
                      className="min-w-[280px] max-w-[280px] sm:min-w-[340px] sm:max-w-[340px] overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:shadow-[0_35px_110px_rgba(15,23,42,0.12)]"
                    >
                      <div className="relative">
                        <img src={v.src} alt={v.title} className="h-52 w-full object-cover" />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-60"
                          style={{
                            background:
                              "radial-gradient(circle at 30% 10%, rgba(79,70,229,0.14) 0%, rgba(56,189,248,0.08) 30%, transparent 60%)",
                          }}
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-black text-slate-900">{v.title}</div>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                            {v.kind}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {v.tags.map((t) => (
                            <Chip key={t}>{t}</Chip>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Single bottom CTA (minimal) */}
          <div className="mt-14 rounded-[40px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 text-center shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-10">
            <div className="mx-auto max-w-2xl">
              <LightKicker>
                <Sparkles className="h-4 w-4 mr-2 inline-block" /> NEXT
              </LightKicker>

              <h3 className="mt-4 text-balance text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Want a clean plan for your next 30–60 days?
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Tell us your goal (leads / bookings / sales). We’ll recommend a scope and rollout.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Contact <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  See solutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
                {["Fast launch", "Weekly iteration", "EN + AR"].map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold">
                    {t}
                  </span>
                ))}
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
            "@type": "CollectionPage",
            name: "Our Work",
            about: "Demos, visuals, and case studies from marketing, branding, and software engagements.",
            areaServed: ["Egypt", "GCC", "International"],
            hasPart: [
              ...PROJECTS.slice(0, 6).map((p) => ({
                "@type": "CreativeWork",
                name: p.title,
                url: p.url,
                applicationCategory: "BusinessApplication",
              })),
              ...CASE_STUDIES.map((cs) => ({
                "@type": "CaseStudy",
                name: cs.title,
                about: cs.industry,
                datePublished: cs.year,
              })),
            ],
          }),
        }}
      />
    </div>
  );
}
