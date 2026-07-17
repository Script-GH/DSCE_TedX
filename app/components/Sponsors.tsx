import { sponsorSlots } from "../lib/data";

export default function Sponsors() {
  return (
    <section id="sponsors" style={{ padding: "80px 0" }}>
      <div className="section-pad" style={{ textAlign: "center", marginBottom: 44, padding: "0 40px" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          Powered by our partners
        </div>
      </div>
      <div
        style={{
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div style={{ display: "flex", width: "max-content", alignItems: "center", gap: 64, animation: "marquee 30s linear infinite" }}>
          {sponsorSlots.map((_, i) => (
            <div
              key={i}
              style={{
                height: 42,
                width: 150,
                borderRadius: 8,
                backgroundImage: "repeating-linear-gradient(135deg, #161616 0 8px, #111 8px 16px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono'",
                fontSize: 10,
                color: "#4d4d4d",
                letterSpacing: ".1em",
                flexShrink: 0,
              }}
            >
              LOGO
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
