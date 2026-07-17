export const ACCENT = "#E62B1E";

export const EVENT_TARGET_ISO = "2026-11-21T09:00:00";

export type Speaker = {
  name: string;
  role: string;
  topic: string;
};

export const speakers: Speaker[] = [
  { name: "A. Speaker", role: "Neuroscientist", topic: "The first thought that topples everything" },
  { name: "B. Speaker", role: "Founder & CEO", topic: "Building momentum from a single bet" },
  { name: "C. Speaker", role: "Climate Scientist", topic: "Small actions, planetary chains" },
  { name: "D. Speaker", role: "Artist", topic: "Creativity as a chain reaction" },
  { name: "E. Speaker", role: "Social Innovator", topic: "One voice that moved a community" },
  { name: "F. Speaker", role: "Astrophysicist", topic: "Cosmic dominoes and deep time" },
];

export const tickerWords: string[] = [
  "One Idea",
  "Infinite Impact",
  "Rise of the Domino",
  "One Voice",
  "TEDxDSCE 2026",
];

export type StatDef = {
  label: string;
  target: number;
  startDelay: number;
  format: (n: number) => string;
};

export const stats: StatDef[] = [
  { label: "Attendees", target: 5000, startDelay: 200, format: (n) => n.toLocaleString() + "+" },
  { label: "Speakers", target: 40, startDelay: 400, format: (n) => n + "+" },
  { label: "Editions", target: 8, startDelay: 600, format: (n) => String(n) },
  {
    label: "Online Views",
    target: 100000,
    startDelay: 800,
    format: (n) => (n >= 1000 ? Math.floor(n / 1000) + "K" : String(n)) + "+",
  },
];

export type TimelineStage = {
  title: string;
  body: string;
};

export const timelineStages: TimelineStage[] = [
  { title: "Idea", body: "It starts invisibly — a single thought worth spreading, standing quietly at the front of the line." },
  { title: "Speaker", body: "A voice gives the idea shape and courage, and pushes it forward onto the stage." },
  { title: "Audience", body: "The room leans in. The idea lands, tips, and passes from one mind to the next." },
  { title: "Community", body: "Conversations multiply. What began as one becomes a movement of many." },
  { title: "Impact", body: "The final tile falls far from the first — and the world is measurably different." },
];

export type Video = {
  title: string;
  speaker: string;
  dur: string;
};

export const videos: Video[] = [
  { title: "The domino inside your decisions", speaker: "Past Speaker · 2024", dur: "14:22" },
  { title: "Why small ideas win", speaker: "Past Speaker · 2023", dur: "11:07" },
  { title: "The physics of momentum", speaker: "Past Speaker · 2023", dur: "16:45" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  { quote: "Easily the most inspiring day on campus. I left with a completely new way of seeing my own ideas.", name: "Attendee", role: "Student, 2024" },
  { quote: "The production quality rivalled events ten times the size. Genuinely world-class storytelling.", name: "Attendee", role: "Industry Guest" },
  { quote: "One talk changed the direction of my startup. That is the domino effect, made real.", name: "Attendee", role: "Founder" },
];

export const sponsorSlots = Array.from({ length: 24 });

export const galleryHeights: string[] = [
  "240px", "300px", "200px", "280px", "220px", "320px", "260px", "200px",
];

export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  { q: "What is TEDxDSCE?", a: "TEDxDSCE is an independently organized TED event hosted at Dayananda Sagar College of Engineering, bringing thinkers, creators and innovators together under the theme Rise of the Domino." },
  { q: "Who can attend?", a: "Everyone — students, professionals, innovators and TED enthusiasts. Tickets are limited and released in waves; join the list to be notified first." },
  { q: "How do I become a speaker?", a: "Submit an application through the Become a Speaker page. Share your idea worth spreading and our curation team reviews every submission." },
  { q: "Where is the event held?", a: "On campus at the DSCE Auditorium in Bengaluru. Full venue and travel details are shared with registered attendees." },
  { q: "Are talks recorded?", a: "Yes. Selected talks are filmed and published, extending the chain reaction to a global online audience." },
];
