"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clipboard, UserCheck, PackageOpen, Truck, CheckSquare } from "lucide-react";

export default function Journey() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      index: "01",
      tag: "REQUEST",
      title: "Booking Received",
      desc: "Your delivery details enter the command centre.",
      icon: <Clipboard className="w-5 h-5" />,
    },
    {
      index: "02",
      tag: "ASSIGN",
      title: "Rider Matched",
      desc: "An available rider is assigned to the request.",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      index: "03",
      tag: "SECURE",
      title: "Package Collected",
      desc: "Pickup is confirmed and your item is secured.",
      icon: <PackageOpen className="w-5 h-5" />,
    },
    {
      index: "04",
      tag: "MOVE",
      title: "Delivery In Transit",
      desc: "Status updates keep you informed as it moves.",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      index: "05",
      tag: "COMPLETE",
      title: "Delivered Safely",
      desc: "Handover is confirmed with proof of delivery.",
      icon: <CheckSquare className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    // Auto-advance timeline steps every 2.5 seconds
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#060817]/40 relative overflow-hidden" id="journey">
      {/* Background glow */}
      <div className="absolute right-0 top-10 w-[500px] h-[500px] rounded-full bg-violet-600/5 filter blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            DELIVERY DNA
          </span>
          <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
            Every Step.<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              Visible.
            </span>
          </h2>
        </div>

        {/* Journey Timeline Deck */}
        <div className="relative">
          {/* Timeline Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-[6%] right-[6%] top-10 h-0.5 bg-[#13172e] border-t border-[#91aae1]/8">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <div
                  key={step.index}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 text-left ${
                    isActive
                      ? "bg-[#0c0e22]/90 border-indigo-500/80 shadow-[0_20px_40px_rgba(0,0,0,0.45)] scale-[1.02] z-10"
                      : "bg-[#0c0e22]/40 border-[#91aae1]/10 text-slate-400"
                  }`}
                >
                  {/* Glowing Node Marker */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-space text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20"
                        : isPassed
                        ? "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                        : "bg-[#0c1126] border border-[#91aae1]/16 text-slate-400"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Copy Details */}
                  <div className="mt-8">
                    <small className="block text-[8px] tracking-[0.2em] font-semibold text-[#7f97c3] uppercase mb-1">
                      {step.tag}
                    </small>
                    <h3 className="font-space text-base font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Active highlight indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="journeyHighlight"
                      className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-t-full"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
