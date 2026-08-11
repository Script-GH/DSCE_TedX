"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineStageRow } from "../lib/database.types";
import Reveal from "./Reveal";

export default function Timeline({ timelineStages }: { timelineStages: TimelineStageRow[] }) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const update = () => {
      let a = -1;
      const trigger = window.innerHeight * 0.72;
      itemRefs.current.forEach((node, i) => {
        if (node && node.getBoundingClientRect().top < trigger) a = i;
      });
      setActive(a);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const fillPct = active < 0 ? 0 : ((active + 1) / timelineStages.length) * 100;

  return (
    <section id="timeline" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">03 — The Chain Reaction</p>
          <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.75rem)]">How one idea moves the world</h2>
        </Reveal>

        <div className="relative mx-auto mt-20 max-w-2xl">
          <div className="absolute left-[27px] top-2.5 bottom-2.5 w-0.5 bg-border" />
          <div
            className="absolute left-[27px] top-2.5 w-0.5 bg-ted shadow-[0_0_14px_var(--ted-glow)] transition-[height] duration-500 ease-out"
            style={{ height: `${fillPct}%` }}
          />
          {timelineStages.map((tl, i) => {
            const isActive = i <= active;
            return (
              <div
                key={tl.id}
                ref={(node) => {
                  itemRefs.current[i] = node;
                }}
                className="relative py-0 pb-12 pl-[78px] transition-all duration-500 ease-[var(--ease-out-expo)]"
                style={{ opacity: isActive ? 1 : 0.35, transform: isActive ? "translateX(0)" : "translateX(-10px)" }}
              >
                <span
                  className="absolute left-4 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-500"
                  style={{
                    background: isActive ? "var(--ted)" : "var(--background)",
                    borderColor: isActive ? "var(--ted)" : "var(--border)",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full transition-all duration-500"
                    style={{ background: isActive ? "#fff" : "transparent" }}
                  />
                </span>
                <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">
                  STAGE {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="display mt-2 text-[clamp(1.6rem,3.4vw,2.5rem)] transition-colors duration-500"
                  style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {tl.title}
                </h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">{tl.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
