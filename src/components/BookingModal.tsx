"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { businessConfig } from "@/config/business";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({ isOpen, onClose, defaultService = "Express Delivery" }: BookingModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  
  const [service, setService] = useState(defaultService);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState("Small (documents, keys, small envelope)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setService(defaultService);
      }, 0);
      panelRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, defaultService]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate fields
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

    // Create message content
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

*Note: This request was composed via the Command Centre booking portal. Please verify and confirm booking.*`;

    // Construct URL
    const encodedText = encodeURIComponent(messageText);
    const whatsAppUrl = `${businessConfig.whatsAppBaseUrl}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    
    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass p-6 md:p-8 outline-none animate-scale-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute right-6 top-6 p-2 rounded-xl border border-[#91aae1]/16 bg-white/5 text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
            NEW BOOKING REQUEST
          </span>
          <h2 id="booking-title" className="font-space text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
            Book a Dispatch
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service Selection */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-service" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Service Type
              </label>
              <select
                id="modal-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500"
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
              <label htmlFor="modal-size" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Package Size
              </label>
              <select
                id="modal-size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500"
              >
                <option>Small (documents, keys, small envelope)</option>
                <option>Medium (groceries, standard boxes, shopping bags)</option>
                <option>Large (bulk items, multiple heavy boxes)</option>
              </select>
            </div>

            {/* Pickup Location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-pickup" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Pickup Address *
              </label>
              <input
                id="modal-pickup"
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 ${
                  errors.pickup ? "border-red-500" : "border-[#91aae1]/16"
                }`}
              />
              {errors.pickup && <span className="text-[10px] text-red-400 mt-1">{errors.pickup}</span>}
            </div>

            {/* Destination Location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-destination" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Destination Address *
              </label>
              <input
                id="modal-destination"
                type="text"
                placeholder="Enter destination location"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 ${
                  errors.destination ? "border-red-500" : "border-[#91aae1]/16"
                }`}
              />
              {errors.destination && <span className="text-[10px] text-red-400 mt-1">{errors.destination}</span>}
            </div>

            {/* Preferred Delivery Time */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-time" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Preferred Time
              </label>
              <input
                id="modal-time"
                type="text"
                placeholder="As soon as possible / Specific hour"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>

            {/* Customer Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="modal-name" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Your Name *
              </label>
              <input
                id="modal-name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 ${
                  errors.name ? "border-red-500" : "border-[#91aae1]/16"
                }`}
              />
              {errors.name && <span className="text-[10px] text-red-400 mt-1">{errors.name}</span>}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="modal-phone" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Phone Number *
              </label>
              <input
                id="modal-phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 ${
                  errors.phone ? "border-red-500" : "border-[#91aae1]/16"
                }`}
              />
              {errors.phone && <span className="text-[10px] text-red-400 mt-1">{errors.phone}</span>}
            </div>

            {/* Package details */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="modal-details" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Package / Request Details *
              </label>
              <textarea
                id="modal-details"
                placeholder="Describe what we are collecting and delivering"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={`w-full border p-3 rounded-xl bg-[#0b0f22] text-white outline-none focus:border-indigo-500 min-h-[90px] resize-y ${
                  errors.details ? "border-red-500" : "border-[#91aae1]/16"
                }`}
              />
              {errors.details && <span className="text-[10px] text-red-400 mt-1">{errors.details}</span>}
            </div>

            {/* Extra instructions */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="modal-instructions" className="text-[10px] font-semibold tracking-wider text-[#9eadd0] uppercase">
                Special Instructions (e.g. gate code, receiver phone)
              </label>
              <textarea
                id="modal-instructions"
                placeholder="Any special handling guidelines or dispatch codes"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full border border-[#91aae1]/16 bg-[#0b0f22] text-white p-3 rounded-xl outline-none focus:border-indigo-500 min-h-[70px] resize-y"
              />
            </div>
          </div>

          {/* Pricing Estimation Warning */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[#84a8e8] text-xs">
            <span className="block font-bold uppercase tracking-wider text-[10px] mb-1">
              ESTIMATED QUOTE
            </span>
            <strong className="block text-white text-sm mb-1">
              Confirmed on WhatsApp
            </strong>
            <p className="text-[11px] text-[#8190ac] leading-normal">
              Final pricing depends on operating locations, timing, and item size. Standard base rate ranges apply.
            </p>
          </div>

          {/* Regulatory safety warnings */}
          <p className="text-[10px] text-slate-500 leading-relaxed">
            {businessConfig.restrictedItemsNotice}
          </p>

          <div className="pt-2 border-t border-[#91aae1]/16 flex flex-col gap-3">
            <button
              type="submit"
              className="btn btn-primary full w-full flex items-center justify-center gap-2 py-4"
            >
              <Send className="w-4 h-4" />
              Continue on WhatsApp
            </button>
            <p className="text-[10px] text-center text-slate-400 leading-normal">
              Notice: Submitting this form will open a pre-filled WhatsApp message. Your booking is NOT finalized until confirmed by dispatch.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
