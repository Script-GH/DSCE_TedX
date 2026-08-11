import { ArrowUp } from "lucide-react";
import type { FooterLinkRow, FooterTextContent } from "../lib/database.types";

type Props = {
  footerText: FooterTextContent;
  footerLinks: FooterLinkRow[];
};

export default function Footer({ footerText, footerLinks }: Props) {
  const explore = footerLinks.filter((l) => l.group_name === "explore");
  const connect = footerLinks.filter((l) => l.group_name === "connect");

  return (
    <footer className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-8">
      <div className="flex flex-col gap-10 border-t border-border pt-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="display text-lg">
            <span className="text-ted">TEDx</span>DSCE
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{footerText.tagline}</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.05em] text-muted-foreground/70">
            {footerText.disclaimer}
          </p>
        </div>

        <div className="flex flex-wrap gap-16">
          {explore.length > 0 && (
            <div>
              <p className="eyebrow mb-4">Explore</p>
              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                {explore.map((l) => (
                  <a key={l.id} href={l.href} className="transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
          {connect.length > 0 && (
            <div>
              <p className="eyebrow mb-4">Connect</p>
              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                {connect.map((l) => (
                  <a key={l.id} href={l.href} className="transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          {footerText.copyrightText}
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to top
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border">
            <ArrowUp className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </footer>
  );
}
