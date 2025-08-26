"use client";

// import { useTheme } from "@/context/ThemeContext";
import { useTheme } from "../context/ThemeContext";


export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}