'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, AlertCircle, ChevronRight } from 'lucide-react';
import VERPLogo from '@/components/verp-logo';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@verp.erp', password: 'admin123', color: 'bg-purple-500' },
  { label: 'Manager', email: 'manager@verp.erp', password: 'manager123', color: 'bg-blue-500' },
  { label: 'Accountant', email: 'accountant@verp.erp', password: 'acc123', color: 'bg-emerald-500' },
  { label: 'Sales', email: 'sales@verp.erp', password: 'sales123', color: 'bg-orange-500' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed');
        return;
      }

      // On success, redirect to dashboard (or home if you prefer)
      router.replace('/dashboard');
    } catch (err) {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-between p-12 relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.9 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0 0 / 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center shadow-lg">
            <VERPLogo className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <div className="text-sidebar-foreground font-bold text-xl tracking-tight">VERP</div>
            <div className="text-sidebar-foreground/50 text-xs uppercase tracking-widest">Enterprise ERP</div>
          </div>
        </div>

        {/* Hero */}
        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold text-sidebar-foreground leading-tight">
            Run your business<br />
            <span className="text-sidebar-primary">smarter.</span>
          </h1>
          <p className="text-sidebar-foreground/60 text-lg max-w-sm">
            Modular ERP built for SMEs. Manage accounting, inventory, sales, HR, and more — in one unified platform.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {[
              { label: 'Modules', value: '7+' },
              { label: 'Users', value: 'Unlimited' },
              { label: 'Companies', value: 'Multi' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-sidebar-accent rounded-xl p-4">
                <div className="text-sidebar-primary font-bold text-2xl">{stat.value}</div>
                <div className="text-sidebar-foreground/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="relative text-sidebar-foreground/30 text-sm">
            © 2026 VERP ERP. All rights reserved.
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <VERPLogo className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">VERP ERP</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Welcome back</h2>
              <p className="text-muted-foreground mt-1">Sign in to your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
                {!loading && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </form>

            {/* Demo accounts */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">Demo accounts</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.label}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 hover:bg-muted transition-colors text-left"
                  >
                    <div className={`w-6 h-6 rounded-md ${acc.color} flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{acc.label[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{acc.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{acc.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}