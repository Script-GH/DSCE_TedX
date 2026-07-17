"use client";

import { useRef, useState } from "react";
import { speakers } from "../lib/data";

export default function Speakers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(-1);

  const tiltFor = (i: number) => {
    if (hovered < 0) {
      return {
        transform: "translateY(0) rotate(0deg)",
        boxShadow: "0 10px 40px rgba(0,0,0,.4)",
        borderColor: "rgba(255,255,255,.09)",
      };
    }
    const dist = i - hovered;
    if (dist === 0) {
      return {
        transform: "translateY(-14px) rotate(0deg)",
        boxShadow: "0 30px 60px rgba(230,43,30,.28)",
        borderColor: "rgba(230,43,30,.55)",
      };
    }
    const tilt = Math.max(-6, Math.min(6, dist * 3));
    const ty = Math.abs(dist) === 1 ? -5 : 0;
    return {
      transform: `translateY(${ty}px) rotate(${tilt}deg)`,
      boxShadow: "0 10px 40px rgba(0,0,0,.4)",
      borderColor: "rgba(255,255,255,.09)",
    };
  };

  return (
    <section id="speakers" className="section-pad" style={{ padding: "120px 40px", maxWidth: 1320, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 48,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#E62B1E",
              marginBottom: 16,
            }}
          >
            01 — The Voices
          </div>
          <h2
            style={{
              fontFamily: "'Inter Tight'",
              fontWeight: 800,
              fontSize: "clamp(34px, 5vw, 62px)",
              letterSpacing: "-.03em",
              lineHeight: 1,
            }}
          >
            Featured Speakers
          </h2>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => trackRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
            className="icon-btn"
            aria-label="Previous"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.16)",
              background: "transparent",
              color: "#f5f5f5",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            &larr;
          </button>
          <button
            onClick={() => trackRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
            className="icon-btn"
            aria-label="Next"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.16)",
              background: "transparent",
              color: "#f5f5f5",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="hcarousel"
        onMouseLeave={() => setHovered(-1)}
        style={{ display: "flex", gap: 24, overflowX: "auto", padding: "10px 2px 24px", scrollSnapType: "x mandatory" }}
      >
        {speakers.map((sp, i) => {
          const tilt = tiltFor(i);
          return (
            <div
              key={sp.name}
              onMouseEnter={() => setHovered(i)}
              style={{
                flex: "0 0 300px",
                scrollSnapAlign: "start",
                borderRadius: 18,
                border: "1px solid",
                background: "linear-gradient(180deg, #101010, #0a0a0a)",
                overflow: "hidden",
                transition: "transform .5s cubic-bezier(.16,1,.3,1), box-shadow .4s, border-color .4s",
                ...tilt,
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: 320,
                  backgroundImage: "repeating-linear-gradient(135deg, #161616 0 10px, #121212 10px 20px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4d4d4d", letterSpacing: ".12em" }}>
                  SPEAKER PHOTO
                </span>
                <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E62B1E" }} />
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.3)" }} />
                </div>
              </div>
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent)" }} />
              <div style={{ padding: "22px 22px 24px" }}>
                <h3 style={{ fontFamily: "'Inter Tight'", fontWeight: 700, fontSize: 21, letterSpacing: "-.01em", marginBottom: 4 }}>
                  {sp.name}
                </h3>
                <div style={{ fontSize: 13, color: "#E62B1E", fontWeight: 500, marginBottom: 12 }}>{sp.role}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#8f8f8f", marginBottom: 18, minHeight: 40 }}>
                  &ldquo;{sp.topic}&rdquo;
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["in", "IG", "X"].map((label) => (
                    <span
                      key={label}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,.12)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'JetBrains Mono'",
                        fontSize: 10,
                        color: "#a3a3a3",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
