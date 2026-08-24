"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, Clock, Hourglass, Languages, MapPin, Users } from "lucide-react";
import type { EventContent } from "../lib/database.types";
import Reveal from "./Reveal";

const BOOKMYSHOW_URL = "https://in.bookmyshow.com/events/tedxdsce/ET00512645";

const META = [
  { icon: CalendarDays, label: "Sat 12 Sep 2026" },
  { icon: Clock, label: "8:30 AM" },
  { icon: Hourglass, label: "9 hours 30 minutes" },
  { icon: Users, label: "Age limit — 8yrs +" },
  { icon: Languages, label: "English, Hindi, Kannada" },
];

export default function Tickets({ event }: { event: EventContent }) {
  return (
    <section id="event" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow text-center">Seats Are Limited</p>
        <h2 className="display mx-auto mt-5 max-w-3xl text-center text-[clamp(2.4rem,6vw,4.5rem)]">
          One tap between you and the room where it happens
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-muted-foreground">
          Twelve speakers. One stage. One day of ideas that refuse to stand still. Tickets for
          TEDxDSCE 2026 &mdash; &ldquo;Rise of the Domineo&rdquo; &mdash; are live exclusively on
          BookMyShow.
        </p>
      </Reveal>

      <Reveal delay={120} className="relative mx-auto mt-14 w-full max-w-5xl">
        <span className="glow-pulse absolute -inset-6 -z-10 rounded-[2rem] bg-ted opacity-50 blur-3xl md:-inset-12" />

        <div className="grain relative isolate overflow-hidden rounded-3xl border border-border bg-surface shadow-[var(--shadow-ted)]">
          <div className="relative aspect-[2/1] w-full">
            <Image
              src="/images/bookmyshow-banner.jpg"
              alt="TEDxDSCE presents Rise of the Dominoes — 12th September, PC Sagar Auditorium, DSCE. An official TEDx event."
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative grid gap-8 border-t border-border p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {META.map((m) => (
                <span key={m.label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <m.icon className="h-4 w-4 shrink-0 text-ted" />
                  {m.label}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-ted" />
                {event.venueLabel}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-6 border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
              <div>
                <p className="display text-2xl">&#8377;1500</p>
                <p className="mt-1 text-xs font-medium text-emerald-400">Available</p>
              </div>
              <a
                href={BOOKMYSHOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ted px-7 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-ted)] transition-transform duration-300 hover:scale-[1.05]"
              >
                Book Now
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
