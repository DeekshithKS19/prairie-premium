"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/exports", label: "Exports" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    // 1) Initial session check
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setIsAuthed(!!data.session?.user);
    });

    // 2) Subscribe to changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session?.user);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-900 shadow-lg border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-sky-400/90 shadow-md" />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-sky-200">
              PRAIRIE PREMIUM
            </span>
            <span className="text-xs text-slate-100/80">
              Export Logistics Platform
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
                className={[
                  "text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "text-slate-200/80 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          <Link href="/exports/new">
            <Button
              size="sm"
              className="hidden md:inline-flex bg-sky-500 hover:bg-sky-400 text-slate-950"
            >
              New Export
            </Button>
          </Link>

          {/* While loading auth state, avoid flicker by showing nothing */}
          {isAuthed === null ? null : !isAuthed ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-sky-400/70 text-sky-100 bg-transparent hover:bg-sky-900/40"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-400/70 text-red-100 bg-transparent hover:bg-red-900/40"
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}