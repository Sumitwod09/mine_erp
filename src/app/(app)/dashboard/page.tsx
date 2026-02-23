"use client";

import { useAuth, useModules } from "@/lib/providers";
import { COMPANIES } from "@/lib/data";
import {
  TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, Users,
  ArrowUpRight, ArrowDownRight, Activity, BarChart2,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const REVENUE_DATA = [
  { month: "Aug", revenue: 42000, expenses: 31000 },
  { month: "Sep", revenue: 51000, expenses: 35000 },
  { month: "Oct", revenue: 47000, expenses: 33000 },
  { month: "Nov", revenue: 62000, expenses: 40000 },
  { month: "Dec", revenue: 78000, expenses: 45000 },
  { month: "Jan", revenue: 71000, expenses: 42000 },
  { month: "Feb", revenue: 84000, expenses: 48000 },
];

const SALES_BY_MODULE = [
  { name: "Direct", value: 38 },
  { name: "Online", value: 27 },
  { name: "Partner", value: 19 },
  { name: "Retail", value: 16 },
];

const RECENT_TRANSACTIONS = [
  { id: "INV-2024-089", type: "invoice", customer: "Acme Corp", amount: 4800, status: "paid", date: "Feb 22" },
  { id: "PO-2024-044", type: "purchase", customer: "TechParts Ltd", amount: 12200, status: "pending", date: "Feb 21" },
  { id: "INV-2024-088", type: "invoice", customer: "Globe Industries", amount: 2350, status: "overdue", date: "Feb 20" },
  { id: "SO-2024-112", type: "sale", customer: "Metro Retail", amount: 8750, status: "confirmed", date: "Feb 19" },
  { id: "INV-2024-087", type: "invoice", customer: "Summit Corp", amount: 5600, status: "paid", date: "Feb 18" },
];

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

function StatCard({
  title, value, change, icon: Icon, trend, color,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.FC<{ className?: string }>;
  trend: "up" | "down";
  color: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm">
        {trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
        <span className={trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
          {change}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { activeModules } = useModules();
  const company = COMPANIES[0];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Good morning, {user?.name.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-0.5">{company.name} · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full px-3 py-1 font-medium flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {activeModules.length} modules active
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$84,200" change="+18.3%" trend="up" icon={DollarSign} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard title="Sales Orders" value="142" change="+12.5%" trend="up" icon={ShoppingCart} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard title="Inventory Items" value="2,840" change="-3.2%" trend="down" icon={Package} color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" />
        <StatCard title="Active Employees" value="47" change="+2" trend="up" icon={Users} color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Revenue vs Expenses</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Last 7 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Revenue
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                Expenses
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--border)" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="expenses" stroke="#60a5fa" strokeWidth={2} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by channel */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="mb-5">
            <h3 className="font-semibold">Sales by Channel</h3>
            <p className="text-sm text-muted-foreground mt-0.5">This month</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SALES_BY_MODULE} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 240)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Share"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--border)" }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Latest activity across modules</p>
          </div>
          <BarChart2 className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reference</th>
                <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer / Vendor</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-center px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{tx.id}</td>
                  <td className="px-5 py-3 font-medium">{tx.customer}</td>
                  <td className="px-5 py-3 text-right font-medium">${tx.amount.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-center">
                      <span className={`text-xs font-medium rounded-full px-2.5 py-0.5 capitalize ${STATUS_STYLES[tx.status]}`}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
