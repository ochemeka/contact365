// src/app/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// Mock businesses data (for UI/UX only)
const mockBusinesses = [
  {
    slug: "tech-solutions",
    name: "Tech Solutions",
    description: "Innovative IT services and solutions tailored for modern businesses.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format",
  },
  {
    slug: "green-farms",
    name: "Green Farms",
    description: "Sustainable agriculture and organic food supplies.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format",
  },
  {
    slug: "health-plus",
    name: "Health Plus",
    description: "Your trusted partner in healthcare and wellness.",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1580281657521-4e7bb744a4a1?w=800&auto=format",
  },
];

export default function BusinessDetail() {
  const params = useParams();
  const [slug, setSlug] = useState<string | null>(null);

  // Simulate extracting slug
  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug as string);
    }
  }, [params]);

  if (!slug) return <p className="p-6">Loading...</p>;

  const business = mockBusinesses.find((b) => b.slug === slug);

  if (!business) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Business not found</h1>
        <p className="text-gray-500 mt-2">Try exploring other listings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Image */}
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-80 object-cover rounded-2xl shadow"
      />

      {/* Info */}
      <div className="mt-6">
        <span className="text-sm uppercase text-purple-600 font-semibold">
          {business.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {business.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
          {business.description}
        </p>
      </div>
    </div>
  );
}
