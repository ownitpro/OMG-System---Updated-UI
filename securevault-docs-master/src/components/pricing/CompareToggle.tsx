'use client';

type Props = { enabled: boolean; onChange: (v: boolean) => void };

export default function CompareToggle({ enabled, onChange }: Props) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      onChange(!enabled);
    }
  }

  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold focus-visible:outline outline-2 outline-blue-600 transition-all
        ${enabled ? 'bg-blue-600 text-white' : 'bg-muted text-foreground hover:bg-muted/80'}`}
      aria-label={`${enabled ? 'Hide' : 'Show'} plan comparison table. Keyboard shortcut: Alt+C`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="5" height="2" fill="currentColor" rx="1" />
        <rect x="2" y="7" width="5" height="2" fill="currentColor" rx="1" />
        <rect x="2" y="12" width="5" height="2" fill="currentColor" rx="1" />
        <rect x="9" y="2" width="5" height="2" fill="currentColor" rx="1" />
        <rect x="9" y="7" width="5" height="2" fill="currentColor" rx="1" />
        <rect x="9" y="12" width="5" height="2" fill="currentColor" rx="1" />
      </svg>
      <span>{enabled ? 'Hide comparison' : 'Compare plans'}</span>
    </button>
  );
}

