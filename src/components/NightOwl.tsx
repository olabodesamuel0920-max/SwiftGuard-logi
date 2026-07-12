"use client";

import React, { useState } from "react";
import { Moon, Shield, Sparkles, MapPin } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import BookingModal from "./BookingModal";

export default function NightOwl() {
  const { nightMode, toggleNightMode } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-gradient-to-b from-[#050610] to-[#04050c] relative overflow-hidden" id="night-owl-section">
      {/* Starry Night Sky overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 0 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-600/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="font-space text-[10px] tracking-[0.2em] text-[#c9baff] uppercase font-semibold flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-violet-400" />
              NIGHT OWL DELIVERY AVAILABLE
            </span>
            <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
              The City May<br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Slow Down. We Don’t.
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Selected after-hours delivery requests may be available. Coverage, operating hours and safety requirements are confirmed during booking.
            </p>
          </div>

          {/* Badges list */}
          <div className="flex flex-wrap gap-2.5">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[#c9baff] text-[10px] font-space tracking-wider uppercase font-semibold">
              <Shield className="w-3 h-3" /> Late Dispatch Options
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[#c9baff] text-[10px] font-space tracking-wider uppercase font-semibold">
              <MapPin className="w-3 h-3" /> Service Area
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[#c9baff] text-[10px] font-space tracking-wider uppercase font-semibold">
              <Sparkles className="w-3 h-3" /> Dispatch Routing
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {/* Book Night Owl */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary flex items-center gap-2 px-6 py-3.5 text-xs rounded-xl"
            >
              Check Availability
            </button>

            {/* Toggle Theme Control */}
            <button
              onClick={toggleNightMode}
              className="btn btn-ghost border border-[#91aae1]/16 bg-white/3 hover:bg-white/5 flex items-center gap-2 px-6 py-3.5 text-xs rounded-xl"
            >
              <Moon className="w-4 h-4 text-violet-400" />
              <span>Toggle {nightMode ? "Day Mode" : "Night Mode"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Night Owl scene */}
        <div className="lg:col-span-7 relative h-[360px] md:h-[480px] rounded-3xl overflow-hidden border border-indigo-950 bg-[#04050c]">
          
          {/* Fictional Giant Glowing Moon */}
          <div className="absolute right-10 top-10 w-44 h-44 rounded-full bg-gradient-to-tr from-[#1a1041] via-[#4c2c9d] to-[#f0f2ff] shadow-[0_0_60px_rgba(137,86,255,0.22)]" />

          {/* Animated Night Road */}
          <div 
            className="absolute left-[5%] right-[-10%] bottom-8 h-40 bg-[#070a13] border-t border-[#91aae1]/10 overflow-hidden"
            style={{
              transform: "perspective(400px) rotateX(45deg) skewX(-10deg)"
            }}
          >
            {/* Moving Road Lines */}
            <div 
              className="absolute left-0 right-0 top-1/2 h-[3px] bg-dashed-road"
              style={{
                backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)",
                backgroundSize: "60px 100%",
                animation: "road-scroll 1.5s linear infinite"
              }}
            />
          </div>

          {/* Cyber Silhouettes towers */}
          <div className="absolute bottom-8 right-6 w-16 h-48 bg-gradient-to-t from-[#090d20] to-[#1b2854] border border-[#91aae1]/10 rounded-t" />
          <div className="absolute bottom-8 right-24 w-12 h-36 bg-gradient-to-t from-[#090d20] to-[#1b2854] border border-[#91aae1]/10 rounded-t" />
          <div className="absolute bottom-8 left-8 w-20 h-40 bg-gradient-to-t from-[#090d20] to-[#1b2854] border border-[#91aae1]/10 rounded-t" />

          {/* Moving dispatch bike marker */}
          <div className="absolute left-[38%] bottom-16 text-5xl text-[#87c4ff] select-none transform rotate-[-8deg] drop-shadow-[0_0_12px_#3c7fff] animate-bounce">
            ➤
            <div className="absolute right-6 top-[40%] w-24 h-1 bg-gradient-to-l from-[#5f9dff] to-transparent blur-[2px]" />
          </div>
        </div>
      </div>

      {/* Night Owl Booking Modal Overlay */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="Night Owl Service"
      />
    </section>
  );
}
