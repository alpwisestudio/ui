'use client';

import { useSyncExternalStore } from 'react';
import { cx } from './primitives.js';

export type Theme = 'dark' | 'light';

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'dark', label: 'Scuro' },
  { value: 'light', label: 'Chiaro' },
];

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/**
 * Scelta del tema delle app (Alpwise book, staff): "Scuro" e "Chiaro" affiancati, quello attivo in azzurro.
 * Mette `data-theme` su <html> e salva la scelta in localStorage sotto `storageKey`, la stessa chiave che legge lo
 * script inline dell'app prima del primo paint. Va nella login (in alto a destra) e in fondo alla sidebar.
 */
export function ThemeToggle({ storageKey, className }: { storageKey: string; className?: string }) {
  // Sul server nessun bottone è premuto: il tema vero si conosce solo nel browser.
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);
  const choose = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // Storage non disponibile (navigazione privata): il tema vale solo per questa pagina.
    }
  };
  return (
    <div className={cx('al-theme', className)} role="group" aria-label="Tema">
      {OPTIONS.map((o) => (
        <button key={o.value} type="button" aria-pressed={theme === o.value} onClick={() => choose(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
