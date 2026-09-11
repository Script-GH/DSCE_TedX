"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, X, ExternalLink, Film } from "lucide-react";
import Reveal from "./Reveal";

interface TalkItem {
  id: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  fallbackThumbnail: string;
  title: string;
  speaker: string;
}

const DEFAULT_TALKS: TalkItem[] = [
  {
    id: "dbsVJrSonhE",
    videoUrl: "https://youtu.be/dbsVJrSonhE?si=kPg5ummcR28HGvdY",
    embedUrl: "https://www.youtube-nocookie.com/embed/dbsVJrSonhE?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/dbsVJrSonhE/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/dbsVJrSonhE/hqdefault.jpg",
    title: "The Power of Civil Momentum",
    speaker: "Annamalai Kuppusamy",
  },
  {
    id: "vX1bjXPOx30",
    videoUrl: "https://youtu.be/vX1bjXPOx30?si=gKJAM01Oolk2Le3X",
    embedUrl: "https://www.youtube-nocookie.com/embed/vX1bjXPOx30?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/vX1bjXPOx30/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/vX1bjXPOx30/hqdefault.jpg",
    title: "Make in India vs Incredible India",
    speaker: "Vinay Raj Somashekar",
  },
  {
    id: "edEgxD_rX3c",
    videoUrl: "https://youtu.be/edEgxD_rX3c?si=9ZQUGw0g_1z0sUuX",
    embedUrl: "https://www.youtube-nocookie.com/embed/edEgxD_rX3c?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/edEgxD_rX3c/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/edEgxD_rX3c/hqdefault.jpg",
    title: "Art of Quitting",
    speaker: "Pawan Kumar",
  },
  {
    id: "6_LX9mo0Thw",
    videoUrl: "https://youtu.be/6_LX9mo0Thw?si=RalW69G6YrtDL5dw",
    embedUrl: "https://www.youtube-nocookie.com/embed/6_LX9mo0Thw?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/6_LX9mo0Thw/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/6_LX9mo0Thw/hqdefault.jpg",
    title: "Figure It Out - The Art of Problem Solving",
    speaker: "Shreyans Jain",
  },
  {
    id: "iVy6zz_m8lg",
    videoUrl: "https://youtu.be/iVy6zz_m8lg?si=g_rNG-brixo8xvif",
    embedUrl: "https://www.youtube-nocookie.com/embed/iVy6zz_m8lg?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/iVy6zz_m8lg/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/iVy6zz_m8lg/hqdefault.jpg",
    title: "Generic v/s Branded Medicine",
    speaker: "Arjun Deshpande",
  },
  {
    id: "fmsVIWE7e6s",
    videoUrl: "https://youtu.be/fmsVIWE7e6s?si=r8wgaRmt6Areb6fz",
    embedUrl: "https://www.youtube-nocookie.com/embed/fmsVIWE7e6s?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/fmsVIWE7e6s/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/fmsVIWE7e6s/hqdefault.jpg",
    title: "Power of Women Entrepreneurship",
    speaker: "K. Ratna Prabha, IAS",
  },
  {
    id: "KLx0-D4ivz0",
    videoUrl: "https://youtu.be/KLx0-D4ivz0?si=Qgfu7_7lx8wZc8WP",
    embedUrl: "https://www.youtube-nocookie.com/embed/KLx0-D4ivz0?autoplay=1&rel=0",
    thumbnailUrl: "https://img.youtube.com/vi/KLx0-D4ivz0/maxresdefault.jpg",
    fallbackThumbnail: "https://img.youtube.com/vi/KLx0-D4ivz0/hqdefault.jpg",
    title: "Liberalism, Democracy, and Freedom",
    speaker: "Saira Shah Halim",
  },
];

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

