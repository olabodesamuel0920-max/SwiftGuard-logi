import React from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import { businessConfig } from "@/config/business";

export default function ContactSection() {
  return (
    <section className="py-20 border-b border-[#91aae1]/10 bg-[#050610] relative" id="contact">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="font-space text-[10px] tracking-[0.2em] text-indigo-400 uppercase font-semibold">
                DISPATCH DESK
              </span>
              <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
                Establish Connection
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl">
                Get in touch with our operations staff to initiate a dispatch or query custom pricing for bulk deliveries.
              </p>
            </div>

            {/* Direct buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={businessConfig.callLink}
                className="btn btn-primary flex items-center gap-3 py-3.5 px-6 rounded-xl hover:translate-y-[-2px] transition-transform duration-200"
              >
                <Phone className="w-4 h-4" />
                Call Dispatch ({businessConfig.callDisplay})
              </a>

              <a
                href={businessConfig.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex items-center gap-3 py-3.5 px-6 rounded-xl border border-[#91aae1]/16 bg-white/3 hover:bg-white/5 hover:translate-y-[-2px] transition-transform duration-200"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                WhatsApp Chat
              </a>
            </div>

            {/* Fictional operating city and service areas display */}
            <div className="glass p-5 rounded-2xl border border-[#91aae1]/10 bg-[#0c0e22]/50">
              <span className="text-[10px] tracking-wider text-[#9eadd0] uppercase font-bold block mb-3">
                Service Boundaries ({businessConfig.operatingCityPlaceholder})
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                {businessConfig.serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details Dashboard Card */}
          <div className="lg:col-span-6 glass rounded-3xl p-6 md:p-8 border border-[#91aae1]/16 bg-[#0c0e22]/80 space-y-6">
            <h3 className="font-space text-lg font-bold text-white mb-4">
              Operational Metadata
            </h3>

            <div className="space-y-4 text-sm">
              {/* Call Details */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#91aae1]/10 bg-white/5 text-indigo-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Call Center
                  </span>
                  <a href={businessConfig.callLink} className="text-white hover:text-indigo-400 transition-colors">
                    {businessConfig.callDisplay} (International: +2349030427190)
                  </a>
                </div>
              </div>

              {/* WhatsApp Details */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#91aae1]/10 bg-white/5 text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    WhatsApp Channels
                  </span>
                  <a
                    href={businessConfig.whatsAppBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-indigo-400 transition-colors"
                  >
                    {businessConfig.whatsAppDisplay}
                  </a>
                </div>
              </div>

              {/* Email Details */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#91aae1]/10 bg-white/5 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Support Email
                  </span>
                  <span className="text-white select-all">
                    {businessConfig.emailPlaceholder}
                  </span>
                </div>
              </div>

              {/* Address Details */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#91aae1]/10 bg-white/5 text-purple-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Office Address
                  </span>
                  <address className="text-white not-italic">
                    {businessConfig.addressPlaceholder}
                  </address>
                </div>
              </div>

              {/* Operating Hours Details */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#91aae1]/10 bg-white/5 text-[#70ffc6]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Operating Standard Hours
                  </span>
                  <span className="text-white">
                    {businessConfig.operatingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning block for restricted items */}
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 text-xs text-red-300">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <div>
                <strong className="block mb-0.5 uppercase tracking-wider text-[10px]">Restricted Cargo Alert</strong>
                <p className="text-[11px] text-red-300/80 leading-normal">
                  {businessConfig.restrictedItemsNotice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
