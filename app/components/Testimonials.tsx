"use client";

import { useState } from "react";
import { ACCENT, testimonials } from "../lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  return (
    <section
      className="section-pad"
      style={{
        padding: "90px 40px",
        background: "#070707",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#E62B1E",
            marginBottom: 40,
          }}
        >
          Voices from the audience
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              transition: "transform .6s cubic-bezier(.16,1,.3,1)",
              transform: `translateX(${-index * 100}%)`,
            }}
          >
            {testimonials.map((ts) => (
              <div key={ts.name + ts.quote} style={{ flex: "0 0 100%", padding: "0 10px" }}>
                <p
                  style={{
                    fontFamily: "'Inter Tight'",
                    fontWeight: 600,
                    fontSize: "clamp(22px,3vw,34px)",
                    lineHeight: 1.35,
                    letterSpacing: "-.02em",
                    marginBottom: 28,
                  }}
                >
                  &ldquo;{ts.quote}&rdquo;
                </p>
                <div style={{ fontSize: 14, color: "#a3a3a3" }}>
                  {ts.name} · <span style={{ color: "#737373" }}>{ts.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 40 }}>
          {testimonials.map((ts, i) => (
            <button
              key={ts.name + ts.quote}
              onClick={() => setIndex(i)}
              aria-label="Testimonial"
              style={{
                width: i === index ? 28 : 8,
                height: 8,
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                background: i === index ? ACCENT : "rgba(255,255,255,.25)",
                transition: "all .3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
