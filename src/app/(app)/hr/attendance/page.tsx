"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const ATTENDANCE = [
  { emp: "Alex Johnson", date: "Feb 22", check_in: "08:52", check_out: "17:10", hours: 8.3, status: "present" },
  { emp: "Maria Santos", date: "Feb 22", check_in: "09:01", check_out: "18:05", hours: 9.1, status: "present" },
  { emp: "David Lee", date: "Feb 22", check_in: "—", check_out: "—", hours: 0, status: "absent" },
  { emp: "Sarah Kim", date: "Feb 22", check_in: "08:45", check_out: "17:00", hours: 8.25, status: "present" },
  { emp: "Tom Wilson", date: "Feb 22", check_in: "10:30", check_out: "17:00", hours: 6.5, status: "late" },
  { emp: "Linda Park", date: "Feb 22", check_in: "—", check_out: "—", hours: 0, status: "leave" },
];

type AttRow = typeof ATTENDANCE[0];

export default function AttendancePage() {
  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-muted-foreground mt-0.5">Daily attendance tracking</p>
      </div>

      <DataTable<AttRow>
        title="Today's Attendance – Feb 22, 2024"
        data={ATTENDANCE}
        searchable
        searchKeys={["emp", "status"]}
        columns={[
          { key: "emp", label: "Employee" },
          { key: "date", label: "Date" },
          { key: "check_in", label: "Check In" },
          { key: "check_out", label: "Check Out" },
          { key: "hours", label: "Hours", render: (r) => <span>{r.hours > 0 ? r.hours.toFixed(1) : "—"}</span> },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize",
                r.status === "present" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : r.status === "late" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : r.status === "leave" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>{r.status}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
