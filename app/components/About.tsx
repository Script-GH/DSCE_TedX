import Image from "next/image";
import type { AboutContent } from "../lib/database.types";
import Reveal from "./Reveal";

export default function About({ about }: { about: AboutContent }) {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <div className="grid gap-14 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">{about.heading}</h2>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-foreground/85">{about.body}</p>
          </Reveal>
          <Reveal
            delay={160}
            className="relative mt-10 aspect-[2/3] max-w-sm overflow-hidden rounded-2xl border border-border bg-surface bg-cover bg-center"
            style={about.imageUrl ? { backgroundImage: `url(${about.imageUrl})` } : undefined}
          >
            {!about.imageUrl && (
              <Image
                src="/images/tedx-banner.jpg"
                alt="TEDxDSCE presents Rise of the Dominoes — 12th September, PC Sagar Auditorium, DSCE. An official TEDx event."
                fill
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
