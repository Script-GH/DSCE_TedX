import { Mail } from "lucide-react";
import type { ContactContent } from "../lib/database.types";
import Reveal from "./Reveal";

export default function Contact({ contact }: { contact: ContactContent }) {
  const details = [contact.phone, contact.address].filter(Boolean);

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 pb-8 pt-28 md:px-8 md:pt-40">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.75rem)]">{contact.heading}</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">{contact.body}</p>
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
          >
            <Mail className="h-4 w-4 text-ted" />
            {contact.email}
          </a>
        )}
        {details.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {details.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
