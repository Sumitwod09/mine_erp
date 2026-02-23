"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  { sku: "SKU-001", name: "Laptop Pro 15", category: "Electronics", unit: "pcs", qty_on_hand: 48, reorder_pt: 10, cost: 1200, price: 1799 },
  { sku: "SKU-002", name: "Wireless Mouse", category: "Accessories", unit: "pcs", qty_on_hand: 230, reorder_pt: 50, cost: 18, price: 39 },
  { sku: "SKU-003", name: "USB-C Hub 7-Port", category: "Accessories", unit: "pcs", qty_on_hand: 185, reorder_pt: 40, cost: 24, price: 59 },
  { sku: "SKU-004", name: "Monitor 27\" 4K", category: "Electronics", unit: "pcs", qty_on_hand: 32, reorder_pt: 8, cost: 480, price: 749 },
  { sku: "SKU-005", name: "Mechanical Keyboard", category: "Accessories", unit: "pcs", qty_on_hand: 67, reorder_pt: 20, cost: 85, price: 159 },
  { sku: "SKU-006", name: "Webcam HD 1080p", category: "Electronics", unit: "pcs", qty_on_hand: 9, reorder_pt: 15, cost: 55, price: 99 },
  { sku: "SKU-007", name: "Office Chair Ergo", category: "Furniture", unit: "pcs", qty_on_hand: 14, reorder_pt: 5, cost: 220, price: 399 },
  { sku: "SKU-008", name: "Desk Lamp LED", category: "Furniture", unit: "pcs", qty_on_hand: 110, reorder_pt: 25, cost: 30, price: 65 },
  { sku: "SKU-009", name: "Headphones ANC", category: "Electronics", unit: "pcs", qty_on_hand: 55, reorder_pt: 12, cost: 120, price: 249 },
  { sku: "SKU-010", name: "Printer LaserJet", category: "Electronics", unit: "pcs", qty_on_hand: 7, reorder_pt: 5, cost: 290, price: 449 },
];

type ProductRow = typeof PRODUCTS[0];

export default function ProductsPage() {
  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground mt-0.5">Manage your product catalog and stock levels</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total SKUs", value: PRODUCTS.length, color: "text-foreground" },
          { label: "Low Stock", value: PRODUCTS.filter((p) => p.qty_on_hand < p.reorder_pt).length, color: "text-red-600 dark:text-red-400" },
          { label: "Total Units", value: PRODUCTS.reduce((s, p) => s + p.qty_on_hand, 0).toLocaleString(), color: "text-foreground" },
          { label: "Inventory Value", value: "$" + PRODUCTS.reduce((s, p) => s + p.qty_on_hand * p.cost, 0).toLocaleString(), color: "text-emerald-600 dark:text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<ProductRow>
        title="Product Catalog"
        data={PRODUCTS}
        searchable
        searchKeys={["sku", "name", "category"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </Button>
        }
        columns={[
          { key: "sku", label: "SKU", className: "font-mono text-xs" },
          { key: "name", label: "Product Name" },
          { key: "category", label: "Category" },
          { key: "unit", label: "Unit" },
          {
            key: "qty_on_hand", label: "On Hand",
            render: (r) => (
              <span className={cn("font-medium", r.qty_on_hand < r.reorder_pt ? "text-red-600 dark:text-red-400" : "")}>
                {r.qty_on_hand}
                {r.qty_on_hand < r.reorder_pt && <span className="ml-1 text-xs">⚠</span>}
              </span>
            ),
          },
          { key: "reorder_pt", label: "Reorder Pt." },
          { key: "cost", label: "Cost", render: (r) => <span>${r.cost.toLocaleString()}</span> },
          { key: "price", label: "Price", render: (r) => <span className="font-medium">${r.price.toLocaleString()}</span> },
        ]}
      />
    </div>
  );
}
