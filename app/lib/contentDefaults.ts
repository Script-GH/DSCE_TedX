// Fallback values for each site_content singleton, used both to prefill the
// admin editors before a row exists and to render the public site if a
// section hasn't been saved yet. Mirrors the copy the site shipped with
// before content moved into the database.
import type { AboutContent, ContactContent, EventContent, FooterTextContent, HeroContent } from "./database.types";

export const defaultHeroContent: HeroContent = {
  eyebrow: "TEDx Dayananda Sagar College of Engineering",
  headlineLine1: "Rise of the",
  headlineLine2: "Domino",
  tagline: "One Idea. One Voice. Infinite Impact.",
  intro:
    "TEDxDSCE is an independently organized TED event bringing together thinkers, creators and innovators who spark change — where one thought sets everything in motion.",
  ctaPrimaryLabel: "Register Now",
  ctaSecondaryLabel: "Become a Speaker",
  ctaTertiaryLabel: "Watch Previous Talks",
  tickerWordsCsv: "One Idea,Infinite Impact,Rise of the Domino,One Voice,TEDxDSCE 2026",
};

export const defaultAboutContent: AboutContent = {
  eyebrow: "About Us",
  heading: "The idea behind TEDxDSCE",
  body:
    "TEDxDSCE brings the TED experience to Dayananda Sagar College of Engineering — an independently organized event where students, faculty and the wider Bengaluru community gather to hear ideas worth spreading. Full story coming soon.",
  imageUrl: null,
};

export const defaultContactContent: ContactContent = {
  eyebrow: "Get in Touch",
  heading: "Contact us",
  body:
    "Contact details and a direct enquiry form are coming soon. In the meantime, reach us through our social channels in the footer below.",
  email: null,
  phone: null,
  address: null,
};

export const defaultEventContent: EventContent = {
  heading: "Rise of the Domino — Live on Campus",
  targetIso: "2026-11-21T09:00:00",
  dateLabel: "Nov 21, 2026",
  venueLabel: "DSCE Auditorium, Bengaluru",
  formatLabel: "In-person · 12 Talks",
};

export const defaultFooterTextContent: FooterTextContent = {
  tagline: "This independent TEDx event is operated under license from TED.",
  disclaimer: "x = independently organized TED event",
  copyrightText: "© 2026 TEDxDSCE · Dayananda Sagar College of Engineering",
};
