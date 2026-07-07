"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";
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
            Back to Command Desk
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
                  Terms of Carriage & Service
                </h1>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-[#91aae1]/12 pt-6">
              <h2 className="text-white font-space font-bold text-base mt-4">1. Carriage Scope</h2>
              <p>
                Swift Guard Logistics operates as a courier and errand dispatch company. Service delivery areas are currently localized to confirmed operating zones in the district. All requests must compile with local regulatory directives and municipal codes.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">2. Restricted and Prohibited Cargo</h2>
              <p className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
                <strong>IMPORTANT:</strong> {businessConfig.restrictedItemsNotice}
              </p>
              <p>
                Carriage of any prohibited material will result in immediate cancellation of dispatch tasks, forfeiture of delivery credits, and reporting to local authorities where applicable.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">3. Quotation Estimates</h2>
              <p>
                Pricing rates computed in the instant quote calculator are simulation values and do not constitute binding agreements. Final logistics fees are subject to direct dispatch confirmation on WhatsApp, factoring in actual courier availability, weight parameters, and physical route conditions.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">4. Transit Liability</h2>
              <p>
                Riders and dispatch centers exercise highest care protocols. Liability limits for parcels, supermarket check-ins, and personal errands are established on an individual dispatch basis prior to matching a rider to a client mission.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
