// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  // Dirección donde se publica el sitio (GitHub Pages).
  // `site` es el dominio y `base` la carpeta: el sitio queda en
  // https://miespinozar.github.io/portfolio/
  site: 'https://miespinozar.github.io',
  base: '/portfolio',

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [vue()]
});
