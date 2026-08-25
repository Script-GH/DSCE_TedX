"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { NavLinkRow } from "../lib/database.types";
import { cn } from "../lib/utils";

const DEFAULT_NAV_LINKS: NavLinkRow[] = [
  { id: "nav-about", label: "About", href: "#about", position: 1 },
  { id: "nav-event", label: "Event", href: "#event", position: 2 },
  { id: "nav-speakers", label: "Speakers", href: "#speakers", position: 3 },
  { id: "nav-team", label: "Team", href: "#team", position: 4 },
  { id: "nav-contact", label: "Contact", href: "#contact", position: 5 },
];

export default function SiteHeader({ navLinks: allNavLinks }: { navLinks: NavLinkRow[] }) {
  const navLinks = allNavLinks && allNavLinks.length > 0 ? allNavLinks : DEFAULT_NAV_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || document.documentElement.scrollTop) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8">
          <a href="#top" className="display text-lg tracking-tight">
            <span className="text-ted">TEDx</span>
            <span className="text-foreground">DSCE</span>
          </a>

          <ul className="hidden items-center justify-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-base text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-ted after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-self-end gap-2">
            <Link
              href="/speaker-application"
              className="hidden rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary sm:inline-flex"
            >
              Become a Speaker
            </Link>
            <a
              href="#register"
              className="rounded-full bg-ted px-5 py-2 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
            >
              Register
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            >
              <span className="flex flex-col gap-1">
                <span
                  className={cn(
                    "block h-px w-4 bg-foreground transition-transform",
                    menuOpen && "translate-y-[3px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-4 bg-foreground transition-transform",
                    menuOpen && "-translate-y-[3px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 overflow-y-auto bg-background/95 px-5 py-20 backdrop-blur-xl transition-opacity duration-300 md:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={closeMenu}
          aria-label="Close menu"
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <X className="h-5 w-5" />
        </button>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu} className="display text-2xl">
            {l.label}
          </a>
        ))}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/speaker-application"
            onClick={closeMenu}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium"
          >
            Become a Speaker
          </Link>
          <a
            href="#register"
            onClick={closeMenu}
            className="rounded-full bg-ted px-7 py-3 text-sm font-medium text-primary-foreground"
          >
            Register Now
          </a>
        </div>
      </div>
    </header>
  );
}
