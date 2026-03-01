"use client";

import { useState, useEffect } from "react";

interface Show {
  id: string;
  name: string;
  date: string;
  city: string;
  state: string;
  ticketUrl: string;
}

interface AffiliateWidgetProps {
  bands: string[]; // tag names — e.g. ["Metallica", "Black Label Society"]
}

const AFFILIATE_BASE = "https://ticketmaster.evyy.net/c/6786771/264167/4272";
const AMAZON_TAG = "metalmantra-20";

function amazonSearchUrl(band: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(band + " music")}&i=digital-music&tag=${AMAZON_TAG}`;
}

function tmAffiliateUrl(url: string): string {
  return `${AFFILIATE_BASE}?u=${encodeURIComponent(url)}`;
}

export default function AffiliateWidget({ bands }: AffiliateWidgetProps) {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  // Use the primary band (first tag) for TM search
  const primaryBand = bands[0];

  useEffect(() => {
    if (!primaryBand) { setLoading(false); return; }

    const savedZip = typeof window !== "undefined" ? localStorage.getItem("mm-zip") : null;
    const zip = savedZip || "90210"; // fallback to LA if no zip saved

    fetch(`/api/shows?zip=${zip}&radius=100&q=${encodeURIComponent(primaryBand)}`)
      .then((r) => r.json())
      .then((data) => {
        setShows((data.shows || []).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [primaryBand]);

  if (!bands.length) return null;

  return (
    <div className="bg-mantra-card border border-mantra-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-mantra-border/50 bg-mantra-dark/50">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-mantra-red"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {primaryBand}
        </p>
      </div>

      <div className="p-4 space-y-3">
        {/* Buy Music */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-mantra-dim mb-1.5 font-bold">Music</p>
          <div className="flex flex-wrap gap-1.5">
            {bands.slice(0, 2).map((band) => (
              <a
                key={band}
                href={amazonSearchUrl(band)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-900/20 border border-amber-500/20 text-amber-400 hover:bg-amber-900/40 hover:border-amber-500/40 rounded text-[11px] font-bold uppercase tracking-wider transition-all"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6.01-4.72 7.28L13 17v5c5.05-.56 9-4.78 9-10 0-5.1-3.84-9.31-9-9.95zM11 2.05C5.95 2.61 2 6.82 2 12c0 5.22 3.95 9.44 9 10v-2.02c-3.95-.49-7-3.85-7-7.98 0-4.13 3.05-7.49 7-7.97V2.05zM12 9v4l3.28 1.94.72-1.21-2.5-1.47V9H12z"/>
                </svg>
                Buy {band}
              </a>
            ))}
          </div>
        </div>

        {/* Upcoming Shows */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-mantra-dim mb-1.5 font-bold">
            {loading ? "Finding Shows..." : shows.length > 0 ? "Upcoming Shows" : "Tour Dates"}
          </p>
          {loading ? (
            <div className="h-8 bg-mantra-dark/50 rounded animate-pulse" />
          ) : shows.length > 0 ? (
            <div className="space-y-1.5">
              {shows.map((show) => (
                <a
                  key={show.id}
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-2.5 py-2 bg-mantra-red/5 border border-mantra-red/20 hover:bg-mantra-red/10 hover:border-mantra-red/40 rounded transition-all"
                >
                  <div>
                    <p className="text-[11px] text-white font-semibold leading-tight">{show.city}, {show.state}</p>
                    <p className="text-[10px] text-mantra-dim">{new Date(show.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                  <span
                    className="text-[10px] text-mantra-red font-bold uppercase tracking-wider group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Tickets →
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <a
              href={`/calendar/?q=${encodeURIComponent(primaryBand)}`}
              className="flex items-center justify-between px-2.5 py-2 bg-mantra-dark border border-mantra-border hover:border-mantra-red/30 rounded text-[11px] text-mantra-muted hover:text-white transition-all"
            >
              <span>Search {primaryBand} shows</span>
              <span className="text-mantra-red">→</span>
            </a>
          )}
        </div>

        {/* See All Shows link */}
        {shows.length > 0 && (
          <a
            href={`/calendar/`}
            className="block text-center text-[10px] text-mantra-dim hover:text-mantra-red transition-colors uppercase tracking-wider font-bold"
          >
            Find more shows near you →
          </a>
        )}
      </div>
    </div>
  );
}
