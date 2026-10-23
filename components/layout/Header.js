
/*
 * File: components/layout/Header.js
 * Purpose: Render the responsive application header with brand identity,
 * desktop navigation, model search entry point, and mobile menu.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Compass,
  Menu,
  Search,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Explore Models",
    href: "/models",
    icon: Compass,
  },
  {
    label: "How to Use",
    href: "/how-to-use",
    icon: BookOpen,
  },
  {
    label: "Compare",
    href: "/compare",
    icon: ChevronDown,
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#071719]/95 backdrop-blur-xl">
      <div className="container-app">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            aria-label="ML Model Atlas home"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#02BFA7]/25 bg-[#102A2B] text-[#02BFA7] transition-colors group-hover:bg-[#153536]">
              <BrainCircuit size={23} strokeWidth={1.8} />
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-bold tracking-tight text-[#DAFBF5] sm:text-base">
                ML Model <span className="text-[#02BFA7]">Atlas</span>
              </span>
              <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[#6F918D] sm:block">
                The model selection guide
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#02BFA7]/10 text-[#02BFA7]"
                      : "text-[#9AB9B5] hover:bg-white/[0.04] hover:text-[#DAFBF5]"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/models"
              aria-label="Search machine learning models"
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.09] bg-[#102A2B]/70 px-3 text-[#9AB9B5] transition-colors hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
            >
              <Search size={16} />
              <span className="hidden text-xs sm:inline">Find a model</span>
            </Link>

            <Link
              href="/how-to-use"
              className="hidden min-h-10 items-center gap-2 rounded-lg bg-[#FF4D2E] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#ed3d21] sm:inline-flex"
            >
              Get started
              <ArrowUpRight size={15} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.09] text-[#DAFBF5] transition-colors hover:bg-[#102A2B] lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-white/[0.08] py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navigation.map(({ label, href, icon: Icon }) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                      active
                        ? "bg-[#02BFA7]/10 text-[#02BFA7]"
                        : "text-[#9AB9B5] hover:bg-white/[0.04] hover:text-[#DAFBF5]"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/how-to-use"
                onClick={closeMenu}
                className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#FF4D2E] px-4 text-sm font-semibold text-white hover:bg-[#ed3d21]"
              >
                Start learning
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
