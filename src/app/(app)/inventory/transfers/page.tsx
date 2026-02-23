"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const TRANSFERS = [
  { ref: "TRF-001", date: "Feb 20", from: "Main Warehouse", to: "West Coast Hub", product: "Wireless Mouse", qty: 50, status: "completed" },
  { ref: "TRF-002", date: "Feb 18", from: "Main Warehouse", to: "South Distribution", product: "USB-C Hub 7-Port", qty: 30, status: "in_transit" },
  { ref: "TRF-003", date: "Feb 17", from: "West Coast Hub", to: "Central Store", product: "Laptop Pro 15", qty: 5, status: "pending" },
  { ref: "TRF-004", date: "Feb 15", from: "South Distribution", to: "Main Warehouse", product: "Desk Lamp LED", qty: 20, status: "completed" },
];

type TrfRow = typeof TRANSFERS[0];

export default function TransfersPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Stock Transfers</h1>
        <p className="text-muted-foreground mt-0.5">Move inventory between warehouses</p>
      </div>

      <DataTable<TrfRow>
        title="Transfer Orders"
        data={TRANSFERS}
        searchable
        searchKeys={["ref", "from", "to", "product"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Transfer
          </Button>
        }
        columns={[
          { key: "ref", label: "Ref", className: "font-mono text-xs" },
          { key: "date", label: "Date" },
          { key: "from", label: "From" },
          { key: "to", label: "To" },
          { key: "product", label: "Product" },
          { key: "qty", label: "Qty" },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5",
                r.status === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : r.status === "in_transit" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              )}>{r.status.replace("_", " ")}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
