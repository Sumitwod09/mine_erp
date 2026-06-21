"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useModules } from "@/lib/providers";
import { MODULES } from "@/lib/data";
import {
  BookOpen, Package, ShoppingCart, Truck, Users, UserCheck, BarChart3,
  ChevronDown, ChevronRight, Settings, PanelLeftClose, PanelLeft,
  LayoutDashboard, X,
} from "lucide-react";
import VERPLogo from "@/components/verp-logo";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen, Package, ShoppingCart, Truck, Users, UserCheck, BarChart3,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { activeModules, visibleFeatures } = useModules();
  const [openModules, setOpenModules] = useState<string[]>(["m1", "m3"]);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close mobile sidebar on route change
  useEffect(() => {
    onMobileClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleModule = (id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sidebarContent = (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        // Desktop: fixed width based on collapsed state
        "md:relative md:shrink-0",
        collapsed ? "md:w-16" : "md:w-60",
        // Mobile: always full width within drawer
        "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 h-14 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center shrink-0">
          <VERPLogo className="w-4 h-4" />
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="min-w-0">
            <div className="text-sidebar-foreground font-bold text-sm tracking-tight leading-none">VERP</div>
            <div className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest mt-0.5">ERP</div>
          </div>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={onToggle}
          className="ml-auto text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors shrink-0 hidden md:block"
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="ml-auto text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors shrink-0 md:hidden"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {/* Dashboard link */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors",
            pathname === "/dashboard"
              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Dashboard</span>}
        </Link>

        {/* Module separator */}
        {(!collapsed || mobileOpen) && (
          <div className="px-2 pt-3 pb-1">
            <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/30 font-medium">Modules</span>
          </div>
        )}

        {activeModules.map((module) => {
          const Icon = ICON_MAP[module.icon] ?? Layers;
          const features = visibleFeatures(module.id);
          const isOpen = openModules.includes(module.id);
          const isModuleActive = features.some((f) => pathname.startsWith(f.route));

          if (features.length === 0) return null;

          return (
            <div key={module.id}>
              <button
                onClick={() => (!collapsed || mobileOpen) && toggleModule(module.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors group",
                  isModuleActive && !isOpen
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={(collapsed && !mobileOpen) ? module.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {(!collapsed || mobileOpen) && (
                  <>
                    <span className="flex-1 text-left font-medium">{module.name}</span>
                    {isOpen ? (
                      <ChevronDown className="w-3 h-3 text-sidebar-foreground/40" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-sidebar-foreground/40" />
                    )}
                  </>
                )}
              </button>

              {(!collapsed || mobileOpen) && isOpen && (
                <div className="ml-4 mt-0.5 mb-1 space-y-0.5 border-l border-sidebar-border pl-3">
                  {features.map((feature) => {
                    const isActive = pathname === feature.route || pathname.startsWith(feature.route + "/");
                    return (
                      <Link
                        key={feature.id}
                        href={feature.route}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <div className={cn("w-1 h-1 rounded-full shrink-0", isActive ? "bg-current" : "bg-sidebar-foreground/30")} />
                        {feature.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-2 py-2 shrink-0 space-y-0.5">
        <Link
          href="/settings/modules"
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors",
            pathname.startsWith("/settings")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
          title={(collapsed && !mobileOpen) ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Settings</span>}
        </Link>

        {(!collapsed || mobileOpen) && user && (
          <div className="flex items-center gap-2 px-2 py-2 mt-1">
            <div className="w-7 h-7 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-sidebar-primary-foreground">{user.name[0]}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sidebar-foreground text-xs font-medium truncate">{user.name}</div>
              <div className="text-sidebar-foreground/40 text-[10px] capitalize">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block h-screen shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 flex transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          ref={overlayRef}
          onClick={onMobileClose}
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Drawer panel */}
        <div
          className={cn(
            "relative h-full transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
