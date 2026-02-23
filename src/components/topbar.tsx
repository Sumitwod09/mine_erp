"use client";

import { useAuth } from "@/lib/providers";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Bell, Search, Sun, Moon, LogOut, ChevronDown, Building2, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COMPANIES } from "@/lib/data";
import { cn } from "@/lib/utils";

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  manager: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  accountant: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  sales: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  hr: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  viewer: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
};

function Breadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span>/</span>}
          <span className={cn("capitalize", i === parts.length - 1 && "text-foreground font-medium")}>
            {part.replace(/-/g, " ")}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const company = COMPANIES.find((c) => c.id === user?.company_id);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-4 shrink-0">
      {/* Breadcrumb */}
      <div className="flex-1 min-w-0">
        <Breadcrumb />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Search…</span>
          <kbd className="text-[10px] bg-background border border-border rounded px-1">⌘K</kbd>
        </button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 text-muted-foreground"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
        </Button>

        {/* User menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg hover:bg-muted px-2 py-1.5 transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-[11px] font-bold text-primary-foreground">{user.name[0]}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium leading-none">{user.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 capitalize">{user.role}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Building2 className="w-4 h-4" />
                <div>
                  <div className="text-sm">{company?.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{company?.plan} plan</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Shield className="w-4 h-4" />
                <span
                  className={cn(
                    "text-xs font-medium rounded-md px-2 py-0.5 capitalize",
                    ROLE_COLORS[user.role] ?? ROLE_COLORS.viewer
                  )}
                >
                  {user.role}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
