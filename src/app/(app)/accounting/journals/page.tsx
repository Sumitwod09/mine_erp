"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const JOURNALS = [
  { ref: "JE-2024-001", date: "Feb 22, 2024", description: "Feb payroll entry", debit: 98400, credit: 98400, status: "posted", created_by: "Alex J." },
  { ref: "JE-2024-002", date: "Feb 21, 2024", description: "Vendor payment – TechParts", debit: 12200, credit: 12200, status: "posted", created_by: "Maria S." },
  { ref: "JE-2024-003", date: "Feb 20, 2024", description: "Customer receipt – Acme Corp", debit: 4800, credit: 4800, status: "posted", created_by: "David L." },
  { ref: "JE-2024-004", date: "Feb 19, 2024", description: "Office supplies purchase", debit: 820, credit: 820, status: "posted", created_by: "Alex J." },
  { ref: "JE-2024-005", date: "Feb 18, 2024", description: "Monthly rent accrual", debit: 2000, credit: 2000, status: "draft", created_by: "David L." },
  { ref: "JE-2024-006", date: "Feb 17, 2024", description: "Depreciation – Equipment", debit: 4083, credit: 4083, status: "posted", created_by: "David L." },
  { ref: "JE-2024-007", date: "Feb 16, 2024", description: "Sales revenue recognition", debit: 18400, credit: 18400, status: "posted", created_by: "Sarah K." },
];

const STATUS_STYLES: Record<string, string> = {
  posted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  reversed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

type JournalRow = typeof JOURNALS[0];

export default function JournalsPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Journal Entries</h1>
          <p className="text-muted-foreground mt-0.5">Record and review accounting transactions</p>
        </div>
      </div>

      <DataTable<JournalRow>
        title="Journal Entries"
        data={JOURNALS}
        searchable
        searchKeys={["ref", "description", "created_by"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Entry
          </Button>
        }
        columns={[
          { key: "ref", label: "Reference", className: "font-mono text-xs" },
          { key: "date", label: "Date" },
          { key: "description", label: "Description" },
          { key: "debit", label: "Debit", render: (r) => <span className="font-medium">${r.debit.toLocaleString()}</span> },
          { key: "credit", label: "Credit", render: (r) => <span className="font-medium">${r.credit.toLocaleString()}</span> },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize", STATUS_STYLES[r.status])}>{r.status}</span>
            ),
          },
          { key: "created_by", label: "Created By" },
        ]}
      />
    </div>
  );
}
