"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EMPLOYEES = [
  { id: "EMP-001", name: "Alex Johnson", dept: "Management", position: "CEO", hire_date: "Jan 2020", salary: 12000, status: "active" },
  { id: "EMP-002", name: "Maria Santos", dept: "Operations", position: "COO", hire_date: "Mar 2020", salary: 9500, status: "active" },
  { id: "EMP-003", name: "David Lee", dept: "Finance", position: "Head Accountant", hire_date: "Jun 2020", salary: 7800, status: "active" },
  { id: "EMP-004", name: "Sarah Kim", dept: "Sales", position: "Sales Manager", hire_date: "Aug 2020", salary: 7200, status: "active" },
  { id: "EMP-005", name: "Tom Wilson", dept: "IT", position: "Systems Engineer", hire_date: "Jan 2021", salary: 8400, status: "active" },
  { id: "EMP-006", name: "Linda Park", dept: "HR", position: "HR Manager", hire_date: "Mar 2021", salary: 6800, status: "active" },
  { id: "EMP-007", name: "James Brown", dept: "Warehouse", position: "Warehouse Supervisor", hire_date: "May 2021", salary: 5200, status: "active" },
  { id: "EMP-008", name: "Emily Chen", dept: "Sales", position: "Sales Executive", hire_date: "Sep 2021", salary: 5400, status: "active" },
  { id: "EMP-009", name: "Carlos Rivera", dept: "Marketing", position: "Marketing Specialist", hire_date: "Jan 2022", salary: 5600, status: "active" },
  { id: "EMP-010", name: "Diana Moss", dept: "Finance", position: "Junior Accountant", hire_date: "Mar 2022", salary: 4800, status: "on_leave" },
];

const DEPT_COLORS: Record<string, string> = {
  Management: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Finance: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Sales: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Operations: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  IT: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  HR: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Warehouse: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Marketing: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

type EmpRow = typeof EMPLOYEES[0];

export default function EmployeesPage() {
  const depts = [...new Set(EMPLOYEES.map((e) => e.dept))];
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Employees</h1>
        <p className="text-muted-foreground mt-0.5">Employee directory and records</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: EMPLOYEES.length },
          { label: "Active", value: EMPLOYEES.filter((e) => e.status === "active").length },
          { label: "On Leave", value: EMPLOYEES.filter((e) => e.status === "on_leave").length },
          { label: "Payroll/Mo", value: "$" + EMPLOYEES.reduce((s, e) => s + e.salary, 0).toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<EmpRow>
        title="Employee Directory"
        data={EMPLOYEES}
        searchable
        searchKeys={["id", "name", "dept", "position"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> Add Employee
          </Button>
        }
        columns={[
          { key: "id", label: "ID", className: "font-mono text-xs" },
          { key: "name", label: "Name" },
          {
            key: "dept", label: "Department",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-md px-2 py-0.5", DEPT_COLORS[r.dept] ?? "bg-muted text-muted-foreground")}>{r.dept}</span>
            ),
          },
          { key: "position", label: "Position" },
          { key: "hire_date", label: "Hired" },
          { key: "salary", label: "Salary/Mo", render: (r) => <span className="font-medium">${r.salary.toLocaleString()}</span> },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5",
                r.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : r.status === "on_leave" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-muted text-muted-foreground"
              )}>
                {r.status.replace("_", " ")}
              </span>
            ),
          },
        ]}
      />
    </div>
  );
}
