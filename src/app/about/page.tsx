// src/app/about/page.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="mt-4 grid gap-8 md:grid-cols-[1.4fr_1fr] items-start">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
            About Prairie Premium
          </h1>
          <p className="text-sm md:text-base text-slate-300">
            Prairie Premium is dedicated to setting the global benchmark for
            prairie-grown conventional and organic flax products and
            export-ready yellow peas. Our logistics export management platform
            connects growers, processors, and international buyers with
            real-time visibility, quality assurance, and operational precision.
          </p>
        </div>
        <div className="glass-card relative h-64 overflow-hidden">
          <Image
            src="/images/about-operations.jpg"
            alt="Prairie operations"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-emerald-200">Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-200 space-y-2">
            <p>
              Our mission is to deliver premium flax and pea products to global
              markets with traceable quality and dependable logistics, from
              prairie fields to international ports.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-emerald-200">Export Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-200 space-y-2">
            <p>
              We support ocean containers, bulk vessels, rail, truck, air
              freight, and intermodal shipments across North America, Europe,
              and Asia-Pacific corridors with full document and milestone
              tracking.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-emerald-200">
              Logistics Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-200 space-y-2">
            <p>
              Our operations team orchestrates production completion, container
              loading, carrier coordination, and customs documentation through a
              unified export management platform, minimizing delays and
              maximizing on-time performance.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-emerald-200">
              Product Quality Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-200 space-y-2">
            <p>
              Stringent quality checks, lot-level traceability, and independent
              certifications ensure that every shipment of flax and yellow peas
              meets target specifications and regulatory expectations in
              destination markets.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}