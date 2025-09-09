// src/hooks/useListings.ts
"use client";
import { useEffect, useState, useMemo } from "react";
import { africanListingsData, Business } from "../listings/businesses";

interface Options {
  sort?: "recent" | "rating";
  limit?: number;
  category?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  country?: string;
  state?: string;
  baseCategories?: string[];
}

export function useListings(options: Options = {}) {
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize baseCategories to prevent unnecessary re-renders
  const baseCategoriesSet = useMemo(() => {
    return new Set((options.baseCategories ?? []).map(c => c.toLowerCase()));
  }, [options.baseCategories]);

  useEffect(() => {
    const processData = async () => {
      setLoading(true);
      
      try {
        let data = [...africanListingsData]; // Use the correct import name

        // Filter by country
        if (options.country) {
          const country = options.country.toLowerCase();
          data = data.filter((b) => b.country.toLowerCase() === country);
        }

        // Filter by state (within country)
        if (options.state) {
          const state = options.state.toLowerCase();
          data = data.filter((b) => b.location.toLowerCase() === state);
        }

        // Filter by category (with "Other" support)
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
              b.location.toLowerCase().includes(q) ||
              b.description.toLowerCase().includes(q) ||
              b.category.toLowerCase().includes(q)
          );
        }

        // Sort data
        if (options.sort === "rating") {
          data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else {
          // Default to "recent" - sort by ID descending (most recent first)
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
        console.error('Error processing listings data:', error);
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
    options.country,
    options.state,
    baseCategoriesSet,
  ]);

  return { items, loading };
}