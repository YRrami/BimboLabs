// src/pages/SolutionsPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";
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
  Layout,
} from "lucide-react";
import { SectionShell, withAlpha, COLORS } from "../components/layout/SiteLayout";

/* ===================== Data & Types ===================== */

type Solution = {
  id: string;
  title: string;
  description: string;
  focus: string;
  icon: React.ElementType;
  accent: string; // hex color
  cta: string;
  sampleBullets: string[];
};

const SOLUTIONS: Solution[] = [
  {
    id: "software",
    title: "Software Development",
    description:
      "We plan, design, and ship modern web apps with weekly demos, docs, and tracking from day one.",
    focus: "Full-stack build + launch",
    icon: Code,
    accent: "#4F46E5",
    cta: "Scope a Build",
    sampleBullets: ["Next.js/React frontends", "APIs & auth", "Deploy & observability"],
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description:
      "Technical fixes and content systems that grow qualified traffic—measured in your analytics, not guesses.",
    focus: "Search performance",
    icon: Search,
    accent: "#38BDF8",
    cta: "Get an SEO Plan",
    sampleBullets: ["Tech SEO audits", "Content briefs", "Schema & Core Web Vitals"],
  },
  {
    id: "media",
    title: "Media Buying",
    description:
      "Full-funnel testing on Meta/Google with server-side events and pacing dashboards you can trust.",
    focus: "Paid acquisition",
    icon: Megaphone,
    accent: "#6366F1",
    cta: "Launch Media",
    sampleBullets: ["Account structure", "Creative testing", "Budget pacing & ROAS"],
  },
  {
    id: "brand",
    title: "Brand Management",
    description:
      "Messaging, visual systems, and usage rules so every touchpoint feels consistent—in English or Arabic.",
    focus: "Identity systems",
    icon: Sparkles,
    accent: "#A855F7",
    cta: "Start Brand Sprint",
    sampleBullets: ["Voice & tone", "Logo/typography rules", "Templates & components"],
  },
  {
    id: "social",
    title: "Social Media",
    description:
      "Always-on storytelling and community replies with a light weekly cadence and simple reporting.",
    focus: "Community narrative",
    icon: MessageSquare,
    accent: "#EC4899",
    cta: "Design Social Playbook",
    sampleBullets: ["Content calendar", "Reply guidelines", "Monthly insights"],
  },
];

type WebsitePackageTier = {
  id: string;
  title: string;
  price: string;
  summary: string;
  details: string;
  tag?: string;
  accent: string;
  specs: string[];
};

const WEBSITE_PACKAGES: WebsitePackageTier[] = [
  {
    id: "starter",
    title: "Starter",
    price: "Contact",
    summary: "Single-page landing",
    details:
      "Responsive landing page with copy polish and core SEO basics. Great for a quick launch.",
    accent: "#38BDF8",
    specs: ["1 page", "Basic SEO", "Contact form"],
  },
  {
    id: "basic",
    title: "Basic",
    price: "Contact",
    summary: "3–4 page brochure",
    details:
      "Multi-page site with component library and tailored styling. Our most common SME package.",
    tag: "Popular",
    accent: "#4F46E5",
    specs: ["3–4 pages", "SEO setup", "CMS-ready"],
  },
  {
    id: "premium",
    title: "Premium",
    price: "Contact",
    summary: "5+ page product site",
    details:
      "Custom UI/UX, motion, and content guidance. Good for launches that need polish and depth.",
    accent: "#A855F7",
    specs: ["5+ pages", "Animations", "Content help"],
  },
  {
    id: "custom",
    title: "Custom",
    price: "Contact",
    summary: "Advanced builds & integrations",
    details:
      "E-commerce, dashboards, or application logic. Tell us your scope; we’ll craft a proposal.",
    accent: "#22D3EE",
    specs: ["Scoped features", "Integrations", "Roadmap"],
  },
];

const PACKAGE_INCLUDES = ["Figma handoff", "Responsive layouts", "Performance budget"] as const;

/* ---------- Marketing Packages ---------- */

