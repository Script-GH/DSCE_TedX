"use client";

import { useEffect, useState } from "react";

type Countdown = {
  days: string;
  hours: string;
  mins: string;
  secs: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function compute(targetMs: number): Countdown {
  const d = targetMs - Date.now();
  if (d <= 0) return { days: "00", hours: "00", mins: "00", secs: "00" };
  return {
    days: pad(Math.floor(d / 86400000)),
    hours: pad(Math.floor((d % 86400000) / 3600000)),
    mins: pad(Math.floor((d % 3600000) / 60000)),
    secs: pad(Math.floor((d % 60000) / 1000)),
  };
}

export function useCountdown(targetIso: string): Countdown {
  const [value, setValue] = useState<Countdown>({
    days: "--",
    hours: "--",
    mins: "--",
    secs: "--",
  });

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => setValue(compute(target));
    // Kick off the first tick asynchronously so the placeholder renders
    // first — matches server output and avoids a hydration mismatch.
    const kickoff = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, [targetIso]);

  return value;
}
