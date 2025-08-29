// components/Carousel.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Business } from "../listings/businesses";

interface CarouselProps {
  id: string; // unique ID like "featured-carousel"
  title: string;
  icon?: React.ReactNode;
  color?: string;
  items: Business[];
  cardWidth?: number; // card width in px
  scrollBy?: number; // scroll amount in px
  showArrows?: boolean; // show/hide arrows
}

export default function Carousel({
  id,
  title,
  icon,
  color = "rgb(30, 64, 175)", // default blue
  items,
  cardWidth = 180,
  scrollBy = 300,
  showArrows = true,
}: CarouselProps) {
  if (!items || items.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -scrollBy : scrollBy, behavior: "smooth" });
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4" style={{ color }}>
        {icon} {title}
      </h2>

      <div className="relative">
        {/* Scrollable container */}
        <div
          id={id}
          className="flex overflow-x-auto gap-4 pb-3 no-scrollbar scroll-smooth"
        >
          {items.map((item) => (
            <Link key={item.id} href={`/${item.slug}`}>
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition"
                style={{ minWidth: cardWidth, maxWidth: cardWidth }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Prev/Next buttons */}
        {showArrows && (
          <>
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 shadow rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 shadow rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
