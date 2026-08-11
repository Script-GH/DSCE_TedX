// Hand-written types for the `speaker_applications` table (see supabase.sql
// for the schema). If more tables are added, prefer generating this file
// with `supabase gen types typescript` instead of maintaining it by hand.

export type SpeakerApplicationRow = {
  id: string;
  created_at: string;
  full_name: string;
  preferred_name: string | null;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  organization: string;
  designation: string;
  linkedin_profile: string | null;
  website: string | null;
  bio: string | null;
  talk_title: string;
  one_line_summary: string | null;
  big_idea: string | null;
  takeaway_1: string | null;
  takeaway_2: string | null;
  takeaway_3: string | null;
  credibility: string | null;
  spoken_before: string | null;
  prev_event_name: string | null;
  prev_audience_size: string | null;
  prev_video_link: string | null;
  social_linkedin: string | null;
  social_instagram: string | null;
  social_x: string | null;
  social_youtube: string | null;
  social_other: string | null;
  available_rehearsals: string | null;
  available_event_date: string | null;
  additional_info: string | null;
  consent_original: boolean;
  consent_non_promotional: boolean;
  consent_rehearsals: boolean;
  consent_contact: boolean;
};

export type SpeakerApplicationInsert = Omit<SpeakerApplicationRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type NewsletterSubscriberRow = {
  id: string;
  created_at: string;
  email: string;
};

export type NewsletterSubscriberInsert = Omit<NewsletterSubscriberRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

// ----------------------------------------------------------------------------
// Admin-managed site content (see supabase.sql for the schema this mirrors).
// ----------------------------------------------------------------------------

// site_content: one JSON blob per section key. The DB column is untyped
// jsonb; these shapes are the TypeScript-side contract every reader/writer
// of a given key must agree on.
export type HeroContent = {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  tagline: string;
  intro: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  ctaTertiaryLabel: string;
  // Comma-separated phrases for the scrolling ticker directly under Hero.
  tickerWordsCsv: string;
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  body: string;
  imageUrl: string | null;
};

export type ContactContent = {
  eyebrow: string;
  heading: string;
  body: string;
  email: string | null;
  phone: string | null;
  address: string | null;
};

export type EventContent = {
  heading: string;
  targetIso: string;
  dateLabel: string;
  venueLabel: string;
  formatLabel: string;
};

export type FooterTextContent = {
  tagline: string;
  disclaimer: string;
  copyrightText: string;
};

export type SiteContentValueMap = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  event: EventContent;
  footer_text: FooterTextContent;
};

export type SiteContentKey = keyof SiteContentValueMap;

export type SiteContentRow = {
  key: string;
  value: unknown;
  updated_at: string;
};

export type SiteContentInsert = {
  key: string;
  value: unknown;
  updated_at?: string;
};

export type SpeakerRow = {
  id: string;
  name: string;
  role: string;
  topic: string;
  image_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  x_url: string | null;
  position: number;
  created_at: string;
  updated_at: string;
};

export type SpeakerInsert = Omit<SpeakerRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  position: number;
  created_at: string;
  updated_at: string;
};

export type TeamMemberInsert = Omit<TeamMemberRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type SponsorRow = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  position: number;
  created_at: string;
};

export type SponsorInsert = Omit<SponsorRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type GalleryPhotoRow = {
  id: string;
  image_url: string;
  caption: string | null;
  display_height: string | null;
  position: number;
  created_at: string;
};

export type GalleryPhotoInsert = Omit<GalleryPhotoRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type BlogPostRow = {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  link_url: string | null;
  position: number;
  created_at: string;
  updated_at: string;
};

export type BlogPostInsert = Omit<BlogPostRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type VideoRow = {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  video_url: string | null;
  thumbnail_url: string | null;
  position: number;
  created_at: string;
};

export type VideoInsert = Omit<VideoRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar_url: string | null;
  position: number;
  created_at: string;
};

export type TestimonialInsert = Omit<TestimonialRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  position: number;
  created_at: string;
};

export type FaqInsert = Omit<FaqRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type TimelineStageRow = {
  id: string;
  title: string;
  body: string;
  position: number;
  created_at: string;
};

export type TimelineStageInsert = Omit<TimelineStageRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type StatFormatType = "plain" | "plus" | "k_plus";

export type StatRow = {
  id: string;
  label: string;
  target_value: number;
  format_type: StatFormatType;
  start_delay: number;
  position: number;
};

export type StatInsert = Omit<StatRow, "id"> & { id?: string };

export type NavLinkRow = {
  id: string;
  label: string;
  href: string;
  position: number;
};

export type NavLinkInsert = Omit<NavLinkRow, "id"> & { id?: string };

export type FooterLinkGroup = "explore" | "connect";

export type FooterLinkRow = {
  id: string;
  group_name: FooterLinkGroup;
  label: string;
  href: string;
  position: number;
};

export type FooterLinkInsert = Omit<FooterLinkRow, "id"> & { id?: string };

export type Database = {
  public: {
    Tables: {
      speaker_applications: {
        Row: SpeakerApplicationRow;
        Insert: SpeakerApplicationInsert;
        Update: Partial<SpeakerApplicationInsert>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriberRow;
        Insert: NewsletterSubscriberInsert;
        Update: Partial<NewsletterSubscriberInsert>;
        Relationships: [];
      };
      site_content: {
        Row: SiteContentRow;
        Insert: SiteContentInsert;
        Update: Partial<SiteContentInsert>;
        Relationships: [];
      };
      speakers: {
        Row: SpeakerRow;
        Insert: SpeakerInsert;
        Update: Partial<SpeakerInsert>;
        Relationships: [];
      };
      team_members: {
        Row: TeamMemberRow;
        Insert: TeamMemberInsert;
        Update: Partial<TeamMemberInsert>;
        Relationships: [];
      };
      sponsors: {
        Row: SponsorRow;
        Insert: SponsorInsert;
        Update: Partial<SponsorInsert>;
        Relationships: [];
      };
      gallery_photos: {
        Row: GalleryPhotoRow;
        Insert: GalleryPhotoInsert;
        Update: Partial<GalleryPhotoInsert>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: BlogPostInsert;
        Update: Partial<BlogPostInsert>;
        Relationships: [];
      };
      videos: {
        Row: VideoRow;
        Insert: VideoInsert;
        Update: Partial<VideoInsert>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: TestimonialInsert;
        Update: Partial<TestimonialInsert>;
        Relationships: [];
      };
      faqs: {
        Row: FaqRow;
        Insert: FaqInsert;
        Update: Partial<FaqInsert>;
        Relationships: [];
      };
      timeline_stages: {
        Row: TimelineStageRow;
        Insert: TimelineStageInsert;
        Update: Partial<TimelineStageInsert>;
        Relationships: [];
      };
      stats: {
        Row: StatRow;
        Insert: StatInsert;
        Update: Partial<StatInsert>;
        Relationships: [];
      };
      nav_links: {
        Row: NavLinkRow;
        Insert: NavLinkInsert;
        Update: Partial<NavLinkInsert>;
        Relationships: [];
      };
      footer_links: {
        Row: FooterLinkRow;
        Insert: FooterLinkInsert;
        Update: Partial<FooterLinkInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
