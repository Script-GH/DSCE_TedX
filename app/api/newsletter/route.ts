import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendNewsletterConfirmation } from "@/app/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof raw === "object" && raw !== null && "email" in raw ? String((raw as { email: unknown }).email ?? "").trim() : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email })
      .select()
      .single();

    if (dbError && dbError.code !== "23505") {
      console.error("Supabase insert failed:", dbError);
      return NextResponse.json(
        { error: "We couldn't save your email. Please try again in a moment." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Supabase client error:", err);
    return NextResponse.json(
      { error: "The server isn't configured correctly. Please try again later." },
      { status: 500 }
    );
  }

  try {
    await sendNewsletterConfirmation(email);
  } catch (err) {
    // The subscription is already saved — a failed confirmation email
    // shouldn't fail the request.
    console.error("Failed to send newsletter confirmation email:", err);
  }

  return NextResponse.json({ ok: true });
}
