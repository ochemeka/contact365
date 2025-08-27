"use client";

import React from "react";
import { Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Exploring Lagos Like a Local",
    excerpt:
      "Discover hidden gems in Lagos with our ultimate travel tips for food, nightlife, and culture.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    author: "Admin",
    date: "Aug 24, 2025",
    category: "Travel",
  },
  {
    id: 2,
    title: "How to Find Remote Jobs in Nigeria",
    excerpt:
      "Remote work is changing lives in Nigeria. Learn where to find jobs, build skills, and earn globally.",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80",
    author: "Mercy Musa",
    date: "Aug 18, 2025",
    category: "Jobs",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Our Blog
        </h1>

        {/* ✅ Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg overflow-hidden transition"
            >
              <Link href={`/blog/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </Link>

              <div className="p-4">
                <span className="text-xs uppercase font-semibold text-purple-600">
                  {post.category}
                </span>
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-lg font-semibold mt-2 hover:text-purple-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <User size={14} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {post.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
