'use client';
import { type Cadence } from '@/config/pricing/registry';
import { useId } from 'react';

type Props = { value: Cadence; onChange: (v: Cadence) => void };

export default function BillingToggle({ value, onChange }: Props) {
  const groupId = useId();
  const isAnnual = value === 'annual';

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.altKey) {
      if (e.key.toLowerCase() === 'm') { e.preventDefault(); onChange('monthly'); }
      if (e.key.toLowerCase() === 'a') { e.preventDefault(); onChange('annual'); }
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-3">
        <div
          className="inline-flex rounded-xl bg-muted p-1"
          role="radiogroup"
          aria-label="Billing cycle"
          aria-describedby={`${groupId}-hint`}
          onKeyDown={onKeyDown}
        >
          {(['monthly', 'annual'] as Cadence[]).map((cycle) => {
            const checked = value === cycle;
            return (
              <label
                key={cycle}
                className={`px-3 py-2 rounded-lg cursor-pointer transition-all
                  ${checked ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-muted/80'}`}
              >
                <input
                  type="radio"
                  name={groupId}
                  value={cycle}
                  checked={checked}
                  onChange={() => onChange(cycle)}
                  className="sr-only"
                />
                {cycle === 'monthly' ? 'Monthly' : 'Annual'}
              </label>
            );
          })}
        </div>
        {isAnnual && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 animate-fade-in"
            aria-live="polite"
          >
            Save 10%
          </span>
        )}
      </div>
      <span className="text-xs text-muted-foreground">Keyboard: Alt+M for Monthly, Alt+A for Annual</span>
      <span id={`${groupId}-hint`} className="sr-only">
        Press Alt plus M for Monthly or Alt plus A for Annual.
      </span>
    </div>
  );
}

