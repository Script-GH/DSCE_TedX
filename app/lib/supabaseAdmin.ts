import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let client: SupabaseClient<Database> | null = null;

// Server-only client using the service role key — bypasses RLS.
// Never import this from a "use client" component.
// Returns null when env vars are missing so callers can fall back to defaults.
export function getSupabaseAdmin(): SupabaseClient<Database> | null {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn(
      "Supabase is not configured. Falling back to default content. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to use live data."
    );
    return null;
  }

  client = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  });
  return client;
}
