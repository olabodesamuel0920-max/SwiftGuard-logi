"use client";

import React, { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

const logDatabase = [
  "BOOT SEQUENCE INITIATED...",
  "[OK] SECURE CORE INITIALIZED",
  "[OK] ROUTE VISUALISER READY",
  "[OK] CONFIGURATION STACK LOADED",
  "[OK] NIGHT OWL MODULE ARMED",
  "SWIFT GUARD NETWORK CLIENT LINKED",
  "ESTABLISHING SECURE PROTOCOLS...",
  "READY TO DEPLOY dispatch.sys"
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Scroll progress from 0 to 100
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setComplete(true), 400); // Wait briefly before fading
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Progressively push console logs
    const logInterval = 220;
    const timer = setInterval(() => {
      setLogs((prev) => {
        if (prev.length < logDatabase.length) {
          return [...prev, logDatabase[prev.length]];
        }
        clearInterval(timer);
        return prev;
      });
    }, logInterval);

    return () => clearInterval(timer);
  }, []);

  if (complete) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050610] text-[#f7f9ff] font-space select-none"
      style={{
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Glow ambient background */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-indigo-600/10 filter blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-sm w-full px-8">
        {/* Animated Brand Shield Logo */}
        <div className="mb-8 animate-pulse">
          <LogoMark size={72} />
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold tracking-widest text-white uppercase">
            Swift Guard
          </h1>
          <p className="text-[10px] tracking-[0.48em] text-[#aab4ce] uppercase mt-1">
            Logistics Command
          </p>
        </div>

        {/* Boot Logs Terminal */}
        <div className="w-full h-32 bg-[#090b19]/80 border border-[#91aae1]/16 rounded-xl p-4 overflow-y-auto mb-8 font-mono text-[9px] text-[#9da9c4] leading-relaxed flex flex-col justify-end">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-indigo-400 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          {logs.length < logDatabase.length && (
            <div className="flex gap-2 animate-pulse">
              <span className="text-indigo-400">&gt;</span>
              <span className="w-1 h-3 bg-[#9da9c4]" />
            </div>
          )}
        </div>

        {/* Progress Bar & Numeric Indicator */}
        <div className="w-full">
          <div className="flex justify-between items-center text-[10px] text-[#9da9c4] mb-2 tracking-wider">
            <span>COMMAND LINK STATUS:</span>
            <span className="font-bold text-white">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-[#13172e] rounded-full overflow-hidden border border-[#91aae1]/10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
