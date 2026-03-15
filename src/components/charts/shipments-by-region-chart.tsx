// src/components/charts/shipments-by-region-chart.tsx
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ExportRecord } from "@/lib/supabase/types";

export function ShipmentsByRegionChart({ data }: { data: ExportRecord[] }) {
  const aggregates = Object.values(
    data.reduce((acc: any, curr) => {
      acc[curr.region] = acc[curr.region] || {
        region: curr.region,
        count: 0,
      };
      acc[curr.region].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aggregates}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="region" stroke="#cbd5f5" fontSize={11} />
          <YAxis stroke="#cbd5f5" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              borderColor: "#1e293b",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}