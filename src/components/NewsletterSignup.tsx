"use client";

import { useState } from "react";

export default function NewsletterSignup({ variant = "inline" }: { variant?: "inline" | "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to email provider (Mailchimp, ConvertKit, etc.)
    if (email.includes("@")) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  if (variant === "footer") {
    return (
      <div className="bg-mantra-card border border-mantra-border rounded-lg p-5">
        <h3
          className="text-sm font-bold uppercase tracking-[0.15em] text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Get the Rundown
        </h3>
        <p className="mt-1 text-xs text-mantra-muted">M/W/F digest straight to your inbox. No spam. Just metal.</p>
        {status === "success" ? (
          <p className="mt-3 text-sm text-emerald-400 font-bold">You&apos;re in. Watch your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-mantra-dark border border-mantra-border rounded px-3 py-2 text-sm text-white placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-mantra-red hover:bg-mantra-red-hot text-white text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Subscribe
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs text-red-400">Enter a valid email.</p>
        )}
      </div>
    );
  }

  // Inline variant — for use between article sections or sidebar
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-mantra-card to-mantra-dark border border-mantra-red/20 rounded-xl p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-mantra-red/5 to-transparent" />
      <div className="relative text-center">
        <p
          className="text-xs uppercase tracking-[0.2em] text-mantra-red font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Never miss a story
        </p>
        <h3
          className="mt-2 text-xl md:text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Get the Metal Mantra Rundown
        </h3>
        <p className="mt-2 text-sm text-mantra-muted max-w-md mx-auto">
          The biggest stories in heavy music, delivered M/W/F. Free. No spam. Unsubscribe anytime.
        </p>
        {status === "success" ? (
          <p className="mt-4 text-emerald-400 font-bold">You&apos;re in. Watch your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-mantra-dark border border-mantra-border rounded-lg px-4 py-3 text-white placeholder-mantra-dim focus:outline-none focus:border-mantra-red/50 focus:ring-1 focus:ring-mantra-red/30 transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
