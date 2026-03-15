// src/app/admin/page.tsx
import { requireAdmin } from "@/lib/utils/auth-helpers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UsersTable } from "@/components/tables/users-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function AdminPage() {
  await requireAdmin();
  const supabase = createSupabaseServerClient();

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !users) {
    return <p className="text-red-400">Failed to load users.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-lg text-slate-50">
            User Approvals & Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}