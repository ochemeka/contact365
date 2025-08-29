"use client";

import { useEffect, useState } from "react";
import { listingsData, Business } from "../listings/businesses";

interface Options {
  sort?: "recent" | "rating";
  limit?: number;
  category?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
  /** Base categories used to compute "Other" */
  baseCategories?: string[];
}

export function useListings(options: Options = {}) {
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let data = [...listingsData];

    // Precompute base set for "Other"
    const baseSet = new Set(
      (options.baseCategories ?? []).map((c) => c.toLowerCase())
    );

    // filter by category (with "Other" support)
    if (options.category) {
      const selected = options.category.trim().toLowerCase();

      if (selected === "other" || selected === "others") {
        data = data.filter((b) => {
          const c = (b.category ?? "").toString().trim().toLowerCase();
          // Treat empty/missing category or anything not in baseCategories as "Other"
          return !c || !baseSet.has(c) || c === "other" || c === "others";
        });
      } else {
        data = data.filter(
          (b) =>
            (b.category ?? "").toString().trim().toLowerCase() === selected
        );
      }
    }

    // filter featured
    if (options.featured) {
      data = data.filter((b) => b.featured);
    }

    // filter trending
    if (options.trending) {
      data = data.filter((b) => b.trending);
    }

    // search filter
    if (options.search) {
      const q = options.search.toLowerCase();
      data = data.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // sort
    if (options.sort === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else {
      data.sort((a, b) => b.id - a.id); // assume higher id = newer
    }

    // pagination
    if (options.page && options.pageSize) {
      const start = (options.page - 1) * options.pageSize;
      const end = start + options.pageSize;
      data = data.slice(start, end);
    }

    // limit
    if (options.limit) {
      data = data.slice(0, options.limit);
    }

    setItems(data);
    setLoading(false);
    // IMPORTANT: stringify arrays in deps to avoid re-running on every render
  }, [
    options.sort,
    options.limit,
    options.category,
    options.featured,
    options.trending,
    options.search,
    options.page,
    options.pageSize,
    JSON.stringify(options.baseCategories ?? []),
  ]);

  return { items, loading };
}
