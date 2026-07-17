import { galleryHeights } from "../lib/data";

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad" style={{ padding: "100px 40px", maxWidth: 1320, margin: "0 auto" }}>
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
          05 — Moments
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
          From the stage
        </h2>
      </div>
      <div style={{ columns: 3, columnGap: 16 }}>
        {galleryHeights.map((h, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{
              breakInside: "avoid",
              marginBottom: 16,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.07)",
              height: h,
              backgroundImage: "repeating-linear-gradient(135deg, #151515 0 10px, #101010 10px 20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#4d4d4d", letterSpacing: ".1em" }}>PHOTO</span>
          </div>
        ))}
      </div>
    </section>
  );
}
