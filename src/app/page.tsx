"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  Star,
  Briefcase,
  Users,
  Home as HomeIcon,
  Calendar,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";


import { ArrowUp } from "lucide-react";
import SpinningText from "../components/SpinningText";
import Footer from "../components/Footer";
import Header from "../components/Header";

// ---- Reusable helpers ----
const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: easeOut }, // ✅ FIXED
};

const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <motion.div
    {...fadeInUp}
    className="w-full flex flex-col items-center text-center gap-3"
  >
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center justify-center rounded-full p-2 bg-purple-100 dark:bg-purple-900/40">
        {icon}
      </span>
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
    {subtitle ? (
      <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
    ) : null}
  </motion.div>
);

// ---- Page ----
export default function HomePage() {
  // Theme toggle (persists to localStorage)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const [mobileOpen, setMobileOpen] = useState(false);

  // Hero slider (admin can update this array)
  const slides = [
    {
      id: 1,
      title: "Discover Businesses Near You",
      subtitle: "Find the best restaurants, shops, and services in your area.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Events, Jobs & Real Estate",
      subtitle: "Everything happening around you — all in one place.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Grow with Contact365",
      subtitle: "List your business and reach more local customers.",
      image:
        "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1920&auto=format&fit=crop",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide((s) => (s + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  // Mock data
  const features = [
    {
      id: 1,
      icon: <MapPin size={28} />,
      title: "Discover",
      text: "Find local businesses and services near you.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      icon: <Users size={28} />,
      title: "Connect",
      text: "Engage with trusted providers and communities.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      icon: <Briefcase size={28} />,
      title: "Grow",
      text: "Expand your business reach with Contact365.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const recommendedPlaces = [
    {
      id: 1,
      name: "Ocean View Restaurant",
      rating: 4.8,
      category: "Restaurant",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Sunset Lounge",
      rating: 4.6,
      category: "Bar",
      image:
        "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Coastal Spa",
      rating: 4.9,
      category: "Wellness",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const realEstates = [
    {
      id: 1,
      title: "Bright studio apartment to rent",
      price: "$1,400",
      term: "Per month",
      size: "4800 sq ft",
      rooms: "3 rooms",
      baths: "2 bathrooms",
      beds: "6 beds",
      image:
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Charming 1-bedroom flat for rent",
      price: "$850",
      term: "Per month",
      size: "4800 sq ft",
      rooms: "2 rooms",
      baths: "2 bathrooms",
      beds: "6 beds",
      image:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Sunny, Modern room in East Village!",
      price: "$2,800",
      term: "Per month",
      size: "4800 sq ft",
      rooms: "1 room",
      baths: "2 bathrooms",
      beds: "6 beds",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Full stack developer",
      contact: "+39 14 5214 22",
      type: "Part time",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Experienced project manager",
      contact: "+39 14 5214 22",
      type: "Internship",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      contact: "+39 14 5214 22",
      type: "Freelance",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop",
    },
  ];
  // --- Scroll to top button ---
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Sticky Nav */}
      <Header />

      {/* Hero (fluid slider) */}
      <section className="relative w-full h-[80vh] md:h-[85vh] overflow-hidden">
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSlide === i ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden={activeSlide !== i}
          />
        ))}

        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow"
            {...fadeInUp}
          >
            {slides[activeSlide].title}
          </motion.h1>
          <motion.p
            className="mt-4 text-white/90 md:text-lg"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
          >
            {slides[activeSlide].subtitle}
          </motion.p>

          {/* Search bar */}
          <motion.div
            className="mt-8 w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 flex flex-wrap md:flex-nowrap"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter location..."
                className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
              <select className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100">
                {[
                  "All categories",
                  "Restaurants",
                  "Bars & Nightlife",
                  "Shopping",
                  "Hotels",
                  "Activities",
                  "Services",
                  "Entertainment",
                  "Health & Beauty",
                  "Automotive",
                ].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
            <button className="ml-2 px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition">
              Search
            </button>
          </motion.div>

          {/* Slider controls */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 w-8 rounded-full transition ${activeSlide === i
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features (edge-to-edge, own background) */}
      <section className="w-full py-16 bg-white dark:bg-gray-950">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.05 * i }}
              className="rounded-xl bg-gray-50 dark:bg-gray-900 shadow overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2"
            >
              {/* Image with zoom on hover */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full p-3 text-purple-600 bg-purple-50 dark:text-purple-300 dark:bg-purple-900/30">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-1">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.text}</p>
              </div>
            </motion.div>

          ))}
        </div>
      </section>

      {/* What’s happening? (formerly "Recommended for You") */}
      <section className="w-full py-16 bg-gray-100 dark:bg-gray-900">
        <SectionHeader
          icon={<Calendar size={22} className="text-purple-600 dark:text-purple-300" />}
          title="What’s happening?"
          subtitle="Handpicked places trending around you"
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
          {recommendedPlaces.map((place, i) => (
            <motion.article
              key={place.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.05 * i }}
              className="rounded-xl overflow-hidden bg-white dark:bg-gray-950 shadow hover:shadow-xl transition"
            >
              <div className="relative h-48">
                <img
                  src={place.image}
                  alt={place.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {place.category}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {place.rating}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Real Estate */}
      <section className="w-full py-16 bg-white dark:bg-gray-950">
        <SectionHeader
          icon={<HomeIcon size={22} className="text-purple-600 dark:text-purple-300" />}
          title="Real Estate"
          subtitle="Looking for properties to rent?"
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
          {realEstates.map((estate, i) => (
            <motion.article
              key={estate.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.05 * i }}
              className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow hover:shadow-xl transition"
            >
              <div className="relative h-48">
                <img
                  src={estate.image}
                  alt={estate.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{estate.title}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {estate.price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {estate.term}
                  </span>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-3 grid grid-cols-2 gap-y-1">
                  <li>{estate.size}</li>
                  <li>{estate.rooms}</li>
                  <li>{estate.baths}</li>
                  <li>{estate.beds}</li>
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Job openings */}
      <section className="w-full py-16 bg-gray-100 dark:bg-gray-900">
        <SectionHeader
          icon={<Briefcase size={22} className="text-purple-600 dark:text-purple-300" />}
          title="Job openings"
          subtitle="Find job openings near you"
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
          {jobs.map((job, i) => (
            <motion.article
              key={job.id}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.05 * i }}
              className="rounded-xl overflow-hidden bg-white dark:bg-gray-950 shadow hover:shadow-xl transition"
            >
              <div className="relative h-48">
                <img
                  src={job.image}
                  alt={job.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {job.type}
                </p>
                <p className="mt-2 font-medium text-purple-600 dark:text-purple-400">
                  {job.contact}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
      <section
        className="w-full py-20 relative text-white text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(88,28,135,0.85), rgba(88,28,135,0.85)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div {...fadeInUp} className="relative z-10">
          <h2 className="text-3xl font-bold mb-3">
            Grow your business with Contact365
          </h2>
          <p className="mb-8 opacity-90">
            Join thousands of businesses already listed.
          </p>
          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Add Your Listing
          </button>
        </motion.div>
      </section>


      {/* Footer */}
      {/* Footer */}
      <Footer />

      {/* ✅ Back to Top Button with pulse effect */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          showTopBtn
            ? {
                opacity: 1,
                scale: [1, 1.1, 1], // pulse animation
              }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          repeat: showTopBtn ? Infinity : 0,
          repeatType: "mirror",
        }}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* <SpinningText text="Best services" /> */}


    </div>
  );
}

    
