"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ensureUserProfile } from "./actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const supabase = createSupabaseBrowserClient();

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (search.get("unapproved") === "1") {
      toast.error(
        "Your account is awaiting admin approval. Please contact your administrator."
      );
    }
  }, [search]);

  const onSubmit = async (values: FormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });


    console.log("---------------------------------",data);

    if (error || !data.user) {
      toast.error(error?.message ?? "Invalid credentials");
      return;
    }

    const user = data.user;
    const name =
      (user.user_metadata?.name as string) ||
      user.email?.split("@")[0] ||
      "User";

    

    // Fetch profile from public.users (created by Supabase trigger on signup)
    let { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    // If no profile exists, create via server action (uses service_role, bypasses RLS)
    if (profileError || !profile) {
      const result = await ensureUserProfile(user.id, user.email ?? "", name);
      if (!result.ok) {
        toast.error(result.error ?? "Could not load user profile. Please try again or contact support.");
        return;
      }
      // Refetch profile after server created it
      const res = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      profile = res.data;
      profileError = res.error;
    }

    if (profileError || !profile) {
      toast.error("Could not load user profile. Please try again or contact support.");
      return;
    }

    if (!profile.approved) {
      await supabase.auth.signOut();
      toast.error(
        "Your account is not yet approved. Please contact an administrator."
      );
      router.push("/login?unapproved=1");
      return;
    }

    toast.success("Welcome back.");
    router.push("/exports");
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-slate-50">
            Sign in to Prairie Premium
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Email</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
                {...form.register("email")}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
                {...form.register("password")}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
