import { tickerWords } from "../lib/data";

export default function Ticker() {
  const loop = [...tickerWords, ...tickerWords];
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,.07)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "20px 0",
        overflow: "hidden",
        background: "#070707",
      }}
    >
      <div style={{ display: "flex", width: "max-content", animation: "marquee 32s linear infinite" }}>
        {loop.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "'Inter Tight'",
              fontWeight: 700,
              fontSize: 22,
              color: "#262626",
              padding: "0 30px",
            }}
          >
            {t} <span style={{ color: "#E62B1E", marginLeft: 30 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
