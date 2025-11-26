// src/pages/SolutionsPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Search,
  Megaphone,
  MessageSquare,
  ArrowRight,
  Check,
  Target,
  Layout,
  Code,
} from "lucide-react";
import { SectionShell, withAlpha, COLORS } from "../components/layout/SiteLayout";

/* ===================== Data & Types ===================== */

type Solution = {
  id: string;
  title: string;
  description: string;
  focus: string;
  icon: React.ElementType;
  accent: string;
  cta: string;
  sampleBullets: string[];
};

const SOLUTIONS: Solution[] = [
  {
    id: "software",
    title: "Software Development",
    description: "Web apps, dashboards, and tools tailored to your business.",
    focus: "Web apps & tools",
    icon: Code,
    accent: "#4F46E5",
    cta: "Discuss a build",
    sampleBullets: ["Landing pages & sites", "Dashboards & portals", "Integrations & automations"],
  },
  {
    id: "branding",
    title: "Brand Identity",
    description: "A clean brand kit so you look consistent everywhere.",
    focus: "Brand basics",
    icon: Sparkles,
    accent: "#A855F7",
    cta: "Ask about branding",
    sampleBullets: ["Logo & colors", "Social profile & cover", "Business card"],
  },
  {
    id: "social",
    title: "Social Media Management",
    description: "We post for you on Facebook & Instagram every month.",
    focus: "Monthly content",
    icon: MessageSquare,
    accent: "#EC4899",
    cta: "See social packages",
    sampleBullets: ["Posts & reels", "Stories", "Monthly calendar"],
  },
  {
    id: "paid-ads",
    title: "Social Ads Management",
    description: "We run paid campaigns to get traffic, leads, or sales.",
    focus: "Paid campaigns",
    icon: Megaphone,
    accent: "#38BDF8",
    cta: "Talk about ads",
    sampleBullets: ["Campaign setup", "Budget & targeting", "Simple reporting"],
  },
  {
    id: "content",
    title: "Content & Creative",
    description: "We design posts and edit reels that fit your brand.",
    focus: "Design & video",
    icon: Layout,
    accent: "#22C55E",
    cta: "Plan a content sprint",
    sampleBullets: ["Feed designs", "Reel editing", "Story sets"],
  },
  {
    id: "strategy",
    title: "Marketing Strategy",
    description: "A simple plan for 60–90 days of marketing.",
    focus: "Simple plan",
    icon: Search,
    accent: "#14B8A6",
    cta: "Book a strategy call",
    sampleBullets: ["Target customer", "Key offers", "Roadmap"],
  },
];

/* ---------- Generic Plan Type ---------- */

type PlanTier = {
  id: string;
  title: string;
  price: string; // "$300" or "Contact"
  cadence: "One-time" | "Monthly" | "Project";
  accent: string;
  badge?: string;
  summary: string;
  bestFor: string;
  bullets: string[]; // "You get"
  footnote?: string;
};

/* ---------- Website Plans ---------- */

const WEBSITE_PLANS: PlanTier[] = [
  {
    id: "web-starter",
    title: "Starter Site",
    price: "Contact",
    cadence: "Project",
    accent: "#38BDF8",
    badge: "Landing page",
    summary: "Single-page site to start selling or capturing leads.",
    bestFor: "New offers or campaigns.",
    bullets: ["1 page", "Basic SEO", "Contact form"],
    footnote: "Design, build, and launch included.",
  },
  {
    id: "web-basic",
    title: "Basic Site",
    price: "Contact",
    cadence: "Project",
    accent: "#4F46E5",
    badge: "Most common",
    summary: "3–4 pages to explain who you are and what you do.",
    bestFor: "Service businesses and local brands.",
    bullets: ["3–4 pages", "SEO setup", "CMS-ready"],
    footnote: "We help shape structure and basic copy.",
  },
  {
    id: "web-premium",
    title: "Premium Site",
    price: "Contact",
    cadence: "Project",
    accent: "#A855F7",
    summary: "More pages, more content, and nicer motion.",
    bestFor: "Brands that need more depth.",
    bullets: ["5+ pages", "Animations", "Content guidance"],
    footnote: "Good for product-heavy or story-heavy sites.",
  },
  {
    id: "web-custom",
    title: "Custom Build",
    price: "Contact",
    cadence: "Project",
    accent: "#22D3EE",
    badge: "Custom",
    summary: "E-commerce or special features.",
    bestFor: "Shops or apps with custom flows.",
    bullets: ["Scoped features", "Integrations", "Roadmap"],
    footnote: "We scope it with you, then quote.",
  },
];

