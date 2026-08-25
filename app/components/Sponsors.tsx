import type { SponsorRow } from "../lib/database.types";

const defaultSponsors: SponsorRow[] = [
  {
    id: "bookmyshow",
    name: "BookMyShow",
    logo_url: "/images/bookmyshow-logo.jpg",
    website_url: "https://bookmyshow.com",
    position: 0,
    created_at: "",
  },
];

export default function Sponsors({ sponsors }: { sponsors: SponsorRow[] }) {
  const resolved = sponsors.length > 0 ? sponsors : defaultSponsors;
  return (
    <section id="sponsors" className="py-20">
      <p className="eyebrow px-5 text-center text-muted-foreground/70 md:px-8">Powered by our partners</p>
      <div className="mt-11 flex justify-center">
        {resolved.map((s) => (
          <div
            key={s.id}
            className="flex shrink-0 items-center justify-center rounded-full bg-surface-2 bg-cover bg-center bg-no-repeat"
            style={{
              width: 200,
              height: 200,
              ...(s.logo_url ? { backgroundImage: `url(${s.logo_url})` } : {}),
            }}
          >
            {!s.logo_url && <span className="eyebrow text-[10px] text-muted-foreground/50">Logo</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

