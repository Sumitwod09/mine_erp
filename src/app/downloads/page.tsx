import Link from 'next/link';
import {
  Window,
  Apple,
  Linux,
  ArrowRight,
} from 'lucide-react';

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold">Download VERP Desktop App</h1>
          <p className="text-muted-foreground max-w-xl">
            Choose your platform below. All bundles are code‑signed and regularly
            updated.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {/* Windows */}
            <div className="p-6 bg-card rounded-xl border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded bg-accent/10">
                  <Window className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Windows</h2>
                  <p className="text-muted-foreground mb-4">
                    Installer (.exe / .msi) – 64‑bit
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>Version: <span id="win-version">v1.0.0</span></li>
                    <li>Size: ~120 MB</li>
                    <li>Requirements: Windows 10 / 11 (64‑bit)</li>
                  </ul>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded"
                  >
                    Download Windows
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* macOS */}
            <div className="p-6 bg-card rounded-xl border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded bg-accent/10">
                  <Apple className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">macOS</h2>
                  <p className="text-muted-foreground mb-4">
                    Disk Image (.dmg) / Package (.pkg) – Apple Silicon &amp; Intel
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>Version: <span id="mac-version">v1.0.0</span></li>
                    <li>Size: ~130 MB</li>
                    <li>Requirements: macOS 12+ (Monterey) or later</li>
                  </ul>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded"
                  >
                    Download macOS
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Linux */}
            <div className="p-6 bg-card rounded-xl border border-border/50">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded bg-accent/10">
                  <Linux className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Linux</h2>
                  <p className="text-muted-foreground mb-4">
                    AppImage and Debian package (.deb) – x86_64
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>Version: <span id="linux-version">v1.0.0</span></li>
                    <li>Size: ~110 MB</li>
                    <li>Requirements: glibc 2.28+, systemd</li>
                  </ul>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded"
                  >
                    Download Linux
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            <strong>Note:</strong> The download links above are placeholders.
            Replace them with the actual URLs to your hosted binaries before
            publishing.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Desktop app updates are delivered via the built‑in auto‑updater
            (Tauri) – users receive prompts when a new version is available.
          </p>
        </div>
      </section>
    </main>
  );
}