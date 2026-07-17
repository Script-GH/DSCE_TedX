"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "../lib/data";

export default function Stats() {
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
                    const v = Math.floor(eased * s.target);
                    setValues((prev) => {
                      const next = prev.slice();
                      next[i] = p < 1 ? v : s.target;
                      return next;
                    });
                    if (p < 1) requestAnimationFrame(step);
                  };
                  requestAnimationFrame(step);
                }, s.startDelay);
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad"
      style={{
        padding: "90px 40px",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 0,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "20px 30px",
              borderLeft: `1px solid ${values[i] > 0 ? "rgba(230,43,30,.5)" : "rgba(255,255,255,.08)"}`,
              transition: "border-color .6s",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter Tight'",
                fontWeight: 800,
                fontSize: "clamp(44px,6vw,76px)",
                letterSpacing: "-.03em",
                lineHeight: 1,
                color: shown ? "#f5f5f5" : "#333",
                transition: "color .6s",
              }}
            >
              {s.format(values[i])}
            </div>
            <div style={{ fontSize: 15, color: "#a3a3a3", marginTop: 12, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
