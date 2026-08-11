"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const g = glowRef.current;
      if (g) {
        g.style.left = e.clientX + "px";
        g.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[520px] w-[520px] rounded-full"
      style={{
        margin: "-260px 0 0 -260px",
        background: "radial-gradient(circle, color-mix(in oklab, var(--ted) 16%, transparent), transparent 62%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
