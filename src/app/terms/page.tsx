"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, AlertTriangle } from "lucide-react";
import Footer from "@/components/Footer";
import { businessConfig } from "@/config/business";

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen pt-28 pb-16 flex flex-col bg-[#050610] text-[#f7f9ff]">
        <div className="max-w-3xl mx-auto w-full px-4 flex-grow space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-2 focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <div className="glass rounded-3xl p-6 md:p-10 border border-[#91aae1]/16 bg-[#0c0e22]/80 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="font-space text-[10px] tracking-[0.2em] text-[#7991bd] uppercase font-semibold">
                  OPERATIONAL GUIDELINES
                </span>
                <h1 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                  Terms of Carriage &amp; Service
                </h1>
              </div>
            </div>

            {/* Draft Notice */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-xs text-amber-300">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
              <div>
                <strong className="block mb-0.5 uppercase tracking-wider text-[10px]">Draft Notice</strong>
                <p className="text-[11px] text-amber-300/80 leading-normal">
                  All carriage restrictions, cancellation rules, liability statements and prohibited-item policies below are draft operational policies — owner confirmation required before enforcement.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-[#91aae1]/12 pt-6">
              <h2 className="text-white font-space font-bold text-base mt-4">1. Carriage Scope</h2>
              <p>
                Swift Guard Logistics operates as a courier and errand dispatch company. Service delivery areas are subject to confirmation during booking. All requests must comply with applicable regulations.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">2. Restricted and Prohibited Cargo</h2>
              <p className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] italic">
                Draft operational policy — owner confirmation required.
              </p>
              <p className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
                <strong>IMPORTANT:</strong> {businessConfig.restrictedItemsNotice}
              </p>
              <p>
                Carriage of prohibited material may result in cancellation of the dispatch request. Specific consequences are determined by the business owner on a case-by-case basis.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">3. Quotation Estimates</h2>
              <p>
                Pricing rates computed in the delivery estimate calculator are sample values and do not constitute binding agreements. Final logistics fees are confirmed via direct communication on WhatsApp, based on courier availability, package details, and route conditions.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">4. Transit Liability</h2>
              <p className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] italic">
                Draft operational policy — owner confirmation required.
              </p>
              <p>
                Care is taken with all parcels and errands. Specific liability limits and compensation terms will be confirmed by the business owner before dispatch.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
