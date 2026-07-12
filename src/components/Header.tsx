"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "./LogoMark";
import SettingsPanel from "./SettingsPanel";
import { Settings, Phone, Calendar } from "lucide-react";
import { businessConfig } from "@/config/business";

export default function Header() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  return (
    <>
      <header className="fixed z-[99] left-1/2 top-4 -translate-x-1/2 w-full max-w-[1240px] px-3 min-[360px]:px-4 md:px-6">
        <div className="glass h-[72px] rounded-2xl flex items-center justify-between px-4 min-[360px]:px-6 md:px-8 border border-[#91aae1]/16 bg-[#0d1022]/62 backdrop-blur-md shadow-2xl">
          {/* Logo and Brand */}
          <Link href="/" aria-label="Swift Guard Logistics home" className="flex items-center gap-2 min-[360px]:gap-3 group focus:outline-none">
            <LogoMark size={36} className="min-[360px]:w-[40px] min-[360px]:h-[40px] group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col line-height-none whitespace-nowrap">
              <span className="font-space text-xs min-[360px]:text-sm font-bold tracking-widest text-white leading-none">
                SWIFT GUARD
              </span>
              <span className="font-space text-[8px] tracking-[0.48em] text-[#aab4ce] leading-none mt-1 hidden min-[360px]:block">
                LOGISTICS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-space text-xs font-semibold tracking-wider text-[#c8d0e2]" aria-label="Primary navigation">
            <Link
              href="/"
              className={`relative py-2 hover:text-white transition-colors duration-200 focus:outline-none ${
                isActive("/") ? "text-white" : ""
              }`}
            >
              Command Desk
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-pink-500 rounded-full" />
              )}
            </Link>
            <Link
              href="/track"
              className={`relative py-2 hover:text-white transition-colors duration-200 focus:outline-none ${
                isActive("/track") ? "text-white" : ""
              }`}
            >
              Track Order
              {isActive("/track") && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-pink-500 rounded-full" />
              )}
            </Link>
            <Link
              href="/business"
              className={`relative py-2 hover:text-white transition-colors duration-200 focus:outline-none ${
                isActive("/business") ? "text-white" : ""
              }`}
            >
              Business Hub
              {isActive("/business") && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-pink-500 rounded-full" />
              )}
            </Link>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2 min-[360px]:gap-3">
            {/* Preferences Toggle Button */}
            <button
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings panel"
              className="w-10 h-10 rounded-xl border border-[#91aae1]/16 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#91aae1]/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
            </button>

            {/* Fictional Call Link Trigger */}
            <a
              href={businessConfig.callLink}
              title={`Call Dispatch: ${businessConfig.callDisplay}`}
              aria-label="Call Dispatch"
              className="hidden lg:flex w-10 h-10 rounded-xl border border-[#91aae1]/16 bg-white/5 text-[#9da9c4] hover:text-white items-center justify-center hover:bg-white/10 hover:border-[#91aae1]/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Primary Action Button */}
            <Link
              href="/book"
              className="btn btn-primary compact inline-flex items-center justify-center gap-2 w-10 h-10 min-[360px]:w-auto min-[360px]:h-auto min-[360px]:px-4 min-[360px]:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-semibold"
            >
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="hidden min-[360px]:inline">Book Delivery</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Settings Modal Interface */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
