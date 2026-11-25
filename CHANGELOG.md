# @alpwisestudio/ui

## 0.5.0

### Minor Changes

- 0b58d3f: Add `SidebarAccountMenu`, `SidebarAccountItem`, `SidebarAccountSeparator`, and `ThemeToggle` `variant="subtle"` for a compact popover account menu at the bottom of the app sidebar.

### Patch Changes

- c25f0fe: SidebarAccountMenu: il menu segue il bottone nel DOM (ordine di Tab corretto), `role="group"` al posto di `dialog`, angoli vivi, nome a 13px, hover e stato aperto visibili anche in Chiaro.

## 0.4.0

### Minor Changes

- 2a2689a: Bagliore dell'orizzonte: token `--horizon-glow`, classe `.al-glow` e utility `bg-horizon-glow`, per il pannello di accesso dei prodotti (Alpwise book, staff). `.al-glow` sfuma ai lati, così accanto al form la luce non è tagliata netta.
- 2a2689a: Sidebar delle app Alpwise, quella di Alpwise book e staff: `AppShell` (sidebar fissa da 1024px, cassetto su mobile con Esc, velo e blocco dello scorrimento), `SidebarGroup`, `SidebarNav` (icona, numero, "Presto", `linkAs` per next/link), `SidebarAccount`, `SidebarTools`, `initials` e `ProductLogo` (lettering "Alpwise" con BOOK o STAFF accanto).
- 2a2689a: Loghi dei prodotti con le proporzioni del vecchio logo di staff: in `ProductLogo` e nel wordmark completo (`<Logo />`, footer) il nome (BOOK, STAFF, QUOTA, STUDIO) è Host Grotesk 500 alto 30/84 del lettering, spaziatura .12em, distanza 24/84, sulla linea di base del lettering. Il lettering "Alpwise" non cambia.
- 2a2689a: `ThemeToggle`: scelta Scuro / Chiaro delle app, con la chiave di localStorage dell'app. Intestazioni delle tabelle in `text-muted` nel tema Chiaro (contrasto AA).

## 0.3.0

### Minor Changes

- b745248: Consulting direction from the "Alpwise · consulenza, tema scuro" canvas.

  - New `--night` (#06080B) as the dark background (`--bg`), the footer and the start of `--horizon`.
  - One font: Host Grotesk. DM Mono is removed (font files and `@font-face`); `--font-mono` is now an alias of `--font-sans`. Numbers, times and dates use `tabular-nums`.
  - Labels in Host Grotesk 500, sentence case, no trailing slash: new `Kicker` component and `.al-kicker` class. `Mono` and `.al-mono` stay as deprecated aliases with the new style. Tags, table headers, specs, errors and trees follow (no more `└─`).
  - Photos and glass: `Photo` (`.al-photo`, full-width photo with night scrim and 12-column grid), `Glass` (`.al-glass`, panel that turns fields and labels light and translucent), `Button variant="glass"` (`.al-btn-glass`). Tokens `--photo-scrim`, `--photo-scrim-soft`, `--glass*`.
  - `Hero` takes `image` and `kicker`: with a photo the secondary button is glass. `Navbar clear` uses a glass call to action.
  - `Head`: label on top, big title on the left, lead on the right. `Services`: big numbered rows with an optional `href` and arrow. `Accordion` is now a client component: one item open at a time, the panel slides open and the answer fades in, buttons with `aria-expanded` and closed panels `inert` (`size="lg"`: numbered FAQ with a + that turns into −; new `headingLevel` prop). Service rows with a link get a hover state: other rows dim, the title slides, a primary line draws under the row and the arrow becomes a filled button. `Footer`: `kicker`, `tagline`, `cta`, link columns, legal row and a faint wordmark. `CaseStudy` link is an outline button.
  - Tailwind: `night`, `glass*` colors, `text-kicker`, `bg-photo-scrim`, `backdrop-blur-glass`.

## 0.2.0

### Minor Changes

- d3d2043: Change `--horizon` to a night gradient that ends in brand blue (`sky-700`) instead of white. The light band at the bottom is gone, so white text and labels pass contrast at any height (≥ 5.8:1); black labels on the bottom of the horizon should become white.

## 0.1.2

### Patch Changes

- Publish on npmjs.com as a public package instead of GitHub Packages: no token or `.npmrc` needed to install. Proprietary `LICENSE`, OFL license texts for Host Grotesk and DM Mono in `fonts/`.

## 0.1.1

### Patch Changes

- 60e8c14: Type `darkMode` and `fontSize` in the Tailwind preset as tuples so the preset satisfies `Config` from `tailwindcss`.
