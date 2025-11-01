/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// src/pages/AboutPage.tsx
import { Check, Quote, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "../components/layout/SiteLayout";

/* ========== Local UI tokens + tiny primitives (no SiteLayout needed) ========== */
const COLORS = {
  background: "#05061D",
  primary: "#4F46E5",
  accent: "#A855F7",
  text: "#F7F9FF",
  muted: "#A5ADCF",
  surface: "rgba(255, 255, 255, 0.04)",
} as const;

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
export function withAlpha(hex: string, alpha: number) {
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

function SectionShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 backdrop-blur-xl px-6 sm:px-10 md:px-14 py-12 sm:py-16 ${className ?? ""}`}
      style={{ background: gradientSoft(), boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)" }}
    >
      {children}
    </div>
  );
}
function Stat({
  number,
  label,
  accent,
}: {
  number: string;
  label: string;
  accent: "fuchsia" | "sky" | "indigo";
}) {
  const color =
    accent === "fuchsia"
      ? "text-[#4F46E5]"
      : accent === "sky"
      ? "text-white"
      : "text-[#A855F7]";
  return (
    <div
      className="text-center p-4 sm:p-5 rounded-xl border border-white/10"
      style={{ backgroundColor: COLORS.surface }}
    >
      <div className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${color}`}>{number}</div>
      <div className="text-[11px] sm:text-xs text-[#A5ADCF]">{label}</div>
    </div>
  );
}
const fileNameToTitle = (p: string) => {
  const base = p.split("/").pop() || "";
  const name = base.replace(/\.[a-zA-Z0-9]+$/, "");
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()).trim();
};
/* ===================== Minimal Companies carousel (white circle mask + bigger size) ===================== */
function CompaniesCarousel() {
  const reduced = usePrefersReducedMotion();

  // Accept logos from either src/assets/companies or src/companies
  const logos = useMemo(() => {
    const g1 = import.meta.glob<string>("./assets/companies/*.{png,jpg,jpeg,svg,webp}", {
      eager: true,
      as: "url",
    }) as Record<string, string>;
    const g2 = import.meta.glob<string>("./companies/*.{png,jpg,jpeg,svg,webp}", {
      eager: true,
      as: "url",
    }) as Record<string, string>;

    const merged = { ...g1, ...g2 };
    return Object.entries(merged)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, url]) => ({
        key: path,
        url,
        title: fileNameToTitle(path),
      }));
  }, []);

  // Duplicate for seamless loop
  const lane = [...logos, ...logos];

  return (
    <section className="relative py-10 sm:py-12">
      <div className="mx-auto max-w-[95rem] px-4 sm:px-6 md:px-10 lg:px-14">
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          aria-label="Companies we worked with"
        >
          <div className="px-4 sm:px-5 pt-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
              Companies we worked with
            </p>
          </div>

          <div className="relative mt-2">
            <div className={`cc-marquee ${reduced ? "cc-paused" : ""}`}>
              <div className="cc-track">
                {lane.map((it, i) => (
                  <figure key={`${it.key}-${i}`} className="cc-logo" title={it.title}>
                    <span className="cc-avatar">
                      <img
                        src={it.url}
                        alt={it.title}
                        loading="lazy"
                        decoding="async"
                        className="cc-img"
                      />
                    </span>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* container with edge fade */
        .cc-marquee {
          --gap: 2.5rem;
          --speed: 34s;
          position: relative;
          padding: 1rem 0 1.5rem;
          mask-image: linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%);
        }
        .cc-marquee:hover .cc-track { animation-play-state: paused; }
        .cc-paused .cc-track { animation: none !important; }

        /* track */
        .cc-track {
          display: inline-flex;
          gap: var(--gap);
          padding: 0 var(--gap);
          white-space: nowrap;
          will-change: transform;
          animation: cc-slide var(--speed) linear infinite;
        }
        @keyframes cc-slide { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }

        /* each slot */
        .cc-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 150px; /* bigger lane height */
          padding: 0 1rem;
        }

        /* white circular mask */
        .cc-avatar {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
         
         
        }

        /* logo inside the circle */
        .cc-img {
          max-width: 190%;
          max-height: 190%;
          object-fit: contain;
       
          transition: transform .18s ease, filter .18s ease;
        }
        .cc-avatar:hover .cc-img {
          transform: translateY(-1px) scale(1.03);
          filter: grayscale(.05) opacity(1) contrast(1);
        }

        /* responsive */
        @media (max-width: 1024px) {
          .cc-marquee { --gap: 2rem; --speed: 30s; }
          .cc-logo { height: 80px; }
          .cc-avatar { width: 56px; height: 56px; }
        }
        @media (max-width: 640px) {
          .cc-marquee { --gap: 1.5rem; --speed: 26s; }
          .cc-logo { height: 72px; }
          .cc-avatar { width: 52px; height: 52px; }
        }

        /* respect reduced motion */
        @media (prefers-reduced-motion: reduce) { .cc-track { animation: none !important; } }
      `}</style>
    </section>
  );
}
function TestimonialsSection() {
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
        "They rebuilt our Shopify stack, automated retention, and our returning customer rate spiked within the first month.",
      result: "+38% LTV",
    },
    {
      name: "J. Park",
      role: "VP Product, SaaS",
      quote:
        "The product pod shipped an MVP with analytics and docs. We onboarded customers the same week it went live.",
      result: "6-week MVP",
    },
    {
      name: "Noor K.",
      role: "Marketing Lead, Fintech",
      quote:
        "SEO workflows, social playbooks, and media pacing finally live in one place. Reporting is a breeze for the exec team.",
      result: "+4x organic",
    },
  ] as const;

  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          className="relative h-full rounded-3xl border border-white/12 p-6 sm:p-7"
          style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
        >
          <Quote className="h-6 w-6 text-white/70" />
          <p className="mt-4 text-white/85 text-base leading-relaxed">"{t.quote}"</p>
          <div className="mt-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t.role}</p>
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

/* ========== Page data ========== */
const principles = [
  "Kickoff within five business days once scope is signed",
  "Weekly demos, async Loom recaps, and open backlog",
  "Documentation-first: every asset ships with SOPs",
];

const operatingRhythms = [
  {
    title: "Monday Planning",
    detail:
      "Joint standup with your internal team, backlog grooming, and KPI review to set the week's focus.",
  },
  {
    title: "Midweek Builder Sync",
    detail:
      "Design, engineering, and marketing leads align on blockers, QA expectations, and experiment status.",
  },
  {
    title: "Friday Demo",
    detail:
      "Shipped work showcased live with dashboards updated and next sprint priorities confirmed.",
  },
];

const leadershipNotes = [
  {
    name: "Nora Hussein",
    role: "Head of Product Engineering",
    summary:
      "Former startup CTO who specialises in hardened design systems, web performance budgets, and DX improvements.",
  },
  {
    name: "Karim El Saeed",
    role: "Director of Growth",
    summary:
      "Scaled acquisition and lifecycle at venture-backed SaaS companies; loves structuring creative experiments and analytics stacks.",
  },
  {
    name: "Mina Adel",
    role: "Lead Data & Automation",
    summary:
      "Builds data models, attribution pipelines, and AI copilots so operators get answers without waiting on analysts.",
  },
];

/* =============================== PAGE =============================== */
export default function AboutPage() {
  return (
    <section id="about" className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[95rem] space-y-20">
        {/* INTRO + VALUES + STATS + PRINCIPLES */}
        <SectionShell>
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">
              About Anonvic
            </h1>
            <p className="max-w-[70ch] mx-auto text-[#A5ADCF] text-[15px] sm:text-[16px]">
              We're an integrated growth team — marketers, engineers, and designers — shipping outcomes, not deliverables. Measure impact,
              ship reliably, and keep the playbook once the engagement wraps.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 md:gap-16 items-start">
            {/* Left column: story, stats, values */}
            <div className="space-y-6 sm:space-y-8">
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#A5ADCF] leading-relaxed">
                We partner with operators who need momentum — new category launches, high-growth retention programs, and product-led
                expansion. By pairing a strategist with builders, we stay close to the numbers and move faster than traditional retainers.
              </p>
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#A5ADCF] leading-relaxed">
                Weekly standups, transparent docs, and async updates keep stakeholders aligned. We plug into your comms stack (Slack,
                Linear, Notion) and act like an embedded squad, not an agency on the outside.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <Stat number="7+" label="Years shipping" accent="fuchsia" />
                <Stat number="120+" label="Product & growth launches" accent="sky" />
                <Stat number="99.9%" label="Infra uptime" accent="indigo" />
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Growth mindset", "A11y matters", "Data > opinions", "Ship weekly", "Feedback loops", "Documentation first"].map(
                  (value) => (
                    <span
                      key={value}
                      className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs border bg-white/5 border-white/15 text-white/90"
                    >
                      {value}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right column: “code card” + principles */}
            <div className="space-y-6">
              <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="font-mono text-[12px] sm:text-[12.5px] text-[#A5ADCF] space-y-2" aria-label="Code sample describing skills">
                    <div>
                      <span className="text-[#4F46E5]">const</span> <span className="text-[#4F46E5]">anonvic</span> = {"{"}
                    </div>
                    <div className="pl-4">
                      <span className="text-[#4F46E5]">focus</span>: [<span className="text-white">"Marketing"</span>,{" "}
                      <span className="text-white">"Software"</span>],
                    </div>
                    <div className="pl-4">
                      <span className="text-[#4F46E5]">capabilities</span>: {"{"}
                    </div>
                    <div className="pl-8">
                      <span className="text-[#4F46E5]">growth</span>: [<span className="text-white">"SEO"</span>,{" "}
                      <span className="text-white">"Paid Ads"</span>, <span className="text-white">"Analytics"</span>],
                    </div>
                    <div className="pl-8">
                      <span className="text-[#4F46E5]">build</span>: [<span className="text-white">"Next.js"</span>,{" "}
                      <span className="text-white">"APIs"</span>, <span className="text-white">"AI/RAG"</span>],
                    </div>
                    <div className="pl-4">{"}"}</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Operating principles</h3>
                <ul className="space-y-2 text-sm text-[#A5ADCF]">
                  {principles.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#4F46E5] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SectionShell>

        {/* OPERATING RHYTHMS + LEADERSHIP */}
        <SectionShell>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">The heartbeat of our pods</h2>
              <p className="text-[#A5ADCF] text-[15px] sm:text-[16px]">
                Transparent rhythms keep everyone synchronized. These rituals slot into your calendar so the entire company knows what's
                shipping and when.
              </p>
              <div className="space-y-4">
                {operatingRhythms.map(({ title, detail }) => (
                  <div key={title} className="rounded-2xl border border-white/12 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Leadership crew</h3>
              <div className="space-y-4">
                {leadershipNotes.map(({ name, role, summary }) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/12 p-5"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-white font-semibold">{name}</p>
                        <p className="text-xs uppercase tracking-[0.28em] text-white/50">{role}</p>
                      </div>
                      <span className="text-xs text-white/60 font-mono">Advisor</span>
                    </div>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        {/* CLIENTS (logo wall/ticker) */}
        <SectionShell>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Brands we’ve worked with</h3>
            <CompaniesCarousel />
          </div>
        </SectionShell>

        {/* TESTIMONIALS */}
        <SectionShell>
          <div className="space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">What partners say</h3>
            <p className="text-[#A5ADCF] text-[15px] sm:text-[16px]">
              A few outcomes from recent growth and product engagements.
            </p>
            <TestimonialsSection />
          </div>
        </SectionShell>
      </div>
    </section>
  );
}


