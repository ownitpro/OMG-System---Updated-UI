'use client';
import { type AudienceTab } from '@/config/pricing/registry';
import { useId, useRef, useEffect, useState } from 'react';

type Props = { value: AudienceTab; onChange: (v: AudienceTab) => void };

export default function Tabs({ value, onChange }: Props) {
  const tablistId = useId();
  const tabDescId = `${tablistId}-desc`;
  const liveRegionId = `${tablistId}-live`;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [announcement, setAnnouncement] = useState('');

  const tabs: { id: AudienceTab; label: string }[] = [
    { id: 'personal', label: 'Personal' },
    { id: 'business', label: 'Business' },
  ];
  const currentIdx = tabs.findIndex(t => t.id === value);

  useEffect(() => {
    tabRefs.current[currentIdx]?.focus();
    setAnnouncement(`${tabs[currentIdx].label} plans selected`);
  }, [currentIdx]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    let nextIdx = currentIdx;
    switch (e.key) {
      case 'ArrowRight': nextIdx = (currentIdx + 1) % tabs.length; break;
      case 'ArrowLeft': nextIdx = (currentIdx - 1 + tabs.length) % tabs.length; break;
      case 'Home': nextIdx = 0; break;
      case 'End': nextIdx = tabs.length - 1; break;
      default: return;
    }
    e.preventDefault();
    onChange(tabs[nextIdx].id);
  }

  return (
    <div className="inline-flex flex-col items-start">
      <p id={tabDescId} className="sr-only">
        Choose Personal or Business plans. Use left/right arrows, Home, or End.
      </p>
      <div id={liveRegionId} role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <div
        role="tablist"
        aria-label="Choose plan type"
        aria-describedby={tabDescId}
        id={tablistId}
        onKeyDown={onKeyDown}
        className="inline-flex rounded-xl bg-muted p-1"
      >
        {tabs.map((t, idx) => {
          const selected = t.id === value;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              ref={el => (tabRefs.current[idx] = el)}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(t.id)}
              className={`px-4 py-2 rounded-lg font-semibold focus-visible:outline outline-2 outline-blue-600 transition-all
                ${selected ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-muted/80'}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

