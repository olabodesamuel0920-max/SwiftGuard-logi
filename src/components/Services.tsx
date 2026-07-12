"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { businessConfig } from "@/config/business";
import BookingModal from "./BookingModal";

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const services = businessConfig.services;
  const activeService = services[activeIdx];

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#050610] relative" id="services">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            SERVICES SELECTOR
          </span>
          <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
            One Network.<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              Eight Ways to Move.
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Select a service type below to adjust the parameters for your logistics shipment.
          </p>
        </div>

        {/* Interactive Selector Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Orbit Wheel (Desktop) & Grid (Mobile) */}
          <div className="lg:col-span-7 flex justify-center relative min-h-[350px] md:min-h-[500px]">
            {/* Desktop Orbit Selector Wheel */}
            <div className="hidden md:block relative w-[460px] h-[460px] rounded-full border border-[#91aae1]/8 bg-[#0c0e22]/5">
              {/* Rotating Dashed Orbit Lines */}
              <div className="absolute inset-8 rounded-full border border-dashed border-[#91aae1]/16 animate-spin-slow" />
              <div className="absolute inset-24 rounded-full border border-dashed border-pink-500/10 animate-spin-reverse" />

              {/* Fictional Central core structure */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-gradient-to-br from-[#1c7cff] via-[#7048ff] to-[#ff2ca8] border border-white/20 shadow-2xl flex flex-col items-center justify-center font-space">
                <span className="text-white text-3xl font-extrabold tracking-widest">SG</span>
                <span className="text-[7px] text-[#f7f9ff] tracking-[0.2em] uppercase font-bold mt-1">SECURE CORE</span>
              </div>

              {/* Orbiting Buttons */}
              {services.map((s, idx) => {
                const angle = idx * (360 / services.length);
                const isActive = activeIdx === idx;

                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Select ${s.name}`}
                    className={`absolute w-20 h-20 -ml-10 -mt-10 rounded-full flex flex-col items-center justify-center font-space border text-xs transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 border-white text-white shadow-[0_0_25px_rgba(111,92,255,0.45)] scale-110 z-10"
                        : "bg-[#0a0e20]/90 border-[#91aae1]/16 text-[#9da9c7] hover:border-[#91aae1]/45 hover:text-white"
                    }`}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${angle}deg) translate(190px) rotate(-${angle}deg)`,
                    }}
                  >
                    <span className="text-xl leading-none mb-1">{s.icon}</span>
                    <span className="text-[8px] font-bold tracking-wider leading-none text-center px-1">
                      {s.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Grid Layout Selector */}
            <div className="md:hidden w-full grid grid-cols-2 gap-3">
              {services.map((s, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-900/60 to-purple-900/60 border-indigo-500 text-white shadow-lg"
                        : "bg-[#0a0e20]/80 border-[#91aae1]/10 text-slate-400"
                    }`}
                  >
                    <span className="text-2xl mb-2">{s.icon}</span>
                    <span className="text-xs font-space font-bold tracking-wider uppercase text-white">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {s.copy}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Active Service Detail Panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="glass rounded-3xl p-6 md:p-8 border border-[#91aae1]/16 bg-[#0c0e22]/70 min-h-[430px] flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Index Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-pink-500/10 border border-[#91aae1]/22 flex items-center justify-center text-3xl">
                      {activeService.icon}
                    </div>
                    <span className="font-space font-bold text-[10px] tracking-[0.2em] text-[#7991bd]">
                      SERVICE {String(activeIdx + 1).padStart(2, "0")} / 08
                    </span>
                  </div>

                  {/* Title & Copy */}
                  <h3 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                    {activeService.name}
                  </h3>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
                    {activeService.copy}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {activeService.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs text-[#cdd6e8]">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm"
                >
                  Select Service
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Booking Form Overlay */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={activeService.name}
      />
    </section>
  );
}
