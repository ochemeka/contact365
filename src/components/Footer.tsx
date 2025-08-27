// components/Footer.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Only detect theme from <html>, no toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initialize
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="w-full bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 mt-12 border-t border-gray-800">
      <div className="px-4 md:px-6 grid gap-8 md:grid-cols-3">
        {/* Logo + About */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <img
              src={
                theme === "dark"
                  ? "/images/contact365logo-light2.png"
                  : "/images/contact365logo-dark.png"
              }
              alt="Contact365 Logo"
              width={120}
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-3 text-sm text-gray-400">
            Contact365 — Your trusted local business directory.  
            Discover businesses, connect with services, and grow your network.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className="hover:text-white transition">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-500 transition"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-sky-400 transition"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-500 transition"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Contact365. All rights reserved.
      </div>
    </footer>
  );
}
