"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, ArrowLeft } from "lucide-react";
import { businessConfig } from "@/config/business";
import Footer from "@/components/Footer";

export default function BookPage() {
  const [service, setService] = useState("Express Delivery");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState("Small (documents, keys, small envelope)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!pickup.trim()) newErrors.pickup = "Pickup location is required";
    if (!destination.trim()) newErrors.destination = "Destination is required";
    if (!name.trim()) newErrors.name = "Customer name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!details.trim()) newErrors.details = "Package details are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const deliveryTime = time || "As soon as possible";
    const extraInfo = instructions.trim() || "None";
    
    const messageText = 
`Hello Swift Guard Logistics, I want to book a delivery.

Service: ${service}
Pickup: ${pickup}
Destination: ${destination}
Preferred time: ${deliveryTime}
Package description: ${details}
Package size: ${size}
Customer name: ${name}
Customer phone: ${phone}
Extra instructions: ${extraInfo}

*Note: This request was composed via the dedicated Book page. Please verify and confirm booking.*`;

    const encodedText = encodeURIComponent(messageText);
    const whatsAppUrl = `${businessConfig.whatsAppBaseUrl}?text=${encodedText}`;

    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="min-h-screen pt-28 pb-16 flex flex-col bg-[#050610] text-[#f7f9ff]">
        <div className="max-w-2xl mx-auto w-full px-4 flex-grow">
          {/* Back to Command Desk */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6 focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Command Desk
          </Link>

          <div className="glass rounded-3xl p-6 md:p-8 border border-[#91aae1]/16 bg-[#0c0e22]/80 space-y-6">
            <div>
              <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
                DEDICATED DEPLOYMENT FORM
              </span>
              <h1 className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                Book a Delivery
              </h1>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Provide cargo parameters to prepare a dispatch dispatch request. Real pricing is verified on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="book-service-select" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Service Type
                  </label>
                  <select
                    id="book-service-select"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                  >
                    {businessConfig.services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Package Size */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="book-size-select" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Package Size
                  </label>
                  <select
                    id="book-size-select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                  >
                    <option>Small (documents, keys, small envelope)</option>
                    <option>Medium (groceries, standard boxes, shopping bags)</option>
                    <option>Large (bulk items, multiple heavy boxes)</option>
                  </select>
                </div>

                {/* Pickup Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="book-pickup-input" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Pickup Address *
                  </label>
                  <input
                    id="book-pickup-input"
                    type="text"
                    placeholder="Enter pickup location address"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 text-sm ${
                      errors.pickup ? "border-red-500" : "border-[#91aae1]/16"
                    }`}
                  />
                  {errors.pickup && <span className="text-[10px] text-red-400 mt-1">{errors.pickup}</span>}
                </div>

                {/* Destination Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="book-destination-input" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Destination Address *
                  </label>
                  <input
                    id="book-destination-input"
                    type="text"
                    placeholder="Enter target destination address"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 text-sm ${
                      errors.destination ? "border-red-500" : "border-[#91aae1]/16"
                    }`}
                  />
                  {errors.destination && <span className="text-[10px] text-red-400 mt-1">{errors.destination}</span>}
                </div>

                {/* Preferred time */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="book-time-input" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Preferred Time
                  </label>
                  <input
                    id="book-time-input"
                    type="text"
                    placeholder="e.g. As soon as possible"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                {/* Customer Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="book-name-input" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Sender Name *
                  </label>
                  <input
                    id="book-name-input"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 text-sm ${
                      errors.name ? "border-red-500" : "border-[#91aae1]/16"
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-red-400 mt-1">{errors.name}</span>}
                </div>

                {/* Customer Phone */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="book-phone-input" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Phone Number *
                  </label>
                  <input
                    id="book-phone-input"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 text-sm ${
                      errors.phone ? "border-red-500" : "border-[#91aae1]/16"
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-400 mt-1">{errors.phone}</span>}
                </div>

                {/* Package details */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="book-details-text" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Package Description *
                  </label>
                  <textarea
                    id="book-details-text"
                    placeholder="Describe the items we need to carry"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 text-sm min-h-[90px] resize-y ${
                      errors.details ? "border-red-500" : "border-[#91aae1]/16"
                    }`}
                  />
                  {errors.details && <span className="text-[10px] text-red-400 mt-1">{errors.details}</span>}
                </div>

                {/* Special instructions */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="book-instructions-text" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                    Special Instructions
                  </label>
                  <textarea
                    id="book-instructions-text"
                    placeholder="e.g. Call before arrival, leave with security"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 text-sm min-h-[70px] resize-y"
                  />
                </div>
              </div>

              {/* Estimate Preview */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[#84a8e8] text-xs">
                <span className="block font-bold uppercase tracking-wider text-[10px] mb-1">
                  ESTIMATED QUOTE STATUS
                </span>
                <strong className="block text-white text-sm mb-1">
                  Estimated quote pending confirmation
                </strong>
                <p className="text-[11px] text-[#8190ac] leading-normal">
                  Standard dispatch rates will compile once fields are matched by a supervisor. Confirm on WhatsApp.
                </p>
              </div>

              {/* Warnings */}
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {businessConfig.restrictedItemsNotice}
              </p>

              <div className="pt-2 border-t border-[#91aae1]/16 space-y-3">
                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center gap-2 py-4"
                >
                  <Send className="w-4 h-4" />
                  Continue on WhatsApp
                </button>
                <p className="text-[10px] text-center text-slate-400 leading-normal">
                  Notice: Submitting this form opens WhatsApp to send dispatch details to the operator. Booking is not finalized automatically.
                </p>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
