"use client";

import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function Business() {
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      num: "01",
      title: "Bulk Dispatch Matching",
      desc: "Prepare multiple delivery drop-offs simultaneously. Consolidate routes to optimize transit fees.",
    },
    {
      num: "02",
      title: "Recurring Pickup Schedules",
      desc: "Establish scheduled daily or weekly cycles so dispatch riders arrive without manual prompting.",
    },
    {
      num: "03",
      title: "Consolidated Billing Logs",
      desc: "Access aggregated receipt sheets and delivery records to audit operational expenditures.",
    },
    {
      num: "04",
      title: "Dedicated Dispatch Channels",
      desc: "Direct support pathways connect corporate clients directly to dispatch managers.",
    },
  ];

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#060817]/40 relative overflow-hidden" id="business">
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-indigo-500/5 filter blur-[150px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        <div className="glass rounded-[38px] p-8 md:p-12 border border-[#91aae1]/16 bg-[#0c0e22]/70 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
                FOR GROWING BUSINESSES
              </span>
              <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
                Your Delivery Operations, Upgraded.
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Provide your online shop, store, or team with a coordinated dispatch workflow including pre-scheduled pickups and multi-drop routes.
              </p>
            </div>

            {/* Grid list of corporate features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.num} className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/2">
                  <span className="font-mono text-[10px] text-indigo-400 font-bold block mb-1">
                    {f.num}
                  </span>
                  <strong className="block text-white text-xs font-bold font-space mb-1">
                    {f.title}
                  </strong>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary flex items-center gap-2 py-3 px-6 text-sm"
            >
              Request Business Access
            </button>
          </div>

          {/* Right Column: Interactive Dashboard Mockup Preview */}
          <div className="lg:col-span-6 relative">
            {/* Dashboard Container */}
            <div className="relative border border-[#91aae1]/19 bg-gradient-to-tr from-[#181e41]/90 to-[#080b1b]/88 rounded-3xl p-6 md:p-8 shadow-2xl">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-[#91aae1]/10 pb-4 mb-6">
                <div>
                  <b className="font-space text-xs font-bold text-white tracking-wider">
                    OPERATIONS DESK PREVIEW
                  </b>
                  <span className="block text-[8px] text-slate-400 tracking-widest mt-0.5 uppercase">
                    [INTERFACE PREVIEW - DEMO DATA]
                  </span>
                </div>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  LIVE STATUS
                </span>
              </div>

              {/* KPIs Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-white/3 border border-[#91aae1]/10 rounded-xl">
                  <span className="block text-[8px] text-[#788caf] tracking-wider uppercase font-semibold">Active Dispatch</span>
                  <strong className="block text-white text-base md:text-xl font-space mt-1 font-bold">18</strong>
                </div>
                <div className="p-3 bg-white/3 border border-[#91aae1]/10 rounded-xl">
                  <span className="block text-[8px] text-[#788caf] tracking-wider uppercase font-semibold">Completed</span>
                  <strong className="block text-white text-base md:text-xl font-space mt-1 font-bold">143</strong>
                </div>
                <div className="p-3 bg-white/3 border border-[#91aae1]/10 rounded-xl">
                  <span className="block text-[8px] text-[#788caf] tracking-wider uppercase font-semibold">Success Rate</span>
                  <strong className="block text-emerald-400 text-base md:text-xl font-space mt-1 font-bold">97%</strong>
                </div>
              </div>

              {/* Simulated Chart (SVG Sparkline) */}
              <div className="mb-6">
                <span className="block text-[8px] text-[#788caf] tracking-wider uppercase font-semibold mb-3">Weekly Load Trend (Demo Data)</span>
                <div className="h-16 flex items-end gap-1.5 px-2">
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "34%" }} />
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "56%" }} />
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "42%" }} />
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "72%" }} />
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "65%" }} />
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "88%" }} />
                  <div className="flex-1 bg-gradient-to-t from-blue-500 to-pink-500 rounded-t" style={{ height: "76%" }} />
                </div>
              </div>

              {/* Live Order Feeds */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 text-[10px] text-[#afbdd8] border border-[#91aae1]/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-mono">SGL-8012</span>
                  </div>
                  <span>In Transit</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 text-[10px] text-[#afbdd8] border border-[#91aae1]/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="font-mono">SGL-8013</span>
                  </div>
                  <span>Rider Assigned</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 text-[10px] text-[#afbdd8] border border-[#91aae1]/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono">SGL-8014</span>
                  </div>
                  <span>Delivered</span>
                </div>
              </div>
            </div>

            {/* Small Floating Cards */}
            <div className="absolute top-[-15px] right-[-15px] glass border border-[#91aae1]/19 rounded-2xl p-3 bg-[#0c0e22]/90 shadow-xl hidden md:block">
              <span className="block text-[8px] text-[#7890ba] uppercase tracking-wider">Avg. Dispatch ETA</span>
              <strong className="block text-white text-base font-space mt-1">22 MIN</strong>
            </div>

            <div className="absolute bottom-[-15px] left-[-15px] glass border border-[#91aae1]/19 rounded-2xl p-3 bg-[#0c0e22]/90 shadow-xl hidden md:block">
              <span className="block text-[8px] text-[#7890ba] uppercase tracking-wider">Riders Online</span>
              <strong className="block text-[#70ffc6] text-xs font-space mt-1">12 STATIONS active</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Business Booking Modal Overlay */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="Business Deliveries"
      />
    </section>
  );
}
