import { getSupabaseAdmin } from "./supabaseAdmin";
import {
  defaultAboutContent,
  defaultContactContent,
  defaultEventContent,
  defaultFooterTextContent,
  defaultHeroContent,
} from "./contentDefaults";
import type {
  AboutContent,
  BlogPostRow,
  ContactContent,
  Database,
  EventContent,
  FaqRow,
  FooterLinkRow,
  FooterTextContent,
  GalleryPhotoRow,
  HeroContent,
  NavLinkRow,
  SiteContentKey,
  SpeakerRow,
  SponsorRow,
  StatRow,
  TeamMemberRow,
  TestimonialRow,
  TimelineStageRow,
  VideoRow,
} from "./database.types";

type Tables = Database["public"]["Tables"];
type ListTable = Exclude<keyof Tables, "site_content">;

export type HomePageContent = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  event: EventContent;
  footerText: FooterTextContent;
  speakers: SpeakerRow[];
  team: TeamMemberRow[];
  sponsors: SponsorRow[];
  gallery: GalleryPhotoRow[];
  blogs: BlogPostRow[];
  videos: VideoRow[];
  testimonials: TestimonialRow[];
  faqs: FaqRow[];
  timeline: TimelineStageRow[];
  stats: StatRow[];
  navLinks: NavLinkRow[];
  footerLinks: FooterLinkRow[];
};

async function getSiteContent<K extends SiteContentKey>(key: K) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase.from("site_content").select("*").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function orderedList<T>(table: ListTable) {
  // Same generic .from() typing caveat as adminListResource.ts — see there.
  const supabase = getSupabaseAdmin();
  if (!supabase) return [] as T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- deliberate escape hatch
  const db = supabase as unknown as { from: (t: string) => any };
  const { data } = await db.from(table).select("*").order("position", { ascending: true });
  return (data ?? []) as T[];
}

// Fetches everything the public homepage needs in one place, server-side,
// via the service-role client — content tables have no public RLS policies,
// so this is the only path (besides the admin API) that can read them.
export async function getHomePageContent(): Promise<HomePageContent> {
  const [
    heroValue,
    aboutValue,
    contactValue,
    eventValue,
    footerTextValue,
    speakers,
    team,
    sponsors,
    gallery,
    blogs,
    videos,
    testimonials,
    faqs,
    timeline,
    stats,
    navLinks,
    footerLinks,
  ] = await Promise.all([
    getSiteContent("hero"),
    getSiteContent("about"),
    getSiteContent("contact"),
    getSiteContent("event"),
    getSiteContent("footer_text"),
    orderedList<SpeakerRow>("speakers"),
    orderedList<TeamMemberRow>("team_members"),
    orderedList<SponsorRow>("sponsors"),
    orderedList<GalleryPhotoRow>("gallery_photos"),
    orderedList<BlogPostRow>("blog_posts"),
    orderedList<VideoRow>("videos"),
    orderedList<TestimonialRow>("testimonials"),
    orderedList<FaqRow>("faqs"),
    orderedList<TimelineStageRow>("timeline_stages"),
    orderedList<StatRow>("stats"),
    orderedList<NavLinkRow>("nav_links"),
    orderedList<FooterLinkRow>("footer_links"),
  ]);

  return {
    hero: (heroValue as HeroContent | null) ?? defaultHeroContent,
    about: (aboutValue as AboutContent | null) ?? defaultAboutContent,
    contact: (contactValue as ContactContent | null) ?? defaultContactContent,
    event: (eventValue as EventContent | null) ?? defaultEventContent,
    footerText: (footerTextValue as FooterTextContent | null) ?? defaultFooterTextContent,
    speakers,
    team,
    sponsors,
    gallery,
    blogs,
    videos,
    testimonials,
    faqs,
    timeline,
    stats,
    navLinks,
    footerLinks,
  };
}
