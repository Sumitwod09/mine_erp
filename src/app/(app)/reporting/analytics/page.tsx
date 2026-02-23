"use client";

export default function ReportingAnalyticsPage() {
  const kpis = [
    { label: "Customer Acquisition Cost", value: "$142", trend: "-8%" },
    { label: "Customer Lifetime Value", value: "$4,800", trend: "+12%" },
    { label: "Inventory Turnover", value: "3.2x", trend: "+0.4x" },
    { label: "Days Sales Outstanding", value: "28 days", trend: "-3 days" },
    { label: "Gross Margin", value: "41.3%", trend: "+2.1pp" },
    { label: "Return Rate", value: "2.1%", trend: "-0.4pp" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Business Analytics</h1>
        <p className="text-muted-foreground mt-0.5">Key performance indicators and business health metrics</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-xl border border-border p-5">
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{kpi.label}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">{kpi.trend} vs prev. period</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 text-center">
        <div className="text-muted-foreground text-sm">
          Advanced analytics charts and custom report builder coming in Phase 5.
        </div>
      </div>
    </div>
  );
}
