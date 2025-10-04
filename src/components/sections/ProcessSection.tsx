import { Target, Rocket, Code, CalendarCheck } from "lucide-react";

export function ProcessSection() {
  const steps = [
    { icon: Target, title: "Discovery", text: "Clarify goals, constraints, and success metrics. Align on timelines and team." },
    { icon: Rocket, title: "Roadmap", text: "Prioritize quick wins and define a 4-8 week plan with measurable milestones." },
    { icon: Code, title: "Build", text: "Ship features weekly with QA, tracking, and performance budgets." },
    { icon: CalendarCheck, title: "Scale", text: "Optimize funnels, expand channels, and automate ops. Add SLAs if needed." },
  ] as const;

  return (
    <ol className="relative border-s border-white/10 ml-2">
      {steps.map((s, i) => (
        <li key={i} className="mb-10 ms-6">
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5] via-[#A855F7] to-[#1B1F3B] ring-2 ring-black/50">
            <s.icon className="h-3.5 w-3.5 text-white" />
          </span>
          <h4 className="text-white font-semibold">{s.title}</h4>
          <p className="text-[#A5ADCF] text-sm">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default ProcessSection;
