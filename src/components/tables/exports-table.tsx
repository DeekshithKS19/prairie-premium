"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ExportRecord, UserRole } from "@/lib/supabase/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { createSupabaseBrowserClient } from "@/lib/supabase/client"; // ⬅️ add this

interface Props {
  data: ExportRecord[];
  currentRole: UserRole;
}

export function ExportsTable({ data, currentRole }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<any>([]);
  const router = useRouter();

  const columns = useMemo<ColumnDef<ExportRecord>[]>(
    () => [
      {
        accessorKey: "company_name",
        header: "Company",
      },
      {
        accessorKey: "destination_country",
        header: "Country",
      },
      {
        accessorKey: "region",
        header: "Region",
      },
      {
        accessorKey: "shipment_type",
        header: "Type",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "expected_ship_date",
        header: "Expected Ship",
      },
      {
        accessorKey: "days_until_shipment",
        header: "Days",
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const record = row.original;
          return (
            <div className="flex justify-end gap-2">
             
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    router.push(`/exports/${record.id}/edit`)
                  }
                >
                  Edit
                </Button>
             
            
                <DeleteButton id={record.id} />
             
            </div>
          );
        },
      },
    ],
    [currentRole, router]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleExportXlsx = () => {
    const rows = data.map((d) => ({
      Company: d.company_name,
      PO: d.po_number,
      WorkOrder: d.work_order,
      Country: d.destination_country,
      Region: d.region,
      ShipmentType: d.shipment_type,
      Status: d.status,
      ExpectedShipDate: d.expected_ship_date,
      ActualShipDate: d.actual_ship_date,
      DaysUntilShipment: d.days_until_shipment,
      Late: d.late_shipment,
      Pallets: d.pallets,
      GrossWeight: d.gross_weight,
      NetWeight: d.net_weight,
      Container: d.container_number,
      Carrier: d.carrier,
      BOL: d.bill_of_lading,
      ExportRef: d.export_reference,
      CreatedAt: d.created_at,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Exports");
    XLSX.writeFile(wb, "prairie-premium-exports.xlsx");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          placeholder="Search exports..."
          className="max-w-xs bg-slate-900/70 border-slate-700"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <Button variant="outline" onClick={handleExportXlsx}>
          Download Excel
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left text-xs font-semibold text-slate-300"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className="flex items-center gap-1"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "▲",
                          desc: "▼",
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-800 hover:bg-slate-800/60"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 text-slate-100">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-4 text-center text-slate-400"
                >
                  No exports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  const supabase = createSupabaseBrowserClient();

  const onDelete = async () => {
    if (!confirm("Delete this export? This cannot be undone.")) return;
    const { error } = await supabase.from("exports").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Export deleted.");
    // Invalidate via router.refresh or SWR/React-Query if you add it later
    window.location.reload();
  };

  return (
    <Button size="xs" variant="destructive" onClick={onDelete}>
      Delete
    </Button>
  );
}