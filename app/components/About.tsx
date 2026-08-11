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
            className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface bg-cover bg-center"
            style={about.imageUrl ? { backgroundImage: `url(${about.imageUrl})` } : undefined}
          >
            {!about.imageUrl && (
              <div className="flex h-full items-center justify-center">
                <span className="eyebrow text-muted-foreground/60">Content coming soon</span>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
