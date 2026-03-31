"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/score/new", label: "New score" },
  { href: "/compare", label: "Compare" },
  { href: "/history", label: "History" },
  { href: "/audiences", label: "Audiences" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="border-b border-border bg-card md:border-b-0 md:border-r">
        <div className="flex flex-col gap-6 p-4">
          <Link href="/dashboard" className="text-lg font-semibold">
            AdScoreAI
          </Link>
          <nav className="flex flex-col gap-1">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href + "/")) ||
                pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                    active ? "bg-muted font-medium" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-border pt-4 text-xs text-muted-foreground">
            Public mode (no login)
          </div>
        </div>
      </aside>
      <main className="p-6 md:p-8">{children}</main>
    </div>
  );
}
