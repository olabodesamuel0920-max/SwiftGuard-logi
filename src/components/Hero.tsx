"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import StaticCityFallback from "./StaticCityFallback";
import BookingModal from "./BookingModal";
import { ArrowRight, Radar, Settings } from "lucide-react";
import { businessConfig } from "@/config/business";

// Dynamically import the 3D scene with server-side rendering disabled
const CityScene3D = dynamic(() => import("./CityScene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] md:h-[590px] rounded-[42px] bg-[#070b18] border border-[#91aae1]/18 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-xs">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <span>INITIALIZING ROUTE VISUALISER...</span>
    </div>
  ),
});

export default function Hero() {
  const { batterySaver, toggleBatterySaver } = useTheme();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative min-h-screen pt-28 pb-12 flex items-center overflow-hidden border-b border-[#91aae1]/10 bg-[#050610]" id="top">
      {/* Background Grids and Highlights */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(145, 170, 225, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(145, 170, 225, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px"
        }}
      />
      {/* Neon glowing overlays */}
      <div className="absolute w-[320px] md:w-[420px] h-[320px] md:h-[420px] rounded-full bg-blue-600/10 filter blur-[100px] left-[-150px] top-[190px] pointer-events-none" />
      <div className="absolute w-[300px] md:w-[380px] h-[300px] md:h-[380px] rounded-full bg-pink-600/10 filter blur-[100px] right-[-120px] top-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto w-full px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Text Copy */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 order-1 lg:order-1">
          <div className="flex items-center gap-2.5 font-space text-[10px] tracking-[0.2em] text-[#a9cfff] uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#70ffc6] shadow-[0_0_8px_rgba(112,255,198,0.65)] animate-pulse" />
            <span>Delivery network online</span>
          </div>

          <h1 className="font-space text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white">
            YOUR CITY.<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              YOUR DELIVERY.
            </span><br />
            RIGHT ON TIME.
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-full sm:max-w-xl leading-relaxed">
            From urgent packages to scheduled business shipments, {businessConfig.name} coordinates courier logistics with stage-by-stage status visibility, speed, and safety-first handling.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => setBookingOpen(true)}
              className="btn btn-primary flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl hover:translate-y-[-2px] transition-transform duration-200 text-xs sm:text-sm"
            >
              Book a Delivery
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/track"
              className="btn btn-ghost flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl border border-[#91aae1]/16 bg-white/3 hover:bg-white/5 hover:translate-y-[-2px] transition-transform duration-200 text-xs sm:text-sm"
            >
              <Radar className="w-4 h-4 text-pink-400" />
              Track an Order
            </Link>
          </div>

          {/* Metrics bar - stacked on mobile to prevent overflow clipping */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#91aae1]/16 max-w-lg">
            <div className="border-l border-[#91aae1]/16 pl-4">
              <strong className="block font-space text-lg md:text-2xl text-white font-bold">8</strong>
              <span className="text-[9px] text-slate-400 block">Core Services</span>
              <span className="text-[8px] text-[#8ea2c9]/60 font-bold block uppercase tracking-wider">Demo Config</span>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-[#91aae1]/16 pt-3 sm:pt-0 sm:pl-4 pl-0">
              <strong className="block font-space text-lg md:text-2xl text-white font-bold">WhatsApp</strong>
              <span className="text-[9px] text-slate-400 block">Booking Match</span>
              <span className="text-[8px] text-[#8ea2c9]/60 font-bold block uppercase tracking-wider">Manual Dispatch</span>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-[#91aae1]/16 pt-3 sm:pt-0 sm:pl-4 pl-0">
              <strong className="block font-space text-lg md:text-2xl text-white font-bold">Demo</strong>
              <span className="text-[9px] text-slate-400 block">Console System</span>
              <span className="text-[8px] text-[#8ea2c9]/60 font-bold block uppercase tracking-wider">Preview Only</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Scene - placed after actions on mobile */}
        <div className="lg:col-span-6 relative w-full order-2 lg:order-2">
          {/* Controls to toggle fallback on the fly */}
          <button
            onClick={toggleBatterySaver}
            title={batterySaver ? "Activate 3D Mode" : "Deactivate 3D Mode"}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl border border-[#91aae1]/16 bg-[#0c0e22]/90 text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-[9px] tracking-wider uppercase font-semibold"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{batterySaver ? "Enable 3D" : "Low Power"}</span>
          </button>

          {/* Scene Area - capped height on mobile */}
          <div className="relative w-full max-w-full">
            {batterySaver ? <StaticCityFallback /> : <CityScene3D />}
          </div>
        </div>
      </div>

      {/* Booking Form Dialog */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
