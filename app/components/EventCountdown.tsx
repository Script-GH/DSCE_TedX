"use client";

import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";
import type { EventContent } from "../lib/database.types";
import Reveal from "./Reveal";

export default function EventCountdown({ event }: { event: EventContent }) {
  const cd = useCountdown(event.targetIso);

  const details = [
    { icon: CalendarDays, label: "Date", value: event.dateLabel },
    { icon: MapPin, label: "Venue", value: event.venueLabel },
    { icon: Ticket, label: "Format", value: event.formatLabel },
  ];

  return (
    <section id="countdown" className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <Reveal className="grain relative overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="stage-glow pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative grid gap-12 p-8 md:grid-cols-2 md:p-16">
          <div>
            <p className="eyebrow">02 — The Main Event</p>
            <h2 className="display mt-5 text-[clamp(2.4rem,5.5vw,4rem)]">{event.heading}</h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              A full day of talks, performances and conversations built around a single question:
              what happens when one idea refuses to stand still?
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {[
                { value: cd.days, label: "Days" },
                { value: cd.hours, label: "Hours" },
                { value: cd.mins, label: "Minutes" },
                { value: cd.secs, label: "Seconds" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="min-w-[84px] rounded-xl border border-border bg-background/40 px-4 py-3 text-center"
                >
                  <p className="display text-2xl text-ted">{c.value}</p>
                  <p className="eyebrow mt-1 text-[10px]">{c.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-px self-start overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {details.map((d, i) => (
              <Reveal key={d.label} delay={i * 80} className="bg-surface-2/80 p-6">
                <d.icon className="h-5 w-5 text-ted" />
                <p className="eyebrow mt-4">{d.label}</p>
                <p className="mt-1.5 font-medium">{d.value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
