"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";
import type { SpeakerRow } from "../lib/database.types";
import Reveal from "./Reveal";

const FALLBACK_PHOTOS = [
  "/images/speaker-1.jpg",
  "/images/speaker-2.jpg",
  "/images/speaker-3.jpg",
  "/images/speaker-4.jpg",
];

export default function Speakers({ speakers }: { speakers: SpeakerRow[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="speakers" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">01 — The Voices</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Featured Speakers</h2>
          </Reveal>
          <Reveal delay={100} className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              aria-label="Previous speaker"
              onClick={() => trackRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next speaker"
              onClick={() => trackRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>

      <Reveal delay={140} className="mt-14">
        <div ref={trackRef} className="hcarousel overflow-x-auto px-5 md:px-8">
          <div className="mx-auto flex max-w-7xl gap-5 pb-4">
            {speakers.map((sp, i) => (
              <article
                key={sp.id}
                className="group relative w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface sm:w-[42vw] lg:w-[24vw]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={sp.image_url || FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length]}
                    alt={`${sp.name}, ${sp.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                </div>
                <div className="relative -mt-14 p-6">
                  <p className="eyebrow">{sp.role}</p>
                  <h3 className="display mt-2.5 text-2xl">{sp.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">&ldquo;{sp.topic}&rdquo;</p>
                  <div className="mt-4 flex gap-2">
                    {(
                      [
                        { Icon: Linkedin, href: sp.linkedin_url, label: "LinkedIn" },
                        { Icon: Instagram, href: sp.instagram_url, label: "Instagram" },
                        { Icon: Twitter, href: sp.x_url, label: "X" },
                      ] as const
                    ).map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href || undefined}
                        target={href ? "_blank" : undefined}
                        rel={href ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
                        style={{ opacity: href ? 1 : 0.4, pointerEvents: href ? "auto" : "none" }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ted transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
