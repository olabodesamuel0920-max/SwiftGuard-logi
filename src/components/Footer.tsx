import React from "react";
import Link from "next/link";
import { businessConfig } from "@/config/business";
import LogoMark from "./LogoMark";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#91aae1]/16 bg-[#050610] text-[#8896b0] text-[11px] font-space">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Information */}
        <div className="flex items-center gap-3">
          <LogoMark size={32} />
          <div className="flex flex-col gap-0.5">
            <b className="text-[#dce5f7] text-[11px] uppercase tracking-wider">
              {businessConfig.name}
            </b>
            <span className="text-[10px] text-slate-400">
              {businessConfig.tagline}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[#9da9c4]">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Command Desk
          </Link>
          <Link href="/book" className="hover:text-white transition-colors duration-200">
            Book Delivery
          </Link>
          <Link href="/track" className="hover:text-white transition-colors duration-200">
            Track Order
          </Link>
          <Link href="/business" className="hover:text-white transition-colors duration-200">
            Business Hub
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors duration-200">
            Terms of Service
          </Link>
        </div>

        {/* Footer Meta / Copyright */}
        <div className="text-center md:text-right text-slate-500">
          <span>Interface Preview &bull; &copy; {currentYear} {businessConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}
