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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background transition-[opacity,visibility] duration-700"
      style={{ opacity: visible ? 1 : 0, visibility: visible ? "visible" : "hidden" }}
    >
      <div className="flex h-[70px] items-end gap-2">
        {[0, 0.12, 0.24, 0.36].map((delay, i) => (
          <div
            key={i}
            className="w-[15px] origin-bottom-left rounded-[3px]"
            style={{
              height: 60,
              background: i === 0 ? "var(--ted)" : "var(--foreground)",
              animation: `loaderTip 1.1s ${delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
      <p className="eyebrow">
        TEDx<span className="text-ted">DSCE</span> — Rise of the Domino
      </p>
    </div>
  );
}
