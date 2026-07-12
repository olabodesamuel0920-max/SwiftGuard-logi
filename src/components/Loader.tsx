"use client";

import React, { useEffect, useState, useCallback } from "react";
import LogoMark from "./LogoMark";
import { useTheme } from "./ThemeProvider";

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
  const { reducedMotion, batterySaver } = useTheme();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [complete, setComplete] = useState(true); // default complete until client mount
  const [showSkip, setShowSkip] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Declare handleComplete before the effect that references it
  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem("sg_loader_completed", "true");
    } catch { /* sessionStorage may be unavailable */ }
    setTimeout(() => {
      setComplete(true);
    }, 0);
    document.documentElement.setAttribute("data-app-ready", "true");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);

    // 1. Session check to avoid replays
    try {
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const skipParam = params?.get("saver") === "true" || params?.get("skipLoader") === "true";
      const alreadyCompleted = sessionStorage.getItem("sg_loader_completed") === "true";
      if (alreadyCompleted || reducedMotion || skipParam) {
        setTimeout(() => {
          setComplete(true);
        }, 0);
        document.documentElement.setAttribute("data-app-ready", "true");
        return;
      }
    } catch {
      // Fallback if sessionStorage fails
      setTimeout(() => {
        setComplete(true);
      }, 0);
      document.documentElement.setAttribute("data-app-ready", "true");
      return;
    }

    // Un-complete to run loader
    setTimeout(() => {
      setComplete(false);
    }, 0);

    const isFast = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("fast") === "1";

    // 2. Hard timeout at 2.5 seconds
    const hardTimeout = setTimeout(() => {
      handleComplete();
    }, isFast ? 300 : 2500);

    // 3. Show Skip button after 1.2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, isFast ? 100 : 1200);

    // 4. Progress bar increments (completes in ~1.8 seconds)
    const duration = isFast ? 150 : 1800;
    const intervalTime = isFast ? 10 : 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(handleComplete, isFast ? 20 : 200);
        }
        return next;
      });
    }, intervalTime);

    // 5. Console logs scroll
    const logInterval = isFast ? 20 : 200;
    const logsTimer = setInterval(() => {
      setLogs((prev) => {
        if (prev.length < logDatabase.length) {
          return [...prev, logDatabase[prev.length]];
        }
        clearInterval(logsTimer);
        return prev;
      });
    }, logInterval);

    return () => {
      clearTimeout(hardTimeout);
      clearTimeout(skipTimer);
      clearInterval(progressTimer);
      clearInterval(logsTimer);
    };
  }, [reducedMotion, handleComplete]);

  if (!mounted || complete) return null;

  return (
    <div
      id="cinematic-loader"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050610] text-[#f7f9ff] font-space select-none p-4"
      style={{
        transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Glow background - skipped in battery saver */}
      {!batterySaver && (
        <div className="absolute w-[320px] md:w-[450px] h-[320px] md:h-[450px] rounded-full bg-indigo-600/10 filter blur-[80px] pointer-events-none" />
      )}

      <div className="relative flex flex-col items-center w-full max-w-[360px] mx-auto px-4">
        {/* Brand Shield Logo */}
        <div className="mb-6 animate-pulse">
          <LogoMark size={64} />
        </div>

        {/* Brand Header */}
        <div className="text-center mb-5">
          <h1 className="text-lg font-bold tracking-widest text-white uppercase leading-none">
            Swift Guard
          </h1>
          <p className="text-[9px] tracking-[0.4em] text-[#aab4ce] uppercase mt-1.5 leading-none">
            Logistics Command
          </p>
        </div>

        {/* Boot Logs Terminal */}
        <div className="w-full h-32 bg-[#090b19]/80 border border-[#91aae1]/16 rounded-xl p-4 overflow-y-auto mb-6 font-mono text-[9px] text-[#9da9c4] leading-relaxed flex flex-col justify-end max-w-full">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-indigo-400 select-none">&gt;</span>
              <span className="break-all">{log}</span>
            </div>
          ))}
          {logs.length < logDatabase.length && (
            <div className="flex gap-2 animate-pulse">
              <span className="text-indigo-400">&gt;</span>
              <span className="w-1 h-3 bg-[#9da9c4]" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-center text-[9px] text-[#9da9c4] mb-2 tracking-wider">
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

        {/* Skip button - appears after 1.2 seconds */}
        <div className="h-8 flex items-center justify-center">
          {showSkip && (
            <button
              onClick={handleComplete}
              className="text-[9px] font-bold tracking-widest uppercase border border-[#91aae1]/16 bg-white/5 text-white hover:bg-white/10 hover:border-[#91aae1]/30 px-3 py-1.5 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              Skip Boot Sequence
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
