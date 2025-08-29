"use client";

import React, { useMemo, useState } from "react";
import {
  MapPin,
  Star,
  Search,
  Grid,
  List,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Link from "next/link";
import { useListings } from "../../hooks/useListings";
import AdBanner from "../../components/AdBanner";

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
  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // ✅ useListings handles filtering, search, etc.
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Base categories shown explicitly in the UI
  const baseCategories = ["Places", "Events", "Jobs", "Real Estate", "Cars"];

  // Main items (pass baseCategories so the hook knows how to compute "Other")
  const { items, loading } = useListings({
    sort: "recent",
    page,
    pageSize,
    category: activeCategory !== "All" ? activeCategory : undefined,
    search: searchQuery,
    baseCategories,
  });

  const adImages = [
    "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format",
  ];

  // ✅ Featured / Trending (independent of search/category)
  const featuredItems = useListings({ featured: true, limit: 10 }).items;
  const trendingItems = useListings({ trending: true, limit: 10 }).items;

  // ✅ Use an unpaginated set to compute counts (respects search text)
  const allMatching = useListings({
    search: searchQuery,
    baseCategories,
  }).items;

  // ✅ Count items per category (including "Other")
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allMatching.length };

    const baseSet = new Set(baseCategories.map((c) => c.toLowerCase()));
    baseCategories.forEach((cat) => {
      counts[cat] = allMatching.filter(
        (item) => (item.category ?? "").toLowerCase() === cat.toLowerCase()
      ).length;
    });

    counts["Other"] = allMatching.filter((item) => {
      const c = (item.category ?? "").toString().trim().toLowerCase();
      return !c || !baseSet.has(c) || c === "other" || c === "others";
    }).length;

    return counts;
  }, [allMatching, baseCategories]);

  // Render list of buttons (All + base + Other)
  const filterButtons = ["All", ...baseCategories, "Other"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
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

            {/* Category Filter (now includes "Other") */}
            <div className="flex flex-wrap gap-3 mb-6">
              {filterButtons.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1); // reset pagination when switching category
                  }}
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1); // reset to first page on search
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent"
                />
              </div>
            </div>

            {/* ✅ Featured Section */}
            {featuredItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-700">
                  <Sparkles size={20} /> Featured Businesses
                </h2>
                <div className="relative">
                  <div
                    id="featured-carousel"
                    className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
                  >
                    {featuredItems.map((item) => (
                      <Link key={item.id} href={`/${item.slug}`}>
                        <div className="min-w-[180px] max-w-[180px] bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-28 w-full object-cover"
                          />
                          <div className="p-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {featuredItems.length > 6 && (
                    <>
                      <button
                        onClick={() =>
                          document
                            .getElementById("featured-carousel")
                            ?.scrollBy({ left: -300, behavior: "smooth" })
                        }
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white shadow rounded-full p-2 hover:bg-purple-700"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById("featured-carousel")
                            ?.scrollBy({ left: 300, behavior: "smooth" })
                        }
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white shadow rounded-full p-2 hover:bg-purple-700"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ✅ Trending Section */}
            {trendingItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-red-600">
                  <Flame size={20} /> Trending Now
                </h2>
                <div className="relative">
                  <div
                    id="trending-carousel"
                    className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
                  >
                    {trendingItems.map((item) => (
                      <Link key={item.id} href={`/${item.slug}`}>
                        <div className="min-w-[180px] max-w-[180px] bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-28 w-full object-cover"
                          />
                          <div className="p-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {trendingItems.length > 6 && (
                    <>
                      <button
                        onClick={() =>
                          document
                            .getElementById("trending-carousel")
                            ?.scrollBy({ left: -300, behavior: "smooth" })
                        }
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-red-600 text-white shadow rounded-full p-2 hover:bg-red-700"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById("trending-carousel")
                            ?.scrollBy({ left: 300, behavior: "smooth" })
                        }
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-red-600 text-white shadow rounded-full p-2 hover:bg-red-700"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ✅ Other Businesses */}
            <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-700">
                <BriefcaseBusiness size={20} /> Other Businesses
              </h2>

              <AnimatePresence mode="wait">
                {loading ? (
                  <div
                    className={`grid ${
                      viewMode === "grid"
                        ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                        ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    } gap-6`}
                  >
                    {items.map((item) => (
                      <Link key={item.id} href={`/${item.slug}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
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
                                <Star size={14} fill="currentColor" />{" "}
                                {item.rating}
                              </p>
                              {item.price && (
                                <p className="text-purple-600 font-bold text-sm">
                                  ₦{item.price}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ✅ Pagination */}
              <div className="flex justify-between items-center mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 hover:bg-purple-700 transition"
                >
                  Prev
                </button>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Page {page}
                </span>
                <button
                  disabled={items.length < pageSize}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 hover:bg-purple-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Ads */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sponsored
            </h3>
            {adImages.map((src, idx) => (
              <AdBanner
                key={idx}
                localSrc={src}
                alt={`Sponsored Content ${idx + 1}`}
                height={idx === 1 ? 400 : 250}
              />
            ))}
            <AdBanner client="ca-pub-xxxxxxxxxx" slot="1234567890" />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
