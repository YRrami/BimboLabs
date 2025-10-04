// src/pages/Solutions.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Code,
  Search,
  Megaphone,
  MessageSquare,
  ArrowRight,
  Check,
  Target,
  Rocket,
  CalendarCheck,
} from "lucide-react";
import { SectionShell, withAlpha, COLORS } from "../components/layout/SiteLayout";

/* ===================== Data ===================== */

type Solution = {
  id: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  accent: string; // hex color
  bullets: string[];
  metrics: { label: string; value: string }[];
  keywords: string[];
  cta: string;
};

const SOLUTIONS: Solution[] = [
  {
    id: "software",
    title: "Software Development",
    summary: "Ship web apps and sites with weekly drops, QA, analytics and docs.",
    icon: Code,
    accent: "#4F46E5",
    bullets: ["Next.js + Node", "Design system", "Monitoring + CI"],
    metrics: [
      { label: "Cadence", value: "Weekly" },
      { label: "Stack", value: "React / Node" },
      { label: "Focus", value: "Quality + speed" },
    ],
    keywords: ["Accessibility", "Telemetry", "CI/CD"],
    cta: "Scope a Build",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    summary: "Technical + editorial SEO that compounds qualified traffic.",
    icon: Search,
    accent: "#38BDF8",
    bullets: ["CWV > 90", "Content briefs", "Schema coverage"],
    metrics: [
      { label: "Velocity", value: "4–6 briefs/mo" },
      { label: "Analytics", value: "Looker" },
      { label: "Focus", value: "Intent > volume" },
    ],
    keywords: ["Clusters", "Internal links", "SERP intent"],
    cta: "Get an SEO Plan",
  },
  {
    id: "media",
    title: "Media Buying",
    summary: "Creative tests, server-side tracking, live ROAS dashboards.",
    icon: Megaphone,
    accent: "#6366F1",
    bullets: ["Meta + Google", "Budget pacing", "CAPI / gtag"],
    metrics: [
      { label: "Sprints", value: "Weekly" },
      { label: "Focus", value: "MER + LTV" },
      { label: "Attribution", value: "Server-side" },
    ],
    keywords: ["Experiments", "Attribution", "Creative"],
    cta: "Launch Media",
  },
  {
    id: "brand",
    title: "Brand Management",
    summary: "Positioning, voice, and design tokens for consistent shipping.",
    icon: Sparkles,
    accent: "#A855F7",
    bullets: ["Messaging kit", "Visual tokens", "Governance"],
    metrics: [
      { label: "Timeline", value: "3–4 weeks" },
      { label: "Output", value: "Playbook" },
      { label: "Team", value: "Strategy + Design" },
    ],
    keywords: ["Voice map", "Design tokens", "Brand OS"],
    cta: "Start Brand Sprint",
  },
  {
    id: "social",
    title: "Social Media",
    summary: "Always-on storytelling and community ops, on-brand and on time.",
    icon: MessageSquare,
    accent: "#EC4899",
    bullets: ["Calendar", "Community replies", "Analytics"],
    metrics: [
      { label: "Pace", value: "3–5 posts/wk" },
      { label: "Channels", value: "IG/TikTok/X" },
      { label: "Focus", value: "Reach + saves" },
    ],
    keywords: ["Templates", "Copy kits", "Influencers"],
    cta: "Design Social Playbook",
  },
];

const STATS = [
  { label: "MVP launches", value: "12" },
  { label: "Added revenue", value: "$4.8M" },
  { label: "Hours automated", value: "1.3K" },
] as const;

const FAQ = [
  {
    q: "How do we start?",
    a: "We run a 45-min intake, then deliver a one-page plan with scope, timeline, and cost.",
  },
  {
    q: "Weekly cadence?",
    a: "Yes. You’ll get a demo, Loom recap, and updated backlog every week.",
  },
  {
    q: "Who’s on the pod?",
    a: "A strategist + builders (design/eng/ops) with shared KPIs and QA gates.",
  },
  {
    q: "Do you do fixed price?",
    a: "For sprints and clear scopes, yes. Ongoing work is a monthly retainer.",
  },
];

/* ===================== Page ===================== */

