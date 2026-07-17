const blogSlots = Array.from({ length: 3 });

export default function Blogs() {
  return (
    <section id="blogs" className="section-pad" style={{ padding: "100px 40px", maxWidth: 1320, margin: "0 auto" }}>
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
          From the Blog
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
          Stories &amp; insights
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
        {blogSlots.map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.09)",
              background: "#0b0b0b",
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                backgroundImage: "repeating-linear-gradient(135deg, #161616 0 10px, #101010 10px 20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#4d4d4d", letterSpacing: ".1em" }}>
                COMING SOON
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: "#E62B1E", fontFamily: "'JetBrains Mono'", letterSpacing: ".1em", marginBottom: 8 }}>
                UPCOMING POST
              </div>
              <h3 style={{ fontFamily: "'Inter Tight'", fontWeight: 600, fontSize: 19, letterSpacing: "-.01em", marginBottom: 6 }}>
                Blog post title
              </h3>
              <div style={{ fontSize: 13.5, color: "#8f8f8f" }}>Content coming soon.</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
