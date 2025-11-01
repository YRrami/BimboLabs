import { Link } from "react-router-dom";
import { Sparkles, Code, Search, Megaphone, MessageSquare, ArrowRight } from "lucide-react";
import { SectionShell, withAlpha, COLORS } from "../components/layout/SiteLayout";
import { Carousel } from 'react-responsive-carousel'; // Carousel import
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

/* ===================== Data ===================== */

type Solution = {
  id: string;
  title: string;
  description: string;
  focus: string;
  icon: React.ElementType;
  accent: string; // hex color
  cta: string;
};

const SOLUTIONS: Solution[] = [
  {
    id: "software",
    title: "Software Development",
    description:
      "Collaborative pods that plan, design, and ship modern web products with steady iterations and clear reporting.",
    focus: "Full-stack build + launch",
    icon: Code,
    accent: "#4F46E5",
    cta: "Scope a Build",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description:
      "Technical fixes, structured content plans, and analytics support that compound qualified organic traffic over time.",
    focus: "Search performance",
    icon: Search,
    accent: "#38BDF8",
    cta: "Get an SEO Plan",
  },
  {
    id: "media",
    title: "Media Buying",
    description:
      "Full-funnel experimentation with paid channels, server-side tracking, and dashboards tuned for real-time decisions.",
    focus: "Paid acquisition",
    icon: Megaphone,
    accent: "#6366F1",
    cta: "Launch Media",
  },
  {
    id: "brand",
    title: "Brand Management",
    description:
      "Messaging frameworks, visual systems, and governance models that make every touchpoint cohesive and on-brand.",
    focus: "Identity systems",
    icon: Sparkles,
    accent: "#A855F7",
    cta: "Start Brand Sprint",
  },
  {
    id: "social",
    title: "Social Media",
    description:
      "Always-on storytelling, community engagement, and reporting that keep audiences informed and invested.",
    focus: "Community narrative",
    icon: MessageSquare,
    accent: "#EC4899",
    cta: "Design Social Playbook",
  },
];

type PackageTier = {
  id: string;
  title: string;
  price: string;
  summary: string;
  details: string;
  tag?: string;
  accent: string;
};

const PACKAGES: PackageTier[] = [
  {
    id: "starter",
    title: "Starter",
    price: "$100",
    summary: "Single-page landing site",
    details:
      "One responsive landing page built with React and Tailwind, including copy polish and core SEO basics.",
    accent: "#38BDF8",
  },
  {
    id: "basic",
    title: "Basic",
    price: "$350",
    summary: "3-4 page brochure site",
    details:
      "Multi-page marketing site with component library, contact form, and tailored brand styling ready to launch fast.",
    tag: "Popular",
    accent: "#4F46E5",
  },
  {
    id: "premium",
    title: "Premium",
    price: "$750",
    summary: "5+ page product site",
    details:
      "Comprehensive website built in React and Tailwind with custom UI/UX design, animations, and content guidance.",
    accent: "#A855F7",
  },
  {
    id: "custom",
    title: "Custom",
    price: "Contact",
    summary: "Advanced builds & integrations",
    details:
      "Ideal for ecommerce, dashboards, and application logic. Tell us the scope and we will craft a dedicated proposal.",
    accent: "#22D3EE",
  },
];

const HIGHLIGHTS = [
  { label: "Pod spin-up", value: "5 days" },
  { label: "Weekly updates", value: "Every Friday" },
  { label: "Launch support", value: "30 days" },
] as const;

const PACKAGE_INCLUDES = [
  "Figma UI/UX handoff",
  "Responsive layouts",
  "Performance budget",
] as const;

/* ===================== Page ===================== */

