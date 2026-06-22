import Link from 'next/link';
import {
  BookOpen,
  Package,
  ShoppingCart,
  Truck,
  Users,
  UserCheck,
  BarChart3,
  Calculator,
  MapPin,
  Zap,
  FileText,
} from 'lucide-react';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header – we reuse the global layout, so just page title */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold">Features & Modules</h1>
          <p className="text-muted-foreground max-w-xl">
            Discover how VERP’s modular design lets you pick exactly the
            capabilities you need—no bloat, no unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Core Modules Section (same cards as homepage but expanded) */}
      <section className="py-12 bg-background/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-center">Core Modules</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Accounting',
                desc: 'Real-time ledgers, multi-currency, automated invoicing, bank reconciliation.',
                icon: <BookOpen className="h-5 w-5 text-accent" />,
                features: [
                  'Chart of Accounts',
                  'Journal Entries',
                  'General Ledger',
                  'Financial Reports (P&L, Balance Sheet, Cash Flow)',
                ],
              },
              {
                title: 'Inventory Management',
                desc: 'Live stock levels, multi‑warehouse, barcode scanning, automated reorder points.',
                icon: <Package className="h-5 w-5 text-accent" />,
                features: [
                  'Product Catalog',
                  'Stock Transfers',
                  'Valuation (FIFO/LIFO/Avg)',
                  'Low‑Stock Alerts',
                ],
              },
              {
                title: 'Sales',
                desc: 'Pipeline management, quote‑to‑cash, automated invoicing, customer portal.',
                icon: <ShoppingCart className="h-5 w-5 text-accent" />,
                features: [
                  'Quotations & Estimates',
                  'Sales Orders',
                  'Invoices & Payments',
                  'Customer Management',
                ],
              },
              {
                title: 'Purchase Operations',
                desc: 'Vendor onboarding, purchase orders, goods receipt, supplier performance.',
                icon: <Truck className="h-5 w-5 text-accent" />,
                features: [
                  'Purchase Orders',
                  'Vendor Management',
                  'Receipts & Inspection',
                  'Payment Tracking',
                ],
              },
            ].map(({ title, desc, icon, features }) => (
              <div
                key={title}
                className="flex flex-col items-center p-6 bg-card rounded-xl border border-border/50 hover:border-border transition-colors"
              >
                <div className="mb-4 p-3 rounded bg-accent/10">{icon}</div>
                <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                <p className="mb-4 text-sm text-muted-foreground text-center">{desc}</p>
                <div className="space-y-2 text-left w-full">
                  {features.map((f) => (
                    <div key={f} className="flex items-center space-x-2 text-xs">
                      <Zap className="h-4 w-4 text-accent/50" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Modules Section – Tabs */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-center">Advanced Modules</h2>
          <div className="space-y-8">
            {/* Tab List */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                className="px-4 py-2 text-sm font-medium bg-accent/10 rounded-lg hover:bg-accent/20"
                aria-current="true"
              >
                HR &amp; Payroll
              </button>
              <button
                className="px-4 py-2 text-sm font-medium bg-transparent hover:bg-accent/10 rounded-lg"
              >
                CRM System
              </button>
              <button
                className="px-4 py-2 text-sm font-medium bg-transparent hover:bg-accent/10 rounded-lg"
              >
                Tax Optimizer &amp; Reporting
              </button>
            </div>

            {/* Tab Panels – simple show/hide (for brevity we render all; in prod use useState) */}
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {/* HR & Payroll */}
              <div className="p-6 bg-card rounded-xl border border-border/50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">HR &amp; Payroll</h3>
                    <p className="text-muted-foreground mb-4">
                      Manage employee records, track attendance, automate payroll runs,
                      stay compliant with local tax & labor laws, and empower staff with a
                      self‑service portal.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span>Employee Directory &amp; Org Chart</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span>Time Tracking &amp; Attendance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span>Payroll Processing &amp; Tax Filing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calculator className="h-4 w-4 text-accent" />
                        <span>Benefits, Deductions, Statutory Compliance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CRM */}
              <div className="p-6 bg-card rounded-xl border border-border/50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded bg-accent/10">
                    <UserCheck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">CRM System</h3>
                    <p className="text-muted-foreground mb-4">
                      Capture leads, score them by engagement, track every interaction,
                      automate follow‑ups, and forecast revenue with a visual pipeline.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span>Lead Scoring &amp; Routing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span>Interaction History &amp; Notes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4 text-accent" />
                        <span>Deal &amp; Pipeline Management</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-accent" />
                        <span>Forecasting &amp; Reporting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Optimizer & Reporting */}
              <div className="p-6 bg-card rounded-xl border border-border/50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded bg-accent/10">
                    <Calculator className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Tax Optimizer &amp; Reporting</h3>
                    <p className="text-muted-foreground mb-4">
                      One‑click financial audits, GST/VAT readiness, custom BI dashboards,
                      and deep‑dive reporting to uncover savings and improve decisions.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-accent" />
                        <span>Custom Visual Dashboards</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calculator className="h-4 w-4 text-accent" />
                        <span>Tax Savings Opportunities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-accent" />
                        <span>GST/VAT Return Preparation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span>Automated Audit Trails</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Automation illustration (alternating image/text) */}
      <section className="py-20 bg-background/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-center">Workflow Automation</h2>
          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2">
            <div>
              <Image
                src="/images/workflow.png"
                alt="Automated workflow illustration"
                width={800}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Connect events across modules—when a sales order is confirmed,
                VERP can automatically reserve inventory, create a purchase request,
                and notify the warehouse—all without manual steps.
              </p>
              <ul className="mt-4 space-y-2 text-sm pl-5 list-disc">
                <li>Order → Inventory Allocation</li>
                <li>Low Stock → Auto Purchase Request</li>
                <li>Invoice Paid → Revenue Recognition</li>
                <li>Expense → Category &amp; Tax Coding</li>
                <li>Employee Clock‑in → Payroll Input</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/5">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-2xl font-bold">See VERP in action</h2>
          <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
            Explore the live demo or download the desktop app to experience the
            full feature set.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="rounded-md px-6 py-3 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Try Free Demo
            </Link>
            <Link
              href="#downloads"
              className="rounded-md px-6 py-3 text-sm font-medium border border-accent hover:bg-accent/10"
            >
              Download Desktop App
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}