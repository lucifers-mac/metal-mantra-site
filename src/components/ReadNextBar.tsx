"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ReadNextBarProps {
  title: string;
  href: string;
  contentType: string;
}

export default function ReadNextBar({ title, href, contentType }: ReadNextBarProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShow(scrollPercent > 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-mantra-dark/95 backdrop-blur-md border-t border-mantra-border transform transition-transform duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-wider text-mantra-red font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Read Next
          </span>
          <Link href={href} className="block text-sm font-bold text-white hover:text-mantra-red-hot transition-colors truncate mt-0.5">
            {title}
          </Link>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={href}
            className="px-4 py-1.5 bg-mantra-red hover:bg-mantra-red-hot text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Read
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-mantra-muted hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
