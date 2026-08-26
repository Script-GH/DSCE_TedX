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
    name: "Harish Bijoor",
    role: "Founder, Harish Bijoor Consults Inc.",
    topic: "Brand Strategy & Chain Reactions",
    bio: "Harish Bijoor is the founder of Harish Bijoor Consults Inc., spanning Bengaluru to Seattle to London, and widely regarded as India's own \"Ambassador of Brands.\" From senior leadership at Hindustan Unilever and Tata Global Beverages to 20 years on faculty at the Indian School of Business, Harish has spent a career proving that one sharp mind can redefine how an entire market thinks. His insights on consumer psychology, AI, and Web 3.0 aren't just forecasts — they're the first push behind trends everyone else follows later. At TEDxDSCE, Harish takes the stage on how one well-placed idea can set off a chain reaction the whole business world feels.",
    image: "/speakers/Harish-Bijoor.jpeg",
    linkedin: "https://www.linkedin.com/in/harish-bijoor-3bb2a5/",
  },
  {
    id: "s2",
    name: "Dr. Nishant Jayant",
    role: "Founder, Peritum Creative House",
    topic: "Marketing & Catalytic Change",
    bio: "Dr. Nishant Jayant is the founder of Peritum Creative House, growth consultant, and the strategist behind digital campaigns for names like CRED and Reliance. Over a decade in, he's mastered the art of turning one sharp idea into market-wide momentum. His story is proof that impact doesn't start with scale — it starts with a single, focused push in the right direction. At TEDxDSCE, Dr. Nishant takes the stage on how one catalyst can set off a chain of lasting change.",
    image: "/speakers/Nishant-Jayant.jpeg",
    linkedin: "https://www.linkedin.com/in/dr-nishant-jayant-57249015/",
  },
  {
    id: "s3",
    name: "Pawan Mulukutla",
    role: "Executive Program Director, WRI India",
    topic: "Clean Mobility & Policy Innovation",
    bio: "Pawan Mulukutla is a mobility policy expert, engineer, and writer whose two-decade career has moved from engineering roots at Robert Bosch to shaping India's clean mobility agenda, playing a key role in the country's electric bus programme and contributing to the National Green Hydrogen Mission. His research on EV battery safety, zero-emission freight, and gender-inclusive mobility has found its way into The Hindu, Hindustan Times, Times of India, and Scroll. Fluent in five languages and driven by one focused mission, Pawan's work proves that the systems we'll all depend on tomorrow are being quietly engineered today. At TEDxDSCE, he talks about building mobility in India, one policy push at a time.",
    image: "/speakers/Pawan-Mulukutla.jpeg",
    linkedin: "https://www.linkedin.com/in/pawanmulukutla/",
  },
  {
    id: "s4",
    name: "Rahul Vellal",
    role: "Musician | Singer",
    topic: "Musical Heritage & Global Rhythm",
    bio: "Rahul Vellal is a Bengaluru-based Carnatic vocalist who found his voice at the age of four and has been carrying it across stages worldwide ever since. Trained under the legendary Ranjani & Gayatri, Rahul blends deep-rooted classical discipline with a global stage presence, earning him the Global Child Prodigy Award back in 2020. He's proof that tradition doesn't have to stay still — it can travel, adapt, and still hit every note true. At TEDxDSCE, Rahul talks about carrying India's musical heritage into a global rhythm.",
    image: "/speakers/Rahul-Vellal.jpeg",
    linkedin: "https://www.linkedin.com/in/rahul-vellal-7952b6254/",
  },
  {
    id: "s5",
    name: "Surabhi Yelsangikar",
    role: "Co-Founder, Tvarita Arts Collective India",
    topic: "Art as a Catalyst",
    bio: "Surabhi Yelsangikar is a social entrepreneur, co-founder of Tvarita Arts Collective, and a Harvard Graduate School of Education alum who's built her work around one idea: culture isn't something to preserve in a museum — it's something to build a livelihood on. From incubating ideas at NSRCEL, IIM Bangalore, to empowering traditional artists across India, Surabhi has made it her mission to show that heritage and innovation aren't opposites — they set each other off. At TEDxDSCE, she takes the stage with \"Art as a Catalyst,\" on how creativity can spark the kind of change that doesn't stop at one domino.",
    image: "/speakers/Surabhi-Yelsangikar.jpeg",
    linkedin: "https://www.linkedin.com/in/surabhi-yelsangikar-995b69121/",
  },
  {
    id: "s6",
    name: "Yash Agarwal",
    role: "Co-Founder, The Binge Town",
    topic: "Discipline Over Motivation",
    bio: "Yash Agarwal is the co-founder of The Binge Town who has built his career on a simple, unglamorous idea — discipline beats motivation, every single time. When his business faced a problem he had zero passion for solving, he didn't wait to feel inspired. He gave it 20 minutes a day. No excitement, no fire, just consistency. Three months later, the problem was solved. His own journey — from health struggles that pulled him back from his masters in Germany, to rebuilding one unspectacular day at a time — is proof that showing up matters more than feeling ready to. At TEDxDSCE, he talks about why discipline, not motivation, is what actually moves things forward.",
    image: "/speakers/Yash-Agarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/yash-agarwal-636004157/",
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
          <Reveal key={speaker.id} delay={i * 50} className="text-center w-full max-w-[340px]">
              <button
                type="button"
                onClick={() => setSelectedSpeaker(speaker)}
                className="group flex flex-col items-center w-full rounded-3xl border border-border/60 bg-surface/50 p-6 transition-all duration-300 hover:border-white/20 hover:bg-surface cursor-pointer focus:outline-none"
                aria-label={`View profile of ${speaker.name}`}
              >
                {/* Speaker Avatar Container */}
                <div className="relative mx-auto overflow-hidden rounded-full border-2 border-border/80 bg-surface shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${speaker.image})`,
                    }}
                  />
                </div>

                {/* Speaker Card Metadata */}
                <h3 className="mt-6 text-xl sm:text-2xl font-bold text-foreground transition-colors group-hover:text-ted">
                  {speaker.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground line-clamp-2 leading-relaxed">
                  {speaker.role}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-ted font-mono uppercase tracking-wider">
                  <span>Explore Profile</span> →
                </div>
              </button>
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
              className="absolute right-5 top-5 sm:right-7 sm:top-7 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-all hover:bg-ted hover:text-white hover:scale-110 active:scale-95"
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
                  style={{ backgroundImage: `url(${selectedSpeaker.image})` }}
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
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs sm:text-sm text-zinc-300 font-mono">
                    {selectedSpeaker.topic}
                  </span>
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

              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
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
