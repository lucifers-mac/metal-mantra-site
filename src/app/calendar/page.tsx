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
  priceMin: number | null;
  priceMax: number | null;
}

interface ShowsResponse {
  shows: Show[];
  total: number;
  totalPages: number;
  page: number;
  zip: string;
  radius: number;
  keyword: string | null;
}

const RADIUS_OPTIONS = [25, 50, 100, 150, 200];

const SORT_OPTIONS = [
  { label: "Date (Soonest)", value: "date" },
  { label: "Date (Latest)", value: "date-desc" },
  { label: "Name (A-Z)", value: "name" },
  { label: "Distance", value: "distance" },
];

const GENRE_FILTERS = [
  { label: "All", value: "all", match: [] as string[] },
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

type ViewMode = "list" | "calendar";

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

function formatPrice(min: number | null, max: number | null): string {
  if (min === null && max === null) return "";
  if (min === max || max === null) return `$${min}`;
  if (min === null) return `$${max}`;
  return `$${min}–$${max}`;
}

function groupByDate(shows: Show[]): Record<string, Show[]> {
  const groups: Record<string, Show[]> = {};
  for (const show of shows) {
    if (!groups[show.date]) groups[show.date] = [];
    groups[show.date].push(show);
  }
  return groups;
}

function genreBadgeClass(genre: string): string {
  const g = genre.toLowerCase();
  if (g.includes("metal") || g.includes("hard rock"))
    return "bg-mantra-red/10 text-mantra-red-hot border-mantra-red/30";
  if (g.includes("alternative") || g.includes("punk") || g.includes("indie"))
    return "bg-amber-900/30 text-amber-400 border-amber-500/30";
  if (g.includes("hip-hop") || g.includes("rap") || g.includes("r&b"))
    return "bg-blue-900/30 text-blue-400 border-blue-500/30";
  if (g.includes("country"))
    return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30";
  if (g.includes("electro") || g.includes("dance") || g.includes("edm"))
    return "bg-cyan-900/30 text-cyan-400 border-cyan-500/30";
  return "bg-purple-900/30 text-purple-400 border-purple-500/30";
}

function ShowCard({ show }: { show: Show }) {
  return (
    <a
      href={show.ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 bg-mantra-card border border-mantra-border rounded-lg p-4 hover:border-mantra-red/30 transition-all"
    >
      {show.image && (
        <div className="hidden sm:block w-24 h-24 flex-shrink-0 rounded overflow-hidden">
          <img src={show.image} alt={show.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
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
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${genreBadgeClass(show.genre)}`}>
            {show.genre}
          </span>
          {(show.priceMin !== null || show.priceMax !== null) && (
            <span className="text-mantra-muted font-medium">{formatPrice(show.priceMin, show.priceMax)}</span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center">
        <span
          className="px-4 py-2 bg-mantra-red/10 border border-mantra-red/30 text-mantra-red text-xs font-bold uppercase tracking-wider rounded group-hover:bg-mantra-red group-hover:text-white transition-all whitespace-nowrap"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Get Tickets
        </span>
      </div>
    </a>
  );
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
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeKeyword, setActiveKeyword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("mm-zip");
    const savedRadius = localStorage.getItem("mm-radius");
    if (saved) setZip(saved);
    if (savedRadius) setRadius(parseInt(savedRadius));
  }, []);

  const fetchShows = useCallback(async (z: string, r: number, p: number, sort: string, q?: string) => {
    if (!q && !/^\d{5}$/.test(z)) {
      setError("Enter a valid 5-digit zip code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ radius: String(r), page: String(p), sort });
      if (z) params.set("zip", z);
      if (q) params.set("q", q);
      const res = await fetch(`/api/shows?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ShowsResponse = await res.json();
      setShows(data.shows);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setPage(data.page);
      setSearched(true);
      setActiveKeyword(q || "");
      if (z) {
        localStorage.setItem("mm-zip", z);
        localStorage.setItem("mm-radius", String(r));
      }
    } catch {
      setError("Couldn't load shows. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("mm-zip");
    if (saved && /^\d{5}$/.test(saved)) {
      const savedRadius = parseInt(localStorage.getItem("mm-radius") || "50");
      fetchShows(saved, savedRadius, 0, "date");
    }
  }, [fetchShows]);

  const handleBrowse = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery("");
    fetchShows(zip, radius, 0, sortBy);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetchShows(zip, radius, 0, "relevance", searchQuery.trim());
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    fetchShows(zip, radius, 0, newSort, activeKeyword || undefined);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) { setError("Geolocation not supported"); return; }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
          const data = await res.json();
          const detectedZip = data.address?.postcode?.slice(0, 5);
          if (detectedZip) { setZip(detectedZip); fetchShows(detectedZip, radius, 0, sortBy); }
          else { setError("Couldn't detect zip. Enter manually."); setLoading(false); }
        } catch { setError("Location lookup failed."); setLoading(false); }
      },
      () => { setError("Location access denied."); setLoading(false); }
    );
  };

  // Apply client-side genre filter
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
          SHOWS NEAR YOU
        </h1>
        <p className="mt-2 text-mantra-muted max-w-xl mx-auto text-sm">
          Every live music event in your area. Browse by location or search for any artist, venue, or tour.
        </p>
      </header>

      {/* Search + Location Bar */}
      <div className="mb-8 space-y-3 max-w-3xl mx-auto">
        {/* Artist/Venue Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mantra-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artist, band, venue, or tour..."
              className="w-full bg-mantra-dark border border-mantra-border rounded-lg pl-10 pr-4 py-3 text-white placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-3 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Search
          </button>
        </form>

        {/* Location + Radius */}
        <form onSubmit={handleBrowse} className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="Zip code"
              maxLength={5}
              className="w-28 bg-mantra-dark border border-mantra-border rounded-lg px-3 py-2.5 text-white text-center tracking-wider placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            />
            <button type="button" onClick={handleGeolocation} className="px-2.5 py-2.5 bg-mantra-card border border-mantra-border rounded-lg text-mantra-muted hover:text-white hover:border-mantra-red/30 transition-all" title="Use my location">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <select value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} className="bg-mantra-dark border border-mantra-border rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-mantra-red/50 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
              {RADIUS_OPTIONS.map((r) => (<option key={r} value={r}>{r} miles</option>))}
            </select>
          </div>
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-mantra-card border border-mantra-border text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:border-mantra-red/30 transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-heading)" }}>
            {loading ? "Loading..." : "Browse All"}
          </button>
        </form>

        {activeKeyword && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-mantra-muted">Searching:</span>
            <span className="px-2 py-0.5 bg-mantra-red/10 text-mantra-red-hot border border-mantra-red/30 rounded text-xs font-bold">{activeKeyword}</span>
            <button onClick={() => { setActiveKeyword(""); setSearchQuery(""); fetchShows(zip, radius, 0, sortBy); }} className="text-mantra-dim hover:text-white text-xs transition-colors">✕ Clear</button>
          </div>
        )}

        {error && <p className="text-center text-red-400 text-sm">{error}</p>}
      </div>

      {/* Controls Bar: Genre Filters + Sort + View Toggle */}
      {searched && !loading && shows.length > 0 && (
        <div className="mb-6 space-y-3">
          {/* Genre Filters */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {GENRE_FILTERS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGenreFilter(g.value)}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border transition-all ${
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

          {/* Sort + View */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-mantra-dim uppercase tracking-wider">Sort:</span>
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSortChange(s.value)}
                  className={`px-2 py-1 text-[11px] rounded transition-all ${
                    sortBy === s.value
                      ? "text-white bg-mantra-card border border-mantra-border"
                      : "text-mantra-dim hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-mantra-card border border-mantra-border rounded overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`px-2.5 py-1.5 text-xs transition-colors ${viewMode === "list" ? "bg-mantra-red text-white" : "text-mantra-muted hover:text-white"}`}
                title="List view"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-2.5 py-1.5 text-xs transition-colors ${viewMode === "calendar" ? "bg-mantra-red text-white" : "text-mantra-muted hover:text-white"}`}
                title="Calendar view"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {searched && !loading && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-mantra-muted">
            <span className="text-white font-bold">{filtered.length}</span>
            {genreFilter !== "all" ? ` ${GENRE_FILTERS.find(f => f.value === genreFilter)?.label}` : ""} shows
            {!activeKeyword && <> within <span className="text-white font-bold">{radius} mi</span> of <span className="text-white font-bold">{zip}</span></>}
          </p>
        </div>
      )}

      {/* Results: List View */}
      {searched && !loading && viewMode === "list" && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-mantra-muted mb-2">No shows found</p>
              <p className="text-sm text-mantra-dim">Try a larger radius, different zip, or broader search.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date}>
                  <div className="sticky top-[88px] z-10 bg-mantra-black/95 backdrop-blur-sm py-2 mb-3 border-b border-mantra-border/50">
                    <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-mantra-red" style={{ fontFamily: "var(--font-heading)" }}>
                      {formatShowDate(date)}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {grouped[date].map((show) => <ShowCard key={show.id} show={show} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Results: Calendar View */}
      {searched && !loading && viewMode === "calendar" && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-mantra-muted mb-2">No shows found</p>
              <p className="text-sm text-mantra-dim">Try a larger radius, different zip, or broader search.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {sortedDates.map((date) => (
                <div key={date} className="bg-mantra-card border border-mantra-border rounded-lg overflow-hidden">
                  <div className="bg-mantra-dark/50 px-4 py-2 border-b border-mantra-border/50">
                    <h3 className="text-sm font-bold text-mantra-red uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                      {formatShowDate(date)}
                      <span className="text-mantra-dim font-normal ml-2">({grouped[date].length} show{grouped[date].length !== 1 ? "s" : ""})</span>
                    </h3>
                  </div>
                  <div className="divide-y divide-mantra-border/30">
                    {grouped[date].map((show) => (
                      <a key={show.id} href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-4 py-2.5 hover:bg-mantra-dark/30 transition-colors">
                        <div className="w-16 text-center flex-shrink-0">
                          <span className="text-xs text-mantra-dim">{formatShowTime(show.time) || "TBA"}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white group-hover:text-mantra-red-hot transition-colors truncate">{show.name}</p>
                          <p className="text-xs text-mantra-dim truncate">{show.venue} · {show.city}, {show.state}{show.distance !== null ? ` · ${show.distance} mi` : ""}</p>
                        </div>
                        <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex-shrink-0 ${genreBadgeClass(show.genre)}`}>
                          {show.genre}
                        </span>
                        {(show.priceMin !== null || show.priceMax !== null) && (
                          <span className="hidden sm:inline text-xs text-mantra-muted flex-shrink-0">{formatPrice(show.priceMin, show.priceMax)}</span>
                        )}
                        <span className="text-mantra-red text-xs font-bold uppercase flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-heading)" }}>
                          Tickets →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {searched && !loading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button onClick={() => fetchShows(zip, radius, page - 1, sortBy, activeKeyword || undefined)} disabled={page === 0} className="px-4 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white rounded transition-colors disabled:opacity-30">← Prev</button>
          <span className="text-sm text-mantra-dim">Page {page + 1} of {totalPages}</span>
          <button onClick={() => fetchShows(zip, radius, page + 1, sortBy, activeKeyword || undefined)} disabled={page >= totalPages - 1} className="px-4 py-2 bg-mantra-card border border-mantra-border text-mantra-muted hover:text-white rounded transition-colors disabled:opacity-30">Next →</button>
        </div>
      )}

      {/* Empty state */}
      {!searched && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🤘</div>
          <p className="text-xl text-mantra-muted mb-2">Find your next show</p>
          <p className="text-sm text-mantra-dim max-w-md mx-auto">
            Search for any artist or browse all shows near your zip code. Your location is saved locally — you'll never have to enter it again.
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
