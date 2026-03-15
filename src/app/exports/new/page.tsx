// src/app/exports/new/page.tsx
import { requireApprovedUser } from "@/lib/utils/auth-helpers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExportForm } from "@/components/forms/export-form";

export default async function NewExportPage() {
  await requireApprovedUser();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-slate-50">
            New Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExportForm />
        </CardContent>
      </Card>
    </div>
  );
}