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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 520,
        height: 520,
        margin: "-260px 0 0 -260px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1,
        background: "radial-gradient(circle, rgba(230,43,30,.16), transparent 62%)",
        mixBlendMode: "screen",
        transition: "opacity .4s",
      }}
    />
  );
}
