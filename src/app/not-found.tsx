import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <h1
        className="text-8xl md:text-[10rem] font-black text-mantra-border leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        404
      </h1>
      <p className="mt-4 text-xl text-white font-bold" style={{ fontFamily: "var(--font-heading)" }}>
        Nothing here but feedback and broken dreams.
      </p>
      <p className="mt-2 text-mantra-muted">
        The page you&apos;re looking for doesn&apos;t exist, got moved, or never made it out of the pit.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold uppercase tracking-wider rounded transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Back to Home
        </Link>
        <Link
          href="/search/"
          className="px-6 py-3 bg-mantra-card border border-mantra-border hover:border-mantra-red/30 text-mantra-muted hover:text-white text-sm font-bold uppercase tracking-wider rounded transition-all"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Search
        </Link>
      </div>
    </div>
  );
}
