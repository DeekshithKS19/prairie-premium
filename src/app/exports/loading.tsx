// src/app/exports/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingExports() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 rounded-2xl bg-slate-800/60" />
        <Skeleton className="h-40 rounded-2xl bg-slate-800/60" />
        <Skeleton className="h-40 rounded-2xl bg-slate-800/60" />
      </div>
      <Skeleton className="h-80 rounded-2xl bg-slate-800/60" />
    </div>
  );
}