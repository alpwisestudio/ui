import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Anteprima locale: importa i sorgenti (src/, styles/) direttamente, senza passare dalla build.
export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss()],
  server: { port: 5180 },
  build: { outDir: 'dist', emptyOutDir: true },
});
