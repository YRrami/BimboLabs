/* eslint-disable react-hooks/exhaustive-deps */
 
// src/pages/WorkPage.tsx — Studio-grade redesign (no new deps)
// - Sticky navigator + filters (All/Web/SEO/AI)
// - Big preview with progress bar + auto-rotate (pause/play)
// - Cleaner scoreboard + artifacts grid + case studies
// - A11y: proper aria roles, keyboard nav, focus outlines
// Tailwind required

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  ExternalLink,
  FolderGit2,
  Trophy,
  Eye,
  Quote,
  Sparkles,
  Filter as FilterIcon,
  Link2,
  Pause,
  Play,
  ChevronRight,
} from "lucide-react";

/* ===================== Local tokens & helpers ===================== */
const COLORS = {
  background: "#05061D",
  primary: "#4F46E5",
  accent: "#A855F7",
  text: "#F7F9FF",
  muted: "#A5ADCF",
} as const;

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const gradientSoft = (
  angle = 135,
  p = 0.14,
  a = 0.1,
  b = 0.88
) => `linear-gradient(${angle}deg, ${withAlpha(COLORS.primary, p)}, ${withAlpha(
  COLORS.accent,
  a
)}, ${withAlpha(COLORS.background, b)})`;
const gradientPrimary = (angle = 140) =>
  `linear-gradient(${angle}deg, ${withAlpha(COLORS.primary, 0.18)}, ${withAlpha(
    COLORS.accent,
    0.14
  )}, ${withAlpha(COLORS.background, 0.92)})`;

