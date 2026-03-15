// src/app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const heroImages = [
  "/images/logistics-1.jpg",
  "/images/logistics-2.jpg",
  "/images/logistics-3.jpg",
];

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please provide a message"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setHeroIndex((i) => (i + 1) % heroImages.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    // Hook to a backend / email service later
    console.log(values);
    toast.success("Thanks for reaching out. We will contact you shortly.");
    form.reset();
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      {/* Hero */}
      <section className="mt-4 grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold tracking-[0.35em] text-emerald-300">
            PRAIRIE PREMIUM
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-50 leading-tight">
            Setting the Standard for Prairie Premium Grade
            <span className="block text-emerald-300">
              Conventional &amp; Organic Flax
            </span>
            and Conventional Yellow Peas.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            A modern logistics export management platform tailored to
            high-quality flax and pulse products, delivering full visibility
            from production through global shipment.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="/exports">View Export Dashboard</a>
            </Button>
            <Button variant="outline" asChild className="border-slate-600">
              <a href="/about">Learn More</a>
            </Button>
          </div>
        </div>

        <div className="glass-card relative h-64 md:h-80 overflow-hidden">
          <Image
            src={heroImages[heroIndex]}
            alt="Logistics operations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-4 left-4 space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-200">
              Export Logistics
            </p>
            <p className="text-sm text-slate-100/90 max-w-xs">
              Real-time insight into flax and pea exports across global
              destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Products
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Organic Flax",
              body: "Certified organic flaxseed sourced from premium prairie growers with rigorous traceability.",
            },
            {
              title: "Conventional Flax",
              body: "High-quality conventional flax optimized for oil and milling applications.",
            },
            {
              title: "Yellow Peas",
              body: "Consistent, export-ready yellow peas tailored for food and feed markets.",
            },
          ].map((p) => (
            <Card key={p.title} className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-emerald-200">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-200">
                {p.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prairie Premium description */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
          Prairie Premium Logistics
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl">
          Prairie Premium integrates production data, export scheduling, and
          global logistics into a single source of truth. From ocean containers
          and bulk vessels to rail and intermodal movements, we orchestrate
          every shipment with precision, quality control, and full auditability.
        </p>
      </section>

      {/* Contact */}
      <section className="grid gap-8 md:grid-cols-[1.2fr_1.3fr]">
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-50">Contact</h3>
          <div className="text-sm text-slate-200 space-y-2">
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

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-slate-50 text-lg">
              Contact Form
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
                {form.formState.errors.name && (
                  <p className="text-xs text-red-400">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Email</label>
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-400">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-red-400">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}