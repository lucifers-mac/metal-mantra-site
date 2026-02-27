import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Metal Mantra",
  description: "Metal Mantra is a heavy music news site built on 30+ years of Bay Area scene credibility.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-white tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
        ABOUT METAL MANTRA
      </h1>

      <div className="mt-8 space-y-6 text-mantra-text leading-relaxed">
        <p>
          Metal Mantra is a heavy music news and culture site that covers the scene the way it actually sounds: loud, direct, and honest. No corporate press releases dressed up as journalism. No filler. No trend-chasing.
        </p>
        <p>
          Founded on 30+ years of Bay Area metal and hardcore experience, Metal Mantra covers tours, festivals, new releases, lineup changes, and the stories that actually matter to people who go to shows.
        </p>
        <p>
          We publish <strong className="text-white">Metal Rundowns</strong> every Monday, Wednesday, and Friday morning — a digest of the biggest stories in heavy music so you never miss what happened while you were sleeping. We also cover breaking news in real time, write in-depth features, and review the albums and concerts that deserve attention.
        </p>
        <p>
          Metal Mantra is independent. We are not owned by a media company. Our editorial is not for sale. If we link to something, it is because we think it is worth your time.
        </p>
      </div>

      <div className="mt-12 p-6 bg-mantra-card border border-mantra-border rounded-xl">
        <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>MERCH</h2>
        <p className="mt-2 text-mantra-muted text-sm">Rep the scene.</p>
        <a
          href="https://bl3gh.co"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block px-5 py-2 bg-mantra-red hover:bg-mantra-red-hot text-white font-bold text-sm rounded-lg transition-colors"
        >
          Shop bl3gh.co
        </a>
      </div>
    </div>
  );
}
