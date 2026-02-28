"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "News", href: "/news/" },
  { label: "Tours", href: "/tours/" },
  { label: "Festivals", href: "/festivals/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Features", href: "/features/" },
  { label: "Rundowns", href: "/rundowns/" },
  { label: "Shows", href: "/calendar/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top red accent bar */}
      <div className="h-1 bg-mantra-red" />

      {/* Banner / Logo Area */}
      <div className="bg-mantra-black border-b border-mantra-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-center">
          <Link href="/" className="block banner-logo">
            <img
              src="/metal-mantra-banner.png"
              alt="Metal Mantra"
              className="h-14 sm:h-16 md:h-20 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-mantra-dark/95 backdrop-blur-md border-b border-mantra-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-11">
            {/* Desktop Nav — centered */}
            <div className="hidden md:flex items-center justify-center w-full gap-0">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-mantra-muted hover:text-white hover:bg-mantra-card transition-all"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="w-px h-5 bg-mantra-border mx-1" />
              <Link
                href="/search/"
                className="px-3 py-2 text-mantra-muted hover:text-white transition-colors"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            </div>

            {/* Mobile: logo + hamburger */}
            <span className="md:hidden text-sm uppercase tracking-wider text-mantra-muted font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-mantra-muted hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden border-t border-mantra-border py-2 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-mantra-muted hover:text-white hover:bg-mantra-card transition-all"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/search/"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-mantra-muted hover:text-white hover:bg-mantra-card transition-all"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Search
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
