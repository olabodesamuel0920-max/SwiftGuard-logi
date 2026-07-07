import React from "react";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export default function LogoMark({ className = "", size = 44 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Swift Guard Logistics Logo"
    >
      <defs>
        <linearGradient id="sgShieldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b8cff" />
          <stop offset="52%" stopColor="#6f4cff" />
          <stop offset="100%" stopColor="#ff2ca8" />
        </linearGradient>
      </defs>
      {/* Outer shield structure */}
      <path
        d="M32 4L53 12V29C53 42.8 44.1 53.6 32 60C19.9 53.6 11 42.8 11 29V12L32 4Z"
        fill="url(#sgShieldGradient)"
        opacity="0.95"
      />
      {/* Pulse vector / route line */}
      <path
        d="M18 34H29L35 22L40 29H47"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheel design indicating logistics mobility */}
      <circle
        cx="22"
        cy="40"
        r="5.5"
        fill="#071022"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />
      <circle
        cx="42"
        cy="40"
        r="5.5"
        fill="#071022"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />
    </svg>
  );
}
