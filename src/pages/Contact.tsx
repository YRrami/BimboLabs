// src/pages/ContactPage.tsx
import {
  ArrowRight,
  CalendarCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  Shield,
  Github,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  Check,
  Quote,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode, FormEvent, ChangeEvent } from "react";

/* ====================== Local UI tokens & primitives ====================== */
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
function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const gradientSoft = (
  angle = 135,
  primaryStop = 0.14,
  accentStop = 0.1,
  backgroundStop = 0.88
) =>
  `linear-gradient(${angle}deg, ${withAlpha(
    COLORS.primary,
    primaryStop
  )}, ${withAlpha(COLORS.accent, accentStop)}, ${withAlpha(
    COLORS.background,
    backgroundStop
  )})`;

function SectionShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 backdrop-blur-xl px-6 sm:px-10 md:px-14 py-12 sm:py-16 ${
        className ?? ""
      }`}
      style={{
        background: gradientSoft(),
        boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
      }}
    >
      {children}
    </div>
  );
}

/* ====================== Local Testimonials (used by ContactSection) ====================== */
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
          <p className="mt-4 text-white/85 text-base leading-relaxed">
            "{t.quote}"
          </p>
          <div className="mt-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                {t.role}
              </p>
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

/* ====================== Local ContactSection (form + cards + socials) ====================== */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitted(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form submission error:", err);
      alert(
        "Something went wrong while sending your message. Please try again or email hello@anonvic.com."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const socials = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left: intro + direct contacts + socials + testimonials */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Let's Build Growth
          </h3>
          <p className="text-[#A5ADCF] text-lg leading-relaxed mb-6">
            Anonvic blends{" "}
            <span className="text-[#4F46E5] font-medium">
              digital marketing
            </span>{" "}
            with{" "}
            <span className="text-[#4F46E5] font-medium">
              software craftsmanship
            </span>
            . Tell us what you're trying to ship, and we'll propose the fastest
            path to impact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div
            className="p-6 rounded-2xl border border-white/10"
            style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-6 w-6 text-[#4F46E5]" />
              <h4 className="font-semibold text-white">Email</h4>
            </div>
            <a
              href="mailto:hello@anonvic.com"
              className="text-[#A5ADCF] hover:text-white"
            >
              hello@anonvic.com
            </a>
          </div>

          <div
            className="p-6 rounded-2xl border border-white/10"
            style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-6 w-6 text-[#4F46E5]" />
              <h4 className="font-semibold text-white">Phone</h4>
            </div>
            <a
              href="tel:+201148000500"
              className="text-[#A5ADCF] hover:text-white"
            >
              +20 114 800 0500
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="p-3 rounded-xl border border-white/20 text-[#A5ADCF] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
              aria-label={s.label}
            >
              <s.icon className="h-6 w-6" />
            </a>
          ))}
        </div>

        <TestimonialsSection />
      </div>

      {/* Right: form */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#A5ADCF] mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-white/20 text-white placeholder-[#A5ADCF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#A5ADCF] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-white/20 text-white placeholder-[#A5ADCF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#A5ADCF] mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-white/20 text-white placeholder-[#A5ADCF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 transition-all resize-none"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
              placeholder="Tell us about your brand, product, or goal..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
            style={{
              backgroundColor: withAlpha(COLORS.primary, 0.24),
              boxShadow: "0 22px 45px -22px rgba(0,0,0,0.55)",
            }}
          >
            <span
              className="absolute -inset-[2px] rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.3) }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  <Check className="h-5 w-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  Send Message
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

/* ====================== PAGE ====================== */
export default function ContactPage() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-14"
    >
      <div className="mx-auto max-w-[95rem] space-y-20">
        {/* HERO */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-5">
            Contact Anonvic
          </h1>
          <p className="max-w-[72ch] mx-auto text-[#A5ADCF] text-[15px] sm:text-[16px]">
            Tell us what you’re trying to ship. We’ll reply with a short plan,
            timeline, and the fastest path to impact.
          </p>
        </div>

        {/* QUICK ACTIONS / DIRECT CONTACTS */}
        <SectionShell>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Book a call */}
            <a
              href="https://calendly.com/" // ← replace with your real scheduling link
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-2xl border border-white/12 p-6 flex items-start gap-4 transition hover:border-white/25"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
              >
                <CalendarCheck className="h-5 w-5 text-white" />
              </span>
              <div className="min-w-0">
                <h3 className="text-white font-semibold">Book a call</h3>
                <p className="text-sm text-white/70">
                  Pick a time that works for you. We’ll come prepared.
                </p>
                <span className="inline-flex items-center gap-1 text-sm mt-2 text-white/90">
                  Open scheduling <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@anonvic.com"
              className="group rounded-2xl border border-white/12 p-6 flex items-start gap-4 transition hover:border-white/25"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
              >
                <Mail className="h-5 w-5 text-white" />
              </span>
              <div className="min-w-0">
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-sm text-white/70">hello@anonvic.com</p>
                <span className="inline-flex items-center gap-1 text-sm mt-2 text:white/90">
                  Write to us <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+201148000500"
              className="group rounded-2xl border border-white/12 p-6 flex items-start gap-4 transition hover:border-white/25"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
                style={{ backgroundColor: withAlpha(COLORS.primary, 0.22) }}
              >
                <Phone className="h-5 w-5 text-white" />
              </span>
              <div className="min-w-0">
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-sm text-white/70">+20 114 800 0500</p>
                <span className="inline-flex items-center gap-1 text-sm mt-2 text-white/90">
                  Call now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </SectionShell>

        {/* FULL CONTACT EXPERIENCE (form + socials + testimonials) */}
        <SectionShell>
          <ContactSection />
        </SectionShell>

        {/* OPERATIONS / SLA / NEXT STEPS */}
        <SectionShell>
          <div className="grid gap-8 lg:grid-cols-3">
            <div
              className="rounded-2xl border border-white/12 p-6"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
            >
              <p className="text-sm text-white/70">
                <span className="font-semibold text-white">
                  Response time:
                </span>{" "}
                We usually reply within one business day. For urgent launches,
                add <span className="text-white">“rush”</span> to your subject.
              </p>
            </div>
            <div
              className="rounded-2xl border border-white/12 p-6"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
            >
              <p className="text-sm text-white/70">
                <span className="font-semibold text:white">NDA-friendly:</span>{" "}
                Happy to sign mutual NDAs before deeper scoping.
              </p>
            </div>
            <div
              className="rounded-2xl border border-white/12 p-6"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}
            >
              <p className="text-sm text-white/70">
                <span className="font-semibold text-white">Next step:</span> We’ll
                share a short plan with timeline, resourcing, and pricing.
              </p>
            </div>
          </div>
        </SectionShell>

        {/* OFFICE HOURS / LOCATION / POLICIES */}
        <SectionShell>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Hours */}
            <div className="rounded-2xl border border-white/12 p-6 bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-white" />
                <h3 className="text-white font-semibold">Office hours</h3>
              </div>
              <ul className="text-sm text-white/70 space-y-1">
                <li>Mon–Fri: 9:00–18:00 (EET)</li>
                <li>Sat–Sun: Limited on-call</li>
              </ul>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-white/12 p-6 bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-white" />
                <h3 className="text-white font-semibold">Location</h3>
              </div>
              <p className="text-sm text-white/70">
                Remote-first team with availability across EMEA &amp; North
                America.
              </p>
            </div>

            {/* Policies */}
            <div className="rounded-2xl border border-white/12 p-6 bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-white" />
                <h3 className="text-white font-semibold">Security & privacy</h3>
              </div>
              <p className="text-sm text-white/70">
                We use least-privilege access, dedicated project workspaces, and
                share credentials through secured vaults only.
              </p>
            </div>
          </div>
        </SectionShell>

        {/* EXTRA CONTACTS */}
        <SectionShell>
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="mailto:support@anonvic.com"
              className="group rounded-2xl border border-white/12 p-6 flex items-start gap-3 transition hover:border-white/25"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
            >
              <Mail className="h-5 w-5 text-white mt-0.5" />
              <div>
                <h3 className="text-white font-semibold">Support</h3>
                <p className="text-sm text-white/70">support@anonvic.com</p>
              </div>
            </a>

            <a
              href="mailto:billing@anonvic.com"
              className="group rounded-2xl border border-white/12 p-6 flex items-start gap-3 transition hover:border-white/25"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
            >
              <FileText className="h-5 w-5 text-white mt-0.5" />
              <div>
                <h3 className="text-white font-semibold">Billing</h3>
                <p className="text-sm text-white/70">billing@anonvic.com</p>
              </div>
            </a>

            <a
              href="mailto:careers@anonvic.com"
              className="group rounded-2xl border border-white/12 p-6 flex items-start gap-3 transition hover:border-white/25"
              style={{ backgroundColor: withAlpha(COLORS.primary, 0.1) }}
            >
              <ArrowRight className="h-5 w-5 text-white mt-0.5" />
              <div>
                <h3 className="text-white font-semibold">Careers</h3>
                <p className="text-sm text-white/70">careers@anonvic.com</p>
              </div>
            </a>
          </div>
        </SectionShell>
      </div>

      {/* JSON-LD: Organization + ContactPoint */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Anonvic",
            url: "https://anonvic.com",
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "hello@anonvic.com",
                contactType: "sales",
                availableLanguage: ["en"],
              },
              {
                "@type": "ContactPoint",
                email: "support@anonvic.com",
                contactType: "customer support",
                availableLanguage: ["en"],
              },
              {
                "@type": "ContactPoint",
                email: "billing@anonvic.com",
                contactType: "billing",
                availableLanguage: ["en"],
              },
            ],
            sameAs: [
              "https://twitter.com/",
              "https://www.linkedin.com/",
              "https://www.instagram.com/",
              "https://github.com/",
              "https://www.facebook.com/",
            ],
            telephone: "+201148000500",
          }),
        }}
      />
    </section>
  );
}
