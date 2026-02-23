"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCOUNTS = [
  { code: "1001", name: "Cash", type: "Asset", balance: 48200, category: "Current Asset" },
  { code: "1100", name: "Accounts Receivable", type: "Asset", balance: 124500, category: "Current Asset" },
  { code: "1200", name: "Inventory", type: "Asset", balance: 87300, category: "Current Asset" },
  { code: "1500", name: "Equipment", type: "Asset", balance: 245000, category: "Fixed Asset" },
  { code: "2001", name: "Accounts Payable", type: "Liability", balance: 65400, category: "Current Liability" },
  { code: "2100", name: "Short-term Loans", type: "Liability", balance: 30000, category: "Current Liability" },
  { code: "3001", name: "Owner's Equity", type: "Equity", balance: 320000, category: "Equity" },
  { code: "3100", name: "Retained Earnings", type: "Equity", balance: 89600, category: "Equity" },
  { code: "4001", name: "Sales Revenue", type: "Revenue", balance: 284200, category: "Revenue" },
  { code: "4100", name: "Service Revenue", type: "Revenue", balance: 42000, category: "Revenue" },
  { code: "5001", name: "Cost of Goods Sold", type: "Expense", balance: 167800, category: "Direct Cost" },
  { code: "5100", name: "Salaries", type: "Expense", balance: 98400, category: "Operating" },
  { code: "5200", name: "Rent", type: "Expense", balance: 24000, category: "Operating" },
  { code: "5300", name: "Utilities", type: "Expense", balance: 8400, category: "Operating" },
];

const TYPE_COLORS: Record<string, string> = {
  Asset: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Liability: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Equity: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Revenue: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Expense: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

type AccountRow = typeof ACCOUNTS[0];

export default function ChartOfAccountsPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chart of Accounts</h1>
          <p className="text-muted-foreground mt-0.5">Manage your account structure</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {["Asset", "Liability", "Equity", "Revenue", "Expense"].map((type) => {
          const total = ACCOUNTS.filter((a) => a.type === type).reduce((s, a) => s + a.balance, 0);
          return (
            <div key={type} className="bg-card rounded-xl border border-border p-3 text-center">
              <span className={cn("text-xs font-medium rounded-md px-2 py-0.5", TYPE_COLORS[type])}>{type}</span>
              <div className="text-lg font-bold mt-1.5">${(total / 1000).toFixed(0)}k</div>
              <div className="text-xs text-muted-foreground">{ACCOUNTS.filter((a) => a.type === type).length} accounts</div>
            </div>
          );
        })}
      </div>

      <DataTable<AccountRow>
        title="Accounts"
        description={`${ACCOUNTS.length} accounts configured`}
        data={ACCOUNTS}
        searchable
        searchKeys={["code", "name", "type", "category"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" />
            New Account
          </Button>
        }
        columns={[
          { key: "code", label: "Code", className: "font-mono w-20" },
          { key: "name", label: "Account Name" },
          {
            key: "type", label: "Type",
            render: (row) => (
              <span className={cn("text-xs font-medium rounded-md px-2 py-0.5", TYPE_COLORS[row.type])}>{row.type}</span>
            ),
          },
          { key: "category", label: "Category" },
          {
            key: "balance", label: "Balance",
            className: "text-right",
            render: (row) => <span className="font-medium text-right block">${row.balance.toLocaleString()}</span>,
          },
        ]}
      />
    </div>
  );
}
