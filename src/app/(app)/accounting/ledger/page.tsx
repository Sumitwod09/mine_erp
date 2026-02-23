"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const LEDGER = [
  { date: "Feb 22", account: "Cash (1001)", debit: 4800, credit: 0, balance: 48200, ref: "JE-2024-003" },
  { date: "Feb 21", account: "Accounts Payable (2001)", debit: 12200, credit: 0, balance: 65400, ref: "JE-2024-002" },
  { date: "Feb 20", account: "Sales Revenue (4001)", debit: 0, credit: 18400, balance: 284200, ref: "JE-2024-007" },
  { date: "Feb 18", account: "Office Supplies (5400)", debit: 820, credit: 0, balance: 820, ref: "JE-2024-004" },
  { date: "Feb 18", account: "Cash (1001)", debit: 0, credit: 820, balance: 43200, ref: "JE-2024-004" },
  { date: "Feb 17", account: "Equipment (1500)", debit: 0, credit: 4083, balance: 245000, ref: "JE-2024-006" },
];

type LedRow = typeof LEDGER[0];

export default function LedgerPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">General Ledger</h1>
        <p className="text-muted-foreground mt-0.5">Account-level transaction history</p>
      </div>

      <DataTable<LedRow>
        title="Ledger Entries"
        data={LEDGER}
        searchable
        searchKeys={["account", "ref"]}
        columns={[
          { key: "date", label: "Date" },
          { key: "account", label: "Account" },
          { key: "ref", label: "Reference", className: "font-mono text-xs" },
          { key: "debit", label: "Debit", render: (r) => r.debit > 0 ? <span className="font-medium">${r.debit.toLocaleString()}</span> : <span className="text-muted-foreground">—</span> },
          { key: "credit", label: "Credit", render: (r) => r.credit > 0 ? <span className="font-medium">${r.credit.toLocaleString()}</span> : <span className="text-muted-foreground">—</span> },
          { key: "balance", label: "Balance", render: (r) => <span className="font-medium">${r.balance.toLocaleString()}</span> },
        ]}
      />
    </div>
  );
}
