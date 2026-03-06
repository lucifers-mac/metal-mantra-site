import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://res.cloudinary.com https://metal-mantra.com https://*.wp.com",
      "media-src 'self' https://res.cloudinary.com",
      "connect-src 'self' https://www.google-analytics.com https://api.klaviyo.com",
      "frame-src https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

// 301 redirects: slug cleanup (March 2026) — permanent, preserves link equity
const slugRedirects = [
  ["metal-hard-rock-news-february-25-2026-hall-of-fame-nods-ghost-hiatus-and-better-lovers-split", "metal-hard-rock-news-february-25-2026"],
  ["louder-than-life-2026-lineup-announced-iron-maiden-tool-pantera-mcr-nearly-200-bands", "louder-than-life-2026-lineup-announced"],
  ["shiprocked-2026-review-metal-cruise-dead-poet-society-knocked-loose", "shiprocked-2026-review"],
  ["shiprocked-2025-review-a-week-at-sea-where-sleep-lost-and-riffs-won", "shiprocked-2025-review"],
  ["slayer-to-celebrate-40-years-of-reign-in-blood-at-rocklahoma-2026", "slayer-reign-in-blood-40th-rocklahoma-2026"],
  ["shiprocked-2027-jan-24-30-cruise-announced-after-sold-out-2026", "shiprocked-2027-cruise-announced"],
  ["best-metal-biographies-on-audible-the-essential-listening-list", "best-metal-biographies-audible"],
  ["tomahawk-are-back-13-years-later-mike-patton-s-best-band-ret", "tomahawk-return-mike-patton"],
  ["metal-hard-rock-news-march-2-2026-festival-season-is-loading", "metal-hard-rock-news-march-2-2026"],
  ["manowar-s-ross-the-boss-diagnosed-with-als-a-legend-faces-hi", "ross-the-boss-diagnosed-with-als"],
  ["every-major-metal-038-hard-rock-album-coming-in-2026-updated", "major-metal-albums-2026"],
  ["beartooth-atreyu-and-the-great-metalcore-escape-when-bands-o", "beartooth-atreyu-metalcore-escape"],
  ["orbit-culture-drop-live-video-north-american-tour-kicks-off", "orbit-culture-live-video-north-american-tour"],
  ["metallica-sphere-las-vegas-2026-life-burns-faster-residency", "metallica-sphere-las-vegas-2026"],
  ["gorillaz-limp-bizkit-announced-for-rock-for-people-2026", "gorillaz-limp-bizkit-rock-for-people-2026"],
  ["metal-news-january-2026-megadeth-lorna-shore-sepultura", "metal-news-january-2026"],
  ["mike-patton-hints-at-quiet-closure-for-faith-no-more", "mike-patton-faith-no-more-closure"],
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "metal-mantra.com" },
      { protocol: "https", hostname: "**.wp.com" },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return slugRedirects.map(([from, to]) => ({
      source: `/${from}/`,
      destination: `/${to}/`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
