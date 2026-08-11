"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (st / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[1200] h-0.5">
      <div
        className="h-full transition-[width] duration-150 ease-linear"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--ted), var(--ted-glow))",
          boxShadow: "0 0 12px color-mix(in oklab, var(--ted) 80%, transparent)",
        }}
      />
    </div>
  );
}
