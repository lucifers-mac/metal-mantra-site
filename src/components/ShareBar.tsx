"use client";

import { useState, useEffect } from "react";

interface ShareBarProps {
  title: string;
  url: string;
  /** "inline" renders the horizontal row (bottom of article). "floating" renders the sticky side/bottom bar. */
  variant?: "inline" | "floating";
}

/* ── SVG icons (no dependencies, no external requests) ── */
const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const RedditIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

/* ── Share targets ── */
function shareLinks(title: string, url: string) {
  const t = encodeURIComponent(title);
  const u = encodeURIComponent(url);
  return {
    x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    reddit: `https://www.reddit.com/submit?url=${u}&title=${t}`,
  };
}

export default function ShareBar({ title, url, variant = "inline" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [visible, setVisible] = useState(variant === "inline");

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  /* Floating bar: show after scrolling past 400px */
  useEffect(() => {
    if (variant !== "floating") return;
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const links = shareLinks(title, url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback for older browsers */
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* user cancelled — do nothing */
    }
  };

  const btnBase =
    "flex items-center justify-center transition-all duration-200";
  const btnInline =
    "w-9 h-9 rounded-full bg-mantra-dark border border-mantra-border text-mantra-muted hover:text-white hover:border-mantra-red/50 hover:bg-mantra-red/10";
  const btnFloating =
    "w-10 h-10 rounded-full bg-[#111] border border-[#222] text-[#888] hover:text-white hover:border-mantra-red/50 hover:bg-mantra-red/10 shadow-lg";

  const buttons = (btnStyle: string) => (
    <>
      <a href={links.x} target="_blank" rel="noopener noreferrer" className={`${btnBase} ${btnStyle}`} aria-label="Share on X" title="Share on X">
        <XIcon />
      </a>
      <a href={links.facebook} target="_blank" rel="noopener noreferrer" className={`${btnBase} ${btnStyle}`} aria-label="Share on Facebook" title="Share on Facebook">
        <FacebookIcon />
      </a>
      <a href={links.reddit} target="_blank" rel="noopener noreferrer" className={`${btnBase} ${btnStyle}`} aria-label="Share on Reddit" title="Share on Reddit">
        <RedditIcon />
      </a>
      <button onClick={handleCopy} className={`${btnBase} ${btnStyle} ${copied ? "!border-green-500/50 !text-green-400" : ""}`} aria-label="Copy link" title={copied ? "Copied!" : "Copy link"}>
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        ) : (
          <LinkIcon />
        )}
      </button>
      {canNativeShare && (
        <button onClick={handleNativeShare} className={`${btnBase} ${btnStyle} md:hidden`} aria-label="Share" title="Share">
          <ShareIcon />
        </button>
      )}
    </>
  );

  /* ── Inline variant: horizontal row below content ── */
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        <span
          className="text-[11px] uppercase tracking-[0.15em] text-mantra-muted font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Share:
        </span>
        {buttons(btnInline)}
      </div>
    );
  }

  /* ── Floating variant: sticky side (desktop) / bottom (mobile) ── */
  return (
    <div
      className={`fixed z-40 transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-4 md:translate-y-4 pointer-events-none"
      }`}
    >
      {/* Desktop: left side, vertically centered */}
      <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-2">
        {buttons(btnFloating)}
      </div>

      {/* Mobile: bottom bar, full width */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 justify-center gap-3 py-3 px-4 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#1a1a1a]">
        {buttons(btnFloating)}
      </div>
    </div>
  );
}
