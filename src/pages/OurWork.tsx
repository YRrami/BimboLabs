/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/WorkPage.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  ExternalLink,
  FolderGit2,
  Trophy,
  Eye,
  Quote,
  Sparkles,
} from "lucide-react";

/* ===================== Local design tokens & helpers ===================== */
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
  primaryStop = 0.14,
  accentStop = 0.1,
  backgroundStop = 0.88
) =>
  `linear-gradient(${angle}deg, ${withAlpha(COLORS.primary, primaryStop)}, ${withAlpha(
    COLORS.accent,
    accentStop
  )}, ${withAlpha(COLORS.background, backgroundStop)})`;
const gradientPrimary = (angle = 140) =>
  `linear-gradient(${angle}deg, ${withAlpha(COLORS.primary, 0.18)}, ${withAlpha(
    COLORS.accent,
    0.14
  )}, ${withAlpha(COLORS.background, 0.92)})`;
const buttonGradient = (opacity = 0.18) => withAlpha(COLORS.primary, opacity);

function SectionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 backdrop-blur-xl px-4 sm:px-8 md:px-12 py-10 sm:py-14 ${className ?? ""}`}
      style={{ background: gradientSoft(), boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)" }}
    >
      {children}
    </div>
  );
}


/* ===================== Local Testimonials ===================== */
function TestimonialsSection() {
  const testimonials = [
    { name: "Mariam B.", role: "Head of Growth, Retail", quote: "Anonvic launched new funnels in three weeks. We now run weekly creative tests with clean revenue attribution.", result: "+162% ROAS" },
    { name: "Omar S.", role: "Founder, DTC", quote: "They rebuilt our Shopify stack, automated retention, and our returning customer rate spiked within the first month.", result: "+38% LTV" },
    { name: "J. Park", role: "VP Product, SaaS", quote: "The product pod shipped an MVP with analytics and docs. We onboarded customers the same week it went live.", result: "6-week MVP" },
    { name: "Noor K.", role: "Marketing Lead, Fintech", quote: "SEO workflows, social playbooks, and media pacing finally live in one place. Reporting is a breeze for the exec team.", result: "+4x organic" },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          className="relative h-full rounded-3xl border border-white/12 p-5 sm:p-7"
          style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
        >
          <Quote className="h-6 w-6 text-white/70" />
          <p className="mt-4 text-white/85 text-base leading-relaxed">"{t.quote}"</p>
          <div className="mt-6 flex items-center justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{t.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/50 truncate">{t.role}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              {t.result}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===================== Local Demos +) ===================== */
function Demos() {
  const projects = [
    {
      id: 1,
      title: "Marketing Agency",
      url: "https://leadmagnett.vercel.app/",
      brief:
        "High-converting storefront starter with bundles, subscriptions, and server-side tracking.",
      tags: ["React", "Stripe", "SEO"],
      year: "2025",
      emoji: "🛒",
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
    },
    {
      id: 3,
      title: "Student Onion of ASU",
      url: "https://sfeclub.site/",
      brief:
        "",
      tags: ["OpenAI", "RAG", "FastAPI"],
      year: "2025",
      emoji: "🤖",
    },
     {
      id: 4,
      title: "Luxurious uPVC industry leader",
      url: "https://egywin-luxury.vercel.app/",
      brief:
        "",
      tags: ["OpenAI", "RAG", "FastAPI"],
      year: "2025",
      emoji: "🔎",
    },
  ] as const;

  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => projects.map(() => false));
  const [mounted, setMounted] = useState<Record<number, boolean>>({ 0: true });
  useEffect(() => setMounted((m) => ({ ...m, [active]: true })), [active]);

  const faviconFor = (u: string) => {
    try {
      return `${new URL(u).origin}/favicon.ico`;
    } catch {
      return "";
    }
  };

  const current = projects[active];
  const currentOrigin = (() => {
    try {
      return new URL(current.url).origin;
    } catch {
      return "";
    }
  })();
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

  const IframeStack = () => (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/90"
      style={{ isolation: "isolate", transform: "translateZ(0)", contain: "paint" as any }}
    >
      {/* Aspect ratio: tall on xs -> wide on md+ */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/10] lg:aspect-[16/9]">
        {projects.map((p, i) => {
          const isActive = active === i;
          const shouldRender = mounted[i];
          return (
            <div
              key={p.id}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                willChange: "opacity",
                transition: "opacity 140ms linear",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                contain: "paint",
              }}
              aria-hidden={!isActive}
              role="tabpanel"
              id={`panel-${p.id}`}
              aria-labelledby={`tab-${p.id}`}
            >
              {shouldRender && (
                <iframe
                  src={p.url}
                  title={`${p.title} preview`}
                  className="absolute inset-0 w-full h-full block"
                  loading={isActive ? "eager" : "lazy"}
                  sandbox="allow-scripts allow-forms allow-same-origin"
                  referrerPolicy="no-referrer"
                  onLoad={() =>
                    setLoaded((prev) => (prev[i] ? prev : Object.assign([...prev], { [i]: true })))
                  }
                  style={{
                    border: 0,
                    background: "black",
                    display: "block",
                    transform: "translateZ(0)",
                  }}
                />
              )}
              {!loaded[i] && (
                <div className="absolute inset-0 z-[2] bg-[linear-gradient(120deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]" />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-3 bottom-2 z-[3] text-[11px] text-[#A5ADCF] opacity-70">
        If the preview is blank, that site blocks embedding. Use "Open".
      </div>
    </div>
  );

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      {/* Tabs (scrollable on mobile) */}
      <div
        className="relative -mx-2 px-2 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none snap-x snap-mandatory"
        role="tablist"
        aria-label="Live demos"
        ref={tabsRef}
        onKeyDown={onTabsKeyDown}
      >
        <div className="flex w-max items-center gap-2 sm:gap-3">
          {projects.map((p, idx) => {
            const fav = faviconFor(p.url);
            const activeTab = active === idx;
            const tabStyle = activeTab
              ? { backgroundImage: gradientPrimary() }
              : ({ backgroundColor: withAlpha(COLORS.primary, 0.08) } as React.CSSProperties);
            return (
              <button
                key={p.id}
                onClick={() => setActive(idx)}
                className={`snap-start relative px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60 ${
                  activeTab ? "text-white" : "text-[#A5ADCF] hover:text-white"
                }`}
                style={tabStyle}
                title={p.title}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={activeTab}
                aria-controls={`panel-${p.id}`}
              >
                <span className="relative z-10 inline-flex items-center gap-2 min-w-0">
                  <img
                    src={fav}
                    alt=""
                    className="h-4 w-4 rounded shrink-0"
                    onError={(e) => ((e.currentTarget.style as any).display = "none")}
                  />
                  <span className="text-base leading-none">{p.emoji}</span>
                  <span className="truncate max-w-[14ch] sm:max-w-[18ch]">{p.title}</span>
                </span>
                {activeTab && <div className="absolute -inset-1 rounded-xl bg-white/10 blur-lg" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview + details (single-column by default) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
        <div className="relative rounded-3xl p-[1px] min-w-0" style={{ background: gradientSoft(130, 0.14, 0.12, 0.8) }}>
          <div
            className="relative rounded-3xl p-4 sm:p-6"
            style={{ backgroundColor: withAlpha(COLORS.background, 0.92) }}
          >
            <div className="mb-4 flex items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={currentFavicon}
                  alt=""
                  className="h-6 w-6 rounded shrink-0"
                  onError={(e) => ((e.currentTarget.style as any).display = "none")}
                />
                <div className="min-w-0">
                  <h3 className="text-white font-semibold truncate">{current.title}</h3>
                  <p className="text-xs text-[#A5ADCF] truncate">
                    {currentOrigin.replace(/^https?:\/\//, "")} • {current.year}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(current.url);
                    } catch {
                      alert("Copy failed. Please copy manually.");
                    }
                  }}
                  className="px-2 py-1 text-xs rounded-lg border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
                  aria-label="Copy link"
                >
                  Copy
                </button>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
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

        <div className="space-y-5 sm:space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              {current.title}
            </h3>
            <p className="text-[#A5ADCF] text-base sm:text-lg leading-relaxed mb-5 sm:mb-6 break-words">
              {current.brief}
            </p>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {current.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 text-[#A5ADCF] border border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={current.url}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                style={{
                  backgroundColor: buttonGradient(0.26),
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Eye className="h-5 w-5" />
                Visit Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3" aria-label="Demo details">
            <div
              className="text-center p-3 rounded-xl border border-white/10"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
            >
              <div className="text-sm text-[#A5ADCF]">Year</div>
              <div className="text-lg font-semibold text-white">{current.year}</div>
            </div>
            <div
              className="text-center p-3 rounded-xl border border-white/10"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
            >
              <div className="text-sm text-[#A5ADCF]">Stack</div>
              <div className="text-lg font-semibold text-white">Next.js</div>
            </div>
            <div
              className="text-center p-3 rounded-xl border border-white/10"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.12) }}
            >
              <div className="text-sm text-[#A5ADCF]">Preview</div>
              <div className="text-lg font-semibold text-white">Embedded</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-[#A5ADCF]">
        Tip: swipe tabs to switch demos
      </div>
    </div>
  );
}

/* ===================== Page data ===================== */
const impactStories = [
  {
    label: "DTC Beauty",
    metric: "+162%",
    detail:
      "ROAS increase after replatforming paid media funnels, landing pages, and lifecycle nurtures.",
  },
  {
    label: "SaaS Analytics",
    metric: "6-week",
    detail:
      "MVP launch including onboarding flows, docs, and first ten enterprise customers.",
  },
  {
    label: "Fintech",
    metric: "4x",
    detail:
      "Organic traffic lift from technical SEO, editorial ops, and schema automation.",
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
    summary:
      "Programmatic landing system, schema, and internal linking. +3.1x signups from organic.",
    href: "/case-studies/seo-b2b-saas.pdf",
  },
  {
    title: "RAG Support Copilot",
    summary:
      "Hybrid search over docs with analytics. Ticket deflection and CSAT both improved.",
    href: "/case-studies/rag-support.pdf",
  },
];

/* ===================== Page ===================== */
export default function WorkPage() {
  return (
    <>
      {/* HERO + LOGO WALL */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent break-words">
                Our Work
              </h1>
              <p className="mt-4 text-[#A5ADCF] text-[15px] sm:text-[16px] max-w-[68ch] mx-auto px-2">
                Explore active demos, partner results, and the infrastructure that keeps campaigns
                and product releases on track. Everything shown here is production use, not concept decks.
              </p>
            </div>
           
          </SectionShell>
        </div>
      </section>

      {/* IMPACT SCOREBOARD */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-white">Impact scoreboard</h2>
                <p className="text-[#A5ADCF] text-[15px] sm:text-[16px] leading-relaxed">
                  We measure every engagement against target metrics agreed up front. These are a few
                  snapshots pulled from partner dashboards.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="/anonvic-capabilities.pdf"
                    className="inline-flex items-center gap-2 text-sm rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:text-white transition"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
                  >
                    <Download className="h-4 w-4" />
                    Download sample report
                  </a>
                  <a
                    href="/case-studies/anonvic-case-studies-pack.zip"
                    className="inline-flex items-center gap-2 text-sm rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:text-white transition"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
                  >
                    <FolderGit2 className="h-4 w-4" />
                    Case studies pack
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {impactStories.map(({ label, metric, detail }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/12 p-5 sm:p-6"
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
            </div>
          </SectionShell>
        </div>
      </section>

      {/* LIVE DEMOS */}
      <section id="projects" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-3 sm:mb-4 break-words">
                Live demos
              </h2>
              <p className="max-w-[66ch] mx-auto text-[#A5ADCF] text-[15px] sm:text-[16px] px-2">
                Try battle-tested blueprints you can deploy quickly. Every demo represents a packaged
                engagement we can adapt to your brand.
              </p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] mx-auto rounded-full" />
            </div>
            <Demos />
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
                Beyond metrics, partners keep the playbook. Here is a sampling of the artefacts teams
                receive when an engagement wraps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {workflowExports.map(({ title, items }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/12 p-5 sm:p-6"
                  style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
                >
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
                <Trophy className="h-4 w-4" />
                Outcomes, not concept decks
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
                Strategic operators trust Anonvic to ship marketing and product wins. These
                testimonials are permissioned quotes from recent collaborations.
              </p>
              <div className="mt-5 sm:mt-6 h-1 w-24 sm:w-32 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] mx-auto rounded-full" />
            </div>
            <TestimonialsSection />
          </SectionShell>
        </div>
      </section>

      {/* CTA → CONTACT */}
      <section className="relative py-14 sm:py-18 md:py-22 px-4 sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to collaborate?</h3>
              <p className="text-[#A5ADCF] max-w-[62ch] px-2">
                Share your goals and constraints. We’ll reply with a short plan, timeline, and
                resourcing recommendations.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:translate-x-1 transition"
                style={{
                  backgroundColor: withAlpha(COLORS.primary, 0.22),
                  backdropFilter: "blur(12px)",
                }}
              >
                Contact Anonvic <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </SectionShell>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Anonvic — Our Work",
            about:
              "Live demos, case studies, and impact metrics from Anonvic engagements.",
            hasPart: [
              {
                "@type": "CreativeWork",
                name: "Ecommerce Accelerator",
                url: "https://leadmagnett.vercel.app/",
                applicationCategory: "BusinessApplication",
              },
              {
                "@type": "CreativeWork",
                name: "SEO Landing Framework",
                url: "https://healthtrip-opal.vercel.app/",
                applicationCategory: "BusinessApplication",
              },
              {
                "@type": "CreativeWork",
                name: "RAG Support Copilot",
                url: "https://sfeclub.vercel.app/",
                applicationCategory: "BusinessApplication",
              },
            ],
          }),
        }}
      />
    </>
  );
}
