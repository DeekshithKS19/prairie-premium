"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      toastOptions={{
        classNames: {
          toast: "bg-slate-900 border border-slate-700 text-slate-100",
          title: "text-slate-100",
          description: "text-slate-400",
          success: "border-emerald-500/50",
          error: "border-red-500/50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
