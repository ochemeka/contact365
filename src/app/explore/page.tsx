// src/app/explore/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ✅ Safe Ad component (auto-refresh every 60s)
const Ad = ({ localSrc, alt, style }: any) => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRefreshKey((k) => k + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div key={refreshKey} className="w-full">
      <img
        src={localSrc}
        alt={alt}
        className="w-full rounded-xl shadow hover:shadow-lg transition"
        style={style}
      />
    </div>
  );
};

export default function ExplorePage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [price, setPrice] = useState(500);
  const [activeCategory, setActiveCategory] = useState("View All");

  // ✅ Ads
  const adImages = [
    "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format", // Tech Ad
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format", // Real Estate Ad
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format", // SaaS Ad
  ];

  // ✅ Mock fetch with real service images per category
  const categoryImages: Record<string, string[]> = {
    Places: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    ],
    Events: [
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    ],
    Jobs: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      "https://images.unsplash.com/photo-1581090700227-4d6d6c116c1a",
    ],
    "Real Estate": [
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],
    Cars: [
      "https://images.unsplash.com/photo-1533777324565-a040eb52fac1",
      "https://images.unsplash.com/photo-1571607381950-017f9c17f5a4",
    ],
  };

  const categories = ["View All", "Places", "Events", "Jobs", "Real Estate", "Cars"];

  const fetchItems = async (pageNum: number) => {
    const cats = ["Places", "Events", "Jobs", "Real Estate", "Cars"];
    const newItems = Array.from({ length: 6 }).map((_, i) => {
      const category = cats[(pageNum * i) % cats.length];
      const images = categoryImages[category];
      return {
        id: `${pageNum}-${i}`,
        title: `${category} Service ${(pageNum - 1) * 6 + i + 1}`,
        location: "Lagos, Nigeria",
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
        price: Math.floor(Math.random() * 1000) + 100,
        category,
        image: images[i % images.length] + "?auto=format&fit=crop&w=600&q=80",
      };
    });
    return newItems;
  };

  // ✅ Initial load
  useEffect(() => {
    fetchItems(1).then(setItems);
  }, []);

  // ✅ Load more (manual button)
  const loadMore = () => {
    fetchItems(page + 1).then((newItems) => {
      if (newItems.length === 0) setHasMore(false);
      setItems((prev) => [...prev, ...newItems]);
      setPage((p) => p + 1);
    });
  };

  // ✅ Filtered items
  const filteredItems = items.filter(
    (item) =>
      item.price <= price &&
      (activeCategory === "View All" || item.category === activeCategory)
  );

  // ✅ Category counts (memoized for performance)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "View All": items.length };
    categories.forEach((cat) => {
      if (cat !== "View All") {
        counts[cat] = items.filter((item) => item.category === cat).length;
      }
    });
    return counts;
  }, [items]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ✅ Left: Explore Content */}
          <div className="lg:col-span-3 space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              What are you looking for?
            </h1>

            {/* ✅ Category Chips with Counts */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition ${
                    activeCategory === cat
                      ? "bg-purple-600 text-white border-purple-600"
                      : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {cat !== "View All" && (
                    <img
                      src={categoryImages[cat][0] + "?w=40&h=40&fit=crop"}
                      alt={cat}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  {cat} <span className="text-xs opacity-70">({categoryCounts[cat] || 0})</span>
                </button>
              ))}
            </div>

            {/* ✅ Price Slider */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300">Max Price:</span>
              <input
                type="range"
                min="100"
                max="2000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full"
              />
              <span className="font-semibold text-purple-600">₦{price}</span>
            </div>

            {/* ✅ Items List with Images */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> {item.location}
                    </p>
                    <p className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} /> {item.rating}
                    </p>
                    <p className="text-purple-600 font-bold">₦{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ✅ Load More Button */}
            {hasMore && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
                >
                  Load More
                </button>
              </div>
            )}

            {!hasMore && (
              <p className="text-center text-gray-500 py-4">No more results</p>
            )}
          </div>

          {/* ✅ Right: Sticky Ads */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
            {adImages.map((src, idx) => (
              <Ad
                key={idx}
                localSrc={src}
                alt={`Ad Banner ${idx + 1}`}
                style={{ height: idx === 1 ? 600 : 250 }}
              />
            ))}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
