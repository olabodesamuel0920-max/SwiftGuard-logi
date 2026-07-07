"use client";

import React, { useEffect, useState } from "react";

export default function StaticCityFallback() {
  const [eta, setEta] = useState("14 MIN");
  const [percent, setPercent] = useState(48);

  useEffect(() => {
    // Simulate rider movement on the route path in the 2D SVG
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + 1;
        if (next > 95) {
          return 5; // loop back
        }
        // approximate ETA calculation
        const minsLeft = Math.max(Math.round((100 - next) * 0.3), 1);
        setEta(`${minsLeft} MIN`);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[590px] rounded-[42px] overflow-hidden border border-[#91aae1]/18 bg-gradient-to-b from-[#081126] via-[#060811] to-[#05060c] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_60px_100px_rgba(0,0,0,0.48)]">
      {/* City Grid Line Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(145, 170, 225, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(145, 170, 225, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Cyber sky rings */}
      <div className="absolute top-[-50px] right-[-100px] w-[350px] h-[350px] rounded-full border border-indigo-500/10 animate-spin-slow pointer-events-none" />
      <div className="absolute top-[20px] right-[-40px] w-[200px] h-[200px] rounded-full border border-pink-500/5 animate-spin-reverse pointer-events-none" />

      {/* HUD Info */}
      <div className="absolute top-6 left-6 z-10 glass rounded-xl px-4 py-3 text-[10px] tracking-wider text-[#aab6d2] border border-[#91aae1]/16 bg-[#070b18]/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ACTIVE BLUEPRINT ROUTE</span>
        </div>
        <strong className="block text-white text-sm font-space mt-1 font-bold">
          SGL-804219
        </strong>
      </div>

      <div className="absolute top-6 right-6 z-10 glass rounded-xl px-4 py-3 text-[10px] text-right tracking-wider text-[#aab6d2] border border-[#91aae1]/16 bg-[#070b18]/80">
        <small className="block text-[#8ea2c9] text-[8px] uppercase">ETA DISPLAY</small>
        <strong className="block text-white text-base font-space font-bold mt-0.5">
          {eta}
        </strong>
      </div>

      {/* 2D Vector City Blueprint drawing */}
      <svg
        viewBox="0 0 700 520"
        className="absolute inset-0 w-full h-full p-4 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="blueprintRouteGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2b8cff" />
            <stop offset="50%" stopColor="#8d4cff" />
            <stop offset="100%" stopColor="#ff2ca8" />
          </linearGradient>
          <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Blueprint Buildings Wireframe */}
        <g opacity="0.15" stroke="#7fb9ff" strokeWidth="1">
          {/* Fictional district buildings */}
          <rect x="50" y="340" width="30" height="80" fill="none" />
          <rect x="90" y="310" width="40" height="110" fill="none" />
          <rect x="140" y="270" width="35" height="150" fill="none" />
          <rect x="190" y="350" width="45" height="70" fill="none" />

          <rect x="250" y="280" width="50" height="140" fill="none" />
          <rect x="310" y="240" width="35" height="180" fill="none" />
          <rect x="360" y="320" width="40" height="100" fill="none" />

          <rect x="420" y="220" width="30" height="200" fill="none" />
          <rect x="460" y="290" width="45" height="130" fill="none" />
          <rect x="520" y="250" width="35" height="170" fill="none" />
          <rect x="570" y="310" width="40" height="110" fill="none" />
        </g>

        {/* Grid Floor Line */}
        <line x1="20" y1="420" x2="680" y2="420" stroke="#7fb9ff" strokeWidth="1.5" opacity="0.3" strokeDasharray="5 5" />

        {/* Fictional Route path */}
        <path
          id="routePath2D"
          d="M78 410 C160 350, 130 250, 250 260 S390 415, 480 300 S545 115, 635 105"
          fill="none"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M78 410 C160 350, 130 250, 250 260 S390 415, 480 300 S545 115, 635 105"
          fill="none"
          stroke="url(#blueprintRouteGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="10 14"
          filter="url(#vectorGlow)"
        />

        {/* Start / End Points */}
        <circle cx="78" cy="410" r="8" fill="#2b8cff" stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="635" cy="105" r="8" fill="#ff2ca8" stroke="#FFFFFF" strokeWidth="3" />

        {/* Pulsing delivery node along path */}
        <path
          d="M78 410 C160 350, 130 250, 250 260 S390 415, 480 300 S545 115, 635 105"
          fill="none"
          id="animatePath"
          display="none"
        />
      </svg>

      {/* Floating Labels */}
      <div className="absolute left-[8%] bottom-[25%] flex items-center gap-2 text-[9px] text-[#c7d4ed] bg-black/60 px-2 py-1 rounded border border-[#91aae1]/10">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        <span>Command District Hub</span>
      </div>

      <div className="absolute right-[8%] top-[25%] flex items-center gap-2 text-[9px] text-[#c7d4ed] bg-black/60 px-2 py-1 rounded border border-[#91aae1]/10">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
        <span>Substation Destination</span>
      </div>

      {/* Fictional Rider Vector marker */}
      <div
        className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 border border-white flex items-center justify-center text-[10px] font-bold text-white shadow-2xl transition-all duration-500"
        style={{
          left: `${percent}%`,
          top: `${40 + (100 - percent) * 0.4}%`,
          transform: "translate(-50%, -50%)"
        }}
      >
        ➤
      </div>

      {/* Bottom Status strip */}
      <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 border border-[#91aae1]/16 bg-[#070b18]/80 text-[10px] flex justify-around">
        <div className="flex items-center gap-2">
          <span className="text-[#aab6d2]">STAGE:</span>
          <span className="text-white font-bold tracking-wider">IN TRANSIT</span>
        </div>
        <div className="h-4 w-[1px] bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className="text-[#aab6d2]">RIDER:</span>
          <span className="text-white font-bold tracking-wider">SG-07</span>
        </div>
        <div className="h-4 w-[1px] bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className="text-[#aab6d2]">SPEED:</span>
          <span className="text-[#70ffc6] font-bold">NORMAL DISPATCH</span>
        </div>
      </div>
    </div>
  );
}
