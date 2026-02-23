"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const LEAVES = [
  { emp: "David Lee", type: "Sick Leave", from: "Feb 22", to: "Feb 23", days: 2, reason: "Flu", status: "approved" },
  { emp: "Linda Park", type: "Annual Leave", from: "Feb 20", to: "Feb 22", days: 3, reason: "Vacation", status: "approved" },
  { emp: "Tom Wilson", type: "Emergency", from: "Feb 21", to: "Feb 21", days: 1, reason: "Family", status: "pending" },
  { emp: "Emily Chen", type: "Annual Leave", from: "Mar 01", to: "Mar 07", days: 7, reason: "Travel", status: "pending" },
];

type LeaveRow = typeof LEAVES[0];

export default function LeavePage() {
  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <p className="text-muted-foreground mt-0.5">Employee leave requests and approvals</p>
      </div>

      <DataTable<LeaveRow>
        title="Leave Requests"
        data={LEAVES}
        searchable
        searchKeys={["emp", "type", "status"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Request
          </Button>
        }
        columns={[
          { key: "emp", label: "Employee" },
          { key: "type", label: "Leave Type" },
          { key: "from", label: "From" },
          { key: "to", label: "To" },
          { key: "days", label: "Days" },
          { key: "reason", label: "Reason" },
          {
            key: "status", label: "Status",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize",
                r.status === "approved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              )}>{r.status}</span>
            ),
          },
        ]}
      />
    </div>
  );
}
