import Link from "next/link";

interface SponsorSlotProps {
  label?: string;
}

export default function SponsorSlot({ label = "Presented By" }: SponsorSlotProps) {
  return (
    <div className="bg-mantra-card border border-mantra-border rounded-lg overflow-hidden">
      <div className="px-4 pt-3 pb-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-mantra-dim">{label}</p>
      </div>
      <Link
        href="https://www.bl3gh.co"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center px-4 pb-4 pt-2 hover:opacity-80 transition-opacity"
        aria-label="BL3GH.co — Metal Merch"
      >
        <div className="w-full bg-black rounded-md p-4 flex items-center justify-center border border-mantra-border group-hover:border-mantra-red/30 transition-colors">
          <span
            className="text-white text-2xl font-black tracking-widest"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.2em" }}
          >
            BL3GH
          </span>
        </div>
        <p className="mt-2 text-[11px] text-mantra-muted text-center group-hover:text-white transition-colors">
          Metal lifestyle. No apologies.
        </p>
      </Link>
    </div>
  );
}
