"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 34,
        transition: "opacity .8s ease, visibility .8s ease",
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 9, height: 70 }}>
        {[0, 0.12, 0.24, 0.36].map((delay, i) => (
          <div
            key={i}
            style={{
              width: 15,
              height: 60,
              background: i === 0 ? "#E62B1E" : "#f5f5f5",
              borderRadius: 3,
              transformOrigin: "bottom left",
              animation: `loaderTip 1.1s ${delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: ".32em",
          color: "#737373",
          textTransform: "uppercase",
        }}
      >
        TEDx<span style={{ color: "#E62B1E" }}>DSCE</span> — Rise of the Domino
      </div>
    </div>
  );
}
