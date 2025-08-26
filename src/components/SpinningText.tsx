// components/SpinningTextSVG.tsx
"use client";

import React from "react";

export default function SpinningTextSVG({ text = "active now" }: { text?: string }) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <svg
        className="w-24 h-24"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="circlePath"
            d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          />
        </defs>
        <text
          fontSize="8"
          fontWeight="600"
          letterSpacing="2"
          className="fill-purple-600 dark:fill-purple-400"
        >
          <textPath
            href="#circlePath"
            startOffset="0%"
            className="animate-spin-slower"
          >
            {text.repeat(5)} {/* repeat to fill circle */}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
