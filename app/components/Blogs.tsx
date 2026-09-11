import type { BlogPostRow } from "../lib/database.types";
import Reveal from "./Reveal";

export default function Blogs({ blogs }: { blogs: BlogPostRow[] }) {
  return (
    <section id="blogs" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow">From the Blog</p>
        <h2 className="display led-text led-text-white mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Stories &amp; insights</h2>
      </Reveal>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post, i) => {
          const card = (
            <>
              <div
                className="aspect-video bg-surface-2 bg-cover bg-center"
                style={post.cover_image_url ? { backgroundImage: `url(${post.cover_image_url})` } : undefined}
              >
                {!post.cover_image_url && (
                  <div className="flex h-full items-center justify-center">
                    <span className="eyebrow text-[10px] text-muted-foreground/50">Coming soon</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="eyebrow">Upcoming post</p>
                <h3 className="display mt-2.5 text-xl">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt || "Content coming soon."}</p>
              </div>
            </>
          );
          const cls =
            "group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-ted/40";
          return (
            <Reveal key={post.id} delay={i * 60}>
              {post.link_url ? (
                <a href={post.link_url} className={cls}>
                  {card}
                </a>
              ) : (
                <div className={cls}>{card}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
