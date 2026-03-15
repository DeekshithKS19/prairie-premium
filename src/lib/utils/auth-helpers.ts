import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentAppUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile ?? null;
}

export async function requireApprovedUser() {
  const profile = await getCurrentAppUser();
  if (!profile) redirect("/login");
  if (!profile.approved) redirect("/login?unapproved=1");
  return profile;
}

export async function requireAdmin() {
  const user = await requireApprovedUser();
  if (user.role !== "admin") redirect("/");
  return user;
}
