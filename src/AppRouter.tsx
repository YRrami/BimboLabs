import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import HomePage from "./App";
import SolutionsPage from "./pages/Solutions";
import AboutPage from "./pages/About";
import WorkPage from "./pages/OurWork";
import ContactPage from "./pages/Contact";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="our-work" element={<WorkPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

