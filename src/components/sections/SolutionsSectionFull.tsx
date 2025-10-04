import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Code, Search, Megaphone, MessageSquare } from "lucide-react";
import { COLORS, withAlpha, gradientSoft } from "../layout/SiteLayout";
import { type ElementType } from "react";

export function SolutionsSection() {
  type Solution = {
    id: string;
    name: string;
    icon: ElementType;
    summary: string;
    description: string;
    highlights: string[];
    metrics: Array<{ label: string; value: string }>;
    keywords: string[];
    cta: string;
    accent: string;
  };

  const solutions: Solution[] = [
    {
      id: "brand",
      name: "Brand Management",
      icon: Sparkles,
      summary: "Messaging, design systems, and governance so every touchpoint feels on-brand.",
      description:
        "We align positioning, voice, and visual guidelines, then package assets so internal teams and partners ship cohesive work without hand-holding.",
      highlights: ["Positioning sprints", "Messaging toolkit", "Asset governance"],
      metrics: [
        { label: "Timeline", value: "3-4 weeks" },
        { label: "Deliverables", value: "Playbook + assets" },
        { label: "Team", value: "Strategy + Design" },
      ],
      keywords: ["Voice map", "Design tokens", "Brand OS"],
      cta: "Plan Brand Sprint",
      accent: "#A855F7",
    },
    {
      id: "software",
      name: "Software Development",
      icon: Code,
      summary: "Full-stack pods that architect, build, and launch web products fast.",
      description:
        "From discovery to rollout, we deliver production-ready features with testing, analytics, and documentation baked in so teams can ship weekly.",
      highlights: ["Next.js & Node", "Design systems", "QA & monitoring"],
      metrics: [
        { label: "Cadence", value: "Weekly drops" },
        { label: "Stack", value: "React / Node / CI" },
        { label: "Focus", value: "Quality + velocity" },
      ],
      keywords: ["Accessibility", "Telemetry", "CI/CD"],
      cta: "Scope Build",
      accent: "#4F46E5",
    },
    {
      id: "seo",
      name: "SEO Optimization",
      icon: Search,
      summary: "Technical and editorial SEO that compounds qualified traffic.",
      description:
        "We audit your site, map opportunities, and run a content engine covering briefs, publishing, and performance reporting to sustain organic growth.",
      highlights: ["Technical audits", "Content ops", "Schema coverage"],
      metrics: [
        { label: "CWV", value: "> 90" },
        { label: "Velocity", value: "4-6 briefs/mo" },
        { label: "Analytics", value: "Looker Studio" },
      ],
      keywords: ["Topic clusters", "Internal linking", "Search intent"],
      cta: "Request SEO Plan",
      accent: "#38BDF8",
    },
    {
      id: "media",
      name: "Media Buying",
      icon: Megaphone,
      summary: "Performance media managed with creative testing and live dashboards.",
      description:
        "We run paid campaigns with structured experiments, server-side tracking, and weekly insights connected to revenue so budgets move with confidence.",
      highlights: ["Creative experiments", "Budget pacing", "ROAS reporting"],
      metrics: [
        { label: "Channels", value: "Meta / Google" },
        { label: "Cadence", value: "Weekly sprints" },
        { label: "Focus", value: "MER + LTV" },
      ],
      keywords: ["CAPI", "Attribution", "Iterative creatives"],
      cta: "Launch Media Plan",
      accent: "#6366F1",
    },
    {
      id: "social",
      name: "Social Media",
      icon: MessageSquare,
      summary: "Always-on storytelling and community management for organic channels.",
      description:
        "We build calendars, ship assets, and manage community engagement to grow reach while keeping voice, timing, and reporting consistent.",
      highlights: ["Content calendar", "Community replies", "Influencer loops"],
      metrics: [
        { label: "Channels", value: "IG / TikTok / X" },
        { label: "Cadence", value: "3-5 posts/wk" },
        { label: "Focus", value: "Engagement lift" },
      ],
      keywords: ["Template packs", "Copy kits", "Analytics"],
      cta: "Design Social Playbook",
      accent: "#EC4899",
    },
  ];

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNavigate = (delta: number) => {
    setDirection(delta);
    setActive((prev) => {
      const next = (prev + delta + solutions.length) % solutions.length;
      return next;
    });
  };

  const handleSelect = (index: number) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const activeSolution = solutions[active];
  const formattedIndex = String(active + 1).padStart(2, "0");

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      rotateY: dir > 0 ? -12 : 12,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      rotateY: dir > 0 ? 12 : -12,
    }),
  };

  return (
    <div
      className="relative overflow-hidden rounded-[32px] border border-white/12 p-6 sm:p-10"
      style={{
        background: `linear-gradient(130deg, ${withAlpha(COLORS.primary, 0.16)}, ${withAlpha(COLORS.background, 0.94)})`,
        boxShadow: "0 28px 60px -40px rgba(5,6,29,0.85)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-36 right-[-12%] h-72 w-72 rounded-full blur-3xl opacity-60"
          style={{ background: withAlpha(activeSolution.accent, 0.32) }}
        />
        <div
          className="absolute -bottom-40 left-[-18%] h-80 w-80 rounded-full blur-3xl opacity-40"
          style={{ background: withAlpha(COLORS.accent, 0.22) }}
        />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.9fr]">
        <div className="relative" style={{ perspective: "1600px" }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeSolution.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                opacity: { duration: 0.32 },
              }}
              className="relative h-full rounded-[28px] border border-white/12 bg-[rgba(8,12,32,0.82)] p-8 sm:p-10 shadow-[0_24px_60px_-40px_rgba(79,70,229,0.7)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15"
                    style={{ backgroundColor: withAlpha(activeSolution.accent, 0.28) }}
                  >
                    <activeSolution.icon className="h-7 w-7 text-white" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                      Solution {formattedIndex}
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                      {activeSolution.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 max-w-[46ch]">
                      {activeSolution.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeSolution.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/80"
                      style={{ backgroundColor: withAlpha(activeSolution.accent, 0.18) }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-base text-white/80 leading-relaxed">
                {activeSolution.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {activeSolution.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/15 px-4 py-4 text-center"
                    style={{ backgroundColor: withAlpha(activeSolution.accent, 0.16) }}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {activeSolution.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70"
                      style={{ backgroundColor: withAlpha(activeSolution.accent, 0.2) }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:translate-x-1"
                  style={{
                    backgroundColor: withAlpha(activeSolution.accent, 0.26),
                    backdropFilter: "blur(18px)",
                  }}
                >
                  {activeSolution.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 top-6 flex items-center justify-between px-6">
            <span className="h-14 w-14 rounded-full bg-gradient-to-br from-[#4F46E5]/25 via-transparent to-transparent blur-2xl" />
            <span className="h-14 w-14 rounded-full bg-gradient-to-br from-[#A855F7]/25 via-transparent to-transparent blur-2xl" />
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              type="button"
              onClick={() => handleNavigate(-1)}
              className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur-xl text-white transition duration-300 hover:-translate-x-1 hover:border-white/25"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="absolute inset-0 rounded-full border border-white/10 opacity-0 transition-opacity group-hover:opacity-60" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="button"
              onClick={() => handleNavigate(1)}
              className="group relative grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur-xl text-white transition duration-300 hover:translate-x-1 hover:border-white/25"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="absolute inset-0 rounded-full border border-white/10 opacity-0 transition-opacity group-hover:opacity-60" />
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {solutions.map((solution, idx) => {
              const isActive = idx === active;
              return (
                <motion.button
                  key={solution.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className="relative overflow-hidden rounded-2xl border px-4 py-5 text-left transition-colors"
                  style={{
                    background: withAlpha(solution.accent, isActive ? 0.2 : 0.12),
                    borderColor: withAlpha(solution.accent, isActive ? 0.45 : 0.18),
                    color: isActive ? COLORS.text : COLORS.muted,
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="solution-active-outline"
                      className="absolute inset-0 rounded-2xl border border-white/35"
                      style={{ boxShadow: "0 18px 45px -30px rgba(168,85,247,0.7)" }}
                      transition={{ type: "spring", stiffness: 240, damping: 26 }}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white"
                      style={{ backgroundColor: withAlpha(solution.accent, 0.28) }}
                    >
                      <solution.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
                        {String(idx + 1).padStart(2, "0")}
                      </p>
                      <p className="text-sm font-semibold text-white">{solution.name}</p>
                    </div>
                  </div>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/70">
                    {solution.summary}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2">
            {solutions.map((solution, idx) => (
              <span
                key={solution.id}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  idx === active ? "bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#4F46E5]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolutionsSection;
