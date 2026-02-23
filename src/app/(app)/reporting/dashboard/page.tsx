"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHLY = [
  { month: "Aug", revenue: 42000, expenses: 31000, profit: 11000 },
  { month: "Sep", revenue: 51000, expenses: 35000, profit: 16000 },
  { month: "Oct", revenue: 47000, expenses: 33000, profit: 14000 },
  { month: "Nov", revenue: 62000, expenses: 40000, profit: 22000 },
  { month: "Dec", revenue: 78000, expenses: 45000, profit: 33000 },
  { month: "Jan", revenue: 71000, expenses: 42000, profit: 29000 },
  { month: "Feb", revenue: 84000, expenses: 48000, profit: 36000 },
];

const BY_DEPT = [
  { dept: "Sales", revenue: 284200, expenses: 67400 },
  { dept: "Services", revenue: 42000, expenses: 18000 },
  { dept: "Wholesale", revenue: 98300, expenses: 71200 },
];

const EXPENSE_BREAKDOWN = [
  { name: "COGS", value: 167800, color: "#3b82f6" },
  { name: "Salaries", value: 98400, color: "#8b5cf6" },
  { name: "Rent", value: 24000, color: "#f59e0b" },
  { name: "Utilities", value: 8400, color: "#06b6d4" },
  { name: "Other", value: 18200, color: "#94a3b8" },
];

export default function ReportingDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold">Reporting & Analytics</h1>
        <p className="text-muted-foreground mt-0.5">Financial overview and business intelligence</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "YTD Revenue", value: "$426,500", change: "+21%", trend: "up", icon: DollarSign, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30" },
          { label: "YTD Expenses", value: "$274,000", change: "+14%", trend: "up", icon: TrendingDown, color: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30" },
          { label: "Net Profit", value: "$152,500", change: "+31%", trend: "up", icon: TrendingUp, color: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30" },
          { label: "Profit Margin", value: "35.7%", change: "+3.2pp", trend: "up", icon: Package, color: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", kpi.color)}>
                <kpi.icon className="w-4 h-4" />
              </div>
              <span className={cn("text-xs font-medium", kpi.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* P&L Trend */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold mb-4">Monthly P&L Trend</h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={MONTHLY} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240 / 0.5)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#60a5fa" radius={[2, 2, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="#a78bfa" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={EXPENSE_BREAKDOWN} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {EXPENSE_BREAKDOWN.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {EXPENSE_BREAKDOWN.map((e) => (
              <div key={e.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                  <span className="text-muted-foreground">{e.name}</span>
                </div>
                <span className="font-medium">${(e.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by dept */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold mb-4">Revenue vs Expenses by Department</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={BY_DEPT} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240 / 0.5)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <YAxis type="category" dataKey="dept" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={70} />
            <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
