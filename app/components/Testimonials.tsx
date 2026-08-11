"use client";

import { useState } from "react";
import type { TestimonialRow } from "../lib/database.types";

export default function Testimonials({ testimonials }: { testimonials: TestimonialRow[] }) {
  const [index, setIndex] = useState(0);

  return (
    <section className="border-y border-border bg-surface/40 py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="eyebrow">Voices from the audience</p>
        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[var(--ease-out-expo)]"
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {testimonials.map((ts) => (
              <div key={ts.id} className="w-full shrink-0 px-2">
                <p className="display text-[clamp(1.5rem,3.4vw,2.25rem)] leading-tight">&ldquo;{ts.quote}&rdquo;</p>
                <p className="mt-7 text-sm text-muted-foreground">
                  {ts.name} · <span className="text-muted-foreground/60">{ts.role}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((ts, i) => (
            <button
              key={ts.id}
              onClick={() => setIndex(i)}
              aria-label="Show testimonial"
              className="h-2 rounded-full p-0 transition-all duration-300"
              style={{
                width: i === index ? 28 : 8,
                background: i === index ? "var(--ted)" : "var(--border)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
