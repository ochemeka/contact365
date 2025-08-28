"use client";

import { useState } from "react";
import { Calendar, User, Search } from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [blogPosts] = useState([
    {
      id: 1,
      title: "Nigeria’s Role in Africa’s Digital Transformation",
      author: "Chika Okafor",
      date: "Feb 26, 2025",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format",
      category: "Technology",
      excerpt:
        "How Nigeria is shaping Africa’s future through fintech, startups, and innovation hubs.",
    },
    {
      id: 2,
      title: "Opportunities for Nigerians in the Global Job Market",
      author: "Aisha Bello",
      date: "Feb 20, 2025",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format",
      category: "Global Career",
      excerpt:
        "Remote work, freelancing, and international opportunities for Nigerian professionals.",
    },
    {
      id: 3,
      title: "Nigeria’s Creative Industry on the World Stage",
      author: "Tunde Johnson",
      date: "Feb 18, 2025",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80&auto=format",
      category: "Culture",
      excerpt:
        "Nollywood, Afrobeats, and Nigerian art making waves globally.",
    },
  ]);

  const categories = ["All", "Technology", "Global Career", "Culture"];

  // ✅ Filter posts by category + search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Latest Articles
        </h1>

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 dark:border-gray-700 px-5 py-2 pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BLOG GRID */}
        {filteredPosts.length > 0 ? (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase text-purple-600">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.id}`}>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-2 line-clamp-2 hover:text-purple-600 transition">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4">
                    <User size={14} className="mr-1" /> {post.author}
                    <span className="mx-2">•</span>
                    <Calendar size={14} className="mr-1" /> {post.date}
                    <span className="ml-2">({post.readTime})</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
            No posts found matching your search.
          </p>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
