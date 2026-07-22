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
