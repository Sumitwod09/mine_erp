"use client";

import { useAuth, useModules } from "@/lib/providers";
import { MODULES } from "@/lib/data";
import {
  BookOpen, Package, ShoppingCart, Truck, Users, UserCheck, BarChart3,
  Layers, CheckCircle2, XCircle, Lock, Shield,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen, Package, ShoppingCart, Truck, Users, UserCheck, BarChart3,
};

const MODULE_COLORS: Record<string, { bg: string; icon: string }> = {
  accounting: { bg: "bg-blue-50 dark:bg-blue-900/20", icon: "text-blue-600 dark:text-blue-400" },
  inventory: { bg: "bg-orange-50 dark:bg-orange-900/20", icon: "text-orange-600 dark:text-orange-400" },
  sales: { bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "text-emerald-600 dark:text-emerald-400" },
  purchase: { bg: "bg-purple-50 dark:bg-purple-900/20", icon: "text-purple-600 dark:text-purple-400" },
  hr: { bg: "bg-pink-50 dark:bg-pink-900/20", icon: "text-pink-600 dark:text-pink-400" },
  crm: { bg: "bg-cyan-50 dark:bg-cyan-900/20", icon: "text-cyan-600 dark:text-cyan-400" },
  reporting: { bg: "bg-indigo-50 dark:bg-indigo-900/20", icon: "text-indigo-600 dark:text-indigo-400" },
};

const MODULE_FEATURES: Record<string, string[]> = {
  accounting: ["Chart of Accounts", "Journal Entries", "General Ledger", "Financial Reports"],
  inventory: ["Products & SKUs", "Warehouses", "Stock Transfers", "Valuations"],
  sales: ["Quotations", "Sales Orders", "Invoices", "Customer Management"],
  purchase: ["Purchase Orders", "Vendor Management", "Receipts"],
  hr: ["Employee Records", "Attendance", "Leave Management", "Payroll"],
  crm: ["Leads", "Opportunities", "Pipeline View"],
  reporting: ["Dashboard Analytics", "Custom Reports", "CSV Export"],
};

export default function ModulesSettingsPage() {
  const { user } = useAuth();
  const { companyModules, toggleModule } = useModules();
  const isAdmin = user?.role === "admin";

  const activeCount = companyModules.filter((cm) => cm.is_active).length;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Module Management</h1>
          <p className="text-muted-foreground mt-0.5">
            Enable or disable modules for your organization. Disabling never deletes data.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full px-3 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {activeCount} active
          </div>
          <div className="flex items-center gap-1.5 bg-muted text-muted-foreground rounded-full px-3 py-1.5">
            <XCircle className="w-3.5 h-3.5" />
            {MODULES.length - activeCount} inactive
          </div>
        </div>
      </div>

      {/* Permission notice */}
      {!isAdmin && (
        <div className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-4 py-3">
          <Lock className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Module management requires <strong>Admin</strong> role. You have view-only access.
          </p>
        </div>
      )}

      {/* Core modules */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Core Modules</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-3">
          {MODULES.filter((m) => m.is_core).map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isActive={companyModules.find((cm) => cm.module_id === module.id)?.is_active ?? false}
              onToggle={() => isAdmin && toggleModule(module.id)}
              disabled={!isAdmin}
            />
          ))}
        </div>
      </div>

      {/* Optional modules */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Add-on Modules</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-3">
          {MODULES.filter((m) => !m.is_core).map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isActive={companyModules.find((cm) => cm.module_id === module.id)?.is_active ?? false}
              onToggle={() => isAdmin && toggleModule(module.id)}
              disabled={!isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  module, isActive, onToggle, disabled,
}: {
  module: typeof MODULES[0];
  isActive: boolean;
  onToggle: () => void;
  disabled: boolean;
}) {
  const Icon = ICON_MAP[module.icon] ?? Layers;
  const colors = MODULE_COLORS[module.slug] ?? { bg: "bg-muted", icon: "text-muted-foreground" };
  const features = MODULE_FEATURES[module.slug] ?? [];

  return (
    <div
      className={cn(
        "bg-card rounded-xl border transition-all duration-200",
        isActive ? "border-border shadow-sm" : "border-border opacity-75"
      )}
    >
      <div className="flex items-start gap-4 p-4">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", colors.bg)}>
          <Icon className={cn("w-5 h-5", colors.icon)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{module.name}</h3>
            {module.is_core && (
              <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded px-1.5 py-0.5 font-medium uppercase tracking-wide">
                Core
              </span>
            )}
            <span
              className={cn(
                "text-[10px] rounded px-1.5 py-0.5 font-medium uppercase tracking-wide ml-auto",
                isActive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{module.description}</p>

          {features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {features.map((f) => (
                <span key={f} className="text-xs bg-muted text-muted-foreground rounded-md px-2 py-0.5">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        <Switch
          checked={isActive}
          onCheckedChange={onToggle}
          disabled={disabled}
          className="shrink-0 mt-0.5"
        />
      </div>
    </div>
  );
}
