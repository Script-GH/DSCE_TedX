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

export type Database = {
  public: {
    Tables: {
      speaker_applications: {
        Row: SpeakerApplicationRow;
        Insert: SpeakerApplicationInsert;
        Update: Partial<SpeakerApplicationInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
