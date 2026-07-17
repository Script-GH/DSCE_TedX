"use client";

import { useState } from "react";
import { faqs } from "../lib/data";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-pad" style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            06 — Questions
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
            Frequently asked
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                style={{
                  border: `1px solid ${isOpen ? "rgba(230,43,30,.4)" : "rgba(255,255,255,.08)"}`,
                  borderRadius: 14,
                  background: isOpen ? "rgba(230,43,30,.05)" : "rgba(255,255,255,.02)",
                  overflow: "hidden",
                  transition: "border-color .3s, background .3s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                    padding: "22px 26px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#f5f5f5",
                  }}
                >
                  <span style={{ fontFamily: "'Inter Tight'", fontWeight: 600, fontSize: 18, letterSpacing: "-.01em" }}>{f.q}</span>
                  <span
                    style={{
                      fontSize: 24,
                      color: "#E62B1E",
                      flexShrink: 0,
                      transition: "transform .3s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div style={{ maxHeight: isOpen ? 240 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
                  <p style={{ padding: "0 26px 24px", fontSize: 15, lineHeight: 1.65, color: "#9a9a9a" }}>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
