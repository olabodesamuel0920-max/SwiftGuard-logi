"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Business from "@/components/Business";
import DashboardPreviews from "@/components/DashboardPreviews";
import Footer from "@/components/Footer";

export default function BusinessPage() {
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

          {/* Business Core features */}
          <Business />

          {/* Dashboard Previews */}
          <DashboardPreviews />
        </div>

        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
}
