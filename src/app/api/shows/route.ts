import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TICKETMASTER_API_KEY || "";
const TM_BASE = "https://app.ticketmaster.com/discovery/v2/events.json";

// Impact affiliate base URL for Ticketmaster
const AFFILIATE_BASE = "https://ticketmaster.evyy.net/c/6786771/264167/4272";

function affiliateUrl(tmUrl: string): string {
  return `${AFFILIATE_BASE}?u=${encodeURIComponent(tmUrl)}`;
}

// Geocode zip to lat/long using Zippopotam (free, no key)
async function geocodeZip(zip: string): Promise<{ lat: string; lon: string } | null> {
  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      next: { revalidate: 86400 }, // cache 24h — zips don't move
    });
    if (!res.ok) return null;
    const data = await res.json();
    const place = data.places?.[0];
    if (!place) return null;
    return { lat: place.latitude, lon: place.longitude };
  } catch {
    return null;
  }
}

interface TMEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: { localDate: string; localTime?: string };
    status?: { code: string };
  };
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: { name: string };
      state?: { stateCode: string };
      distance?: number;
      units?: string;
    }>;
    attractions?: Array<{
      name: string;
    }>;
  };
  images?: Array<{ url: string; width: number; height: number; ratio: string }>;
  classifications?: Array<{
    genre?: { id: string; name: string };
    subGenre?: { id: string; name: string };
    segment?: { name: string };
  }>;
}

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

export async function GET(req: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json({ error: "Ticketmaster API not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const zip = searchParams.get("zip") || "";
    const radius = searchParams.get("radius") || "50";
    const page = searchParams.get("page") || "0";

    if (!zip || !/^\d{5}$/.test(zip)) {
      return NextResponse.json({ error: "Valid 5-digit zip code required" }, { status: 400 });
    }

    // Geocode zip to lat/long — postalCode param returns garbage results
    const geo = await geocodeZip(zip);
    if (!geo) {
      return NextResponse.json({ error: "Could not locate that zip code" }, { status: 400 });
    }

    // Query Ticketmaster Discovery API using latlong (massively more results than postalCode)
    const params = new URLSearchParams({
      apikey: API_KEY,
      latlong: `${geo.lat},${geo.lon}`,
      radius,
      unit: "miles",
      segmentName: "Music",
      sort: "date,asc",
      size: "80",
      page,
    });

    const tmRes = await fetch(`${TM_BASE}?${params}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 21600 }, // cache 6 hours
    });

    if (!tmRes.ok) {
      const err = await tmRes.text();
      console.error("Ticketmaster API error:", tmRes.status, err);
      return NextResponse.json({ error: "Failed to fetch shows" }, { status: 502 });
    }

    const data = await tmRes.json();
    const events: TMEvent[] = data._embedded?.events || [];
    const totalPages = data.page?.totalPages || 1;
    const totalElements = data.page?.totalElements || 0;

    // Deduplicate — same event name + same date + same venue = one entry
    const seen = new Set<string>();
    const shows: Show[] = [];

    for (const e of events) {
      const venue = e._embedded?.venues?.[0];
      const dedupeKey = `${e.name}|${e.dates.start.localDate}|${venue?.name || ""}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      const artists = e._embedded?.attractions?.map((a) => a.name) || [];
      const classification = e.classifications?.[0];
      const subGenre = classification?.subGenre?.name;
      const mainGenre = classification?.genre?.name;
      const genre = (subGenre && subGenre !== "Other" && subGenre !== "Undefined")
        ? subGenre
        : (mainGenre && mainGenre !== "Other" && mainGenre !== "Undefined")
          ? mainGenre
          : "Rock";

      // Pick best image (prefer 16:9, largest)
      const img = e.images
        ?.filter((i) => i.ratio === "16_9")
        .sort((a, b) => b.width - a.width)[0]
        || e.images?.[0];

      shows.push({
        id: e.id,
        name: e.name,
        date: e.dates.start.localDate,
        time: e.dates.start.localTime || null,
        venue: venue?.name || "TBA",
        city: venue?.city?.name || "",
        state: venue?.state?.stateCode || "",
        distance: venue?.distance ? Math.round(venue.distance) : null,
        artists,
        genre,
        ticketUrl: affiliateUrl(e.url),
        image: img?.url || null,
      });
    }

    return NextResponse.json({
      shows,
      total: totalElements,
      totalPages,
      page: parseInt(page),
      zip,
      radius: parseInt(radius),
    });
  } catch (e) {
    console.error("Shows route error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
