import Reveal from "./Reveal";

export default function PreviousTalks() {
  return (
    <section id="previous-talks" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow">06 — Archive</p>
        <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Previous Ted Talks</h2>
      </Reveal>

      <div className="mt-16 flex justify-center">
        <Reveal>
          <div
            className="flex items-center justify-center rounded-2xl border border-border bg-surface"
            style={{ width: 900, height: 600, maxWidth: "100%" }}
          >
            <p className="display text-[clamp(1.5rem,3vw,2.5rem)] text-muted-foreground">
              Content Coming Soon
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
