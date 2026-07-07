import React from "react";
import { ShieldAlert, Route, MapPin, Moon } from "lucide-react";

export default function TrustSection() {
  const pillars = [
    {
      icon: <ShieldAlert className="w-8 h-8 text-indigo-400" />,
      title: "Prohibited Cargo Guidelines",
      description: "Standard safety check guidelines apply to all dispatch requests to ensure compliance. We maintain strict carriage restrictions on valuables and dangerous items.",
    },
    {
      icon: <Route className="w-8 h-8 text-cyan-400" />,
      title: "Dispatch Route Planning",
      description: "Our logistics coordination plans dispatch windows and route paths to optimize parcel transit timelines.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#70ffc6]" />,
      title: "Terminal Checkpoints Demo",
      description: "View simulated progress milestone checkpoints tracking package transit stages in our terminal preview.",
    },
    {
      icon: <Moon className="w-8 h-8 text-pink-400" />,
      title: "Nocturnal Dispatch Options",
      description: "After-hours errands and delivery logistics parameters are evaluated and confirmed on demand during order booking.",
    },
  ];

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#050610]" id="trust">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            DISPATCH PRINCIPLES
          </span>
          <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
            Operational Guidelines
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Our dispatch coordinates route mapping, standard safety checks, and safe cargo handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="glass rounded-2xl p-6 border border-[#91aae1]/10 bg-[#0c0e22]/40 hover:border-[#91aae1]/30 transition-all group"
            >
              <div className="mb-5 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-105 transition-transform duration-300">
                {p.icon}
              </div>
              <h3 className="font-space text-base font-bold text-white mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
