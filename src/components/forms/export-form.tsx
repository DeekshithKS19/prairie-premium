"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ExportRecord } from "@/lib/supabase/types";

const schema = z.object({
  company_name: z.string().min(1, "Required"),
  po_number: z.string().optional(),
  work_order: z.string().optional(),
  destination_country: z.string().min(1, "Required"),
  region: z.string().min(1, "Required"),
  shipment_type: z.enum([
    "Ocean Container",
    "Bulk Vessel",
    "Rail",
    "Truck",
    "Air Freight",
    "Intermodal",
  ]),
  production_complete_date: z.string().optional(),
  expected_ship_date: z.string().optional(),
  actual_ship_date: z.string().optional(),
  pallets: z.coerce.number().int().optional(),
  gross_weight: z.coerce.number().optional(),
  net_weight: z.coerce.number().optional(),
  container_number: z.string().optional(),
  carrier: z.string().optional(),
  bill_of_lading: z.string().optional(),
  export_reference: z.string().optional(),
  status: z.enum([
    "Planning",
    "In Production",
    "Ready",
    "Shipped",
    "Delivered",
    "Delayed",
  ]),
  remarks: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ExportForm({ initial }: { initial?: ExportRecord }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? {
          ...initial,
          production_complete_date:
            initial.production_complete_date ?? undefined,
          expected_ship_date: initial.expected_ship_date ?? undefined,
          actual_ship_date: initial.actual_ship_date ?? undefined,
        }
      : {
          status: "Planning",
          shipment_type: "Ocean Container",
        },
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      production_complete_date:
        values.production_complete_date || null,
      expected_ship_date: values.expected_ship_date || null,
      actual_ship_date: values.actual_ship_date || null,
    };

    if (initial) {
      const { error } = await supabase
        .from("exports")
        .update(payload)
        .eq("id", initial.id);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Export updated.");
    } else {
      const { error } = await supabase.from("exports").insert(payload);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Export created.");
    }

    router.push("/exports");
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* Left column */}
      <div className="space-y-3">
        <Field label="Company Name" error={form.formState.errors.company_name}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("company_name")}
          />
        </Field>
        <Field label="PO Number" error={form.formState.errors.po_number}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("po_number")}
          />
        </Field>
        <Field label="Work Order" error={form.formState.errors.work_order}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("work_order")}
          />
        </Field>
        <Field
          label="Destination Country"
          error={form.formState.errors.destination_country}
        >
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("destination_country")}
          />
        </Field>
        <Field label="Region" error={form.formState.errors.region}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("region")}
          />
        </Field>
        <Field
          label="Shipment Type"
          error={form.formState.errors.shipment_type}
        >
          <select
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("shipment_type")}
          >
            <option>Ocean Container</option>
            <option>Bulk Vessel</option>
            <option>Rail</option>
            <option>Truck</option>
            <option>Air Freight</option>
            <option>Intermodal</option>
          </select>
        </Field>
        <Field label="Status" error={form.formState.errors.status}>
          <select
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("status")}
          >
            <option>Planning</option>
            <option>In Production</option>
            <option>Ready</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Delayed</option>
          </select>
        </Field>
      </div>

      {/* Right column */}
      <div className="space-y-3">
        <Field
          label="Production Complete Date"
          error={form.formState.errors.production_complete_date}
        >
          <input
            type="date"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("production_complete_date")}
          />
        </Field>
        <Field
          label="Expected Ship Date"
          error={form.formState.errors.expected_ship_date}
        >
          <input
            type="date"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("expected_ship_date")}
          />
        </Field>
        <Field
          label="Actual Ship Date"
          error={form.formState.errors.actual_ship_date}
        >
          <input
            type="date"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("actual_ship_date")}
          />
        </Field>
        <Field label="Pallets" error={form.formState.errors.pallets}>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("pallets")}
          />
        </Field>
        <Field
          label="Gross Weight"
          error={form.formState.errors.gross_weight}
        >
          <input
            type="number"
            step="0.01"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("gross_weight")}
          />
        </Field>
        <Field label="Net Weight" error={form.formState.errors.net_weight}>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("net_weight")}
          />
        </Field>
        <Field
          label="Container Number"
          error={form.formState.errors.container_number}
        >
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("container_number")}
          />
        </Field>
        <Field label="Carrier" error={form.formState.errors.carrier}>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("carrier")}
          />
        </Field>
        <Field
          label="Bill of Lading"
          error={form.formState.errors.bill_of_lading}
        >
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("bill_of_lading")}
          />
        </Field>
        <Field
          label="Export Reference"
          error={form.formState.errors.export_reference}
        >
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("export_reference")}
          />
        </Field>
        <Field label="Remarks" error={form.formState.errors.remarks}>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm"
            {...form.register("remarks")}
          />
        </Field>

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {initial ? "Update Export" : "Create Export"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: { message?: string };
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-300">{label}</label>
      {children}
      {error?.message && (
        <p className="text-xs text-red-400">{error.message}</p>
      )}
    </div>
  );
}