// Hero.tsx (Performance Optimized)
import React, { useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  Wand2,
  Search,
  Users,
  Code2,
  Palette,
  Briefcase,
} from "lucide-react";

import mainMock from "./assets/companies/cover.png";
import chartMock from "./assets/companies/asu-logo.png";
import svcEngineering from "./assets/companies/2.png";
import svcBrand from "./assets/companies/1.png";
import svcMarketing from "./assets/companies/5.jpg";
import hubMock from "./assets/companies/66.jpg";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.1 });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300 will-change-transform"
      style={{ scaleX }}
    />
  );
}

function BackgroundEffects() {
  // OPTIMIZATION: Removed JS-based isMobile check. 
  // Using Tailwind's 'hidden md:block' is vastly superior for performance 
  // and prevents hydration mismatches in frameworks like Next.js.
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050013]" />
      
      {/* Simplified base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3b27b5_0%,_#050013_45%,_#020007_80%)]" />
      
      {/* OPTIMIZATION: Scoped heavy blur exclusively to desktop (md:block) */}
      <div className="hidden md:block absolute inset-x-[-25%] top-[16%] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.6)_0%,_rgba(129,140,248,0.2)_40%,_rgba(15,23,42,0)_75%)] blur-2xl will-change-transform" />

      {/* Desktop-only animated background elements */}
      <div className="hidden md:block">
        <div
          aria-hidden
          className="animate-beam-1 absolute left-[-10%] right-[-30%] top-[30%] h-64 will-change-transform"
          style={{
            background: "linear-gradient(120deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.20) 35%, rgba(190,242,100,0.10) 60%, rgba(190,242,100,0) 100%)",
            filter: "blur(14px)",
          }}
        />
        <div
          aria-hidden
          className="animate-beam-2 absolute left-[-20%] right-[-5%] top-[55%] h-56 will-change-transform"
          style={{
            background: "linear-gradient(120deg, rgba(129,140,248,0) 0%, rgba(129,140,248,0.25) 40%, rgba(56,189,248,0.20) 70%, rgba(56,189,248,0) 100%)",
            filter: "blur(18px)",
          }}
        />
        <div
          aria-hidden
          className="animate-orb-1 absolute -top-40 left-[18%] h-[420px] w-[420px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle at center, rgba(129,140,248,0.40) 0%, rgba(56,189,248,0.15) 35%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          aria-hidden
          className="animate-orb-2 absolute bottom-[-80px] right-[10%] h-[380px] w-[380px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle at center, rgba(52,211,153,0.3) 0%, rgba(96,165,250,0.20) 35%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>
    </div>
  );
}

