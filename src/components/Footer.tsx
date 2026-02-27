import Link from "next/link";

const SECTIONS = [
  {
    title: "Content",
    links: [
      { label: "News", href: "/news/" },
      { label: "Rundowns", href: "/rundowns/" },
      { label: "Tours", href: "/tours/" },
      { label: "Reviews", href: "/reviews/" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Festivals", href: "/festivals/" },
      { label: "Features", href: "/features/" },
      { label: "Search", href: "/search/" },
    ],
  },
  {
    title: "Meta",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Advertise", href: "/advertise/" },
      { label: "Privacy", href: "/privacy/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-mantra-border bg-mantra-dark mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="text-lg tracking-wider text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              METAL MANTRA
            </span>
            <p className="mt-3 text-sm text-mantra-muted leading-relaxed">
              Heavy music news, culture, and coverage. No fluff. No corporate press. Just the pit.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://twitter.com/metalmantra" target="_blank" rel="noopener noreferrer" className="text-mantra-muted hover:text-mantra-red transition-colors" aria-label="X/Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/metalmantra" target="_blank" rel="noopener noreferrer" className="text-mantra-muted hover:text-mantra-red transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-mantra-muted mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-mantra-dim hover:text-mantra-red transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-mantra-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-mantra-dim">&copy; {new Date().getFullYear()} Metal Mantra. All rights reserved.</p>
          <p className="text-xs text-mantra-dim">
            Merch: <a href="https://bl3gh.co" target="_blank" rel="noopener noreferrer" className="text-mantra-red hover:text-mantra-red-hot transition-colors">bl3gh.co</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
