import type { Metadata } from "next";
// import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeProvider } from "../context/ThemeContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Contact365",
  description: "Contact365 is a modern business listing and networking platform. Discover businesses, explore categories, and connect with trusted services all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}