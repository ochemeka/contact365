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
    <footer className="w-full bg-gray-900 dark:bg-gray-950 text-gray-300 py-8 sm:py-12 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Logo + About */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src={
                  theme === "dark"
                    ? "/images/contact365logo-light2.png"
                    : "/images/contact365logo-dark.png"
                }
                alt="Contact365 Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Contact365 — Your trusted local business directory.  
              Discover businesses, connect with services, and grow your network.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition-colors duration-200 inline-block">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200 inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/add-listing" className="hover:text-white transition-colors duration-200 inline-block">
                  Add Listing
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base sm:text-lg">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
            
            {/* Additional Links for Mobile */}
            <div className="pt-4 border-t border-gray-800 lg:hidden">
              <p className="text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                {" • "}
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              © {new Date().getFullYear()} Contact365. All rights reserved.
            </p>
            
            {/* Additional Links for Desktop */}
            <div className="hidden lg:flex gap-4 text-xs text-gray-500 order-1 sm:order-2">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}