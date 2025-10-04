import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { withAlpha, COLORS } from "../layout/SiteLayout";

export function FAQSection() {
  const faqs = [
    { q: "How fast can we launch?", a: "Launch plan is 2 weeks for a production landing. Scale and Pro plans extend to 4-8 weeks depending on scope." },
    { q: "Do you support Shopify or Stripe?", a: "Yes. We can integrate Shopify storefronts or Stripe for payments, subscriptions, and invoicing." },
    { q: "What's included in tracking?", a: "GA4 + server-side events (CAPI/gtag) where possible, source-of-truth dashboards, and monthly audits." },
    { q: "Can you handle Arabic or RTL?", a: "Yes. We ship multilingual and RTL-ready sites and content pipelines." },
  ] as const;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((f, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="rounded-2xl border border-white/10" style={{ backgroundColor: withAlpha(COLORS.primary, 0.08) }}>
            <button onClick={() => setOpen(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-3 text-left px-5 py-4" aria-expanded={isOpen}>
              <span className="font-medium">{f.q}</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`px-5 overflow-hidden transition-all ${isOpen ? "pb-5 max-h-48" : "pb-0 max-h-0"}`}>
              <p className="text-sm text-[#A5ADCF]">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQSection;
