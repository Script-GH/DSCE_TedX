import type { GalleryPhotoRow } from "../lib/database.types";
import Reveal from "./Reveal";

export default function Gallery({ photos }: { photos: GalleryPhotoRow[] }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow">05 — Moments</p>
        <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">From the stage</h2>
      </Reveal>
      <div className="mt-16 columns-2 gap-4 sm:columns-3">
        {photos.map((photo, i) => (
          <Reveal
            key={photo.id}
            delay={(i % 6) * 40}
            className="mb-4 overflow-hidden rounded-xl border border-border bg-cover bg-center grayscale brightness-90 transition-all duration-500 hover:scale-[1.02] hover:grayscale-0 hover:brightness-100"
            style={{
              breakInside: "avoid",
              height: photo.display_height || "260px",
              backgroundImage: `url(${photo.image_url})`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
