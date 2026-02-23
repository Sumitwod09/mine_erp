"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const PO_LIST = [
  { ref: "PO-2024-044", date: "Feb 21", vendor: "TechParts Ltd", items: 5, total: 12200, status: "pending", expected: "Mar 05" },
  { ref: "PO-2024-043", date: "Feb 18", vendor: "OfficeSupplies Co", items: 12, total: 3400, status: "received", expected: "Feb 28" },
  { ref: "PO-2024-042", date: "Feb 15", vendor: "Hardware Pro", items: 3, total: 8800, status: "partial", expected: "Mar 01" },
  { ref: "PO-2024-041", date: "Feb 10", vendor: "Global Imports", items: 20, total: 24500, status: "confirmed", expected: "Mar 15" },
  { ref: "PO-2024-040", date: "Feb 08", vendor: "TechParts Ltd", items: 8, total: 15600, status: "received", expected: "Feb 22" },
  { ref: "PO-2024-039", date: "Feb 05", vendor: "Furniture Direct", items: 6, total: 7200, status: "cancelled", expected: "Feb 20" },
];

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  partial: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  received: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

type PORow = typeof PO_LIST[0];

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <p className="text-muted-foreground mt-0.5">Manage procurement and vendor orders</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total POs", value: PO_LIST.length },
          { label: "Pending", value: PO_LIST.filter((p) => p.status === "pending" || p.status === "confirmed").length },
          { label: "Received", value: PO_LIST.filter((p) => p.status === "received").length },
          { label: "Total Value", value: "$" + PO_LIST.reduce((s, p) => s + p.total, 0).toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<PORow>
        title="Purchase Orders"
        data={PO_LIST}
        searchable
        searchKeys={["ref", "vendor"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New PO
          </Button>
        }
        columns={[
          { key: "ref", label: "PO Reference", className: "font-mono text-xs" },
          { key: "date", label: "Order Date" },
          { key: "vendor", label: "Vendor" },
          { key: "items", label: "Lines" },
          { key: "total", label: "Total", render: (r) => <span className="font-medium">${r.total.toLocaleString()}</span> },
          { key: "expected", label: "Expected" },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize", STATUS_STYLES[r.status])}>{r.status}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
