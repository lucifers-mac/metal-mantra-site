import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise with Metal Mantra",
  description: "Reach a dedicated heavy music audience. Advertising and sponsorship opportunities with Metal Mantra.",
};

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl font-black text-white tracking-wider"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ADVERTISE WITH METAL MANTRA
      </h1>

      <div className="mt-6 text-mantra-text leading-relaxed space-y-4">
        <p>
          Metal Mantra reaches a dedicated audience of heavy music fans — people who buy tickets, stream albums, purchase vinyl, attend festivals, and support the bands they love. These are not casual listeners. They are the scene.
        </p>
        <p>
          If your brand, label, or promotion serves the heavy music community, we can help you reach the right audience with the right message.
        </p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Display Ads
          </h2>
          <p className="mt-2 text-sm text-mantra-muted leading-relaxed">
            Banner placements across the site. Sidebar, in-article, and header positions available.
          </p>
        </div>

        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Sponsored Content
          </h2>
          <p className="mt-2 text-sm text-mantra-muted leading-relaxed">
            Native editorial content that fits Metal Mantra&apos;s voice. Always disclosed. Always authentic.
          </p>
        </div>

        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Newsletter Sponsorship
          </h2>
          <p className="mt-2 text-sm text-mantra-muted leading-relaxed">
            Feature your brand in our email digest. Direct access to subscribers who opted in.
          </p>
        </div>

        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Affiliate Partnerships
          </h2>
          <p className="mt-2 text-sm text-mantra-muted leading-relaxed">
            Ticket platforms, merch retailers, and streaming services — integrated naturally into our coverage.
          </p>
        </div>
      </div>

      <div className="mt-10 p-8 bg-gradient-to-br from-mantra-card to-mantra-dark border border-mantra-red/20 rounded-xl text-center">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
          LET&apos;S TALK
        </h2>
        <p className="mt-2 text-sm text-mantra-muted">
          Tell us about your brand and what you&apos;re looking to achieve. We&apos;ll put together a plan that makes sense.
        </p>
        <a
          href="mailto:advertise@metal-mantra.com"
          className="mt-4 inline-block px-6 py-3 bg-mantra-red hover:bg-mantra-red-hot text-white text-sm font-bold uppercase tracking-wider rounded transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          advertise@metal-mantra.com
        </a>
      </div>
    </div>
  );
}
