/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
} from "react";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Github,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Zap,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, Outlet } from "react-router-dom";

import anonvicLogo from "../../logoss.png";

/* ================================
   SITE CONFIG
================================ */
export const SITE = {
  name: "ANONVIC",
  logo: {
    src: anonvicLogo,
    width: 640,
    height: 96,
    className: "h-7 w-auto sm:h-9 select-none",
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
  background: "#000000",
  primary: "#6366F1",
  accent: "#EC4899",
  text: "#F9FAFB",
  muted: "#9CA3AF",
} as const;

/* ================================
   Context
================================ */
export type SiteContextValue = {
  scrollY: number;
  scrollProgress: number;
  isMobile: boolean;
  copied: boolean;
  flashCopy: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteLayout");
  return ctx;
}

function useIsMobile(breakpoint = 768) {
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

/* ================================
   Global Background (beams / orbs)
================================ */
function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base dark radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3b27b5_0%,_#050013_45%,_#020007_80%)]" />

      {/* central hero glow */}
      <div className="absolute inset-x-[-25%] top-[8%] h-[520px] bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.95)_0%,_rgba(129,140,248,0.4)_40%,_rgba(15,23,42,0)_75%)] blur-sm" />

      {/* animated beams */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.4, rotate: -8 }}
        animate={{ opacity: [0.3, 0.6, 0.3], rotate: [-6, -10, -6] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute left-[-10%] right-[-30%] top-[26%] h-64"
        style={{
          background:
            "linear-gradient(120deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.26) 35%, rgba(190,242,100,0.16) 60%, rgba(190,242,100,0) 100%)",
          filter: "blur(0px)",
          opacity: 0.03,
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0.25, rotate: 12 }}
        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [10, 16, 10] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute left-[-20%] right-[-5%] top-[52%] h-56"
        style={{
          background:
            "linear-gradient(120deg, rgba(129,140,248,0) 0%, rgba(129,140,248,0.3) 40%, rgba(56,189,248,0.28) 70%, rgba(56,189,248,0) 100%)",
          filter: "blur(0px)",
          opacity: 0.03,
        }}
      />

      {/* floating orbs */}
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.18, 1],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-40 left-1/5 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(129,140,248,0.55) 0%, rgba(56,189,248,0.2) 35%, transparent 70%)",
          filter: "blur(0px)",
          opacity: 0.02,
        }}
      />
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -70, 20],
          y: [0, 50, 0],
        }}
        transition={{ duration: 24, repeat: Infinity }}
        className="absolute bottom-[-80px] right-[10%] h-[380px] w-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(52,211,153,0.4) 0%, rgba(96,165,250,0.25) 35%, transparent 70%)",
          filter: "blur(0px)",
          opacity: 0.02,
        }}
      />

      {/* soft grid + noise + vignette */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.25]"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "36px 18px", "0px 0px"] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 0, black 55%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0, black 55%, transparent 80%)",
        }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.10]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_transparent_55%,_rgba(0,0,0,0.78)_90%)]" />
    </div>
  );
}

