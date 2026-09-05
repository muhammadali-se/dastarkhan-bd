import React from 'react';

interface DastarkhanEmblemProps {
  className?: string;
  size?: number;
}

export const DastarkhanEmblem: React.FC<DastarkhanEmblemProps> = ({
  className = "w-8 h-8",
  size = 32
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dastarkhan Restaurant and Banquet Hall Emblem"
    >
      {/* Outer Islamic Arch / Dome Frame */}
      <path
        d="M50 8C38 20 16 28 16 54C16 78 28 92 50 92C72 92 84 78 84 54C84 28 62 20 50 8Z"
        stroke="url(#dastarkhan-gold-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(254, 214, 91, 0.05)"
      />

      {/* Crescent Moon & Star at apex */}
      <path
        d="M50 14C53 14 55 16 55 18C52 18 50 16 50 14Z"
        fill="#fed65b"
      />
      <circle cx="50" cy="8" r="2.5" fill="#fed65b" />

      {/* Cutlery Motif inside Dome (Spoon & Fork Crossed with Elegant Stem) */}
      <g stroke="url(#dastarkhan-gold-grad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Fork */}
        <path d="M40 32V44C40 48 44 51 47 53V76" />
        <path d="M36 32V40C36 43 38 45 40 45" />
        <path d="M44 32V40C44 43 42 45 40 45" />
        {/* Spoon */}
        <path d="M60 32C64 32 66 36 66 41C66 46 63 49 60 49C57 49 54 46 54 41C54 36 56 32 60 32Z" />
        <path d="M58 49C56 50 53 52 53 55V76" />
      </g>

      {/* Decorative Golden Culinary Waves at bottom */}
      <path
        d="M30 80C36 77 43 83 50 80C57 77 64 83 70 80"
        stroke="#fed65b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M36 86C41 84 46 88 50 86C54 84 59 88 64 86"
        stroke="#d4af37"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="dastarkhan-gold-grad" x1="16" y1="8" x2="84" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef08a" />
          <stop offset="0.5" stopColor="#fed65b" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  );
};
