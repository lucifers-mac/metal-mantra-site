"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "News", href: "/news/" },
  { label: "Rundowns", href: "/rundowns/" },
  { label: "Tours", href: "/tours/" },
  { label: "Festivals", href: "/festivals/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Features", href: "/features/" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-mantra-black/95 backdrop-blur-md border-b border-mantra-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-mantra-red rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>M</span>
            </div>
            <span
              className="text-xl tracking-wider text-white group-hover:text-mantra-red transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              METAL MANTRA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-mantra-muted hover:text-white hover:bg-mantra-card rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search/"
              className="ml-2 px-3 py-2 text-mantra-muted hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-mantra-muted hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <nav className="md:hidden border-t border-mantra-border py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-mantra-muted hover:text-white hover:bg-mantra-card rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-mantra-muted hover:text-white hover:bg-mantra-card rounded-lg transition-all"
            >
              Search
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
