"use client";

import { useEffect } from "react";

interface AdBannerProps {
  client: string;
  slot: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ client, slot, className }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Initialize ads
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error", e);
      }
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;
