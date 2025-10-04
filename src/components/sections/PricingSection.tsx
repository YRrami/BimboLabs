import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { COLORS, withAlpha } from "../layout/SiteLayout";

export function PricingSection() {
  const plans = [
    { name: "Launch", price: "$1,990", badge: "Best for new brands", features: ["1 landing (SEO-ready)", "Basic tracking (GA4/CAPI)", "1 creative set for ads", "1 sprint setup (2 weeks)"], cta: "Start Launch" },
    { name: "Scale", price: "$4,900", badge: "Most popular", features: ["Multi-page site + blog", "SEO & content plan", "Paid media foundation", "Weekly growth ops"], cta: "Start Scale" },
    { name: "Pro", price: "Custom", badge: "For teams", features: ["eCommerce or SaaS build", "RAG/AI automation", "Advanced analytics", "Roadmap + SLAs"], cta: "Talk to sales" },
  ] as const;

  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
      {plans.map((p, i) => (
        <div key={i} className="rounded-3xl border border-white/10 p-6 sm:p-7" style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{p.name}</h3>
            <span className="text-[11px] px-2 py-1 rounded-full border border-white/15 bg-white/10 text-[#A5ADCF]">{p.badge}</span>
          </div>
          <div className="mt-4 text-3xl font-extrabold">{p.price}</div>
          <ul className="mt-5 space-y-2.5">
            {p.features.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[#A5ADCF]">
                <Check className="h-4 w-4 mt-0.5 text-[#4F46E5] shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/15 text-sm text-white" style={{ backgroundColor: withAlpha(COLORS.primary, 0.18) }}>
            {p.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PricingSection;
