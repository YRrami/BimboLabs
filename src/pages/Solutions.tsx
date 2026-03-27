// src/pages/SolutionsPage.tsx
// Content update to match your exact Solutions wording:
// - Marketing solutions: ads, content, campaigns
// - Brand management: logos, brand identity, visual system
// - Software: apps, websites, systems
// - Business: strategies, SWOT analysis, case studies, feasibility studies, consultations
//
// NOTE: This keeps your layout, animations, and structure the same.
// Only copy + bullets + "included" lists + plans are updated.

import * as React from "react";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Code2,
  Palette,
  Megaphone,
  Sparkles,
  Zap,
  Gauge,
  ShieldCheck,
  BarChart3,
  Target,
  Layers,
  Wand2,
} from "lucide-react";
import { SectionShell, COLORS } from "../components/layout/SiteLayout";

import svcEngineering from "../assets/companies/cover.png";
import svcBrand from "../assets/companies/cover.png";
import svcMarketing from "../assets/companies/cover.png";

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

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
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

function UseCaseBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[#050013]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.60)_0%,_rgba(5,0,19,1)_45%,_rgba(2,0,7,1)_80%)]" />

      <div
        className="absolute -top-24 left-[10%] h-[420px] w-[420px] rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.28), transparent 68%)",
        }}
      />
      <div
        className="absolute top-[10%] right-[6%] h-[420px] w-[420px] rounded-full blur-sm"
        style={{
          background:
            "radial-gradient(circle, rgba(190,242,100,0.18), transparent 70%)",
        }}
      />

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

type Logo = { alt: string; src: string };

