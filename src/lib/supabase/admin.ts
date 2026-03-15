import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client with service_role key. Bypasses RLS.
 * Use ONLY on the server (e.g. server actions) for admin operations like
 * creating a user profile when the trigger missed.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, serviceRoleKey);
}
