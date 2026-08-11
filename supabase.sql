-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- to create the table the speaker application API writes to.

create table if not exists public.speaker_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  preferred_name text,
  email text not null,
  phone text not null,
  city text not null,
  state text not null,
  country text not null,
  organization text not null,
  designation text not null,
  linkedin_profile text,
  website text,

  bio text,

  talk_title text not null,
  one_line_summary text,
  big_idea text,

  takeaway_1 text,
  takeaway_2 text,
  takeaway_3 text,

  credibility text,

  spoken_before text,
  prev_event_name text,
  prev_audience_size text,
  prev_video_link text,

  social_linkedin text,
  social_instagram text,
  social_x text,
  social_youtube text,
  social_other text,

  available_rehearsals text,
  available_event_date text,

  additional_info text,

  consent_original boolean not null default false,
  consent_non_promotional boolean not null default false,
  consent_rehearsals boolean not null default false,
  consent_contact boolean not null default false
);

-- Row Level Security is enabled with no policies, so only requests using the
-- service_role key (server-side only, via SUPABASE_SERVICE_ROLE_KEY) can read
-- or write this table. The publishable/anon key used by browsers gets nothing.
alter table public.speaker_applications enable row level security;

create index if not exists speaker_applications_created_at_idx
  on public.speaker_applications (created_at desc);

-- Run this once as well to create the table the newsletter "Notify me"
-- form (app/components/Newsletter.tsx) writes to.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

-- Same RLS posture as speaker_applications: only the service_role key
-- (server-side only) can read or write this table.
alter table public.newsletter_subscribers enable row level security;

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

-- ============================================================================
-- Admin-managed site content
--
-- Everything below powers the admin panel at /admin. Same RLS posture as the
-- tables above: RLS is enabled with no policies, so only the service_role key
-- (via getSupabaseAdmin(), used both by the admin API routes and by the
-- public site's server-side content fetch in app/lib/content.ts) can read or
-- write these tables. The anon/publishable key is only ever used for
-- Supabase Auth (admin login) — it has no table access.
-- ============================================================================

-- Singleton page copy (Hero, About, Contact, Event, Footer text). One row per
-- `key`; `value` holds a small JSON object whose shape is enforced in
-- TypeScript (see app/lib/content.ts), not in SQL — this avoids a schema
-- migration every time a section's copy fields change.
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  topic text not null,
  image_url text,
  linkedin_url text,
  instagram_url text,
  x_url text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.speakers enable row level security;
create index if not exists speakers_position_idx on public.speakers (position);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  image_url text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.team_members enable row level security;
create index if not exists team_members_position_idx on public.team_members (position);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.sponsors enable row level security;
create index if not exists sponsors_position_idx on public.sponsors (position);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  display_height text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.gallery_photos enable row level security;
create index if not exists gallery_photos_position_idx on public.gallery_photos (position);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  cover_image_url text,
  link_url text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
create index if not exists blog_posts_position_idx on public.blog_posts (position);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  speaker text not null,
  duration text not null,
  video_url text,
  thumbnail_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.videos enable row level security;
create index if not exists videos_position_idx on public.videos (position);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  avatar_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
create index if not exists testimonials_position_idx on public.testimonials (position);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.faqs enable row level security;
create index if not exists faqs_position_idx on public.faqs (position);

create table if not exists public.timeline_stages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.timeline_stages enable row level security;
create index if not exists timeline_stages_position_idx on public.timeline_stages (position);

-- format_type drives a small switch in app/components/Stats.tsx (JS functions
-- can't be stored in Postgres): 'plain' -> "8", 'plus' -> "40+",
-- 'k_plus' -> "100K+".
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  target_value integer not null,
  format_type text not null default 'plain' check (format_type in ('plain', 'plus', 'k_plus')),
  start_delay integer not null default 0,
  position integer not null default 0
);
alter table public.stats enable row level security;
create index if not exists stats_position_idx on public.stats (position);

create table if not exists public.nav_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  position integer not null default 0
);
alter table public.nav_links enable row level security;
create index if not exists nav_links_position_idx on public.nav_links (position);

create table if not exists public.footer_links (
  id uuid primary key default gen_random_uuid(),
  group_name text not null check (group_name in ('explore', 'connect')),
  label text not null,
  href text not null,
  position integer not null default 0
);
alter table public.footer_links enable row level security;
create index if not exists footer_links_position_idx on public.footer_links (position);

-- Storage bucket for admin-uploaded images (speaker photos, sponsor logos,
-- gallery shots, team photos, blog covers). Public-read since all of this is
-- public marketing content; writes only ever happen server-side through the
-- service_role key via /api/admin/upload, which bypasses storage RLS the
-- same way it bypasses table RLS, so no storage policies are required.
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;
