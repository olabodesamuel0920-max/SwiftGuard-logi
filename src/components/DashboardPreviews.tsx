"use client";

import React, { useState } from "react";
import { User, Shield, Compass, MapPin, Download, HardDrive, ListFilter } from "lucide-react";

export default function DashboardPreviews() {
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer");

  const mockCustomerOrders = [
    { code: "SGL-804219", service: "Express Delivery", status: "In Transit", date: "Today, 12:22 PM" },
    { code: "SGL-799420", service: "Same-Day Delivery", status: "Delivered", date: "Yesterday, 3:15 PM" },
    { code: "SGL-785112", service: "Park Runs", status: "Delivered", date: "04 July 2026" }
  ];

  const mockAdminRiders = [
    { id: "SG-07", zone: "Central Command District", status: "Active - Transit", parcel: "SGL-804219" },
    { id: "SG-03", zone: "West Wing Hub", status: "Active - Pickup", parcel: "SGL-805112" },
    { id: "SG-12", zone: "East Industrial Node", status: "Standby - Station", parcel: "None" }
  ];

  const mockAdminLogs = [
    "[12:22 PM] SGL-804219 package pickup logged by SG-07",
    "[12:09 PM] SGL-804219 assigned to rider unit SG-07",
    "[12:04 PM] SGL-804219 booking confirmed at secure core desk",
    "[11:45 AM] SGL-805112 dispatcher bypass trigger activated"
  ];

  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#050610]" id="dashboard-previews">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            INTERFACE PORTALS
          </span>
          <h2 className="font-space text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
            Logistics Dashboard Previews
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Switch between the Customer portal and Admin command centre views below.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1.5 rounded-2xl bg-[#090b19]/80 border border-[#91aae1]/16 max-w-md w-full">
            <button
              onClick={() => setActiveTab("customer")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-space text-xs font-semibold tracking-wider transition-all focus:outline-none ${
                activeTab === "customer"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-[#c8d0e2] hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              Customer Panel
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-space text-xs font-semibold tracking-wider transition-all focus:outline-none ${
                activeTab === "admin"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-[#c8d0e2] hover:text-white"
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin Command Deck
            </button>
          </div>
        </div>

        {/* Display Panel */}
        <div className="glass rounded-[30px] p-6 md:p-8 border border-[#91aae1]/16 bg-[#0c0e22]/70 max-w-4xl mx-auto relative overflow-hidden">
          
          {/* Header watermark */}
          <div className="flex justify-between items-center text-[9px] text-[#8ea2c9] border-b border-[#91aae1]/10 pb-4 mb-6">
            <span>PORTAL REVENUE PREVIEW</span>
            <span className="font-bold tracking-widest font-mono text-indigo-400">
              [DEMO DATA &mdash; DESIGN PREVIEW]
            </span>
          </div>

          {activeTab === "customer" ? (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/2">
                  <span className="block text-[8px] text-slate-400 font-semibold tracking-wider uppercase">Wallet Balance</span>
                  <strong className="block text-white text-lg font-space mt-1 font-bold">₦ 24,500 *</strong>
                </div>
                <div className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/2">
                  <span className="block text-[8px] text-slate-400 font-semibold tracking-wider uppercase">Active Shipments</span>
                  <strong className="block text-indigo-400 text-lg font-space mt-1 font-bold">1 order transit</strong>
                </div>
                <div className="p-4 rounded-xl border border-[#91aae1]/10 bg-white/2">
                  <span className="block text-[8px] text-slate-400 font-semibold tracking-wider uppercase">Corporate Tier</span>
                  <strong className="block text-cyan-400 text-lg font-space mt-1 font-bold">Level 1 Vendor</strong>
                </div>
              </div>

              {/* Order History Table */}
              <div>
                <h4 className="font-space text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-indigo-400" />
                  Recent Dispatch Tasks
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-[#91aae1]/12 text-slate-400">
                        <th className="py-2.5 font-semibold">Reference</th>
                        <th className="py-2.5 font-semibold">Service</th>
                        <th className="py-2.5 font-semibold">Status</th>
                        <th className="py-2.5 font-semibold">Date</th>
                        <th className="py-2.5 text-right font-semibold">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#91aae1]/8">
                      {mockCustomerOrders.map((order) => (
                        <tr key={order.code}>
                          <td className="py-3 font-mono font-semibold text-white">{order.code}</td>
                          <td className="py-3">{order.service}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              order.status === "In Transit" ? "bg-blue-900/40 text-blue-300 border border-blue-500/20" : "bg-emerald-900/40 text-emerald-300 border border-emerald-500/20"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400">{order.date}</td>
                          <td className="py-3 text-right">
                            <button
                              title="Download Receipt (Demo)"
                              className="p-1 rounded bg-white/5 border border-[#91aae1]/10 text-[#aab6d2] hover:text-white"
                            >
                              <Download className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Saved Locations */}
              <div className="p-4 rounded-xl border border-[#91aae1]/8 bg-[#0b0f22]/50 flex flex-wrap gap-4 items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#c8d0e2] uppercase">
                  Saved Destinations:
                </span>
                <div className="flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1.5 bg-white/3 border border-[#91aae1]/10 px-2.5 py-1 rounded-lg text-white">
                    <MapPin className="w-3 h-3 text-blue-400" /> Office (Command District)
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/3 border border-[#91aae1]/10 px-2.5 py-1 rounded-lg text-white">
                    <MapPin className="w-3 h-3 text-pink-400" /> Warehouse (Substation North)
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rider unit fleet */}
                <div className="space-y-3">
                  <h4 className="font-space text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-violet-400" />
                    Rider Unit Fleet
                  </h4>
                  <div className="space-y-2">
                    {mockAdminRiders.map((rider) => (
                      <div
                        key={rider.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-[#91aae1]/8 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <strong className="text-white font-mono">{rider.id}</strong>
                          <span className="text-slate-400">{rider.zone.split(" ")[0]} Area</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold text-indigo-300 text-[10px]">{rider.status}</span>
                          <span className="block text-[9px] text-slate-500 font-mono">Task: {rider.parcel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dispatch core logs */}
                <div className="space-y-3">
                  <h4 className="font-space text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <ListFilter className="w-4 h-4 text-pink-400" />
                    Dispatch Core Logs
                  </h4>
                  <div className="bg-[#0b0f22] border border-[#91aae1]/12 rounded-xl p-4 h-[164px] overflow-y-auto font-mono text-[9px] text-[#9da9c4] space-y-2">
                    {mockAdminLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-pink-500 select-none">&gt;&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer warning */}
          <div className="mt-6 pt-4 border-t border-[#91aae1]/10 text-slate-500 text-[10px] leading-relaxed">
            * Note: Wallet balances, transaction tables, and rider states are simulated mock objects to demonstrate visual interface features. No actual financial or transport databases are connected to this preview.
          </div>
        </div>
      </div>
    </section>
  );
}
