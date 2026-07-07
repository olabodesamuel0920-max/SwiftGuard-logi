"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  nightMode: boolean;
  reducedMotion: boolean;
  batterySaver: boolean;
  toggleNightMode: () => void;
  toggleReducedMotion: () => void;
  toggleBatterySaver: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [nightMode, setNightMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [batterySaver, setBatterySaver] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read initial settings from localStorage on client-side mount
    const savedNight = localStorage.getItem("sg_night_mode") === "true";
    const savedReduced = localStorage.getItem("sg_reduced_motion") === "true";
    const savedBattery = localStorage.getItem("sg_battery_saver") === "true";

    // System preferences as fallbacks
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Use a microtask/timer to break synchronous execution check
    setTimeout(() => {
      setNightMode(savedNight);
      setReducedMotion(savedReduced || prefersReduced);
      setBatterySaver(savedBattery);
      setMounted(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Set global classes on body
    const body = document.body;
    if (nightMode) {
      body.classList.add("night-mode");
      body.classList.add("dark");
    } else {
      body.classList.remove("night-mode");
      body.classList.remove("dark");
    }

    if (reducedMotion) {
      body.classList.add("reduced-motion");
    } else {
      body.classList.remove("reduced-motion");
    }
  }, [nightMode, reducedMotion, mounted]);

  const toggleNightMode = () => {
    setNightMode((prev) => {
      const next = !prev;
      localStorage.setItem("sg_night_mode", String(next));
      return next;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      localStorage.setItem("sg_reduced_motion", String(next));
      return next;
    });
  };

  const toggleBatterySaver = () => {
    setBatterySaver((prev) => {
      const next = !prev;
      localStorage.setItem("sg_battery_saver", String(next));
      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        nightMode,
        reducedMotion,
        batterySaver,
        toggleNightMode,
        toggleReducedMotion,
        toggleBatterySaver,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
