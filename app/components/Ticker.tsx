export default function Ticker({ words }: { words: string[] }) {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/40 py-5">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="display px-8 text-2xl text-foreground/60 md:text-3xl">{t}</span>
            <span className="h-2 w-2 rotate-45 bg-ted" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
