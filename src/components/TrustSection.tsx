import React from "react";
import { ShieldCheck, Clock, Map, Moon } from "lucide-react";
import { businessConfig } from "@/config/business";

export default function TrustSection() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
      title: "Security Shield Verification",
      description: "Our package verification ensures all items match transport compliance prior to rider dispatch. We maintain a strict no-contraband carriage policy.",
    },
    {
      icon: <Clock className="w-8 h-8 text-cyan-400" />,
      title: "Punctual Coordination",
      description: "Operated under the motto 'On time, every time', we coordinate delivery dispatch windows and route paths to optimize parcel transit times.",
    },
    {
      icon: <Map className="w-8 h-8 text-[#70ffc6]" />,
      title: "Logistics Mission Checkpoints",
      description: "Step-by-step dispatch console updates keep you aware of parcel location milestones, avoiding the ambiguity of standard logistics services.",
    },
    {
      icon: <Moon className="w-8 h-8 text-pink-400" />,
      title: "Night Owl Safety Patrol",
      description: `For late-hour logistics support (from ${businessConfig.nightOwlHours}), riders utilize designated safety corridors and check-ins.`,
    },
  ];

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#050610]" id="trust">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            SECURE ASSURANCES
          </span>
          <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
            Built for Secure Mobility
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Our operational framework prioritizes transparency, route planning, and safe cargo handling.
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
