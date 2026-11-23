'use client';

import {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cx, Icon, Logo } from './primitives.js';

/**
 * Logo di un prodotto Alpwise: il lettering originale "Alpwise" (mai ridisegnato con un font) e il nome del prodotto
 * accanto in Host Grotesk 500, maiuscolo spaziato: "BOOK", "STAFF", "QUOTA". Proporzioni del logo di staff: nome alto
 * 30/84 del lettering, spaziatura .12em, distanza 24/84, sulla linea di base del lettering. Nero su chiaro, bianco su scuro.
 */
export function ProductLogo({ product, size = 22, label, className }: {
  /** Il nome accanto al lettering, scritto come va letto: "Book", "Staff". */
  product: string;
  size?: number;
  /** Nome per i lettori di schermo. Default: "Alpwise " + product in minuscolo ("Alpwise book"). */
  label?: string;
  className?: string;
}) {
  return (
    <span className={cx('al-product-logo', className)} style={{ '--al-logo-h': `${size}px` } as CSSProperties}
      role="img" aria-label={label ?? `Alpwise ${product.toLowerCase()}`}>
      <Logo size={size} lockup="nav" />
      <span className="al-product-logo-name" aria-hidden="true">{product.toUpperCase()}</span>
    </span>
  );
}

/** Link usato dalla sidebar: `a` di default, oppure il Link del framework (next/link) via `linkAs`. */
export type SidebarLinkComponent = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;

/**
 * Cornice delle app Alpwise (Alpwise book, staff): sidebar a sinistra con logo, sezioni e account in fondo; contenuto a
 * destra. Da 1024px la sidebar è sempre lì; sotto è un cassetto che entra da sinistra, aperto dalla barra in alto
 * (Esc, il velo o un cambio di pagina lo chiudono, e la pagina sotto non scorre).
 */
export function AppShell({ brand, sidebar, footer, children, closeKey, label = 'Menu', id = 'sidebar', className }: {
  /** Logo con il suo link: compare nella barra in alto su mobile e in cima alla sidebar. */
  brand: ReactNode;
  /** Gruppi e voci: SidebarGroup, SidebarNav o contenuti propri (il selettore del locale in Alpwise book). */
  sidebar: ReactNode;
  /** In fondo alla sidebar: SidebarAccount, tema, esci. */
  footer?: ReactNode;
  children: ReactNode;
  /** Quando cambia, il cassetto si chiude: di solito il percorso della pagina. */
  closeKey?: string;
  /** Nome della sidebar per i lettori di schermo. */
  label?: string;
  id?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(closeKey);
  useScrollLock(open);

  // Una pagina nuova chiude il cassetto (stato aggiornato durante il render, non in un effetto).
  if (openedAt !== closeKey) {
    setOpenedAt(closeKey);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className={cx('al-shell', className)}>
      <div className="al-shell-top">
        {brand}
        <button type="button" className="al-shell-menu" aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </div>
      <aside id={id} aria-label={label} className={cx('al-side', open && 'is-open')}>
        <div className="al-side-brand">{brand}</div>
        <div className="al-side-body">{sidebar}</div>
        {footer && <div className="al-side-foot">{footer}</div>}
      </aside>
      <div className={cx('al-shell-scrim', open && 'is-open')} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="al-shell-content">{children}</div>
    </div>
  );
}

/** Gruppo della sidebar: l'etichetta ("Servizio", "Vendite") con la riga fino al bordo, poi le voci. */
export function SidebarGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="al-side-group">
      <p className="al-side-label"><span>{label}</span></p>
      {children}
    </div>
  );
}

export type SidebarItem = {
  href: string;
  label: string;
  /** Icona a 18px, tratto sottile: Icon del kit o un'icona propria. */
  icon?: ReactNode;
  /** La pagina aperta: azzurro a sinistra e aria-current="page". */
  current?: boolean;
  /** Numero accanto alla voce (prenotazioni di oggi, lead da richiamare). 0 o null: niente numero. */
  count?: number | null;
  /** La frase del numero per i lettori di schermo: "3 da chiamare oggi". */
  countLabel?: string;
  /** Sezione non ancora pronta: voce spenta con "Presto", senza link. */
  soon?: boolean;
};

/** Voci della sidebar in un `nav`: icona, testo, numero. `linkAs` per il Link del framework (next/link). */
export function SidebarNav({ items, label, linkAs: A = 'a' as unknown as SidebarLinkComponent }: {
  items: SidebarItem[];
  /** Nome del nav per i lettori di schermo ("Portale", "Sezioni"). */
  label: string;
  linkAs?: SidebarLinkComponent;
}) {
  return (
    <nav className="al-side-nav" aria-label={label}>
      <ul>
        {items.map((it) => {
          const body = (
            <>
              {it.icon && <span className="al-side-icon">{it.icon}</span>}
              <span className="al-side-text">{it.label}</span>
              {it.soon ? <span className="al-side-soon">Presto</span> : it.count ? (
                <span className="al-side-count">
                  <span aria-hidden="true">{it.count}</span>
                  <span className="sr-only">, {it.countLabel ?? it.count}</span>
                </span>
              ) : null}
            </>
          );
          return (
            <li key={it.href}>
              {it.soon
                ? <span className="al-side-item is-soon">{body}</span>
                : <A className="al-side-item" href={it.href} aria-current={it.current ? 'page' : undefined}>{body}</A>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Iniziali di un nome ("Marco Rossi" → "MR"), o la prima lettera dell'email. */
export function initials(name: string | null | undefined, email = '') {
  const parts = (name ?? '').split(/\s+/).filter(Boolean);
  if (parts.length) return parts.slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');
  return (email[0] ?? '?').toUpperCase();
}

/** Account in fondo alla sidebar: iniziali nel quadrato, "Nome · Ruolo" e l'email sotto. */
export function SidebarAccount({ name, email, role }: { name?: string | null; email: string; role?: string }) {
  const title = [name, role].filter(Boolean).join(' · ');
  return (
    <div className="al-account">
      <span className="al-account-sq" aria-hidden="true">{initials(name, email)}</span>
      <span className="al-account-text">
        <span className="al-account-name">{title || email}</span>
        {title && <span className="al-account-email">{email}</span>}
      </span>
    </div>
  );
}

/** Strumenti in fondo alla sidebar, su una riga: tema a sinistra, Esci a destra. */
export function SidebarTools({ children }: { children: ReactNode }) {
  return <div className="al-side-tools">{children}</div>;
}

const MOBILE = '(max-width: 1023.98px)';
let locks = 0;
let saved: { html: string; body: string; overscroll: string } | null = null;

/** Su mobile, finché `active` è vero, la pagina sotto il cassetto non scorre. Da 1024px non fa niente. */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || !matchMedia(MOBILE).matches) return;
    const html = document.documentElement;
    if (locks === 0) {
      saved = { html: html.style.overflow, body: document.body.style.overflow, overscroll: html.style.overscrollBehavior };
      html.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'none';
    }
    locks++;
    return () => {
      locks--;
      if (locks === 0 && saved) {
        html.style.overflow = saved.html;
        document.body.style.overflow = saved.body;
        html.style.overscrollBehavior = saved.overscroll;
        saved = null;
      }
    };
  }, [active]);
}
