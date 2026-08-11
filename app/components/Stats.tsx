"use client";

import { useEffect, useRef, useState } from "react";
import type { StatRow } from "../lib/database.types";

function formatStatValue(n: number, formatType: StatRow["format_type"]): string {
  switch (formatType) {
    case "plus":
      return n + "+";
    case "k_plus":
      return (n >= 1000 ? Math.floor(n / 1000) + "K" : String(n)) + "+";
    default:
      return n.toLocaleString();
  }
}

export default function Stats({ stats }: { stats: StatRow[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<number[]>(stats.map(() => 0));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setShown((already) => {
              if (already) return already;
              stats.forEach((s, i) => {
                setTimeout(() => {
                  const dur = 1400;
                  const t0 = performance.now();
                  const step = (now: number) => {
                    const p = Math.min(1, (now - t0) / dur);
                    const eased = 1 - Math.pow(1 - p, 3);
                    const v = Math.floor(eased * s.target_value);
                    setValues((prev) => {
                      const next = prev.slice();
                      next[i] = p < 1 ? v : s.target_value;
                      return next;
                    });
                    if (p < 1) requestAnimationFrame(step);
                  };
                  requestAnimationFrame(step);
                }, s.start_delay);
              });
              return true;
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [stats]);

  return (
    <section ref={sectionRef} className="border-y border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.id} className="bg-background px-6 py-12 transition-colors duration-500 sm:px-8">
            <p
              className="display text-[clamp(2.5rem,6vw,4.5rem)] transition-colors duration-500"
              style={{ color: shown ? "var(--foreground)" : "var(--surface-2)" }}
            >
              {formatStatValue(values[i], s.format_type)}
            </p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
