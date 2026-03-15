// src/app/exports/[id]/edit/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireApprovedUser } from "@/lib/utils/auth-helpers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExportForm } from "@/components/forms/export-form";

export default async function EditExportPage({
  params,
}: {
  params: { id: string };
}) {
  await requireApprovedUser();
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("exports")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return <p className="text-red-400">Export not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-slate-50">
            Edit Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExportForm initial={data} />
        </CardContent>
      </Card>
    </div>
  );
}