function parseTalksTxt(text: string): TalkItem[] {
  const lines = text.split("\n");
  const items: TalkItem[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const parts = line.split("|").map((p) => p.trim());
    const url = parts[0];
    if (!url) continue;

    const ytId = extractYouTubeId(url);
    const title = parts[1] || (ytId ? "TEDx Featured Talk" : "Previous Talk");
    const speaker = parts[2] || "TEDx Archive";

    if (ytId) {
      items.push({
        id: ytId,
        videoUrl: url,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`,
        thumbnailUrl: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
        fallbackThumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
        title,
        speaker,
      });
    } else {
      // Non-YouTube URL or custom image
      items.push({
        id: url,
        videoUrl: url,
        embedUrl: url,
        thumbnailUrl: url,
        fallbackThumbnail: url,
        title,
        speaker,
      });
    }
  }

  return items.length > 0 ? items : DEFAULT_TALKS;
}

const ROTATION_INTERVAL_MS = 20000; // 20 seconds

export default function PreviousTalks() {
  const [talks, setTalks] = useState<TalkItem[]>(DEFAULT_TALKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imgSrcMap, setImgSrcMap] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const requestRef = useRef<number | null>(null);

  // Load talks from /talks.txt
  useEffect(() => {
    async function loadTalks() {
      try {
        const res = await fetch(`/talks.txt?t=${Date.now()}`);
        if (res.ok) {
          const text = await res.text();
          const parsed = parseTalksTxt(text);
          setTalks(parsed);
        }
      } catch (e) {
        console.warn("Could not fetch talks.txt, using fallback talks", e);
      }
    }
    loadTalks();
  }, []);

  const total = talks.length;
  const currentTalk = talks[currentIndex] || talks[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setAnimationKey((k) => k + 1);
    startTimeRef.current = Date.now();
    setProgress(0);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setAnimationKey((k) => k + 1);
    startTimeRef.current = Date.now();
    setProgress(0);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setAnimationKey((k) => k + 1);
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  // 20-second timer loop with progress bar animation
  useEffect(() => {
    if (isPlayingModal || isPaused || total <= 1) {
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * ROTATION_INTERVAL_MS;

    const updateTimer = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / ROTATION_INTERVAL_MS) * 100);
      setProgress(pct);

      if (elapsed >= ROTATION_INTERVAL_MS) {
        nextSlide();
      } else {
        requestRef.current = requestAnimationFrame(updateTimer);
      }
    };

    requestRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlayingModal, isPaused, nextSlide, total, animationKey]);

  // Handle fallback image when maxres isn't available
  const handleImageError = (talkId: string, fallback: string) => {
    setImgSrcMap((prev) => ({ ...prev, [talkId]: fallback }));
  };

  const currentImage =
    imgSrcMap[currentTalk?.id] || currentTalk?.thumbnailUrl || currentTalk?.fallbackThumbnail;

  return (
    <section id="previous-talks" className="relative mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">06 — Archive</span>
            </div>
            <h2 className="display led-text led-text-white mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">Previous Ted Talks</h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-muted-foreground">
            Uncover local voices and global breakthroughs from the TEDx stage—handpicked for the next generation of leaders.
          </p>
        </div>
      </Reveal>

      {/* Main Spotlight Showcase */}
      <div className="mt-12 md:mt-16">
        <Reveal>
          <div
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface/90 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-ted/40"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Timer Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/5">
              <div
                className="h-full bg-ted transition-all duration-100 ease-linear shadow-[0_0_12px_var(--color-ted)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Video Hero Canvas */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-surface-2">
              {/* Dynamic Background Image */}
              <div
                key={animationKey}
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform scale-100 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${currentImage})`,
                  filter: "brightness(0.75)",
                }}
              >
                {/* Fallback image element to catch 404s */}
                <img
                  src={currentImage}
                  alt={currentTalk?.title || "TED Talk"}
                  className="hidden"
                  onError={() =>
                    handleImageError(currentTalk.id, currentTalk.fallbackThumbnail)
                  }
                />
              </div>

              {/* Gradient Overlay Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

              {/* Central Big Play Button */}
              <button
                type="button"
                onClick={() => setIsPlayingModal(true)}
                aria-label={`Play ${currentTalk?.title}`}
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer group/btn"
              >
                <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-ted text-primary-foreground shadow-[var(--shadow-ted)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_40px_rgba(235,0,40,0.8)]">
                  <span className="absolute inset-0 rounded-full bg-ted/40 animate-ping" />
                  <Play className="relative ml-1.5 h-8 w-8 md:h-10 md:w-10 fill-current" />
                </div>
              </button>

              {/* Talk Info Overlay (Bottom-Left) */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-ted/20 border border-ted/40 px-2.5 py-0.5 text-xs font-semibold text-ted uppercase tracking-wider">
                      <Film className="h-3 w-3" /> Featured Talk
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="display text-2xl sm:text-3xl md:text-4xl text-foreground font-bold leading-tight drop-shadow-md">
                    {currentTalk?.title}
                  </h3>

                  <p className="mt-2 text-base md:text-lg font-medium text-white/80">
                    Speaker: <span className="text-foreground font-semibold">{currentTalk?.speaker}</span>
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlayingModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-ted px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ted)] transition-all hover:brightness-110 hover:scale-105 active:scale-95"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Watch Video
                  </button>

                  <a
                    href={currentTalk?.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/80 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-surface-2 hover:border-ted/50"
                    title="Open in YouTube"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous talk"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/60 text-white backdrop-blur-md transition-all hover:bg-ted hover:border-ted hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next talk"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/60 text-white backdrop-blur-md transition-all hover:bg-ted hover:border-ted hover:scale-110 active:scale-95"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Miniature Thumbnail Carousel Bar */}
            <div className="border-t border-border/60 bg-surface-2/40 p-4 md:p-5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                  Up Next
                </p>
                <span className="text-xs text-muted-foreground">
                  {isPaused ? "⏸ Paused (Hovering)" : "▶ Auto-playing"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {talks.map((talk, idx) => {
                  const isSelected = idx === currentIndex;
                  const thumb = imgSrcMap[talk.id] || talk.thumbnailUrl || talk.fallbackThumbnail;

                  return (
                    <button
                      key={`${talk.id}-${idx}`}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={`group/item text-left relative overflow-hidden rounded-xl border p-2 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-ted bg-ted/10 ring-2 ring-ted/30"
                          : "border-border/60 bg-surface hover:border-white/20 hover:bg-surface-2"
                      }`}
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-2">
                        <img
                          src={thumb}
                          alt={talk.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                          onError={() => handleImageError(talk.id, talk.fallbackThumbnail)}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-ted/20 flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-ted shadow-[0_0_8px_var(--color-ted)] animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="mt-2">
                        <p className={`line-clamp-1 text-xs font-semibold ${isSelected ? "text-ted" : "text-foreground"}`}>
                          {talk.title}
                        </p>
                        <p className="line-clamp-1 text-[11px] text-muted-foreground">
                          {talk.speaker}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Embedded Video Modal */}
      {isPlayingModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPlayingModal(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h3 className="font-semibold text-foreground">{currentTalk?.title}</h3>
                <p className="text-xs text-muted-foreground">{currentTalk?.speaker}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsPlayingModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-muted-foreground transition-colors hover:bg-ted hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video IFrame Container */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={currentTalk?.embedUrl}
                title={currentTalk?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
