"use client";

export default function AccountingReportsPage() {
  const reports = [
    { name: "Balance Sheet", desc: "Assets, liabilities, and equity snapshot", period: "Feb 2024" },
    { name: "Income Statement", desc: "Revenue, expenses, and net income", period: "Feb 2024" },
    { name: "Cash Flow Statement", desc: "Operating, investing, financing activities", period: "Feb 2024" },
    { name: "Trial Balance", desc: "Account balances verification report", period: "Feb 2024" },
    { name: "Aged Receivables", desc: "Outstanding customer invoices by age", period: "Current" },
    { name: "Aged Payables", desc: "Outstanding vendor invoices by age", period: "Current" },
  ];

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground mt-0.5">Standard financial statements and reports</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.name} className="bg-card rounded-xl border border-border p-5 hover:shadow-sm transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold group-hover:text-primary transition-colors">{r.name}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{r.desc}</div>
              </div>
              <span className="text-xs bg-muted text-muted-foreground rounded-md px-2 py-0.5 shrink-0 ml-2">{r.period}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="text-xs bg-primary/10 text-primary rounded-md px-2.5 py-1 hover:bg-primary/20 transition-colors">View</button>
              <button className="text-xs bg-muted text-muted-foreground rounded-md px-2.5 py-1 hover:bg-muted/80 transition-colors">Export PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
