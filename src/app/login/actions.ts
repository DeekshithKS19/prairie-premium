"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Creates or ensures a row in public.users for the currently signed-in user.
 * Uses service_role to bypass RLS. Call this when profile is missing after login.
 */
export async function ensureUserProfile(userId: string, email: string, name: string) {
  const serverSupabase = await createSupabaseServerClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user || user.id !== userId) {
    return { ok: false, error: "Not authenticated" };
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("users")
    .upsert(
      {
        id: userId,
        email,
        name: name || email.split("@")[0] || "User",
        role: "user",
        approved: false,
      },
      { onConflict: "id" }
    );

  if (error) {
    console.error("ensureUserProfile error:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
