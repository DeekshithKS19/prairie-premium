"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please provide a message"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Footer() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log("Contact form", values);
    toast.success("Thanks for reaching out. We will contact you shortly.");
    form.reset();
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 mt-12">
      <div className="mx-auto max-w-4xl px-4 py-10 grid gap-8 md:grid-cols-[1.1fr_1.4fr]">
        {/* Contact details (narrow) */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.25em] text-sky-300">
            CONTACT
          </p>
          <h3 className="text-lg font-semibold text-slate-50">
            Prairie Premium Logistics
          </h3>
          <div className="text-sm text-slate-300 space-y-2">
            <p>
              <span className="font-medium text-slate-100">Email:</span>{" "}
              logistics@prairiepremium.com
            </p>
            <p>
              <span className="font-medium text-slate-100">Phone:</span>{" "}
              +1 (555) 123-4567
            </p>
            <p>
              <span className="font-medium text-slate-100">Address:</span>{" "}
              Prairie Premium HQ, Regina, Saskatchewan, Canada
            </p>
          </div>
        </div>

        {/* Contact form (narrower than full page) */}
        <div className="glass-card px-4 py-5">
          <h4 className="text-sm font-semibold text-slate-50 mb-3">
            Send us a message
          </h4>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Name</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-[11px] text-red-400">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Email</label>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-[11px] text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Message</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs"
                {...form.register("message")}
              />
              {form.formState.errors.message && (
                <p className="text-[11px] text-red-400">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>
            <Button type="submit" size="sm" className="w-full">
              Send
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800/80 py-3 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Prairie Premium. All rights reserved.
      </div>
    </footer>
  );
}