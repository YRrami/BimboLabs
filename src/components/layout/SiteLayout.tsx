/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  Sparkles,
  Send,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import anonvicLogo from "../../logoss.png";
import botPng from "../../pilot.png";

/* ================================
   SITE CONFIG
================================ */
export const SITE = {
  name: "Anonvic",
  logo: {
    src: anonvicLogo,
    alt: "Anonvic - Digital Marketing & Software",
    width: 640,
    height: 96,
    className: "h-6 w-auto sm:h-9 select-none",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Solutions", path: "/solutions" },
    { label: "Our Work", path: "/our-work" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  socials: {
    github: "https://github.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    email: "mailto:hello@anonvic.com",
    phone: "tel:+201148000500",
  },
  contacts: {
    emailLabel: "hello@anonvic.com",
    phoneLabel: "+20 114 800 0500",
  },
} as const;

export const COLORS = {
  background: "#05061D",
  primary: "#4F46E5",
  accent: "#A855F7",
  text: "#F7F9FF",
  muted: "#A5ADCF",
  surface: "rgba(255, 255, 255, 0.04)",
  surfaceStrong: "rgba(79, 70, 229, 0.16)",
} as const;

/* ================================
   Helpers
================================ */
export function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const gradientPrimary = (angle = 140) =>
  `linear-gradient(${angle}deg, ${withAlpha(
    COLORS.primary,
    0.18
  )}, ${withAlpha(COLORS.accent, 0.14)}, ${withAlpha(
    COLORS.background,
    0.92
  )})`;

/* ================================
   Context
================================ */
export type SiteContextValue = {
  scrollY: number;
  scrollProgress: number;
  isMobile: boolean;
  reducedMotion: boolean;
  copied: boolean;
  flashCopy: () => void;
};
const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteLayout");
  return ctx;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryList | MediaQueryListEvent) =>
      setReduced("matches" in e ? e.matches : mq.matches);
    setReduced(mq.matches);
    if ("addEventListener" in mq) {
      mq.addEventListener("change", handler as any);
      return () => mq.removeEventListener("change", handler as any);
    } else {
      (mq as any).addListener(handler);
      return () => (mq as any).removeListener(handler);
    }
  }, []);
  return reduced;
}

/* ================================
   UI atoms
================================ */
export function SectionShell({
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
        background: `linear-gradient(135deg, ${withAlpha(
          COLORS.primary,
          0.14
        )}, ${withAlpha(COLORS.accent, 0.1)}, ${withAlpha(
          COLORS.background,
          0.88
        )})`,
        boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
      }}
    >
      {children}
    </div>
  );
}

