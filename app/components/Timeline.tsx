"use client";

import { useEffect, useRef, useState } from "react";
import { ACCENT, timelineStages } from "../lib/data";

export default function Timeline() {
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
    <section id="timeline" className="section-pad" style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
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
            03 — The Chain Reaction
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
            How one idea moves the world
          </h2>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 10,
              bottom: 10,
              width: 2,
              background: "rgba(255,255,255,.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 10,
              width: 2,
              height: `${fillPct}%`,
              background: "linear-gradient(180deg, #E62B1E, #ff7a6e)",
              boxShadow: "0 0 14px rgba(230,43,30,.6)",
              transition: "height .5s ease",
            }}
          />
          {timelineStages.map((tl, i) => {
            const isActive = i <= active;
            return (
              <div
                key={tl.title}
                ref={(node) => {
                  itemRefs.current[i] = node;
                }}
                style={{
                  position: "relative",
                  padding: "0 0 46px 78px",
                  opacity: isActive ? 1 : 0.35,
                  transform: isActive ? "translateX(0)" : "translateX(-10px)",
                  transition: "all .6s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 2,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: isActive ? ACCENT : "#0d0d0d",
                    border: `2px solid ${isActive ? ACCENT : "rgba(255,255,255,.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .5s",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: isActive ? "#fff" : "transparent",
                      transition: "all .5s",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: 12,
                    letterSpacing: ".18em",
                    color: "#737373",
                    marginBottom: 8,
                  }}
                >
                  STAGE 0{i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter Tight'",
                    fontWeight: 700,
                    fontSize: "clamp(26px,3.4vw,40px)",
                    letterSpacing: "-.02em",
                    marginBottom: 10,
                    color: isActive ? "#f5f5f5" : "#5c5c5c",
                    transition: "color .5s",
                  }}
                >
                  {tl.title}
                </h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#8f8f8f", maxWidth: 560 }}>{tl.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
