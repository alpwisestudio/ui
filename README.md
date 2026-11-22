# @alpwisestudio/ui

Design system di Alpwise Studio, pubblicato su npm ([`@alpwisestudio/ui`](https://www.npmjs.com/package/@alpwisestudio/ui)): token CSS (tema Scuro e Chiaro), componenti React, preset per Tailwind v3 e tema per Tailwind v4.

Componenti e stili vengono da `alpwise-portfolio` (`src/components/alpwise`, `src/styles`) e ne riproducono la resa: lo stesso markup dà gli stessi stili calcolati nei due temi.

## Contenuto

| Import | Cosa contiene |
|---|---|
| `@alpwisestudio/ui` | Componenti React: `Button`, `Tag`, `Chip`, `Hl`, `Icon`, `Logo`, `Kicker`, `Photo`, `Glass`, `Sq`, `Input`, `Field`, `Checkbox`, `Card`, `Stats`, `Tree`, `Table`, `Accordion`, `Navbar`, `Footer`, `Modal`, `Toast`, `ToastRegion`, `Head`, `Hero`, `Services`, `CaseStudy`, `Testimonial`, `CTA`, `Contact`, `cx` |
| `@alpwisestudio/ui/styles.css` | Tutto: font, token, componenti, movimento |
| `@alpwisestudio/ui/tokens.css` | Solo le variabili CSS dei due temi |
| `@alpwisestudio/ui/fonts.css` | `@font-face` di Host Grotesk (300–600), l'unico font, file inclusi |
| `@alpwisestudio/ui/components.css` | Classi `al-*` dei componenti |
| `@alpwisestudio/ui/motion.css` | Keyframe e classi di animazione (`.is-armed`, `.is-play`, `data-m="…"`) |
| `@alpwisestudio/ui/tailwind-preset` | Preset Tailwind v3 |
| `@alpwisestudio/ui/theme.css` | Tema Tailwind v4 |

React (≥ 18) è una peer dependency. I componenti con stato o hook (`form`, `layout`, `feedback`, `sections`) hanno `'use client'`; gli altri (`Button`, `Card`, `Table`…) restano utilizzabili nei Server Components di Next.js App Router.

## Installazione

Il pacchetto è pubblico su npmjs.com: non servono token né `.npmrc`.

```bash
npm install @alpwisestudio/ui
```

## Uso

```tsx
// app/layout.tsx (Next.js) o main.tsx (Vite)
import '@alpwisestudio/ui/styles.css';

import { Button, Hero, Navbar } from '@alpwisestudio/ui';

export default function Page() {
  return <Button arrow href="/contatti">Parliamone</Button>;
}
```

## Tailwind v3

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import alpwise from '@alpwisestudio/ui/tailwind-preset';

export default {
  presets: [alpwise],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
```

Con una config CommonJS: `presets: [require('@alpwisestudio/ui/tailwind-preset')]`.

Ordine dei CSS, come nel portfolio: prima `@alpwisestudio/ui/styles.css`, poi il file con `@tailwind base; @tailwind components; @tailwind utilities;`. Non serve aggiungere il pacchetto a `content`: i componenti usano le classi `al-*`, non utility Tailwind.

## Tailwind v4

```css
/* app/globals.css */
@import "tailwindcss";
@import "@alpwisestudio/ui/styles.css" layer(components);
@import "@alpwisestudio/ui/theme.css";
```

`layer(components)` mette le classi `al-*` sopra il Preflight e sotto le utility: `className="al-btn w-full"` funziona come ci si aspetta. `theme.css` definisce anche la variante `dark:` su `data-theme="dark"`.

## Utility

Preset v3 e `theme.css` v4 generano le stesse classi, tutte riferite alle variabili dei token:

- Colori: `bg-night`, `bg-glass`, `border-glass-line`, `bg-bg`, `bg-surface`, `bg-surface-raised`, `bg-surface-sunken`, `border-line`, `border-line-grid`, `border-line-strong`, `text-ink`, `text-ink-muted`, `text-ink-subtle`, `bg-primary`, `hover:bg-primary-hover`, `bg-primary-soft`, `text-primary-fg`, `bg-inverse`, `text-inverse-fg`, `text-link`, `outline-focus`, `text-success`, `text-warning`, `text-danger`, `bg-mist`, `sky-100…800`
- Testo: `font-sans`, `font-mono`, `text-display-xl`, `text-display-lg`, `text-h1`…`text-h4`, `text-lead`, `text-body`, `text-body-sm`, `text-label`, `text-kicker`, `text-mono-label`, `text-mono-sm`, `text-mono-data` (i `mono-*` sono in Host Grotesk: aggiungi `tabular-nums` ai numeri)
- Altro: `rounded-none`, `rounded-xs`, `rounded-sm`, `max-w-container`, `shadow-overlay`, `bg-horizon`, `bg-photo-scrim`, `backdrop-blur-glass`, `z-nav`, `z-modal`, `z-toast`, `duration-fast|base|slow|epic`, `ease-out`, `ease-in-out`

## Foto e vetro

Un solo font (Host Grotesk), fondo Notte (`--night`), foto a tutta larghezza con il vetro sopra.

```tsx
import { Button, Field, Glass, Hero, Input, Kicker, Photo } from '@alpwisestudio/ui';

<Hero image={{ src: '/photos/lago.jpg' }} kicker="Consulenza digitale per PMI" title="…"
  primary={{ href: '/contatti', label: 'Prenota 30 minuti' }} secondary={{ href: '#metodo', label: 'Come lavoriamo' }} />

<Photo image={{ src: '/photos/sentiero.jpg' }} tone="soft">
  <Glass as="form" className="al-form">
    <Kicker>Oppure lascia due righe</Kicker>
    <Field label="Nome"><Input name="name" /></Field>
    <Button variant="glass">Secondaria</Button>
  </Glass>
</Photo>
```

- `Photo` è sempre scura (velo dal Notte al blu notte, 12 colonne hairline), uguale nei due temi, testo bianco. `tone`: `top` (aperture), `soft` (pannelli), `mid` (sezioni interne). Con next/image metti come primo figlio un'immagine con classe `al-photo-img`.
- `Glass` ridefinisce i token al suo interno: campi, etichette, errori e checkbox diventano chiari e semitrasparenti. Mai campi neri sul vetro.
- `Button variant="glass"` è il secondario sopra le foto; sopra fondi normali usa `outline`.
- Etichette (`Kicker`) in Host Grotesk 500, frase normale, senza barra finale. Numeri, orari e date con `tabular-nums` (`.al-data`, `.al-num-tab`).

## Temi

Scuro è il default. Per il Chiaro metti `data-theme="light"` su `<html>`:

```html
<html lang="it" data-theme="light">
```

L'attributo funziona anche su un contenitore, per mostrare una sezione nell'altro tema:

```tsx
<section data-theme="light">…</section>
```

Per seguire il sistema operativo, imposta l'attributo prima del primo paint:

```html
<script>
  document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
</script>
```

## Override dei token

I token stanno in `@layer alpwise-tokens`: qualunque regola scritta fuori da un layer li sovrascrive, indipendentemente dall'ordine degli import.

```css
/* Vale per entrambi i temi */
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --container-max: 1200px;
}

/* Solo Scuro */
:root:not([data-theme="light"]), [data-theme="dark"] {
  --surface: #0d0f14;
}

/* Solo Chiaro */
[data-theme="light"] {
  --surface-sunken: #f7f8fa;
}
```

Per il prodotto di un cliente si cambia la scala `sky-*` (e quindi `primary`) verificando che `on-primary` resti ≥ 4.5:1:

```css
:root {
  --sky-700: #7a3cff;
  --sky-800: #5f22e6;
  --sky-400: #b598ff;
}
```

Orizzonte (`--horizon`) e wordmark restano di Alpwise Studio. Le utility Tailwind leggono le stesse variabili, quindi seguono gli override senza altre modifiche.

## Sviluppo

```bash
npm install
npm run dev          # anteprima su http://localhost:5180, tutti i componenti in Scuro e Chiaro
npm run build        # dist/: ESM + .d.ts (tsup)
npm run typecheck
```

L'anteprima (`preview/`) importa i sorgenti direttamente e usa Tailwind v4 con `theme.css`.

Gli stili in `styles/` sono quelli del portfolio. Se cambi un token o una classe `al-*`, cambiali qui e nel portfolio (o fai usare `@alpwisestudio/ui` al portfolio), così le due cose non divergono.

## Rilasci

Le versioni sono gestite con [Changesets](https://github.com/changesets/changesets).

1. Per ogni modifica da pubblicare: `npm run changeset`, scegli patch/minor/major e descrivi la modifica. Committa il file in `.changeset/`.
2. Al push su `main`, la GitHub Action `Release` apre (o aggiorna) la PR **"chore: version packages"** con versione e CHANGELOG aggiornati.
3. Quando unisci quella PR, la stessa Action builda e pubblica su npmjs.com.

Serve una volta sola:

- **Settings → Actions → General → Workflow permissions** su "Read and write" e "Allow GitHub Actions to create and approve pull requests" (per la PR di versione).
- Su npmjs.com, nel pacchetto `@alpwisestudio/ui` → **Settings → Trusted publishing**: publisher GitHub Actions, organization `alpwisestudio`, repository `ui`, workflow `release.yml`, environment vuoto. La Action pubblica con l'OIDC di GitHub (`id-token: write`), senza token npm salvati, e il pacchetto riceve la provenance.
- Dopo il primo rilascio riuscito, in **Settings → Publishing access** scegli "Require two-factor authentication and disallow tokens": restano possibili solo la Action e la pubblicazione a mano con 2FA.

## Licenza

Codice, token e componenti sono proprietari di Alpwise Studio (vedi `LICENSE`): il pacchetto è pubblico su npm per comodità di installazione, non per il riuso. Il font in `fonts/` (Host Grotesk) è sotto SIL Open Font License 1.1, con i testi in `fonts/OFL-*.txt`.
