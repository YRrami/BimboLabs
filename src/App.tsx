// Hero.tsx (content refresh)
// Changes (content-only; structure preserved):
// - Clear positioning: software + marketing + brand management (3 major services)
// - Emphasis: cost efficient, fast pace, flexible, AI + human expertise, fewer errors
// - Stronger CTA copy + tighter benefits + better section headings and packages text
//
// NOTE: This keeps your existing layout/animations and only replaces copy + labels.
// You can tweak brand name "Anonvic" if needed.

import React, { useMemo, useState } from "react";
// Animations completely removed for performance
import {
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Wand2,
  Search,
  Users,
  Code2,
  Palette,
  Briefcase,
} from "lucide-react";

import mainMock from "./assets/companies/cover.png";
import chartMock from "./assets/companies/asu-logo.png";

import svcEngineering from "./assets/companies/image one.png";
import svcBrand from "./assets/companies/image two.png";



import svcMarketing from "./assets/companies/66.png";
import hubMock from "./assets/companies/5.png";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300 w-0"
    />
  );
}

function BackgroundEffects() {
  // Detect if we're on mobile to disable expensive animations
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[#050013]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3b27b5_0%,_#050013_45%,_#020007_80%)]" />
      <div className="absolute inset-x-[-25%] top-[16%] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.95)_0%,_rgba(129,140,248,0.4)_40%,_rgba(15,23,42,0)_75%)] blur-sm" />

      {!isMobile && (
        <>
          <div
            aria-hidden
            className="animate-beam-1 absolute left-[-10%] right-[-30%] top-[30%] h-64"
            style={{
              background:
                "linear-gradient(120deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.26) 35%, rgba(190,242,100,0.16) 60%, rgba(190,242,100,0) 100%)",
              filter: "blur(0px)",
              opacity: 0.03,
            }}
          />
          <div
            aria-hidden
            className="animate-beam-2 absolute left-[-20%] right-[-5%] top-[55%] h-56"
            style={{
              background:
                "linear-gradient(120deg, rgba(129,140,248,0) 0%, rgba(129,140,248,0.3) 40%, rgba(56,189,248,0.28) 70%, rgba(56,189,248,0) 100%)",
              filter: "blur(0px)",
              opacity: 0.03,
            }}
          />

          <div
            aria-hidden
            className="animate-orb-1 absolute -top-40 left-[18%] h-[420px] w-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(129,140,248,0.55) 0%, rgba(56,189,248,0.2) 35%, transparent 70%)",
              filter: "blur(0px)",
              opacity: 0.02,
            }}
          />
          <div
            aria-hidden
            className="animate-orb-2 absolute bottom-[-80px] right-[10%] h-[380px] w-[380px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(52,211,153,0.4) 0%, rgba(96,165,250,0.25) 35%, transparent 70%)",
              filter: "blur(0px)",
              opacity: 0.02,
            }}
          />
        </>
      )}
    </div>
  );
}

