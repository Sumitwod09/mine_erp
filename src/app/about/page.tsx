export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold">About VERP</h1>
          <p className="text-muted-foreground max-w-xl">
            Learn why we built VERP and the technology that powers it.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Our Vision */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                Traditional ERPs are notoriously clunky, rigid, and hard to navigate.
                VERP was engineered from the ground up to bring sleek consumer‑grade
                UX to robust corporate logistics—so you spend less time fighting the
                software and more time growing your business.
              </p>
            </div>

            {/* The Tech Infrastructure Summary */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Tech Infrastructure</h2>
              <p className="text-muted-foreground">
                Built on Next.js 15, React 19, and Tauri for a true cross‑platform
                experience. Real‑time data sync via WebSockets, optimistic UI updates,
                and a modular plugin architecture let you add or remove features
                without touching the core.
              </p>
              <ul className="mt-4 space-y-2 text-sm pl-5 list-disc">
                <li><strong>Framework:</strong> Next.js 15 (App Router) + React 19</li>
                <li><strong>Desktop Wrapper:</strong> Tauri (Rust‑based, low‑overhead)</li>
                <li><strong>State Management:</strong> React Context + custom hooks</li>
                <li><strong>UI Library:</strong> Shadcn/ui (Radix primitives) + Tailwind CSS</li>
                <li><strong>Charts:</strong> Recharts for interactive data viz</li>
                <li><strong>Forms:</strong> React Hook Form + Zod validation</li>
                <li><strong>Notifications:</strong> Sonner toast system</li>
                <li><strong>Theme &amp; Dark Mode:</strong> next‑themes with custom zinc/slate palette</li>
                <li><strong>Internationalization:</strong> date‑fns for dates, numbers, currency</li>
                <li><strong>Build Tooling:</strong> ESLint, Prettier, TypeScript strict mode</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/5">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-2xl font-bold">Join the VERP community</h2>
          <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
            Start free, explore the features, and see how VERP can transform the way
            you work.
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