const WEBSITE_INCLUDES = ["Figma handoff", "Responsive layouts", "Fast loading"] as const;

/* ---------- Branding & Social (Core Packages: $200 / $300 / $450 / $600) ---------- */

const MARKETING_PLANS: PlanTier[] = [
  {
    id: "mkt-branding",
    title: "Branding Package",
    price: "$200",
    cadence: "One-time",
    accent: "#22D3EE",
    badge: "Start here",
    summary: "Simple brand kit so you can launch with confidence.",
    bestFor: "New brands or a clean refresh.",
    bullets: [
      "Logo + color palette + fonts",
      "Facebook & Instagram profile + cover",
      "Brand sheet + business card design",
    ],
    footnote: "One-time project. No monthly content included.",
  },
  {
    id: "mkt-social-1",
    title: "Social Package 1",
    price: "$300",
    cadence: "Monthly",
    accent: "#6366F1",
    badge: "Entry plan",
    summary: "Light monthly content to keep pages active.",
    bestFor: "Small brands that just need consistent posting.",
    bullets: [
      "5 post designs + 3 reels / month",
      "8 main posts + 10 stories / month",
      "Page management (FB + IG)",
    ],
    footnote: "Good if you want to stay visible without heavy spend.",
  },
  {
    id: "mkt-social-2",
    title: "Social Package 2",
    price: "$450",
    cadence: "Monthly",
    accent: "#A855F7",
    badge: "Most chosen",
    summary: "More content plus ads for growth.",
    bestFor: "Brands ready to push reach and leads.",
    bullets: [
      "10 post designs + 6 reels / month",
      "16 main posts + 20 stories / month",
      "Meta ads setup + basic optimization",
    ],
    footnote: "Works well with ~$1k–$3k ad spend / month.",
  },
  {
    id: "mkt-social-3",
    title: "Social Package 3",
    price: "$600",
    cadence: "Monthly",
    accent: "#EC4899",
    badge: "Growth mode",
    summary: "Full social engine: content, ads, and simple strategy.",
    bestFor: "Brands using social as a main sales channel.",
    bullets: [
      "20 post designs + 12 reels / month",
      "32 main posts + 30 stories / month",
      "Ads management + media persona + basic strategy",
    ],
    footnote: "Best if you want volume, testing, and learning.",
  },
];

/* ---------- Brand Systems (Deeper Projects) ---------- */

