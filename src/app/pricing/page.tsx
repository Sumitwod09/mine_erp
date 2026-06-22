'use client';

import { useState } from 'react';
import PricingToggle from '@/components/ui/pricing-toggle';
import {
  Calendar,
  Users,
  Shield,
  Diamond,
  Server,
} from 'lucide-react';

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  // Price definitions
  const plans = [
    {
      name: 'Starter',
      priceMonthly: 0,
      priceAnnual: 0,
      popular: false,
      features: [
        'Accounting',
        'Inventory',
        'Sales',
        'Purchase',
        '2 Users',
        '1 Company Profile',
        'Email Support',
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/login',
      variant: 'outline',
    },
    {
      name: 'Professional',
      priceMonthly: 29,
      priceAnnual: 29 * 12 * 0.8, // 20% discount
      popular: true,
      features: [
        'Everything in Starter',
        'HR &amp; Payroll',
        'CRM System',
        'Advanced Reporting',
        'Tax Optimizer',
        '15 Users',
        'Priority Support',
        'API Access',
      ],
      ctaText: 'Upgrade to Pro',
      ctaHref: '/login', // In a real app this would go to a checkout/payment flow
      variant: 'filled',
    },
    {
      name: 'Enterprise',
      priceMonthly: null, // custom
      priceAnnual: null,
      popular: false,
      features: [
        'Unlimited Users',
        'Custom Module Development',
        'Dedicated Account Manager',
        'SSO Integrations',
        '99.9% Uptime SLA',
        'Advanced Security &amp; Auditing',
        'On‑Premise or Private Cloud Options',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '#contact-modal',
      variant: 'outline',
    },
  ];

  const getPrice = (plan: typeof plans[0]) =>
    billing === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  const getPeriod = () => (billing === 'annual' ? '/yr' : '/mo');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-xl">
            Choose the plan that fits your team. All prices are billed
            {billing === 'monthly' ? 'monthly' : 'annually'}—annual plans save 20%.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <PricingToggle
            value={billing}
            onChange={setBilling}
            labels={{ monthly: 'Monthly', annual: 'Annual' }}
            />
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={[
                  'flex flex-col items-center p-6 bg-card rounded-xl border border-border/50',
                  plan.popular
                    ? 'ring-2 ring-accent/50' // highlight most popular
                    : '',
                  plan.variant === 'filled'
                    ? 'bg-accent/5'
                    : '',
                ].join(' ')}
              >
                {/* Header with badge if popular */}
                <div className="flex w-full items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.popular && (
                    <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6 text-center">
                  {plan.priceMonthly === null ? (
                    <>
                      <p className="text-2xl font-bold text-muted-foreground">Custom</p>
                      <p className="text-xs text-muted-foreground">Contact us for a quote</p>
                    </>
                  ) : (
                    <>
                      <p className="text-3xl font-extrabold">
                        ${getPrice(plan)}{' '}
                        <span className="text-sm font-normal opacity-70">
                          {getPeriod()}
                        </span>
                      </p>
                      {billing === 'annual' && plan.priceMonthly !== null && (
                        <p className="text-xs text-muted-foreground mt-1">
                          (${plan.priceMonthly}/mo)
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 text-left w-full">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center space-x-2 text-sm">
                      {f.startsWith('<') ? (
                        <> {/* HTML entities like &amp; – we render as text for safety */}</>
                      ) : (
                        <>
                          <Users className="h-4 w-4 text-accent/50" />
                          <span>{f}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaHref}
                  className={[
                    'w-full mt-6 rounded-md px-5 py-2 text-sm font-medium',
                    plan.variant === 'filled'
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'border border-accent hover:bg-accent/5',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  ].join(' ')}
                >
                  {plan.ctaText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Fine Print (optional) */}
      <section className="py-12 bg-background/50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <strong>What happens if I outgrow the Starter plan?</strong>
              <p className="mt-2">
                You can upgrade at any time—your data and settings move with you.
                Just go to the Pricing page or contact support.
              </p>
            </div>
            <div>
              <strong>Is there a free trial for Professional?</strong>
              <p className="mt-2">
                Yes! Sign up for Starter, then click “Upgrade to Pro” to start a
                14‑day free trial (no credit card required).
              </p>
            </div>
            <div>
              <strong>Can I cancel anytime?</strong>
              <p className="mt-2">
                Absolutely. Both Starter and Professional plans are month‑to‑month
                (or annual if you chose that billing). Cancel from your account
                settings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}