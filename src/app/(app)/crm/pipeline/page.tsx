"use client";

import { cn } from "@/lib/utils";

const PIPELINE_STAGES = [
  {
    name: "New",
    color: "border-t-gray-400",
    bg: "bg-gray-50 dark:bg-gray-900/20",
    deals: [
      { name: "Bright Retail", value: 12000, contact: "Omar Santos" },
    ],
  },
  {
    name: "Qualified",
    color: "border-t-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    deals: [
      { name: "NextGen Corp", value: 45000, contact: "Ryan Hall" },
      { name: "Crest Systems", value: 35000, contact: "Leo Martin" },
    ],
  },
  {
    name: "Proposal",
    color: "border-t-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/10",
    deals: [
      { name: "Alpha Solutions", value: 28000, contact: "Nina Fox" },
    ],
  },
  {
    name: "Negotiation",
    color: "border-t-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    deals: [
      { name: "Peak Industries", value: 62000, contact: "Zoe Chang" },
    ],
  },
  {
    name: "Won",
    color: "border-t-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    deals: [
      { name: "Harbor Co", value: 19000, contact: "Amy Reed" },
    ],
  },
];

export default function PipelinePage() {
  const total = PIPELINE_STAGES.flatMap((s) => s.deals).reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-0.5">
            {PIPELINE_STAGES.flatMap((s) => s.deals).length} deals · ${total.toLocaleString()} total value
          </p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageTotal = stage.deals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage.name} className="w-64 shrink-0 space-y-2">
              <div className={cn("rounded-t-lg border-t-4 bg-card border border-border p-3", stage.color)}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{stage.name}</span>
                  <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">{stage.deals.length}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">${stageTotal.toLocaleString()}</div>
              </div>

              <div className="space-y-2">
                {stage.deals.map((deal) => (
                  <div key={deal.name} className={cn("rounded-lg border border-border p-3 cursor-pointer hover:shadow-sm transition-shadow", stage.bg)}>
                    <div className="font-medium text-sm">{deal.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{deal.contact}</div>
                    <div className="text-sm font-bold mt-1.5">${deal.value.toLocaleString()}</div>
                  </div>
                ))}
                <button className="w-full rounded-lg border border-dashed border-border p-2.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors">
                  + Add deal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
