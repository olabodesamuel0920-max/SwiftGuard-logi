"use client";

import React from "react";
import LogoMark from "@/components/LogoMark";

export default function LogoProofPage() {
  return (
    <div className="min-h-screen bg-[#050610] flex flex-col items-center justify-center gap-12 p-8 font-space">
      <h1 className="text-white text-xl font-bold tracking-widest uppercase">
        Logo Monogram Unification Proof
      </h1>
      <div className="flex gap-20 items-center justify-center p-12 border border-[#91aae1]/16 bg-[#0d1022]/62 rounded-3xl">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
            Header Logo (size 40)
          </span>
          <div className="p-4 bg-white/2 rounded-xl border border-white/5">
            <LogoMark size={40} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
            Loader Logo (size 64)
          </span>
          <div className="p-4 bg-white/2 rounded-xl border border-white/5">
            <LogoMark size={64} />
          </div>
        </div>
      </div>
      <p className="text-[10px] text-[#8ea2c9]/60 max-w-md text-center">
        Both components import and render the exact same unified S/G interlocking path from src/components/LogoMark.tsx.
      </p>
    </div>
  );
}
