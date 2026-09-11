import { Play } from "lucide-react";
import type { VideoRow } from "../lib/database.types";
import Reveal from "./Reveal";

export default function Videos({ videos }: { videos: VideoRow[] }) {
  return (
    <section id="videos" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow">04 — Ideas Worth Spreading</p>
        <h2 className="display led-text led-text-white mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Watch previous talks</h2>
      </Reveal>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <Reveal key={v.id} delay={i * 60}>
            <a
              href={v.video_url || undefined}
              target={v.video_url ? "_blank" : undefined}
              rel={v.video_url ? "noopener noreferrer" : undefined}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-ted/40"
            >
              <div
                className="relative flex aspect-video items-center justify-center bg-surface-2 bg-cover bg-center"
                style={v.thumbnail_url ? { backgroundImage: `url(${v.thumbnail_url})` } : undefined}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ted shadow-[var(--shadow-ted)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5 fill-current text-primary-foreground" />
                </span>
              </div>
              <div className="p-6">
                <p className="eyebrow">{v.duration}</p>
                <h3 className="display mt-2.5 text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.speaker}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
