"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import Footer from "@/components/Footer";
import { businessConfig } from "@/config/business";

export default function PrivacyPage() {
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
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="font-space text-[10px] tracking-[0.2em] text-[#7991bd] uppercase font-semibold">
                  SECURITY & PRIVACY
                </span>
                <h1 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                  Privacy Policy & Disclaimers
                </h1>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-[#91aae1]/12 pt-6">
              <h2 className="text-white font-space font-bold text-base mt-4">1. No Backend System / No Database</h2>
              <p>
                At this stage, {businessConfig.name} operates purely as a visual client-side interface prototype. We do NOT maintain a backend database, user accounts, or server logs of bookings. Any dispatch details entered in our forms are compiled locally in your browser and sent directly to our dispatch operator via the WhatsApp messaging protocol.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">2. Local Storage Usage</h2>
              <p>
                We store user-selected visual accessibility parameters (such as whether you enabled Night Owl Mode, Low Power/Battery Saver mode, or Reduced Motion preferences) in your browser’s local storage. This data is entirely local to your device and is not synchronized to any server.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">3. External Redirections</h2>
              <p>
                Our booking flows redirect directly to WhatsApp ({businessConfig.whatsAppBaseUrl}) which operates under its own security and end-to-end encryption guidelines. We encourage users to verify details before forwarding cargo descriptions.
              </p>

              <h2 className="text-white font-space font-bold text-base mt-4">4. Underdevelopment Sandbox</h2>
              <p>
                This command deck constitutes a prototype application. Spline mapping coordinates, dispatch schedules, and pricing indicators are simulations for review and do not constitute actual company assets or guarantees.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
