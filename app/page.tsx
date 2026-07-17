import Loader from "./components/Loader";
import ScrollProgressBar from "./components/ScrollProgressBar";
import MouseGlow from "./components/MouseGlow";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Speakers from "./components/Speakers";
import EventCountdown from "./components/EventCountdown";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import Blogs from "./components/Blogs";
import Videos from "./components/Videos";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Sponsors from "./components/Sponsors";
import Gallery from "./components/Gallery";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Loader />
      <ScrollProgressBar />
      <MouseGlow />
      <SiteHeader />
      <Hero />
      <Ticker />
      <About />
      <Speakers />
      <EventCountdown />
      <Stats />
      <Timeline />
      <Blogs />
      <Videos />
      <Team />
      <Testimonials />
      <Sponsors />
      <Gallery />
      <Faq />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}
