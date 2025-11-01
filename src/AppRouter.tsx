import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { motion, AnimatePresence } from "framer-motion";

// ---- Lazy load pages (smaller first paint)
const HomePage = lazy(() => import("./App"));
const SolutionsPage = lazy(() => import("./pages/Solutions"));
const AboutPage = lazy(() => import("./pages/About"));
const WorkPage = lazy(() => import("./pages/OurWork"));
const ContactPage = lazy(() => import("./pages/Contact"));

// ---- Page transition wrapper (fade + subtle slide)
function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="min-h-dvh"
    >
      {children}
    </motion.main>
  );
}

// HOC to wrap lazy pages with <Page>
function withPage<T extends object>(Comp: ComponentType<T>) {
  return function Wrapped(props: T) {
    return (
      <Page>
        <Comp {...(props as T)} />
      </Page>
    );
  };
}

const Home = withPage(HomePage);
const Solutions = withPage(SolutionsPage);
const About = withPage(AboutPage);
const Work = withPage(WorkPage);
const Contact = withPage(ContactPage);

// ---- Glassy, stylish fallback (accessible)
function Fallback({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="fixed inset-0 isolate overflow-hidden text-white/85">
      {/* Background gradient + blur */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(79,70,229,0.20) 0%, rgba(79,70,229,0.00) 60%)," +
            "radial-gradient(900px 500px at 110% 10%, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.00) 60%)," +
            "linear-gradient(135deg, rgba(5,6,29,0.96), rgba(5,6,29,0.88))",
        }}
      />

      {/* Subtle grid texture */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "40px 20px", "0px 0px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
        }}
      />

      {/* Center card */}
      <div className="grid h-full place-items-center px-6">
        <motion.div
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="status"
          aria-live="polite"
        >
          <div className="mb-4 flex items-center gap-3">
            <Spinner />
            <div>
              <div className="text-sm uppercase tracking-wider text-white/60">Please wait</div>
              <div className="text-base font-medium text-white">{message}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-white/60"
              initial={{ x: "-120%" }}
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-white/50">
            <span>Optimizing resources</span>
            <span className="tabular-nums">{new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-white/80"
      aria-hidden
    >
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="56.5"
        strokeDashoffset="0"
        initial={{ pathLength: 0.2, rotate: 0 }}
        animate={{ pathLength: [0.2, 1, 0.2], rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </motion.svg>
  );
}

// ---- Scroll to top on route change (HashRouter & BrowserRouter safe)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let in-page anchors keep position
    // smooth scroll only when supported
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function AppRouter() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Fallback message="Loading interface…" />}>
        {/* AnimatePresence enables exit animations on route change */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="solutions" element={<Solutions />} />
              <Route path="about" element={<About />} />
              <Route path="our-work" element={<Work />} />
              <Route path="contact" element={<Contact />} />

              {/* Friendly legacy redirects (optional) */}
              <Route path="services" element={<Navigate to="/solutions" replace />} />
              <Route path="work" element={<Navigate to="/our-work" replace />} />
            </Route>

            {/* Catch-all → home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}