/* ================================
   Brand Logo
================================ */
function BrandLogo() {
  const [imgOk, setImgOk] = useState(true);
  const { logo } = { logo: SITE.logo };

  return (
    <Link to="/" className="group flex items-center gap-3 min-w-0">
      <div className="relative flex items-center justify-center">
        {/* subtle glow behind logo */}
        <motion.div
          aria-hidden
          className="absolute inset-[-4px] rounded-2xl bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 opacity-0 blur-xl group-hover:opacity-100 transition-opacity"
        />
        {logo?.src && imgOk ? (
          <motion.img
            src={logo.src}
            width={logo.width}
            height={logo.height}
            className={`${logo.className} m-0 relative`}
            onError={() => setImgOk(false)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
          />
        ) : (
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/30"
          >
            AV
          </motion.div>
        )}
      </div>
    </Link>
  );
}

/* ================================
   Navbar
================================ */
export function Navbar({ scrolled = false }: { scrolled?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveringShell, setIsHoveringShell] = useState(false);

  return (
    <>
      {/* focus overlay that blurs/dims page when nav is focused */}
      <AnimatePresence>
        {(isHoveringShell || isMenuOpen) && (
          <motion.div
            key="nav-focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none bg-black/55 transition-opacity"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 z-50 w-full"
        onHoverStart={() => setIsHoveringShell(true)}
        onHoverEnd={() => setIsHoveringShell(false)}
      >
        {/* Top Announcement Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-2 px-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center rounded-full bg-white/15 px-2 py-[2px]"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Live
            </motion.span>
            <span>Free strategy call for qualified leads</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>

        {/* Main Navbar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <motion.div
            className="rounded-2xl border transition-all duration-300 bg-black/60"
            style={{
              backgroundColor: scrolled
                ? "rgba(5, 5, 15, 0.90)"
                : "rgba(5, 5, 15, 0.75)",
              borderColor: scrolled
                ? "rgba(255, 255, 255, 0.16)"
                : "rgba(255, 255, 255, 0.10)",
              boxShadow: scrolled
                ? "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(129, 140, 248, 0.35)"
                : "0 10px 40px rgba(0, 0, 0, 0.6)",
            }}
            whileHover={{
              scale: 1.01,
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.9), 0 0 120px rgba(129,140,248,0.6)",
              backgroundColor: "rgba(5, 5, 20, 0.92)",
            }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
              <BrandLogo />

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                <div className="flex items-center gap-1">
                  {SITE.nav.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        [
                          "relative px-4 py-2 text-sm font-semibold transition-all rounded-xl group",
                          "hover:bg-white/7",
                          isActive
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="relative z-10">{item.label}</span>

                          {/* subtle glow on hover */}
                          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-white/6 via-white/3 to-transparent opacity-0 blur-sm transition-opacity group-hover:opacity-100" />

                          {/* active underline using layoutId for smooth slide */}
                          {isActive && (
                            <motion.span
                              className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                              layoutId="navbar-indicator"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                >
                  <Link
                    to="/contact"
                    className="relative flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <motion.span
                      aria-hidden
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "120%" }}
                      transition={{ duration: 0.8 }}
                      className="pointer-events-none absolute inset-y-0 w-2/3 bg-white/20 blur-sm"
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden overflow-hidden border-t border-white/10"
                >
                  <div className="px-4 py-6 space-y-2 bg-black/90">
                    {SITE.nav.map((item, idx) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {({ isActive }) => (
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.07 }}
                            className={[
                              "block px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                              isActive
                                ? "text-white bg-white/10"
                                : "text-gray-300 hover:text-white hover:bg-white/5",
                            ].join(" ")}
                          >
                            {item.label}
                          </motion.div>
                        )}
                      </NavLink>
                    ))}

                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                      {({ isActive }) => (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: SITE.nav.length * 0.07 }}
                          className={[
                            "block px-4 py-3 rounded-xl text-sm font-bold text-center transition-all",
                            "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500",
                            isActive ? "opacity-100" : "",
                          ].join(" ")}
                        >
                          Get Started
                        </motion.div>
                      )}
                    </NavLink>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}

/* ================================
   SectionShell – used by pages
================================ */
export type SectionShellProps = HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
};

