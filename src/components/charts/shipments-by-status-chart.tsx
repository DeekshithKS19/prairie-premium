// src/components/charts/shipments-by-status-chart.tsx
"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import type { ExportRecord } from "@/lib/supabase/types";

const COLORS = [
  "#22c55e",
  "#0ea5e9",
  "#a855f7",
  "#f97316",
  "#eab308",
  "#ef4444",
];

export function ShipmentsByStatusChart({ data }: { data: ExportRecord[] }) {
  const aggregates = Object.values(
    data.reduce((acc: any, curr) => {
      acc[curr.status] = acc[curr.status] || {
        name: curr.status,
        value: 0,
      };
      acc[curr.status].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={aggregates}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            stroke="none"
          >
            {aggregates.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              borderColor: "#1e293b",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}