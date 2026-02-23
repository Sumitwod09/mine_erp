"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const RECEIPTS = [
  { ref: "REC-001", date: "Feb 22", po_ref: "PO-2024-043", vendor: "OfficeSupplies Co", items: 12, status: "complete" },
  { ref: "REC-002", date: "Feb 20", po_ref: "PO-2024-040", vendor: "TechParts Ltd", items: 8, status: "complete" },
  { ref: "REC-003", date: "Feb 19", po_ref: "PO-2024-042", vendor: "Hardware Pro", items: 2, status: "partial" },
];

type RecRow = typeof RECEIPTS[0];

export default function ReceiptsPage() {
  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Purchase Receipts</h1>
        <p className="text-muted-foreground mt-0.5">Goods receipt against purchase orders</p>
      </div>

      <DataTable<RecRow>
        title="Receipts"
        data={RECEIPTS}
        searchable
        searchKeys={["ref", "vendor", "po_ref"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Receipt
          </Button>
        }
        columns={[
          { key: "ref", label: "Ref", className: "font-mono text-xs" },
          { key: "date", label: "Date" },
          { key: "po_ref", label: "PO Ref", className: "font-mono text-xs" },
          { key: "vendor", label: "Vendor" },
          { key: "items", label: "Items" },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize",
                r.status === "complete" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              )}>{r.status}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
