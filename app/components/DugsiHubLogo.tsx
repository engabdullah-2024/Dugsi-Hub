'use client'
import React from "react";

const DugsiHubLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Dugsi Hub Logo"
      role="img"
    >
      {/* Book icon */}
      <path
        d="M12 10H52V44H12V10Z"
        fill="#EC4899"
        stroke="#9D174D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10L32 26L52 10"
        stroke="#F472B6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tech pixel dots */}
      <circle cx="16" cy="50" r="3" fill="#9D174D" />
      <circle cx="24" cy="54" r="3" fill="#F472B6" />
      <circle cx="40" cy="52" r="3" fill="#9D174D" />
      <circle cx="48" cy="56" r="3" fill="#F472B6" />

      {/* Text "DH" stylized */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="#ffffff"
        pointerEvents="none"
      >
        DH
      </text>
    </svg>
  );
};

export default DugsiHubLogo;
