"use client";

import { DataTable } from "@/components/data-table";

const PAYROLL = [
  { emp: "Alex Johnson", dept: "Management", basic: 12000, allowances: 2400, deductions: 1800, net: 12600 },
  { emp: "Maria Santos", dept: "Operations", basic: 9500, allowances: 1900, deductions: 1425, net: 9975 },
  { emp: "David Lee", dept: "Finance", basic: 7800, allowances: 780, deductions: 1170, net: 7410 },
  { emp: "Sarah Kim", dept: "Sales", basic: 7200, allowances: 1440, deductions: 1080, net: 7560 },
  { emp: "Tom Wilson", dept: "IT", basic: 8400, allowances: 840, deductions: 1260, net: 7980 },
  { emp: "Linda Park", dept: "HR", basic: 6800, allowances: 680, deductions: 1020, net: 6460 },
];

type PayRow = typeof PAYROLL[0];

export default function PayrollPage() {
  const totalNet = PAYROLL.reduce((s, p) => s + p.net, 0);
  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payroll</h1>
          <p className="text-muted-foreground mt-0.5">February 2024 · Total payroll: <strong>${totalNet.toLocaleString()}</strong></p>
        </div>
      </div>

      <DataTable<PayRow>
        title="Payroll Summary – Feb 2024"
        data={PAYROLL}
        searchable
        searchKeys={["emp", "dept"]}
        columns={[
          { key: "emp", label: "Employee" },
          { key: "dept", label: "Department" },
          { key: "basic", label: "Basic", render: (r) => <span>${r.basic.toLocaleString()}</span> },
          { key: "allowances", label: "Allowances", render: (r) => <span className="text-emerald-600 dark:text-emerald-400">+${r.allowances.toLocaleString()}</span> },
          { key: "deductions", label: "Deductions", render: (r) => <span className="text-red-600 dark:text-red-400">-${r.deductions.toLocaleString()}</span> },
          { key: "net", label: "Net Pay", render: (r) => <span className="font-bold">${r.net.toLocaleString()}</span> },
        ]}
      />
    </div>
  );
}
