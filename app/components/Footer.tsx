const explore = [
  { href: "#speakers", label: "Speakers" },
  { href: "#event", label: "Event" },
  { href: "#timeline", label: "The Chain" },
  { href: "#gallery", label: "Gallery" },
];

const connect = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="section-pad" style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "70px 40px 40px", background: "#070707" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 50, justifyContent: "space-between", marginBottom: 60 }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ fontFamily: "'Inter Tight'", fontWeight: 800, fontSize: 24, letterSpacing: "-.02em", marginBottom: 16 }}>
              <span style={{ color: "#E62B1E" }}>TEDx</span>DSCE
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#8f8f8f", marginBottom: 10 }}>
              This independent TEDx event is operated under license from TED.
            </p>
            <p style={{ fontSize: 12.5, color: "#5c5c5c", fontFamily: "'JetBrains Mono'", letterSpacing: ".05em" }}>
              x = independently organized TED event
            </p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono'",
                  fontSize: 11,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "#737373",
                  marginBottom: 18,
                }}
              >
                Explore
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, color: "#c4c4c4" }}>
                {explore.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono'",
                  fontSize: 11,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "#737373",
                  marginBottom: 18,
                }}
              >
                Connect
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, color: "#c4c4c4" }}>
                {connect.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div style={{ fontSize: 13, color: "#5c5c5c" }}>© 2026 TEDxDSCE · Dayananda Sagar College of Engineering</div>
          <a href="#top" className="link-fade-white" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#a3a3a3" }}>
            Back to top{" "}
            <span
              style={{
                display: "inline-flex",
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,.16)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &uarr;
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
