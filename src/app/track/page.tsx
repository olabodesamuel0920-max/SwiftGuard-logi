"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Tracking from "@/components/Tracking";
import Footer from "@/components/Footer";

export default function TrackPage() {
  return (
    <>
      <div className="min-h-screen pt-28 pb-16 flex flex-col bg-[#050610] text-[#f7f9ff]">
        <div className="max-w-[1240px] mx-auto w-full px-4 md:px-6 flex-grow">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6 focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Command Desk
          </Link>

          {/* Tracking Component */}
          <div className="glass rounded-3xl border border-[#91aae1]/16 bg-[#0c0e22]/40 p-4 md:p-6 shadow-2xl">
            <Tracking />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
}
