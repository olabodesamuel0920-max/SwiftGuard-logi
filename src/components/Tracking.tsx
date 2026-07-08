"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Activity } from "lucide-react";
import { businessConfig } from "@/config/business";

function TrackingFormAndConsole() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Retrieve tracking code from URL or use default SGL-804219
  const queryCode = searchParams ? searchParams.get("code") : null;
  const [code, setCode] = useState(queryCode || "SGL-804219");
  const [activeCode, setActiveCode] = useState(queryCode || "SGL-804219");
  const [stepIndex, setStepIndex] = useState(3); // Default to "IN TRANSIT"
  const [typedCode, setTypedCode] = useState(code);

  useEffect(() => {
    if (queryCode) {
      setTimeout(() => {
        setCode(queryCode);
        setActiveCode(queryCode);
        setTypedCode(queryCode);
      }, 0);
    }
  }, [queryCode]);

  // Retrieve tracking stages
  const trackingData = businessConfig.demoTracking[activeCode] || businessConfig.demoTracking["SGL-804219"];
  const currentStep = trackingData[stepIndex] || trackingData[trackingData.length - 1];

  // Auto-advance simulated tracking stages every 9 seconds for display
  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % trackingData.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [trackingData.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = typedCode.trim().toUpperCase() || "SGL-804219";
    setActiveCode(cleanCode);
    setStepIndex(0); // Restart simulation for new search

    // Update query params without reloading the page
    const params = new URLSearchParams();
    params.set("code", cleanCode);
    router.push(`/track?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Controls Column */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass rounded-2xl p-6 border border-[#91aae1]/10 bg-[#0c0e22]/50">
          <h3 className="font-space text-sm font-bold text-white mb-4 uppercase tracking-wider">
            Terminal Query
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Enter your dispatch reference code below to load checkpoint logs and route progress coordinates.
          </p>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="track-code-input" className="text-[9px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Tracking Reference
              </label>
              <div className="relative">
                <input
                  id="track-code-input"
                  type="text"
                  value={typedCode}
                  onChange={(e) => setTypedCode(e.target.value)}
                  placeholder="e.g. SGL-804219"
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 pr-10 rounded-xl outline-none focus:border-indigo-500 text-sm font-mono"
                />
                <button
                  type="submit"
                  aria-label="Search code"
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-xs"
            >
              Refresh Dispatch Feed
            </button>
          </form>
        </div>

        {/* Honestly Labelled disclaimer box */}
        <div className="p-4 rounded-xl border border-[#91aae1]/16 bg-[#0c0e22]/50 text-[#c8d0e2] text-xs flex gap-3 leading-normal">
          <Activity className="w-5 h-5 flex-shrink-0 animate-pulse text-indigo-400" />
          <div>
            <strong className="block mb-0.5 uppercase tracking-wider text-[9px] text-white">Simulation Notice</strong>
            <p className="text-[11px] text-[#c8d0e2]/80">
              {"Interactive delivery-status demonstration — not live GPS. The route coordinate marker represents mock checkpoint events, not a rider's actual physical coordinates."}
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Console Column */}
      <div className="lg:col-span-8 glass rounded-3xl p-6 border border-[#91aae1]/16 bg-[#0c0e22]/80 space-y-6">
        <div className="flex justify-between items-center border-b border-[#91aae1]/12 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-space text-xs font-bold text-white tracking-wider">
              DEMO DISPATCH SIGNAL ACTIVE
            </span>
          </div>
          <span className="font-mono text-xs text-[#aab7d3] bg-white/5 px-3 py-1 rounded-lg border border-[#91aae1]/8">
            {activeCode}
          </span>
        </div>

        {/* 2D Map Blueprint container */}
        <div className="h-[280px] md:h-[340px] relative rounded-2xl overflow-hidden border border-[#91aae1]/12 bg-[#070b18]">
          {/* Map Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(145, 170, 225, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(145, 170, 225, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px"
            }}
          />

          {/* Glowing Vector Map Paths */}
          <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 800 420" preserveAspectRatio="none">
            <path
              d="M50 336 C160 220, 265 344, 375 236 S540 75, 748 92"
              fill="none"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M50 336 C160 220, 265 344, 375 236 S540 75, 748 92"
              fill="none"
              stroke="url(#consoleRouteGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 12"
              className="animate-route-flow"
            />
            <defs>
              <linearGradient id="consoleRouteGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2b8cff" />
                <stop offset="50%" stopColor="#8d4cff" />
                <stop offset="100%" stopColor="#ff2ca8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated Rider Node Pin */}
          <div
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-2xl transition-all duration-1000 animate-pulse"
            style={{
              left: `${currentStep.percent}%`,
              // approximate math mapping the bezier height path
              top: `${60 - (currentStep.percent * 0.45)}%`,
              transform: "translate(-50%, -50%) rotate(-15deg)"
            }}
          >
            ➤
          </div>

          {/* Node locations labels */}
          <div className="absolute left-[8%] bottom-[8%] text-[9px] bg-black/70 border border-[#91aae1]/10 text-[#c8d0e2] px-2 py-1 rounded">
            Pickup Substation
          </div>
          <div className="absolute right-[8%] top-[8%] text-[9px] bg-black/70 border border-[#91aae1]/10 text-[#c8d0e2] px-2 py-1 rounded">
            Target Destination
          </div>
        </div>

        {/* Details KPI Bar */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/3">
            <span className="block text-[8px] text-[#8293b5] tracking-wider uppercase font-semibold">
              DISPATCH STATUS
            </span>
            <strong className="block text-white text-xs md:text-sm font-space mt-1 uppercase font-bold">
              {currentStep.status}
            </strong>
          </div>
          <div className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/3">
            <span className="block text-[8px] text-[#8293b5] tracking-wider uppercase font-semibold">
              ROUTE ETA
            </span>
            <strong className="block text-white text-xs md:text-sm font-space mt-1 font-bold">
              {currentStep.eta}
            </strong>
          </div>
          <div className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/3">
            <span className="block text-[8px] text-[#8293b5] tracking-wider uppercase font-semibold">
              RIDER UNIT
            </span>
            <strong className="block text-white text-xs md:text-sm font-space mt-1 font-bold">
              {currentStep.rider}
            </strong>
          </div>
        </div>

        {/* Step Timeline */}
        <div className="pt-4 border-t border-[#91aae1]/12 space-y-4">
          <span className="text-[10px] font-semibold text-[#9da9c4] uppercase tracking-wider block mb-4">
            Checkpoint Log Timeline
          </span>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
            {trackingData.map((step, idx) => {
              const isDone = idx <= stepIndex;
              const isCurrent = idx === stepIndex;

              return (
                <div key={idx} className="relative flex justify-between items-start gap-4">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -left-[22px] w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      isCurrent
                        ? "bg-pink-500 border-white scale-125 shadow-[0_0_8px_rgba(236,72,153,0.6)]"
                        : isDone
                        ? "bg-blue-500 border-blue-400"
                        : "bg-[#0b0f22] border-slate-700"
                    }`}
                  />
                  <div>
                    <span className={`block text-xs font-semibold ${isDone ? "text-white" : "text-slate-500"}`}>
                      {step.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {step.description}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">
                    {step.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Tracking() {
  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#050610]" id="tracking">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            TRACKING COMMAND
          </span>
          <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
            Command Center Tracking
          </h2>
        </div>

        <Suspense fallback={<div className="text-white text-center py-10">Initializing tracking console...</div>}>
          <TrackingFormAndConsole />
        </Suspense>
      </div>
    </section>
  );
}
