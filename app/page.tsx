import Loader from "./components/Loader";
import ScrollProgressBar from "./components/ScrollProgressBar";
import MouseGlow from "./components/MouseGlow";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Tickets from "./components/Tickets";
import EventCountdown from "./components/EventCountdown";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import EventSchedule from "./components/EventSchedule";
// import Blogs from "./components/Blogs";
// import Videos from "./components/Videos";
import Speakers from "./components/Speakers";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
// import Sponsors from "./components/Sponsors";
// import Gallery from "./components/Gallery";
import PreviousTalks from "./components/PreviousTalks";
// import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { getHomePageContent } from "./lib/content";

// Content is admin-editable in Supabase — render fresh on every request so
// changes published from the admin dashboard show up immediately instead of
// waiting for a rebuild/redeploy of this static page.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Loader />
      <ScrollProgressBar />
      <MouseGlow />
      <SiteHeader navLinks={content.navLinks} />
      <Hero hero={content.hero} />
      <Ticker words={content.hero.tickerWordsCsv.split(",").map((w) => w.trim()).filter(Boolean)} />
      <Tickets event={content.event} />
      <About about={content.about} />
      <EventCountdown event={content.event} />
      <Stats stats={content.stats} />
      <Timeline timelineStages={content.timeline} />
      <EventSchedule event={content.event} />
      {/* <Blogs blogs={content.blogs} /> */}
      {/* <Videos videos={content.videos} /> */}
      <Speakers />
      <Team team={content.team} />
      <Testimonials testimonials={content.testimonials} />
      {/* <Sponsors sponsors={content.sponsors} /> */}
      {/* <Gallery photos={content.gallery} /> */}
      <PreviousTalks />
      {/* <Faq faqs={content.faqs} /> */}
      <Contact contact={content.contact} />
      <Newsletter />
      <Footer footerText={content.footerText} footerLinks={content.footerLinks} />
    </div>
  );
}