export function SectionShell({
  children,
  className = "",
  containerClassName = "",
  ...rest
}: SectionShellProps) {
  return (
    <section className={`relative w-full ${className}`} {...rest}>
      <div
        className={`max-w-7xl mx-auto px-6 py-16 md:py-24 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/* ================================
   Premium Footer
================================ */
function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/our-work" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Careers", href: "/careers" },
    ],
    services: [
      { label: "Web Development", href: "/solutions" },
      { label: "Mobile Apps", href: "/solutions" },
      { label: "Digital Marketing", href: "/solutions" },
      { label: "Brand Strategy", href: "/solutions" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
    ],
  };

  const socialIcons = [
    { icon: Github, href: SITE.socials.github, label: "GitHub" },
    { icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
    { icon: Facebook, href: SITE.socials.facebook, label: "Facebook" },
    { icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: SITE.socials.twitter, label: "Twitter" },
  ];

  return (
    <footer className="relative mt-32 border-t border-white/10 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <BrandLogo />
            <p className="text-gray-400 max-w-md leading-relaxed">
              We build premium digital products and orchestrate bilingual growth
              campaigns for ambitious businesses targeting US and Egyptian markets.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={SITE.socials.email}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-semibold">{SITE.contacts.emailLabel}</span>
              </a>
              <a
                href={SITE.socials.phone}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-semibold">{SITE.contacts.phoneLabel}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialIcons.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Stay ahead of the curve
              </h3>
              <p className="text-gray-400 mb-6">
                Get insights, strategies, and market updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/30"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================
   Loading Overlay (single, enhanced)
================================ */
function LoadingOverlay({ show, booting }: { show: boolean; booting: boolean }) {
  if (!show) return null; // single overlay guard

  return (
    <AnimatePresence>
      {booting && (
        <motion.div
          key="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* background beams / glow (but still one overlay) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3b27b5_0%,_#050013_45%,_#020007_90%)]" />
            <motion.div
              aria-hidden
              initial={{ opacity: 0.4, rotate: -8 }}
              animate={{ opacity: [0.3, 0.6, 0.3], rotate: [-6, -12, -6] }}
              transition={{ duration: 16, repeat: Infinity }}
              className="absolute left-[-10%] right-[-30%] top-[30%] h-64"
              style={{
                background:
                  "linear-gradient(120deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.26) 35%, rgba(190,242,100,0.16) 60%, rgba(190,242,100,0) 100%)",
                filter: "blur(0px)",
              }}
            />
            <motion.div
              aria-hidden
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 40, -20],
                y: [0, -20, 10],
                opacity: [0.25, 0.55, 0.25],
              }}
              transition={{ duration: 18, repeat: Infinity }}
              className="absolute -top-32 left-1/3 h-[360px] w-[360px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(129,140,248,0.6) 0%, rgba(56,189,248,0.25) 35%, transparent 70%)",
                filter: "blur(0px)",
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-[0.25]"
              initial={{ backgroundPosition: "0px 0px" }}
              animate={{ backgroundPosition: ["0px 0px", "36px 18px", "0px 0px"] }}
              transition={{ duration: 12, repeat: Infinity }}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.16) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.16]" />
          </div>

          {/* main loader content */}
          <div className="relative flex flex-col items-center gap-8 px-6">
            {/* AV logo with orbit */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* orbiting glow ring */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-18px] rounded-3xl border border-white/8 bg-gradient-to-tr from-indigo-500/25 via-purple-500/15 to-sky-400/30 blur-sm"
              />
              {/* orbiting dots */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-[-26px] rounded-full"
              >
                <div className="absolute -top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
                <div className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
                <div className="absolute bottom-0 right-0 h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(244,114,182,0.9)]" />
              </motion.div>

              {/* rotating AV block */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-3xl shadow-2xl shadow-indigo-500/50"
              >
                AV
              </motion.div>
            </motion.div>

            {/* text */}
            <div className="text-center space-y-3">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                Preparing your experience
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-gray-300 text-sm md:text-base"
              >
                Loading ANONVIC workspace and syncing integrations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-xs text-gray-400"
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Optimizing for US & Egyptian markets</span>
              </motion.div>
            </div>

            {/* progress bar + dots */}
            <div className="w-64 md:w-80 space-y-3">
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                  }}
                  className="h-full w-1/2 bg-gradient-to-r from-indigo-400 via-sky-300 to-lime-300"
                />
              </div>
              <div className="flex items-center justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white/70"
                    animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.12,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================
   Main Layout (for routes)
================================ */
export function SiteLayout() {
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [copied, setCopied] = useState(false);
  const flashCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
  };

  // Disable boot/loading overlay entirely for performance and to avoid blocking render
  const [booting] = useState(false);
  const [showBootOverlay] = useState(false);

  const contextValue: SiteContextValue = {
    scrollY,
    scrollProgress,
    isMobile,
    copied,
    flashCopy,
  };

  return (
    <SiteContext.Provider value={contextValue}>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <GlobalBackground />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
          style={{ scaleX: scrollProgress }}
        />

        <Navbar scrolled={scrollY > 40} />

        {/* Page content (your Hero + others keep their own animations) */}
        <main id="main">
          <Outlet />
        </main>

        <Footer />

        {/* Single global loading page */}
        <LoadingOverlay show={showBootOverlay} booting={booting} />

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {scrollY > 400 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
              aria-label="Scroll to top"
            >
              <ChevronDown className="w-6 h-6 rotate-180" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SiteContext.Provider>
  );
}
