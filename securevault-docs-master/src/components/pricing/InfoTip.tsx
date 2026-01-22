'use client';
import { useId, useState, useEffect, useRef } from 'react';

export default function InfoTip({ note }: { note: string }) {
  const tipId = useId();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={buttonRef}
        type="button"
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold
                   bg-muted text-muted-foreground hover:bg-muted/80 focus-visible:outline outline-2 outline-blue-600 transition-colors"
        aria-label="More info"
      >
        i
      </button>

      {open && (
        <div
          role="tooltip"
          id={tipId}
          className="absolute z-20 -left-2 top-6 min-w-[14rem] max-w-xs rounded-md border border-border bg-background
                     px-3 py-2 text-xs text-foreground shadow-lg animate-fade-in"
        >
          {note}
          <div className="absolute -top-1 left-3 w-2 h-2 bg-background border-l border-t border-border rotate-45" />
        </div>
      )}
    </span>
  );
}

