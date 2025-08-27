// components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const linkClass = (href: string) =>
    `relative transition hover:text-purple-600 dark:hover:text-purple-400 ${
      pathname === href
        ? "text-purple-600 dark:text-purple-400 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-purple-600 dark:after:bg-purple-400 after:rounded"
        : ""
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur">
      <div className="w-full flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src={
              theme === "dark"
                ? "/images/contact365logo-light2.png"
                : "/images/contact365logo-dark.png"
            }
            alt="Contact365 Logo"
            width={100}
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme((t) => (t === "light" ? "dark" : "light"))
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Auth Links */}
          <Link href="/signin">
            <button className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition">
              Sign Up
            </button>
          </Link>

          {/* Add Listing CTA */}
          <Link href="/add-listing">
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition">
              Add Listing
            </button>
          </Link>
        </div>

        {/* Mobile Toggles */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Switch */}
          <button
            onClick={() =>
              setTheme((t) => (t === "light" ? "dark" : "light"))
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden w-full border-t border-gray-200 dark:border-gray-800 px-4 py-4 bg-white dark:bg-gray-950 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}
          <Link href="/signin" className={linkClass("/signin")}>
            Sign In
          </Link>
          <Link href="/signup" className={linkClass("/signup")}>
            Sign Up
          </Link>
          <Link href="/add-listing" className={linkClass("/add-listing")}>
            Add Listing
          </Link>
        </div>
      )}
    </header>
  );
}
