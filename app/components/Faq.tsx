"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqRow } from "../lib/database.types";
import Reveal from "./Reveal";

export default function Faq({ faqs }: { faqs: FaqRow[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="text-center">
        <p className="eyebrow">06 — Questions</p>
        <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Frequently asked</h2>
      </Reveal>
      <div className="mt-14 flex flex-col gap-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.id} delay={i * 50}>
              <div
                className="overflow-hidden rounded-2xl border transition-colors duration-300"
                style={{
                  borderColor: isOpen ? "color-mix(in oklab, var(--ted) 40%, transparent)" : "var(--border)",
                  background: isOpen ? "color-mix(in oklab, var(--ted) 6%, transparent)" : "transparent",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="font-medium">{f.question}</span>
                  <Plus
                    className="h-5 w-5 shrink-0 text-ted transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
                  style={{ maxHeight: isOpen ? 240 : 0 }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