type MarketingPackageTier = {
  id: string;
  title: "Launch" | "Growth" | "Scale" | "Custom";
  price: string; // "Contact"
  summary: string;
  details: string;
  tag?: string;
  accent: string;
  specs: string[]; // badges
  kpis: string[];
  adSpendRange: string;
  commitment: string;
  platforms: string[];
  languages: string[]; // ["EN","AR"]
  meetings: "Weekly" | "Bi-weekly";
  slas: string[];
  addons: string[];
  exclusions: string[];
  proofBadge?: string;
};

const MARKETING_PACKAGES: MarketingPackageTier[] = [
  {
    id: "mkt-launch",
    title: "Launch",
    price: "Contact",
    summary: "Set up + first 10 experiments",
    details:
      "Meta + Google foundations with server-side events and clear dashboards. 10–12 structured tests in the first 6 weeks.",
    tag: "Great for new brands",
    accent: "#22D3EE",
    specs: ["Meta + Google", "GA4 + CAPI", "Weekly report"],
    kpis: ["ROAS", "CPL", "CTR"],
    adSpendRange: "$1k–$5k / mo",
    commitment: "8 weeks",
    platforms: ["Meta", "Google"],
    languages: ["EN", "AR"],
    meetings: "Weekly",
    slas: ["<24h response", "48–72h new creative"],
    addons: ["Landing page", "Motion variant"],
    exclusions: ["Community management", "Video shoots"],
    proofBadge: "+162% ROAS in 90d",
  },
  {
    id: "mkt-growth",
    title: "Growth",
    price: "Contact",
    summary: "Creative velocity + multi-channel scaling",
    details:
      "Higher test velocity with cross-channel insights, weekly creative sprints, and a live experimentation log.",
    tag: "Most popular",
    accent: "#6366F1",
    specs: ["Meta + Google (+TikTok)", "Server-side tracking", "Live dashboard"],
    kpis: ["ROAS", "CAC", "CVR"],
    adSpendRange: "$5k–$20k / mo",
    commitment: "12 weeks",
    platforms: ["Meta", "Google", "TikTok"],
    languages: ["EN", "AR"],
    meetings: "Weekly",
    slas: ["<12h response", "24–48h new creative"],
    addons: ["Influencer seeding", "Email flows"],
    exclusions: ["PR", "Affiliate network mgmt"],
    proofBadge: "58% revenue lift in 90d",
  },
  {
    id: "mkt-scale",
    title: "Scale",
    price: "Contact",
    summary: "Multi-market growth + deeper analytics",
    details:
      "Advanced experimentation, offline conversions, and rapid landing tests across EN/AR markets.",
    accent: "#A855F7",
    specs: ["Meta/Google/TikTok/LinkedIn", "Offline conv. uploads", "Exec reporting"],
    kpis: ["MER", "Revenue influenced", "Payback period"],
    adSpendRange: "$20k–$80k / mo",
    commitment: "3 months",
    platforms: ["Meta", "Google", "TikTok", "LinkedIn"],
    languages: ["EN", "AR"],
    meetings: "Weekly",
    slas: ["Same-day response", "24h hotfix"],
    addons: ["LP design/build", "CRO sprint"],
    exclusions: ["TV/OOH buying"],
    proofBadge: "MER +0.8 within 60d",
  },
  {
    id: "mkt-custom",
    title: "Custom",
    price: "Contact",
    summary: "Performance squad for unique scopes",
    details:
      "For regulated categories or unusual funnels. We design the playbook around your constraints and targets.",
    accent: "#0EA5E9",
    specs: ["Scoped channels", "Bespoke cadence", "Custom reporting"],
    kpis: ["Custom to brief"],
    adSpendRange: "Any",
    commitment: "TBD",
    platforms: ["Meta", "Google", "TikTok", "LinkedIn"],
    languages: ["EN", "AR"],
    meetings: "Bi-weekly",
    slas: ["TBD"],
    addons: ["As needed"],
    exclusions: [],
  },
];

/* ---------- Branding Packages (NEW) ---------- */

type BrandingPackageTier = {
  id: string;
  title: "Brand Sprint" | "Brand System" | "Rebrand & Rollout" | "Custom";
  price: string; // "Contact"
  summary: string;
  details: string;
  tag?: string;
  accent: string;
  specs: string[]; // badges (e.g., EN/AR, Guidelines, Templates)
  commitment: string; // e.g., 3–4 weeks, 6–8 weeks
  meetings: "Weekly" | "Bi-weekly";
  languages: string[]; // ["EN","AR"]
  deliverables: string[];
  addons: string[];
  exclusions: string[];
  proofBadge?: string;
};

