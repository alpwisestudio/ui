import { defineConfig } from 'tsup';

export default defineConfig([
  {
    // Un file per modulo, senza bundle: così ogni 'use client' resta in cima al suo file
    // e Next.js App Router separa da solo componenti server e client.
    entry: ['src/*.ts', 'src/*.tsx'],
    format: ['esm'],
    bundle: false,
    dts: true,
    sourcemap: true,
    target: 'es2020',
    outDir: 'dist',
  },
  {
    entry: { 'tailwind/preset': 'src/tailwind/preset.ts' },
    format: ['esm', 'cjs'],
    // require('@alpwise/ui/tailwind-preset') restituisce il preset, non { default }.
    cjsInterop: true,
    splitting: true,
    dts: true,
    target: 'node18',
    outDir: 'dist',
  },
]);
