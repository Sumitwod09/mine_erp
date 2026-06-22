'use client';

import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface PricingToggleProps {
  value: 'monthly' | 'annual';
  onChange: (v: 'monthly' | 'annual') => void;
  labels: {
    monthly: string;
    annual: string;
  };
}

export default function PricingToggle({
  value,
  onChange,
  labels,
}: PricingToggleProps) {
  return (
    <div className="inline-flex items-center justify-center w-[120px] h-[36px] rounded-full bg-muted/50">
      <div
        className={[
          'flex-1 flex items-center justify-center rounded-lg',
          value === 'monthly'
            ? 'bg-white ring-1 ring-border'
            : 'bg-transparent',
          'transition-all duration-200',
        ].join(' ')}
        onClick={() => onChange('monthly')}
      >
        <span className="text-sm font-medium text-foreground">{labels.monthly}</span>
      </div>
      <div
        className={[
          'flex-1 flex items-center justify-center rounded-lg',
          value === 'annual'
            ? 'bg-white ring-1 ring-border'
            : 'bg-transparent',
          'transition-all duration-200',
        ].join(' ')}
        onClick={() => onChange('annual')}
      >
        <span className="text-sm font-medium text-foreground">{labels.annual}</span>
      </div>
    </div>
  );
}