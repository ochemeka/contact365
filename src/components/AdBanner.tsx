"use client";

import React, { useEffect, useState } from "react";

interface AdBannerProps {
  /** For AdSense / external ad networks */
  client?: string;
  slot?: string;

  /** For local ads */
  localSrc?: string;
  alt?: string;
  height?: number | string;

  /** Custom styles / classes */
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  client,
  slot,
  localSrc,
  alt,
  height = 250,
  className,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageError, setImageError] = useState(false);

  // 🔹 Auto-refresh local ads every 60s
  useEffect(() => {
    if (localSrc) {
      const interval = setInterval(() => {
        setRefreshKey((k) => k + 1);
        setImageError(false);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [localSrc]);

  // 🔹 Google AdSense init
  useEffect(() => {
    if (client && slot && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error", e);
      }
    }
  }, [client, slot, refreshKey]);

  // ✅ Case 1: Local ad
  if (localSrc) {
    if (imageError) {
      return (
        <div
          className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center ${className}`}
          style={{ height }}
        >
          <span className="text-gray-500 text-sm">Ad Space</span>
        </div>
      );
    }

    return (
      <div key={refreshKey} className={`w-full ${className}`}>
        <img
          src={localSrc}
          alt={alt || "Sponsored Ad"}
          onError={() => setImageError(true)}
          className="w-full rounded-xl shadow hover:shadow-lg transition-all duration-300"
          style={{ height }}
          loading="lazy"
        />
      </div>
    );
  }

  // ✅ Case 2: Google AdSense ad
  if (client && slot) {
    return (
      <ins
        key={refreshKey}
        className={`adsbygoogle ${className || ""}`}
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }

  // ✅ Fallback if no props provided
  return (
    <div
      className={`w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <span className="text-gray-500 text-sm">Ad Space</span>
    </div>
  );
};

export default AdBanner;
