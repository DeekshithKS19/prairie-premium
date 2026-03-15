"use client";

import type { AppUser } from "@/lib/supabase/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Switch } from "@/components/ui/toggle-switch"; // from shadcn
import { Select } from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  users: AppUser[];
}

export function UsersTable({ users }: Props) {
  const supabase = createSupabaseBrowserClient();

  const handleToggleApproved = async (u: AppUser, approved: boolean) => {
    const { error } = await supabase
      .from("users")
      .update({ approved })
      .eq("id", u.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Approval updated.");
    window.location.reload();
  };

  const handleRoleChange = async (u: AppUser, role: string) => {
    const { error } = await supabase
      .from("users")
      .update({ role })
      .eq("id", u.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Role updated.");
    window.location.reload();
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-300">
              Name
            </th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-300">
              Email
            </th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-300">
              Role
            </th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-300">
              Approved
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-t border-slate-800 hover:bg-slate-800/60"
            >
              <td className="px-3 py-2 text-slate-100">{u.name}</td>
              <td className="px-3 py-2 text-slate-100">{u.email}</td>
              <td className="px-3 py-2 text-slate-100">
                <select
                  className="rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs"
                  value={u.role}
                  onChange={(e) => handleRoleChange(u, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td className="px-3 py-2 text-slate-100">
                <Switch
                  checked={u.approved}
                  onCheckedChange={(checked: boolean) =>
                    handleToggleApproved(u, checked)
                  }
                />
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-3 py-3 text-center text-slate-400"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}