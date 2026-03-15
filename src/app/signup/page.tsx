// src/app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Account created. An admin must approve your access before you can log in."
    );
    router.push("/login");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center min-h-[60vh]">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-slate-50">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Name</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
                {...form.register("name")}
              />
            </div>
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
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}