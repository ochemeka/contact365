"use client";

import React, { useMemo, useState, useEffect } from "react";
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
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";
import { useNigeriaListings } from "../hooks/useNigeriaListings";
import AdBanner from "../components/AdBanner";
import { nigeriaLocationData, nigeriaCategories } from "../listings/nigeriaData";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: "easeOut" as const,
  },
};

const features = [
  {
    id: 1,
    title: "Verified Nigerian Businesses",
    text: "Every listing is reviewed and verified for trust and authenticity across Nigeria.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
    alt: "Verified Listings",
    icon: <Star size={20} />,
  },
  {
    id: 2,
    title: "Find Local Services",
    text: "Discover businesses and services in your area - from Computer Village to your neighborhood.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    alt: "Find Nearby",
    icon: <MapPin size={20} />,
  },
  {
    id: 3,
    title: "Nigerian Business Network",
    text: "Connect with authentic Nigerian businesses and entrepreneurs nationwide.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    alt: "Business Network",
    icon: <BriefcaseBusiness size={20} />,
  },
];

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
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Nigerian location filtering: State → LGA → Area
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedLGA, setSelectedLGA] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Get current state data
  const currentStateData = nigeriaLocationData.find(
    s => s.state === selectedState
  );

  // Get current LGA data
  const currentLGAData = currentStateData?.lgas.find(
    l => l.name === selectedLGA
  );

  // Reset LGA when state changes
  useEffect(() => {
    setSelectedLGA("All");
    setSelectedArea("All");
    setPage(1);
  }, [selectedState]);

  // Reset Area when LGA changes
  useEffect(() => {
    setSelectedArea("All");
    setPage(1);
  }, [selectedLGA]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { items, loading } = useNigeriaListings({
    sort: "recent",
    page,
    pageSize,
    category: activeCategory !== "All" ? activeCategory : undefined,
    search: searchQuery,
    state: selectedState !== "All" ? selectedState : undefined,
    lga: selectedLGA !== "All" ? selectedLGA : undefined,
    area: selectedArea !== "All" ? selectedArea : undefined,
    baseCategories: nigeriaCategories,
  });

  const adImages = [
    "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format",
  ];

  const featuredItems = useNigeriaListings({ 
    featured: true, 
    limit: 10,
    state: selectedState !== "All" ? selectedState : undefined,
    lga: selectedLGA !== "All" ? selectedLGA : undefined,
    area: selectedArea !== "All" ? selectedArea : undefined,
  }).items;
  
  const trendingItems = useNigeriaListings({ 
    trending: true, 
    limit: 10,
    state: selectedState !== "All" ? selectedState : undefined,
    lga: selectedLGA !== "All" ? selectedLGA : undefined,
    area: selectedArea !== "All" ? selectedArea : undefined,
  }).items;

  const allMatching = useNigeriaListings({
    search: searchQuery,
    state: selectedState !== "All" ? selectedState : undefined,
    lga: selectedLGA !== "All" ? selectedLGA : undefined,
    area: selectedArea !== "All" ? selectedArea : undefined,
    baseCategories: nigeriaCategories,
  }).items;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allMatching.length };
    const baseSet = new Set(nigeriaCategories.map((c) => c.toLowerCase()));
    
    nigeriaCategories.forEach((cat) => {
      counts[cat] = allMatching.filter(
        (item) => (item.category ?? "").toLowerCase() === cat.toLowerCase()
      ).length;
    });
    
    counts["Other"] = allMatching.filter((item) => {
      const c = (item.category ?? "").toString().trim().toLowerCase();
      return !c || !baseSet.has(c) || c === "other" || c === "others";
    }).length;
    
    return counts;
  }, [allMatching]);

  const [heroIndex, setHeroIndex] = useState(0);
  const nextSlide = () =>
    setHeroIndex((i) => (i + 1) % (featuredItems.length || 1));
  const prevSlide = () =>
    setHeroIndex((i) =>
      i === 0 ? (featuredItems.length || 1) - 1 : i - 1
    );

  useEffect(() => {
    if (featuredItems.length === 0) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [featuredItems.length]);

  const filterButtons = ["All", ...nigeriaCategories.slice(0, 8), "Other"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      {featuredItems.length > 0 && (
        <div className="relative w-full h-[70vh] mt-10 mb-12 overflow-hidden rounded-2xl shadow-lg flex items-center justify-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={featuredItems[heroIndex]?.image || "/fallback.jpg"}
                alt={featuredItems[heroIndex]?.title || "Featured"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 text-center w-full max-w-4xl px-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Discover Nigerian Businesses
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-6">
              Find trusted local businesses from Lagos to Kano, Abuja to Port Harcourt.
            </p>

            {/* Enhanced Search Form with Nigerian Location Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full">
              {/* Location Filters: State → LGA → Area */}
              <div className="flex flex-col sm:flex-row">
                {/* State Selection */}
                <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 px-4 py-3">
                    <MapPin className="text-gray-400 dark:text-gray-500" size={18} />
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white"
                    >
                      <option value="All" className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">
                        All States
                      </option>
                      {nigeriaLocationData.map((state) => (
                        <option 
                          key={state.state} 
                          value={state.state}
                          className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        >
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* LGA Selection */}
                <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 px-4 py-3">
                    <MapPin className="text-gray-400 dark:text-gray-500" size={16} />
                    <select
                      value={selectedLGA}
                      onChange={(e) => setSelectedLGA(e.target.value)}
                      disabled={selectedState === "All"}
                      className="flex-1 outline-none text-sm bg-transparent disabled:opacity-50 text-gray-900 dark:text-white"
                    >
                      <option 
                        value="All"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        {selectedState === "All" ? "Select State First" : "All LGAs"}
                      </option>
                      {currentStateData?.lgas.map((lga) => (
                        <option 
                          key={lga.name} 
                          value={lga.name}
                          className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        >
                          {lga.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Area Selection */}
                <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 px-4 py-3">
                    <MapPin className="text-gray-400 dark:text-gray-500" size={14} />
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      disabled={selectedLGA === "All"}
                      className="flex-1 outline-none text-sm bg-transparent disabled:opacity-50 text-gray-900 dark:text-white"
                    >
                      <option 
                        value="All"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        {selectedLGA === "All" ? "Select LGA First" : "All Areas"}
                      </option>
                      {currentLGAData?.areas.map((area) => (
                        <option 
                          key={area} 
                          value={area}
                          className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        >
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 px-4 py-3">
                    <BriefcaseBusiness className="text-gray-400 dark:text-gray-500" size={18} />
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white"
                    >
                      <option 
                        value="All"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        All Categories
                      </option>
                      {nigeriaCategories.slice(0, 10).map((cat) => (
                        <option 
                          key={cat} 
                          value={cat}
                          className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                        >
                          {cat}
                        </option>
                      ))}
                      <option 
                        value="Other"
                        className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                      >
                        Other
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <Search className="text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search for businesses, services, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Features Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.article
                key={feature.id}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 * index }}
                className="rounded-xl bg-gray-50 dark:bg-gray-900 shadow overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full p-3 text-green-600 bg-green-50 dark:text-green-300 dark:bg-green-900/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Top Controls and Active Filters Display */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Explore Nigerian Businesses
                </h1>
                {/* Active Filters Display */}
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                  {selectedState !== "All" && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                      {selectedState}
                    </span>
                  )}
                  {selectedLGA !== "All" && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                      {selectedLGA}
                    </span>
                  )}
                  {selectedArea !== "All" && (
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                      {selectedArea}
                    </span>
                  )}
                  {activeCategory !== "All" && (
                    <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                      {activeCategory}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition sm:hidden"
                >
                  <Filter size={16} />
                  Filters
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {(showFilters || isDesktop) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* State Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700"
                      >
                        <option value="All">All States</option>
                        {nigeriaLocationData.map((state) => (
                          <option key={state.state} value={state.state}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* LGA Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        LGA
                      </label>
                      <select
                        value={selectedLGA}
                        onChange={(e) => setSelectedLGA(e.target.value)}
                        disabled={selectedState === "All"}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 disabled:opacity-50"
                      >
                        <option value="All">
                          {selectedState === "All" ? "Select State First" : "All LGAs"}
                        </option>
                        {currentStateData?.lgas.map((lga) => (
                          <option key={lga.name} value={lga.name}>
                            {lga.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Area Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Area
                      </label>
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        disabled={selectedLGA === "All"}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 disabled:opacity-50"
                      >
                        <option value="All">
                          {selectedLGA === "All" ? "Select LGA First" : "All Areas"}
                        </option>
                        {currentLGAData?.areas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Reset Filters */}
                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setSelectedState("All");
                          setSelectedLGA("All");
                          setSelectedArea("All");
                          setActiveCategory("All");
                          setSearchQuery("");
                          setPage(1);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search businesses, services, products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {filterButtons.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900"
                  }`}
                >
                  {cat} ({categoryCounts[cat] ?? 0})
                </button>
              ))}
            </div>

            {/* Featured Section */}
            {featuredItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-green-700">
                  <Sparkles size={20} /> Featured Businesses
                  {selectedState !== "All" && (
                    <span className="text-sm font-normal text-gray-500">
                      in {selectedState}
                      {selectedLGA !== "All" && `, ${selectedLGA}`}
                      {selectedArea !== "All" && `, ${selectedArea}`}
                    </span>
                  )}
                </h2>
                <div className="relative">
                  <div
                    id="featured-carousel"
                    className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
                  >
                    {featuredItems.map((item) => (
                      <Link key={item.id} href={`/${item.slug}`}>
                        <div className="min-w-[200px] max-w-[200px] bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-32 w-full object-cover"
                          />
                          <div className="p-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin size={12} /> {item.area}, {item.lga}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                <Star size={12} fill="currentColor" />
                                {item.rating}
                              </div>
                              {item.price && (
                                <p className="text-green-600 font-bold text-xs">
                                  {item.price}
                                </p>
                              )}
                            </div>
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
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-green-600 text-white shadow rounded-full p-2 hover:bg-green-700"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() =>document
                            .getElementById("featured-carousel")
                            ?.scrollBy({ left: 300, behavior: "smooth" })
                        }
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-green-600 text-white shadow rounded-full p-2 hover:bg-green-700"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Trending Section */}
            {trendingItems.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-red-600">
                  <Flame size={20} /> Trending Now
                  {selectedState !== "All" && (
                    <span className="text-sm font-normal text-gray-500">
                      in {selectedState}
                      {selectedLGA !== "All" && `, ${selectedLGA}`}
                    </span>
                  )}
                </h2>
                <div className="relative">
                  <div
                    id="trending-carousel"
                    className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
                  >
                    {trendingItems.map((item) => (
                      <Link key={item.id} href={`/${item.slug}`}>
                        <div className="min-w-[200px] max-w-[200px] bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-32 w-full object-cover"
                          />
                          <div className="p-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin size={12} /> {item.area}, {item.lga}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                <Star size={12} fill="currentColor" />
                                {item.rating}
                              </div>
                              {item.price && (
                                <p className="text-green-600 font-bold text-xs">
                                  {item.price}
                                </p>
                              )}
                            </div>
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

            {/* All Businesses Section */}
            <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-green-700">
                  <BriefcaseBusiness size={20} /> 
                  {selectedState !== "All" 
                    ? `Businesses in ${selectedState}${selectedLGA !== "All" ? `, ${selectedLGA}` : ""}${selectedArea !== "All" ? `, ${selectedArea}` : ""}`
                    : "All Nigerian Businesses"
                  }
                </h2>
                {searchQuery && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Search results for "{searchQuery}" • {allMatching.length} found
                  </p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {loading ? (
                  <div
                    className={`grid ${
                      viewMode === "grid"
                        ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    } gap-6`}
                  >
                    {Array.from({ length: pageSize }).map((_, i) => (
                      <ItemSkeleton key={i} />
                    ))}
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <Search className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No businesses found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your filters or search terms.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedState("All");
                        setSelectedLGA("All");
                        setSelectedArea("All");
                        setActiveCategory("All");
                        setSearchQuery("");
                        setPage(1);
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Clear All Filters
                    </button>
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
                    {items.map((item, index) => (
                      <Link key={item.id} href={`/${item.slug}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          className={`bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
                            viewMode === "list" ? "flex gap-4" : ""
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`object-cover ${
                              viewMode === "list" 
                                ? "h-24 w-24 flex-shrink-0" 
                                : "h-40 w-full"
                            }`}
                            loading="lazy"
                          />
                          <div className="p-4 flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-2">
                                {item.title}
                              </h3>
                              {(item.featured || item.trending) && (
                                <div className="flex gap-1 ml-2">
                                  {item.featured && (
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                      Featured
                                    </span>
                                  )}
                                  {item.trending && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                      Trending
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {item.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin size={14} /> 
                                <span>{item.area}, {item.lga}</span>
                              </div>
                              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                <Star size={14} fill="currentColor" />
                                {item.rating}
                              </div>
                            </div>
                            
                            {item.price && (
                              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                                <p className="text-green-600 font-bold text-sm">
                                  {item.price}
                                </p>
                              </div>
                            )}
                            
                            <div className="mt-2">
                              <span className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {!loading && items.length > 0 && (
                <div className="flex justify-between items-center mt-8">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Page {page}
                    </span>
                    {items.length === pageSize && (
                      <span className="text-gray-500 text-sm">
                        • Showing {(page - 1) * pageSize + 1}-{page * pageSize} results
                      </span>
                    )}
                  </div>
                  
                  <button
                    disabled={items.length < pageSize}
                    onClick={() => setPage((p) => p + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">

             {/* Popular Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Categories
              </h3>
              <div className="space-y-2">
                {nigeriaCategories.slice(0, 8).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      activeCategory === category
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category} ({categoryCounts[category] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/*  */}
            {/* Quick State Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Nigerian Business Hub
              </h3>
              <div className="space-y-3">
                {nigeriaLocationData.slice(0, 5).map((state) => {
                  const stateBusinesses = allMatching.filter(item => item.state === state.state);
                  return (
                    <div key={state.state} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{state.state}</span>
                      </div>
                      <span className="text-sm text-green-600 font-semibold">
                        {stateBusinesses.length}
                      </span>
                    </div>
                  );
                })}
                <button
                  onClick={() => setSelectedState("All")}
                  className="w-full mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  View all states →
                </button>
              </div>
            </div>

           

            {/* Sponsored Ads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
            </div>
          </aside>
        </div>

        {/* CTA Section */}
        <section
          className="w-full py-20 mt-16 relative text-white text-center rounded-2xl overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,128,0,0.85), rgba(0,128,0,0.85)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div {...fadeInUp} className="relative z-10 container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Grow Your Nigerian Business with Contact365
            </h2>
            <p className="mb-8 opacity-90 text-lg max-w-2xl mx-auto">
              Join thousands of Nigerian businesses already listed and start reaching more customers across the nation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/add-listing">
                <button className="bg-white text-green-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                  List Your Business
                </button>
              </Link>
              <Link href="/businesses">
                <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-green-700 transition-all transform hover:scale-105">
                  Browse All Businesses
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import {
//   MapPin,
//   Star,
//   Search,
//   Grid,
//   List,
//   Flame,
//   Sparkles,
//   ChevronLeft,
//   ChevronRight,
//   BriefcaseBusiness,
//   Globe,
//   ChevronDown,
//   Filter,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Link from "next/link";
// import { useListings } from "../hooks/useListings";
// import AdBanner from "../components/AdBanner";
// import { africanCountryData } from "../listings/businesses";

// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: {
//     duration: 0.6,
//     ease: "easeOut" as const, // ✅ cast it so TypeScript accepts
//   },
// };


// const features = [
//   {
//     id: 1,
//     title: "Verified African Businesses",
//     text: "Every listing is reviewed and verified for trust and authenticity across Africa.",
//     image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
//     alt: "Verified Listings",
//     icon: <Star size={20} />,
//   },
//   {
//     id: 2,
//     title: "Find Local Services",
//     text: "Discover businesses, services, and opportunities in your African city.",
//     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
//     alt: "Find Nearby",
//     icon: <MapPin size={20} />,
//   },
//   {
//     id: 3,
//     title: "African Business Network",
//     text: "Connect with authentic African businesses and entrepreneurs.",
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
//     alt: "Business Network",
//     icon: <BriefcaseBusiness size={20} />,
//   },
// ];

// const ItemSkeleton = () => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden animate-pulse">
//     <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
//     <div className="p-5 space-y-3">
//       <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
//       <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//       <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
//       <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
//     </div>
//   </div>
// );

// export default function ExplorePage() {
//   const [page, setPage] = useState(1);
//   const pageSize = 12;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [activeCategory, setActiveCategory] = useState<string>("All");
  
//   // African country and state filtering
//   const [selectedCountry, setSelectedCountry] = useState<string>("All");
//   const [selectedState, setSelectedState] = useState<string>("All");
//   const [showFilters, setShowFilters] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);

//   // Get current country data
//   const currentCountryData = africanCountryData.find(
//     c => c.name === selectedCountry
//   );
  
//   // Get available categories based on selected country
//   const availableCategories = useMemo(() => {
//     if (selectedCountry === "All") {
//       const allCategories = new Set<string>();
//       africanCountryData.forEach(country => {
//         country.categories.forEach(cat => allCategories.add(cat));
//       });
//       return Array.from(allCategories).sort();
//     }
//     return currentCountryData?.categories || [];
//   }, [selectedCountry, currentCountryData]);

//   // Reset state when country changes
//   useEffect(() => {
//     setSelectedState("All");
//     setActiveCategory("All");
//     setPage(1);
//   }, [selectedCountry]);

//   // Reset page when filters change
//   useEffect(() => {
//     setPage(1);
//   }, [selectedState, activeCategory, searchQuery]);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 640);
//     };
    
//     // Set initial value
//     handleResize();
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const { items, loading } = useListings({
//     sort: "recent",
//     page,
//     pageSize,
//     category: activeCategory !== "All" ? activeCategory : undefined,
//     search: searchQuery,
//     country: selectedCountry !== "All" ? selectedCountry : undefined,
//     state: selectedState !== "All" ? selectedState : undefined,
//     baseCategories: availableCategories,
//   });

//   const adImages = [
//     "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format",
//     "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format",
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format",
//   ];

//   const featuredItems = useListings({ 
//     featured: true, 
//     limit: 10,
//     country: selectedCountry !== "All" ? selectedCountry : undefined,
//     state: selectedState !== "All" ? selectedState : undefined,
//   }).items;
  
//   const trendingItems = useListings({ 
//     trending: true, 
//     limit: 10,
//     country: selectedCountry !== "All" ? selectedCountry : undefined,
//     state: selectedState !== "All" ? selectedState : undefined,
//   }).items;

//   const allMatching = useListings({
//     search: searchQuery,
//     country: selectedCountry !== "All" ? selectedCountry : undefined,
//     state: selectedState !== "All" ? selectedState : undefined,
//     baseCategories: availableCategories,
//   }).items;

//   const categoryCounts = useMemo(() => {
//     const counts: Record<string, number> = { All: allMatching.length };
//     const baseSet = new Set(availableCategories.map((c) => c.toLowerCase()));
    
//     availableCategories.forEach((cat) => {
//       counts[cat] = allMatching.filter(
//         (item) => (item.category ?? "").toLowerCase() === cat.toLowerCase()
//       ).length;
//     });
    
//     counts["Other"] = allMatching.filter((item) => {
//       const c = (item.category ?? "").toString().trim().toLowerCase();
//       return !c || !baseSet.has(c) || c === "other" || c === "others";
//     }).length;
    
//     return counts;
//   }, [allMatching, availableCategories]);

//   const [heroIndex, setHeroIndex] = useState(0);
//   const nextSlide = () =>
//     setHeroIndex((i) => (i + 1) % (featuredItems.length || 1));
//   const prevSlide = () =>
//     setHeroIndex((i) =>
//       i === 0 ? (featuredItems.length || 1) - 1 : i - 1
//     );

//   useEffect(() => {
//     if (featuredItems.length === 0) return;
//     const interval = setInterval(nextSlide, 6000);
//     return () => clearInterval(interval);
//   }, [featuredItems.length]);

//   const filterButtons = ["All", ...availableCategories.slice(0, 8), "Other"];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header />

//       {/* Hero Section */}
//       {featuredItems.length > 0 && (
//         <div className="relative w-full h-[70vh] mb-12 overflow-hidden rounded-2xl shadow-lg flex items-center justify-center">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={heroIndex}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1 }}
//               className="absolute inset-0"
//             >
//               <img
//                 src={featuredItems[heroIndex]?.image || "/fallback.jpg"}
//                 alt={featuredItems[heroIndex]?.title || "Featured"}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/60" />
//             </motion.div>
//           </AnimatePresence>

//           {/* Centered Content */}
//           <div className="relative z-10 text-center w-full max-w-4xl px-6">
//             <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
//               Discover African Businesses
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-200 mb-6">
//               Connect with authentic African entrepreneurs and services across the continent.
//             </p>

//             {/* Enhanced Search Form with African Filters */}
          
// <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full">
//   {/* Location and Category Filters */}
//   <div className="flex flex-col sm:flex-row">
//     {/* Country Selection */}
//     <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
//       <div className="flex items-center gap-2 px-4 py-3">
//         <Globe className="text-gray-400 dark:text-gray-500" size={18} />
//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white"
//         >
//           <option value="All" className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">
//             All African Countries
//           </option>
//           {africanCountryData.map((country) => (
//             <option 
//               key={country.code} 
//               value={country.name}
//               className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
//             >
//               {country.flag} {country.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>

//     {/* State Selection */}
//     <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
//       <div className="flex items-center gap-2 px-4 py-3">
//         <MapPin className="text-gray-400 dark:text-gray-500" size={18} />
//         <select
//           value={selectedState}
//           onChange={(e) => setSelectedState(e.target.value)}
//           disabled={selectedCountry === "All"}
//           className="flex-1 outline-none text-sm bg-transparent disabled:opacity-50 text-gray-900 dark:text-white"
//         >
//           <option 
//             value="All"
//             className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
//           >
//             {selectedCountry === "All" ? "Select Country First" : "All States"}
//           </option>
//           {currentCountryData?.states.map((state) => (
//             <option 
//               key={state} 
//               value={state}
//               className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
//             >
//               {state}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>

//     {/* Category Selection */}
//     <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
//       <div className="flex items-center gap-2 px-4 py-3">
//         <BriefcaseBusiness className="text-gray-400 dark:text-gray-500" size={18} />
//         <select
//           value={activeCategory}
//           onChange={(e) => setActiveCategory(e.target.value)}
//           className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white"
//         >
//           <option 
//             value="All"
//             className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
//           >
//             All Categories
//           </option>
//           {availableCategories.slice(0, 10).map((cat) => (
//             <option 
//               key={cat} 
//               value={cat}
//               className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
//             >
//               {cat}
//             </option>
//           ))}
//           <option 
//             value="Other"
//             className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
//           >
//             Other
//           </option>
//         </select>
//       </div>
//     </div>
//   </div>

//   {/* Search Input */}
//   <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
//     <Search className="text-gray-400 dark:text-gray-500" size={18} />
//     <input
//       type="text"
//       placeholder="Search for businesses, services, products..."
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       className="flex-1 outline-none text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//     />
//     <button
//       type="submit"
//       className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition"
//     >
//       Search
//     </button>
//   </div>
// </div>
//           </div>

//           {/* Slider Controls */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 z-10"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 z-10"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       )}

//       {/* Features Section */}
//       <section className="w-full py-16 bg-white dark:bg-gray-950">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//             {features.map((feature, index) => (
//               <motion.article
//                 key={feature.id}
//                 {...fadeInUp}
//                 transition={{ ...fadeInUp.transition, delay: 0.1 * index }}
//                 className="rounded-xl bg-gray-50 dark:bg-gray-900 shadow overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-purple-500"
//               >
//                 <div className="relative h-40 overflow-hidden">
//                   <img
//                     src={feature.image}
//                     alt={feature.alt}
//                     className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="p-6 text-center">
//                   <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full p-3 text-purple-600 bg-purple-50 dark:text-purple-300 dark:bg-purple-900/30">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     {feature.text}
//                   </p>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-10">
//             {/* Top Controls and Active Filters Display */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                   Explore African Businesses
//                 </h1>
//                 {/* Active Filters Display */}
//                 <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
//                   {selectedCountry !== "All" && (
//                     <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
//                       {africanCountryData.find(c => c.name === selectedCountry)?.flag} {selectedCountry}
//                     </span>
//                   )}
//                   {selectedState !== "All" && (
//                     <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
//                       {selectedState}
//                     </span>
//                   )}
//                   {activeCategory !== "All" && (
//                     <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
//                       {activeCategory}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition sm:hidden"
//                 >
//                   <Filter size={16} />
//                   Filters
//                 </button>
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-lg ${
//                     viewMode === "grid"
//                       ? "bg-purple-600 text-white"
//                       : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   <Grid size={20} />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-lg ${
//                     viewMode === "list"
//                       ? "bg-purple-600 text-white"
//                       : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   <List size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Filters Panel */}
//             <AnimatePresence>
//               {(showFilters || isDesktop) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-4"
//                 >
//                   {/* Country and State Filters */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {/* Country Filter */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         Country
//                       </label>
//                       <div className="relative">
//                         <select
//                           value={selectedCountry}
//                           onChange={(e) => setSelectedCountry(e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700"
//                         >
//                           <option value="All">All Countries</option>
//                           {africanCountryData.map((country) => (
//                             <option key={country.code} value={country.name}>
//                               {country.flag} {country.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* State Filter */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         State/Region
//                       </label>
//                       <select
//                         value={selectedState}
//                         onChange={(e) => setSelectedState(e.target.value)}
//                         disabled={selectedCountry === "All"}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 disabled:opacity-50"
//                       >
//                         <option value="All">
//                           {selectedCountry === "All" ? "Select Country First" : "All States"}
//                         </option>
//                         {currentCountryData?.states.map((state) => (
//                           <option key={state} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Reset Filters */}
//                     <div className="flex items-end">
//                       <button
//                         onClick={() => {
//                           setSelectedCountry("All");
//                           setSelectedState("All");
//                           setActiveCategory("All");
//                           setSearchQuery("");
//                           setPage(1);
//                         }}
//                         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//                       >
//                         Reset Filters
//                       </button>
//                     </div>
//                   </div>

//                   {/* Search Bar */}
//                   <div className="relative">
//                     <Search
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={20}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Search businesses, services, products..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent"
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Category Filter Buttons */}
//             <div className="flex flex-wrap gap-3">
//               {filterButtons.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                     activeCategory === cat
//                       ? "bg-purple-600 text-white shadow-md"
//                       : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900"
//                   }`}
//                 >
//                   {cat} ({categoryCounts[cat] ?? 0})
//                 </button>
//               ))}
//             </div>

//             {/* Featured Section */}
//             {featuredItems.length > 0 && (
//               <div className="mt-10">
//                 <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-700">
//                   <Sparkles size={20} /> Featured Businesses
//                   {selectedCountry !== "All" && (
//                     <span className="text-sm font-normal text-gray-500">
//                       in {selectedCountry}
//                     </span>
//                   )}
//                 </h2>
//                 <div className="relative">
//                   <div
//                     id="featured-carousel"
//                     className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
//                   >
//                     {featuredItems.map((item) => (
//                       <Link key={item.id} href={`/${item.slug}`}>
//                         <div className="min-w-[200px] max-w-[200px] bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition">
//                           <img
//                             src={item.image}
//                             alt={item.title}
//                             className="h-32 w-full object-cover"
//                           />
//                           <div className="p-3">
//                             <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
//                               {item.title}
//                             </h3>
//                             <p className="text-xs text-gray-500 flex items-center gap-1">
//                               <MapPin size={12} /> {item.location}, {item.country}
//                             </p>
//                             <div className="flex items-center justify-between mt-2">
//                               <div className="flex items-center gap-1 text-yellow-500 text-xs">
//                                 <Star size={12} fill="currentColor" />
//                                 {item.rating}
//                               </div>
//                               {item.price && (
//                                 <p className="text-purple-600 font-bold text-xs">
//                                   {item.price}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                   {featuredItems.length > 6 && (
//                     <>
//                       <button
//                         onClick={() =>
//                           document
//                             .getElementById("featured-carousel")
//                             ?.scrollBy({ left: -300, behavior: "smooth" })
//                         }
//                         className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white shadow rounded-full p-2 hover:bg-purple-700"
//                       >
//                         <ChevronLeft size={20} />
//                       </button>
//                       <button
//                         onClick={() =>
//                           document
//                             .getElementById("featured-carousel")
//                             ?.scrollBy({ left: 300, behavior: "smooth" })
//                         }
//                         className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 text-white shadow rounded-full p-2 hover:bg-purple-700"
//                       >
//                         <ChevronRight size={20} />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Trending Section */}
//             {trendingItems.length > 0 && (
//               <div className="mt-10">
//                 <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-red-600">
//                   <Flame size={20} /> Trending Now
//                   {selectedCountry !== "All" && (
//                     <span className="text-sm font-normal text-gray-500">
//                       in {selectedCountry}
//                     </span>
//                   )}
//                 </h2>
//                 <div className="relative">
//                   <div
//                     id="trending-carousel"
//                     className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
//                   >
//                     {trendingItems.map((item) => (
//                       <Link key={item.id} href={`/${item.slug}`}>
//                         <div className="min-w-[200px] max-w-[200px] bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition">
//                           <img
//                             src={item.image}
//                             alt={item.title}
//                             className="h-32 w-full object-cover"
//                           />
//                           <div className="p-3">
//                             <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
//                               {item.title}
//                             </h3>
//                             <p className="text-xs text-gray-500 flex items-center gap-1">
//                               <MapPin size={12} /> {item.location}, {item.country}
//                             </p>
//                             <div className="flex items-center justify-between mt-2">
//                               <div className="flex items-center gap-1 text-yellow-500 text-xs">
//                                 <Star size={12} fill="currentColor" />
//                                 {item.rating}
//                               </div>
//                               {item.price && (
//                                 <p className="text-purple-600 font-bold text-xs">
//                                   {item.price}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                   {trendingItems.length > 6 && (
//                     <>
//                       <button
//                         onClick={() =>
//                           document
//                             .getElementById("trending-carousel")
//                             ?.scrollBy({ left: -300, behavior: "smooth" })
//                         }
//                         className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-red-600 text-white shadow rounded-full p-2 hover:bg-red-700"
//                       >
//                         <ChevronLeft size={20} />
//                       </button>
//                       <button
//                         onClick={() =>
//                           document
//                             .getElementById("trending-carousel")
//                             ?.scrollBy({ left: 300, behavior: "smooth" })
//                         }
//                         className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-red-600 text-white shadow rounded-full p-2 hover:bg-red-700"
//                       >
//                         <ChevronRight size={20} />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* All Businesses Section */}
//             <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold flex items-center gap-2 text-purple-700">
//                   <BriefcaseBusiness size={20} /> 
//                   {selectedCountry !== "All" 
//                     ? `Businesses in ${selectedCountry}${selectedState !== "All" ? `, ${selectedState}` : ""}`
//                     : "All African Businesses"
//                   }
//                 </h2>
//                 {searchQuery && (
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Search results for "{searchQuery}" • {allMatching.length} found
//                   </p>
//                 )}
//               </div>

//               <AnimatePresence mode="wait">
//                 {loading ? (
//                   <div
//                     className={`grid ${
//                       viewMode === "grid"
//                         ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//                         : "grid-cols-1"
//                     } gap-6`}
//                   >
//                     {Array.from({ length: pageSize }).map((_, i) => (
//                       <ItemSkeleton key={i} />
//                     ))}
//                   </div>
//                 ) : items.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
//                       <Search className="text-gray-400" size={32} />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                       No businesses found
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 mb-6">
//                       Try adjusting your filters or search terms.
//                     </p>
//                     <button
//                       onClick={() => {
//                         setSelectedCountry("All");
//                         setSelectedState("All");
//                         setActiveCategory("All");
//                         setSearchQuery("");
//                         setPage(1);
//                       }}
//                       className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//                     >
//                       Clear All Filters
//                     </button>
//                   </div>
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className={`grid ${
//                       viewMode === "grid"
//                         ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//                         : "grid-cols-1"
//                     } gap-6`}
//                   >
//                     {items.map((item, index) => (
//                       <Link key={item.id} href={`/${item.slug}`}>
//                         <motion.div
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.05 }}
//                           whileHover={{ scale: 1.02 }}
//                           className={`bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
//                             viewMode === "list" ? "flex gap-4" : ""
//                           }`}
//                         >
//                           <img
//                             src={item.image}
//                             alt={item.title}
//                             className={`object-cover ${
//                               viewMode === "list" 
//                                 ? "h-24 w-24 flex-shrink-0" 
//                                 : "h-40 w-full"
//                             }`}
//                             loading="lazy"
//                           />
//                           <div className="p-4 flex-1">
//                             <div className="flex items-start justify-between mb-2">
//                               <h3 className="text-md font-semibold text-gray-900 dark:text-white line-clamp-2">
//                                 {item.title}
//                               </h3>
//                               {(item.featured || item.trending) && (
//                                 <div className="flex gap-1 ml-2">
//                                   {item.featured && (
//                                     <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
//                                       Featured
//                                     </span>
//                                   )}
//                                   {item.trending && (
//                                     <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
//                                       Trending
//                                     </span>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
                            
//                             <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
//                               {item.description}
//                             </p>
                            
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-2 text-sm text-gray-500">
//                                 <MapPin size={14} /> 
//                                 <span>{item.location}, {item.country}</span>
//                               </div>
//                               <div className="flex items-center gap-1 text-yellow-500 text-sm">
//                                 <Star size={14} fill="currentColor" />
//                                 {item.rating}
//                               </div>
//                             </div>
                            
//                             {item.price && (
//                               <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-600">
//                                 <p className="text-purple-600 font-bold text-sm">
//                                   {item.price}
//                                 </p>
//                               </div>
//                             )}
                            
//                             <div className="mt-2">
//                               <span className="inline-block bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
//                                 {item.category}
//                               </span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       </Link>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Pagination */}
//               {!loading && items.length > 0 && (
//                 <div className="flex justify-between items-center mt-8">
//                   <button
//                     disabled={page === 1}
//                     onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 hover:bg-purple-700 transition disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeft size={16} />
//                     Previous
//                   </button>
                  
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-700 dark:text-gray-300 font-medium">
//                       Page {page}
//                     </span>
//                     {items.length === pageSize && (
//                       <span className="text-gray-500 text-sm">
//                         • Showing {(page - 1) * pageSize + 1}-{page * pageSize} results
//                       </span>
//                     )}
//                   </div>
                  
//                   <button
//                     disabled={items.length < pageSize}
//                     onClick={() => setPage((p) => p + 1)}
//                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white disabled:opacity-50 hover:bg-purple-700 transition disabled:cursor-not-allowed"
//                   >
//                     Next
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
//             {/* Quick Country Stats */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 African Business Hub
//               </h3>
//               <div className="space-y-3">
//                 {africanCountryData.slice(0, 5).map((country) => {
//                   const countryBusinesses = allMatching.filter(item => item.country === country.name);
//                   return (
//                     <div key={country.code} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{country.flag}</span>
//                         <span className="text-sm font-medium">{country.name}</span>
//                       </div>
//                       <span className="text-sm text-purple-600 font-semibold">
//                         {countryBusinesses.length}
//                       </span>
//                     </div>
//                   );
//                 })}
//                 <button
//                   onClick={() => setSelectedCountry("All")}
//                   className="w-full mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
//                 >
//                   View all countries →
//                 </button>
//               </div>
//             </div>

//             {/* Popular Categories */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Popular Categories
//               </h3>
//               <div className="space-y-2">
//                 {availableCategories.slice(0, 8).map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setActiveCategory(category)}
//                     className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
//                       activeCategory === category
//                         ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
//                         : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     }`}
//                   >
//                     {category} ({categoryCounts[category] || 0})
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sponsored Ads */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Sponsored
//               </h3>
//               {adImages.map((src, idx) => (
//                 <AdBanner
//                   key={idx}
//                   localSrc={src}
//                   alt={`Sponsored Content ${idx + 1}`}
//                   height={idx === 1 ? 400 : 250}
//                 />
//               ))}
//               <AdBanner client="ca-pub-xxxxxxxxxx" slot="1234567890" />
//             </div>
//           </aside>
//         </div>

//         {/* CTA Section */}
//         <section
//           className="w-full py-20 mt-16 relative text-white text-center rounded-2xl overflow-hidden"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(88,28,135,0.85), rgba(88,28,135,0.85)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop)",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <motion.div {...fadeInUp} className="relative z-10 container mx-auto px-4">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Grow Your African Business with Contact365
//             </h2>
//             <p className="mb-8 opacity-90 text-lg max-w-2xl mx-auto">
//               Join thousands of African businesses already listed and start reaching more customers across the continent today.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/add-listing">
//                 <button className="bg-white text-purple-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700 transition-all transform hover:scale-105">
//                   List Your Business
//                 </button>
//               </Link>
//               <Link href="/businesses">
//                 <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-purple-700 transition-all transform hover:scale-105">
//                   Browse All Businesses
//                 </button>
//               </Link>
//             </div>
//           </motion.div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }