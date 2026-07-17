"use client";

import Link from "next/link";
import { useRef } from "react";
import { useNetworkCanvas } from "../hooks/useNetworkCanvas";

const dominoes = Array.from({ length: 7 }, (_, i) => (1.7 + i * 0.12).toFixed(2) + "s");

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNetworkCanvas(canvasRef);

  return (
    <section
      id="top"
      className="section-pad"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(230,43,30,.20), transparent 55%), radial-gradient(80% 60% at 85% 100%, rgba(230,43,30,.09), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "linear-gradient(180deg, transparent 55%, #050505 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto", width: "100%", paddingTop: 60 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 100,
            background: "rgba(255,255,255,.03)",
            backdropFilter: "blur(10px)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#d4d4d4",
            marginBottom: 30,
            animation: "riseIn .9s .1s both",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#E62B1E",
              boxShadow: "0 0 10px #E62B1E",
              animation: "pulseGlow 2s infinite",
            }}
          />
          TEDx Dayananda Sagar College of Engineering
        </div>

        <h1
          className="hero-h1"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(56px, 9vw, 148px)",
            lineHeight: 0.92,
            letterSpacing: "-.035em",
            marginBottom: 26,
            animation: "riseIn 1s .2s both",
          }}
        >
          Rise of the
          <br />
          <span
            style={{
              background: "linear-gradient(120deg, #E62B1E 20%, #ff7a6e 60%, #E62B1E)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Domino
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'Inter Tight'",
            fontSize: "clamp(20px, 2.4vw, 30px)",
            fontWeight: 600,
            letterSpacing: "-.01em",
            color: "#fafafa",
            marginBottom: 18,
            animation: "riseIn 1s .32s both",
          }}
        >
          One Idea. One Voice. Infinite Impact.
        </p>
        <p
          style={{
            maxWidth: 560,
            fontSize: 16.5,
            lineHeight: 1.65,
            color: "#a3a3a3",
            marginBottom: 40,
            animation: "riseIn 1s .42s both",
          }}
        >
          TEDxDSCE is an independently organized TED event bringing together thinkers, creators and
          innovators who spark change — where one thought sets everything in motion.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, animation: "riseIn 1s .52s both" }}>
          <a
            href="#register"
            className="btn-accent-lg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#E62B1E",
              color: "#fff",
              padding: "15px 28px",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Register Now <span style={{ fontSize: 17 }}>&rarr;</span>
          </a>
          <Link
            href="/speaker-application"
            className="btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "15px 26px",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 15,
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(255,255,255,.03)",
              backdropFilter: "blur(8px)",
            }}
          >
            Become a Speaker
          </Link>
          <a
            href="#videos"
            className="link-fade-white"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 11,
              padding: "15px 24px",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 15,
              color: "#d4d4d4",
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,.22)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid #f5f5f5",
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  marginLeft: 2,
                }}
              />
            </span>
            Watch Previous Talks
          </a>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "flex-end",
          gap: 11,
          zIndex: 2,
          opacity: 0.85,
        }}
      >
        {dominoes.map((delay, i) => (
          <div
            key={i}
            style={{
              width: 13,
              height: 46,
              background: "linear-gradient(180deg, #1c1c1c, #0e0e0e)",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 3,
              transformOrigin: "bottom left",
              animation: `fall .7s cubic-bezier(.6,.04,.98,.34) both`,
              animationDelay: delay,
            }}
          >
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#E62B1E", margin: "8px auto 0" }} />
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 40,
          zIndex: 2,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: ".2em",
          color: "#525252",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        Scroll to begin the chain
      </div>
    </section>
  );
}
