"use client";

import { useEffect, useRef, useState } from "react";
import type { EventContent } from "../lib/database.types";
import Reveal from "./Reveal";

type ScheduleRow = {
  start: string; // 24hr "09:00"
  end: string; // 24hr "09:30"
  title: string;
  kind: "session" | "speakers";
};

const SCHEDULE: ScheduleRow[] = [
  { start: "09:00", end: "09:30", title: "Registrations", kind: "session" },
  { start: "09:30", end: "10:00", title: "Networking Session", kind: "session" },
  { start: "10:15", end: "10:30", title: "Inauguration", kind: "session" },
  {
    start: "10:30",
    end: "11:15",
    title: "Rahul Vellal, Surabhi Yelsangikar, Prof KC Janardhan",
    kind: "speakers",
  },
  { start: "11:15", end: "11:30", title: "Performance (Team Mudra)", kind: "session" },
  {
    start: "11:45",
    end: "12:30",
    title: "Dr. Nishant Jayant, Dr. Sujit Paul, Yash Agarwal",
    kind: "speakers",
  },
  { start: "12:30", end: "14:00", title: "Lunch", kind: "session" },
  {
    start: "14:00",
    end: "14:45",
    title: "Ar. Ananya Jois, Karthik YV, Pawan Mulukutla",
    kind: "speakers",
  },
  { start: "14:45", end: "15:00", title: "Performance (Team NBS)", kind: "session" },
  {
    start: "15:00",
    end: "15:45",
    title: "Shivani RK, Harish Bijoor, Jimmy Xavier",
    kind: "speakers",
  },
  { start: "15:45", end: "17:00", title: "Vote of Thanks · Conclusion", kind: "session" },
];

// Where along the pinned viewport a card counts as "current" — a hair left of
// center reads better than dead-center once the card's own width is added in.
const FOCUS_FRACTION = 0.42;

function to12h(time24: string) {
  const [hStr, m] = time24.split(":");
  let h = parseInt(hStr, 10);
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, "0")}:${m} ${period}`;
}

function FlipTime({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      key={active ? "on" : "off"}
      className="inline-flex justify-center font-mono text-[0.7rem] tracking-[0.05em] tabular-nums sm:text-xs"
    >
      {label.split("").map((ch, i) => (
        <span
          key={i}
          className="flip-char inline-block"
          style={{ animationDelay: `${i * 28}ms`, whiteSpace: "pre" }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function EventSchedule({ event }: { event: EventContent }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);

  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(undefined);
  const [spacers, setSpacers] = useState({ lead: 0, trail: 0 });
  const [railTop, setRailTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measure card/dot layout so the scroll math and the leading/trailing
  // spacers (which let the first and last cards reach the focus point) stay
  // correct across viewport sizes.
  useEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current;
      const firstCard = cardRefs.current[0];
      const firstDot = dotRefs.current[0];
      if (!sticky || !firstCard || !firstDot) return;

      const containerWidth = sticky.offsetWidth;
      const cardWidth = firstCard.offsetWidth;
      const lead = Math.max(containerWidth * FOCUS_FRACTION - cardWidth / 2, 0);
      const trail = Math.max(containerWidth * (1 - FOCUS_FRACTION) - cardWidth / 2, 0);
      setSpacers({ lead, trail });
      setRailTop(firstDot.offsetTop + firstDot.offsetHeight / 2);

      requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const scrollDistance = Math.max(track.scrollWidth - containerWidth, 0);
        setWrapperHeight(scrollDistance + window.innerHeight);
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!wrapper || !sticky || !track) return;

      const containerWidth = sticky.offsetWidth;
      const scrollDistance = Math.max(track.scrollWidth - containerWidth, 0);
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled = -wrapper.getBoundingClientRect().top;
      const progress = scrollable > 0 ? Math.min(Math.max(scrolled / scrollable, 0), 1) : 0;
      const offset = progress * scrollDistance;

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      const focusX = offset + containerWidth * FOCUS_FRACTION;
      let closest = 0;
      let closestDist = Infinity;
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const center = dot.offsetLeft + dot.offsetWidth / 2;
        const dist = Math.abs(center - focusX);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      if (closest !== activeIndexRef.current) {
        activeIndexRef.current = closest;
        setActiveIndex(closest);
      }

      const activeDot = dotRefs.current[closest];
      if (fill && activeDot) {
        fill.style.width = `${activeDot.offsetLeft + activeDot.offsetWidth / 2}px`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [wrapperHeight]);

  return (
    <section id="schedule" className="relative py-28 md:py-40">
      <div className="stage-glow pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">04 — The Day Of</p>
          <h2 className="display led-text led-text-white mt-6 text-[clamp(2.8rem,11vw,5.5rem)] leading-[0.85]">
            Event
          </h2>
          <h2 className="display led-text led-text-red -mt-2 text-[clamp(2.8rem,11vw,5.5rem)] leading-[0.85]">
            Schedule
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
            {event.dateLabel} · {event.venueLabel}
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70 sm:hidden">Keep scrolling to play it out →</p>
        </Reveal>
      </div>

      <div ref={wrapperRef} className="relative mt-16 md:mt-24" style={{ height: wrapperHeight }}>
        <div ref={stickyRef} className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div ref={trackRef} className="relative flex will-change-transform">
            <div className="flex-none" style={{ width: spacers.lead }} aria-hidden />

            {/* rail + progress fill, positioned through the dots' vertical center */}
            <div
              className="pointer-events-none absolute left-0 right-0 h-px bg-border"
              style={{ top: railTop }}
            />
            <div
              ref={fillRef}
              className="pointer-events-none absolute left-0 h-px bg-ted shadow-[0_0_10px_var(--ted-glow)] transition-[width] duration-150 ease-out"
              style={{ top: railTop }}
            />

            {SCHEDULE.map((row, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={`${row.start}-${row.title}`}
                  ref={(node) => {
                    cardRefs.current[i] = node;
                  }}
                  className="flex w-[clamp(220px,68vw,300px)] flex-none flex-col items-center px-5"
                >
                  <div
                    className="flex min-h-[7.5rem] flex-col items-center justify-end text-center transition-all duration-500 ease-[var(--ease-out-expo)]"
                    style={{
                      opacity: isActive ? 1 : 0.4,
                      transform: isActive ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <span
                      className="transition-colors duration-500"
                      style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}
                    >
                      <FlipTime label={`${to12h(row.start)} – ${to12h(row.end)}`} active={isActive} />
                    </span>
                    <p
                      className="mt-3 text-[0.78rem] leading-snug font-semibold tracking-wide uppercase transition-all duration-500 sm:text-sm"
                      style={{
                        color:
                          row.kind === "speakers"
                            ? "var(--ted-glow)"
                            : isActive
                              ? "var(--foreground)"
                              : "var(--muted-foreground)",
                        textShadow: isActive
                          ? row.kind === "speakers"
                            ? "0 0 18px var(--ted-glow)"
                            : "0 0 14px color-mix(in oklab, var(--foreground) 40%, transparent)"
                          : "none",
                      }}
                    >
                      {row.title}
                    </p>
                  </div>

                  <span
                    ref={(node) => {
                      dotRefs.current[i] = node;
                    }}
                    className="mt-6 flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-500"
                    style={{
                      background: isActive ? "var(--ted)" : "var(--background)",
                      borderColor: isActive ? "var(--ted)" : "var(--border)",
                      boxShadow: isActive ? "0 0 12px var(--ted-glow)" : "none",
                    }}
                  />
                </div>
              );
            })}

            <div className="flex-none" style={{ width: spacers.trail }} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
