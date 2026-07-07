"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Radar, Building2 } from "lucide-react";

export default function MobileNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  return (
    <nav
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md h-16 rounded-2xl glass border border-[#91aae1]/16 bg-[#0c0e22]/80 backdrop-blur-lg shadow-2xl z-[98] flex items-center justify-around px-4"
      aria-label="Mobile Navigation"
    >
      <Link
        href="/"
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all focus:outline-none ${
          isActive("/") ? "text-indigo-400 font-bold" : "text-[#9da9c4]"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[9px] tracking-wider mt-1 font-space uppercase">Desk</span>
      </Link>

      <Link
        href="/book"
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all focus:outline-none ${
          isActive("/book") ? "text-cyan-400 font-bold" : "text-[#9da9c4]"
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[9px] tracking-wider mt-1 font-space uppercase">Book</span>
      </Link>

      <Link
        href="/track"
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all focus:outline-none ${
          isActive("/track") ? "text-pink-400 font-bold" : "text-[#9da9c4]"
        }`}
      >
        <Radar className="w-5 h-5" />
        <span className="text-[9px] tracking-wider mt-1 font-space uppercase">Track</span>
      </Link>

      <Link
        href="/business"
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all focus:outline-none ${
          isActive("/business") ? "text-violet-400 font-bold" : "text-[#9da9c4]"
        }`}
      >
        <Building2 className="w-5 h-5" />
        <span className="text-[9px] tracking-wider mt-1 font-space uppercase">Hub</span>
      </Link>
    </nav>
  );
}
