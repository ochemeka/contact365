"use client";

import React, { useEffect, useState } from "react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

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

// ✅ Example blog data (you can replace with API)
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Exploring Lagos Like a Local",
    content: `
      Lagos is one of the most vibrant cities in Africa. 
      From food to nightlife, here are 10 tips to make the most of your trip:
      
      1. Try the street food (suya, puff-puff, bole).
      2. Visit Nike Art Gallery for cultural immersion.
      3. Explore Lekki Conservation Centre.
      4. Take a boat ride to Tarkwa Bay.
      5. Use ride-hailing apps to move around safely.
      6. Shop at Balogun Market like a pro.
      7. Attend a live Afrobeats concert.
      8. Experience Lagos nightlife at Victoria Island.
      9. Don’t forget sunscreen for the tropics.
      10. Always stay hydrated!
    `,
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    author: "Admin",
    date: "Aug 24, 2025",
    category: "Travel",
  },
  {
    id: 2,
    title: "How to Find Remote Jobs in Nigeria",
    content: `
      Remote work is booming worldwide, and Nigerians are tapping into opportunities.
      Platforms like Upwork, Fiverr, and Toptal connect freelancers to global clients.
      Key tips:
      
      - Build a strong LinkedIn profile.
      - Learn in-demand skills like React, Next.js, UI/UX.
      - Pitch professionally to clients.
      - Use Payoneer or Wise for payments.
      
      With dedication, remote jobs can change your financial future.
    `,
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=80",
    author: "Mercy Musa",
    date: "Aug 18, 2025",
    category: "Jobs",
  },
];

export default function BlogPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const post = blogPosts.find((p) => p.id === Number(id));

  const adImages = [
    "https://images.unsplash.com/photo-1607082349566-187342350d9f?w=600&q=80&auto=format",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80&auto=format",
  ];

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">
            Blog post not found.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ✅ Blog content */}
          <div className="lg:col-span-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm text-purple-600 mb-4 hover:underline"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            <div className="mt-6">
              <span className="text-xs font-semibold uppercase text-purple-600">
                {post.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <User size={14} /> {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {post.date}
                </span>
              </div>

              <article className="prose dark:prose-invert max-w-none mt-6">
                {post.content.split("\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </article>
            </div>
          </div>

          {/* ✅ Right: Sticky Ads */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
            {adImages.map((src, idx) => (
              <Ad
                key={idx}
                localSrc={src}
                alt={`Ad Banner ${idx + 1}`}
                style={{ height: 300 }}
              />
            ))}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
