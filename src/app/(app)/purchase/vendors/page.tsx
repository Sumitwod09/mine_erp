"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const VENDORS = [
  { id: "V-001", name: "TechParts Ltd", contact: "James Wilson", email: "james@techparts.com", phone: "+1 555 1001", city: "Boston", balance: 12200, status: "active" },
  { id: "V-002", name: "OfficeSupplies Co", contact: "Karen Hill", email: "karen@osco.com", phone: "+1 555 1002", city: "Dallas", balance: 0, status: "active" },
  { id: "V-003", name: "Hardware Pro", contact: "Steven Grant", email: "steven@hwpro.com", phone: "+1 555 1003", city: "Denver", balance: 8800, status: "active" },
  { id: "V-004", name: "Global Imports", contact: "Linda Zhao", email: "linda@globalimports.com", phone: "+1 555 1004", city: "San Francisco", balance: 24500, status: "active" },
  { id: "V-005", name: "Furniture Direct", contact: "Mark Stevens", email: "mark@furndirect.com", phone: "+1 555 1005", city: "Portland", balance: 0, status: "inactive" },
];

type VendorRow = typeof VENDORS[0];

export default function VendorsPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Vendors</h1>
        <p className="text-muted-foreground mt-0.5">Supplier directory and payable balances</p>
      </div>

      <DataTable<VendorRow>
        title="Vendor List"
        data={VENDORS}
        searchable
        searchKeys={["id", "name", "contact", "email", "city"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> Add Vendor
          </Button>
        }
        columns={[
          { key: "id", label: "ID", className: "font-mono text-xs" },
          { key: "name", label: "Vendor" },
          { key: "contact", label: "Contact" },
          { key: "email", label: "Email" },
          { key: "city", label: "City" },
          { key: "balance", label: "Payable", render: (r) => <span className={r.balance > 0 ? "text-orange-600 dark:text-orange-400 font-medium" : ""}>${r.balance.toLocaleString()}</span> },
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