export default function SolutionsPage() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      {/* background glow + grid */}
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
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 -z-10 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-18%] left-[-6%] h-72 w-72 -z-10 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1), transparent 65%)" }}
      />

      <div className="mx-auto w-full max-w-6xl space-y-12">
        {/* Header Section */}
        <header className="space-y-5 text-center px-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-white/70">
            Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white break-words">
            Strategic pods that{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#4F46E5] bg-clip-text text-transparent">
              move ideas into market
            </span>
            .
          </h1>
          <p className="mx-auto max-w-[62ch] text-white/70 text-sm sm:text-base leading-relaxed">
            Assemble a custom pod across strategy, design, engineering, and growth. Each engagement is time-boxed,
            instrumented, and built to show progress every single week.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
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
              className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-y-1"
            >
              Start a project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/our-work"
              className="inline-flex items-center gap-3 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors duration-300 hover:text-white hover:border-white/30"
            >
              See recent work
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </header>

        {/* Highlights Section */}
        <SectionShell className="py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[.04] px-6 py-6 text-center backdrop-blur-lg"
                style={{ boxShadow: "0 20px 40px -10px rgba(0,0,0,0.4)" }}
              >
                <div className="text-xs uppercase tracking-[0.24em] text-white/60">{item.label}</div>
                <div className="mt-3 text-xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Solutions Section */}
        <SectionShell className="py-8 sm:py-12">
          <Carousel className="carousel" infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={true}>
            {SOLUTIONS.map((s) => (
              <article
                key={s.id}
                className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] p-7 transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:border-white/20"
                style={{
                  borderColor: withAlpha(s.accent, 0.18),
                  backgroundColor: withAlpha(s.accent, 0.06),
                  boxShadow: `0 24px 55px -32px ${withAlpha(s.accent, 0.6)}`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-32 opacity-80"
                  style={{
                    background: `linear-gradient(130deg, ${withAlpha(s.accent, 0.5)} 0%, transparent 70%)`,
                  }}
                />
                <div className="flex items-start gap-5">
                  <span
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/[.06]"
                    style={{ borderColor: withAlpha(s.accent, 0.6) }}
                  >
                    <s.icon className="h-8 w-8 text-white" />
                  </span>
                  <div className="min-w-0 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">{s.title}</h2>
                    <span
                      className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/65"
                      style={{ borderColor: withAlpha(s.accent, 0.45), backgroundColor: withAlpha(s.accent, 0.2) }}
                    >
                      {s.focus}
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed text-white/75">{s.description}</p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 self-start rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-1"
                  style={{
                    backgroundColor: withAlpha(s.accent, 0.3),
                    boxShadow: `0 18px 35px -24px ${withAlpha(s.accent, 0.8)}`,
                  }}
                >
                  {s.cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </article>
            ))}
          </Carousel>
        </SectionShell>

        {/* Packages Section */}
        <SectionShell className="py-10 sm:py-12">
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Website Packages</h2>
              <p className="mx-auto max-w-[60ch] text-sm sm:text-base text-white/70">
                Choose a build that fits your scope. All packages are engineered with React and Tailwind, include UI/UX
                design, and launch-ready deployment support.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {PACKAGE_INCLUDES.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/[.06] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-white/65"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/12 bg-white/[.05] p-7 backdrop-blur-md transition-transform duration-500 ease-in-out hover:-translate-y-1"
                  style={{
                    borderColor: withAlpha(pkg.accent, 0.28),
                    backgroundColor: withAlpha(pkg.accent, 0.08),
                    boxShadow: `0 28px 60px -32px ${withAlpha(pkg.accent, 0.6)}`,
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-24"
                    style={{
                      background: `linear-gradient(120deg, ${withAlpha(pkg.accent, 0.45)} 0%, transparent 70%)`,
                      opacity: 0.9,
                    }}
                  />
                  {pkg.tag && (
                    <span
                      className="absolute right-8 top-8 inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                      style={{ backgroundColor: withAlpha(pkg.accent, 0.6) }}
                    >
                      {pkg.tag}
                    </span>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{pkg.title}</h3>
                    <div className="text-3xl font-bold text-white">{pkg.price}</div>
                    <p className="text-sm text-white/70">{pkg.summary}</p>
                  </div>
                  <p className="text-sm text-white/75">{pkg.details}</p>
                  <Link
                    to="/contact"
                    className="inline-flex w-fit items-center gap-3 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-1"
                    style={{ backgroundColor: withAlpha(pkg.accent, 0.18) }}
                  >
                    Talk to the team
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* Footer Section */}
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
