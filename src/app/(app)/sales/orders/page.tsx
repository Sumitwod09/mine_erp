"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const ORDERS = [
  { ref: "SO-2024-112", date: "Feb 22", customer: "Metro Retail", items: 8, total: 8750, status: "confirmed", salesperson: "Sarah K." },
  { ref: "SO-2024-111", date: "Feb 21", customer: "Acme Corp", items: 3, total: 4800, status: "delivered", salesperson: "David L." },
  { ref: "SO-2024-110", date: "Feb 20", customer: "Globe Industries", items: 12, total: 18400, status: "processing", salesperson: "Sarah K." },
  { ref: "SO-2024-109", date: "Feb 19", customer: "Summit Corp", items: 5, total: 5600, status: "delivered", salesperson: "Alex J." },
  { ref: "SO-2024-108", date: "Feb 18", customer: "Horizon LLC", items: 2, total: 2200, status: "draft", salesperson: "Maria S." },
  { ref: "SO-2024-107", date: "Feb 17", customer: "Apex Systems", items: 7, total: 9100, status: "confirmed", salesperson: "Sarah K." },
  { ref: "SO-2024-106", date: "Feb 16", customer: "Vertex Inc", items: 4, total: 4400, status: "cancelled", salesperson: "Alex J." },
];

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

type OrderRow = typeof ORDERS[0];

export default function SalesOrdersPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Sales Orders</h1>
        <p className="text-muted-foreground mt-0.5">Track and manage customer orders</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Orders", value: ORDERS.length },
          { label: "Confirmed", value: ORDERS.filter((o) => o.status === "confirmed").length },
          { label: "Delivered", value: ORDERS.filter((o) => o.status === "delivered").length },
          { label: "Revenue", value: "$" + ORDERS.reduce((s, o) => s + o.total, 0).toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<OrderRow>
        title="Sales Orders"
        data={ORDERS}
        searchable
        searchKeys={["ref", "customer", "salesperson"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Order
          </Button>
        }
        columns={[
          { key: "ref", label: "Order Ref", className: "font-mono text-xs" },
          { key: "date", label: "Date" },
          { key: "customer", label: "Customer" },
          { key: "items", label: "Items", className: "text-center" },
          { key: "total", label: "Total", render: (r) => <span className="font-medium">${r.total.toLocaleString()}</span> },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize", STATUS_STYLES[r.status])}>{r.status}</span>
            ),
          },
          { key: "salesperson", label: "Salesperson" },
        ]}
      />
    </div>
  );
}