export function Stat({
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
      <div
        className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${color}`}
      >
        {number}
      </div>
      <div className="text-[11px] sm:text-xs text-[#A5ADCF]">{label}</div>
    </div>
  );
}

/* ================================
   Brand + Navbar
================================ */
function BrandLogo() {
  const { logo, name } = SITE;
  return (
    <Link to="/" className="group flex items-center min-w-0" aria-label={name}>
      {!!logo?.src && (
        <img
          src={logo.src}
          alt={logo.alt ?? name}
          width={logo.width}
          height={logo.height}
          className={`${logo.className} m-0`}
          onError={(e) => {
            (e.currentTarget.style as any).display = "none";
            const sibling = e.currentTarget
              .nextElementSibling as HTMLElement | null;
            if (sibling) sibling.style.display = "inline";
          }}
        />
      )}
      <span
        style={{ display: logo?.src ? "none" : "inline" }}
        className="truncate bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-xl sm:text-2xl font-bold tracking-tight text-transparent ml-1"
      >
        {name}
      </span>
    </Link>
  );
}

export function Navbar({ scrolled = false }: { scrolled?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyles = {
    background: scrolled
      ? `linear-gradient(120deg, ${withAlpha(
          COLORS.background,
          0.9
        )}, ${withAlpha(COLORS.background, 0.84)})`
      : `linear-gradient(120deg, ${withAlpha(
          COLORS.background,
          0.78
        )}, ${withAlpha(COLORS.background, 0.68)})`,
    borderColor: withAlpha(COLORS.text, scrolled ? 0.12 : 0.08),
    boxShadow: scrolled
      ? "0 22px 55px -30px rgba(8, 11, 35, 0.88)"
      : "0 18px 48px -32px rgba(8, 11, 35, 0.66)",
  } as const;

  const desktopLink = (item: (typeof SITE.nav)[number]) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `group relative px-3 lg:px-4 py-2 text-sm md:text-[15px] transition-all duration-300 rounded-md ${
          isActive ? "text-white" : "text-[#A5ADCF] hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative z-10 flex items-center gap-2">
            {isActive && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
            )}{" "}
            {item.label}
          </span>
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </>
      )}
    </NavLink>
  );

  const mobileLink = (item: (typeof SITE.nav)[number], idx: number) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `block rounded-lg px-3 py-2 text-base transition-all duration-300 ${
          isActive
            ? "bg-[rgba(79,70,229,0.18)] text-white"
            : "text-[#A5ADCF] hover:translate-x-1 hover:bg[rgba(79,70,229,0.12)] hover:text-white"
        }`
      }
      style={{ transitionDelay: `${idx * 70}ms` }}
      onClick={() => setIsMenuOpen(false)}
    >
      {item.label}
    </NavLink>
  );

  return (
    <nav
      className="fixed top-0 z-50 w-full transition-all duration-500"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-[95rem] px-3 sm:px-6 lg:px-10 pt-3 sm:pt-4">
        <div
          className="rounded-2xl border backdrop-blur-2xl transition-all duration-500"
          style={navStyles}
        >
          <div className="flex h-14 sm:h-16 md:h-[70px] items-center justify-between px-3 sm:px-5">
            <BrandLogo />

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center space-x-1">
                {SITE.nav.map((item) => desktopLink(item))}
              </div>
              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
              >
                <span>Let's Talk</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <button
              className="md:hidden rounded-xl border border-white/15 bg-[rgba(8,12,32,0.72)] p-2.5 transition-all duration-300 hover:scale-[1.08] hover:bg-[rgba(79,70,229,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className="border-t border-white/10 backdrop-blur-2xl"
              style={{
                background: `linear-gradient(130deg, ${withAlpha(
                  COLORS.background,
                  0.94
                )}, ${withAlpha(COLORS.background, 0.88)})`,
              }}
            >
              <div className="space-y-2 px-4 py-4">
                {SITE.nav.map((item, idx) => mobileLink(item, idx))}
                <Link
                  to="/contact"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-white transition-all duration-300 bg-[rgba(79,70,229,0.16)] border border-white/10 hover:bg-[rgba(168,85,247,0.18)]"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ transitionDelay: `${SITE.nav.length * 70}ms` }}
                >
                  Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ================================
   Bot avatar + typing dots
================================ */

type BotAvatarProps = {
  size?: number;
  src?: string;
  alt?: string;
};

export function BotAvatar({ size = 36, src, alt = "Copilot" }: BotAvatarProps) {
  const [imgOk, setImgOk] = useState(true);
  const s = Math.max(28, size);

  return (
    <span
      className="relative inline-grid place-items-center"
      style={{ width: s, height: s }}
      aria-hidden={!alt}
      role={alt ? "img" : undefined}
      aria-label={alt}
    >
      <span className="absolute -inset-2 blur-xl rounded-[20px] bg-gradient-to-br from-[#A855F7]/35 via-[#4F46E5]/30 to-transparent" />
      <span
        className="relative grid place-items-center rounded-full border border-white/12 overflow-hidden"
        style={{
          width: s,
          height: s,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
        }}
      >
        {src && imgOk ? (
          <img
            src={src}
            alt={alt}
            className="block h-[72%] w-[72%] object-contain pointer-events-none select-none"
            draggable={false}
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
          </span>
        )}
      </span>
    </span>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce" />
    </span>
  );
}

/* ================================
   Chat panel – rebuilt, no scroll state
================================ */
type ChatMessage = { role: "user" | "assistant"; text: string };

function ChatPanel({
  chatListRef,
  typing,
  messages,
  value,
  setValue,
  onSend,
  onReset,
}: {
  chatListRef: React.RefObject<HTMLDivElement | null>;
  typing: boolean;
  messages: ChatMessage[];
  value: string;
  setValue: (v: string) => void;
  onSend: (override?: string) => void;
  onReset: () => void;
}) {
  const hasUserMessage = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages]
  );

  const quickPrompts = [
    "Give me a launch plan.",
    "Review my current site.",
    "Estimate timeline & budget.",
  ];

  const handleSend = (override?: string) => {
    const toSend = (override ?? value).trim();
    if (!toSend) return;
    onSend(toSend);
    setValue("");
  };

  const Bubble = ({
    role,
    children,
  }: {
    role: "user" | "assistant";
    children: React.ReactNode;
  }) => (
    <div
      className={`flex ${
        role === "assistant" ? "justify-start" : "justify-end"
      }`}
    >
      {role === "assistant" && (
        <span className="mr-3 mt-0.5">
          <BotAvatar size={30} src={botPng} alt="Anonvic Copilot" />
        </span>
      )}
      <div
        className={[
          "max-w-[86%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed border shadow-[0_16px_38px_-28px_rgba(0,0,0,0.9)]",
          role === "assistant"
            ? "bg-[#14193A] border-white/10 text-white"
            : "bg-[#6D28D9]/35 border-[#6D28D9]/55 text-[#F7F9FF]",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );

  return (
    <section
      className="fixed z-[70] bottom-[calc(4rem+max(1rem,env(safe-area-inset-bottom)))] right-[max(1rem,env(safe-area-inset-right))] w-[min(94vw,520px)] overflow-hidden rounded-[24px] border border-white/10"
      style={{
        background:
          "linear-gradient(155deg, #15163B 0%, #05061D 55%, #18123F 100%)",
        boxShadow: "0 30px 80px -32px rgba(10,15,40,0.9)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Anonvic Copilot Chat"
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-[#15163B]/80">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BotAvatar size={34} src={botPng} alt="Anonvic Copilot" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">
                Anonvic Copilot
              </p>
              <p className="flex items-center gap-1 text-[11px] text-emerald-300/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online · Scoped to this site
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              Reset
            </button>
            <span className="rounded-full bg-[#4F46E5]/30 border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
              Beta
            </span>
          </div>
        </div>

        {!hasUserMessage && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {quickPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSend(p)}
                className="text-[11px] sm:text-xs rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages (pure native scroll, no React state) */}
      <div className="bg-[#05061D]/85">
        <div
          ref={chatListRef}
          className="max-h-[56vh] overflow-y-auto px-5 py-4 space-y-3.5"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.text}
            </Bubble>
          ))}
          {typing && (
            <div className="flex items-center gap-2 text-white/85">
              <span className="mr-3 mt-0.5">
                <BotAvatar size={30} src={botPng} alt="Anonvic Copilot" />
              </span>
              <div className="px-4 py-2.5 rounded-2xl border border-white/12 bg-[#14193A]">
                <TypingDots />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="px-4 py-3 border-t border-white/10 bg-[#11153A]/95">
        <div className="flex items-end gap-2.5">
          <div className="relative flex-1">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              className="peer w-full max-h-[40vh] rounded-2xl bg-[#050822] border border-white/12 px-3.5 py-2.5 text-[15px] text-white placeholder-white/45 outline-none focus:border-[#7C3AED] resize-none"
              placeholder="Ask about plans, timelines, or stacks…"
              aria-label="Type your message"
            />
            <span className="pointer-events-none absolute -inset-0.5 rounded-[20px] bg-gradient-to-r from-[#4F46E5]/20 via-[#A855F7]/16 to-transparent blur-md opacity-0 peer-focus:opacity-100" />
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!value.trim()}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#4F46E5] text-white text-[15px] font-semibold border border-white/15 hover:scale-[1.04] active:scale-100 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================
   Hero floating edge icons
================================ */
type Tone = "fuchsia" | "sky" | "indigo" | "cyan" | "violet" | "rose";
function toneToText(t: Tone) {
  switch (t) {
    case "fuchsia":
    case "indigo":
    case "violet":
      return "text-[#BBBFF9]";
    case "sky":
    case "cyan":
      return "text-white";
    case "rose":
      return "text-[#A5ADCF]";
  }
}

export function HeroEdgeIcons({
  scrollY,
  isMobile,
  reducedMotion,
}: {
  scrollY: number;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const desktop = {
    ig: { left: 10, top: 20 },
    in: { left: 26, top: 60 },
    tw: { left: 12, top: 84 },
    fb: { left: 90, top: 52 },
    gh: { left: 86, top: 86 },
  } as const;

  const mobile = {
    ig: { left: 12, top: 18 },
    in: { left: 28, top: 68 },
    tw: { left: 14, top: 88 },
    fb: { left: 88, top: 54 },
    gh: { left: 84, top: 86 },
  } as const;

  const items: Array<{
    key: keyof typeof desktop;
    Icon: ElementType;
    href: string;
    title: string;
    glow: string;
  }> = [
    {
      key: "ig",
      Icon: Instagram,
      href: SITE.socials.instagram,
      title: "Instagram",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "in",
      Icon: Linkedin,
      href: SITE.socials.linkedin,
      title: "LinkedIn",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "tw",
      Icon: Twitter,
      href: SITE.socials.twitter,
      title: "Twitter",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "fb",
      Icon: Facebook,
      href: SITE.socials.facebook,
      title: "Facebook",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
    {
      key: "gh",
      Icon: Github,
      href: SITE.socials.github,
      title: "GitHub",
      glow: "from-[#4F46E5] via-[#A855F7] to-transparent",
    },
  ];

  const sizeClass = isMobile ? "h-11 w-11" : "h-14 w-14 md:h-16 md:w-16";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-[11]">
      {items.map(({ key, Icon, href, title, glow }, i) => {
        const base = isMobile ? mobile[key] : desktop[key];
        const left = clamp(base.left, isMobile ? 6 : 0, isMobile ? 94 : 100);
        const top = clamp(base.top, isMobile ? 9 : 0, isMobile ? 91 : 100);
        const translateY = reducedMotion ? 0 : scrollY * 0.05;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={title}
            className="absolute pointer-events-auto group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/60 rounded-2xl"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(-50%, -50%) translateY(${translateY}px)`,
              animation: reducedMotion
                ? undefined
                : `edgeFloat ${6 + (i % 3)}s ease-in-out ${(i * 0.2).toFixed(
                    2
                  )}s infinite`,
              willChange: "transform",
            }}
          >
            <span
              className={`absolute -inset-5 rounded-2xl blur-xl opacity-45 group-hover:opacity-80 transition bg-gradient-to-br ${glow}`}
            />
            <span
              className={`relative grid place-items-center ${sizeClass} rounded-2xl bg-[rgba(57,80,180,0.15)] border border-white/15 shadow-[0_22px_38px_-18px_rgba(106,13,173,0.35)] transition group-hover:scale-110 group-hover:-rotate-3`}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

/* ================================
   Layout wrapper
================================ */
export function SiteLayout() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const glowRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      targetRef.current = { x, y };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const tick = () => {
      const ease = 0.12;
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * ease;
      if (glowRef.current) {
        glowRef.current.style.left = `${currentRef.current.x - 25}%`;
        glowRef.current.style.top = `${currentRef.current.y - 25}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  // background particles
  type Particle = {
    left: number;
    top: number;
    size: number;
    layer: 1 | 2;
    hue: Tone;
  };
  const P_SYMBOLS = useMemo(
    () =>
      [
        "<",
        ">",
        "{}",
        "[]",
        "()",
        ";",
        ":",
        "=>",
        "&&",
        "||",
        "!",
        "?",
        "#",
        "$",
        "*",
        "+",
        "=",
      ] as const,
    []
  );
  const HUES = useMemo(
    () => ["fuchsia", "indigo", "sky", "cyan", "violet"] as const,
    []
  );
  const particles = useMemo<Particle[]>(
    () => {
      const base = isMobile ? 36 : 80;
      const count = reducedMotion ? Math.ceil(base * 0.4) : base;
      return Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size:
          (isMobile ? 7 : 9) +
          Math.floor(Math.random() * (isMobile ? 6 : 10)),
        layer: Math.random() > 0.45 ? 2 : 1,
        hue: HUES[Math.floor(Math.random() * HUES.length)] as Tone,
      }));
    },
    [isMobile, reducedMotion, HUES]
  );

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi! I'm the Anonvic Copilot. Ask about plans, timelines, or what stack we'll use.",
    },
  ]);
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatOpen) {
      chatListRef.current?.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, typing, chatOpen]);

  const sendChat = (txt?: string) => {
    const msg = (txt ?? chatInput).trim();
    if (!msg) return;
    setChatInput("");
    setChatMessages((m) => [...m, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      const t = msg.toLowerCase();
      let reply =
        "We can draft a quick roadmap for you. Do you prefer Launch, Scale, or Pro — and when's your target date?";
      if (t.includes("plan"))
        reply =
          "Launch = fast start; Scale = growth ops; Pro = custom build + SLAs.";
      else if (t.includes("ecommerce") || t.includes("store"))
        reply =
          "Yes. Next.js + Stripe/Shopify, optimized PDPs, bundles, subscriptions, and server-side tracking.";
      else if (t.includes("seo"))
        reply =
          "We deliver CWV > 90, schema, internal linking, and an editorial pipeline with briefs.";
      else if (t.includes("ai"))
        reply =
          "RAG, agents, automation. We'll evaluate latency/cost tradeoffs and add guardrails + evals.";
      setChatMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 650);
  };

  const resetChat = () => {
    setChatInput("");
    setTyping(false);
    setChatMessages([
      {
        role: "assistant",
        text: "Hi! I'm the Anonvic Copilot. Ask about plans, timelines, or what stack we'll use.",
      },
    ]);
  };

  const [copied, setCopied] = useState(false);
  const flashCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
  };

  const location = useLocation();
  useEffect(() => {
    chatListRef.current?.scrollTo({
      top: chatListRef.current.scrollHeight,
    });
    setChatOpen(false);
  }, [location.pathname]);

  const contextValue: SiteContextValue = {
    scrollY,
    scrollProgress,
    isMobile,
    reducedMotion,
    copied,
    flashCopy,
  };

  return (
    <SiteContext.Provider value={contextValue}>
      <div
        className="min-h-screen text-white overflow-x-hidden"
        style={{ backgroundColor: COLORS.background }}
        id="app-root"
      >
        {/* Scroll progress */}
        <div
          className="fixed top-0 left-0 right-0 z-[65] h-[3px] bg-transparent"
          aria-hidden
        >
          <div
            className="h-full bg-gradient-to-r from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] transition-[width] duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none select-none"
          aria-hidden
        >
          <div
            ref={glowRef}
            className="absolute h-[520px] sm:h-[680px] w-[520px] sm:w-[680px] rounded-full bg-gradient-to-br from-[#4F46E5]/22 via-[#A855F7]/15 to-[#1B1F3B]/18 blur-3xl"
            style={{
              left: "25%",
              top: "25%",
              transform: `translateY(${scrollY * 0.04}px)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top, rgba(57,80,180,0.25), transparent 60%)",
              backgroundColor: COLORS.background,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.36) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.36) 1px, transparent 1px)",
              backgroundSize: isMobile ? "24px 24px" : "32px 32px",
              opacity: 0.45,
              mixBlendMode: "soft-light",
              transform: `translateY(${scrollY * 0.08}px)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: isMobile ? "12px 12px" : "16px 16px",
              opacity: 0.22,
              mixBlendMode: "soft-light",
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
          <div className="absolute inset-0 overflow-visible">
            {particles.map((p, i) => (
              <div
                key={i}
                className={`absolute font-mono font-bold ${toneToText(
                  p.hue
                )} ${p.layer === 1 ? "opacity-40" : "opacity-30"}`}
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  fontSize: `${p.size}px`,
                  transform: `translateY(${
                    scrollY * (p.layer === 1 ? 0.018 : 0.03)
                  }px)`,
                }}
              >
                {P_SYMBOLS[i % P_SYMBOLS.length]}
              </div>
            ))}
          </div>
        </div>

        <Navbar scrolled={scrollY > 40} />

        <main id="main">
          <Outlet />
        </main>

        <footer className="relative py-16 px-4 sm:px-6 md:px-10 lg:px-14 border-t border-white/10">
          <div className="mx-auto max-w-[95rem]">
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={SITE.logo.src}
                  alt={SITE.logo.alt ?? SITE.name}
                  className="h-6 w-auto select-none"
                  onError={(e) =>
                    ((e.currentTarget.style as any).display = "none")
                  }
                />
                <span className="sr-only">{SITE.name}</span>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#A5ADCF] hover:text-white transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#A5ADCF] hover:text-white transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href={SITE.socials.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#A5ADCF] hover:text-white transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={SITE.socials.email}
                  className="text-[#A5ADCF] hover:text-white transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-[#A5ADCF]">
              © {new Date().getFullYear()} {SITE.name}. Built for growth.
            </div>
          </div>
        </footer>

        {/* Chat toggle (compact FAB) */}
        <button
          onClick={() => setChatOpen((v) => !v)}
          className="fixed z-[75] bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] h-14 w-14 rounded-2xl border border-white/15 shadow-[0_22px_45px_-24px_rgba(79,70,229,0.75)] hover:-translate-y-1 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
          style={{
            background:
              "radial-gradient(120px 120px at 30% 20%, rgba(168,85,247,0.45), rgba(79,70,229,0.55) 40%, rgba(255,255,255,0.06) 60%, rgba(8,12,32,0.6) 70%)",
          }}
          aria-label={chatOpen ? "Close chat" : "Open chat"}
          aria-expanded={chatOpen}
        >
          <span className="grid h-full w-full place-items-center">
            {chatOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Sparkles className="h-5 w-5 text-white" />
            )}
          </span>
        </button>

        {chatOpen && (
          <ChatPanel
            chatListRef={chatListRef}
            typing={typing}
            messages={chatMessages}
            value={chatInput}
            setValue={setChatInput}
            onSend={sendChat}
            onReset={resetChat}
          />
        )}

        <style>{`
          @keyframes edgeFloat {
            0%, 100% { transform: translate3d(-50%, -50%, 0) translateY(0); }
            50% { transform: translate3d(-50%, -50%, 0) translateY(-10px); }
          }
        `}</style>
      </div>
    </SiteContext.Provider>
  );
}
