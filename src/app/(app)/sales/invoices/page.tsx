"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const INVOICES = [
  { ref: "INV-2024-089", date: "Feb 22", due: "Mar 22", customer: "Acme Corp", amount: 4800, paid: 4800, status: "paid" },
  { ref: "INV-2024-088", date: "Feb 20", due: "Mar 20", customer: "Globe Industries", amount: 2350, paid: 0, status: "overdue" },
  { ref: "INV-2024-087", date: "Feb 18", due: "Mar 18", customer: "Summit Corp", amount: 5600, paid: 5600, status: "paid" },
  { ref: "INV-2024-086", date: "Feb 15", due: "Mar 15", customer: "Metro Retail", amount: 8750, paid: 4375, status: "partial" },
  { ref: "INV-2024-085", date: "Feb 10", due: "Mar 10", customer: "Horizon LLC", amount: 2200, paid: 0, status: "sent" },
  { ref: "INV-2024-084", date: "Feb 08", due: "Mar 08", customer: "Apex Systems", amount: 9100, paid: 9100, status: "paid" },
];

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  partial: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  sent: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  draft: "bg-muted text-muted-foreground",
};

type InvRow = typeof INVOICES[0];

export default function InvoicesPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-muted-foreground mt-0.5">Manage customer invoices and payments</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Billed", value: "$" + INVOICES.reduce((s, i) => s + i.amount, 0).toLocaleString() },
          { label: "Collected", value: "$" + INVOICES.reduce((s, i) => s + i.paid, 0).toLocaleString() },
          { label: "Outstanding", value: "$" + INVOICES.reduce((s, i) => s + (i.amount - i.paid), 0).toLocaleString() },
          { label: "Overdue", value: INVOICES.filter((i) => i.status === "overdue").length },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<InvRow>
        title="Invoices"
        data={INVOICES}
        searchable
        searchKeys={["ref", "customer"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Invoice
          </Button>
        }
        columns={[
          { key: "ref", label: "Invoice No.", className: "font-mono text-xs" },
          { key: "date", label: "Issue Date" },
          { key: "due", label: "Due Date" },
          { key: "customer", label: "Customer" },
          { key: "amount", label: "Amount", render: (r) => <span>${r.amount.toLocaleString()}</span> },
          { key: "paid", label: "Paid", render: (r) => <span className="text-emerald-600 dark:text-emerald-400">${r.paid.toLocaleString()}</span> },
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
