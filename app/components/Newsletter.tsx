"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section id="register" className="section-pad" style={{ padding: "40px 40px 120px" }}>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          borderRadius: 26,
          border: "1px solid rgba(255,255,255,.1)",
          background: "radial-gradient(120% 160% at 50% 0%, rgba(230,43,30,.18), transparent 60%), #0a0a0a",
          padding: "clamp(40px, 6vw, 80px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Inter Tight'",
              fontWeight: 800,
              fontSize: "clamp(32px,5vw,56px)",
              letterSpacing: "-.03em",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Be the first domino.
          </h2>
          <p style={{ fontSize: 16, color: "#a3a3a3", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.6 }}>
            Join the list for ticket drops, speaker reveals and the story behind Rise of the Domino.
          </p>
          <form onSubmit={onSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 480, margin: "0 auto" }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                padding: "15px 20px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.04)",
                color: "#f5f5f5",
                fontSize: 15,
                fontFamily: "'Inter'",
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="btn-accent-lg"
              style={{
                background: "#E62B1E",
                color: "#fff",
                border: "none",
                padding: "15px 30px",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'Inter'",
              }}
            >
              {subscribed ? "You’re in ✓" : "Notify me"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
