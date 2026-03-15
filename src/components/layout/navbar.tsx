"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/exports", label: "Exports" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="glass-card flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/80" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold tracking-[0.25em] text-emerald-300">
                PRAIRIE PREMIUM
              </span>
              <span className="text-xs text-slate-300">
                Logistics Export Management
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium ${
                    active
                      ? "text-emerald-300"
                      : "text-slate-300 hover:text-emerald-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link href="/exports/new">
              <Button size="sm" className="hidden md:inline-flex">
                New Export
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 bg-slate-900/60"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 bg-slate-900/60"
              >
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}