export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold">Services & Solutions</h1>
          <p className="text-muted-foreground max-w-xl">
            We don’t just sell software—we partner with you to ensure a smooth
            transition, ongoing success, and continuous improvement.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {/* Implementation & Data Migration */}
            <div className="p-6 bg-card rounded-xl border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded bg-accent/10">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Implementation &amp; Data Migration</h2>
                  <p className="text-muted-foreground mb-4">
                    Seamlessly import your existing accounting, inventory, and
                    customer data from legacy systems, spreadsheets, or CSV files—
                    with zero downtime and full data integrity.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm pl-5 list-disc">
                    <li>Data mapping &amp; transformation</li>
                    <li>Validation &amp; reconciliation</li>
                    <li>User acceptance testing</li>
                    <li>Go‑live support &amp; hypercare</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Custom Module Development */}
            <div className="p-6 bg-card rounded-xl border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded bg-accent/10">
                  <Server className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Custom Module Development</h2>
                  <p className="text-muted-foreground mb-4">
                    Need a specialized report, a unique tracking field, or an
                    industry‑specific workflow? Our team builds tailor‑made
                    modules that plug directly into VERP’s architecture.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm pl-5 list-disc">
                    <li>Requirement gathering &amp; prototyping</li>
                    <li>Secure, maintainable codebase</li>
                    <li>Automated testing &amp; QA</li>
                    <li>Documentation &amp; handover</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dedicated Training & Support */}
            <div className="p-6 bg-card rounded-xl border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Dedicated Training &amp; Support</h2>
                  <p className="text-muted-foreground mb-4">
                    From onboarding workshops to 24/7 technical assistance,
                    we make sure your team gets the most out of VERP.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm pl-5 list-disc">
                    <li>Role‑based training sessions</li>
                    <li>Self‑serve knowledge base &amp; video library</li>
                    <li>SLAs for critical incident response</li>
                    <li>Quarterly business reviews &amp; optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/5">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-2xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
            Talk to our solutions team about your migration, customization, or
            training needs.
          </p>
          <a
            href="/login"
            className="inline-block rounded-md px-6 py-3 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </main>
  );
}