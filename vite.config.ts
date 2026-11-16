import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import landing from './src/content/landing.json';

const landingInputs = Object.fromEntries([
  ...landing.services.map((service) => [
    `services/${service.slug}`,
    `services/${service.slug}/index.html`,
  ]),
  ...landing.areas.map((area) => [`areas/${area.slug}`, `areas/${area.slug}/index.html`]),
]);

export default defineConfig({
  base: '/',
  appType: 'mpa',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    rollupOptions: {
      input: {
        main: 'index.html',
        ...landingInputs,
      },
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
  },
});
