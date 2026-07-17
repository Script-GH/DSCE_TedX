export default function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: "100px 40px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
        <div style={{ flex: "1 1 420px" }}>
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
            About Us
          </div>
          <h2
            style={{
              fontFamily: "'Inter Tight'",
              fontWeight: 800,
              fontSize: "clamp(34px, 5vw, 62px)",
              letterSpacing: "-.03em",
              lineHeight: 1,
              marginBottom: 22,
            }}
          >
            The idea behind TEDxDSCE
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#a3a3a3", maxWidth: 540 }}>
            TEDxDSCE brings the TED experience to Dayananda Sagar College of Engineering — an independently
            organized event where students, faculty and the wider Bengaluru community gather to hear ideas
            worth spreading. Full story coming soon.
          </p>
        </div>
        <div
          style={{
            flex: "1 1 320px",
            minHeight: 280,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,.09)",
            backgroundImage: "repeating-linear-gradient(135deg, #161616 0 10px, #101010 10px 20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4d4d4d", letterSpacing: ".12em" }}>
            CONTENT COMING SOON
          </span>
        </div>
      </div>
    </section>
  );
}
