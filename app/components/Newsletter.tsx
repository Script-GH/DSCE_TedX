"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

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

  const disabled = status === "submitting" || status === "subscribed";

  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 pt-8 md:px-8">
      <Reveal className="grain relative overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="stage-glow pointer-events-none absolute inset-0" />
        <div id="register" className="relative px-6 py-16 text-center md:px-16 md:py-24">
          <h3 className="display mx-auto max-w-2xl text-[clamp(2rem,5vw,3.5rem)]">Be the first domino.</h3>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            Join the list for ticket drops, speaker reveals and the story behind Rise of the Domino.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabled}
              placeholder="you@college.edu"
              className="h-12 w-full rounded-full border border-input bg-background/60 px-5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ted disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={disabled}
              className="h-12 shrink-0 rounded-full bg-ted px-7 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] disabled:opacity-70"
            >
              {status === "subscribed" ? "You're in ✓" : status === "submitting" ? "Sending…" : "Notify me"}
            </button>
          </form>

          {status === "error" && <p className="mt-4 text-sm text-ted-glow">{error}</p>}
          {status === "subscribed" && (
            <p className="mt-4 text-sm text-muted-foreground">
              Check your inbox — we just sent you a confirmation email.
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