const BRANDING_PACKAGES: BrandingPackageTier[] = [
  {
    id: "br-sprint",
    title: "Brand Sprint",
    price: "Contact",
    summary: "Positioning, voice, and a usable mini-kit",
    details:
      "Fast discovery + positioning, core messaging, and a lightweight visual starter to align your team and ship quickly.",
    tag: "Fastest path",
    accent: "#F59E0B",
    specs: ["EN/AR ready", "Mini guidelines", "Templates"],
    commitment: "3–4 weeks",
    meetings: "Weekly",
    languages: ["EN", "AR"],
    deliverables: [
      "Positioning + value props",
      "Voice & tone guide",
      "Color & typography picks",
      "Logo refinements (if any)",
      "Social & deck templates (starter)",
    ],
    addons: ["Naming sprint", "Brand photoshoot brief", "Icon set"],
    exclusions: ["Full rebrand", "Comprehensive signage"],
    proofBadge: "Used by 5+ SME launches",
  },
  {
    id: "br-system",
    title: "Brand System",
    price: "Contact",
    summary: "Scalable identity with components & rules",
    details:
      "A cohesive identity system with rules and templates so every touchpoint is consistent, in English and Arabic.",
    tag: "Most requested",
    accent: "#A855F7",
    specs: ["Design tokens", "Guidelines", "Templates"],
    commitment: "6–8 weeks",
    meetings: "Weekly",
    languages: ["EN", "AR"],
    deliverables: [
      "Logo suite + usage rules",
      "Design tokens (color/typography/spacing)",
      "Grid + layout patterns",
      "Presentation, social, and doc templates",
      "Brand guidelines (PDF/Notion)",
    ],
    addons: ["Illustration style", "Motion identity", "Email template kit"],
    exclusions: ["Packaging dielines", "Retail signage"],
    proofBadge: "Adopted by multi-market teams",
  },
  {
    id: "br-rebrand",
    title: "Rebrand & Rollout",
    price: "Contact",
    summary: "Identity refresh and changeover plan",
    details:
      "For established brands: new identity, change management, and a sequenced rollout across your properties.",
    accent: "#10B981",
    specs: ["Rollout plan", "Asset migration", "Stakeholder comms"],
    commitment: "8–12 weeks",
    meetings: "Weekly",
    languages: ["EN", "AR"],
    deliverables: [
      "Brand audit + stakeholder interviews",
      "New identity (logo/system/guidelines)",
      "Asset migration plan & checklists",
      "Rollout comms kit + templates",
      "QA on top 10 touchpoints",
    ],
    addons: ["Launch campaign kit", "Website reskin", "Motion templates"],
    exclusions: ["Physical store redesign", "TV/OOH production"],
    proofBadge: "Seamless changeovers",
  },
  {
    id: "br-custom",
    title: "Custom",
    price: "Contact",
    summary: "Tailored scope for special constraints",
    details:
      "Specific markets, regulators, or complex org structures—tell us the constraints and targets, we’ll blueprint the path.",
    accent: "#3B82F6",
    specs: ["Bespoke cadence", "Custom templates", "Exec reporting"],
    commitment: "TBD",
    meetings: "Bi-weekly",
    languages: ["EN", "AR"],
    deliverables: ["Defined with you"],
    addons: ["As needed"],
    exclusions: [],
  },
];

