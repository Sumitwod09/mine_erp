"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const WAREHOUSES = [
  { code: "WH-01", name: "Main Warehouse", location: "New York, NY", manager: "John Smith", capacity: 5000, used: 3840, status: "active" },
  { code: "WH-02", name: "West Coast Hub", location: "Los Angeles, CA", manager: "Emily Chen", capacity: 3000, used: 1250, status: "active" },
  { code: "WH-03", name: "South Distribution", location: "Houston, TX", manager: "Mike Davis", capacity: 2500, used: 2100, status: "active" },
  { code: "WH-04", name: "Central Store", location: "Chicago, IL", manager: "Lisa Park", capacity: 1800, used: 430, status: "active" },
  { code: "WH-05", name: "East Overflow", location: "Boston, MA", manager: "Tom Wilson", capacity: 1200, used: 0, status: "inactive" },
];

type WHRow = typeof WAREHOUSES[0];

export default function WarehousesPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Warehouses</h1>
        <p className="text-muted-foreground mt-0.5">Manage storage locations and capacity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {WAREHOUSES.filter((w) => w.status === "active").map((w) => {
          const pct = Math.round((w.used / w.capacity) * 100);
          return (
            <div key={w.code} className="bg-card rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{w.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3" /> {w.location}
                  </div>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded px-1.5 py-0.5">Active</span>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Capacity used</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", pct > 80 ? "bg-red-500" : pct > 60 ? "bg-yellow-500" : "bg-emerald-500")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{w.used.toLocaleString()} units</span>
                  <span>{w.capacity.toLocaleString()} cap.</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DataTable<WHRow>
        title="All Warehouses"
        data={WAREHOUSES}
        searchable
        searchKeys={["code", "name", "location", "manager"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> Add Warehouse
          </Button>
        }
        columns={[
          { key: "code", label: "Code", className: "font-mono text-xs" },
          { key: "name", label: "Warehouse" },
          { key: "location", label: "Location" },
          { key: "manager", label: "Manager" },
          { key: "capacity", label: "Capacity", render: (r) => <span>{r.capacity.toLocaleString()}</span> },
          { key: "used", label: "Used", render: (r) => <span>{r.used.toLocaleString()}</span> },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize",
                r.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
              )}>{r.status}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