const BRAND_SYSTEM_PLANS: PlanTier[] = [
  {
    id: "br-sprint",
    title: "Brand Sprint",
    price: "Contact",
    cadence: "Project",
    accent: "#F59E0B",
    badge: "Fast",
    summary: "Quick project to lock in basics and tone.",
    bestFor: "New brands that want clarity quickly.",
    bullets: [
      "Core brand message",
      "Tone of voice notes",
      "Simple colors & fonts",
    ],
    footnote: "Typical duration: 3–4 weeks.",
  },
  {
    id: "br-system",
    title: "Brand System",
    price: "Contact",
    cadence: "Project",
    accent: "#A855F7",
    badge: "For teams",
    summary: "Rules and templates for your team.",
    bestFor: "Growing teams and multi-channel brands.",
    bullets: [
      "Logo set & usage rules",
      "Color & typography system",
      "Deck & document templates",
    ],
    footnote: "Typical duration: 6–8 weeks.",
  },
  {
    id: "br-rebrand",
    title: "Rebrand & Rollout",
    price: "Contact",
    cadence: "Project",
    accent: "#10B981",
    summary: "New look plus a clear rollout plan.",
    bestFor: "Existing brands changing direction.",
    bullets: [
      "Brand audit & new identity",
      "Rollout checklist",
      "Simple launch kit",
    ],
    footnote: "Typical duration: 8–12 weeks.",
  },
  {
    id: "br-custom",
    title: "Custom Brand Project",
    price: "Contact",
    cadence: "Project",
    accent: "#3B82F6",
    badge: "Custom",
    summary: "Custom scope if your needs don’t fit a box.",
    bestFor: "Special markets or complex setups.",
    bullets: ["Scope defined together", "Flexible cadence", "Tailored deliverables"],
    footnote: "We agree on scope and timing first, then price.",
  },
];

const HIGHLIGHTS = [
  { label: "Brand setup", value: "1–2 weeks" },
  { label: "Social content", value: "Up to 32 posts/mo" },
  { label: "Languages", value: "EN + AR" },
] as const;

/* ===================== Hooks ===================== */

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height ? (scrolled / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: [0.1, 0.25, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}

/* ===================== Small UI bits ===================== */

const AccentChip: React.FC<{ text: string; accent: string }> = ({ text, accent }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
    style={{
      borderColor: withAlpha(accent, 0.45),
      backgroundColor: withAlpha(accent, 0.12),
      color: "white",
    }}
  >
    {text}
  </span>
);

const StickyNav: React.FC<{ activeId: string | null }> = ({ activeId }) => (
  <nav
    aria-label="Services navigation"
    className="hidden lg:block sticky top-24 self-start rounded-2xl border border-white/10 bg-white/5 p-4"
    style={{ backdropFilter: "blur(16px)" }}
  >
    <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/55">
      Services
    </div>
    <ul className="space-y-1">
      {SOLUTIONS.map((s) => {
        const isActive = activeId === s.id;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition"
                style={{
                  backgroundColor: withAlpha(s.accent, isActive ? 1 : 0.5),
                  boxShadow: isActive ? `0 0 0 4px ${withAlpha(s.accent, 0.22)}` : "none",
                }}
              />
              <span className={isActive ? "text-white" : undefined}>{s.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

const MobileChipRail: React.FC = () => (
  <div className="lg:hidden -mx-2 overflow-x-auto pb-1">
    <div className="flex items-center gap-2 px-2">
      {SOLUTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/80"
        >
          {s.title}
        </a>
      ))}
    </div>
  </div>
);

const MediaFrame: React.FC<{ accent: string; children: React.ReactNode }> = ({
  accent,
  children,
}) => (
  <div
    className="relative h-full rounded-3xl border p-4 sm:p-5 overflow-hidden"
    style={{
      borderColor: withAlpha(accent, 0.25),
      background: `radial-gradient(circle at top, ${withAlpha(
        accent,
        0.25
      )} 0, transparent 55%), linear-gradient(180deg, ${withAlpha(
        COLORS.background,
        0.85
      )} 0%, ${withAlpha(COLORS.background, 1)} 60%)`,
    }}
  >
    <div className="flex items-center gap-1.5 pb-3">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha("#ff5f56", 1) }} />
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha("#ffbd2e", 1) }} />
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha("#27c93f", 1) }} />
    </div>
    <div className="rounded-xl border border-white/10 bg-white/[.03] p-4 min-h-[160px]">
      {children}
    </div>
  </div>
);

const PlanBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="rounded-full border border-white/12 bg-white/[.06] px-3 py-1 text-[11px] text-white/80">
    {text}
  </span>
);

/* ===================== Services Overview Cards ===================== */

