"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useNetworkCanvas } from "../hooks/useNetworkCanvas";
import type { HeroContent } from "../lib/database.types";

export default function Hero({ hero }: { hero: HeroContent }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNetworkCanvas(canvasRef);

  return (
    <section id="top" className="grain relative isolate overflow-hidden">
      <Image
        src="/images/hero-dominoes.jpg"
        alt="A curved chain of black dominoes toppling under red light"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-40"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="stage-glow glow-pulse pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-24 pt-32 md:px-8">
        <div
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-background/40 px-4 py-2 backdrop-blur"
          style={{ animation: "riseIn .9s .1s both" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ted" style={{ animation: "pulseGlow 2s infinite" }} />
          <span className="eyebrow">{hero.eyebrow}</span>
        </div>

        <h1 className="display text-[clamp(3.2rem,12vw,10rem)]">
          <span className="block" style={{ animation: "riseIn 1s .2s both" }}>
            {hero.headlineLine1}
          </span>
          <span className="block text-ted" style={{ animation: "riseIn 1s .32s both" }}>
            {hero.headlineLine2}
          </span>
        </h1>

        <div className="mt-8 max-w-xl" style={{ animation: "riseIn 1s .44s both" }}>
          <p className="text-xl font-semibold tracking-tight md:text-2xl">{hero.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{hero.intro}</p>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          style={{ animation: "riseIn 1s .56s both" }}
        >
          <a
            href="#register"
            className="group inline-flex items-center gap-2 rounded-full bg-ted px-7 py-3.5 font-medium text-primary-foreground shadow-[var(--shadow-ted)] transition-transform duration-300 hover:scale-[1.03]"
          >
            {hero.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <Link
            href="/speaker-application"
            className="inline-flex items-center rounded-full border border-border bg-background/40 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:bg-secondary"
          >
            {hero.ctaSecondaryLabel}
          </Link>
          <a
            href="#videos"
            className="inline-flex items-center gap-2.5 px-3 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border">
              <Play className="h-3 w-3 fill-current" />
            </span>
            {hero.ctaTertiaryLabel}
          </a>
        </div>

        <div className="mt-16 flex items-end gap-[3px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="domino-tile block h-7 w-2 rounded-[2px] bg-foreground/70"
              style={{ animationDelay: `${i * 110}ms` }}
            />
          ))}
        </div>
      </div>

      <span className="eyebrow absolute bottom-28 right-6 hidden [writing-mode:vertical-rl] md:block">
        Scroll to begin the chain
      </span>
    </section>
  );
}
