export interface ServiceInfo {
  id: string;
  name: string;
  copy: string;
  icon: string;
  features: string[];
}

export interface TrackingStep {
  status: string;
  text?: string;
  eta: string;
  rider: string;
  time: string;
  percent: number; // progress percentage along the route
  description: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  callDisplay: string;
  callLink: string;
  whatsAppDisplay: string;
  whatsAppDisplayInt: string;
  whatsAppBaseUrl: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  operatingCityPlaceholder: string;
  serviceAreas: string[];
  operatingHours: string;
  nightOwlHours: string;
  socialLinks: { platform: string; url: string }[];
  restrictedItemsNotice: string;
  pricingRules: {
    baseRates: Record<string, number>;
    expressMultiplier: number;
    nightOwlSurcharge: number;
    extraStopFee: number;
  };
  demoTracking: Record<string, TrackingStep[]>;
  services: ServiceInfo[];
}

export const businessConfig: BusinessConfig = {
  name: "Swift Guard Logistics",
  tagline: "On time, every time",
  callDisplay: "09030427190",
  callLink: "tel:+2349030427190",
  whatsAppDisplay: "09137231057",
  whatsAppDisplayInt: "+2349137231057",
  whatsAppBaseUrl: "https://wa.me/2349137231057",
  emailPlaceholder: "To be confirmed",
  addressPlaceholder: "To be confirmed",
  operatingCityPlaceholder: "To be confirmed",
  serviceAreas: [
    "Service details confirmed during booking"
  ],
  operatingHours: "To be confirmed",
  nightOwlHours: "Service details confirmed during booking",
  socialLinks: [
    { platform: "Twitter", url: "#" },
    { platform: "Instagram", url: "#" }
  ],
  restrictedItemsNotice: "For security and regulatory compliance, Swift Guard Logistics does NOT transport: cash, jewelry, luxury watches, ammunition/weapons, flammable materials, illegal substances, or fragile glass items without special clearance.",
  pricingRules: {
    baseRates: {
      "Supermarket Runs": 2500,
      "Park Runs": 3000,
      "Personal Errands": 2000,
      "Business Deliveries": 3500,
      "Night Owl Service": 4500,
      "Same-Day Delivery": 2500,
      "Door-to-Door Delivery": 2800,
      "Express Delivery": 4000
    },
    expressMultiplier: 1.5,
    nightOwlSurcharge: 1500,
    extraStopFee: 1000
  },
  demoTracking: {
    "SGL-804219": [
      {
        status: "BOOKING CONFIRMED",
        eta: "28 MIN",
        rider: "SG-07",
        time: "12:04 PM",
        percent: 5,
        description: "Your delivery details enter the command centre."
      },
      {
        status: "RIDER ASSIGNED",
        eta: "24 MIN",
        rider: "SG-07",
        time: "12:09 PM",
        percent: 25,
        description: "An available rider is assigned to the mission."
      },
      {
        status: "PACKAGE COLLECTED",
        eta: "18 MIN",
        rider: "SG-07",
        time: "12:22 PM",
        percent: 50,
        description: "Pickup is confirmed and your item is secured."
      },
      {
        status: "IN TRANSIT",
        eta: "10 MIN",
        rider: "SG-07",
        time: "12:30 PM",
        percent: 75,
        description: "Status updates keep you informed as it moves."
      },
      {
        status: "DELIVERED SAFELY",
        text: "Delivered",
        eta: "0 MIN",
        rider: "SG-07",
        time: "12:44 PM",
        percent: 100,
        description: "Handover is confirmed with proof of delivery."
      }
    ]
  },
  services: [
    {
      id: "supermarket",
      name: "Supermarket Runs",
      copy: "Send your shopping list. We collect, verify and deliver your essentials.",
      icon: "▦",
      features: [
        "Verified collection process",
        "WhatsApp status updates",
        "Secure handling from pickup to handover"
      ]
    },
    {
      id: "park-runs",
      name: "Park Runs",
      copy: "Parcel and waybill pickup or drop-off at approved motor parks.",
      icon: "⌂",
      features: [
        "Waybill verification and check-in",
        "Secure motor park coordination",
        "Fast dispatch to transport companies"
      ]
    },
    {
      id: "errands",
      name: "Personal Errands",
      copy: "A reliable extra pair of hands for time-sensitive personal errands.",
      icon: "◎",
      features: [
        "Dedicated runner assigned",
        "Custom errand check-ins",
        "Confidential and reliable handling"
      ]
    },
    {
      id: "business",
      name: "Business Deliveries",
      copy: "Structured daily dispatch support for vendors, stores and growing teams.",
      icon: "▤",
      features: [
        "Multi-drop delivery routes",
        "End-of-day dispatch logs",
        "Dedicated vendor portal access"
      ]
    },
    {
      id: "night-owl",
      name: "Night Owl Service",
      copy: "Selected after-hours delivery support with safety-first coordination.",
      icon: "◒",
      features: [
        "Late-hour secure coordination",
        "Approved transit corridors",
        "Real-time safety command center tracking"
      ]
    },
    {
      id: "same-day",
      name: "Same-Day Delivery",
      copy: "Priority delivery within the same day, subject to location and availability.",
      icon: "◷",
      features: [
        "Standard local dispatch lanes",
        "Signature on delivery",
        "Budget-friendly prompt delivery"
      ]
    },
    {
      id: "door-to-door",
      name: "Door-to-Door Delivery",
      copy: "Direct pickup and delivery from the sender’s door to the receiver’s door.",
      icon: "⇢",
      features: [
        "No drop-off point hassle",
        "Direct point-to-point courier",
        "Contactless option available"
      ]
    },
    {
      id: "express",
      name: "Express Delivery",
      copy: "Our fastest priority lane for urgent, time-critical requests.",
      icon: "⚡",
      features: [
        "Instant dispatch queue priority",
        "Fastest route navigation",
        "Real-time dispatch alert notifications"
      ]
    }
  ]
};
