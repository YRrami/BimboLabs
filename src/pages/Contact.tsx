// src/pages/ContactPage.tsx
// Upgrades:
// - Uses SiteLayout tokens (COLORS + SectionShell) for Solutions-consistent theme
// - Premium hero background (spotlights + subtle grid/noise)
// - Quick actions row (copy email/phone, book call, response SLA)
// - Better form UX: service chips, budget/timeline, validation, honeypot anti-spam, UTM/referrer capture
// - Success state + inline status (no alert spam)
// - Testimonials carousel (autoplay, reduced-motion safe)

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Github,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { SectionShell, COLORS } from "../components/layout/SiteLayout";

/* ===================== utils ===================== */

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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return reduced;
}

function useIsInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView } as const;
}

function useAutoRotate(enabled: boolean, length: number, delay = 6500) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled || length <= 1) return;
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [enabled, length, delay]);
  return [index, setIndex] as const;
}

/* ===================== hero bg ===================== */

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0" style={{ background: COLORS.background }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.58)_0%,_rgba(5,0,19,1)_48%,_rgba(2,0,7,1)_82%)]" />

      <div
        className="absolute -top-28 left-[8%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.28), transparent 70%)" }}
      />
      <div
        className="absolute top-[4%] right-[6%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(190,242,100,0.14), transparent 72%)" }}
      />

      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at 40% 8%, black 0, black 55%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 40% 8%, black 0, black 55%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ===================== testimonials ===================== */

const TESTIMONIALS = [
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

function TestimonialsCarousel() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useIsInView<HTMLDivElement>(0.35);
  const [auto, setAuto] = useState(true);
  const [active, setActive] = useAutoRotate(inView && auto && !reduced, TESTIMONIALS.length, 6500);
  const t = TESTIMONIALS[active];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % TESTIMONIALS.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, setActive]);

  return (
    <div ref={ref} className="rounded-[34px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">What partners say</div>
        <button
          onClick={() => setAuto((s) => !s)}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/10"
          aria-pressed={auto}
        >
          {auto ? "Autoplay: on" : "Autoplay: off"}
        </button>
      </div>

      <div className="mt-5">
        <Quote className="h-6 w-6 text-white/70" />
        <p className="mt-4 text-white/85 text-base leading-relaxed">“{t.quote}”</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">{t.name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t.role}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
            <Sparkles className="h-3.5 w-3.5" />
            {t.result}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => setActive((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-3 text-white/85 hover:bg-white/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActive((i) => (i + 1) % TESTIMONIALS.length)}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-3 text-white/85 hover:bg-white/10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="ml-auto text-xs text-white/50">←/→</div>
        </div>
      </div>
    </div>
  );
}

/* ===================== form ===================== */

type Interest = "Web" | "SEO" | "AI" | "Growth Systems";

