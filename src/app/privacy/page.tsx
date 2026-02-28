import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Metal Mantra privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl font-black text-white tracking-wider"
        style={{ fontFamily: "var(--font-display)" }}
      >
        PRIVACY POLICY
      </h1>

      <div className="mt-8 space-y-6 text-mantra-text leading-relaxed text-sm">
        <p>Last updated: February 2026</p>

        <h2 className="text-lg font-bold text-white mt-8" style={{ fontFamily: "var(--font-heading)" }}>What We Collect</h2>
        <p>
          Metal Mantra collects minimal data. If you subscribe to our newsletter, we store your email address. If you visit the site, standard web analytics may track anonymous page views and referral sources. We do not sell your data.
        </p>

        <h2 className="text-lg font-bold text-white mt-8" style={{ fontFamily: "var(--font-heading)" }}>Affiliate Links</h2>
        <p>
          Some links on Metal Mantra are affiliate links (Amazon, Ticketmaster, Audible). When you click these links and make a purchase, we may earn a commission at no additional cost to you. These links are clearly integrated into relevant content and are never the reason a story is written.
        </p>

        <h2 className="text-lg font-bold text-white mt-8" style={{ fontFamily: "var(--font-heading)" }}>Cookies</h2>
        <p>
          We use essential cookies for site functionality. Third-party services (analytics, affiliate networks) may set their own cookies. You can manage cookies through your browser settings.
        </p>

        <h2 className="text-lg font-bold text-white mt-8" style={{ fontFamily: "var(--font-heading)" }}>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@metal-mantra.com" className="text-mantra-red hover:text-mantra-red-hot transition-colors">
            hello@metal-mantra.com
          </a>.
        </p>
      </div>
    </div>
  );
}
