import Reveal from "./Reveal";

const speakers = [
  { id: "s1", name: "Harish Bijoor", image: "/speakers/Harish-Bijoor.jpeg" },
  { id: "s2", name: "Nishant Jayant", image: "/speakers/Nishant-Jayant.jpeg" },
  { id: "s3", name: "Pawan Mulukutla", image: "/speakers/Pawan-Mulukutla.jpeg" },
  { id: "s4", name: "Rahul Vellal", image: "/speakers/Rahul-Vellal.jpeg" },
  { id: "s5", name: "Surabhi Yelsangikar", image: "/speakers/Surabhi-Yelsangikar.jpeg" },
  { id: "s6", name: "Yash Agarwal", image: "/speakers/Yash-Agarwal.jpeg" },
];

export default function Speakers() {
  return (
    <section id="speakers" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <Reveal>
        <p className="eyebrow">The Speakers</p>
        <h2 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">Voices on stage</h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-3 justify-items-center">
        {speakers.map((speaker, i) => (
          <Reveal key={speaker.id} delay={i * 50} className="text-center">
            <div
              className="mx-auto overflow-hidden rounded-full border border-border bg-surface bg-cover bg-center"
              style={{
                width: 300,
                height: 300,
                backgroundImage: `url(${speaker.image})`,
              }}
            />
            <p className="mt-4 text-sm font-semibold">{speaker.name}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