const INTERESTS: Interest[] = ["Web", "SEO", "AI", "Growth Systems"];
const BUDGETS = ["< $2k", "$2k–$5k", "$5k–$10k", "$10k+"] as const;
const TIMELINES = ["ASAP", "2–4 weeks", "1–2 months", "Exploring"] as const;

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-white/70 mb-2">
      {children}
    </label>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60",
        active ? "text-white" : "text-white/75 hover:text-white"
      )}
      style={{
        borderColor: withAlpha(COLORS.primary, active ? 0.5 : 0.22),
        backgroundColor: withAlpha(COLORS.primary, active ? 0.22 : 0.08),
      }}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: [] as Interest[],
    budget: ("" as (typeof BUDGETS)[number] | ""),
    timeline: ("" as (typeof TIMELINES)[number] | ""),
    message: "",
    // honeypot:
    website: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const canSend =
    data.name.trim() &&
    data.email.trim() &&
    data.message.trim() &&
    data.website.trim() === "" &&
    status !== "sending";

  const toggleInterest = (x: Interest) => {
    setData((p) => ({
      ...p,
      interest: p.interest.includes(x) ? p.interest.filter((i) => i !== x) : [...p.interest, x],
    }));
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // no-op
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const url = new URL(window.location.href);
      const utm = Object.fromEntries(
        ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map((k) => [k, url.searchParams.get(k)])
      );

      const payload = {
        ...data,
        interest: data.interest,
        utm,
        referrer: document.referrer || "",
        page: url.pathname,
        ts: new Date().toISOString(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setData({
        name: "",
        email: "",
        company: "",
        phone: "",
        interest: [],
        budget: "",
        timeline: "",
        message: "",
        website: "",
      });

      window.setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setErrorMsg("Couldn’t send. Please try again, or email hello@anonvic.com.");
      window.setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <div className="rounded-[34px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
            <Zap className="h-3.5 w-3.5" /> Send details
          </div>
          <h3 className="mt-4 text-2xl sm:text-3xl font-black text-white tracking-tight">Tell us what you’re shipping</h3>
          <p className="mt-2 text-sm sm:text-base text-white/65 max-w-[62ch]">
            We’ll reply with a short plan, timeline, and the fastest path to impact.
          </p>
        </div>

        <div className="hidden md:flex flex-col gap-2">
          <button
            type="button"
            onClick={() => copy("hello@anonvic.com")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
          >
            <Copy className="h-4 w-4" /> Copy email
          </button>
          <button
            type="button"
            onClick={() => copy("+201148000500")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
          >
            <Copy className="h-4 w-4" /> Copy phone
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <input
            id="company"
            name="company"
            value={data.company}
            onChange={(e) => setData((p) => ({ ...p, company: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
            placeholder="Optional"
          />
        </div>
        <div>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
            placeholder="Optional"
          />
        </div>
      </div>

      {/* honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        name="website"
        value={data.website}
        onChange={(e) => setData((p) => ({ ...p, website: e.target.value }))}
      />

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white/75">What do you need?</div>
          <div className="text-xs text-white/45">{data.interest.length ? `${data.interest.length} selected` : "Pick 1–2"}</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((x) => (
            <Chip key={x} active={data.interest.includes(x)} onClick={() => toggleInterest(x)}>
              {x}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="budget">Budget range</FieldLabel>
          <select
            id="budget"
            name="budget"
            value={data.budget}
            onChange={(e) => setData((p) => ({ ...p, budget: e.target.value as typeof BUDGETS[number] }))}
            className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
          >
            <option value="" className="bg-black">Select</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-black">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="timeline">Timeline</FieldLabel>
          <select
            id="timeline"
            name="timeline"
            value={data.timeline}
            onChange={(e) => setData((p) => ({ ...p, timeline: e.target.value as typeof TIMELINES[number] }))}
            className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
          >
            <option value="" className="bg-black">Select</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-black">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={data.message}
          onChange={(e) => setData((p) => ({ ...p, message: e.target.value }))}
          className="w-full resize-none rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white/35 focus:ring-2 focus:ring-[#4F46E5]/30"
          placeholder="Goal, links, context, and what success looks like…"
          required
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/45">
          <span>Tip: add links (site, ads, analytics) for faster scoping.</span>
          <span>{data.message.length}/1200</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href="https://calendly.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
        >
          <CalendarCheck className="h-4 w-4" /> Book a call
        </a>

        <button
          type="submit"
          form="contact-form"
          disabled={!canSend}
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60",
            !canSend ? "opacity-50 cursor-not-allowed" : "hover:translate-x-1"
          )}
          style={{
            background: `linear-gradient(90deg, ${withAlpha(COLORS.primary, 0.95)}, ${withAlpha(COLORS.accent, 0.85)})`,
            boxShadow: "0 22px 45px -26px rgba(0,0,0,0.65)",
          }}
        >
          {status === "sending" ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : status === "success" ? (
            <>
              <Check className="h-5 w-5" /> Sent
            </>
          ) : (
            <>
              <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              Send message
            </>
          )}
        </button>
      </div>

      <div className="mt-4 min-h-[20px]">
        {status === "error" && <p className="text-sm text-red-200">{errorMsg}</p>}
        {status === "success" && (
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">Received.</span> We’ll reply within one business day.
          </p>
        )}
      </div>

      <form id="contact-form" onSubmit={onSubmit} className="hidden" />
    </div>
  );
}

/* ===================== page ===================== */

export default function ContactPage() {
  const socials = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14">
        <HeroBackground />
        <div className="relative mx-auto w-full max-w-screen-2xl">
          <SectionShell>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                <ShieldCheck className="h-3.5 w-3.5" /> Contact
              </div>
              <h1 className="mt-5 text-balance text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
                Let’s ship your next win.
              </h1>
              <p className="mt-3 text-white/70 max-w-[72ch] mx-auto">
                Share your goal (leads / bookings / sales). We’ll reply with a short plan, timeline, and scope options.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(190,242,100,0.28)] transition hover:translate-y-[1px] hover:bg-[#d4ff80]"
                >
                  Book a call <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/our-work"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  See demos <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { k: "Response", v: "≤ 1 business day", icon: <Sparkles className="h-4 w-4" /> },
                  { k: "Security", v: "NDA-friendly", icon: <ShieldCheck className="h-4 w-4" /> },
                  { k: "Delivery", v: "Weekly ship cadence", icon: <Zap className="h-4 w-4" /> },
                ].map((x) => (
                  <div key={x.k} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10">
                        {x.icon}
                      </span>
                      {x.k}
                    </div>
                    <div className="mt-3 text-sm font-semibold text-white/90">{x.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-9 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </SectionShell>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative px-4 sm:px-6 md:px-8 pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-screen-2xl space-y-8">
          <SectionShell>
            <div className="grid gap-6 lg:grid-cols-3">
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-3xl border border-white/12 bg-white/[0.04] p-6 transition hover:border-white/25"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
                  >
                    <CalendarCheck className="h-5 w-5 text-white" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold">Book a call</h3>
                    <p className="mt-1 text-sm text-white/70">Pick a time. We’ll come prepared.</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/90">
                      Open scheduling <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="mailto:hello@anonvic.com"
                className="group rounded-3xl border border-white/12 bg-white/[0.04] p-6 transition hover:border-white/25"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
                  >
                    <Mail className="h-5 w-5 text-white" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="mt-1 text-sm text-white/70">hello@anonvic.com</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/90">
                      Write to us <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="tel:+201148000500"
                className="group rounded-3xl border border-white/12 bg-white/[0.04] p-6 transition hover:border-white/25"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                    style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
                  >
                    <Phone className="h-5 w-5 text-white" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="mt-1 text-sm text-white/70">+20 114 800 0500</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-white/90">
                      Call now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </SectionShell>

          <SectionShell>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* left */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-[34px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">What to include</div>
                  <ul className="mt-4 space-y-3 text-sm text-white/75">
                    {[
                      "Your primary goal (leads / bookings / sales)",
                      "Current site + 1–2 competitors",
                      "Timeline and constraints",
                      "Anything you’ve tried already",
                    ].map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-2 w-2 rounded-full"
                          style={{ backgroundColor: withAlpha(COLORS.primary, 0.95) }}
                        />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                      EET / GMT+2
                    </span>
                    <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                      Remote-first
                    </span>
                    <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                      NDA-friendly
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-3 text-white/75 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
                      aria-label={s.label}
                    >
                      <s.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>

                <TestimonialsCarousel />
              </div>

              {/* right */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </SectionShell>

          <SectionShell>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Security & privacy",
                  icon: <ShieldCheck className="h-5 w-5 text-white" />,
                  text: "Least-privilege access, dedicated project workspaces, and credentials shared through secured vaults only.",
                },
                {
                  title: "How we kick off",
                  icon: <Sparkles className="h-5 w-5 text-white" />,
                  text: "A short discovery call, then a scoped plan with timeline, resourcing, and pricing options.",
                },
                {
                  title: "Delivery cadence",
                  icon: <Zap className="h-5 w-5 text-white" />,
                  text: "Weekly demos + written recaps so stakeholders always know what shipped and what’s next.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15"
                      style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}
                    >
                      {c.icon}
                    </span>
                    <div className="text-white font-semibold">{c.title}</div>
                  </div>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.text}</p>
                </div>
              ))}
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
            "@type": "Organization",
            name: "Anonvic",
            url: "https://anonvic.com",
            contactPoint: [
              { "@type": "ContactPoint", email: "hello@anonvic.com", contactType: "sales", availableLanguage: ["en"] },
              { "@type": "ContactPoint", email: "support@anonvic.com", contactType: "customer support", availableLanguage: ["en"] },
              { "@type": "ContactPoint", email: "billing@anonvic.com", contactType: "billing", availableLanguage: ["en"] },
            ],
            sameAs: [
              "https://www.linkedin.com/",
              "https://www.instagram.com/",
              "https://github.com/",
              "https://www.facebook.com/",
            ],
            telephone: "+201148000500",
          }),
        }}
      />
    </div>
  );
}