const ServiceOverviewCard: React.FC<{ data: Solution }> = ({ data }) => (
  <a
    href={`#${data.id}`}
    className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[.06]"
    style={{
      boxShadow: "0 18px 40px -26px rgba(0,0,0,.65)",
    }}
  >
    <div className="flex items-center gap-3">
      <span
        className="grid h-10 w-10 place-items-center rounded-xl border bg-white/5"
        style={{ borderColor: withAlpha(data.accent, 0.6) }}
      >
        <data.icon className="h-5 w-5 text-white" />
      </span>
      <div>
        <div className="text-sm font-semibold text-white">{data.title}</div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
          {data.focus}
        </div>
      </div>
    </div>
    <p className="text-xs sm:text-sm text-white/70 line-clamp-2">{data.description}</p>
    <div className="mt-auto flex items-center gap-2 text-[12px] text-white/80">
      <span>View details</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </div>
  </a>
);

/* ===================== Sections ===================== */

const SolutionZigzag: React.FC<{ data: Solution; index: number }> = ({ data, index }) => {
  const alignRight = index % 2 === 1;

  return (
    <section id={data.id} className="relative grid items-stretch gap-8 md:grid-cols-2">
      {/* Accent sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-3xl"
        style={{
          background: `linear-gradient(120deg, ${withAlpha(
            data.accent,
            0.18
          )}, transparent 60%)`,
        }}
      />
      {/* Text card */}
      <div className={alignRight ? "order-2 md:order-1" : "order-1"}>
        <article
          className="relative h-full overflow-hidden rounded-3xl border p-6 sm:p-8"
          style={{
            borderColor: withAlpha(data.accent, 0.28),
            backgroundColor: withAlpha(data.accent, 0.08),
            boxShadow: `0 28px 60px -32px ${withAlpha(data.accent, 0.6)}`,
          }}
        >
          <header className="flex items-start gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-white/10"
              style={{ borderColor: withAlpha(data.accent, 0.45) }}
            >
              <data.icon className="h-7 w-7 text-white" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold text-white">{data.title}</h2>
              <div className="mt-2">
                <AccentChip text={data.focus} accent={data.accent} />
              </div>
            </div>
          </header>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/80">
            {data.description}
          </p>

          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/85">
            {data.sampleBullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-white/80" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold text-white transition-transform hover:translate-x-1"
              style={{
                borderColor: withAlpha(data.accent, 0.4),
                backgroundColor: withAlpha(data.accent, 0.22),
                boxShadow: `0 18px 40px -28px ${withAlpha(data.accent, 0.75)}`,
              }}
            >
              {data.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>

      {/* Media / checklist panel */}
      <div className={alignRight ? "order-1 md:order-2" : "order-2"}>
        <MediaFrame accent={data.accent}>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-white/70" />
              <span className="text-sm font-medium text-white/80">What you see from us</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[12px] text-white/75">
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Short updates</div>
                <div className="mt-1 text-white/60">Quick check-ins, not long reports</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Clear tasks</div>
                <div className="mt-1 text-white/60">What’s in progress this week</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Simple numbers</div>
                <div className="mt-1 text-white/60">Core metrics only</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Final files</div>
                <div className="mt-1 text-white/60">Easy to reuse or hand to your team</div>
              </div>
            </div>
          </div>
        </MediaFrame>
      </div>
    </section>
  );
};

/* ===================== Plan Card ===================== */

const PlanCard: React.FC<{ plan: PlanTier }> = ({ plan }) => (
  <div
    className={`group relative flex flex-col gap-5 overflow-hidden rounded-3xl border bg-white/[.05] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)] ${
      plan.badge ? "md:scale-[1.02] md:border-white/25" : ""
    }`}
    style={{
      borderColor: withAlpha(plan.accent, 0.3),
      backgroundImage: `radial-gradient(circle at 0 0, ${withAlpha(
        plan.accent,
        0.35
      )}, transparent 55%), radial-gradient(circle at 100% 100%, ${withAlpha(
        "#000000",
        0.35
      )}, transparent 55%)`,
    }}
  >
    {/* Glow overlay */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at top, ${withAlpha(
          plan.accent,
          0.35
        )}, transparent 60%)`,
      }}
    />

    {/* Top gradient bar */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-1"
      style={{
        background: `linear-gradient(90deg, ${withAlpha(plan.accent, 0.2)}, transparent 70%)`,
      }}
    />

    {plan.badge && (
      <span
        className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
        style={{ backgroundColor: withAlpha(plan.accent, 0.75) }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        {plan.badge}
      </span>
    )}

    {/* Head */}
    <div className="relative space-y-1">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
        <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] text-white/75">
          {plan.cadence}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-white">{plan.price}</div>
        {plan.cadence === "Monthly" && plan.price !== "Contact" && (
          <span className="text-xs uppercase tracking-[0.18em] text-white/70">/ month</span>
        )}
        {plan.price === "Contact" && (
          <span className="text-[11px] rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-white/70">
            Custom quote
          </span>
        )}
      </div>
      <p className="text-sm text-white/70">{plan.summary}</p>
    </div>

    {/* Body */}
    <div className="relative text-[13px] text-white/85">
      <div className="mb-1 text-white/60">You get:</div>
      <ul className="space-y-1.5">
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="relative space-y-1 text-[12px] text-white/80">
      <div>
        <span className="text-white/50">Best for: </span>
        {plan.bestFor}
      </div>
      {plan.footnote && <div className="text-white/65">{plan.footnote}</div>}
    </div>

    {/* CTA */}
    <div className="relative mt-auto pt-1">
      <Link
        to="/contact"
        className="inline-flex w-fit items-center gap-3 rounded-xl border px-5 py-3 text-sm font-semibold text-white transition-transform group-hover:translate-x-1"
        style={{
          borderColor: withAlpha(plan.accent, 0.35),
          backgroundColor: withAlpha(plan.accent, 0.22),
          boxShadow: `0 18px 40px -26px ${withAlpha(plan.accent, 0.9)}`,
        }}
      >
        Talk about {plan.title}
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  </div>
);

/* ===================== Package Switcher ===================== */

function PackageSwitcher() {
  const [tab, setTab] = useState<"website" | "marketing" | "branding">("marketing");

  const TabButton = ({
    id,
    label,
  }: {
    id: "website" | "marketing" | "branding";
    label: string;
  }) => {
    const active = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        className={`relative flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold transition ${
          active ? "text-white" : "text-white/70 hover:text-white"
        }`}
      >
        <span
          className="block rounded-[0.9rem] px-4 py-2"
          style={{
            border: `1px solid ${withAlpha(COLORS.text, active ? 0.28 : 0.12)}`,
            background: active
              ? `radial-gradient(circle at top, ${withAlpha(
                  COLORS.primary,
                  0.55
                )}, transparent 70%), ${withAlpha(COLORS.background, 0.8)}`
              : "transparent",
            boxShadow: active
              ? "0 14px 40px -26px rgba(79,70,229,.85)"
              : "0 0 0 0 rgba(0,0,0,0)",
          }}
        >
          {label}
        </span>
      </button>
    );
  };

  const HeaderCopy = () => {
    if (tab === "website") {
      return (
        <>
          <p className="mx-auto max-w-[60ch] text-sm sm:text-base text-white/70">
            Website plans with clear scope. You choose pages, we handle design, build, and launch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {WEBSITE_INCLUDES.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.06] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-white/75"
              >
                <Check className="h-3.5 w-3.5" />
                {item}
              </span>
            ))}
          </div>
        </>
      );
    }
    if (tab === "marketing") {
      return (
        <>
          <p className="mx-auto max-w-[60ch] text-sm sm:text-base text-white/70">
            Core branding and social packages with fixed outputs and clear prices. English and
            Arabic content supported.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Branding", "Social posts", "Reels & stories"].map((k) => (
              <PlanBadge key={k} text={k} />
            ))}
            <PlanBadge text="EN + AR" />
          </div>
        </>
      );
    }
    // branding systems
    return (
      <>
        <p className="mx-auto max-w-[60ch] text-sm sm:text-base text-white/70">
          Deeper brand work with rules, systems, and rollout plans so your team uses the brand the
          same way everywhere.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Guidelines", "Templates", "For teams"].map((k) => (
            <PlanBadge key={k} text={k} />
          ))}
          <PlanBadge text="Project-based" />
        </div>
      </>
    );
  };

  const gridCols = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8";

  const activePlans =
    tab === "website"
      ? WEBSITE_PLANS
      : tab === "marketing"
      ? MARKETING_PLANS
      : BRAND_SYSTEM_PLANS;

  return (
    <SectionShell className="py-10 sm:py-12">
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex gap-1 rounded-2xl p-1 border border-white/10 bg-white/5 backdrop-blur">
            <TabButton id="website" label="Website" />
            <TabButton id="marketing" label="Branding & Social" />
            <TabButton id="branding" label="Brand Systems" />
          </div>
          <HeaderCopy />
        </div>

        <div className={gridCols}>
          {activePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ===================== Page ===================== */

export default function SolutionsPage() {
  const progress = useScrollProgress();
  const activeId = useScrollSpy(SOLUTIONS.map((s) => s.id));

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      {/* top progress bar */}
      <div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[60] h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(56,189,248,0) 0%, rgba(168,85,247,0) 0%)",
        }}
      />
      <div
        aria-hidden
        className="fixed left-0 top-0 z-[61] h-[3px] rounded-r"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #38BDF8, #A855F7, #4F46E5)",
          boxShadow: "0 0 20px rgba(79,70,229,.4)",
        }}
      />

      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(35% 28% at 50% 0%, rgba(79,70,229,.14), transparent 75%)",
          backgroundColor: COLORS.background,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl space-y-12">
        {/* Header */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Services & Packages
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Clear branding, social & software pods that{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#4F46E5] bg-clip-text text-transparent">
              are easy to buy
            </span>
            .
          </h1>
          <p className="mx-auto max-w-[62ch] text-white/70 text-sm sm:text-base leading-relaxed">
            One-time branding, simple monthly social packages, and software builds. Fixed outputs,
            clear prices, and English or Arabic content.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-100">
              From $200 · Monthly from $300
            </span>
          </div>

          {/* Mobile quick chips */}
          <MobileChipRail />

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            {["Branding", "Social media", "Software", "Strategy"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-transform hover:translate-y-0.5"
            >
              Talk about a package
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/our-work"
              className="inline-flex items-center gap-3 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white hover:border-white/30"
            >
              See examples
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </header>

        {/* Highlights */}
        <SectionShell className="py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[.04] px-6 py-6 text-center backdrop-blur-lg"
                style={{ boxShadow: "0 20px 40px -14px rgba(0,0,0,0.55)" }}
              >
                <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                  {item.label}
                </div>
                <div className="mt-3 text-xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Services overview grid (quick scan) */}
        <SectionShell className="py-6 sm:py-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-white/80" />
              <h3 className="text-lg font-semibold text-white">What we can run for you</h3>
            </div>
            <span className="hidden md:inline text-[12px] text-white/55">
              Click a card to jump to details.
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {SOLUTIONS.map((s) => (
              <ServiceOverviewCard key={s.id} data={s} />
            ))}
          </div>
        </SectionShell>

        {/* Services body: sticky nav + zigzag */}
        <SectionShell className="pt-4 pb-10">
          <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-6">
            <StickyNav activeId={activeId} />
            <div className="space-y-12">
              {SOLUTIONS.map((s, i) => (
                <SolutionZigzag key={s.id} data={s} index={i} />
              ))}
            </div>
          </div>
        </SectionShell>

        {/* Packages Switcher */}
        <PackageSwitcher />

        {/* Footer CTA */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-xl border border-white/20 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-white/10"
            style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}
          >
            Chat with the team
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
