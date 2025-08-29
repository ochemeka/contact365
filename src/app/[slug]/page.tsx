"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { listingsData } from "../../listings/businesses";
import {
  MapPin,
  Phone,
  Globe,
  Bookmark,
  Share2,
  ShieldCheck,
} from "lucide-react";
import ReviewCard from "../../components/ReviewCard";
import EventCard from "../../components/EventCard";
import JobCard from "../../components/JobCard";
import ProductCard from "../../components/ProductCard";

export default function BusinessProfilePage() {
  const { slug } = useParams();
  const business = listingsData.find((b) => b.slug === slug);

  const [activeTab, setActiveTab] = useState<
    "Profile" | "Reviews" | "Events" | "Jobs" | "Store"
  >("Profile");

  if (!business)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Business not found</h1>
        <p className="text-gray-500 mt-2">Try exploring other listings.</p>
      </div>
    );

  // Mock Data with images
  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Excellent service!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Good experience overall.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const events = [
    {
      title: "Networking Night",
      date: "Sept 15, 2025",
      image: "https://source.unsplash.com/400x300/?networking,event",
    },
    {
      title: "Business Expo",
      date: "Oct 10, 2025",
      image: "https://source.unsplash.com/400x300/?expo,conference",
    },
  ];

  const jobs = [
    {
      title: "Frontend Developer",
      type: "Full-time",
      image: "https://source.unsplash.com/400x300/?developer,office",
    },
    {
      title: "Customer Support Officer",
      type: "Part-time",
      image: "https://source.unsplash.com/400x300/?customer,support",
    },
  ];

  const products = [
    { name: "Product A", price: "₦20,000", image: "https://source.unsplash.com/400x300/?product,1" },
    { name: "Product B", price: "₦45,000", image: "https://source.unsplash.com/400x300/?product,2" },
    { name: "Product C", price: "₦75,000", image: "https://source.unsplash.com/400x300/?product,3" },
  ];

  const relatedPages = listingsData
    .filter((b) => b.slug !== slug)
    .slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src={business.image}
            alt={business.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h1 className="text-4xl font-bold">{business.title}</h1>
            <p className="text-lg">{business.category}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-5 gap-4 mt-6 text-sm">
          {[
            { icon: Phone, label: "Call" },
            { icon: Globe, label: "Website" },
            { icon: Bookmark, label: "Save" },
            { icon: Share2, label: "Share" },
            { icon: ShieldCheck, label: "Claim" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center p-3 border rounded-lg bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-lg transition-transform"
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Full-width Tabs */}
        <div className="mt-8 flex w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          {["Profile", "Reviews", "Events", "Jobs", "Store"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "text-gray-500 hover:text-purple-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 space-y-6">
          {activeTab === "Profile" && (
            <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">About</h3>
              <p className="text-gray-700 dark:text-gray-300">{business.description}</p>
              <div className="space-y-2 mt-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin size={16} className="mr-2" /> {business.location}
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone size={16} className="mr-2" /> +234 800 123 4567
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Globe size={16} className="mr-2" /> www.example.com
                </div>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((r, i) => (
                <ReviewCard key={i} {...r} />
              ))}
            </div>
          )}

          {activeTab === "Events" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {events.map((e, i) => (
                <EventCard key={i} {...e} />
              ))}
            </div>
          )}

          {activeTab === "Jobs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {jobs.map((j, i) => (
                <JobCard key={i} {...j} />
              ))}
            </div>
          )}

          {activeTab === "Store" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          )}
        </div>

        {/* Related Pages */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">View Related Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedPages.map((b) => (
              <Link key={b.id} href={`/listings/${b.slug}`}>
                <div className="relative overflow-hidden rounded-lg cursor-pointer group">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h4 className="text-white font-semibold">{b.title}</h4>
                    <p className="text-sm text-gray-200">{b.category}</p>
                    {b.price && (
                      <p className="text-sm text-purple-400 mt-1">
                        ₦{b.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
