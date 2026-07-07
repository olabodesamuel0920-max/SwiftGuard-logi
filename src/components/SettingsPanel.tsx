"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { X, Sliders, Moon, Zap, EyeOff } from "lucide-react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const {
    nightMode,
    reducedMotion,
    batterySaver,
    toggleNightMode,
    toggleReducedMotion,
    toggleBatterySaver,
  } = useTheme();

  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Focus on the panel when opened
      panelRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-end p-4 md:p-6 pointer-events-none">
      {/* Click backdrop to close */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Settings Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="relative w-full max-w-sm rounded-2xl glass p-6 pointer-events-auto outline-none animate-slide-in mt-16"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h2 id="settings-title" className="font-space text-lg font-semibold tracking-wider uppercase text-white">
              Core Preferences
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close preferences panel"
            className="p-2 rounded-lg border border-[#91aae1]/16 bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Night Owl Theme */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <Moon className="w-4 h-4 text-violet-400" /> Night Owl Mode
              </span>
              <span className="text-xs text-slate-400">
                Switch to ultra-dark nocturnal interface
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={nightMode}
                onChange={toggleNightMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white"></div>
            </label>
          </div>

          {/* Battery / Weak Device Saver */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Weak Device Fallback
              </span>
              <span className="text-xs text-slate-400">
                Disable WebGL 3D city scene for static SVG layout
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={batterySaver}
                onChange={toggleBatterySaver}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 peer-checked:after:bg-white"></div>
            </label>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-white flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-pink-400" /> Reduced Motion
              </span>
              <span className="text-xs text-slate-400">
                Minimize parallax and transit animations
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={toggleReducedMotion}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600 peer-checked:after:bg-white"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#91aae1]/16 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Interface Preview Version: 1.0</span>
          <span>Configurable: LocalStorage</span>
        </div>
      </div>
    </div>
  );
}
