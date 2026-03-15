// src/app/exports/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireApprovedUser } from "@/lib/utils/auth-helpers";
import { ExportsTable } from "@/components/tables/exports-table";
import { ShipmentsByStatusChart } from "@/components/charts/shipments-by-status-chart";
import { ShipmentsByRegionChart } from "@/components/charts/shipments-by-region-chart";
import { ShipmentsPerMonthChart } from "@/components/charts/shipments-per-month-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function ExportsPage() {
  const currentUser = await requireApprovedUser();
  // ⬇⬇ IMPORTANT: await here
  const supabase = await createSupabaseServerClient();
  const { data: exports, error } = await supabase
    .from("exports")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !exports) {
    return <p className="text-red-400">Failed to load exports.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-sm text-slate-200">
              Shipments by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShipmentsByStatusChart data={exports} />
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-sm text-slate-200">
              Shipments by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShipmentsByRegionChart data={exports} />
          </CardContent>
        </Card>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-sm text-slate-200">
              Shipments per Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShipmentsPerMonthChart data={exports} />
          </CardContent>
        </Card>
      </section>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-slate-50">
            Export Shipments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExportsTable
            data={exports}
            currentRole={currentUser.role}
          />
        </CardContent>
      </Card>
    </div>
  );
}