const HIGHLIGHTS = [
  { label: "Pod spin-up", value: "5 days" },
  { label: "Weekly updates", value: "Every Friday" },
  { label: "Launch support", value: "30 days" },
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
    aria-label="Solutions navigation"
    className="hidden lg:block sticky top-24 self-start rounded-2xl border border-white/10 bg-white/5 p-4"
    style={{ backdropFilter: "blur(16px)" }}
  >
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

const MediaFrame: React.FC<{ accent: string; children: React.ReactNode }> = ({ accent, children }) => (
  <div
    className="relative h-full rounded-3xl border p-4 sm:p-5"
    style={{
      borderColor: withAlpha(accent, 0.25),
      background: `linear-gradient(180deg, ${withAlpha(accent, 0.08)} 0%, ${withAlpha(
        COLORS.background,
        0.4
      )} 100%)`,
    }}
  >
    <div className="flex items-center gap-1.5 pb-3">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha("#ff5f56", 1) }} />
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha("#ffbd2e", 1) }} />
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha("#27c93f", 1) }} />
    </div>
    <div className="rounded-xl border border-white/10 bg-white/[.04] p-4 min-h-[160px]">
      {children}
    </div>
  </div>
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
          background: `linear-gradient(120deg, ${withAlpha(data.accent, 0.16)}, transparent 60%)`,
        }}
      />
      {/* Text card */}
      <div className={alignRight ? "order-2 md:order-1" : "order-1"}>
        <article
          className="relative h-full overflow-hidden rounded-3xl border p-6 sm:p-8"
          style={{
            borderColor: withAlpha(data.accent, 0.28),
            backgroundColor: withAlpha(data.accent, 0.08),
            boxShadow: `0 28px 60px -32px ${withAlpha(data.accent, 0.55)}`,
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
                boxShadow: `0 18px 40px -28px ${withAlpha(data.accent, 0.7)}`,
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
              <span className="text-sm font-medium text-white/80">What you’ll see</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[12px] text-white/75">
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Weekly demos</div>
                <div className="mt-1 text-white/60">Short Loom + notes</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Live backlog</div>
                <div className="mt-1 text-white/60">Tasks & statuses</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Tracking</div>
                <div className="mt-1 text-white/60">Events + dashboards</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="text-white/90 font-medium">Docs</div>
                <div className="mt-1 text-white/60">Handover & how-to</div>
              </div>
            </div>
          </div>
        </MediaFrame>
      </div>
    </section>
  );
};

/* ===================== Packages ===================== */

const PackageBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="rounded-full border border-white/12 bg-white/[.06] px-3 py-1 text-[11px] text-white/80">
    {text}
  </span>
);

const CardShadow: React.CSSProperties = { boxShadow: "0 28px 60px -32px rgba(0,0,0,.55)" };

