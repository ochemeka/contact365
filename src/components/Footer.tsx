// components/Footer.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="w-full bg-gray-900 dark:bg-gray-950 text-gray-300 py-8 sm:py-12 border-t border-gray-800 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo + About */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <img
                src={
                  theme === "dark"
                    ? "/images/contact365logo-light2.png"
                    : "/images/contact365logo-dark.png"
                }
                alt="Contact365 Logo"
                className="h-8 w-auto max-w-full"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Contact365 — Your trusted local business directory.
              Discover businesses, connect with services, and grow your network.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition block">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/add-listing" className="hover:text-white transition block">
                  Add Listing
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base">Follow Us</h4>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            © {new Date().getFullYear()} Contact365. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}