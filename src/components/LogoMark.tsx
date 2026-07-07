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
        {/* Shield Backing Gradient */}
        <linearGradient id="sgLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2b8cff" />
          <stop offset="50%" stopColor="#7048ff" />
          <stop offset="100%" stopColor="#ff2ca8" />
        </linearGradient>
        {/* Monogram Glow Filter */}
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Futuristic Shield Silhouette */}
      <path
        d="M32 4C42.5 10 53 11.5 53 11.5V29C53 43 43.5 53.5 32 60C20.5 53.5 11 43 11 29V11.5C11 11.5 21.5 10 32 4Z"
        fill="url(#sgLogoGrad)"
        opacity="0.95"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.15"
      />

      {/* Styled Route Monogram "SG" Interlocking path */}
      {/* Monogram S: Curving from top right to bottom left */}
      <path
        d="M38 20H26C23 20 23 27 26 28.5L38 31.5C41 33 41 40 38 41.5H26"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Monogram G: Circular back curve and target arrow */}
      <path
        d="M36 29H42V40C42 42.5 39.5 44 37 44H29C25 44 23.5 41 23.5 37"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Motion / Arrow Node indicating logistics speed */}
      <path
        d="M42 27.5L46 31.5L42 35.5"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