export default function SolutionsPage() {
  const [activeId, setActiveId] = useState<string>("software");
  const active = useMemo(
    () => SOLUTIONS.find((s) => s.id === activeId) ?? SOLUTIONS[0],
    [activeId]
  );

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      {/* background glow + grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(35% 28% at 50% 0%, rgba(79,70,229,.28), transparent 70%)",
          backgroundColor: COLORS.background,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mx-auto w-full max-w-screen-2xl space-y-10">
        {/* Header */}
        <header className="text-center space-y-4 px-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70">
            Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white break-words">
            Pods that{" "}
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#4F46E5] bg-clip-text text-transparent">
              move fast
            </span>
          </h1>
          <p className="mx-auto max-w-[70ch] text-white/70 text-[15px] sm:text-[16px] px-2">
            Simple scopes. Weekly drops. Dashboards the exec team opens.
          </p>
        </header>

        {/* Quick metrics strip */}
        <SectionShell className="py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/12 px-4 sm:px-5 py-4 text-center"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
              >
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Main: selector + glass panel */}
        <SectionShell className="relative overflow-hidden">
          {/* ambient beam */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[40px] blur-3xl"
            style={{
              background: `radial-gradient(60% 45% at 50% 0%, ${withAlpha(
                active.accent,
                0.28
              )}, transparent 65%)`,
            }}
          />

          {/* desktop layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8">
            {/* left: glow rail pills */}
            <nav aria-label="Solutions" className="flex flex-col gap-3 min-w-0">
              {SOLUTIONS.map((s) => {
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveId(s.id)}
                    className={`group relative w-full text-left rounded-2xl border px-4 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60 ${
                      isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white hover:border-white/25"
                    }`}
                    style={{
                      backgroundColor: withAlpha(s.accent, isActive ? 0.2 : 0.1),
                      borderColor: withAlpha(COLORS.text, isActive ? 0.3 : 0.16),
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute -inset-0.5 rounded-2xl blur-xl opacity-70"
                        style={{
                          background: `linear-gradient(90deg, ${withAlpha(
                            s.accent,
                            0.55
                          )}, transparent)`,
                        }}
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3 min-w-0">
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20"
                        style={{ backgroundColor: withAlpha(s.accent, 0.22) }}
                      >
                        <s.icon className="h-5 w-5 text-white" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold truncate">
                          {s.title}
                        </span>
                        <span className="block text-xs text-white/60 truncate">
                          {s.summary}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* right: glass details */}
            <GlassPanel s={active} />
          </div>

          {/* mobile: accordions */}
          <div className="md:hidden space-y-4">
            {SOLUTIONS.map((s) => (
              <details
                key={s.id}
                open={s.id === activeId}
                onToggle={(e) => (e.currentTarget.open ? setActiveId(s.id) : null)}
                className="group rounded-2xl border border-white/15 bg-white/[.06] backdrop-blur-xl overflow-hidden"
              >
                <summary className="list-none cursor-pointer px-4 py-4 flex items-center gap-3 min-w-0">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20"
                    style={{ backgroundColor: withAlpha(s.accent, 0.22) }}
                  >
                    <s.icon className="h-5 w-5 text-white" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold truncate">{s.title}</h3>
                    <p className="text-xs text-white/60 truncate">{s.summary}</p>
                  </div>
                </summary>
                <div className="px-4 pb-4">
                  <PanelInner s={s} />
                </div>
              </details>
            ))}
          </div>
        </SectionShell>

        {/* Process */}
        <SectionShell>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Step icon={Target} title="Discover" text="Goals, constraints, success metrics." />
            <Step icon={Rocket} title="Plan" text="4–8 week roadmap with milestones." />
            <Step icon={Code} title="Build" text="Weekly drops with QA + tracking." />
            <Step icon={CalendarCheck} title="Scale" text="Optimize funnels & add automations." />
          </div>
        </SectionShell>

        {/* FAQ */}
        <SectionShell>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="rounded-2xl border border-white/12 bg-white/5 p-4"
              >
                <summary className="list-none cursor-pointer text-white font-semibold">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        </SectionShell>

        {/* CTA */}
        <div className="text-center px-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 sm:px-6 py-3 text-sm font-semibold text-white hover:translate-x-0.5 transition"
            style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
          >
            Start a pod <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ===================== Sub-components ===================== */

function GlassPanel({ s }: { s: Solution }) {
  return (
    <div
      className="relative rounded-3xl border border-white/12 bg-white/[.06] backdrop-blur-xl p-5 sm:p-6 min-w-0"
      style={{ boxShadow: "0 28px 60px -40px rgba(5,6,29,.85)" }}
    >
      <header className="flex items-start justify-between gap-4 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/20"
            style={{ backgroundColor: withAlpha(s.accent, 0.26) }}
          >
            <s.icon className="h-6 w-6 text-white" />
          </span>
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white break-words">
              {s.title}
            </h2>
            <p className="text-sm text-white/70 max-w-[60ch] sm:max-w-[48ch] break-words">
              {s.summary}
            </p>
          </div>
        </div>
        {/* keywords pill – hide on small, truncate on md */}
        <span
          className="hidden md:inline-flex h-8 px-4 items-center justify-center rounded-full border border-white/15 text-[11px] text-white/80 max-w-[40%] truncate"
          style={{ backgroundColor: withAlpha(s.accent, 0.18) }}
          title={s.keywords.join(" • ")}
        >
          {s.keywords.join(" • ")}
        </span>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {s.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-white/15 px-4 py-4 text-center"
            style={{ backgroundColor: withAlpha(s.accent, 0.14) }}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
              {m.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {s.bullets.map((b) => (
          <div
            key={b}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85 flex items-start gap-2 break-words"
          >
            <Check className="h-4 w-4 text-[#4F46E5] mt-0.5 shrink-0" />
            <span className="min-w-0">{b}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <div className="flex flex-wrap gap-2">
          {s.keywords.map((k) => (
            <span
              key={k}
              className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/80"
              style={{ backgroundColor: withAlpha(s.accent, 0.18) }}
            >
              {k}
            </span>
          ))}
        </div>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 sm:px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-1"
          style={{
            backgroundColor: withAlpha(s.accent, 0.26),
            backdropFilter: "blur(18px)",
          }}
        >
          {s.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function PanelInner({ s }: { s: Solution }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-white/75">{s.summary}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {s.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/15 px-3 py-3 text-center"
            style={{ backgroundColor: withAlpha(s.accent, 0.14) }}
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/70">
              {m.label}
            </div>
            <div className="text-sm font-semibold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      <ul className="space-y-2">
        {s.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-white/85 rounded-xl border border-white/15 bg-white/5 px-3 py-2 break-words"
          >
            <Check className="h-4 w-4 text-[#4F46E5] mt-0.5 shrink-0" />
            <span className="min-w-0">{b}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: withAlpha(s.accent, 0.22) }}
        >
          {s.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/12 p-4 sm:p-5"
      style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10">
          <Icon className="h-5 w-5 text-white" />
        </span>
        <h3 className="text-white font-semibold truncate">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-white/70">{text}</p>
    </div>
  );
}
