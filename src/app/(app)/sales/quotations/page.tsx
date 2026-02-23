"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const QUOTATIONS = [
  { ref: "QT-2024-022", date: "Feb 22", customer: "NextGen Corp", items: 4, total: 45000, valid_until: "Mar 22", status: "sent" },
  { ref: "QT-2024-021", date: "Feb 20", customer: "Vertex Inc", items: 2, total: 12000, valid_until: "Mar 20", status: "draft" },
  { ref: "QT-2024-020", date: "Feb 18", customer: "Crest Systems", items: 6, total: 35000, valid_until: "Mar 18", status: "accepted" },
  { ref: "QT-2024-019", date: "Feb 15", customer: "Delta Micro", items: 3, total: 8000, valid_until: "Mar 15", status: "expired" },
];

type QtRow = typeof QUOTATIONS[0];

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  accepted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  expired: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function QuotationsPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Quotations</h1>
        <p className="text-muted-foreground mt-0.5">Manage sales quotations and proposals</p>
      </div>

      <DataTable<QtRow>
        title="Quotations"
        data={QUOTATIONS}
        searchable
        searchKeys={["ref", "customer"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Quote
          </Button>
        }
        columns={[
          { key: "ref", label: "Ref", className: "font-mono text-xs" },
          { key: "date", label: "Date" },
          { key: "customer", label: "Customer" },
          { key: "items", label: "Lines" },
          { key: "total", label: "Total", render: (r) => <span className="font-medium">${r.total.toLocaleString()}</span> },
          { key: "valid_until", label: "Valid Until" },
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
