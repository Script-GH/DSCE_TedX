export default function Contact() {
  return (
    <section id="contact" className="section-pad" style={{ padding: "100px 40px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
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
          Get in Touch
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
          Contact us
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#a3a3a3", maxWidth: 480, margin: "0 auto" }}>
          Contact details and a direct enquiry form are coming soon. In the meantime, reach us through our
          social channels in the footer below.
        </p>
      </div>
    </section>
  );
}
