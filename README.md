# @alpwise/ui

Design system di Alpwise Studio come pacchetto privato su GitHub Packages: token CSS (tema Scuro e Chiaro), componenti React, preset per Tailwind v3 e tema per Tailwind v4.

Componenti e stili vengono da `alpwise-portfolio` (`src/components/alpwise`, `src/styles`) e ne riproducono la resa: lo stesso markup dà gli stessi stili calcolati nei due temi.

## Contenuto

| Import | Cosa contiene |
|---|---|
| `@alpwise/ui` | Componenti React: `Button`, `Tag`, `Chip`, `Hl`, `Icon`, `Logo`, `Mono`, `Sq`, `Input`, `Field`, `Checkbox`, `Card`, `Stats`, `Tree`, `Table`, `Accordion`, `Navbar`, `Footer`, `Modal`, `Toast`, `ToastRegion`, `Head`, `Hero`, `Services`, `CaseStudy`, `Testimonial`, `CTA`, `Contact`, `cx` |
| `@alpwise/ui/styles.css` | Tutto: font, token, componenti, movimento |
| `@alpwise/ui/tokens.css` | Solo le variabili CSS dei due temi |
| `@alpwise/ui/fonts.css` | `@font-face` di Host Grotesk (300–600) e DM Mono (400–500), file inclusi |
| `@alpwise/ui/components.css` | Classi `al-*` dei componenti |
| `@alpwise/ui/motion.css` | Keyframe e classi di animazione (`.is-armed`, `.is-play`, `data-m="…"`) |
| `@alpwise/ui/tailwind-preset` | Preset Tailwind v3 |
| `@alpwise/ui/theme.css` | Tema Tailwind v4 |

React (≥ 18) è una peer dependency. I componenti con stato o hook (`form`, `layout`, `feedback`, `sections`) hanno `'use client'`; gli altri (`Button`, `Card`, `Table`…) restano utilizzabili nei Server Components di Next.js App Router.

## Installazione

Il pacchetto è su GitHub Packages, quindi npm deve sapere dove trovare lo scope `@alpwise` e avere un token.

1. Crea un token GitHub con permesso **`read:packages`** (classic token, oppure fine-grained con accesso in lettura ai package dell'organizzazione).
2. Nel progetto che usa il pacchetto, aggiungi `.npmrc`:

   ```ini
   @alpwise:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

   Il token resta fuori dal repository: esportalo nella shell (`export GITHUB_TOKEN=ghp_…`) o mettilo nel `~/.npmrc` personale. Su CI e su Vercel/Netlify imposta `GITHUB_TOKEN` (o `NODE_AUTH_TOKEN`, adattando la riga) tra le variabili d'ambiente. In una GitHub Action dello stesso owner basta `secrets.GITHUB_TOKEN` con `permissions: packages: read`.

3. Installa:

   ```bash
   npm install @alpwise/ui
   ```

## Uso

```tsx
// app/layout.tsx (Next.js) o main.tsx (Vite)
import '@alpwise/ui/styles.css';

import { Button, Hero, Navbar } from '@alpwise/ui';

export default function Page() {
  return <Button arrow href="/contatti">Parliamone</Button>;
}
```

## Tailwind v3

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import alpwise from '@alpwise/ui/tailwind-preset';

export default {
  presets: [alpwise],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
```

Con una config CommonJS: `presets: [require('@alpwise/ui/tailwind-preset')]`.

Ordine dei CSS, come nel portfolio: prima `@alpwise/ui/styles.css`, poi il file con `@tailwind base; @tailwind components; @tailwind utilities;`. Non serve aggiungere il pacchetto a `content`: i componenti usano le classi `al-*`, non utility Tailwind.

## Tailwind v4

```css
/* app/globals.css */
@import "tailwindcss";
@import "@alpwise/ui/styles.css" layer(components);
@import "@alpwise/ui/theme.css";
```

`layer(components)` mette le classi `al-*` sopra il Preflight e sotto le utility: `className="al-btn w-full"` funziona come ci si aspetta. `theme.css` definisce anche la variante `dark:` su `data-theme="dark"`.

## Utility

Preset v3 e `theme.css` v4 generano le stesse classi, tutte riferite alle variabili dei token:

- Colori: `bg-bg`, `bg-surface`, `bg-surface-raised`, `bg-surface-sunken`, `border-line`, `border-line-grid`, `border-line-strong`, `text-ink`, `text-ink-muted`, `text-ink-subtle`, `bg-primary`, `hover:bg-primary-hover`, `bg-primary-soft`, `text-primary-fg`, `bg-inverse`, `text-inverse-fg`, `text-link`, `outline-focus`, `text-success`, `text-warning`, `text-danger`, `bg-mist`, `sky-100…800`
- Testo: `font-sans`, `font-mono`, `text-display-xl`, `text-display-lg`, `text-h1`…`text-h4`, `text-lead`, `text-body`, `text-body-sm`, `text-label`, `text-mono-label`, `text-mono-sm`, `text-mono-data`
- Altro: `rounded-none`, `rounded-xs`, `rounded-sm`, `max-w-container`, `shadow-overlay`, `bg-horizon`, `z-nav`, `z-modal`, `z-toast`, `duration-fast|base|slow|epic`, `ease-out`, `ease-in-out`

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

Gli stili in `styles/` sono quelli del portfolio. Se cambi un token o una classe `al-*`, cambiali qui e nel portfolio (o fai usare `@alpwise/ui` al portfolio), così le due cose non divergono.

## Rilasci

Le versioni sono gestite con [Changesets](https://github.com/changesets/changesets).

1. Per ogni modifica da pubblicare: `npm run changeset`, scegli patch/minor/major e descrivi la modifica. Committa il file in `.changeset/`.
2. Al push su `main`, la GitHub Action `Release` apre (o aggiorna) la PR **"chore: version packages"** con versione e CHANGELOG aggiornati.
3. Quando unisci quella PR, la stessa Action builda e pubblica su GitHub Packages.

Serve una volta sola, nelle impostazioni del repository: **Settings → Actions → General → Workflow permissions** su "Read and write" e "Allow GitHub Actions to create and approve pull requests". Il token della Action (`GITHUB_TOKEN`) basta per pubblicare: lo scope `@alpwise` deve coincidere con l'owner del repository su GitHub (l'organizzazione `alpwise`).
