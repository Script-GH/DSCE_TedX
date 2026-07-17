"use client";

import { Fragment } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { EVENT_TARGET_ISO } from "../lib/data";

export default function EventCountdown() {
  const cd = useCountdown(EVENT_TARGET_ISO);
  const boxes = [
    { value: cd.days, label: "Days" },
    { value: cd.hours, label: "Hours" },
    { value: cd.mins, label: "Minutes" },
    { value: cd.secs, label: "Seconds" },
  ];

  return (
    <section id="event" className="section-pad" style={{ padding: "80px 40px 120px" }}>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          borderRadius: 26,
          border: "1px solid rgba(255,255,255,.09)",
          background:
            "radial-gradient(120% 140% at 100% 0%, rgba(230,43,30,.14), transparent 55%), linear-gradient(180deg, #0d0d0d, #080808)",
          padding: "clamp(34px, 5vw, 70px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -20,
            fontFamily: "'Inter Tight'",
            fontWeight: 800,
            fontSize: 260,
            color: "rgba(255,255,255,.02)",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          ◆
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
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
            02 — The Main Event
          </div>
          <h2
            style={{
              fontFamily: "'Inter Tight'",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 58px)",
              letterSpacing: "-.03em",
              lineHeight: 1,
              marginBottom: 26,
              maxWidth: 640,
            }}
          >
            Rise of the Domino — Live on Campus
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 34, marginBottom: 44 }}>
            {[
              { label: "Date", value: "Nov 21, 2026" },
              { label: "Venue", value: "DSCE Auditorium, Bengaluru" },
              { label: "Format", value: "In-person · 12 Talks" },
            ].map((meta, i) => (
              <Fragment key={meta.label}>
                {i > 0 && <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />}
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono'",
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#737373",
                      marginBottom: 6,
                    }}
                  >
                    {meta.label}
                  </div>
                  <div style={{ fontFamily: "'Inter Tight'", fontWeight: 700, fontSize: 22 }}>{meta.value}</div>
                </div>
              </Fragment>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            {boxes.map((c) => (
              <div
                key={c.label}
                style={{
                  minWidth: 96,
                  textAlign: "center",
                  padding: "20px 14px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,.09)",
                  background: "rgba(255,255,255,.02)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter Tight'",
                    fontWeight: 800,
                    fontSize: "clamp(30px,4vw,46px)",
                    letterSpacing: "-.02em",
                    lineHeight: 1,
                  }}
                >
                  {c.value}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: 10,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#737373",
                    marginTop: 8,
                  }}
                >
                  {c.label}
                </div>
              </div>
            ))}
            <a
              href="#register"
              className="btn-accent-lg"
              style={{
                marginLeft: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "#E62B1E",
                color: "#fff",
                padding: "17px 32px",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Register Now &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
