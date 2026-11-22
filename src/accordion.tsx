'use client';

import { useId, useState, type ReactNode } from 'react';
import { cx, Sq } from './primitives.js';

/**
 * Domande che si aprono una alla volta: aprirne una chiude quella aperta.
 * Il pannello scorre in altezza (grid-template-rows 0fr → 1fr) e la risposta sale in dissolvenza.
 * Bottone con aria-expanded e aria-controls; il pannello chiuso è inert, quindi fuori dal Tab.
 */
export function Accordion({ items, openFirst, size = 'md', headingLevel = 3 }: {
  items: { q: string; a: ReactNode }[];
  openFirst?: boolean;
  size?: 'md' | 'lg';
  /** Livello del titolo che contiene ogni bottone. */
  headingLevel?: 2 | 3 | 4;
}) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);
  const id = useId();
  const H = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  return (
    <div className={cx('al-acc', size === 'lg' && 'al-acc-lg')}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const bid = `${id}-b${i}`, pid = `${id}-p${i}`;
        return (
          <div key={it.q} className={cx('al-acc-item', isOpen && 'is-open')}>
            <H className="al-acc-h">
              <button type="button" id={bid} className="al-acc-btn" aria-expanded={isOpen} aria-controls={pid} onClick={() => setOpen(isOpen ? null : i)}>
                {size === 'lg' ? (
                  <>
                    <span className="al-acc-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="al-acc-q">{it.q}</span>
                    <span className="al-acc-sign" aria-hidden="true" />
                  </>
                ) : (
                  <><span className="al-acc-q">{it.q}</span><Sq>+</Sq></>
                )}
              </button>
            </H>
            <div id={pid} role="region" aria-labelledby={bid} className="al-acc-panel" inert={!isOpen}>
              <div className="al-acc-inner"><div className="al-acc-a">{it.a}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
