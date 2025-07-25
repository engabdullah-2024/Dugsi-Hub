'use client';
import React from 'react';

const DugsiHubLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dugsi Hub Modern DH Logo"
      role="img"
    >
      <defs>
        <linearGradient id="gradPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#9D174D" />
        </linearGradient>
      </defs>

      {/* Outer shape of D */}
      <path
        d="M18 14 
           C26 14 30 20 30 32
           C30 44 26 50 18 50
           H14 V14
           H18 Z"
        fill="url(#gradPink)"
      />

      {/* Inner negative space of D */}
      <path
        d="M22 22 
           C26 22 28 27 28 32
           C28 37 26 42 22 42
           H20 V22
           H22 Z"
        fill="white"
      />

      {/* Vertical bar of H */}
      <rect x="34" y="14" width="6" height="36" rx="2" fill="url(#gradPink)" />

      {/* Right bar of H */}
      <rect x="46" y="14" width="6" height="36" rx="2" fill="url(#gradPink)" />

      {/* Connecting bar of H */}
      <rect x="34" y="30" width="18" height="6" rx="3" fill="url(#gradPink)" />

      {/* Tech nodes */}
      <circle cx="20" cy="18" r="3" fill="#9D174D" />
      <circle cx="50" cy="18" r="3" fill="#9D174D" />
      <circle cx="40" cy="46" r="3" fill="#F472B6" />

      {/* Circuit lines */}
      <line
        x1="20"
        y1="18"
        x2="40"
        y2="46"
        stroke="#9D174D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="18"
        x2="40"
        y2="46"
        stroke="#9D174D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DugsiHubLogo;
