"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ExportRecord } from "@/lib/supabase/types";

/** Format date as YYYY-MM without date-fns */
function formatMonth(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function ShipmentsPerMonthChart({
  data,
}: {
  data: ExportRecord[];
}) {
  const aggregates = Object.values(
    data.reduce<Record<string, { month: string; count: number }>>(
      (acc, curr) => {
        const monthKey = formatMonth(curr.created_at);
        acc[monthKey] = acc[monthKey] || { month: monthKey, count: 0 };
        acc[monthKey].count += 1;
        return acc;
      },
      {}
    )
  ).sort((a, b) => (a.month > b.month ? 1 : -1));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={aggregates}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#cbd5f5" fontSize={11} />
          <YAxis stroke="#cbd5f5" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              borderColor: "#1e293b",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#22c55e"
            fill="#22c55e33"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
