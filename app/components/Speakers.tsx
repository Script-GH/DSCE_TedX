"use client";

import { useState, useEffect } from "react";
import { X, Linkedin, ExternalLink, Sparkles, Briefcase, Info } from "lucide-react";
import Reveal from "./Reveal";

interface Speaker {
  id: string;
  name: string;
  role: string;
  topic: string;
  bio: string;
  image: string;
  linkedin: string;
}

const speakers: Speaker[] = [
  {
    id: "s1",
    name: "Surabhi Yelsangikar",
    role: "Co-founder, Tvarita Arts Collective",
    topic: "Art as a Catalyst & Social Enterprise",
    bio: "Surabhi Yelsangikar is the Co-Founder of Tvarita Arts Collective India, a social enterprise working to preserve Indigenous and traditional Indian art forms while creating sustainable livelihoods for artists. A Harvard Graduate School of Education alumna, she previously led early-stage incubation at NSRCEL, IIM Bangalore, bringing together education, entrepreneurship, arts and social impact.",
    image: "/speakers/Surabhi Yelsangikar.jpg",
    linkedin: "https://www.linkedin.com/in/surabhi-yelsangikar-995b69121/",
  },
  {
    id: "s2",
    name: "Dr. Nishant Jayant",
    role: "Founder, Peritum Marketing House",
    topic: "Performance Marketing & Catalytic Growth",
    bio: "Dr. Nishant Jayant is the Founder and Director of Peritum Creative House, a performance marketing agency operating across India and the GCC. With a focus on measurable growth, systematic creative testing and data-driven marketing, he works with brands across D2C, B2B SaaS, FMCG and luxury hospitality to build scalable revenue engines.",
    image: "/speakers/Dr Nishant Jayant.jpg",
    linkedin: "https://www.linkedin.com/in/dr-nishant-jayant-57249015/",
  },
  {
    id: "s3",
    name: "Rahul Vellal",
    role: "Carnatic Classical Vocalist & Musician",
    topic: "Carnatic Classical Music & Heritage",
    bio: "Rahul Vellal is a Bengaluru-based Carnatic vocalist and musician who began learning music at the age of four. Trained under Ranjani and Gayatri, he has performed across India and internationally while pursuing Carnatic vocal, mridangam and Western piano. At 18, he represents a new generation carrying classical music into contemporary spaces.",
    image: "/speakers/Rahul Vellal.jpg",
    linkedin: "https://www.linkedin.com/in/rahul-vellal-7952b6254/",
  },
  {
    id: "s4",
    name: "Yash Agarwal",
    role: "Co-Founder, The Binge Town",
    topic: "Innovation & Youth Enterprise",
    bio: "Yash Agarwal is an entrepreneur and young business leader working at the intersection of innovation, technology and enterprise. Through his work, he has built experience in developing ideas, navigating fast-changing markets and creating solutions with practical impact. His journey reflects the evolving role of young founders in shaping India’s entrepreneurial landscape.",
    image: "/speakers/Yash Agarwal.jpg",
    linkedin: "https://www.linkedin.com/in/yash-agarwal-636004157/",
  },
  {
    id: "s5",
    name: "Jimmy Xavier",
    role: "Creative Head, Voice Artist",
    topic: "Creative Direction & Voice Artistry",
    bio: "Jimmy Xavier is a creative professional and entrepreneur whose work brings together communication, business and creative thinking. With experience navigating the evolving creative and entrepreneurial landscape, he focuses on turning ideas into tangible outcomes and exploring new ways for individuals and organisations to communicate, create and build in a rapidly changing world.",
    image: "/speakers/Jimmy Xavier.jpg",
    linkedin: "https://www.linkedin.com/in/jimmy-xavier-ba977319/",
  },
  {
    id: "s6",
    name: "Harish Bijoor",
    role: "Founder, Harish Bijoor Consultants Inc.",
    topic: "Brand Strategy & Market Insights",
    bio: "Harish Bijoor is the Founder of Harish Bijoor Consults Inc., a boutique brand consulting firm. A brand thinker and practitioner, he has held senior roles across FMCG and telecommunications, including Tata Coffee and Zip Telecom. His expertise spans branding, marketing, consumer behaviour, retail, sales and general management, making him a prominent voice in India’s business landscape.",
    image: "/speakers/Harish Bijoor.jpg",
    linkedin: "https://www.linkedin.com/in/harish-bijoor-3bb2a5/",
  },
  {
    id: "s7",
    name: "Maestro Prof. K. C. Janardhan",
    role: "Expert in Handwriting and Calligraphy",
    topic: "Handwriting, Calligraphy & Cultural Traditions",
    bio: "Maestro Prof. K. C. Janardhan is a distinguished music educator and practitioner whose work spans performance, teaching and the preservation of Indian musical traditions. Through decades of engagement with music and mentorship, he has contributed to nurturing generations of musicians and keeping classical knowledge relevant across changing cultural landscapes and audiences.",
    image: "/speakers/Maestro Prof KC Janardhan.png",
    linkedin: "https://www.linkedin.com/in/kambam-chakrapani-janardhan-0b30b914/",
  },
  {
    id: "s8",
    name: "Pawan Mulukutla",
    role: "Executive Program Director, WRI India Integrated Transport, Clean Air and Hydrogen",
    topic: "Clean Mobility & Sustainable Transport",
    bio: "Pawan Mulukutla is the Executive Program Director for Integrated Transport, Clean Air and Hydrogen at WRI India. With over two decades of experience across urban mobility, energy and environment, he has contributed to India’s electric mobility and green hydrogen transition, while shaping policy and systems for cleaner, more inclusive and sustainable transportation.",
    image: "/speakers/Pawan Mulukutla.jpg",
    linkedin: "https://www.linkedin.com/in/pawanmulukutla/",
  },
  {
    id: "s9",
    name: "Dr. Sujit Paul",
    role: "CEO, Zota Healthcare",
    topic: "Healthcare Leadership & Strategic Management",
    bio: "Dr. Sujit Paul is an academician, entrepreneur and business educator with experience across management education and institutional leadership. His work spans entrepreneurship, business strategy and professional education, with a focus on developing industry-oriented learning and creating platforms that connect academic knowledge with practical applications in the evolving business ecosystem.",
    image: "/speakers/Dr. Sujit Paul.webp",
    linkedin: "https://www.linkedin.com/in/drsujitpaul/",
  },
  {
    id: "s10",
    name: "Karthik YV",
    role: "Founder, Art Glory",
    topic: "Creative Enterprise & Purposeful Ventures",
    bio: "Karthik YV is associated with ART GLORY, a venture focused on entrepreneurial growth and creative enterprise. His work brings together business thinking, leadership and an interest in building ventures with purpose. Through his entrepreneurial journey, he explores how ideas, people and execution can come together to create sustainable organisations and meaningful impact.",
    image: "/speakers/Karthik YV.jpeg",
    linkedin: "https://www.linkedin.com/in/karthik-yv-a98a01112/",
  },
  {
    id: "s11",
    name: "Ananya Jois",
    role: "Architect and Interior Designer, Founder Jois Design House",
    topic: "Architecture, Interior Design & Spatial Aesthetics",
    bio: "Ar. Ananya Jois is the Founder of Jois Design House, a Bengaluru-based interior design studio specialising in highly customised residential spaces. A first-generation entrepreneur, she combines architectural thinking, aesthetics and execution to create homes that balance quiet luxury with everyday functionality, supported by an integrated approach to design and modular furniture manufacturing.",
    image: "/speakers/Ananya Jois.jpg",
    linkedin: "https://www.linkedin.com/in/ananya-a-jois/",
  },
  {
    id: "s12",
    name: "Shivani R. K.",
    role: "CEO & Founder, Tribal Brew Coffee",
    topic: "Indigenous Coffee Culture & Entrepreneurship",
    bio: "Shivani R. K. is the Founder and CEO of Tribal Brew Coffee, a venture rooted in Indian coffee, entrepreneurship and the communities behind the bean. Through Tribal Brew, she works to connect quality coffee with its cultural and regional identity, building a brand that brings Indian coffee stories closer to contemporary consumers.",
    image: "/speakers/Shivani RK.jpg",
    linkedin: "https://www.linkedin.com/in/shivani-r-a6908244/",
  },
];

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSpeaker(null);
    };
    if (selectedSpeaker) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedSpeaker]);

  return (
    <section id="speakers" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="eyebrow">The Speakers</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Voices on stage</h2>
          </div>
          <p className="max-w-md text-base md:text-lg text-muted-foreground">
            Click on any speaker to open their profile, background story, and insights for TEDxDSCE.
          </p>
        </div>
      </Reveal>

      {/* Speaker Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
        {speakers.map((speaker, i) => (
          <Reveal key={speaker.id} delay={i * 40} className="text-center w-full max-w-[340px]">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedSpeaker(speaker)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedSpeaker(speaker);
                }
              }}
              className="group flex flex-col items-center w-full rounded-3xl border border-border/60 bg-surface/50 p-6 transition-all duration-300 hover:border-white/20 hover:bg-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-ted/50 h-full text-left"
              aria-label={`View profile of ${speaker.name}`}
            >
              {/* Speaker Avatar Container */}
              <div className="relative mx-auto overflow-hidden rounded-full border-2 border-border/80 bg-surface shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${encodeURI(speaker.image)}")`,
                  }}
                />
              </div>

              {/* Speaker Card Metadata */}
              <h3 className="mt-6 text-xl sm:text-2xl font-bold text-foreground text-center w-full transition-colors group-hover:text-ted">
                {speaker.name}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center w-full line-clamp-2 leading-relaxed">
                {speaker.role}
              </p>

              {/* Action row with Explore Profile & Direct LinkedIn Button */}
              <div className="mt-auto pt-6 flex items-center justify-between w-full border-t border-white/5">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ted font-mono uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Explore Profile →
                </span>

                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:scale-110 shadow-sm"
                    aria-label={`Visit ${speaker.name}'s LinkedIn profile`}
                    title={`Visit ${speaker.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="h-4 w-4 fill-current" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Speaker Profile Modal */}
      {selectedSpeaker && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 md:p-8 backdrop-blur-lg animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative w-full max-w-3xl lg:max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-[#121215] p-6 sm:p-10 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.9)] transition-all duration-300 animate-in zoom-in-95 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedSpeaker(null)}
              className="absolute right-5 top-5 sm:right-7 sm:top-7 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-all hover:bg-ted hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Close profile modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Profile Header (Portrait + Name & Role) */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-7 md:gap-10 pt-2">
              {/* Speaker Portrait */}
              <div className="relative shrink-0">
                <div
                  className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-3xl border-2 border-ted/60 bg-surface-2 bg-cover bg-center shadow-[0_0_35px_rgba(235,0,40,0.35)]"
                  style={{ backgroundImage: `url("${encodeURI(selectedSpeaker.image)}")` }}
                />
                <span className="absolute -bottom-2.5 -right-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-ted text-white shadow-lg">
                  <Sparkles className="h-5 w-5" />
                </span>
              </div>

              {/* Header Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ted/20 border border-ted/40 px-3.5 py-1 text-xs sm:text-sm font-semibold text-ted uppercase tracking-wider">
                    TEDxDSCE Speaker
                  </span>
                  {selectedSpeaker.topic && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs sm:text-sm text-zinc-300 font-mono">
                      {selectedSpeaker.topic}
                    </span>
                  )}
                </div>

                <h3 className="display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  {selectedSpeaker.name}
                </h3>

                <p className="mt-3 flex items-center justify-center md:justify-start gap-2 text-base sm:text-lg md:text-xl font-medium text-white/90 leading-snug">
                  <Briefcase className="h-5 w-5 text-ted shrink-0" />
                  <span>{selectedSpeaker.role}</span>
                </p>
              </div>
            </div>

            {/* Bio Section with High Readability */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-ted" />
                <h4 className="text-xs sm:text-sm uppercase tracking-widest font-mono font-bold text-ted">
                  About the Speaker
                </h4>
              </div>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-8 md:leading-9 text-zinc-200 font-normal">
                {selectedSpeaker.bio}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              {selectedSpeaker.linkedin ? (
                <a
                  href={selectedSpeaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-[#0A66C2] px-7 py-3.5 text-base sm:text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#004182] hover:scale-105 active:scale-95"
                >
                  <Linkedin className="h-5 w-5 fill-current" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </a>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
