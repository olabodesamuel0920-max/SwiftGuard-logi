"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { businessConfig } from "@/config/business";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Where does Swift Guard operate?",
      a: `We are currently in a testing and deployment phase, defaulting to "${businessConfig.operatingCityPlaceholder}" for interface simulations. Specific operating zones and address parameters are subject to dispatch manager confirmation during booking.`,
    },
    {
      q: "Is there live GPS tracking?",
      a: "No. Our tracking portal utilizes stage-by-stage checkpoint logging. When the package completes a dispatch stage, the system updates the dashboard. We do not represent our simulator map marker as physical live GPS tracking.",
    },
    {
      q: "What items are restricted from transport?",
      a: businessConfig.restrictedItemsNotice,
    },
    {
      q: "How are delivery quotes calculated?",
      a: `Quotes are based on service base rates, package size, express priorities, and stops. A base price is estimated on the portal, but the final shipping rate is confirmed on WhatsApp after evaluating current road constraints.`,
    },
    {
      q: "How do I schedule a Night Owl delivery?",
      a: `Our Night Owl dispatch hours are subject to confirmation. Night Owl orders require advance scheduling through the booking form or direct contact with our team on WhatsApp.`,
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#060817]/40 relative overflow-hidden" id="faq">
      <div className="max-w-[820px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            COMMON INQUIRIES
          </span>
          <h2 className="font-space text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
            Frequently Answered Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass border border-[#91aae1]/10 bg-[#0c0e22]/50 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none focus:text-indigo-400 focus:bg-white/2"
                  aria-expanded={isOpen}
                >
                  <span className="font-space text-sm md:text-base font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 p-1.5 rounded-lg bg-white/5 border border-[#91aae1]/10 text-white">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-[#91aae1]/8 p-5 md:p-6" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
