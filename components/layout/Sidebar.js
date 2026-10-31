
/*
 * File: components/layout/Sidebar.js
 * Purpose: Responsive, collapsible navigation for ML Model Atlas.
 *
 * Features:
 * - Expandable and collapsible desktop sidebar.
 * - Icon-only navigation when collapsed.
 * - Slide-out navigation drawer on mobile.
 * - Active-route highlighting.
 * - Navigation tooltips and accessible labels.
 * - Model selection tip in the expanded sidebar.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  GitCompareArrows,
  House,
  Lightbulb,
  Network,
  X,
  MessageSquareText,
  Workflow,
  Waypoints
} from "lucide-react";

// Organize navigation links into logical groups.
const navigationGroups = [
  {
    title: "LEARN",
    items: [
      {
        label: "Overview",
        href: "/",
        icon: House,
      },
      {
        label: "How to use",
        href: "/how-to-use",
        icon: Lightbulb,
      },
      {
        label: "Model library",
        href: "/models",
        icon: BrainCircuit,
      },
      {
        label: "Model selector",
        href: "/selector",
        icon: Network,
      },
    ],
  },
  {
    title: "EXPLORE",
    items: [
      {
        label: "Compare models",
        href: "/compare",
        icon: GitCompareArrows,
      },
      {
        label: "ML workflows",
        href: "/workflows",
        icon: ChartNoAxesCombined,
      },
      {
        label: "RAG Deep Dive",
        href: "/rag-deep-dive",
        icon: Workflow,
      },
      {
        label: "RAG Visualizer",
        href: "/rag-visualizer",
        icon: Waypoints,
      },
      {
        label: "Interview Q/A",
        href: "/interview-qa",
        icon: MessageSquareText,
      },
      {
        label: "Glossary",
        href: "/glossary",
        icon: BookOpen,
      },
    ],
  },
];

export default function Sidebar({
  isOpen = false,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const pathname = usePathname();

  // Highlight the current route and its nested pages.
  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Dark backdrop shown when the mobile drawer is open. */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main sidebar container. */}
      <aside
        id="main-sidebar"
        aria-label="Sidebar navigation"
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          border-r border-white/[0.08] bg-[#091D1F]
          transition-[width,transform] duration-300 ease-in-out
          lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0
          ${isCollapsed ? "w-20" : "w-72"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand section. */}
        <div
          className={`
            flex h-20 shrink-0 items-center
            border-b border-white/[0.08]
            ${isCollapsed ? "justify-center px-2" : "justify-between px-5"}
          `}
        >
          <Link
            href="/"
            onClick={onClose}
            title="ML Model Atlas home"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#02BFA7]/25 bg-[#02BFA7]/10 text-[#02BFA7]">
              <BrainCircuit size={22} />
            </span>

            {!isCollapsed && (
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-sm font-semibold tracking-wide text-[#DAFBF5]">
                  ML Model Atlas
                </span>

                <span className="mt-0.5 block whitespace-nowrap text-xs text-[#779996]">
                  A practical field guide
                </span>
              </span>
            )}
          </Link>

          {/* Mobile drawer close button. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-[#8BAEAA] transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation links. */}
        <nav
          aria-label="Main navigation"
          className={`
            flex-1 space-y-8 overflow-y-auto py-7
            ${isCollapsed ? "px-3" : "px-4"}
          `}
        >
          {navigationGroups.map((group) => (
            <section key={group.title}>
              {/* Group headings are hidden in collapsed mode. */}
              {!isCollapsed && (
                <h2 className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] text-[#668784]">
                  {group.title}
                </h2>
              )}

              {isCollapsed && (
                <div className="mb-3 border-t border-white/[0.08]" />
              )}

              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        title={isCollapsed ? item.label : undefined}
                        aria-label={item.label}
                        aria-current={active ? "page" : undefined}
                        className={`
                          group relative flex items-center rounded-xl
                          py-3 text-sm transition-colors duration-200
                          ${isCollapsed ? "justify-center px-2" : "gap-3 px-3"}
                          ${
                            active
                              ? "bg-[#02BFA7]/10 font-medium text-[#DAFBF5]"
                              : "text-[#8BAEAA] hover:bg-white/[0.04] hover:text-[#DAFBF5]"
                          }
                        `}
                      >
                        {/* Active-route indicator. */}
                        {active && (
                          <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#02BFA7]" />
                        )}

                        <Icon
                          size={18}
                          className={`
                            shrink-0 transition-colors
                            ${
                              active
                                ? "text-[#02BFA7]"
                                : "text-[#668784] group-hover:text-[#02BFA7]"
                            }
                          `}
                        />

                        {/* Hide labels and arrows in collapsed mode. */}
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 whitespace-nowrap">
                              {item.label}
                            </span>

                            {active && (
                              <ChevronRight
                                size={15}
                                className="text-[#02BFA7]"
                              />
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        {/* Helpful tip shown only when expanded. */}
        {!isCollapsed && (
          <div className="shrink-0 border-t border-white/[0.08] p-4">
            <div className="rounded-xl border border-[#02BFA7]/15 bg-[#102A2B]/70 p-4">
              <div className="mb-3 flex items-center gap-2 text-[#02BFA7]">
                <CircleHelp size={17} />

                <span className="text-xs font-semibold">
                  MODEL SELECTION TIP
                </span>
              </div>

              <p className="text-xs leading-5 text-[#A3BFBB]">
                Start with your problem type, then consider your data,
                constraints, and evaluation metric.
              </p>

              <Link
                href="/how-to-use"
                onClick={onClose}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#02BFA7] transition hover:text-[#DAFBF5]"
              >
                Read the guide
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Desktop expand/collapse control. */}
        <div
          className={`
            hidden shrink-0 border-t border-white/[0.08] p-3 lg:block
            ${isCollapsed ? "px-4" : ""}
          `}
        >
          <button
            type="button"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            className={`
              flex w-full items-center rounded-lg py-2
              text-xs text-[#8BAEAA]
              transition hover:bg-white/[0.05] hover:text-[#DAFBF5]
              ${isCollapsed ? "justify-center" : "gap-3 px-3"}
            `}
          >
            {isCollapsed ? (
              <ChevronsRight size={18} />
            ) : (
              <>
                <ChevronsLeft size={18} />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
