'use client';

import Link from 'next/link';
import {
  Sunset,
  Users,
  Package,
  Shield,
  Code,
  Building2,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto flex flex-col items-center px-4 py-8 sm:px-6 lg:px-12">
        {/* Logo */}
        <div className="mb-6 flex items-center space-x-2">
          <a href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-foreground">VERP</span>
          </a>
          <p className="text-xs text-muted-foreground">Cross‑Platform ERP</p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Sitemap</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/downloads">Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product Modules</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Accounting</li>
              <li>Inventory</li>
              <li>Sales</li>
              <li>Purchase</li>
              <li>HR &amp; Payroll</li>
              <li>CRM</li>
              <li>Reporting</li>
              <li>Tax Optimizer</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Download Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/downloads#windows">Windows (.exe/msi)</Link></li>
              <li><Link href="/downloads#macos">macOS (.dmg/pkg)</Link></li>
              <li><Link href="/downloads#linux">Linux (.AppImage/.deb)</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
            {/* Placeholder social icons */}
            <div className="mt-4 flex space-x-3">
              <a href="#" aria-label="Twitter" className="h-5 w-5">
                <Sunset className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="h-5 w-5">
                <Code className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VERP ERP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}