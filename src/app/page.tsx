"use client";

import React from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Tracking from "@/components/Tracking";
import InstantQuote from "@/components/InstantQuote";
import NightOwl from "@/components/NightOwl";
import Business from "@/components/Business";
import DashboardPreviews from "@/components/DashboardPreviews";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 3D City Hero Scene */}
      <Hero />

      {/* Interactive Orbit Selector */}
      <Services />

      {/* DNA Progress Step Tracker */}
      <Journey />

      {/* Tracking simulator command console */}
      <Tracking />

      {/* Interactive Quote terminal */}
      <InstantQuote />

      {/* Night Owl environment transformer */}
      <NightOwl />

      {/* Fictional dispatch portal */}
      <Business />

      {/* Dashboard Preview grids */}
      <DashboardPreviews />

      {/* Trust Pillars */}
      <TrustSection />

      {/* FAQs */}
      <FAQ />

      {/* Address and details section */}
      <ContactSection />

      {/* Consolidated Footer */}
      <Footer />
    </>
  );
}