function LogoCarouselPill({ logos }: { logos: Logo[] }) {
  const track = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div
          className="rounded-[46px] bg-[#F3F0FF] px-6 py-10 shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:px-10"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-black tracking-[0.18em] text-slate-600">
              TRUSTED BY TEAMS & BRANDS
            </div>
            <div className="text-xs text-slate-500">Auto-scroll • hover to pause</div>
          </div>

          <div className="relative overflow-hidden rounded-[40px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-[#F3F0FF] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-gradient-to-l from-[#F3F0FF] to-transparent"
            />

            <div aria-hidden className="lp-shine pointer-events-none absolute inset-0 z-10 opacity-35" />

            <div className="lp-marquee" aria-label="Previous clients">
              <div className="lp-marquee-track">
                {track.map((l, i) => (
                  <div key={`${l.alt}-${i}`} className="lp-logo-item">
                    <div className="lp-logo-chip">
                      <img
                        src={l.src}
                        alt={l.alt}
                        className="lp-logo"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <style>{`
              .lp-marquee { width: 100%; overflow: hidden; }
              .lp-marquee-track {
                display: flex;
                align-items: center;
                width: max-content;
                animation: lp-marquee 20s linear infinite;
              }
              .lp-marquee:hover .lp-marquee-track { animation-play-state: paused; }

              .lp-logo-item { flex: 0 0 auto; padding: 0 18px; display: grid; place-items: center; }
              .lp-logo-chip {
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
              .lp-logo-chip:hover {
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
              .lp-logo-chip:hover .lp-logo {
                opacity: 1;
                filter: grayscale(0);
                transform: scale(1.02);
              }
              .lp-shine {
                background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.40) 12%, transparent 22%);
                transform: translateX(-60%);
                animation: lp-shine 6.5s ease-in-out infinite;
              }
              @keyframes lp-shine {
                0% { transform: translateX(-60%); }
                55% { transform: translateX(60%); }
                100% { transform: translateX(60%); }
              }
              @keyframes lp-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @media (max-width: 640px) {
                .lp-logo-item { padding: 0 10px; }
                .lp-logo-chip { height: 58px; min-width: 128px; padding: 0 16px; }
                .lp-logo { height: 30px; }
              }
              @media (prefers-reduced-motion: reduce) {
                .lp-marquee-track { animation: none; }
                .lp-shine { animation: none; opacity: 0; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
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

type ImageVariants = {
  avif?: { [width: string]: string };
  webp?: { [width: string]: string };
  fallback?: string;
};

type Pillar = {
  id: string;
  kicker: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  image: string | ImageVariants;
  bullets: string[];
  includedLabel: string;
  included: string[];
  accent: string;
};

type Plan = {
  name: string;
  price: string;
  badge?: string;
  desc: string;
  bullets: string[];
  emphasized?: boolean;
};

function ParallaxMedia({
  src,
  alt,
  accent,
}: {
  src: string | ImageVariants;
  alt: string;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[44px] blur-sm"
        style={{
          background: `radial-gradient(circle at 30% 10%, ${withAlpha(
            accent,
            0.28
          )}, transparent 65%)`,
        }}
      />
      <div
        className="group relative overflow-hidden rounded-[38px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-[0_35px_110px_rgba(15,23,42,0.14)] transition hover:-translate-y-[2px] hover:shadow-[0_55px_140px_rgba(15,23,42,0.18)]"
      >
        {typeof src === 'string' ? (
          <img src={src} alt={alt} className="block w-full select-none object-cover" draggable={false} loading="lazy" />
        ) : (
          <picture>
            {src.avif && (
              <source
                type="image/avif"
                srcSet={Object.entries(src.avif)
                  .map(([w, p]) => `${p} ${w}w`)
                  .join(', ')}
                sizes="(max-width:1024px) 100vw, 1024px"
              />
            )}
            {src.webp && (
              <source
                type="image/webp"
                srcSet={Object.entries(src.webp)
                  .map(([w, p]) => `${p} ${w}w`)
                  .join(', ')}
                sizes="(max-width:1024px) 100vw, 1024px"
              />
            )}
            <img src={src.fallback} alt={alt} className="block w-full select-none object-cover" draggable={false} loading="lazy" />
          </picture>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(circle at 30% 10%, ${withAlpha(
              accent,
              0.18
            )} 0%, rgba(59,130,246,0.06) 30%, transparent 60%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-70"
          style={{
            background:
              "linear-gradient(to top, rgba(15,23,42,0.08), transparent)",
          }}
        />
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  const logos: Logo[] = useMemo(
    () => [
      { alt: "Zapier", src: "https://cdn.simpleicons.org/zapier/000000" },
      { alt: "Shopify", src: "https://cdn.simpleicons.org/shopify/000000" },
      { alt: "SoundCloud", src: "https://cdn.simpleicons.org/soundcloud/000000" },
      { alt: "HBR", src: "https://logo.clearbit.com/hbr.org" },
      { alt: "CHOMPS", src: "https://logo.clearbit.com/chomps.com" },
      { alt: "eBay", src: "https://cdn.simpleicons.org/ebay/000000" },
      { alt: "Vimeo", src: "https://cdn.simpleicons.org/vimeo/000000" },
    ],
    []
  );

  // UPDATED PILLARS CONTENT (matches your requested wording)
  const pillars: Pillar[] = useMemo(
    () => [
      {
        id: "marketing",
        kicker: "Marketing Solutions",
        title: "Ads + content that drive reach, leads, and sales",
        desc:
          "We plan, create, and run campaigns across the channels that matter—ad creative, content systems, and optimization with clear reporting.",
        icon: <Megaphone className="h-4 w-4" />,
        image: svcMarketing,
        bullets: [
          "Paid ads (Meta / Google) + optimization",
          "Content creation (posts, reels, scripts, copy)",
          "Campaign strategy + reporting dashboards",
        ],
        includedLabel: "Marketing deliverables",
        included: [
          "Ad account setup + pixels",
          "Creative variations (static + video)",
          "Content calendar + posting plan",
          "Lead funnels + landing flow",
          "Weekly performance report",
        ],
        accent: "#38BDF8",
      },
      {
        id: "branding",
        kicker: "Brand Management",
        title: "Logos, brand identity, and the full visual system",
        desc:
          "A complete brand kit that stays consistent everywhere—web, ads, social, and product. Clear rules, reusable templates, and fast execution.",
        icon: <Palette className="h-4 w-4" />,
        image: svcBrand,
        bullets: [
          "Logo design + variations",
          "Brand identity (colors, typography, style)",
          "Guidelines + templates for daily use",
        ],
        includedLabel: "Brand essentials",
        included: [
          "Logo suite (primary + secondary + icon)",
          "Color palette + typography",
          "Brand guidelines (short + practical)",
          "Social templates",
          "Business assets (cards / signature)",
        ],
        accent: "#A855F7",
      },
      {
        id: "software",
        kicker: "Software Engineering",
        title: "Apps, websites, and systems — built to scale",
        desc:
          "We build cross-platform apps, websites, and internal systems with clean architecture, performance-first UI, and reliable handoff.",
        icon: <Code2 className="h-4 w-4" />,
        image: svcEngineering,
        bullets: [
          "Websites + landing pages",
          "Apps (cross-platform) + admin dashboards",
          "Systems, integrations, and automation",
        ],
        includedLabel: "Common builds",
        included: [
          "Business websites",
          "E-commerce / booking flows",
          "Admin dashboards",
          "APIs + integrations",
          "Maintenance + iteration",
        ],
        accent: "#4F46E5",
      },
      {
        id: "business",
        kicker: "Business Consulting",
        title: "Strategies that take you from step one to execution",
        desc:
          "We clarify what to build and how to grow—business strategies, SWOT analysis, feasibility studies, and consultation sessions with actionable next steps.",
        icon: <Wand2 className="h-4 w-4" />,
        image: svcEngineering,
        bullets: [
          "Business strategy + roadmap",
          "SWOT analysis + market research",
          "Feasibility studies + case studies",
        ],
        includedLabel: "Typical outputs",
        included: [
          "SWOT + positioning notes",
          "Competitor analysis",
          "Feasibility report (costs + risks)",
          "Case study framework",
          "Consultation sessions + action plan",
        ],
        accent: "#C7F36B",
      },
    ],
    []
  );

  // UPDATED PACKAGES CONTENT
  const plans: Plan[] = useMemo(
    () => [
      {
        name: "Brand Identity Kit",
        price: "From $200",
        desc: "Logo + brand identity to look consistent everywhere.",
        bullets: ["Logo suite + palette", "Typography + templates", "Short brand guidelines"],
      },
      {
        name: "Campaign & Ads",
        price: "From $300/mo",
        badge: "Most chosen",
        desc: "Ads + content system with reporting and optimization.",
        bullets: ["Paid ads management", "Content calendar + creatives", "Weekly performance report"],
        emphasized: true,
      },
      {
        name: "Build Sprint",
        price: "Contact",
        desc: "Website/app/system delivery with fast turnaround.",
        bullets: ["UI/UX + development", "Integrations & QA", "Launch + support"],
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <section
        className="relative w-full overflow-hidden text-white"
        style={{ backgroundColor: COLORS.background }}
      >
        <UseCaseBackground />
        <SoftGridNoise />

        <SectionShell className="relative z-30 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div>
                <DarkKicker>Solutions</DarkKicker>
              </div>

              <h1
                className="mt-5 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl"
              >
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-slate-50 via-sky-100 to-lime-300 bg-clip-text text-transparent">
                  build, brand, and grow
                </span>
                .
              </h1>

              <p
                className="mt-5 max-w-xl text-balance text-sm leading-relaxed text-slate-200/90 sm:text-base md:text-lg"
              >
                Marketing solutions (ads + content), brand management (logos + identity),
                software (apps + websites + systems), and business consulting
                (strategies, SWOT, feasibility, and case studies).
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(190,242,100,0.35)] transition hover:translate-y-[1px] hover:bg-[#d4ff80]"
                >
                  Get a plan <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  View packages <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: <Zap className="h-4 w-4" />, label: "Fast delivery", value: "ship weekly" },
                  { icon: <Gauge className="h-4 w-4" />, label: "Performance", value: "speed-first" },
                  { icon: <ShieldCheck className="h-4 w-4" />, label: "Consistency", value: "brand aligned" },
                ].map((x) => (
                  <div key={x.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/10">
                        {x.icon}
                      </span>
                      {x.label}
                    </div>
                    <div className="mt-3 text-lg font-semibold text-white">{x.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="lg:col-span-6"
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-[44px] bg-white/5 blur-sm" />

                <div className="relative rounded-[40px] border border-white/10 bg-black/25 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-black tracking-[0.18em] text-white/55">
                      SOLUTIONS SNAPSHOT
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                      clear scope
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {[
                      {
                        title: "Marketing solutions",
                        desc: "Ads, content, creatives, and optimization.",
                        icon: <Target className="h-4 w-4" />,
                        tint: "rgba(56,189,248,0.18)",
                      },
                      {
                        title: "Brand management",
                        desc: "Logos, identity, and visual systems.",
                        icon: <Layers className="h-4 w-4" />,
                        tint: "rgba(168,85,247,0.18)",
                      },
                      {
                        title: "Software builds",
                        desc: "Apps, websites, systems, and integrations.",
                        icon: <Code2 className="h-4 w-4" />,
                        tint: "rgba(99,102,241,0.18)",
                      },
                      {
                        title: "Business consulting",
                        desc: "Strategies, SWOT, feasibility, and case studies.",
                        icon: <BarChart3 className="h-4 w-4" />,
                        tint: "rgba(190,242,100,0.18)",
                      },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className={cn(
                          "group rounded-3xl border border-white/10 bg-white/[0.05] p-5 transition",
                          "hover:bg-white/[0.08] hover:border-white/25"
                        )}
                        style={{ boxShadow: `0 24px 60px -46px ${c.tint}` }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                            {c.icon}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-white">{c.title}</div>
                              <span className="h-1 w-1 rounded-full bg-white/40" />
                              <div className="text-[11px] text-white/60">solution</div>
                            </div>
                            <div className="mt-1 text-sm text-white/70">{c.desc}</div>
                          </div>
                          <ArrowRight className="ml-auto mt-1 h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1" />
                        </div>

                        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            aria-hidden
                            className="h-full w-[55%] rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <Wand2 className="h-5 w-5 text-white/80" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white">
                          “One partner for strategy, brand, marketing, and software.”
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          fewer handoffs • faster progress • consistent quality
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="hidden sm:block absolute -left-6 top-10 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">Business</div>
                  <div className="mt-1 text-sm font-semibold text-white">SWOT + feasibility</div>
                </div>
                <div
                  className="hidden sm:block absolute -right-5 bottom-10 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">Marketing</div>
                  <div className="mt-1 text-sm font-semibold text-white">ads + content</div>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      </section>

      <LogoCarouselPill logos={logos} />

      {/* Keep your PPC-ready block as-is (optional) */}

      {/* PILLARS SECTION (uses updated pillars array) */}
      <section className="w-full bg-white text-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>SERVICES</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Solutions for marketing, brand, software, and business
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              Pick one area or combine multiple—same team, one workflow, clean execution.
            </p>
          </div>

          <div className="mt-14 space-y-16 md:space-y-20">
            {pillars.map((p, idx) => (
              <div key={p.id} id={p.id} className="scroll-mt-28">
                <div
                  className={cn(
                    "grid items-center gap-10 lg:grid-cols-12",
                    idx % 2 === 1 && "lg:[&>div:first-child]:order-2"
                  )}
                >
                  <div
                    className="lg:col-span-5"
                  >
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-700">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                          {p.icon}
                        </span>
                        {p.kicker.toUpperCase()}
                      </div>
                    </div>

                    <h3 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">
                      {p.title}
                    </h3>

                    <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                      {p.desc}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-slate-700 sm:text-base">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                            <Check className="h-4 w-4" />
                          </span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
                      <div className="text-xs font-black tracking-[0.18em] text-slate-500">
                        {p.includedLabel.toUpperCase()}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.included.map((x) => (
                          <span
                            key={x}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {x}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                      >
                        Discuss {p.kicker} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href="#packages"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                      >
                        See packages <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div
                    className="lg:col-span-7"
                  >
                    <ParallaxMedia src={p.image} alt={`${p.kicker} preview`} accent={p.accent} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES (updated plans array) */}
      <section id="packages" className="w-full bg-white text-slate-900">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-2 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <LightKicker>PACKAGES</LightKicker>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Choose a starting point
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
              We can combine services—marketing + brand + software + business strategy—in one roadmap.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[34px] border bg-white p-7",
                  "shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:shadow-[0_35px_110px_rgba(15,23,42,0.12)]",
                  p.emphasized ? "border-slate-900" : "border-slate-200"
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-70"
                  style={{
                    background: p.emphasized
                      ? "linear-gradient(90deg, rgba(15,23,42,0.0), rgba(15,23,42,0.65), rgba(15,23,42,0.0))"
                      : "linear-gradient(90deg, rgba(15,23,42,0.0), rgba(15,23,42,0.18), rgba(15,23,42,0.0))",
                  }}
                />

                {p.badge ? (
                  <div className="absolute right-6 top-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white">
                    {p.badge}
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                    {["starter", "recommended", "build"][i] ?? "plan"}
                  </div>
                </div>

                <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                <div className="mt-5 text-4xl font-black tracking-tight">{p.price}</div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                <ul className="mt-6 space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Link
                    to="/contact"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
                      p.emphasized
                        ? "bg-slate-900 text-white hover:opacity-95"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    )}
                  >
                    Get started <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Sparkles className="h-4 w-4" /> We can combine packages
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (optional: keep your existing CTA section below if you already have it) */}
    </div>
  );
}
