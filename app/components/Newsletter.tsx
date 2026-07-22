"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "subscribed" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("subscribed");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
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
              disabled={status === "submitting" || status === "subscribed"}
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
              disabled={status === "submitting" || status === "subscribed"}
              style={{
                background: "#E62B1E",
                color: "#fff",
                border: "none",
                padding: "15px 30px",
                borderRadius: 100,
                fontWeight: 600,
                fontSize: 15,
                cursor: status === "submitting" || status === "subscribed" ? "default" : "pointer",
                fontFamily: "'Inter'",
                opacity: status === "submitting" ? 0.7 : 1,
              }}
            >
              {status === "subscribed" ? "You’re in ✓" : status === "submitting" ? "Sending…" : "Notify me"}
            </button>
          </form>
          {status === "error" && (
            <p style={{ color: "#f87171", fontSize: 14, marginTop: 14 }}>{error}</p>
          )}
          {status === "subscribed" && (
            <p style={{ color: "#a3a3a3", fontSize: 14, marginTop: 14 }}>
              Check your inbox — we just sent you a confirmation email.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
