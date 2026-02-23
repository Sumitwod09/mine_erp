"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const OPPORTUNITIES = [
  { id: "OPP-001", name: "ERP Full Suite – NextGen Corp", stage: "proposal", value: 45000, probability: 65, close_date: "Mar 15", owner: "Sarah K." },
  { id: "OPP-002", name: "Accounting Module – Alpha Solutions", stage: "negotiation", value: 28000, probability: 80, close_date: "Mar 01", owner: "Alex J." },
  { id: "OPP-003", name: "Inventory + Sales – Peak Industries", stage: "negotiation", value: 62000, probability: 75, close_date: "Mar 20", owner: "Maria S." },
  { id: "OPP-004", name: "HR Module – Crest Systems", stage: "qualified", value: 35000, probability: 40, close_date: "Apr 01", owner: "Sarah K." },
];

const STAGE_STYLES: Record<string, string> = {
  qualified: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  proposal: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  negotiation: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  won: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

type OppRow = typeof OPPORTUNITIES[0];

export default function OpportunitiesPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <p className="text-muted-foreground mt-0.5">Active sales opportunities and forecasting</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Opportunities", value: OPPORTUNITIES.length },
          { label: "Total Value", value: "$" + OPPORTUNITIES.reduce((s, o) => s + o.value, 0).toLocaleString() },
          { label: "Weighted Forecast", value: "$" + OPPORTUNITIES.reduce((s, o) => s + Math.round(o.value * o.probability / 100), 0).toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<OppRow>
        title="Opportunities"
        data={OPPORTUNITIES}
        searchable
        searchKeys={["id", "name", "owner"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Opportunity
          </Button>
        }
        columns={[
          { key: "id", label: "ID", className: "font-mono text-xs" },
          { key: "name", label: "Opportunity" },
          {
            key: "stage", label: "Stage",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize", STAGE_STYLES[r.stage])}>{r.stage}</span>
            ),
          },
          { key: "value", label: "Value", render: (r) => <span className="font-medium">${r.value.toLocaleString()}</span> },
          {
            key: "probability", label: "Probability",
            render: (r) => (
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.probability}%` }} />
                </div>
                <span className="text-xs">{r.probability}%</span>
              </div>
            ),
          },
          { key: "close_date", label: "Close Date" },
          { key: "owner", label: "Owner" },
        ]}
      />
    </div>
  );
}
