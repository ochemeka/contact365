"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapPin, Star, Search, Filter, Grid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

// Enhanced Ad component with error handling
const Ad = ({ localSrc, alt, style }: any) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(k => k + 1);
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

// Enhanced loading skeleton
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
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [activeCategory, setActiveCategory] = useState("View All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'newest'>('rating');

  const adImages = [
    "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format",
  ];

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

  // Enhanced fetch with error handling
  const fetchItems = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const cats = ["Places", "Events", "Jobs", "Real Estate", "Cars"];
      const newItems = Array.from({ length: 6 }).map((_, i) => {
        const category = cats[(pageNum * i) % cats.length];
        const images = categoryImages[category];
        return {
          id: `${pageNum}-${i}`,
          title: `${category} Service ${(pageNum - 1) * 6 + i + 1}`,
          location: "Lagos, Nigeria",
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
          price: Math.floor(Math.random() * 1900) + 100,
          category,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          image: images[i % images.length] + "?auto=format&fit=crop&w=600&q=80",
        };
      });
      return newItems;
    } catch (error) {
      console.error('Failed to fetch items:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(1).then(setItems);
  }, [fetchItems]);

  const loadMore = useCallback(() => {
    if (loading) return;
    
    fetchItems(page + 1).then((newItems) => {
      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }
      setItems(prev => [...prev, ...newItems]);
      setPage(p => p + 1);
    });
  }, [page, loading, fetchItems]);

  // Enhanced filtering and sorting
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "View All" || item.category === activeCategory;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchQuery, activeCategory, priceRange, sortBy]);

  // Category counts with memoization
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "View All": items.length };
    categories.forEach(cat => {
      if (cat !== "View All") {
        counts[cat] = items.filter(item => item.category === cat).length;
      }
    });
    return counts;
  }, [items]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 pt-24 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <Header />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Explore Services
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search services, locations..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent"
                />
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Price Range</span>
                  <span className="font-semibold text-purple-600">
                    ₦{priceRange[0]} - ₦{priceRange[1]}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    value={priceRange[0]}
                    onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-purple-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price">Price: Low to High</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg"
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
                </motion.button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-gray-600 dark:text-gray-400">
              {filteredAndSortedItems.length} results found
            </div>

            {/* Items Grid/List */}
            <AnimatePresence mode="wait">
              {loading && page === 1 ? (
                <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ItemSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}
                >
                  {filteredAndSortedItems.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-48 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-500 flex items-center gap-1">
                            <MapPin size={14} /> {item.location}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="flex items-center gap-1 text-yellow-500">
                              <Star size={14} fill="currentColor" /> {item.rating}
                            </p>
                            <p className="text-purple-600 font-bold text-lg">₦{item.price}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
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
                  Load More Services
                </button>
              </div>
            )}

            {loading && page > 1 && (
              <div className="text-center py-6">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            )}

            {!hasMore && items.length > 0 && (
              <p className="text-center text-gray-500 py-6">
                You've reached the end! 🎉
              </p>
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