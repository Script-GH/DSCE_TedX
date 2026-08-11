import type { SponsorRow } from "../lib/database.types";

export default function Sponsors({ sponsors }: { sponsors: SponsorRow[] }) {
  const loop = [...sponsors, ...sponsors];
  return (
    <section id="sponsors" className="py-20">
      <p className="eyebrow px-5 text-center text-muted-foreground/70 md:px-8">Powered by our partners</p>
      <div
        className="mt-11 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="marquee-track items-center gap-16">
          {loop.map((s, i) => (
            <div
              key={`${s.id}-${i}`}
              className="flex h-11 min-w-[150px] shrink-0 items-center justify-center rounded-lg bg-surface-2 bg-contain bg-center bg-no-repeat"
              style={s.logo_url ? { backgroundImage: `url(${s.logo_url})` } : undefined}
            >
              {!s.logo_url && <span className="eyebrow text-[10px] text-muted-foreground/50">Logo</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
