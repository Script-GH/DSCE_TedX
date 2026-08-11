import type { TeamMemberRow } from "../lib/database.types";
import Reveal from "./Reveal";

const FALLBACK_PHOTOS = [
  "/images/speaker-1.jpg",
  "/images/speaker-2.jpg",
  "/images/speaker-3.jpg",
  "/images/speaker-4.jpg",
];

export default function Team({ team }: { team: TeamMemberRow[] }) {
  return (
    <section id="team" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow">The Organisers</p>
        <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Meet the team</h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
        {team.map((member, i) => (
          <Reveal key={member.id} delay={i * 50} className="text-center">
            <div
              className="mx-auto aspect-square overflow-hidden rounded-full border border-border bg-surface bg-cover bg-center"
              style={{ backgroundImage: `url(${member.image_url || FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length]})` }}
            />
            <p className="mt-4 text-sm font-semibold">{member.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
