"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#speakers", label: "Speakers" },
  { href: "#event", label: "Events" },
  { href: "#blogs", label: "Blogs" },
  { href: "#team", label: "Team" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      setScrolled(st > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          transition: "all .45s cubic-bezier(.16,1,.3,1)",
          borderBottom: "1px solid transparent",
          background: scrolled ? "rgba(8,8,8,.72)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottomColor: scrolled ? "rgba(255,255,255,.08)" : "transparent",
          padding: scrolled ? "13px 40px" : "18px 40px",
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 800,
            fontSize: 21,
            letterSpacing: "-.02em",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#E62B1E" }}>TEDx</span>
          <span>DSCE</span>
        </a>
        <div
          className="nav-links-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 14,
            fontWeight: 500,
            color: "#d4d4d4",
          }}
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} style={{ transition: "color .2s", whiteSpace: "nowrap" }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <Link
            href="/speaker-application"
            className="nav-links-desktop btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(255,255,255,.03)",
              whiteSpace: "nowrap",
            }}
          >
            Become a Speaker
          </Link>
          <a
            href="#register"
            className="nav-links-desktop btn-accent-sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#E62B1E",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Register
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-mobile-btn"
            aria-label="Menu"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
            }}
          >
            <span style={{ width: 24, height: 2, background: "#f5f5f5", display: "block" }} />
            <span style={{ width: 24, height: 2, background: "#f5f5f5", display: "block" }} />
            <span
              style={{
                width: 16,
                height: 2,
                background: "#f5f5f5",
                display: "block",
                alignSelf: "flex-end",
              }}
            />
          </button>
        </div>
      </nav>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1500,
          background: "rgba(5,5,5,.94)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          overflowY: "auto",
          padding: "80px 20px 40px",
          transition: "opacity .4s, visibility .4s",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          onClick={closeMenu}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 24,
            right: 30,
            background: "none",
            border: "none",
            color: "#f5f5f5",
            fontSize: 34,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          &times;
        </button>
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            style={{ fontFamily: "'Inter Tight'", fontSize: 24, fontWeight: 700 }}
          >
            {l.label}
          </a>
        ))}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 10 }}>
          <Link
            href="/speaker-application"
            onClick={closeMenu}
            style={{
              padding: "14px 28px",
              borderRadius: 100,
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,.2)",
            }}
          >
            Become a Speaker
          </Link>
          <a
            href="#register"
            onClick={closeMenu}
            style={{
              background: "#E62B1E",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 100,
              fontWeight: 600,
            }}
          >
            Register Now
          </a>
        </div>
      </div>
    </>
  );
}