function PackageGrid<T extends WebsitePackageTier | MarketingPackageTier | BrandingPackageTier>({
  data,
  isMarketing = false,
  isBranding = false,
}: {
  data: T[];
  isMarketing?: boolean;
  isBranding?: boolean;
}) {
  const cols =
    isMarketing || isBranding ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-4";

  return (
    <div className={`grid grid-cols-1 ${cols} gap-6 sm:gap-8`}>
      {data.map((pkg: any) => (
        <div
          key={pkg.id}
          className={`relative flex flex-col gap-5 overflow-hidden rounded-2xl border bg-white/[.05] p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 ${
            pkg.tag ? "md:scale-[1.02] md:border-white/20" : ""
          }`}
          style={{
            ...CardShadow,
            borderColor: withAlpha(pkg.accent, 0.28),
            backgroundColor: withAlpha(pkg.accent, 0.08),
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-20"
            style={{
              background: `linear-gradient(120deg, ${withAlpha(pkg.accent, 0.45)} 0%, transparent 70%)`,
              opacity: 0.9,
            }}
          />
          {pkg.tag && (
            <span
              className="absolute right-6 top-6 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: withAlpha(pkg.accent, 0.6) }}
            >
              {pkg.tag}
            </span>
          )}

          {/* Head */}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">{pkg.title}</h3>
            <div className="text-3xl font-bold text-white">{pkg.price}</div>
            <p className="text-sm text-white/70">{pkg.summary}</p>
          </div>

          {/* Body */}
          <p className="text-sm text-white/80">{pkg.details}</p>

          {/* Spec row */}
          <div className="mt-1 flex flex-wrap gap-2">
            {pkg.specs?.map((s: string) => <PackageBadge key={s} text={s} />)}
          </div>

          {/* Marketing-only rows */}
          {"kpis" in pkg && (
            <>
              <div className="grid grid-cols-2 gap-2 text-[12px] text-white/85">
                <div className="rounded-md border border-white/12 bg-white/10 p-3">
                  <div className="text-white/60">Ad spend</div>
                  <div className="text-white font-medium">{pkg.adSpendRange}</div>
                </div>
                <div className="rounded-md border border-white/12 bg-white/10 p-3">
                  <div className="text-white/60">Commitment</div>
                  <div className="text-white font-medium">{pkg.commitment}</div>
                </div>
                <div className="rounded-md border border-white/12 bg-white/10 p-3">
                  <div className="text-white/60">Platforms</div>
                  <div className="text-white font-medium truncate">{pkg.platforms.join(" • ")}</div>
                </div>
                <div className="rounded-md border border-white/12 bg-white/10 p-3">
                  <div className="text-white/60">Meetings</div>
                  <div className="text-white font-medium">{pkg.meetings}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {pkg.kpis.map((k: string) => <PackageBadge key={k} text={`KPI: ${k}`} />)}
                {pkg.languages.map((l: string) => <PackageBadge key={l} text={`Lang: ${l}`} />)}
              </div>

              {(pkg.addons?.length || pkg.exclusions?.length) && (
                <div className="grid grid-cols-1 gap-2 text-[12px]">
                  {pkg.addons?.length ? (
                    <div className="text-white/80">
                      <span className="text-white/60">Add-ons: </span>{pkg.addons.join(", ")}
                    </div>
                  ) : null}
                  {pkg.exclusions?.length ? (
                    <div className="text-white/70">
                      <span className="text-white/50">Exclusions: </span>{pkg.exclusions.join(", ")}
                    </div>
                  ) : null}
                </div>
              )}

              {pkg.proofBadge && (
                <span className="inline-flex items-center self-start rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] text-white/85">
                  {pkg.proofBadge}
                </span>
              )}
            </>
          )}

          {/* Branding-only rows */}
          {"deliverables" in pkg && !("kpis" in pkg) && (
            <>
              <div className="grid grid-cols-2 gap-2 text-[12px] text-white/85">
                <div className="rounded-md border border-white/12 bg-white/10 p-3">
                  <div className="text-white/60">Commitment</div>
                  <div className="text-white font-medium">{pkg.commitment}</div>
                </div>
                <div className="rounded-md border border-white/12 bg-white/10 p-3">
                  <div className="text-white/60">Meetings</div>
                  <div className="text-white font-medium">{pkg.meetings}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {pkg.languages.map((l: string) => <PackageBadge key={l} text={`Lang: ${l}`} />)}
              </div>

              {pkg.deliverables?.length > 0 && (
                <div className="text-[12px] text-white/80">
                  <div className="mb-1 text-white/60">Deliverables:</div>
                  <ul className="space-y-1">
                    {pkg.deliverables.map((d: string) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(pkg.addons?.length || pkg.exclusions?.length) && (
                <div className="grid grid-cols-1 gap-2 text-[12px]">
                  {pkg.addons?.length ? (
                    <div className="text-white/80">
                      <span className="text-white/60">Add-ons: </span>{pkg.addons.join(", ")}
                    </div>
                  ) : null}
                  {pkg.exclusions?.length ? (
                    <div className="text-white/70">
                      <span className="text-white/50">Exclusions: </span>{pkg.exclusions.join(", ")}
                    </div>
                  ) : null}
                </div>
              )}

              {pkg.proofBadge && (
                <span className="inline-flex items-center self-start rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] text-white/85">
                  {pkg.proofBadge}
                </span>
              )}
            </>
          )}

          {/* CTA */}
          <div className="mt-auto">
            <Link
              to="/contact"
              className="inline-flex w-fit items-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold text-white transition-transform hover:translate-x-1"
              style={{
                borderColor: withAlpha(pkg.accent, 0.25),
                backgroundColor: withAlpha(pkg.accent, 0.18),
              }}
            >
              Talk to the team
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Tabbed switcher now has three tabs: Website | Marketing | Branding */
function PackageSwitcher() {
  const [tab, setTab] = useState<"website" | "marketing" | "branding">("marketing");

  const TabButton = ({ id, label }: { id: "website" | "marketing" | "branding"; label: string }) => {
    const active = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
          active ? "text-white" : "text-white/70 hover:text-white"
        }`}
        style={{
          border: `1px solid ${withAlpha(COLORS.text, active ? 0.2 : 0.12)}`,
          background: active ? withAlpha(COLORS.primary, 0.22) : "transparent",
          boxShadow: active ? "0 12px 28px -20px rgba(79,70,229,.65)" : "none",
        }}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  };

  const HeaderCopy = () => {
    if (tab === "website") {
      return (
        <>
          <p className="mx-auto max-w-[60ch] text-sm sm:text-base text-white/70">
            Pick a scope that matches your moment. All builds include UI/UX, responsive design, and deployment help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PACKAGE_INCLUDES.map((item) => (
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
            Performance pods for Meta, Google, TikTok, and LinkedIn. EN/AR support, weekly or bi-weekly cadence, server-side tracking, and live dashboards. Pricing is “Contact” until budgets are finalized.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["ROAS", "CAC", "CVR", "MER"].map((k) => (
              <PackageBadge key={k} text={`KPI: ${k}`} />
            ))}
            <PackageBadge text="EN/AR" />
          </div>
        </>
      );
    }
    // branding
    return (
      <>
        <p className="mx-auto max-w-[60ch] text-sm sm:text-base text-white/70">
          Identity that scales: positioning, visual systems, and templates so every touchpoint is on-brand. EN/AR deliverables, weekly or bi-weekly cadence, and a clear rollout plan. Pricing is “Contact”.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Guidelines", "Templates", "Design tokens"].map((k) => (
            <PackageBadge key={k} text={k} />
          ))}
          <PackageBadge text="EN/AR" />
        </div>
      </>
    );
  };

  return (
    <SectionShell className="py-10 sm:py-12">
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex gap-2 rounded-2xl p-1 border border-white/10 bg-white/5 backdrop-blur">
            <TabButton id="website" label="Website Packages" />
            <TabButton id="marketing" label="Marketing Packages" />
            <TabButton id="branding" label="Branding Packages" />
          </div>
          <HeaderCopy />
        </div>

        {tab === "website" && <PackageGrid data={WEBSITE_PACKAGES} />}
        {tab === "marketing" && <PackageGrid data={MARKETING_PACKAGES} isMarketing />}
        {tab === "branding" && <PackageGrid data={BRANDING_PACKAGES} isBranding />}
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
            "radial-gradient(35% 28% at 50% 0%, rgba(79,70,229,.1), transparent 70%)",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-white/70">
            Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Strategic pods that{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#4F46E5] bg-clip-text text-transparent">
              move ideas into market
            </span>
            .
          </h1>
          <p className="mx-auto max-w-[62ch] text-white/70 text-sm sm:text-base leading-relaxed">
            Build what matters with a small team that ships weekly. We work with SMEs in Egypt and the US, in English or Arabic.
          </p>

          {/* Mobile quick chips */}
          <MobileChipRail />

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            {["Strategy + Discovery", "Design Systems", "Full-stack Delivery"].map((label) => (
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
              Start a project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/our-work"
              className="inline-flex items-center gap-3 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white hover:border-white/30"
            >
              See recent work
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
                style={{ boxShadow: "0 20px 40px -10px rgba(0,0,0,0.4)" }}
              >
                <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                  {item.label}
                </div>
                <div className="mt-3 text-xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Solutions body: sticky nav + zigzag */}
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
          <StickyNav activeId={activeId} />
          <div className="space-y-12">
            {SOLUTIONS.map((s, i) => (
              <SolutionZigzag key={s.id} data={s} index={i} />
            ))}
          </div>
        </div>

        {/* Which pod fits? */}
        <SectionShell className="py-8 sm:py-10">
          <div className="mb-6 flex items-center gap-2">
            <Layout className="h-5 w-5 text-white/80" />
            <h3 className="text-xl font-semibold text-white">Which pod fits?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {SOLUTIONS.map((s) => (
              <div
                key={s.id}
                className="rounded-xl border p-4"
                style={{ borderColor: withAlpha(s.accent, 0.25), backgroundColor: withAlpha(s.accent, 0.07) }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: withAlpha(s.accent, 0.9) }} />
                  <div className="text-sm font-medium text-white">{s.title}</div>
                </div>
                <ul className="mt-3 space-y-1.5 text-[12px] text-white/80">
                  {s.sampleBullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Packages Switcher: Website | Marketing | Branding */}
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
