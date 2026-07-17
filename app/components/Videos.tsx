import { videos } from "../lib/data";

export default function Videos() {
  return (
    <section id="videos" className="section-pad" style={{ padding: "100px 40px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#E62B1E",
            marginBottom: 16,
          }}
        >
          04 — Ideas Worth Spreading
        </div>
        <h2
          style={{
            fontFamily: "'Inter Tight'",
            fontWeight: 800,
            fontSize: "clamp(34px, 5vw, 62px)",
            letterSpacing: "-.03em",
            lineHeight: 1,
          }}
        >
          Watch previous talks
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
        {videos.map((v) => (
          <div
            key={v.title}
            className="video-card"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.09)",
              background: "#0b0b0b",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "16/9",
                backgroundImage: "repeating-linear-gradient(135deg, #161616 0 10px, #101010 10px 20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "rgba(230,43,30,.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 30px rgba(230,43,30,.4)",
                }}
              >
                <span
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "15px solid #fff",
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                    marginLeft: 4,
                  }}
                />
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: "#E62B1E", fontFamily: "'JetBrains Mono'", letterSpacing: ".1em", marginBottom: 8 }}>
                {v.dur}
              </div>
              <h3 style={{ fontFamily: "'Inter Tight'", fontWeight: 600, fontSize: 19, letterSpacing: "-.01em", marginBottom: 6 }}>
                {v.title}
              </h3>
              <div style={{ fontSize: 13.5, color: "#8f8f8f" }}>{v.speaker}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
