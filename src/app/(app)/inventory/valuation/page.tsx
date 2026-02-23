"use client";

import { DataTable } from "@/components/data-table";

const VALUATION = [
  { sku: "SKU-001", name: "Laptop Pro 15", qty: 48, cost: 1200, total: 57600, method: "FIFO" },
  { sku: "SKU-002", name: "Wireless Mouse", qty: 230, cost: 18, total: 4140, method: "FIFO" },
  { sku: "SKU-003", name: "USB-C Hub 7-Port", qty: 185, cost: 24, total: 4440, method: "FIFO" },
  { sku: "SKU-004", name: "Monitor 27\" 4K", qty: 32, cost: 480, total: 15360, method: "AVCO" },
  { sku: "SKU-005", name: "Mechanical Keyboard", qty: 67, cost: 85, total: 5695, method: "FIFO" },
  { sku: "SKU-009", name: "Headphones ANC", qty: 55, cost: 120, total: 6600, method: "AVCO" },
];

type ValRow = typeof VALUATION[0];

export default function ValuationPage() {
  const totalVal = VALUATION.reduce((s, v) => s + v.total, 0);
  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Valuation</h1>
          <p className="text-muted-foreground mt-0.5">Total stock value: <strong>${totalVal.toLocaleString()}</strong></p>
        </div>
      </div>

      <DataTable<ValRow>
        title="Stock Valuation Report"
        data={VALUATION}
        searchable
        searchKeys={["sku", "name", "method"]}
        columns={[
          { key: "sku", label: "SKU", className: "font-mono text-xs" },
          { key: "name", label: "Product" },
          { key: "qty", label: "Qty" },
          { key: "cost", label: "Unit Cost", render: (r) => <span>${r.cost.toLocaleString()}</span> },
          { key: "total", label: "Total Value", render: (r) => <span className="font-medium">${r.total.toLocaleString()}</span> },
          { key: "method", label: "Method" },
        ]}
      />
    </div>
  );
}
