"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const CUSTOMERS = [
  { id: "C-001", name: "Acme Corp", contact: "John Doe", email: "john@acme.com", phone: "+1 555 0101", city: "New York", balance: 4800, status: "active" },
  { id: "C-002", name: "Globe Industries", contact: "Mary Lee", email: "mary@globe.com", phone: "+1 555 0202", city: "Chicago", balance: 2350, status: "active" },
  { id: "C-003", name: "Summit Corp", contact: "Bob Taylor", email: "bob@summit.com", phone: "+1 555 0303", city: "Houston", balance: 0, status: "active" },
  { id: "C-004", name: "Metro Retail", contact: "Alice Wang", email: "alice@metro.com", phone: "+1 555 0404", city: "Los Angeles", balance: 4375, status: "active" },
  { id: "C-005", name: "Horizon LLC", contact: "Carlos R.", email: "carlos@horizon.com", phone: "+1 555 0505", city: "Miami", balance: 2200, status: "active" },
  { id: "C-006", name: "Apex Systems", contact: "Diana M.", email: "diana@apex.com", phone: "+1 555 0606", city: "Seattle", balance: 0, status: "inactive" },
];

type CustRow = typeof CUSTOMERS[0];

export default function CustomersPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-muted-foreground mt-0.5">Customer directory and account balances</p>
      </div>

      <DataTable<CustRow>
        title="Customer List"
        data={CUSTOMERS}
        searchable
        searchKeys={["id", "name", "contact", "email", "city"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </Button>
        }
        columns={[
          { key: "id", label: "ID", className: "font-mono text-xs" },
          { key: "name", label: "Company" },
          { key: "contact", label: "Contact" },
          { key: "email", label: "Email" },
          { key: "city", label: "City" },
          { key: "balance", label: "Open Balance", render: (r) => <span className={r.balance > 0 ? "text-orange-600 dark:text-orange-400 font-medium" : ""}>${r.balance.toLocaleString()}</span> },
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