function SectionHeading({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker ? (
        <div className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-700">
          {kicker}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

/* ------------------------------ services (updated copy) ------------------------------ */
type ImageVariants = {
  avif?: { [width: string]: string };
  webp?: { [width: string]: string };
  fallback?: string;
};

type Feature = {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string | ImageVariants;
  imageAlt: string;
  ctaLabel: string;
  icon: React.ReactNode;
};

function FeatureRow({ feature, reversed }: { feature: Feature; reversed?: boolean }) {
  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-12", reversed && "lg:[&>div:first-child]:order-2")}>
      <div className="lg:col-span-5">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-700">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
            {feature.icon}
          </span>
          {feature.kicker.toUpperCase()}
        </div>

        <h3 className="text-balance text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{feature.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{feature.description}</p>

        <ul className="mt-6 space-y-3">
          {feature.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-slate-700 sm:text-base">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <Check className="h-4 w-4" />
              </span>
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        <a href="/contact" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-slate-900">
          {feature.ctaLabel}
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c7f36b] text-black shadow-[0_12px_35px_rgba(190,242,100,0.35)] transition hover:translate-y-[1px]">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </div>

      <div className="lg:col-span-7">
        <div className="group relative overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-[0_35px_110px_rgba(15,23,42,0.14)] transition hover:-translate-y-[2px] hover:shadow-[0_55px_140px_rgba(15,23,42,0.18)]">
          {typeof feature.imageSrc === 'string' ? (
            <img src={feature.imageSrc} alt={feature.imageAlt} className="block w-full select-none object-cover" draggable={false} loading="lazy" />
          ) : (
            <picture>
              {feature.imageSrc.avif && (
                <source
                  type="image/avif"
                  srcSet={Object.entries(feature.imageSrc.avif)
                    .map(([w, p]) => `${p} ${w}w`)
                    .join(', ')}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              )}
              {feature.imageSrc.webp && (
                <source
                  type="image/webp"
                  srcSet={Object.entries(feature.imageSrc.webp)
                    .map(([w, p]) => `${p} ${w}w`)
                    .join(', ')}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              )}
              <img src={feature.imageSrc.fallback} alt={feature.imageAlt} className="block w-full select-none object-cover" draggable={false} loading="lazy" />
            </picture>
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 30% 10%, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.08) 30%, transparent 60%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ServicesSolutionsSection() {
  const features: Feature[] = useMemo(
    () => [
      {
        kicker: "Software Engineering",
        title: "Apps, systems, and websites — engineered to scale",
        description:
          "We build cross-platform apps, internal systems, and high-performance websites with clean architecture and a premium UI layer.",
        bullets: [
          "Cross-platform apps + web platforms",
          "Systems, dashboards, and integrations",
          "Fast delivery with QA + performance budgets",
        ],
        imageSrc: svcEngineering,
        imageAlt: "Software engineering preview",
        ctaLabel: "Talk to us about your build",
        icon: <Code2 className="h-4 w-4" />,
      },
      {
        kicker: "Marketing & Business",
        title: "Strategies, studies, and analytics — from step one",
        description:
          "We take your business from zero to a clear plan: market research, positioning, funnels, and measurable growth execution.",
        bullets: [
          "Strategy + competitor research",
          "Funnel design and conversion improvements",
          "Tracking, reporting, and iteration cycles",
        ],
        imageSrc: svcMarketing,
        imageAlt: "Marketing and business preview",
        ctaLabel: "Get a growth plan",
        icon: <Briefcase className="h-4 w-4" />,
      },
      {
        kicker: "Brand Management",
        title: "Your full visual identity — built and maintained",
        description:
          "We create a consistent brand system: logo direction, typography, colors, layouts, and templates across every touchpoint.",
        bullets: [
          "Brand identity + design direction",
          "Design system tokens + templates",
          "Consistency across web, product, and campaigns",
        ],
        imageSrc: svcBrand,
        imageAlt: "Brand management preview",
        ctaLabel: "Build your visual identity",
        icon: <Palette className="h-4 w-4" />,
      },
    ],
    []
  );

  return (
    <section className="w-full bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 md:pb-20">
        <SectionHeading
          title="One team. Three core services."
          subtitle="Cost-efficient delivery powered by advanced AI + human expertise — fewer errors, faster pace, and flexible execution."
        />

        <div className="mt-14 space-y-16 md:space-y-20">
          {features.map((f, i) => (
            <FeatureRow key={f.title} feature={f} reversed={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------ packages (updated content + renamed) ------------------------------ */
type Plan = {
  name: string;
  badge?: string;
  priceMonthly: number;
  priceAnnual: number;
  desc: string;
  bullets: string[];
  emphasized?: boolean;
  cta: string;
  footnote?: string;
};

function BillingToggle({ annual, setAnnual }: { annual: boolean; setAnnual: (v: boolean) => void }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <span className={cn("text-sm font-semibold", !annual ? "text-slate-900" : "text-slate-500")}>Monthly</span>
      <button
        type="button"
        onClick={() => setAnnual(!annual)}
        className={cn(
          "relative h-9 w-16 rounded-full border transition",
          annual ? "border-slate-900 bg-slate-900" : "border-slate-200 bg-slate-100"
        )}
        aria-label="Toggle billing period"
      >
        <span className={cn("absolute top-1 h-7 w-7 rounded-full bg-white shadow transition", annual ? "left-8" : "left-1")} />
      </button>
      <span className={cn("text-sm font-semibold", annual ? "text-slate-900" : "text-slate-500")}>
        Annual <span className="ml-2 rounded-full bg-[#c7f36b] px-2 py-1 text-xs font-black text-black">Save 20%</span>
      </span>
    </div>
  );
}

function MinimalPackages() {
  const [annual, setAnnual] = useState(true);

  const plans: Plan[] = useMemo(
    () => [
      {
        name: "Launch Strategy",
        priceMonthly: 99,
        priceAnnual: 79,
        desc: "Business + marketing foundations that move you forward.",
        bullets: ["Market/competitor analysis", "Positioning + funnel plan", "Tracking + weekly iterations"],
        cta: "Start with strategy",
        footnote: "Best for: new launches or stalled growth.",
      },
      {
        name: "Build & Ship",
        badge: "Most chosen",
        priceMonthly: 149,
        priceAnnual: 119,
        desc: "Software engineering for apps, systems, and websites.",
        bullets: ["Cross apps + websites", "APIs + integrations", "QA + performance pass"],
        emphasized: true,
        cta: "Start building",
        footnote: "Best for: shipping a product or platform fast.",
      },
      {
        name: "Brand System",
        priceMonthly: 119,
        priceAnnual: 95,
        desc: "Full visual identity and consistency across assets.",
        bullets: ["Visual identity direction", "Design system + templates", "Brand consistency rollout"],
        cta: "Build the brand",
        footnote: "Best for: rebrands, new brands, or scaling teams.",
      },
    ],
    []
  );

  return (
    <section id="packages" className="w-full bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading
          kicker="Packages"
          title="Simple entry points. Flexible execution."
          subtitle="Choose a starting point — we can scale scope up or down without slowing you down."
        />
        <BillingToggle annual={annual} setAnnual={setAnnual} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const price = annual ? p.priceAnnual : p.priceMonthly;

            return (
              <div
                key={p.name}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[34px] border bg-white p-7",
                  "shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-[2px] hover:shadow-[0_35px_110px_rgba(15,23,42,0.12)]",
                  p.emphasized ? "border-slate-900" : "border-slate-200"
                )}
              >
                {p.emphasized ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        background:
                          "radial-gradient(circle at 20% 20%, rgba(190,242,100,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 40%, rgba(56,189,248,0.10) 0%, transparent 55%)",
                      }}
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300" />
                  </>
                ) : null}

                {p.badge ? (
                  <div className="absolute right-6 top-6 z-10 rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white">
                    {p.badge}
                  </div>
                ) : null}

                <div className="relative z-10">
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <p className="mt-2 text-sm text-slate-600">{p.desc}</p>

                  <div className="mt-5 flex items-end gap-2">
                    <div className="text-5xl font-black tracking-tight">${price}</div>
                    <div className="pb-1 text-sm font-semibold text-slate-500">/mo</div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
                    {p.footnote}
                  </div>

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

                  <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
                    Includes: roadmap + weekly delivery + documented handoff.
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-7">
                  <a
                    href="/contact"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition",
                      p.emphasized ? "bg-slate-900 text-white hover:opacity-95" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    )}
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </a>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Sparkles className="h-4 w-4" /> Flexible scope • Fast pace
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div id="contact" className="h-1 w-full bg-white" />
      </div>
    </section>
  );
}

/* ------------------------------ dark hub (updated copy) ------------------------------ */
function DarkFeatureHub() {
  const cards = [
    { icon: <Wand2 className="h-5 w-5" />, title: "AI + human QA", desc: "Automation for speed, humans for correctness." },
    { icon: <Search className="h-5 w-5" />, title: "Research-led decisions", desc: "Strategies and studies before execution." },
    { icon: <Users className="h-5 w-5" />, title: "Flexible delivery", desc: "Adjust scope quickly without breaking timelines." },
  ];

  return (
    <section className="w-full bg-[#050013] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="rounded-[44px] border border-white/10 bg-white/5 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-10">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-white/5 via-white/6 to-white/5 p-7 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(190,242,100,0.30)_0%,transparent_65%)] blur-sm" />
            <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.30)_0%,transparent_65%)] blur-sm" />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <h3 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">
                  Advanced execution,
                  <br />
                  fewer surprises.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
                  We combine advanced AI with experienced builders and strategists to reduce errors and ship fast.
                </p>

                <a href="#packages" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white">
                  View packages
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c7f36b] text-black shadow-[0_12px_35px_rgba(190,242,100,0.35)] transition hover:translate-y-[1px]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </div>

              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
                  <picture>
                    <img src={hubMock} alt="Feature preview" className="block w-full select-none object-cover" draggable={false} loading="lazy" decoding="async" />
                  </picture>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 15%, rgba(129,140,248,0.22) 0%, rgba(56,189,248,0.12) 35%, transparent 65%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {cards.map((c) => (
              <div
                key={c.title}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">{c.icon}</div>
                <div className="mt-5 text-lg font-extrabold tracking-tight">{c.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <ShieldCheck className="h-4 w-4" />, text: "Less errors, more QA" },
              { icon: <Zap className="h-4 w-4" />, text: "Fast pace delivery" },
              { icon: <Layers className="h-4 w-4" />, text: "Flexible scope" },
            ].map((x) => (
              <div
                key={x.text}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">{x.icon}</span>
                <span className="font-semibold">{x.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ main (hero copy updated) ------------------------------ */
export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <main className="w-full">
      <ScrollProgress />

      <header className="relative w-full h-240 overflow-hidden bg-[#050013] text-white mt-5">
        <BackgroundEffects />

        <div
          aria-hidden
          className="animate-grid pointer-events-none absolute inset-0 z-10 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(circle at center, black 0, black 55%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 0, black 55%, transparent 80%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]" />

        <div className="relative z-30 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-36 text-center sm:px-6 lg:pt-44">
          <h1
            className="text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-[4.1rem]"
          >
            Software, marketing,
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-slate-50 via-sky-100 to-lime-300 bg-clip-text text-transparent">
                and brand — delivered fast.
              </span>
              <span
                className="absolute -bottom-3 left-1/3 right-1/3 h-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300 blur-[2px] w-full"
              />
            </span>
          </h1>

          <p
            className="mt-5 max-w-2xl text-balance text-sm leading-relaxed text-slate-200/90 sm:text-base md:text-lg"
          >
            We’re a cost-efficient software + marketing company. We use advanced AI and human expertise to reduce errors, move fast,
            and stay flexible while you scale.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.75)] sm:flex-row sm:items-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none ring-0 focus:bg-black/60 focus:ring-2 focus:ring-indigo-400/70"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c7f36b] px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(190,242,100,0.5)] transition hover:translate-y-[1px] hover:bg-[#d4ff80]"
            >
              Get a proposal
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* trust strip (content update) */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-white/70">
            {[
              "Cross-platform apps",
              "Systems + websites",
              "Strategy + analysis",
              "Brand identity",
              "AI + human QA",
            ].map((x) => (
              <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {x}
              </span>
            ))}
          </div>

          <div
            className="mt-14 w-full"
          >
            <div className="relative mx-auto w-full max-w-3xl md:max-w-4xl">
                <div className="overflow-hidden rounded-[18px] border border-white/14 bg-gradient-to-b from-white to-slate-50 shadow-[0_40px_120px_rgba(15,23,42,0.9)]">
                <picture>
                  <img src={mainMock} alt="Work preview" className="block w-full select-none" draggable={false} loading="lazy" decoding="async" />
                </picture>
              </div>

              <div
                className="
                  absolute bottom-4 left-1/2 w-[72%] max-w-[280px]
                  -translate-x-1/2 rounded-2xl border border-white/60
                  bg-white/25 p-4 text-left text-[11px] text-slate-900
                  shadow-[0_18px_45px_rgba(15,23,42,0.55)]
                  sm:left-auto sm:right-4 sm:bottom-5 sm:translate-x-0 sm:w-[250px]
                  lg:right-[-24px] lg:bottom-6
                "
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-100/85">DELIVERY</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/10 px-2 py-[2px] text-[9px] font-semibold text-slate-800">
                    QA pass <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">Fast</div>
                    <div className="text-[10px] font-medium text-emerald-600">pace + fewer issues</div>
                  </div>
                  <div className="h-12 w-[90px] overflow-hidden rounded-lg">
                    <picture>
                      <img src={chartMock} alt="Preview chart" className="h-full w-full object-cover" draggable={false} loading="lazy" decoding="async" />
                    </picture>
                  </div>
                </div>

                <p className="mt-2 text-[10px] leading-snug text-slate-600">
                  AI automation + human checks to keep releases clean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ServicesSolutionsSection />
      <DarkFeatureHub />
      <MinimalPackages />
    </main>
  );
}
