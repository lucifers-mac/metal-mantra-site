"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Show {
  id: string;
  name: string;
  date: string;
  time: string | null;
  venue: string;
  city: string;
  state: string;
  distance: number | null;
  artists: string[];
  genre: string;
  ticketUrl: string;
  image: string | null;
}

interface ShowsResponse {
  shows: Show[];
  total: number;
  totalPages: number;
  page: number;
  zip: string;
  radius: number;
}

const RADIUS_OPTIONS = [25, 50, 100, 150, 200];

const GENRE_FILTERS = [
  { label: "All", value: "all", match: [] },
  { label: "Metal / Hard Rock", value: "metal", match: ["metal", "hard rock"] },
  { label: "Rock", value: "rock", match: ["rock"] },
  { label: "Alternative", value: "alternative", match: ["alternative", "indie"] },
  { label: "Punk", value: "punk", match: ["punk"] },
  { label: "Pop", value: "pop", match: ["pop"] },
  { label: "Hip-Hop", value: "hip-hop", match: ["hip-hop", "rap"] },
  { label: "R&B", value: "r&b", match: ["r&b", "soul"] },
  { label: "Country", value: "country", match: ["country"] },
  { label: "EDM", value: "edm", match: ["electro", "dance", "edm", "house", "techno", "trance"] },
  { label: "Latin", value: "latin", match: ["latin", "reggaeton"] },
  { label: "Jazz", value: "jazz", match: ["jazz"] },
  { label: "Classical", value: "classical", match: ["classical", "symphony", "opera"] },
];

function formatShowDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatShowTime(time: string | null): string {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function groupByDate(shows: Show[]): Record<string, Show[]> {
  const groups: Record<string, Show[]> = {};
  for (const show of shows) {
    if (!groups[show.date]) groups[show.date] = [];
    groups[show.date].push(show);
  }
  return groups;
}

export default function CalendarPage() {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(50);
  const [shows, setShows] = useState<Show[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [genreFilter, setGenreFilter] = useState("all");

  // Load saved zip from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mm-zip");
    const savedRadius = localStorage.getItem("mm-radius");
    if (saved) setZip(saved);
    if (savedRadius) setRadius(parseInt(savedRadius));
  }, []);

  const fetchShows = useCallback(async (z: string, r: number, p: number) => {
    if (!/^\d{5}$/.test(z)) {
      setError("Enter a valid 5-digit zip code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/shows?zip=${z}&radius=${r}&page=${p}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ShowsResponse = await res.json();
      setShows(data.shows);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setPage(data.page);
      setSearched(true);
      // Save preference
      localStorage.setItem("mm-zip", z);
      localStorage.setItem("mm-radius", String(r));
    } catch {
      setError("Couldn't load shows. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search if zip is saved
  useEffect(() => {
    const saved = localStorage.getItem("mm-zip");
    if (saved && /^\d{5}$/.test(saved)) {
      const savedRadius = parseInt(localStorage.getItem("mm-radius") || "50");
      fetchShows(saved, savedRadius, 0);
    }
  }, [fetchShows]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShows(zip, radius, 0);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          // Reverse geocode to zip
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await res.json();
          const detectedZip = data.address?.postcode?.slice(0, 5);
          if (detectedZip) {
            setZip(detectedZip);
            fetchShows(detectedZip, radius, 0);
          } else {
            setError("Couldn't detect your zip code. Enter it manually.");
            setLoading(false);
          }
        } catch {
          setError("Location lookup failed. Enter your zip manually.");
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Enter your zip manually.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1
          className="text-3xl md:text-5xl font-black text-white tracking-wider"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SHOWS NEAR YOU
        </h1>
        <p className="mt-3 text-mantra-muted max-w-xl mx-auto">
          Every live music event in your area. Enter your zip, pick your radius, find your next show.
        </p>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-10">
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="Zip code"
              maxLength={5}
              className="flex-1 bg-mantra-dark border border-mantra-border rounded-lg px-4 py-3 text-white text-center text-lg tracking-wider placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            />
            <button
              type="button"
              onClick={handleGeolocation}
              className="px-3 py-3 bg-mantra-card border border-mantra-border rounded-lg text-mantra-muted hover:text-white hover:border-mantra-red/30 transition-all"
              title="Use my location"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <select
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="bg-mantra-dark border border-mantra-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-mantra-red/50 transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {RADIUS_OPTIONS.map((r) => (
              <option key={r} value={r}>{r} miles</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {loading ? "Searching..." : "Find Shows"}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-center text-red-400 text-sm">{error}</p>
        )}
      </form>

      {/* Genre Filters */}
      {searched && !loading && shows.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {GENRE_FILTERS.map((g) => (
            <button
              key={g.value}
              onClick={() => setGenreFilter(g.value)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border transition-all ${
                genreFilter === g.value
                  ? "bg-mantra-red text-white border-mantra-red"
                  : "bg-mantra-card text-mantra-muted border-mantra-border hover:text-white hover:border-mantra-red/30"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {searched && !loading && (() => {
        const activeFilter = GENRE_FILTERS.find((f) => f.value === genreFilter);
        const filtered = genreFilter === "all"
          ? shows
          : shows.filter((s) => {
              const g = s.genre.toLowerCase();
              return activeFilter?.match.some((m) => g.includes(m)) ?? false;
            });
        const grouped = groupByDate(filtered);
        const sortedDates = Object.keys(grouped).sort();
        return (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-mantra-muted">
              <span className="text-white font-bold">{filtered.length}</span>{genreFilter !== "all" ? ` ${genreFilter}` : ""} shows within{" "}
              <span className="text-white font-bold">{radius} miles</span> of{" "}
              <span className="text-white font-bold">{zip}</span>
            </p>
            {total > 0 && (
              <p className="text-[11px] text-mantra-dim uppercase tracking-wider">
                Sorted by date
              </p>
            )}
          </div>

          {shows.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-mantra-muted mb-2">No shows found</p>
              <p className="text-sm text-mantra-dim">Try a larger radius or different zip code.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date}>
                  {/* Date Header */}
                  <div className="sticky top-[88px] z-10 bg-mantra-black/95 backdrop-blur-sm py-2 mb-3 border-b border-mantra-border/50">
                    <h2
                      className="text-sm font-bold uppercase tracking-[0.15em] text-mantra-red"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {formatShowDate(date)}
                    </h2>
                  </div>

                  {/* Shows for this date */}
                  <div className="space-y-3">
                    {grouped[date].map((show) => (
                      <a
                        key={show.id}
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex gap-4 bg-mantra-card border border-mantra-border rounded-lg p-4 hover:border-mantra-red/30 transition-all"
                      >
                        {/* Image */}
                        {show.image && (
                          <div className="hidden sm:block w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                            <img
                              src={show.image}
                              alt={show.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white leading-tight group-hover:text-mantra-red-hot transition-colors line-clamp-1">
                            {show.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 flex-wrap text-sm text-mantra-muted">
                            <span>{show.venue}</span>
                            <span className="text-mantra-border">·</span>
                            <span>{show.city}, {show.state}</span>
                            {show.distance !== null && (
                              <>
                                <span className="text-mantra-border">·</span>
                                <span className="text-mantra-dim">{show.distance} mi</span>
                              </>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-mantra-dim">
                            {show.time && <span>{formatShowTime(show.time)}</span>}
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                              show.genre.toLowerCase().includes("metal") || show.genre.toLowerCase().includes("hard rock")
                                ? "bg-mantra-red/10 text-mantra-red-hot border-mantra-red/30"
                                : show.genre.toLowerCase().includes("alternative") || show.genre.toLowerCase().includes("punk")
                                  ? "bg-amber-900/30 text-amber-400 border-amber-500/30"
                                  : "bg-purple-900/30 text-purple-400 border-purple-500/30"
                            }`}>
                              {show.genre}
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex-shrink-0 flex items-center">
                          <span
                            className="px-4 py-2 bg-mantra-red/10 border border-mantra-red/30 text-mantra-red text-xs font-bold uppercase tracking-wider rounded group-hover:bg-mantra-red group-hover:text-white transition-all whitespace-nowrap"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            Get Tickets
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => fetchShows(zip, radius, page - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white rounded transition-colors disabled:opacity-30"
              >
                ← Prev
              </button>
              <span className="text-sm text-mantra-dim">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => fetchShows(zip, radius, page + 1)}
                disabled={page >= totalPages - 1}
                className="px-4 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white rounded transition-colors disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          )}
        </>
        );
      })()}

      {/* Empty state — first visit, no saved zip */}
      {!searched && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🤘</div>
          <p className="text-xl text-mantra-muted mb-2">Find your next show</p>
          <p className="text-sm text-mantra-dim max-w-md mx-auto">
            Enter your zip code above and we'll show you every live music event coming to your area.
            Your location is saved locally — you'll never have to enter it again.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 pt-6 border-t border-mantra-border/30 text-center">
        <p className="text-[11px] text-mantra-dim">
          Show data powered by Ticketmaster. Ticket links may generate affiliate commissions.
          <br />
          <Link href="/privacy/" className="text-mantra-muted hover:text-mantra-red transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
