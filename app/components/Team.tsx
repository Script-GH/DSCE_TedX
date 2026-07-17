const teamSlots = Array.from({ length: 6 });

export default function Team() {
  return (
    <section id="team" className="section-pad" style={{ padding: "100px 40px", maxWidth: 1320, margin: "0 auto" }}>
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
          The Organizers
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
          Meet the team
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 22 }}>
        {teamSlots.map((_, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              style={{
                aspectRatio: "1/1",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,.09)",
                backgroundImage: "repeating-linear-gradient(135deg, #161616 0 10px, #101010 10px 20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#4d4d4d", letterSpacing: ".1em" }}>
                PHOTO
              </span>
            </div>
            <div style={{ fontFamily: "'Inter Tight'", fontWeight: 600, fontSize: 15.5, marginBottom: 4 }}>Team Member</div>
            <div style={{ fontSize: 12.5, color: "#737373" }}>Role coming soon</div>
          </div>
        ))}
      </div>
    </section>
  );
}
