import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendSpeakerApplicationNotification } from "@/app/lib/email";
import type { SpeakerApplicationInsert } from "@/app/lib/database.types";
import {
  normalizeSpeakerApplication,
  validateSpeakerApplication,
  type SpeakerApplicationInput,
} from "@/app/lib/validateSpeakerApplication";

function toDbRow(data: SpeakerApplicationInput): SpeakerApplicationInsert {
  return {
    full_name: data.fullName,
    preferred_name: data.preferredName || null,
    email: data.email,
    phone: data.phone,
    city: data.city,
    state: data.state,
    country: data.country,
    organization: data.organization,
    designation: data.designation,
    linkedin_profile: data.linkedinProfile || null,
    website: data.website || null,

    bio: data.bio || null,

    talk_title: data.talkTitle,
    one_line_summary: data.oneLineSummary || null,
    big_idea: data.bigIdea || null,

    takeaway_1: data.takeaway1 || null,
    takeaway_2: data.takeaway2 || null,
    takeaway_3: data.takeaway3 || null,

    credibility: data.credibility || null,

    spoken_before: data.spokenBefore,
    prev_event_name: data.prevEventName || null,
    prev_audience_size: data.prevAudienceSize || null,
    prev_video_link: data.prevVideoLink || null,

    social_linkedin: data.socialLinkedin || null,
    social_instagram: data.socialInstagram || null,
    social_x: data.socialX || null,
    social_youtube: data.socialYoutube || null,
    social_other: data.socialOther || null,

    available_rehearsals: data.availableRehearsals,
    available_event_date: data.availableEventDate,

    additional_info: data.additionalInfo || null,

    consent_original: data.consentOriginal,
    consent_non_promotional: data.consentNonPromotional,
    consent_rehearsals: data.consentRehearsals,
    consent_contact: data.consentContact,
  };
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = normalizeSpeakerApplication(raw);
  const fieldErrors = validateSpeakerApplication(data);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors }, { status: 422 });
  }

  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.warn("Supabase not configured, skipping speaker application db insert in local dev");
    } else {
      const { error: dbError } = await supabase.from("speaker_applications").insert(toDbRow(data));
      if (dbError) {
        console.error("Supabase insert failed:", dbError);
        return NextResponse.json(
          { error: "We couldn't save your application. Please try again in a moment." },
          { status: 500 }
        );
      }
    }
  } catch (err) {
    console.error("Supabase client error:", err);
    return NextResponse.json(
      { error: "The server isn't configured correctly. Please try again later." },
      { status: 500 }
    );
  }

  try {
    await sendSpeakerApplicationNotification(data);
  } catch (err) {
    // The application is already saved — a failed notification email
    // shouldn't fail the request or block the applicant's confirmation.
    console.error("Failed to send speaker application notification email:", err);
  }

  return NextResponse.json({ ok: true });
}
