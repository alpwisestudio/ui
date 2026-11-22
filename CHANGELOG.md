# @alpwisestudio/ui

## 0.2.0

### Minor Changes

- d3d2043: Change `--horizon` to a night gradient that ends in brand blue (`sky-700`) instead of white. The light band at the bottom is gone, so white text and labels pass contrast at any height (≥ 5.8:1); black labels on the bottom of the horizon should become white.

## 0.1.2

### Patch Changes

- Publish on npmjs.com as a public package instead of GitHub Packages: no token or `.npmrc` needed to install. Proprietary `LICENSE`, OFL license texts for Host Grotesk and DM Mono in `fonts/`.

## 0.1.1

### Patch Changes

- 60e8c14: Type `darkMode` and `fontSize` in the Tailwind preset as tuples so the preset satisfies `Config` from `tailwindcss`.
