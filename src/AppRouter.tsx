// src/AppRouter.tsx
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";

// ---- Lazy load pages (smaller first paint)
const HomePage = lazy(() => import("./App"));
const SolutionsPage = lazy(() => import("./pages/Solutions"));
const AboutPage = lazy(() => import("./pages/About"));
const WorkPage = lazy(() => import("./pages/OurWork"));
const ContactPage = lazy(() => import("./pages/Contact"));

// ---- Minimal glassy fallback
function Fallback() {
  return (
    <div
      className="fixed inset-0 grid place-items-center text-white/80"
      style={{
        backdropFilter: "blur(10px)",
        background:
          "linear-gradient(135deg, rgba(79,70,229,0.10), rgba(168,85,247,0.08), rgba(5,6,29,0.90))",
      }}
    >
      <div className="rounded-xl border border-white/12 px-4 py-2 text-sm">
        Loading…
      </div>
    </div>
  );
}

// ---- Scroll to top on route change (HashRouter & BrowserRouter safe)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let in-page anchors keep position
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);
  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="our-work" element={<WorkPage />} />
            <Route path="contact" element={<ContactPage />} />

            {/* Friendly legacy redirects (optional) */}
            <Route path="services" element={<Navigate to="/solutions" replace />} />
            <Route path="work" element={<Navigate to="/our-work" replace />} />
          </Route>

          {/* Catch-all → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