function SectionHeading({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker && (
        <div className="mb-3 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-700">
          {kicker}
        </div>
      )}
      <h2 className="text-balance text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------ carousel ------------------------------ */
type Logo = { alt: string; src: string };

function LogoCarouselPillPro() {
  const logos: Logo[] = useMemo(
    () => [
      { alt: "Zapier", src: "https://cdn.simpleicons.org/zapier/000000" },
      { alt: "Shopify", src: "https://cdn.simpleicons.org/shopify/000000" },
      { alt: "SoundCloud", src: "https://cdn.simpleicons.org/soundcloud/000000" },
      { alt: "Harvard Business Review", src: "https://logo.clearbit.com/hbr.org" },
      { alt: "CHOMPS", src: "https://logo.clearbit.com/chomps.com" },
      { alt: "eBay", src: "https://cdn.simpleicons.org/ebay/000000" },
      { alt: "Vimeo", src: "https://cdn.simpleicons.org/vimeo/000000" },
    ],
    []
  );

  const track = [...logos, ...logos];

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="rounded-[44px] bg-[#F3F0FF] px-6 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-10 transform-gpu"
        >
          <div className="relative overflow-hidden rounded-[36px]">
            <div aria-hidden className="lp-shine pointer-events-none absolute inset-0 z-10 opacity-30 will-change-transform" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 md:w-28 bg-gradient-to-r from-[#F3F0FF] to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 md:w-28 bg-gradient-to-l from-[#F3F0FF] to-transparent" />

            <div className="lp-marquee">
              <div className="lp-marquee-track will-change-transform">
                {track.map((l, i) => (
                  <div key={`${l.alt}-${i}`} className="lp-logo-item" aria-hidden={i >= logos.length}>
                    <img src={l.src} alt={l.alt} className="lp-logo" draggable={false} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            .lp-marquee { width: 100%; overflow: hidden; }
            .lp-marquee-track {
              display: flex; align-items: center; width: max-content;
              animation: lp-marquee 25s linear infinite;
            }
            .lp-logo-item { flex: 0 0 auto; padding: 0 30px; display: grid; place-items: center; }
            @media (min-width: 768px) { .lp-logo-item { padding: 0 44px; } }
            .lp-logo { height: 36px; width: auto; object-fit: contain; opacity: 0.7; filter: grayscale(1);
              transition: opacity 200ms ease, filter 200ms ease;
            }
            .lp-logo-item:hover .lp-logo { opacity: 1; filter: grayscale(0); }
            .lp-shine {
              background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 12%, transparent 22%);
              transform: translateX(-60%); animation: lp-shine 8s ease-in-out infinite;
            }
            @keyframes lp-shine { 0% { transform: translateX(-60%); } 55% { transform: translateX(60%); } 100% { transform: translateX(60%); } }
            @keyframes lp-marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
            @media (prefers-reduced-motion: reduce) { .lp-marquee-track { animation: none; } .lp-shine { animation: none; opacity: 0; } }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ services ------------------------------ */
type Feature = { kicker: string; title: string; description: string; bullets: string[]; imageSrc: string; imageAlt: string; ctaLabel: string; icon: React.ReactNode; };

function FeatureRow({ feature, reversed }: { feature: Feature; reversed?: boolean }) {
  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-12", reversed && "lg:[&>div:first-child]:order-2")}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-5 transform-gpu"
      >
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

        <a href="/contact" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-slate-900 group">
          {feature.ctaLabel}
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c7f36b] text-black shadow-sm transition-transform group-hover:translate-y-[1px]">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="lg:col-span-7 transform-gpu"
      >
        <div className="group relative overflow-hidden rounded-[34px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-xl transition-shadow hover:shadow-2xl">
          <img src={feature.imageSrc} alt={feature.imageAlt} className="block w-full h-[300px] md:h-auto select-none object-cover" draggable={false} loading="lazy" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50 md:opacity-70"
            style={{ background: "radial-gradient(circle at 30% 10%, rgba(99,102,241,0.15) 0%, transparent 60%)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function ServicesSolutionsSection() {
  const features: Feature[] = useMemo(
    () => [
      { kicker: "Software Engineering", title: "Apps, systems, and websites — engineered to scale", description: "We build cross-platform apps, internal systems, and high-performance websites with clean architecture and a premium UI layer.", bullets: ["Cross-platform apps + web platforms", "Systems, dashboards, and integrations", "Fast delivery with QA + performance budgets"], imageSrc: svcEngineering, imageAlt: "Software engineering preview", ctaLabel: "Talk to us about your build", icon: <Code2 className="h-4 w-4" /> },
      { kicker: "Marketing & Business", title: "Strategies, studies, and analytics — from step one", description: "We take your business from zero to a clear plan: market research, positioning, funnels, and measurable growth execution.", bullets: ["Strategy + competitor research", "Funnel design and conversion improvements", "Tracking, reporting, and iteration cycles"], imageSrc: svcMarketing, imageAlt: "Marketing and business preview", ctaLabel: "Get a growth plan", icon: <Briefcase className="h-4 w-4" /> },
      { kicker: "Brand Management", title: "Your full visual identity — built and maintained", description: "We create a consistent brand system: logo direction, typography, colors, layouts, and templates across every touchpoint.", bullets: ["Brand identity + design direction", "Design system tokens + templates", "Consistency across web, product, and campaigns"], imageSrc: svcBrand, imageAlt: "Brand management preview", ctaLabel: "Build your visual identity", icon: <Palette className="h-4 w-4" /> },
    ], []
  );

  return (
    <section className="w-full bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 md:pb-20">
        <SectionHeading title="One team. Three core services." subtitle="Cost-efficient delivery powered by advanced AI + human expertise — fewer errors, faster pace, and flexible execution." />
        <div className="mt-14 space-y-16 md:space-y-20">
          {features.map((f, i) => <FeatureRow key={f.title} feature={f} reversed={i % 2 === 1} />)}
        </div>
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------ packages ------------------------------ */
function MinimalPackages() {
  const [annual, setAnnual] = useState(true);
  const plans = useMemo(() => [
      { name: "Launch Strategy", priceMonthly: 99, priceAnnual: 79, desc: "Business + marketing foundations that move you forward.", bullets: ["Market/competitor analysis", "Positioning + funnel plan", "Tracking + weekly iterations"], cta: "Start with strategy", footnote: "Best for: new launches or stalled growth." },
      { name: "Build & Ship", badge: "Most chosen", priceMonthly: 149, priceAnnual: 119, desc: "Software engineering for apps, systems, and websites.", bullets: ["Cross apps + websites", "APIs + integrations", "QA + performance pass"], emphasized: true, cta: "Start building", footnote: "Best for: shipping a product or platform fast." },
      { name: "Brand System", priceMonthly: 119, priceAnnual: 95, desc: "Full visual identity and consistency across assets.", bullets: ["Visual identity direction", "Design system + templates", "Brand consistency rollout"], cta: "Build the brand", footnote: "Best for: rebrands, new brands, or scaling teams." },
  ], []);

  return (
    <section id="packages" className="w-full bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading kicker="Packages" title="Simple entry points. Flexible execution." subtitle="Choose a starting point — we can scale scope up or down without slowing you down." />
        
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={cn("text-sm font-semibold", !annual ? "text-slate-900" : "text-slate-500")}>Monthly</span>
          <button type="button" onClick={() => setAnnual(!annual)} className={cn("relative h-9 w-16 rounded-full border transition-colors", annual ? "border-slate-900 bg-slate-900" : "border-slate-200 bg-slate-100")} aria-label="Toggle billing period">
            <span className={cn("absolute top-1 h-7 w-7 rounded-full bg-white shadow transition-transform", annual ? "translate-x-7" : "translate-x-1")} />
          </button>
          <span className={cn("text-sm font-semibold", annual ? "text-slate-900" : "text-slate-500")}>Annual <span className="ml-2 rounded-full bg-[#c7f36b] px-2 py-1 text-xs font-black text-black">Save 20%</span></span>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const price = annual ? p.priceAnnual : p.priceMonthly;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4 }}
                className={cn("relative flex h-full flex-col overflow-hidden rounded-[34px] border bg-white p-7 shadow-lg transition-transform hover:-translate-y-1 transform-gpu", p.emphasized ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200")}
              >
                {p.emphasized && <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300" />}
                {p.badge && <div className="absolute right-6 top-6 z-10 rounded-full bg-slate-900 px-3 py-1 text-xs font-black text-white">{p.badge}</div>}
                <div className="relative z-10">
                  <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                  <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                  <div className="mt-5 flex items-end gap-2">
                    <div className="text-5xl font-black tracking-tight">${price}</div>
                    <div className="pb-1 text-sm font-semibold text-slate-500">/mo</div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">{p.footnote}</div>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  <ul className="mt-6 space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-slate-700">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white shrink-0"><Check className="h-3.5 w-3.5" /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">Includes: roadmap + weekly delivery + documented handoff.</div>
                </div>
                <div className="relative z-10 mt-auto pt-7">
                  <a href="/contact" className={cn("inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors", p.emphasized ? "bg-slate-900 text-white hover:opacity-90" : "bg-slate-100 text-slate-900 hover:bg-slate-200")}>
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500"><Sparkles className="h-4 w-4" /> Flexible scope • Fast pace</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ dark hub ------------------------------ */
function DarkFeatureHub() {
  const cards = [
    { icon: <Wand2 className="h-5 w-5" />, title: "AI + human QA", desc: "Automation for speed, humans for correctness." },
    { icon: <Search className="h-5 w-5" />, title: "Research-led decisions", desc: "Strategies and studies before execution." },
    { icon: <Users className="h-5 w-5" />, title: "Flexible delivery", desc: "Adjust scope quickly without breaking timelines." },
  ];

  return (
    <section className="w-full bg-[#050013] text-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        {/* OPTIMIZATION: Removed heavy backdrop-blur on mobile, applied solid color. Desktop gets lighter blur. */}
        <div className="rounded-[44px] border border-white/10 bg-[#0c0520] md:bg-white/5 md:backdrop-blur-xl p-5 shadow-2xl sm:p-10">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 p-7 sm:p-10">
            {/* Desktop only blur elements inside the card */}
            <div aria-hidden className="hidden md:block pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(190,242,100,0.20)_0%,transparent_65%)] blur-2xl" />
            <div aria-hidden className="hidden md:block pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.20)_0%,transparent_65%)] blur-2xl" />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <h3 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">Advanced execution,<br />fewer surprises.</h3>
                <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">We combine advanced AI with experienced builders and strategists to reduce errors and ship fast.</p>
                <a href="#packages" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white group">
                  View packages
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c7f36b] text-black transition-transform group-hover:translate-y-[1px]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </div>
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#1a1433] shadow-2xl">
                  <img src={hubMock} alt="Feature preview" className="block w-full select-none object-cover" draggable={false} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {cards.map((c) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-lg md:backdrop-blur-md transform-gpu"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">{c.icon}</div>
                <div className="mt-5 text-lg font-extrabold tracking-tight">{c.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ main hero ------------------------------ */
export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <main className="w-full">
      <ScrollProgress />

      <header className="relative w-full h-240 overflow-hidden bg-[#050013] text-white mt-5">
        <BackgroundEffects />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(circle at center, black 0, black 55%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 0, black 55%, transparent 80%)",
          }}
        />

        <div className="relative z-30 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-36 text-center sm:px-6 lg:pt-44">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-[4.1rem] transform-gpu"
          >
            Software, marketing,<br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-slate-50 via-sky-100 to-lime-300 bg-clip-text text-transparent">
                and brand — delivered fast.
              </span>
              <motion.span
                className="absolute -bottom-3 left-1/3 right-1/3 h-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300 blur-[2px] transform-gpu"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-5 max-w-2xl text-balance text-sm leading-relaxed text-slate-200/90 sm:text-base md:text-lg transform-gpu"
          >
            We’re a cost-efficient software + marketing company. We use advanced AI and human expertise to reduce errors, move fast, and stay flexible while you scale.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onSubmit={(e) => e.preventDefault()}
            // OPTIMIZATION: Removed heavy backdrop-blur-2xl on mobile, replaced with solid #111 black for smooth rendering
            className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-[#111] md:bg-black/40 p-2 shadow-2xl md:backdrop-blur-xl sm:flex-row sm:items-center transform-gpu"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              className="w-full rounded-xl bg-white/5 md:bg-black/40 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none ring-0 focus:bg-white/10 focus:ring-2 focus:ring-indigo-400/70"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c7f36b] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d4ff80]"
            >
              Get a proposal <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-white/70">
            {["Cross-platform apps", "Systems + websites", "Strategy + analysis", "Brand identity", "AI + human QA"].map((x) => (
              <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{x}</span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-14 w-full transform-gpu"
          >
            <div className="relative mx-auto w-full max-w-3xl md:max-w-4xl">
              <div className="overflow-hidden rounded-[18px] border border-white/14 bg-gradient-to-b from-[#1e293b] to-slate-50 shadow-2xl">
                <img src={mainMock} alt="Work preview" className="block w-full select-none" draggable={false} loading="lazy" decoding="async" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ y: -4 }}
                // OPTIMIZATION: Fallback to solid color on mobile, blur on desktop
                className="absolute bottom-4 left-1/2 w-[72%] max-w-[280px] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/95 md:bg-white/25 p-4 text-left text-[11px] text-slate-900 shadow-xl md:backdrop-blur-xl sm:left-auto sm:right-4 sm:bottom-5 sm:translate-x-0 sm:w-[250px] lg:right-[-24px] lg:bottom-6 transform-gpu"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-500 md:text-slate-100/85">DELIVERY</span>
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
                    <img src={chartMock} alt="Preview chart" className="h-full w-full object-cover" draggable={false} loading="lazy" decoding="async" />
                  </div>
                </div>
                <p className="mt-2 text-[10px] leading-snug text-slate-600">AI automation + human checks to keep releases clean.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      <LogoCarouselPillPro />
      <ServicesSolutionsSection />
      <DarkFeatureHub />
      <MinimalPackages />
    </main>
  );
}