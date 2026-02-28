import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Metal Mantra",
  description: "Get in touch with Metal Mantra for press inquiries, corrections, tips, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1
        className="text-3xl font-black text-white tracking-wider"
        style={{ fontFamily: "var(--font-display)" }}
      >
        CONTACT
      </h1>

      <div className="mt-8 space-y-8">
        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Press &amp; PR
          </h2>
          <p className="mt-2 text-mantra-muted text-sm leading-relaxed">
            Sending us a press release? Tour announcement? New album or single? We cover heavy music — metal, hardcore, metalcore, thrash, doom, and adjacent genres. If it&apos;s heavy, we want to hear it.
          </p>
          <a
            href="mailto:press@metal-mantra.com"
            className="mt-3 inline-block text-mantra-red hover:text-mantra-red-hot transition-colors font-bold"
          >
            press@metal-mantra.com
          </a>
        </div>

        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Tips &amp; Corrections
          </h2>
          <p className="mt-2 text-mantra-muted text-sm leading-relaxed">
            Got a tip? Spot an error? We take accuracy seriously. If we got something wrong, we want to fix it.
          </p>
          <a
            href="mailto:tips@metal-mantra.com"
            className="mt-3 inline-block text-mantra-red hover:text-mantra-red-hot transition-colors font-bold"
          >
            tips@metal-mantra.com
          </a>
        </div>

        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Advertising &amp; Partnerships
          </h2>
          <p className="mt-2 text-mantra-muted text-sm leading-relaxed">
            Interested in reaching Metal Mantra&apos;s audience? We work with brands, labels, and promoters who serve the heavy music community.
          </p>
          <a
            href="/advertise/"
            className="mt-3 inline-block text-mantra-red hover:text-mantra-red-hot transition-colors font-bold"
          >
            View advertising options &rarr;
          </a>
        </div>

        <div className="p-6 bg-mantra-card border border-mantra-border rounded-xl">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            General
          </h2>
          <p className="mt-2 text-mantra-muted text-sm leading-relaxed">
            For everything else — questions, feedback, or just to say what&apos;s up.
          </p>
          <a
            href="mailto:hello@metal-mantra.com"
            className="mt-3 inline-block text-mantra-red hover:text-mantra-red-hot transition-colors font-bold"
          >
            hello@metal-mantra.com
          </a>
        </div>
      </div>
    </div>
  );
}
