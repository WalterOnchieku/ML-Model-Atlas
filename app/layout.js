
/*
 * File: app/layout.js
 * Purpose: Defines the global document layout, metadata,
 * fonts, header, sidebar, and shared page content area.
 */

"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Menu } from "lucide-react";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#071719] font-sans text-[#DAFBF5] antialiased">
        <div className="flex min-h-screen">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() =>
              setSidebarCollapsed((previous) => !previous)
            }
          />

          <div className="flex min-w-0 flex-1 flex-col">
            {/* Mobile navigation trigger. */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-[#071719]/95 px-4 py-3 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
                aria-controls="main-sidebar"
                aria-expanded={sidebarOpen}
                className="rounded-lg border border-white/10 p-2 text-[#DAFBF5] transition hover:border-[#02BFA7]/40 hover:text-[#02BFA7]"
              >
                <Menu size={20} />
              </button>

              <span className="text-sm font-semibold text-[#DAFBF5]">
                ML Model Atlas
              </span>
            </div>

            <Header />

            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
