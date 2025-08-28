"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapPin, Star, Search, Grid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Link from "next/link";

// ✅ Reusable Ad Component
const Ad = ({ localSrc, alt, style }: any) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((k) => k + 1);
      setImageError(false);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (imageError) {
    return (
      <div
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center"
        style={style}
      >
        <span className="text-gray-500 text-sm">Ad Space</span>
      </div>
    );
  }

  return (
    <div key={refreshKey} className="w-full">
      <img
        src={localSrc}
        alt={alt}
        onError={() => setImageError(true)}
        className="w-full rounded-xl shadow hover:shadow-lg transition-all duration-300"
        style={style}
        loading="lazy"
      />
    </div>
  );
};

// ✅ Loading Skeleton
const ItemSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);

export default function ExplorePage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const adImages = [
    "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format",
  ];

  const categories = ["Places", "Events", "Jobs", "Real Estate", "Cars"];
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

  // ✅ Simulated API fetch
  const fetchItems = useCallback(async (pageNum: number) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newItems = Array.from({ length: 10 }).map((_, i) => {
      const category = categories[(pageNum * i) % categories.length];
      const images = categoryImages[category];
      return {
        id: `${pageNum}-${i}`,
        title: `${category} Service ${(pageNum - 1) * 10 + i + 1}`,
        location: "Lagos, Nigeria",
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        price: Math.floor(Math.random() * 2000) + 100,
        category,
        image: images[i % images.length] + "?auto=format&fit=crop&w=600&q=80",
        slug: `${category.toLowerCase()}-service-${i}`,
      };
    });

    setLoading(false);
    return newItems;
  }, []);

  useEffect(() => {
    fetchItems(1).then(setItems);
  }, [fetchItems]);

  const loadMore = () => {
    if (loading) return;
    fetchItems(page + 1).then((newItems) => {
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setPage((p) => p + 1);
      }
    });
  };

  // ✅ Filtering logic
  const filteredItems = useMemo(() => {
    let filtered = items;

    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    return filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery, activeCategory]);

  // ✅ Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: items.length };
    categories.forEach((cat) => {
      counts[cat] = items.filter((item) => item.category === cat).length;
    });
    return counts;
  }, [items]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Page Container */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Explore Listings
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900"
                  }`}
                >
                  {cat} ({categoryCounts[cat] ?? 0})
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent"
                />
              </div>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {loading && page === 1 ? (
                <div
                  className={`grid ${
                    viewMode === "grid"
                      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <ItemSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid ${
                    viewMode === "grid"
                      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {filteredItems.map((item) => (
                    <Link key={item.id} href={`/${item.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-40 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="p-4">
                          <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={14} /> {item.location}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="flex items-center gap-1 text-yellow-500 text-sm">
                              <Star size={14} fill="currentColor" /> {item.rating}
                            </p>
                            <p className="text-purple-600 font-bold text-sm">
                              ₦{item.price}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Load More */}
            {hasMore && !loading && (
              <div className="text-center pt-6">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:shadow-xl"
                >
                  Load More
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Ads */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sponsored
            </h3>
            {adImages.map((src, idx) => (
              <Ad
                key={idx}
                localSrc={src}
                alt={`Sponsored Content ${idx + 1}`}
                style={{ height: idx === 1 ? 400 : 250 }}
              />
            ))}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
