"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const LEADS = [
  { id: "L-001", name: "NextGen Corp", contact: "Ryan Hall", email: "ryan@nextgen.com", source: "Website", value: 45000, stage: "qualified", assigned: "Sarah K." },
  { id: "L-002", name: "Alpha Solutions", contact: "Nina Fox", email: "nina@alpha.com", source: "Referral", value: 28000, stage: "proposal", assigned: "Alex J." },
  { id: "L-003", name: "Bright Retail", contact: "Omar Santos", email: "omar@bright.com", source: "Cold Call", value: 12000, stage: "new", assigned: "Sarah K." },
  { id: "L-004", name: "Peak Industries", contact: "Zoe Chang", email: "zoe@peak.com", source: "LinkedIn", value: 62000, stage: "negotiation", assigned: "Maria S." },
  { id: "L-005", name: "Crest Systems", contact: "Leo Martin", email: "leo@crest.com", source: "Trade Show", value: 35000, stage: "qualified", assigned: "Sarah K." },
  { id: "L-006", name: "Harbor Co", contact: "Amy Reed", email: "amy@harbor.com", source: "Website", value: 19000, stage: "won", assigned: "Alex J." },
  { id: "L-007", name: "Delta Micro", contact: "Sam Torres", email: "sam@delta.com", source: "Partner", value: 8000, stage: "lost", assigned: "Sarah K." },
];

const STAGE_STYLES: Record<string, string> = {
  new: "bg-muted text-muted-foreground",
  qualified: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  proposal: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  negotiation: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  won: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  lost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

type LeadRow = typeof LEADS[0];

export default function LeadsPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-muted-foreground mt-0.5">Track incoming leads and opportunities</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Leads", value: LEADS.length },
          { label: "Active", value: LEADS.filter((l) => !["won", "lost"].includes(l.stage)).length },
          { label: "Won", value: LEADS.filter((l) => l.stage === "won").length },
          { label: "Pipeline Value", value: "$" + LEADS.filter((l) => !["won", "lost"].includes(l.stage)).reduce((s, l) => s + l.value, 0).toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<LeadRow>
        title="Lead Tracker"
        data={LEADS}
        searchable
        searchKeys={["id", "name", "contact", "source", "assigned"]}
        action={
          <Button size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground">
            <Plus className="w-3.5 h-3.5" /> New Lead
          </Button>
        }
        columns={[
          { key: "id", label: "ID", className: "font-mono text-xs" },
          { key: "name", label: "Company" },
          { key: "contact", label: "Contact" },
          { key: "source", label: "Source" },
          { key: "value", label: "Value", render: (r) => <span className="font-medium">${r.value.toLocaleString()}</span> },
          {
            key: "stage", label: "Stage",
            render: (r) => (
              <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5 capitalize", STAGE_STYLES[r.stage])}>{r.stage}</span>
            ),
          },
          { key: "assigned", label: "Assigned To" },
        ]}
      />
    </div>
  );
}