function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 backdrop-blur-xl px-4 sm:px-8 md:px-12 py-10 sm:py-14 ${
        className ?? ""
      }`}
      style={{ background: gradientSoft(), boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)" }}
    >
      {children}
    </div>
  );
}

/* ===================== Data ===================== */
type Project = {
  id: number;
  title: string;
  url: string;
  brief: string;
  tags: string[];
  year: string;
  emoji: string;
  category: "Web" | "SEO" | "AI";
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Marketing Agency",
    url: "https://leadmagnett.vercel.app/",
    brief:
      "High‑converting storefront starter with bundles, subscriptions, and server‑side tracking.",
    tags: ["React", "Stripe", "SEO"],
    year: "2025",
    emoji: "🛒",
    category: "Web",
  },
  {
    id: 2,
    title: "Medical Tourism Organization",
    url: "https://healthtrip-opal.vercel.app/",
    brief:
      "Programmatic city/service pages, schema, and content ops. Ship CWV>90 landers fast.",
    tags: ["Next.js", "Schema", "Analytics"],
    year: "2025",
    emoji: "🔎",
    category: "Web",
  },
  {
    id: 3,
    title: "Student Union of ASU",
    url: "https://sfeclub.site/",
    brief: "Campus assistant with RAG and handy internal tools for events and docs.",
    tags: ["OpenAI", "RAG", "FastAPI"],
    year: "2025",
    emoji: "🤖",
    category: "Web",
  },
  {
    id: 4,
    title: "Luxurious uPVC Industry Leader",
    url: "https://egywin-luxury.vercel.app/",
    brief: "Product catalog, lead capture, and SEO’d collections with fast search.",
    tags: ["Next.js", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "🏗️",
    category: "Web",
  },
   {
    id: 5,
    title: "Automation systems service",
    url: "https://leadsconnector.vercel.app/",
    brief: "advanced automation systems for various industries.",
    tags: ["react", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "🏗️",
    category: "Web",
  },
  {
    id: 6,
    title: "marketing agency in ksa",
    url: "https://fantasydeall.vercel.app/",
    brief: "marketing agency services in ksa.",
    tags: ["react", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "🏗️",
    category: "Web",
  },
   {
    id: 7,
    title: "freelance marketplace",
    url: "https://loqta.vercel.app/",
    brief: "a freelance marketplace platform.",
    tags: ["react", "SEO", "Lead Forms"],
    year: "2025",
    emoji: "🏗️",
    category: "Web",
  },
];

const DEMO_CATEGORIES = ["All", "Web", "SEO", "AI"] as const;

const impactStories = [
  {
    label: "DTC Beauty",
    metric: "+162%",
    detail:
      "ROAS increase after replatforming paid media funnels, landing pages, and lifecycle nurtures.",
  },
  {
    label: "SaaS Analytics",
    metric: "6‑week",
    detail: "MVP launch including onboarding flows, docs, and first ten enterprise customers.",
  },
  {
    label: "Fintech",
    metric: "4×",
    detail: "Organic traffic lift from technical SEO, editorial ops, and schema automation.",
  },
];

const workflowExports = [
  {
    title: "Dashboards",
    items: [
      "Looker Studio growth dashboards",
      "Revenue + CAC tracker",
      "Experiment log & decision boards",
    ],
  },
  {
    title: "Asset Libraries",
    items: [
      "Design system Figma kits",
      "Email & ad creative templates",
      "Copy banks for lifecycle journeys",
    ],
  },
  {
    title: "Automation",
    items: [
      "Analytics QA bots",
      "CRM automations & scoring",
      "AI copilots for support and ops workflows",
    ],
  },
];

const caseStudies = [
  {
    title: "Subscription DTC Reboot",
    summary:
      "Bundles, PDP tests, CAPI tracking, and creative iteration. Revenue grew 58% in 90 days.",
    href: "/case-studies/subscription-dtc.pdf",
  },
  {
    title: "SEO at Scale (B2B SaaS)",
    summary: "Programmatic landing system, schema, and internal linking. +3.1× signups from organic.",
    href: "/case-studies/seo-b2b-saas.pdf",
  },
  {
    title: "RAG Support Copilot",
    summary: "Hybrid search over docs with analytics. Ticket deflection and CSAT both improved.",
    href: "/case-studies/rag-support.pdf",
  },
];

/* ===================== Utilities ===================== */
function useAutoRotate(enabled: boolean, length: number, delay = 6000) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled || length <= 1) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, delay);
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
    const io = new IntersectionObserver((entries) => {
      setInView(entries[0]?.isIntersecting ?? false);
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView } as const;
}

/* ===================== Work Page ===================== */
export default function WorkPage() {
  // Filters + visible list
  const [category, setCategory] = useState<(typeof DEMO_CATEGORIES)[number]>("All");
  const filtered = useMemo(
    () => PROJECTS.filter((p) => (category === "All" ? true : p.category === category)),
    [category]
  );

  // Auto‑rotate if the demos block is visible
  const { ref: demosRef, inView } = useIsInView<HTMLDivElement>(0.4);
  const [autoPlay, setAutoPlay] = useState(true);
  const [active, setActive] = useAutoRotate(inView && autoPlay, filtered.length, 5500);

  // keep active index valid when filtering
  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered.length, active, setActive]);

  // keyboard shortcuts: arrows to switch, 1‑9 to jump
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const count = filtered.length;
      if (count < 2) return;
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
      else if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
      else if (/^[1-9]$/.test(e.key)) {
        const n = Number(e.key) - 1;
        if (n < count) setActive(n);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, setActive]);

  const current = filtered[active];
  const currentOrigin = (() => {
    try {
      return new URL(current.url).origin.replace(/^https?:\/\//, "");
    } catch {
      return "";
    }
  })();


  /* ---------- Subcomponents ---------- */
  const Navigator = () => (
    <aside className="sticky top-6 self-start">
      {/* filter row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
          <FilterIcon className="h-4 w-4" /> Filter
        </span>
        {DEMO_CATEGORIES.map((c) => {
          const isActive = category === c;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                isActive ? "text-white" : "text-white/75 hover:text-white"
              }`}
              style={{
                borderColor: withAlpha(COLORS.primary, isActive ? 0.5 : 0.25),
                backgroundColor: withAlpha(COLORS.primary, isActive ? 0.22 : 0.12),
              }}
              aria-pressed={isActive}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* vertical list */}
      <ul className="space-y-2" role="tablist" aria-label="Projects navigator">
        {filtered.map((p, i) => {
          const isActive = i === active;
          return (
            <li key={p.id}>
              <button
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${p.id}`}
                id={`tab-${p.id}`}
                className={`group w-full text-left rounded-2xl border px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60 ${
                  isActive ? "border-white/25" : "border-white/10 hover:border-white/20"
                }`}
                style={{ background: isActive ? gradientPrimary(125) : withAlpha(COLORS.primary, 0.06) }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base leading-none">{p.emoji}</span>
                  <div className="min-w-0">
                    <div className={`font-semibold truncate ${isActive ? "text-white" : "text-white/90"}`}>
                      {p.title}
                    </div>
                    <div className="text-[11px] text-white/60">{p.year} • {p.category}</div>
                  </div>
                  <ChevronRight className={`ml-auto h-4 w-4 shrink-0 transition-transform ${isActive ? "translate-x-0" : "group-hover:translate-x-0.5"}`} />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* helper note */}
      <p className="mt-3 text-[11px] text-white/50">Tip: use ←/→ or 1–9 to switch.</p>
    </aside>
  );

  const ProgressBar = ({ value }: { value: number }) => (
    <div className="h-1 w-full rounded bg-white/10 overflow-hidden">
      <div
        className="h-full w-full origin-left"
        style={{
          transform: `scaleX(${value})`,
          background: "linear-gradient(90deg, rgba(79,70,229,.85), rgba(168,85,247,.85))",
          transition: "transform .22s linear",
        }}
      />
    </div>
  );

  const IframePreview = () => {
    const [loaded, setLoaded] = useState(false);
    // crude progress tied to autoplay interval (visual only)
    const [tick, setTick] = useState(0);
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
    }, [active, autoPlay, filtered.length, inView]);

    return (
      <div className="relative rounded-3xl p-[1px]" style={{ background: gradientSoft(130, 0.14, 0.12, 0.8) }}>
        <div className="relative rounded-3xl p-4 sm:p-6" style={{ backgroundColor: withAlpha(COLORS.background, 0.92) }}>
          {/* header */}
          <div className="mb-4 flex items-center justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <h3 className="text-white font-semibold truncate">{current.title}</h3>
              <p className="text-xs text-[#A5ADCF] truncate">{currentOrigin} • {current.year}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={async () => {
                  try { await navigator.clipboard.writeText(current.url); } catch { alert("Copy failed. Please copy manually."); }
                }}
                className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg border border-white/15 text-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
                aria-label="Copy link"
              >
                <Link2 className="h-3.5 w-3.5" /> Copy
              </button>
              <a
                href={current.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg border border-white/15 text-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
                aria-label="Open site"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open
              </a>
              <button
                onClick={() => setAutoPlay((s) => !s)}
                className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg border border-white/15 text-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
                aria-label={autoPlay ? "Pause" : "Play"}
              >
                {autoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />} {autoPlay ? "Pause" : "Play"}
              </button>
            </div>
          </div>
          <ProgressBar value={tick} />

          {/* iframe */}
          <div className="relative mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/90">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9]">
              <iframe
                key={current.id}
                src={current.url}
                title={`${current.title} preview`}
                className="absolute inset-0 w-full h-full block"
                loading="eager"
                sandbox="allow-scripts allow-forms allow-same-origin"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                style={{ border: 0, background: "black", display: "block", transform: "translateZ(0)" }}
              />
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]" />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="pointer-events-none absolute left-3 bottom-2 z-[3] text-[11px] text-[#A5ADCF] opacity-70">
              If the preview is blank, that site blocks embedding. Use “Open”.
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* HERO */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent break-words">
                Our Work
              </h1>
              <p className="mt-4 text-[#A5ADCF] text-[15px] sm:text-[16px] max-w-[68ch] mx-auto px-2">
                Explore live demos, partner results, and the systems that keep launches on track. Everything here is production use—no concept decks.
              </p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </SectionShell>
        </div>
      </section>

      {/* IMPACT SCOREBOARD */}
      <section className="relative py-14 sm:py-18 md:py-22 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {impactStories.map(({ label, metric, detail }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/12 p-5 sm:p-6 transition-colors"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
                >
                  <div className="flex items-center justify-between min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{label}</h3>
                    <span className="text-2xl font-extrabold text-white">{metric}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/anonvic-capabilities.pdf"
                className="inline-flex items-center gap-2 text-sm rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:text-white transition"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
              >
                <Download className="h-4 w-4" /> Download sample report
              </a>
              <a
                href="/case-studies/anonvic-case-studies-pack.zip"
                className="inline-flex items-center gap-2 text-sm rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:text-white transition"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
              >
                <FolderGit2 className="h-4 w-4" /> Case studies pack
              </a>
            </div>
          </SectionShell>
        </div>
      </section>

      {/* LIVE DEMOS — two-column: sticky navigator + preview */}
      <section id="projects" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent break-words">
                Live demos
              </h2>
              <p className="mt-3 max-w-[66ch] mx-auto text-[#A5ADCF] text-[15px] sm:text-[16px] px-2">
                A curated set you can try right now. Filter by focus and preview instantly.
              </p>
            </div>

            <div ref={demosRef} className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 sm:gap-8">
              <Navigator />
              <div className="space-y-6">
                <IframePreview />

                {/* details */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{current.title}</h3>
                    <p className="text-[#A5ADCF] text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 break-words">{current.brief}</p>
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {current.tags.map((t) => (
                        <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/10 text-[#A5ADCF] border border-white/20">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={current.url}
                        className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                        style={{ backgroundColor: withAlpha(COLORS.primary, 0.26), border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(16px)" }}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <Eye className="h-5 w-5" /> Visit Demo
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 min-w-[260px]" aria-label="Demo details">
                    <div className="text-center p-3 rounded-xl border border-white/10" style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}>
                      <div className="text-sm text-[#A5ADCF]">Year</div>
                      <div className="text-lg font-semibold text-white">{current.year}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl border border-white/10" style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}>
                      <div className="text-sm text-[#A5ADCF]">Stack</div>
                      <div className="text-lg font-semibold text-white">Next.js</div>
                    </div>
                    <div className="text-center p-3 rounded-xl border border-white/10" style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}>
                      <div className="text-sm text-[#A5ADCF]">Preview</div>
                      <div className="text-lg font-semibold text-white">Embedded</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionShell>
        </div>
      </section>

      {/* WHAT WE HAND OFF */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-white">What we hand off</h2>
              <p className="mt-3 text-[#A5ADCF] text-[15px] sm:text-[16px] max-w-[66ch] mx-auto px-2">
                Beyond metrics, partners keep the playbook. Here’s a sampling of wrap‑up artefacts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {workflowExports.map(({ title, items }) => (
                <div key={title} className="rounded-2xl border border-white/12 p-5 sm:p-6" style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}>
                  <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#4F46E5] mt-1 shrink-0" />
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionShell>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-white">Case studies</h2>
              <span className="inline-flex items-center gap-2 text-white/80 text-sm">
                <Trophy className="h-4 w-4" /> Outcomes, not concept decks
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {caseStudies.map((cs) => (
                <a
                  key={cs.title}
                  href={cs.href}
                  className="group rounded-2xl border border-white/12 p-5 sm:p-6 transition hover:border-white/25"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
                >
                  <div className="flex items-center justify-between gap-3 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{cs.title}</h3>
                    <ExternalLink className="h-4 w-4 text-white/70 shrink-0 group-hover:text-white" />
                  </div>
                  <p className="mt-2 text-sm text-white/70">{cs.summary}</p>
                </a>
              ))}
            </div>
          </SectionShell>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-3 sm:mb-4 break-words">
                Partners in the work
              </h2>
              <p className="max-w-[66ch] mx-auto text-[#A5ADCF] text-[15px] sm:text-[16px] px-2">
                Strategic operators trust Anonvic to ship marketing and product wins. These quotes are permissioned from recent collaborations.
              </p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {[{
                name: "Mariam B.", role: "Head of Growth, Retail", quote: "Anonvic launched new funnels in three weeks. We now run weekly creative tests with clean revenue attribution.", result: "+162% ROAS"
              }, {
                name: "Omar S.", role: "Founder, DTC", quote: "They rebuilt our Shopify stack, automated retention, and our returning customer rate spiked within the first month.", result: "+38% LTV"
              }, {
                name: "J. Park", role: "VP Product, SaaS", quote: "The product pod shipped an MVP with analytics and docs. We onboarded customers the same week it went live.", result: "6‑week MVP"
              }, {
                name: "Noor K.", role: "Marketing Lead, Fintech", quote: "SEO workflows, social playbooks, and media pacing finally live in one place. Reporting is a breeze for the exec team.", result: "+4× organic"
              }].map((t, idx) => (
                <div key={idx} className="relative h-full rounded-3xl border border-white/12 p-5 sm:p-7" style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}>
                  <Quote className="h-6 w-6 text-white/70" />
                  <p className="mt-4 text-white/85 text-base leading-relaxed">“{t.quote}”</p>
                  <div className="mt-6 flex items-center justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/50 truncate">{t.role}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
                      <Sparkles className="h-3.5 w-3.5" /> {t.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 sm:py-18 md:py-22 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to collaborate?</h3>
              <p className="text-[#A5ADCF] max-w-[62ch] px-2">
                Share your goals and constraints. We’ll reply with a short plan, timeline, and resourcing recommendations.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:translate-x-1 transition"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.22), backdropFilter: "blur(12px)" }}
              >
                Contact Anonvic <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </SectionShell>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Anonvic — Our Work",
            about: "Live demos, case studies, and impact metrics from Anonvic engagements.",
            hasPart: PROJECTS.slice(0, 3).map((p) => ({
              "@type": "CreativeWork",
              name: p.title,
              url: p.url,
              applicationCategory: "BusinessApplication",
            })),
          }),
        }}
      />
    </>
  );
}
