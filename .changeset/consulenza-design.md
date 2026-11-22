---
"@alpwisestudio/ui": minor
---

Consulting direction from the "Alpwise · consulenza, tema scuro" canvas.

- New `--night` (#06080B) as the dark background (`--bg`), the footer and the start of `--horizon`.
- One font: Host Grotesk. DM Mono is removed (font files and `@font-face`); `--font-mono` is now an alias of `--font-sans`. Numbers, times and dates use `tabular-nums`.
- Labels in Host Grotesk 500, sentence case, no trailing slash: new `Kicker` component and `.al-kicker` class. `Mono` and `.al-mono` stay as deprecated aliases with the new style. Tags, table headers, specs, errors and trees follow (no more `└─`).
- Photos and glass: `Photo` (`.al-photo`, full-width photo with night scrim and 12-column grid), `Glass` (`.al-glass`, panel that turns fields and labels light and translucent), `Button variant="glass"` (`.al-btn-glass`). Tokens `--photo-scrim`, `--photo-scrim-soft`, `--glass*`.
- `Hero` takes `image` and `kicker`: with a photo the secondary button is glass. `Navbar clear` uses a glass call to action.
- `Head`: label on top, big title on the left, lead on the right. `Services`: big numbered rows with an optional `href` and arrow. `Accordion` is now a client component: one item open at a time, the panel slides open and the answer fades in, buttons with `aria-expanded` and closed panels `inert` (`size="lg"`: numbered FAQ with a + that turns into −; new `headingLevel` prop). Service rows with a link get a hover state: other rows dim, the title slides, a primary line draws under the row and the arrow becomes a filled button. `Footer`: `kicker`, `tagline`, `cta`, link columns, legal row and a faint wordmark. `CaseStudy` link is an outline button.
- Tailwind: `night`, `glass*` colors, `text-kicker`, `bg-photo-scrim`, `backdrop-blur-glass`.
