// src/hooks/useNigeriaListings.ts
"use client";

import { useEffect, useState, useMemo } from "react";
import { nigeriaBusinessData, Business } from "../listings/nigeriaData";

interface Options {
  sort?: "recent" | "rating";
  limit?: number;
  category?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  state?: string;
  lga?: string;
  area?: string;
  baseCategories?: string[];
}

export function useNigeriaListings(options: Options = {}) {
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const baseCategoriesSet = useMemo(() => {
    return new Set((options.baseCategories ?? []).map(c => c.toLowerCase()));
  }, [options.baseCategories]);

  useEffect(() => {
    const processData = async () => {
      setLoading(true);
      
      try {
        let data = [...nigeriaBusinessData];

        // Filter by State
        if (options.state && options.state !== "All") {
          data = data.filter((b) => b.state === options.state);
        }

        // Filter by LGA (within state)
        if (options.lga && options.lga !== "All") {
          data = data.filter((b) => b.lga === options.lga);
        }

        // Filter by Area (within LGA)
        if (options.area && options.area !== "All") {
          data = data.filter((b) => b.area === options.area);
        }

        // Filter by category
        if (options.category) {
          const selected = options.category.trim().toLowerCase();
          if (selected === "other" || selected === "others") {
            data = data.filter((b) => {
              const c = (b.category ?? "").toString().trim().toLowerCase();
              return !c || !baseCategoriesSet.has(c) || c === "other" || c === "others";
            });
          } else {
            data = data.filter(
              (b) => (b.category ?? "").toString().trim().toLowerCase() === selected
            );
          }
        }

        // Filter featured
        if (options.featured) {
          data = data.filter((b) => b.featured);
        }

        // Filter trending
        if (options.trending) {
          data = data.filter((b) => b.trending);
        }

        // Search filter
        if (options.search && options.search.trim()) {
          const q = options.search.toLowerCase().trim();
          data = data.filter(
            (b) =>
              b.title.toLowerCase().includes(q) ||
              b.state.toLowerCase().includes(q) ||
              b.lga.toLowerCase().includes(q) ||
              b.area.toLowerCase().includes(q) ||
              b.description.toLowerCase().includes(q) ||
              b.category.toLowerCase().includes(q)
          );
        }

        // Sort data
        if (options.sort === "rating") {
          data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else {
          data.sort((a, b) => b.id - a.id);
        }

        // Apply pagination
        if (options.page && options.pageSize) {
          const start = (options.page - 1) * options.pageSize;
          const end = start + options.pageSize;
          data = data.slice(start, end);
        }

        // Apply limit
        if (options.limit && !options.page) {
          data = data.slice(0, options.limit);
        }

        setItems(data);
      } catch (error) {
        console.error('Error processing Nigeria listings:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, [
    options.sort,
    options.limit,
    options.category,
    options.featured,
    options.trending,
    options.search,
    options.page,
    options.pageSize,
    options.state,
    options.lga,
    options.area,
    baseCategoriesSet,
  ]);

  return { items, loading };
}