"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, HelpCircle } from "lucide-react";
import { businessConfig } from "@/config/business";

export default function InstantQuote() {
  const [service, setService] = useState("Express Delivery");
  const [category, setCategory] = useState("Documents");
  const [size, setSize] = useState("Small");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isExpress, setIsExpress] = useState(false);
  const [isNightOwl, setIsNightOwl] = useState(false);
  const [extraStops, setExtraStops] = useState(0);

  // Recalculate demo price dynamically during render
  const base = businessConfig.pricingRules.baseRates[service] || 2500;
  
  let multiplier = 1;
  if (isExpress) multiplier *= businessConfig.pricingRules.expressMultiplier;
  
  // Size multiplier
  let sizeFactor = 1.0;
  if (size === "Medium") sizeFactor = 1.25;
  if (size === "Large") sizeFactor = 1.6;

  let surcharge = 0;
  if (isNightOwl) surcharge += businessConfig.pricingRules.nightOwlSurcharge;
  
  const stopsFee = extraStops * businessConfig.pricingRules.extraStopFee;
  
  const estimatedPrice = Math.round((base * sizeFactor) * multiplier + surcharge + stopsFee);

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#060817]/40 relative overflow-hidden" id="quote">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/5 filter blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            ESTIMATION DECK
          </span>
          <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
            Instant Quote Terminal
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Configure your delivery parameters to calculate a mock dispatch rate for the operating district.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 border border-[#91aae1]/16 bg-[#0c0e22]/80">
            <h3 className="font-space text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              Configure Mission Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Pickup Area */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-pickup" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                  Pickup Area
                </label>
                <input
                  id="quote-pickup"
                  type="text"
                  placeholder="e.g. Command District North"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Destination Area */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-destination" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                  Destination Area
                </label>
                <input
                  id="quote-destination"
                  type="text"
                  placeholder="e.g. Substation South"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Service Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-service" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                  Service Type
                </label>
                <select
                  id="quote-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                >
                  {businessConfig.services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Package Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-category" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                  Package Category
                </label>
                <select
                  id="quote-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                >
                  <option>Documents / Keys</option>
                  <option>E-commerce items</option>
                  <option>Supermarket shopping</option>
                  <option>Medical supplies</option>
                  <option>Fragile items</option>
                  <option>Other / Personal errand</option>
                </select>
              </div>

              {/* Package Size */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-size" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                  Package Size
                </label>
                <select
                  id="quote-size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                >
                  <option value="Small">Small (Under 3kg)</option>
                  <option value="Medium">Medium (3kg - 15kg)</option>
                  <option value="Large">Large (Over 15kg / Bulk)</option>
                </select>
              </div>

              {/* Additional Stops */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-stops" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                  Additional Stops
                </label>
                <input
                  id="quote-stops"
                  type="number"
                  min="0"
                  max="5"
                  value={extraStops}
                  onChange={(e) => setExtraStops(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Options switches */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Express delivery toggle */}
                <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#91aae1]/10 rounded-xl bg-white/2 hover:bg-white/5 select-none">
                  <input
                    type="checkbox"
                    checked={isExpress}
                    onChange={(e) => setIsExpress(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-[#91aae1]/30 bg-[#0b0f22] rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <div>
                    <span className="block text-xs font-semibold text-white">Priority Express</span>
                    <span className="block text-[10px] text-slate-400">Skip standard queue (+50%)</span>
                  </div>
                </label>

                {/* Night owl toggle */}
                <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#91aae1]/10 rounded-xl bg-white/2 hover:bg-white/5 select-none">
                  <input
                    type="checkbox"
                    checked={isNightOwl}
                    onChange={(e) => setIsNightOwl(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-[#91aae1]/30 bg-[#0b0f22] rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <div>
                    <span className="block text-xs font-semibold text-white">Night Owl Transit</span>
                    <span className="block text-[10px] text-slate-400">Late dispatch window surcharge</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing Preview Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Calculator Display Panel */}
            <div className="glass rounded-3xl p-8 border border-[#91aae1]/16 bg-gradient-to-br from-[#0e1233] to-[#080b1e] text-center shadow-xl">
              <span className="text-[10px] tracking-[0.2em] text-[#8ea2c9] uppercase font-semibold">
                PREVIEW ESTIMATE
              </span>
              
              <div className="my-6">
                <span className="text-sm font-space text-[#c8d0e2] block">
                  Estimated quote pending confirmation
                </span>
                {estimatedPrice && (
                  <strong className="block text-3xl md:text-4xl font-space font-bold text-white mt-3">
                    ₦ {estimatedPrice.toLocaleString()} *
                  </strong>
                )}
              </div>

              <div className="py-4 border-t border-[#91aae1]/12 text-left space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Base Rate:</span>
                  <span className="text-white">₦ {(businessConfig.pricingRules.baseRates[service] || 2500).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size Factor:</span>
                  <span className="text-white">{size === "Small" ? "1.0x" : size === "Medium" ? "1.25x" : "1.6x"}</span>
                </div>
                {isExpress && (
                  <div className="flex justify-between text-indigo-400">
                    <span>Priority Queue:</span>
                    <span>+{Math.round((businessConfig.pricingRules.expressMultiplier - 1) * 100)}%</span>
                  </div>
                )}
                {isNightOwl && (
                  <div className="flex justify-between text-violet-400">
                    <span>Night Owl Fee:</span>
                    <span>+ ₦ {businessConfig.pricingRules.nightOwlSurcharge.toLocaleString()}</span>
                  </div>
                )}
                {extraStops > 0 && (
                  <div className="flex justify-between text-cyan-400">
                    <span>Multi-Stops ({extraStops}):</span>
                    <span>+ ₦ {(extraStops * businessConfig.pricingRules.extraStopFee).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="text-[10px] text-[#8190ac] leading-relaxed mb-4 text-center">
                  * Note: The calculated price above is for demonstration purposes only. Final pricing is confirmed by our dispatch manager on WhatsApp.
                </p>
                <a
                  href="/book"
                  className="btn btn-primary w-full flex items-center justify-center gap-2 text-sm py-3"
                >
                  Book Delivery Mission
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Fictional district helper notice */}
            <div className="p-5 rounded-2xl border border-amber-500/10 bg-amber-500/5 text-amber-300 text-xs flex gap-3">
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="font-semibold block mb-0.5">Fictional Environment Notice</span>
                <p className="text-[11px] text-amber-300/80 leading-normal">
                  Our current simulation defaults to the fictional <strong>Command District, Swift City</strong>. Select this environment to test pricing structures. Actual service centers will be configured in due course.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
